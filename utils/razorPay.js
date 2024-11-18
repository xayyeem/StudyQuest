const razorPay = require('razorpay')

exports.instance = new razorpay({
    key_id: 'your_key_id',
    key_secret: 'your_key_secret',
})
