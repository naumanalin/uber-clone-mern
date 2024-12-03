const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "uber-clone-micoroservices",
            useNewUrlParser: true, // Ensures the new connection string parser is used.
            useUnifiedTopology: true, // Enables the new Server Discover and Monitoring engine.
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure if connection fails
    }
};


module.exports = connectToDB