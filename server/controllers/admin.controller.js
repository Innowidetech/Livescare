const User = require('../models/User');
const Inventory = require('../models/Inventory');
const confirmRegistration = require('../utils/confirmRegistrationTemplate');
const { sendEmailToUser, sendEmailToAdmin } = require('../utils/sendEmail');
const updateRequestStatusTemplate = require('../utils/updateRequestStatusTemplate');
const updateDonorStatusTemplate = require('../utils/updateDonorRequestTemplate');
const bcrypt = require('bcryptjs');
const SubmitRequest = require('../models/SubmitRequest');
const DonorRequest = require('../models/DonorRequest');
const moment = require('moment');
const Certificate = require('../models/Certificate');
const { uploadImage } = require('../utils/multer');
const Program = require('../models/OurPrograms');
const Blog = require('../models/Blog');
const sanitizeHtml = require('sanitize-html')

exports.registration = async (req, res) => {
    try {
        const { fullname, username, email, password, designation, mobileNumber, pincode } = req.body;
        if (!fullname || !username || !email || !password || !designation || !mobileNumber || !pincode) {
            return res.status(400).json({ message: 'Please provide all the details to add new member.' })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only loggedin admins can access." })
        }

        const hpass = bcrypt.hashSync(password, 10);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hpass,
            role: 'member',
            designation,
            mobileNumber,
            pincode,
            photo: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
        });

        await newUser.save()

        await sendEmailToUser(email, process.env.EMAIL_ID, `Livescare Account Status`, confirmRegistration(fullname, username, email, password, designation, mobileNumber, pincode));

        res.status(201).json({ message: `Account has been created successfully, and an email has been sent to ${fullname}.`, newUser })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getProfile = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && (loggedinuser.role !== 'admin' || loggedinuser.role !== 'member')) {
            return res.status(404).json({ message: "Only admin or members can access." })
        }

        res.status(201).json({ message: 'Profile data fetched successfully.', loggedinuser })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.createItem = async (req, res) => {
    try {
        const { itemName, count, amount } = req.body;
        if (!itemName) {
            return res.status(400).json({ message: 'Please provide all the details to add item.' })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const existingItem = await Inventory.findOne({ itemName });

        if (existingItem) {
            if (itemName === 'Money') {
                existingItem.amount += amount;
            }
            else {
                existingItem.count += count;
            }
            await existingItem.save();
            return res.status(200).json({ message: 'Item updated successfully.', existingItem });
        }
        else {
            const newItem = new Inventory({
                itemName,
                count,
                status: 'Available',
                amount
            });
            await newItem.save();
            return res.status(201).json({ message: 'Item created successfully and added to inventory.', newItem });
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.getItems = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && (loggedinuser.role !== 'admin' || loggedinuser.role !== 'member')) {
            return res.status(404).json({ message: "Only admin and members can access." })
        }

        const inventory = await Inventory.find().sort({ createdAt: -1 });
        if (!inventory.length) {
            return res.status(404).json({ message: "No item found with the Id." })
        }

        res.status(201).json({ message: 'Items fetched successfully.', inventory })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        if (!itemId) {
            return res.status(400).json({ message: 'Provide the item Id.' })
        }
        const { newCount, newStatus, newAmount } = req.body;
        if (!newCount && !newStatus && !newAmount) {
            return res.status(400).json({ message: 'Please provide data to update.' });
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const inventory = await Inventory.findById(itemId);
        if (!inventory) {
            return res.status(404).json({ message: "No item found with the Id." })
        }

        // inventory.itemName = inventory.itemName;
        inventory.count = newCount || inventory.count;
        inventory.status = newStatus || inventory.status;
        inventory.amount = newAmount || inventory.amount;

        await inventory.save();

        res.status(201).json({ message: 'Item updated successfully.', inventory })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.getMembers = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const members = await User.find({ role: 'member' }).sort({ createdAt: -1 }).exec();;
        if (!members.length) {
            return res.status(404).json({ message: "No item found with the Id." })
        }

        const total = members.length;

        res.status(200).json({ message: 'Members fetched successfully.', total, members })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.getSubmitRequests = async (req, res) => {
    try {
        const { place, contact } = req.params;

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: "User not found." });
        }

        let query = {};

        if (loggedinuser.role === 'member') {
            query.pincode = loggedinuser.pincode;
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only members or admins can access." });
        }

        if (place) {
            const placeFilters = place.split(',');
            placeFilters.forEach(filter => {
                if (filter === 'city') {
                    query.city = { $exists: true };
                } else if (filter === 'state') {
                    query.state = { $exists: true };
                } else if (filter === 'address') {
                    query.address = { $exists: true };
                } else if (filter === 'pincode' && loggedinuser.role === 'member') {
                    query.pincode = loggedinuser.pincode;
                }
            });
        }

        if (contact) {
            const contactFilters = contact.split(',');
            contactFilters.forEach(filter => {
                if (filter === 'mobileNumber') {
                    query.mobileNumber = { $exists: true };
                } else if (filter === 'email') {
                    query.email = { $exists: true };
                }
            });
        }

        const submits = await SubmitRequest.find(query).sort({ createdAt: -1 });
        const total = submits.length;

        const selectedFields = submits.map(submit => {
            const result = {
                id: submit._id,
                name: submit.name,
                itemName: submit.itemName,
                createdAt: submit.createdAt,
                description: submit.description,
                status: submit.status
            };

            if (place && place.includes('city')) result.city = submit.city;
            if (place && place.includes('state')) result.state = submit.state;
            if (place && place.includes('address')) result.address = submit.address;
            if (place && place.includes('pincode')) result.pincode = submit.pincode;
            if (contact && contact.includes('mobileNumber')) result.mobileNumber = submit.mobileNumber;
            if (contact && contact.includes('email')) result.email = submit.email;

            return result;
        });

        res.status(200).json({ message: 'Submit Requests fetched successfully.', total, submits: selectedFields });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};



exports.getDonorRequests = async (req, res) => {
    try {
        const { place, contact } = req.params;

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: "User not found." });
        }

        let query = {};

        if (loggedinuser.role === 'member') {
            query.pincode = loggedinuser.pincode;
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only members or admins can access." });
        }

        if (place) {
            const placeFilters = place.split(',');
            placeFilters.forEach(filter => {
                if (filter === 'city') {
                    query.city = { $exists: true };
                } else if (filter === 'state') {
                    query.state = { $exists: true };
                } else if (filter === 'address') {
                    query.address = { $exists: true };
                } else if (filter === 'pincode' && loggedinuser.role === 'member') {
                    query.pincode = loggedinuser.pincode;
                }
            });
        }

        if (contact) {
            const contactFilters = contact.split(',');
            contactFilters.forEach(filter => {
                if (filter === 'mobileNumber') {
                    query.mobileNumber = { $exists: true };
                } else if (filter === 'email') {
                    query.email = { $exists: true };
                }
            });
        }

        const donors = await DonorRequest.find(query).sort({ createdAt: -1 });
        const total = donors.length;

        const selectedFields = donors.map(donor => {
            const result = {
                id: donor._id,
                name: donor.name,
                itemName: donor.itemName,
                count: donor.count,
                amount:donor.amount,
                createdAt: donor.createdAt,
                description: donor.description,
                status: donor.status
            };

            if (place && place.includes('city')) result.city = donor.city;
            if (place && place.includes('state')) result.state = donor.state;
            if (place && place.includes('address')) result.address = donor.address;
            if (place && place.includes('pincode')) result.pincode = donor.pincode;
            if (contact && contact.includes('mobileNumber')) result.mobileNumber = donor.mobileNumber;
            if (contact && contact.includes('email')) result.email = donor.email;

            return result;
        });

        res.status(200).json({ message: 'Donor Requests fetched successfully.', total, donors: selectedFields });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.getAllCounts = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: "User not found." });
        }

        const inventory = await Inventory.find().sort({ createdAt: -1 });
        const itemCount = inventory.reduce((sum, item) => {
            const itemCount = Number(item.count);
            return sum + (isNaN(itemCount) ? 0 : itemCount);
        }, 0);

        let submitQuery = {};
        if (loggedinuser.role === 'member') {
            submitQuery.pincode = loggedinuser.pincode;
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only members or admins can access." });
        }
        const submitRequestsCount = await SubmitRequest.countDocuments(submitQuery);

        let donorQuery = {};
        if (loggedinuser.role === 'member') {
            donorQuery.pincode = loggedinuser.pincode;
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only members or admins can access." });
        }
        const donorRequestsCount = await DonorRequest.countDocuments(donorQuery);

        let dispatchedQuery = { status: 'Completed' };
        if (loggedinuser.role === 'member') {
            dispatchedQuery.pincode = loggedinuser.pincode;
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only members or admins can access." });
        }
        const dispatchedCount = await SubmitRequest.countDocuments(dispatchedQuery);

        res.status(200).json({
            message: 'Counts fetched successfully.',
            counts: {
                itemCount,
                submitRequestsCount,
                donorRequestsCount,
                dispatchedCount
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.getCompletedRequestPercentages = async (req, res) => {
    try {
        const { month, year } = req.params;

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const currentDate = new Date();
        const queryMonth = month || (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const queryYear = year || currentDate.getFullYear().toString();

        const sanitizedYear = queryYear.padStart(4, '0');
        const sanitizedMonth = queryMonth.padStart(2, '0');

        const startOfMonth = moment(`${sanitizedYear}-${sanitizedMonth}-01T00:00:00Z`).startOf('month').toDate();
        const endOfMonth = moment(`${sanitizedYear}-${sanitizedMonth}-01T23:59:59Z`).endOf('month').toDate();

        const itemNames = ['Food', 'Clothes', 'Books', 'Medical', 'Toys', 'Games Kit', 'Money', 'Others'];

        const getItemCounts = (requests) => {
            const counts = {
                'Food': 0,
                'Clothes': 0,
                'Books': 0,
                'Medical': 0,
                'Toys': 0,
                'Games Kit': 0,
                'Money': 0,
                'Others': 0
            };

            requests.forEach(request => {
                if (itemNames.includes(request.itemName)) {
                    counts[request.itemName]++;
                }
            });
            return counts;
        };

        const getTotalMoney = (requests) => {
            return requests.reduce((total, request) => {
                if (request.itemName === 'Money' && request.amount) {
                    total += request.amount;
                }
                return total;
            }, 0);
        };

        const getDailyIncome = (requests) => {
            const dailyIncome = {};
            requests.forEach(request => {
                const day = moment(request.createdAt).format('YYYY-MM-DD');
                if (!dailyIncome[day]) {
                    dailyIncome[day] = 0;
                }
                if (request.itemName === 'Money' && request.amount) {
                    dailyIncome[day] += request.amount;
                }
            });
            return dailyIncome;
        };

        let donorCompletedRequests = [];
        let submitCompletedRequests = [];

        if (loggedinuser.role === 'admin') {
            donorCompletedRequests = await DonorRequest.find({
                status: 'Completed',
                createdAt: { $gte: startOfMonth, $lt: endOfMonth }
            });

            submitCompletedRequests = await SubmitRequest.find({
                status: 'Completed',
                createdAt: { $gte: startOfMonth, $lt: endOfMonth }
            });
        } else if (loggedinuser.role === 'member') {
            donorCompletedRequests = await DonorRequest.find({
                status: 'Completed',
                createdAt: { $gte: startOfMonth, $lt: endOfMonth },
                pincode: loggedinuser.pincode
            });

            submitCompletedRequests = await SubmitRequest.find({
                status: 'Completed',
                createdAt: { $gte: startOfMonth, $lt: endOfMonth },
                pincode: loggedinuser.pincode
            });
        } else {
            return res.status(403).json({ message: 'Access denied. Only admins or members can access.' });
        }

        const donorItemCounts = getItemCounts(donorCompletedRequests);
        const submitItemCounts = getItemCounts(submitCompletedRequests);

        const totalDonorCompleted = donorCompletedRequests.length;
        const totalSubmitCompleted = submitCompletedRequests.length;

        const donorTotalMoney = getTotalMoney(donorCompletedRequests);
        const submitTotalMoney = getTotalMoney(submitCompletedRequests);

        const calculatePercentages = (itemCounts, totalCompleted) => {
            return itemNames.reduce((acc, itemName) => {
                const count = itemCounts[itemName];
                acc[itemName] = totalCompleted > 0 ? ((count / totalCompleted) * 100).toFixed(2) : 0;
                return acc;
            }, {});
        };

        const donorItemPercentages = calculatePercentages(donorItemCounts, totalDonorCompleted);
        const submitItemPercentages = calculatePercentages(submitItemCounts, totalSubmitCompleted);

        const donorDailyIncome = getDailyIncome(donorCompletedRequests);
        const submitDailyIncome = getDailyIncome(submitCompletedRequests);

        const allDaysInMonth = [];
        const daysInMonth = moment(`${sanitizedYear}-${sanitizedMonth}`, 'YYYY-MM').daysInMonth();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayString = moment(`${sanitizedYear}-${sanitizedMonth}-${day.toString().padStart(2, '0')}`).format('YYYY-MM-DD');
            allDaysInMonth.push({
                date: dayString,
                donorIncome: donorDailyIncome[dayString] || 0,
                submitIncome: submitDailyIncome[dayString] || 0
            });
        }

        const responseData = {
            donorRequest: {
                totalCompleted: totalDonorCompleted,
                itemCounts: donorItemCounts,
                itemPercentages: donorItemPercentages,
                totalMoney: donorTotalMoney,
                dailyIncome: allDaysInMonth.map(day => ({
                    date: day.date,
                    income: day.donorIncome
                }))
            },
            submitRequest: {
                totalCompleted: totalSubmitCompleted,
                itemCounts: submitItemCounts,
                itemPercentages: submitItemPercentages,
                totalMoney: submitTotalMoney,
                dailyIncome: allDaysInMonth.map(day => ({
                    date: day.date,
                    income: day.submitIncome
                }))
            }
        };

        res.status(200).json({
            message: 'Item counts, percentages, and daily income for DonorRequest and SubmitRequest by month and year.',
            data: responseData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};


exports.dailyUsers = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { timePeriod } = req.params;

        const filterByPincode = (requests, pincode) => {
            return requests.filter(request => request.pincode === pincode);
        };

        const submitRequests = await SubmitRequest.find().sort({ createdAt: -1 });
        const donorRequests = await DonorRequest.find().sort({ createdAt: -1 });

        let filteredSubmitRequests = submitRequests;
        let filteredDonorRequests = donorRequests;

        if (loggedinuser.role === 'member') {
            filteredSubmitRequests = filterByPincode(submitRequests, loggedinuser.pincode);
            filteredDonorRequests = filterByPincode(donorRequests, loggedinuser.pincode);
        } else if (loggedinuser.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Only admins or members can access.' });
        }

        const getPredefinedPeriods = (timePeriod) => {
            if (timePeriod === 'day') {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            } else if (timePeriod === 'week') {
                const startOfMonth = moment().startOf('month');
                const endOfMonth = moment().endOf('month');

                const weeksInMonth = [];
                let weekNumber = startOfMonth.isoWeek();

                while (weekNumber <= endOfMonth.isoWeek()) {
                    weeksInMonth.push(`Week ${weekNumber}`);
                    weekNumber++;
                }

                return weeksInMonth;
            } else if (timePeriod === 'month') {
                return [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
            } else if (timePeriod === 'year') {
                const currentYear = moment().year();
                const years = [];
                for (let i = 0; i <= 4; i++) {
                    years.push(currentYear - i);
                }
                return years;
            }
            return [];
        };

        const getCountForTimePeriod = (requests, timePeriod) => {
            const counts = {};

            const predefinedPeriods = getPredefinedPeriods(timePeriod);
            predefinedPeriods.forEach(period => {
                counts[period] = 0;
            });

            requests.forEach(request => {
                const createdAt = moment(request.createdAt);

                if (timePeriod === 'day') {
                    const dayOfWeek = createdAt.format('dddd');
                    if (counts[dayOfWeek] !== undefined) {
                        counts[dayOfWeek]++;
                    }
                } else if (timePeriod === 'week') {
                    const week = createdAt.isoWeek();
                    const weekLabel = `Week ${week}`;
                    if (counts[weekLabel] !== undefined) {
                        counts[weekLabel]++;
                    }
                } else if (timePeriod === 'month') {
                    const month = createdAt.format('MMMM');
                    if (counts[month] !== undefined) {
                        counts[month]++;
                    }
                } else if (timePeriod === 'year') {
                    const year = createdAt.year();
                    if (counts[year] !== undefined) {
                        counts[year]++;
                    }
                }
            });

            if (timePeriod === 'year') {
                Object.keys(counts).forEach(year => {
                    if (counts[year] === 0) {
                        delete counts[year];
                    }
                });
            }

            return counts;
        };

        const submitCounts = getCountForTimePeriod(filteredSubmitRequests, timePeriod);
        const donorCounts = getCountForTimePeriod(filteredDonorRequests, timePeriod);

        const combinedCounts = {};

        const allKeys = new Set([...Object.keys(submitCounts), ...Object.keys(donorCounts)]);
        allKeys.forEach(key => {
            combinedCounts[key] = (submitCounts[key] || 0) + (donorCounts[key] || 0);
        });

        const responseData = {
            requestCounts: combinedCounts,
        };

        res.status(200).json({
            message: 'Request counts based on time period.',
            data: responseData
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.updateSubmitRequestStatus = async (req, res) => {
    try {
        const { requestId, newStatus } = req.params;
        if (!requestId || !newStatus) {
            return res.status(404).json({ message: "Provide the new status to update." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && (loggedinuser.role !== 'admin' || loggedinuser.role !== 'member')) {
            return res.status(404).json({ message: "Only admin or member can update." })
        }

        const submits = await SubmitRequest.findById(requestId);
        if (!submits) {
            return res.status(404).json({ message: "No submit request found with the provided id." })
        }

        const admin = await User.findOne({ role: 'admin' })

        const member = await User.findOne({ pincode: submits.pincode, role: 'member' });
        if (!member) {
            return res.status(404).json({ message: "No member found linked with the submit request pincode." });
        }

        const oldStatus = submits.status
        submits.status = newStatus
        await submits.save()

        const updatedBy = loggedinuser.fullname
        const nameAdmin = admin.fullname
        const nameMember = member.fullname
        const nameUser = submits.name
        const item = submits.itemName
        const state = submits.state
        const city = submits.city
        const address = submits.address
        const pincode = submits.pincode

        await sendEmailToAdmin(process.env.EMAIL_ID, process.env.EMAIL_ID, `Submit Request Status Update - Livescare`, updateRequestStatusTemplate(nameAdmin, item, oldStatus, newStatus, updatedBy, state, city, address, pincode));
        await sendEmailToAdmin(member.email, process.env.EMAIL_ID, `Submit Request Status Update - Livescare`, updateRequestStatusTemplate(nameMember, item, oldStatus, newStatus, updatedBy, state, city, address, pincode));
        await sendEmailToUser(submits.email, process.env.EMAIL_ID, `Submit Request Status Update - Livescare`, updateRequestStatusTemplate(nameUser, item, oldStatus, newStatus, updatedBy, state, city, address, pincode));

        res.status(201).json({ message: 'Submit Requests status updated successfully.', submits })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.updateDonorRequestStatus = async (req, res) => {
    try {
        const { requestId, newStatus } = req.params;
        if (!requestId || !newStatus) {
            return res.status(404).json({ message: "Provide the new status to update." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && (loggedinuser.role !== 'admin' || loggedinuser.role !== 'member')) {
            return res.status(404).json({ message: "Only admin  or member can update." })
        }

        const donor = await DonorRequest.findById(requestId);
        if (!donor) {
            return res.status(404).json({ message: "No donor request found with the provided id." })
        }

        const admin = await User.findOne({ role: 'admin' })

        const member = await User.findOne({ pincode: donor.pincode, role: 'member' });
        if (!member) {
            return res.status(404).json({ message: "No member found linked with the submit request pincode." });
        }

        const oldStatus = donor.status

        donor.status = newStatus
        await donor.save()

        const updatedBy = loggedinuser.fullname
        const nameAdmin = admin.fullname
        const nameMember = member.fullname
        const nameUser = donor.name
        const item = donor.itemName
        const count = donor.count
        const state = donor.state
        const city = donor.city
        const address = donor.address
        const pincode = donor.pincode

        await sendEmailToAdmin(process.env.EMAIL_ID, process.env.EMAIL_ID, `Donor Request Status Update - Livescare`, updateDonorStatusTemplate(nameAdmin, item, count, oldStatus, newStatus, updatedBy, state, city, address, pincode));
        await sendEmailToAdmin(member.email, process.env.EMAIL_ID, `Donor Request Status Update - Livescare`, updateDonorStatusTemplate(nameMember, item, count, oldStatus, newStatus, updatedBy, state, city, address, pincode));
        await sendEmailToUser(donor.email, process.env.EMAIL_ID, `Donor Request Status Update - Livescare`, updateDonorStatusTemplate(nameUser, item, count, oldStatus, newStatus, updatedBy, state, city, address, pincode));

        res.status(201).json({ message: 'Donor Requests status updated successfully.', donor })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.createCertificate = async (req, res) => {
    try {
        const { donorName, donationId } = req.body;
        if (!donorName || !donationId) {
            return res.status(404).json({ message: "Provide all details to create certificate." })
        }

        const donor = await DonorRequest.findById(donationId);
        if (!donor) {
            return res.status(404).json({ message: "No donation request found with the provided id." })
        }

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload signature.', error: error.message });
            }
        };

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const admin = await User.findOne({ role: 'admin' })

        const newCertificate = new Certificate({
            donorName, donationId, signature: photo, issuedBy: admin.fullname
        })
        await newCertificate.save()

        res.status(201).json({ message: `Certificate created successfully for ${donorName}.`, newCertificate })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getCompletedDonors = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const donor = await DonorRequest.find({ status: 'Completed' }).sort({ createdAt: -1 });
        if (!donor.length) {
            return res.status(404).json({ message: "No donations completed." })
        }

        res.status(200).json({ message: "Completed donor list.", donor })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getCertificates = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let certificates;

        if (loggedinuser.role === 'admin') {
            certificates = await Certificate.find().populate('donationId').sort({ createdAt: -1 });
        } else if (loggedinuser.role === 'member') {
            certificates = await Certificate.find().populate('donationId').sort({ createdAt: -1 });
            certificates = certificates.filter(cert => cert.donationId && cert.donationId.pincode === loggedinuser.pincode);
        } else {
            return res.status(403).json({ message: 'Access denied. Only admins or members can access.' });
        }

        if (!certificates.length) {
            return res.status(404).json({ message: 'No certificates.' });
        }

        res.status(200).json({ message: 'Certificates fetched successfully.', certificates });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.getCertificateById = async (req, res) => {
    try {
        const { certificateId } = req.params;
        if (!certificateId) {
            return res.status(400).json({ message: "Provide the certificate id." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let certificates;

        if (loggedinuser.role === 'admin') {
            certificates = await Certificate.findById(certificateId).populate('donationId');
        } else if (loggedinuser.role === 'member') {
            certificates = await Certificate.find({ _id: certificateId }).populate('donationId');
            certificates = certificates.filter(cert => cert.donationId && cert.donationId.pincode === loggedinuser.pincode);
        } else {
            return res.status(403).json({ message: 'Access denied. Only admins or members can access.' });
        }

        if (!certificates || !certificates.length) {
            return res.status(404).json({ message: 'No certificate found with the id for this member.' });
        }

        res.status(200).json({ message: 'Certificate fetched successfully.', certificates });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.deleteCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        if (!certificateId) {
            return res.status(400).json({ message: "Please provide certificate id." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const certificate = await Certificate.findByIdAndDelete(certificateId);
        if (!certificate) {
            return res.status(404).json({ message: 'No certificate found with given id.' })
        }

        res.status(201).json({ message: `Certificate deleted successfully.` })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.createProgram = async (req, res) => {
    try {
        const { date, title, location, time, description } = req.body;
        if (!date || !title || !location || !time || !description) {
            return res.status(400).json({ message: "Please provide all the details to post new program." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        if (!req.files || !req.files.photo || req.files.photo.length !== 2) {
            return res.status(400).json({ message: "Please upload exactly two images." });
        }

        let photoUrls = [];
        for (let file of req.files.photo) {
            try {
                const [photoUrl] = await uploadImage(file);
                photoUrls.push(photoUrl);
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        }

        const newProgram = new Program({ title, location, date, time, description, image: photoUrls });
        await newProgram.save()

        res.status(201).json({ message: `New Program created successfully.`, newProgram })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getProgramsForAdmin = async (req, res) => {
    try {
        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const programs = await Program.find().sort({ date: 1 });
        if (!programs.length) {
            return res.status(404).json({ message: "No programs found." })
        }

        res.status(200).json({ message: `Programs fetched successfully.`, programs })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getProgramsById = async (req, res) => {
    try {
        const { programId } = req.params;
        if (!programId) {
            return res.status(404).json({ message: "Provide the program id." })
        }
        const programs = await Program.findById(programId);
        if (!programs) {
            return res.status(404).json({ message: "No program found with the id." })
        }

        res.status(200).json({ message: `Program fetched successfully.`, programs })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.deleteProgram = async (req, res) => {
    try {
        const { programId } = req.params
        if (!programId) {
            return res.status(400).json({ message: "Please provide program id." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const program = await Program.findByIdAndDelete(programId);
        if (!program) {
            return res.status(404).json({ message: "No program found with the id." })
        }

        res.status(200).json({ message: `Program deleted successfully.` })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.postBlog = async (req, res) => {
    try {
        const { title, tags, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Please provide all the details to post blog.' })
        }

        const sanitizedDescription = sanitizeHtml(description);

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        };

        const newBlog = new Blog({ title, tags, description: sanitizedDescription, image: photo });

        await newBlog.save()

        res.status(201).json({ message: 'Blog posted successfully.', newBlog })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        if (!blogs.length) {
            return res.status(404).json({ message: 'No blogs found.' })
        }
        res.status(201).json({ message: 'Blogs fetched successfully.', blogs })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return res.status(400).json({ message: "Provide the blog id." })
        }

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: 'No blog found with the id.' })
        }
        res.status(201).json({ message: 'Blog fetched successfully.', blog })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.editBlog = async (req, res) => {
    try {
        const { newTitle, newTags, newDescription } = req.body;
        const { blogId } = req.params;
        if (!blogId) {
            return res.status(400).json({ message: "Provide the blogId to edit." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: "No blog found with the id." })
        }

        let sanitizedDescription = blog.description

        if (newDescription) {
            sanitizedDescription = sanitizeHtml(newDescription);
        }

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        };
        newPhoto = photo;

        blog.title = newTitle || blog.title;
        blog.tags = newTags || blog.tags;
        blog.description = sanitizedDescription;
        blog.image = newPhoto || blog.image;

        await blog.save()

        res.status(201).json({ message: 'Blog updated successfully.', blog })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return res.status(400).json({ message: "Provide the blogId to edit." })
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'admin') {
            return res.status(404).json({ message: "Only admin can access." })
        }

        const blog = await Blog.findByIdAndDelete(blogId)
        if (!blog) {
            return res.status(404).json({ message: "No blog found with the id." })
        }

        res.status(201).json({ message: 'Blog deleted successfully.' })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};