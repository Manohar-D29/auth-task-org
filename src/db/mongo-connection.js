import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log(`Mongo DB connected to : ${instance.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};
