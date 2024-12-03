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

const loginUser = async (req, res, next)=>{
    console.log('first')
}


// --------------------------------------------------------------------------------------------------------

module.exports = {
    registerUser,
    loginUser
}