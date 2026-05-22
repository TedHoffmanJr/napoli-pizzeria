# Napoli Pizzeria Agent Guide

This repo powers the Napoli Pizzeria public site and ordering surface. Treat it as a live client site: menu accuracy, ordering links, catering inquiries, local SEO, mobile usability, and deploy health all matter.

Follow the global Hoffman Ventures operating doc first when it is available, then this file. This repo-level guide overrides global defaults only for Napoli-specific behavior.

## Current Context

- Client: Napoli Pizzeria, 5194 W. Taft Rd., North Syracuse NY 13212.
- Stack: Next.js 15 app router, React 19, Tailwind CSS 4, Prisma, Supabase, Resend.
- Deploy target: Netlify, using `@netlify/plugin-nextjs`.
- Ordering state as of 2026-05-22: the client is no longer using the previous direct ordering platform. Do not add it back unless Ted explicitly confirms a new live ordering URL.
- SpotOn status: client switched to SpotOn, but it is not yet confirmed whether SpotOn provides a separate ordering site. Until confirmed, keep ordering calls to Uber Eats, DoorDash, and phone.

## High-Risk Surfaces

- `src/app/components/OrderModal.tsx`: customer ordering links. Broken links lose orders.
- `src/app/api/contact/route.ts`: catering/contact lead delivery through Resend.
- `src/app/api/menu-direct/route.ts`: Supabase-backed menu data and menu display.
- `prisma/schema.prisma`: database shape for categories, items, variants, images, and category info.
- `src/app/lib/menuService.ts`: frontend menu fetch path.
- SEO and business identity: name, address, phone, hours, service area, page metadata.

## Ordering Rules

- Do not mention or link to retired ordering platforms.
- DoorDash and Uber Eats links should include website tracking parameters:
  - `utm_source=napoli_website`
  - `utm_medium=referral`
  - `utm_campaign=order_online`
  - `utm_content=order_modal`
- Current DoorDash storefront:
  - `https://www.doordash.com/store/napoli-pizzeria-syracuse-31031912/109548190/`
- Current Uber Eats storefront:
  - `https://www.ubereats.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug`
- If SpotOn provides a real ordering site, add it only after verifying the URL opens the actual Napoli ordering storefront.

## Menu And Data Rules

- Menu prices, item availability, and category structure are customer-facing truth. Verify changes against the current menu source before editing.
- Supabase service role keys and database URLs are secrets. Never commit real values.
- Prefer adding tests or smoke checks around menu transforms before changing API shape.
- Local dev may show menu fetch failures if Supabase env vars are missing or local access is blocked. Do not assume that means production data is broken.

## Commands

Use the repo package manager and lockfile. This repo uses npm.

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Notes:

- `npm run build` fetches Google font assets through `next/font`; sandboxed or offline runs can fail there even when code is valid.
- `npm run lint` currently uses `next lint`, which is deprecated by Next.js and should eventually move to the ESLint CLI.
- `npm test` currently covers the order modal regression for retired platform removal and tracked delivery links.

## Verification Before Handoff

For ordinary content or link changes, run:

```bash
npm test
npm run lint
npm run build
```

For rendered frontend changes, also open the app locally and verify:

- The first meaningful screen is not blank.
- No framework error overlay appears.
- `Order Now` opens the modal.
- The expected links are visible and correct.
- Mobile and desktop layouts do not overlap or clip important text.

## Documentation Discipline

- Keep `AGENTS.md`, `CLAUDE.md`, `BACKLOG.md`, and `CHANGELOG.md` current when meaningful work ships.
- Use `BACKLOG.md` for known future work and risks.
- Use `CHANGELOG.md` for completed or ready-for-review changes.
- If a future agent changes ordering, menu data, contact delivery, SEO, or deployment behavior, update these docs in the same work set.

