const user = require('../model/user')
const mailSender = require('../utils/mailSender')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

// resetpasswordtoken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body
        const { email } = req.body
        // validate user
        const userExist = await user.findOne({ email })
        if (!userExist) {
            return res.status(404).json({ message: 'User not found', success: false })
        }
        // generate token
        const token = crypto.randomUUID()
        console.log(token)
        // update user by adding token and expiration time
        const updatedDetails = await user.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true })
        // create url
        const url = `http://localhost:5173/update-password/${token}`
        // create mail
        await mailSender(email, 'password reset link',
            `password reset link : ${url}`
        )
        updatedDetails.password = undefined
        // return res
        return res.status(400).json({
            message: 'Reset password link sent',
            success: true,
            data: updatedDetails
        })

    } catch (error) {
        console.log('Failed to send password reset link', error.message)
        res.status(500).json({
            message: 'Failed to send password reset link',
            success: false
        })
    }

}

// resetpassword

exports.resetPassword = async (req, res) => {
    try {
        // get token and password from req body
        const { password, confirmPassword, token } = req.body
        console.log(password, confirmPassword, token)
        // validations
        if (password !== confirmPassword) {
            return res.json({
                message: 'Passwords do not match',
                success: false
            })
        }
        // get user details from db using token
        const userDetails = await user.findOne({ token: token })
        // validation for userDetails
        if (!userDetails) {
            return res.json({
                message: 'Token invalid or expired',
                success: false
            })
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            res.json({
                message: 'Token expired',
                success: false
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // password update
        const update = await user.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })
        // return res
        return res.status(200).json({
            message: 'Password reset successful',
            success: true,
            data: update
        })
    } catch (error) {
        console.log('Failed to reset password', error.message)
        res.status(500).json({
            message: 'Failed to reset password',
            success: false
        })
    }
}