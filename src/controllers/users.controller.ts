// ==========================================================
// User Controller
// ==========================================================
// Responsible for handling user-related HTTP requests.
//
// Responsibilities:
// - Receive request data
// - Call user service layer
// - Return HTTP responses
//
// Database operations are handled inside services.
// Authentication is handled by protect middleware.
// ==========================================================

import { Request, Response } from "express";

import {
  getProfileService,
  updateProfileService,
  changePasswordService,
  deleteAccountService,
} from "../service/user.service.js";

import { UpdateProfileBody, ChangePasswordBody } from "../types/user.types.js";

// ==========================================================
// Get Current User Profile
// ==========================================================
// Authenticated users only.
//
// Retrieves the profile of the currently authenticated user.
// ==========================================================

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user!.id;

    const user = await getProfileService(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update Current User Profile
// ==========================================================
// Authenticated users only.
//
// Updates:
// - name
// - email
//
// Users cannot update their own:
// - role
// - status
// - password
// ==========================================================

export const updateProfile = async (
  req: Request<{}, {}, UpdateProfileBody>,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user!.id;

    const user = await updateProfileService(userId, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// ==========================================================
// Change Password
// ==========================================================
// Authenticated users only.
//
// Requires:
// - currentPassword
// - newPassword
// ==========================================================

export const changePassword = async (
  req: Request<{}, {}, ChangePasswordBody>,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user!.id;

    const user = await changePasswordService(userId, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CURRENT_PASSWORD_INCORRECT"
    ) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Delete Current User Account
// ==========================================================
// Authenticated users only.
//
// Permanently deletes the authenticated user's account.
// ==========================================================

export const deleteAccount = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user!.id;

    const user = await deleteAccountService(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
