// ==========================================================
// Admin Validators
// ==========================================================
// Responsible for validating admin operation inputs.
//
// Responsibilities:
// - Validate user IDs
// - Validate user update data
// - Validate user account status
//
// Notes:
// - Does not communicate with the database.
// - Does not modify request data.
// - Returns a validation error message when invalid.
// - Returns null when validation succeeds.
// ==========================================================

import {
  UserIdParams,
  UpdateUserBody,
  UpdateUserStatusBody,
} from "../types/admin.type.js";

// ==========================================================
// Validate MongoDB ObjectId
// ==========================================================
// Validates request params for routes containing:
//
// /users/:id
//
// Example:
// {
//   id: "507f1f77bcf86cd799439011"
// }
// ==========================================================

export const validateUserId = (data: unknown): string | null => {
  // Ensure data is an object
  if (typeof data !== "object" || data === null) {
    return "Invalid user id";
  }

  // Convert unknown data into a record
  const params = data as UserIdParams;

  // Validate MongoDB ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(params.id)) {
    return "Invalid user id";
  }

  return null;
};

// ==========================================================
// Validate Update User Data
// ==========================================================
// Validates:
//
// - name
// - email
// - role
//
// All fields are optional because the admin can update
// one or more user properties.
// ==========================================================

export const validateUpdateUser = (data: unknown): string | null => {
  // Ensure data is an object
  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  // Convert unknown data into typed request body
  const userData = data as UpdateUserBody;

  // ========================================================
  // Validate Name
  // ========================================================

  if (userData.name !== undefined) {
    if (typeof userData.name !== "string") {
      return "Name must be a string";
    }

    if (userData.name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }
  }

  // ========================================================
  // Validate Email
  // ========================================================

  if (userData.email !== undefined) {
    if (typeof userData.email !== "string") {
      return "Email must be a string";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userData.email)) {
      return "Invalid email format";
    }
  }

  // ========================================================
  // Validate Role
  // ========================================================

  if (userData.role !== undefined) {
    if (userData.role !== "user" && userData.role !== "admin") {
      return "Invalid role";
    }
  }

  return null;
};

// ==========================================================
// Validate User Status
// ==========================================================
// Validates account status.
//
// Allowed values:
// - active
// - blocked
// ==========================================================

export const validateUserStatus = (data: unknown): string | null => {
  // Ensure data is an object
  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  // Convert unknown data into typed request body
  const statusData = data as UpdateUserStatusBody;

  // ========================================================
  // Validate Status
  // ========================================================

  if (statusData.status !== "active" && statusData.status !== "blocked") {
    return "Invalid status";
  }

  return null;
};
