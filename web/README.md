<p align="center">
  <img src="../docs/logo.svg" alt="git-recap logo" width="72" height="69" />
</p>

# git-recap landing site

Next.js + Tailwind marketing site for [git-recap](https://github.com/StackwiseTechnologiesLtd/git-recap).

## Stack

* Next.js (App Router)
* Tailwind CSS v4
* TypeScript
* Node built-in test runner (`node --test`)

## Brand

| Token | Value |
|-------|--------|
| Background | `#ffffff` |
| Text | `#0a0a0a` |
| Primary | `#541111` |
| Terminal surface | `#0d0d0d` |

Canonical logo: [`docs/logo.svg`](../docs/logo.svg)  
App copy: [`public/logo.svg`](./public/logo.svg)

```bash
# After editing the logo
cp ../docs/logo.svg ./public/logo.svg
```

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # smoke tests in tests/
npm run build    # static export → out/
npm start        # serve out/ locally
```

## Deploy (Render static site)

The site uses Next.js `output: "export"` so Render can host it as a static site.

| Setting | Value |
|---------|--------|
| Root Directory | `web` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `out` |

Set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g. `https://git-recap.onrender.com`) for canonical/OG URLs.

## Project map

```text
web/
├── public/logo.svg
├── src/app/           # layout, page, globals
├── src/components/    # header, terminal, logo, reveal, copy
└── tests/smoke.test.mjs
```

## UI notes

* Floating solid navbar (`SiteHeader`) — no glassmorphism
* Dark terminal showcases (`TerminalWindow`, `CopyCommand`) without drop shadows
* Feature rows: large terminal + explanation, stacked (not a 3-up grid)
* Scroll reveal (`Reveal`) and animated logo (`AnimatedLogo`)
* Respect `prefers-reduced-motion`

## Contributing

See the repo root [CONTRIBUTING.md](../CONTRIBUTING.md) and [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md).
