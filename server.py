import argparse
import json
import mimetypes
import socket
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from engine import EngineError, Platform

ROOT = Path(__file__).resolve().parent
STATIC = ROOT / "static"
platform = Platform(ROOT / "data" / "state.json")

mimetypes.add_type("font/woff", ".woff")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")

ACTIONS = {
    "/api/buy": lambda b: platform.buy_primary(b.get("investor"), b.get("asset"), b.get("units")),
    "/api/list": lambda b: platform.list_order(b.get("investor"), b.get("asset"), b.get("units"), b.get("price")),
    "/api/fill": lambda b: platform.fill_order(b.get("investor"), b.get("order"), b.get("units")),
    "/api/cancel": lambda b: platform.cancel_order(b.get("investor"), b.get("order")),
    "/api/distribute": lambda b: platform.distribute(b.get("asset"), b.get("amount"), b.get("label")),
    "/api/revalue": lambda b: platform.revalue(b.get("asset"), b.get("pct")),
    "/api/verify": lambda b: platform.verify(),
    "/api/tamper": lambda b: platform.tamper(),
    "/api/restore": lambda b: platform.restore(),
}


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

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/state":
            return self._json(200, platform.view())
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
        path = urlparse(self.path).path
        length = int(self.headers.get("Content-Length") or 0)
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except ValueError:
            return self._json(400, {"error": "Request body must be JSON"})
        if path == "/api/reset":
            platform.reset()
            return self._json(200, {"result": {"title": "Demo reset", "explain": "Back to the starting data."},
                                    "state": platform.view()})
        action = ACTIONS.get(path)
        if not action:
            return self._json(404, {"error": "Unknown endpoint"})
        try:
            result = action(body)
        except EngineError as e:
            return self._json(400, {"error": str(e)})
        return self._json(200, {"result": result, "state": platform.view()})


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
    args = parser.parse_args()
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
