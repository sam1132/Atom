import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default:
        "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg",
    },
    banner: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Server = mongoose.model("Server", serverSchema);
