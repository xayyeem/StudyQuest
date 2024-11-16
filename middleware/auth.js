const jwt = require('jsonwebtoken')
require('dotenv').config()
const user = require('../model/user')

// auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookie
        // token verify
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)

            // user related information saved
            req.user = decode

        } catch (error) {
            // verificatio issue
            res.status(401).json({
                message: 'Token is not valid',
                success: false
            })
        }
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            message: 'Token is not provided :',
            success: false
        })
    }
}


// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                message: 'User role not verified : Student',
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'User role not verified not provided :',
            success: false
        })
    }
}

// isInstructor

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                message: 'User role not verified : Instructor',
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'User role not verified not provided :',
            success: false
        })
    }
}

// isAdmin

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(401).json({
                message: 'User role not verified : Admin',
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'User role not verified not provided :',
            success: false
        })
    }
}