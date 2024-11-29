const User = require("../model/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;  //login user
        const user = await User.findOne({ email: email });  // find email
        if (!user) {   //if user not exist
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        const token = crypto.randomBytes(20).toString("hex");  //generate a random token
        console.log("TOKEN", token);  //for testing purpose

        const updatedDetails = await User.findOneAndUpdate(  //update details based on email
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,  //expires in 1hr 
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`; //frontend url

        await mailSender(  //mail sender
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const { token } = req.params; // Extract the token from req.params

        // Check if password and confirm password match
        if (confirmPassword !== password) {
            return res.json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        // Find the user with the provided token
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid",
            });
        }

        // Check if the token has expired
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: "Token is expired, please regenerate your token",
            });
        }

        // Encrypt the new password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await User.findOneAndUpdate(
            { token: token },
            { password: encryptedPassword },
            { new: true }
        );

        // Respond with success
        res.json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        // Handle errors
        return res.json({
            error: error.message,
            success: false,
            message: "Some error occurred while updating the password",
        });
    }
};
