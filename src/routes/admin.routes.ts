import { Router } from "express";

import { protect } from "../middleware/authMiddleware";
import { admin } from "../middleware/adminMiddleware";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "../controllers/users.controller";

const router = Router();

router.use(protect);
router.use(admin);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.patch("/users/:id/status", updateUserStatus);

export default router;
