import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, DM_Sans } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/Cursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-cinzel',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mokha-coffee-house.vercel.app'),
  title: {
    default: 'Mokha Coffee House — Edmonton',
    template: '%s | Mokha Coffee House',
  },
  description: 'Yemeni Coffee House in Edmonton, Alberta. Come as a stranger, leave as family.',
  openGraph: {
    type: 'website',
    siteName: 'Mokha Coffee House',
    locale: 'en_CA',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${dmSans.variable}`}>
      <body className="page min-h-screen antialiased">
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
