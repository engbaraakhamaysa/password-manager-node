import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

import { createUser } from "../controllers/auth.controller";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", protect, deleteUser);

router.get("/", (req, res) => {
  res.json("User API");
});

export default router;
