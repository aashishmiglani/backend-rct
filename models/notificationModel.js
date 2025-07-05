import { supabase } from '../supabaseClient.js';

export const createNotification = (notification) =>
  supabase.from('notifications_table').insert([notification]).select();

export const createBulkNotifications = (notifications) =>
  supabase.from('notifications_table')
    .insert(notifications.map(entry => ({ ...entry, is_selected: entry.is_selected ?? false })))
    .select();

export const getAllNotifications = () =>
  supabase.from('notifications_table').select('*');

export const getContacts = () =>
  supabase.from('contacts_table').select('id, name, phone');

export const getSelectedContactIds = (event_id) =>
  supabase.from('notifications_table').select('contact_id').eq('event_id', event_id);

export const getEventContacts = (event_id) =>
  supabase.from('notifications_table')
    .select('*, contacts(name, phone)')
    .eq('event_id', event_id);

export const getContactEvents = (contact_id) =>
  supabase.from('notifications_table')
    .select('*, notification_ashram(event_name, event_time)')
    .eq('contact_id', contact_id);

export const deleteNotificationRelation = (contact_id, event_id) =>
  supabase.from('notifications_table')
    .delete()
    .eq('contact_id', contact_id)
    .eq('event_id', event_id);

export const deleteNotificationById = (id) =>
  supabase.from('notifications_table').delete().eq('id', id);