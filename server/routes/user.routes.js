import express from "express";
import { nanoid } from "nanoid";

import admin from "../config/firebase-admin.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { uid, email } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.uid !== uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let user;
    let retries = 5;
    let duplicateShortId = false;
    do {
      const filter = { $or: [{ uid }, { email }] };
      const update = {
        $set: { lastLogin: new Date() },
        $setOnInsert: { uid, email, shortId: nanoid(10) },
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      try {
        user = await User.findOneAndUpdate(filter, update, options);
        duplicateShortId = false;
      } catch (error) {
        if (error.code === 11000 && error.keyPattern.shortId) {
          duplicateShortId = true;
          retries--;
          if (retries === 0)
            return res
              .status(500)
              .json({ error: "Failed to generate unique shortId" });
        } else throw error;
      }
    } while (duplicateShortId);
    const createdNow = user.createdAt.getTime() === user.updatedAt.getTime();
    return res.status(createdNow ? 201 : 200).json(user);
  } catch (err) {
    console.error("API /api/users error:", err);
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: `${Object.keys(err.keyPattern)[0]} already exists` });
    }
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const { displayName, avatar } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.uid !== uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findOneAndUpdate(
      { uid },
      { displayName, avatar },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("API PUT /api/users/:uid error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
