// ==========================================================
// Admin Routes
// ==========================================================

import { Router } from "express";

// ==========================================================
// Middlewares
// ==========================================================

import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { validate } from "../middleware/validate.middleware.js";

// ==========================================================
// Validators
// ==========================================================

import {
  validateUserId,
  validateUpdateUser,
  validateUserStatus,
} from "../validators/admin.validator.js";

// ==========================================================
// Controllers
// ==========================================================

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "../controllers/admin.controller.js";

// ==========================================================
// Router Initialization
// ==========================================================

const router = Router();

// ==========================================================
// Admin Protection
// ==========================================================
// All routes below require:
// - Valid JWT token
// - Admin role
// ==========================================================

router.use(protect);

router.use(requireAdmin);

// ==========================================================
// Get All Users
// ==========================================================
// GET /api/admin/users
// ==========================================================

router.get("/users", getUsers);

// ==========================================================
// Get User By ID
// ==========================================================
// GET /api/admin/users/:id
// ==========================================================

router.get(
  "/users/:id",

  validate(validateUserId, "params"),

  getUserById,
);

// ==========================================================
// Update User
// ==========================================================
// PUT /api/admin/users/:id
//
// Updates:
// - name
// - email
// - role
// ==========================================================

router.put(
  "/users/:id",

  validate(validateUserId, "params"),

  validate(validateUpdateUser, "body"),

  updateUser,
);

// ==========================================================
// Delete User
// ==========================================================
// DELETE /api/admin/users/:id
// ==========================================================

router.delete(
  "/users/:id",

  validate(validateUserId, "params"),

  deleteUser,
);

// ==========================================================
// Update User Status
// ==========================================================
// PATCH /api/admin/users/:id/status
//
// Status:
// - active
// - blocked
// ==========================================================

router.patch(
  "/users/:id/status",

  validate(validateUserId, "params"),

  validate(validateUserStatus, "body"),

  updateUserStatus,
);

// ==========================================================
// Export Router
// ==========================================================

export default router;
