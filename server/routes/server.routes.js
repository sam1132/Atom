import express from "express";
import mongoose from "mongoose";

import admin from "../config/firebase-admin.js";
import { Channel } from "../models/channel.model.js";
import { Member } from "../models/member.model.js";
import { Server } from "../models/server.model.js";
import { User } from "../models/user.model.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { DeleteServer } from "../Controller/server.controller.js";

const router = express.Router();

router.delete("/delete/:serverId", authMiddleware, DeleteServer);

router.get("/", async (req, res) => {
  try {
    const servers = await Server.find()
      .populate({
        path: "members",
        select: "_id",
      })
      .populate({
        path: "owner",
        select: "displayName avatar",
      })
      .select("name icon banner members owner createdAt");

    res.status(200).json(servers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { name, icon, banner } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;
    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(404).json({ error: "User not found" });

    const newServer = await Server.create({
      name,
      icon:
        icon ||
        "https://pm1.aminoapps.com/8181/665e7c6631522e9946805aa7866e4675d74211f0r1-2000-2000v2_uhq.jpg",
      banner:
        banner ||
        "https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg",
      owner: user._id,
    });
    const member = await Member.create({
      role: "ADMIN",
      user: user._id,
      server: newServer._id,
    });
    newServer.members.push(member._id);
    await newServer.save();
    user.servers.push(newServer._id);
    await user.save();
    res.status(201).json(newServer);
  } catch (err) {
    console.error("Server creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:serverId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.serverId)) {
      return res.status(400).json({ error: "Invalid server ID format" });
    }
    const server = await Server.findById(req.params.serverId)
      .populate({
        path: "owner",
        select: "displayName avatar",
      })
      .populate({
        path: "members",
        select: "role user",
        populate: {
          path: "user",
          select: "displayName avatar",
        },
      })
      .populate({
        path: "channels",
        select: "name type",
      });
    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }
    res.status(200).json(server);
  } catch (err) {
    console.error("GET /api/servers/:serverId error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid server ID format" });
    }
    res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

router.post("/:serverId/channels", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { serverId } = req.params;
  const { name, type } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;

    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(404).json({ error: "User not found" });
    const server = await Server.findById(serverId);
    if (!server) return res.status(404).json({ error: "Server not found" });
    const member = await Member.findOne({ server: serverId, user: user._id });
    if (!member || !["ADMIN", "MODERATOR"].includes(member.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const channel = await Channel.create({
      name,
      type: type.toUpperCase(),
      server: serverId,
    });
    server.channels.push(channel._id);
    await server.save();
    res.status(201).json(channel);
  } catch (err) {
    console.error("Channel creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:serverId/channels/:channelId", async (req, res) => {
  try {
    const { serverId, channelId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(serverId) || 
        !mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const channel = await Channel.findOne({
      _id: channelId,
      server: serverId
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (err) {
    console.error("GET channel error:", err);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

export default router;
