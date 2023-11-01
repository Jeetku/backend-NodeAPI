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
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  await User.findById(id);

  res.json({
    success: true,
    message: "Updated",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and delete it
    const result = await User.deleteOne(id);

    if (result.deletedCount === 1) {
      // The user was successfully deleted
      res.json({
        success: true,
        message: "User deleted",
      });
    } else {
      // No user with the specified ID found
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the deletion process
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
};
