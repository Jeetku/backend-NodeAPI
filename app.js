import express from "express";
import router from "./routes/userRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.json());
app.use(cookieParser());
config({
  path: "./data/config.env",
});

app.use("/api/v1/users", router);

app.get("/", (req, res) => {
  res.send("nice working");
});
