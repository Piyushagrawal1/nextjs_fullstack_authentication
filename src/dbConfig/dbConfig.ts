import { error } from "console";
import mongoose from "mongoose";

export const connectDB = async()=> {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connect = mongoose.connection

        connect.on("connected", () => {
            console.log("MongoDB connected successfully");
        })

        connect.on('error', () => {
            console.log("MongoDB connection error, Please make sure db is up and running: " + error);
            process.exit(1)
        })
    } catch (error) {
        console.log("MONGODB connection FAILEd ", error);
        process.exit(1)
    }
}