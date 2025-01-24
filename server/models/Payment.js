const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentOrderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    paymentSignature: {
        type: String,
        required: true,
    },
    paymentSignatureVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
