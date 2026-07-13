import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext.jsx';
import { Music, Video, FileText, Shapes, AlignLeft } from 'lucide-react';
import staticCategories from '../data/categoryConfig.js';
import { getCategories } from '../services/categories.js';
import { getArtworksByCategory, deleteArtwork } from '../services/artworks.js';
import { deleteMedia } from '../services/storage.js';
import ArtworkForm from '../components/admin/ArtworkForm.jsx';
import CategoryForm from '../components/admin/CategoryForm.jsx';
import ModerationList from '../components/admin/ModerationList.jsx';

const TABS = [
  { key: 'artworks', label: 'Artworks' },
  { key: 'categories', label: 'Categories' },
  { key: 'moderation', label: 'Moderation' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useModal();

  // ── Global State ───────────────────────────────────
  const [activeTab, setActiveTab] = useState('artworks');

  // ── Real categories from Supabase (source of truth for all ids) ──
  const [dbCategories, setDbCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ── Artworks Tab State ─────────────────────────────
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);
  const [showArtworkForm, setShowArtworkForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [deletingArtworkId, setDeletingArtworkId] = useState(null);

  // ── Load categories from DB once, on mount ─────────
  // This is the single source of truth for category ids across the
  // whole dashboard. categoryConfig.js is only ever used for display
  // metadata (icons) via slug lookup — never for ids.
  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const data = await getCategories();
      setDbCategories(data || []);
      setSelectedCategoryId((prev) => {
        if (prev && data.some((c) => c.id === prev)) return prev;
        return data?.[0]?.id || '';
      });
    } catch (err) {
      // Logged as the full error object (not just .message) so the
      // real Supabase error — e.g. a bad column name in .order(), or
      // an RLS policy block — is visible in the console rather than
      // silently swallowed.
      console.error('FULL categories load error:', err);
      setDbCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // ── Load artworks when category changes ────────────
  const loadArtworks = useCallback(async () => {
    if (!selectedCategoryId) return;
    setLoadingArtworks(true);
    try {
      const data = await getArtworksByCategory(selectedCategoryId);
      setArtworks(data || []);
    } catch (err) {
      console.warn('Failed to load artworks:', err.message);
      setArtworks([]);
    } finally {
      setLoadingArtworks(false);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (activeTab === 'artworks') loadArtworks();
  }, [activeTab, loadArtworks]);

  // ── Handlers ───────────────────────────────────────
  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleDeleteArtwork = async (art) => {
    const confirmed = await showConfirm(`Delete "${art.title}"? This cannot be undone.`);
    if (!confirmed) return;
    setDeletingArtworkId(art.id);
    try {
      if (art.media_url) {
        try {
          const url = new URL(art.media_url);
          const pathMatch = url.pathname.match(/\/object\/public\/artwork-media\/(.+)/);
          if (pathMatch) await deleteMedia(pathMatch[1]);
        } catch (e) {
          console.warn('Could not delete media file:', e.message);
        }
      }
      await deleteArtwork(art.id);
      setArtworks((prev) => prev.filter((a) => a.id !== art.id));
    } catch (err) {
      console.error(err);
      await showAlert('Failed to delete artwork. Check Supabase RLS policies.');
    } finally {
      setDeletingArtworkId(null);
    }
  };

  const mergedCategories = dbCategories.map((dbCat) => {
    const localCat = staticCategories.find(
      (c) => c.id === dbCat.id || c.slug === dbCat.slug || c.slug === dbCat.medium_type
    );
    return localCat ? { ...localCat, ...dbCat } : dbCat;
  });

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ═══ SIDEBAR ═══ */}
      <aside
        className="fixed top-0 left-0 z-40 flex h-screen w-60 flex-col border-r"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        {/* Sidebar Header / Branding */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <radialGradient id="sidebarGlow" cx="50%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#E0C48C"/>
                  <stop offset="55%" stopColor="#DDA785"/>
                  <stop offset="100%" stopColor="#7C6072"/>
                </radialGradient>
              </defs>
              <path d="M8,34 L8,18 C8,9 14,4 20,4 C26,4 32,9 32,18 L32,34 Z" fill="url(#sidebarGlow)" stroke="#C7A05C" strokeWidth="1.4"/>
              <line x1="20" y1="18" x2="20" y2="34" stroke="#C7A05C" strokeWidth="1"/>
              <circle cx="20" cy="18" r="2" fill="#C7A05C"/>
            </svg>
            <div>
              <h1 className="text-sm font-bold leading-tight font-heading" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                ADA
              </h1>
              <p className="text-[9px] leading-tight uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Atelier of Destiny &amp; Arts
              </p>
            </div>
          </div>
          <span className="mt-3 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: 'rgba(124, 96, 114, 0.1)',
                  borderColor: 'rgba(124, 96, 114, 0.2)',
                  color: 'var(--mauve-deep)'
                }}
          >
            Admin Dashboard
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 text-left ${
                activeTab === tab.key
                  ? 'shadow-sm border'
                  : 'hover:bg-theme-surface-hover'
              }`}
              style={{
                backgroundColor: activeTab === tab.key ? 'var(--mauve-deep)' : 'transparent',
                borderColor: activeTab === tab.key ? 'var(--mauve-deep)' : 'transparent',
                color: activeTab === tab.key ? 'var(--cream)' : 'var(--text-secondary)'
              }}
            >
              {/* Active indicator dot */}
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: activeTab === tab.key ? 'var(--accent-gold)' : 'var(--border-subtle)'
                }}
              />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Exit Admin Mode — pinned at bottom */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
          >
            Exit Admin Mode
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT (offset by sidebar width) ═══ */}
      <main className="flex-1 ml-60">
        {/* Content Header */}
        <div
          className="sticky top-0 z-20 border-b backdrop-blur-xl px-8 py-5"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {activeTab === 'artworks' && 'Manage Artworks'}
            {activeTab === 'categories' && 'Edit Categories'}
            {activeTab === 'moderation' && 'Moderate Feedback & Ratings'}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {activeTab === 'artworks' && 'Browse, add, edit, and delete artworks across categories.'}
            {activeTab === 'categories' && 'Update category names, descriptions, and cover images.'}
            {activeTab === 'moderation' && 'Review and remove inappropriate comments or ratings.'}
          </p>
        </div>

        {/* Content Area */}
        <div className="px-8 py-8">

          {/* ─── ARTWORKS TAB ───────────────────────── */}
          {activeTab === 'artworks' && (
            <div className="space-y-6">
              {/* Top Bar: Category Selector + Add Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Category:
                  </label>
                  <select
                    value={selectedCategoryId}
                    disabled={loadingCategories}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="rounded-xl border px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-1 focus:ring-[var(--mauve)]/30"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    {loadingCategories && <option>Loading…</option>}
                    {mergedCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => { setEditingArtwork(null); setShowArtworkForm(true); }}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-lg shadow-amber-500/10"
                  style={{ backgroundColor: 'var(--accent-gold)' }}
                >
                  <span className="text-sm">+</span> Add Artwork
                </button>
              </div>

              {/* Artworks Table */}
              {loadingArtworks ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 rounded-xl animate-pulse border"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                    />
                  ))}
                </div>
              ) : artworks.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 rounded-2xl border"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    No artworks yet
                  </p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                    Upload the first artwork to this category.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setEditingArtwork(null); setShowArtworkForm(true); }}
                    className="rounded-lg px-4 py-2 text-xs font-semibold text-white hover:brightness-110 transition-all"
                    style={{ backgroundColor: 'var(--accent-gold)' }}
                  >
                    + Add Artwork
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Table Header */}
                  <div
                    className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)' }}
                  >
                    <span className="w-14">Preview</span>
                    <span>Title</span>
                    <span className="w-16 text-center">Type</span>
                    <span className="w-16 text-center">Rating</span>
                    <span className="w-28 text-right">Actions</span>
                  </div>

                  {/* Table Rows */}
                  {artworks.map((art) => {
                    const avgRating = art.artwork_ratings_summary?.average_rating || 0;

                    return (
                      <div
                        key={art.id}
                        className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-3 sm:gap-4 items-center rounded-xl border p-4 sm:px-5 sm:py-3 transition-all duration-200 hover:border-[var(--mauve)]"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                      >
                        {/* Preview Thumbnail */}
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 flex items-center justify-center">
                          {art.thumbnail_url || art.media_type === 'image' ? (
                            <img
                              src={art.thumbnail_url || art.media_url}
                              alt={art.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                              {art.media_type === 'audio' && <Music className="w-5 h-5 text-[var(--accent-gold)]" />}
                              {art.media_type === 'video' && <Video className="w-5 h-5 text-[var(--accent-gold)]" />}
                              {art.media_type === 'pdf' && <FileText className="w-5 h-5 text-[var(--accent-gold)]" />}
                              {art.media_type === 'text' && <AlignLeft className="w-5 h-5 text-[var(--accent-gold)]" />}
                              {art.media_type === 'sculpture' && <Shapes className="w-5 h-5 text-[var(--accent-gold)]" />}
                            </div>
                          )}
                        </div>

                        {/* Title + Description */}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                            {art.title}
                          </p>
                          <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                            {art.description || 'No description'}
                          </p>
                        </div>

                        {/* Type Badge */}
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold capitalize w-fit"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                        >
                          {art.media_type}
                        </span>

                        {/* Rating */}
                        <span className="text-xs font-semibold text-center w-16" style={{ color: 'var(--text-primary)' }}>
                          <span className="text-[var(--accent-gold)]">★</span> {avgRating > 0 ? avgRating : '—'}
                        </span>

                        {/* Actions */}
                        <div className="flex gap-1.5 justify-end w-28">
                          <button
                            type="button"
                            onClick={() => { setEditingArtwork(art); setShowArtworkForm(true); }}
                            className="rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:bg-theme-surface-hover hover:border-[var(--mauve)]"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteArtwork(art)}
                            disabled={deletingArtworkId === art.id}
                            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 hover:text-red-700 disabled:opacity-40"
                          >
                            {deletingArtworkId === art.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─── CATEGORIES TAB ─────────────────────── */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2.5 py-1 rounded-full border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}>
                  {mergedCategories.length} categories
                </span>
              </div>

              {loadingCategories ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 rounded-xl animate-pulse border"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mergedCategories.map((cat) => (
                    <CategoryForm
                      key={cat.id}
                      category={cat}
                      onSaved={loadCategories}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── MODERATION TAB ─────────────────────── */}
          {activeTab === 'moderation' && (
            <ModerationList />
          )}
        </div>
      </main>

      {/* ═══ ARTWORK FORM MODAL ═══ */}
      {showArtworkForm && (
        <ArtworkForm
          artwork={editingArtwork}
          categoryId={selectedCategoryId}
          categories={mergedCategories}
          onClose={() => { setShowArtworkForm(false); setEditingArtwork(null); }}
          onSaved={loadArtworks}
        />
      )}
    </div>
  );
}