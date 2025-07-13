// models/userModel.js
import supabase from '../supabaseClient.js';

export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .maybeSingle(); // ✅ safer than .single()

  if (error) throw error;
  if (!data) throw new Error('User not found'); // 👈 clear error if no user found
  return data;
};
