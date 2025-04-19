import express from "express";
import multer from "multer";

import admin from "../config/firebase-admin.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    await admin.auth().verifyIdToken(token);
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "atom-avatars" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Error uploading image" });
        }
        res.status(200).json({ url: result.secure_url });
      }
    );
    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});
export default router;
