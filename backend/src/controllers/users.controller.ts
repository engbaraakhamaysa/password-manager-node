import { Request, Response } from "express";
import { User } from "../models/User";

//create user endpoint
export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.json(user);
};

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
