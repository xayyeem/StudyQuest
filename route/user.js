const express = require('express');
const router = express.Router();
const { signUp, login, sendOTP } = require('../controller/Auth'); // Import the controllers

const { resetPasswordToken, resetPassword } = require('../controller/ResetPassword')


// Signup Route (POST)
router.post('/signup', signUp);

// Login Route (POST)
router.post('/login', login);

// Send OTP Route (POST)
router.post('/sendotp', sendOTP);

router.post("/resetpasswordtoken", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/resetpassword", resetPassword)

module.exports = router;
