const mongoose = require("mongoose");

// Connect to MongoDB
const connectDatabase = async () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error(
            "MONGODB_URI is not defined. Check your environment variables."
        );
    }

    await mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
};

module.exports = connectDatabase;