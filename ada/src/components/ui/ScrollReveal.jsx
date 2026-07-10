import React from 'react';

/**
  * ScrollReveal Wireframe Reset — renders text instantly without GSAP scroll triggers or styling animations.
  */
export default function ScrollReveal({
  children,
  containerClassName = '',
  textClassName = '',
}) {
  return (
    <div className={containerClassName}>
      <p className={textClassName}>{children}</p>
    </div>
  );
}
