import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import cors from "cors";
// first b.c need the user name & password mongoose

const app = express();
connectDB();

app.use(cors()); // use the after bulid frountend

// this to reed json file from body
app.use(express.json());

// Test Endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend is running ",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
