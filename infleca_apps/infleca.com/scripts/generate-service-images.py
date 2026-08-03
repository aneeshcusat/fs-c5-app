#!/usr/bin/env python3
"""Generate professional architecture header images for service cards."""
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
    draw_node,
    finalize,
    make_canvas,
    save,
)

OUT = ROOT / "img" / "services"


def enterprise():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Enterprise ERP Hub", GOLD)
    draw_node(draw, img, 490, 175, "ERP Core", GOLD, 160, 54, "Finance · HR · Ops")
    for label, x, y, col in [
        ("Finance", 100, 120, EMERALD_LT),
        ("HR & Payroll", 980, 120, TEAL),
        ("Operations", 100, 280, EMERALD),
        ("CRM & Sales", 980, 280, GOLD_LT),
    ]:
        draw_node(draw, img, x, y, label, col, 128, 46)
        cx, cy = x + 64, y + 23
        tx = 490 if x < 490 else 650
        connect(draw, [(cx + (50 if x < 490 else -50), cy), (tx, 202)], col)
    draw_node(draw, img, 490, 300, "Reporting & BI", TEAL, 160, 46)
    connect(draw, [(570, 229), (570, 300)], GOLD)
    draw_db(draw, 820, 200, "Data Warehouse", EMERALD_LT, 108, 58)
    connect(draw, [(650, 202), (766, 200)], EMERALD_LT)
    return finalize(img)


def web():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Web Application Stack", EMERALD_LT)
    row = [
        (80, "CDN", GOLD_LT),
        (230, "Load Balancer", GOLD),
        (420, "Frontend", EMERALD_LT),
        (610, "API Layer", TEAL),
        (800, "Services", EMERALD),
        (980, "Cache", GOLD),
    ]
    for i, (x, label, col) in enumerate(row):
        w = 120 if i < 5 else 100
        draw_node(draw, img, x, 155, label, col, w, 48)
        if i < len(row) - 1:
            nx = row[i + 1][0]
            connect(draw, [(x + w, 179), (nx, 179)], col)
    draw_node(draw, img, 120, 290, "CI/CD", EMERALD, 110, 42)
    draw_node(draw, img, 280, 290, "SEO", TEAL, 100, 42)
    draw_node(draw, img, 420, 290, "A11y", GOLD, 100, 42)
    draw_db(draw, 820, 310, "PostgreSQL", EMERALD_LT, 108, 56)
    return finalize(img)


def ecommerce():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Commerce Architecture", GOLD)
    flow = [("Catalog", EMERALD_LT), ("Cart", TEAL), ("Checkout", EMERALD), ("Payment", GOLD), ("Fulfillment", GOLD_LT)]
    for i, (label, col) in enumerate(flow):
        x = 70 + i * 220
        draw_node(draw, img, x, 150, label, col, 118, 46)
        if i < len(flow) - 1:
            connect(draw, [(x + 118, 173), (x + 220, 173)], col)
    draw_node(draw, img, 180, 290, "Inventory", EMERALD_LT, 130, 44)
    draw_node(draw, img, 420, 290, "Pricing", GOLD, 120, 44)
    draw_node(draw, img, 640, 290, "Shipping", TEAL, 130, 44)
    draw_node(draw, img, 880, 290, "Analytics", EMERALD, 130, 44)
    return finalize(img)


def mobile():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Mobile Platform", TEAL)
    draw_node(draw, img, 90, 130, "iOS", EMERALD_LT, 110, 46)
    draw_node(draw, img, 90, 240, "Android", TEAL, 110, 46)
    draw_node(draw, img, 280, 175, "Mobile BFF", GOLD, 140, 52, "GraphQL")
    draw_node(draw, img, 490, 110, "Auth", EMERALD, 110, 44)
    draw_node(draw, img, 490, 195, "Push", GOLD_LT, 110, 44)
    draw_node(draw, img, 490, 280, "Analytics", TEAL, 120, 44)
    draw_node(draw, img, 680, 175, "Backend API", EMERALD_LT, 140, 52)
    draw_db(draw, 920, 175, "Database", EMERALD, 100, 56)
    connect(draw, [(200, 153), (280, 190)], EMERALD_LT)
    connect(draw, [(200, 263), (280, 210)], TEAL)
    connect(draw, [(420, 201), (490, 132)], GOLD)
    connect(draw, [(420, 205), (490, 217)], GOLD)
    connect(draw, [(420, 209), (490, 302)], GOLD)
    connect(draw, [(600, 132), (680, 190)], EMERALD)
    connect(draw, [(600, 217), (680, 195)], GOLD_LT)
    connect(draw, [(600, 302), (680, 200)], TEAL)
    connect(draw, [(820, 201), (870, 190)], EMERALD_LT)
    return finalize(img)


def cloud():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (48, 36, W - 48, H - 36), "Multi-Cloud Infrastructure", EMERALD_LT)
    draw_node(draw, img, 490, 95, "Load Balancer", GOLD, 160, 46)
    for label, x, col in [("AWS", 120, GOLD_LT), ("Azure", 490, TEAL), ("GCP", 860, EMERALD_LT)]:
        draw_node(draw, img, x, 190, label, col, 120, 48, "Region")
        connect(draw, [(570, 141), (x + 60, 190)], GOLD)
    draw_node(draw, img, 180, 310, "Kubernetes", EMERALD, 140, 44)
    draw_node(draw, img, 420, 310, "Observability", TEAL, 150, 44)
    draw_node(draw, img, 680, 310, "Security", GOLD, 130, 44)
    draw_node(draw, img, 900, 310, "IaC", EMERALD_LT, 110, 44)
    return finalize(img)


def transformation():
    img = make_canvas()
    draw = ImageDraw.Draw(img)
    draw_frame(draw, (60, 36, 560, H - 36), "Legacy", GOLD)
    draw_frame(draw, (620, 36, W - 48, H - 36), "Modern Platform", EMERALD_LT)
    for i, label in enumerate(["Manual Ops", "Data Silos", "Monolith"]):
        draw_node(draw, img, 120, 120 + i * 72, label, GOLD, 140, 44)
    for i, (label, col) in enumerate([("Automation", EMERALD_LT), ("Unified Data", TEAL), ("Cloud-Native", EMERALD), ("API-First", GOLD)]):
        draw_node(draw, img, 680, 110 + i * 68, label, col, 150, 44)
    connect(draw, [(560, 240), (620, 240)], EMERALD_LT)
    draw.text((565, 215), "MODERNIZE", fill=GOLD, font=FONT_BOLD)
    return finalize(img)


BUILDERS = {
    "enterprise-systems": enterprise,
    "web-development": web,
    "ecommerce": ecommerce,
    "mobile-development": mobile,
    "cloud-solutions": cloud,
    "digital-transformation": transformation,
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in BUILDERS.items():
        save(fn(), OUT / f"{name}.jpg")


if __name__ == "__main__":
    main()
