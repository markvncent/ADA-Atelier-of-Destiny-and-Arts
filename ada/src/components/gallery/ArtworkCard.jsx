import React from 'react';
import { Music, Video, FileText, Shapes, AlignLeft } from 'lucide-react';

const fallbackIcons = {
  audio: Music,
  video: Video,
  pdf: FileText,
  text: AlignLeft,
  sculpture: Shapes,
};

export default function ArtworkCard({ artwork, onClick }) {
  const { title, description, thumbnail_url, media_url, media_type, artwork_ratings_summary, is_fallback } = artwork;
  
  // Calculate average rating
  const avgRating = artwork_ratings_summary?.average_rating || 0;
  const ratingCount = artwork_ratings_summary?.rating_count || 0;

  // Use thumbnail or fallback media url
  const displayImage = thumbnail_url || (media_type === 'image' ? media_url : null);
  const IconComponent = fallbackIcons[media_type];

  // Emojis representing the medium
  const typeIcons = {
    image: '🖼️',
    audio: '🔊',
    video: '🎬',
    text: '📄',
    sculpture: '📐'
  };

  return (
    <div
      onClick={onClick}
      className="artwork-card group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Media Preview Container */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--parchment)',
      }}>
        {displayImage ? (
          <img
            src={displayImage}
            alt={title}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: `radial-gradient(circle at center, rgba(224,196,140,0.12), var(--parchment))`,
          }}>
            {IconComponent ? (
              <IconComponent 
                style={{ width: '48px', height: '48px', color: 'var(--mauve-deep)' }}
                strokeWidth={1.5}
              />
            ) : (
              <span style={{ fontSize: '2.4rem' }}>✨</span>
            )}
            <span style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.12em',
              opacity: 0.5,
              color: 'var(--ink-soft)',
            }}>
              {media_type} preview
            </span>
          </div>
        )}
        
        {/* Media type badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'var(--cream)',
          fontSize: '0.65rem',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--ink)',
          fontWeight: 500,
          textTransform: 'capitalize',
          letterSpacing: '0.04em',
        }}>
          <span>{typeIcons[media_type] || '✨'}</span>
          <span>{media_type}</span>
        </span>

        {/* Fallback Preview Tag */}
        {is_fallback && (
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(221,167,133,0.16)',
            color: 'var(--peach-deep)',
            fontSize: '0.6rem',
            fontWeight: 600,
            border: '1px solid rgba(221,167,133,0.4)',
            padding: '3px 8px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Preview
          </span>
        )}
      </div>

      {/* Info details */}
      <div style={{
        padding: '18px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--ink)',
            marginBottom: '6px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.5,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {description}
          </p>
        </div>

        {artwork.subcategory && (
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontWeight: 600,
            color: 'var(--mauve-deep)',
          }}>
            {artwork.subcategory}
          </div>
        )}

        {/* Card Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--line)',
          paddingTop: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>★</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>
              {avgRating > 0 ? avgRating : 'No ratings'}
            </span>
            {ratingCount > 0 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>
                ({ratingCount})
              </span>
            )}
          </div>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'var(--mauve-deep)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            letterSpacing: '0.06em',
          }}>
            Open Exhibition
            <span style={{ transition: 'transform 0.25s' }}>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
