import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
      default: () => nanoid(10),
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/236x/08/f6/4a/08f64a7cb64b67167d6b5e75429b26bb.jpg",
    },
    connections: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    servers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
