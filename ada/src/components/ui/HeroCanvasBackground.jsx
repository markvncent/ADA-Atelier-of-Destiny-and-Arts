import { useEffect, useRef } from 'react';

export default function HeroCanvasBackground() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedRef = useRef({});
  const easedFrameRef = useRef(1);
  const isVisibleRef = useRef(true);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Expose drawing function to use across resizing/ticks
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find nearest loaded frame
    let img = imagesRef.current[index];
    if (!img || !loadedRef.current[index]) {
      let found = false;
      // Search outward for the nearest loaded frame
      for (let dist = 1; dist < 120; dist++) {
        const lower = index - dist;
        const upper = index + dist;
        if (lower >= 1 && imagesRef.current[lower] && loadedRef.current[lower]) {
          img = imagesRef.current[lower];
          found = true;
          break;
        }
        if (upper <= 121 && imagesRef.current[upper] && loadedRef.current[upper]) {
          img = imagesRef.current[upper];
          found = true;
          break;
        }
      }
      // Absolute fallback is frame 1
      if (!found) {
        img = imagesRef.current[1];
      }
    }

    if (img && img.complete && img.naturalWidth !== 0) {
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let sWidth = img.width;
      let sHeight = img.height;
      let sx = 0;
      let sy = 0;

      // Calculate source crop dimensions for 'cover' behavior
      if (canvasRatio > imgRatio) {
        sHeight = img.width / canvasRatio;
        sy = (img.height - sHeight) / 2;
      } else {
        sWidth = img.height * canvasRatio;
        sx = (img.width - sWidth) / 2;
      }

      // Add mouse parallax offsets by shrinking the crop window slightly (6% padding) and offsetting it
      const scaleDown = 0.06;
      const cropW = sWidth * (1 - scaleDown);
      const cropH = sHeight * (1 - scaleDown);
      const borderW = sWidth * scaleDown * 0.5;
      const borderH = sHeight * scaleDown * 0.5;

      const parallaxX = mouseXRef.current * borderW * 2;
      const parallaxY = mouseYRef.current * borderH * 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        sx + borderW + parallaxX,
        sy + borderH + parallaxY,
        cropW,
        cropH,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  };

  // Track mouse coordinates for background parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseXRef.current = (e.clientX / window.innerWidth) - 0.5;
      mouseYRef.current = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1. Initial asset setup and background lazy preloading
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = mediaQuery.matches;

    // Load Frame 1 immediately for instant background presence
    if (!imagesRef.current[1]) {
      const img = new Image();
      img.src = '/assets/hero-frames/frame-001.jpg';
      img.onload = () => {
        loadedRef.current[1] = true;
        drawFrame(1);
      };
      imagesRef.current[1] = img;
    }

    if (prefersReduced) {
      drawFrame(1);
      return;
    }

    // Lazy load the remaining frames progressively
    const totalFrames = 121;
    const loadRemaining = () => {
      for (let i = 2; i <= totalFrames; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = `/assets/hero-frames/frame-${String(i).padStart(3, '0')}.jpg`;
          img.onload = () => {
            loadedRef.current[i] = true;
          };
          imagesRef.current[i] = img;
        }
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadRemaining);
    } else {
      setTimeout(loadRemaining, 500);
    }
  }, []);

  // 2. Track element visibility to conserve CPU/GPU cycles when scrolled out of view
  useEffect(() => {
    const heroEl = document.getElementById('home');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // 3. Smooth animation updates via requestAnimationFrame loop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let animationFrameId;

    const tick = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const currentScrollY = window.scrollY;
      const heroEl = document.getElementById('home');
      const parentEl = heroEl ? heroEl.parentElement : null;
      
      let scrollThreshold = window.innerHeight;
      if (parentEl && parentEl.classList.contains('hero-scroll-wrapper')) {
        scrollThreshold = Math.max(parentEl.offsetHeight - window.innerHeight, 100);
      } else if (heroEl) {
        scrollThreshold = heroEl.offsetHeight;
      }

      // Calculate scroll progression percentage
      const progress = Math.min(Math.max(currentScrollY / scrollThreshold, 0), 1);
      const targetFrame = progress * 120 + 1;

      // Smoothly ease/interpolate frame changes
      easedFrameRef.current += (targetFrame - easedFrameRef.current) * 0.15;

      // Apply subtle sinusoidal idle motion overlay
      const time = performance.now() * 0.0015;
      const idleOffset = Math.sin(time) * 1.2;

      const finalFrameVal = easedFrameRef.current + idleOffset;
      const frameIndex = Math.min(Math.max(Math.round(finalFrameVal), 1), 121);

      drawFrame(frameIndex);

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 4. Handle resize and retina scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;

      // Redraw immediately on resize
      const time = performance.now() * 0.0015;
      const idleOffset = Math.sin(time) * 1.2;
      const finalFrameVal = easedFrameRef.current + idleOffset;
      const frameIndex = Math.min(Math.max(Math.round(finalFrameVal), 1), 121);
      drawFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Light parchment/cream overlay to keep the dark ink text legible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,247,239,0.55)_0%,rgba(251,247,239,0.72)_50%,rgba(251,247,239,0.85)_100%)]" />
    </div>
  );
}
