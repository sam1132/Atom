import { Member } from "../models/member.model.js";
import { Server } from "../models/server.model.js";

export const DeleteServer = async (req, res) => {
  const { serverId } = req.params;
  console.log("Server " ,serverId)
  const userId = req.currentUser._id;

  try {
    const member = await Member.findOne({
      user: userId,
      server: serverId,
    });
    if (!member) {
      return res.status(403).json({ message: "User is not a member of the server." });
    }

    if (member.role !== "ADMIN") {
      return res.status(403).json({ message: "Only ADMIN can delete the server." });
    }

    await Server.findByIdAndDelete(serverId);
    await Member.deleteMany({ server: serverId });

    res.status(200).json({ message: "Server deleted successfully." });
  } catch (error) {
    console.error("Error deleting server:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
