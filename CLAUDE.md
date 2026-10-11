# CLAUDE.md — Fractify

Working model of fractional ownership for a college FinTech presentation. Keep it runnable with zero installs.

## Run / test
- `python server.py` (flags: `--port 8000`, `--no-browser`, `--reset`, `--stateless`)
- `python test_engine.py` — run after any change to `engine.py` or `seed.py`

## Architecture
- `engine.py` — `Platform` class holds all state in `self.s` (a JSON-serialisable dict) and persists it to `data/state.json`.
  - Every mutating method takes `self.lock`, validates, changes state, appends a ledger block via `_block()`, calls `save()`,
    and returns `{"title", "explain"}` — the UI shows these as toasts, so write them for a classroom audience.
  - Raise `EngineError` for user mistakes; the server turns it into HTTP 400 `{"error": ...}`.
  - `view()` builds everything the frontend needs (assets with holders/orders, investors with portfolio totals, stats).
- `seed.py` — `build_seed()` creates investors, assets and backdated history through the normal engine methods.
- `server.py` — stdlib `ThreadingHTTPServer`; `ACTIONS` maps POST routes to engine calls; every POST response is `{"result", "state"}`.
  - Stateless mode (`platform is None`: Vercel via `api/index.py` + `vercel.json`, or `--stateless`): nothing is stored
    on the server. Responses carry the raw state as `save`; `app.js` keeps it in localStorage and sends it back as
    `state` with every call. Anything that must work online has to go through this path - no server-side files or globals.
- `static/app.js` — vanilla JS, no build step. One global `S` state object; `render()` redraws the current view and the
  asset modal from `S.data`. Click handling is delegated via `data-action` attributes. Inline SVG icons in `ICONS`.

## Rules
- Money is always integer **paise** in the backend (`₹1 = 100`). Format with `fmt_inr` (Python) / `inr`, `inrShort` (JS).
- Fractions are integers. Holdings for an asset must always sum to `total_units` (a test checks this).
- Special accounts: `spv` (holds unsold fractions, receives their income) and `others` (aggregate crowd investor, unlimited cash).
- Ledger hash = SHA-256 of the block's JSON (sorted keys, ASCII) without the `hash` field. Don't add fields to old blocks.
- No third-party Python packages, no CDNs or network requests in the UI — it must work offline on a college PC.
- Open files with `encoding="utf-8"`; keep console `print` output ASCII (Windows consoles).
- Group member names and colours live in `seed.GROUP`. Tanmay's surname is spelled "Tailor".

## Design tokens (from the purple fintech reference)
Primary `#6C22F2`, light `#A98BFF` / `#EEE7FF` / `#F7F4FF`, navy `#1C1543`, ink `#16122E`, green `#16B37E`,
amber `#F5A524`. Font Poppins (bundled in `static/fonts`). Pill buttons, 16–28px radii, soft purple shadows,
purple full-width stat band, navy feature panels, numbered steps with dashed connectors.
