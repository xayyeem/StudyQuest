const { instance } = require('../utils/razorPay')
const course = require('../model/Course')
const crypto = require('crypto')
const user = require('../model/user')
// course mai enroll kar chuke hai to uske liye
const mailSender = require('../utils/mailSender')
// template for course enrollment
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')


// capture payment and initiate rayzorpay order

exports.capturePayment = async (req, res) => {
    try {
        // get courseid and userid
        const { courseId } = req.body
        const { userId } = req.user.id
        // validation
        if (!courseId) {
            return res.status(400).json({ message: 'Invalid course or user' })
        }
        // check for valid course details
        let course;
        try {
            course = await course.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found', success: false })
            }
            // user already paid for this course
            const uid = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    message: 'User already enrolled for this course',
                    success: false
                })
            }

        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }
        // order create
        const options = {
            amount: course.price * 100,
            currency: 'INR',
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId
            },
            payment_capture: 1
        }
        try {
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse)
            // return res
            return res.status(200).json({
                message: 'Payment initiated successfully',
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.orderId,
                currency: paymentResponse.currency,
                amount: course.price,
            })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }

        // const options = await instance.orders.create({
        //     amount: amount * 100,
        //     currency,
        //     receipt: Math.random(Date.now()).toString(),
        //     notes: {
        //         courseId: courseId,
        //         userId
        //     },
        //     payment_capture: 1
        // })
        //  return res
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


// verify signature

exports.verifySignature = async (req, res) => {
    const webHookSecret = '123456789'

    const signature = req.header['x-razorpay-signature']

    const shasum = crypto.createHmac('sha256', webHookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    if (signature === digest) {
        console.log('payment is authorised key match')
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {
            // fulfil action
            // find the course and eroll the student in it
            const enrolledCourse = await course.findOneAndUpdate({ _id: courseId }, { $push: { studentsEnrolled: userId } }, { new: true })
            if (!enrolledCourse) {
                return res.status(500).json({ message: 'Failed to update course', success: false })
            }
            console.log(enrolledCourse)
            // find the student and course in their list enrolled course me
            const enrolledStudent = await user.findOneAndUpdate({ _id: userId }, { $push: { courses: courseId } }, { new: true })
            console.log(enrolledStudent)
            if (!enrolledStudent) {
                return res.status(500).json({ message: 'Failed to update user', success: false })
            }
            console.log(enrolledStudent)
            // confirmation mail send 
            const emailResponse = await mailSender(
                enrolledStudent.email,
                'congractualation',
                'studyquest'
            )
            console.log(emailResponse)
            res.status(200).json({
                message: 'Payment successful and course enrolled',
                success: true,

            })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }
    } else {
        console.log('payment is not authorised key mismatch')
        res.status(401).json({ message: 'Payment signature mismatch', success: false })
    }
}