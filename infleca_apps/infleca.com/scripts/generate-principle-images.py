#!/usr/bin/env python3
"""Generate professional architecture header images for principle cards."""
import sys
from pathlib import Path

from PIL import ImageDraw

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from diagram_lib import (  # noqa: E402
    EMERALD,
    EMERALD_LT,
    FONT,
    FONT_BOLD,
    GOLD,
    GOLD_LT,
    TEAL,
    TEXT,
    TEXT_DIM,
    W,
    H,
    connect,
    draw_db,
    draw_frame,
    draw_layer_stack,
    draw_node,
    finalize,
    make_canvas,
    save,
)

OUT = ROOT / "img" / "principles"


def innovation():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Platform Architecture", EMERALD_LT)
    draw_node(draw, img, 90, 130, "Web", EMERALD_LT, 118, 48, "React / Next")
    draw_node(draw, img, 90, 230, "Mobile", TEAL, 118, 48, "iOS / Android")
    draw_node(draw, img, 280, 175, "API Gateway", GOLD, 148, 52, "REST / GraphQL")
    draw_node(draw, img, 490, 110, "Services", EMERALD, 130, 48)
    draw_node(draw, img, 490, 210, "Analytics", TEAL, 130, 48)
    draw_node(draw, img, 680, 160, "Data Layer", GOLD_LT, 138, 52)
    draw_db(draw, 900, 195, "PostgreSQL", EMERALD_LT, 100, 56)
    connect(draw, [(208, 154), (280, 195)], EMERALD_LT)
    connect(draw, [(208, 254), (280, 210)], TEAL)
    connect(draw, [(428, 199), (490, 134)], GOLD)
    connect(draw, [(428, 203), (490, 234)], GOLD)
    connect(draw, [(620, 134), (680, 178)], EMERALD)
    connect(draw, [(620, 234), (680, 190)], TEAL)
    connect(draw, [(818, 186), (850, 195)], GOLD_LT)
    return finalize(img)


def client_centric():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Client Engagement Model", GOLD)
    draw_node(draw, img, 520, 175, "Client Hub", GOLD, 150, 54, "Goals · Feedback")
    for label, x, y, col in [
        ("Discover", 100, 110, EMERALD_LT),
        ("Align", 100, 250, TEAL),
        ("Build", 320, 110, EMERALD),
        ("Launch", 320, 250, GOLD_LT),
        ("Support", 780, 110, TEAL),
        ("Outcomes", 780, 250, EMERALD_LT),
    ]:
        draw_node(draw, img, x, y, label, col, 120, 46)
        cx, cy = x + 60, y + 23
        connect(draw, [(cx + (40 if x < 520 else -40), cy), (520 if x < 520 else 670, 202)], col)
    return finalize(img)


def excellence():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Delivery Pipeline", EMERALD_LT)
    stages = [("Plan", EMERALD_LT), ("Build", EMERALD), ("Test", TEAL), ("Review", GOLD), ("Deploy", GOLD_LT)]
    for i, (label, col) in enumerate(stages):
        x = 80 + i * 215
        draw_node(draw, img, x, 160, label, col, 108, 46)
        if i < len(stages) - 1:
            connect(draw, [(x + 108, 183), (x + 215, 183)], col)
    draw.rounded_rectangle([100, 280, 560, 400], radius=10, outline=(*EMERALD, 80), width=1)
    draw.text((120, 298), "Quality Gates", fill=TEXT, font=FONT_BOLD)
    for i, gate in enumerate(["Code review", "Security scan", "Performance", "Release sign-off"]):
        draw.text((120, 330 + i * 18), f"  ✓  {gate}", fill=TEXT_DIM, font=FONT)
    draw_node(draw, img, 640, 280, "Metrics", TEAL, 120, 44)
    draw_node(draw, img, 800, 280, "Logs", GOLD, 120, 44)
    draw_node(draw, img, 640, 350, "Traces", EMERALD, 120, 44)
    draw_node(draw, img, 800, 350, "Alerts", EMERALD_LT, 120, 44)
    return finalize(img)


def partnership():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Engagement Roadmap", GOLD)
    draw.line([(90, 250), (W - 90, 250)], fill=(148, 176, 164, 120), width=2)
    for i, (title, sub, col) in enumerate([
        ("Discovery", "Workshops", EMERALD_LT),
        ("Design", "Architecture", TEAL),
        ("Build", "Sprints", EMERALD),
        ("Launch", "Go-live", GOLD),
        ("Support", "Evolve", GOLD_LT),
    ]):
        x = 90 + i * 220
        draw.ellipse([x + 44, 238, x + 64, 258], fill=col, outline=(226, 236, 232, 80))
        draw_node(draw, img, x, 130, title, col, 108, 48, sub)
        draw.line([(x + 54, 178), (x + 54, 238)], fill=(*col, 140), width=2)
        if i < 4:
            connect(draw, [(x + 108, 250), (x + 220, 250)], col)
    return finalize(img)


def solutions():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_layer_stack(draw, img, [
        ("Presentation", "Web · Mobile · Portals", EMERALD_LT, 70),
        ("Application", "APIs · Workflows · BFF", TEAL, 130),
        ("Domain", "Business Services", EMERALD, 190),
        ("Integration", "ERP · CRM · Payments", GOLD, 250),
        ("Data", "Database · Analytics · BI", GOLD_LT, 310),
    ])
    return finalize(img)


def experience():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Cross-Industry Experience", GOLD)
    from diagram_lib import FONT_BOLD, TEXT, TEXT_DIM

    draw.text((90, 95), "Delivery velocity", fill=TEXT, font=FONT_BOLD)
    ox, oy = 90, 360
    draw.line([(ox, oy), (520, oy)], fill=(148, 176, 164, 100), width=1)
    draw.line([(ox, oy), (ox, 140)], fill=(148, 176, 164, 100), width=1)
    pts = [320, 290, 250, 220, 190, 175, 150, 145]
    xs = [ox + 50 + i * 58 for i in range(len(pts))]
    for i in range(len(pts) - 1):
        draw.line([(xs[i], pts[i]), (xs[i + 1], pts[i + 1])], fill=EMERALD_LT, width=3)
    for x, y in zip(xs, pts):
        draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=GOLD)

    draw.text((620, 95), "Industry breadth", fill=TEXT, font=FONT_BOLD)
    base = 360
    for i, (label, bh, col) in enumerate([
        ("FinTech", 120, EMERALD_LT),
        ("Ops", 155, EMERALD),
        ("EdTech", 100, TEAL),
        ("AI", 170, GOLD),
        ("SaaS", 130, GOLD_LT),
    ]):
        x = 640 + i * 95
        draw.rounded_rectangle([x, base - bh, x + 60, base], radius=6, fill=(*col, 180), outline=(226, 236, 232, 60))
        draw.text((x + 6, base + 8), label, fill=TEXT_DIM, font=FONT)
    return finalize(img)


BUILDERS = {
    "innovation": innovation,
    "client-centric": client_centric,
    "excellence": excellence,
    "partnership": partnership,
    "solutions": solutions,
    "experience": experience,
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in BUILDERS.items():
        save(fn(), OUT / f"{name}.jpg")


if __name__ == "__main__":
    main()
