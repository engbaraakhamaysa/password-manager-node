import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/", (req, res) => {
  res.json("User API");
});

export default router;
