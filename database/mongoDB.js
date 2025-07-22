import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);

    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};
