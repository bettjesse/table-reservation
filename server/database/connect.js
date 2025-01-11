import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); 
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error(`Mongo connection error: ${err.message}`);
  }
};

export default connectDatabase;
