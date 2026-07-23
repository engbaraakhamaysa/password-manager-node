// ==========================================================
// User Service
// ==========================================================
// Responsible for user-related database operations.
//
// Responsibilities:
// - Communicate with User model
// - Execute database queries
// - Update user profile
// - Change user password
// - Delete user account
//
// Controllers should not contain database logic.
// ==========================================================

import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

import {
  ChangePasswordBody,
  IUser,
  UpdateProfileBody,
} from "../types/user.types.js";

// ==========================================================
// Get Current User Profile
// ==========================================================
// Retrieves the authenticated user's profile.
//
// @param userId - Authenticated user's ID
// @returns User document or null
// ==========================================================

export const getProfileService = async (
  userId: string,
): Promise<IUser | null> => {
  const user = await User.findById(userId);

  return user;
};

// ==========================================================
// Update Current User Profile
// ==========================================================
// Updates the authenticated user's profile.
//
// Editable fields:
// - name
// - email
//
// The service also checks whether the new email
// already belongs to another user.
//
// Returns:
// - Updated user
// - null if user does not exist
//
// Throws:
// - EMAIL_ALREADY_EXISTS if email is already used
// ==========================================================

export const updateProfileService = async (
  userId: string,
  data: UpdateProfileBody,
): Promise<IUser | null> => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  // ========================================================
  // Update Name
  // ========================================================

  if (data.name !== undefined) {
    user.name = data.name;
  }

  // ========================================================
  // Update Email
  // ========================================================

  if (data.email !== undefined) {
    const email = data.email.toLowerCase();

    // Check if email belongs to another user
    const emailExists = await User.findOne({
      email,
      _id: {
        $ne: userId,
      },
    });

    if (emailExists) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    user.email = email;
  }

  // ========================================================
  // Save Changes
  // ========================================================

  await user.save();

  return user;
};
// ==========================================================
// Change Password
// ==========================================================
// Changes the authenticated user's password.
//
// The current password must be verified before
// saving the new password.
//
// @param userId - Authenticated user's ID
// @param data - Current and new password
// @returns Updated user or null
// ==========================================================

export const changePasswordService = async (
  userId: string,
  data: ChangePasswordBody,
): Promise<IUser | null> => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    data.currentPassword,
    user.password,
  );

  if (!passwordMatches) {
    throw new Error("CURRENT_PASSWORD_INCORRECT");
  }

  user.password = await bcrypt.hash(data.newPassword, 10);

  await user.save();

  return user;
};

// ==========================================================
// Delete Current User Account
// ==========================================================
// Permanently deletes the authenticated user's account.
//
// @param userId - Authenticated user's ID
// @returns Deleted user or null
// ==========================================================

export const deleteAccountService = async (
  userId: string,
): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(userId);

  return user;
};
