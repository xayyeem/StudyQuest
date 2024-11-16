const user = require('../model/user')
const otp = require('../model/OTP')
const brcypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const profile = require('../model/profile')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// sendotp
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from req body
        const { email } = req.body
        // check if user already exists
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            res.status(401).json({
                message: 'User already exists',
                success: false
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log(otp)

        // check unique otp or not
        const result = await otp.findOne({ otp })
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await otp.findOne({ otp })
        }
        const otpPayload = { email, otp }
        // create entry in db
        const otpBody = await otp.create(otpPayload)
        console.log(otpBody)
        //  send otp response
        res.status(200).json({
            message: 'OTP sent successfully',
            success: true,
            otp: otpBody.otp
        })
    } catch (error) {
        console.log('error while sending otp: ', error.message)
        res.status(500).json({
            message: 'Error while sending otp',
            success: false
        })
    }
}



// signup

exports.signUp = async (req, res) => {
    try {
        // data fetched from req body
        const { firstName, lastName, email, password, contactNo, confirmPassword, accountType, otp } = req.body
        // check validation

        if (!firstName || !lastName || !email || !password || !contactNo || !confirmPassword || !otp) {
            res.status(403).json({
                message: 'Please fill all fields',
                success: false
            })
        }

        // password confirm password
        if (password !== confirmPassword) {
            return res.status(403).json({
                message: 'Passwords do not match',
                success: false
            })
        }

        // check for user enter or not
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(403).json({
                message: 'User already exists',
                success: false
            })
        }

        // find most recent OTP for user
        const recentOTP = await otp.findOne({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(recentOTP)

        // validate OTP
        if (recentOTP.length === 0) {
            res.status(400).json({
                message: 'OTP length is not found',
                success: false
            })
        }
        else if (recentOTP.otp !== otp) {
            res.status(400).json({
                message: 'Invalid OTP',
                success: false
            })
        }

        // hash password
        const hashedPassword = brcypt.hash(password, 10)

        // create entry in db

        const ProfileDetails = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNotes: null
        })

        const user = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNo,
            additionalDetails: ProfileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            message: 'User created successfully',
            success: true,
            data: user
        })
    } catch (error) {
        console.log('Failed to create user', error.message)
        res.status(500).json({
            message: 'Failed to create user',
            success: false
        })
    }
}

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
        const user = await user.findOne({ email })
        if (!existingUser) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            })
        }
        // match password
        // const isPassword = 
        if (await brcypt.compare(password, user.password)) {
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
