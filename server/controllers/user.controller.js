const User = require('../models/User');
const { sendEmailToAdmin } = require('../utils/sendEmail')
const registrationRequestTemplate = require('../utils/registrationRequestTemplate');
const contactUsTemplate = require('../utils/contactUsTemplate');
const ContactUs = require('../models/ContactUs');
const SubmitRequest = require('../models/SubmitRequest');
const DonorRequest = require('../models/DonorRequest');
const Subscribe = require('../models/Subscribe');
const subscribeTemplate = require('../utils/subscribeTemplate');
const Program = require('../models/OurPrograms');
const moment = require('moment');
const {createPaymentOrder} = require('../controllers/payment.controller')

exports.registrationRequest = async (req, res) => {
    try {
        const { fullname, username, email, password, mobileNumber, pincode } = req.body;
        if (!username || !fullname || !email || !password || !mobileNumber || !pincode) {
            return res.status(400).json({ message: "Provide all the details to register." })
        }

        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] })
        if (existingUser) {
            return res.status(404).json({ message: `User already exist with the username:${username} or email:${email}, please try to register with another username or email.` })
        }

        await sendEmailToAdmin(process.env.EMAIL_ID, email, `Registration request form - Livescare by ${fullname}`, registrationRequestTemplate(fullname, username, email, password, mobileNumber, pincode));

        res.status(201).json({
            message: 'Registration request form submitted successfully, you will receive an email once your account is created and you can reset the password by clicking on forgot password button in the login page.',
        });
    }
    catch (err) {
        res.status(404).json({ message: 'Internal server error.', error: err.message })
    }
};


exports.contactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, message } = req.body;
        if (!firstName || !lastName || !email || !mobileNumber || !message) {
            return res.status(400).json({ message: "Provide all the details to submit the form." })
        }

        const newContactUs = new ContactUs({ firstName, lastName, email, mobileNumber, message });
        await newContactUs.save()

        await sendEmailToAdmin(process.env.EMAIL_ID, email, `Contact Us Form - Livescare by ${firstName} ${lastName}`, contactUsTemplate(firstName, lastName, email, mobileNumber, message));

        res.status(201).json({
            message: 'Contact Form submitted successfully, our team will contact you via provided Mobile Number or Email.',
        });
    }
    catch (err) {
        res.status(404).json({ message: 'Internal server error.', error: err.message })
    }
};


exports.submitRequest = async (req, res) => {
    try {
        const { name, itemName, amount, mobileNumber, email, state, city, address, pincode, description } = req.body;
        if (!name || !itemName || !mobileNumber || !email || !state || !city || !address || !pincode || !description) {
            return res.status(400).json({ message: "Provide all the details to submit the form." })
        }

        if (itemName === 'Money') {
            if (!amount) {
                return res.status(400).json({ message: "Amount must be specified." });
            }
            if(amount > 10000){
                return res.status(400).json({ message: "The requested amount must be less than 10000" });
            }
        }

        const newSubmitRequest = new SubmitRequest({ name, itemName, amount, mobileNumber, email, state, city, address, pincode, description });
        await newSubmitRequest.save()

        // await sendEmailToAdmin(process.env.EMAIL_ID, email, `Submit Request Form - Livescare by ${name}`, contactUsTemplate(name, itemName, mobileNumber, email, state, city, address, pincode, description));

        res.status(201).json({
            message: 'Submit Request Form submitted successfully, our team will reach out you via provided Mobile Number or Email.',
        });
    }
    catch (err) {
        res.status(404).json({ message: 'Internal server error.', error: err.message })
    }
};


exports.donorRequest = async (req, res) => {
    try {
        const { name, itemName, count, amount, mobileNumber, email, state, city, address, pincode, description, paymentMethod } = req.body;

        if (!name || !itemName || !mobileNumber || !email || !state || !city || !address || !pincode) {
            return res.status(400).json({ message: "Provide all the details to submit the form." });
        }

        if(itemName === 'Money'){
            if(!paymentMethod){
                return res.status(400).json({message:"Provide the payment method."})
            }
        }

        if (itemName === 'Money') {
            if (!amount || amount <= 0) {
                return res.status(400).json({ message: "Amount must be provided and greater than 0 for money donations." });
            }

            if (paymentMethod === 'Offline') {
                const newDonorRequest = new DonorRequest({
                    name,
                    itemName,
                    amount,
                    paymentMethod,
                    mobileNumber,
                    email,
                    state,
                    city,
                    address,
                    pincode,
                    description,
                });
                await newDonorRequest.save();
                return res.status(201).json({
                    message: 'Donor Request Form submitted successfully. Our team will reach out to you.',
                });
            }

            if (paymentMethod === 'Online') {
                const newDonorRequest = {
                    name,
                    itemName,
                    amount,
                    paymentMethod,
                    mobileNumber,
                    email,
                    state,
                    city,
                    address,
                    pincode,
                    description,
                    status: 'Pending',
                };

                const paymentResponse = await createPaymentOrder(req, res, amount, newDonorRequest);

                if (!paymentResponse.success) {
                    return res.status(500).json({ message: "Error creating payment order: " + paymentResponse.error });
                }

                return res.status(200).json({
                    message: "Payment initiated successfully. Please complete the payment.",
                    orderId: paymentResponse.orderId,
                    amount: paymentResponse.amount,
                });
            }
        } else {
            const newDonorRequest = new DonorRequest({
                name,
                itemName,
                count,
                mobileNumber,
                email,
                state,
                city,
                address,
                pincode,
                description,
            });
            await newDonorRequest.save();

            return res.status(201).json({
                message: 'Donor Request Form submitted successfully. Our team will reach out to you.',
            });
        }
    } catch (err) {
        console.error("Error during donor request:", err);
        res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Please provide email id." });
        }

        const newSubscribe = new Subscribe({ email });

        await newSubscribe.save();

        const emails = await Subscribe.find().sort({ createdAt: -1 });

        const emailListHTML = subscribeTemplate(emails);

        const emailSubjectToAdmin = 'New Subscription Email Submission';
        const latestEmail = emails[0].email;
        await sendEmailToAdmin(process.env.EMAIL_ID, email, emailSubjectToAdmin, emailListHTML, latestEmail);

        res.status(200).send('Subscription form submitted successfully!');
    } catch (err) {
        res.status(500).send(`Error processing subscription: ${err.message}`);
    }
};


exports.getPrograms = async (req, res) => {
    try {
        const currentDate = moment().startOf('day').toDate();

        const programs = await Program.find({ date: { $gte: currentDate } }).sort({ date: 1 });
        if (!programs.length) {
            return res.status(404).json({ message: "No upcomming programs." })
        }

        res.status(200).json({ message: `Programs fetched successfully.`, programs })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};


exports.getSpentDonationsPercentages = async (req, res) => {
    try {
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

        const submitCompletedRequests = await SubmitRequest.find({
            status: 'Completed'
        });

        const submitItemCounts = getItemCounts(submitCompletedRequests);

        const totalSubmitCompleted = submitCompletedRequests.length;

        const calculatePercentages = (itemCounts, totalCompleted) => {
            return itemNames.reduce((acc, itemName) => {
                const count = itemCounts[itemName];
                acc[itemName] = totalCompleted > 0 ? ((count / totalCompleted) * 100).toFixed(2) : 0;
                return acc;
            }, {});
        };

        const submitItemPercentages = calculatePercentages(submitItemCounts, totalSubmitCompleted);

        const responseData = {
            submitRequest: {
                // totalCompleted: totalSubmitCompleted,
                itemPercentages: submitItemPercentages,
            }
        };

        res.status(200).json({
            message: 'Item counts and percentages for SubmitRequest.',
            data: responseData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
};
