// ==========================================================
// Admin Validators
// ==========================================================
// Responsible for validating admin operations input.
//
// Does not communicate with database.
// Only checks request data.
// ==========================================================

import { UserRole, UserStatus } from "../types/admin.type.js";

// ==========================================================
// Validate MongoDB ObjectId
// ==========================================================

export const validateUserId = (data: { id: string }): string | null => {
  if (!/^[0-9a-fA-F]{24}$/.test(data.id)) {
    return "Invalid user id";
  }

  return null;
};

// ==========================================================
// Validate Update User Data
// ==========================================================
// Validates:
// - name
// - email
// - role
// ==========================================================

export const validateUpdateUser = (data: {
  name?: string;
  email?: string;
  role?: UserRole;
}): string | null => {
  if (data.name && data.name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      return "Invalid email format";
    }
  }

  if (data.role && !["user", "admin"].includes(data.role)) {
    return "Invalid role";
  }

  return null;
};

// ==========================================================
// Validate User Status
// ==========================================================
// Checks account status value
// ==========================================================

export const validateUserStatus = (data: {
  status: UserStatus;
}): string | null => {
  if (!["active", "blocked"].includes(data.status)) {
    return "Invalid status";
  }

  return null;
};
