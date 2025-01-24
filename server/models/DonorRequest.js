const mongoose = require('mongoose');

const DonorRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
        enum: ['Food', 'Clothes', 'Books', 'Medical', 'Toys', 'Games Kit', 'Money', 'Others']
    },
    count: {
        type: String,
        required: function () {
            return this.itemName !== 'Money';
        },
    },
    amount: {
        type: Number,
        required: function () {
            return this.itemName === 'Money';
        },
    },
    paymentMethod:{
        type:String,
        required:function(){
            return this.itemName === 'Money'
        },
        enum:['Online', 'Offline']
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Rejected', 'Processing', 'Completed'],
        default: 'Pending'
    },
}, { timestamps: true });

module.exports = mongoose.model('DonorRequest', DonorRequestSchema);