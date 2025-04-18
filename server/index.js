import admin from "firebase-admin";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "fs";

import { connectDB } from "./database/connect.js";

import { User } from "./models/user.model.js";

dotenv.config({ path: "./.env" });

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.post("/api/users", async (req, res) => {
  const { uid, email } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.uid !== uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const filter = { $or: [{ uid }, { email }] };
    const update = {
      $set: { lastLogin: new Date() },
      $setOnInsert: { uid, email },
    };
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    const user = await User.findOneAndUpdate(filter, update, options);
    const createdNow = user.createdAt.getTime() === user.updatedAt.getTime();
    return res.status(createdNow ? 201 : 200).json(user);
  } catch (err) {
    console.error("API /api/users error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({ error: `${field} already exists` });
    }
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  connectDB();
});
