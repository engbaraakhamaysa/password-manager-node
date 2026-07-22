// ==========================================================
// Password Controller
// ==========================================================
// Responsible for:
// - Creating saved passwords
// - Retrieving user passwords
// - Updating passwords
// - Deleting passwords
//
// Security:
// Password values are encrypted before saving to database.
// ==========================================================

import { Request, Response } from "express";

import { Password } from "../models/Passoerd";

import { CreatePasswordBody } from "../types/create.types.js";
import { UpdatePasswordBody } from "../types/update.type";

import { encrypt, decrypt } from "../utils/encryption.js";

// ==========================================================
// Create Password
// ==========================================================

export const createPassword = async (
  req: Request<{}, {}, CreatePasswordBody>,
  res: Response,
): Promise<Response> => {
  const { website, username, password, notes } = req.body;

  // ========================================================
  // Validate Request Data
  // ========================================================

  if (!website || !username || !password) {
    return res.status(400).json({
      message: "Website, username and password are required",
    });
  }

  try {
    // ======================================================
    // Create Encrypted Password
    // ======================================================

    const newPassword = await Password.create({
      userId: req.user!.id,

      website,

      username,

      password: encrypt(password),

      notes,
    });

    return res.status(201).json({
      data: newPassword,
    });
  } catch (error) {
    console.error("Create password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get All Passwords
// ==========================================================

export const getPasswords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const passwords = await Password.find({
      userId: req.user!.id,
    });

    // Decrypt passwords before sending response

    const decryptedPasswords = passwords.map((item) => ({
      ...item.toObject(),

      password: decrypt(item.password),
    }));

    return res.status(200).json({
      data: decryptedPasswords,
    });
  } catch (error) {
    console.error("Get passwords error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get Password By ID
// ==========================================================

export const getPasswordById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const password = await Password.findOne({
      _id: req.params.id,

      userId: req.user!.id,
    });

    if (!password) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      data: {
        ...password.toObject(),

        password: decrypt(password.password),
      },
    });
  } catch (error) {
    console.error("Get password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update Password
// ==========================================================

export const updatePassword = async (
  req: Request<{ id: string }, {}, UpdatePasswordBody>,
  res: Response,
): Promise<Response> => {
  const { website, username, password, notes } = req.body;

  try {
    const updatedPassword = await Password.findOneAndUpdate(
      {
        _id: req.params.id,

        userId: req.user!.id,
      },

      {
        ...(website && {
          website,
        }),

        ...(username && {
          username,
        }),

        ...(password && {
          password: encrypt(password),
        }),

        ...(notes !== undefined && {
          notes,
        }),
      },

      {
        new: true,
      },
    );

    if (!updatedPassword) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      data: {
        ...updatedPassword.toObject(),

        password: decrypt(updatedPassword.password),
      },
    });
  } catch (error) {
    console.error("Update password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Delete Password
// ==========================================================

export const deletePassword = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const password = await Password.findOneAndDelete({
      _id: req.params.id,

      userId: req.user!.id,
    });

    if (!password) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      message: "Password deleted successfully",
    });
  } catch (error) {
    console.error("Delete password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
