-- ============================================================
-- Interactive Virtual Gallery — Seed Data
-- Run this AFTER schema.sql and policies.sql, in the Supabase
-- SQL Editor. Populates the 8 fixed category slots.
--
-- Feel free to rename/reword these to match your actual
-- mediums before running — these are placeholders based on
-- common art mediums from the FRD.
-- ============================================================

insert into categories (id, name, description, medium_type, display_order, expanded_description) values
  ('d1a1b1c1-1111-4111-a111-111111111111', 'Silid-Lona (AI Painting)', 'Activity 1: Digital paintings created using generative AI, inspired by the 128th Philippine Independence Day.', 'ai-painting', 1, 'Welcome to Silid-Lona, dedicated to AI Painting (Activity 1). This room showcases digital artworks exploring generative artificial intelligence as a creative partner. The featured collection is inspired by the 128th Philippine Independence Day, demonstrating how artists translate historical prompts and national themes into vivid visual compositions.'),
  ('d2a2b2c2-2222-4222-a222-222222222222', 'Silid-Guhit (Reflective Drawing)', 'Activity 2: Hand-drawn sketches and illustrations that reflect the immediate thoughts of the mind.', 'reflective-drawing', 2, 'Welcome to Silid-Guhit, dedicated to Reflective Drawing (Activity 2). This gallery presents hand-drawn sketches and raw visual logs that reflect the inner mind, immediate thoughts, and emotional states of the artist at the time of creation. Through simple lines and organic forms, each piece captures a single, authentic moment of reflection.'),
  ('d3a3b3c3-3333-4333-a333-333333333333', 'Silid-Tinig (AI Generated Song)', 'AI generated song celebrating the culture, history, and heart of the Philippines.', 'ai-song', 3, 'Welcome to Silid-Tinig, dedicated to AI Generated Songwriting. This room houses musical tracks generated with artificial intelligence that celebrate the Philippines. Combining traditional acoustic influences with modern digital production, the song explores patriotic themes, reflecting the heart and heritage of the nation.'),
  ('d4a4b4c4-4444-4444-a444-444444444444', 'Silid-Salin (Transcreation Art)', 'Midterm exhibition of transcreation art, featuring a drama depicting the classical "Ophelia" painting in a Filipino setting.', 'transcreation-drama', 4, 'Welcome to Silid-Salin, dedicated to Transcreation Art (Midterm). This exhibition features a creative adaptation and dramatic performance reinterpreting John Everett Millais'' legendary "Ophelia" painting. Recontextualized in a Filipino setting, the drama translates classical Victorian themes of tragic love, nature, and grief into local settings, dialogue, and performance styles.'),
  ('d5a5b5c5-5555-4555-a555-555555555555', 'Silid-Espasyo (Installation Art)', 'Stained-glass inspired installation celebrating the seasons, inspired by Vivaldi''s "4 seasons" and the Art Nouveau style.', 'installation-art', 5, 'Welcome to Silid-Espasyo, dedicated to Installation Art. This room features a stained-glass inspired installation capturing the cycles of nature, heavily influenced by Vivaldi''s "The Four Seasons" concerto and the elegant, organic shapes of the Art Nouveau style. Luminous colors and flowing geometric leadlines celebrate the transitions of the seasons within a structural, three-dimensional space.');

-- ============================================================
-- VERIFY: after running, check the Table Editor -> categories
-- table, or run:
--   select id, name, display_order from categories order by display_order;
-- You should see exactly 5 rows.
-- ============================================================