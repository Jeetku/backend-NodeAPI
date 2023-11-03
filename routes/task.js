import express from "express";
import {
  deleteMyTask,
  myTask,
  newTask,
  updateMyTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, myTask);
router
  .route("/:id")
  .put(isAuthenticated, updateMyTask)
  .delete(isAuthenticated, deleteMyTask);

export default router;
