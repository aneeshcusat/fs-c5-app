"""
Professional system-architecture diagram renderer for Infleca card headers.

Target display: ~360×140px (3-col grid) / ~160px tall service headers @2× retina.
Canvas: 1280×480 (~2.67:1) — matches card media aspect ratio.
"""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# Card-header aspect ratio (width : height ≈ 2.67 : 1)
W, H = 1280, 480

# Infleca luxury palette — rich but restrained
INK = (10, 18, 16)
BG_TOP = (14, 26, 22)
BG_BOT = (8, 16, 14)
PANEL = (22, 38, 33)
PANEL_HI = (30, 50, 44)
EMERALD = (5, 150, 105)
EMERALD_LT = (16, 185, 129)
GOLD = (196, 169, 98)
GOLD_LT = (212, 188, 122)
TEAL = (13, 148, 136)
SLATE = (100, 130, 120)
TEXT = (226, 236, 232)
TEXT_DIM = (148, 176, 164)
GRID = (40, 72, 62)


def load_fonts():
    pairs = [
        ("/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf"),
        ("/Library/Fonts/Arial Bold.ttf", "/Library/Fonts/Arial.ttf"),
        ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    for bold, reg in pairs:
        try:
            return (
                ImageFont.truetype(bold, 17),
                ImageFont.truetype(reg, 14),
                ImageFont.truetype(bold, 13),
            )
        except OSError:
            continue
    d = ImageFont.load_default()
    return d, d, d


FONT_BOLD, FONT, FONT_SM = load_fonts()


def _lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def _fill(color: tuple[int, int, int], alpha: int = 255):
    return (*color, alpha)


def _gradient(img: Image.Image, box, c1, c2, horizontal=False):
    x0, y0, x1, y1 = box
    w, h = max(1, x1 - x0), max(1, y1 - y0)
    layer = Image.new("RGBA", (w, h))
    g = ImageDraw.Draw(layer)
    n = w if horizontal else h
    for i in range(n):
        t = i / max(n - 1, 1)
        col = (_lerp(c1[0], c2[0], t), _lerp(c1[1], c2[1], t), _lerp(c1[2], c2[2], t), 255)
        if horizontal:
            g.line([(i, 0), (i, h)], fill=col)
        else:
            g.line([(0, i), (w, i)], fill=col)
    img.paste(layer, (x0, y0), layer)


def make_canvas() -> Image.Image:
    img = Image.new("RGBA", (W, H), _fill(BG_TOP))
    _gradient(img, (0, 0, W, H), BG_TOP, BG_BOT, horizontal=False)

    ambient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ad = ImageDraw.Draw(ambient)
    ad.ellipse([40, -80, 420, 300], fill=_fill(EMERALD, 22))
    ad.ellipse([880, 60, 1280, 460], fill=_fill(GOLD, 16))
    ad.ellipse([480, 200, 900, 520], fill=_fill(TEAL, 12))
    ambient = ambient.filter(ImageFilter.GaussianBlur(55))
    img = Image.alpha_composite(img, ambient)

    draw = ImageDraw.Draw(img)
    for x in range(0, W, 32):
        draw.line([(x, 0), (x, H)], fill=_fill(GRID, 28), width=1)
    for y in range(0, H, 32):
        draw.line([(0, y), (W, y)], fill=_fill(GRID, 28), width=1)
    return img


def draw_frame(draw: ImageDraw.ImageDraw, box, label: str, accent=EMERALD):
    x0, y0, x1, y1 = box
    draw.rounded_rectangle([x0, y0, x1, y1], radius=12, outline=_fill(accent, 90), width=1)
    draw.rounded_rectangle([x0 + 1, y0 + 1, x1 - 1, y0 + 24], radius=11, fill=_fill(accent, 28))
    draw.text((x0 + 14, y0 + 5), label.upper(), fill=_fill(accent, 200), font=FONT_SM)


def draw_node(
    draw: ImageDraw.ImageDraw,
    img: Image.Image,
    x: int,
    y: int,
    label: str,
    accent=EMERALD,
    w: int = 140,
    h: int = 52,
    sub: str | None = None,
):
    shadow = Image.new("RGBA", (w + 24, h + 24), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([12, 12, 12 + w, 12 + h], radius=10, fill=_fill(INK, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (x - 12, y - 6), shadow)

    d = ImageDraw.Draw(img)
    d.rounded_rectangle([x, y, x + w, y + h], radius=10, fill=_fill(PANEL), outline=_fill(accent, 100), width=1)
    d.rounded_rectangle([x, y, x + w, y + 4], radius=10, fill=_fill(accent, 220))
    ty = y + 14 if sub else y + 17
    d.text((x + 12, ty), label, fill=_fill(TEXT), font=FONT_BOLD)
    if sub:
        d.text((x + 12, y + 30), sub, fill=_fill(TEXT_DIM), font=FONT_SM)


def draw_db(draw: ImageDraw.ImageDraw, cx: int, cy: int, label: str, accent=TEAL, w: int = 96, h: int = 58):
    x, y = cx - w // 2, cy - h // 2
    draw.ellipse([x, y, x + w, y + 14], fill=_fill(PANEL), outline=_fill(accent, 120), width=1)
    draw.rectangle([x, y + 7, x + w, y + h - 7], fill=_fill(PANEL))
    draw.line([(x, y + 7), (x + w, y + 7)], fill=_fill(accent, 180), width=2)
    draw.ellipse([x, y + h - 14, x + w, y + h], fill=_fill(PANEL), outline=_fill(accent, 120), width=1)
    draw.text((x + 10, cy - 7), label, fill=_fill(TEXT), font=FONT_SM)


def draw_line(draw: ImageDraw.ImageDraw, start, end, accent=EMERALD, width=2):
    draw.line([start, end], fill=_fill(accent, 50), width=width + 3)
    draw.line([start, end], fill=_fill(accent, 180), width=width)
    ax, ay = end
    ang = math.atan2(ay - start[1], ax - start[0])
    s = 9
    p1 = (ax - s * math.cos(ang - 0.4), ay - s * math.sin(ang - 0.4))
    p2 = (ax - s * math.cos(ang + 0.4), ay - s * math.sin(ang + 0.4))
    draw.polygon([end, p1, p2], fill=_fill(accent, 200))


def connect(draw, pts, accent=EMERALD):
    for i in range(len(pts) - 1):
        draw_line(draw, pts[i], pts[i + 1], accent)


def draw_layer_stack(draw, img: Image.Image, layers: list[tuple[str, str, tuple[int, int, int], int]]):
    """Horizontal layer bars — ideal for banner aspect ratio."""
    for title, sub, accent, y in layers:
        x0, x1 = 80, W - 80
        draw.rounded_rectangle([x0, y, x1, y + 44], radius=8, fill=_fill(PANEL), outline=_fill(accent, 70), width=1)
        draw.rounded_rectangle([x0, y, x0 + 6, y + 44], radius=8, fill=_fill(accent, 200))
        draw.text((x0 + 20, y + 8), title, fill=_fill(TEXT), font=FONT_BOLD)
        draw.text((x0 + 20, y + 26), sub, fill=_fill(TEXT_DIM), font=FONT_SM)
        if y < layers[-1][3]:
            draw_line(draw, (W // 2, y + 44), (W // 2, y + 52), accent, width=2)


def finalize(img: Image.Image) -> Image.Image:
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(H):
        t = max(0.0, (y - H * 0.55) / (H * 0.45))
        sd.line([(0, y), (W, y)], fill=_fill(INK, int(90 * t)))
    img = Image.alpha_composite(img, scrim)
    out = img.convert("RGB")
    # Downscale slightly with LANCZOS for crisp edges at display size
    return out.resize((1200, 450), Image.Resampling.LANCZOS)


def save(img: Image.Image, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=95, optimize=True, subsampling=0)
    print(f"Wrote {path}")
