const ratingAndReview = require('../model/ratingAndReview')
const course = require('../model/Course')

// create rating 
exports.createRating = async (req, res) => {
    try {
        // fetch data from req body
        const { rating, review, courseId } = req.body
        // get user id
        const { userId } = req.user.id
        // check if user exist
        const courseDetails = await course.findOne({ _id: courseId }, {
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        })
        if (!courseDetails) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }
        // check if user already review
        const alreadyReviewed = await ratingAndReview.findOne({ user: userId, course: courseId })
        if (alreadyReviewed) {
            return res.json(403).json({
                message: 'course is already reviewed by user',
                success: false
            })
        }
        // create rating
        const ratingDetails = await ratingAndReview.create({
            user: userId,
            rating,
            review
        })
        // update course model
        const updateCourse = await course.findByIdAndUpdate(courseId, {
            push: {
                ratingAndReview: ratingDetails._id
            }
        }, { new: true })
        console.log(updateCourse)
        // return res
        return res.status(200).json(
            {
                message: 'Rating created successfully',
                ratingDetails,
                success: true
            }
        )

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

// get average rating
// mushkil 
exports.getAverageRating = async (req, res) => {
    try {
        // get courseId
        const { courseId } = req.body       //todo .courseId
        // calculate average rating
        const result = await ratingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Type.Schema.ObjectId(courseID)
                },
            },
            {
                group: {
                    _id: null,
                    averageRating: { $avg: '$rating' }
                }
            }

        ])
        // return rating
        if (result.length > 0) {
            return res.status(200).json({ averageRating: result[0].averageRating, success: true })
        }
        return res.status(200).json({
            message: 'No rating found for this course',
            success: false
        })


    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })

    }
}


// get all rating

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await ratingAndReview.find({}).sort({ rating: -1 }).populate({ // check here
            path: 'user',
            select: 'firstName lastName email image'
        }).populate({
            path: 'course',
            select: 'courseName'
        }).exec()

        return res.status(200).json({ message: 'all data fetch successfully ', data: allReviews, success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })

    }
}