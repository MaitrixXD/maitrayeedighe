'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let rafId: number;
    let isHover = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      curX = lerp(curX, mouseX, 0.12);
      curY = lerp(curY, mouseY, 0.12);
      if (dotRef.current) {
        dotRef.current.style.left = `${curX}px`;
        dotRef.current.style.top = `${curY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHover = true;
      dotRef.current?.classList.add('cursor-hover');
    };

    const onMouseLeaveInteractive = () => {
      isHover = false;
      dotRef.current?.classList.remove('cursor-hover', 'cursor-image');
    };

    const onMouseEnterImage = () => {
      dotRef.current?.classList.add('cursor-image');
      dotRef.current?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    const imageEls = document.querySelectorAll('img');
    imageEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterImage);
      el.addEventListener('mouseleave', () => {
        dotRef.current?.classList.remove('cursor-image');
        if (isHover) dotRef.current?.classList.add('cursor-hover');
      });
    });

    document.body.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
    };
  }, []);

  if (isTouch) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}