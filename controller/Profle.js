const Profile = require("../model/profile")
const CourseProgress = require("../model/CourseProgress")

const Course = require("../model/Course")
const User = require("../model/user")
const { uploadImageToCloudinary } = require("../utils/imageUpload")
const mongoose = require("mongoose")

// Method for updating a profile
// exports.updateProfile = async (req, res) => {
//     try {
//         const {
//             firstName = "",
//             lastName = "",
//             dateOfBirth = "",
//             about = "",
//             contactNumber = "",
//             gender = "",
//         } = req.body;

//         const userId = req.user.id;

//         // Retrieve the user and associated profile details
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const profile = await Profile.findById(user.additionalDetails);
//         if (!profile) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Profile not found",
//             });
//         }

//         // Update user details
//         user.firstName = firstName || user.firstName;
//         user.lastName = lastName || user.lastName;
//         await user.save();

//         // Update profile details
//         profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
//         profile.about = about || profile.about;
//         profile.contactNumber = contactNumber || profile.contactNumber;
//         profile.gender = gender || profile.gender;
//         await profile.save();

//         // Retrieve updated user details with the populated profile
//         const updatedUserDetails = await User.findById(userId)
//             .populate("additionalDetails")
//             .exec();

//         // Send a success response
//         return res.status(200).json({
//             success: true,
//             message: "Profile updated successfully",
//             updatedUserDetails,
//         });
//     } catch (error) {
//         console.error("Error updating profile:", error.message);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while updating the profile",
//             error: error.message,
//         });
//     }
// };

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body;

        const userId = req.user.id;

        // Retrieve the user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Retrieve the profile details
        const profile = await Profile.findById(user.additionalDetails);
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // Create objects to hold updated data for User and Profile
        const userUpdates = {};
        const profileUpdates = {};

        // Populate the userUpdates object
        if (firstName) userUpdates.firstName = firstName;
        if (lastName) userUpdates.lastName = lastName;

        // Populate the profileUpdates object
        if (dateOfBirth) profileUpdates.dateOfBirth = dateOfBirth;
        if (about) profileUpdates.about = about;
        if (contactNumber) profileUpdates.contactNumber = contactNumber;
        if (gender) profileUpdates.gender = gender;

        // Update the user details
        await User.findByIdAndUpdate(userId, userUpdates, { new: true });

        // Update the profile details
        await Profile.findByIdAndUpdate(user.additionalDetails, profileUpdates, { new: true });

        // Retrieve updated user details with the populated profile
        const updatedUserDetails = await User.findById(userId)
            .populate("additionalDetails").select("-password")
            .exec();

        // Send a success response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the profile",
            error: error.message,
        });
    }
};



exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id
        console.log(id)
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
        })
        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnroled: id } },
                { new: true }
            )
        }
        // Now Delete User
        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
        await CourseProgress.deleteMany({ userId: id })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "User Cannot be deleted successfully" })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails").select("-password")
            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// exports.getEnrolledCourses = async (req, res) => {
//     try {
//         const userId = req.user.id
//         let userDetails = await User.findOne({
//             _id: userId,
//         })
//             .populate({
//                 path: "courses",
//                 populate: {
//                     path: "courseContent",
//                     populate: {
//                         path: "subSection",
//                     },
//                 },
//             })
//             .exec()
//         userDetails = userDetails.toObject()
//         var SubsectionLength = 0
//         for (var i = 0; i < userDetails.courses.length; i++) {
//             let totalDurationInSeconds = 0
//             SubsectionLength = 0
//             for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
//                 totalDurationInSeconds += userDetails.courses[i].courseContent[
//                     j
//                 ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
//                 userDetails.courses[i].totalDuration = convertSecondsToDuration(
//                     totalDurationInSeconds
//                 )
//                 SubsectionLength +=
//                     userDetails.courses[i].courseContent[j].subSection.length
//             }
//             let courseProgressCount = await CourseProgress.findOne({
//                 courseID: userDetails.courses[i]._id,
//                 userId: userId,
//             })
//             courseProgressCount = courseProgressCount?.completedVideos.length
//             if (SubsectionLength === 0) {
//                 userDetails.courses[i].progressPercentage = 100
//             } else {
//                 // To make it up to 2 decimal point
//                 const multiplier = Math.pow(10, 2)
//                 userDetails.courses[i].progressPercentage =
//                     Math.round(
//                         (courseProgressCount / SubsectionLength) * 100 * multiplier
//                     ) / multiplier
//             }
//         }

//         if (!userDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Could not find user with id: ${userDetails}`,
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             data: userDetails.courses,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

// exports.instructorDashboard = async (req, res) => {
//     try {
//         const courseDetails = await Course.find({ instructor: req.user.id })

//         const courseData = courseDetails.map((course) => {
//             const totalStudentsEnrolled = course.studentsEnroled.length
//             const totalAmountGenerated = totalStudentsEnrolled * course.price

//             // Create a new object with the additional fields
//             const courseDataWithStats = {
//                 _id: course._id,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 // Include other course properties as needed
//                 totalStudentsEnrolled,
//                 totalAmountGenerated,
//             }

//             return courseDataWithStats
//         })

//         res.status(200).json({ courses: courseData })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Server Error" })
//     }
// }