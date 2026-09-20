const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await
            mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb is connected")

    }
    catch (error) {
        console.log("connection to datbase failed", error.message);
        process.exit(1);

    }
};

module.exports = connectDB;