'use client';

import React, { useState } from 'react';

interface GardenCard {
  category: string;
  front: string;
  back: string;
}

const cards: GardenCard[] = [
  {
    category: 'LEARNING',
    front: 'C, Python, and DSU — the grammar of thinking like an engineer.',
    back: "First year means building the foundation. I'm less interested in what I'm learning and more interested in how it's changing the way I see problems.",
  },
  {
    category: 'READING',
    front: "Can't Hurt Me — David Goggins. Currently.",
    back: 'Not a productivity book. A confrontation. The argument is that most of what stops you is a story you\'re telling yourself.',
  },
  {
    category: 'EXPLORING',
    front: 'Why do informal networks outlast formal systems?',
    back: 'It keeps showing up everywhere I look — in kirana stores, in stray animal welfare, in how communities actually organise. The answer is always trust, never technology.',
  },
];

interface FlipCardProps {
  card: GardenCard;
  index: number;
}

function FlipCard({ card, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card reveal"
      style={{
        height: '280px',
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
      aria-label={`${card.category}: tap to reveal more`}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%' }}>
        {/* Front */}
        <div
          className="flip-card-front bg-background border border-hairline p-8 flex flex-col justify-between"
          style={{ height: '100%' }}
        >
          <div>
            <div className="hairline mb-4" />
            <span
              className="font-sans text-fog uppercase tracking-caps block mb-4"
              style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
            >
              {card.category}
            </span>
          </div>
          <p className="font-serif italic text-foreground leading-snug" style={{ fontSize: '1rem' }}>
            {card.front}
          </p>
          <span
            className="font-sans text-fog/60 text-xs mt-4 block"
            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
          >
            HOVER TO EXPLORE
          </span>
        </div>

        {/* Back */}
        <div
          className="flip-card-back bg-charcoal p-8 flex flex-col justify-center"
          style={{ height: '100%' }}
        >
          <span
            className="font-sans text-fog uppercase tracking-caps block mb-4"
            style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
          >
            {card.category}
          </span>
          <p className="font-sans text-cream/80 leading-relaxed" style={{ fontSize: '0.875rem' }}>
            {card.back}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DigitalGarden() {
  return (
    <section
      id="garden"
      className="bg-parchment"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <h2
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Digital Garden
          </h2>
          <p className="font-sans text-fog mt-2" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
            What's alive in my head right now.
          </p>
        </div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FlipCard key={card.category} card={card} index={i} />
          ))}
        </div>

        {/* Animals aside */}
        <p
          className="font-serif italic text-fog text-center mt-16 reveal"
          style={{ fontSize: '0.875rem' }}
        >
          I believe stray animals deserve better than indifference. That belief shows up in how I move through the world.
        </p>
      </div>
    </section>
  );
}