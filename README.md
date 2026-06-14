# Siya — Portfolio Website

A premium, dark-themed one-page portfolio for **Siya** (B.Com Hons, University of Delhi),
built as a static site styled with Tailwind CSS, animated with GSAP/ScrollTrigger and
Lenis smooth scroll — matching the layout, typography hierarchy, glassmorphism and
motion language of the reference portfolio.

## Project structure

```
siya-portfolio/
├── index.html      # All markup + Tailwind config + custom CSS (single page)
├── script.js        # Lenis smooth scroll, GSAP reveals, particles, magnetic buttons, cursor glow
├── assets/
│   ├── siya-hero.jpg     # Hero character image (right side of hero section)
│   └── siya-avatar.jpg   # Small portrait used in the About card
└── README.md
```

## Sections included

1. **Hero** — name, role line, tagline, scroll cue, character portrait with parallax
2. **About** — summary, portrait card, quick stats (CGPA, board %, leadership, internship)
3. **Education** — B.Com (Hons), Class XII, Class X with scores/CGPA
4. **Experience** — Stenographer Intern + Group Coordinator + Event Volunteer
5. **Skills** — technical (animated progress bars), professional tags, languages, extracurricular
6. **Achievements** — stat cards (90.4%, 8.5 CGPA, internship, leadership)
7. **Certifications** — Excel Basics, Business Communication, Canva Design
8. **Contact** — email (magnetic button), phone, LinkedIn, location

## Premium features implemented

- Glassmorphism cards (`backdrop-filter: blur`) throughout
- Dark theme with a warm gold accent (`#d8b873`) and a subtle ledger-grid texture
- Floating particle field that gently repels from the cursor
- Mouse-follow glow effect (desktop only)
- Magnetic buttons (Email Me / contact CTA)
- Scroll-triggered section reveals + staggered hero text animation
- Animated skill progress bars on scroll
- Parallax on the hero portrait and background grid
- Lenis smooth scrolling with `prefers-reduced-motion` fallback
- Fully responsive (mobile menu, fluid type via `clamp()`)
- SEO meta tags + Open Graph tags

## Editing content

All copy lives directly in `index.html` — search for the section `<!-- ===== NAME ===== -->`
comments to find About / Education / Experience / Skills / Achievements / Certifications / Contact.
Update the email, phone, and LinkedIn links in the **nav** and **Contact** section
(`mailto:`, `tel:`, and `https://linkedin.com/in/...`).

## Local preview

Any static server works, e.g.:

```bash
cd siya-portfolio
npx serve .
# or
python3 -m http.server 5500
```

Then open `http://localhost:5500` (or the port shown).

## Deploying

### Vercel (recommended, matches the reference URL pattern)
1. Push this folder to a GitHub repo (or drag-and-drop the folder into Vercel's dashboard).
2. In Vercel → "Add New Project" → import the repo.
3. Framework preset: **Other / Static** — no build command needed, output directory `.`.
4. Deploy. You'll get a `*.vercel.app` URL you can share or attach a custom domain to.

### Netlify
1. Drag the `siya-portfolio` folder onto https://app.netlify.com/drop
2. Done — instant live URL.

### GitHub Pages
1. Push the folder to a repo, enable Pages in repo settings, set source to the root (or `main` branch).

## Optional next step — Next.js conversion

This build is a single static page (HTML/Tailwind CDN/GSAP/Lenis) so it's instantly deployable
with zero build step. If you'd like it converted into a full **Next.js 15 + TypeScript +
Tailwind (compiled) + Framer Motion** project with split components (`Hero.tsx`, `About.tsx`,
`Education.tsx`, etc.) and an `app/` router structure, just ask — the content and design
system above translate directly into that structure.
