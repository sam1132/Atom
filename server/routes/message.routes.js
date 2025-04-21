import express from 'express';
import { sendMessage } from '../Controller/message.controller.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post('/send/:id',authMiddleware,sendMessage);
// router.get('/get/:id')

export default router