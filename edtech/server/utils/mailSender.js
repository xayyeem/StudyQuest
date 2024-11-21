const nodemailer = require('nodemailer')

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: `"No-Reply" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,  
        });

        console.log("Mail Send Response:", info);
        return info;
    } catch (error) {
        console.error("Mail Send Error:", error);
        throw error;  // Re-throw to handle in calling function
    }
};

module.exports = mailSender;