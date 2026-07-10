import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutPage() {
  const scrollContainerRef = useRef(null);

  return (
    <div className="relative z-0 flex-1 flex flex-col justify-start overflow-hidden min-h-0">
      {/* Style block to control styling on About page */}
      <style dangerouslySetInnerHTML={{
        __html: `
        html, body {
          overflow: hidden !important;
          height: 100vh !important;
          height: 100dvh !important;
        }
        
        /* Lock standard layout wrapper scroll and force viewport height */
        .flex.min-h-screen.flex-col {
          height: 100vh !important;
          height: 100dvh !important;
          min-height: 100vh !important;
          min-height: 100dvh !important;
          overflow: hidden !important;
        }

        /* Make main tag fill remaining space and be a flex container */
        main {
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          flex: 1 1 0% !important;
          min-height: 0 !important;
        }

        /* Ensure footer does not shrink */
        footer {
          flex-shrink: 0 !important;
        }

        /* Hide scrollbars but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Justify ScrollReveal paragraphs */
        .justify-paragraphs .scroll-reveal-text {
          text-align: justify !important;
          text-justify: inter-word !important;
        }
      `}} />



      {/* Header (stays static above the scrollable area) */}
      <header className="relative pt-28 pb-8 flex flex-col items-center justify-center text-center select-none z-10 shrink-0">
        <span
          className="uppercase tracking-[0.2em] font-sans font-semibold mb-2"
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            opacity: 0.55
          }}
        >
          All About
        </span>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 px-6 animate-fade-in"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.2em] text-theme-primary font-kingston uppercase">
            Haraya
          </span>
        </motion.div>
      </header>

      {/* Content wrapper */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full px-6 md:px-8 justify-paragraphs overflow-y-auto no-scrollbar min-h-0"
      >
        <div className="mx-auto max-w-[680px] w-full pb-24 space-y-10">
          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-center"
            textClassName="!text-sm md:!text-base font-heading font-semibold text-theme-primary text-center tracking-wide"
          >
            {"Haraya Curatorial Guild - The official Curatorial Body of BS BIO 3B [Group 1]"}
          </ScrollReveal>


          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"Our journey begins with Photography. Here, everyday moments and frozen light are gathered for a second look. Each photograph captures the raw interaction between subject, shadows, and perspective, documenting passing frames of time with precision and care."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"Next, we explore Digital Art. This room highlights works built pixel by pixel, tracing the boundary where technical software meets creative imagination. From concept illustrations to digital paintings, these visual compositions demonstrate the co-existence of technology and artistic expression."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"We then enter Traditional & Painting. This drawer holds the archive's oldest creative language: brush, canvas, and pigment. From oil colors and acrylics to hand-drawn sketches capturing line, form, and raw observation, this collection honors the timeless tactility of the canvas."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"Further along, we encounter Sculpture & 3D. Here, artistic ideas are given physical and virtual form, modeled in digital spaces or shaped using sustainable, recycled materials. These three-dimensional works bridge historical proportions with contemporary architectural preservation."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"We step into the acoustic sanctuary of Music & Audio. Sound, composition, and original songwriting are compiled here as instruments of reflection, featuring original compositions and tunes that respond to contemporary themes."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"In Film & Video, time and movement weave cinematic narratives. This screening room brings visual storytelling, motion edits, and sound design together into a single, cohesive cinematic experience."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"Finally, we arrive at Writing & Poetry. Dedicated to words kept for their own sake, this section documents written reflection, verse, and creative storytelling, keeping thoughts alive for future readers."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify pt-8 border-t border-theme-subtle"
            textClassName="!text-sm font-medium leading-relaxed text-theme-primary font-sans text-justify"
          >
            {"At its core, the mission of Haraya remains to create an inclusive virtual space that celebrates artistic expression across all mediums, making art accessible, dialogic, and interactive for everyone."}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
