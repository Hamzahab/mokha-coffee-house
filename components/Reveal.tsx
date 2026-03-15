'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Extra CSS class names (e.g. "rd1", "rd2" for staggered delay) */
  className?: string;
  /** HTML tag to render. Defaults to "div". */
  as?: keyof HTMLElementTagNameMap;
  /** Pass-through style */
  style?: React.CSSProperties;
  /** Pass-through id */
  id?: string;
}

export function Reveal({ children, className = '', as: Tag = 'div', style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error -- dynamic tag with ref is fine at runtime
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style} id={id}>
      {children}
    </Tag>
  );
}
