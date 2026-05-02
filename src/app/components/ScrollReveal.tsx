'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // transitionDelay style is in ms (e.g. "80ms") — parse correctly
            const delayStr = el.style.transitionDelay || '0ms';
            const delayMs = parseFloat(delayStr); // "80ms" → 80, "0" → 0
            setTimeout(() => {
              el.classList.add('visible');
            }, isNaN(delayMs) ? 0 : delayMs);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}