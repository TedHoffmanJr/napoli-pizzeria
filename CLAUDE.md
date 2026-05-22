# Napoli Pizzeria Claude Guide

This is the Claude-facing companion to `AGENTS.md`. Keep both files aligned when project rules change.

## Project Role

Napoli Pizzeria is a live local restaurant website. It exists to help customers view the menu, place delivery orders, call the shop, send catering inquiries, and trust the business information they see online.

The site should feel fast, simple, mobile-first, and accurate. Avoid speculative features unless Ted explicitly asks for them.

## Current Ordering State

As of 2026-05-22:

- The client is no longer using the previous direct ordering platform.
- The client switched to SpotOn, but it is not confirmed whether SpotOn provides a standalone ordering site.
- The order modal should currently show Uber Eats and DoorDash only, plus the phone call option.
- Do not restore retired platform copy, URLs, buttons, scripts, docs, or test fixtures.
- DoorDash and Uber Eats outbound links should carry `utm_source=napoli_website`, `utm_medium=referral`, `utm_campaign=order_online`, and `utm_content=order_modal`.

## Important Files

- `src/app/components/OrderModal.tsx`: ordering modal and outbound delivery links.
- `src/app/components/Navigation.tsx`: desktop and mobile `Order Now` entry point.
- `src/app/page.tsx`: homepage, hero CTA, featured items.
- `src/app/menu/page.tsx`: menu surface.
- `src/app/catering/page.tsx`: catering inquiry form.
- `src/app/api/contact/route.ts`: Resend email delivery for contact and catering forms.
- `src/app/api/menu-direct/route.ts`: direct Supabase menu API.
- `src/app/api/menu/route.ts`: Prisma menu API.
- `src/app/lib/menuService.ts`: frontend menu fetch helper.
- `prisma/schema.prisma`: menu database models.
- `tests/order-modal.test.tsx`: regression coverage for ordering links.

## Guardrails

- Do not commit secrets, customer private data, or live service keys.
- Do not invent menu prices, hours, availability, specials, or ordering URLs.
- Do not make large design or routing changes without checking mobile and desktop rendering.
- Do not change database schema or deploy config casually.
- Do not remove call ordering. Phone orders are still a safe fallback.
- Keep external scripts and third-party links minimal and intentional.

## Local Commands

```bash
npm run dev
npm test
npm run lint
npm run build
```

The build may need network access for Google font fetching through `next/font`.

## Before Saying Done

Run the relevant checks and report exact results. For ordering, menu, contact, or layout changes, include the rendered flow you verified.

Minimum expected verification for ordering-link changes:

```bash
npm test
npm run lint
npm run build
```

Then browser-check `Order Now` on the local site.

