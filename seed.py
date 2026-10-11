from datetime import datetime

from engine import IST, OTHERS, SPV

GROUP = [
    ("atharva", "Atharva Dandgavhan", "#6C22F2"),
    ("harris", "Harris Khan", "#F5A524"),
    ("tanmay", "Tanmay Tailor", "#16B37E"),
    ("harsh", "Harshwardhan Sharma", "#1E1446"),
]

STARTING_WALLET = 10_00_000

ASSETS = [
    dict(aid="villa", name="Sea-View Holiday Villa", category="Residential · Holiday rental",
         location="Assagao, Goa", art="villa", total_units=1000, unit_price_rupees=10_000, yield_pct=7.2,
         income_label="Rent",
         description="4-bedroom villa rented to tourists through the year. Rent is collected by the SPV and paid out to fraction owners every month."),
    dict(aid="office", name="Grade-A Office Floor", category="Commercial · Leased office",
         location="Andheri East, Mumbai", art="office", total_units=5000, unit_price_rupees=10_000, yield_pct=8.4,
         income_label="Rent",
         description="Full floor leased to an IT company on a 9-year lease. Stable monthly rent - the most common asset on Indian fractional platforms."),
    dict(aid="solar", name="Rooftop Solar Park", category="Infrastructure · Energy",
         location="Sinnar, Nashik", art="solar", total_units=2000, unit_price_rupees=10_000, yield_pct=10.8,
         income_label="Power sales",
         description="1 MW rooftop solar plant selling electricity to a factory under a 15-year agreement. Income comes from units of power sold."),
    dict(aid="art", name="“Monsoon Lines” Painting", category="Collectible · Fine art",
         location="Gallery vault, Mumbai", art="art", total_units=800, unit_price_rupees=5_000, yield_pct=0.0,
         income_label="Exhibition fee",
         description="Original contemporary painting (sample asset). Produces no regular income - owners earn only if its value rises and it is sold."),
]


def at(day, hour=11):
    return datetime(2026, day[0], day[1], hour, 0, tzinfo=IST)


def build_seed(p):
    p.blank()
    p._clock = at((6, 1), 9)
    p._block("GENESIS", memo="Fractify ledger started")
    p.add_investor(SPV, "Asset SPV", "#E4DCFB", 0, kind="system")
    p.add_investor(OTHERS, "Other investors", "#B9B3D3", 0, kind="crowd")
    for iid, name, color in GROUP:
        p.add_investor(iid, name, color, STARTING_WALLET)

    history = {
        "villa": [9_400, 9_620, 9_810, 10_000],
        "office": [9_550, 9_700, 9_880, 10_000],
        "solar": [9_700, 9_800, 9_920, 10_000],
        "art": [4_300, 4_520, 4_760, 5_000],
    }
    months = ["2026-02-01", "2026-03-01", "2026-04-01", "2026-05-01"]
    for a in ASSETS:
        info = dict(a)
        aid = info.pop("aid")
        asset = p.add_asset(aid, **info)
        asset["history"] = [{"t": f"{m}T10:00:00+05:30", "price": v * 100} for m, v in zip(months, history[aid])]

    buys = [
        ((6, 3), OTHERS, "villa", 420), ((6, 4), "harris", "villa", 30), ((6, 6), "tanmay", "villa", 20),
        ((6, 8), "harsh", "villa", 15),
        ((6, 10), OTHERS, "office", 3100), ((6, 12), "harsh", "office", 15), ((6, 14), "harris", "office", 10),
        ((6, 18), OTHERS, "solar", 950), ((6, 20), "tanmay", "solar", 12), ((6, 22), "harris", "solar", 8),
        ((6, 25), OTHERS, "art", 310), ((6, 27), "tanmay", "art", 10),
    ]
    for day, who, aid, units in buys:
        p._clock = at(day)
        p.buy_primary(who, aid, units)

    p._clock = at((9, 30), 18)
    p.distribute("villa", 60_000, "September rent")
    p._clock = at((10, 1), 10)
    p.distribute("office", 3_50_000, "September rent")
    p._clock = at((10, 3), 12)
    p.list_order("harris", "villa", 10, 10_250)
    p._clock = None
    p.s["last_distribution"] = None
