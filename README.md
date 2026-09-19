# Fuel Crisis England

A public information and civic campaign website about petrol and diesel affordability in
England: verified fuel price data (with a clear "not connected yet" state), a plain-English
explanation of what drives fuel prices, a fuel cost calculator, a petition and public
experience form, MP contact tooling, and lawful civic action guidance.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/lib/data/` — content and reference data (FAQs, price factors, sources, impact groups).
- `src/lib/data/fuel-prices.ts` — the fuel price **data adapter**. It currently returns `null`
  / empty arrays because no live data source is connected; implement the fetch calls here to
  go live.
- `src/lib/data/tax-info.ts` — fuel duty / VAT figures. Set `verified: true` and fill in the
  fields only once a figure has been checked against an official source.
- `src/lib/server/petition-store.ts` — an in-memory, non-persistent demo store for the
  petition counter and public experience submissions. Replace with a real database before
  going live.
- `src/app/api/petition/route.ts` — server-side validation, sanitisation, and honeypot spam
  protection for the petition form.
- `src/components/` — organised by feature (`home/`, `fuel-prices/`, `calculator/`,
  `petition/`, `action/`, `faq/`, `sources/`, `layout/`, `ui/`).

## What's connected vs demo

- Fuel prices (snapshot, historical chart, regional table): **not connected**. Shows an
  honest empty state, with an opt-in "preview with demo data" toggle that always displays a
  visible demo-data label.
- Fuel duty / VAT figures: **not connected**. Shows a placeholder until verified.
- Petition + public experience form: **demo backend**. Real server-side validation, but
  storage is in-memory only (resets on restart) and clearly labelled as demo mode.
- News articles: **not connected**. No articles are invented; only links to official sources.
- MP contact: links to the real UK Parliament "Find your MP" tool and prepares an editable
  email draft — nothing is ever sent automatically.

## Scripts

- `npm run dev` — start the dev server.
- `npm run build` — production build.
- `npm run lint` — ESLint.
