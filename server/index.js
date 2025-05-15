import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./database/connect.js";
import uploadRouter from "./routes/upload.routes.js";
import userRouter from "./routes/user.routes.js";
import memberRouter from "./routes/member.routes.js";
import serverRouter from "./routes/server.routes.js";
import messageRouter from "./routes/message.routes.js";
import upload from "./Middleware/multerUpload.js";
import fileRouter from "./routes/file.routes.js";
import todoRouter from "./routes/todo.routes.js";
import problemRoutes from "./routes/problemRoutes.js";
import eventRoutes from "./routes/eventRoute.js";
import { app, server } from "./SocketIO/socketServer.js";
dotenv.config({ path: "./.env" });

const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/todos", todoRouter);
app.use("/api/message", upload.array("files"), messageRouter);
app.use("/api/servers", serverRouter);
app.use("/api/members", memberRouter);
app.use("/api/files", fileRouter);
app.use("/api/problems", problemRoutes);
app.use("/api/event", eventRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  connectDB();
});
