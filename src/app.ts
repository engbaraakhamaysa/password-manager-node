// ==========================================================
// Express Application Configuration
// ==========================================================
// This file is responsible for:
// - Creating Express application
// - Registering middlewares
// - Registering API routes
//
// Note:
// Server startup and database connection
// are handled in server.ts
// ==========================================================

import express from "express";
import cors from "cors";

// ==========================================================
// Routes
// ==========================================================

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// ==========================================================
// Initialize Express Application
// ==========================================================

const app = express();

// ==========================================================
// Global Middlewares
// ==========================================================

// Enable Cross-Origin Resource Sharing
// Allows frontend applications to communicate with API

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);

// Parse incoming JSON requests

app.use(express.json());

// ==========================================================
// Health Check Endpoint
// ==========================================================
// Used to verify that backend service is running
// ==========================================================

app.get("/", (_req, res) => {
  res.json({
    message: "Backend is running",
  });
});

// ==========================================================
// API Routes
// ==========================================================

// User Management Routes

app.use("/api/users", userRoutes);

// Authentication Routes

app.use("/api/auth", authRoutes);

// Password Management Routes

app.use("/api/password", passwordRoutes);

// Admin Management Routes

app.use("/api/admin", adminRoutes);

// ==========================================================
// Export Express Application
// ==========================================================
// Used by:
// - server.ts
// - Testing framework (Jasmine)
// ==========================================================

export default app;
