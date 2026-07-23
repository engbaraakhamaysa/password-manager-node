// ==========================================================
// User Validators
// ==========================================================
// Responsible for validating user-related request data.
//
// Responsibilities:
// - Validate profile update data
// - Validate password change data
//
// Does not communicate with database.
// Does not modify request data.
// ==========================================================

import { UpdateProfileBody, ChangePasswordBody } from "../types/user.types.js";

// ==========================================================
// Validate Update Profile
// ==========================================================
// Validates:
//
// - name
// - email
//
// Both fields are optional because the user can update
// one field without updating the other.
//
// Returns:
// - Error message when validation fails
// - null when validation succeeds
// ==========================================================

export const validateUpdateProfile = (data: unknown): string | null => {
  // ========================================================
  // Validate Request Body
  // ========================================================

  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const profileData = data as UpdateProfileBody;

  // ========================================================
  // Validate Name
  // ========================================================

  if (profileData.name !== undefined) {
    if (typeof profileData.name !== "string") {
      return "Name must be a string";
    }

    if (profileData.name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }
  }

  // ========================================================
  // Validate Email
  // ========================================================

  if (profileData.email !== undefined) {
    if (typeof profileData.email !== "string") {
      return "Email must be a string";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(profileData.email)) {
      return "Invalid email format";
    }
  }

  return null;
};

// ==========================================================
// Validate Change Password
// ==========================================================
// Validates:
//
// - currentPassword
// - newPassword
//
// Rules:
// - Both passwords are required
// - Both passwords must be strings
// - New password must contain at least 8 characters
//
// Returns:
// - Error message when validation fails
// - null when validation succeeds
// ==========================================================

export const validateChangePassword = (data: unknown): string | null => {
  // ========================================================
  // Validate Request Body
  // ========================================================

  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const passwordData = data as ChangePasswordBody;

  // ========================================================
  // Validate Current Password
  // ========================================================

  if (passwordData.currentPassword === undefined) {
    return "Current password is required";
  }

  if (typeof passwordData.currentPassword !== "string") {
    return "Current password must be a string";
  }

  if (passwordData.currentPassword.length === 0) {
    return "Current password is required";
  }

  // ========================================================
  // Validate New Password
  // ========================================================

  if (passwordData.newPassword === undefined) {
    return "New password is required";
  }

  if (typeof passwordData.newPassword !== "string") {
    return "New password must be a string";
  }

  if (passwordData.newPassword.length === 0) {
    return "New password is required";
  }

  if (passwordData.newPassword.length < 8) {
    return "New password must be at least 8 characters";
  }

  return null;
};
