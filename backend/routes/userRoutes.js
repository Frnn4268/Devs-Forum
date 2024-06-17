import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUsers);

export default router;
