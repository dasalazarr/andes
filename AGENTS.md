# Repository Guidelines

## Project Structure & Module Organization
- `src/` — React + TypeScript source. Key folders: `components/` (PascalCase files), `hooks/` (useX), `lib/`, `types/`, `translations/`, `utils/`.
- `public/` — static assets and onboarding script (`public/js/andes-simplified-onboarding.js`).
- `tests/__tests__/` — primary test suite (also accepts `src/__tests__/` for colocated tests).
- `dist/` — build output (do not edit).  `docs/` for extra documentation.
- Import alias: use `@/` for paths under `src/`.

## Build, Test, and Development Commands
- `npm run dev` — start Vite dev server.
- `npm run build` — type-check + build English and Spanish outputs.
- `npm run build:en` / `npm run build:es` — build a single locale (uses `VITE_APP_LANG=es` for Spanish).
- `npm run preview` — preview the production build.
- `npm run lint` — ESLint on `.ts/.tsx` files.
- `npm run type-check` — TypeScript no‑emit verification.
- `npm test` / `npm run test:watch` / `npm run test:coverage` — Vitest test runners.
- `npm run types:supabase` — generate types to `src/types/supabase.ts` (requires `SUPABASE_PROJECT_ID`).

## Coding Style & Naming Conventions
- TypeScript + React 18; 2‑space indentation; semicolons; JSX in `.tsx`.
- Components: PascalCase file and export (e.g., `TrainingPlanCard.tsx`). Hooks: `useX` camelCase. Utilities: camelCase.
- Use Tailwind CSS classes; prefer `cn()` from `src/lib/utils.ts` for class merging.
- Keep imports aliased with `@/…` instead of relative deep paths.

## Testing Guidelines
- Frameworks: Vitest + React Testing Library (`jsdom`).
- Place tests in `tests/__tests__/` (e.g., `components/HeroSection.test.tsx`) or colocate in `src/__tests__/` when necessary.
- Use `*.test.tsx` for components and `integration/*.test.tsx` for flows. Run `npm run test:coverage` before PRs.

## Commit & Pull Request Guidelines
- Commits: imperative, concise subject; scope when helpful. Emoji prefixes are acceptable (seen in history: 🔧, 🚀, 🎯). English preferred; Spanish acceptable.
- PRs must include: clear description, linked issues, steps to test, screenshots/GIFs for UI changes, and confirmation that `lint`, `type-check`, and `test` pass.

## Security & Configuration Tips
- Vite only exposes vars prefixed with `VITE_`; never commit secrets. Use Netlify/CI env vars.
- Do not modify `dist/`. Build/deploy is controlled by `netlify.toml` (Node 18, publish `dist`).
- Localized builds output to `dist/` and `dist/es/`. Keep `public/js/andes-simplified-onboarding.js` production‑safe (no debug in commits).

## WRITING STYLE

- each long sentence should be followed by two newline characters
- avoid long bullet lists
- write in natural, plain English. be conversational.
- avoid using overly complex language, and super long sentences
- use simple & easy-to-understand language. be concise.

## DATABASE CHANGES

- you have no power or authority to make any database changes
- only the User himself can make DB changes, whether Dev or Prod
- if you want to make any Database-related change, suggest it first to the User
- NEVER EVER attempt to run any DB migrations, or make any database changes.
this is strictly prohibited.

## OUTPUT STYLE

- write in complete, clear sentences. like a Senior Developer when talking to a junior engineer
- always provide enough context for the user to understand — in a simple & short way
- make sure to clearly explain your assumptions, and your conclusions