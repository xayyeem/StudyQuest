// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
    createCourse,
    showAllCourses,
    getCourseDetails,
} = require("../controller/Course")


// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controller/Categories")

// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controller/Section")

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controller/Subsection")

// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controller/RatingAndReview")

const {
    updateCourseProgress
} = require("../controller/courseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")


// Courses can Only be Created by Instructors

router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails/:courseId", getCourseDetails)
// Get Details for a Specific Courses


router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Category can Only be Created by Admin

// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews", getAllRating)

module.exports = router


