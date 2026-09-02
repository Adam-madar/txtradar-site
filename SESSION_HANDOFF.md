State as of: 65d7056  ·  Branch: main  ·  Written: 2026-09-02
This session: SHOWCASE_VIDEO  ·  Archive copy: docs/handoffs/HANDOFF_2026-09-02_SHOWCASE_VIDEO.md
Previous handoff: docs/handoffs/HANDOFF_2026-08-28_APPLE_REDESIGN.md

# 👉 START HERE

**Status in one line:** Apple-style site live with interactive demo + watch-list notch (`8518a22`) and a one-minute "Watch the tour" showcase video (`65d7056`, verified live 2026-09-02).

## ⛔ READ FIRST — these will burn your session
1. **Push to main = instant public deploy** (GitHub Pages + CNAME). No staging. Verify locally first — static server config `txtradar-site` (port 8794) lives in the ceo-dash project's `.claude/launch.json`.
2. **This repo IS the public website.** Every committed file is fetchable at txtradar.com/<path>. Never commit anything sensitive.
3. **index.html live wiring that must survive any edit:** the `STORE_URL` flip (paste store URL → CTAs become install links, invite form hides), the Supabase waitlist form (`#inviteForm`, single DOM node — the request-access sheet BORROWS it while open; never duplicate the form or its IDs), the Chrome Web Store badge rule, and the watch-list notch (`#notch`) that drives the interactive demo.
4. **The tour video section (`#tour`) references `assets/showcase-tour.webm/.mp4` + `showcase-poster.jpg` by exact path.** The video is GENERATED — sources + render pipeline are NOT in this repo: `Desktop\AI AMM\TEXT RADAR\promo-videos\sources\` (see archive handoff for the rebuild recipe). Don't re-record; re-render.

## Deployed vs committed
- Committed on `main`: `65d7056`
- Live in production:  `65d7056` — verified 2026-09-02
- Verify with: `curl -s https://txtradar.com | grep -c tour-frame` (1 = tour section live)

## Working tree
- Clean at handoff time. Nothing dirty or untracked on purpose.
- **Never commit:** borrower/client data, keys beyond the by-design-public Supabase anon key.

## Not done / unverified
- [ ] Testimonials section still hidden (`#loved`, display:none) awaiting real quotes
- [ ] Waitlist TEST ROW from 2026-08-28 may still be in Supabase `waitlist` (`Form Test (Claude)`) — delete at will
- [ ] STORE_URL still empty — when the Chrome Web Store listing goes live, paste the URL into `STORE_URL` in index.html and redeploy

## Don'ts — traps and settled decisions
- ⛔ Theme is ADAPTIVE (light default, dark via prefers-color-scheme) — settled 2026-08-28, don't force dark.
- ⛔ `assets/radar.js` is the shared brand radar (extension uses it too) — don't restyle or replace.
- ⛔ Design system = `apple-site` skill (system fonts, spring physics, reduced-motion fallbacks) — keep new UI consistent.
- ⛔ Tour video: NO autoplay (settled 2026-09-02 — 5 MB, mobile visitors); click-to-play with poster.
- ⛔ Video edits happen in the scene HTML sources + re-render, never by editing the encoded files.

## Next action
When the Chrome Web Store listing is live: set `STORE_URL` in index.html, verify locally on 8794, push.
