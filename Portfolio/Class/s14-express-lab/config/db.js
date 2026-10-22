import mongoose from "mongoose";

export const connectDB = async (mongoUrl) => {
    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Failed: ${error.message}`);
        process.exit(1);
    }
};