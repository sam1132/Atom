import express from "express";
import { nanoid } from "nanoid";

import admin from "../config/firebase-admin.js";
import { User } from "../models/user.model.js";
import { deleteAccount, updateDisplayName } from "../Controller/User.conntroller.js";

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

router.get("/search/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    const users = await User.find({
      $or: [
        { shortId: { $regex: id, $options: "i" } },
      ],
    }).limit(10);
    res.status(200).json(users);
  } catch (err) {
    console.error("API POST /api/users/search error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/connect", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { receiverId } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const currentUserId = decoded.uid;
    console.log("Receiver ID:", receiverId);

    const currentUser = await User.findOne({ uid: currentUserId });
    const receiverUser = await User.findOne({ shortId: receiverId });
    console.log(receiverUser)
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!receiverUser) {
      return res.status(404).json({ error: "Receiver user not found", });
    }
    if (!currentUser.connections.includes(receiverUser._id)) {
      currentUser.connections.push(receiverUser._id);
      await currentUser.save();
    }
    if (!receiverUser.connections.includes(currentUser._id)) {
      receiverUser.connections.push(currentUser._id);
      await receiverUser.save();
    }

    const populatedUser = await User.findById(currentUser._id).populate("connections");
    res.status(200).json(populatedUser.connections);
  } catch (err) {
    console.error("Connect Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/connections", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const currentUserId = decoded.uid;

    const currentUser = await User.findOne({ uid: currentUserId }).populate(
      "connections",
    );

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(currentUser.connections);
  } catch (err) {
    console.error("Connections Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.patch("/update/displayName", updateDisplayName);
router.delete("/:uid", deleteAccount)

export default router;
