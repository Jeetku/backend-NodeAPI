import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
};

export const postNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.status(201).cookie("temp", "lol").json({
    success: true,
    message: "Successfully created",
  });
};

export const findUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    user, // Change "users" to "user" for consistency
  });
};
