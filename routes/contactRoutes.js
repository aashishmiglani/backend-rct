import express from 'express';
import * as ContactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/', ContactController.createContact);
router.get('/', ContactController.getAllContacts);
router.get('/:id', ContactController.getContactById);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

export default router;
