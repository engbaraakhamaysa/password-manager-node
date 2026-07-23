import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================================
// User Request Types
// ==========================================================
// Contains TypeScript types used by user controllers
// and services.
// ==========================================================

// ==========================================================
// Update Profile Request Body
// ==========================================================
// Used when the authenticated user updates their profile.
//
// Editable fields:
// - name
// - email
//
// Both fields are optional.
// ==========================================================

export interface UpdateProfileBody {
  name?: string;
  email?: string;
}

// ==========================================================
// Change Password Request Body
// ==========================================================
// Used when the authenticated user changes their password.
// ==========================================================

export interface ChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}
