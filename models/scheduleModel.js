import supabase  from '../supabaseClient.js';

export const insertEvent = (name, date, time) => {
  return supabase
    .from('event_table')
    .insert([{ event_name: name, event_date: date, event_time: time }])
    .select();
};

export const fetchAllEvents = () => {
  return supabase.from('event_table').select('*');
};

export const searchEventByName = (query) => {
  return supabase.from('event_table').select('*').ilike('event_name', `%${query}%`);
};

export const fetchEventById = (id) => {
  return supabase.from('event_table').select('*').eq('id', id).single();
};

export const updateEventById = (id, { event_name, event_date, event_time }) => {
  return supabase
    .from('event_table')
    .update({ event_name, event_date, event_time })
    .eq('id', id)
    .select();
};

export const deleteEventById = (id) => {
  return supabase.from('event_table').delete().eq('id', id);
};
