// ==========================================================
// Admin Service
// ==========================================================
// Responsible for admin database operations.
//
// Responsibilities:
// - Communicate with User model
// - Execute database queries
// - Return database results
//
// Controllers should not contain database logic.
// ==========================================================

import { User } from "../models/User.js";

import { IUser } from "../types/user.types.js";
import { UpdateUserBody, UserStatus } from "../types/admin.type.js";

// ==========================================================
// Get All Users
// ==========================================================
// Retrieves all users from database.
// ==========================================================

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find();

  return users;
};

// ==========================================================
// Get User By ID
// ==========================================================
// Retrieves single user using id.
// ==========================================================

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);

  return user;
};

// ==========================================================
// Update User
// ==========================================================
// Updates user information.
//
// Editable fields:
// - name
// - email
// - role
// ==========================================================

export const updateUserService = async (
  id: string,
  data: UpdateUserBody,
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(
    id,

    {
      ...(data.name && {
        name: data.name,
      }),

      ...(data.email && {
        email: data.email.toLowerCase(),
      }),

      ...(data.role && {
        role: data.role,
      }),
    },

    {
      new: true,
    },
  );

  return user;
};

// ==========================================================
// Delete User
// ==========================================================
// Permanently deletes user.
// ==========================================================

export const deleteUserService = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id);

  return user;
};

// ==========================================================
// Update User Status
// ==========================================================
// Updates user account status.
//
// Available:
// - active
// - blocked
// ==========================================================

export const updateUserStatusService = async (
  id: string,
  status: UserStatus,
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(
    id,

    {
      status,
    },

    {
      new: true,
    },
  );

  return user;
};
