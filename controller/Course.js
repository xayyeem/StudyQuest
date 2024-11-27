const Course = require('../model/Course')
const Categories = require('../model/Categories')
const user = require('../model/user')
const { uploadImageToCloudinary } = require('../utils/imageUpload')


// create Course

exports.createCourse = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get all required fields from request body
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            status,
            instructions: _instructions,
        } = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        // const tag = JSON.parse(_tag)
        // const instructions = JSON.parse(_instructions)

        // console.log("tag", tag)
        // console.log("instructions", instructions)

        // Check if any of the required fields are missing
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !thumbnail ||
            !category
        ) { // Removed the trailing comma
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        // Check if the user is an instructor
        const instructorDetails = await user.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // Check if the tag given is valid
        const categoryDetails = await Categories.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);

        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
        });

        // Add the new course to the Categories
        const categoryDetails2 = await Categories.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        console.log("HEREEEEEEEE", categoryDetails2);

        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

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