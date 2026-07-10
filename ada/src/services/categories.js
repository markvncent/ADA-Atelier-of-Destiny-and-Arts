import { supabase } from '../lib/supabase.js';
import { adminFetch } from './adminApi.js';

/**
 * Fetches all 8 categories, ordered for landing page display.
 */
export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Failed to fetch categories:', error.message);
        throw error;
    }

    return data;
}

/**
 * Fetches a single category by its id.
 */
export async function getCategoryById(categoryId) {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .maybeSingle();

    if (error) {
        console.error('Failed to fetch category:', error.message);
        throw error;
    }

    return data;
}

/**
 * Fetches a single category by its slug.
 * Preferred when the caller only has the slug (e.g. from the route or
 * the static categoryConfig), since the static config's `id` field
 * isn't guaranteed to match the real Supabase UUID.
 */
export async function getCategoryBySlug(slug) {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (error) {
        console.error('Failed to fetch category by slug:', error.message);
        throw error;
    }

    return data;
}

/**
 * Updates a category's editable fields (name, description, cover image).
 * Routed through the admin Edge Function.
 */
export function updateCategory(categoryId, updates) {
    return adminFetch('/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, updates }),
    });
}