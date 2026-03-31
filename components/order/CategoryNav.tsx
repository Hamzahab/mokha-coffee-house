'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchIcon, CloseIcon } from './Icons';

interface CategoryNavProps {
  categories: { id: string; name: string }[];
  onSearch: (query: string) => void;
}

export function CategoryNav({ categories, onSearch }: CategoryNavProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }
        // Pick the topmost visible section in DOM order
        for (const cat of categories) {
          if (visibleIds.has(cat.id)) {
            setActiveId(cat.id);
            return;
          }
        }
      },
      { rootMargin: '-120px 0px -50% 0px', threshold: 0 },
    );

    for (const cat of categories) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const pill = pillRefs.current.get(activeId);
    if (pill && scrollRef.current) {
      const container = scrollRef.current;
      const left = pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [activeId]);

  function scrollToCategory(id: string) {
    setActiveId(id);
    isScrollingRef.current = true;

    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    onSearch(value);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery('');
    onSearch('');
  }

  return (
    <div className="order-cat-nav">
      {searchOpen ? (
        <div className="order-search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            autoFocus
            className="order-search-input"
          />
          <button onClick={closeSearch} className="order-search-close" aria-label="Close search">
            <CloseIcon size={18} />
          </button>
        </div>
      ) : (
        <>
          <button
            className="order-search-toggle"
            onClick={() => setSearchOpen(true)}
            aria-label="Search menu"
          >
            <SearchIcon />
          </button>
          <div className="order-cat-pills" ref={scrollRef}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => {
                  if (el) pillRefs.current.set(cat.id, el);
                }}
                className={`order-cat-pill${activeId === cat.id ? ' active' : ''}`}
                onClick={() => scrollToCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
