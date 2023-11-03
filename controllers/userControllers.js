import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    sendCookies(user, res, 200, `Welcome Back, ${user.name}`);
  } catch (error) {
    next(error);
  }
};

// Register User

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("user already registered", 404));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookies(user, res, 201, "Registered successfully");
  } catch (error) {
    next(error);
  }
};

// get details of my profile

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Logout

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};
