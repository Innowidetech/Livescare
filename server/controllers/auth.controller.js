const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {sendEmailToUser} = require('../utils/sendEmail');
const generateOtpTemplate = require('../utils/otpTemplate');
const PasswordReset = require('../models/forgotPassword');
const crypto = require('crypto');
const {addRevokedToken} = require('../utils/tokenRevocation');



exports.login = async(req,res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:'Please provide username and password.'})
        }

        const user = await User.findOne({username:username});
        if(!user){
            return res.status(404).json({message:'No user found with the username.'})
        };

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(404).json({message:"Please enter correct password."})
        }

        const token = jwt.sign({userId:user._id, role:user.role}, process.env.JWT_SECRET);

        res.status(200).json({
            message:"Login success.",
            id:user._id,
            name:user.fullname,
            username:user.username,
            email:user.email,
            designation:user.designation,
            role:user.role,
            token
        });
    }
    catch(err){
        return res.status(500).json({message:'Internal server error', error:err.message})
    }
};


exports.forgotPassword = async(req,res)=>{
    try {
        const { email } = req.body;
        if(!email){
          return res.status(400).json({message:'Please provide the email id.'})
        };
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found with this email.' });
        };
    
        const otp = crypto.randomInt(100000, 999999).toString();
    
        await PasswordReset.create({ email, otp });
    
        await sendEmailToUser(email, process.env.EMAIL_ID, 'Password Reset OTP from Livescare', generateOtpTemplate(otp));
    
        res.status(200).json({ message: 'OTP sent to email, It will expires in 2 minutes.' });
      } catch (err) {
        res.status(500).json({ message: 'Error sending OTP.', error: err.message });
      }
  };
  
  //verify opt and reset password
  exports.resetPassword = async(req,res)=>{
    try {
        const { email, otp, newPassword } = req.body;
        if(!otp || !newPassword){
          return res.status(400).json({message:'OTP or new password is missing.'})
        };
  
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found with the email.' });
        };
  
        const resetRequest = await PasswordReset.findOne({ email, otp });
        if (!resetRequest) {
          return res.status(400).json({ message: 'Invalid OTP or email.' });
        };  
        
          hpass = bcrypt.hashSync(newPassword,10);
    
        user.password = hpass;
        await user.save();
    
        await PasswordReset.deleteOne({ email, otp });
    
        res.status(200).json({ message: 'Password reset successfully.' });
      } catch (err) {
        res.status(500).json({ message: 'Error resetting password.', error: err.message });
      }
  };


  exports.logout = async(req,res)=>{
    try{
      const token = req.headers.authorization?.split(' ')[1];
      
      addRevokedToken(token);
      
      res.status(200).json({ message: 'Logout successful' }); 
    }
    catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  };