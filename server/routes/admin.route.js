const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createItem, editItem, registration, getItems, getMembers, getSubmitRequests, getDonorRequests, getProfile, getCompletedRequestPercentages, dailyUsers, updateDonorRequestStatus, updateSubmitRequestStatus, createCertificate, getCertificates, deleteCertificate, getAllCounts, createProgram, getProgramsForAdmin, deleteProgram, postBlog, getBlogs, editBlog, deleteBlog, getBlogById, getProgramsById, getCertificateById, getCompletedDonors } = require('../controllers/admin.controller');
const { editProfile } = require('../controllers/member.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router()

router.post('/registration', protect, registration);
router.get('/profile', protect, getProfile);
router.post('/profile', protect, upload.single('photo'), editProfile);
router.post('/item', protect, createItem);
router.get('/item', protect, getItems);
router.post('/item/:itemId', protect, editItem);
router.get('/members', protect, getMembers);
router.get('/submit/:place/:contact', protect, getSubmitRequests);
router.get('/donor/:place/:contact', protect, getDonorRequests);
router.get('/dashboardPercentages/:year?/:month?', protect, getCompletedRequestPercentages);
router.get('/dailyUsers/:timePeriod', protect, dailyUsers);
router.post('/updateSubmitRequestStatus/:requestId/:newStatus', protect, updateSubmitRequestStatus);
router.post('/updateDonorRequestStatus/:requestId/:newStatus', protect, updateDonorRequestStatus);
router.get('/donors', protect, getCompletedDonors);
router.post('/certificate', protect, upload.single('photo'), createCertificate);
router.get('/certificate', protect, getCertificates);
router.get('/certificate/:certificateId', protect, getCertificateById);
router.delete('/certificate/:certificateId', protect, deleteCertificate);
router.get('/getCounts', protect, getAllCounts);
router.post('/program', protect, upload.fields([{ name: 'photo', maxCount: 2 }]), createProgram);
router.get('/program', protect, getProgramsForAdmin);
router.get('/program/:programId', getProgramsById);
router.delete('/program/:programId', protect, deleteProgram);
router.post('/blog',protect, upload.single('photo'), postBlog)
router.get('/blog',getBlogs);
router.get('/blog/:blogId', getBlogById);
router.post('/blog/:blogId', protect, upload.single('photo'), editBlog);
router.delete('/blog/:blogId', protect, deleteBlog);

module.exports = router;