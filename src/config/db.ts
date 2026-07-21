// ==========================================================
// Database Connection Configuration
// ==========================================================
// Responsible for:
// - Connecting application with MongoDB
// - Handling database connection errors
// ==========================================================

import mongoose from "mongoose";

// ==========================================================
// Connect MongoDB Database
// ==========================================================

export const connectDB = async (): Promise<void> => {
  try {
    // Check MongoDB connection string

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI environment variable is missing");
    }

    // Establish MongoDB connection

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    throw error;
  }
};
