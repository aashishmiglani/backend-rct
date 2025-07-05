import express from 'express';
import {
  createEvent,
  getAllEvents,
  searchEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/search/:query', searchEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
