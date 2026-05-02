'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface TooltipTriggerProps {
  text: string;
  tooltip: string;
}

function TooltipTrigger({ text, tooltip }: TooltipTriggerProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline">
      <span
        className="dotted-trigger"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}>
        
        {text}
      </span>
      <span
        className="absolute bottom-full left-0 mb-2 z-50 pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
          whiteSpace: 'nowrap'
        }}>
        
        <span
          className="font-sans text-cream block px-3 py-2"
          style={{
            background: '#1C1A17',
            borderRadius: '4px',
            fontSize: '11px',
            letterSpacing: '0.02em',
            border: '1px solid rgba(196,105,58,0.2)'
          }}>
          
          {tooltip}
        </span>
      </span>
    </span>);

}

const skills = [
'Content Strategy',
'Fiction Writing',
'Product Thinking',
'Community Building',
'Environmental Advocacy',
'Chess'];


export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-6 md:px-12"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}>
      
      <div className="max-w-6xl mx-auto">
        {/* Two-column bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          {/* Text — 60% */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-6 font-sans text-foreground leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
              <p>
                First year. One startup. One novel. Social media head. And I'm just getting started.
              </p>
              <p>
                I'm Maitrayee — a first-year Information Technology student at Thakur Shyamnarayan College of Engineering, Mumbai. I'm also{' '}
                <TooltipTrigger
                  text="building a startup"
                  tooltip="NexKirana · Hyperlocal grocery · Mumbai" />
                
                , heading social media for my college's Training and Placement Cell, and finishing a 190-page fiction novel set to be published by 2026.
              </p>
              <p>
                I play chess the way I do most things —{' '}
                <TooltipTrigger
                  text="thinking three moves ahead"
                  tooltip="Chess has been a lifelong companion in patience and strategy." />
                {' '}
                and staying calm when the board gets complicated.
              </p>
              <p>
                I write to think. I build to find out what's possible. I show up for people because I think that's the whole point. This site will look different in a year. That's exactly how it should be.
              </p>
              <p
                className="font-serif italic"
                style={{ color: '#7A7068', fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', borderLeft: '2px solid #C4693A', paddingLeft: '16px', marginTop: '8px' }}>
                I'm learning, observing and forging myself into a better version every single day.
              </p>
            </div>
          </div>

          {/* Photo — 40% */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/5',
                border: '1px solid var(--primary)',
                transform: 'translate(2px, 2px)'
              }}>
              
              <AppImage
                src="/assets/images/ChatGPT_Image_May_2__2026_at_12_28_39_AM-1777699118797.png"
                alt="Maitrayee Dighe in a houndstooth blazer standing in an archway corridor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
                loading="lazy" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Manifesto */}
        <div className="text-center mb-20 reveal">
          <p
            className="font-serif italic text-foreground mx-auto"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              maxWidth: '48rem',
              lineHeight: 1.5
            }}>
            
            <span className="text-terracotta">"</span>
            The map comes after the journey.
            <br />
            Build before you're ready.
            <br />
            The only permission you need is the one you give yourself.
            <span className="text-terracotta">"</span>
          </p>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-3 justify-center reveal">
          {skills.map((skill) =>
          <span key={skill} className="skill-pill">
              {skill}
            </span>
          )}
        </div>
      </div>
    </section>);

}