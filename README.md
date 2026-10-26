# ITP BMI Calculator

A React + TypeScript + Vite app implementing the ITP Jira project tasks:

- Core BMI calculation library with unit conversions and validators
- Accessible form UI with unit toggle (metric/imperial)
- Result panel with category badge, non-color indicators, and aria-live announcements
- Tailwind-based design tokens and responsive layout
- Client-side history with localStorage, export/import, and a serverless Share API skeleton
- Optional authentication & cross-device sync (Firebase) — disabled by default
- Testing infrastructure: Vitest, React Testing Library, axe accessibility checks, and Playwright E2E
- CI: GitHub Actions running lint, unit tests (with coverage), a11y checks, and E2E

## Getting started

- Requirements: Node.js 20+
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run unit tests: `npm test`
- Run E2E: `npm run e2e`

## Accessibility

- Result announcements use aria-live="polite".
- Non-color indicators in category badge.
- Inputs labeled and validation messages connected via aria-describedby.

## Share API (serverless skeleton)

- Vercel-style serverless functions under `/api`. In development (`vite`), these routes are mocked; deploy to Vercel for real serverless behavior.
- The implementation uses an in-memory Map with TTL for demonstration. For production, use Vercel KV/Upstash or Firestore.

## Optional Auth

- Firebase Auth can be wired by providing env vars prefixed with `VITE_FIREBASE_...` and enabling the code paths in `src/hooks/useAuth.ts`.

## CI

- See `.github/workflows/ci.yml`; it runs lint, unit tests (with coverage >90% on src/lib), accessibility unit tests, and Playwright E2E.

## License

MIT
