const mongoose = require('mongoose')
const validator = require('validator')
const tagsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

})


module.exports = mongoose.model('Tag', tagsSchema)