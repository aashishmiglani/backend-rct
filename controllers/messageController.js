import {
  getEventDetails,
  getContactIdsForEvent,
  getContactsByIds
} from '../models/messageModel.js';

import { twilioClient } from '../utils/twilioClient.js';

const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio sandbox or registered sender
const contentSid = 'HX350d429d32e64a552466cafecbe95f3c'; // Your Twilio Content Template ID

export const sendMessageToEventContacts = async (req, res) => {
  const { event_id } = req.body;

  if (!event_id) {
    return res.status(400).json({ error: "Missing event_id" });
  }

  try {
    // Step 1: Fetch Event
    const { data: event, error: eventError } = await getEventDetails(event_id);
    if (eventError || !event) {
      return res.status(500).json({ error: "Failed to fetch event" });
    }

    // Step 2: Fetch Contact IDs related to Event
    const { data: notifications, error: notifError } = await getContactIdsForEvent(event_id);
    if (notifError) {
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }

    const contactIds = notifications.map(n => n.contact_id);
    if (contactIds.length === 0) {
      return res.status(400).json({ error: "No contacts linked to this event" });
    }

    // Step 3: Fetch Contact Details
    const { data: contacts, error: contactsError } = await getContactsByIds(contactIds);
    if (contactsError) {
      return res.status(500).json({ error: "Failed to fetch contacts" });
    }

    // Step 4: Set WhatsApp Content Variables (Including Event Name)
    const contentVariables = JSON.stringify({
      "1": event.event_name,     // Event name
      "2": event.event_date,     // Date
      "3": event.event_time      // Time
    });

    // Step 5: Send WhatsApp Message to Each Contact
    const results = await Promise.all(
      contacts.map(async contact => {
        try {
          const to = `whatsapp:${contact.phone}`;
          await twilioClient.messages.create({
            from: fromWhatsAppNumber,
            contentSid,
            contentVariables,
            to
          });
          return { to, status: 'sent' };
        } catch (err) {
          return { to: contact.phone, status: 'failed', error: err.message };
        }
      })
    );

    return res.json({ success: true, results });

  } catch (err) {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({ error: "Unexpected server error" });
  }
};
