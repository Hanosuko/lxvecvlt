#!/usr/bin/env python3
"""Round the corners of the favicon in place.

The browser paints the favicon in its own chrome, so CSS can't round it — the
rounded corners have to be baked into the image as transparency. We build a
rounded-rectangle alpha mask (supersampled for smooth edges) and apply it.

Usage: python3 scripts/round-favicon.py [radius_percent]
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
SRC = Path(__file__).resolve().parent.parent / "frontend" / "public" / "favicon.webp"
RADIUS_PCT = float(sys.argv[1]) if len(sys.argv) > 1 else 20.0
SS = 4

img = Image.open(SRC).convert("RGBA")
w, h = img.size
radius = round(min(w, h) * RADIUS_PCT / 100)
mask = Image.new("L", (w * SS, h * SS), 0)
ImageDraw.Draw(mask).rounded_rectangle(
    (0, 0, w * SS - 1, h * SS - 1), radius=radius * SS, fill=255
)
mask = mask.resize((w, h), Image.LANCZOS)
img.putalpha(mask)
img.save(SRC, "WEBP", lossless=True, quality=100)
print(f"Rounded {SRC.name}: {w}x{h}, radius {radius}px ({RADIUS_PCT}%)")
