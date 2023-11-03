import express from "express";

import {
  getAllUsers,
  register,
  login,
  getMyProfile,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
