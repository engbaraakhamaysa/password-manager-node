import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models/User";
import { generateToken } from "../helpers/generateToken";

// ==========================================================
// Register User
// Creates a new user account
// Returns JWT token after successful registration
// ==========================================================
export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email, password, role } = req.body;

  // ==========================================================
  // Required Fields Validation
  // ==========================================================
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  // ==========================================================
  // Name Validation
  // ==========================================================
  if (name.trim().length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters",
    });
  }

  // ==========================================================
  // Email Validation
  // ==========================================================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // ==========================================================
  // Password Validation
  // ==========================================================
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  try {
    // ==========================================================
    // Check if Email Already Exists
    // ==========================================================
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // ==========================================================
    // Hash Password
    // ==========================================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================================================
    // Create New User
    // ==========================================================
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ==========================================================
    // Generate JWT Token
    // ==========================================================
    const token = generateToken(user);

    return res.status(201).json({
      message: "Registration successful",
      data: token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Login User
// Verifies credentials and returns JWT token
// ==========================================================
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // ==========================================================
  // Required Fields Validation
  // ==========================================================
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // ==========================================================
    // Find User by Email
    // ==========================================================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================================
    // Compare Password
    // ==========================================================
    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ==========================================================
    // Generate JWT Token
    // ==========================================================
    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
