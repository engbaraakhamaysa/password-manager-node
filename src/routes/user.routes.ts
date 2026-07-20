import { Router } from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/users.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);

export default router;
