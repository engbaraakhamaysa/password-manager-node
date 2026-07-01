import { Request, Response } from "express";
import { User } from "../models/User";

//get all users endpoint
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.json(users);
};

//get User by Id
export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  res.json(user);
};

//update users
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(user);
};

//Delete User

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User delete",
  });
};
