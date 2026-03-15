# Mokha Next.js Conversion

This is a Vercel-ready Next.js + React + TypeScript + Tailwind project generated from the original static HTML site.

## Included

- App Router structure
- Shared React layout with reusable nav/footer
- Original site styling preserved through migrated global CSS
- Page content ported into React-rendered markup
- Original interactions reimplemented on the client:
  - custom cursor
  - reveal-on-scroll
  - nav scroll state
  - menu tabs
  - contact form success state
  - bean parallax section
- Asset migration for `origin-beans.jpg`

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to GitHub
2. Import the repo into Vercel
3. Deploy with the default Next.js settings

## Notes

I preserved the original visual system and page structure very closely. The page bodies are rendered from migrated markup strings while the shared chrome and interactive behavior are implemented with React components.
