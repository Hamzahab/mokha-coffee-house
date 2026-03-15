'use client';

import { useEffect } from 'react';

export function BeanParallax() {
  useEffect(() => {
    const section = document.getElementById('beanBreak');
    const photo = document.getElementById('beanPhoto');
    const caption = document.getElementById('beanCaption');
    const quote = document.getElementById('beanQuote');
    if (!section || !photo) return;

    let captionShown = false;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (vh - rect.top) / (vh + rect.height);
        const shift = (progress - 0.5) * 14;
        photo.style.transform = `translateY(${shift}%)`;

        if (!captionShown && progress > 0.35) {
          caption?.classList.add('visible');
          quote?.classList.add('visible');
          captionShown = true;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
