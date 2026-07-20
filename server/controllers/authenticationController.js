const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up
const signUp = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const hashPassword = await bcrypt.hash(password, 10);   // Salt length is 10 => Salt is hash number which is used to encrypt password

    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    try {
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
});

// Sign In
const signIn = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new ErrorHandler("Please enter all fields", 400));
        }

        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isPasswordMatched = await bcrypt.compare(password, validUser.password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: password1, ...rest } = validUser._doc;

        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000), secure: true })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                user: rest
            });
    } catch (error) {
        return next(error);
    }

});




module.exports = {
    signUp,
    signIn
};