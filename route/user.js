const express = require('express');
const router = express.Router();
const { signUp, login, sendOTP } = require('../controller/Auth'); // Import the controllers

// Signup Route (POST)
router.post('/signup', signUp);

// Login Route (POST)
router.post('/login', login);

// Send OTP Route (POST)
router.post('/sendotp', sendOTP);

module.exports = router;
