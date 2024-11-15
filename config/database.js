const mongoose = require('mongoose')
require('dotenv').config()
exports.dbConnect = async (req, res) => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('connected to database')
    }).catch((e) => {
        console.log('error connecting to database')
        console.log(e.message)
        process.exit(1)
    })
}