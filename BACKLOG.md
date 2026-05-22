# Napoli Pizzeria Backlog

Known future work and risk items for the Napoli Pizzeria site. Keep this list practical and prune it as work ships.

## High Priority

- Confirm whether SpotOn provides a live Napoli ordering storefront. If yes, verify the exact URL opens the correct ordering page, add tracked website parameters where the platform preserves them, and update the order modal plus tests.
- Add a resilient menu fallback for local/dev failures when Supabase env vars are missing. The homepage currently logs menu fetch errors in local dev if `/api/menu-direct` cannot reach Supabase.
- Review the contact/catering email path. `src/app/api/contact/route.ts` currently logs request bodies and uses `onboarding@resend.dev`; move toward a verified sender and reduce noisy or sensitive logs.

## Medium Priority

- Migrate `npm run lint` away from deprecated `next lint` before Next.js 16.
- Add a small rendered smoke test for the homepage order modal flow, ideally covering desktop and mobile viewports.
- Review all business identity fields across metadata, visible copy, schema if added, footer, and contact surfaces.
- Document the live menu management workflow: who updates items, where prices are changed, and how production data is verified after an update.
- Clean up old one-off menu/image/debug scripts or move them into a documented maintenance folder.

## Low Priority

- Improve README encoding and project tree formatting so it renders cleanly in all editors.
- Add a short deployment note for Netlify, required env vars, and rollback steps.
- Consider a simple status checklist for seasonal promos and specials so expired scripts do not linger.

