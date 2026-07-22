// ==========================================================
// Authentication Middleware
// ==========================================================
// Responsible for:
// - Extracting JWT token from Authorization header
// - Verifying token validity
// - Loading authenticated user
// - Blocking inactive accounts
//
// Used to protect private routes.
// ==========================================================

import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { User, UserStatus } from "../models/User.js";

// ==========================================================
// JWT Payload Interface
// ==========================================================

interface JwtPayload {
  id: string;
}

// ==========================================================
// Protect Middleware
// ==========================================================

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // ========================================================
  // Check Authorization Header
  // ========================================================

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Authentication token is required",
    });

    return;
  }

  // ========================================================
  // Extract Bearer Token
  // ========================================================

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    res.status(401).json({
      message: "Invalid token format",
    });

    return;
  }

  try {
    // ======================================================
    // Verify JWT Token
    // ======================================================

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // ======================================================
    // Find User
    // ======================================================

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });

      return;
    }

    // ======================================================
    // Check User Status
    // ======================================================

    if (user.status === UserStatus.BLOCKED) {
      res.status(403).json({
        message: "Account is blocked",
      });

      return;
    }

    // ======================================================
    // Attach User Data To Request
    // ======================================================

    req.user = {
      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
