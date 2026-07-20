const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/user", userRoutes);
const authRoutes = require("./routes/authenticationRoutes.js");
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        const validationMessages = Object.values(err.errors).map((error) => error.message);
        message = validationMessages.join(", ");
        return res.status(400).json({ success: false, statusCode: 400, message });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `A user with that ${field} already exists`;
        return res.status(409).json({ success: false, statusCode: 409, message });
    }

    return res.status(statusCode).json({ success: false, statusCode, message });
});

module.exports = app
