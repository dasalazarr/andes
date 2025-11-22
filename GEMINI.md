# Gemini Project Overview: Andes Runners

## Project Overview

**Andes Runners** is a bilingual (English/Spanish) web application for personalized running training plans. It targets "Sedentary Dreamers" and "Occasional Athletes," offering a supportive, coach-like experience.

**Tech Stack:**
*   **Framework:** React + Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Framer Motion + GSAP
*   **Routing:** React Router DOM
*   **Deployment:** Netlify
*   **CMS/Content:** Hardcoded in `src/data/content.tsx` (for now)

## Key Features
*   **Bilingual Support:** URL-based routing (`/es`, `/en`) with auto-detection.
*   **Mobile-First Design:** Optimized specifically for mobile UX (horizontal carousels, touch-friendly).
*   **WhatsApp Onboarding:** Simplified flow to convert users via WhatsApp.
*   **Blog System:** Markdown-based blog with categories, reading time, and SEO optimization.

## Project Structure

```
/
├── src/
│   ├── components/     # Shared UI components (Hero, Buttons, etc.)
│   ├── features/       # Feature-specific modules (Blog, Onboarding)
│   ├── data/          # Content strings and blog posts
│   ├── hooks/         # Custom hooks (useLanguage, etc.)
│   └── lib/           # Utilities (analytics, formatting)
├── public/            # Static assets, robots.txt, sitemap.xml
├── docs/              # Documentation (Strategy, Ideas, Legacy)
└── scripts/           # Build scripts (sitemap generation)
```

## Development

### Commands
*   `npm run dev`: Start local server.
*   `npm run build`: Build for production (generates `dist/`).
*   `npm test`: Run tests.

### Content Strategy
*   **Voice:** The Empathetic Coach.
*   **Focus:** Transformation, overcoming fear, and "Zero to Hero" stories.
*   **Blog:** Located in `src/features/blog`. Content managed in `src/data/blog-posts.ts`.

## Optimization & SEO
*   **SEO:** `react-helmet-async` for dynamic meta tags. `sitemap.xml` and `robots.txt` included.
*   **Performance:** Code splitting via Vite. Lazy loading for heavy components.
*   **Mobile:** Horizontal scroll snapping for lists, optimized touch targets.