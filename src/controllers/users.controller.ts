import { Request, Response } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//get all users endpoint
export const getUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await User.find();

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in server",
    });
  }
};

//get User by Id
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update users
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  if (name && name.length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters",
    });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
      },
      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error server",
    });
  }
};

//Delete User

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch {
    return res.status(500).json({ message: "Error Server" });
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) {
      if (name.trim().length < 3) {
        return res.status(400).json({
          message: "Name must be at least 3 characters",
        });
      }

      user.name = name;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserStatus = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["active", "blocked"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User status updated",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Current password and new password are required",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      message: "New password must be at least 8 characters",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
