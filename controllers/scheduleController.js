import {
  insertEvent,
  fetchAllEvents,
  searchEventByName,
  fetchEventById,
  updateEventById,
  deleteEventById
} from '../models/scheduleModel.js';

export const createEvent = async (req, res) => {
  const { event_name, event_date, event_time } = req.body;

  if (!event_name || !event_date || !event_time) {
    return res.status(400).json({ error: "event_name, event_date, and event_time are required" });
  }

  const formattedTime = event_time.length === 5 ? `${event_time}:00` : event_time;

  try {
    const { data, error } = await insertEvent(event_name, event_date, formattedTime);
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  const { data, error } = await fetchAllEvents();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const searchEvents = async (req, res) => {
  const { query } = req.params;
  try {
    const { data, error } = await searchEventByName(query);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await fetchEventById(id);
  if (error) return res.status(404).json({ error: 'Event not found' });
  res.json({ success: true, data });
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { event_name, event_date, event_time } = req.body;
  const { data, error } = await updateEventById(id, { event_name, event_date, event_time });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { error } = await deleteEventById(id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Event deleted' });
};
