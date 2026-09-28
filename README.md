# Lucca Gabriel — Portfolio

> Personal portfolio website for Lucca Gabriel, Full-Stack Developer & Computer Engineer, at [portfolio.kuuhaku.dev](https://portfolio.kuuhaku.dev). Built with a space-themed aesthetic featuring animated backgrounds, smooth scroll sections, and bilingual (EN/PT) support.

---

## 🚀 Features

- **Single-page layout** — Home, About, Skills, Projects, and Contact sections on one scrollable page
- **Bilingual** — full English / Portuguese support, remembered between visits
- **Animated UI** — Framer Motion scroll-reveal animations throughout
- **Space theme** — animated star background, floating astronaut, and logo intro screen
- **Static skill map** — categorized tech badges (Frontend, Backend, Mobile, Tools)
- **Project showcase** — each live project shows a screenshot of its site in a browser window, a "Live" badge, a button to the site and links to every repository

---

## 📸 Preview

The portfolio opens with a 2.8-second animated logo screen, then transitions to the main layout: a fixed navigation bar, an animated starfield background, and a floating astronaut. Sections scroll vertically inside a single container.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, standalone output) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, colours from design tokens |
| State | Zustand 5 (the language) |
| Animations | Framer Motion 12 |
| Icons | React Icons 5 — Material outlined, plus brand logos |
| Font | Nunito (Google Fonts via `next/font`) |
| Runtime | React 19 |
| Package Manager | pnpm |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — metadata, Nunito
│   ├── opengraph-image.tsx     # The 1200×630 card link previews show (LinkedIn, WhatsApp)
│   ├── providers.tsx           # Restores the saved language
│   └── (home)/
│       ├── page.tsx            # Logo splash, then the nav, stars, sections and astronaut
│       └── _components/
│           ├── hero.tsx        # Hero section
│           ├── about.tsx       # Bio, experience, education timeline
│           ├── skills.tsx      # Categorized skill badges
│           ├── projects.tsx    # Project cards with screenshots and links
│           ├── contact.tsx     # Contact links (email, GitHub, LinkedIn)
│           ├── section_header.tsx
│           ├── nav_bar.tsx     # Side navigation with scroll progress and language toggle
│           ├── logo_splash.tsx # Animated intro logo
│           ├── floating_astronaut.tsx
│           └── stars_background.tsx
├── core/
│   ├── controllers/            # language_controller (EN/PT, saved in localStorage)
│   └── models/                 # translations (all UI strings), projects (the showcase)
└── styles/                     # index.css → tokens, theme, base, utilities
public/
├── logo/                       # logo.png
└── projects/                   # one 1440×900 screenshot per live project
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/WorstOne0/portifolio-next.git
cd portifolio-next

# Install dependencies
pnpm install
```

---

## ▶️ Usage

```bash
# Development server (port 5001)
pnpm dev

# Production build
pnpm build

# Start production server (port 5001)
pnpm start

# Lint
pnpm lint
```

Open [http://localhost:5001](http://localhost:5001) in your browser.

---

## 🗂 Adding a project

A project is one row in `src/core/models/projects.ts`: its name, site, accent colour, stack, repositories and a description in both languages. For the screenshot, save the live site at 1440×900 as WebP in `public/projects/` and point `image` at it; without one, the card draws a panel in the project's accent colour instead.

---

## 🔌 Integrations

| Integration | Purpose |
|---|---|
| Google Fonts (Nunito) | Typography via `next/font/google` |
| GitHub links | Project source code links (in `core/models/projects.ts`) |
| External site links | Live project URLs (pedroluisimoveis.com.br, wikidados.com.br, chess.kuuhaku.dev, minesweeper.kuuhaku.dev) |

No backend or API routes — fully static frontend.

---

## 🐳 Deploy

Docker, standalone output on port 5001:

```bash
docker compose up -d --build
```

The container joins the external `nginx-proxy` network as `portifolio`. On the VPS, Nginx Proxy Manager forwards `portfolio.kuuhaku.dev` to `portifolio:5001` — a route set up by hand in its UI; the `VIRTUAL_*` variables in `docker-compose.yml` are only read by jwilder/nginx-proxy.

---

## 🧪 Testing

No test suite is currently configured.

---

## 📌 Roadmap

- [ ] Add dark/light theme toggle
- [ ] Add contact form with email delivery
- [ ] Improve mobile responsiveness
- [ ] Add more projects

---

## 🤝 Contributing

This is a personal portfolio. Feel free to fork it and adapt it for your own use.

---

## 📄 License

Not specified. All rights reserved by Lucca Gabriel.

---

**Short description (≤160 chars):**
> Space-themed personal portfolio for a Full-Stack Developer. Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion. Bilingual EN/PT.

**Suggested GitHub tags:**
`portfolio` `nextjs` `react` `typescript` `tailwindcss` `framer-motion` `personal-website` `full-stack` `bilingual`
