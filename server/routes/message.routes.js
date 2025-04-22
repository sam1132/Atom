import express from 'express';
import { sendMessage,getMessage } from '../Controller/message.controller.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import upload from '../Middleware/multerUpload.js';

const router = express.Router();
router.post('/send/:id',authMiddleware,sendMessage);
router.get('/get/:id',authMiddleware,upload.array("files"),getMessage);

export default router