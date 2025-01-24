const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, //expires after 2 minutes
  },
},{timestamps:true});

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);