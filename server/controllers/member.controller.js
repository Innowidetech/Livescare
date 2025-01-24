const User = require('../models/User');
const { uploadImage } = require('../utils/multer');
const Certificate = require('../models/Certificate');

exports.editProfile = async (req, res) => {
    try{
        const { newFullname, newUsername, newEmail, newMobileNumber, newState, newCity, newPincode, newWhatsapp, newFacebook, newTwitter, newLinkedin} = req.body;
        // if (!newFullname && !newUsername && !newEmail && !newMobileNumber && !newState && !newCity && !newPincode && !newWhatsapp && !newFacebook && !newTwitter && !newLinkedin) {
        //     return res.status(400).json({ message: 'Please provide any new data to update the profile.' })
        // }

        const loggedinid = req.user && req.user.id;
        if(!loggedinid){
            return res.status(401).json({message:'Unauthorized.'})
        }

        const loggedinuser = await User.findById(loggedinid);
        if(!loggedinuser && (loggedinuser.role !== 'member' || loggedinuser.role !=='admin')){
            return res.status(404).json({message:"Only loggedin members can access."})
        }

        let photo = loggedinuser.photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload photo.', error: error.message });
            }
        };
        
        loggedinuser.fullname = newFullname || loggedinuser.fullname
        loggedinuser.username = newUsername || loggedinuser.username
        loggedinuser.email = newEmail || loggedinuser.email
        loggedinuser.mobileNumber = newMobileNumber || loggedinuser.mobileNumber
        loggedinuser.state = newState || loggedinuser.state
        loggedinuser.city = newCity || loggedinuser.city
        loggedinuser.pincode =  newPincode|| loggedinuser.pincode
        loggedinuser.whatsapp =  newWhatsapp|| loggedinuser.whatsapp
        loggedinuser.facebook = newFacebook || loggedinuser.facebook
        loggedinuser.twitter = newTwitter || loggedinuser.twitter
        loggedinuser.linkedin = newLinkedin || loggedinuser.linkedin
        loggedinuser.photo =  photo || loggedinuser.photo

        await loggedinuser.save()

        res.status(201).json({message:`Profile has been updated successfully.`, loggedinuser})
    }
    catch(err){
        return res.status(500).json({message:'Internal server error', error:err.message})
    }
};


exports.updateCertificateStatus = async(req,res)=>{
try {
        const {certificateId, newStatus} = req.params;
        if(!certificateId){
            return res.status(400).json({message:"Please provide certificate id."})
        }
        if (!newStatus) {
            return res.status(400).json({ message: "Provide any new ststus to update." })
        }

        const certificate = await Certificate.findById(certificateId).populate('donationId');
        if(!certificate){
            return res.status(404).json({message:'No certificate found with given id.'})
        }

        const loggedinid = req.user && req.user.id;
        if (!loggedinid) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }

        const loggedinuser = await User.findById(loggedinid);
        if (!loggedinuser && loggedinuser.role !== 'member') {
            return res.status(404).json({ message: "Only members can access." })
        }

        if(certificate.donationId.pincode !== loggedinuser.pincode){
            return res.status(404).json({message:"You can't update the status of this certificate."})
        }

        certificate.status = newStatus;
        certificate.save()

        res.status(201).json({ message: `Certificate updated successfully.`, certificate })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};