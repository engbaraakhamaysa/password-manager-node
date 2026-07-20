import { Request, Response } from "express";
import { Password } from "../models/Passoerd";
import { CreatePasswordBody } from "../types/create.types";
import { encrypt, decrypt } from "../utils/encryption";

// Create Password
export const createPassword = async (
  req: Request<{}, {}, CreatePasswordBody>,
  res: Response,
): Promise<Response> => {
  const { website, username, password, notes } = req.body;

  if (!website || !username || !password) {
    return res.status(400).json({
      message: "Website, username and password are required",
    });
  }

  try {
    const newPassword = await Password.create({
      userId: req.user.id,
      website,
      username,
      password: encrypt(password),
      notes,
    });

    return res.status(201).json({
      data: newPassword,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get All Passwords
export const getPasswords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const passwords = await Password.find({
      userId: req.user.id,
    });

    const decryptedPasswords = passwords.map((item) => ({
      ...item.toObject(),
      password: decrypt(item.password),
    }));

    return res.status(200).json({
      data: decryptedPasswords,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get Password By ID
export const getPasswordById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const password = await Password.findOne({
      _id: req.params.id,
      userId: req.user.id,
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
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update Password
export const updatePassword = async (
  req: Request<{ id: string }, {}, UpdatePasswordBody>,
  res: Response,
): Promise<Response> => {
  const { website, username, password, notes } = req.body;

  try {
    const result = await Password.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        ...(website && { website }),
        ...(username && { username }),
        ...(password && { password: encrypt(password) }),
        ...(notes && { notes }),
      },
      {
        new: true,
      },
    );

    if (!result) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      data: {
        ...result.toObject(),
        password: decrypt(result.password),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Delete Password
export const deletePassword = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const password = await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
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
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
