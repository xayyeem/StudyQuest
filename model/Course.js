const mongoose = require('mongoose')
const validator = require('validator')
const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    whatYouWillLearn: {
        type: String,
        required: true,
        trim: true,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }],
    ratingAndReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    price: {
        type: Number,

    },
    thumbnail: {
        type: String
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]

})


module.exports = mongoose.model('Course', CourseSchema)