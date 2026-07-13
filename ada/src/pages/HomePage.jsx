import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categories from '../data/categoryConfig.js';
import { getCategories } from '../services/categories.js';
import FairyDust from '../components/ui/FairyDust.jsx';
import ScrollRevealSection from '../components/ui/ScrollRevealSection.jsx';
import { Carousel } from '../components/ui/retro-testimonial.jsx';
import { motion } from 'framer-motion';
import ConstellationBackground from '../components/ui/ConstellationBackground.jsx';
import { getArtworksByCategory } from '../services/artworks.js';
import { fallbackArtworks } from '../data/fallbackArtworks.js';

const MotionLink = motion(Link);

function CategoryThumbnailWindow({ categoryId, categorySlug, defaultCoverUrl, categoryName }) {
  const [images, setImages] = useState([defaultCoverUrl]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchArtworks = async () => {
      let artworks = [];
      try {
        artworks = await getArtworksByCategory(categoryId);
      } catch (err) {
        console.warn(`Failed to fetch artworks for category ${categorySlug}:`, err.message);
      }

      if (!artworks || artworks.length === 0) {
        artworks = fallbackArtworks[categorySlug] || [];
      }

      if (!active) return;

      const extractedImages = artworks
        .map((art) => art.thumbnail_url || (art.media_type === 'image' ? art.media_url : null))
        .filter((url) => !!url);

      if (extractedImages.length > 0) {
        // Limit to 6 preview images max
        setImages(extractedImages.slice(0, 6));
      }
    };

    fetchArtworks();
    return () => {
      active = false;
    };
  }, [categoryId, categorySlug, defaultCoverUrl]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      style={{
        width: '180px',
        height: '240px',
        borderRadius: '90px 90px 16px 16px',
        border: '3px solid rgba(75, 63, 51, 0.7)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 8px 24px rgba(58,46,56,0.15)',
        background: 'var(--cream-deep)',
      }}
      className="z-10 flex items-center justify-center"
    >
      {images.map((imgUrl, idx) => (
        <img
          key={`${imgUrl}-${idx}`}
          src={imgUrl}
          alt={`${categoryName} preview`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '87px 87px 12px 12px',
            filter: 'saturate(0.85) sepia(0.15)',
            opacity: idx === currentImageIndex ? 1 : 0,
            transform: categorySlug === 'ai-painting' ? 'scale(1.25)' : 'scale(1)',
            transformOrigin: 'center center',
            transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [renderedCategories, setRenderedCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      let finalCategories = categories;

      try {
        const dbCats = await getCategories();
        if (dbCats && dbCats.length > 0) {
          finalCategories = categories.map((localConfig) => {
            const dbCat = dbCats.find((c) => c.id === localConfig.id) || {};
            return {
              id: localConfig.id,
              slug: localConfig.slug,
              name: dbCat.name || localConfig.name,
              description: dbCat.description || localConfig.description,
              expanded_description: dbCat.expanded_description || localConfig.expanded_description,
              icon: localConfig.icon || '🎨',
              gradient: localConfig.gradient,
              cover_image_url: dbCat.cover_image_url || localConfig.cover_image_url,
              hryRef: localConfig.hryRef,
              refName: localConfig.refName,
              iconText: localConfig.iconText,
            };
          });
        }
      } catch (err) {
        console.warn('Failed to load categories from Supabase, using local static config fallback:', err.message);
        finalCategories = categories;
      } finally {
        setRenderedCategories(finalCategories);
      }
    };

    loadCategories();
  }, []);

  // Category color mapping for tag dots and card icon backgrounds
  const categoryColors = {
    photography: '#CBD4A9',
    'digital-art': '#DDA785',
    'traditional-painting': '#A78998',
    'sculpture-3d': '#E0C48C',
    'music-audio': '#A78998',
    'film-video': '#E0C48C',
    'writing-poetry': '#CBD4A9',
  };

  const categoryCards = renderedCategories.map((cat, index) => {
    const bgImages = {
      'photography': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop',
      'digital-art': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      'traditional-painting': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop',
      'sculpture-3d': 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=600&auto=format&fit=crop',
      'music-audio': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
      'film-video': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
      'writing-poetry': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    };
    const bgUrl = cat.cover_image_url || bgImages[cat.slug] || 'https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?q=80&w=600&auto=format&fit=crop';

    return (
      <MotionLink
        key={cat.id}
        to={`/category/${cat.slug}`}
        id={`category-door-${cat.slug}`}
        className="block"
        whileHover={{
          rotateX: 2,
          rotateY: 2,
          rotate: 3,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div
          className={`${index % 2 === 0 ? "rotate-0" : "-rotate-0"} rounded-3xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-md`}
          style={{ padding: '32px 24px' }}
        >
          {/* Paper Texture Background layer overlay */}
          <div className="absolute opacity-30" style={{ inset: "-1px 0 0" }}>
            <div className="absolute inset-0">
              <img
                className="block w-full h-full object-center object-cover"
                src="https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?q=80&w=600&auto=format&fit=crop"
                alt="Parchment Texture"
              />
            </div>
          </div>
          {/* Miniature Stained Glass Window/Door Icon overlay at top-right */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: categoryColors[cat.slug] || '#E0C48C',
            zIndex: 10
          }} title={cat.name}>
            <svg width="18" height="24" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
              <path d="M4,46 L4,18 C4,9 12,4 20,4 C28,4 36,9 36,18 L36,46 Z" />
              <line x1="20" y1="18" x2="20" y2="46" />
              <circle cx="20" cy="18" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Stained-Glass Window Frame housing the category picture slider */}
          <CategoryThumbnailWindow
            categoryId={cat.id}
            categorySlug={cat.slug}
            defaultCoverUrl={bgUrl}
            categoryName={cat.name}
          />

          {/* Category Name (Header) */}
          <h3 className="text-[rgba(31,27,29,0.85)] text-lg md:text-xl font-semibold text-center mt-6 uppercase tracking-wider z-10">
            {cat.name}
          </h3>

          {/* Description Quote (Smaller in size) */}
          <p className="text-[rgba(31,27,29,0.65)] text-xs md:text-sm font-normal text-center [text-wrap:balance] mt-2 px-3 z-10 leading-relaxed italic">
            "{cat.description}"
          </p>
        </div>
      </MotionLink>
    );
  });

  return (
    <div style={{ position: 'relative' }}>
      {/* ═══════ HERO — Enchanted Gateway ═══════ */}
      <section className="hero" id="home">
        <FairyDust count={14} />
        <div className="hero-container">
          <div className="hero-grid">
            {/* Left: Copy */}
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">An Atelier of Destiny and Arts</span>
              <h1>
                Where creativity <em>blossoms,</em> and Destinies <em>unfold.</em>
              </h1>
              <p className="lede">
                Step through five doors of a fairy-touched gallery, where stained glass holds the light
                and every artwork waits with a story of its own to tell.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#categories">
                  Enter the Gallery
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <Link className="link-quiet" to="/about">The story behind ADA →</Link>
              </div>
            </div>

            {/* Right: Stained Glass Door Illustration */}
            <div className="hero-art">
              <div className="door-wrap">
                <div className="glow-behind" />
                <svg viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" aria-label="An illustrated stained glass door, the emblem of ADA">
                  <defs>
                    <radialGradient id="doorGlow" cx="50%" cy="24%" r="80%">
                      <stop offset="0%" stopColor="#F3E3BE" />
                      <stop offset="42%" stopColor="#DDA785" />
                      <stop offset="100%" stopColor="#7C6072" />
                    </radialGradient>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F3E3BE" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#F3E3BE" stopOpacity="0" />
                    </radialGradient>
                    <clipPath id="doorClip">
                      <path d="M54,540 L54,210 C54,110 120,50 200,50 C280,50 346,110 346,210 L346,540 Z" />
                    </clipPath>
                  </defs>

                  <g clipPath="url(#doorClip)">
                    <rect x="0" y="0" width="400" height="560" fill="url(#doorGlow)" />
                    {/* Vertical panel bands */}
                    <rect x="54" y="0" width="73" height="560" fill="#CBD4A9" opacity="0.32" />
                    <rect x="127" y="0" width="73" height="560" fill="#DDA785" opacity="0.22" />
                    <rect x="200" y="0" width="73" height="560" fill="#A78998" opacity="0.26" />
                    <rect x="273" y="0" width="73" height="560" fill="#A6B37B" opacity="0.26" />
                    {/* Sunburst fan wedges */}
                    <polygon points="200,210 54,210 127,120" fill="#CBD4A9" opacity="0.35" />
                    <polygon points="200,210 127,120 163,68" fill="#DDA785" opacity="0.3" />
                    <polygon points="200,210 163,68 200,50" fill="#E0C48C" opacity="0.4" />
                    <polygon points="200,210 200,50 237,68" fill="#DDA785" opacity="0.3" />
                    <polygon points="200,210 237,68 273,120" fill="#CBD4A9" opacity="0.35" />
                    <polygon points="200,210 273,120 346,210" fill="#A78998" opacity="0.3" />
                    <circle cx="200" cy="210" r="46" fill="url(#centerGlow)" />
                  </g>

                  {/* Lead lines */}
                  <g fill="none" stroke="#C7A05C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M54,540 L54,210 C54,110 120,50 200,50 C280,50 346,110 346,210 L346,540 Z" />
                    <line x1="54" y1="210" x2="346" y2="210" />
                    <line x1="127" y1="210" x2="127" y2="540" />
                    <line x1="200" y1="210" x2="200" y2="540" />
                    <line x1="273" y1="210" x2="273" y2="540" />
                    <line x1="200" y1="210" x2="127" y2="120" />
                    <line x1="200" y1="210" x2="163" y2="68" />
                    <line x1="200" y1="210" x2="200" y2="50" />
                    <line x1="200" y1="210" x2="237" y2="68" />
                    <line x1="200" y1="210" x2="273" y2="120" />
                  </g>

                  {/* Threshold */}
                  <g stroke="#C7A05C" strokeWidth="1.6" opacity="0.55">
                    <line x1="70" y1="528" x2="330" y2="528" />
                    <line x1="82" y1="536" x2="318" y2="536" />
                  </g>

                  {/* Door ring handle */}
                  <circle cx="300" cy="360" r="9" fill="none" stroke="#C7A05C" strokeWidth="3" />
                  <line x1="300" y1="369" x2="300" y2="380" stroke="#C7A05C" strokeWidth="3" strokeLinecap="round" />

                  {/* Center jewel */}
                  <circle cx="200" cy="210" r="7" fill="#E0C48C" stroke="#C7A05C" strokeWidth="1.4" />

                  {/* Floral vine */}
                  <g id="vineSrc" fill="none" stroke="#A6B37B" strokeWidth="2" strokeLinecap="round">
                    <path d="M40,222 C10,192 16,144 52,118 C36,150 34,180 45,204" />
                    <circle cx="52" cy="118" r="4" fill="#DDA785" stroke="none" />
                    <circle cx="30" cy="160" r="3" fill="#C7A05C" stroke="none" />
                    <circle cx="42" cy="200" r="3" fill="#CBD4A9" stroke="none" />
                  </g>
                  <use href="#vineSrc" transform="translate(400,0) scale(-1,1)" />

                  {/* Ambient sparkles */}
                  <g fill="#C7A05C">
                    <path d="M336,96 l4,11 11,4 -11,4 -4,11 -4,-11 -11,-4 11,-4 Z" opacity="0.85" />
                    <path d="M66,470 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3 Z" opacity="0.7" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Scroll Cue */}
          <div className="scroll-cue">
            <span>Scroll to Wander</span>
            <span className="line" />
          </div>
        </div>
      </section>

      {/* ═══════ ATELIERS — Category Door Cards ═══════ */}
      <section className="archive-section" id="categories" style={{ position: 'relative', overflow: 'hidden' }}>
        <ConstellationBackground />
        {/* Left background watermark constellation */}
        <svg width="240" height="340" viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '2%', top: '15%', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} className="hidden lg:block">
          <path d="M40,280 L40,120 C40,60 80,30 120,30 C160,30 200,60 200,120 L200,280 Z" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <line x1="120" y1="30" x2="60" y2="100" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="30" x2="180" y2="100" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="100" x2="120" y2="160" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="180" y1="100" x2="120" y2="160" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="160" x2="120" y2="280" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="100" x2="60" y2="220" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="180" y1="100" x2="180" y2="220" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M120,20 L123,27 L130,30 L123,33 L120,40 L117,33 L110,30 L117,27 Z" fill="var(--gold)" />
          <circle cx="60" cy="100" r="3" fill="var(--gold)" />
          <circle cx="180" cy="100" r="3" fill="var(--gold)" />
          <path d="M120,150 L123,157 L130,160 L123,163 L120,170 L117,163 L110,160 L117,157 Z" fill="var(--gold)" />
          <circle cx="60" cy="220" r="3" fill="var(--gold)" />
          <circle cx="180" cy="220" r="3" fill="var(--gold)" />
          <circle cx="120" cy="280" r="4" fill="var(--gold)" />
        </svg>

        {/* Right background watermark constellation */}
        <svg width="240" height="340" viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '2%', bottom: '10%', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} className="hidden lg:block">
          <path d="M40,280 L40,120 C40,60 80,30 120,30 C160,30 200,60 200,120 L200,280 Z" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <line x1="40" y1="120" x2="200" y2="120" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="30" x2="120" y2="280" stroke="var(--gold)" strokeWidth="1" />
          <line x1="40" y1="120" x2="120" y2="200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="120" x2="120" y2="200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M120,20 L122,25 L127,27 L122,29 L120,34 L118,29 L113,27 L118,25 Z" fill="var(--gold)" />
          <circle cx="40" cy="120" r="3.5" fill="var(--gold)" />
          <circle cx="200" cy="120" r="3.5" fill="var(--gold)" />
          <path d="M120,195 L123,202 L130,205 L123,208 L120,215 L117,208 L110,205 L117,202 Z" fill="var(--gold)" />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <ScrollRevealSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>Five Doors, Five Mediums</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)',
                marginTop: '10px',
              }}>Explore the Ateliers</h2>
              <p style={{
                color: 'var(--ink-soft)',
                maxWidth: '48ch',
                margin: '14px auto 0',
                fontSize: '1rem',
                lineHeight: 1.7,
              }}>
                Each door opens onto a different medium of student craft — wander through as many as call to you.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Wood divider */}
          <div className="wood-divider" style={{ marginBottom: '48px' }}>
            <span className="branch-line" />
            <span className="diamond" />
            <span className="branch-line" />
          </div>

          {/* Categories Carousel */}
          <Carousel items={categoryCards} />
        </div>
      </section>

      {/* ═══════ ABOUT TEASER ═══════ */}
      <section className="section" id="about-teaser">
        <FairyDust count={16} />
        <div className="container">
          <ScrollRevealSection>
            <div style={{
              textAlign: 'center',
              maxWidth: '640px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <span className="eyebrow" style={{ marginBottom: '12px' }}>About ADA</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)',
                marginBottom: '20px',
              }}>Inspired by the elegance of Art Nouveau</h2>
              <p style={{
                color: 'var(--ink-soft)',
                fontSize: '1rem',
                lineHeight: 1.8,
                maxWidth: '56ch',
                marginBottom: '24px',
              }}>
                The quiet magic of nature, and the belief that every person journeys through different seasons of life, ADA invites visitors into a world where imagination and emotion intertwine.
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                letterSpacing: '0.1em',
                color: 'var(--ink-soft)',
                marginBottom: '28px',
              }}>— Est. 2026</p>
              <Link to="/about" className="btn btn-ghost btn-sm">
                Read Our Full Story
              </Link>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
}
