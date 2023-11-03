import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({ title, description, user: req.user });
  res.status(201).json({
    success: true,
    message: "Task created successfully",
  });
};

export const myTask = async (req, res, next) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateMyTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(200).json({
      success: false,
      message: "Invalid Id !!",
    });
  }
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated !!",
  });
};

export const deleteMyTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(200).json({
      success: false,
      message: "Invalid Id !!",
    });
  }
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted !!",
  });
};
