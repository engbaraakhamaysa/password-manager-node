import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
} from "../controllers/users.controller";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/", (req, res) => {
  res.json("User API");
});

export default router;
