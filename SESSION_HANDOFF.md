State as of: 4388632  ·  Branch: main  ·  Written: 2026-08-28
This session: APPLE_REDESIGN  ·  Archive copy: docs/handoffs/HANDOFF_2026-08-28_APPLE_REDESIGN.md
Previous handoff: none — first handoff in this repo

# 👉 START HERE

**Status in one line:** Apple-style fluid redesign of index.html shipped and verified live on txtradar.com on 2026-08-28; everything else in the repo untouched.

## ⛔ READ FIRST — these will burn your session
1. **Push to main = instant public deploy** (GitHub Pages + CNAME). There is no staging. Verify locally before pushing — a static server config named `txtradar-site` exists in the ceo-dash project's `.claude/launch.json` (port 8794).
2. **This repo IS the public website.** Every committed file is fetchable at txtradar.com/<path>. Never commit anything sensitive.
3. **index.html carries live wiring that must survive any edit:** the `STORE_URL` flip (paste store URL → CTAs become install links, invite form hides — no other edits needed), the Supabase waitlist form (`#inviteForm`, submit code near the bottom), and the Chrome Web Store badge rule (only visible once STORE_URL is set, must link to the listing).
4. **The request-access sheet BORROWS the `#inviteForm` DOM node** while open and returns it on dismiss — there is exactly one form and one set of IDs. Don't duplicate the form or its IDs anywhere.

## Deployed vs committed
- Committed on `main`: `7d5831a`
- Live in production:  `7d5831a` — verified 2026-08-28 by polling txtradar.com for the new page's `sheetFormSlot` marker
- Verify with: `curl -s https://txtradar.com | grep -c sheetFormSlot` (1 = new page live)

## Working tree
- Clean at handoff time. No dirty or untracked-on-purpose files in this repo.
- **Never commit:** anything with borrower/client data, API keys beyond the already-public Supabase anon key that ships in index.html by design.

## Not done / unverified
- [x] Waitlist form live-tested 2026-08-28: submit on production succeeded and a duplicate resubmit returned the 409 "already on the list" path — row confirmed in Supabase `waitlist`. A TEST ROW remains there (`Form Test (Claude)` / adam+formtest@adammadar.com, note "end-to-end form test — ignore") — delete at will; it will appear in the 2026-08-29 waitlist digest email.
- [ ] support.html / privacy.html / confirmed.html still have the OLD design — they work, they just don't match index.html yet
- [ ] Testimonials section still hidden (`#loved`, display:none) awaiting real quotes — carried over from before

## Don'ts — traps and settled decisions
- ⛔ Settled 2026-08-28: theme is ADAPTIVE (light default, dark via prefers-color-scheme), Adam chose this over dark-only. Don't force dark.
- ⛔ `assets/radar.js` is the brand radar (also used by the Chrome extension's UI) — kept deliberately untouched in the redesign. Mounts: navRadar 30px, heroRadar 132px. Don't restyle or replace it.
- ⛔ The design system is the `apple-site` skill (global, `~/.claude/skills/apple-site`): system font stack, spring physics (not CSS keyframes) for gesture-driven motion, reduced-motion/-transparency fallbacks. Keep new UI consistent with it.
- ⛔ Rollback, if the redesign misbehaves: `git revert 7d5831a` + push — don't hand-edit backwards.
- Reference mockup this shipped from: https://claude.ai/code/artifact/7c7c20c0-487f-401e-aded-f60af9c5998a (private artifact on Adam's account)

## Next action
Decide whether to port the Apple treatment to the support/privacy/confirmed pages (they still have the old design); delete the waitlist test row when convenient.
