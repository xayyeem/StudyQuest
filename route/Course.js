const express = require("express");
const router = express.Router();

// Import the Course Controller functions
const { createCourse, getCourseDetails } = require("../controller/Course");
const { createSection, updateSection, deleteSection } = require("../controller/Section");
const { createSubsection, updateSubSection } = require("../controller/Subsection");
const { createRating, getAverageRating, getAllRating } = require("../controller/RatingAndReview");
const { createCategories, showAllCategories, catageryPageDetails } = require('../controller/Categories')

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth");

// Courses Routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/getCourseDetails", getCourseDetails);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// categories
router.post('/createcategory', auth, isAdmin, createCategories)

router.get('/showallcategories', showAllCategories)

// Ratings and Reviews Routes
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
