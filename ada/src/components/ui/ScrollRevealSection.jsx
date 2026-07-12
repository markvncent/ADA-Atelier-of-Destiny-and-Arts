import { useEffect, useRef } from 'react';

/**
 * ScrollRevealSection — Fade-in-on-scroll wrapper.
 * Uses IntersectionObserver to apply the `.reveal.in` class when visible.
 */
export default function ScrollRevealSection({ children, className = '', threshold = 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
