import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import MarqueeStrip from './components/MarqueeStrip';
import WorkSection from './components/WorkSection';
import DigitalGarden from './components/DigitalGarden';
import ConstellationSection from './components/ConstellationSection';
import AboutSection from './components/AboutSection';
import CustomCursor from './components/CustomCursor';
import ScrollReveal from './components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Maitrayee Dighe — Engineer, Writer, Builder',
  description:
    'First-year B.E. IT student at Thakur Shyamnarayan College, Mumbai. Building NexKirana, writing a novel, and showing up every time.',
};

export default function HomePage() {
  return (
    <>
      {/* Paper grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom cursor — client only */}
      <CustomCursor />

      {/* Scroll reveal orchestrator */}
      <ScrollReveal />

      {/* Navigation */}
      <Header />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Marquee Strip */}
        <MarqueeStrip />

        {/* 3. Work */}
        <WorkSection />

        {/* 4. Digital Garden */}
        <DigitalGarden />

        {/* 5. Constellation */}
        <ConstellationSection />

        {/* 6. About + Manifesto */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}