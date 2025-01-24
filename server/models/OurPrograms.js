const mongoose = require('mongoose');

const ProgramsSchema = new mongoose.Schema({
  date:{
    type:Date,
    required:true,
  },
  title:{
    type:String,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model('Programs', ProgramsSchema);