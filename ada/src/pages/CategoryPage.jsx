import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import categories from '../data/categoryConfig.js';
import { fallbackArtworks } from '../data/fallbackArtworks.js';
import { getArtworksByCategory } from '../services/artworks.js';
import { getCategoryFeedback, submitCategoryFeedback } from '../services/feedback.js';
import ArtworkCard from '../components/gallery/ArtworkCard.jsx';
import ArtworkModal from '../components/gallery/ArtworkModal.jsx';
import { getCategoryBySlug } from '../services/categories.js';
import FairyDust from '../components/ui/FairyDust.jsx';

function parseCategoryName(fullName) {
  if (!fullName) return { main: "", sub: "" };
  const match = fullName.match(/^(Silid-[^\s(]+)(?:\s*(\([^)]+\)))?/);
  if (match) {
    return {
      main: match[1],
      sub: match[2] || ""
    };
  }
  return { main: fullName, sub: "" };
}

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  const [artworks, setArtworks] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [dbCategory, setDbCategory] = useState(null);

  // Category General Feedback States
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (!category) return;

    // Reset page states
    setArtworks([]);
    setSelectedSubcategory('All');
    setFeedbackList([]);
    setNewFeedback('');
    setActiveArtwork(null);
    setLoading(true);

    const loadData = async () => {
      let fetchedArtworks = [];
      let fetchedFeedback = [];
      let activeCatId = category.id;

      try {
        try {
          const fetchedCat = await getCategoryBySlug(category.slug);
          if (fetchedCat) {
            setDbCategory(fetchedCat);
            activeCatId = fetchedCat.id;
          }
        } catch (_e) {
          console.warn('Failed to fetch category details from Supabase by slug');
        }

        try {
          fetchedArtworks = await getArtworksByCategory(activeCatId);
        } catch (_e) {
          console.warn('Failed to fetch from Supabase, using mock fallback artworks');
        }

        try {
          fetchedFeedback = await getCategoryFeedback(activeCatId);
        } catch (_e) {
          console.warn('Failed to fetch category feedback from Supabase');
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        if (!fetchedArtworks || fetchedArtworks.length === 0) {
          fetchedArtworks = fallbackArtworks[category.slug] || [];
        }

        const localFeedback = JSON.parse(localStorage.getItem(`cat_feedback_${category.slug}`) || '[]');
        const combinedFeedback = [...localFeedback, ...fetchedFeedback].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setArtworks(fetchedArtworks);
        setFeedbackList(combinedFeedback);
        setLoading(false);
      }
    };

    loadData();
  }, [slug, category]);

  const handleUpdateArtwork = (artworkId, updatedFields) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, ...updatedFields } : art))
    );
    if (activeArtwork && activeArtwork.id === artworkId) {
      setActiveArtwork((prev) => ({ ...prev, ...updatedFields }));
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim() || isSubmittingFeedback) return;
    setIsSubmittingFeedback(true);

    const targetCatId = dbCategory?.id || category.id;

    const feedbackObject = {
      id: `local-cat-feedback-${Date.now()}`,
      category_id: targetCatId,
      comment_text: newFeedback.trim(),
      created_at: new Date().toISOString()
    };

    try {
      try {
        await submitCategoryFeedback(targetCatId, newFeedback.trim());
        const freshFeedback = await getCategoryFeedback(targetCatId);
        const localFeedback = JSON.parse(localStorage.getItem(`cat_feedback_${category.slug}`) || '[]');
        setFeedbackList([...localFeedback, ...freshFeedback].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ));
        setNewFeedback('');
        return;
      } catch (_dbErr) {
        console.warn('Database write failed, writing category feedback locally');
      }

      const localFeedback = JSON.parse(localStorage.getItem(`cat_feedback_${category.slug}`) || '[]');
      localFeedback.unshift(feedbackObject);
      localStorage.setItem(`cat_feedback_${category.slug}`, JSON.stringify(localFeedback));

      setFeedbackList((prev) => [feedbackObject, ...prev]);
      setNewFeedback('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const filteredArtworks = (category?.slug === 'traditional-painting' || category?.slug === 'silid-lona')
    ? artworks.filter(art => {
        if (selectedSubcategory === 'All') return true;
        return art.subcategory === selectedSubcategory;
      })
    : artworks;

  if (!category) {
    return (
      <div style={{
        display: 'flex',
        minHeight: '60vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.2rem',
          marginBottom: '16px',
          color: 'var(--ink)',
        }}>Category Not Found</h1>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Category Header */}
      <section style={{
        position: 'relative',
        width: '100%',
        paddingTop: '120px',
        paddingBottom: '64px',
        background: `
          radial-gradient(ellipse 60% 50% at 30% 0%, rgba(203,212,169,0.35), transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 10%, rgba(221,167,133,0.25), transparent 60%),
          transparent
        `,
      }}>
        <FairyDust count={8} />
        {/* Right background watermark constellation */}
        <div style={{ position: 'absolute', right: '8%', top: '15%', opacity: 0.08, pointerEvents: 'none' }} className="hidden md:block">
          <svg width="180" height="250" viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40,280 L40,120 C40,60 80,30 120,30 C160,30 200,60 200,120 L200,280 Z" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
            <line x1="40" y1="120" x2="200" y2="120" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="120" y1="30" x2="120" y2="280" stroke="var(--gold)" strokeWidth="1"/>
            <line x1="40" y1="120" x2="120" y2="200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="200" y1="120" x2="120" y2="200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M120,20 L122,25 L127,27 L122,29 L120,34 L118,29 L113,27 L118,25 Z" fill="var(--gold)"/>
            <circle cx="40" cy="120" r="3.5" fill="var(--gold)"/>
            <circle cx="200" cy="120" r="3.5" fill="var(--gold)"/>
            <path d="M120,195 L123,202 L130,205 L123,208 L120,215 L117,208 L110,205 L117,202 Z" fill="var(--gold)"/>
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
          {(() => {
            const { main, sub } = parseCategoryName(dbCategory?.name || category.name);
            return (
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                }}>
                  {main}
                </h1>
                {sub && (
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: 'var(--mauve-deep)',
                    marginTop: '6px',
                    display: 'block',
                  }}>
                    {sub}
                  </span>
                )}
              </div>
            );
          })()}
          <p style={{
            maxWidth: '640px',
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'var(--ink-soft)',
          }}>
            {dbCategory?.expanded_description || dbCategory?.description || category?.expanded_description || category?.description}
          </p>
        </div>
      </section>

      <div className="category-body">
        {/* Artworks Display Section */}
        <section className="section">
          <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.6rem',
                color: 'var(--ink)',
              }}>Collection Pieces</h2>
              {artworks.some(art => art.is_fallback) && (
                <span style={{
                  fontSize: '0.72rem',
                  padding: '6px 14px',
                  background: 'rgba(221,167,133,0.16)',
                  color: 'var(--peach-deep)',
                  border: '1px solid rgba(221,167,133,0.4)',
                  borderRadius: '999px',
                }}>
                  Interactive Fallback Previews Loaded
                </span>
              )}
            </div>

            {/* Subcategory filter toggle (Only for Traditional & Painting) */}
            {(category?.slug === 'traditional-painting' || category?.slug === 'silid-lona') && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '32px' }}>
                <div style={{
                  display: 'inline-flex',
                  borderRadius: '999px',
                  padding: '4px',
                  border: '1px solid var(--line)',
                  background: 'var(--parchment)',
                }}>
                  {['All', 'Drawing', 'Painting'].map((subcat) => {
                    const isActive = selectedSubcategory === subcat;
                    return (
                      <button
                        key={subcat}
                        type="button"
                        onClick={() => setSelectedSubcategory(subcat)}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '999px',
                          fontSize: '0.82rem',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer',
                          background: isActive ? 'linear-gradient(135deg, var(--mauve), var(--mauve-deep))' : 'transparent',
                          color: isActive ? 'var(--cream)' : 'var(--ink-soft)',
                          transition: 'all 0.3s',
                        }}
                      >
                        {subcat}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {loading ? (
              /* Skeleton Loading */
              <div style={{
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: '18px',
                      border: '1px solid var(--line)',
                      padding: '16px',
                      background: 'var(--parchment)',
                    }}
                  >
                    <div style={{
                      aspectRatio: '4/3',
                      borderRadius: '12px',
                      background: 'linear-gradient(90deg, var(--cream-deep) 25%, var(--parchment) 50%, var(--cream-deep) 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite',
                      marginBottom: '14px',
                    }} />
                    <div style={{ height: '20px', width: '75%', borderRadius: '8px', background: 'var(--cream-deep)', marginBottom: '8px' }} />
                    <div style={{ height: '14px', width: '85%', borderRadius: '8px', background: 'var(--cream-deep)' }} />
                  </div>
                ))}
              </div>
            ) : filteredArtworks.length === 0 ? (
              /* Empty State */
              <div style={{
                display: 'flex',
                minHeight: '300px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                border: '2px dashed var(--line)',
                padding: '48px',
                textAlign: 'center',
                background: 'var(--parchment)',
              }}>
                <div style={{ fontSize: '3rem', opacity: 0.4, marginBottom: '16px' }}>🖼</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  color: 'var(--ink-soft)',
                  marginBottom: '8px',
                }}>
                  {artworks.length === 0 ? 'No artworks uploaded yet' : `No ${selectedSubcategory} works yet.`}
                </h3>
                <p style={{ maxWidth: '400px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {artworks.length === 0
                    ? 'Artworks for this category will appear here once they are added through the admin panel.'
                    : 'Artworks for this subcategory will appear here once they are added.'}
                </p>
              </div>
            ) : (
              /* Active Grid */
              <div style={{
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              }}>
                {filteredArtworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    onClick={() => setActiveArtwork(artwork)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Level Feedback Section */}
        <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              color: 'var(--ink)',
              marginBottom: '8px',
            }}>Exhibition Hall Feedback</h2>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--ink-soft)',
              marginBottom: '32px',
            }}>
              Share your general thoughts, notes, or reviews on the {category.name} collection.
            </p>

            {/* Feedback Form */}
            <div className="feedback-box" style={{ marginTop: 0, marginBottom: '32px' }}>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  rows="3"
                  placeholder="Write your feedback for this hall here..."
                  required
                />
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={isSubmittingFeedback || !newFeedback.trim()}
                    className="btn btn-primary btn-sm"
                    style={{
                      opacity: isSubmittingFeedback || !newFeedback.trim() ? 0.5 : 1,
                      pointerEvents: isSubmittingFeedback || !newFeedback.trim() ? 'none' : 'auto',
                    }}
                  >
                    {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </div>

            {/* Feedback List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {feedbackList.length === 0 ? (
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  fontStyle: 'italic',
                  color: 'var(--ink-soft)',
                  padding: '24px 0',
                }}>
                  No feedback submitted yet.
                </p>
              ) : (
                feedbackList.map((feedback) => (
                  <div
                    key={feedback.id}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid var(--line)',
                      background: 'var(--parchment)',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ color: 'var(--ink-soft)' }}>{feedback.comment_text}</p>
                    <span style={{
                      display: 'block',
                      marginTop: '8px',
                      fontSize: '0.7rem',
                      textAlign: 'right',
                      color: 'var(--text-muted)',
                    }}>
                      {new Date(feedback.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section style={{ paddingBottom: '64px', textAlign: 'center' }}>
          <Link
            to="/#categories"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: 'var(--ink-soft)',
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--mauve-deep)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-soft)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to all rooms
          </Link>
        </section>
      </div>

      {/* Lightbox / Artwork Modal */}
      {activeArtwork && (
        <ArtworkModal
          artwork={activeArtwork}
          onClose={() => setActiveArtwork(null)}
          onUpdateArtwork={handleUpdateArtwork}
        />
      )}

      {/* Shimmer animation for skeletons */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}