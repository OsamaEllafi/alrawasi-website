# Al-Rawasi website

Arabic-first, bilingual website implementing the approved **From Drawing to Landmark** direction. Built with Next.js, React, TypeScript, GSAP, local fonts, original company images, and two generated architectural hero layers.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000/ar/` or `http://localhost:3000/en/`.

## Production

```sh
npm run typecheck
npm run build
npm start
```

The static export is generated in `out/`. Upload that directory to a static host. Each page has its own HTML document, and trailing-slash URLs are used. The live company domain has not been changed or deployed to.

The build also runs `scripts/normalize-export.mjs` to normalize Next 16.3's Windows RSC segment filenames for browser navigation. Keep this step when building on Windows; it is a no-op for correctly flattened exports.

## Features

- Arabic RTL and English LTR home, about, services, projects, contact, and seven project-detail pages per language.
- Scroll-driven drawing-to-render hero with an accessible draggable/keyboard range control.
- Reduced-motion support, mobile navigation with focus management, local fonts, and responsive layouts.
- Project categories and search, expandable services, office tabs, client directory, and full-screen project images.
- A contact form that validates input and opens the visitor's email application with a draft. It does **not** transmit submissions or simulate delivery. Copy fallback is available.
- Page metadata, language alternates, robots.txt, and sitemap.xml.

## Content and assets

Edit bilingual content in `src/lib/content.ts`. Page composition lives in `src/app/[lang]/` and `src/components/`; the design styles are in `src/app/globals.css`.

`company profile.md` and `brand identity.md` document source facts and uncertainties. Original downloads remain unchanged in `assets/images/` with their manifest. Public copies are in `public/images/`. `scripts/prepare-public-assets.py` recreates public source copies with provenance metadata; it uses the local Impeccable metadata utility and is not required to build or host the website.

Generated hero originals, exact prompts, and provenance are in `assets/generated/`. Optimized drawing/render layers are in `public/images/generated/`. They are identified on the page as an architectural concept; project portfolio images are the sourced originals.

No speculative overseas projects, unsupported satisfaction statistics, placeholder-number certification claims, or unverified manager portrait have been published. Project images are identified as architectural renderings. The contact form uses the published company address `alrawasialiby@gmail.com`.

## Design reference

Approved image: `design-previews/03-drawing-to-landmark.png`. Direction and ingredient record: `.impeccable/surface-brief.md`. Verification images and reports: `.impeccable/review/`.
