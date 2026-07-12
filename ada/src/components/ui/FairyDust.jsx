import { useEffect, useRef } from 'react';

/**
 * FairyDust — Floating golden particle sparkles.
 * Creates an ambient, enchanted atmosphere with drifting gold motes and four-pointed stars.
 * @param {number} count - Number of sparkle particles (default 24 for more visibility)
 */
export default function FairyDust({ count = 24 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const isStar = Math.random() > 0.6; // 40% chance of being a 4-pointed star SVG particle
      const size = Math.floor(Math.random() * 8) + 6; // sizes between 6px and 14px

      const particle = document.createElement('span');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${20 + Math.random() * 70}%`; // wider vertical range
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${(Math.random() * 9).toFixed(2)}s`;
      particle.style.animationDuration = `${(8 + Math.random() * 6).toFixed(2)}s`;
      particle.style.display = 'block';
      particle.style.position = 'absolute';

      if (isStar) {
        // SVG four-pointed star constellation pattern particle
        particle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 0 4px var(--gold-soft));">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="var(--gold)"/>
          </svg>
        `;
        particle.style.background = 'none';
        particle.style.borderRadius = '0';
      } else {
        // Classic glowing circular particle, but larger and brighter
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, #FFF7D6 20%, var(--gold-soft) 50%, rgba(224,196,140,0) 80%)';
        particle.style.boxShadow = '0 0 8px var(--gold-soft)';
      }

      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [count]);

  return <div ref={containerRef} className="fairy-dust" style={{ pointerEvents: 'none' }} />;
}
