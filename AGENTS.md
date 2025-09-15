# Repository Guidelines

## Project Structure & Modules
- App code lives in `temp-project/` (Next.js 14, TypeScript).
  - `src/app/` routes and pages (App Router), `public/` static assets.
  - `src/components/` UI (primitives, app, layout), `src/design-system/` tokens & utils.
  - `src/lib/`, `src/hooks/`, `src/contexts/` shared logic; `src/types/` data models.
- Docs and specs are under `docs/` (architecture, stories, PRDs).

## Build, Test, and Development
- Install: `cd temp-project && npm install` (Node 18+ recommended).
- Dev server: `npm run dev` (or `npm run dev-safe` on Windows to pre-check port).
- Build: `npm run build` (generates `.next/`). Start: `npm start`.
- Lint: `npm run lint` (Next.js + ESLint).
- Windows helpers: `npm run server`, `server-bg`, `stop-server` (PowerShell scripts in `temp-project/scripts/`).

## Coding Style & Naming
- TypeScript, 2-space indent, semver-friendly imports.
- Components/exports: PascalCase (e.g., `Button/Button.tsx`).
- Routes and folders in `src/app/`: lowercase, dynamic segments in `[brackets]`.
- Keep presentational logic in `components/`; business/util logic in `lib/` or hooks.
- Run `npm run lint` before pushing; Tailwind is configured (`tailwind.config.ts`).

## Testing Guidelines
- No formal test runner is wired. Use story/spec docs in `docs/` and in-app verification.
- Prefer small, isolated components with prop-driven behavior to ease testing.
- If adding automated tests, mirror `src/__tests__/` and include run notes in the PR.

## Commit & Pull Requests
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:` (seen in history).
- PRs should include: purpose, scope, screenshots/video for UI, steps to verify, and any config changes.
- Keep PRs focused; link related issues and update `docs/changelog.md` when user-facing changes occur.

## Security & Config
- Env via `temp-project/.env.local`. Common flags: `NEXT_PUBLIC_THEME_SYSTEM`, `NEXT_PUBLIC_FORCE_LIGHT_MODE`, `NEXT_PUBLIC_FORCE_DARK_MODE`, `NEXT_PUBLIC_THEME_TOGGLE_MIGRATED`, `SITE_URL` (for sitemap).
- Do not commit secrets; prefer `NEXT_PUBLIC_*` only for non-sensitive client flags.

