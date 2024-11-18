const Course = require('../model/Course')
const Categories = require('../model/Categories')
const user = require('../model/user')
const { uploadImageToCloudinary } = require('../utils/imageUpload')


// create Course

exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body
        // const thumbnail
        const thumbnail = req.files.thumnailImage
        // validations
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({ message: 'All fields are required', success: false })
        }
        // check for instructor 
        const userId = req.body.id
        const instructorDetails = await user.findById(userId)
        console.log('instructor details are :', instructor)
        //    TODO   // verify that instructor and user_id are same or different
        if (!instructorDetails) {
            return res.status(404).json({ message: 'Instructor not found', success: false })
        }
        // check tag is valid or not
        const tagDetails = await Tag.findById(tag)
        if (!tagDetails) {
            return res.status(404).json({ message: 'Tag not found', success: false })
        }
        // upload image to cloudinary server
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.CLOUD_FOLDER)
        // create entry
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage,
            instructor: instructorDetails._id,
            tags: tagDetails._id
        })
        // add new course to the user schema
        await user.findByIdAndUpdate({ _id: instructorDetails._id }, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true })
        // return res
        res.status(200).json({
            message: 'Course created successfully',
            success: true,
            data: newCourse
        })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

// get All Courses

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.status(200).json({
            message: 'All courses retrieved successfully',
            success: true,
            data: allCourses
        })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

// get course details

exports.getCourseDetails = async (req, res) => {
    try {
        // fetch course details
        const { courseId } = req.body
        // find course details using populate
        const courseDetails = await Course.findById(courseId).populate({
            path: 'instructor',
            populate: {
                path: 'additionalDetails'
            }
        }).populate('Categories').populate('RatingAndReview').populate({
            path: 'courseContent',
            populate: {
                path: 'SubSection'
            }
        }).exec()
        // validations 
        if (!courseDetails) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }
        return res.status(200).json({
            message: 'Course details retrieved successfully',
            success: true,
            data: courseDetails
        })
        // return res
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}