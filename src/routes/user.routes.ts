// ==========================================================
// User Routes
// ==========================================================
// Defines routes for authenticated user operations.
//
// All routes require a valid JWT token through
// the protect middleware.
// ==========================================================

import { Router } from "express";

// ==========================================================
// Controllers
// ==========================================================

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/users.controller";

// ==========================================================
// Middlewares
// ==========================================================

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.middleware.js";

// ==========================================================
// Validators
// ==========================================================

import {
  validateUpdateProfile,
  validateChangePassword,
} from "../validators/user.validator.js";

// ==========================================================
// Router Initialization
// ==========================================================

const router = Router();

// ==========================================================
// Get Current User Profile
// ==========================================================
// GET /api/user/profile
//
// Authentication:
// - Required
//
// Returns:
// - Current authenticated user's profile
// ==========================================================

router.get("/profile", protect, getProfile);

// ==========================================================
// Update Current User Profile
// ==========================================================
// PUT /api/user/profile
//
// Authentication:
// - Required
//
// Validation:
// - name
// - email
// ==========================================================

router.put(
  "/profile",
  protect,
  validate(validateUpdateProfile, "body"),
  updateProfile,
);

// ==========================================================
// Change Current User Password
// ==========================================================
// PATCH /api/user/change-password
//
// Authentication:
// - Required
//
// Validation:
// - currentPassword
// - newPassword
// ==========================================================

router.patch(
  "/change-password",
  protect,
  validate(validateChangePassword, "body"),
  changePassword,
);

// ==========================================================
// Delete Current User Account
// ==========================================================
// DELETE /api/user/account
//
// Authentication:
// - Required
//
// Permanently deletes the authenticated user's account.
// ==========================================================

router.delete("/account", protect, deleteAccount);

// ==========================================================
// Export Router
// ==========================================================

export default router;
