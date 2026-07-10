/**
 * Pre-populated fallback mock artworks matching the Haraya Creative Archive layout.
 * These display if no database entries are found in Supabase.
 * Stock images have been removed so only database-synced images are loaded.
 */
export const fallbackArtworks = {
  'photography': [
    {
      id: 'mock-photo-1',
      title: 'Frozen Light (Chiaroscuro Study)',
      description: 'A photographic study of light and shadow, capturing architectural angles in early morning sunlight.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-01').toISOString(),
      is_fallback: true,
    }
  ],
  'digital-art': [
    {
      id: 'mock-digital-1',
      title: 'Larong Pinoy Concept Art',
      description: 'Digital illustration and concept sketches adapting traditional Filipino games into stylized character designs.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-03').toISOString(),
      is_fallback: true,
    }
  ],
  'traditional-painting': [
    {
      id: 'mock-painting-1',
      title: 'Kalayaan at Teknolohiya (AI-Generated Painting)',
      description: 'An AI-generated digital painting inspired by the 128th Philippine Independence Day. Demonstrates the coordination of technology and creative expression by translating descriptive prompts into visual compositions.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-06-12').toISOString(),
      is_fallback: true,
      subcategory: 'Painting',
    },
    {
      id: 'mock-painting-2',
      title: 'Saglit na Pagninilay (Hand-Drawn Sketch)',
      description: "A hand-drawn sketch reflecting the artist's personal thoughts, observations, and ideas captured in a single moment through line, form, and composition.",
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-01').toISOString(),
      is_fallback: true,
      subcategory: 'Drawing',
    }
  ],
  'sculpture-3d': [
    {
      id: 'mock-sculpture-1',
      title: 'Ancient Greek Temple Scale Model',
      description: 'A miniature architectural installation constructed entirely from recycled cardboard and discarded materials, interpreting classical Greek proportions through modern sustainable practices.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-05').toISOString(),
      is_fallback: true,
    }
  ],
  'music-audio': [
    {
      id: 'mock-audio-1',
      title: 'Hindi Kami Kaaway (Original Composition)',
      description: 'An original musical composition and song responding to the issue of red-tagging and its impact on innocent communities. It invites listeners to reflect on truth, dignity, and justice.',
      media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Safe demo audio url
      media_type: 'audio',
      thumbnail_url: null,
      created_at: new Date('2026-07-02').toISOString(),
      is_fallback: true,
    }
  ],
  'film-video': [
    {
      id: 'mock-video-1',
      title: 'Exhibition Screening Reel (Short Film)',
      description: 'A compilation of digital visual storytelling, short animated clips, and exhibition video highlights prepared for the screening room.',
      media_url: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4',
      media_type: 'video',
      thumbnail_url: null,
      created_at: new Date('2026-07-05').toISOString(),
      is_fallback: true,
    }
  ],
  'writing-poetry': [
    {
      id: 'mock-writing-1',
      title: 'Group Members & Instructor Tribute (Written)',
      description: 'A compiled written tribute and introduction page dedicated to the creators and the guiding subject instructor behind the Haraya Creative Archive.',
      media_url: null,
      media_type: 'image',
      thumbnail_url: null,
      created_at: new Date('2026-07-05').toISOString(),
      is_fallback: true,
    }
  ],
};
