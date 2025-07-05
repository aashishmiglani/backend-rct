import { supabase } from '../supabaseClient.js';

export const createContact = async ({ name, phone }) => {
    return await supabase
        .from('contacts_table')
        .insert([{ name, phone }])
        .select();
};

export const getAllContacts = async (search) => {
    let query = supabase.from('contacts_table').select('*');
    if (search && search.trim() !== '') {
        query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }
    return await query.order('name', { ascending: true });
};

export const getContactById = async (id) => {
    return await supabase
        .from('contacts_table')
        .select('*')
        .eq('id', id)
        .single();
};

export const updateContact = async (id, { name, phone }) => {
    return await supabase
        .from('contacts_table')
        .update({ name, phone })
        .eq('id', id)
        .select();
};

export const deleteContact = async (id) => {
    return await supabase
        .from('contacts_table')
        .delete()
        .eq('id', id);
};
