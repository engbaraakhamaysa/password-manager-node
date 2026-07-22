// ==========================================================
// Admin Authorization Middleware
// ==========================================================
// Responsible for:
// - Checking authenticated user
// - Allowing only admin users
//
// Must be used after protect middleware.
//
// Example:
// router.get(
//   "/users",
//   protect,
//   requireAdmin,
//   controller
// );
// ==========================================================

import { Request, Response, NextFunction } from "express";

import { UserRole } from "../models/User.js";

// ==========================================================
// Require Admin Access
// ==========================================================

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // ========================================================
  // Check Authentication
  // ========================================================

  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  // ========================================================
  // Check Admin Role
  // ========================================================

  if (req.user.role !== UserRole.ADMIN) {
    res.status(403).json({
      message: "Admin access only",
    });

    return;
  }

  next();
};
