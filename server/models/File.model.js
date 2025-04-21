import mongoose from "mongoose";
import { User } from "./user.model.js";


const fileSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:User,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, 
    required: true,
  },
  originalName: String,
  size: Number, 
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
},{timestamps:true});

export const File = mongoose.model("File", fileSchema);
