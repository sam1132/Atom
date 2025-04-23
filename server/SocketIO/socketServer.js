import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST"," PUT", "DELETE", "PATCH"],
  },
});


export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
}
export const getSenderSocketId = (senderId) => {
  return users[senderId];
}

const users={}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("User ID:", userId);
  if(userId) {
    users[userId] = socket.id;
    socket.userId = userId; // Store userId in socket object
    console.log("User connected:", users);
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if(socket.userId) {
      delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));    }
   
  });

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); 
  });
});

export {app, server, io};