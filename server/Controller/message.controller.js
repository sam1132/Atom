import Conversation from "../models/conversation.model.js";
import cloudinary from "../config/cloudinary.js";
import { File } from "../models/File.model.js";
import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId,getSenderSocketId } from "../SocketIO/socketServer.js";
import { io } from "../SocketIO/socketServer.js";
export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const currentUser = req.currentUser;
    const senderId = currentUser._id;
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const receiverUser = await User.findOne({ shortId: id });
    if (!receiverUser) {
      return res.status(404).json({ error: "Receiver user not found" });
    }
    const receiverId = receiverUser._id;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    let fileIds = [];
    if (req.files && req.files.length > 0) {
      const uploads = await Promise.all(
        req.files.map(async (file) => {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "chat_files",
          });
//But cloudinary.uploader.upload() is primarily meant for images and videos. 
// When you try to upload a .docx, Cloudinary doesn't recognize it as valid media and 
// might throw the ZIP-related error internally (since .docx is technically a ZIP-based format).
          const savedFile = await File.create({
            senderId,
            receiverId,
            fileType: file.mimetype,
            fileUrl: uploadResult.secure_url,
            originalName: file.originalname,
            size: file.size,
          });
          return savedFile._id;
        })
      );
      
      fileIds = uploads;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      files: fileIds,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getSenderSocketId(senderId);
    const populatedMessage = await Message.findById(newMessage._id).populate('files')
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", populatedMessage)
    }
    if(senderSocketId){
      io.to(senderSocketId).emit("newMessage", populatedMessage)
    }
    res
      .status(201)
      .json({
        success: true,
        message: "Message sent successfully",
        data: newMessage,
      });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

export const getMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUser = req.currentUser;
    const senderId = currentUser._id;
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const receiverUser = await User.findOne({ shortId: id });
    if (!receiverUser) {
      return res.status(404).json({ error: "Receiver user not found" });
    }
    const receiverId = receiverUser._id;
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: {
        path: "files",
        model: "File"
      }
    });
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};
