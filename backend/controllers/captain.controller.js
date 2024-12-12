const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');




// --------------------------------------------------------------------------------------------------------------------------
const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
const loginCaptain = async (req, res, next)=>{

}
// --------------------------------------------------------------------------------------------------------------------------
const getCaptainProfile = async (req, res, next)=>{

}
// --------------------------------------------------------------------------------------------------------------------------
const logoutCaptain = async (req, res, next)=>{

}
// --------------------------------------------------------------------------------------------------------------------------

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}