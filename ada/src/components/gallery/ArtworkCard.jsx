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
      className="group relative cursor-pointer overflow-hidden border border-black"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Media Preview Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 flex items-center justify-center border-b border-black">
        {displayImage ? (
          <img
            src={displayImage}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center gap-3 bg-neutral-100"
            style={{ 
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            {IconComponent ? (
              <IconComponent 
                className="w-12 h-12" 
                style={{ color: 'var(--text-primary)' }}
                strokeWidth={1.5}
              />
            ) : (
              <span className="text-4xl">✨</span>
            )}
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-40 text-center px-4" style={{ color: 'var(--text-muted)' }}>
              {media_type} preview
            </span>
          </div>
        )}
        
        {/* Media type icon badge */}
        <span className="absolute top-3 left-3 bg-white text-black text-xs py-1 px-2.5 border border-black flex items-center gap-1.5">
          <span>{typeIcons[media_type] || '✨'}</span>
          <span className="capitalize text-[10px] tracking-wide font-medium">{media_type}</span>
        </span>

        {/* Fallback Preview Tag */}
        {is_fallback && (
          <span className="absolute top-3 right-3 bg-white text-[10px] font-bold text-black border border-black px-2 py-0.5 uppercase tracking-wider">
            Preview
          </span>
        )}
      </div>

      {/* Info details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1 mb-1" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>
        </div>

        {artwork.subcategory && (
          <div
            className="text-[10px] tracking-wider uppercase mb-3 select-none font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {artwork.subcategory}
          </div>
        )}

        {/* Card Footer: Rating stars & Details */}
        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-1.5">
            <span className="text-black text-sm">★</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              {avgRating > 0 ? avgRating : 'No ratings'}
            </span>
            {ratingCount > 0 && (
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                ({ratingCount})
              </span>
            )}
          </div>
          <span
            className="text-xs font-medium flex items-center gap-1 group-hover:underline"
            style={{ color: 'var(--text-primary)' }}
          >
            Open Exhibition
            <span className="text-xs">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
