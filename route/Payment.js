const express = require('express');
const router = express.Router();

const { capturePayment, verifySignature } = require('../controller/Payment'); // Corrected path
const { auth, isStudent, isInstructor, isAdmin } = require('../middleware/auth'); // Corrected path

router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifySignature', verifySignature);

module.exports = router;
