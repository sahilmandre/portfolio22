# 🚀 Portfolio Rebuild Plan — Angular → React 3D Journey

> **Living document.** The TODO checklist in each phase is updated after every completed task.
> Last updated: **2026-07-18** · Status: **Character-driven immersive 3D journey. Rounds 1–3 built & calibrated. Round 4 immersion polish (day→night, scenery, camera choreography, delight touches) built — verifying via self-screenshots. Committing per round, NOT pushing (Sahil's instruction).**

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
- [x] Push branch → Vercel preview building (pushed `react-migration`; `vercel.json` forces Vite preset)

### Phase 2 — Standard sections (React, responsive)
- [x] Layout shell + navigation (header w/ social links) + smooth-scroll anchors
- [x] Journey section — animated 2D vertical timeline (7 milestones; SEO + reduced-motion/mobile fallback for 3D)
- [x] About section (bio + placeholder photo + quick facts + skills)
- [x] Experience timeline (V2 → TCS → Accenture) — stacked detail layout, no identical card grid
- [x] Projects section (flagship Tradelogy + Hulu/Design Symposium/Bootstrap)
- [x] **Portfolio Evolution** section (year timeline: screenshot + tech + "Open live →" to `/legacy/2022/`)
- [x] Older version preserved into `public/legacy/2022/` (+ noindex); 2021 links out
- [x] "Beyond Code" (Mission Azad NGO + Fest + awards + certs)
- [x] Contact form → formsubmit.co AJAX (sahilmandre@gmail.com) + validation + success/error states
- [x] Footer (resume download, nav, socials, copyright)
- [x] About uses **placeholder photo** (auto-swaps in `/assets/images/me.webp` when added)
- [x] Responsive pass @ 360 / 768 / 1024 / 1440 (fluid clamp type/space, auto-fit grids, timeline → single column)
- [x] **Commit Phase 2** on `react-migration`

### Phase 3 — The 3D scroll journey
<!-- DONE: low-poly built from primitives (no external GLTF) for reliability; upgradeable to detailed models with visual iteration (/impeccable live). -->
- [x] R3F stack installed (three, @react-three/fiber v8, drei v9) — React 18 compatible
- [x] Low-poly milestone models from primitives (building, football, grad cap, laptop, gems)
- [x] Hero 3D canvas — floating models + sparkles + mouse parallax
- [x] Journey 3D backdrop — drifting milestone-node constellation behind the timeline
- [x] Lazy-mount (in-view) + code-split (heavy three chunk loads on demand) + dpr cap
- [x] Reduced-motion skips canvas; WebGL failure falls back to CSS orbs (ErrorBoundary)
- [x] Build verified (1011 modules; 3D code-split to lazy chunks); all assets serve 200
- [x] **Commit Phase 3** on `react-migration`

#### Phase 3 REBUILD — character-driven immersive journey (pivot, 2026-07-18)
Original 3D was abstract floating objects — Sahil wants a **boy avatar living his life** (school → football/goalkeeper → college → coding), immersive & interactive. Character = **Ready Player Me** avatar of Sahil. Iterating in rounds via Sahil's local screenshots.
- [x] **Round 1** — Character GLB loader (+ placeholder capsule), 3D Stage (ground, lights, shadows, orbit controls, loader), mounted at top of Journey section (timeline kept below as narrative/SEO). Old constellation backdrop removed.
- [x] **Custom boy character** — Sahil couldn't build the RPM avatar, so built a hand-coded low-poly boy from primitives (long dark hair, glasses, tan skin, navy plaid shirt), rigged as limb groups (hips/arms/legs/head) with idle + walk-ready animation. Now the default character (RPM still optional via `avatarConfig.js`). About photo = real selfie (me.webp).
- [x] **Round 1 handoff** — screenshot received: boy renders (hair had a top gap; scene too dark). Fixed hair (fuller) + brightened lighting.
- [x] **Round 2** — life path (journeyPath.js: 5 stations + keyframe sampler), station environments (school, football goal+ball, college+cap, coding desk+laptop, office) with floating labels, scroll-driven walk + camera follow (Stage Rig), tall sticky scroll region + reduced-motion fallback.
- [x] **Round 3 (code)** — pose system on the rigged boy: idle / walk / goalkeeper / graduate / coding / working, damped transitions via shared poseRef.
- [ ] **Calibrate (needs screenshots)** — pose/prop/camera positions are first-guess; tune from Sahil's scroll screenshots (e.g. desk/laptop height vs typing hands, goal scale, camera framing per station).
- [x] **Self-screenshot loop** — headless Puppeteer script (`_shots.mjs`, gitignored; puppeteer kept local, NOT committed) drives the dev server at :5173, scrolls the journey, saves frames to scratchpad so Claude can *see* and self-calibrate.
- [x] **Calibrated from screenshots** — shrank the oversized football; softened the pickup bend (reach-down, not fold); moved the ground bag under his hands. Verified: walking, poses, suit+tie at work, casual at coding, distinct buildings all read well.
- [x] **Round 4** — immersion polish: **day→night engine** (`Atmosphere.jsx`) ramping sky/fog/sun colour + elevation + intensity across the scroll (childhood morning → present-day night) with a moving **sun/moon disc + halo** and **stars** that fade in at night; **Scenery.jsx** (roadside trees, **street lamps that switch on at dusk**, football pitch + grass tufts, day/night-tinted ground); **camera choreography** (wide tracking shot while walking → gentle dolly-in on each action beat, with subtle handheld sway); delight touches — **laptop screen-glow** light while coding + bobbing **diploma** at graduation. Verified via self-screenshots; committed `f96cd85`.
- [x] **Round 5** — living character: **age progression** (`ageAt`) — he grows from a small child at school to a full-grown man by his career (root + head-proportion scale, camera zooms/eyeline adapt to his size); **hair grows out with age** (short crop as a kid → long hair by adulthood); **outfit per phase** (`outfitAt`) — school uniform → **goalkeeper kit** (green #1 jersey, gloves, shorts, socks) → casual → business suit, with backpack only at school/college; **fixed goalkeeper arms** (Z-rotation signs were inverted — now spread wide); **seated desk pose** (chair + desk modesty panel); **navbar auto-hides** while the 3D playground is pinned full-screen and returns after (`App` journeyActive flag ↔ `Journey` scroll handler ↔ `Header.is-hidden`); floating labels lowered so headings never clip. Verified via self-screenshots.

#### Phase 3 — remaining/optional (needs visual iteration)
- [ ] R3F canvas + scene setup + lighting + purple environment
- [ ] Camera path (CatmullRomCurve3) driven by GSAP ScrollTrigger
- [ ] Source + integrate low-poly models per milestone (Draco)
- [ ] Milestone reveal animations + HTML text overlays (SEO-safe)
- [ ] Loading screen + PerformanceMonitor + DPR cap
- [ ] Mobile 3D tuning + reduced-motion fallback
- [ ] **Commit Phase 3** on `react-migration`

### Phase 4 — Polish, QA, ship
- [x] a11y + polish pass — skip link, form placeholder contrast (≥4.5:1), reduced-motion, legacy links open in new tab
- [x] Verify SEO parity (title, meta, OG/Twitter, JSON-LD Person, sitemap, robots) — confirmed in built `dist/index.html`
- [x] Update README
- [x] **Commit Phase 4** on `react-migration`
- [x] Open PR `react-migration` → `main` for review
- [ ] Cross-device/browser + 3D **visual QA on Vercel preview** (needs a real browser — for Sahil)
- [ ] Final review with Sahil on preview URL
- [ ] Merge `react-migration` → `main` → production deploy *(GATED: only after Sahil approves the preview)*
- [ ] Confirm live domain

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
- **2026-07-17** — **Phase 1 DONE & committed.** Angular removed & archived live at `/legacy/2022/` (noindex); Vite+React scaffold with purple theme, fonts, SEO meta+OG+JSON-LD, robots+sitemap, vercel.json. Build passes; preview verified (`/`, `/legacy/2022/`, `robots.txt` all 200). Header + Hero + Footer live. Pushed branch `react-migration` → Vercel preview.
- **2026-07-17** — **Phase 2 DONE & committed.** All sections built (Journey timeline, About, Experience, Projects w/ featured Tradelogy, Portfolio Evolution, Beyond Code, Contact form via formsubmit AJAX → gmail). framer-motion reveals w/ reduced-motion; impeccable rules followed (no gradient text, varied layouts, contrast, fluid responsive). Build OK (417 modules, 97 KB gz JS); preview 200 + bundle contains all content. NOTE: full visual/DOM render not verified locally (no headless browser) — rely on Vercel preview for visual QA. Next: Phase 3 R3F 3D journey.
- **2026-07-17** — **Phase 3 DONE & committed.** Added React Three Fiber 3D: low-poly models from primitives (building/football/grad-cap/laptop/gems), Hero canvas (floating models + sparkles + mouse parallax), Journey constellation backdrop. Lazy-mounted in-view + code-split (three chunk 222 KB gz loads on demand), dpr-capped, reduced-motion skips it, ErrorBoundary falls back to CSS orbs. Build OK (1011 modules); all assets serve 200. NOTE: 3D visuals not verifiable locally (no WebGL/headless) — needs visual QA on Vercel preview; models are primitive low-poly (upgradeable to GLTF via /impeccable live). Next: Phase 4 polish/QA.
- **2026-07-17** — **Phase 4 DONE & committed.** Polish: a11y skip link, form-placeholder contrast fix, legacy links open in new tab. Verified SEO parity in built `dist/index.html` (title/desc/canonical/OG/Twitter/JSON-LD). Wrote README. Opened PR `react-migration` → `main`. **NOT merged** — production merge is gated on Sahil's visual review of the Vercel preview (per safe-rollout plan). Remaining: visual/3D QA on preview, then merge.
- **2026-07-18** — **Journey calibration** (committed `c6de23b`, local only): right-sized football, softened pickup reach, bag under the hands. Verified via self-screenshots.
- **2026-07-18** — **Round 4 immersion polish** built & committed `f96cd85` (local only): `Atmosphere.jsx` day→night engine (sky/fog/sun/hemi/ambient ramps + sun/moon disc & halo + fading stars, shared smoothed progress via `smoothRef`, night factor via `envRef`); `Scenery.jsx` (trees, dusk-activated street lamps w/ warm point lights, football pitch + grass tufts, day/night-tinted ground/path); camera choreography (walk = wide tracking, action beats = eased dolly-in + handheld sway) in `Stage.jsx` `Rig`; delight touches (pulsing laptop screen-glow at desks, bobbing diploma at graduation). Sahil's live reaction: "It looks fabulous now."
- **2026-07-18** — **Round 5 living character** (this commit, local only): **age progression** `ageAt` — grows child→man across the scroll (root + head-proportion scale; camera zoom/eyeline adapt); **hair grows out with age** (short kid crop → long adult hair via a scaled `longHair` group); **per-phase outfits** `outfitAt` — school uniform → **goalkeeper kit** (green #1 jersey, white gloves w/ orange cuffs, shorts, socks) → casual → suit; backpack only at school + college; **goalkeeper arm spread fixed** (inverted Z-rotation signs); **seated desk pose** (added chair + desk modesty panel); **navbar auto-hides** during the pinned 3D playground and returns after (`App` `journeyActive` ↔ `Journey onActiveChange` ↔ `Header .is-hidden`); labels lowered (3.1→2.75) so headings never clip. All verified via self-screenshots (`PAGE ERRORS: none`). **Committed locally, NOT pushed** (per Sahil's instruction). puppeteer/`package*.json` deliberately left uncommitted.
