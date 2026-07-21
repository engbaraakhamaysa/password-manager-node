// ==========================================================
// Express Request Type Extension
// ==========================================================
// Extends Express Request object to include authenticated user.
//
// This property is added by:
// - protect middleware
//
// Example:
// req.user.id
// req.user.role
// ==========================================================

import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId | string;

        name: string;

        email: string;

        role: "user" | "admin";
      };
    }
  }
}

export {};
