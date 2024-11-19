const User = require('../model/user')
const OTP = require('../model/OTP')
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const Profile = require('../model/profile')
const jwt = require('jsonwebtoken')
const { otpTemplate } = require('../mail/templates/emailVerificationTemplate')

const mailSender = require('../utils/mailSender')

require('dotenv').config()

// sendotp
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        const checkUserPresent = await User.findOne({ email });
        console.log(`Email: ${email}`);

        // If user found with provided email
        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: `User is Already Registered`,
            });
        }

        let otp;
        let result;
        // Ensure unique OTP generation
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        } while (result);

        // Prepare OTP payload
        const otpPayload = { email, otp };
        console.log('Generated OTP Payload:', otpPayload);

        // Save OTP to the database
        await OTP.create(otpPayload);

        // Send OTP via email using the template
        const htmlContent = otpTemplate(otp);
        // console.log(htmlContent)
        const sended = await mailSender(email, "Verification Email", htmlContent);

        console.log('Email sent:', sended);

        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
        });

    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({
            success: false,
            message: error.message, // Sending back the error message for debugging
        });
    }
};



// signup

exports.signUp = async (req, res) => {
    try {
        // data fetched from req body
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

        // check validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                message: 'Please fill all fields',
                success: false
            });
        }
        console.log(firstName, lastName, email, password, confirmPassword, accountType, otp);

        // password confirm password validation
        if (password !== confirmPassword) {
            return res.status(403).json({
                message: 'Passwords do not match',
                success: false
            });
        }

        // check if the user already exists (case insensitive check)
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        console.log(existingUser);

        if (existingUser) {
            return res.status(403).json({
                message: 'User already exists',
                success: false
            });
        }

        // find most recent OTP for the user
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOTP);

        // validate OTP
        if (!recentOTP) {
            return res.status(400).json({
                message: 'OTP not found',
                success: false
            });
        } else if (recentOTP.otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                success: false
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        // create profile entry in the database
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNotes: null
        });

        // create user entry in the database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),  // Ensure email is stored in lowercase
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        // return successful response
        return res.status(200).json({
            message: 'User created successfully',
            success: true,
            data: user
        });

    } catch (error) {
        console.log('Failed to create user', error.message);
        return res.status(500).json({
            message: 'Failed to create user',
            success: false
        });
    }
};


// login

exports.login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password',
                success: false
            })
        }
        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            })
        }
        // match password
        // const isPassword = 
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })
            user.token = token
            user.password = undefined
            // create cookie respond send
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('token', token, options).status(200).json({
                message: 'Logged in successfully',
                success: true,
                data: user
            })
        }
        else {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            })
        }
    } catch (error) {
        console.log('error while login', error.message)
        res.status(500).json({
            message: 'Failed to login',
            success: false
        })
    }
}

// change password
