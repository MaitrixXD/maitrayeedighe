'use client';

import React, { useEffect, useRef } from 'react';

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right' | 'center';
  isOrigin?: boolean;
}

const entries: TimelineEntry[] = [
  {
    year: '',
    title: 'Yashodham High School',
    description:
      'The place that cultivated everything. Chess, curiosity, the habit of showing up, and the quiet belief that a student from Mumbai could do something that mattered.',
    side: 'center',
    isOrigin: true,
  },
  {
    year: '2024',
    title: 'Prerna Internship',
    description:
      'Post-12th grade. The first real taste of what it means to work — before college, before the theory, before the vocabulary for it.',
    side: 'left',
  },
  {
    year: '2024',
    title: 'State Chess Tournament — Qualified Three Consecutive Times',
    description:
      'Back-to-back state qualifications. Chess taught patience, calculation, and composure long before engineering had the chance to.',
    side: 'right',
  },
  {
    year: '2025',
    title: 'IIT Madras Startup Meet-up, Mumbai',
    description:
      'Walked into a room full of builders and walked out with more questions than answers. Met Mr. Prem Khatri — honoured and grateful for the perspective he offered. Good rooms do that.',
    side: 'left',
  },
  {
    year: '2025',
    title: 'Social Media Head, Training & Placement Cell',
    description:
      "Thakur Shyamnarayan College of Engineering. Built the TPC's Instagram presence from zero — brand voice, reel concepts, event content, and a visual identity for a cell that didn't have one yet.",
    side: 'right',
  },
  {
    year: '2025',
    title: 'University of Ataraxy — Manuscript Complete',
    description:
      '190-page debut fiction novel. Written during first year of engineering. To be published by 2026.',
    side: 'left',
  },
  {
    year: '2026',
    title: 'Manori Beach Clean-up',
    description:
      'Showed up. Cleaned up. Met Subhrajit Mukherjee — Water Hero of India — and understood for the first time what decades of quiet environmental commitment actually looks like in a person.',
    side: 'right',
  },
  {
    year: '2026',
    title: 'College Anchor',
    description:
      'Anchored at multiple college events. Being behind the work and being in front of the room are not contradictions — they are the same skill in different clothes.',
    side: 'left',
  },
];

interface EntryProps {
  entry: TimelineEntry;
  index: number;
}

function TimelineEntryItem({ entry, index }: EntryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((obs) => {
          if (obs.isIntersecting) {
            const delay = index * 60;
            setTimeout(() => {
              // Light up dot
              const dot = wrapper.querySelector('.tl-dot') as HTMLElement | null;
              if (dot) dot.classList.add('lit');
              // Fade in block
              setTimeout(() => {
                const block = wrapper.querySelector('.tl-block') as HTMLElement | null;
                if (block) {
                  block.style.opacity = '1';
                  block.style.transform = 'translateX(0) translateY(0)';
                }
              }, 200);
            }, delay);
            observer.unobserve(obs.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [index]);

  // ── ORIGIN MARKER ──────────────────────────────────────────────
  if (entry.isOrigin) {
    return (
      <div ref={wrapperRef} className="flex flex-col items-center mb-16 relative z-10">
        <span
          className="font-sans text-fog uppercase text-center mb-3 block"
          style={{ fontSize: '10px', letterSpacing: '0.3em' }}
        >
          WHERE IT STARTED
        </span>
        <div
          className="tl-dot rounded-full bg-cream mb-4"
          style={{
            width: '10px',
            height: '10px',
            transform: 'scale(0)',
            transition: 'transform 200ms ease-out',
          }}
        />
        <div
          className="tl-block text-center max-w-xs px-4"
          style={{
            opacity: 0,
            transform: 'translateY(0)',
            transition: 'opacity 300ms ease',
          }}
        >
          <h3 className="font-serif italic text-cream mb-2" style={{ fontSize: '1.05rem' }}>
            {entry.title}
          </h3>
          <p className="font-sans leading-relaxed" style={{ fontSize: '0.8rem', color: '#EDE8DF' }}>
            {entry.description}
          </p>
        </div>
      </div>
    );
  }

  // ── REGULAR ENTRY ──────────────────────────────────────────────
  const isLeft = entry.side === 'left';

  return (
    <div ref={wrapperRef} className="relative mb-14">
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex items-start" style={{ minHeight: '72px' }}>
        {/* Left content area */}
        <div className="flex-1 flex justify-end pr-8" style={{ paddingRight: '28px' }}>
          {isLeft && (
            <div
              className="tl-block text-right"
              style={{
                opacity: 0,
                transform: 'translateX(16px)',
                transition: 'opacity 300ms ease 200ms, transform 300ms ease 200ms',
                maxWidth: '280px',
              }}
            >
              <span
                className="font-sans text-fog uppercase block mb-1"
                style={{ fontSize: '10px', letterSpacing: '0.3em' }}
              >
                {entry.year}
              </span>
              <h3 className="font-serif italic text-cream mb-1" style={{ fontSize: '1rem' }}>
                {entry.title}
              </h3>
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.8rem', color: '#EDE8DF' }}>
                {entry.description}
              </p>
            </div>
          )}
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center shrink-0 z-10" style={{ width: '32px' }}>
          <div
            className="tl-dot rounded-full bg-terracotta"
            style={{
              width: '6px',
              height: '6px',
              transform: 'scale(0)',
              transition: 'transform 200ms ease-out',
            }}
          />
        </div>

        {/* Right content area */}
        <div className="flex-1 pl-8" style={{ paddingLeft: '28px' }}>
          {!isLeft && (
            <div
              className="tl-block"
              style={{
                opacity: 0,
                transform: 'translateX(-16px)',
                transition: 'opacity 300ms ease 200ms, transform 300ms ease 200ms',
                maxWidth: '280px',
              }}
            >
              <span
                className="font-sans text-fog uppercase block mb-1"
                style={{ fontSize: '10px', letterSpacing: '0.3em' }}
              >
                {entry.year}
              </span>
              <h3 className="font-serif italic text-cream mb-1" style={{ fontSize: '1rem' }}>
                {entry.title}
              </h3>
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.8rem', color: '#EDE8DF' }}>
                {entry.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden flex items-start">
        {/* Left dot */}
        <div className="flex flex-col items-center shrink-0 z-10 mt-1" style={{ width: '20px' }}>
          <div
            className="tl-dot rounded-full bg-terracotta"
            style={{
              width: '6px',
              height: '6px',
              transform: 'scale(0)',
              transition: 'transform 200ms ease-out',
            }}
          />
        </div>
        {/* Content */}
        <div
          className="tl-block flex-1 pl-4"
          style={{
            opacity: 0,
            transform: 'translateX(-12px)',
            transition: 'opacity 300ms ease 200ms, transform 300ms ease 200ms',
          }}
        >
          <span
            className="font-sans text-fog uppercase block mb-1"
            style={{ fontSize: '10px', letterSpacing: '0.3em' }}
          >
            {entry.year}
          </span>
          <h3 className="font-serif italic text-cream mb-1" style={{ fontSize: '1rem' }}>
            {entry.title}
          </h3>
          <p className="font-sans leading-relaxed" style={{ fontSize: '0.8rem', color: '#EDE8DF' }}>
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConstellationSection() {
  return (
    <section
      id="constellation"
      className="bg-charcoal"
      style={{ scrollMarginTop: '80px', paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="px-6 md:px-12 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-20 reveal">
          <h2
            className="font-serif italic text-cream"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Constellation
          </h2>
          <p className="font-sans text-fog mt-2" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
            The moments that made the map.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical center line — desktop */}
          <div
            className="hidden md:block absolute top-0 bottom-0"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              backgroundColor: 'rgba(122,112,104,0.35)',
            }}
          />
          {/* Vertical left line — mobile */}
          <div
            className="md:hidden absolute top-0 bottom-0"
            style={{
              left: '3px',
              width: '1px',
              backgroundColor: 'rgba(122,112,104,0.35)',
            }}
          />

          {entries.map((entry, i) => (
            <TimelineEntryItem key={i} entry={entry} index={i} />
          ))}
        </div>

        {/* Floating quote — right-aligned on desktop, below on mobile */}
        <div
          className="mt-20 md:ml-auto md:max-w-xs reveal"
          style={{ borderLeft: '1px solid #C4693A', paddingLeft: '24px' }}
        >
          <p className="font-serif italic text-cream/80 leading-snug" style={{ fontSize: '0.95rem' }}>
            "I'm learning, observing and forging myself into a better version every single day."
          </p>
          <span
            className="font-sans text-fog uppercase block mt-3"
            style={{ fontSize: '10px', letterSpacing: '0.2em' }}
          >
            — Maitrayee Dighe
          </span>
        </div>

        {/* Footer note */}
        <p
          className="text-right font-sans text-fog italic mt-10 reveal"
          style={{ fontSize: '0.75rem' }}
        >
          Still adding dots.
        </p>
      </div>
    </section>
  );
}