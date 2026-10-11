# Vercel entry point: every /api/* request is rewritten here (see vercel.json).
# Runs server.Handler in stateless mode - Vercel functions have no disk or memory that survives between requests.
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from server import Handler  # noqa: E402


class handler(Handler):
    pass
