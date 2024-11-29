const express = require("express")
const router = express.Router()
const { auth, isInstructor, isStudent } = require("../middleware/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
} = require("../controller/Profle")

// Delet User Account
router.delete("/deleteProfile", auth, isStudent, deleteAccount)
// Update User Profile
router.put("/updateProfile", auth, updateProfile)
// Get User Details
router.get("/getAllUserDetails", auth, getAllUserDetails)
// Update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
module.exports = router
















// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
