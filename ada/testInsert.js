import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bihauzscutopzfddvchb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaGF1enNjdXRvcHpmZGR2Y2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NjY5ODEsImV4cCI6MjA5OTE0Mjk4MX0.Pb5Bd1ymj0z_PtdTtjy2da4YR-i0roac5vM0iis-fDY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('categories').insert({
    id: 'd1a1b1c1-1111-4111-a111-111111111111',
    name: 'Test Category',
    description: 'Test description',
    medium_type: 'test',
    display_order: 1
  }).select();
  console.log('Insert Result:', data, error);
}
test();
