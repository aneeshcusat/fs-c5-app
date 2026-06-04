#!/usr/bin/env python3
"""Generate page-wise documentation HTML files."""
import os
import json
import re
from _page_data import (
    build_body, page_nav, summary_section, render_report_catalog,
)
from _rich_content import callout, render_callouts, render_concepts, render_faq

ROOT = os.path.dirname(os.path.abspath(__file__))

# Bump when CSS/JS changes so browsers fetch fresh assets (avoid stale cache).
DOCS_ASSET_VERSION = "20260604d"

TOP_NAV = [
    ("index.html", "Home", 0),
    ("getting-started.html", "Getting Started", 0),
    ("hrms/index.html", "HRMS", 1),
    ("sales/index.html", "Sales", 1),
    ("project/index.html", "Project", 1),
    ("mobile/index.html", "Mobile", 1),
    ("interface.html", "Luxury UI", 0),
    ("charts.html", "Charts", 0),
    ("faq/index.html", "FAQ", 1),
    ("admin.html", "Admin", 0),
]

ROOT_NAV_HTML = """
      <li><a href="index.html"{home}>Home</a></li>
      <li><a href="getting-started.html"{gs}>Getting Started</a></li>
      <li><a href="hrms/index.html"{hrms}>HRMS</a></li>
      <li><a href="sales/index.html"{sales}>Sales</a></li>
      <li><a href="project/index.html"{project}>Project</a></li>
      <li><a href="mobile/index.html"{mobile}>Mobile</a></li>
      <li><a href="interface.html"{iface}>Luxury UI</a></li>
      <li><a href="charts.html"{charts}>Charts</a></li>
      <li><a href="faq/index.html"{faq}>FAQ</a></li>
      <li><a href="admin.html"{admin}>Admin</a></li>"""


def p(depth, path):
    return ("../" * depth) + path


def asset(depth, path):
    return f"{p(depth, path)}?v={DOCS_ASSET_VERSION}"


def top_nav_href(depth, href, current_module=None):
    """Resolve top-nav href from docs root or module subfolder."""
    if depth == 0:
        return href
    if href in ("index.html", "getting-started.html", "interface.html", "charts.html", "admin.html"):
        return p(1, href)
    if href == "faq/index.html":
        return p(1, href)
    if "/" in href:
        module, rest = href.split("/", 1)
        if current_module == module:
            return rest
        return p(1, href)
    return p(1, href)


def render(depth, title, breadcrumb_html, sidebar, body, active_top=None, active_sidebar=None, current_module=None):
    nav_items = []
    for href, label, d in TOP_NAV:
        full = top_nav_href(depth, href, current_module) if depth else href
        cls = ' class="active"' if active_top == href else ""
        nav_items.append(f'<li><a href="{full}"{cls}>{label}</a></li>')

    sb = []
    for item in sidebar:
        if item.get("title"):
            sb.append(f'<li class="section-title">{item["title"]}</li>')
        else:
            href = item["href"]
            cls = ' class="active"' if active_sidebar == item.get("file") else ""
            sb.append(f'<li><a href="{href}"{cls}>{item["label"]}</a></li>')

    return f"""<!DOCTYPE html>
<html lang="en" data-lux-palette="emerald">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Tracopus User Guide</title>
  <link rel="icon" href="{p(depth, 'images/tracopus-logo.png')}" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{asset(depth, 'css/styles.css')}">
  <script src="{asset(depth, 'js/brand-config.js')}"></script>
</head>
<body data-docs-depth="{depth}">

<header>
  <div class="container">
    <div class="header-content">
      <div class="header-brand">
        <a href="{p(depth, 'index.html')}" class="header-brand__link" aria-label="User Guide home">
          <img src="{p(depth, 'images/tracopus-logo.png')}" alt="" class="header-logo" width="140" height="38">
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
</header>

<nav>
  <div class="container">
    <ul>
      {chr(10).join("      " + x for x in nav_items)}
    </ul>
  </div>
</nav>

<aside class="sidebar">
  <ul>
    {chr(10).join("    " + x for x in sb)}
  </ul>
</aside>

<main>
  {f'  <div class="breadcrumb">{breadcrumb_html}</div>' if breadcrumb_html else ''}
  {body}
</main>

<footer>
  <div class="container">
    <p>&copy; 2026 <span data-brand>Tracopus</span>. All rights reserved.</p>
    <p style="margin-top:0.75rem;">
      <a href="{p(depth, 'index.html')}">Documentation</a>
      <a href="{p(depth, 'getting-started.html')}">Getting Started</a>
      <a href="{p(depth, 'charts.html')}">Charts</a>
    </p>
    <p class="footer-muted">For support, contact your workspace administrator.</p>
  </div>
</footer>

<script src="{asset(depth, 'js/palette.js')}"></script>
<script src="{asset(depth, 'js/brand.js')}"></script>
<script src="{asset(depth, 'js/navigation.js')}"></script>
<script src="{asset(depth, 'js/search.js')}"></script>
</body>
</html>
"""


def _extract_page_parts(html):
    main_m = re.search(
        r'<main(?: class="docs-app-shell__main")?>\s*(.*?)\s*</main>',
        html,
        re.DOTALL,
    )
    if not main_m:
        return None
    main_content = main_m.group(1).strip()

    breadcrumb_html = ""
    bc_m = re.match(r'(\s*<div class="breadcrumb">(.*?)</div>)', main_content, re.DOTALL)
    if bc_m:
        breadcrumb_html = bc_m.group(2).strip()
        main_content = main_content[bc_m.end() :].strip()

    sidebar = []
    sb_m = re.search(
        r'<aside class="(?:sidebar docs-app-shell__sidebar|sidebar)">\s*<ul>(.*?)</ul>\s*</aside>',
        html,
        re.DOTALL,
    )
    if sb_m:
        sidebar = parse_sidebar_ul(sb_m.group(1))

    title_m = re.search(r"<title>([^—<]+)", html)
    page_title = title_m.group(1).strip() if title_m else "Page"
    return page_title, breadcrumb_html, sidebar, main_content


def rewrap_boxed_page_to_flat(rel_path, active_top, active_sidebar=None):
    """Convert a boxed docs-app-shell page back to the standard flat layout."""
    path = os.path.join(ROOT, rel_path)
    if not os.path.isfile(path):
        return None
    with open(path, encoding="utf-8") as f:
        html = f.read()
    if "docs-app-shell" not in html:
        return None

    parts = _extract_page_parts(html)
    if not parts:
        return None
    page_title, breadcrumb_html, sidebar, main_content = parts
    depth = rel_path.count("/")
    return write(
        rel_path,
        render(
            depth,
            page_title,
            breadcrumb_html,
            sidebar,
            main_content,
            active_top=active_top,
            active_sidebar=active_sidebar or rel_path,
        ),
    )


def rewrap_root_pages_from_boxed():
    pages = [
        ("getting-started.html", "getting-started.html", "getting-started.html"),
        ("interface.html", "interface.html", "interface.html"),
        ("charts.html", "charts.html", "charts.html"),
        ("admin.html", "admin.html", "admin.html"),
    ]
    return [p for p in (rewrap_boxed_page_to_flat(f, top, side) for f, top, side in pages) if p]


def write(rel_path, content):
    path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return rel_path


def parse_sidebar_ul(ul_html):
    sidebar = []
    for chunk in re.findall(r"<li[^>]*>.*?</li>", ul_html, re.DOTALL):
        if "section-title" in chunk:
            m = re.search(r'class="section-title">([^<]+)', chunk)
            if m:
                sidebar.append({"title": m.group(1).strip()})
        elif "<a " in chunk:
            href_m = re.search(r'href="([^"]*)"', chunk)
            label_m = re.search(r">([^<]+)</a>", chunk)
            if href_m and label_m:
                href = href_m.group(1)
                sidebar.append({"file": href, "href": href, "label": label_m.group(1).strip()})
    return sidebar


HRMS_PAGES = [
    {"file": "index.html", "href": "index.html", "label": "HRMS Overview"},
    {"file": "dashboard.html", "href": "dashboard.html", "label": "Employee Dashboard"},
    {"file": "employees.html", "href": "employees.html", "label": "Employees"},
    {"file": "timesheet.html", "href": "timesheet.html", "label": "Timesheet"},
    {"file": "attendance.html", "href": "attendance.html", "label": "Attendance"},
    {"file": "invoices.html", "href": "invoices.html", "label": "Invoices"},
    {"file": "invoice-details.html", "href": "invoice-details.html", "label": "Invoice Details"},
    {"file": "profile.html", "href": "profile.html", "label": "Employee Profile"},
    {"file": "settings.html", "href": "settings.html", "label": "Settings"},
    {"file": "application-config.html", "href": "application-config.html", "label": "Application Configuration"},
]

SALES_PAGES = [
    {"file": "index.html", "href": "index.html", "label": "Sales Overview"},
    {"file": "bid-requests.html", "href": "bid-requests.html", "label": "Bid Requests"},
    {"file": "bid-details.html", "href": "bid-details.html", "label": "Bid Details"},
    {"file": "purchase-orders.html", "href": "purchase-orders.html", "label": "Purchase Orders"},
    {"file": "purchase-order-details.html", "href": "purchase-order-details.html", "label": "PO Details"},
]

PROJECT_PAGES = [
    {"file": "index.html", "href": "index.html", "label": "Project Overview"},
    {"file": "dashboard.html", "href": "dashboard.html", "label": "Project Dashboard"},
    {"file": "project-list.html", "href": "project-list.html", "label": "Project List"},
    {"file": "project-details.html", "href": "project-details.html", "label": "Project Details"},
    {"file": "deliverables.html", "href": "deliverables.html", "label": "Deliverables"},
    {"file": "deliverable-details.html", "href": "deliverable-details.html", "label": "Deliverable Details"},
    {"file": "work-items.html", "href": "work-items.html", "label": "Work Items"},
    {"file": "accounts.html", "href": "accounts.html", "label": "Accounts"},
    {"file": "taskboard.html", "href": "taskboard.html", "label": "Task Board"},
    {"file": "task-activity.html", "href": "task-activity.html", "label": "Task Activity"},
    {"file": "team-capacity.html", "href": "team-capacity.html", "label": "Team Capacity"},
    {"file": "reports.html", "href": "reports.html", "label": "Reports"},
    {"file": "feedback.html", "href": "feedback.html", "label": "Feedback"},
    {"file": "notes.html", "href": "notes.html", "label": "Notes"},
    {"file": "calendar.html", "href": "calendar.html", "label": "Calendar"},
    {"file": "file-manager.html", "href": "file-manager.html", "label": "File Manager"},
    {"file": "chat.html", "href": "chat.html", "label": "Chat"},
    {"file": "search.html", "href": "search.html", "label": "Global Search"},
]

MOBILE_PAGES = [
    {"file": "index.html", "href": "index.html", "label": "Mobile Overview"},
    {"file": "login.html", "href": "login.html", "label": "Login & Registration"},
    {"file": "tasks.html", "href": "tasks.html", "label": "Tasks Hub"},
    {"file": "insights.html", "href": "insights.html", "label": "Insights Dashboard"},
    {"file": "projects.html", "href": "projects.html", "label": "Projects Hub"},
    {"file": "timesheet.html", "href": "timesheet.html", "label": "Timesheet & Record"},
]


def module_index_grid(pages, skip_index=True):
    cards = []
    for pg in pages:
        if skip_index and pg["file"] == "index.html":
            continue
        cards.append(
            f'<a class="page-index-card" href="{pg["href"]}">'
            f'<strong>{pg["label"]}</strong>'
            f'<span>Open guide →</span></a>'
        )
    return f'<div class="page-index-grid">{"".join(cards)}</div>'


def nav_for_pages(pages, idx):
    prev_p = pages[idx - 1] if idx > 0 else None
    next_p = pages[idx + 1] if idx < len(pages) - 1 else None
    return page_nav(
        prev_p["href"] if prev_p else None,
        prev_p["label"] if prev_p else "",
        next_p["href"] if next_p else None,
        next_p["label"] if next_p else "",
    )


def _page_body(page_id, nav_html, *args, **kwargs):
    if args:
        *head, _last = args
        return build_body(*head, nav_html=nav_html, page_id=page_id, **kwargs)
    return build_body(nav_html=nav_html, page_id=page_id, **kwargs)


def get_hrms_body(file_key, nav_html, page_id):
    bb = lambda *a, **kw: _page_body(page_id, nav_html, *a, **kw)
    specs = {
        "index.html": bb(
            "/hrms/*", "HRMS module (sidebar)",
            "People operations — personal dashboards, workforce directory, timesheets, attendance, invoices, and employee profiles.",
            "HRMS module", "HRMS Overview",
            "Personal and team people analytics, workforce directory charts, weekly timesheets, attendance matrix, and invoice financial views.",
            "<p>The HRMS module is your home for everything people-related: how you log time, how managers see team health, and how finance tracks billing through invoices.</p><p>Use the pages below for screen-by-screen detail. Each page documents routes, filters, chart panels, and workflows at minute level.</p>",
            module_index_grid(HRMS_PAGES),
            "<p>Access HRMS from the left sidebar under <strong>HRMS</strong>. Sub-pages appear based on your permissions — Timesheet and Dashboard are typical entry points for all employees; Employees and Attendance require manager or HR roles.</p>",
            "<p>Module index pages link to every HRMS screen. No summary analytics on the overview itself — open Employee Dashboard or Employees for chart galleries.</p>",
            "<p>Jump to a topic from the grid above or use the left sidebar on any HRMS page.</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>1. New employee</strong><div class=\"step-detail\">Start at Employee Dashboard → log time on Timesheet → view profile.</div></div><div class=\"step\"><strong>2. Manager</strong><div class=\"step-detail\">Team dashboard → Employees directory → Attendance matrix.</div></div><div class=\"step\"><strong>3. Finance</strong><div class=\"step-detail\">Invoices list → open Invoice Details for line items and PDF.</div></div></div>",
            "<div class=\"info\"><strong>Tip:</strong> Mobile timesheet recording mirrors web rules — see <a href=\"../mobile/timesheet.html\">Mobile Timesheet</a>.</div>",
            nav_html,
        ),
        "dashboard.html": bb(
            "/hrms/dashboard", "HRMS → Dashboard",
            "Personal and team analytics — attendance, utilization, task mix, and workforce demographics for managers.",
            "HRMS · Dashboard", "Employee Dashboard",
            "Two-tab dashboard: My dashboard for individuals and Team dashboard for managers with org-wide workforce analytics.",
            "<p><strong>HRMS → Dashboard</strong> is the default landing for many HRMS users. Individual contributors see personal utilization; managers with team-switch permission see a second tab with headcount, churn, and demographic charts.</p>",
            "<p><strong>Top:</strong> Page header with module kicker and tab bar (<strong>My dashboard</strong> | <strong>Team dashboard</strong>).<br><strong>Body:</strong> Responsive grid of chart panels and lists — each panel is a card with title, chart, and optional drill action.<br><strong>Team tab only:</strong> Team scope bar above analytics to filter organizational unit.</p>",
            "<p><strong>Tabs:</strong> My dashboard · Team dashboard (managers only).<br><strong>Team scope bar</strong> (Team tab): select organizational unit to narrow all downstream charts.<br>No SHOW/SORT on dashboard — scope is tab + team selector only.</p>",
            summary_section("Switch tabs to change the entire panel set.", sections=[{"heading": "My dashboard — chart panels", "spec": "hrms_dashboard_my"}, {"heading": "Team dashboard (managers)", "spec": "hrms_dashboard_team"}], extra="<p><strong>Team scope bar</strong> (Team tab only) filters every chart in the Team dashboard by organizational unit.</p>"),
            "<p>Switch tabs to change entire panel set. On Team dashboard, change team scope to re-query all charts. Click chart segments where supported to filter related lists (varies by panel).</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>Review your week</strong><div class=\"step-detail\">Open My dashboard → check This week at a glance donut → open Timesheet if billable ratio is low.</div></div><div class=\"step\"><strong>Manager health check</strong><div class=\"step-detail\">Team dashboard → set team scope → scan joins/exits area and headcount trend.</div></div></div>",
            "<div class=\"tip\"><strong>Tip:</strong> Target ~80%+ billable on the utilization donut if your org policy requires it. Leave &amp; holidays list helps plan around public holidays.</div>",
            nav_html,
        ),
        "employees.html": bb(
            "/hrms/employees", "HRMS → Employees",
            "Full employee roster with workforce summary analytics and create wizard.",
            "HRMS · Employees", "Employees Directory",
            "Browse, filter, and create employees with nine summary chart panels covering demographics, tenure, skills, and org structure.",
            "<p><strong>HRMS → Employees</strong> is the authoritative workforce directory. HR and managers use it for roster maintenance; everyone with access can look up colleagues and open profiles.</p>",
            "<p><strong>Header:</strong> Lux list header with Create button, SHOW/SORT, team selection, text filter, grid/list toggle.<br><strong>Summary strip:</strong> Expanded analytics grid (nine chart panels) above the register.<br><strong>Register:</strong> Table or card grid of employees with status, team, role, contact columns.</p>",
            "<p><strong>Quick filter chips:</strong> All · Active · Inactive<br><strong>SHOW dropdown:</strong> All · Active · Inactive (matches chips)<br><strong>SORT:</strong> Name, Created, Team (toggle asc/desc)<br><strong>Filter list…</strong> — name, email, employee ID substring<br><strong>Team selection</strong> — multi-team checkbox menu<br><strong>Grid/List</strong> toggle<br><strong>Create</strong> — opens employee wizard or form</p>",
            summary_section("Nine workforce analytics panels scope to your team filter and SHOW preset.", sections=[{"heading": "Employee summary charts", "spec": "hrms_employees"}]),
            "<p>Click any row to open employee profile. Create opens wizard (Profile → Access → Sign-in → Organization → Skills) or Form mode. Profile hero shows security, notifications, and activity when opened from list.</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>Create employee</strong><div class=\"step-detail\">Create → Wizard → complete five steps → submit → employee appears as Active.</div></div><div class=\"step\"><strong>Find someone</strong><div class=\"step-detail\">Filter list by name → click row → profile opens at /hrms/profile/:employeeId.</div></div></div>",
            "<div class=\"note\"><strong>Tip:</strong> Use Active chip before exports or headcount reviews — inactive records remain searchable under Inactive.</div>",
            nav_html,
        ),
        "timesheet.html": bb(
            "/hrms/timesheet", "HRMS → Time Sheet",
            "Weekly timesheet grid for logging billable, non-billable, and leave hours.",
            "HRMS · Timesheet", "Timesheet",
            "Monday–Sunday grid with entry modal, week navigation, employee selector for managers, and validation summary panel.",
            "<p><strong>HRMS → Time Sheet</strong> (<code>/hrms/timesheet</code>) is where billable project time, non-billable overhead, and leave are recorded for payroll and utilization reporting.</p>",
            "<p><strong>Header:</strong> Week navigation arrows (prev/next Monday–Sunday week), employee selector (managers), Add entry button, Sync external leaves.<br><strong>Grid:</strong> Rows per day with hour totals; cells clickable.<br><strong>Summary panel:</strong> Week totals, billable vs non-billable split, submission guidance, validation hints.</p>",
            "<p><strong>Week navigation:</strong> ← → arrows select target week<br><strong>Employee selector:</strong> review direct reports' sheets (permission required)<br><strong>Add entry:</strong> opens entry detail modal<br><strong>Sync external leaves:</strong> pulls approved leave from HR integration<br>No SHOW/SORT chips — scope is week + employee</p>",
            summary_section(plain="<p>Summary panel shows week totals and billable ratio — KPI tiles rather than Apex charts. Validation hints flag missing targets or policy violations inline.</p>"),
            "<p>Click day cell or Add entry → modal with billable (project-linked), non-billable, or leave/holiday type → enter hours (H or H.MM) → project/deliverable fields for billable → Save.</p>",
            "<ol><li>Use week arrows to select target week.</li><li>If permitted, switch employee via selector.</li><li>Click day cell or Add entry.</li><li>Choose entry type and fill hours + project fields.</li><li>Save — review summary panel for totals.</li></ol>",
            "<div class=\"tip\"><strong>Mobile:</strong> Field logging via mobile Record screen — see <a href=\"../mobile/timesheet.html\">Mobile Timesheet</a>. Access rules apply on both platforms.</div>",
            nav_html,
        ),
        "attendance.html": bb(
            "/hrms/attendance", "HRMS → Attendance",
            "Monthly attendance matrix for employees × days with marking and KPI summary.",
            "HRMS · Attendance", "Attendance",
            "Matrix view with month navigation, team/employee filters, cell popovers for marking, and summary KPIs.",
            "<p><strong>HRMS → Attendance</strong> gives HR and managers a month-at-a-glance view of who was present, absent, or on leave each day.</p>",
            "<p><strong>Header:</strong> Month prev/next, team filter, employee filter.<br><strong>Matrix:</strong> Rows = employees, columns = days of month, color-coded cells.<br><strong>Current-user panel:</strong> Highlights your own pattern.<br><strong>Summary section:</strong> KPIs and calendar stats for filtered scope.</p>",
            "<p><strong>Month navigation:</strong> prev/next controls<br><strong>Team filter:</strong> narrow roster scope<br><strong>Employee filter:</strong> single-person focus<br>No SHOW/SORT — matrix is filter-driven</p>",
            summary_section(plain="<p>Summary section shows KPIs and calendar-oriented stats for the filtered team/employee/month scope — attendance rate, present/absent counts, and calendar heat indicators (not Apex charts).</p>"),
            "<p>Click cell → attendance popover (when permitted) to mark status. Details popover shows history for employee-day. Current-user panel highlights your own attendance pattern.</p>",
            "<ol><li>Select month with arrows.</li><li>Filter by team or individual.</li><li>Click cell to mark or view details.</li><li>Review summary KPIs for the scope.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Combine employee filter with month navigation to audit one person's pattern before performance conversations.</div>",
            nav_html,
        ),
        "invoices.html": bb(
            "/hrms/invoice", "HRMS → Invoice",
            "Billing register with fiscal-year analytics and status filtering.",
            "HRMS · Invoices", "Invoices",
            "Invoice list with status chips, FY scope, segment bar, monthly billing bar, and outstanding panel.",
            "<p><strong>HRMS → Invoice</strong> tracks billing documents from draft through paid/closed with fiscal-year scoped analytics.</p>",
            "<p><strong>Header:</strong> Create, status chips, FY selector, SHOW/SORT, filter text.<br><strong>Summary:</strong> Status segment bar, monthly billing bar, outstanding panel (non-Apex).<br><strong>Register:</strong> Invoice rows with status, amount, account, dates.</p>",
            "<p><strong>Status chips:</strong> All · Draft · Pending · Approved · Paid · Closed<br><strong>FY scope:</strong> Current financial year or selectable historical years<br><strong>SHOW/SORT/filter</strong> — standard list controls<br><strong>Create</strong> — sidebar to new invoice</p>",
            summary_section(plain="<ul><li><strong>Status segment bar</strong> — proportional colored bar with legend for invoice status mix</li><li><strong>Monthly billing bar</strong> — invoiced amount trend by month within FY</li><li><strong>Outstanding panel</strong> — open amounts awaiting payment</li></ul>"),
            "<p>Create via sidebar; click row for Invoice Details. Document layout route available for PDF/share.</p>",
            "<ol><li>Select FY and status chip.</li><li>Scan summary bars for billing trend.</li><li>Create or open invoice from list.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Use Outstanding panel before month-end to chase pending approvals.</div>",
            nav_html,
        ),
        "invoice-details.html": bb(
            "/hrms/invoice/details/:invoiceId", "HRMS → Invoice → Details",
            "Single invoice view with line items, linked employees, and document export.",
            "HRMS · Invoice Details", "Invoice Details",
            "Deep view of one invoice — line items, totals, linked employees, status transitions, PDF via document layout.",
            "<p>Opened from Invoices list or direct URL <code>/hrms/invoice/details/:invoiceId</code>. Also available under document layout <code>/document/invoice/details/:invoiceId</code> for PDF-focused view.</p>",
            "<p><strong>Hero:</strong> Invoice number, status badge, account, FY, dates, total amount.<br><strong>Tabs/sections:</strong> Line items table, linked employees, notes, activity.<br><strong>Actions:</strong> Edit (when permitted), status transition, share/PDF.</p>",
            "<p>No list filters on detail page. Status may be changed via action buttons when role permits (Draft → Pending → Approved → Paid → Closed).</p>",
            summary_section(plain="<p>Detail view — no summary strip. Line item totals roll up to header amount; linked employees show who is billable on this invoice.</p>"),
            "<p>Edit line items, add/remove rows, link employees, export PDF via document route for client delivery.</p>",
            "<ol><li>Open invoice from list.</li><li>Review line items and totals.</li><li>Transition status when approved.</li><li>Share PDF via document layout link.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Document layout strips app chrome — ideal for client-facing PDF links.</div>",
            nav_html,
        ),
        "profile.html": bb(
            "/hrms/profile/:employeeId", "HRMS → Profile",
            "Employee profile with hero header, section navigation, security, notifications, and activity timeline.",
            "HRMS · Profile", "Employee Profile",
            "Multi-section profile: general info, security settings, notifications, account activity with charts.",
            "<p><code>/hrms/profile/:employeeId</code> — opened from Employees list or account menu. Shows hero header with photo, role, team, and side navigation between sections.</p>",
            "<p><strong>Hero:</strong> Name, title, team, status, avatar.<br><strong>Side nav:</strong> General · Security · Notifications · Account activity.<br><strong>Content:</strong> Section-specific forms and read-only fields.<br><strong>Activity tab:</strong> Timeline with activity charts.</p>",
            "<p>No SHOW/SORT. Section tabs only. Edit availability depends on whether you view your own profile vs another employee (admin/HR).</p>",
            summary_section(plain="<p>Account activity section includes activity timeline charts showing login and action patterns over time.</p>"),
            "<p>Update general info, reset security settings, configure notification preferences, review activity log.</p>",
            "<ol><li>Open profile from Employees or account menu.</li><li>Navigate sections via side nav.</li><li>Save changes per section.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Security section covers password and SSO linkage — direct employees to Getting Started for first login.</div>",
            nav_html,
        ),
        "settings.html": bb(
            "/hrms/settings", "HRMS → Settings",
            "Access-controlled workspace settings — mobile devices, schedulers, health, company info, localization, notifications.",
            "HRMS · Settings", "Settings",
            "Lux settings hub for admins: device registration, cron schedulers, service health, company info, localization, notifications.",
            "<p><code>/hrms/settings</code> (access-controlled) — admin-only configuration not tied to a single employee profile.</p>",
            "<p><strong>Layout:</strong> Lux section cards in vertical stack.<br><strong>Sections:</strong> Mobile device registration · Schedulers · Service health · Company information · Localization · Notification preferences.</p>",
            "<p>No list filters. Each section is a self-contained form panel. Access requires admin/settings permission.</p>",
            "<p>Service health may show status indicators; schedulers list cron jobs with enable/disable toggles.</p>",
            "<p>Configure org-wide defaults: company branding info, locale formats, notification routing, registered mobile devices.</p>",
            "<ol><li>Open Settings from account menu (if permitted).</li><li>Expand target section card.</li><li>Save changes — some sections require service restart (admin docs).</li></ol>",
            "<p>Organization-wide application configuration and access control are documented in the dedicated <a href=\"application-config.html\">Application Configuration</a> guide (also see <a href=\"../admin.html#appconfig\">Admin &amp; Access</a>).</p>",
            nav_html,
        ),
    }
    return specs[file_key]


def get_sales_body(file_key, nav_html, page_id):
    bb = lambda *a, **kw: _page_body(page_id, nav_html, *a, **kw)
    funnel = """<div class="flow-diagram">
<span class="flow-node">New</span><span class="flow-arrow">→</span>
<span class="flow-node">Assigned</span><span class="flow-arrow">→</span>
<span class="flow-node">In progress</span><span class="flow-arrow">→</span>
<span class="flow-node">Won</span></div>"""
    specs = {
        "index.html": bb(
            "/sales/*", "Sales module (sidebar)",
            "Bid intake through win/loss, purchase contracts, pipeline funnels, and geography/study analytics.",
            "Sales module", "Sales Overview",
            "Track bids from first intake to won/lost, manage purchase orders, and analyze pipeline health with 20+ chart panels.",
            "<p>The Sales module connects presales to delivery: Bid Requests capture opportunities; Purchase Orders represent signed contracts that spawn projects.</p>",
            module_index_grid(SALES_PAGES),
            "<p>Sidebar: <strong>Sales → Bid Requests</strong> and <strong>Purchase Orders</strong>. Detail pages open from list rows.</p>",
            "<p>Overview page links to list pages where summary analytics live.</p>",
            "<p>Use index cards or sidebar to open Bid Requests or Purchase Orders guides.</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>Track a bid</strong><div class=\"step-detail\">Bid Requests → create → assign owner → progress stages → Won/Lost.</div></div><div class=\"step\"><strong>Contract to project</strong><div class=\"step-detail\">Win bid → create PO → link bid → create project from PO detail.</div></div></div>",
            "<div class=\"tip\"><strong>Tip:</strong> Compare pipeline funnel with Win/Loss snapshot weekly to spot conversion drops.</div>",
            nav_html,
        ),
        "bid-requests.html": bb(
            "/sales/bidrequests", "Sales → Bid Requests",
            "Bid pipeline list with stage funnel, 12 summary charts, and create wizard.",
            "Sales · Bid Requests", "Bid Requests",
            "Full bid register with quick filters, SHOW/SORT, pipeline funnel diagram, and comprehensive summary analytics.",
            "<p><strong>Sales → Bid Requests</strong> (<code>/sales/bidrequests</code>) is the operational hub for presales opportunities from first intake through win or loss.</p>",
            "<p><strong>Header:</strong> Create, quick filter chips, SHOW, SORT, team selection, text filter, grid/list toggle.<br><strong>Summary:</strong> Pipeline funnel diagram + 12 chart panels.<br><strong>Register:</strong> Bid rows with stage, owner, study metadata.</p>",
            "<p><strong>Quick filters:</strong> All · Active · New · Assigned · In progress · Won · Lost · Deleted · Archived<br><strong>SHOW:</strong> All · Active · Archived · My bids · Favorite<br><strong>SORT:</strong> Due Date · Created · A–Z (toggle asc/desc)<br><strong>Filter list…</strong> · <strong>Team selection</strong> · <strong>Grid/List</strong> · <strong>Create</strong></p>",
            summary_section("Bid pipeline analytics refresh when SHOW, team, or search filters change.", sections=[{"heading": "Pipeline funnel", "html": funnel + "<p>Vertical stage funnel shows volume at each sales stage — widest stage = highest volume.</p>"}, {"heading": "Bid request summary charts", "spec": "sales_bid"}]),
            "<p>Click row for Bid Details. Create opens wizard: Study basics → Study setup → Screening → Additional → Quota (or Form mode).</p>",
            "<ol><li>Click Create → complete wizard steps.</li><li>Submit — bid appears in New stage.</li><li>Assign owner to move to Assigned.</li><li>Progress through In progress to Won/Lost.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Stale slice on Pipeline age donut → schedule follow-up or close dead opportunities.</div>",
            nav_html,
        ),
        "bid-details.html": bb(
            "/sales/bidrequest/:bidRequestId", "Sales → Bid Request Details",
            "Single bid view with study metadata, status transitions, and linked purchase orders.",
            "Sales · Bid Details", "Bid Details",
            "Full bid fields, study metadata, status workflow, linked POs — opened from list or View Bid Details sidebar.",
            "<p><code>/sales/bidrequest/:bidRequestId</code> — comprehensive record for one bid request including study setup, screening, quota, and ownership.</p>",
            "<p><strong>Hero:</strong> Bid ID, status, owner, account, study type.<br><strong>Body:</strong> Section cards for study basics, setup, screening, additional fields, quota.<br><strong>Sidebar:</strong> Quick actions, linked POs, status history.</p>",
            "<p>Status transitions via action buttons (New → Assigned → In progress → Won/Lost). No list-level SHOW/SORT on detail page.</p>",
            "<p>Detail may include inline statistics for this bid's stage history where configured.</p>",
            "<p>Update fields, change status, link/create purchase order from winning bid, open related projects.</p>",
            "<ol><li>Open from Bid Requests list.</li><li>Review study metadata sections.</li><li>Update status as bid progresses.</li><li>On Won, create or link Purchase Order.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> CRM linkage donut on list page shows Salesforce integration completeness — fix unlinked bids here.</div>",
            nav_html,
        ),
        "purchase-orders.html": bb(
            "/sales/purchaseorders", "Sales → Purchase Orders",
            "Contract register with delivery funnel and 11 summary chart panels.",
            "Sales · Purchase Orders", "Purchase Orders",
            "Purchase order list representing contracts that may link to bids and spawn delivery projects.",
            "<p><strong>Sales → Purchase Orders</strong> (<code>/sales/purchaseorders</code>) tracks signed contracts from creation through completion and closure.</p>",
            "<p><strong>Header:</strong> Create, quick filters, SHOW, SORT, team, text filter, grid/list.<br><strong>Summary:</strong> Delivery funnel + 11 chart panels.<br><strong>Register:</strong> PO rows with status, account, delivery team.</p>",
            "<p><strong>Quick filters:</strong> All · Active · New · Created · In progress · Completed · Closed · Deleted · Archived<br><strong>SHOW/SORT/team/filter/grid</strong> — same Lux list pattern as Bid Requests<br><strong>Create</strong> — PO wizard</p>",
            summary_section("Contract portfolio analytics for the filtered PO register.", sections=[{"heading": "Purchase order summary charts", "spec": "sales_po"}]),
            "<p>Create: Contract core → Client &amp; account → Delivery scope → References &amp; ownership. Link originating bid when applicable.</p>",
            "<ol><li>Create PO from list or from won bid.</li><li>Complete wizard steps.</li><li>Activate contract.</li><li>Create linked projects from PO detail.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> Delivery health donut flags overdue contracts — prioritize before client escalation.</div>",
            nav_html,
        ),
        "purchase-order-details.html": bb(
            "/sales/purchaseorder/:purchaseOrderId", "Sales → PO Details",
            "Contract detail with terms, delivery statistics, linked projects, and general info.",
            "Sales · PO Details", "Purchase Order Details",
            "Contract terms, delivery statistics charts, general info, linked projects — PO detail statistics include KPI donuts and bars.",
            "<p><code>/sales/purchaseorder/:purchaseOrderId</code> — single contract view with delivery progress and project linkage.</p>",
            "<p><strong>Hero:</strong> PO number, status, account, dates, value.<br><strong>Statistics panel:</strong> Contract-specific KPI donuts and bars.<br><strong>Sections:</strong> General info, delivery scope, linked bid, linked projects list.</p>",
            "<p>Status actions on hero. No list filters. Statistics panel scoped to this contract only.</p>",
            "<p>PO detail statistics panel includes contract-specific KPI donuts and bars for delivery health.</p>",
            "<p>Update contract fields, change status, create/open linked projects, trace back to originating bid.</p>",
            "<ol><li>Open from Purchase Orders list.</li><li>Review statistics panel for delivery health.</li><li>Create project from linked actions.</li><li>Monitor linked projects section for delivery progress.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Bid linkage donut on list page helps audit traceability — open PO detail to verify bid reference field.</div>",
            nav_html,
        ),
    }
    return specs[file_key]


def get_project_body(file_key, nav_html, page_id):
    bb = lambda *a, **kw: _page_body(page_id, nav_html, *a, **kw)
    specs = {
        "index.html": bb(
            "/project/*", "Project module (sidebar)",
            "Portfolio planning and delivery execution — projects, deliverables, work items, planner, and collaboration tools.",
            "Project module", "Project Overview",
            "Navigate from portfolio dashboards to delivery operations including taskboard, capacity planning, and collaboration tools.",
            "<p>The Project module is the execution core of the workspace. It connects sales outcomes to active delivery and day-to-day team coordination.</p><p>Use this index to jump into portfolio analytics, task execution pages, and collaboration utilities.</p>",
            module_index_grid(PROJECT_PAGES),
            "<p>Access <strong>Project</strong> in the main sidebar. Page visibility can vary by role for collaboration pages like File Manager and Chat.</p>",
            "<p>Overview page itself is navigational. Summary charts live on Project List, Taskboard, Task Activity, and Reports pages.</p>",
            "<p>Use the page index above or the left section menu to open detailed guides for each sub-page.</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>1. Portfolio check</strong><div class=\"step-detail\">Open Dashboard and Project List to understand current health.</div></div><div class=\"step\"><strong>2. Delivery execution</strong><div class=\"step-detail\">Use Deliverables, Work Items, and Taskboard to run daily work.</div></div><div class=\"step\"><strong>3. Planning &amp; collaboration</strong><div class=\"step-detail\">Use Team Capacity, Calendar, Notes, Chat, and File Manager.</div></div></div>",
            "<div class=\"tip\"><strong>Tip:</strong> For report exports, open <a href=\"reports.html\">Reports</a> from this module — dashboards answer trends while reports return row-level data.</div>",
            nav_html,
        ),
        "dashboard.html": bb(
            "/project/dashboard", "Project → Dashboard",
            "Personal and manager-level delivery analytics with lens switching and team scope controls.",
            "Project · Dashboard", "Project Dashboard",
            "Two perspectives: My projects for personal execution and Manager overview for portfolio-level decision making.",
            "<p><strong>Project → Dashboard</strong> is the analytics-first entry point for delivery teams. It combines KPI cards and chart panels for portfolio health.</p>",
            "<p><strong>Top:</strong> Header with tab/lens controls.<br><strong>Body:</strong> Responsive analytics cards and charts.<br><strong>Manager view:</strong> Team selector and lens switches (Executive/Delivery/Finance).</p>",
            "<p><strong>Period:</strong> 1M · 6M · 1Y · YTD · ALL<br><strong>Filter:</strong> All · Active · Overdue · At risk · Completed<br><strong>Lens:</strong> Executive · Delivery · Finance<br><strong>Team scope:</strong> Multi-team selector (permission-based)</p>",
            summary_section("Period, filter, lens, and team scope drive all panels below.", sections=[
                {"heading": "My projects tab", "spec": "project_dashboard_my"},
                {"heading": "Manager overview tab", "spec": "project_dashboard_manager"},
            ], extra="<p><strong>Lens switch:</strong> Executive · Delivery · Finance reshapes manager chart set. KPI cards may deep-link to Project List with filters applied.</p>"),
            "<p>Use KPI cards and chart interactions to identify bottlenecks, then drill into the Project List for filtered operational records.</p>",
            "<div class=\"steps\"><div class=\"step\"><strong>Personal review</strong><div class=\"step-detail\">Open My projects tab and inspect workload trend + variance panels.</div></div><div class=\"step\"><strong>Manager review</strong><div class=\"step-detail\">Switch to Manager overview → pick lens and team scope → flag at-risk projects.</div></div></div>",
            "<div class=\"note\"><strong>Tip:</strong> Certain KPI cards pre-seed list filters and open Project List directly for follow-up action.</div>",
            nav_html,
        ),
        "project-list.html": bb(
            "/project/list", "Project → Project List",
            "Portfolio register with quick filters, list/grid views, and comprehensive summary analytics.",
            "Project · Portfolio", "Project List",
            "Primary project register with chips, sort controls, and chart-backed summary strip for portfolio health.",
            "<p><strong>Project List</strong> is the operational table for all delivery projects. It combines detailed rows with a broad summary layer to speed decisions.</p>",
            "<p><strong>Header:</strong> Create, quick chips, SHOW/SORT, team/date filters, text search, list/grid toggle.<br><strong>Summary:</strong> KPI cards, delivery funnel, stage flow, estimate gaps, and charts.<br><strong>Body:</strong> Table/grid of projects with status, account, team, schedule, and estimates.</p>",
            "<p><strong>Quick chips:</strong> All · Active · Archived · My projects · Favorite · New · In progress · Completed<br><strong>SHOW:</strong> All · Active · Archived · My Projects · Favorite<br><strong>SORT:</strong> Due Date · Est Start · Created · A–Z</p>",
            summary_section("Seventeen portfolio charts — click estimate gaps list when Hours estimated donut shows missing data.", sections=[{"heading": "Project list summary charts", "spec": "project_list"}]),
            "<p>Click a row to open Project Details. Use combined chips + filters + search to isolate high-risk subsets before taking action.</p>",
            "<ol><li>Pick quick chip (for example, Active).</li><li>Set team/date filters and search text.</li><li>Review charts and funnel for bottlenecks.</li><li>Open a target project from the filtered list.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> Watch <em>Timeline health</em> and <em>Hours estimated</em> panels together to catch overdue projects with missing planning data.</div>",
            nav_html,
        ),
        "project-details.html": bb(
            "/project/details/:projectId", "Project → Details",
            "Single-project workspace with tabbed sections for overview, team, files, calendar, activity, and feedback.",
            "Project · Details", "Project Details",
            "Deep-dive page for one project including metadata, team, activity, attachments, and delivery-linked tabs.",
            "<p>Open from Project List at route <code>/project/details/:projectId</code>. This page is the command center for a specific project.</p>",
            "<p><strong>Hero:</strong> Project title, status, key dates, estimate summary.<br><strong>Tabs:</strong> Overview, Dashboard, Activity, Team, Files, Calendar, Alerts, Deliverables, Feedback.<br><strong>Side actions:</strong> Edit/update fields (permission-based).</p>",
            "<p>No list-level SHOW/SORT controls on detail pages. Navigation is tab-based and scoped to the selected project.</p>",
            "<p>Charts are project-scoped in the Dashboard tab and activity sections; they summarize only this project's records.</p>",
            "<p>Use tabs to manage full lifecycle: metadata, members, work artifacts, schedule, communications, and stakeholder feedback.</p>",
            "<ol><li>Open project from list.</li><li>Review Overview and Dashboard for current state.</li><li>Open Deliverables and Activity to drive execution.</li><li>Use Team/Files/Calendar for coordination.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Read-only rendering appears when cross-team visibility allows viewing but not editing.</div>",
            nav_html,
        ),
        "deliverables.html": bb(
            "/project/deliverables/:projectId", "Project → Deliverables",
            "Deliverable register for a project with status tracking, assignment, and estimate comparisons.",
            "Project · Delivery Units", "Deliverables",
            "Manage project deliverables (tasks) before drilling into granular work items.",
            "<p>Deliverables sit between projects and work items in the hierarchy. They define accountable outputs and timeline checkpoints.</p>",
            "<p><strong>Header:</strong> Create deliverable, filters, sort, search.<br><strong>Body:</strong> Deliverable list with owners, status, dates, estimates.<br><strong>Actions:</strong> Open detail or work items for execution tracking.</p>",
            "<p>Common controls include status chips and text filter. Exact controls depend on project configuration and role permissions.</p>",
            "<p>Summary section may include status and estimate-vs-actual indicators for the current project's deliverables.</p>",
            "<p>Open a deliverable to manage checklist, comments, and downstream work items.</p>",
            "<ol><li>Create or open deliverable.</li><li>Assign owner and due dates.</li><li>Track status changes and estimate variance.</li><li>Open Work Items for detailed execution.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Keep deliverable estimates updated — downstream utilization and planner analytics depend on them.</div>",
            nav_html,
        ),
        "deliverable-details.html": bb(
            "/project/deliverable/:taskId", "Project → Deliverable Details",
            "Detailed deliverable workspace with checklist, comments, schedule context, and linked work items.",
            "Project · Delivery Unit", "Deliverable Details",
            "Single deliverable page for execution management and collaboration around one output.",
            "<p>Opened from Deliverables list, this view centralizes status, ownership, checklist progress, and related activity.</p>",
            "<p><strong>Header:</strong> Deliverable title, status, owner, due dates.<br><strong>Sections:</strong> Metadata, checklist, comments/notes, linked work items, timeline snippets.</p>",
            "<p>Controls are action-oriented (edit, status transition, assign) instead of list-level SHOW/SORT filters.</p>",
            "<p>Progress indicators summarize checklist completion and effort roll-up from linked work items.</p>",
            "<p>Use this page to coordinate execution details and quickly open or create linked work items.</p>",
            "<ol><li>Open deliverable.</li><li>Update checklist and status.</li><li>Review linked work items and time.</li><li>Log blockers/notes for team visibility.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Keep checklist states current to improve Task Activity and planner signal quality.</div>",
            nav_html,
        ),
        "work-items.html": bb(
            "/project/workitems/:taskId", "Project → Work Items",
            "Granular activity register under a deliverable, tied directly to timesheet and planner workflows.",
            "Project · Execution", "Work Items",
            "Track fine-grained activities including assignees, statuses, estimates, and logged effort.",
            "<p>Work items are the smallest planned unit under a deliverable and typically map to daily execution and time logging.</p>",
            "<p><strong>Header:</strong> Create work item, filters, sorting, search.<br><strong>Body:</strong> Work item rows with type, priority, owner, duration, and status.</p>",
            "<p>Use status/priority filters and team selections where available to focus execution queues.</p>",
            "<p>Activity-level charts and popovers can show logged vs planned hour patterns for selected records.</p>",
            "<p>Use row actions to update status, assign team members, and open detailed activity records.</p>",
            "<ol><li>Create work item from deliverable context.</li><li>Assign owner and due date.</li><li>Track progress in Taskboard and Task Activity.</li><li>Log time via web/mobile timesheet.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> Missing priorities on work items reduce planner quality and overload detection accuracy.</div>",
            nav_html,
        ),
        "accounts.html": bb(
            "/project/accounts", "Project → Accounts",
            "Hierarchical account directory with data-quality and linkage analytics.",
            "Project · Directory", "Accounts",
            "Manage account/team/client hierarchy and monitor completeness through quality-centric charts.",
            "<p>The Accounts page stores organizational context used by projects and reporting. Healthy account data improves list filters and analytics grouping.</p>",
            "<p><strong>Header:</strong> Type chips, quality chips, search, sort.<br><strong>Body:</strong> Account hierarchy/list with owners and metadata.</p>",
            "<p><strong>Type chips:</strong> All · Accounts · Teams · Clients · Salesforce<br><strong>Quality chips:</strong> Needs attention · Complete only · Missing teams/clients/email · No owner · No description</p>",
            "<p>Summary analytics emphasize data quality: health mix, issue categories, hierarchy coverage, source split, and billing type distribution.</p>",
            "<p>Open records to maintain hierarchy and required metadata fields.</p>",
            "<ol><li>Start with Needs attention chip.</li><li>Fix missing owner/email/description issues.</li><li>Review hierarchy coverage chart.</li><li>Validate Salesforce-linked records.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Resolve <em>missing teams/clients</em> first; those gaps impact downstream project/account dashboards most.</div>",
            nav_html,
        ),
        "taskboard.html": bb(
            "/project/taskboard", "Project → Taskboard",
            "Kanban board for personal or team execution across workflow stages.",
            "Project · Execution Board", "Task Board",
            "Drag-and-drop workflow board with summary visuals and card-level detail actions.",
            "<p>Taskboard is ideal for day-to-day progress management. It visualizes task movement through delivery stages.</p>",
            "<p><strong>Columns:</strong> Planned → To do → In progress → Done.<br><strong>Body:</strong> Cards with status colors, metadata, and quick actions.</p>",
            "<p>Use employee/board selectors and filter controls where available to scope the board.</p>",
            summary_section("Kanban flow analytics scoped to board filters.", sections=[{"heading": "Taskboard charts", "spec": "taskboard"}]),
            "<p>Drag cards between columns (permission-based) and open card details for deeper edits and completion workflows.</p>",
            "<ol><li>Select board/employee.</li><li>Review funnel and workflow mix.</li><li>Move cards through columns.</li><li>Open details for notes/checklist completion.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> A widening <em>Planned</em> column with flat <em>Done</em> counts indicates intake outpacing delivery.</div>",
            nav_html,
        ),
        "task-activity.html": bb(
            "/project/activites", "Project → Task Activity",
            "Calendar-oriented activity tracking with pending/active registers and assignment workflows.",
            "Project · Activity Calendar", "Task Activity",
            "Month view and activity registers that combine scheduling context with execution analytics.",
            "<p>Task Activity connects calendar scheduling with actual activity execution, including assignment and checklist progress.</p>",
            "<p><strong>Top:</strong> Month controls and holiday context.<br><strong>Body:</strong> Pending/active activity tables and assignment panels.</p>",
            "<p>Use month/date scope, status filters, and search controls to focus operational windows.</p>",
            summary_section("Work item analytics for the filtered activity register.", sections=[{"heading": "Activity summary charts", "spec": "task_activity"}]),
            "<p>Open activity records for detail, update outcomes, and assign work directly from this page context.</p>",
            "<ol><li>Select month and date scope.</li><li>Review pending activities.</li><li>Use assign panel for ownership updates.</li><li>Track outcome and checklist completion.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Monitor checklist and outcome panels together to spot blocked tasks before due dates slip.</div>",
            nav_html,
        ),
        "team-capacity.html": bb(
            "/project/capacity", "Project → Team Capacity",
            "Resource planning workspace with overview, roster, timeline, and Gantt planning modes.",
            "Project · Resource Planning", "Team Capacity",
            "Plan and rebalance team load using utilization charts, heatmaps, timeline views, and assignment controls.",
            "<p>Team Capacity is the planning cockpit for staffing and overload management. It works across people, projects, and date ranges.</p>",
            "<p><strong>Tabs:</strong> Overview · Team roster · Timeline · Gantt.<br><strong>Planner controls:</strong> horizon weeks, status filters, team scope, capacity settings, attention filters.</p>",
            "<p><strong>Key controls:</strong> Status filter · Team selection · View mode TASKS · Timesheet actuals overlay · Capacity overrides</p>",
            "<ul><li>Overview: utilization bar, assignment status donut, daily load dual-area, free-capacity ranking.</li><li>Roster: people × days intensity heatmap.</li><li>Timeline/Gantt: schedule sequencing and conflict detection.</li></ul>",
            "<p>Use assign panel to place work and resolve conflicts when capacity thresholds are exceeded.</p>",
            "<ol><li>Set planning horizon and team scope.</li><li>Check utilization and free capacity panels.</li><li>Assign or rebalance work from timeline/Gantt.</li><li>Resolve conflicts via planner modal.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> Values above 100% utilization indicate overbooking — use attention filters to triage first.</div>",
            nav_html,
        ),
        "reports.html": bb(
            "/project/reports", "Project → Reports",
            "Tabular reporting workspace for utilization, delivery, and operational exports.",
            "Project · Reporting", "Reports",
            "Run permission-scoped reports with date/team filters and export result tables.",
            "<p>Reports complements dashboard visuals by returning row-level data for audit, export, and analysis workflows.</p>",
            "<p><strong>Header:</strong> REPORT selector, date range, team scope, text filter, run/export actions.<br><strong>Body:</strong> Result table with pagination where applicable.</p>",
            "<p><strong>Filters:</strong> Report type · Date range · Team selection · Filter list text</p>",
            summary_section("Reports use date/team scope — not Apex charts but operational outputs.", sections=[{"heading": "Available reports", "html": render_report_catalog()}]),
            "<p>Use the Create Report Config panel to save frequently used combinations for weekly or monthly routines.</p>",
            "<ol><li>Select report type.</li><li>Set date and team scope.</li><li>Run/View report.</li><li>Download export file.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Reports unavailable to your role are intentionally hidden from the dropdown.</div>",
            nav_html,
        ),
        "feedback.html": bb(
            "/project/feedback", "Project → Feedback",
            "Feedback templates, campaigns, and response tracking for project stakeholders.",
            "Project · Stakeholder Input", "Feedback",
            "Manage feedback templates and campaigns with response visibility across projects.",
            "<p>Feedback workflows collect structured stakeholder input and can be launched from module-level page or project details.</p>",
            "<p><strong>Header:</strong> Create/configure actions, filters, search.<br><strong>Body:</strong> Templates/campaign list and summary indicators.</p>",
            "<p>Use campaign status and date filters where available to focus active collection windows.</p>",
            "<p>Summary cards typically highlight active campaigns, response rates, and pending requests.</p>",
            "<p>Launch campaigns and share external document routes for respondents who do not need full app access.</p>",
            "<ol><li>Create or edit feedback template.</li><li>Launch campaign for project/stakeholder set.</li><li>Track responses and follow up.</li><li>Review project detail Feedback tab for context.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Keep question sets concise; shorter templates usually improve response completion rates.</div>",
            nav_html,
        ),
        "notes.html": bb(
            "/project/todolist", "Project → Notes",
            "Quick-capture notes and personal team reminders integrated with the workspace.",
            "Project · Personal Productivity", "Notes",
            "Capture lightweight tasks and reminders without leaving project workflows.",
            "<p>Notes is a fast utility for personal reminders and lightweight follow-ups adjacent to formal deliverables.</p>",
            "<p><strong>Body:</strong> Notes list grouped by completion state.<br><strong>Actions:</strong> Create/edit notes via Lux editor modal; toggle completion.</p>",
            "<p>Simple text filtering and status grouping are the primary controls.</p>",
            "<p>No heavy chart strip; emphasis is quick capture and retrieval.</p>",
            "<p>Use the icon rail note overlay for capture from any screen and manage full list on Notes page.</p>",
            "<ol><li>Create quick note.</li><li>Update status as work progresses.</li><li>Promote complex notes into formal deliverables when needed.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Notes are best for reminders; use Deliverables/Work Items for trackable delivery commitments.</div>",
            nav_html,
        ),
        "calendar.html": bb(
            "/project/calendar", "Project → Calendar",
            "Calendar views for personal/team scheduling with status filters and event detail panels.",
            "Project · Scheduling", "Calendar",
            "Coordinate events and work schedules through week-focused calendar interfaces.",
            "<p>Calendar centralizes schedule visibility across user and project contexts and supports filter-driven planning.</p>",
            "<p><strong>Views:</strong> Week-focused calendar with side controls.<br><strong>Panels:</strong> Event detail panel and sidebar filters/navigation.</p>",
            "<p>Controls include status filter, search, and date navigation.</p>",
            "<p>Summary indicators provide event volume and status snapshots for the visible window.</p>",
            "<p>Click events to open details and coordinate follow-up with related project/task records.</p>",
            "<ol><li>Choose week/date range.</li><li>Apply status filters.</li><li>Open event details and update as needed.</li><li>Cross-check task activity for execution alignment.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Use calendar with Task Activity to balance schedule commitments against real activity load.</div>",
            nav_html,
        ),
        "file-manager.html": bb(
            "/project/filemanager", "Project → File Manager",
            "Workspace file navigation with folder hierarchy, filters, sorting, and sharing context.",
            "Project · Documents", "File Manager",
            "Manage project-related files with list/grid views, type filters, and pagination.",
            "<p>File Manager is an access-controlled page for browsing and organizing workspace files.</p>",
            "<p><strong>Layout:</strong> Folder tree, breadcrumb, and content panel.<br><strong>Views:</strong> List and grid.<br><strong>Controls:</strong> SHOW and SORT with pagination.</p>",
            "<p><strong>SHOW:</strong> All · Folders · Files · Shared · Mine<br><strong>SORT:</strong> Name · Date · Size</p>",
            "<p>Summary KPIs provide storage and type distribution context for current scope.</p>",
            "<p>Use folder navigation and filters to quickly locate files, then open from project detail Files tab when scoped to a single project.</p>",
            "<ol><li>Navigate folder hierarchy.</li><li>Apply SHOW/SORT filters.</li><li>Switch list/grid as needed.</li><li>Open or manage files in current scope.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> If the page is hidden from navigation, your role does not currently include file manager access.</div>",
            nav_html,
        ),
        "chat.html": bb(
            "/project/chat", "Project → Chat",
            "Internal messaging with contact lists, group threads, and integrated header previews.",
            "Project · Communication", "Chat",
            "Coordinate with teammates through threaded messaging and conversation panels.",
            "<p>Chat provides workspace messaging for project coordination and quick context exchange.</p>",
            "<p><strong>Layout:</strong> Conversation list on left, message thread on right.<br><strong>Entry points:</strong> Full chat page and header recent-threads dropdown.</p>",
            "<p>Thread selection and search controls help narrow active conversations.</p>",
            "<p>Unread/recent indicators surface conversation activity; no heavy chart analytics on this page.</p>",
            "<p>Open thread, review context, post updates, and continue delivery coordination without leaving the workspace.</p>",
            "<ol><li>Select contact or group.</li><li>Review recent thread history.</li><li>Post updates and action clarifications.</li><li>Use full page for sustained collaboration.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Use project IDs in messages to improve searchability and traceability.</div>",
            nav_html,
        ),
        "search.html": bb(
            "/project/search", "Project → Global Search",
            "Workspace-wide search across projects, tasks, and related records with permission-aware results.",
            "Project · Discovery", "Global Search",
            "Find entities quickly when exact location is unknown, instead of browsing multiple lists.",
            "<p>Global Search indexes records you can access and is optimized for quick cross-module lookup.</p>",
            "<p><strong>Input:</strong> Header search entry.<br><strong>Output:</strong> Result groups with navigable links into projects, tasks, and related entities.</p>",
            "<p>Search is permission-aware; inaccessible records are not returned.</p>",
            "<p>Result grouping and relevance help prioritize exact title matches and keyword-adjacent hits.</p>",
            "<p>Open result links directly to destination pages and continue with scoped operational actions.</p>",
            "<ol><li>Type at least 2 characters in search.</li><li>Review grouped results.</li><li>Open destination page from result item.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Include project ID fragments or account keywords for fastest high-confidence matches.</div>",
            nav_html,
        ),
    }
    return specs[file_key]


def get_mobile_body(file_key, nav_html, page_id):
    bb = lambda *a, **kw: _page_body(page_id, nav_html, *a, **kw)
    specs = {
        "index.html": bb(
            "/mobile/*", "Mobile module (sidebar)",
            "Android companion app for tasks, insights, projects, and timesheet recording.",
            "Mobile module", "Mobile Overview",
            "End-to-end guide for install, login, navigation, task execution, insights, and time recording on mobile.",
            "<p>The mobile app mirrors core web workflows with a touch-first interface and secure device registration options.</p>",
            module_index_grid(MOBILE_PAGES),
            "<p>Open the pages below for login methods, hub navigation, insights charts, and mobile timesheet details.</p>",
            "<p>Overview page is a navigator; analytics are documented on the Insights page.</p>",
            "<p>Use module cards or sidebar to jump to specific mobile workflows.</p>",
            "<ol><li>Register device and login.</li><li>Use Tasks/Insights/Projects hubs.</li><li>Record time from weekly timesheet and day record screens.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> Mobile timesheet access windows follow the same permission rules as web.</div>",
            nav_html,
        ),
        "login.html": bb(
            "/mobile/login", "Mobile → Login & Registration",
            "Credential, PIN, biometric, and QR registration flows for secure mobile access.",
            "Mobile · Authentication", "Login & Registration",
            "Three login modes plus first-time registration flow with mandatory PIN setup and optional biometrics.",
            "<p>Login hub includes User Login, 4 Digit PIN, and Biometric tabs depending on registration state.</p>",
            "<p><strong>Flow:</strong> Splash → Login hub → first auth → PIN setup → biometric optional → Tasks hub.</p>",
            "<p><strong>Tabs:</strong> User Login (always), PIN (after setup), Biometric (device support + PIN setup).<br><strong>QR scanner:</strong> Reads device registration payload from web-generated QR.</p>",
            "<p>No chart strip; this page is process-focused around authentication and registration states.</p>",
            "<p>Logout clears session token but preserves device registration and PIN state.</p>",
            "<ol><li>Login with credentials or QR registration.</li><li>Set mandatory 4-digit PIN.</li><li>Enable biometrics (optional).</li><li>Land on Tasks hub.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> On biometric failure, users can always fall back to PIN login.</div>",
            nav_html,
        ),
        "tasks.html": bb(
            "/mobile/tasks", "Mobile → Tasks Hub",
            "Default mobile home for day-focused task execution with chips and search.",
            "Mobile · Execution", "Tasks Hub",
            "Task cards, day strip filtering, status chips, and bottom-sheet details for mobile execution.",
            "<p>Tasks hub is the default landing after mobile login and focuses on daily activity visibility.</p>",
            "<p><strong>Top controls:</strong> Work module bar, week range, day strip.<br><strong>Filters:</strong> Search and chips (Completed, Ongoing, Assigned, All).<br><strong>Body:</strong> Task cards and detail sheet.</p>",
            "<p>Search applies when query length is sufficient; chips switch status scopes quickly.</p>",
            "<p>Compact stats appear in task cards and detail sheets; deeper analytics are available in Insights hub.</p>",
            "<p>Tap a task card to open details and review identifiers, schedule, people, and duration.</p>",
            "<ol><li>Pick day from strip.</li><li>Filter by chip/search.</li><li>Open card details.</li><li>Switch hubs from module bar as needed.</li></ol>",
            "<div class=\"note\"><strong>Tip:</strong> Ongoing includes all non-completed states, not only explicit In progress tasks.</div>",
            nav_html,
        ),
        "insights.html": bb(
            "/mobile/dashboard", "Mobile → Insights",
            "Mobile analytics dashboard for timesheet, day activity, week trends, and portfolio views.",
            "Mobile · Analytics", "Insights Dashboard",
            "Four analytics sections: Time & utilization, Selected day, Week trends, and Portfolio.",
            "<p>Insights surfaces quick decision data on mobile while reusing the same weekly/day scope controls as other hubs.</p>",
            "<p><strong>Sections:</strong> Time &amp; utilization, Selected day, Week trends, Portfolio.<br><strong>Top summary:</strong> Recorded, billable, utilization, non-billable, leave metrics.</p>",
            "<p>Week range and day strip drive all calculations; pull-to-refresh updates data in place.</p>",
            summary_section("Mobile Insights personal analytics — swipe sections for additional chart groups.", sections=[{"heading": "Time & utilization chart set", "spec": "mobile_insights_time"}], extra="<p><strong>Additional sections:</strong> status donuts, priority bars, planned-vs-logged dual lines, and portfolio splits.</p>"),
            "<p>Use selected-day and week-trend sections together to compare immediate execution versus weekly outcomes.</p>",
            "<ol><li>Set target week.</li><li>Select day for day-level insights.</li><li>Scan utilization and trend charts.</li><li>Switch to Projects/Tasks to act.</li></ol>",
            "<div class=\"tip\"><strong>Tip:</strong> A low billable-target gauge with high planned-vs-logged gap usually signals scheduling slippage.</div>",
            nav_html,
        ),
        "projects.html": bb(
            "/mobile/projects", "Mobile → Projects Hub",
            "Portable project register with chips, search, and bottom-sheet project details.",
            "Mobile · Portfolio", "Projects Hub",
            "Access project data in the field with quick filters and compact project detail sheets.",
            "<p>Projects hub gives lightweight portfolio access optimized for mobile navigation and quick context lookup.</p>",
            "<p><strong>Controls:</strong> Search + chips (Active, Archive, My projects, Favorites).<br><strong>Body:</strong> Scrollable table/list with key columns and row detail sheet.</p>",
            "<p>Search supports project name, account, or identifier fragments.</p>",
            "<p>Summary cues are intentionally compact on mobile; deep portfolio analytics remain in web Project Dashboard/List.</p>",
            "<p>Tap any row to open a project detail sheet with expanded fields.</p>",
            "<ol><li>Apply chip filter.</li><li>Search for target project.</li><li>Open row detail sheet.</li><li>Switch to web for full-edit workflows if needed.</li></ol>",
            "<div class=\"info\"><strong>Tip:</strong> Use Favorites for recurring field references to reduce search time.</div>",
            nav_html,
        ),
        "timesheet.html": bb(
            "/mobile/home", "Mobile → Timesheet & Record",
            "Weekly timesheet and day-level record screens for billable, non-billable, and leave entries.",
            "Mobile · Time Entry", "Timesheet & Record",
            "Record time with week navigation, day entry forms, and access-controlled date validation.",
            "<p>Timesheet on mobile mirrors web policy: users record weekly hours through day-level forms with strict date/access checks.</p>",
            "<p><strong>Weekly screen:</strong> Week navigation, summary metrics, day rows.<br><strong>Record screen:</strong> Billable, non-billable, leave sections with dynamic dropdowns.</p>",
            "<p>Days outside access policy are disabled. Hours format accepts <code>H</code> or <code>H.MM</code> (minutes in MM).</p>",
            "<p>Summary header shows recorded and category totals aligned with Insights metrics for the same week.</p>",
            "<p>Open timesheet via FAB from any hub; select day row to add or edit entries.</p>",
            "<ol><li>Open weekly timesheet.</li><li>Navigate to target week.</li><li>Select day and entry type.</li><li>Submit hours and review totals.</li></ol>",
            "<div class=\"warning\"><strong>Tip:</strong> If entry is blocked, check timesheet access window rules in Admin settings.</div>",
            nav_html,
        ),
    }
    return specs[file_key]


def generate_module(module_key, title, pages, body_fn, active_top, custom_pages=None):
    custom_pages = custom_pages or {}
    created = []
    sidebar = [{"title": title}] + [{"file": x["file"], "href": x["href"], "label": x["label"]} for x in pages]
    for idx, page in enumerate(pages):
        if page["file"] in custom_pages:
            created.append(write(f"{module_key}/{page['file']}", custom_pages[page["file"]]))
            continue
        nav_html = nav_for_pages(pages, idx)
        body = body_fn(page["file"], nav_html, f"{module_key}/{page['file']}")
        breadcrumb = f'<a href="../index.html">Home</a> → {title}' + ("" if page["file"] == "index.html" else f' → {page["label"]}')
        html = render(
            1,
            page["label"],
            breadcrumb,
            sidebar,
            body,
            active_top=active_top,
            active_sidebar=page["file"],
            current_module=module_key,
        )
        created.append(write(f"{module_key}/{page['file']}", html))
    return created


def update_root_nav(active_key):
    keys = {
        "home": "",
        "gs": "",
        "hrms": "",
        "sales": "",
        "project": "",
        "mobile": "",
        "iface": "",
        "charts": "",
        "admin": "",
    }
    if active_key in keys:
        keys[active_key] = ' class="active"'
    return ROOT_NAV_HTML.format(**keys)


def root_sidebar(items, title="On this page"):
    return [{"title": title}] + [{"file": i["href"], "href": i["href"], "label": i["label"]} for i in items]


def generate_index():
    created = []
    index_callouts = render_callouts([
        ("info", "How to use this guide",
         "Each app screen has its own page. Start with <strong>Overview</strong>, then read "
         "<strong>Summary section &amp; charts</strong> for every analytics panel, "
         "<strong>Complete feature list</strong> for controls, and "
         "<strong>Common mistakes</strong> before your first workflow."),
        ("tip", "Search the guide",
         "Use the header search box to find topics across all 38+ screen pages — "
         "try “utilization”, “taskboard”, or “purchase order”."),
        ("success", "New users start here",
         "Read <a href=\"getting-started.html\">Getting Started</a> first, then open your module index "
         "(HRMS, Project, or Sales) and bookmark the screens you use daily."),
    ])
    index_concepts = render_concepts([
        ("Summary strip", "Collapsible KPI and chart row at the top of list screens — expand for analytics, collapse for a wider register."),
        ("SHOW / SORT / Filter", "Standard Lux list header: status presets, sort order, text search, and team scope."),
        ("Per-chart cards", "Each summary chart is documented with what it measures, how to read it, and when to act."),
        ("Complete features", "Checklist of every button, tab, modal, and workflow on that screen."),
        ("Rich callouts", "Info, tips, warnings, and FAQs on every page — read “Before you start” and “Common mistakes”."),
    ])
    index_faq = render_faq([
        ("Which module should I open first?", "Depends on your role: delivery staff → Project + HRMS Timesheet; managers → Project Dashboard + Team capacity; sales → Bid Requests; HR → Employees + Attendance."),
        ("Does mobile match the web app?", "Yes — timesheet rules, task updates, and insights charts follow the same permissions and data as Luxury UI web. See the Mobile module index."),
        ("Where are chart types explained?", "Each screen page documents its own charts. For chart-type reference (donut, funnel, etc.), see <a href=\"charts.html\">Charts Reference</a>."),
        ("Who can change my permissions?", "Your Tracopus workspace administrator — documented in <a href=\"admin.html\">Admin &amp; Access</a>."),
    ])
    body = f"""
<section class="section">
  <div class="page-hero">
    <div class="eyebrow">User Guide · Luxury UI</div>
    <h2>Welcome to <span data-brand>Tracopus</span></h2>
    <p>A complete, page-by-page guide to the Luxury UI — projects, timesheets, sales pipelines, charts, and the companion mobile app. Each screen documents the <strong>summary section</strong> (every chart explained), a <strong>complete feature list</strong>, routes, filters, workflows, FAQs, and practical callouts.</p>
  </div>
  {index_callouts}
  <div class="module-section">
    <h3>📚 Module indexes</h3>
    <p>Every screen has its own guide page with Overview, layout, filters, per-chart summary cards, complete features, permissions tables, common mistakes, FAQ, and related links.</p>
  </div>
  <h3 class="subheading">Guide structure — key concepts</h3>
  {index_concepts}

  <div class="page-index-grid">
    <a class="page-index-card" href="hrms/index.html"><strong>HRMS</strong><span>9 pages — dashboard, timesheet, attendance…</span></a>
    <a class="page-index-card" href="sales/index.html"><strong>Sales</strong><span>5 pages — bids, purchase orders…</span></a>
    <a class="page-index-card" href="project/index.html"><strong>Project</strong><span>18 pages — dashboard, taskboard, reports…</span></a>
    <a class="page-index-card" href="mobile/index.html"><strong>Mobile</strong><span>6 pages — login, tasks, timesheet…</span></a>
  </div>

  <h3 style="margin-top:2rem;">📖 Reference guides</h3>
  <div class="page-index-grid">
    <a class="page-index-card" href="getting-started.html"><strong>Getting Started</strong><span>Login, SSO, navigation, core concepts</span></a>
    <a class="page-index-card" href="interface.html"><strong>Luxury Interface</strong><span>Shell, themes, palettes, wizards</span></a>
    <a class="page-index-card" href="charts.html"><strong>Charts Reference</strong><span>Donut, bar, area, funnel, mobile</span></a>
    <a class="page-index-card" href="admin.html"><strong>Admin &amp; Access</strong><span>Permissions, config, timesheet rules</span></a>
  </div>

  <h3>🎯 Quick start paths</h3>
  <div class="steps">
    <div class="step"><strong>Log time</strong><div class="step-detail">Web: <a href="hrms/timesheet.html">HRMS → Timesheet</a>. Mobile: FAB → Record day.</div></div>
    <div class="step"><strong>Manage projects</strong><div class="step-detail"><a href="project/dashboard.html">Project Dashboard</a> → <a href="project/project-list.html">Project List</a>.</div></div>
    <div class="step"><strong>Plan capacity</strong><div class="step-detail"><a href="project/team-capacity.html">Team capacity</a> — Overview, Roster, Timeline, Gantt.</div></div>
    <div class="step"><strong>Track sales</strong><div class="step-detail"><a href="sales/bid-requests.html">Bid Requests</a> or <a href="sales/purchase-orders.html">Purchase Orders</a>.</div></div>
  </div>

  <div class="info"><strong>💡 Tip:</strong> Use the search box in the header to find topics across all guides.</div>

  <section class="section" id="faq" style="margin-top:1.5rem;padding:1.25rem 0 0;border-top:1px solid var(--border-color);">
    <h3>Frequently asked questions</h3>
    {index_faq}
  </section>

  <div class="palette-section">
    <h4>🎨 Documentation theme palette</h4>
    <p style="font-size:0.875rem;color:var(--text-light);margin-bottom:0;">Default: <strong>Emerald</strong> Luxury UI. Preview other color moods — saved locally as <code>docs-lux-palette</code>.</p>
    <div id="palette-grid" class="palette-grid"></div>
  </div>
</section>"""
    sidebar = root_sidebar(
        [
            {"href": "getting-started.html", "label": "Getting Started"},
            {"href": "hrms/index.html", "label": "HRMS"},
            {"href": "sales/index.html", "label": "Sales"},
            {"href": "project/index.html", "label": "Project"},
            {"href": "mobile/index.html", "label": "Mobile"},
            {"href": "charts.html", "label": "Charts"},
            {"href": "admin.html", "label": "Admin"},
        ],
        title="Quick links",
    )
    created.append(
        write(
            "index.html",
            render(
                0,
                "Complete Documentation",
                '<a href="index.html">Home</a>',
                sidebar,
                body,
                active_top="index.html",
                active_sidebar="",
            ),
        )
    )
    return created


def generate_simple_root(file_name, title, active_top, body_html, links):
    sidebar = root_sidebar(links)
    return write(
        file_name,
        render(
            0,
            title,
            f'<a href="index.html">Home</a> → {title}',
            sidebar,
            body_html,
            active_top=active_top,
            active_sidebar=file_name,
        ),
    )


def patch_manual_root_nav():
    """Insert FAQ link in hand-maintained root pages that are not regenerated."""
    pages = {
        "getting-started.html": {"home": "", "gs": ' class="active"', "hrms": "", "sales": "", "project": "", "mobile": "", "iface": "", "charts": "", "faq": "", "admin": ""},
        "interface.html": {"home": "", "gs": "", "hrms": "", "sales": "", "project": "", "mobile": "", "iface": ' class="active"', "charts": "", "faq": "", "admin": ""},
        "charts.html": {"home": "", "gs": "", "hrms": "", "sales": "", "project": "", "mobile": "", "iface": "", "charts": ' class="active"', "faq": "", "admin": ""},
        "admin.html": {"home": "", "gs": "", "hrms": "", "sales": "", "project": "", "mobile": "", "iface": "", "charts": "", "faq": "", "admin": ' class="active"'},
    }
    nav_tpl = """<nav>
  <div class="container">
    <ul>
""" + ROOT_NAV_HTML + """
    </ul>
  </div>
</nav>"""
    for fname, keys in pages.items():
        path = os.path.join(ROOT, fname)
        if not os.path.isfile(path):
            continue
        with open(path, encoding="utf-8") as f:
            html = f.read()
        new_nav = nav_tpl.format(**keys)
        html = re.sub(r"<nav>.*?</nav>", new_nav, html, count=1, flags=re.DOTALL)
        html = re.sub(r"\?v=20260603[a-f]", f"?v={DOCS_ASSET_VERSION}", html)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)


def build_faq_search_entries():
    """Individual FAQ Q&A rows for documentation search (in-app help + docs site)."""
    from _site_faq import SITE_FAQ_CATEGORIES

    entries = []
    for cat in SITE_FAQ_CATEGORIES:
        for i, (question, answer) in enumerate(cat["items"]):
            plain = re.sub(r"<[^>]+>", "", answer)
            plain = re.sub(r"\s+", " ", plain).strip()
            words = re.sub(r"[^\w\s]", " ", question.lower()).split()
            entries.append({
                "title": question,
                "url": f"faq/index.html#faq-q-{cat['id']}-{i}",
                "description": plain[:180] if plain else cat["title"],
                "keywords": [w for w in words if len(w) > 2][:10] + [cat["title"].lower()],
            })
    return entries


def build_search_meta():
    entries = [
        {"title": "Home", "url": "index.html", "description": "Documentation home and navigation", "keywords": ["home", "overview", "guide"]},
        {"title": "Getting Started", "url": "getting-started.html", "description": "Login, SSO, onboarding basics", "keywords": ["login", "sso", "password", "basics"]},
        {"title": "Luxury Interface", "url": "interface.html", "description": "Shell layout, themes, and palettes", "keywords": ["interface", "theme", "palette", "navigation"]},
        {"title": "Charts", "url": "charts.html", "description": "Chart type reference", "keywords": ["charts", "analytics", "donut", "bar", "area"]},
        {"title": "Admin", "url": "admin.html", "description": "Permissions and configuration", "keywords": ["admin", "access", "permissions"]},
    ]
    try:
        from _site_faq import faq_search_keywords, faq_total_count
        entries.append({
            "title": "FAQ",
            "url": "faq/index.html",
            "description": f"Frequently asked questions — {faq_total_count()}+ answers for Tracopus",
            "keywords": faq_search_keywords(),
        })
    except ImportError:
        pass
    for base, pages in (
        ("hrms", HRMS_PAGES),
        ("sales", SALES_PAGES),
        ("project", PROJECT_PAGES),
        ("mobile", MOBILE_PAGES),
    ):
        for page in pages:
            url = f"{base}/{page['file']}"
            desc = f"{page['label']} documentation page"
            keywords = [base, page["label"].lower()]
            if page["file"] == "application-config.html":
                desc = "org.json application configuration, role.json access control, FAQ and common mistakes"
                keywords = [
                    "appconfig", "application configuration", "access control", "org.json",
                    "role.json", "permissions", "hrms", "admin", "service line", "categoryMap",
                    "timesheet", "modules", "faq", "common mistakes", "inherit", "override", "lock",
                ]
            entries.append(
                {
                    "title": page["label"],
                    "url": url,
                    "description": desc,
                    "keywords": keywords,
                }
            )
    try:
        entries.extend(build_faq_search_entries())
    except ImportError:
        pass
    return entries


def generate_search_index_json():
    """JSON index for in-app HelpSearchModal (/documentation/documentation-search-index.json)."""
    pages = [
        {
            "title": p["title"],
            "url": "/documentation/" + p["url"].lstrip("/"),
            "description": p.get("description", ""),
            "keywords": p.get("keywords") or [],
        }
        for p in build_search_meta()
    ]
    path = os.path.join(ROOT, "documentation-search-index.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"version": DOCS_ASSET_VERSION, "pages": pages}, f, indent=2)
        f.write("\n")
    return "documentation-search-index.json"


def generate_search_js():
    pages = build_search_meta()
    js = f"""(function () {{
  'use strict';

  function getBasePath() {{
    return '';
  }}

  var basePath = getBasePath();
  var documentationPages = {json.dumps(pages, indent=2)};
  documentationPages.forEach(function (p) {{
    p.url = basePath + p.url;
  }});

  function searchDocumentation(query) {{
    if (!query || query.trim().length < 2) return [];
    var searchTerm = query.toLowerCase().trim();
    var results = [];

    documentationPages.forEach(function (page) {{
      var score = 0;
      if (page.title.toLowerCase().indexOf(searchTerm) >= 0) score += 10;
      if (page.description.toLowerCase().indexOf(searchTerm) >= 0) score += 5;
      (page.keywords || []).forEach(function (kw) {{
        if (String(kw).toLowerCase().indexOf(searchTerm) >= 0) score += 2;
      }});
      if (score > 0) results.push(Object.assign({{}}, page, {{ score: score }}));
    }});

    document.querySelectorAll('.section[id], .section h2, .section h3').forEach(function (el) {{
      var text = (el.textContent || '').toLowerCase();
      if (text.indexOf(searchTerm) >= 0) {{
        var section = el.classList && el.classList.contains('section') ? el : el.closest('.section');
        var id = (section && section.id) || el.id || '';
        var title = el.tagName.match(/^H[234]$/) ? el.textContent.trim() : (section && section.querySelector('h2,h3')) ? section.querySelector('h2,h3').textContent.trim() : text.substring(0, 60);
        if (title && !results.some(function (r) {{ return r.url === '#' + id; }})) {{
          results.push({{ title: title, url: id ? '#' + id : window.location.pathname.split('/').pop(), description: text.substring(0, 120) + '…', score: 3, matchType: 'content' }});
        }}
      }}
    }});

    results.sort(function (a, b) {{ return b.score - a.score; }});
    return results.slice(0, 10);
  }}

  function highlightText(text, query) {{
    if (!query) return text;
    var regex = new RegExp('(' + query.replace(/[.*+?^${{}}()|[\\]\\\\]/g, '\\\\$&') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }}

  function displaySearchResults(results, query) {{
    var searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    if (!results.length) {{
      searchResults.innerHTML = '<div class="no-results">No results found</div>';
      searchResults.classList.add('active');
      return;
    }}
    searchResults.innerHTML = results.map(function (result, index) {{
      var isAnchor = result.url.indexOf('#') === 0;
      var fullUrl = isAnchor ? window.location.pathname.split('/').pop() + result.url : result.url;
      return '<div class="result-item ' + (index === 0 ? 'active' : '') + '">' +
        '<a href="' + fullUrl + '">' +
        '<div class="result-title">' + highlightText(result.title, query) + '</div>' +
        '<div class="result-description">' + highlightText(result.description, query) + '</div>' +
        (result.matchType ? '<div class="result-type">' + result.matchType + '</div>' : '') +
        '</a></div>';
    }}).join('');
    searchResults.classList.add('active');
  }}

  function createSearchUI() {{
    var headerContent = document.querySelector('header .header-content');
    if (!headerContent || document.getElementById('docSearchInput')) return;

    var searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML =
      '<div class="search-wrapper">' +
      '<input type="text" id="docSearchInput" class="search-input" placeholder="Search documentation…" autocomplete="off" />' +
      '<span class="search-icon">🔍</span>' +
      '<div id="searchResults" class="search-results"></div></div>';
    headerContent.appendChild(searchContainer);

    var searchInput = document.getElementById('docSearchInput');
    var searchResults = document.getElementById('searchResults');
    var searchTimeout;

    searchInput.addEventListener('input', function () {{
      clearTimeout(searchTimeout);
      var query = this.value;
      if (query.length < 2) {{
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
      }}
      searchTimeout = setTimeout(function () {{
        displaySearchResults(searchDocumentation(query), query);
      }}, 180);
    }});

    searchInput.addEventListener('focus', function () {{
      if (this.value.length >= 2) displaySearchResults(searchDocumentation(this.value), this.value);
    }});

    document.addEventListener('click', function (e) {{
      if (!searchContainer.contains(e.target)) searchResults.classList.remove('active');
    }});
  }}

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', createSearchUI);
  }} else {{
    createSearchUI();
  }}
}})();
"""
    return write("js/search.js", js)


def append_css():
    css_path = os.path.join(ROOT, "css/styles.css")
    marker = "/* docs-generator-extra */"
    block = """
/* docs-generator-extra */
.page-index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.page-index-card {
  display: block;
  text-decoration: none;
  border: 1px solid var(--border-color);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  padding: 1rem;
}
.page-index-card strong {
  display: block;
  color: var(--text-dark);
  margin-bottom: 0.35rem;
}
.page-index-card span {
  color: var(--primary-color);
  font-size: 0.85rem;
}
.page-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 0.6rem;
}
.page-meta__item {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.78rem;
}
.page-purpose {
  color: var(--text-light);
  margin-bottom: 0;
}
.page-nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}
.page-nav a {
  text-decoration: none;
}
.config-doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: var(--space-3, 0.75rem);
  margin-top: 0.75rem;
}
.config-doc-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  background: var(--bg-light);
}
.config-doc-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.65rem;
  margin-bottom: 0.45rem;
}
.config-doc-card__title {
  font-size: 0.95rem;
  margin: 0;
  flex: 1 1 auto;
}
.config-doc-card__key {
  font-size: 0.72rem;
  opacity: 0.85;
}
.config-doc-card__desc,
.config-doc-card__affects,
.config-meta {
  font-size: 0.82rem;
  color: var(--text-light);
  margin: 0.35rem 0;
  line-height: 1.45;
}
.config-doc-card__values {
  margin-top: 0.55rem;
  padding-top: 0.55rem;
  border-top: 1px dashed var(--border-color);
}
.config-doc-card__values-label {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
}
.config-value-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.config-value-count {
  font-size: 0.72rem;
  color: var(--text-light);
  margin: 0.35rem 0 0;
}
.config-tree-preview {
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.8rem;
}
.config-module-block {
  scroll-margin-top: 4rem;
}
.config-part-header {
  margin-top: 1.25rem;
  padding-top: 0.5rem;
  border-top: 2px solid var(--primary-color);
}
.config-module-intro {
  font-size: 0.82rem;
  color: var(--text-light);
}
.table--permissions td:first-child {
  white-space: nowrap;
  width: 28%;
}
.table--permissions td:nth-child(2) {
  font-size: 0.8rem;
  color: var(--text-light);
}
.table--compact td {
  vertical-align: top;
  font-size: 0.8rem;
}
.page-meta--inline {
  margin-bottom: 0;
}
.doc-mast__purpose {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 0.35rem;
}
.subheading {
  font-size: 0.88rem;
  margin: 0.65rem 0 0.25rem;
}
"""
    with open(css_path, "r+", encoding="utf-8") as f:
        css = f.read()
        if marker not in css:
            if not css.endswith("\n"):
                css += "\n"
            css += block
            f.seek(0)
            f.write(css)
            f.truncate()
    return "css/styles.css"


def delete_obsolete(expected_files):
    deleted = []
    for module in ("hrms", "sales", "project", "mobile"):
        mdir = os.path.join(ROOT, module)
        if not os.path.isdir(mdir):
            continue
        for name in os.listdir(mdir):
            rel = f"{module}/{name}"
            if name.endswith(".html") and rel not in expected_files:
                os.remove(os.path.join(mdir, name))
                deleted.append(rel)
    return deleted


def generate_all():
    from _app_config_docs import generate_application_config_page
    from _site_faq import generate_faq_page

    created = []

    hrms_sidebar = [{"title": "HRMS"}] + [{"file": x["file"], "href": x["href"], "label": x["label"]} for x in HRMS_PAGES]
    hrms_custom = {
        "application-config.html": generate_application_config_page(render, hrms_sidebar),
    }
    created.extend(generate_module("hrms", "HRMS", HRMS_PAGES, get_hrms_body, "hrms/index.html", custom_pages=hrms_custom))
    created.extend(generate_module("sales", "Sales", SALES_PAGES, get_sales_body, "sales/index.html"))
    created.extend(generate_module("project", "Project", PROJECT_PAGES, get_project_body, "project/index.html"))
    created.extend(generate_module("mobile", "Mobile", MOBILE_PAGES, get_mobile_body, "mobile/index.html"))

    created.extend(generate_index())
    created.append(generate_faq_page(render))

    rewrap_root_pages_from_boxed()
    patch_manual_root_nav()

    # Kept root pages patched separately via _patch_and_finalize.py

    append_css()
    generate_search_js()
    created.append(generate_search_index_json())
    deleted = delete_obsolete(set(created))

    return {"created": created, "deleted": deleted}


if __name__ == "__main__":
    result = generate_all()
    print(json.dumps({"created_count": len(result["created"]), "deleted_count": len(result["deleted"])}, indent=2))
