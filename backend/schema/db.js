import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


let isConnected = false;

 const connectDB = async () => {
    if (isConnected) {
        console.log('✅ Using existing MongoDB connection');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.URI);
        isConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
export default connectDB;


