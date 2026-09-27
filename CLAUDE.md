# portifolio_frontend

Lucca's portfolio at portfolio.kuuhaku.dev. Next.js 16 (App Router, Turbopack), React 19, Tailwind 4,
Zustand, Framer Motion. General code style lives in `../../general/code_style/` (`next.md`); this file
is only what is specific to this app.

## Working agreements

**Do not commit unless I ask.** Leave changes in the working tree so I can review the diff.

- Do not add dependencies without saying so first.
- Verify in a browser (`pnpm dev`, port 5001) at 1440×900 in both languages, with the console open.
  The splash takes 2.8 s before anything else renders.

## Rules that matter here

- The page scrolls inside `<main>`, not the window: the nav's progress and active section, the hero's
  buttons and the astronaut all read the `scrollRef` the page passes them.
- Every string is in `core/models/translations.ts`, `en` first and `pt: typeof en`, so a key missing
  in one language fails the type check. A project's text lives with it in `core/models/projects.ts`.
- `ink` is the white everything is drawn in, nearly always with an alpha (`text-ink/60`). The brand
  colours of the logos, the skill categories and the project accents are data in their tables, applied
  through `style`.
- The star field is a canvas, so its colours are concrete values in `stars_background.tsx`.
- A project's screenshot is its live site at 1440×900, WebP, in `public/projects/`.
- Docker ships the standalone output (`node server.js`, port 5001). The container must stay
  `portifolio` on 5001: that is what Nginx Proxy Manager forwards to (`../../general/vps/contabo.md`).
- Desktop only: the nav and the two-column sections are drawn for about 1440 px wide.
