import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import admin from "../config/firebase-admin.js";
import { User } from "../models/user.model.js";
export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = await admin.auth().verifyIdToken(token);
        const currentUserId = decoded.uid;
        const currentUser = await User.findOne({ uid: currentUserId });
        const senderId = currentUser._id;
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const receiverUser = await User.findOne({ shortId: id });
        if (!receiverUser) {
            return res.status(404).json({ error: "Receiver user not found" });
        }
        const receiverId = receiverUser._id;
        let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
        if (!conversation) {
            conversation = await Conversation.create({ members: [senderId, receiverId] });
        }
        const newMessage = await Message({  senderId, receiverId, message });
        if (newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([
            conversation.save(),
            newMessage.save(),
        ]);
        res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
}