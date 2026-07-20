import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Types.ObjectId | string;
        name: string;
        email: string;
        role: "user" | "admin";
      };
    }
  }
}

export {};
