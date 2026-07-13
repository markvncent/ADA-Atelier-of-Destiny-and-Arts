const supabaseUrl = 'https://bihauzscutopzfddvchb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaGF1enNjdXRvcHpmZGR2Y2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NjY5ODEsImV4cCI6MjA5OTE0Mjk4MX0.Pb5Bd1ymj0z_PtdTtjy2da4YR-i0roac5vM0iis-fDY';

async function check() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseAnonKey,
      }
    });
    const swagger = await response.json();
    console.log('DEFINITIONS KEYS:', Object.keys(swagger.definitions || {}));
    if (swagger.definitions?.categories) {
      console.log('categories:', JSON.stringify(swagger.definitions.categories, null, 2));
    }
  } catch (err) {
    console.error('Error fetching swagger:', err);
  }
}
check();
