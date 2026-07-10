import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categories from '../data/categoryConfig.js';
import { getCategories } from '../services/categories.js';

export default function HomePage() {
  const [renderedCategories, setRenderedCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      let finalCategories = categories;

      try {
        const dbCats = await getCategories();
        if (dbCats && dbCats.length > 0) {
          // Merge database category metadata with local config styles (icons, gradients)
          // We match by id to support clean URL slugs and self-heal any old database names
          finalCategories = categories.map((localConfig) => {
            const dbCat = dbCats.find((c) => c.id === localConfig.id) || {};
            return {
              id: localConfig.id,
              slug: localConfig.slug,
              name: dbCat.name && !dbCat.name.includes('Silid-') ? dbCat.name : localConfig.name,
              description: dbCat.description && !dbCat.description.includes('Silid-') && !dbCat.description.includes('silid-') ? dbCat.description : localConfig.description,
              expanded_description: dbCat.expanded_description && !dbCat.expanded_description.includes('Silid-') ? dbCat.expanded_description : localConfig.expanded_description,
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

  return (
    <div className="relative">
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-container">
          <span className="eyebrow hero-eyebrow">Atelier of Destiny and Arts</span>
          <h1>ADA</h1>
          <p className="tagline">Where Creativity Blossoms and Destinies Unfold</p>
          <p className="lede">
            A living collection of art, sound, and story — gathered across seven mediums and kept open for anyone curious enough to look closer.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#categories">Enter the Archive</a>
            <Link className="btn btn-secondary" to="/about">Our Story</Link>
          </div>
        </div>
      </section>

      {/* ARCHIVE INDEX (CATEGORIES GRID) */}
      <section className="archive-section px-6 md:px-12 border-t" id="categories">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <span className="eyebrow mb-3 block">Seven Mediums, One Collection</span>
            <h2 className="text-3xl md:text-5xl mb-4">The Index</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto italic text-lg leading-relaxed">
              Every piece in ADA is filed by medium, not by fame. Choose a drawer to open.
            </p>
          </div>

          <div className="divider mb-16">
          </div>

          <div className="card-grid">
            {renderedCategories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="card" id={`category-door-${cat.slug}`}>
                <span className="tab">{cat.hryRef}</span>
                <span className="ref">Ref. {cat.refName}</span>
                <div className="medium-icon">{cat.iconText}</div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <span className="enter">
                  Open Drawer <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER (A quiet room for loud ideas) */}
      <section className="relative py-24 px-6 md:px-12 bg-neutral-100 text-black border-t border-b" id="about-teaser" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-3">About ADA</span>
          <h2 className="text-3xl md:text-4xl mb-6">A quiet room for loud ideas</h2>
          <p className="text-lg leading-relaxed text-neutral-600 max-w-2xl text-center mb-8">
            ADA began as one question: where does student work go once the grading is done? This is that place — an open, growing archive where photography sits beside film, and a poem is filed with the same care as a painting.
          </p>
          <div className="text-lg tracking-[0.1em] text-neutral-500 mb-8">— Est. 2026</div>
          <Link to="/about" className="btn btn-secondary">
            Read Our Full Story
          </Link>
        </div>
      </section>
    </div>
  );
}
