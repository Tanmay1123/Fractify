import copy
import hashlib
import json
import threading
from datetime import datetime, timedelta, timezone
from pathlib import Path

IST = timezone(timedelta(hours=5, minutes=30))

SPV = "spv"
OTHERS = "others"
SYSTEM_ACCOUNTS = {SPV, OTHERS}


class EngineError(Exception):
    pass


def fmt_inr(paise):
    paise = int(round(paise))
    neg = paise < 0
    rupees, rem = divmod(abs(paise), 100)
    s = str(rupees)
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        groups = []
        while len(head) > 2:
            groups.insert(0, head[-2:])
            head = head[:-2]
        if head:
            groups.insert(0, head)
        s = ",".join(groups) + "," + tail
    out = "₹" + s + (f".{rem:02d}" if rem else "")
    return "-" + out if neg else out


def fmt_pct(units, total):
    return f"{(units * 100 / total):.2f}%" if total else "0.00%"


def block_hash(block):
    payload = {k: v for k, v in block.items() if k != "hash"}
    raw = json.dumps(payload, sort_keys=True, ensure_ascii=True, separators=(",", ":"))
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


class Platform:
    def __init__(self, path=None, state=None):
        self.path = Path(path) if path else None
        self.lock = threading.RLock()
        self._clock = None
        self.s = state
        if self.s is None and self.path and self.path.exists():
            try:
                self.s = json.loads(self.path.read_text(encoding="utf-8"))
            except (ValueError, OSError):
                self.s = None
        if self.s is None:
            self.reset()

    def now(self):
        return (self._clock or datetime.now(IST)).isoformat(timespec="seconds")

    def save(self):
        if not self.path:
            return
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(self.s, ensure_ascii=False, indent=1), encoding="utf-8")
        tmp.replace(self.path)

    def reset(self):
        from seed import build_seed
        with self.lock:
            build_seed(self)
            self.save()

    def blank(self):
        self.s = {
            "investors": {},
            "assets": {},
            "holdings": {},
            "cost": {},
            "income": {},
            "orders": [],
            "ledger": [],
            "last_distribution": None,
            "tamper_backup": None,
            "seq": {"order": 0},
        }

    def add_investor(self, iid, name, color, cash_rupees=0, kind="person"):
        self.s["investors"][iid] = {
            "id": iid,
            "name": name,
            "short": name.split()[0],
            "initials": "".join(p[0] for p in name.split()[:2]).upper(),
            "color": color,
            "cash": int(cash_rupees * 100),
            "kind": kind,
        }

    def add_asset(self, aid, **info):
        total = int(info["total_units"])
        price = int(info["unit_price_rupees"] * 100)
        asset = {
            "id": aid,
            "name": info["name"],
            "category": info["category"],
            "location": info["location"],
            "description": info["description"],
            "art": info.get("art", "building"),
            "total_units": total,
            "unit_price": price,
            "valuation": price * total,
            "yield_pct": info.get("yield_pct", 0.0),
            "income_label": info.get("income_label", "Rent"),
            "raised": 0,
            "income_paid": 0,
            "history": [],
        }
        self.s["assets"][aid] = asset
        self.s["holdings"][aid] = {SPV: total}
        self._block("TOKENIZE", asset=aid, frm=None, to=SPV, units=total, amount=asset["valuation"],
                    memo=f"{asset['name']} valued at {fmt_inr(asset['valuation'])} split into {total:,} fractions of {fmt_inr(price)}")
        asset["history"].append({"t": self.now(), "price": price})
        return asset

    def _investor(self, iid):
        inv = self.s["investors"].get(iid)
        if not inv:
            raise EngineError(f"Unknown investor '{iid}'")
        return inv

    def _asset(self, aid):
        a = self.s["assets"].get(aid)
        if not a:
            raise EngineError(f"Unknown asset '{aid}'")
        return a

    @staticmethod
    def _positive_int(value, label):
        try:
            n = int(value)
        except (TypeError, ValueError):
            raise EngineError(f"{label} must be a whole number")
        if n <= 0:
            raise EngineError(f"{label} must be at least 1")
        return n

    def _block(self, kind, asset=None, frm=None, to=None, units=0, amount=0, memo=""):
        ledger = self.s["ledger"]
        block = {
            "index": len(ledger),
            "ts": self.now(),
            "type": kind,
            "asset": asset,
            "from": frm,
            "to": to,
            "units": int(units),
            "amount": int(amount),
            "memo": memo,
            "prev_hash": ledger[-1]["hash"] if ledger else "0" * 64,
        }
        block["hash"] = block_hash(block)
        ledger.append(block)
        return block

    def units_of(self, aid, iid):
        return self.s["holdings"][aid].get(iid, 0)

    def locked_units(self, aid, iid):
        return sum(o["remaining"] for o in self.s["orders"]
                   if o["asset"] == aid and o["seller"] == iid and o["status"] == "open")

    def _move_units(self, aid, frm, to, units):
        h = self.s["holdings"][aid]
        h[frm] = h.get(frm, 0) - units
        if h[frm] == 0 and frm != SPV:
            del h[frm]
        h[to] = h.get(to, 0) + units

    def _add_cost(self, iid, aid, paise):
        self.s["cost"].setdefault(iid, {})
        self.s["cost"][iid][aid] = self.s["cost"][iid].get(aid, 0) + paise

    def buy_primary(self, investor, asset, units):
        with self.lock:
            inv = self._investor(investor)
            a = self._asset(asset)
            units = self._positive_int(units, "Fractions")
            if investor in SYSTEM_ACCOUNTS and investor != OTHERS:
                raise EngineError("The SPV cannot buy its own fractions")
            available = self.units_of(asset, SPV)
            if units > available:
                raise EngineError(f"Only {available:,} unsold fractions are left")
            cost = units * a["unit_price"]
            if investor != OTHERS and cost > inv["cash"]:
                raise EngineError(f"{inv['short']} needs {fmt_inr(cost)} but has {fmt_inr(inv['cash'])}")
            if investor != OTHERS:
                inv["cash"] -= cost
            a["raised"] += cost
            self._move_units(asset, SPV, investor, units)
            self._add_cost(investor, asset, cost)
            self._block("PRIMARY_BUY", asset=asset, frm=SPV, to=investor, units=units, amount=cost,
                        memo=f"{inv['short']} bought {units:,} new fractions at {fmt_inr(a['unit_price'])}")
            held = self.units_of(asset, investor)
            self.save()
            return {
                "title": f"{inv['short']} bought {units:,} fractions",
                "explain": (f"{units:,} × {fmt_inr(a['unit_price'])} = {fmt_inr(cost)} paid to the asset SPV. "
                            f"{inv['short']} now owns {held:,} of {a['total_units']:,} fractions = "
                            f"{fmt_pct(held, a['total_units'])} of {a['name']}."),
            }

    def list_order(self, investor, asset, units, price_rupees):
        with self.lock:
            inv = self._investor(investor)
            a = self._asset(asset)
            units = self._positive_int(units, "Fractions")
            try:
                price = int(round(float(price_rupees) * 100))
            except (TypeError, ValueError):
                raise EngineError("Price must be a number")
            if price <= 0:
                raise EngineError("Price must be above zero")
            free = self.units_of(asset, investor) - self.locked_units(asset, investor)
            if units > free:
                raise EngineError(f"{inv['short']} has only {free:,} fractions free to sell")
            self.s["seq"]["order"] += 1
            order = {
                "id": f"O-{self.s['seq']['order']:03d}",
                "asset": asset,
                "seller": investor,
                "units": units,
                "remaining": units,
                "price": price,
                "status": "open",
                "ts": self.now(),
            }
            self.s["orders"].append(order)
            self._block("LISTING", asset=asset, frm=investor, to=None, units=units, amount=units * price,
                        memo=f"{inv['short']} listed {units:,} fractions at {fmt_inr(price)} each ({order['id']})")
            self.save()
            prem = (price - a["unit_price"]) * 100 / a["unit_price"]
            return {
                "title": f"{inv['short']} listed {units:,} fractions for sale",
                "explain": (f"Listed at {fmt_inr(price)} per fraction ({prem:+.1f}% vs current value "
                            f"{fmt_inr(a['unit_price'])}). Any other investor can now buy them - "
                            f"this is how a fractional owner exits without selling the whole asset."),
            }

    def _order(self, order_id):
        for o in self.s["orders"]:
            if o["id"] == order_id:
                return o
        raise EngineError(f"Unknown listing '{order_id}'")

    def fill_order(self, investor, order_id, units=None):
        with self.lock:
            buyer = self._investor(investor)
            o = self._order(order_id)
            if o["status"] != "open":
                raise EngineError("That listing is no longer open")
            if o["seller"] == investor:
                raise EngineError("You cannot buy your own listing")
            units = o["remaining"] if units in (None, "", 0) else self._positive_int(units, "Fractions")
            if units > o["remaining"]:
                raise EngineError(f"Only {o['remaining']:,} fractions left in this listing")
            seller = self._investor(o["seller"])
            a = self._asset(o["asset"])
            pay = units * o["price"]
            if investor != OTHERS and pay > buyer["cash"]:
                raise EngineError(f"{buyer['short']} needs {fmt_inr(pay)} but has {fmt_inr(buyer['cash'])}")
            seller_units = self.units_of(o["asset"], o["seller"])
            seller_cost = self.s["cost"].get(o["seller"], {}).get(o["asset"], 0)
            cost_out = seller_cost * units // seller_units if seller_units else 0
            if investor != OTHERS:
                buyer["cash"] -= pay
            if o["seller"] != OTHERS:
                seller["cash"] += pay
            self._add_cost(o["seller"], o["asset"], -cost_out)
            self._add_cost(investor, o["asset"], pay)
            self._move_units(o["asset"], o["seller"], investor, units)
            o["remaining"] -= units
            if o["remaining"] == 0:
                o["status"] = "filled"
            profit = pay - cost_out
            self._block("SECONDARY_TRADE", asset=o["asset"], frm=o["seller"], to=investor, units=units, amount=pay,
                        memo=f"{buyer['short']} bought {units:,} fractions from {seller['short']} at {fmt_inr(o['price'])} ({o['id']})")
            self.save()
            return {
                "title": f"{buyer['short']} bought {units:,} fractions from {seller['short']}",
                "explain": (f"{fmt_inr(pay)} moved from {buyer['short']} to {seller['short']} and ownership moved the other way. "
                            f"{seller['short']} exited with a {'profit' if profit >= 0 else 'loss'} of {fmt_inr(abs(profit))}. "
                            f"The asset itself was never sold - only the fractions changed hands."),
            }

    def cancel_order(self, investor, order_id):
        with self.lock:
            o = self._order(order_id)
            if o["seller"] != investor:
                raise EngineError("Only the seller can cancel this listing")
            if o["status"] != "open":
                raise EngineError("That listing is no longer open")
            o["status"] = "cancelled"
            inv = self._investor(investor)
            self._block("CANCEL", asset=o["asset"], frm=investor, units=o["remaining"],
                        memo=f"{inv['short']} cancelled listing {o['id']}")
            self.save()
            return {"title": "Listing cancelled", "explain": f"{o['remaining']:,} fractions are back in {inv['short']}'s free balance."}

    def distribute(self, asset, amount_rupees, label=None):
        with self.lock:
            a = self._asset(asset)
            try:
                amount = int(round(float(amount_rupees) * 100))
            except (TypeError, ValueError):
                raise EngineError("Amount must be a number")
            if amount <= 0:
                raise EngineError("Amount must be above zero")
            total = a["total_units"]
            label = label or a["income_label"]
            rows = []
            paid = 0
            for iid, units in sorted(self.s["holdings"][asset].items(), key=lambda kv: -kv[1]):
                if units <= 0:
                    continue
                share = amount * units // total
                paid += share
                rows.append({"investor": iid, "units": units, "amount": share})
            leftover = amount - paid
            for r in rows:
                if r["investor"] == SPV:
                    r["amount"] += leftover
                    break
            else:
                rows.append({"investor": SPV, "units": 0, "amount": leftover})
            for r in rows:
                inv = self.s["investors"][r["investor"]]
                if r["investor"] != OTHERS:
                    inv["cash"] += r["amount"]
                self.s["income"].setdefault(r["investor"], {})
                self.s["income"][r["investor"]][asset] = self.s["income"][r["investor"]].get(asset, 0) + r["amount"]
            a["income_paid"] += amount
            per_unit = amount / total
            self._block("INCOME", asset=asset, frm=SPV, to="holders", units=total, amount=amount,
                        memo=f"{label} of {fmt_inr(amount)} shared pro-rata = {fmt_inr(round(per_unit))} per fraction")
            self.s["last_distribution"] = {"asset": asset, "amount": amount, "per_unit": per_unit, "label": label,
                                           "rows": rows, "ts": self.now()}
            self.save()
            named = [r for r in rows if r["investor"] not in SYSTEM_ACCOUNTS]
            top = ", ".join(f"{self.s['investors'][r['investor']]['short']} {fmt_inr(r['amount'])}" for r in named[:4])
            return {
                "title": f"{fmt_inr(amount)} {label.lower()} distributed",
                "explain": (f"Every fraction earned {fmt_inr(round(per_unit))}. Payout is proportional to fractions owned"
                            + (f": {top}." if top else ".")),
                "rows": rows,
            }

    def revalue(self, asset, pct):
        with self.lock:
            a = self._asset(asset)
            try:
                pct = float(pct)
            except (TypeError, ValueError):
                raise EngineError("Change must be a number")
            if not -50 <= pct <= 100 or pct == 0:
                raise EngineError("Choose a change between -50% and +100%")
            old = a["unit_price"]
            new = max(1, int(round(old * (1 + pct / 100))))
            a["unit_price"] = new
            a["valuation"] = new * a["total_units"]
            a["history"].append({"t": self.now(), "price": new})
            self._block("REVALUE", asset=asset, units=a["total_units"], amount=a["valuation"],
                        memo=f"Independent valuation {pct:+.1f}%: each fraction {fmt_inr(old)} \u2192 {fmt_inr(new)}")
            self.save()
            example = 50
            return {
                "title": f"{a['name']} revalued {pct:+.1f}%",
                "explain": (f"Asset value is now {fmt_inr(a['valuation'])}; each fraction moved from {fmt_inr(old)} to {fmt_inr(new)}. "
                            f"Someone holding {example} fractions {'gained' if new >= old else 'lost'} {fmt_inr(abs(new - old) * example)} on paper - "
                            f"every owner shares the change in proportion."),
            }

    def verify(self):
        with self.lock:
            prev = "0" * 64
            for b in self.s["ledger"]:
                if b["prev_hash"] != prev:
                    return {"valid": False, "checked": b["index"] + 1, "broken_at": b["index"],
                            "reason": "Link broken: prev_hash does not match the block before it"}
                if block_hash(b) != b["hash"]:
                    return {"valid": False, "checked": b["index"] + 1, "broken_at": b["index"],
                            "reason": "Contents changed after it was recorded: re-computed SHA-256 hash does not match"}
                prev = b["hash"]
            return {"valid": True, "checked": len(self.s["ledger"]), "broken_at": None,
                    "reason": "Every block's hash matches its contents and links to the previous block"}

    def tamper(self):
        with self.lock:
            if self.s.get("tamper_backup"):
                raise EngineError("A record is already tampered - restore it first")
            target = None
            for b in reversed(self.s["ledger"]):
                if b["type"] in ("INCOME", "PRIMARY_BUY", "SECONDARY_TRADE"):
                    target = b
                    break
            if not target:
                raise EngineError("Nothing to tamper with yet")
            self.s["tamper_backup"] = {"index": target["index"], "amount": target["amount"], "memo": target["memo"]}
            target["amount"] = target["amount"] * 10
            target["memo"] = target["memo"] + " [edited]"
            self.save()
            return {"title": f"Record #{target['index']} was secretly edited",
                    "explain": (f"Someone changed the amount from {fmt_inr(self.s['tamper_backup']['amount'])} to "
                                f"{fmt_inr(target['amount'])} without permission. Click Verify chain to catch it.")}

    def restore(self):
        with self.lock:
            bk = self.s.get("tamper_backup")
            if not bk:
                raise EngineError("Nothing to restore")
            b = self.s["ledger"][bk["index"]]
            b["amount"] = bk["amount"]
            b["memo"] = bk["memo"]
            self.s["tamper_backup"] = None
            self.save()
            return {"title": f"Record #{b['index']} restored", "explain": "The original record is back and the chain verifies again."}

    def view(self):
        with self.lock:
            s = self.s
            investors = s["investors"]
            assets_out = []
            for aid, a in s["assets"].items():
                h = s["holdings"][aid]
                holders = []
                for iid, units in sorted(h.items(), key=lambda kv: (kv[0] == SPV, -kv[1])):
                    if units <= 0:
                        continue
                    inv = investors[iid]
                    holders.append({"id": iid, "name": inv["name"], "short": inv["short"], "color": inv["color"],
                                    "kind": inv["kind"], "units": units, "pct": units * 100 / a["total_units"]})
                orders = [dict(o, seller_name=investors[o["seller"]]["short"]) for o in s["orders"]
                          if o["asset"] == aid and o["status"] == "open"]
                out = copy.deepcopy(a)
                out.update({
                    "sold_units": a["total_units"] - h.get(SPV, 0),
                    "holders": holders,
                    "orders": orders,
                    "monthly_income": int(a["valuation"] * a["yield_pct"] / 100 / 12),
                })
                assets_out.append(out)
            people = []
            for iid, inv in investors.items():
                rows = []
                inv_total = val_total = inc_total = 0
                for aid, a in s["assets"].items():
                    units = s["holdings"][aid].get(iid, 0)
                    income = s["income"].get(iid, {}).get(aid, 0)
                    cost = s["cost"].get(iid, {}).get(aid, 0)
                    if units <= 0 and income == 0:
                        continue
                    value = units * a["unit_price"]
                    rows.append({"asset": aid, "name": a["name"], "units": units,
                                 "free": units - self.locked_units(aid, iid),
                                 "pct": units * 100 / a["total_units"], "cost": cost,
                                 "value": value, "income": income})
                    inv_total += cost
                    val_total += value
                    inc_total += income
                people.append(dict(inv, holdings=rows, invested=inv_total, value=val_total, income=inc_total,
                                   gain=val_total + inc_total - inv_total, net_worth=inv["cash"] + val_total))
            stats = {
                "tokenized": sum(a["valuation"] for a in s["assets"].values()),
                "fractions_owned": sum(a["total_units"] - s["holdings"][a["id"]].get(SPV, 0) for a in s["assets"].values()),
                "income_paid": sum(a["income_paid"] for a in s["assets"].values()),
                "blocks": len(s["ledger"]),
                "assets": len(s["assets"]),
            }
            return {
                "assets": assets_out,
                "investors": people,
                "ledger": s["ledger"],
                "last_distribution": s["last_distribution"],
                "tampered": s.get("tamper_backup") is not None,
                "stats": stats,
            }
