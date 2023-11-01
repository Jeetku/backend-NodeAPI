import express from "express";

import {
  userDetails,
  getAllUsers,
  register,
  login,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.route("/userId/:id").get(userDetails);

export default router;
