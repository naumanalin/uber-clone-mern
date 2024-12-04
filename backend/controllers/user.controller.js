const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    if(!fullname || !email || !password){
        return res.status(401).json({success:false, message:"All fields are required!"})
    }
    try {
        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists, you can login"
            });
        }

        const hashedPassword = await userModel.hashPassword(password);

        // Create a new user
        const newUser = new userModel({
            fullname: {
                firstname: fullname.firstname,
                secondname: fullname.secondname
            },
            email,
            password: hashedPassword
        });


        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        // const token = newUser.generateAuthToken();

        // Respond with success message and token
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            email: newUser.email,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while registering the user"
        });
    }
};

// ----------------------------------------------------------------------------------------------------------

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password did not match" });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while logging in",
        });
    }
};


// --------------------------------------------------------------------------------------------------------

module.exports = {
    registerUser,
    loginUser
}