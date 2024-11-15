const mongoose = require('mongoose')
const validator = require('validator')
const SectionSchema = mongoose.Schema({
    sectionName: {
        type: String
    },
    subSectionName: [{
        type: mongoose.Schema.Type.ObjectId,
        required: true,
        ref: 'SubSection'
    }]
})


module.exports = mongoose.model('Section', SectionSchema)