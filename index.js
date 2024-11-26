const express = require("express");
const app = express();

const userRoutes = require("./route/user");
const profileRoutes = require("./route/Profile");
const paymentRoutes = require("./route/Payment");
const courseRoutes = require("./route/Course");
// const contactUsRoute = require("./route/Contact");
const { dbConnect } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudConnect } = require("./config/fileUpload");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect

dbConnect()

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)
//cloudinary connection
cloudConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})