const cloudinary = require('cloudinary')
require('dotenv').config()
exports.cloudConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET

        })
    } catch (error) {
        console.log('error while fileupload setup', error.message)
    }
}