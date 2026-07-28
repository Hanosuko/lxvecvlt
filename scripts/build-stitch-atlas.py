#!/usr/bin/env python3
"""
Build the 9-slice stitched-border atlas used by the `.stitch` CSS class
(border-image). Combines two source pieces into one tileable frame:

    frontend/public/{prefix}stitch-corner.webp    -> the four rounded corners
    frontend/public/{prefix}stitch-straight.webp  -> the tiled edges

Output:
    frontend/public/{prefix}stitch-border.webp    (slice = 260, `border-image ... round`)

Run from the repo root:
    python3 scripts/build-stitch-atlas.py            # black (default)
    python3 scripts/build-stitch-atlas.py orange_    # orange hover variant

Requires Pillow (`pip install pillow`).
"""
import sys

from PIL import Image

PUB = "frontend/public"
S = 260


def is_thread(p):
    return p[3] > 80


def build(prefix=""):
    corner = Image.open(f"{PUB}/{prefix}stitch-corner.webp").convert("RGBA")
    straight = Image.open(f"{PUB}/{prefix}stitch-straight.webp").convert("RGBA")
    w, h = straight.size
    col_ink = [sum(1 for y in range(h) if is_thread(straight.getpixel((x, y)))) for x in range(w)]
    thr = max(col_ink) * 0.6
    marks = [x for x in range(w) if col_ink[x] > thr]
    groups, cur = [], [marks[0]]
    for x in marks[1:]:
        (cur.append(x) if x - cur[-1] <= 4 else (groups.append(sum(cur) // len(cur)), cur.clear(), cur.append(x)))
    groups.append(sum(cur) // len(cur))
    period = round((groups[-1] - groups[0]) / (len(groups) - 1))
    tl = corner.crop((0, 0, S, S))
    tr = tl.transpose(Image.FLIP_LEFT_RIGHT)
    bl = tl.transpose(Image.FLIP_TOP_BOTTOM)
    br = tl.transpose(Image.ROTATE_180)
    start = groups[1] - period // 2
    tile_w = 2 * period
    htile = straight.crop((start, 0, start + tile_w, h)).resize((tile_w, S), Image.LANCZOS)
    vtile = htile.rotate(90, expand=True)
    
    aw, ah = S + tile_w + S, S + tile_w + S
    atlas = Image.new("RGBA", (aw, ah), (0, 0, 0, 0))
    atlas.alpha_composite(tl, (0, 0))
    atlas.alpha_composite(tr, (S + tile_w, 0))
    atlas.alpha_composite(bl, (0, S + tile_w))
    atlas.alpha_composite(br, (S + tile_w, S + tile_w))
    atlas.alpha_composite(htile, (S, 0))
    atlas.alpha_composite(htile, (S, S + tile_w))
    atlas.alpha_composite(vtile, (0, S))
    atlas.alpha_composite(vtile, (S + tile_w, S))

    out = f"{PUB}/{prefix}stitch-border.webp"
    atlas.save(out)
    print(f"wrote {out} ({aw}x{ah}, slice={S})")


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "")
