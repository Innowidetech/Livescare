const express = require('express');
const {registrationRequest, contactUs, submitRequest, donorRequest, subscribe, getPrograms} = require('../controllers/user.controller');
const { verifyPayment } = require('../controllers/payment.controller');

const router = express.Router()

router.post('/registrationRequest', registrationRequest);
router.post('/contact', contactUs);
router.post('/submit', submitRequest);
router.post('/donor', donorRequest);
router.post('/verifyPayment', verifyPayment);
router.post('/subscribe', subscribe);
router.get('/programs',getPrograms);

module.exports = router;