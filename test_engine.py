import unittest

from engine import SPV, EngineError, Platform, fmt_inr


class EngineTests(unittest.TestCase):
    def setUp(self):
        self.p = Platform()

    def test_indian_currency_format(self):
        self.assertEqual(fmt_inr(10_00_000 * 100), "₹10,00,000")
        self.assertEqual(fmt_inr(1_00_00_000 * 100), "₹1,00,00,000")
        self.assertEqual(fmt_inr(6050), "₹60.50")

    def test_seed_ledger_is_valid(self):
        self.assertTrue(self.p.verify()["valid"])

    def test_units_always_add_up(self):
        for aid, a in self.p.s["assets"].items():
            self.assertEqual(sum(self.p.s["holdings"][aid].values()), a["total_units"])

    def test_primary_buy_moves_cash_and_units(self):
        cash = self.p.s["investors"]["atharva"]["cash"]
        spv = self.p.units_of("villa", SPV)
        self.p.buy_primary("atharva", "villa", 50)
        self.assertEqual(self.p.units_of("villa", "atharva"), 50)
        self.assertEqual(self.p.units_of("villa", SPV), spv - 50)
        self.assertEqual(self.p.s["investors"]["atharva"]["cash"], cash - 50 * 10_000 * 100)

    def test_cannot_overspend_or_oversell(self):
        with self.assertRaises(EngineError):
            self.p.buy_primary("atharva", "villa", 101)
        with self.assertRaises(EngineError):
            self.p.list_order("atharva", "villa", 1, 10_000)

    def test_income_split_is_pro_rata_and_exact(self):
        self.p.buy_primary("atharva", "villa", 50)
        before = self.p.s["investors"]["atharva"]["cash"]
        res = self.p.distribute("villa", 60_000)
        self.assertEqual(sum(r["amount"] for r in res["rows"]), 60_000 * 100)
        self.assertEqual(self.p.s["investors"]["atharva"]["cash"] - before, 3_000 * 100)

    def test_revalue_changes_everyones_value(self):
        self.p.buy_primary("atharva", "villa", 50)
        self.p.revalue("villa", 5)
        self.assertEqual(self.p.s["assets"]["villa"]["unit_price"], 10_500 * 100)

    def test_secondary_trade(self):
        order = next(o for o in self.p.s["orders"] if o["status"] == "open")
        seller = order["seller"]
        s_units = self.p.units_of("villa", seller)
        self.p.fill_order("tanmay", order["id"])
        self.assertEqual(self.p.units_of("villa", seller), s_units - order["units"])
        self.assertEqual(order["status"], "filled")
        self.assertTrue(self.p.verify()["valid"])

    def test_tamper_is_detected_and_restorable(self):
        self.p.buy_primary("atharva", "villa", 5)
        self.p.tamper()
        v = self.p.verify()
        self.assertFalse(v["valid"])
        self.assertEqual(v["broken_at"], len(self.p.s["ledger"]) - 1)
        self.p.restore()
        self.assertTrue(self.p.verify()["valid"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
