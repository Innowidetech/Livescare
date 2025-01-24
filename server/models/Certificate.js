const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  donorName:{
    type:String,
    required:true,
  },
  donationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'DonorRequest',
    required:true,
  },
  issuedDate:{
    type:Date,
    required:true,
  },
  signature:{
    type:String,
    required:true,
  },
  issuedBy:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:['Pending', 'Received'],
    default:'Pending',
    required:true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);