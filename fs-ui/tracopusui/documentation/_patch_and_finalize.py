#!/usr/bin/env python3
"""Patch kept root pages, fix generator, delete obsolete files, regenerate modules."""
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))

NEW_NAV = """<nav>
  <div class="container">
    <ul>
      <li><a href="index.html"{home}>Home</a></li>
      <li><a href="getting-started.html"{gs}>Getting Started</a></li>
      <li><a href="hrms/index.html"{hrms}>HRMS</a></li>
      <li><a href="sales/index.html"{sales}>Sales</a></li>
      <li><a href="project/index.html"{project}>Project</a></li>
      <li><a href="mobile/index.html"{mobile}>Mobile</a></li>
      <li><a href="interface.html"{iface}>Luxury UI</a></li>
      <li><a href="charts.html"{charts}>Charts</a></li>
      <li><a href="faq/index.html"{faq}>FAQ</a></li>
      <li><a href="admin.html"{admin}>Admin</a></li>
    </ul>
  </div>
</nav>"""

HEADER = """<header>
  <div class="container">
    <div class="header-content">
      <div class="header-brand">
        <a href="index.html" class="header-brand__link" aria-label="User Guide home">
          <img src="images/tracopus-logo.png" alt="" class="header-logo" width="140" height="38">
          <div class="header-brand__text">
            <h1>User Guide</h1>
            <p class="subtitle">Complete Documentation &amp; User Manual</p>
            <p class="version">Luxury UI · Version 2.0</p>
            <span class="lux-badge">Enterprise Work Intelligence</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</header>"""

LINK_MAP = {
    'href="mobile.html"': 'href="mobile/index.html"',
    'href="hrms.html"': 'href="hrms/index.html"',
    'href="sales.html"': 'href="sales/index.html"',
    'href="projects.html"': 'href="project/index.html"',
    'href="tasks.html"': 'href="project/taskboard.html"',
    'href="reports.html"': 'href="project/reports.html"',
    'href="collaboration.html"': 'href="project/notes.html"',
    'href="mobile.html#': 'href="mobile/index.html#',
}

ACTIVE_KEYS = {
    "getting-started.html": "gs",
    "interface.html": "iface",
    "charts.html": "charts",
    "admin.html": "admin",
}


def patch_root_file(name, src=None):
    src = src or os.path.join(ROOT, f"_restore_{name}")
    dst = os.path.join(ROOT, name)
    with open(src, "r", encoding="utf-8") as f:
        html = f.read()
    html = re.sub(r"<link rel=\"icon\"[^>]*>", '<link rel="icon" href="images/tracopus-logo.png" type="image/png">', html)
    html = re.sub(r"<header>.*?</header>", HEADER, html, count=1, flags=re.DOTALL)
    keys = {k: "" for k in ["home", "gs", "hrms", "sales", "project", "mobile", "iface", "charts", "admin"]}
    if name in ACTIVE_KEYS:
        keys[ACTIVE_KEYS[name]] = ' class="active"'
    html = re.sub(r"<nav>.*?</nav>", NEW_NAV.format(**keys), html, count=1, flags=re.DOTALL)
    if 'data-docs-depth' not in html:
        html = html.replace("<body>", '<body data-docs-depth="0">')
    for old, new in LINK_MAP.items():
        html = html.replace(old, new)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(html)
    print("Patched", name)


def patch_generate_all():
    path = os.path.join(ROOT, "_generate_pages.py")
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    src = src.replace(
        "            active_sidebar=page[\"file\"],\n        )",
        "            active_sidebar=page[\"file\"],\n            current_module=module_key,\n        )",
    )
    # Fix breadcrumb for index pages
    src = src.replace(
        'breadcrumb = f\'<a href="../index.html">Home</a> → {title} → {page["label"]}\'',
        'breadcrumb = f\'<a href="../index.html">Home</a> → {title}\' + ("" if page["file"] == "index.html" else f\' → {page["label"]}\')',
    )
    old_block = src[src.find("    created.append(\n        generate_simple_root(\n            \"getting-started.html\""):src.find("    append_css()")]
    new_block = """    # Kept root pages patched separately via _patch_and_finalize.py

    append_css()"""
    if old_block and "Kept root pages" not in src:
        src = src.replace(old_block, new_block)
    # Remove alias block
    src = re.sub(
        r"\n    # Backward-compatible root aliases.*?generate_simple_root\(\s*\)\s*\)\s*\n",
        "\n",
        src,
        flags=re.DOTALL,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(src)


def delete_obsolete_root():
    for name in ["hrms.html", "sales.html", "projects.html", "tasks.html", "reports.html", "collaboration.html", "mobile.html"]:
        path = os.path.join(ROOT, name)
        if os.path.exists(path):
            os.remove(path)
            print("Deleted", name)


if __name__ == "__main__":
    for f in ["getting-started.html", "interface.html", "charts.html", "admin.html"]:
        patch_root_file(f)
    patch_generate_all()
    subprocess.run(["python3", os.path.join(ROOT, "_generate_pages.py")], check=True, cwd=ROOT)
    delete_obsolete_root()
    for tmp in os.listdir(ROOT):
        if tmp.startswith("_restore") or tmp.startswith("_best"):
            os.remove(os.path.join(ROOT, tmp))
    print("Done.")
