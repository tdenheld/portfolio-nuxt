# tibor.work

Personal portfolio built with Nuxt 4, Nuxt Content, Tailwind CSS, and GSAP.

## Setup

```bash
npm install
npx playwright install chromium
npm run dev
```

The development server runs at `http://localhost:3000`.

## Commands

```bash
npm run build          # Production build
npm run lint           # ESLint
npm run format:check   # Prettier verification
npm run typecheck      # Nuxt TypeScript check
npm test               # Playwright route and accessibility tests
npm run validate       # Run all quality checks
```

Page and project data lives in `content/` and is validated by `content.config.ts`.
Browser behavior is implemented in `app/composables/`; `app/plugins/` is reserved
for application initialization such as GSAP registration.
