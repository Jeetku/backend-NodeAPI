import express from "express";

import {
  findUser,
  getAllUsers,
  postNewUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", postNewUser);

router.get("/:id", findUser);

export default router;
