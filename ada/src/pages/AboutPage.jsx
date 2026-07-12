import { useRef } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';
import ScrollRevealSection from '../components/ui/ScrollRevealSection';
import FairyDust from '../components/ui/FairyDust.jsx';

export default function AboutPage() {
  const scrollContainerRef = useRef(null);

  const sections = [
    {
      title: null,
      text: "ADA Curatorial Guild - The official Curatorial Body of BS BIO 3B [Group 1]",
      isHeader: true,
    },
    {
      text: "Our journey begins with Photography. Here, everyday moments and frozen light are gathered for a second look. Each photograph captures the raw interaction between subject, shadows, and perspective, documenting passing frames of time with precision and care.",
    },
    {
      text: "Next, we explore Digital Art. This room highlights works built pixel by pixel, tracing the boundary where technical software meets creative imagination. From concept illustrations to digital paintings, these visual compositions demonstrate the co-existence of technology and artistic expression.",
    },
    {
      text: "We then enter Traditional & Painting. This drawer holds the archive's oldest creative language: brush, canvas, and pigment. From oil colors and acrylics to hand-drawn sketches capturing line, form, and raw observation, this collection honors the timeless tactility of the canvas.",
    },
    {
      text: "Further along, we encounter Sculpture & 3D. Here, artistic ideas are given physical and virtual form, modeled in digital spaces or shaped using sustainable, recycled materials. These three-dimensional works bridge historical proportions with contemporary architectural preservation.",
    },
    {
      text: "We step into the acoustic sanctuary of Music & Audio. Sound, composition, and original songwriting are compiled here as instruments of reflection, featuring original compositions and tunes that respond to contemporary themes.",
    },
    {
      text: "In Film & Video, time and movement weave cinematic narratives. This screening room brings visual storytelling, motion edits, and sound design together into a single, cohesive cinematic experience.",
    },
    {
      text: "Finally, we arrive at Writing & Poetry. Dedicated to words kept for their own sake, this section documents written reflection, verse, and creative storytelling, keeping thoughts alive for future readers.",
    },
    {
      text: "At its core, the mission of ADA remains to create an inclusive virtual space that celebrates artistic expression across all mediums, making art accessible, dialogic, and interactive for everyone.",
      isClosing: true,
    },
  ];

  return (
    <div className="about-page-body" style={{ position: 'relative', minHeight: '100vh' }}>
      <FairyDust count={28} />
      {/* Decorative gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '400px',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(203,212,169,0.35), transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header className="page-hero">
        <span className="eyebrow">All About</span>
        <h1 style={{ marginTop: '14px' }}>ADA</h1>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'var(--ink-soft)',
          marginTop: '8px',
        }}>
          An Atelier of Destiny and Arts
        </p>
      </header>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 120px',
        }}
      >
        {sections.map((section, index) => (
          <ScrollRevealSection key={index}>
            <div style={{
              marginBottom: section.isClosing ? '0' : '40px',
              paddingTop: section.isClosing ? '32px' : '0',
              borderTop: section.isClosing ? '1px solid var(--line)' : 'none',
            }}>
              {section.isHeader ? (
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  textAlign: 'center',
                  letterSpacing: '0.03em',
                }}>
                  {section.text}
                </p>
              ) : (
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.85,
                  color: section.isClosing ? 'var(--ink)' : 'var(--ink-soft)',
                  fontWeight: section.isClosing ? 500 : 400,
                  textAlign: 'justify',
                }}>
                  {section.text}
                </p>
              )}
            </div>
          </ScrollRevealSection>
        ))}
      </div>
    </div>
  );
}
