import { User } from "../models/user.model.js"
import admin from "../config/firebase-admin.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized user" });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const currentUser = await User.findOne({ uid: decoded.uid });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    req.currentUser = currentUser;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}