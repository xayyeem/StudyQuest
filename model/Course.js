const mongoose = require('mongoose')
const CourseSchema = mongoose.Schema({

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },

    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    instruction: {
        type: [String]
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
    }

})


module.exports = mongoose.model('Course', CourseSchema)