/**
 * Static category configuration for the landing page.
 * Each entry maps to one of the 8 "door" cards.
 *
 * `slug` is used for URL routing (/category/:slug).
 * `icon` is an emoji used as a visual placeholder until cover images are set.
 * `gradient` defines the Tailwind gradient classes for each door card.
 */
const categories = [
  {
    id: 'd1a1b1c1-1111-4111-a111-111111111111',
    slug: 'ai-painting',
    name: 'Silid-Lona (AI Painting)',
    description: 'Activity 1: Digital paintings created using generative AI, inspired by the 128th Philippine Independence Day.',
    expanded_description: 'Welcome to Silid-Lona, dedicated to AI Painting (Activity 1). This room showcases digital artworks exploring generative artificial intelligence as a creative partner. The featured collection is inspired by the 128th Philippine Independence Day, demonstrating how artists translate historical prompts and national themes into vivid visual compositions.',
    icon: '🎨',
    gradient: 'from-terracotta/60 to-brown/60',
    mediaType: 'image',
    hryRef: 'HRY–01',
    refName: 'AI Painting',
    iconText: 'Ap',
  },
  {
    id: 'd2a2b2c2-2222-4222-a222-222222222222',
    slug: 'reflective-drawing',
    name: 'Silid-Guhit (Reflective Drawing)',
    description: 'Activity 2: Hand-drawn sketches and illustrations that reflect the immediate thoughts of the mind.',
    expanded_description: 'Welcome to Silid-Guhit, dedicated to Reflective Drawing (Activity 2). This gallery presents hand-drawn sketches and raw visual logs that reflect the inner mind, immediate thoughts, and emotional states of the artist at the time of creation. Through simple lines and organic forms, each piece captures a single, authentic moment of reflection.',
    icon: '✍️',
    gradient: 'from-brown-soft/60 to-brown/60',
    mediaType: 'image',
    hryRef: 'HRY–02',
    refName: 'Drawing',
    iconText: 'Rd',
  },
  {
    id: 'd3a3b3c3-3333-4333-a333-333333333333',
    slug: 'ai-song',
    name: 'Silid-Tinig (AI Generated Song)',
    description: 'AI generated song celebrating the culture, history, and heart of the Philippines.',
    expanded_description: 'Welcome to Silid-Tinig, dedicated to AI Generated Songwriting. This room houses musical tracks generated with artificial intelligence that celebrate the Philippines. Combining traditional acoustic influences with modern digital production, the song explores patriotic themes, reflecting the heart and heritage of the nation.',
    icon: '🔊',
    gradient: 'from-forest/60 to-gold/60',
    mediaType: 'audio',
    hryRef: 'HRY–03',
    refName: 'AI Song',
    iconText: 'As',
  },
  {
    id: 'd4a4b4c4-4444-4444-a444-444444444444',
    slug: 'transcreation-drama',
    name: 'Silid-Salin (Transcreation Art)',
    description: 'Midterm exhibition of transcreation art, featuring a drama depicting the classical "Ophelia" painting in a Filipino setting.',
    expanded_description: 'Welcome to Silid-Salin, dedicated to Transcreation Art (Midterm). This exhibition features a creative adaptation and dramatic performance reinterpreting John Everett Millais\' legendary "Ophelia" painting. Recontextualized in a Filipino setting, the drama translates classical Victorian themes of tragic love, nature, and grief into local settings, dialogue, and performance styles.',
    icon: '🎭',
    gradient: 'from-amber-600/60 to-brown/60',
    mediaType: 'video',
    hryRef: 'HRY–04',
    refName: 'Drama',
    iconText: 'Td',
  },
  {
    id: 'd5a5b5c5-5555-4555-a555-555555555555',
    slug: 'installation-art',
    name: 'Silid-Espasyo (Installation Art)',
    description: 'Stained-glass inspired installation celebrating the seasons, inspired by Vivaldi\'s "4 seasons" and the Art Nouveau style.',
    expanded_description: 'Welcome to Silid-Espasyo, dedicated to Installation Art. This room features a stained-glass inspired installation capturing the cycles of nature, heavily influenced by Vivaldi\'s "The Four Seasons" concerto and the elegant, organic shapes of the Art Nouveau style. Luminous colors and flowing geometric leadlines celebrate the transitions of the seasons within a structural, three-dimensional space.',
    icon: '📐',
    gradient: 'from-gold/60 to-brown/60',
    mediaType: 'image',
    hryRef: 'HRY–05',
    refName: 'Installation',
    iconText: 'Sg',
  },
];

export default categories;
