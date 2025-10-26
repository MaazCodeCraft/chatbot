import express from 'express';
import { getChatResponse } from '../controllers/chatController.js';

const router = express.Router();

router.post('/message', getChatResponse);

export default router;