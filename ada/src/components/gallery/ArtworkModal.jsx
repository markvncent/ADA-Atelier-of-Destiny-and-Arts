import { useState, useEffect } from 'react';
import MediaPlayer from './MediaPlayer.jsx';
import { submitRating, getAverageRating } from '../../services/ratings.js';
import { submitArtworkFeedback, getArtworkFeedback } from '../../services/feedback.js';

export default function ArtworkModal({ artwork, onClose, onUpdateArtwork }) {
  const { id, title, description, media_url, media_type, thumbnail_url, is_fallback } = artwork;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedScore, setVotedScore] = useState(0);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  // Load local votes and comments from localStorage (especially for fallback items)
useEffect(() => {
    // 1. Check if voted
    const localVotes = JSON.parse(localStorage.getItem('gallery_votes') || '{}');
    if (localVotes[id]) {
      setHasVoted(true);
      setVotedScore(localVotes[id]);
      setRating(localVotes[id]);
    }
    // 2. Load comments
    loadComments();

    // 3. Load rating summary
    loadRatingSummary();
  }, [id]);

  const loadComments = async () => {
    try {
      let dbComments = [];
      if (!is_fallback) {
        try {
          dbComments = await getArtworkFeedback(id);
        } catch (_e) {
          console.warn('Could not load comments from Supabase, using local fallback only');
        }
      }
      
      const localComments = JSON.parse(localStorage.getItem(`gallery_comments_${id}`) || '[]');
      const combined = [...localComments, ...dbComments].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setComments(combined);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRatingSummary = async () => {
    if (is_fallback) return;
    try {
      const summary = await getAverageRating(id);
      if (onUpdateArtwork) {
        onUpdateArtwork(id, { artwork_ratings_summary: summary });
      }
    } catch (err) {
      console.warn('Could not load rating summary:', err.message);
    }
  };

  const handleRatingSubmit = async (score) => {
    if (hasVoted || isSubmittingRating) return;
    setIsSubmittingRating(true);

    try {
      if (!is_fallback) {
        try {
          let voterToken = localStorage.getItem('voter_token');
          if (!voterToken) {
            voterToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem('voter_token', voterToken);
          }
          await submitRating(id, score, voterToken);
        } catch (_e) {
          console.warn('Database submit failed, storing rating locally instead');
        }
      }

      const localVotes = JSON.parse(localStorage.getItem('gallery_votes') || '{}');
      localVotes[id] = score;
      localStorage.setItem('gallery_votes', JSON.stringify(localVotes));

      setHasVoted(true);
      setVotedScore(score);
      setRating(score);

      if (onUpdateArtwork) {
        if (!is_fallback) {
          try {
            const summary = await getAverageRating(id);
            onUpdateArtwork(id, { artwork_ratings_summary: summary });
          } catch (_e) {
            updateLocalAverage(score);
          }
        } else {
          updateLocalAverage(score);
        }
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const updateLocalAverage = (newScore) => {
    const currentSummary = artwork.artwork_ratings_summary || { average_rating: 0, rating_count: 0 };
    const newCount = (currentSummary.rating_count || 0) + 1;
    const newAvg = parseFloat(
      (((currentSummary.average_rating || 0) * (currentSummary.rating_count || 0) + newScore) / newCount).toFixed(1)
    );
    onUpdateArtwork(id, {
      artwork_ratings_summary: {
        average_rating: newAvg,
        rating_count: newCount
      }
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;
    setIsSubmittingComment(true);

    const commentObject = {
      id: `local-comment-${Date.now()}`,
      artwork_id: id,
      comment_text: newComment.trim(),
      created_at: new Date().toISOString()
    };

    try {
      if (!is_fallback) {
        try {
          await submitArtworkFeedback(id, newComment.trim());
          loadComments();
          setNewComment('');
          return;
        } catch (_err) {
          console.warn('Database submit failed, storing comment locally instead');
        }
      }

      const localComments = JSON.parse(localStorage.getItem(`gallery_comments_${id}`) || '[]');
      localComments.unshift(commentObject);
      localStorage.setItem(`gallery_comments_${id}`, JSON.stringify(localComments));
      
      setComments((prev) => [commentObject, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(58,46,56,0.65)',
        padding: '16px',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      {/* Modal Container */}
      <div
        className="fairy-modal-container"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          width: '100%',
          maxWidth: '1000px',
          overflow: 'hidden',
          borderRadius: '22px',
          border: '1px solid var(--line)',
          background: 'var(--cream)',
          boxShadow: '0 30px 60px -20px rgba(58,46,56,0.4)',
        }}
      >
        {/* Responsive layout: column on mobile, row on desktop */}
        <style>{`
          @media (min-width: 768px) {
            .fairy-modal-container { flex-direction: row !important; }
            .fairy-modal-media { border-bottom: none !important; border-right: 1px solid var(--line) !important; }
            .fairy-modal-sidebar { max-width: 400px !important; }
          }
        `}</style>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 50,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'var(--cream)',
            border: '1px solid var(--line)',
            color: 'var(--ink-soft)',
            cursor: 'pointer',
            transition: 'background 0.25s, color 0.25s',
            fontSize: '1.1rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--mauve)';
            e.currentTarget.style.color = 'var(--cream)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--cream)';
            e.currentTarget.style.color = 'var(--ink-soft)';
          }}
        >
          ✕
        </button>

        {/* Left Side: Media Display */}
        <div
          className="fairy-modal-media"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'var(--parchment)',
            borderBottom: '1px solid var(--line)',
            minHeight: '280px',
          }}
        >
          <MediaPlayer mediaUrl={media_url} mediaType={media_type} title={title} thumbnailUrl={thumbnail_url} />
        </div>

        {/* Right Side: Info & Interactions */}
        <div
          className="fairy-modal-sidebar"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '28px',
            background: 'var(--cream)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '24px', marginTop: '16px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '10px',
              lineHeight: 1.2,
            }}>
              {title}
            </h2>
            <p style={{
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'var(--ink-soft)',
              whiteSpace: 'pre-wrap',
            }}>
              {description}
            </p>
          </div>

          {/* Rating Section */}
          <div style={{
            marginBottom: '24px',
            padding: '18px',
            borderRadius: '16px',
            border: '1px solid var(--line)',
            background: 'var(--parchment)',
          }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: '10px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              {hasVoted ? 'Your Rating' : 'Rate this Piece'}
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    disabled={hasVoted}
                    onMouseEnter={() => !hasVoted && setHoverRating(star)}
                    onMouseLeave={() => !hasVoted && setHoverRating(0)}
                    onClick={() => handleRatingSubmit(star)}
                    style={{
                      fontSize: '1.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: hasVoted ? 'default' : 'pointer',
                      color: star <= (hoverRating || rating) ? 'var(--gold)' : 'var(--line)',
                      transition: 'color 0.2s, transform 0.2s',
                      transform: star <= (hoverRating || rating) ? 'scale(1.1)' : 'scale(1)',
                      padding: '0 2px',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              {hasVoted && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '3px 10px',
                  background: 'rgba(166,179,123,0.15)',
                  color: 'var(--sage-deep)',
                  borderRadius: '999px',
                  border: '1px solid rgba(166,179,123,0.3)',
                }}>
                  Voted {votedScore}/5
                </span>
              )}
            </div>
            
            {/* Average */}
            <div style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              color: 'var(--ink-soft)',
            }}>
              <span>Average:</span>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
                {artwork.artwork_ratings_summary?.average_rating || 0} / 5
              </span>
              <span>•</span>
              <span>{artwork.artwork_ratings_summary?.rating_count || 0} rating(s)</span>
            </div>
          </div>

          {/* Comments Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: '12px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Feedback & Discussion
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this piece..."
                  rows="2"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid var(--line)',
                    padding: '12px',
                    fontSize: '0.82rem',
                    background: 'var(--parchment)',
                    color: 'var(--ink)',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.25s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--mauve)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newComment.trim()}
                  className="btn btn-primary btn-sm"
                  style={{
                    alignSelf: 'flex-end',
                    opacity: isSubmittingComment || !newComment.trim() ? 0.5 : 1,
                    pointerEvents: isSubmittingComment || !newComment.trim() ? 'none' : 'auto',
                  }}
                >
                  {isSubmittingComment ? 'Sending...' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '200px',
              paddingRight: '4px',
            }}>
              {comments.length === 0 ? (
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  fontStyle: 'italic',
                  color: 'var(--ink-soft)',
                  padding: '24px 0',
                }}>
                  No comments yet. Be the first to share!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--line)',
                      background: 'var(--parchment)',
                      fontSize: '0.78rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ color: 'var(--ink)' }}>{comment.comment_text}</p>
                    <span style={{
                      display: 'block',
                      marginTop: '6px',
                      fontSize: '0.62rem',
                      textAlign: 'right',
                      color: 'var(--text-muted)',
                    }}>
                      {new Date(comment.created_at).toLocaleDateString(undefined, {
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
        </div>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
