// ==========================================================
// Application Server Entry Point
// ==========================================================
// Responsible for:
// - Loading environment variables
// - Connecting database
// - Starting Express server
// ==========================================================

import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

// ==========================================================
// Server Configuration
// ==========================================================

const PORT = process.env.PORT || 5000;

// ==========================================================
// Start Application
// ==========================================================

const startServer = async (): Promise<void> => {
  try {
    // Connect database before starting server

    await connectDB();

    // Start Express server

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);

    process.exit(1);
  }
};

// ==========================================================
// Initialize Server
// ==========================================================

startServer();
