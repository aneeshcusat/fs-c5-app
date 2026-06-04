#!/usr/bin/env python3
"""Generate tracopus.com marketing site HTML pages."""
import json
import os
import re

from _pages_content import (
    AUDIENCE_TAGS,
    BENEFITS,
    COLLABORATION_CARDS,
    DEMO_FORM,
    ENTERPRISE_TRUST,
    FAQ_ITEMS,
    FEATURE_BLOCKS,
    FOOTER_COLS,
    HERO_CARDS,
    LIFECYCLE_STEPS,
    MODULES,
    NAV,
    PAGE_FAQ,
    PAGE_META,
    PAGE_SECTIONS,
    PERSONAS,
    PLATFORM_CAPABILITIES,
    RESOURCES,
    SECTION_COPY,
    SITE,
    STATS,
    TIMELINE,
    USE_CASES,
    VALUE_PROPS,
    WORKFLOW_SCENARIOS,
)

from _screenshots import PAGE_SCREENSHOTS, SCREENSHOTS

ROOT = os.path.dirname(os.path.abspath(__file__))
SCREENSHOTS_DIR = os.path.join(ROOT, "images", "screenshots")
ASSET_V = "20260605i"


def is_demo_path(path):
    p = str(path or "").split("#")[0].split("?")[0]
    return p == "demo.html" or p.endswith("/demo.html")


def demo_trigger_link(label, btn_class=""):
    cls = "demo-request-trigger"
    if btn_class:
        cls = f"{btn_class} {cls}"
    return f'<a href="#" class="{cls}">{esc(label)}</a>'


def link_target_attrs(path):
    p = str(path or "")
    if "documentation/" in p or p.startswith("http"):
        return ' target="_blank" rel="noopener noreferrer"'
    return ""


def esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def depth_for(path):
    return path.count("/")


def asset(depth, path):
    prefix = "../" * depth
    return f"{prefix}{path}?v={ASSET_V}"


def logo_light_src(depth):
    return asset(depth, "../assets/images/custom/tracopuslogo2.png")


def logo_dark_src(depth):
    return asset(depth, "../assets/images/custom/tracopuslogo.png")


def logo_img(depth, width, height=36):
    light = logo_light_src(depth)
    dark = logo_dark_src(depth)
    return (
        f'<img class="site-logo" src="{light}" '
        f'data-logo-light="{light}" data-logo-dark="{dark}" '
        f'alt="{esc(SITE["name"])}" width="{width}" height="{height}">'
    )


def brand_block(depth, home, logo_width=132):
    tagline = SITE.get("brand_tagline", "Enterprise Work Intelligence")
    return f"""<a class="brand" href="{home}">
        <span class="brand__block">
          <span class="brand__logo">{logo_img(depth, logo_width)}</span>
          <span class="brand__wordmark-footer">
            <span class="brand__rule" aria-hidden="true"></span>
            <span class="brand__tagline">{esc(tagline)}</span>
          </span>
        </span>
      </a>"""


def logo_src(depth):
    return logo_light_src(depth)


def href(depth, path):
    if path.startswith("http") or path.startswith("/"):
        return path
    if path.startswith("../"):
        return ("../" * (depth + 1)) + path[3:]
    return ("../" * depth) + path


def resolve_screenshot_file(filename):
    stem = os.path.splitext(filename)[0]
    for name in (filename, f"{stem}.webp", f"{stem}.png", f"{stem}.jpg", f"{stem}.jpeg"):
        path = os.path.join(SCREENSHOTS_DIR, name)
        if os.path.isfile(path):
            return name
    return None


def screenshot_public_src(depth, shot_key):
    meta = SCREENSHOTS[shot_key]
    found = resolve_screenshot_file(meta["filename"])
    if found:
        return asset(depth, f"images/screenshots/{found}")
    placeholder = f"{os.path.splitext(meta['filename'])[0]}-placeholder.svg"
    return asset(depth, f"images/screenshots/{placeholder}")


def screenshot_is_placeholder(shot_key):
    meta = SCREENSHOTS[shot_key]
    return resolve_screenshot_file(meta["filename"]) is None


def write_screenshot_placeholders():
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    for shot_key, meta in SCREENSHOTS.items():
        if resolve_screenshot_file(meta["filename"]):
            continue
        stem = os.path.splitext(meta["filename"])[0]
        svg_path = os.path.join(SCREENSHOTS_DIR, f"{stem}-placeholder.svg")
        if os.path.isfile(svg_path):
            continue
        is_phone = meta.get("frame") == "phone"
        w, h = (390, 844) if is_phone else (1280, 800)
        title = esc(meta["title"])
        fname = esc(meta["filename"])
        hint = esc(meta["capture"])
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{title} placeholder">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5"/>
      <stop offset="45%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#d1fae5"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect width="{w}" height="{h}" fill="url(#shine)"/>
  <rect x="24" y="24" width="{w - 48}" height="{h - 48}" rx="18" fill="#ffffff" fill-opacity="0.72" stroke="#059669" stroke-opacity="0.18"/>
  <text x="{w/2}" y="{h/2 - 36}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#047857">{title}</text>
  <text x="{w/2}" y="{h/2 + 4}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="#475569">{fname}</text>
  <text x="{w/2}" y="{h/2 + 34}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#64748b">{hint}</text>
  <text x="{w/2}" y="{h - 40}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#94a3b8">Drop screenshot in public/tracopus.com/images/screenshots/</text>
</svg>"""
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg)


def render_screenshot_frame(depth, shot_key, extra_class=""):
    meta = SCREENSHOTS[shot_key]
    frame = meta.get("frame", "browser")
    src = screenshot_public_src(depth, shot_key)
    placeholder = screenshot_is_placeholder(shot_key)
    cls = f"screenshot-frame screenshot-frame--{frame}"
    if placeholder:
        cls += " screenshot-frame--placeholder"
    if extra_class:
        cls += f" {extra_class}"
    cap = ""
    if meta.get("caption"):
        cap = f'<figcaption class="screenshot-frame__caption">{esc(meta["caption"])}</figcaption>'
    badge = ""
    if placeholder:
        badge = f'<span class="screenshot-frame__badge">Placeholder · {esc(meta["filename"])}</span>'
    return f"""<figure class="{cls}">
      {badge}
      <div class="screenshot-frame__chrome" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="screenshot-frame__viewport">
        <img src="{src}" alt="{esc(meta['alt'])}" loading="lazy" width="1280" height="800">
      </div>
      {cap}
    </figure>"""


def render_screenshot_showcase(depth, config, reverse=False):
    shot_key = config["shot"]
    bullets = ""
    if config.get("bullets"):
        items = "".join(f"<li>{esc(b)}</li>" for b in config["bullets"])
        bullets = f'<ul class="check-list">{items}</ul>'
    link = ""
    if config.get("link"):
        p, label = config["link"]
        link_attrs = link_target_attrs(p)
        link = f'<a class="text-link" href="{href(depth, p)}"{link_attrs}>{esc(label)} →</a>'
    copy = f"""<div class="screenshot-showcase__copy reveal">
        <p class="eyebrow">{esc(config.get('eyebrow', 'Preview'))}</p>
        <h2>{esc(config['heading'])}</h2>
        <p>{esc(config['lead'])}</p>
        {bullets}
        {link}
      </div>"""
    visual = f"""<div class="screenshot-showcase__visual reveal reveal--delay-1">
        {render_screenshot_frame(depth, shot_key)}
      </div>"""
    grid = f"{visual}{copy}" if reverse else f"{copy}{visual}"
    return f"""
<section class="section section--screenshot">
  <div class="container">
    <div class="screenshot-showcase">{grid}
    </div>
  </div>
</section>"""


def render_screenshot_gallery(depth, shot_keys):
    cards = "".join(
        f"""<div class="screenshot-gallery__item reveal">
          {render_screenshot_frame(depth, key, "screenshot-frame--compact")}
          <h3>{esc(SCREENSHOTS[key]['title'])}</h3>
        </div>"""
        for key in shot_keys
    )
    return f"""
<section class="section section--alt section--screenshot-gallery">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">Across the platform</p>
      <h2>Every module, same connected workspace.</h2>
      <p class="section-lead">Replace the placeholder images below with product captures — filenames are labelled on each frame until you drop the real file in.</p>
    </div>
    <div class="screenshot-gallery">{cards}
    </div>
  </div>
</section>"""


def render_page_screenshots(depth, key, part="all"):
    cfg = PAGE_SCREENSHOTS.get(key)
    if not cfg:
        return ""
    parts = []
    if part in ("all", "showcase") and cfg.get("showcase"):
        parts.append(render_screenshot_showcase(depth, cfg["showcase"]))
    if part in ("all", "inline") and cfg.get("inline"):
        inline = cfg["inline"]
        parts.append(
            render_screenshot_showcase(depth, inline, reverse=inline.get("reverse", False))
        )
    if part in ("all", "gallery") and cfg.get("gallery"):
        parts.append(render_screenshot_gallery(depth, cfg["gallery"]))
    if part in ("all", "secondary") and cfg.get("secondary"):
        sec = cfg["secondary"]
        parts.append(f"""
<section class="section section--alt">
  <div class="container container--narrow">
    <div class="screenshot-stack reveal">
      {render_screenshot_frame(depth, sec)}
    </div>
  </div>
</section>""")
    return "\n".join(parts)


def active_nav(path, item_href):
    if not item_href:
        return False
    clean = item_href.split("#")[0]
    return clean == path or clean.endswith("/" + path.split("/")[-1])


def render_nav(depth, current_path):
    items = []
    for entry in NAV:
        if "children" in entry:
            links = "".join(
                f'<a class="nav-mega__link" href="{href(depth, c[0])}">'
                f'<strong>{esc(c[1])}</strong><span>{esc(c[2])}</span></a>'
                for c in entry["children"]
            )
            items.append(
                f'<li class="nav-item nav-item--mega">'
                f'<button type="button" class="nav-link nav-link--toggle" aria-expanded="false">{esc(entry["label"])} ▾</button>'
                f'<div class="nav-mega">{links}</div></li>'
            )
        else:
            cls = " active" if active_nav(current_path, entry["href"]) else ""
            items.append(
                f'<li class="nav-item"><a class="nav-link{cls}" href="{href(depth, entry["href"])}">{esc(entry["label"])}</a></li>'
            )
    return "\n      ".join(items)


def render_footer(depth):
    cols = []
    for title, links in FOOTER_COLS:
        lis = "".join(
            (
                f"<li>{demo_trigger_link(l)}</li>"
                if is_demo_path(p)
                else f'<li><a href="{href(depth, p)}"{link_target_attrs(p)}>{esc(l)}</a></li>'
            )
            for p, l in links
        )
        cols.append(f'<div class="footer-col"><h4>{esc(title)}</h4><ul>{lis}</ul></div>')
    return "\n    ".join(cols)


COLLAB_ICONS = ["💬", "📁", "📝", "📅", "📜", "⭐", "🔍"]


def page_title_plain(key):
    title = PAGE_META[key]["title"]
    return title.split("—")[0].split("|")[0].strip()


def hero_cards_markup():
    return "".join(
        f'<article class="hero-card reveal"><span class="hero-card__icon" aria-hidden="true">✦</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in HERO_CARDS
    )


def render_hero_chips(depth):
    chips = "".join(
        f'<a class="hero-chip" href="{href(depth, p)}">'
        f'<span class="hero-chip__icon" aria-hidden="true">{icon}</span>{esc(title)}</a>'
        for p, icon, title, _, _ in MODULES[:6]
    )
    return f'<div class="hero-chips reveal reveal--delay-3" aria-label="Core modules">{chips}</div>'


def render_hero(meta, page_key, depth):
    ctas = ""
    if page_key == "index":
        p, t = meta.get("hero_cta_primary", ("demo.html", "Request a demo"))
        s, st = meta.get("hero_cta_secondary", ("platform.html", "Explore"))
        ctas = f"""
      <div class="hero-cta reveal reveal--delay-2">
        <a class="btn btn--primary btn--glow demo-request-trigger" href="#">{esc(t)}</a>
        <a class="btn btn--ghost" href="{href(depth, s)}">{esc(st)}</a>
      </div>"""
    elif page_key != "contact" and page_key != "demo":
        ctas = f"""
      <div class="hero-cta reveal reveal--delay-2">
        <a class="btn btn--primary btn--glow demo-request-trigger" href="#">Request a Demo</a>
        <a class="btn btn--ghost" href="{href(depth, '../documentation/index.html')}"{link_target_attrs('../documentation/index.html')}>View documentation</a>
      </div>"""
    hero_mod = "page-hero--home" if page_key == "index" else "page-hero--sub"
    crumb = ""
    if page_key != "index":
        home = href(depth, "index.html")
        label = esc(page_title_plain(page_key))
        crumb = f"""
      <nav class="breadcrumb reveal" aria-label="Breadcrumb">
        <a href="{home}">Home</a><span class="breadcrumb__sep">/</span><span aria-current="page">{label}</span>
      </nav>"""
    copy = f"""
      <p class="eyebrow reveal">{esc(meta.get("hero_eyebrow", ""))}</p>
      <h1 class="page-hero__title reveal reveal--delay-1">{meta.get("hero_title", meta["title"])}</h1>
      <p class="page-hero__lead reveal reveal--delay-2">{esc(meta.get("hero_lead", meta["desc"]))}</p>{ctas}"""
    if page_key == "index":
        copy += render_hero_chips(depth)
        inner = f"""{crumb}
      <div class="page-hero__grid">
        <div class="page-hero__copy">{copy}
        </div>
        <div class="page-hero__aside reveal reveal--delay-2">
          <div class="hero-panel">
            <p class="hero-panel__eyebrow">At a glance</p>
            <div class="hero-card-grid hero-card-grid--hero">{hero_cards_markup()}</div>
          </div>
        </div>
      </div>"""
    else:
        inner = f"""{crumb}
      <div class="page-hero__well">
        <div class="page-hero__copy">{copy}
        </div>
      </div>"""
    return f"""
  <section class="page-hero {hero_mod}">
    <div class="hero-mesh" aria-hidden="true"></div>
    <div class="hero-orbs" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="container page-hero__inner">{inner}
    </div>
  </section>"""


def render_hero_cards():
    return f"""
<section class="section section--hero-cards">
  <div class="container">
    <div class="hero-card-grid">{hero_cards_markup()}</div>
  </div>
</section>"""


def render_stats():
    return render_hero_cards()


def render_modules(depth):
    copy = SECTION_COPY.get("platform", {})
    cards = "".join(
        f'<a class="module-card reveal" href="{href(depth, p)}"><span class="module-card__icon">{i}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p><ul>{"".join(f"<li>{esc(f)}</li>" for f in feats)}</ul>'
        f'<span class="module-card__arrow">Explore →</span></a>'
        for p, i, t, d, feats in MODULES
    )
    return f"""
<section class="section section--spacious">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", "Modules"))}</p><h2>{esc(copy.get("heading", "Core modules"))}</h2>
    <p class="section-lead">{esc(copy.get("description", ""))}</p></div>
    <div class="module-grid">{cards}</div>
  </div>
</section>"""


def render_platform_capabilities(depth):
    copy = SECTION_COPY.get("platform", {})
    cards = "".join(
        f'<a class="feature-card reveal" href="{href(depth, link)}"><span class="feature-card__icon">{i}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></a>'
        for i, t, d, link in PLATFORM_CAPABILITIES
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", "Platform"))}</p><h2>{esc(copy.get("heading", "Platform capabilities"))}</h2>
    <p class="section-lead">{esc(copy.get("description", ""))}</p></div>
    <div class="feature-grid feature-grid--3">{cards}</div>
  </div>
</section>"""


def render_collaboration():
    copy = SECTION_COPY.get("collaboration", {})
    cards = "".join(
        f'<article class="feature-card reveal"><span class="feature-card__icon">{icon}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for icon, (t, d) in zip(COLLAB_ICONS, COLLABORATION_CARDS)
    )
    return f"""
<section class="section">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2>
    <p class="section-lead">{esc(copy.get("description", ""))}</p></div>
    <div class="feature-grid feature-grid--auto">{cards}</div>
  </div>
</section>"""


def render_enterprise_trust():
    copy = SECTION_COPY.get("enterprise", {})
    cards = "".join(
        f'<article class="value-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in ENTERPRISE_TRUST
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2>
    <p class="section-lead">{esc(copy.get("description", ""))}</p></div>
    <div class="value-grid">{cards}</div>
  </div>
</section>"""


def render_lifecycle():
    copy = SECTION_COPY.get("lifecycle", {})
    items = "".join(
        f'<li class="timeline__item reveal"><span class="timeline__when">Step {esc(w)}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></li>'
        for w, t, d in LIFECYCLE_STEPS
    )
    return f"""
<section class="section section--spacious">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2></div>
    <ol class="timeline timeline--grid">{items}</ol>
  </div>
</section>"""


def render_personas():
    copy = SECTION_COPY.get("personas", {})
    cards = "".join(
        f'<article class="audience-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in PERSONAS
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2></div>
    <div class="audience-grid">{cards}</div>
  </div>
</section>"""


def render_use_cases():
    copy = SECTION_COPY.get("use_cases", {})
    cards = "".join(
        f'<article class="case-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in USE_CASES
    )
    return f"""
<section class="section">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2></div>
    <div class="case-grid">{cards}</div>
  </div>
</section>"""


def render_benefits():
    copy = SECTION_COPY.get("benefits", {})
    cards = "".join(
        f'<article class="pain-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in BENEFITS
    )
    return f"""
<section class="section section--spacious section--alt">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", ""))}</p><h2>{esc(copy.get("heading", ""))}</h2></div>
    <div class="pain-grid pain-grid--3">{cards}</div>
  </div>
</section>"""


def render_home_faq(depth):
    items = "".join(
        f'<details class="faq-item reveal"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>'
        for q, a in FAQ_ITEMS[:6]
    )
    return f"""
<section class="section">
  <div class="container container--narrow">
    <div class="section-head reveal"><p class="eyebrow">FAQ</p><h2>Common questions</h2></div>
    <div class="faq-list">{items}</div>
    <p class="faq-more reveal"><a href="{href(depth, "faq.html")}">View all FAQ →</a></p>
  </div>
</section>"""


def render_features(key):
    blocks = FEATURE_BLOCKS.get(key, FEATURE_BLOCKS.get("platform", []))
    meta = PAGE_META.get(key, {})
    n = len(blocks)
    grid_mod = "feature-grid--4" if n >= 8 else "feature-grid--3" if n >= 6 else "feature-grid--auto"
    cards = "".join(
        f'<article class="feature-card reveal"><span class="feature-card__icon">{i}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for i, t, d in blocks
    )
    return f"""
<section class="section section--spacious section--alt">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">{esc(meta.get("hero_eyebrow", "Capabilities"))}</p>
      <h2>Key capabilities</h2>
      <p class="section-lead">Everything you need to run this function inside the connected Tracopus workspace.</p>
    </div>
    <div class="feature-grid {grid_mod}">{cards}</div>
  </div>
</section>"""


def render_lead_band(key):
    if key == "index":
        return ""
    sec = PAGE_SECTIONS.get(key, {})
    intro = sec.get("intro", "")
    if not intro:
        return ""
    return f"""
<section class="page-lead-band">
  <div class="container">
    <p class="page-lead-band__text reveal">{esc(intro)}</p>
  </div>
</section>"""


def render_page_intro(key):
    return render_lead_band(key)


def render_outcomes_strip(key):
    outcomes = PAGE_SECTIONS.get(key, {}).get("outcomes", [])
    if not outcomes:
        return ""
    items = "".join(f'<span class="outcome-pill">{esc(o)}</span>' for o in outcomes)
    return f"""
<section class="outcomes-strip">
  <div class="container">
    <div class="outcomes-strip__inner reveal">{items}</div>
  </div>
</section>"""


def render_pain_outcomes(key):
    sec = PAGE_SECTIONS.get(key, {})
    pains = sec.get("pains", [])
    outcomes = sec.get("outcomes", [])
    if not pains and not outcomes:
        return ""
    copy = SECTION_COPY.get("problem", {}) if key == "index" else {}
    eyebrow = copy.get("eyebrow", "The problem")
    heading = copy.get("heading", "What breaks without one system")
    desc = copy.get("description", "")
    desc_html = f'<p class="section-lead">{esc(desc)}</p>' if desc else ""
    pain_cards = "".join(
        f'<article class="pain-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in pains
    )
    outcome_html = ""
    if outcomes:
        items = "".join(f"<li>{esc(o)}</li>" for o in outcomes)
        outcome_html = f"""
    <div class="outcomes-panel reveal">
      <p class="outcomes-panel__label">What Tracopus delivers</p>
      <ul class="check-list check-list--large check-list--grid">{items}</ul>
    </div>"""
    return f"""
<section class="section section--spacious section--alt">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">{esc(eyebrow)}</p>
      <h2>{esc(heading)}</h2>
      {desc_html}
    </div>
    <div class="pain-grid pain-grid--3">{pain_cards}</div>
    {outcome_html}
  </div>
</section>"""


def render_workflows(key):
    workflows = PAGE_SECTIONS.get(key, {}).get("workflows", [])
    if not workflows:
        return ""
    cards = ""
    for title, desc, steps in workflows:
        steps_html = "".join(f"<li>{esc(s)}</li>" for s in steps)
        cards += f"""
      <article class="workflow-card reveal">
        <h3>{esc(title)}</h3>
        <p>{esc(desc)}</p>
        <ol class="workflow-steps">{steps_html}</ol>
      </article>"""
    return f"""
<section class="section">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Workflows</p><h2>How teams use it day to day</h2>
    <p class="section-lead">Documented paths from the user guide — not theoretical feature lists.</p></div>
    <div class="workflow-grid">{cards}
    </div>
  </div>
</section>"""


def render_screens(depth, key):
    screens = PAGE_SECTIONS.get(key, {}).get("screens", [])
    if not screens:
        return ""
    cards = "".join(
        f'<a class="screen-card reveal" href="{href(depth, "../documentation/" + p)}"{link_target_attrs("../documentation/" + p)}>'
        f'<strong>{esc(t)}</strong><span>{esc(d)}</span><em>Read guide →</em></a>'
        for p, t, d in screens
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Deep dive</p><h2>Explore documented screens</h2>
    <p class="section-lead">Each link opens the page-by-page user guide — summary charts, features, and permissions included.</p></div>
    <div class="screen-grid">{cards}</div>
  </div>
</section>"""


def render_audiences(key):
    audiences = PAGE_SECTIONS.get(key, {}).get("audiences", [])
    if not audiences:
        return ""
    cards = "".join(
        f'<article class="audience-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in audiences
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Who it fits</p><h2>Organizations like yours</h2></div>
    <div class="audience-grid">{cards}</div>
  </div>
</section>"""


def render_value_props():
    copy = SECTION_COPY.get("value", {})
    cards = "".join(
        f'<article class="value-card reveal"><h3>{esc(t)}</h3><p>{esc(d)}</p></article>'
        for t, d in VALUE_PROPS
    )
    return f"""
<section class="section section--quotes section--spacious">
  <div class="container">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(copy.get("eyebrow", "Why Tracopus"))}</p><h2>{esc(copy.get("heading", "Connected work in one platform"))}</h2>
    <p class="section-lead">{esc(copy.get("description", ""))}</p></div>
    <div class="value-grid">{cards}</div>
  </div>
</section>"""


def render_audience_marquee():
    items = "".join(f'<span class="logo-marquee__item">{esc(t)}</span>' for t in (AUDIENCE_TAGS * 2))
    return f"""
<section class="logo-marquee" aria-label="Industries served">
  <div class="logo-marquee__track">{items}</div>
</section>"""


def render_scenarios():
    cards = "".join(
        f'<article class="case-card reveal"><span class="case-card__tag">{esc(tag)}</span>'
        f'<h3>{esc(title)}</h3><p>{esc(story)}</p>'
        f'<p class="case-card__flow"><strong>Flow:</strong> {" → ".join(esc(s) for s in steps)}</p></article>'
        for title, tag, story, steps in WORKFLOW_SCENARIOS
    )
    return f"""
<section class="section">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Workflow patterns</p><h2>Real paths through the product</h2>
    <p class="section-lead">End-to-end scenarios supported by documented modules — no fabricated customer names or metrics.</p></div>
    <div class="case-grid">{cards}</div>
  </div>
</section>"""


def render_page_faq(depth, key):
    extra = PAGE_FAQ.get(key, [])
    if not extra:
        return ""
    items = "".join(
        f'<details class="faq-item reveal"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>'
        for q, a in extra
    )
    return f"""
<section class="section section--spacious">
  <div class="container container--narrow">
    <div class="section-head section-head--wide reveal"><p class="eyebrow">{esc(PAGE_META[key]["title"])} FAQ</p><h2>Module-specific answers</h2></div>
    <div class="faq-list">{items}</div>
    <p class="faq-more reveal">Full library: <a href="{href(depth, '../documentation/faq/index.html')}"{link_target_attrs('../documentation/faq/index.html')}>157+ FAQ entries</a></p>
  </div>
</section>"""


def render_bento():
    return """
<section class="section">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Why Tracopus</p><h2>Luxury is a productivity strategy</h2></div>
    <div class="bento-grid">
      <article class="bento bento--large reveal"><span class="bento__emoji">✨</span><h3>Delight drives adoption</h3><p>When timesheets look good, people fill them on Friday — not Monday panic.</p></article>
      <article class="bento reveal"><span class="bento__emoji">🔗</span><h3>One thread</h3><p>Bid → PO → project → hours → invoice without export gymnastics.</p></article>
      <article class="bento reveal"><span class="bento__emoji">📊</span><h3>Charts with context</h3><p>Every summary strip chart is documented — no mystery metrics.</p></article>
      <article class="bento reveal"><span class="bento__emoji">🛡️</span><h3>Enterprise ready</h3><p>SSO, RBAC, org inheritance — playful UI, serious governance.</p></article>
      <article class="bento bento--wide reveal"><span class="bento__emoji">🎯</span><h3>Help that meets you</h3><p>In-app Help Center searches the full documentation index — 38+ screen guides and 157+ FAQ entries — while you stay on the page you're working in.</p></article>
    </div>
  </div>
</section>"""


def render_cta(depth):
    copy = SECTION_COPY.get("cta", {})
    return f"""
<section class="section section--cta">
  <div class="container">
    <div class="cta-panel reveal">
      <div class="cta-panel__glow" aria-hidden="true"></div>
      <h2>{esc(copy.get("heading", "Ready to see it live?"))}</h2>
      <p>{esc(copy.get("description", "Personalized demo mapped to your workflows."))}</p>
      <div class="hero-cta">
        <a class="btn btn--primary btn--glow demo-request-trigger" href="#">Request a Demo</a>
        <a class="btn btn--ghost" href="{href(depth, 'contact.html')}">Talk to Sales</a>
      </div>
    </div>
  </div>
</section>"""


def render_timeline():
    items = "".join(
        f'<li class="timeline__item reveal"><span class="timeline__when">{esc(w)}</span>'
        f'<h3>{esc(t)}</h3><p>{esc(d)}</p></li>'
        for t, d, w in TIMELINE
    )
    return f"""
<section class="section section--alt">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Rollout</p><h2>From pilot to portfolio in weeks</h2></div>
    <ol class="timeline">{items}</ol>
  </div>
</section>"""


def render_case_studies():
    return render_scenarios()


def render_resources(depth):
    cards = "".join(
        f'<article class="resource-card reveal"><h3>{esc(t)}</h3><p class="resource-card__sub">{esc(s)}</p><p>{esc(b)}</p>'
        f'<a href="{href(depth, "../documentation/index.html")}"{link_target_attrs("../documentation/index.html")}>Read in docs →</a></article>'
        for t, s, b in RESOURCES
    )
    return f"""
<section class="section">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Library</p><h2>Playbooks & guides</h2></div>
    <div class="resource-grid">{cards}</div>
  </div>
</section>"""


def render_faq(depth):
    items = "".join(
        f'<details class="faq-item reveal"><summary>{esc(q)}</summary><p>{a}</p></details>'
        for q, a in FAQ_ITEMS
    )
    extra = """
    <details class="faq-item reveal"><summary>Is there a free trial?</summary><p>Contact us for a guided pilot — we tailor onboarding to your org size and modules.</p></details>
    <details class="faq-item reveal"><summary>Do you show pricing on the website?</summary><p>We scope engagements individually. Request a demo and we'll discuss fit and rollout — no public rate cards.</p></details>"""
    return f"""
<section class="section">
  <div class="container container--narrow">
    <div class="faq-list">{items}{extra}</div>
    <p class="faq-more reveal">More answers in our <a href="{href(depth, '../documentation/faq/index.html')}"{link_target_attrs('../documentation/faq/index.html')}>complete FAQ</a> (157+ questions).</p>
  </div>
</section>"""


def render_demo_form_fields(form_id="demo-request-form"):
    size_opts = "".join(
        f'<option value="{esc(s)}">{esc(s)}</option>' for s in DEMO_FORM["company_sizes"]
    )
    timeline_opts = "".join(
        f'<option value="{esc(v)}">{esc(l)}</option>' for v, l in DEMO_FORM["timelines"]
    )
    focus_opts = "".join(
        f'<option value="{esc(o)}">{esc(o)}</option>' for o in DEMO_FORM["focus_areas"]
    )
    module_checks = "".join(
        f'<label class="checkbox-chip"><input type="checkbox" name="modules" value="{esc(v)}">'
        f'<span>{esc(l)}</span></label>'
        for v, l in DEMO_FORM["modules"]
    )
    contact_opts = "".join(
        f'<option value="{esc(v)}">{esc(l)}</option>' for v, l in DEMO_FORM["contact_methods"]
    )
    return f"""
      <fieldset class="form-section">
        <legend>About you</legend>
        <div class="form-row">
          <label>Full name<input type="text" name="name" required placeholder="Your name" autocomplete="name"></label>
          <label>Business email<input type="email" name="email" required placeholder="you@company.com" autocomplete="email"></label>
        </div>
        <div class="form-row">
          <label>Job title<input type="text" name="job_title" placeholder="e.g. Head of Delivery" autocomplete="organization-title"></label>
          <label>Phone<input type="tel" name="phone" placeholder="Optional" autocomplete="tel"></label>
        </div>
      </fieldset>
      <fieldset class="form-section">
        <legend>Organization</legend>
        <div class="form-row">
          <label>Company name<input type="text" name="company" required placeholder="Organization" autocomplete="organization"></label>
          <label>Company size<select name="company_size" required><option value="">Select…</option>{size_opts}</select></label>
        </div>
        <div class="form-row">
          <label>Primary focus<select name="focus" required><option value="">Select…</option>{focus_opts}</select></label>
          <label>Evaluation timeline<select name="timeline" required><option value="">Select…</option>{timeline_opts}</select></label>
        </div>
      </fieldset>
      <fieldset class="form-section">
        <legend>Modules to explore</legend>
        <p class="form-section__hint">Select all areas you want covered in the demo walkthrough.</p>
        <div class="checkbox-grid">{module_checks}</div>
      </fieldset>
      <fieldset class="form-section">
        <legend>Tell us more</legend>
        <label>Current tools &amp; challenges<textarea name="current_tools" rows="3" placeholder="What tools do you use today? What is not working?"></textarea></label>
        <label>What should we show in the demo?<textarea name="message" rows="3" placeholder="Teams, workflows, rollout goals, specific screens…"></textarea></label>
        <div class="form-row">
          <label>Preferred contact<select name="contact_method"><option value="">Select…</option>{contact_opts}</select></label>
          <label>Best time to reach you<input type="text" name="best_time" placeholder="e.g. Tue–Thu mornings IST"></label>
        </div>
      </fieldset>
      <button type="submit" class="btn btn--primary btn--glow demo-form__submit">Request Demo</button>
      <p class="form-note">Thank you for your interest in Tracopus. Our team will review your request and contact you with next steps.</p>"""


def render_demo_request_modal():
    return f"""
  <div id="demo-request-modal" class="site-modal demo-modal" hidden aria-hidden="true">
    <div class="site-modal__backdrop" data-demo-close tabindex="-1"></div>
    <div class="site-modal__dialog site-modal__dialog--wide" role="dialog" aria-labelledby="demo-modal-title" aria-modal="true">
      <button type="button" class="site-modal__close" data-demo-close aria-label="Close">&times;</button>
      <p class="eyebrow">Request a Demo</p>
      <h2 id="demo-modal-title" class="site-modal__title">{esc(DEMO_FORM["title"])}</h2>
      <p class="demo-modal__lead">{esc(DEMO_FORM["lead"])}</p>
      <form id="demo-request-form" class="contact-form contact-form--rich demo-form" action="#" method="post" novalidate>
        {render_demo_form_fields()}
      </form>
    </div>
  </div>"""


def render_contact_form(kind="contact"):
    if kind == "demo":
        return f"""
<section class="section">
  <div class="container container--narrow">
    <form class="contact-form contact-form--rich demo-form reveal" id="demo-page-form" action="#" method="post" novalidate>
      <h2>{esc(DEMO_FORM["title"])}</h2>
      <p class="demo-modal__lead">{esc(DEMO_FORM["lead"])}</p>
      {render_demo_form_fields()}
    </form>
  </div>
</section>"""
    title = "Discover how Tracopus can support your company's operations"
    btn = "Send message"
    return f"""
<section class="section">
  <div class="container container--narrow">
    <form class="contact-form reveal" action="#" method="post" onsubmit="return false;">
      <h2>{title}</h2>
      <div class="form-row"><label>Full Name<input type="text" name="name" required placeholder="Your name"></label>
      <label>Business Email<input type="email" name="email" required placeholder="you@company.com"></label></div>
      <div class="form-row"><label>Company Name<input type="text" name="company" placeholder="Organization"></label>
      <label>Phone Number<input type="tel" name="phone" placeholder="Optional"></label></div>
      <label>Message<textarea name="message" rows="4" placeholder="How can we help?"></textarea></label>
      <button type="submit" class="btn btn--primary btn--glow">{btn}</button>
      <p class="form-note">Thank you for your interest in Tracopus. Our team will review your request and contact you with next steps.</p>
    </form>
  </div>
</section>"""


def page_body(key, depth):
    parts = [render_hero(PAGE_META[key], key, depth)]
    if key == "index":
        parts += [
            render_audience_marquee(),
            render_page_screenshots(depth, key, "showcase"),
            render_pain_outcomes(key),
            render_value_props(),
            render_modules(depth),
            render_collaboration(),
            render_enterprise_trust(),
            render_lifecycle(),
            render_personas(),
            render_use_cases(),
            render_benefits(),
            render_page_screenshots(depth, key, "gallery"),
            render_home_faq(depth),
            render_cta(depth),
        ]
    elif key == "platform":
        parts += [
            render_lead_band(key),
            render_page_screenshots(depth, key),
            render_platform_capabilities(depth),
            render_features("platform"),
            render_lifecycle(),
            render_collaboration(),
            render_enterprise_trust(),
            render_cta(depth),
        ]
    elif key in FEATURE_BLOCKS and key not in ("platform",):
        parts += [
            render_lead_band(key),
            render_page_screenshots(depth, key),
            render_outcomes_strip(key),
            render_features(key),
            render_collaboration() if key == "projects" else "",
            render_page_faq(depth, key),
            render_cta(depth),
        ]
    elif key == "customers":
        parts += [
            render_lead_band(key),
            render_pain_outcomes(key),
            render_use_cases(),
            render_personas(),
            render_lifecycle(),
            render_benefits(),
            render_cta(depth),
        ]
    elif key == "about":
        parts += [
            render_lead_band(key),
            render_value_props(),
            render_lifecycle(),
            render_cta(depth),
        ]
    elif key == "resources":
        parts += [render_lead_band(key), render_resources(depth), render_screens(depth, "platform"), render_cta(depth)]
    elif key == "faq":
        parts += [render_lead_band(key), render_faq(depth), render_cta(depth)]
    elif key == "contact":
        parts += [render_lead_band(key), render_contact_form("contact")]
    elif key == "demo":
        parts += [render_lead_band(key), render_contact_form("demo")]
    elif key.startswith("solutions/"):
        sub = key.split("/")[1]
        parts += [render_lead_band(key), render_pain_outcomes(key)]
        if sub == "consulting":
            parts += [
                render_page_screenshots(depth, key),
                render_features("hrms"),
                render_workflows(key),
                render_screens(depth, key),
                render_page_faq(depth, key),
                render_scenarios(),
                render_cta(depth),
            ]
        elif sub == "delivery-teams":
            parts += [
                render_page_screenshots(depth, key),
                render_features("projects"),
                render_workflows(key),
                render_screens(depth, key),
                render_page_faq(depth, key),
                render_cta(depth),
            ]
        else:
            parts += [
                render_features("security"),
                render_workflows(key),
                render_screens(depth, key),
                render_timeline(),
                render_page_faq(depth, key),
                render_cta(depth),
            ]
    else:
        parts += [render_lead_band(key), render_features("platform"), render_cta(depth)]
    return "\n".join(p for p in parts if p)


def render_workspace_signin_modal():
    return """
  <div id="workspace-signin-modal" class="site-modal workspace-modal" hidden aria-hidden="true">
    <div class="site-modal__backdrop" data-workspace-close tabindex="-1"></div>
    <div class="site-modal__dialog" role="dialog" aria-labelledby="workspace-modal-title" aria-modal="true">
      <button type="button" class="site-modal__close" data-workspace-close aria-label="Close">&times;</button>
      <p class="eyebrow">Sign in</p>
      <h2 id="workspace-modal-title" class="site-modal__title">Enter your workspace</h2>
      <p class="workspace-modal__lead">Your organization&rsquo;s Tracopus URL looks like <strong>workspace</strong>.tracopus.com</p>
      <form id="workspace-signin-form" class="workspace-form" novalidate>
        <label class="workspace-form__label" for="workspace-name">Workspace name</label>
        <div class="workspace-form__field">
          <input id="workspace-name" class="workspace-form__input" name="workspace" type="text"
            inputmode="url" autocapitalize="none" autocorrect="off" spellcheck="false"
            autocomplete="organization" placeholder="acme" aria-describedby="workspace-error workspace-hint" required>
          <span class="workspace-form__suffix" aria-hidden="true">.tracopus.com</span>
        </div>
        <p class="workspace-form__hint" id="workspace-hint">Use letters, numbers, and hyphens only.</p>
        <p class="workspace-form__error" id="workspace-error" role="alert" hidden></p>
        <button type="submit" class="btn btn--primary btn--glow workspace-form__submit">Continue to sign in</button>
      </form>
    </div>
  </div>"""


def render_page(path, key):
    depth = depth_for(path)
    meta = PAGE_META[key]
    title = meta["title"] if SITE["name"] in meta["title"] else f"{meta['title']} — {SITE['name']}"
    nav = render_nav(depth, path)
    footer = render_footer(depth)
    body = page_body(key, depth)
    home = href(depth, "index.html")
    demo = "#"
    demo_cls = "btn btn--sm btn--primary demo-request-trigger"
    login = "#"
    login_cls = "btn btn--sm btn--ghost workspace-signin-trigger"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{esc(meta['desc'])}">
  <title>{esc(title)}</title>
  <script>!function(){{try{{var t=localStorage.getItem("tracopus-site-theme")||"light";document.documentElement.setAttribute("data-site-theme",t)}}catch(e){{}}}}();</script>
  <link rel="icon" href="{logo_dark_src(depth)}" type="image/png" id="site-favicon" data-favicon-light="{logo_light_src(depth)}" data-favicon-dark="{logo_dark_src(depth)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{asset(depth, 'css/site.css')}">
</head>
<body>
  <div class="page-noise" aria-hidden="true"></div>
  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      {brand_block(depth, home)}
      <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="site-nav" aria-label="Main">
        <ul class="nav-list">
      {nav}
          <li class="nav-item">
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Switch to dark theme" title="Toggle light / dark theme">
              <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">☾</span>
              <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀</span>
            </button>
          </li>
          <li class="nav-item nav-item--cta"><a class="{login_cls}" href="{login}">Sign in</a></li>
          <li class="nav-item nav-item--cta"><a class="{demo_cls}" href="{demo}">Demo</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>{body}</main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">{logo_img(depth, 120, 32)}<p>{esc(SITE['tagline'])}</p></div>
        {footer}
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 {esc(SITE['name'])}. All rights reserved.</p>
        <p><a href="{href(depth, 'contact.html')}">Contact</a> · <a href="{href(depth, '../documentation/index.html')}"{link_target_attrs('../documentation/index.html')}>Documentation</a> · <a href="#" class="workspace-signin-trigger">Sign in</a></p>
      </div>
    </div>
  </footer>
  {render_workspace_signin_modal()}
  {render_demo_request_modal()}
  <script src="{asset(depth, 'js/site.js')}"></script>
  <script src="{asset(depth, 'js/animations.js')}" defer></script>
</body>
</html>"""


def generate_all():
    os.makedirs(os.path.join(ROOT, "solutions"), exist_ok=True)
    write_screenshot_placeholders()
    created = []
    for key in PAGE_META:
        out = os.path.join(ROOT, f"{key}.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(render_page(key, key))
        created.append(out)
    print(json.dumps({"created": len(created), "version": ASSET_V}))


if __name__ == "__main__":
    generate_all()
