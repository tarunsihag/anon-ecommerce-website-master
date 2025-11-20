import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error.message);
    console.log("Server will continue without database. Please check your MongoDB credentials.");
    // Don't exit, allow server to continue
  }
};
