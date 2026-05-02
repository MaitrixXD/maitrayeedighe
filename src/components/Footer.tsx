'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function Footer() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [year, setYear] = useState('2025');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dx = e.clientX - centerX;
      const shift = (dx / rect.width) * 0.01;
      el.style.letterSpacing = `${-0.02 + shift}em`;
    };

    const footer = el.closest('footer');
    footer?.addEventListener('mousemove', handleMouseMove);
    return () => footer?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer
      className="bg-charcoal text-cream"
      style={{ paddingTop: '96px', paddingBottom: '64px' }}
    >
      <div className="px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Large quote */}
        <p
          ref={quoteRef}
          className="font-serif italic text-cream editorial-tight mb-6 transition-none"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}
        >
          "Let's build something.
          <br />
          Or just talk."
        </p>

        <p
          className="font-sans text-fog mb-12"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
        >
          I'm always open to interesting people, honest conversations, and new problems.
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20">
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'maitrayee@email.com', href: 'mailto:maitrayee@email.com' },
            { label: 'GitHub', href: 'https://github.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="footer-link font-sans font-medium text-cream/70 pb-1"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Colophon */}
        <p
          className="font-sans text-fog uppercase text-center"
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            lineHeight: 1.8,
          }}
        >
          SET IN FRAUNCES &amp; DM SANS · BUILT WITH NEXT.JS · HOSTED ON THE EDGE
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          © MAITRAYEE DIGHE {year} →
        </p>
      </div>
    </footer>
  );
}