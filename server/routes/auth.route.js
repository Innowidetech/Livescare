const express = require('express');
const { login, resetPassword, forgotPassword, logout } = require('../controllers/auth.controller');
const {protect} = require('../middleware/auth.middleware')
const router = express.Router();

router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword',resetPassword);
router.post('/logout', protect, logout)


module.exports = router;
