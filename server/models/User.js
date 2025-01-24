const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['admin','member']
    },
    designation:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        // required:true,
    },
    city:{
        type:String,
        // required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    whatsapp:{
        type:String,
        // required:true,
    },
    facebook:{
        type:String,
        // required:true,
    },
    twitter:{
        type:String,
        // required:true,
    },
    linkedin:{
        type:String,
        // required:true,
    },
    photo:{
        type:String,
        // required:true,
    },
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);