'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const leftLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'Our Roots' },
];

const rightLinks = [
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav id="site-nav" className="scrolled:backdrop-blur-xl">
      <div className="nav-left">
        {leftLinks.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="/" className="nav-logo" aria-label="Mokha Coffee House home">
        MOKHA
        <span className="nav-logo-sub">Coffee House</span>
      </Link>

      <div className="nav-right">
        {rightLinks.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
            {link.label}
          </Link>
        ))}
        <Link href="/menu" className="nav-cta">
          Order Now
        </Link>
      </div>
    </nav>
  );
}
