import mongoose from "mongoose";
import{ User} from "./user.model.js";
import { File } from "./File.model.js";
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: { type: String, required: true },
    files: [
      { type: mongoose.Schema.Types.ObjectId, ref: File, default: [] },
    ],
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
