import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bihauzscutopzfddvchb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaGF1enNjdXRvcHpmZGR2Y2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NjY5ODEsImV4cCI6MjA5OTE0Mjk4MX0.Pb5Bd1ymj0z_PtdTtjy2da4YR-i0roac5vM0iis-fDY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('categories').select('*').order('display_order');
  if (error) {
    console.error('Error fetching categories:', error);
  } else {
    console.log('CATEGORIES_DATA_START');
    console.log(JSON.stringify(data, null, 2));
    console.log('CATEGORIES_DATA_END');
  }
}

run();
