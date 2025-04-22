import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./database/connect.js";
import uploadRouter from "./routes/upload.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import upload from "./Middleware/multerUpload.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/message",upload.array('files'), messageRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  connectDB();
});
