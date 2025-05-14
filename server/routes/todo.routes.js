import express from "express";

import admin from "../config/firebase-admin.js";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { task } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ uid: decoded.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    const todo = new Todo({
      task,
      owner: user._id,
      isCompleted: false,
    });
    await todo.save();
    user.todos.push(todo._id);
    await user.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ uid: decoded.uid });
    const todo = await Todo.findById(id);
    if (!user || !todo) return res.status(404).json({ error: "Not found" });
    if (todo.owner.toString() !== user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });
    todo.isCompleted = isCompleted;
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ uid: decoded.uid });
    const todo = await Todo.findById(id);
    if (!user || !todo) return res.status(404).json({ error: "Not found" });
    if (todo.owner.toString() !== user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });
    await Todo.deleteOne({ _id: id });
    user.todos.pull(id);
    await user.save();
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
