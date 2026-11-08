#!/bin/bash
# Meme tracker launcher (macOS) — starts a tiny local server and opens the page
cd "$(dirname "$0")"
( sleep 1; open "http://localhost:8765" ) &
python3 -m http.server 8765 2>/dev/null || echo "Server already running — the page should open anyway."
