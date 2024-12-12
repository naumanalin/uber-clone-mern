const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is required for authentication' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Token is blacklisted' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware/controller
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Unauthorized. Token has expired' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token' });
        }

        // Log unexpected errors
        console.error('Authentication Error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
    }
};
