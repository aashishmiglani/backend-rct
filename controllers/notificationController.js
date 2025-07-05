import * as  NotificationModel from '../models/notificationModel.js';

export const create = async (req, res) => {
  const { contact_id, event_id, is_selected = false } = req.body;
  if (!contact_id || !event_id)
    return res.status(400).json({ error: 'Missing contact_id or event_id' });
  const { data, error } = await NotificationModel.createNotification({ contact_id, event_id, is_selected });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const bulkCreate = async (req, res) => {
  const entries = req.body;
  if (!Array.isArray(entries) || entries.length === 0)
    return res.status(400).json({ error: 'Invalid input: expected array' });
  const { data, error } = await NotificationModel.createBulkNotifications(entries);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const getAll = async (req, res) => {
  const { data, error } = await NotificationModel.getAllNotifications();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const getContactsForEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    const { data: allContacts } = await NotificationModel.getContacts();
    const { data: selectedContacts } = await NotificationModel.getSelectedContactIds(event_id);
    const selectedIds = new Set(selectedContacts.map(sc => sc.contact_id));
    const result = allContacts.map(c => ({ ...c, is_selected: selectedIds.has(c.id) }));
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDetailedContacts = async (req, res) => {
  const { event_id } = req.params;
  const { data, error } = await NotificationModel.getEventContacts(event_id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const getEventsForContact = async (req, res) => {
  const { contact_id } = req.params;
  const { data, error } = await NotificationModel.getContactEvents(contact_id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
};

export const deleteRelation = async (req, res) => {
  const { contact_id, event_id } = req.body;
  const { error } = await NotificationModel.deleteNotificationRelation(contact_id, event_id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Notification relation deleted' });
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  const { error } = await NotificationModel.deleteNotificationById(id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted successfully' });
};
