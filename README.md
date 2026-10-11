# Fractify — a working model of fractional ownership

FinTech group presentation · Introduction of Financial Technology (316Z04C301), KJSSE
Atharva Dandgavhan · Harris Khan · Tanmay Tailor · Harshwardhan Sharma

Fractify shows how one expensive asset (a ₹1 Cr villa, an office floor, a solar park, a painting) is split into
equal fractions that many people co-own. You can buy fractions, pay out rent pro-rata, revalue the asset, sell
fractions to another investor, and check a tamper-evident (hash-chained) ledger of everything that happened.

Pure Python standard library + plain HTML/CSS/JS. **No installs, no internet needed.** Fonts are bundled.

## Run it

**Windows:** double-click `run.bat`
**Any OS:** open a terminal in this folder and run

```
python server.py
```

Your browser opens at `http://127.0.0.1:8000/` (if 8000 is busy it picks the next free port and prints it).
Stop with `Ctrl+C`. Needs Python 3.8 or newer.

Start fresh before presenting: `python server.py --reset` (or click the ↻ button in the top-right of the app).

## Put it online (Vercel)

The repo is ready to deploy as-is: import it at vercel.com/new (or run `npx vercel` in this folder) and keep the
default settings. `vercel.json` serves `static/` as the site and sends `/api/*` to `api/index.py`.

Vercel cannot keep a file between requests, so online the demo data lives in **each visitor's browser**
(localStorage) instead of `data/state.json`. Everyone who opens the link gets their own copy starting from the
seed data; the ↻ button resets it. To rehearse that mode offline: `python server.py --stateless`.

## 75-second demo path

1. **Marketplace** → open **Sea-View Holiday Villa**. Point at the 10×10 grid: each square is 1% of the villa.
2. Acting as **Atharva** (top-right avatars), click **50** → **Buy 50 fractions**. Five squares turn navy: 5% for ₹5,00,000.
3. **SPV manager** tab → **Distribute** (₹60,000 rent). The table on the left shows every owner paid ₹60 per fraction.
4. Click **+5% value**. Every fraction is now worth ₹10,500, so Atharva's stake gained ₹25,000.
5. Switch to **Tanmay** (the **TT** avatar) → in **Secondary market**, buy Harris's 10 listed fractions. Harris exits with a profit; the villa was never sold.
6. **Ledger** → **Verify chain** (green) → **Tamper with a record** → **Verify chain** again (red, record caught) → **Restore record**.

## What's inside

| File | What it does |
|---|---|
| `engine.py` | The model: assets, fractions, wallets, primary buys, secondary market, pro-rata income, revaluation, SHA-256 hash-chained ledger |
| `seed.py` | Starting data: the 4 group members (₹10,00,000 wallet each), 4 assets, past purchases and payouts |
| `server.py` | Tiny HTTP server: serves the UI and a JSON API (`/api/state`, `/api/buy`, `/api/list`, `/api/fill`, `/api/cancel`, `/api/distribute`, `/api/revalue`, `/api/verify`, `/api/tamper`, `/api/restore`, `/api/reset`) |
| `api/index.py`, `vercel.json` | Vercel deployment: runs the same server code without a state file |
| `static/` | The web interface (`index.html`, `styles.css`, `app.js`, bundled Inter font) |
| `test_engine.py` | Unit tests: `python test_engine.py` |
| `data/state.json` | Created at runtime; delete it (or use `--reset`) to start over |

## Key ideas the model demonstrates

- **Tokenization:** asset value ÷ number of fractions = price of one fraction (₹1 Cr ÷ 1,000 = ₹10,000).
- **SPV:** each asset sits in its own special purpose vehicle; unsold fractions stay with the SPV.
- **Pro-rata income:** own 5% of fractions → receive 5% of the rent. Money is kept in whole paise so payouts add up exactly.
- **Liquidity:** owners exit by selling fractions to other investors on a secondary market.
- **Trust:** every action is a ledger record holding the hash of the previous record, so any edit is detectable.

## Troubleshooting

- *"python is not recognized"* — install Python from python.org and tick **Add Python to PATH**, or try `py server.py`.
- *Page says it can't reach the server* — the terminal window running `server.py` must stay open.
- *Numbers look wrong after practice runs* — click ↻ (reset) in the app.

## Using with Claude Code

Open this folder in Claude Code and ask for changes in plain words, e.g. "add a gold bullion asset",
"add a 1% platform fee on secondary trades", "show a pie chart on the portfolio page". `CLAUDE.md` gives it the
project map and rules.

*Educational simulation only. Not a real investment platform.*
