'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Garden', href: '#garden' },
  { label: 'Constellation', href: '#constellation' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'bg-charcoal/90 backdrop-blur-md' : 'bg-transparent'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ height: '80px' }}
      >
        {/* Logo / Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <AppLogo size={28} />
          <span
            className="font-serif italic text-cream text-sm tracking-[0.1em] hidden sm:block"
            style={{ letterSpacing: '0.15em' }}
          >
            MD
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="nav-link text-cream/60 hover:text-cream transition-colors text-[11px] font-sans font-semibold uppercase tracking-caps"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[190] bg-charcoal/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-400 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-serif italic text-cream text-4xl transition-colors hover:text-terracotta"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 400ms ease ${i * 80}ms, transform 400ms ease ${i * 80}ms, color 200ms ease`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}