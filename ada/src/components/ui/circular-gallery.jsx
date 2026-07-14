import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// A simple utility for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const CircularGallery = React.forwardRef(
  ({ items, className, radius = 600, autoRotateSpeed = 0.015, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false); // active drag tracking (disables transitions)
    const [isPaused, setIsPaused] = useState(false); // pauses auto-rotation
    const [dynamicRadius, setDynamicRadius] = useState(radius);
    const [isDragging, setIsDragging] = useState(false);

    const anglePerItem = items && items.length > 0 ? 360 / items.length : 0;

    const scrollTimeoutRef = useRef(null);
    const pauseTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);

    // Responsive radius calculation (smaller spacing requested)
    useEffect(() => {
      const handleResize = () => {
        if (radius !== 600) {
          setDynamicRadius(radius);
          return;
        }
        if (window.innerWidth < 768) {
          setDynamicRadius(250); // Mobile and tablet are identical (expanded spacing)
        } else if (window.innerWidth < 1024) {
          setDynamicRadius(320); // Expand small desktop spacing
        } else {
          setDynamicRadius(400); // Expand large desktop spacing
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, [radius]);

    // Handle auto-rotation
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isPaused) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isPaused, autoRotateSpeed]);

    const pauseAutoRotation = (duration = 2500) => {
      setIsPaused(true);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, duration);
    };

    // Grab & Drag Gesture Event Handlers
    const handleStart = (clientX) => {
      setIsScrolling(true);
      setIsDragging(true);
      pauseAutoRotation();
      startXRef.current = clientX;
      startRotationRef.current = rotation;
    };

    const handleMove = (clientX) => {
      if (!startXRef.current || isScrolling === false) return;
      const deltaX = clientX - startXRef.current;
      // 1px drag = 0.22 degrees of rotation
      setRotation(startRotationRef.current + deltaX * 0.22);
      pauseAutoRotation();
    };

    const handleEnd = () => {
      setIsScrolling(false);
      setIsDragging(false);
      startXRef.current = 0;

      // Snap to nearest item smoothly
      const closestIndex = Math.round(-rotation / anglePerItem);
      setRotation(-closestIndex * anglePerItem);

      // Resume auto-rotation immediately when interaction ends
      setIsPaused(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };

    // Mouse handlers
    const onMouseDown = (e) => {
      // Only drag with left click
      if (e.button !== 0) return;
      handleStart(e.clientX);
    };

    const onMouseMove = (e) => {
      if (startXRef.current) {
        handleMove(e.clientX);
      }
    };

    // Touch handlers
    const onTouchStart = (e) => {
      handleStart(e.touches[0].clientX);
    };

    const onTouchMove = (e) => {
      handleMove(e.touches[0].clientX);
    };



    // Arrow Toggle Controls
    const handlePrev = (e) => {
      e.stopPropagation();
      // Snap to the exact previous item index
      const closestIndex = Math.round(-rotation / anglePerItem);
      const targetIndex = closestIndex - 1;
      setRotation(-targetIndex * anglePerItem);
      // Pause briefly for the transition, then resume immediately
      pauseAutoRotation(600);
    };

    const handleNext = (e) => {
      e.stopPropagation();
      // Snap to the exact next item index
      const closestIndex = Math.round(-rotation / anglePerItem);
      const targetIndex = closestIndex + 1;
      setRotation(-targetIndex * anglePerItem);
      // Pause briefly for the transition, then resume immediately
      pauseAutoRotation(600);
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-[440px] md:h-[470px] flex items-center justify-center select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={{ perspective: '2000px' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
        {...props}
      >
        {/* Left Arrow Toggle Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous item"
          className="absolute left-2 md:left-6 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full border border-solid border-[var(--gold)] bg-white flex items-center justify-center text-mauve-deep hover:bg-[var(--gold)] hover:text-cream transition-all duration-300 shadow-md cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Right Arrow Toggle Button */}
        <button
          onClick={handleNext}
          aria-label="Next item"
          className="absolute right-2 md:right-6 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full border border-solid border-[var(--gold)] bg-white flex items-center justify-center text-mauve-deep hover:bg-[var(--gold)] hover:text-cream transition-all duration-300 shadow-md cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Gallery Wheel Container */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isScrolling ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.08, 1 - (normalizedAngle / 90)); // Focus opacity curve tightly

            return (
              <div
                key={i}
                role="group"
                className="absolute w-[240px] md:w-[260px] h-[370px] md:h-[400px]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${dynamicRadius}px)`,
                  left: '50%',
                  top: '50%',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear',
                  pointerEvents: opacity < 0.4 ? 'none' : 'auto', // disable clicks on elements at the back
                  backfaceVisibility: 'hidden'
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
