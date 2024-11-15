const mongoose = require('mongoose');
const validator = require('validator');
const profileSchema = mongoose.Schema({
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        validate(value) {
            if (!['Male', 'Female', 'Other'].includes(value)) {
                throw new Error('Invalid gender. Must be Male, Female, or Other')
            }
        }

    },
    dateOfBirth: {
        type: Date,
        validate(value) {
            if (value > new Date()) {
                throw new Error('Invalid date of birth. Date of birth cannot be in the future')
            }
        }
    },
    about: {
        type: String,
        trim: true,
    },
    contactNo: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid contact number. Must be a valid mobile phone number')
            }
        }
    }
})

module.exports = mongoose.model('Profile', profileSchema)