// ==========================================================
// Admin Controller
// ==========================================================
// Responsible for handling admin-related HTTP requests.
//
// Responsibilities:
// - Receive request data
// - Call service layer
// - Return HTTP responses
//
// Database operations are handled inside services.
// Validation is handled separately.
// ==========================================================

import { Request, Response } from "express";

import {
  deleteUserService,
  getAllUsers,
  getUserByIdService,
  updateUserService,
  updateUserStatusService,
} from "../service/admin.service";

import { UpdateUserBody, UpdateUserStatusBody } from "../types/admin.type.js";

// ==========================================================
// Get All Users
// ==========================================================
// Admin only
//
// Retrieves all users from database.
//
// Flow:
// Route
//   ↓
// Controller
//   ↓
// Admin Service
//   ↓
// Database
// ==========================================================

export const getUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await getAllUsers();

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
//
// Retrieves a single user using MongoDB ObjectId.
// ==========================================================

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error("Get user by id error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update User
// ==========================================================
// Admin only
//
// Updates user information:
// - Name
// - Email
// - Role
//
// Request body is typed using UpdateUserBody.
// ==========================================================

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserBody>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  const { name, email, role } = req.body;

  try {
    const user = await updateUserService(id, {
      name,
      email,
      role,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Delete User
// ==========================================================
// Admin only
//
// Permanently removes user from database.
// ==========================================================

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await deleteUserService(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update User Status
// ==========================================================
// Admin only
//
// Changes user account status:
// - active
// - blocked
//
// Request body is typed using UpdateUserStatusBody.
// ==========================================================

export const updateUserStatus = async (
  req: Request<{ id: string }, {}, UpdateUserStatusBody>,
  res: Response,
): Promise<Response> => {
  const { status } = req.body;

  try {
    const user = await updateUserStatusService(req.params.id, status);

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
    console.error("Update user status error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
