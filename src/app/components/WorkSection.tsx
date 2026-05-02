'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface Project {
  index: string;
  name: string;
  description: string;
  tags: string[];
  insight: string;
  lessons: string[];
  modalDescription: string;
  modalLink?: { text: string; href: string };
}

const projects: Project[] = [
  {
    index: '01',
    name: 'NexKirana',
    description:
      'Hyperlocal grocery platform digitizing Kirana store inventory across Mumbai. Early-stage startup focused on customer acquisition through culturally grounded community mechanics and neighbourhood trust.',
    tags: ['Startup', 'Strategy', 'Product'],
    insight:
      '70% of shopkeepers in my area preferred voice notes over text for inventory updates.',
    lessons: [
      'Distribution before product. The kirana relationship is the moat.',
      "Don't build what you think they need. Sit in the shop for a week first.",
      "Community trust compounds. Discounts don't.",
    ],
    modalDescription:
      'NexKirana is a hyperlocal grocery platform built to digitize Kirana store inventory across Mumbai. The insight that launched it: 70% of shopkeepers in the neighborhood preferred voice notes over text. The product had to meet them there — in their language, on their terms, within the texture of how they already worked. Early-stage. Community-first.',
  },
  {
    index: '02',
    name: 'University of Ataraxy',
    description:
      'A 190-page fictional novel written during first year of engineering. To be published by end of 2025.',
    tags: ['Fiction', 'Writing', 'Long-form'],
    insight:
      'Writing 190 pages while studying engineering taught me that discipline is just showing up when the motivation is gone.',
    lessons: [
      'A novel is not written. It is survived.',
      'The world-building came first. The characters made it true.',
      'Finishing is the rarest skill. Everything else is secondary.',
    ],
    modalDescription:
      "University of Ataraxy is Maitrayee's debut fiction novel — 190 pages written across her first year of engineering, expected to be published by end of 2025. It is proof that creative ambition and technical education are not opposites.",
  },
  {
    index: '03',
    name: 'The Blog',
    description:
      'A WordPress blog covering ideas across multiple domains — from technology and culture to personal observations and the things that don\'t fit anywhere else.',
    tags: ['Writing', 'Ideas', 'Ongoing'],
    insight:
      'Writing publicly — even to no one — forces clarity of thought that private notes never do.',
    lessons: [
      'A blog is a thinking tool, not a performance.',
      'Consistency over quality, until quality becomes consistent.',
      "The posts you almost didn't publish are usually the best ones.",
    ],
    modalDescription:
      "A public thinking space. Essays, observations, and ideas that don't fit anywhere else. Writing for an audience of one — and occasionally finding out it resonated with more.",
    modalLink: { text: 'Read the blog →', href: 'https://wordpress.com' },
  },
  {
    index: '04',
    name: 'TPC Social Media',
    description:
      'Social Media Head at the Training and Placement Cell, Thakur Shyamnarayan College of Engineering. Built the TPC\'s Instagram presence from zero — reel concepts, brand voice, event content, and the visual language of a cell that didn\'t have one yet.',
    tags: ['Leadership', 'Content', 'Brand'],
    insight:
      'An institution\'s social presence is its first impression for every student who hasn\'t walked through the door yet.',
    lessons: [
      'Brand voice is built one post at a time. There are no shortcuts.',
      'Content strategy for a college cell means speaking to students, not at them.',
      'Showing up consistently builds trust faster than any single viral moment.',
    ],
    modalDescription:
      'Built from zero. No existing brand voice, no template, no precedent. Every reel concept, caption framework, and event post was a decision about what the TPC should sound like to students who hadn\'t met it yet. That\'s the challenge — and the opportunity.',
  },
];

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ModalProps) {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className={`modal-overlay ${project ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project?.name}
    >
      {project && (
        <div className="relative max-w-3xl w-full mx-auto px-6 md:px-12 py-24">
          <button
            onClick={onClose}
            className="absolute top-8 right-6 md:right-12 text-cream/40 hover:text-cream transition-colors text-2xl font-light"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-fog uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.2em' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            className="font-serif italic text-cream mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1 }}
          >
            {project.name}
          </h2>

          <p className="font-sans text-cream/70 leading-relaxed mb-10" style={{ fontSize: '0.95rem' }}>
            {project.modalDescription}
          </p>

          <div className="border-l-2 border-terracotta pl-6 mb-10">
            <p className="font-serif italic text-terracotta" style={{ fontSize: '0.9rem' }}>
              "{project.insight}"
            </p>
          </div>

          <div className="space-y-3">
            <p
              className="font-sans text-fog uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.2em' }}
            >
              Lessons Learned
            </p>
            <ul className="space-y-2">
              {project.lessons.map((lesson, i) => (
                <li
                  key={i}
                  className="font-sans text-cream/60 text-sm flex gap-3 leading-relaxed"
                >
                  <span className="text-terracotta shrink-0 mt-0.5">—</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          {project.modalLink && (
            <a
              href={project.modalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 font-sans text-terracotta animated-underline pb-0.5"
              style={{ fontSize: '0.875rem' }}
            >
              {project.modalLink.text}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  lessons: string[];
}

function LessonsAccordion({ lessons }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-sans text-fog hover:text-foreground transition-colors"
        style={{ fontSize: '11px', letterSpacing: '0.05em' }}
      >
        <span className="text-lg leading-none">{open ? '−' : '+'}</span>
        Lessons Learned
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <ul className="pt-4 space-y-2 pl-4">
          {lessons.map((lesson, i) => (
            <li
              key={i}
              className="font-sans text-fog text-sm flex gap-2 leading-relaxed"
            >
              <span className="text-terracotta shrink-0">—</span>
              {lesson}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  const openModal = useCallback((project: Project) => {
    setActiveModal(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section
      id="work"
      className="px-6 md:px-12"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      {/* Section header */}
      <div className="mb-16 reveal">
        <h2
          className="font-serif italic text-foreground"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          Work
        </h2>
        <p className="font-sans text-fog mt-2" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
          Things I've built, started, and shipped.
        </p>
      </div>

      {/* Project rows */}
      <div className="max-w-6xl">
        {projects.map((project, i) => (
          <div key={project.index}>
            <div className="hairline" />
            <div
              className="project-row cursor-pointer py-8 px-2 md:px-4 grid grid-cols-12 gap-4 items-start reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => openModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(project)}
              aria-label={`View details for ${project.name}`}
            >
              {/* Index / Arrow */}
              <div className="col-span-1 relative h-8 flex items-center">
                <span
                  className="project-row-index font-serif text-2xl md:text-4xl text-hairline absolute"
                  style={{ lineHeight: 1 }}
                >
                  {project.index}
                </span>
                <span className="project-row-arrow font-sans text-foreground text-xl absolute">→</span>
              </div>

              {/* Name + description */}
              <div className="col-span-12 md:col-span-7 lg:col-span-8">
                <h3
                  className="project-row-name-underline font-serif italic text-foreground inline"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                >
                  {project.name}
                </h3>
                <p
                  className="font-sans text-fog mt-2 leading-relaxed"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                >
                  {project.description}
                </p>
                <p
                  className="font-serif italic text-terracotta mt-3"
                  style={{ fontSize: '0.8rem' }}
                >
                  Insight: {project.insight}
                </p>
                <LessonsAccordion lessons={project.lessons} />
              </div>

              {/* Tags */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-wrap gap-2 md:justify-end md:pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-fog uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.15em' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="hairline" />
      </div>

      {/* Footer note */}
      <p
        className="text-right font-sans text-fog italic mt-6 reveal"
        style={{ fontSize: '0.75rem' }}
      >
        More work incoming. This section grows.
      </p>

      <ProjectModal project={activeModal} onClose={closeModal} />
    </section>
  );
}