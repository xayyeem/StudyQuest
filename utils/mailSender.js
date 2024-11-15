const nodemailer = require('nodemailer')


const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from: '"No-Reply" <' + process.env.MAIL_USER + '>', // sender address
            to: email,
            subject: title,
            text: body
        })
        console.log(info)
        return info
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = mailSender