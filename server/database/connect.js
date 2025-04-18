import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};
