"""Page content definitions for documentation generator."""

from _chart_specs import CHART_SPECS, REPORT_ITEMS
from _page_features import get_page_features
from _rich_content import render_page_enrichment, get_tips_supplement


def page_nav(prev_href, prev_label, next_href, next_label):
    parts = ['<nav class="page-nav">']
    if prev_href:
        parts.append(f'  <a class="page-nav__prev" href="{prev_href}">← {prev_label}</a>')
    else:
        parts.append('  <span></span>')
    if next_href:
        parts.append(f'  <a class="page-nav__next" href="{next_href}">{next_label} →</a>')
    else:
        parts.append('  <span></span>')
    parts.append('</nav>')
    return '\n'.join(parts)


def lux_chart_card(chart):
    action = chart.get("action", "")
    action_html = (
        f'<p class="lux-chart-card__action"><strong>When to act:</strong> {action}</p>'
        if action
        else ""
    )
    badge_class = chart.get("badge_class", "badge-donut")
    return f"""<article class="lux-chart-card">
  <div class="lux-chart-card__head">
    <h4 class="lux-chart-card__title">{chart["title"]}</h4>
    <span class="badge {badge_class}">{chart["badge"]}</span>
  </div>
  <dl class="lux-chart-card__meta">
    <dt>What it measures</dt><dd>{chart["measures"]}</dd>
    <dt>How to read it</dt><dd>{chart["read"]}</dd>
    <dt>How to use it</dt><dd>{chart["use"]}</dd>
  </dl>
  {action_html}
</article>"""


def render_chart_grid(spec_key):
    charts = CHART_SPECS.get(spec_key, [])
    if not charts:
        return ""
    cards = "".join(lux_chart_card(c) for c in charts)
    return f'<div class="lux-chart-grid">{cards}</div>'


def summary_section(intro="", sections=None, extra="", plain=""):
    """Build summary-section HTML with per-chart Luxury UI cards.

    sections: list of {"heading": str, "spec": str} for chart galleries
    plain: HTML when no chart specs (KPI-only or text summary)
    """
    sections = sections or []
    parts = [
        '<div class="lux-summary-block">',
        '<p class="lux-summary-intro">The <strong>Lux summary strip</strong> at the top of this screen is collapsible. '
        "Expand it to reveal KPI tiles and chart panels; collapse it for a wider register. "
        "All charts respect your active filters (SHOW preset, team scope, date range, text search).</p>",
    ]
    if intro:
        parts.append(f'<p class="lux-summary-detail">{intro}</p>')
    parts.append(
        '<div class="lux-summary-note"><span class="lux-summary-note__icon">◆</span> '
        "Emerald Luxury UI theme · chart data refreshes when filters change</div>"
    )
    if sections:
        for block in sections:
            heading = block.get("heading", "")
            spec = block.get("spec", "")
            if heading:
                parts.append(f'<h3 class="lux-summary-heading">{heading}</h3>')
            if spec:
                parts.append(render_chart_grid(spec))
            elif block.get("html"):
                parts.append(block["html"])
    elif plain:
        parts.append(f'<div class="lux-summary-plain">{plain}</div>')
    else:
        parts.append(
            '<p class="lux-summary-empty">This screen has no chart gallery in the summary strip. '
            "Use the header filters and main content area below.</p>"
        )
    if extra:
        parts.append(extra)
    parts.append("</div>")
    return "".join(parts)


def render_report_catalog():
    cards = []
    for title, purpose, audience in REPORT_ITEMS:
        cards.append(
            f"""<article class="lux-chart-card lux-chart-card--report">
  <div class="lux-chart-card__head">
    <h4 class="lux-chart-card__title">{title}</h4>
    <span class="badge badge-line">Report</span>
  </div>
  <dl class="lux-chart-card__meta">
    <dt>Purpose</dt><dd>{purpose}</dd>
    <dt>Typical audience</dt><dd>{audience}</dd>
  </dl>
</article>"""
        )
    return f'<div class="lux-chart-grid">{"".join(cards)}</div>'


def render_features(page_id):
    items = get_page_features(page_id)
    if not items:
        return ""
    lis = "".join(
        f'<li class="lux-feature-item"><span class="lux-feature-item__icon">✓</span>'
        f"<div><strong>{title}</strong><span>{desc}</span></div></li>"
        for title, desc in items
    )
    return f"""<section class="doc-block doc-block--features" id="complete-features">
  <h2 class="doc-block__title">Complete feature list</h2>
  <p class="lux-features-intro">Every control, panel, and workflow on this screen.</p>
  <ul class="lux-feature-list lux-feature-list--dense">{lis}</ul>
</section>"""


def build_body(meta_route, meta_menu, purpose, hero_eyebrow, hero_title, hero_desc,
               overview, layout, header, analytics, main, workflows, tips, nav_html,
               page_id=None):
    features_html = render_features(page_id) if page_id else ""
    enrichment_html = render_page_enrichment(page_id) if page_id else ""
    tips_extra = get_tips_supplement(page_id) if page_id else ""
    tips_block = f"{tips}{tips_extra}"
    return f"""
<div class="doc-canvas">
  <header class="doc-mast">
    <div class="doc-mast__top">
      <span class="doc-mast__eyebrow">{hero_eyebrow}</span>
      <div class="page-meta page-meta--inline">
        <span class="page-meta__item"><strong>Route</strong> <code>{meta_route}</code></span>
        <span class="page-meta__item"><strong>Menu</strong> {meta_menu}</span>
      </div>
    </div>
    <h1 class="doc-mast__title">{hero_title}</h1>
    <p class="doc-mast__lead">{hero_desc}</p>
    <p class="doc-mast__purpose">{purpose}</p>
  </header>

  <div class="doc-flow">
    <section class="doc-block" id="overview"><h2 class="doc-block__title">Overview</h2>{overview}</section>
    <section class="doc-block doc-block--pair">
      <div class="doc-split">
        <div id="layout"><h2 class="doc-block__title">Screen layout</h2>{layout}</div>
        <div id="header-filters"><h2 class="doc-block__title">Header &amp; filters</h2>{header}</div>
      </div>
    </section>
    <section class="doc-block doc-block--summary lux-summary-section" id="summary-section"><h2 class="doc-block__title">Summary &amp; charts</h2>{analytics}</section>
    <section class="doc-block" id="main"><h2 class="doc-block__title">Main content &amp; actions</h2>{main}</section>
    {features_html}
    {enrichment_html}
    <section class="doc-block doc-block--pair">
      <div class="doc-split">
        <div id="workflows"><h2 class="doc-block__title">Workflows</h2>{workflows}</div>
        <div class="doc-block--tips" id="tips"><h2 class="doc-block__title">Tips &amp; best practices</h2>{tips_block}</div>
      </div>
    </section>
  </div>
</div>
{nav_html}
"""


# ── Shared chart tables (full, not truncated) ──

HRMS_DASHBOARD_MY_TABLE = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>What it shows</th><th>Action</th></tr></thead>
<tbody>
<tr><td>Attendance (month)</td><td>Calendar strip + bar</td><td>Present / absent days and attendance rate for current month</td><td>Spot absence patterns early</td></tr>
<tr><td>Hours over 6 weeks</td><td><span class="badge badge-bar">Stacked bar</span></td><td>Billable, non-billable, leave hours per week</td><td>Balance billable ratio over time</td></tr>
<tr><td>This week at a glance</td><td><span class="badge badge-donut">Donut</span></td><td>Utilization breakdown (billable vs other)</td><td>Target ~80%+ billable if policy requires</td></tr>
<tr><td>Task queue mix</td><td><span class="badge badge-donut">Donut</span></td><td>Open tasks by status</td><td>Prioritize blocked or overdue items</td></tr>
<tr><td>Leave &amp; holidays</td><td>List</td><td>Leave hours booked + upcoming public holidays</td><td>Plan around team availability</td></tr>
</tbody></table></div>"""

HRMS_EMPLOYEES_TABLE = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Data</th></tr></thead>
<tbody>
<tr><td>Grade &amp; band</td><td><span class="badge badge-treemap">Treemap</span></td><td>Compensation band distribution</td></tr>
<tr><td>Headcount trend</td><td><span class="badge badge-line">Line</span></td><td>Active employees over 6 months</td></tr>
<tr><td>Joins &amp; exits</td><td><span class="badge badge-area">Stacked area</span></td><td>Monthly join vs exit events</td></tr>
<tr><td>Gender mix</td><td><span class="badge badge-donut">Donut</span></td><td>Gender distribution</td></tr>
<tr><td>Employment type</td><td><span class="badge badge-donut">Donut</span></td><td>Permanent, contract, intern, etc.</td></tr>
<tr><td>Tenure bands</td><td><span class="badge badge-bar">Column</span></td><td>0–1y, 1–3y, 3–5y, 5y+ buckets</td></tr>
<tr><td>Work locations</td><td><span class="badge badge-bar">Column</span></td><td>Office / remote / region counts</td></tr>
<tr><td>Top skills</td><td><span class="badge badge-bar">H-bar</span></td><td>Most tagged skills in roster</td></tr>
<tr><td>Departments &amp; teams</td><td><span class="badge badge-bar">H-bar</span></td><td>Org grouping headcount</td></tr>
</tbody></table></div>"""

SALES_BID_CHARTS = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Measures</th><th>Interpretation</th></tr></thead>
<tbody>
<tr><td>Bid intake trend</td><td><span class="badge badge-area">Area</span></td><td>New bids per month, 6 months</td><td>Sales velocity — rising trend = heavier intake</td></tr>
<tr><td>Win / loss snapshot</td><td><span class="badge badge-bar">Column</span></td><td>Won, lost, still open counts</td><td>Win rate at a glance</td></tr>
<tr><td>Portfolio outcomes</td><td><span class="badge badge-donut">Donut</span></td><td>Open / won / lost / other closed</td><td>Pipeline health vs historical outcomes</td></tr>
<tr><td>Pipeline age</td><td><span class="badge badge-donut">Donut</span></td><td>Fresh / active / stale open bids</td><td>Stale slice → follow up or close</td></tr>
<tr><td>By status</td><td><span class="badge badge-donut">Donut</span></td><td>Active bid status mix</td><td>Operational workload distribution</td></tr>
<tr><td>Stage volume</td><td><span class="badge badge-bar">H-bar</span></td><td>Count per funnel stage</td><td>Bottleneck stage identification</td></tr>
<tr><td>Geography mix</td><td><span class="badge badge-bar">H-bar wide</span></td><td>Countries represented</td><td>Regional sales focus</td></tr>
<tr><td>Kind of study</td><td><span class="badge badge-bar">H-bar</span></td><td>Research study types</td><td>Service line demand</td></tr>
<tr><td>Bid type</td><td><span class="badge badge-bar">V-bar</span></td><td>Commercial vs study categories</td><td>Revenue type mix</td></tr>
<tr><td>CRM linkage</td><td><span class="badge badge-donut">Donut</span></td><td>Salesforce linked vs manual</td><td>Data integration completeness</td></tr>
<tr><td>Owner workload</td><td><span class="badge badge-bar">H-bar wide</span></td><td>Bids per owner</td><td>Balance sales rep assignments</td></tr>
<tr><td>Study disciplines</td><td><span class="badge badge-bar">H-bar</span></td><td>Tagged disciplines</td><td>Capability demand signals</td></tr>
</tbody></table></div>"""

SALES_PO_CHARTS = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Measures</th><th>Interpretation</th></tr></thead>
<tbody>
<tr><td>Delivery funnel</td><td><span class="badge badge-funnel">Diagram</span></td><td>Stage progression horizontal</td><td>Contract delivery pipeline shape</td></tr>
<tr><td>By status</td><td><span class="badge badge-donut">Donut</span></td><td>Active contract statuses</td><td>Live contract workload</td></tr>
<tr><td>Portfolio mix</td><td><span class="badge badge-donut">Donut</span></td><td>Pipeline / completed / closed / archived</td><td>Historical vs active balance</td></tr>
<tr><td>Delivery health</td><td><span class="badge badge-donut">Donut</span></td><td>Timeline risk on open contracts</td><td>Overdue vs on-track contracts</td></tr>
<tr><td>Creation trend</td><td><span class="badge badge-area">Area smooth</span></td><td>New contracts, 6 months</td><td>Contract intake rate</td></tr>
<tr><td>Project types</td><td><span class="badge badge-bar">V-bar distributed</span></td><td>Contract delivery types</td><td>Service mix under contract</td></tr>
<tr><td>Creation channel</td><td><span class="badge badge-donut">Donut</span></td><td>Salesforce vs manual</td><td>Integration adoption</td></tr>
<tr><td>Bid linkage</td><td><span class="badge badge-donut">Donut</span></td><td>Bid-linked vs standalone</td><td>Traceability from sales to delivery</td></tr>
<tr><td>Funnel volume</td><td><span class="badge badge-bar">H-bar</span></td><td>Per-stage counts</td><td>Stage bottleneck analysis</td></tr>
<tr><td>Top accounts</td><td><span class="badge badge-bar">H-bar</span></td><td>Top accounts by contract count</td><td>Client dependency</td></tr>
<tr><td>By team</td><td><span class="badge badge-bar">H-bar</span></td><td>Contracts per delivery team</td><td>Team load from sales</td></tr>
</tbody></table></div>"""

PROJECT_LIST_CHARTS = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Measures</th><th>How to use it</th></tr></thead>
<tbody>
<tr><td>By status</td><td><span class="badge badge-donut">Donut</span></td><td>Active status mix</td><td>See if portfolio skews toward one status; center = active count</td></tr>
<tr><td>Portfolio mix</td><td><span class="badge badge-donut">Donut</span></td><td>Open / completed / closed</td><td>Balance of live vs historical work</td></tr>
<tr><td>Timeline health</td><td><span class="badge badge-donut">Donut</span></td><td>Overdue / due soon / on track / no date</td><td>Prioritize scheduling interventions</td></tr>
<tr><td>Creation trend</td><td><span class="badge badge-area">Area</span></td><td>New projects, 6 months</td><td>Spot intake spikes or quiet periods</td></tr>
<tr><td>Project types</td><td><span class="badge badge-bar">H-bar</span></td><td>Delivery model mix</td><td>Understand service line distribution</td></tr>
<tr><td>Billing mix</td><td><span class="badge badge-donut">Donut</span></td><td>Billable type split</td><td>Finance alignment check</td></tr>
<tr><td>PO linkage</td><td><span class="badge badge-donut">Donut</span></td><td>PO-linked vs standalone</td><td>Contracts without POs may need sales follow-up</td></tr>
<tr><td>Completed share</td><td><span class="badge badge-donut">Donut %</span></td><td>Completed vs in delivery</td><td>Throughput ratio for the filtered set</td></tr>
<tr><td>Open pipeline load</td><td><span class="badge badge-donut">Donut %</span></td><td>New / assigned / in progress</td><td>Where open work concentrates in the funnel</td></tr>
<tr><td>Automation</td><td><span class="badge badge-donut">Donut</span></td><td>Automation enabled vs disabled</td><td>Adoption of automated workflows</td></tr>
<tr><td>Top accounts</td><td><span class="badge badge-bar">H-bar</span></td><td>Top 8 accounts by project count</td><td>Client concentration risk</td></tr>
<tr><td>By team</td><td><span class="badge badge-bar">H-bar</span></td><td>Top 8 teams</td><td>Load distribution across delivery teams</td></tr>
<tr><td>Priority</td><td><span class="badge badge-bar">V-bar</span></td><td>Urgent / high / medium / low</td><td>Escalation volume</td></tr>
<tr><td>Shared visibility</td><td><span class="badge badge-donut">Donut</span></td><td>Shared vs private projects</td><td>Collaboration vs restricted visibility</td></tr>
<tr><td>Complexity</td><td><span class="badge badge-bar">V-bar</span></td><td>Basic / medium / complex</td><td>Resourcing for complex engagements</td></tr>
<tr><td>Capex / Opex</td><td><span class="badge badge-donut">Donut</span></td><td>Capital vs operating</td><td>Financial classification mix</td></tr>
<tr><td>Hours estimated</td><td><span class="badge badge-donut">Donut</span></td><td>With hours vs missing</td><td>Planning completeness — click estimate gaps list to fix</td></tr>
</tbody></table></div>"""

TASKBOARD_CHARTS = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Data</th></tr></thead>
<tbody>
<tr><td>Delivery funnel</td><td><span class="badge badge-funnel">Funnel</span></td><td>Task count per kanban column</td></tr>
<tr><td>Workflow mix</td><td><span class="badge badge-donut">Donut</span></td><td>Share of tasks in each column</td></tr>
<tr><td>Billable scope</td><td><span class="badge badge-donut">Donut</span></td><td>Project vs non-project vs other</td></tr>
<tr><td>Flow snapshot</td><td><span class="badge badge-bar">Distributed bar</span></td><td>Column counts side-by-side</td></tr>
<tr><td>Top categories</td><td><span class="badge badge-bar">V-bar</span></td><td>Most frequent task categories</td></tr>
</tbody></table></div>"""

ACTIVITY_CHARTS = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Panel</th><th>Type</th><th>Measures</th></tr></thead>
<tbody>
<tr><td>Status mix</td><td><span class="badge badge-donut">Donut</span></td><td>Completed, in progress, assigned, etc.</td></tr>
<tr><td>Priority breakdown</td><td><span class="badge badge-bar">Bar</span></td><td>Urgent through low</td></tr>
<tr><td>Checklist progress</td><td><span class="badge badge-donut">Donut</span></td><td>Done vs open checklist items</td></tr>
<tr><td>Activity type</td><td><span class="badge badge-bar">Bar</span></td><td>Work item type distribution</td></tr>
<tr><td>Outcome</td><td><span class="badge badge-donut">Donut</span></td><td>Success / partial / blocked outcomes</td></tr>
</tbody></table></div>"""

REPORTS_CATALOG = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Report</th><th>Purpose</th><th>Typical audience</th></tr></thead>
<tbody>
<tr><td><strong>Data Dump</strong></td><td>Raw export of operational records for the date/team scope</td><td>Analysts, integrations</td></tr>
<tr><td><strong>Employee Utilization</strong></td><td>Billable vs available hours by employee</td><td>Resource managers</td></tr>
<tr><td><strong>My Utilization</strong></td><td>Personal utilization summary</td><td>Individual contributors</td></tr>
<tr><td><strong>My Timesheet Data</strong></td><td>Your logged hours detail</td><td>Individual contributors</td></tr>
<tr><td><strong>15% Report</strong></td><td>Compliance/reporting template (org-specific)</td><td>Finance, compliance</td></tr>
<tr><td><strong>Est vs Actual (Deliverables)</strong></td><td>Planned vs logged effort at deliverable level</td><td>Project managers</td></tr>
<tr><td><strong>Est vs Actual (Activities)</strong></td><td>Planned vs logged at work item / activity level</td><td>Delivery leads</td></tr>
<tr><td><strong>Site Activity</strong></td><td>Activity at site/location granularity</td><td>Field operations</td></tr>
<tr><td><strong>Weekwise Utilization</strong></td><td>Utilization broken down by week</td><td>Capacity planning</td></tr>
<tr><td><strong>Weekly PO Estimation</strong></td><td>Purchase order estimate tracking by week</td><td>Sales / delivery bridge</td></tr>
<tr><td><strong>Resource Allocation</strong></td><td>Who is assigned where across projects</td><td>Resource managers</td></tr>
<tr><td><strong>Project Completion</strong></td><td>Completion metrics and status progression</td><td>Portfolio managers</td></tr>
</tbody></table></div>"""

MOBILE_INSIGHTS_TIME = """
<div class="table-wrap"><table class="table">
<thead><tr><th>Chart</th><th>Type</th><th>Data</th></tr></thead>
<tbody>
<tr><td>Utilisation &amp; billable target</td><td>Dual gauge</td><td>Billable ÷ total hours; billable vs 40h target</td></tr>
<tr><td>Hours mix</td><td>Donut</td><td>Billable / non-billable / leave slices</td></tr>
<tr><td>Daily stacked hours</td><td>Stacked bar</td><td>Per weekday: billable → non-billable → leave</td></tr>
<tr><td>Billable by project</td><td>Horizontal bar</td><td>Top projects by billable hours</td></tr>
<tr><td>Time by account</td><td>Horizontal bar</td><td>Hours grouped by account</td></tr>
<tr><td>Billable trend</td><td>Line + area</td><td>Billable hours per weekday</td></tr>
</tbody></table></div>"""
