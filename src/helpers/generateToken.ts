import jwt from "jsonwebtoken";
import { User } from "../models/User";

// ==========================================================
// Generate JWT Token
// Creates a signed JWT containing user information
// ==========================================================
export const generateToken = (user: InstanceType<typeof User>) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );
};
