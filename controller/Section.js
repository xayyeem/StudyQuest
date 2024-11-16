const section = require('../model/Section')
const course = require('../model/Course')


exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body
        // data validations
        if (!sectionName || !courseId) {
            return res.status(400).json({ message: 'Please provide section name and courseId', success: false })
        }
        // create section
        const newSection = await section.create({
            sectionName
        })
        // update course with section objectid
        const updatedCourseDetails = await course.findByIdAndUpdate({ courseId }, { $push: { courseContent: newSection._id } }, { new: true })
        // return response
        return res.status(200).json({ message: 'Section created successfully', success: true, updatedCourseDetails })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

// update section

exports.updateSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, sectionId } = req.body
        // validation data
        if (!sectionName || !sectionId) {
            return res.status(400).json({ message: 'Please provide section name and sectionId', success: false })
        }
        //  update data
        const updateSection = await section.findByIdAndUpdate({ sectionId: _id }, { sectionName }, { new: true })
        // return res
        return res.status(200).json({
            message: 'Section updated successfully',
            success: true,
            updatedSection: updateSection
        })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


// delete section

exports.deleteSection = async (req, res) => {
    try {
        // fetch data from param in thsi only
        const { sectionId } = req.params
        await section.findByIdAndDelete({ sectionId })
        //  TODO [testing] // do we need to delete from course schema
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}