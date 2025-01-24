const Stripe = require('stripe');
const { Payment } = require('../models/Payment');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentOrder = async (req, res, amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
        });

        const paymentOrder = await Payment.create({
            paymentOrderId: paymentIntent.id,
            amount,
            currency: 'inr',
            paymentStatus: "pending",
            paymentSignature: paymentIntent.client_secret,
            paymentSignatureVerified: false,
        });

        return res.status(201).json({
            success: true,
            message: 'Payment order created successfully.',
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating payment order.",
            success: false,
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { paymentIntentId, paymentSignature } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                message: "Payment verification failed. Status is not succeeded.",
                success: false,
            });
        }

        const paymentOrder = await Payment.findOne({ paymentOrderId: paymentIntent.id });
        if (!paymentOrder) {
            return res.status(404).json({
                message: "Payment order not found.",
                success: false,
            });
        }

        if (paymentOrder.paymentSignature !== paymentSignature) {
            return res.status(400).json({
                message: "Payment signature verification failed.",
                success: false,
            });
        }

        paymentOrder.paymentStatus = "success";
        paymentOrder.paymentSignatureVerified = true;

        await paymentOrder.save();

        return res.status(200).json({
            message: "Payment verified successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            message: "Internal server error during verification.",
            success: false,
        });
    }
};
