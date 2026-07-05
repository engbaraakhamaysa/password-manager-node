import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.set("toJSON", {
//   transform: function (doc, ret) {
//     delete ret.password;
//     return ret;
//   },
// });

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    const obj = ret as Partial<IUser>;

    delete obj.password;

    return obj;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
