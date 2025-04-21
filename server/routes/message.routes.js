import express from 'express';
import { sendMessage,getMessage } from '../Controller/message.controller.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post('/send/:id',authMiddleware,sendMessage);
router.get('/get/:id',authMiddleware,getMessage);

export default router