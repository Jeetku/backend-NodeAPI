import express from "express";

import {
  deleteUser,
  findUser,
  getAllUsers,
  postNewUser,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", postNewUser);
router.route("/:id").get(findUser).put(updateUser).delete(deleteUser);

export default router;
