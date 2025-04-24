import { User } from "../models/user.model.js";
import admin from "../config/firebase-admin.js";

export const updateDisplayName = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const displayName = req.body.displayName;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    const uid = decoded.uid;
    const user = await User.findOneAndUpdate(
      { uid },
      { displayName },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("API /api/users/:uid error:");
    return res.status(500).json({ error: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  const { uid } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.uid !== uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const deletedUser = await User.findOneAndDelete({ uid });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User data deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/users/:uid error:", err);
    res.status(500).json({ error: err.message });
  }
};
