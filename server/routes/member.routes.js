import express from "express";
import { Member } from "../models/member.model.js";

const router = express.Router();

router.get("/:serverId/:userId", async (req, res) => {
  try {
    const member = await Member.findOne({
      server: req.params.serverId,
      user: req.params.userId
    }).select("role");

    if (!member) return res.status(404).json({ error: "Member not found" });
    
    res.json({ role: member.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;