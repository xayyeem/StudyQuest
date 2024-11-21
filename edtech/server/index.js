const express = require('express');
const mongoose = require('mongoose');
const ProfileRoutes = require('./route/Profile');
const PaymentRoutes = require('./route/Payments');
const CourseRoutes = require('./route/Course');
const UserRoutes = require('./route/user');
require('dotenv').config();
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const { cloudConnect } = require('./config/fileUpload');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// Port 
const PORT = process.env.PORT || 4000;

// Database connection
dbConnect();

// Middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/',
    createParentPath: true,
}));
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : /http:\/\/localhost:\d+/,
    credentials: true
}));

// Cloudinary connection
cloudConnect();

// Route mounting
app.use('/api/v1/auth', UserRoutes);
app.use('/api/v1/payment', PaymentRoutes);
app.use('/api/v1/courses', CourseRoutes);
app.use('/api/v1/profile', ProfileRoutes);

// Root route
app.get('/', (req, res) => {
    return res.json({
        message: 'Server is up and running'
    });
});

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
