import { Router } from "express";

import {
  createPassword,
  getPasswords,
  getPasswordById,
  updatePassword,
  deletePassword,
} from "../controllers/password.controller";

import { protect } from "../middleware/authMiddleware";

const router = Router();

// Create
router.post("/", protect, createPassword);

// Read All
router.get("/", protect, getPasswords);

// Read One
router.get("/:id", protect, getPasswordById);

// Update
router.put("/:id", protect, updatePassword);

// Delete
router.delete("/:id", protect, deletePassword);

export default router;
