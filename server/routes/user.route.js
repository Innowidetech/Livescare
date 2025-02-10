const express = require('express');
const {registrationRequest, contactUs, submitRequest, donorRequest, subscribe, getPrograms, getSpentDonationsPercentages, aboutUs} = require('../controllers/user.controller');
const { verifyPayment } = require('../controllers/payment.controller');
const { getBlogs, getBlogById, getProgramsById } = require('../controllers/admin.controller');

const router = express.Router()

router.post('/registrationRequest', registrationRequest);
router.post('/contact', contactUs);
router.post('/submit', submitRequest);
router.post('/donor', donorRequest);
router.post('/verifyPayment', verifyPayment);
router.post('/subscribe', subscribe);
router.get('/programs',getPrograms);
router.get('/program/:programId', getProgramsById);
router.get('/spent', getSpentDonationsPercentages);
router.get('/blog',getBlogs);
router.get('/blog/:blogId', getBlogById);
router.get('/aboutUs', aboutUs);


module.exports = router;