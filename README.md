# Sahil Mandre — Portfolio (v3)

Personal portfolio of **Sahil Mandre**, Front-End Developer & Senior Analyst at
Accenture. A scroll-driven "life journey" site built with **React + Vite** and
**React Three Fiber** (3D), deployed on **Vercel**.

🔗 **Live:** https://portfolio-sahilmandre.vercel.app

## Highlights

- **3D journey** — low-poly scenes (React Three Fiber + drei) with a mouse-parallax
  hero and a constellation backdrop, lazy-loaded and reduced-motion aware.
- **Storytelling timeline** — from Jabalpur goalkeeper → RGPV → V2 → TCS → Accenture.
- **Portfolio time machine** — every past version kept live at `/legacy/<year>/`.
- **SEO-first** — semantic HTML, meta + Open Graph + Twitter cards, JSON-LD `Person`,
  `sitemap.xml`, `robots.txt`. Same domain/URL as before → no ranking loss.
- **100% responsive**, accessible (skip link, focus states, contrast-checked), and
  fast (3D code-split so the heavy chunk loads only on demand).

## Tech stack

React 18 · Vite 6 · React Three Fiber (three.js) · @react-three/drei · GSAP-ready ·
Framer Motion · react-icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Project structure

```
public/
  assets/            image assets
  resume/            SahilMandre_resume_2026.pdf
  legacy/2022/       archived Angular portfolio (noindex), still live
  robots.txt · sitemap.xml
src/
  components/        Header, Footer, Section, Reveal, SocialLinks, ErrorBoundary
  sections/          Hero, Journey, About, Experience, Projects, Evolution, BeyondCode, Contact
  three/             models, HeroCanvas, JourneyCanvas, Lazy3D
  data/site.js       single source of content
```

## Content

To swap in a real profile photo, drop `me.webp` into `public/assets/images/` —
the About section picks it up automatically (falls back to a monogram otherwise).

## Deployment

Vercel builds from `vercel.json` (Vite preset, output `dist`). Previous versions
of the site are preserved under `public/legacy/` and excluded from search via
`robots.txt` + a per-page `noindex`.

---

Built with React, Three.js & GSAP. Design guided by the *impeccable* system.
