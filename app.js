import express from "express";
import router from "./routes/userRoutes.js";
import { config } from "dotenv";

export const app = express();
config({
  path: "./data/config.env",
});
app.use(express.json());

app.use("/users", router);

app.get("/", (req, res) => {
  res.send("nice working");
});
