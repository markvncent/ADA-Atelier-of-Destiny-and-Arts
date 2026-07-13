async function checkUrl() {
  const url = 'https://bihauzscutopzfddvchb.supabase.co/storage/v1/object/public/artwork-media/d3a3b3c3-3333-4333-a333-333333333333/91e77471-d3b5-4bb4-a434-f589c06e59d1.mp3';
  try {
    const response = await fetch(url);
    const body = await response.text();
    console.log('HTTP Status:', response.status);
    console.log('Response Body:', body);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
checkUrl();
