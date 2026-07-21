// ==========================================================
// User Controller
// ==========================================================
// Responsible for:
// - Managing users (Admin)
// - Managing user profile
// - Changing passwords
//
// Authentication is handled by protect middleware.
// Authorization is handled by admin middleware.
// ==========================================================

import { Request, Response } from "express";

import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import { User, UserRole, UserStatus } from "../models/User.js";

// ==========================================================
// Get All Users
// ==========================================================
// Admin only
// ==========================================================

export const getUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await User.find();

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get User By ID
// ==========================================================
// Admin only
// ==========================================================

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update User
// ==========================================================
// Admin only
// ==========================================================

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  const { name, email, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,

      {
        ...(name && { name }),

        ...(email && {
          email: email.toLowerCase(),
        }),

        ...(role && { role }),
      },

      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Delete User
// ==========================================================
// Admin only
// ==========================================================

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get Current User Profile
// ==========================================================

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findById(req.user!.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update Current User Profile
// ==========================================================

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user!.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) {
      if (name.trim().length < 3) {
        return res.status(400).json({
          message: "Name must be at least 3 characters",
        });
      }

      user.name = name;
    }

    if (email) {
      const emailExists = await User.findOne({
        email: email.toLowerCase(),

        _id: {
          $ne: req.user!.id,
        },
      });

      if (emailExists) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      user.email = email.toLowerCase();
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",

      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update User Status
// ==========================================================
// Admin only
// ==========================================================

export const updateUserStatus = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { status } = req.body;

  if (!Object.values(UserStatus).includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,

      {
        status,
      },

      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User status updated",

      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Change Password
// ==========================================================

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Current password and new password are required",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      message: "New password must be at least 8 characters",
    });
  }

  try {
    const user = await User.findById(req.user!.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matched = await bcrypt.compare(
      currentPassword,

      user.password,
    );

    if (!matched) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,

      10,
    );

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
