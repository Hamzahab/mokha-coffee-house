'use client';

import { useEffect } from 'react';

export function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx - 3.5}px`;
      cursor.style.top = `${my - 3.5}px`;
    };

    const animateRing = () => {
      rx += (mx - rx - 17) * 0.12;
      ry += (my - ry - 17) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    animateRing();

    // Hover effects on interactive elements
    const enter = () => {
      cursor.style.transform = 'scale(2.5)';
      ring.style.transform = 'scale(1.4)';
      ring.style.borderColor = 'rgba(201,169,110,.85)';
    };
    const leave = () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = 'rgba(201,169,110,.45)';
    };

    // Use event delegation on body for hover — works with SPA navigation
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .menu-card, .timeline-item, .tl-row')) enter();
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .menu-card, .timeline-item, .tl-row')) leave();
    };

    document.body.addEventListener('mouseover', onOver);
    document.body.addEventListener('mouseout', onOut);

    // Nav scroll state
    const nav = document.getElementById('site-nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      document.body.removeEventListener('mouseover', onOver);
      document.body.removeEventListener('mouseout', onOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}
