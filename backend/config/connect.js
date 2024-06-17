import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connection successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDB;
