const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');




// --------------------------------------------------------------------------------------------------------------------------
const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }

    const { fullname, email, password, vehicle, location } = req.body;

    if (
        !fullname?.firstname ||
        !email ||
        !password ||
        !vehicle?.color ||
        !vehicle?.plate ||
        !vehicle?.capacity ||
        !vehicle?.vehicleType
    ) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Check if the captain already exists
        const isCaptainExist = await captainModel.findOne({ email });
        if (isCaptainExist) {
            return res.status(400).json({ success: false, message: "Captain already exists, you can login" });
        }

        // Hash the password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create the new captain object
        const newCaptain = new captainModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname || '', // Optional lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType,
            },
            location: {
                ltd: location?.ltd || null, // Optional latitude
                lng: location?.lng || null, // Optional longitude
            },
        });

        // Save the captain to the database
        await newCaptain.save();

        return res.status(201).json({
            success: true,
            message: `Captain account created successfully with email: ${email}`,
            captain: newCaptain,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while registering the user",
        });
    }
};

// --------------------------------------------------------------------------------------------------------------------------
const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required to login'
        });
    }

    try {
        // Find captain by email
        const captain = await captainModel.findOne({ email }).select('+password'); // Explicitly select password
        if (!captain) {
            return res.status(404).json({
                success: false,
                message: "Captain not found with this email"
            });
        }

        // Compare passwords
        const isPasswordMatch = await captain.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password did not match"
            });
        }

        // Generate authentication token
        const token = captain.generateAuthToken();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            captain: {
                id: captain._id,
                fullname: captain.fullname,
                email: captain.email,
                vehicle: captain.vehicle,
                location: captain.location,
                status: captain.status,
                socketId: captain.socketId,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};

// --------------------------------------------------------------------------------------------------------------------------
const getCaptainProfile = async (req, res, next) => {
    if (!req.captain) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    return res.status(200).json({ success: true, captain: req.captain });
};

// --------------------------------------------------------------------------------------------------------------------------
const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ success: false, message: "No token provided" });
        }

        // Blacklist the token
        await blackListTokenModel.create({ token });

        // Clear the cookie
        res.clearCookie('token');

        return res.status(200).json({ success: true, message: "Logout successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred during logout" });
    }
};

// --------------------------------------------------------------------------------------------------------------------------

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}