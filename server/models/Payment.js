const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentOrderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    paymentSignature: {
        type: String,
        default: null,
    },
    paymentSignatureVerified: {
        type: Boolean,
        default: false,
    },
    donorRequestData: {
        type: Object,
        required: true,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
