import {File} from "../models/File.model.js";
export const getReceivedFiles = async (req, res) => {
  try {
    const userId = req.currentUser._id;

    const files = await File.find({ receiverId: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, files });
  } catch (error) {
    console.error("Error fetching received files:", error);
    res.status(500).json({ success: false, message: "Failed to fetch received files" });
  }
};
