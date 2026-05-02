'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const phrases = [
'Engineer who tells stories.',
'First-year. Long game.',
'Builder. Writer. Chess player.',
'She shows up. Every time.'];


const TYPING_SPEED = 55;
const ERASE_SPEED = 30;
const HOLD_TIME = 2800;

export default function HeroSection() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing');
  const [cursorHidden, setCursorHidden] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const charIndexRef = useRef(0);

  // Typewriter
  useEffect(() => {
    const phrase = phrases[phraseIndex];

    if (phase === 'typing') {
      setCursorHidden(false);
      if (charIndexRef.current < phrase.length) {
        const t = setTimeout(() => {
          setDisplayed(phrase.slice(0, charIndexRef.current + 1));
          charIndexRef.current++;
        }, TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        setPhase('hold');
      }
    }

    if (phase === 'hold') {
      setCursorHidden(true);
      const t = setTimeout(() => {
        setCursorHidden(false);
        setPhase('erasing');
      }, HOLD_TIME);
      return () => clearTimeout(t);
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, ERASE_SPEED);
        return () => clearTimeout(t);
      } else {
        charIndexRef.current = 0;
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhase('typing');
      }
    }
  }, [phase, displayed, phraseIndex]);

  // Photo parallax
  useEffect(() => {
    const hero = heroRef.current;
    const photo = photoRef.current;
    if (!hero || !photo) return;
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      photo.style.transform = `translate(${-dx * 8}px, ${-dy * 8}px)`;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-charcoal overflow-hidden"
      style={{ paddingTop: '80px' }}>
      
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
          'linear-gradient(to right, rgba(245,240,232,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,240,232,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
      

      <div className="relative z-10 w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text — left 55% */}
        <div className="lg:col-span-7 flex flex-col gap-8 py-12 lg:py-0">
          {/* Monogram */}
          <span
            className="font-serif text-cream/40 tracking-[0.2em]"
            style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
            
            MD
          </span>

          {/* Hero headline */}
          <h1
            className="font-serif italic text-cream editorial-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            
            Maitrayee Dighe
          </h1>

          {/* Typewriter */}
          <div
            className="font-serif italic text-cream/80 min-h-[1.4em]"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}
            aria-live="polite"
            aria-atomic="true">
            
            {displayed}
            <span className={`typewriter-cursor ${cursorHidden ? 'cursor-hidden' : ''}`} />
          </div>

          {/* Static subline */}
          <p
            className="font-sans text-fog uppercase tracking-caps"
            style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', letterSpacing: '0.15em' }}>
            
            B.E. INFORMATION TECHNOLOGY · MUMBAI · 2025 →
          </p>
        </div>

        {/* Photo — right 45% */}
        <div className="lg:col-span-5 relative h-[60vh] lg:h-screen overflow-hidden">
          <div
            ref={photoRef}
            className="absolute inset-0 transition-transform duration-75"
            style={{ willChange: 'transform' }}>
            
            <AppImage
              src="/assets/images/IMG_5223-1777699113055.JPG"
              alt="Maitrayee Dighe presenting with a laptop in a classroom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
              style={{ filter: 'grayscale(20%) contrast(1.05)' }} />
            
            {/* Gradient scrim left edge — blends into charcoal */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="scroll-line" />
        <span
          className="font-sans text-primary uppercase tracking-widest"
          style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
          
          SCROLL
        </span>
      </div>
    </section>);

}