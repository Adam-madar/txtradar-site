State as of: 65d7056  ·  Branch: main  ·  Written: 2026-09-02

# Session: SHOWCASE_VIDEO — one-minute product tour video shipped to the site

## What shipped this session
- `65d7056` — **"Watch the tour" section** (`#tour`) on index.html, between `#how` and
  `#formats`: eyebrow + "One minute, end to end" + the 1:05 showcase video in a dark
  rounded frame (`.tour-frame`, matches card tokens). Click-to-play (`controls`, poster,
  `preload="metadata"` — deliberately NO autoplay: 5 MB × mobile visitors), WebM primary
  + MP4 fallback for iPhones.
- New assets, referenced by exact these paths (renaming breaks the section):
  - `assets/showcase-tour.webm` (5.3 MB, VP9 1080p30)
  - `assets/showcase-tour.mp4` (4.4 MB, H.264 fallback)
  - `assets/showcase-poster.jpg` (26 KB title-card poster)
- Verified live on production 2026-09-02: `curl -s https://txtradar.com | grep -c tour-frame`
  returned 1 and the webm serves HTTP 200 with Content-Length 5311026.

## Also now covered (was stale in the previous handoff)
- `8518a22` — floating watch-list notch (`#notch`) that switches the interactive demo
  between watch-lists. Made in a separate session after the 2026-08-28 handoff, never
  documented until now. Verified present and working during this session's local checks.

## Where the video comes from (NOT in this repo)
The video is generated, not recorded. The full pipeline lives in
`C:\Users\info\OneDrive\Desktop\AI AMM\TEXT RADAR\promo-videos\`:
- 6 standalone loop videos (contract scan, statement scan, add-terms — full + lite each)
- `txtradar-showcase-60s.webm/.mp4` — the merged 1:05 cut used on the site
- `sources\` — scene.html / scene2 / scene3 / scene4 / title.html / end.html
  (seekable CSS-animation scenes) + `render.py` (Playwright frame renderer) + `measure.py`
  (click-target coordinate measurement). Rebuild = edit HTML → render frames → encode
  VP9 with imageio-ffmpeg's bundled binary → xfade merge (needs `fps=30,settb=AVTB`
  per input or xfade errors). Requires `pip install playwright imageio-ffmpeg` +
  `python -m playwright install chromium`.
All names in the videos are fictional (Meridian Funding, Blue Harbor, First Commerce…).

## Verification (2026-09-02, local, port 8794 static server from ceo-dash launch.json)
- `#tour` reveal animates in, video readyState 4, playback advances, no console errors.
- `#inviteForm`, `#notch`, STORE_URL wiring all confirmed untouched after the edit.
