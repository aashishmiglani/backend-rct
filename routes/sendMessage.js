import express from 'express';
import { sendMessageToEventContacts } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', sendMessageToEventContacts);

export default router;
