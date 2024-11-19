const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender')
const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60
    }
})

// function to send mail

async function sendVerificationEmail(email, otp, next) {
    try {
        const mailResponse = await mailSender(email, 'Verification email from edtech', otp)
        console.log('Mail sent successfully: ', mailResponse)
    } catch (error) {
        console.log('error occur while sending mail: ', error.message)
        throw error.message
    }
}

// pre middleware schema

// pre middleware mai doc save nahi hota
otpSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp)
    next()
})

module.exports = mongoose.model('OTP', otpSchema)