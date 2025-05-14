import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
