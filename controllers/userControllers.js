import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendCookies } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  sendCookies(user, res, 200, `Welcome Back, ${user.name}`);
};

// Register User

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already registered",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookies(user, res, 201, "Registered successfully");
};

// get details of my profile

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded._id);
  res.status(200).json({
    success: true,
    user,
  });
};
