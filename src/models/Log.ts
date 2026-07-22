// ==========================================================
// Log Model
// ==========================================================
// Responsible for storing user activity history.
// Example:
// - Login attempts
// - Password changes
// - Account updates
//
// Each log belongs to one user.
// ==========================================================

import mongoose, { Document } from "mongoose";

// ==========================================================
// Log Action Types
// ==========================================================

export enum LogAction {
  LOGIN = "LOGIN",

  LOGOUT = "LOGOUT",

  CREATE_PASSWORD = "CREATE_PASSWORD",

  UPDATE_PASSWORD = "UPDATE_PASSWORD",

  DELETE_PASSWORD = "DELETE_PASSWORD",

  UPDATE_PROFILE = "UPDATE_PROFILE",
}

// ==========================================================
// Log Document Interface
// ==========================================================

export interface ILog extends Document {
  userId: mongoose.Types.ObjectId;

  action: LogAction;

  createdAt: Date;

  updatedAt: Date;
}

// ==========================================================
// Log Schema
// ==========================================================

const logSchema = new mongoose.Schema<ILog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      index: true,
    },

    action: {
      type: String,

      enum: Object.values(LogAction),

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

// ==========================================================
// Export Log Model
// ==========================================================

export const Log = mongoose.model<ILog>("Log", logSchema);
