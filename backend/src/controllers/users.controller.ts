import { Request, Response } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";

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
