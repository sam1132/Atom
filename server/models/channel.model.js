import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["TEXT", "AUDIO", "VIDEO"],
      default: "TEXT",
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

export const Channel = mongoose.model("Channel", channelSchema);
