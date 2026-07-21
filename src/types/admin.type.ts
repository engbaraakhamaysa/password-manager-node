// ==========================================================
// Admin Types
// ==========================================================
// Contains TypeScript types used by admin operations
// ==========================================================

// ==========================================================
// User Role Type
// Defines available user permissions
// ==========================================================

export type UserRole = "user" | "admin";

// ==========================================================
// User Status Type
// Defines account availability status
// ==========================================================

export type UserStatus = "active" | "blocked";

// ==========================================================
// Update User Request Body
// Used when admin updates user information
//
// Fields are optional because admin can update
// one or more properties only.
// ==========================================================

export interface UpdateUserBody {
  name?: string;
  email?: string;
  role?: UserRole;
}

// ==========================================================
// Update User Status Request Body
// Used when admin blocks or activates user account
// ==========================================================

export interface UpdateUserStatusBody {
  status: UserStatus;
}
