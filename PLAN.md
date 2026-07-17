# 🚀 Portfolio Rebuild Plan — Angular → React 3D Journey

> **Living document.** The TODO checklist in each phase is updated after every completed task.
> Last updated: **2026-07-17** · Status: **Phase 1 complete (committed) · ready to push preview / start Phase 2**

---

## 1. Goal

Rebuild Sahil Mandre's Angular 15 portfolio as a **React** site featuring a **scroll-driven 3D "life-journey"** hero, in the **same repo** and the **same live Vercel domain** (`portfolio-sahilmandre.vercel.app`) — **without losing SEO/search ranking**.

## 2. Hard constraints

- ✅ **Same repo** (`github.com/sahilmandre/portfolio22`, branch `main`) — Angular replaced in place.
- ✅ **SEO preserved + improved** — same `<title>`, same domain/URLs; add meta description, Open Graph, Twitter cards, JSON-LD `Person`, sitemap, robots.
- ✅ **100% responsive** — fluid type/spacing, tested at every breakpoint, no text overflow, no horizontal scroll. 3D tuned for phones.
- ✅ **Safe rollout** — build on branch `react-migration` → verify Vercel **preview** → merge to `main` only after approval. **Live site untouched during dev.**
- ✅ **Commit after every phase** — each completed phase is committed on `react-migration` (co-authored), so progress is checkpointed and reviewable.
- ✅ **Design quality via `impeccable` skill** (brand register) — see §5.

## 3. Tech stack

| Purpose | Tool |
|---|---|
| Build/dev | Vite + React 18 |
| 3D | three + @react-three/fiber + @react-three/drei |
| Scroll animation | GSAP ScrollTrigger (drives camera along a 3D curve) |
| Micro-interactions | Framer Motion |
| Optional polish | @react-three/postprocessing (subtle bloom on accents) |
| 3D models | Free CC0 low-poly `.glb` (Poly Pizza / Quaternius / Kenney), Draco-compressed |
| Contact | formsubmit.co → **sahilmandre@gmail.com** |
| Deploy | Vercel (same repo/domain), `vercel.json` for Vite preset |

## 4. Architecture

- **Hero journey**: tall section (~700vh) with a **sticky full-screen R3F canvas**. Scroll progress → camera travels a `CatmullRomCurve3` past 8 low-poly milestone scenes; each scales/fades in on approach. Loading screen (drei `useProgress`); `PerformanceMonitor` auto-scales quality; DPR capped for phones.
- **Sections below** (normal DOM, fast, SEO-readable): About · Experience · Projects · **Portfolio Evolution** · Beyond Code · Contact · Footer.
- Journey milestone **text mirrored as real DOM headings** so crawlers read it even though 3D renders in canvas.

### Portfolio Time Machine (evolution showcase)
A "Portfolio Evolution" section showing each past version by year (screenshot + year + tech stack + "Open live →"). Old versions preserved **live** on the same domain under `/legacy/<year>/` so they stay browsable. Each legacy build gets `<meta name="robots" content="noindex">` and `/legacy/` is disallowed in robots.txt so it never competes with the main site for SEO. The **current Angular app is built to static once and archived to `public/legacy/2022/` BEFORE the swap** (otherwise it's lost from the live domain).

## 5. Design system (impeccable, brand register)

- **Color** — keep the **purple identity**, committed strategy (don't hedge with neutrals). OKLCH tokens.
  - bg `#1b1924` / deep `#262438`; surface `#2b2354`; accents violet `#7a63d2` → magenta `#b266d2`; ink `#ffffff`; **muted body text lightened to ~`#ada6ce`** (current `#9189b3` is borderline on contrast — verify ≥4.5:1).
- **Typography** — distinctive + refined pairing (contrast axis, not two similar sans); fluid `clamp()` scale, ratio ≥1.25; display heading cap ≤6rem; letter-spacing floor ≥-0.04em; `text-wrap: balance` on headings. *(Final font pick decided in Phase 2.)*
- **Motion** — intentional, ease-out (quart/quint/expo), no bounce; **every animation has a `prefers-reduced-motion` fallback**; GSAP for scroll, Framer for micro.
- **Bans respected** — ❌ gradient text, ❌ glassmorphism-by-default, ❌ identical card grids, ❌ tiny uppercase eyebrow labels, ❌ side-stripe borders, ❌ text overflow. (Numbered milestones OK — journey is a real sequence.)
- **Responsive** — fluid spacing `clamp()`; grids `repeat(auto-fit, minmax(280px,1fr))`; semantic z-index scale; test headings at all breakpoints.
- **Imagery** — 3D scenes + real photo of Sahil count as imagery; no colored-block placeholders.

## 6. The 8-milestone journey (from 2026 résumé)

| # | Milestone | Real detail |
|---|---|---|
| 1 | Intro | Sahil Mandre · Front-End Developer · Senior Analyst @ Accenture · 5 yrs |
| 2 | 🏫 School | Jabalpur · 2000–2017 |
| 3 | ⚽ Goalkeeper | 2009–2015 · **district-level goalkeeper**, Jabalpur team |
| 4 | 🎓 College | RGPV Bhopal · B.Tech CSE · Aug 2017 – 2021 |
| 5 | 💻 Coding begins | ~2020 · self-driven during **COVID lockdown** |
| 6 | 🏢 V2 Venture Tech | Udaipur · Associate SW Developer · Jul–Oct 2021 (Salesforce Lightning) |
| 7 | 🏢 TCS | Indore · System Engineer · Dec 2021 – Nov 2025 (React, Redux, React Query) |
| 8 | 🏢 Accenture | Indore · Packaged App Dev **Senior Analyst** · Nov 2025 – Present (React + OpenAI/GenAI) |

*Geographic arc: **Jabalpur** (childhood) → **Bhopal** (college) → **Udaipur** (first job) → **Indore** (TCS/Accenture). COVID (2020) appears as a subtle beat in the college → coding transition.*

## 7. Content inventory (from résumé)

- **Identity**: Indore, MP · sahilmandre@gmail.com · +91 7987391196 · LinkedIn/GitHub `sahilmandre`.
- **Skills**: HTML, CSS, JavaScript, React, Redux, React Query/TanStack, Node/Express/MongoDB, Tailwind, Bootstrap, Material UI, Shadcn, Supabase, Styled Components, Angular, Git, GenAI/OpenAI.
- **Projects**: **Tradelogy** (MERN stock dashboard, flagship) — https://tradelogy.in/ · GitHub github.com/sahilmandre. Plus prior work: Hulu Clone (React+Tailwind), Design Symposium (WordPress+SCSS · designsymposium.in), Bootstrap Demo (sahilmandre.github.io/bootstrapdemo).
- **Portfolio versions (Evolution/Time Machine)**: 2021 = ReactJS (`potfolio-sahil.web.app`, live) · 2022 = Angular (this repo → preserve at `/legacy/2022/`) · 2026 = this new 3D React site. *(2023 React+Tailwind+Aceternity — URL TBD, optional.)*
- **Beyond code**: Co-founded NGO **"Mission Azad"** (self-defense training, 1,20,000+ women/girls); College Fest Lead (event anchor + mimicry artist).
- **Awards**: On-the-Spot (Team), Best Team, Learning Achievement. **Certs**: GenAI (Microsoft), GitHub Professional, Ultimate React Course 2024 (70h).
- **Resume download**: `SahilMandre_resume_2026.pdf`.

---

## 8. Phased TODO (living checklist)

### Phase 0 — Planning & setup
- [x] Audit existing Angular app + content
- [x] Confirm design direction (3D vertical-scroll journey, low-poly, keep purple)
- [x] Read 2026 résumé for real content/dates
- [x] Install `impeccable` design skill globally
- [x] Write this PLAN.md
- [ ] **Get go-ahead to start Phase 1**

### Phase 1 — Scaffold & deploy pipeline (no content needed)
- [x] Create branch `react-migration`
- [x] Remove Angular files (angular.json, tsconfig.app/spec, src/app, Angular main.ts/index.html) — keep `.git`, assets, resume PDFs, favicon
- [x] **Archive current Angular version:** built with `ng build --base-href /legacy/2022/` → `public/legacy/2022/` (+ `noindex`) so it stays live after the swap
- [x] Scaffold Vite + React 18 project (package.json, vite config, entry)
- [x] Migrate assets → `public/` (images, resume PDFs, favicon)
- [x] Base theme tokens (purple) + global styles + fonts (Bricolage Grotesque + Manrope)
- [x] `index.html` with SEO meta + OG + Twitter + JSON-LD `Person`
- [x] `vercel.json` (framework=vite, output=dist) + `robots.txt` + `sitemap.xml`
- [x] `npm install` + `npm run build` verified locally (build OK; preview server serves `/`, `/legacy/2022/`, `robots.txt` → all 200)
- [x] **Commit Phase 1** on `react-migration`
- [ ] Push branch → confirm **Vercel preview** builds & loads *(awaiting go-ahead to push)*

### Phase 2 — Standard sections (React, responsive)
- [ ] Layout shell + navigation (header w/ social links) + smooth-scroll anchors
- [ ] About section (bio + photo)
- [ ] Experience timeline (V2 → TCS → Accenture) — no identical card grid
- [ ] Projects section (flagship Tradelogy + selected work)
- [ ] **Portfolio Evolution** section (year timeline: screenshot + tech + "Open live →" to `/legacy/<year>/`)
- [ ] Preserve older versions into `public/legacy/<year>/` (+ noindex) and/or link out to existing hosts
- [ ] "Beyond Code" (Mission Azad NGO + Fest) 
- [ ] Contact form → formsubmit.co (sahilmandre@gmail.com) + validation
- [ ] Footer (resume download, nav, socials, copyright)
- [ ] About uses **placeholder photo** (swap real photo later)
- [ ] Responsive pass @ 360 / 768 / 1024 / 1440
- [ ] **Commit Phase 2** on `react-migration`

### Phase 3 — The 3D scroll journey
- [ ] R3F canvas + scene setup + lighting + purple environment
- [ ] Camera path (CatmullRomCurve3) driven by GSAP ScrollTrigger
- [ ] Source + integrate low-poly models per milestone (Draco)
- [ ] Milestone reveal animations + HTML text overlays (SEO-safe)
- [ ] Loading screen + PerformanceMonitor + DPR cap
- [ ] Mobile 3D tuning + reduced-motion fallback
- [ ] **Commit Phase 3** on `react-migration`

### Phase 4 — Polish, QA, ship
- [ ] `impeccable` audit + polish pass (a11y, contrast, motion, responsive)
- [ ] Cross-device/browser QA; Lighthouse (perf/SEO/a11y)
- [ ] Verify SEO parity (title, meta, structured data, sitemap)
- [ ] Final review with Sahil on preview URL
- [ ] **Commit Phase 4** on `react-migration`
- [ ] Merge `react-migration` → `main` → production deploy
- [ ] Confirm live domain + update README

---

## 9. Open items (need Sahil's input — non-blocking for Phase 1)

- [x] **Projects** — Tradelogy (tradelogy.in, MERN, flagship) + Hulu Clone, Design Symposium, Bootstrap Demo. GitHub github.com/sahilmandre.
- [x] **Portfolio Evolution versions** — 2021 (potfolio-sahil.web.app), 2022 (Angular, this repo), 2026 (new). Preserve LIVE at `/legacy/<year>/`.
- [x] **School/football/college** — School Jabalpur 2000–2017; football 2009–2015 district goalkeeper; college RGPV Aug 2017–2021 (COVID 2020).
- [ ] **Photo of Sahil** for About (optional — else abstract 3D shapes)
- [ ] 2023 React+Tailwind+Aceternity portfolio URL (optional — for Evolution section)
- [ ] Confirm social links to show (Facebook, LinkedIn, Instagram, GitHub, YouTube)

## 10. Progress log

- **2026-07-17** — Planning complete. Design direction locked, résumé parsed, `impeccable` installed, PLAN.md created. Awaiting go-ahead for Phase 1.
- **2026-07-17** — Added "Portfolio Time Machine" evolution feature: preserve past versions live at `/legacy/<year>/` (noindex) + evolution section. Angular version to be archived before swap.
- **2026-07-17** — Content locked: real journey dates (school 2000–17 Jabalpur, football 2009–15 district GK, college RGPV 2017–21, COVID/coding 2020, V2/TCS/Accenture). Projects: Tradelogy (tradelogy.in) + Hulu/Design Symposium/Bootstrap. Evolution: 2021/2022/2026.
- **2026-07-17** — **Phase 1 DONE & committed.** Angular removed & archived live at `/legacy/2022/` (noindex); Vite+React scaffold with purple theme, fonts, SEO meta+OG+JSON-LD, robots+sitemap, vercel.json. Build passes; preview verified (`/`, `/legacy/2022/`, `robots.txt` all 200). Header + Hero + Footer live. Next: push for Vercel preview, then Phase 2 sections.
