const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middleware/auth"); // Corrected path
const {
    deleteAccount,
    updateProfile,
    getAllProfile,
    updateDisplayPicture
} = require("../controller/Profle"); // Corrected path

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getAllProfile", auth, getAllProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router;
