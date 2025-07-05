import express from 'express';
import * as controller from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', controller.create);
router.post('/bulk', controller.bulkCreate);
router.get('/', controller.getAll);
router.get('/event/:event_id', controller.getContactsForEvent);
router.get('/event/details/:event_id', controller.getDetailedContacts);
router.get('/contact/:contact_id', controller.getEventsForContact);
router.delete('/', controller.deleteRelation);
router.delete('/notifications/:id', controller.deleteById);

export default router;
