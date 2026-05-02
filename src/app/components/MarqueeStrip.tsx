import React from 'react';

const ITEMS = [
  'BUILDER',
  'WRITER',
  'STUDENT',
  'MUMBAI',
  'B.E. IT',
  'STORYTELLER',
  'COMMUNITY',
  'NEXKIRANA',
  'NOVELIST',
  'IN PROGRESS',
  'THAKUR COLLEGE',
];

const text = ITEMS?.join(' · ') + ' · ';
const doubled = text + text;

export default function MarqueeStrip() {
  return (
    <div
      className="w-full overflow-hidden bg-terracotta py-5 border-y border-terracotta/20"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[doubled]?.map((t, i) => (
          <span
            key={i}
            className="font-sans font-semibold text-cream uppercase whitespace-nowrap pr-0"
            style={{
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              letterSpacing: '0.15em',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}