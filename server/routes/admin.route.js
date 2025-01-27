const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createItem, editItem, deleteItem, registration, getItems, getMembers, getSubmitRequests, getDonorRequests, getProfile, getCompletedRequestPercentages, dailyUsers, updateDonorRequestStatus, updateSubmitRequestStatus, createCertificate, getCertificates, editCertificate, deleteCertificate, getAllCounts, createProgram, getProgramsForAdmin, deleteProgram, postBlog, getBlogs, editBlog, deleteBlog, getBlogById, getProgramsById } = require('../controllers/admin.controller');
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
router.delete('/item/:itemId', protect, deleteItem);
router.get('/members', protect, getMembers);
router.get('/submit/:place/:contact', protect, getSubmitRequests);
router.get('/donor/:place/:contact', protect, getDonorRequests);
router.get('/dashboardPercentages/:year?/:month?', protect, getCompletedRequestPercentages);
router.get('/dailyUsers/:timePeriod', protect, dailyUsers);
router.post('/updateSubmitRequestStatus/:requestId/:newStatus', protect, updateSubmitRequestStatus);
router.post('/updateDonorRequestStatus/:requestId/:newStatus', protect, updateDonorRequestStatus);
router.post('/certificate', protect, upload.single('photo'), createCertificate);
router.get('/certificate', protect, getCertificates);
router.post('/certificate/:certificateId', protect, editCertificate);
router.delete('/certificate/:certificateId', protect, deleteCertificate);
router.get('/getCounts', protect, getAllCounts);
router.post('/program', protect, upload.single('photo'), createProgram);
router.get('/program', protect, getProgramsForAdmin);
router.get('/program/:programId', getProgramsById);
router.delete('/program/:programId', protect, deleteProgram);
router.post('/blog',protect, upload.single('photo'), postBlog)
router.get('/blog',getBlogs);
router.get('/blog/:blogId', getBlogById);
router.post('/blog/:blogId', protect, upload.single('photo'), editBlog);
router.delete('/blog/:blogId', protect, deleteBlog);

module.exports = router;