import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ADMIN", "MODERATOR", "GUEST"],
      default: "GUEST",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Member = mongoose.model("Member", memberSchema);
