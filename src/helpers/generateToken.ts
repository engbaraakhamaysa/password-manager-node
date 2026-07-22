// ==========================================================
// JWT Token Helper
// ==========================================================
// Responsible for:
// - Creating JWT access tokens
// - Storing user identity information inside token
//
// Token contains:
// - User ID
// - Name
// - Email
// - Role
//
// JWT_SECRET must exist in environment variables.
// ==========================================================

import jwt from "jsonwebtoken";

import { IUser } from "../types/user.types.js";

// ==========================================================
// Generate JWT Token
// ==========================================================

export const generateToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      id: user._id.toString(),

      name: user.name,

      email: user.email,

      role: user.role,
    },

    secret,

    {
      expiresIn: "7d",
    },
  );
};
