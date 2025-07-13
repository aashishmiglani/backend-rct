import supabase  from '../supabaseClient.js';

export const getEventDetails = (event_id) => {
  return supabase
    .from('event_table')
    .select('event_name, event_date, event_time')
    .eq('id', event_id)
    .single();
};

export const getContactIdsForEvent = (event_id) => {
  return supabase
    .from('notifications_table')
    .select('contact_id')
    .eq('event_id', event_id);
};

export const getContactsByIds = (ids) => {
  return supabase
    .from('contacts_table')
    .select('id, phone')
    .in('id', ids);
};
