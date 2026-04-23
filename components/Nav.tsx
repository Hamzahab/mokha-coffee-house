'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/beans', label: 'Beans' },
  { href: '/catering', label: 'Catering' },
  { href: '/about', label: 'Our Roots' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav id="site-nav">
        <div className="nav-left">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/menu" className={pathname === '/menu' ? 'active' : ''}>Menu</Link>
          <Link href="/beans" className={pathname === '/beans' ? 'active' : ''}>Beans</Link>
        </div>

        <Link href="/" className="nav-logo" aria-label="Mokha Coffee House home">
          MOKHA
          <span className="nav-logo-sub">Coffee House</span>
        </Link>

        <div className="nav-right">
          <Link href="/catering" className={pathname === '/catering' ? 'active' : ''}>Catering</Link>
          <Link href="/locations" className={pathname === '/locations' ? 'active' : ''}>Locations</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
          <Link href="/order" className="nav-cta">Order Now</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu-link ${pathname === link.href ? 'active' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="mobile-menu-cta"
            style={{ animationDelay: '0.5s' }}
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
}
