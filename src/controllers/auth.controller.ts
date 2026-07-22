// ==========================================================
// Authentication Controller
// ==========================================================
// Responsible for:
// - Register new users
// - Authenticate existing users
// - Generate JWT tokens
// ==========================================================

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, UserRole, UserStatus } from "../models/User.js";

import { generateToken } from "../helpers/generateToken.js";

// ==========================================================
// Register User
// ==========================================================

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email, password } = req.body;

  // ========================================================
  // Validate Request Data
  // ========================================================

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  try {
    // ======================================================
    // Check Existing User
    // ======================================================

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // ======================================================
    // Hash Password
    // ======================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ======================================================
    // Create User
    // ======================================================

    const user = await User.create({
      name,

      email,

      password: hashedPassword,

      role: UserRole.USER,
    });

    // ======================================================
    // Generate Token
    // ======================================================

    const token = generateToken(user);

    return res.status(201).json({
      message: "Registration successful",

      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Login User
// ==========================================================

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.status === UserStatus.BLOCKED) {
      return res.status(403).json({
        message: "Your account has been blocked",
      });
    }

    const isMatch = await bcrypt.compare(
      password,

      user.password,
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",

      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
