"""Site-wide FAQ — 100+ questions and answers for Tracopus documentation."""

from _app_config_faq import FAQ_CATEGORIES as APP_CONFIG_FAQ

GENERAL_FAQ_CATEGORIES = [
    {
        "id": "faq-login",
        "title": "Login & account access",
        "icon": "🔐",
        "items": [
            ("How do I sign in to Tracopus?", "Open your organization URL, enter username and password on the Luxury login screen, then click <strong>Sign In</strong>. SSO users click <strong>Sign in with Microsoft</strong> instead."),
            ("What is Microsoft SSO?", "Single Sign-On redirects you to Microsoft Entra ID (Azure AD). After corporate authentication you return to Tracopus already logged in — no separate password required."),
            ("I forgot my password — what should I do?", "Click <strong>Forgot Password</strong> on the login page, submit your username or email, and follow the reset link. Contact your admin if mail does not arrive within 15 minutes."),
            ("Why am I stuck on the login page after SSO?", "Your account may be inactive, not provisioned, or missing a default team. Ask your workspace administrator to verify employee status and role assignment."),
            ("How do I activate a new employee account?", "Open the activation link from your welcome email (<code>/user/activateaccount/…</code>), set a password, then sign in. Links expire — request a new invite from HR if needed."),
            ("Can I stay signed in on my laptop?", "Yes — sessions persist in the browser. Always sign out on shared machines via the header account menu."),
            ("Why does my session expire?", "Security policy may enforce idle timeout or daily re-auth. SSO tenants often require re-login after token expiry — sign in again normally."),
            ("What landing page do I see after login?", "Your default module dashboard (Project, HRMS, or Sales) depends on role permissions configured by your administrator."),
            ("How do I change my password?", "Account menu → Profile → Security, or use the forced change link at <code>/user/changepassword/…</code> when prompted."),
            ("SSO user — why is password change hidden?", "Credentials are managed by your identity provider. Use Microsoft account settings or IT helpdesk for password resets."),
        ],
    },
    {
        "id": "faq-navigation",
        "title": "Navigation & Luxury UI",
        "icon": "🧭",
        "items": [
            ("Where is the main module menu?", "The <strong>left sidebar</strong> lists HRMS, Sales, and Project modules. Expand each to see permitted screens for your role."),
            ("What is the icon rail?", "The narrow vertical rail on the left edge provides quick links: Search, Taskboard, Calendar, Notes, Chat, Files, theme palette, and settings."),
            ("How do I change the color theme?", "Click the palette droplet on the icon rail and pick a Luxury palette (Emerald, Indigo, Sapphire, etc.). Choice syncs to mobile after login."),
            ("What does SHOW / SORT / Filter mean?", "Standard list header controls: <strong>SHOW</strong> = status presets, <strong>SORT</strong> = column order, <strong>Filter</strong> = text search on the register below."),
            ("What is the summary strip?", "Collapsible KPI and chart row at the top of many list screens. Expand for analytics; collapse for a wider data table."),
            ("How does global search work?", "Header search (or icon rail Search) finds projects, tasks, employees, and more. Results respect your team scope and permissions."),
            ("Why is a sidebar item missing?", "Your role lacks module or page permission. Administrators enable routes in Application Configuration and role templates."),
            ("Can I bookmark a screen?", "Yes — copy the browser URL. Module routes like <code>/hrms/timesheet</code> open directly when you have access."),
            ("What is the breadcrumb trail?", "The path under the header (e.g. Home → HRMS → Invoices) shows where you are in the documentation or app hierarchy."),
            ("How do I collapse the summary charts?", "Click the summary strip toggle/chevron on list screens — state may persist in browser storage for your session."),
        ],
    },
    {
        "id": "faq-hrms",
        "title": "HRMS & employee records",
        "icon": "👥",
        "items": [
            ("Where is my personal dashboard?", "<strong>HRMS → Dashboard</strong> shows attendance strip, utilization donut, task queue mix, and quick links for the current week."),
            ("How do I view another employee's profile?", "HRMS → Employees → click a row. Managers see direct reports; HR admins see the full roster."),
            ("What is on the employee profile?", "Tabs for personal info, skills, security, notifications, and activity. Self-service users edit contact details; HR edits org fields."),
            ("How are departments and bands assigned?", "Values come from Application Configuration org data (<code>department</code>, <code>band</code>, <code>grade</code>) on the employee wizard and profile."),
            ("What is utilization on the HRMS dashboard?", "Billable hours vs capacity for the selected period — read the donut and KPI tiles in the summary strip for trends."),
            ("Can I export the employee list?", "Use list export controls if your role includes export permission — typically HR and admin roles."),
            ("What is attendance vs timesheet?", "<strong>Attendance</strong> tracks check-in/out and device events. <strong>Timesheet</strong> tracks billable/non-billable hours against projects."),
            ("How do I enable MFA?", "Profile → Security — follow prompts to register an authenticator if your org requires multi-factor authentication."),
            ("Who updates my skills list?", "You or your manager on the profile Skills section. Options are defined in App Config <code>skills</code> key."),
            ("Why can't I see HRMS at all?", "Your role lacks <code>hrmsModules</code> visibility flags. Request HRMS access from your workspace administrator."),
            ("What is the employee create wizard?", "Multi-step flow: personal details, org assignment, skills, and security — used by HR when onboarding new staff."),
            ("How do team filters work on HRMS lists?", "Header team scope limits rows to your org unit or selected team — managers often default to their delivery team."),
        ],
    },
    {
        "id": "faq-timesheet",
        "title": "Timesheet & time entry",
        "icon": "⏱",
        "items": [
            ("Where do I log hours?", "<strong>HRMS → Time Sheet</strong> — weekly grid with billable project rows, non-project categories, and leave types."),
            ("How do I pick the correct week?", "Use the week selector in the header. Past weeks may be read-only depending on role policy (<code>enablePastTimeSheetView</code>)."),
            ("What is a work item on the timesheet?", "A granular activity under a deliverable/project. You log hours against work items when billable project time is required."),
            ("Can I copy last week's rows?", "Use copy/pre-fill actions if enabled on your timesheet — saves re-selecting the same projects each week."),
            ("Why is last week locked?", "Role policy may set <code>disableLastMonthAfterXDays</code> — after day X of the month, prior month becomes read-only for payroll."),
            ("What are non-project hours?", "Internal categories (training, admin, PTO) configured in App Config — separate from client billable project rows."),
            ("How do managers approve timesheets?", "Approval workflows depend on org setup — check HRMS settings and your role's approve flags; some orgs use export-only review."),
            ("Why can't I add a project row?", "Project may be closed, you may not be a member, or <code>enableTimeSheetEdit</code> is false for your role."),
            ("What is max hours validation?", "Daily caps from role config (<code>maxHoursAllowedToEnter</code>) prevent accidental over-entry — split across rows if needed."),
            ("Mobile timesheet — same rules?", "Yes — mobile HRMS timesheet respects the same permissions and week locks as the web app."),
            ("How do billable hours reach an invoice?", "Approved billable timesheet hours aggregate into the invoice pool for the billing period on HRMS → Invoice."),
            ("What happens if I forget to submit?", "Hours may remain draft — managers and finance reports show gaps. Catch up before month lock date."),
        ],
    },
    {
        "id": "faq-project",
        "title": "Projects & delivery",
        "icon": "📁",
        "items": [
            ("How do I create a project?", "Project → Project List → <strong>Create</strong> (if permitted). Link account, team, dates, and optional purchase order."),
            ("What is a deliverable?", "A planned outcome or task within a project — has status, estimates, assignees, and child work items."),
            ("What is a work item?", "Granular unit of work under a deliverable where time is logged and progress tracked."),
            ("How do I open the taskboard?", "Project → Task Board or icon rail shortcut — Kanban columns: Planned, To do, In progress, Done."),
            ("What is team capacity?", "Project → Team Capacity shows allocation and availability charts for staffing decisions."),
            ("How do project members get access?", "Project Details → Members tab — add employees with appropriate project role. They then see the project in lists and timesheet."),
            ("What is a project account?", "The client or org node from Accounts — ties billing, invoices, and reporting to the customer record."),
            ("Can a project link to a purchase order?", "Yes — when Sales PO exists, link on project create or details for AP alignment and revenue tracking."),
            ("Where are project files?", "Project → File Manager or project details Files panel — folder tree with upload/download per permissions."),
            ("What is project feedback?", "Project → Feedback captures client or internal feedback records linked to delivery milestones."),
            ("How do I run project reports?", "Project → Reports — catalog of utilization, status, and financial reports filtered by team and date."),
            ("What closes a project?", "Status transition to Complete/Closed on project details — may lock new timesheet rows depending on policy."),
            ("What is the project dashboard?", "Summary KPIs, health charts, and active deliverables for projects you manage or belong to."),
            ("How does global project search work?", "Project → Search or header search — finds projects, deliverables, and tasks by keyword within scope."),
        ],
    },
    {
        "id": "faq-sales",
        "title": "Sales, bids & purchase orders",
        "icon": "💼",
        "items": [
            ("Where are bid requests?", "<strong>Sales → Bid Requests</strong> — pipeline list from intake through won/lost with status chips and filters."),
            ("How do I create a bid?", "Click <strong>Create</strong> on Bid Requests — fill commercial details, account, and study type from configured dropdowns."),
            ("What happens when a bid is won?", "Workflow may spawn a purchase order and optionally a project — follow your org's sales-to-delivery handoff."),
            ("Where are purchase orders?", "<strong>Sales → Purchase Orders</strong> — contract records linked to accounts and often to projects."),
            ("Why do invoices need a PO number?", "Client AP teams reject invoices without PO reference — copy PO from Sales when creating HRMS invoices."),
            ("Can I attach files to a bid?", "Bid Details includes documents panel — upload RFP, proposals, and signed contracts per permissions."),
            ("What statuses does a bid pass through?", "Typical flow: Draft → Submitted → Under review → Won / Lost — exact labels from App Config sales lists."),
            ("Who can see all bids?", "Sales managers and admins with cross-team scope — ICs often see only assigned accounts."),
            ("How do bids link to projects?", "On win, link PO and create project with bid reference — traceability from sales pipeline to delivery."),
            ("What is bid details vs list?", "List is the register; Details is single-record view with tabs, timeline, files, and status actions."),
        ],
    },
    {
        "id": "faq-billing",
        "title": "Invoices & billing",
        "icon": "🧾",
        "items": [
            ("Where is the invoice list?", "<strong>HRMS → Invoice</strong> — billing register with status, amount, account, and fiscal year scope."),
            ("How are invoice amounts calculated?", "Primarily from approved billable timesheet hours × rates, plus manual adjustments on invoice details."),
            ("What invoice statuses exist?", "Draft → Pending → Approved → Paid → Closed (labels may vary by org configuration)."),
            ("How do I create an invoice?", "Click <strong>Create</strong> on the invoice list — pick account, billing period, and billable pool (permission required)."),
            ("Where is the PDF?", "Open invoice → Invoice Details → PDF preview or download after lines are finalized."),
            ("What is the fiscal year selector?", "Filters register and summary charts to the selected FY — important for monthly billing bar trends."),
            ("Can I invoice without a project?", "Some orgs allow manual line items — default is project-linked billable hours from timesheet."),
            ("Who marks an invoice paid?", "Finance role typically — updates status and summary KPI tiles on the list."),
            ("Why is my draft missing hours?", "Timesheets for the period may be unapproved or still open — lock and approve before billing."),
            ("What is the outstanding panel?", "Summary chart showing open amounts awaiting payment within the active FY filters."),
        ],
    },
    {
        "id": "faq-mobile",
        "title": "Mobile app",
        "icon": "📱",
        "items": [
            ("How do I register my phone?", "After web login, open mobile User Login and scan the QR code from HRMS Settings → device registration."),
            ("Can I use PIN or biometric login?", "Yes — after QR registration, set PIN or enable Face ID / fingerprint on the mobile login screen."),
            ("Does mobile show the same projects?", "Mobile Projects lists assigned projects — tap for summary; deep links may open web for full details."),
            ("Mobile timesheet vs web?", "Same data and permission rules — log hours on mobile when away from desk; week locks apply equally."),
            ("What are mobile insights?", "Personal analytics charts: utilization, status mix, and weekly trends — mirrors web HRMS dashboard concepts."),
            ("Why did QR registration fail?", "Ensure web session is active, camera permission granted, and device registration enabled in org settings."),
            ("Can admins use App Config on mobile?", "No — Application Configuration is desktop admin only. Use a full browser session."),
            ("Do theme palettes sync to mobile?", "Yes — palette choice on web syncs after mobile login refresh."),
            ("How do I log out of mobile?", "Use sign out on mobile profile/settings — also revoke device in HRMS Settings if phone is lost."),
            ("Are push notifications supported?", "Notification preferences are in employee profile — delivery depends on org mobile push configuration."),
        ],
    },
    {
        "id": "faq-charts",
        "title": "Charts & analytics",
        "icon": "📊",
        "items": [
            ("Where is the chart type reference?", "Documentation → <strong>Charts</strong> explains donut, bar, area, line, funnel, and treemap usage."),
            ("Do charts respect filters?", "Yes — summary strip charts on list screens recalculate when SHOW, team, date, or text filters change."),
            ("What is a utilization donut?", "Billable vs available hours ratio for a person or team — common on HRMS dashboard and mobile insights."),
            ("What is a segment bar?", "Horizontal stacked bar showing proportional mix (e.g. invoice status or task status) with color legend."),
            ("Why is a chart empty?", "No data in the active filter scope — widen date range, clear text filter, or check team selection."),
            ("Can I export chart data?", "Export list/register actions may include summary data — chart-specific export depends on screen implementation."),
            ("What is team capacity chart?", "Project → Team Capacity — shows allocation vs availability for staffing planning."),
            ("How do I read the monthly billing bar?", "HRMS Invoice summary — invoiced amount by month within selected fiscal year."),
        ],
    },
    {
        "id": "faq-admin",
        "title": "Admin, roles & security",
        "icon": "🛡",
        "items": [
            ("Who is a workspace administrator?", "Users with App Config access, HRMS Settings, or elevated role templates — documented in Admin guide."),
            ("How are permissions assigned?", "Role templates in Application Configuration attach to org units; users inherit via team membership."),
            ("What is the difference between role and org config?", "Org nodes hold dropdown data and lists; role nodes hold CRUD and module visibility flags."),
            ("Can I give someone read-only project access?", "Clone a manager role, disable create/update/delete flags on project permission groups, assign to org unit."),
            ("Where is Application Configuration?", "<strong>HRMS → Application Configuration</strong> (<code>/hrms/appconfig</code>) — requires <code>appconfigEnabled</code>."),
            ("What is HRMS Settings vs App Config?", "Settings = devices, schedulers, company info. App Config = org/role trees for lists and permissions."),
            ("How do I audit permission changes?", "Rely on server audit logs and change-management — test role changes on a child org unit before Root edits."),
            ("Why can a user see a button but get an error on click?", "UI visibility flags may differ from API enforcement — verify both module and CRUD permission groups."),
            ("What is team scope?", "Filters data to the user's org unit/team — managers see their tree unless given broader scope."),
            ("How do I request access for a new hire?", "HR creates employee record, assigns team and role — user receives activation email."),
        ],
    },
    {
        "id": "faq-troubleshooting",
        "title": "Troubleshooting",
        "icon": "🔧",
        "items": [
            ("Page loads but data is empty", "Check team filter, SHOW preset, and date range. Confirm you have list permission for that module."),
            ("Changes not saving", "Look for validation errors, unsaved indicator, or network errors in browser dev tools. Confirm update permission on your role."),
            ("Dropdown missing a new value", "App Config change may be on wrong org node — verify user's team inheritance and refresh the form."),
            ("Timesheet row rejected", "Check daily hour cap, closed project, week lock, or missing work item permission."),
            ("Invoice total looks wrong", "Compare billable pool on details vs timesheet approvals for the billing period."),
            ("SSO loop back to login", "Clear cookies, try incognito, contact admin to verify IdP app registration and user provisioning."),
            ("Mobile QR won't scan", "Renew web session, check camera permission, confirm device registration enabled in settings."),
            ("Search returns no results", "Try shorter keywords, verify module access, and ensure spelling matches indexed fields."),
            ("Chart shows stale numbers", "Hard refresh browser; charts refresh on filter change — cached session rarely stale."),
            ("Still stuck — who do I contact?", "Your Tracopus workspace administrator or internal IT support with screen URL, username, and timestamp."),
        ],
    },
]


def _merged_categories():
    cats = list(GENERAL_FAQ_CATEGORIES)
    for c in APP_CONFIG_FAQ:
        cats.append({
            "id": "cfg-" + c["id"],
            "title": "App config · " + c["title"],
            "icon": c["icon"],
            "items": c["items"],
        })
    return cats


SITE_FAQ_CATEGORIES = _merged_categories()


def faq_total_count():
    return sum(len(c["items"]) for c in SITE_FAQ_CATEGORIES)


FAQ_PAGE_SIDEBAR = [{"file": "#faq-top", "href": "#faq-top", "label": "All questions"}] + [
    {"file": f"#{c['id']}", "href": f"#{c['id']}", "label": c["title"][:28]}
    for c in SITE_FAQ_CATEGORIES
]


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_site_faq_page_content():
    total = faq_total_count()
    category_options = "".join(
        f'<option value="{c["id"]}">{c["icon"]} {_esc(c["title"])}</option>'
        for c in SITE_FAQ_CATEGORIES
    )
    categories_html = ""
    for cat in SITE_FAQ_CATEGORIES:
        items = "".join(
            f'<article class="faq-item faq-item--searchable" id="faq-q-{cat["id"]}-{i}" '
            f'data-faq-q="{_esc(q.lower())}" data-faq-a="{_esc(a.lower())}">'
            f'<h3 class="faq-item__q">{q}</h3><div class="faq-item__a">{a}</div></article>'
            for i, (q, a) in enumerate(cat["items"])
        )
        categories_html += f"""
<section class="appcfg-faq-category faq-category--searchable" id="{cat['id']}">
  <h2 class="appcfg-faq-category__title"><span class="appcfg-faq-category__icon">{cat['icon']}</span> {cat['title']}</h2>
  <p class="appcfg-faq-category__count">{len(cat['items'])} questions</p>
  <div class="appcfg-faq-list">{items}</div>
</section>"""

    return f"""
<div class="doc-canvas faq-page appcfg-page">
  <header class="doc-mast" id="faq-top">
    <div class="doc-mast__top">
      <span class="doc-mast__eyebrow">Help center</span>
    </div>
    <h1 class="doc-mast__title">Frequently asked questions</h1>
    <p class="doc-mast__lead">{total} answers about login, navigation, HRMS, timesheet, projects, sales, billing, mobile, charts, admin, troubleshooting, and application configuration.</p>
  </header>
  <div class="doc-flow">
    <section class="doc-block appcfg-section">
      <div class="appcfg-toolbar faq-toolbar" id="faq-toolbar">
        <div class="faq-toolbar__row">
          <div class="appcfg-toolbar__search">
            <span class="appcfg-toolbar__search-icon" aria-hidden="true">🔍</span>
            <input type="search" id="faqPageSearch" class="appcfg-toolbar__input" placeholder="Search {total}+ questions…" autocomplete="off" aria-label="Search FAQ">
          </div>
          <div class="faq-toolbar__category">
            <label class="faq-toolbar__category-label" for="faqCategorySelect">Jump to</label>
            <select id="faqCategorySelect" class="faq-toolbar__select" aria-label="Jump to FAQ category">
              {category_options}
            </select>
          </div>
        </div>
        <p class="faq-toolbar__hint" id="faqSearchCount">{total} questions · type to filter</p>
      </div>
      <div id="faqNoResults" class="faq-no-results" hidden>No matching questions — try different keywords.</div>
      <div id="faqCategoriesWrap">{categories_html}</div>
    </section>
  </div>
</div>
<script src="{{ASSET_FAQ_JS}}"></script>"""


def generate_faq_page(render_fn):
    from _generate_pages import asset, write

    depth = 1
    body = render_site_faq_page_content().replace("{ASSET_FAQ_JS}", asset(depth, "js/faq-page.js"))
    sidebar = [{"title": "FAQ"}] + FAQ_PAGE_SIDEBAR
    breadcrumb = '<a href="../index.html">Home</a> → FAQ'
    html = render_fn(
        depth,
        "FAQ",
        breadcrumb,
        sidebar,
        body,
        active_top="faq/index.html",
        active_sidebar="#faq-top",
        current_module="faq",
    )
    return write("faq/index.html", html)


def faq_search_keywords():
    words = ["faq", "questions", "answers", "help", "troubleshooting"]
    for cat in SITE_FAQ_CATEGORIES:
        words.append(cat["title"].lower())
        for q, _ in cat["items"]:
            words.extend(q.lower().split()[:4])
    return list(dict.fromkeys(w for w in words if len(w) > 2))[:80]
