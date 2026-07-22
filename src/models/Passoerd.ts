// ==========================================================
// Password Model
// ==========================================================
// Responsible for storing user saved passwords.
//
// Note:
// Password value must be encrypted before saving
// to database.
//
// Each password record belongs to one user.
// ==========================================================

import mongoose, { Document } from "mongoose";

// ==========================================================
// Password Document Interface
// ==========================================================

export interface IPassword extends Document {
  userId: mongoose.Types.ObjectId;

  website: string;

  username: string;

  password: string;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

// ==========================================================
// Password Schema
// ==========================================================

const passwordSchema = new mongoose.Schema<IPassword>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      index: true,
    },

    website: {
      type: String,

      required: true,

      trim: true,

      minlength: 2,
    },

    username: {
      type: String,

      required: true,

      trim: true,

      minlength: 2,
    },

    password: {
      type: String,

      required: true,
    },

    notes: {
      type: String,

      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

// ==========================================================
// Export Password Model
// ==========================================================

export const Password = mongoose.model<IPassword>("Password", passwordSchema);
