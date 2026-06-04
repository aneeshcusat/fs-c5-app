"""FAQ and common mistakes content for Application Configuration documentation."""

FAQ_CATEGORIES = [
    {
        "id": "faq-access",
        "title": "Access & getting started",
        "icon": "🔑",
        "items": [
            (
                "Who can open Application Configuration?",
                "Users whose role has <code>hrmsModules.appconfigEnabled</code> set to true (see Access control → HRMS Modules Access). Without this flag the <code>/hrms/appconfig</code> route is hidden from the sidebar.",
            ),
            (
                "What is the difference between Settings and App Config?",
                "<strong>Settings</strong> (<code>/hrms/settings</code>) covers operational cards: devices, schedulers, company info, locale. <strong>App Config</strong> is the hierarchical org/role tree that drives dropdown lists, feature toggles, and permission templates across HRMS, Project, Sales, and Timesheet.",
            ),
            (
                "Why do I see an empty screen or “no config” message?",
                "Ensure your user team has a valid org node selected. The page loads config via <code>initializeConfig(currentUserTeamId)</code> on mount. If the team is not mapped to an org unit, contact a super-admin to attach the team in the org tree.",
            ),
            (
                "Can I use App Config on mobile?",
                "No — Application Configuration is a desktop admin screen only. Use a full browser session; mobile HRMS apps do not expose this route.",
            ),
            (
                "How do I get Site Admin–level access?",
                "An existing admin must enable <code>appconfigEnabled</code> on your role template, assign that role to your org unit via Role Bar, and ensure your user belongs to the correct team.",
            ),
        ],
    },
    {
        "id": "faq-org-tree",
        "title": "Organization tree & inheritance",
        "icon": "🏢",
        "items": [
            (
                "What is the difference between org nodes and role nodes?",
                "<strong>Org nodes</strong> (type=org) store application data: departments, categoryMap, notification emails. <strong>Role nodes</strong> (type=role) store permission templates: CRUD flags, timesheet windows, module visibility. Use the left menu tabs Organization vs Roles to switch trees.",
            ),
            (
                "What does the chain icon do?",
                "Linked chain (<code>fa-chain</code>) = inherit <code>parentValue</code> from the parent org unit. Broken chain (<code>fa-chain-broken</code>, <code>overridden=true</code>) = this node stores its own value. Click the chain button on a config block header to toggle.",
            ),
            (
                "What happens when I lock a setting?",
                "<code>locked=true</code> prevents child org units from overriding that key. Combined with <code>hidden=true</code>, non-admin users may not see the block at all. Use lock on Root for enterprise-wide standards (e.g. categoryMap).",
            ),
            (
                "Should I edit Root or a child team?",
                "Edit <strong>Root</strong> for defaults that apply everywhere. Edit a <strong>child org unit</strong> only when that team needs a local override (regional departments, team-specific notification list). Always test on a child before changing Root.",
            ),
            (
                "How do I create a new org unit or team node?",
                "Organization tab → select parent → (+) add child. Set name, parent, and category in the hero bar → save identity fields. New nodes inherit all parent config until you break the chain on specific keys.",
            ),
            (
                "What does parentLocked mean?",
                "When the parent node has locked a key, child nodes show <code>parentLocked</code> and cannot change inherit/lock/hide on that item — the chain and lock buttons are disabled.",
            ),
        ],
    },
    {
        "id": "faq-saving",
        "title": "Saving & filters",
        "icon": "💾",
        "items": [
            (
                "When do I need to click Save?",
                "Module-level <strong>Save</strong> persists value changes (<code>updateConfig</code>). Property-only edits (name, parent, category, overridden, locked, hidden) use <code>updateConfigProperty</code> and may save per-field. Watch for the unsaved-changes indicator before navigating away.",
            ),
            (
                "What do the All / Overridden / Locked filters do?",
                "<strong>All</strong> — every visible config on the selected node. <strong>Overridden</strong> — keys where this node broke inheritance. <strong>Locked</strong> — keys locked on this node (children cannot override). Use with the search box to find keys quickly.",
            ),
            (
                "Do UI edits overwrite org.json on disk?",
                "No. <code>org.json</code> and <code>role.json</code> seed deployment. Runtime edits persist to the database. Re-deploying from JSON without migration can overwrite DB changes — export or document before major releases.",
            ),
            (
                "Can I undo a change?",
                "There is no global undo. Re-link the chain to inherit parent again, or manually restore previous values. For roles, clone Site Admin to a backup role before large permission edits.",
            ),
            (
                "Why is Save disabled or missing?",
                "You may lack <code>appconfigEnabled</code>, the module may be disabled on this node, or the key may be <code>parentLocked</code>. Check role permissions and parent lock state.",
            ),
        ],
    },
    {
        "id": "faq-app-data",
        "title": "Application config (org.json data)",
        "icon": "📋",
        "items": [
            (
                "Where do employee dropdown values come from?",
                "HRMS module keys: <code>band</code>, <code>grade</code>, <code>department</code>, <code>designation</code>, <code>skills</code>, etc. Changes appear on the employee create wizard and profile after users refresh or open a new form.",
            ),
            (
                "What is categoryMap used for?",
                "Three-level tree: Service Line → Delivery Category → Task Category. Drives billable categorization on timesheets, project/deliverable forms, and reporting. Large trees affect picker performance — keep leaves meaningful.",
            ),
            (
                "What is practiceMap?",
                "Two-level HR practice hierarchy (Primary → Secondary Practice) on employee profiles. Used for staffing filters and practice-based analytics, separate from project categoryMap.",
            ),
            (
                "How do notification email lists work?",
                "Keys like <code>defaultNotificationEmails</code>, <code>defaultPurchaseOrderNotificationEmails</code> set default distribution when projects or POs trigger workflow emails. Finance-specific keys route to finance inboxes.",
            ),
            (
                "What are NONPROJECT categories?",
                "NONPROJECT module → <code>taskActCategory</code> lists non-billable timesheet types (meetings, training, leave). <code>excludeAdditionalFieldsForCategory</code> hides extra fields for quick entry on Leave/Holiday rows.",
            ),
            (
                "Can I enable multi service line estimates?",
                "PROJECT toggles: <code>enableServiceLineEstimate</code>, <code>enableServiceLineSelection</code>, <code>enableCategorySelection</code>. When enabled, projects and POs show estimate panels per service line — coordinate with finance before toggling.",
            ),
            (
                "Can I delete a categoryMap leaf used in old timesheets?",
                "Avoid hard deletes. Historical rows reference leaf IDs/names. Prefer stopping new use (hide/lock at Root) while retaining legacy values for reports.",
            ),
            (
                "How do I bulk-add list values?",
                "In any list config block, use the multi-add textarea (toggle from single-line add) and paste one value per line from Excel, then save the module.",
            ),
        ],
    },
    {
        "id": "faq-roles",
        "title": "Roles & access control",
        "icon": "🔐",
        "items": [
            (
                "How are roles assigned to users?",
                "Roles attach to <strong>org units</strong> via <code>ApplicationConfigRoleBar</code> on an org node — not directly on user records. Users inherit the role mapped to their team’s org unit.",
            ),
            (
                "How do I create a custom Manager role?",
                "Roles tab → (+) new role → configure module visibility and permission groups → save. Start from Site Admin and disable delete/archive/appconfig flags. Assign via Role Bar on delivery team org nodes.",
            ),
            (
                "Why can a user see a menu item but not perform actions?",
                "Module visibility (<code>*Enabled</code> in hrmsModules/projectModules) is separate from CRUD groups (<code>createEnabled</code>, <code>editEnabled</code>). Enable both the module flag and the action flag in the correct permission group.",
            ),
            (
                "What is defaultRedirectPage?",
                "Landing slug when the user opens a module (e.g. <code>dashboard</code>, <code>activites</code>, <code>bidrequests</code>). Set per role under HRMS/Project/Sales Modules Access.",
            ),
            (
                "How do report permissions work?",
                "<code>reporting</code> group lists each report type as a boolean. Users only see reports they are allowed to run in the REPORT dropdown.",
            ),
            (
                "Can managers edit other employees’ timesheets?",
                "Controlled by <code>timeSheet.switchEmployeesEnabled</code>, <code>enableTimeSheetEdit</code>, and related work-item flags. Set on the manager’s role template, not per user.",
            ),
        ],
    },
    {
        "id": "faq-timesheet",
        "title": "Timesheet & work item rules",
        "icon": "⏱",
        "items": [
            (
                "Why can’t a user log time for last week?",
                "Check <code>enableTimeSheetEdit</code>, <code>enablePastTimeSheetView</code>, <code>disableLastMonthAfterXDays</code>, and work-item window flags (<code>disableProjectWorkItemCreateBeforeXWorkingDays</code>, etc.) on their role.",
            ),
            (
                "What does disableLastMonthAfterXDays do?",
                "Locks the previous month’s timesheet after X days into the current month (e.g. 5 = after the 5th, prior month is read-only). Common payroll control.",
            ),
            (
                "What is maxHoursAllowedToEnter?",
                "Daily or per-entry hour cap validation on timesheet rows. Prevents accidental 24+ hour entries.",
            ),
            (
                "Why are non-project entries blocked?",
                "Review <code>disableNonProjectWorkItemCreateBeforeXWorkingDays</code> / <code>AfterXWorkingDays</code> and NONPROJECT categories in org config. Value <code>-1</code> often means rule disabled — check your deployment’s convention.",
            ),
            (
                "Can users book leave for future dates?",
                "<code>allowLeaveAndHolidayForFuture</code> and <code>allowLeaveAndHolidayForPast</code> on the role control leave booking direction on non-project categories.",
            ),
        ],
    },
    {
        "id": "faq-troubleshooting",
        "title": "Troubleshooting",
        "icon": "🔧",
        "items": [
            (
                "Dropdown missing a value I added in App Config",
                "Confirm you saved the module, selected the correct org node (user’s team scope), and refreshed the target form. Child teams inherit Root unless overridden — add the value on the node the team actually uses.",
            ),
            (
                "Permission change not taking effect",
                "Ask the user to log out and back in. Clear browser cache if menu items persist. Verify Role Bar mapping on the user’s org unit matches the role you edited.",
            ),
            (
                "User sees App Config but changes fail",
                "UI may show read-only if parent locked keys or module is disabled. Check API errors in network tab — server enforces permissions independently.",
            ),
            (
                "categoryMap picker is slow",
                "Tree too large or too many leaf nodes. Archive obsolete branches, use lock at Root to prevent duplicate local trees, and limit depth to three meaningful levels.",
            ),
            (
                "Two teams see different department lists",
                "Expected if one team overrode HRMS → department on a child org node. Compare org nodes in App Config with Overridden filter.",
            ),
            (
                "When do users see config changes?",
                "List values: usually next page load. Permissions: often next session. Some caches may delay up to a few minutes — document your org’s refresh policy.",
            ),
        ],
    },
]

COMMON_MISTAKES = [
    (
        "Editing Root without testing on a child org unit",
        "Root changes propagate to every team unless overridden. A wrong categoryMap or department list affects the entire company.",
        "Create a sandbox child org unit, apply changes there, validate with a test team, then promote to Root or lock.",
    ),
    (
        "Granting appconfigEnabled to too many roles",
        "App Config access equals control over all dropdowns, trees, and permission templates.",
        "Limit to 1–2 admin roles. Never enable for general managers or IC roles.",
    ),
    (
        "Confusing org tree with roles tree",
        "Org nodes hold data lists; role nodes hold permissions. Editing the wrong tree does not fix access issues.",
        "Organization tab for departments/categoryMap; Roles tab for timesheet edit flags. Assign roles via Role Bar on org nodes.",
    ),
    (
        "Forgetting to Save after module edits",
        "Navigating away loses unsaved list additions and toggle changes.",
        "Watch for unsaved indicator; click Save on each module card you modified before switching nodes.",
    ),
    (
        "Breaking inheritance without documenting why",
        "Future admins see a broken chain but not the business reason.",
        "Record overrides in your internal runbook (team name, key, date, approver).",
    ),
    (
        "Locking without hiding sensitive keys",
        "Locked keys still visible to admins; hidden reduces clutter when combined with lock.",
        "For enterprise-only keys, set lock + hide on Root so child admins are not distracted.",
    ),
    (
        "Deleting categoryMap leaves with historical data",
        "Old timesheets and reports reference removed category names/IDs.",
        "Stop new usage via lock; retain legacy leaves or map migrations in backend.",
    ),
    (
        "Enabling all Site Admin permissions on every role",
        "Clone Site Admin and strip flags — do not assign Site Admin broadly.",
        "Create Manager, Finance, IC templates with minimal required flags.",
    ),
    (
        "Setting module visibility without CRUD flags",
        "User sees sidebar entry but gets errors on Create/Save.",
        "Enable both module flag (e.g. <code>employeesEnabled</code>) and group flags (<code>createEnabled</code>, <code>editEnabled</code>).",
    ),
    (
        "Ignoring parentLocked on child nodes",
        "Attempting to override locked parent keys wastes time — buttons are disabled.",
        "Change the value on the parent node that holds the lock, or unlock at parent first (with change control).",
    ),
    (
        "Duplicating service line trees per team",
        "Each local categoryMap drift causes timesheet miscoding and report splits.",
        "Maintain one locked categoryMap at Root; override only when legally required (regional practice).",
    ),
    (
        "Toggling PO mandatory without comms",
        "<code>isPurchaseOrderMandatory</code> blocks project workflows for teams without PO process.",
        "Coordinate with PMO and finance; pilot on one org unit before Root enable.",
    ),
    (
        "Disabling timesheet edit without setting lock windows",
        "Users blocked entirely with no grace period for corrections.",
        "Pair <code>enableTimeSheetEdit=false</code> with clear <code>disableLastMonthAfterXDays</code> and communicate cutoff dates.",
    ),
    (
        "Adding duplicate values in long lists",
        "Duplicate bands or departments pollute filters and charts.",
        "Use search in App Config before add; dedupe in Excel before bulk paste.",
    ),
    (
        "Assuming UI permissions equal API security",
        "Direct API calls can bypass hidden buttons.",
        "Treat false permission flags as server-side denies; verify backend enforcement for compliance.",
    ),
    (
        "Not assigning role after creating role template",
        "New role exists but no org unit uses it — users keep old permissions.",
        "Open org node → Role Bar → attach new role → users re-login.",
    ),
    (
        "Changing notification emails without validating SMTP",
        "Workflow emails bounce or go to wrong inboxes.",
        "Test with one project/PO event after change; use finance/IT distribution lists.",
    ),
    (
        "Disabling entire module when only one key should change",
        "Module enable toggle hides all keys in HRMS/PROJECT/SALES for that node.",
        "Prefer editing individual keys or role flags instead of disabling whole module.",
    ),
]

FAQ_SIDEBAR = [
    {"title": "FAQ & mistakes"},
    {"file": "#faq", "href": "#faq", "label": "FAQ — all questions"},
    {"file": "#faq-access", "href": "#faq-access", "label": "Access & getting started"},
    {"file": "#faq-org-tree", "href": "#faq-org-tree", "label": "Org tree & inherit"},
    {"file": "#faq-saving", "href": "#faq-saving", "label": "Saving & filters"},
    {"file": "#faq-app-data", "href": "#faq-app-data", "label": "Application config data"},
    {"file": "#faq-roles", "href": "#faq-roles", "label": "Roles & permissions"},
    {"file": "#faq-timesheet", "href": "#faq-timesheet", "label": "Timesheet rules"},
    {"file": "#faq-troubleshooting", "href": "#faq-troubleshooting", "label": "Troubleshooting"},
    {"file": "#mistakes", "href": "#mistakes", "label": "Common mistakes"},
]


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_faq_section():
    total = sum(len(c["items"]) for c in FAQ_CATEGORIES)
    jump = "".join(
        f'<a class="appcfg-faq-jump__link" href="#{c["id"]}">{c["icon"]} {_esc(c["title"])}</a>'
        for c in FAQ_CATEGORIES
    )
    categories_html = ""
    for cat in FAQ_CATEGORIES:
        items = "".join(
            f'<div class="faq-item" id="faq-q-{cat["id"]}-{i}">'
            f'<div class="faq-item__q">{q}</div>'
            f'<div class="faq-item__a">{a}</div></div>'
            for i, (q, a) in enumerate(cat["items"])
        )
        categories_html += f"""
<div class="appcfg-faq-category" id="{cat['id']}">
  <h3 class="appcfg-faq-category__title"><span class="appcfg-faq-category__icon">{cat['icon']}</span> {cat['title']}</h3>
  <p class="appcfg-faq-category__count">{len(cat['items'])} questions</p>
  <div class="appcfg-faq-list">{items}</div>
</div>"""
    return f"""
<section class="doc-block appcfg-section appcfg-faq-section" id="faq">
  <h2 class="doc-block__title">Frequently asked questions</h2>
  <p class="appcfg-section-lead">Complete Q&amp;A for using Application Configuration at <code>/hrms/appconfig</code> — {total} questions covering access, org/role trees, saving, org.json data, role.json permissions, timesheet rules, and troubleshooting.</p>
  <nav class="appcfg-faq-jump" aria-label="FAQ categories">{jump}</nav>
  {categories_html}
</section>"""


def render_mistakes_section():
    cards = ""
    for i, (title, problem, fix) in enumerate(COMMON_MISTAKES, 1):
        cards += f"""
<article class="appcfg-mistake-card" id="mistake-{i:02d}">
  <span class="appcfg-mistake-card__num">{i:02d}</span>
  <h3 class="appcfg-mistake-card__title">{title}</h3>
  <p class="appcfg-mistake-card__problem"><strong>What goes wrong:</strong> {problem}</p>
  <p class="appcfg-mistake-card__fix"><strong>Do this instead:</strong> {fix}</p>
</article>"""
    return f"""
<section class="doc-block appcfg-section appcfg-mistakes-section" id="mistakes">
  <h2 class="doc-block__title">Most common mistakes</h2>
  <p class="appcfg-section-lead">{len(COMMON_MISTAKES)} mistakes administrators make when configuring org data, roles, inheritance, and timesheet policy — and how to avoid them.</p>
  <div class="callout callout--warning"><div class="callout__icon">⚠️</div><div class="callout__body"><strong class="callout__title">Before go-live</strong><div class="callout__text">Review this list with your implementation team. Most production incidents trace to Root edits, role/org confusion, or missing Save — not software defects.</div></div></div>
  <div class="appcfg-mistake-grid">{cards}</div>
</section>"""
