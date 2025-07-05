import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();


// const supabaseUrl = "https://oqobdrcmkdljabzflqst.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xb2JkcmNta2RsamFiemZscXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTEyNzEsImV4cCI6MjA2NTMyNzI3MX0.f9ac-3QFEppWLOZyFrYRXKLp1JAlZT1mcLAMUykDhME"


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const test = async () => {
    const { data, error } = await supabase.from('contacts_table').select('*');
    if (error) {
        console.error("❌ Supabase Error:", error);
    } else {
        console.log("✅ Success:", data);
    }
};
test();

export { supabase }