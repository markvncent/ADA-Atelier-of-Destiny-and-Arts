/**
 * Pre-populated fallback mock artworks matching the ADA Creative Archive layout.
 * These display if no database entries are found in Supabase.
 * Stock images have been removed so only database-synced images are loaded.
 */
export const fallbackArtworks = {
  'ai-painting': [
    {
      id: 'mock-painting-1',
      title: 'Kalayaan at Teknolohiya (AI-Generated Painting)',
      description: 'An AI-generated digital painting inspired by the 128th Philippine Independence Day. Demonstrates the coordination of technology and creative expression by translating descriptive prompts into visual compositions.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-06-12').toISOString(),
      is_fallback: true,
    }
  ],
  'reflective-drawing': [
    {
      id: 'mock-painting-2',
      title: 'Saglit na Pagninilay (Hand-Drawn Sketch)',
      description: "A hand-drawn sketch reflecting the artist's personal thoughts, observations, and ideas captured in a single moment through line, form, and composition.",
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-01').toISOString(),
      is_fallback: true,
    }
  ],
  'ai-song': [
    {
      id: 'mock-audio-1',
      title: 'Lupang Hinirang ng Bukas (AI-Generated Song)',
      description: 'An AI-generated song celebrating the Philippines. It combines digital production techniques and thematic prompts to create a patriotic sonic journey.',
      media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Safe demo audio url
      media_type: 'audio',
      thumbnail_url: null,
      created_at: new Date('2026-07-02').toISOString(),
      is_fallback: true,
    }
  ],
  'transcreation-drama': [
    {
      id: 'mock-video-1',
      title: 'Ophelia sa Ilog Pasig (Midterm Drama Reel)',
      description: 'A compiled visual preview of the midterm drama project, translating Millais\' classical painting of Ophelia into a modern Filipino theatrical environment.',
      media_url: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4',
      media_type: 'video',
      thumbnail_url: null,
      created_at: new Date('2026-07-05').toISOString(),
      is_fallback: true,
    }
  ],
  'installation-art': [
    {
      id: 'mock-sculpture-1',
      title: 'Vivaldi in Art Nouveau (Stained Glass Installation Concept)',
      description: 'A stained-glass inspired architectural model capturing the colors and moods of the changing seasons, using the organic, curved visual lines of Art Nouveau.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-05').toISOString(),
      is_fallback: true,
    }
  ],
};
