import express from 'express';
import { getReceivedFiles } from '../Controller/Resource.controller.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/receivedFiles', authMiddleware, getReceivedFiles);

export default router;
