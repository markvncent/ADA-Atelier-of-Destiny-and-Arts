import { supabase } from '../lib/supabase.js';
import { adminFetch } from './adminApi.js';

export async function getArtworksByCategory(categoryId) {
  const { data: artworksData, error: artworksError } = await supabase
    .from('artworks')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
  if (artworksError) throw artworksError;

  if (!artworksData || artworksData.length === 0) return [];

  const artworkIds = artworksData.map((a) => a.id);

  // Ratings are supplementary — if this fails (missing view, stale
  // schema cache, RLS hiccup, etc.) we still want the artworks
  // themselves to render, just without rating numbers attached.
  let ratingsMap = new Map();
  try {
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('artwork_ratings_summary')
      .select('artwork_id, average_rating, rating_count')
      .in('artwork_id', artworkIds);
    if (ratingsError) throw ratingsError;
    ratingsMap = new Map((ratingsData || []).map((r) => [r.artwork_id, r]));
  } catch (err) {
    console.warn('Failed to load ratings summary (artworks will still display):', err.message);
  }

  return artworksData.map((art) => ({
    ...art,
    artwork_ratings_summary: ratingsMap.get(art.id) || null,
  }));
}

export async function getArtworkById(artworkId) {
  const { data: art, error: artError } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', artworkId)
    .single();
  if (artError) throw artError;

  // Same resilience here — a missing/broken ratings summary shouldn't
  // prevent the artwork detail itself from loading.
  let rating = null;
  try {
    const { data, error: ratingError } = await supabase
      .from('artwork_ratings_summary')
      .select('average_rating, rating_count')
      .eq('artwork_id', artworkId)
      .maybeSingle();
    if (ratingError) throw ratingError;
    rating = data;
  } catch (err) {
    console.warn('Failed to load rating for artwork (artwork will still display):', err.message);
  }

  return { ...art, artwork_ratings_summary: rating };
}

export function addArtwork({ categoryId, title, description, mediaUrl, mediaType, thumbnailUrl, subcategory = null }) {
  return adminFetch('/artworks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId, title, description, mediaUrl, mediaType, thumbnailUrl, subcategory }),
  });
}

export function updateArtwork(artworkId, updates) {
  const finalUpdates = {
    ...updates,
    subcategory: updates.subcategory === undefined ? null : updates.subcategory
  };
  return adminFetch('/artworks', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artworkId, updates: finalUpdates }),
  });
}

export async function deleteArtwork(artworkId) {
  await adminFetch('/artworks', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artworkId }),
  });
  return true;
}