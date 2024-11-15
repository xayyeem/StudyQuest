const mongoose = require('mongoose');
const validator = require('validator');
const courseProgressSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    completedVideo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
    }]
})

module.exports = mongoose.model('courseProgress', courseProgressSchema)