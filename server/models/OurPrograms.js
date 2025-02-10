const mongoose = require('mongoose');

const ProgramsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    required:true,
  },
  time:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  image: { 
    type: [String],
    validate: {
        validator: function(val) {
            return val.length === 2;
        },
        message: 'You must upload two images.'
    },
    required: true
}
}, { timestamps: true });

module.exports = mongoose.model('Programs', ProgramsSchema);