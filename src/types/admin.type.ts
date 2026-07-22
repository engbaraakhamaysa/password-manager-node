// ==========================================================
// Admin Types
// ==========================================================
// Contains TypeScript types used by admin operations
// ==========================================================

// ==========================================================
// User Role Type
// ==========================================================
// Defines available user permissions
// ==========================================================

export type UserRole = "user" | "admin";

// ==========================================================
// User Status Type
// ==========================================================
// Defines account status
// ==========================================================

export type UserStatus = "active" | "blocked";

// ==========================================================
// User ID Params
// ==========================================================
// Used for routes containing user id
//
// Example:
// /users/:id
// ==========================================================

export interface UserIdParams {
  id: string;
}

// ==========================================================
// Update User Request Body
// ==========================================================
// Used when admin updates user information
// ==========================================================

export interface UpdateUserBody {
  name?: string;
  email?: string;
  role?: UserRole;
}

// ==========================================================
// Update User Status Request Body
// ==========================================================
// Used when admin changes account status
// ==========================================================

export interface UpdateUserStatusBody {
  status: UserStatus;
}
