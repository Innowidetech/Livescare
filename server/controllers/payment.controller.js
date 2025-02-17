const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const DonorRequest = require('../models/DonorRequest');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.createPaymentOrder = async (req, res, amount, donorRequestData) => {
    try {
        const orderOptions = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`,
        };

        const order = await razorpay.orders.create(orderOptions);

        const paymentOrder = await Payment.create({
            paymentOrderId: order.id,
            amount,
            currency: 'INR',
            paymentStatus: "pending",
            paymentSignatureVerified: false,
            donorRequestData: donorRequestData,
        });

        return {
            success: true,
            orderId: order.id,
            amount: amount,
        };

    } catch (error) {
        console.error("Error while creating payment order:", error);

        if (error.response) {
            console.error("Razorpay API error:", error.response);
        }

        return {
            success: false,
            error: error.response?.error?.description || error.message || "Unknown error occurred during payment order creation.",
        };
    }
};

exports.verifyPayment = async (req, res) => {
    const { paymentOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    try {
        const paymentOrder = await Payment.findOne({ paymentOrderId });

        if (!paymentOrder) {
            return res.status(404).json({
                message: "Payment order not found.",
                success: false,
            });
        }

        const signatureVerificationString = paymentOrderId + "|" + razorpayPaymentId;
        
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(signatureVerificationString)
            .digest('hex');

        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({
                message: "Payment signature verification failed.",
                success: false,
            });
        }

        paymentOrder.paymentStatus = "success";
        paymentOrder.razorpayPaymentId = razorpayPaymentId;
        paymentOrder.razorpaySignature = razorpaySignature;
        paymentOrder.paymentSignatureVerified = true;
        await paymentOrder.save();

        const donorRequest = await DonorRequest.findOne({ paymentOrderId });
        if (donorRequest) {
            donorRequest.status = 'Completed';
            await donorRequest.save();
        }

        return res.status(200).json({
            message: "Payment verified successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            message: "Internal server error during verification.",
            success: false,
            error: error.message
        });
    }
};