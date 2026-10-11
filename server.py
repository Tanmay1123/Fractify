import argparse
import json
import mimetypes
import socket
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from engine import EngineError, Platform

ROOT = Path(__file__).resolve().parent
STATIC = ROOT / "static"
STATE_FILE = ROOT / "data" / "state.json"
# None = stateless (hosted on Vercel, or --stateless): nothing is kept on the server, the browser stores the
# raw state and sends it back as "state" with every request. main() sets this for a normal local run.
platform = None
BAD_SAVE = "The demo data saved in this browser could not be read. Click reset (top right) to start again."

mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")

ACTIONS = {
    "/api/buy": lambda p, b: p.buy_primary(b.get("investor"), b.get("asset"), b.get("units")),
    "/api/list": lambda p, b: p.list_order(b.get("investor"), b.get("asset"), b.get("units"), b.get("price")),
    "/api/fill": lambda p, b: p.fill_order(b.get("investor"), b.get("order"), b.get("units")),
    "/api/cancel": lambda p, b: p.cancel_order(b.get("investor"), b.get("order")),
    "/api/distribute": lambda p, b: p.distribute(b.get("asset"), b.get("amount"), b.get("label")),
    "/api/revalue": lambda p, b: p.revalue(b.get("asset"), b.get("pct")),
    "/api/verify": lambda p, b: p.verify(),
    "/api/tamper": lambda p, b: p.tamper(),
    "/api/restore": lambda p, b: p.restore(),
}


def usable(state):
    return state if isinstance(state, dict) and set(Platform().s) <= set(state) else None


class Handler(BaseHTTPRequestHandler):
    server_version = "Fractify/1.0"

    def log_message(self, fmt, *args):
        pass

    def _send(self, code, body, ctype):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _json(self, code, data):
        self._send(code, json.dumps(data, ensure_ascii=False).encode("utf-8"), "application/json; charset=utf-8")

    def _route(self):
        # Vercel sends every /api/<name> call to api/index.py and passes <name> as ?action=<name>
        url = urlparse(self.path)
        name = parse_qs(url.query).get("action")
        return "/api/" + name[0] if name and url.path.startswith("/api/") else url.path

    def _state(self, state=None):
        if platform:
            return self._json(200, platform.view())
        try:
            p = Platform(state=usable(state))
            view = p.view()
        except (KeyError, TypeError, AttributeError, IndexError, ValueError):
            p = Platform()
            view = p.view()
        self._json(200, dict(view, save=p.s))

    def do_GET(self):
        path = self._route()
        if path == "/api/state":
            return self._state()
        if path == "/":
            path = "/index.html"
        target = (STATIC / path.lstrip("/")).resolve()
        if STATIC not in target.parents or not target.is_file():
            return self._send(404, b"Not found", "text/plain; charset=utf-8")
        ctype = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        if ctype.startswith("text/") or ctype in ("application/javascript", "image/svg+xml"):
            ctype += "; charset=utf-8"
        self._send(200, target.read_bytes(), ctype)

    def do_POST(self):
        path = self._route()
        length = int(self.headers.get("Content-Length") or 0)
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except ValueError:
            body = None
        if not isinstance(body, dict):
            return self._json(400, {"error": "Request body must be a JSON object"})
        if path == "/api/state":
            return self._state(body.get("state"))
        if path == "/api/reset":
            p = platform or Platform()
            if platform:
                p.reset()
            return self._reply(p, {"title": "Demo reset", "explain": "Back to the starting data."})
        action = ACTIONS.get(path)
        if not action:
            return self._json(404, {"error": "Unknown endpoint"})
        if platform:
            p = platform
        else:
            state = usable(body.get("state"))
            if body.get("state") is not None and state is None:
                return self._json(400, {"error": BAD_SAVE})
            p = Platform(state=state)
        try:
            result = action(p, body)
        except EngineError as e:
            return self._json(400, {"error": str(e)})
        except (KeyError, TypeError, AttributeError, IndexError, ValueError):
            if platform:
                raise
            return self._json(400, {"error": BAD_SAVE})
        self._reply(p, result)

    def _reply(self, p, result):
        out = {"result": result, "state": p.view()}
        if not platform:
            out["save"] = p.s
        self._json(200, out)


def free_port(start):
    for port in range(start, start + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise SystemExit("No free port found between %d and %d" % (start, start + 19))


def main():
    parser = argparse.ArgumentParser(description="Fractify - fractional ownership working model")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-browser", action="store_true")
    parser.add_argument("--reset", action="store_true", help="start from fresh demo data")
    parser.add_argument("--stateless", action="store_true",
                        help="keep the data in the browser instead of data/state.json, like the Vercel deployment")
    args = parser.parse_args()
    if not args.stateless:
        global platform
        platform = Platform(STATE_FILE)
        if args.reset:
            platform.reset()
    port = free_port(args.port)
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    url = f"http://127.0.0.1:{port}/"
    print("")
    print("  Fractify - fractional ownership working model")
    print(f"  Running at {url}")
    print("  Press Ctrl+C to stop.")
    print("")
    sys.stdout.flush()
    if not args.no_browser:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
