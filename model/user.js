const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password cannot contain the word "password"')
            }
        }
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Admin', 'Student', 'instructor'],
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    image: {
        type: String,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'
    }]
})


module.exports = mongoose.model('User', userSchema)