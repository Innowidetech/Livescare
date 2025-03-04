const express = require('express');

const multer = require('multer');
const { editProfile, issueCertificate } = require('../controllers/member.controller');
const upload = multer({ storage: multer.memoryStorage() });
const {protect} = require('../middleware/auth.middleware');
const { getProfile, getItems, getSubmitRequests, getDonorRequests, getCertificates, getAllCounts, getCompletedRequestPercentages, dailyUsers, updateSubmitRequestStatus, updateDonorRequestStatus, getCertificateById } = require('../controllers/admin.controller');
// const { getPrograms } = require('../controllers/user.controller');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/profile', protect, upload.single('photo'), editProfile);
router.get('/item', protect, getItems);
router.get('/submit/:place/:contact', protect, getSubmitRequests);
router.get('/donor/:place/:contact', protect, getDonorRequests);
router.get('/dashboardPercentages/:year?/:month?', protect, getCompletedRequestPercentages);
router.get('/dailyUsers/:timePeriod', protect, dailyUsers);
router.get('/certificate', protect, getCertificates);
router.get('/certificate/:certificateId', protect, getCertificateById);
router.get('/getCounts', protect, getAllCounts);
router.patch('/updateCertificateStatus/:certificateId', protect, issueCertificate);
router.post('/updateSubmitRequestStatus/:requestId/:newStatus', protect, updateSubmitRequestStatus);
router.post('/updateDonorRequestStatus/:requestId/:newStatus', protect, updateDonorRequestStatus);
// router.get('/programs', getPrograms);


module.exports = router;