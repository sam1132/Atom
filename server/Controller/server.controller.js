import { User } from "../models/user.model.js";

export const DeleteServer = async (req, res) => {
    const { serverId } = req.params;
    const { currentUser } = req;
    try {
        if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
        }
        const user = await User.findById(currentUser._id);
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        const serverIndex = user.servers.findIndex(
        (server) => server._id.toString() === serverId
        );
        if (serverIndex === -1) {
        return res.status(404).json({ error: "Server not found" });
        }
        user.servers.splice(serverIndex, 1);
        await user.save();
        res.status(200).json({ message: "Server deleted successfully" });
    } catch (error) {
        console.error("Error deleting server:", error);
        res.status(500).json({ error: "Failed to delete server" });
    }
    }