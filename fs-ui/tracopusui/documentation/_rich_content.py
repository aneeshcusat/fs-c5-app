"""Rich enrichment sections for Tracopus documentation pages."""

CALLOUT_ICONS = {
    "info": "ℹ️",
    "note": "📝",
    "tip": "💡",
    "warning": "⚠️",
    "alert": "🚨",
    "success": "✅",
}


def callout(kind, title, body):
    icon = CALLOUT_ICONS.get(kind, "ℹ️")
    return (
        f'<div class="callout callout--{kind}">'
        f'<div class="callout__icon">{icon}</div>'
        f'<div class="callout__body">'
        f'<strong class="callout__title">{title}</strong>'
        f'<div class="callout__text">{body}</div>'
        f"</div></div>"
    )


def render_callouts(items):
    return "".join(callout(k, t, b) for k, t, b in items)


def render_concepts(items):
    cards = "".join(
        f'<article class="concept-card">'
        f'<h3 class="concept-card__title">{title}</h3>'
        f'<p class="concept-card__desc">{desc}</p>'
        f"</article>"
        for title, desc in items
    )
    return f'<div class="concept-grid">{cards}</div>'


def render_permissions_table(items):
    rows = "".join(
        f"<tr><td><strong>{role}</strong></td><td>{access}</td></tr>"
        for role, access in items
    )
    return (
        '<div class="table-wrap"><table class="table table--permissions">'
        "<thead><tr><th>Role</th><th>Access on this screen</th></tr></thead>"
        f"<tbody>{rows}</tbody></table></div>"
    )


def render_controls_table(items):
    rows = "".join(
        f"<tr><td><strong>{control}</strong></td><td>{desc}</td>"
        f"<td>{notes or '—'}</td></tr>"
        for control, desc, notes in items
    )
    return (
        '<div class="table-wrap"><table class="table table--controls">'
        "<thead><tr><th>Control</th><th>Description</th><th>Notes</th></tr></thead>"
        f"<tbody>{rows}</tbody></table></div>"
    )


def render_mistakes(items):
    return render_callouts([("warning", title, desc) for title, desc in items])


def render_faq(items):
    faqs = "".join(
        f'<article class="faq-item">'
        f'<h3 class="faq-item__q">{q}</h3>'
        f'<div class="faq-item__a">{a}</div>'
        f"</article>"
        for q, a in items
    )
    return f'<div class="faq-list">{faqs}</div>'


def render_related(items):
    links = "".join(
        f'<a class="related-link" href="{href}">'
        f'<span class="related-link__label">{label}</span>'
        f'<span class="related-link__desc">{desc}</span>'
        f"</a>"
        for href, label, desc in items
    )
    return f'<div class="related-links">{links}</div>'


RICH_PAGES = {
    "hrms/attendance.html": {
        "audience": 'HR administrators and people managers marking or correcting daily attendance; payroll coordinators exporting month matrices. Individual contributors view attendance on Dashboard, not usually this matrix.',
        "info_title": 'Monthly attendance control',
        "info_body": 'Open Attendance at month close to reconcile absences against timesheet leave rows and payroll export requirements.',
        "concepts": [('Month matrix', 'Employees as rows, calendar days as columns — color markers for present, absent, leave, holiday.'), ('Cell popover', 'Click a cell to mark or correct attendance for one employee-day.'), ('Team / employee filters', 'Narrow matrix to org unit or single person for focused correction.'), ('Summary KPIs', 'Month-level attendance rate and absence counts in the summary strip.'), ('Export', 'Download matrix for payroll systems — format and permission vary by deployment.')],
        "permissions": [('Individual contributor', 'Typically no access; personal attendance visible on Dashboard.'), ('People manager', "View and mark attendance for direct reports' org units."), ('HR administrator', 'Full matrix access, export, bulk correction.'), ('Payroll coordinator', 'Export read access; mark permission optional.')],
        "controls": [('Month navigation', 'Previous / next month arrows.', 'Future months may be read-only.'), ('Team filter', 'Scope rows to selected org units.', 'Combine with employee search.'), ('Employee search', 'Jump to one person in large matrices.', 'Useful for 500+ rosters.'), ('Cell popover', 'Mark present, absent, leave, holiday.', 'Writes audit log entry.'), ('Summary KPIs', 'Attendance rate, absence count.', 'Updates with filters.'), ('Export', 'Download CSV/Excel for payroll.', 'Role-dependent button visibility.'), ('Sync indicator', 'Shows last integration pull if HRIS connected.', 'Admin view only.')],
        "mistakes": [('Correcting attendance without checking timesheet', 'Leave on timesheet but absent in matrix (or reverse) causes payroll disputes — reconcile both.'), ('Bulk marking without filter', 'Accidentally marking entire company present — always set team filter first.'), ('Missing public holidays', 'Holiday calendar must be configured in admin — otherwise manual holiday marks per employee.')],
        "faq": [('How does attendance relate to timesheet?', 'Timesheet leave hours and attendance markers should align; Dashboard attendance strip reads matrix data.'), ('Can employees self-mark?', 'Some orgs enable self-service; most restrict marking to managers and HR.'), ('What export formats are supported?', 'CSV and Excel common — confirm column mapping with payroll vendor.'), ('Is half-day absence supported?', 'Popover options depend on org config — may show AM/PM or hours.')],
        "related": [('timesheet.html', 'Timesheet', 'Leave hours should match matrix leave markers.'), ('dashboard.html', 'Employee Dashboard', 'My tab attendance strip source.'), ('employees.html', 'Employees', 'Matrix rows list active roster members.'), ('../admin.html', 'Admin guide', 'Holiday calendar and integration settings.')],
        "callouts": [('warning', 'Month close', 'Finalize attendance before payroll export — retroactive edits may require HR ticket after lock.'), ('tip', 'Filter first', 'Set team to your org unit before reviewing — full-company matrix is slow and error-prone.')],
    },
    "hrms/dashboard.html": {
        "audience": 'Every employee for the My dashboard tab; people managers and HR leads for the Team dashboard tab with org-wide workforce analytics. Open this screen at the start of the week to review utilization, attendance, and task load.',
        "info_title": 'Two tabs, two audiences',
        "info_body": 'Individual contributors should stay on <strong>My dashboard</strong>. Switch to <strong>Team dashboard</strong> only if your role includes direct or org-unit reports — the Team tab exposes headcount and demographic charts.',
        "concepts": [('My dashboard', 'Personal attendance strip, six-week hour stack, weekly utilization donut, task queue mix, and upcoming leave/holidays.'), ('Team dashboard', 'Manager-only analytics: headcount trends, grade distribution, gender and tenure mix, department bars, and team-scoped filters.'), ('Summary strip', 'Collapsible KPI row above tabs; expand for charts, collapse for a cleaner view. State persists in browser storage.'), ('Utilization', 'Billable hours divided by available hours — target varies by org policy (often 75–85% for client-facing roles).'), ('Team scope bar', 'On Team tab, filters every chart to selected organizational units — always set scope before interpreting numbers.')],
        "permissions": [('Individual contributor', 'My dashboard tab only; personal charts and leave list.'), ('People manager', 'My + Team tabs; team scope bar for org-unit filtering.'), ('HR administrator', 'Full Team dashboard across all org units; may see extended demographic panels.'), ('Executive (read-only)', 'Team dashboard analytics without edit actions on underlying records.')],
        "controls": [('My / Team tabs', 'Switch between personal and manager analytics.', 'Tab choice persists per session.'), ('Team scope bar', 'Multi-select org units on Team tab.', 'Required before comparing teams fairly.'), ('Summary strip toggle', 'Expand/collapse chart gallery.', 'Same control as other Lux list screens.'), ('Attendance calendar strip', 'Month view of present/absent days on My tab.', 'Click segments where drill-down is enabled.'), ('Hours over 6 weeks', 'Stacked bar: billable, non-billable, leave.', 'Spot trending billable ratio drops.'), ('This week donut', 'Utilization breakdown for current week.', 'Compare to org target line if shown.'), ('Leave & holidays list', 'Booked leave hours and upcoming public holidays.', 'Plan around team availability.')],
        "mistakes": [('Using Team tab without scope', 'Managers view blended company-wide data and draw wrong conclusions — always narrow the team scope bar first.'), ('Ignoring non-billable hours', 'A healthy billable ratio still requires tracking internal and training time; zero non-billable entries often indicate under-reporting.'), ('Checking dashboard once a month', 'Utilization and task mix are weekly signals — review Monday or after timesheet submission deadlines.')],
        "faq": [("Why can't I see the Team tab?", 'Your account lacks manager permissions or has no direct/indirect reports in Tracopus org structure.'), ('Do dashboard charts respect filters?', 'Team tab charts follow team scope; My tab is always personal data regardless of global header search.'), ('Can I export dashboard data?', 'Export lives on underlying registers (Timesheet, Employees) — dashboard is read-only analytics.'), ('What utilization target should I aim for?', 'Org-specific — check with your delivery lead. The donut shows actuals; policy targets may appear as reference markers.')],
        "related": [('timesheet.html', 'Timesheet', 'Add or correct hours shown in the six-week bar chart.'), ('employees.html', 'Employees', 'Team tab demographics mirror roster data here.'), ('attendance.html', 'Attendance', 'Month matrix is the source for attendance strip.'), ('../project/dashboard.html', 'Project Dashboard', 'Portfolio view complements personal utilization.')],
        "callouts": [('info', 'Weekly ritual', 'Expand the summary strip, scan utilization donut, then open Timesheet to fill gaps for the current week.'), ('tip', 'Manager handoff', "Before 1:1s, set Team scope to the report's org unit and screenshot trend charts for discussion.")],
    },
    "hrms/employees.html": {
        "audience": 'HR administrators maintaining the workforce roster; people managers reviewing team composition; executives viewing headcount analytics. Individual contributors typically reach employee records via Profile, not this register.',
        "info_title": 'HR admin primary screen',
        "info_body": 'Use Employees when creating accounts, deactivating leavers, or analyzing org demographics — not for editing your own preferences (use Profile/Settings).',
        "concepts": [('Employee register', 'Searchable list/grid of all workforce records with status, team, role, and contact fields.'), ('Create wizard', 'Multi-step flow: Profile → Access → Sign-in → Organization → Skills for full onboarding.'), ('Quick filter chips', 'All · Active · Inactive presets atop the register for fast status scoping.'), ('Nine summary charts', 'Treemap, line, area, and donut panels — grade bands, headcount trend, joins/exits, skills, departments.'), ('Grid / List toggle', 'Card grid for visual browsing or dense table for bulk operations and export.')],
        "permissions": [('Individual contributor', 'No access to register; uses Profile for self-view only.'), ('People manager', 'View employees in managed org units; limited edit (skills, team assignment) per policy.'), ('HR administrator', 'Create, edit, deactivate employees; full wizard and access provisioning.'), ('IT / security admin', 'Access and sign-in steps in create wizard; may not edit compensation fields.')],
        "controls": [('CREATE employee', 'Launch full wizard or quick form.', 'Wizard recommended for new hires.'), ('Quick filter chips', 'All · Active · Inactive.', 'Combines with SHOW dropdown.'), ('SHOW / SORT / Filter', 'Status, sort order, text search on name/email/ID.', 'Standard Lux header pattern.'), ('Team selection', 'Multi-team checkbox menu.', 'Scopes register and all nine charts.'), ('Grid / List toggle', 'Switch card vs table density.', 'Preference may persist locally.'), ('Row click', 'Navigate to employee profile detail.', 'Opens hrms/profile context for that user.'), ('Summary strip charts', 'Nine analytics panels when expanded.', 'Respect team filter scope.')],
        "mistakes": [('Creating duplicate accounts', 'Search before CREATE — duplicate email addresses break SSO sign-in and split timesheet history.'), ('Leaving inactive users as Active', 'Inactive status preserves audit trail while revoking access — prefer deactivate over delete.'), ('Ignoring skills tags', 'Skills feed capacity and staffing reports in Project module — complete Skills step in wizard.')],
        "faq": [("What's the difference between quick form and wizard?", 'Quick form captures essentials; wizard adds access, org placement, and skills required for Tracopus permissions.'), ('Can managers create employees?', 'Usually HR-only — managers request headcount via HR ticket; confirm your org policy.'), ('Do charts update in real time?', 'Register filters refresh charts immediately; headcount trend may cache briefly.'), ('How do I offboard someone?', 'Set status Inactive, revoke access in wizard Security step, confirm no open timesheet weeks.')],
        "related": [('profile.html', 'Employee Profile', 'Detail view opened from register row click.'), ('dashboard.html', 'Employee Dashboard', 'Team tab charts mirror roster demographics.'), ('timesheet.html', 'Timesheet', 'Employee selector lists same roster.'), ('attendance.html', 'Attendance', 'Matrix rows correspond to active employees.')],
        "callouts": [('alert', 'Access provisioning', 'Completing the Access and Sign-in wizard steps is required before the employee can log into Tracopus or mobile.'), ('note', 'PII handling', "Employee records contain personal data — export and screenshot per your org's data policy.")],
    },
    "hrms/index.html": {
        "audience": 'HR administrators, people managers, and individual contributors who need a map of the HRMS module in Tracopus. Use this index when onboarding new staff or deciding which HR screen to open next.',
        "info_title": 'Start here for HR workflows',
        "info_body": 'The HRMS module covers workforce records, time capture, attendance, and client invoicing. Most daily work happens on Dashboard, Timesheet, or Employees — not on this index page itself.',
        "concepts": [('HRMS module', 'Human resource management within Tracopus Luxury UI — employees, time, attendance, billing, and personal settings.'), ('Luxury UI shell', 'Emerald-themed layout with sticky header, collapsible summary strips, and sidebar navigation shared across all HR screens.'), ('Register pattern', 'List screens (Employees, Invoices) use SHOW / SORT / Filter header controls plus optional chart galleries.'), ('Team scope', 'Managers filter charts and registers by organizational unit; individual contributors typically see only their own data.'), ('Billable linkage', 'Timesheet hours can tie to project deliverables, feeding utilization dashboards and invoice line items.')],
        "permissions": [('Individual contributor', 'Read module overview; navigate to Dashboard, Timesheet, Profile, and Settings.'), ('People manager', 'Full HRMS navigation; Team dashboard and employee registers scoped to managed org units.'), ('HR administrator', 'All HRMS screens including employee creation, attendance correction, and invoice management.'), ('Finance / billing', 'Invoices and invoice details; read-only access to timesheet sources where configured.')],
        "controls": [('Module grid', 'Card links to all nine HRMS screen guides.', 'Primary navigation from this page.'), ('Sidebar', 'Persistent HRMS page list on every module page.', 'Matches web app menu order.'), ('Documentation search', 'Header search indexes all guide pages.', 'Jump directly to Timesheet or Attendance guides.'), ('Breadcrumb', 'Home → HRMS trail at top of content.', 'Confirms module context.'), ('Cross-module links', 'Guides reference Project and Sales where HR data connects.', 'See Timesheet → project linking.'), ('Lux palette toggle', 'Emerald default; palette switcher in guide header.', 'Cosmetic — matches app theming docs.')],
        "mistakes": [('Skipping the Dashboard', 'New users jump straight to Timesheet without checking utilization charts — they miss policy hints and leave balance context on the My dashboard tab.'), ('Assuming HRMS equals payroll', 'Attendance and timesheet data may export to payroll, but Tracopus HRMS is operational time tracking — not a full payroll engine.')],
        "faq": [('Which HR screen do I use every day?', 'Most contributors live on <strong>Dashboard</strong> (personal KPIs) and <strong>Timesheet</strong> (weekly hour entry). Managers add <strong>Employees</strong> and <strong>Attendance</strong>.'), ('Can I access HRMS on mobile?', 'Yes — the mobile companion covers timesheet entry and personal insights. See the Mobile module guides for parity notes.'), ('Where do invoices come from?', 'Billable timesheet hours and project configuration roll up into the Invoices register. Finance users start from Invoices, not Timesheet.'), ('Do permissions differ per screen?', 'Yes. Your org admin assigns role-based access; the Permissions section on each page guide lists typical roles.')],
        "related": [('dashboard.html', 'Employee Dashboard', 'Personal and team analytics — start here each week.'), ('timesheet.html', 'Timesheet', 'Log billable, non-billable, and leave hours.'), ('employees.html', 'Employees', 'Roster management and headcount analytics.'), ('../project/index.html', 'Project module', 'Where billable timesheet hours are allocated.')],
        "callouts": [('tip', 'Recommended first week', 'Day 1: Profile + Settings. Day 2: Dashboard My tab. Day 3: Timesheet entry. Managers add Employees and Team dashboard.'), ('note', 'Enterprise deployment', 'Your org may hide Invoices or Attendance based on license — sidebar items mirror what you see in the live app.')],
    },
    "hrms/invoice-details.html": {
        "audience": 'Finance and billing staff editing invoice line items, generating PDFs, and progressing status from draft to paid. Account managers review before client send.',
        "info_title": 'Single invoice workspace',
        "info_body": 'Open from Invoices register row click — this is where line-level edits, PDF preview, and status changes happen.',
        "concepts": [('Invoice header', 'Client, billing period, status badge, total amount, tax fields, and external reference numbers.'), ('Line items table', 'Quantity, rate, amount per row — billable from timesheet or manual adjustment lines.'), ('PDF generation', 'Preview and download printable invoice for client AP submission.'), ('Status transitions', 'Draft → sent → paid workflow with audit trail on each change.'), ('Related timesheet link', 'Trace individual lines back to employee/project hours where traceability is enabled.')],
        "permissions": [('Finance / billing', 'Full edit on lines, PDF, status, and void.'), ('Account manager', 'Edit drafts for owned accounts; cannot mark paid without finance.'), ('Project manager', 'Read-only line view for reconciliation.'), ('Auditor (read-only)', 'View sent/paid history without edit.')],
        "controls": [('Header fields', 'Client, period, PO ref, status.', 'Some fields lock after Sent.'), ('Add line item', 'Manual row with qty/rate.', 'Alternative to timesheet pool pull.'), ('Edit line', 'Adjust qty, rate, description.', 'Audit logged per change.'), ('Remove line', 'Delete draft lines only.', 'Sent invoices may restrict deletion.'), ('PDF preview', 'Inline render before download.', 'Refresh after line edits.'), ('Status buttons', 'Mark sent, mark paid, void.', 'Role-gated.'), ('Timesheet trace', 'Link icon on billable lines.', 'Opens source hour entries.')],
        "mistakes": [('Editing sent invoices', 'Client-facing documents should be voided and reissued — direct edit after send breaks audit compliance.'), ('Missing PO on header', 'Add PO from Sales module before PDF send — retroactive AP rejection is costly.'), ('Not refreshing PDF after edits', 'Stale PDF attached to email — always preview after line changes.')],
        "faq": [('Can I pull additional timesheet hours?', 'Re-sync or add-from-pool actions on draft — unavailable after mark sent.'), ('What taxes are supported?', 'Tax fields follow org finance config — consult admin for rate tables.'), ('How do clients receive invoices?', 'Out-of-band email with PDF — Tracopus generates document; delivery may be manual or integrated.'), ('Can I duplicate an invoice?', 'Copy-as-draft varies by deployment — otherwise create new with same client/period.')],
        "related": [('invoices.html', 'Invoices', 'Return to register list.'), ('timesheet.html', 'Timesheet', 'Verify billable pool before finalizing lines.'), ('../sales/purchase-order-details.html', 'PO Details', 'Contract value and PO number reference.'), ('../project/accounts.html', 'Accounts', 'Client billing address and terms.')],
        "callouts": [('success', 'Ready to send checklist', 'PO on header · lines match approved timesheets · PDF preview current · client billing contact verified.'), ('warning', 'After mark sent', 'Line edits lock — use void + reissue for corrections.')],
    },
    "hrms/invoices.html": {
        "audience": 'Finance staff, billing coordinators, and account managers tracking client invoices generated from billable work. Project managers may have read-only access to reconcile hours before send.',
        "info_title": 'Billing register hub',
        "info_body": 'Start here to find draft invoices, track outstanding amounts, and open detail pages for PDF send — not for logging hours (use Timesheet).',
        "concepts": [('Invoice register', 'Sortable list of invoices with status, client, period, amount, and reference numbers.'), ('Status workflow', 'Draft → sent → paid (and void/cancelled) — transitions happen on detail page.'), ('Summary KPIs', 'Outstanding, paid, and draft totals in collapsible summary strip.'), ('SHOW / SORT / Filter', 'Status presets, column sort, text search on client or invoice number.'), ('Timesheet traceability', 'Lines on detail page link back to logged billable hours where configured.')],
        "permissions": [('Finance / billing', 'Full create, edit, send, mark paid on invoices.'), ('Account manager', 'View invoices for assigned accounts; may create drafts.'), ('Project manager', 'Read-only on projects they lead — verify hours before finance sends.'), ('Individual contributor', 'Usually no access unless dual finance role.')],
        "controls": [('CREATE invoice', 'Start new billing workflow.', 'Requires billable hour pool or manual lines.'), ('SHOW presets', 'Draft · Sent · Paid · All.', 'Combine with text filter.'), ('SORT', 'By date, amount, client, status.', 'Click column headers in list mode.'), ('Filter / search', 'Text match on client name, invoice ID.', 'Case-insensitive.'), ('Row navigation', 'Open invoice detail.', 'PDF and line items on detail page.'), ('Summary KPI tiles', 'Outstanding and paid totals.', 'Respect active filters.'), ('Export list', 'Download register for accounting.', 'Permission-dependent.')],
        "mistakes": [('Sending draft with unapproved timesheets', 'Billable pool may change — lock or approve timesheets for the billing period first.'), ('Wrong billing period', 'Period drives which hours aggregate — off-by-one week errors are common at month boundaries.'), ('Ignoring PO reference', 'Client AP teams reject invoices without PO number — copy from Sales purchase order.')],
        "faq": [('Where do invoice amounts come from?', 'Primarily billable timesheet hours × rates, plus manual adjustments on detail page.'), ('Can I invoice without a project?', 'Manual line items allowed for some orgs — default is project-linked billable pool.'), ('Who can mark an invoice paid?', 'Finance role typically — updates status and KPI tiles.'), ('How do I regenerate PDF?', 'Open invoice detail → PDF preview/download after line changes.')],
        "related": [('invoice-details.html', 'Invoice Details', 'Line items, PDF, status transitions.'), ('timesheet.html', 'Timesheet', 'Source of billable hours in the pool.'), ('../sales/purchase-orders.html', 'Purchase Orders', 'PO numbers for client AP alignment.'), ('../project/accounts.html', 'Accounts', 'Client master records tied to invoices.')],
        "callouts": [('info', 'Billing cycle', 'Align invoice period with timesheet week lock — most orgs bill one week after period end.'), ('note', 'Multi-currency', 'Currency display follows account settings on the linked client record.')],
    },
    "hrms/profile.html": {
        "audience": 'Every employee viewing or editing their own profile; HR administrators editing any employee record opened from the Employees register. Managers may view limited fields for direct reports.',
        "info_title": 'Person record detail',
        "info_body": 'Profile is the single place for photo, contact info, skills, org placement, security settings, and activity history — distinct from org-wide Settings defaults.',
        "concepts": [('Profile hero', 'Photo, display name, job title, team, manager, and primary contact channels.'), ('Tabbed sections', 'Overview, Security, Notifications, Activity, Skills & org — layout varies by permission.'), ('Edit mode', 'Inline or modal edits for fields your role may change — HR edits more than self-service.'), ('Security tab', 'Password change, MFA enrollment, active sessions — critical for enterprise SSO hybrids.'), ('Activity tab', 'Recent logins and significant actions for security awareness.')],
        "permissions": [('Individual contributor', 'Edit own contact, photo, notification prefs, password/MFA; view own activity.'), ('People manager', 'View direct report profiles; limited field edit (e.g., skills) per policy.'), ('HR administrator', 'Full edit on any employee opened from register.'), ('Self only (contractor)', 'Restricted tab set — no org admin fields.')],
        "controls": [('Edit profile', 'Toggle edit on hero fields.', 'Save validates email format.'), ('Photo upload', 'Avatar image for Lux shell header.', 'Max size per org policy.'), ('Security tab', 'Password, MFA, sessions.', 'SSO users may hide password.'), ('Notifications tab', 'Email and in-app toggles per event.', 'Overrides global Settings defaults.'), ('Activity tab', 'Login history and actions.', 'Read-only.'), ('Skills & org', 'Tags, department, manager link.', 'HR editable.'), ('Deactivate (HR)', 'Status change for leavers.', 'HR admin only from register context.')],
        "mistakes": [('Using personal email as primary', 'Breaks SSO and password reset — use corporate email from day one.'), ('Skipping MFA setup', 'Enterprise policy may enforce MFA on next login — configure proactively in Security tab.'), ('Managers editing compensation', 'Comp fields usually HR-only — well-meaning edits create audit violations.')],
        "faq": [('How is Profile different from Settings?', 'Profile is identity and security; Settings is preferences (locale, timesheet defaults) applying to your account.'), ('Can I change my manager?', 'Usually HR-only — self-service manager change would break approval chains.'), ('Who sees Activity tab?', 'You see your own; HR may see others when opened from Employees register.'), ('Does photo sync to mobile?', 'Yes — avatar appears in mobile app header after save.')],
        "related": [('settings.html', 'Settings', 'Personal preferences separate from identity.'), ('employees.html', 'Employees', 'Register opens Profile for any row.'), ('dashboard.html', 'Employee Dashboard', 'Personal analytics for this user.'), ('../mobile/login.html', 'Mobile Login', 'Security settings affect mobile sign-in.')],
        "callouts": [('tip', 'First login', 'Upload photo, verify contact info, enable MFA, then review Notifications tab.'), ('note', 'SSO accounts', 'Password fields hidden when SSO-only — use corporate IdP for credential changes.')],
    },
    "hrms/settings.html": {
        "audience": 'Every Tracopus user configuring personal preferences that apply across HRMS and linked modules — locale, notifications, and timesheet defaults. Not for org-wide admin (see Admin guide).',
        "info_title": 'Personal preferences only',
        "info_body": 'Settings changes affect only your account — unlike Employees register which is HR-managed org data.',
        "concepts": [('Locale & display', 'Language, timezone, date format — drives how timesheet weeks and invoice periods render for you.'), ('Notification rules', 'Per-event email and push toggles overriding system defaults.'), ('Timesheet defaults', 'Preferred entry type and week-start preference where configurable.'), ('Integration tokens', 'Personal API keys or connected apps when enabled by org.'), ('Lux theme note', 'App palette may follow org default; guide site has separate palette switcher.')],
        "permissions": [('Individual contributor', 'Full personal settings scope.'), ('People manager', 'Same personal scope — no team settings here.'), ('HR administrator', 'Personal settings plus separate admin console for org config.'), ('All roles', 'Integration tokens visible only if feature licensed.')],
        "controls": [('Locale picker', 'Language and region.', 'Refresh may be required.'), ('Timezone', 'Affects due dates and week boundaries.', 'Match your work location.'), ('Notification toggles', 'Per event type on/off.', 'Syncs to mobile push where enabled.'), ('Timesheet defaults', 'Default billable/non-billable.', 'Pre-fills Add entry modal.'), ('Week start', 'Monday vs Sunday week.', 'Org may lock this.'), ('API tokens', 'Generate/revoke personal keys.', 'Security-sensitive — rotate regularly.')],
        "mistakes": [('Wrong timezone', 'Timesheet week boundaries shift — verify after travel or remote work relocation.'), ('Disabling all notifications', 'Miss timesheet lock reminders and task assignments — tune instead of blanket off.'), ('Sharing API tokens', 'Personal tokens inherit your permissions — treat as passwords.')],
        "faq": [('Settings vs Profile?', 'Settings = preferences; Profile = identity, org placement, security credentials.'), ('Do settings sync mobile?', 'Notification and timesheet defaults sync; locale may require app restart.'), ('Can I change org-wide holiday calendar?', "No — that's Admin; Settings is personal only."), ('Where is dark mode?', 'Luxury UI theme follows org palette — personal dark mode may not be available.')],
        "related": [('profile.html', 'Employee Profile', 'Security and identity fields.'), ('timesheet.html', 'Timesheet', 'Defaults pre-fill new entries here.'), ('../admin.html', 'Admin', 'Org-wide configuration outside personal Settings.'), ('../mobile/index.html', 'Mobile module', 'Mobile-specific behaviour notes.')],
        "callouts": [('tip', 'Traveling workers', 'Update timezone before logging travel-week timesheet entries.'), ('info', 'Notification digest', 'Enable weekly digest if daily email volume is too high.')],
    },
    "hrms/timesheet.html": {
        "audience": "All employees who log working hours; managers who review and approve direct reports' timesheets; finance staff tracing billable hours toward invoices. This is the most frequently used HRMS screen after Dashboard.",
        "info_title": 'Log hours before week close',
        "info_body": "Enter time daily or at minimum before your org's submission deadline — late entries skew utilization on Dashboard and delay invoice generation.",
        "concepts": [('Week grid', 'Monday–Sunday columns with one row per project/deliverable or entry type; navigate previous/next week with header arrows.'), ('Entry types', 'Billable (client/project work), non-billable (internal), and leave/holiday — each affects utilization calculations differently.'), ('H vs H.MM format', 'Hours accept decimal (1.5) or H.MM (1.30 = one hour thirty minutes) depending on org config.'), ('Project linking', 'Billable rows require project and often deliverable selection — ties hours to portfolio and invoicing.'), ('Validation summary', 'Footer totals for week hours, billable ratio, and inline policy warnings (over 40h, missing project, etc.).')],
        "permissions": [('Individual contributor', 'Create and edit own timesheet for open weeks; view past submitted weeks.'), ('People manager', "View and edit direct reports' timesheets when granted; cannot override locked payroll periods."), ('HR administrator', 'Broad edit access across employees; sync external leave integration.'), ('Finance (read-only)', 'View billable lines linked to invoice candidates; no hour entry.')],
        "controls": [('Week navigation', 'Previous / next week buttons.', 'Locked weeks show read-only cells.'), ('Employee selector', 'Managers pick a report from dropdown.', 'Hidden for individual contributors.'), ('Add entry', 'Modal for new billable, non-billable, or leave row.', 'Requires project for billable.'), ('Day cell click', 'Opens entry detail for that day.', 'Supports split hours across types.'), ('Sync external leaves', 'Pull approved leave from HR integration.', 'Admin or manager action.'), ('Validation summary', 'Week totals and policy hints.', 'Red indicators block submit if enforced.'), ('Project / deliverable picker', 'Searchable hierarchy for billable rows.', 'Same projects as Project module.')],
        "mistakes": [('Logging everything as billable', 'Inflates client-facing utilization and invoice risk — use non-billable for internal meetings and training.'), ('Waiting until Friday night', 'Recall suffers; daily 5-minute entry improves accuracy and project allocation.'), ('Wrong deliverable selection', 'Hours roll into incorrect milestone on Est vs Actual reports — confirm deliverable before saving.')],
        "faq": [("Can I copy last week's entries?", 'Use duplicate-row actions where enabled, or re-open recent week as reference — auto-copy varies by deployment.'), ('What happens when a week is locked?', 'Cells become read-only; contact HR admin for corrections with audit trail.'), ('Does mobile sync with web?', 'Yes — Mobile Timesheet uses the same validation rules; see mobile/timesheet.html.'), ('How do leave hours appear?', 'Leave rows reduce available hours in utilization but are excluded from billable numerator.')],
        "related": [('dashboard.html', 'Employee Dashboard', 'Utilization charts reflect timesheet totals.'), ('invoices.html', 'Invoices', 'Billable hours aggregate into invoice drafts.'), ('../project/project-details.html', 'Project Details', 'Confirm deliverable hierarchy for billable linking.'), ('../mobile/timesheet.html', 'Mobile Timesheet', 'Log hours from phone in the field.')],
        "callouts": [('warning', 'Week lock deadline', "After payroll lock, corrections require HR admin — note your org's cutoff (often Monday noon)."), ('tip', 'Billable accuracy', 'Match timesheet project codes to the PO or SOW referenced on the purchase order in Sales.')],
    },
    "mobile/index.html": {
        "audience": 'Field consultants and mobile-first employees using the Tracopus companion app on iOS and Android — timesheet, tasks, projects, and personal insights on the go.',
        "info_title": 'Mobile companion overview',
        "info_body": 'Mobile mirrors web HRMS and Project workflows for individual contributors — not a replacement for PM portfolio tools on desktop.',
        "concepts": [('Mobile companion', 'Native app syncing with the Tracopus Luxury UI backend — same credentials as web.'), ('Offline queue', 'Timesheet and task changes queue locally; sync when connectivity returns.'), ('Biometric unlock', 'Face ID / fingerprint after first password login.'), ('Parity notes', 'Some web screens (capacity, reports) have no mobile equivalent — index links to available guides.'), ('Push notifications', 'Task assignments and timesheet reminders per Settings.'), ('Deep link to web', 'Open full project in browser when mobile view insufficient.')],
        "permissions": [('Individual contributor', 'Login, tasks, timesheet, insights, assigned projects.'), ('People manager', 'Same mobile scope — team analytics remain web HRMS Dashboard.'), ('Field worker', 'Primary timesheet and task user.'), ('Admin', 'No mobile admin console — use web admin.')],
        "controls": [('Module overview grid', 'Links to six mobile guides.', 'This page.'), ('Platform notes', 'iOS/Android parity callouts.', 'Version in app store.'), ('Offline behaviour', 'Queue and sync explanation.', 'Conflict resolution web wins on sync.'), ('Security', 'Biometric and session timeout.', 'Corporate MDM may enforce.'), ('Link to web docs', 'HRMS and Project modules.', 'Desktop workflows.'), ('App store badges', 'Download links if embedded.', 'Org may use private store.')],
        "mistakes": [('Expecting full PM on phone', 'Use web for project-list, capacity, reports — mobile is IC-focused.'), ('Ignoring sync errors', 'Red badge on timesheet — resolve before week lock.'), ('Shared device without logout', 'Corporate policy violation — always logout on shared tablets.')],
        "faq": [('Same login as web?', 'Yes — SSO and email/password per org config.'), ('Offline how long?', "Queue persists until sync — don't uninstall before sync."), ('Tablet support?', 'Responsive layout — not all layouts optimized for tablet.'), ('Mobile insights vs HRMS dashboard?', 'Similar personal charts — mobile optimized for small screen.')],
        "related": [('login.html', 'Mobile Login', 'First-time setup and SSO.'), ('timesheet.html', 'Mobile Timesheet', 'Primary daily action.'), ('tasks.html', 'Mobile Tasks', 'Assigned work.'), ('../hrms/index.html', 'HRMS module', 'Web counterpart.')],
        "callouts": [('tip', 'Field day', 'Morning: tasks pull-to-refresh. Evening: timesheet FAB. Weekly: insights review.'), ('note', 'MDM deployments', 'App may be managed — biometric and cache policies set by IT.')],
    },
    "mobile/insights.html": {
        "audience": 'Individual contributors reviewing personal analytics on mobile — six time/utilization charts, status donuts, planned vs logged, and week selector.',
        "info_title": 'Personal mobile analytics',
        "info_body": 'Weekly review companion to HRMS Dashboard My tab — optimized for phone gauges and swipe.',
        "concepts": [('Time & utilization charts', 'Dual gauge, hours mix donut, daily stacked bars, billable by project/account.'), ('Status donuts', 'Task and project status breakdowns for assigned work.'), ('Planned vs logged', 'Dual-line variance chart for personal planning accuracy.'), ('Portfolio splits', 'Project and account concentration bars.'), ('Week selector', 'Changes period for all insight charts together.'), ('Collapsible summary', 'Same Lux summary strip pattern scaled for mobile.')],
        "permissions": [('Individual contributor', 'Personal insights only.'), ('Manager', 'Same personal scope on mobile — team analytics on web HRMS.'), ('All mobile users', 'Week selector and chart read.'), ('No export', 'Screenshot or use web reports for export.')],
        "controls": [('Week selector', 'Previous/next week.', 'All charts update.'), ('Utilization gauge', 'Billable ÷ total.', 'Target marker if shown.'), ('Hours mix donut', 'Billable/non-billable/leave.', ''), ('Daily stacked bar', 'Per weekday hours.', 'Tap segment for detail if enabled.'), ('Billable by project', 'Horizontal bar top N.', ''), ('Planned vs logged', 'Line chart variance.', 'Deliverable planning.'), ('Summary strip toggle', 'Expand/collapse charts.', 'Save screen space.')],
        "mistakes": [('Checking only billable gauge', 'Non-billable and leave matter for total capacity — read hours mix donut.'), ('Wrong week selected', 'Monday confusion — confirm week selector before sharing screenshot.'), ('Mobile insights for team reviews', 'Team data requires web HRMS Team dashboard.')],
        "faq": [('Same data as HRMS dashboard?', 'Personal charts same source — mobile layout differs.'), ('Refresh frequency?', 'On open and pull-to-refresh — not live stream.'), ('Can managers see team?', 'Not on mobile insights — use web.'), ('Chart interaction?', 'Tap legend to toggle series where supported.')],
        "related": [('../hrms/dashboard.html', 'HRMS Dashboard', 'Web equivalent My tab.'), ('timesheet.html', 'Mobile Timesheet', 'Fix gaps shown in charts.'), ('tasks.html', 'Mobile Tasks', 'Task status donuts source.'), ('../charts.html', 'Charts guide', 'How to read gauges and donuts.')],
        "callouts": [('tip', 'Friday review', 'Week selector on current week → screenshot utilization gauge for self-check.'), ('info', 'Billable target', '40h target line org-specific — confirm with manager.')],
    },
    "mobile/login.html": {
        "audience": 'All mobile users on first launch or after logout — email/password, SSO, registration, biometric setup, and password recovery.',
        "info_title": 'Mobile authentication',
        "info_body": 'Complete first login on trusted network — SSO and MFA may require corporate connectivity.',
        "concepts": [('Email/password login', 'Standard credential form matching web Tracopus accounts.'), ('SSO / OAuth', 'Enterprise single sign-on button when org enables IdP.'), ('Registration', 'Self-signup or invite-token flow per org policy.'), ('Biometric unlock', 'Enable after first successful password login.'), ('Forgot password', 'Email reset link — same backend as web Profile security.')],
        "permissions": [('All employees', 'Login and biometric on issued accounts.'), ('Contractor', 'Invite-only registration if self-signup disabled.'), ('SSO-only org', 'Password form hidden — SSO button only.'), ('No public access', 'Registration requires invite or corp email domain.')],
        "controls": [('Email field', 'Corporate email.', 'Autocomplete supported.'), ('Password field', 'Show/hide toggle.', 'Keychain save iOS.'), ('SSO button', 'Redirect to IdP.', 'Returns token to app.'), ('Register link', 'Invite flow.', 'May be hidden.'), ('Forgot password', 'Trigger reset email.', 'Open mail app.'), ('Enable biometric', 'Post-login prompt.', 'Skippable once.'), ('Error messages', 'Invalid creds, locked account.', 'Contact IT.')],
        "mistakes": [('Saving password on jailbroken device', 'Corporate policy may forbid — use biometric only on managed devices.'), ('SSO on guest WiFi', 'VPN may be required — failure looks like bad password.'), ('Skipping biometric on personal phone', 'Convenience vs shoulder-surfing — enable if policy allows.')],
        "faq": [('MFA on mobile?', 'Supported when web MFA enabled — prompt after password or via SSO.'), ('Session duration?', 'Refresh token — re-login when expired or forced logout from web.'), ('Multiple accounts?', 'One account per install — logout to switch.'), ('Biometric without password?', 'Must login password periodically per OS security.')],
        "related": [('../hrms/profile.html', 'Employee Profile', 'Password and MFA settings.'), ('timesheet.html', 'Mobile Timesheet', 'Post-login landing often here.'), ('index.html', 'Mobile Overview', 'Module map.'), ('../getting-started.html', 'Getting Started', 'Web onboarding complement.')],
        "callouts": [('info', 'SSO users', 'Use corporate SSO button — local password field disabled.'), ('warning', 'Account lock', 'Repeated failures lock account — reset via web or IT.')],
    },
    "mobile/projects.html": {
        "audience": 'Mobile users browsing assigned projects — card list, summary detail, status badges, and deep link to full web project.',
        "info_title": 'Projects hub mobile',
        "info_body": 'Quick context before logging timesheet or updating tasks — not full project-details replacement.',
        "concepts": [('Projects hub', 'Card list of assigned projects with status and account.'), ('Project detail', 'Summary, team snippet, deliverables shortcut.'), ('Status badges', 'Delivery state color-coded on cards.'), ('Deep link to web', 'Open full project-details in browser.'), ('Pull to refresh', 'Sync project list.')],
        "permissions": [('Project member', 'View assigned projects on mobile.'), ('Project manager', 'Same list — edit on web project-details.'), ('Account manager', 'View if granted project access.'), ('Non-member', 'Projects not listed.')],
        "controls": [('Project cards', 'Scroll assigned set.', 'Search if many.'), ('Pull to refresh', 'Update statuses.', ''), ('Card tap', 'Mobile detail summary.', 'Not all web tabs.'), ('Open in browser', 'Deep link button.', 'SSO may re-auth.'), ('Deliverables shortcut', 'Jump toward milestone list.', 'Web may open.'), ('Team snippet', 'Avatar row.', 'Full roster on web.'), ('Status badge', 'Active/completed/etc.', 'Color coded.')],
        "mistakes": [('Editing project dates on mobile', 'Not supported — use web project-details.'), ('Assuming mobile shows all tabs', 'Members/files/settings web only.'), ('Timesheet to wrong project', 'Confirm card status Active before logging hours.')],
        "faq": [('Create project on mobile?', 'No — web project-list CREATE.'), ('Offline project list?', 'Cached last sync — stale badge when offline.'), ('Notifications per project?', 'Global task notifications — not per-project mute on mobile.'), ('PO number visible?', 'On detail if shown on web hero — field parity varies.')],
        "related": [('../project/project-details.html', 'Project Details', 'Full web workspace.'), ('timesheet.html', 'Mobile Timesheet', 'Log hours to project.'), ('tasks.html', 'Mobile Tasks', 'Tasks filtered by project.'), ('../project/project-list.html', 'Project List', 'PM register web.')],
        "callouts": [('tip', 'Before timesheet', 'Open project card to confirm still Active and correct account.'), ('note', 'Deep link', 'Requires network for full web session — bookmark on desktop instead for frequent jump.')],
    },
    "mobile/tasks.html": {
        "audience": 'Mobile users managing assigned tasks — hub list, pull-to-refresh, detail view, status updates, and offline queue.',
        "info_title": 'Tasks on the go',
        "info_body": 'Primary mobile execution screen — update status in the field before end of day sync.',
        "concepts": [('Tasks hub', 'List of assigned tasks with status badges and due dates.'), ('Pull to refresh', 'Sync latest assignments from server.'), ('Task detail', 'Checklist, comments, attachments on full-screen detail.'), ('Status update', 'Move task through workflow from mobile.'), ('Offline queue', 'Changes stored locally until network available.')],
        "permissions": [('Assignee', 'View and update own assigned tasks.'), ('Project member', 'Tasks on joined projects visible.'), ('PM on mobile', 'Same IC scope — bulk actions web only.'), ('Viewer', 'Read-only if role lacks edit.')],
        "controls": [('Task list', 'Scroll assigned tasks.', 'Sort by due date default.'), ('Pull to refresh', 'Force sync.', 'Spinner indicator.'), ('Task row tap', 'Open detail.', 'Back preserves scroll.'), ('Status picker', 'Workflow transitions.', 'Same as web taskboard.'), ('Checklist toggle', 'Mark sub-items done.', 'Syncs to web.'), ('Comment compose', 'Add update.', 'Notify assignee.'), ('Attachment view', 'Open linked files.', 'May open browser.')],
        "mistakes": [('Offline status changes without note', 'Team confused on sync — add comment with field update.'), ('Ignoring overdue badge', 'Same SLA as web — update or escalate.'), ('Large attachments on cellular', 'Wait for WiFi — upload may stall.')],
        "faq": [('Sync with taskboard?', 'Instant when online — same work item entity.'), ('Create task on mobile?', 'Limited — full create often web; quick capture varies.'), ('Push on assignment?', 'If notifications enabled in Settings.'), ('Filter by project?', 'Filter chip or search on hub.')],
        "related": [('../project/taskboard.html', 'Taskboard', 'Web kanban view.'), ('projects.html', 'Mobile Projects', 'Project context.'), ('timesheet.html', 'Mobile Timesheet', 'Log time after task work.'), ('insights.html', 'Mobile Insights', 'Task status donuts.')],
        "callouts": [('tip', 'End of site visit', 'Update task status + timesheet entry before leaving connectivity.'), ('note', 'Offline badge', 'Pending sync icon on row — do not logout until cleared.')],
    },
    "mobile/timesheet.html": {
        "audience": 'Mobile employees logging daily hours — Record day FAB, week grid, entry types, project picker, sync with web HRMS timesheet validation.',
        "info_title": 'Mobile time capture',
        "info_body": 'Primary action for field staff — tap FAB same day work occurs for best accuracy.',
        "concepts": [('Record day FAB', "Floating action button to log today's hours quickly."), ('Week grid', 'Compact Mon–Sun cells with totals row.'), ('Entry types', 'Billable, non-billable, leave — same enums as web.'), ('Project picker', 'Search projects for billable allocation.'), ('Sync with web', 'Validation rules and week lock identical to HRMS timesheet.'), ('Offline entry', 'Queued until sync — red indicator until cleared.')],
        "permissions": [('Individual contributor', 'Log and edit own open weeks.'), ('Manager', 'Usually web for report timesheets — mobile self only.'), ('Field worker', 'Primary user — daily FAB workflow.'), ('Finance', 'No entry — review on web invoices.')],
        "controls": [('Record day FAB', 'Quick add today.', 'Opens entry form.'), ('Week navigation', 'Prev/next week arrows.', 'Locked weeks read-only.'), ('Day cell tap', 'Edit that day.', 'Multiple rows per day.'), ('Entry type picker', 'Billable/non-billable/leave.', 'Billable requires project.'), ('Project search', 'Typeahead picker.', 'Recent projects first.'), ('Hours input', 'Decimal or H.MM.', 'Validation hints inline.'), ('Sync status', 'Cloud icon when pending.', 'Tap for error detail.')],
        "mistakes": [('Logging full week on Sunday only', 'Recall error prone — FAB daily habit.'), ('Billable without deliverable', 'Same rules as web — may warn or block submit.'), ('Force quit before sync', 'Queued entries may persist — reopen app to sync.')],
        "faq": [('Week lock same as web?', 'Yes — mobile cells lock when HR closes week.'), ('Deliverable picker on mobile?', 'If required by org — may be second step after project.'), ('Manager approve on mobile?', 'Approval workflows typically web.'), ('Conflict on sync?', 'Server wins or merge dialog — follow on-screen resolution.')],
        "related": [('../hrms/timesheet.html', 'HRMS Timesheet', 'Web full grid.'), ('insights.html', 'Mobile Insights', 'Charts from logged hours.'), ('projects.html', 'Mobile Projects', 'Confirm project before billable.'), ('../hrms/dashboard.html', 'HRMS Dashboard', 'Utilization after logging.')],
        "callouts": [('warning', 'Sync before week lock', 'Queued mobile entries must sync before HR payroll lock.'), ('tip', 'FAB habit', 'Tap Record day when leaving client site — while project name fresh.')],
    },
    "project/accounts.html": {
        "audience": 'Account managers and sales staff maintaining client master records — project counts, revenue concentration, and links to Sales POs and HRMS invoices.',
        "info_title": 'Client register',
        "info_body": 'Accounts are the client anchor — projects, bids, POs, and invoices reference the same account record.',
        "concepts": [('Account register', 'Clients with industry, region, project count, active contract indicators.'), ('CREATE account', 'New client record with billing contacts and terms.'), ('Account summary charts', 'Revenue concentration and project count bars.'), ('Row navigation', 'Drill to projects and contacts on account.'), ('Cross-module linkage', 'Sales bids/POs and HRMS invoices share account picker.')],
        "permissions": [('Account manager', 'Create/edit owned accounts; view all projects on account.'), ('Sales', 'Create accounts during bid flow; read register.'), ('Project manager', 'Read-only account on projects; cannot edit billing terms.'), ('Finance', 'Edit billing address, tax IDs, payment terms.')],
        "controls": [('CREATE account', 'New client wizard.', 'Duplicate check by name.'), ('SHOW / SORT / Filter', 'Active accounts, search.', 'Lux header.'), ('Summary charts', 'Revenue and concentration.', 'Team filter if enabled.'), ('Row click', 'Account detail/projects.', 'May open modal or page.'), ('Merge accounts', 'Admin action.', 'Rare — dedupe duplicates.'), ('Export', 'Account list.', 'CRM sync complement.'), ('Link from project', 'Account on project hero.', 'Two-way nav.')],
        "mistakes": [('Duplicate account names', 'Breaks invoice and PO search — merge or use distinct legal names.'), ('Stale billing contact', 'Invoice emails bounce — finance updates on account before send.'), ('Account without projects', 'Orphan from deleted projects — archive inactive accounts.')],
        "faq": [('Account vs project?', 'Account = client company; Project = one delivery engagement for that client.'), ('Who can merge duplicates?', 'Typically admin — request via ticket.'), ('CRM sync?', 'Salesforce account ID field when integration enabled.'), ('Multiple contacts?', 'Contacts tab on account detail — primary used on invoices.')],
        "related": [('project-list.html', 'Project List', 'Filter projects by account.'), ('../sales/bid-requests.html', 'Bid Requests', 'Bids tied to accounts.'), ('../hrms/invoices.html', 'Invoices', 'Billing per account.'), ('../sales/purchase-orders.html', 'Purchase Orders', 'Contracts per client.')],
        "callouts": [('info', 'Single source of truth', 'Fix client name on account record — propagates to new bids, POs, projects.'), ('warning', 'Duplicate accounts', 'Run search before CREATE — duplicates harm Top accounts charts.')],
    },
    "project/calendar.html": {
        "audience": 'PMs and team members viewing milestones, tasks, and leave on a calendar — month/week views with drag reschedule where permitted.',
        "info_title": 'Schedule visualization',
        "info_body": 'Complements Gantt on team-capacity — calendar shows day-level events for standups and client calls.',
        "concepts": [('Month / week views', 'Toggle grid density for planning horizon.'), ('Event types', 'Deliverables, tasks, leave overlays with color coding.'), ('Drag reschedule', 'Move events to new dates — updates underlying record if permitted.'), ('Filters', 'Project, team, event type toggles.'), ('Leave overlay', 'HRMS leave visible to avoid scheduling on PTO.')],
        "permissions": [('Project manager', 'Drag reschedule deliverables and tasks in scope.'), ('Team member', 'View team calendar; drag own tasks if enabled.'), ('People manager', 'View leave overlays for team.'), ('Viewer', 'Read-only calendar.')],
        "controls": [('Month/week toggle', 'Switch view density.', 'Persisted locally.'), ('Event type filters', 'Show/hide deliverables, tasks, leave.', 'Reduce noise.'), ('Project filter', 'One project focus.', ''), ('Drag event', 'Reschedule date.', 'Permission gated.'), ('Click event', 'Open detail popover.', 'Jump to record.'), ('Today button', 'Scroll to current date.', ''), ('Export iCal', 'If enabled.', 'Subscribe in Outlook.')],
        "mistakes": [('Dragging client milestone without PM', 'Date changes may violate contract — confirm permission before drag.'), ('Hide leave filter', 'Double-book meetings on PTO — keep leave overlay on.'), ('Calendar only planning', 'No capacity check — cross-reference team-capacity for overload.')],
        "faq": [('Calendar vs Gantt?', 'Calendar = day events; Gantt = project bars on team-capacity.'), ('Do drag updates sync?', 'Yes to deliverable/task dates — audit logged.'), ('External calendar sync?', 'iCal export one-way — bi-directional needs integration.'), ('Holiday display?', 'Public holidays from admin config.')],
        "related": [('team-capacity.html', 'Team Capacity', 'Gantt and allocation.'), ('deliverables.html', 'Deliverables', 'Source milestone events.'), ('taskboard.html', 'Taskboard', 'Task due dates on calendar.'), ('../hrms/attendance.html', 'Attendance', 'Leave source context.')],
        "callouts": [('tip', 'Sprint planning', 'Week view + project filter for iteration planning meeting.'), ('warning', 'Drag permissions', 'Unauthorized date slips may breach SLA — PM approval workflows exist in some orgs.')],
    },
    "project/chat.html": {
        "audience": 'Project teams communicating in channels and DMs — threads, mentions, attachments within Tracopus Luxury UI collaboration layer.',
        "info_title": 'Team messaging',
        "info_body": 'Use channels per project or workstream — decisions with lasting value should move to notes or file-manager.',
        "concepts": [('Channel list', 'Project and team channels with unread badges.'), ('Direct messages', '1:1 conversations outside channel noise.'), ('Thread replies', 'Reply in thread to keep channel readable.'), ('Attachments', 'Share files inline — prefer file-manager for final docs.'), ('Mentions', '@user triggers notification per user prefs.')],
        "permissions": [('Project member', 'Post in project channels; DM teammates.'), ('Project manager', 'Create channels; moderate if enabled.'), ('Non-member', 'No channel access — DM only if org allows.'), ('Guest', 'Limited channel invite on some deployments.')],
        "controls": [('Channel list', 'Switch conversations.', 'Unread counts.'), ('New message', 'Compose bar.', 'Markdown subset.'), ('Thread', 'Reply in thread.', 'Collapse in UI.'), ('Attach file', 'Upload to message.', 'Size limit.'), ('@mention', 'Notify user.', 'Respects mute.'), ('Search in channel', 'Find past messages.', 'Date filter.'), ('Create channel', 'PM action.', 'Link to project.')],
        "mistakes": [('Decisions only in chat', 'Lost after scroll — copy to pinned note.'), ('@channel abuse', 'Notification fatigue — mention individuals.'), ('Sensitive files in DM', 'Same retention as channels — use restricted file-manager folders.')],
        "faq": [('Chat vs email?', 'Chat for fast team coordination; client formal comms often email outside Tracopus.'), ('Retention policy?', 'Org admin sets — may delete after N days.'), ('Mobile chat?', 'Push notifications via mobile app if enabled.'), ('Integrations?', 'Slack/Teams bridge org-specific.')],
        "related": [('notes.html', 'Notes', 'Persist decisions from chat.'), ('file-manager.html', 'File Manager', 'Canonical documents.'), ('project-details.html', 'Project Details', 'Project context.'), ('search.html', 'Search', 'May index chat if enabled.')],
        "callouts": [('tip', 'Kickoff channel', 'One channel per project; pin link to file-manager root.'), ('note', 'Notifications', 'Tune in HRMS Settings if mentions overwhelm.')],
    },
    "project/dashboard.html": {
        "audience": 'Portfolio managers and PMs monitoring active project counts, overdue work, and billable hours trends. Individual contributors may see a scoped My view.',
        "info_title": 'Portfolio pulse check',
        "info_body": 'Open Monday morning before standups — KPI tiles and trend charts reflect active header filters.',
        "concepts": [('Portfolio KPIs', 'Active projects, overdue count, billable hours in summary strip tiles.'), ('My vs team views', 'Toggle personal assigned work vs org portfolio scope.'), ('Trend charts', 'Project creation and completion over six months.'), ('Quick links', 'Jump to project list, taskboard, capacity from dashboard widgets.'), ('Filter inheritance', 'Team and date filters on header apply to all dashboard charts.')],
        "permissions": [('Individual contributor', 'My view only — assigned projects and personal overdue tasks.'), ('Project manager', 'Team-scoped portfolio KPIs and trends.'), ('Portfolio manager', 'Full org or multi-team dashboard.'), ('Executive', 'Read-only KPIs without create actions.')],
        "controls": [('My / Team toggle', 'Switch portfolio scope.', 'Persists per session.'), ('Summary strip', 'KPI tiles + trend charts.', 'Expand/collapse.'), ('Team filter', 'Org unit scope.', 'Required for fair comparisons.'), ('Quick link: Project List', 'Jump to register.', ''), ('Quick link: Taskboard', 'Jump to kanban.', ''), ('Quick link: Capacity', 'Jump to team capacity.', ''), ('Date range', 'Scope trends.', 'If shown on header.')],
        "mistakes": [('Reading KPIs without team filter', 'Blended org numbers hide struggling teams — scope first.'), ('Ignoring overdue tile', 'Small overdue count still blocks client milestones — drill to project list.'), ('Dashboard only, never taskboard', "KPIs lag — taskboard shows today's actionable cards.")],
        "faq": [('Does dashboard create projects?', 'No — read-only analytics; use Project List CREATE.'), ('How often do charts refresh?', 'On filter change and page load — not real-time websocket.'), ('Billable hours source?', 'HRMS timesheet entries linked to projects.'), ('Can I export dashboard?', 'Use Reports module for exportable datasets.')],
        "related": [('project-list.html', 'Project List', 'Drill into register from overdue KPI.'), ('taskboard.html', 'Taskboard', 'Daily execution view.'), ('reports.html', 'Reports', 'Exportable portfolio data.'), ('../hrms/dashboard.html', 'HRMS Dashboard', 'Personal utilization complement.')],
        "callouts": [('info', 'Filter discipline', 'Set team scope once per session — all summary charts inherit it.'), ('tip', 'Executive readout', 'Collapse strip to KPI tiles only for screenshot-friendly status emails.')],
    },
    "project/deliverable-details.html": {
        "audience": 'Assignees and PMs working a single milestone — work items, hour variance, documents, and status on one deliverable record.',
        "info_title": 'Milestone workspace',
        "info_body": 'Opened from Deliverables register — drill into work items and est vs actual before status meetings.',
        "concepts": [('Deliverable header', 'Title, dates, estimate hours, assignee, status, parent project link.'), ('Work items tab', 'Linked activities and tasks executing this milestone.'), ('Est vs actual', 'Planned hours vs logged timesheet hours comparison panel.'), ('Documents', 'Attachments specific to deliverable — SOW excerpts, sign-offs.'), ('Status updates', 'Progress milestone through delivery states.')],
        "permissions": [('Project manager', 'Full edit header, estimates, work item links.'), ('Assignee', 'Update status, log work via timesheet, upload docs.'), ('Delivery lead', 'Edit estimates and dates; reassign.'), ('Client viewer', 'Read-only if external sharing enabled.')],
        "controls": [('Edit header', 'Title, dates, estimate.', 'Audit logged.'), ('Work items tab', 'Add/link activities.', 'Opens work-items context.'), ('Est vs actual panel', 'Plan vs logged hours.', 'Updates with timesheet.'), ('Documents upload', 'Attach files.', 'Also in file-manager.'), ('Status control', 'Advance milestone.', 'May notify assignee.'), ('Project link', 'Jump to project-details.', 'Breadcrumb nav.'), ('Comments', 'Discussion thread.', 'If enabled.')],
        "mistakes": [('Editing estimate after work started', 'Distorts variance history — use change log note for audit.'), ('Work items not linked', 'Hours booked to project only miss deliverable variance — link activities.'), ('Documents only in chat', 'Formal sign-offs belong in Documents tab.')],
        "faq": [('How to improve est vs actual?', 'Log hours to deliverable on timesheet; keep estimate current.'), ('Can I split deliverable?', 'Create child deliverables under same project — no automatic split.'), ('Who sees documents?', 'Project members with file permission — same as file-manager rules.'), ('Blocked status?', 'Use when waiting on client — excludes from on-track timeline metrics if configured.')],
        "related": [('deliverables.html', 'Deliverables', 'Back to register.'), ('work-items.html', 'Work Items', 'Create activities for this milestone.'), ('../hrms/timesheet.html', 'Timesheet', 'Log hours to this deliverable.'), ('task-activity.html', 'Task Activity', 'Detailed activity list.')],
        "callouts": [('warning', 'Variance threshold', 'Actual &gt; 120% of estimate — escalate to PM before continuing work.'), ('tip', 'Status meetings', 'Open est vs actual panel on screen share before discussing slip.')],
    },
    "project/deliverables.html": {
        "audience": 'Project managers and delivery leads tracking milestones and work packages — status, dates, estimates, and summary analytics across one or all projects.',
        "info_title": 'Milestone register',
        "info_body": 'Use with Est vs Actual reports — every deliverable should have hour estimates before work starts.',
        "concepts": [('Deliverable register', 'Hierarchy list with status, due dates, assignee, estimate hours.'), ('CREATE deliverable', 'Add milestone linked to parent project.'), ('Summary charts', 'Status mix and timeline health donuts in strip.'), ('SHOW / SORT / Filter', 'Status presets and text search on title.'), ('Est vs actual context', 'Estimates here compare to timesheet actuals on reports.')],
        "permissions": [('Project manager', 'Create/edit all deliverables in scope.'), ('Delivery lead', 'Edit assigned deliverables; create sub-packages.'), ('Team member', 'View; update status on assigned items.'), ('Finance', 'Read-only estimates for planning exports.')],
        "controls": [('CREATE deliverable', 'New milestone form.', 'Requires project link.'), ('SHOW / SORT / Filter', 'Status and search.', 'Standard Lux header.'), ('Summary strip', 'Status and timeline donuts.', 'Respects filters.'), ('Row click', 'Open deliverable-details.', 'Work items tab inside.'), ('Project filter', 'Scope to one project.', 'From header or pre-nav.'), ('Export', 'Deliverable list download.', 'Report input.'), ('Bulk status', 'Multi-select if enabled.', 'PM role.')],
        "mistakes": [('Zero estimate on deliverable', 'Est vs Actual report shows 100% variance — set estimate at create.'), ('Flat list ignoring hierarchy', 'Parent/child structure affects rollup — use tree view when available.'), ('Past due without status update', 'Timeline health chart lies — mark blocked or extend date.')],
        "faq": [('Deliverable vs work item?', 'Deliverable = milestone; work item = task/activity executing the work.'), ('Can one deliverable span projects?', 'No — each belongs to one project; link related items via notes.'), ('How do actual hours arrive?', 'Timesheet entries tagged to deliverable on billable rows.'), ('Default statuses?', 'Org-configured — typical: not started, in progress, complete.')],
        "related": [('deliverable-details.html', 'Deliverable Details', 'Single milestone workspace.'), ('project-details.html', 'Project Details', 'Parent project hero.'), ('work-items.html', 'Work Items', 'Activities linked here.'), ('reports.html', 'Reports', 'Est vs Actual (Deliverables).')],
        "callouts": [('tip', 'Estimate workshop', 'Block 30 minutes after project kickoff to fill all deliverable estimates.'), ('info', 'Timeline health', 'Donut due-soon slice — sort register by date to action top five.')],
    },
    "project/feedback.html": {
        "audience": 'Project managers and client liaisons capturing structured feedback — ratings, comments, status, linked to projects and deliverables.',
        "info_title": 'Client feedback register',
        "info_body": 'Log feedback after milestones — links to project context for retrospective and account reviews.',
        "concepts": [('Feedback register', 'Items with rating, comment, status, project/deliverable link.'), ('CREATE feedback', 'New entry with score and narrative.'), ('Rating capture', 'Numeric or star score per org config.'), ('Status workflow', 'Open → acknowledged → resolved.'), ('Project filter', 'Scope list to engagement.')],
        "permissions": [('Project manager', 'Create and resolve feedback on owned projects.'), ('Account manager', 'Create/view for client accounts.'), ('Team member', 'Submit internal feedback if enabled.'), ('Client (external)', 'Submit via portal if licensed — not this register.')],
        "controls": [('CREATE feedback', 'New feedback modal.', 'Requires project link.'), ('Rating field', 'Score input.', 'Required on create.'), ('Comment', 'Free text narrative.', 'Rich text if enabled.'), ('Status', 'Open/acknowledged/resolved.', 'PM updates.'), ('Project filter', 'Dropdown scope.', ''), ('Row detail', 'Full thread/history.', ''), ('Export', 'Feedback list.', 'QBR input.')],
        "mistakes": [('Anonymous harsh feedback', 'Use constructive template — identifiable entries improve follow-up.'), ('No project link', 'Orphan feedback useless in account review — always link project.'), ('Leaving status Open', 'Resolve after action taken — Open queue grows unbounded.')],
        "faq": [('Who sees feedback?', 'Project members and account managers — not all company.'), ('External client submissions?', 'May arrive via portal into same register with badge.'), ('Rating scale?', 'Org config — typically 1–5 or 1–10.'), ('Link to deliverable?', 'Optional — helps tie to milestone retros.')],
        "related": [('project-details.html', 'Project Details', 'Context for feedback.'), ('deliverable-details.html', 'Deliverable Details', 'Milestone-specific feedback.'), ('accounts.html', 'Accounts', 'Account-level review.'), ('notes.html', 'Notes', 'Informal notes vs formal feedback.')],
        "callouts": [('tip', 'Milestone retro', 'CREATE feedback within 48 hours of deliverable complete while context fresh.'), ('info', 'Account QBR', 'Export resolved feedback for quarterly business reviews.')],
    },
    "project/file-manager.html": {
        "audience": 'Project teams storing and sharing delivery documents — folder tree, upload, preview, and folder-level permissions within project scope.',
        "info_title": 'Project document hub',
        "info_body": 'Prefer file-manager over chat attachments for version-controlled deliverables clients may audit.',
        "concepts": [('Folder tree', 'Hierarchical browser scoped to project context.'), ('Upload', 'Drag-drop or file picker — multiple files.'), ('Preview', 'Inline preview for PDF, images, office formats.'), ('Folder permissions', 'Restrict subfolders to roles or individuals.'), ('Project link', 'All files scoped to active project — switch project in header.')],
        "permissions": [('Project member', 'Upload/download on granted folders.'), ('Project manager', 'Create folders; set permissions; delete files.'), ('Viewer role', 'Download/read only.'), ('External guest', 'Limited folder if sharing portal enabled.')],
        "controls": [('Folder tree nav', 'Expand/collapse hierarchy.', 'Breadcrumb path.'), ('Upload', 'Drag-drop zone.', 'Size limits per org.'), ('New folder', 'Create subfolder.', 'Inherits parent perm.'), ('Preview', 'Inline viewer.', 'Open in new tab option.'), ('Permissions dialog', 'Folder ACL.', 'PM/admin.'), ('Download', 'Single or zip multi.', ''), ('Delete / rename', 'PM or owner.', 'Audit logged.')],
        "mistakes": [('Sensitive data in root folder', 'Default member read — use restricted subfolders for finance/legal.'), ('Chat as document store', 'Attachments lost in scroll — move final files to file-manager.'), ('Duplicate filenames', 'Overwrite rules vary — use version suffix convention.')],
        "faq": [('Storage limits?', 'Org quota — error on upload when exceeded.'), ('Version history?', 'May be integration-dependent — not always native.'), ('Cross-project files?', 'No — copy manually or use shared account folder if exists.'), ('Mobile upload?', 'Mobile may view — upload typically web.')],
        "related": [('project-details.html', 'Project Details', 'Files tab shortcut here.'), ('chat.html', 'Chat', 'Informal file sharing.'), ('deliverable-details.html', 'Deliverable Details', 'Milestone attachments.'), ('search.html', 'Search', 'Find files by name.')],
        "callouts": [('alert', 'Permissions', 'Set folder ACL before upload — inherited read on root exposes to all members.'), ('tip', 'Client deliverables', 'Use folder naming: Client-visible vs Internal-only.')],
    },
    "project/index.html": {
        "audience": 'Project managers, delivery leads, and team members navigating the eighteen-screen Project module — portfolio, tasks, capacity, collaboration, and reporting in Tracopus Luxury UI.',
        "info_title": 'Delivery command center',
        "info_body": 'Project module is where PO-backed work executes: tasks, deliverables, files, chat, and reports. Start at Dashboard or Project List daily.',
        "concepts": [('Portfolio', 'Collection of delivery projects with status, dates, account, PO link, and team assignment.'), ('Deliverable', 'Milestone or work package within a project — holds estimates and linked work items.'), ('Work item / activity', 'Actionable task with checklist, assignee, status, and optional deliverable link.'), ('Taskboard', 'Kanban view of work items across columns — drag-and-drop status changes.'), ('Team capacity', 'Utilization, roster, timeline, and Gantt views for resource planning.'), ('Lux summary strip', 'Collapsible KPI and chart row on list screens — filters drive all panels.')],
        "permissions": [('Individual contributor', 'Taskboard, work items, notes, chat, file access on assigned projects.'), ('Project manager', 'Full module except admin settings; create projects, deliverables, reports.'), ('Portfolio manager', 'Dashboard, project list, capacity, reports across teams.'), ('Account lead', 'Accounts register, project list filtered to client, read-only finance fields.')],
        "controls": [('Module grid', 'Links to all 18 project guides.', 'Primary navigation.'), ('Sidebar', 'Project page list.', 'Matches app menu order.'), ('Cross-links', 'Dashboard, taskboard, reports highlighted.', 'Onboarding paths.'), ('HRMS link', 'Timesheet bills against projects.', 'See timesheet guide.'), ('Sales link', 'PO spawn creates projects.', 'See purchase-order-details.'), ('Search guide link', 'Global search across module.', 'search.html')],
        "mistakes": [('Jumping to taskboard without project context', 'Filters too broad — set project filter first for meaningful WIP view.'), ('Ignoring estimate gaps', 'Project list Estimate gaps panel flags planning debt — fix before status reviews.')],
        "faq": [('How many project screens do I need daily?', 'Most roles: Dashboard, Project List, Taskboard, and Timesheet (HRMS).'), ('Where do I create a project?', 'Project List CREATE or from Sales PO detail — not from index.'), ('Is chat separate from file manager?', 'Yes — chat for conversations; file manager for structured document tree.'), ('Mobile parity?', 'Mobile covers tasks, projects, timesheet — see Mobile module guides.')],
        "related": [('dashboard.html', 'Project Dashboard', 'Portfolio KPIs and trends.'), ('project-list.html', 'Project List', 'Main register with 17 charts.'), ('taskboard.html', 'Taskboard', 'Kanban daily standup view.'), ('team-capacity.html', 'Team Capacity', 'Resource planning views.')],
        "callouts": [('tip', 'PM weekly loop', 'Dashboard → estimate gaps on Project List → Taskboard WIP → Team capacity timeline.'), ('note', 'Shared vs private', 'Project sharing flags affect search and register visibility — set on project details.')],
    },
    "project/notes.html": {
        "audience": 'Team members capturing personal and shared notes — rich text, tags, project links, pin and archive for knowledge retention.',
        "info_title": 'Knowledge capture',
        "info_body": 'Use notes for working context; use feedback for formal client ratings — different purposes.',
        "concepts": [('Notes list', 'Personal and shared notes with tags and project links.'), ('CREATE note', 'Rich text editor with @mentions if enabled.'), ('Pin / archive', 'Keep active notes top; archive done topics.'), ('Project link', 'Associate note with delivery context for search.'), ('Tags', 'Cross-cut notes beyond project hierarchy.')],
        "permissions": [('Individual contributor', 'Personal notes; shared notes on member projects.'), ('Project manager', 'Shared team notes; pin kickoff/decision logs.'), ('All project members', 'View shared notes on joined projects.'), ('Non-member', 'No access to project-linked shared notes.')],
        "controls": [('CREATE note', 'New rich text note.', 'Mark shared if team-visible.'), ('Pin', 'Stick to top of list.', 'Per-user pins.'), ('Archive', 'Hide without delete.', 'Recoverable.'), ('Project link', 'Searchable association.', 'Optional.'), ('Tags', 'Freeform or preset.', 'Filter by tag.'), ('Search', 'Full text in notes.', 'Header search includes notes.'), ('Edit / delete', 'Owner or PM on shared.', 'Audit may log deletes.')],
        "mistakes": [('Client secrets in shared notes', 'Shared visible to all project members — use file-manager restricted folders for sensitive docs.'), ('Notes instead of taskboard', 'Action items belong on tasks — notes for decisions and context.'), ('Never archiving', 'List clutter — archive after milestone decision logged elsewhere.')],
        "faq": [('Notes vs chat?', 'Notes = persistent knowledge; chat = ephemeral conversation — link note from chat for decisions.'), ('Do notes appear in global search?', 'Yes — project/search.html indexes note titles and body.'), ('Markdown support?', 'Rich text editor — markdown paste varies by version.'), ('Mobile notes?', 'Limited mobile — use web for long edits.')],
        "related": [('search.html', 'Search', 'Find notes globally.'), ('project-details.html', 'Project Details', 'Link notes to project.'), ('chat.html', 'Chat', 'Ephemeral vs persistent.'), ('feedback.html', 'Feedback', 'Formal client feedback.')],
        "callouts": [('tip', 'Decision log', "Shared note titled 'Decision log' pinned on project kickoff."), ('note', 'PII', 'Do not store credentials or personal data in notes — use secrets vault.')],
    },
    "project/project-details.html": {
        "audience": 'Project managers and team leads managing one delivery engagement — members, deliverables, files, settings, and status workflow from the project hero.',
        "info_title": 'Single project hub',
        "info_body": 'Central workspace after clicking a row on Project List — tabs organize members, deliverables, files, and settings.',
        "concepts": [('Project hero', 'Name, status badge, dates, account, PO reference, team, billable settings.'), ('Tab bar', 'Overview, Members, Deliverables, Files, Settings, Activity — org may hide tabs.'), ('Members panel', 'Add/remove people with project roles (PM, member, viewer).'), ('Status workflow', 'New → assigned → in progress → completed → closed.'), ('Billable settings', 'Billable type, automation flags, sharing visibility.')],
        "permissions": [('Project manager', 'Full edit all tabs; status transitions; member management.'), ('Team member', 'View project; edit assigned deliverables/tasks; upload files if granted.'), ('Account manager', 'Read-only overview; comment on activity.'), ('Portfolio manager', 'Edit status and reassign PM.')],
        "controls": [('Edit hero', 'Name, dates, description.', 'Some fields lock when closed.'), ('Status dropdown', 'Advance workflow.', 'May trigger notifications.'), ('Members tab', 'Add/remove roles.', 'PM at least one required.'), ('Deliverables tab', 'Shortcut to hierarchy.', 'Or use deliverables register.'), ('Files tab', 'Project-scoped documents.', 'Links file-manager context.'), ('Settings tab', 'Billable, automation, sharing.', 'Finance-sensitive.'), ('Activity feed', 'Recent changes.', 'Audit trail.')],
        "mistakes": [('Closing project with open tasks', 'Orphan work items — complete or reassign before Closed status.'), ('Wrong sharing flag', 'Private projects invisible in search — set shared when cross-team collaboration needed.'), ('Missing PO on contracted project', 'Add PO ref on hero before first invoice.')],
        "faq": [('How do I add deliverables?', 'Deliverables tab or project/deliverables register filtered to this project.'), ('Can members change status?', 'Usually PM-only — members update tasks on taskboard.'), ('Where is chat?', 'Separate chat screen — channels may auto-link to project.'), ('Billable automation?', 'Settings tab — auto-rules org-specific; confirm with admin.')],
        "related": [('deliverables.html', 'Deliverables', 'Hierarchy for this project.'), ('taskboard.html', 'Taskboard', 'Filter to this project.'), ('file-manager.html', 'File Manager', 'Folder tree scoped here.'), ('../hrms/timesheet.html', 'Timesheet', 'Bill hours against this project.')],
        "callouts": [('success', 'Kickoff complete', 'Members added · PO on hero · first deliverable dated · billable settings confirmed.'), ('note', 'Activity feed', 'Use for client-visible audit — avoid informal sensitive comments.')],
    },
    "project/project-list.html": {
        "audience": 'Project managers and portfolio leads running the master project register — create projects, fix estimate gaps, and analyze seventeen summary charts.',
        "info_title": 'Primary PM register',
        "info_body": 'Most PM time splits between this screen and Taskboard — use SHOW presets and estimate gaps list weekly.',
        "concepts": [('Project register', 'Grid or list of projects with status, account, dates, team, priority, PO link.'), ('Seventeen summary charts', 'Status, timeline health, billing mix, PO linkage, automation, complexity, hours estimated.'), ('CREATE project', 'Wizard: type, team, dates, account, PO optional.'), ('Estimate gaps list', 'Clickable projects missing hour estimates — planning completeness signal.'), ('SHOW presets', 'All · Active · Completed · My projects quick filters.')],
        "permissions": [('Project manager', 'Create/edit projects in scope; full register and charts.'), ('Portfolio manager', 'All teams; reassign PM; archive completed.'), ('Team member', 'My projects preset; read-only on others unless shared.'), ('Sales / finance', 'Read-only for PO and billing fields.')],
        "controls": [('CREATE project', 'New project wizard.', 'Link PO when available.'), ('SHOW presets', 'All/Active/Completed/My.', 'Combines with SORT.'), ('SORT / Filter', 'Column sort, text search.', 'Standard Lux header.'), ('Team selection', 'Multi-team scope.', 'Drives all 17 charts.'), ('Estimate gaps', 'List of missing estimates.', 'Click to open project.'), ('Grid / List toggle', 'Card vs table.', ''), ('Row click', 'Open project-details.', 'Hero + tabs.'), ('Summary strip', '17 chart gallery.', 'Collapse for register focus.')],
        "mistakes": [('Creating project without PO for contracted work', 'Invoice and traceability break — link PO from Sales first.'), ('Ignoring timeline health donut', 'Due-soon slice needs date edits on project-details before overdue.'), ('My projects only for PMs', 'PMs must clear All/Active view for team accountability.')],
        "faq": [('What are estimate gaps?', 'Projects without planned hours on deliverables — hurts Est vs Actual reports.'), ('How many charts respect filters?', 'All seventeen when summary strip expanded.'), ('Can I bulk update status?', 'Bulk actions vary — often per-row on project-details.'), ('PO linkage donut meaning?', 'Shows projects missing PO — finance follow-up needed.')],
        "related": [('project-details.html', 'Project Details', 'Single project hub.'), ('dashboard.html', 'Project Dashboard', 'Portfolio-level KPIs.'), ('../sales/purchase-orders.html', 'Purchase Orders', 'Source PO for linkage.'), ('reports.html', 'Reports', 'Est vs Actual exports.')],
        "callouts": [('warning', 'Missing PO', 'PO linkage donut red slice — fix before client billing cycle.'), ('tip', 'Planning sprint', 'Export estimate gaps list weekly; assign estimates in deliverables screen.')],
    },
    "project/reports.html": {
        "audience": 'Analysts, PMs, and finance exporting operational data — twelve report types including utilization, est vs actual, and resource allocation.',
        "info_title": 'Export and compliance hub',
        "info_body": 'Set date range and team filter once — applies to all report runs on this page.',
        "concepts": [('Report catalog', 'Twelve cards: Data Dump, Utilization variants, Est vs Actual, PO estimation, etc.'), ('Date range picker', 'Scopes all report outputs to period.'), ('Team filter', 'Limit to org units for manager views.'), ('Export formats', 'CSV/Excel per report — large extracts async on some deployments.'), ('Est vs actual pair', 'Deliverable-level and activity-level variance reports.')],
        "permissions": [('Resource manager', 'Utilization and allocation reports.'), ('Project manager', 'Est vs Actual, Project Completion.'), ('Individual contributor', 'My Utilization, My Timesheet Data only.'), ('Finance / compliance', '15% Report, Data Dump, Weekly PO Estimation.')],
        "controls": [('Report catalog grid', 'Select report type.', 'See embedded catalog table in guide.'), ('Date range', 'Start/end for extract.', 'Required before run.'), ('Team filter', 'Org scope.', 'Optional for personal reports.'), ('Run / Generate', 'Execute report.', 'May take seconds on large data.'), ('Download CSV/Excel', 'Save output.', 'Filename includes date stamp.'), ('Report description', 'Purpose and audience per card.', 'Hover or expand.'), ('Schedule (if enabled)', 'Recurring email.', 'Admin configured.')],
        "mistakes": [('Full company Data Dump casually', 'PII and performance exposure — scope team and date minimally.'), ('Est vs Actual before estimates exist', 'Meaningless 100% variance — fix deliverables first.'), ('Wrong week boundary on utilization', 'Align date picker with payroll week — check timezone in Settings.')],
        "faq": [('Which report for billing?', 'My Timesheet Data or Data Dump with finance mapping — not Utilization alone.'), ('15% Report?', 'Org-specific compliance template — see finance for definition.'), ('Can I automate exports?', 'Scheduled reports if licensed — else manual download.'), ('Report data lag?', 'Timesheet lock may delay final numbers until HR closes week.')],
        "related": [('team-capacity.html', 'Team Capacity', 'Visual planning before export.'), ('deliverables.html', 'Deliverables', 'Fix estimates before Est vs Actual.'), ('../hrms/timesheet.html', 'Timesheet', 'Source hours for utilization.'), ('../charts.html', 'Charts guide', 'On-screen charts vs exported reports.')],
        "callouts": [('note', 'Data Dump sensitivity', 'Contains operational PII — follow secure transfer policy.'), ('tip', 'Month close', 'Run Est vs Actual (Deliverables) + Employee Utilization same date range.')],
    },
    "project/search.html": {
        "audience": 'Power users finding projects, tasks, people, files, and notes across Tracopus — global search with type filters and keyboard shortcut.',
        "info_title": 'Cross-module discovery',
        "info_body": 'Faster than navigating registers when you know a keyword — use type filters to narrow results.',
        "concepts": [('Global search', 'Single query box searches projects, tasks, people, files, notes.'), ('Type filters', 'Limit to entity type after initial query.'), ('Recent searches', 'Re-run prior queries from dropdown.'), ('Keyboard shortcut', 'Focus search from anywhere in web app (typically Ctrl/Cmd+K).'), ('Permission-aware', 'Results only include records your role may view.')],
        "permissions": [('All authenticated users', 'Search within permission scope.'), ('Admin', 'Broader index including archived if configured.'), ('Guest', 'Reduced index — assigned projects only.'), ('Same as register access', 'No elevation via search.')],
        "controls": [('Search input', 'Query string.', 'Min 2 chars typical.'), ('Type filter chips', 'Project/Task/Person/File/Note.', 'Combine with query.'), ('Result row', 'Title, snippet, module badge.', 'Click to navigate.'), ('Recent searches', 'History dropdown.', 'Clear history option.'), ('Keyboard shortcut', 'Open search palette.', 'See interface guide.'), ('Advanced (if enabled)', 'Date/team qualifiers.', 'Power users.'), ('No results help', 'Spelling, filters.', 'Link to docs.')],
        "mistakes": [('Searching before login scope loads', 'Incomplete index — wait for app shell ready.'), ('Too-broad single char', 'Performance — type full keyword.'), ('Expecting hidden private projects', 'Sharing flags exclude from index — normal.')],
        "faq": [('Does search include chat?', 'Org config — often messages excluded or limited.'), ('Mobile search?', 'Mobile has scoped search — not full global index.'), ('Search syntax?', 'Quotes for exact phrase on some deployments.'), ('Index delay?', 'New records appear within minutes — not always instant.')],
        "related": [('project-list.html', 'Project List', 'Browse when search too broad.'), ('notes.html', 'Notes', 'Note results open here.'), ('file-manager.html', 'File Manager', 'File result navigation.'), ('../interface.html', 'Luxury UI', 'Keyboard shortcuts.')],
        "callouts": [('tip', 'Cmd+K habit', 'Train muscle memory — faster than sidebar for known project names.'), ('info', 'Permission boundary', 'Search never shows records your role cannot open directly.')],
    },
    "project/task-activity.html": {
        "audience": 'PMs and team leads who need rich filters and five analytics charts on the activity register — checklist progress, priority mix, and outcomes.',
        "info_title": 'Analytics activity register',
        "info_body": 'Choose task-activity over taskboard when preparing status reports — five chart types summarize portfolio health.',
        "concepts": [('Activity register', 'Dense table of work items with priority, checklist %, outcome, type.'), ('Five activity charts', 'Status, priority, checklist progress, activity type, outcome donuts/bars.'), ('CREATE activity', 'Same modal as work-items with checklist template support.'), ('Bulk update', 'Multi-select status and assignee.'), ('Outcome tracking', 'Success / partial / blocked for retrospective analytics.')],
        "permissions": [('Project manager', 'Full create/bulk on scoped activities.'), ('Delivery lead', 'Bulk and analytics across team.'), ('Individual contributor', 'Edit assigned rows; limited bulk.'), ('Viewer', 'Read-only with chart access.')],
        "controls": [('CREATE activity', 'New item with checklist.', 'Link deliverable.'), ('Filters', 'Status, priority, project, assignee.', 'Lux header.'), ('Bulk select', 'Checkbox column.', ''), ('Bulk update bar', 'Status/assignee apply.', 'PM role.'), ('Summary charts', 'Five panel gallery.', 'Filter-scoped.'), ('Row detail', 'Full activity editor.', ''), ('Export', 'CSV for reports.', '')],
        "mistakes": [('Outcome never set', 'Outcome donut useless — set on complete for retrospectives.'), ('Checklist 0%', 'Break down tasks — large activities hide slip until due date.'), ('Export without filter', 'Huge CSV — set project and date filters first.')],
        "faq": [('Work items vs task-activity?', 'Same data — task-activity adds outcome field emphasis and five charts.'), ('Checklist progress calculation?', 'Done items / total items on activity.'), ('Blocked outcome?', 'Use when external dependency — appears in outcome donut.'), ('Can charts drill to rows?', 'Click segments where enabled to filter register.')],
        "related": [('taskboard.html', 'Taskboard', 'Kanban for daily moves.'), ('work-items.html', 'Work Items', 'Simpler register without outcome chart.'), ('reports.html', 'Reports', 'Est vs Actual export.'), ('team-capacity.html', 'Team Capacity', 'Who is overloaded.')],
        "callouts": [('info', 'Status report source', 'Screenshot five charts after setting project filter for steering deck.'), ('tip', 'Outcome hygiene', 'Set outcome when moving to Done — feeds quarterly retros.')],
    },
    "project/taskboard.html": {
        "audience": 'Individual contributors and PMs running daily standups — Kanban columns, drag-and-drop cards, and five taskboard analytics panels.',
        "info_title": 'Daily execution view',
        "info_body": 'Default screen for ICs — filter to your project, scan WIP columns, drag cards to reflect reality before standup ends.',
        "concepts": [('Kanban columns', 'Workflow stages as columns — cards represent work items with assignee, priority, due date.'), ('Drag-and-drop', 'Move cards across columns to update status — writes same backend as register views.'), ('WIP load', 'Column card counts show stage bottlenecks — pair with Delivery funnel chart.'), ('Card detail drawer', 'Open task without leaving board — checklist, comments, attachments.'), ('Five taskboard charts', 'Funnel, workflow mix, billable scope, flow snapshot, top categories.')],
        "permissions": [('Individual contributor', 'Move own cards; create tasks in allowed columns; view filtered boards.'), ('Project manager', 'Full board in scope; create in any column; reassign via card drawer.'), ('Delivery lead', 'Multi-project boards with project filter.'), ('Viewer', 'Read-only columns — no drag.')],
        "controls": [('Column drag-drop', 'Change task status.', 'Undo via drag back or drawer.'), ('Quick add task', 'Plus on column header.', 'Pre-selects column status.'), ('Project filter', 'Scope board to one project.', 'Essential for ICs.'), ('Assignee filter', 'My tasks vs team.', 'Combine with project.'), ('Priority / category filter', 'Narrow visible cards.', 'Header dropdowns.'), ('Card click', 'Open detail drawer.', 'Edit checklist inline.'), ('Summary strip', 'Five analytics charts.', 'Respects filters.')],
        "mistakes": [('Dragging without opening card', 'Miss checklist updates — open drawer for substantive work logs.'), ('No project filter on busy board', 'Hundreds of cards — always filter project first.'), ('Stale cards in Done column', 'Archive or close — Done WIP inflates funnel incorrectly.')],
        "faq": [('Does drag sync to work-items register?', 'Yes — same entity, instant sync.'), ('Can I customize columns?', 'Workflow stages org-configured — request admin for new stages.'), ('Offline drag on mobile?', 'Use mobile/tasks.html — changes queue offline.'), ('Billable scope donut?', 'Shows project vs non-project task mix on filtered board.')],
        "related": [('work-items.html', 'Work Items', 'Table view of same cards.'), ('task-activity.html', 'Task Activity', 'Analytics-heavy register.'), ('project-details.html', 'Project Details', 'Set project before boarding.'), ('../mobile/tasks.html', 'Mobile Tasks', 'Mobile task updates.')],
        "callouts": [('tip', 'Standup ritual', 'Share screen on filtered board — move cards live during meeting.'), ('note', 'WIP limits', 'Some orgs set column max — watch for warning badges.')],
    },
    "project/team-capacity.html": {
        "audience": 'Resource managers and PMs planning allocation — Overview gauges, Roster grid, Timeline bars, and Gantt project bars with team/date filters.',
        "info_title": 'Resource planning hub',
        "info_body": 'Use before committing to new project dates — Timeline and Gantt show overload weeks.',
        "concepts": [('Overview tab', 'Utilization gauges and heatmaps by person and week.'), ('Roster tab', 'People × availability grid with leave overlays.'), ('Timeline tab', 'Weekly allocation bars per person.'), ('Gantt tab', 'Project bars on shared timeline for portfolio scheduling.'), ('Team / date filters', 'Scope all tabs to org units and date windows.')],
        "permissions": [('Resource manager', 'Full all tabs; adjust allocations where editable.'), ('Project manager', 'View team capacity; propose assignments on project-details.'), ('People manager', 'Roster and Overview for direct reports.'), ('Individual contributor', 'Usually no access — see HRMS Dashboard utilization.')],
        "controls": [('Overview tab', 'Utilization gauges/heatmap.', 'Red = over 100%.'), ('Roster tab', 'Availability grid.', 'Leave from HRMS.'), ('Timeline tab', 'Weekly bars.', 'Drag if enabled.'), ('Gantt tab', 'Project timeline.', 'Zoom week/month.'), ('Team filter', 'Org unit scope.', 'All tabs.'), ('Date range', 'Window for charts.', 'Default often quarter.'), ('Export', 'Allocation export.', 'Reports overlap.')],
        "mistakes": [('Booking 100% on multiple projects', 'Timeline shows overlap — resolve before kickoff.'), ('Ignoring leave on roster', 'False availability — sync HRMS leave first.'), ('Gantt without date filter', 'Unreadable on large portfolios — narrow to one team.')],
        "faq": [('Capacity vs utilization?', 'Capacity = planned allocation; utilization = actual timesheet hours on HRMS Dashboard.'), ('Can I assign from here?', 'Some orgs enable drag-assign — else use project Members tab.'), ('Leave source?', 'HRMS timesheet leave rows and attendance.'), ('Gantt edit?', 'Read-only in many deployments — dates edited on project-details.')],
        "related": [('../hrms/dashboard.html', 'HRMS Dashboard', 'Actual utilization.'), ('project-list.html', 'Project List', 'Projects on Gantt.'), ('reports.html', 'Reports', 'Resource Allocation report.'), ('../hrms/timesheet.html', 'Timesheet', 'Actual hours source.')],
        "callouts": [('warning', 'Over-allocation', 'Heatmap red cells — defer new work or shift dates before committing client.'), ('tip', 'Staffing meeting', 'Start Overview tab, drill Timeline for disputed weeks.')],
    },
    "project/work-items.html": {
        "audience": 'Delivery leads and contributors managing activities across projects — register view with bulk actions and type/status analytics.',
        "info_title": 'Activity register',
        "info_body": 'Alternative to taskboard for dense filtering and bulk updates — same underlying work items.',
        "concepts": [('Work item register', 'Activities with project, deliverable, assignee, status, priority, type.'), ('CREATE work item', 'New activity with checklist support and deliverable link.'), ('Bulk actions', 'Multi-select status or assignee changes — PM permission.'), ('Summary analytics', 'Type and status distribution charts in strip.'), ('Checklist support', 'Sub-steps on activities tracked in activity charts.')],
        "permissions": [('Individual contributor', 'Create/edit own assigned work items.'), ('Project manager', 'Bulk update; create for any project in scope.'), ('Delivery lead', 'Full register in team scope.'), ('Viewer', 'Read-only register.')],
        "controls": [('CREATE work item', 'New activity modal.', 'Link deliverable recommended.'), ('SHOW / SORT / Filter', 'Status, priority, project.', 'Lux header pattern.'), ('Bulk select', 'Checkbox column.', 'Enables bulk bar.'), ('Bulk status/assignee', 'Apply to selection.', 'PM gated.'), ('Summary charts', 'Type and status donuts.', 'Filtered scope.'), ('Row click', 'Open detail drawer/page.', 'Same as taskboard card.'), ('Export', 'Activity list CSV.', 'Reports supplement.')],
        "mistakes": [('Bulk assign without notification check', 'Assignees miss new work — confirm notify on bulk bar.'), ('Activities without project', 'Non-project work skews taskboard billable donut — link project when billable.'), ('Ignoring checklist', 'Checklist progress donut stays red — break work into checkable steps.')],
        "faq": [('Work items vs task-activity?', 'Same entities — work-items emphasizes register; task-activity adds five chart types.'), ('Taskboard difference?', 'Kanban columns vs table — edits sync instantly.'), ('Can I import activities?', 'Bulk import via admin/integration — not from UI register.'), ('Checklist limits?', 'Org config — typically unlimited items per activity.')],
        "related": [('taskboard.html', 'Taskboard', 'Kanban view of same items.'), ('task-activity.html', 'Task Activity', 'Richer analytics register.'), ('deliverable-details.html', 'Deliverable Details', 'Link target for new items.'), ('reports.html', 'Reports', 'Est vs Actual (Activities).')],
        "callouts": [('tip', 'Bulk cleanup', 'Filter status=assigned + overdue; bulk reassign in one pass.'), ('note', 'Billable flag', 'Set on work item or inherit from project — affects timesheet suggestions.')],
    },
    "sales/bid-details.html": {
        "audience": 'Bid owners and sales managers editing a single opportunity — stage, value, documents, and PO linkage. Account managers review before executive approval.',
        "info_title": 'Single bid workspace',
        "info_body": 'Opened from Bid Requests row click — manage one opportunity end-to-end until Won/Lost.',
        "concepts": [('Bid header', 'Title, stage badge, owner, account, estimated value, key dates, study metadata.'), ('Stage progression', 'Buttons or dropdown to advance funnel — triggers activity log entry.'), ('Documents tab', 'Proposals, SOW drafts, client attachments.'), ('Activity log', 'Comments, stage changes, owner reassignments with timestamps.'), ('Link to PO', 'Create new PO or associate existing contract when bid wins.')],
        "permissions": [('Bid owner', 'Full edit on owned bids; stage advance; document upload.'), ('Sales manager', 'Edit team bids; reassign owner; approve stage jumps.'), ('Delivery lead', 'Read-only unless contributor on bid team.'), ('Finance', 'Read value and account; no stage edit.')],
        "controls": [('Stage control', 'Advance or regress stage.', 'Regress may be restricted.'), ('Edit header', 'Value, dates, study fields.', 'Audit logged.'), ('Documents tab', 'Upload/download attachments.', 'Version not always tracked — use naming convention.'), ('Activity log', 'Comments and system events.', '@mention if enabled.'), ('Link to PO', 'Create or associate PO.', 'Won stage typical trigger.'), ('CRM sync badge', 'Salesforce link status.', 'Click to retry sync if failed.'), ('Owner reassign', 'Manager action.', 'Notifies new owner.')],
        "mistakes": [('Advancing to Won without PO plan', 'Delivery team unprepared — create or link PO before or immediately on Won.'), ('Documents in email only', 'Attach to bid Documents tab — email threads are not searchable for audits.'), ('Stale value field', 'Forecast charts use header value — update after client negotiation.')],
        "faq": [('Can I reopen a Lost bid?', 'Org policy varies — may require manager approval and stage regression.'), ('How do I create PO from here?', 'Link to PO action on Won bids — pre-fills account and value.'), ('Who sees activity comments?', 'Bid team and managers with register access — not all employees.'), ('Does stage sync to Salesforce?', 'When CRM integration enabled — check sync badge after changes.')],
        "related": [('bid-requests.html', 'Bid Requests', 'Return to pipeline register.'), ('purchase-order-details.html', 'PO Details', 'After PO linked.'), ('../project/project-details.html', 'Project Details', 'If project spawned.'), ('../project/accounts.html', 'Accounts', 'Edit client on account record.')],
        "callouts": [('success', 'Win checklist', 'Value confirmed · PO created/linked · delivery lead notified · documents uploaded.'), ('warning', 'Stage regression', 'Moving backward may reset analytics — document reason in activity log.')],
    },
    "sales/bid-requests.html": {
        "audience": 'Sales representatives and managers running the bid pipeline — creating opportunities, advancing stages, and analyzing win rates. Delivery staff occasionally view bids linked to their POs.',
        "info_title": 'Daily sales register',
        "info_body": 'Open each morning to prioritize follow-ups using Pipeline age and Owner workload charts in the summary strip.',
        "concepts": [('Bid register', 'Sortable list/grid of open and closed bids with stage, owner, account, value, and dates.'), ('Twelve summary charts', 'Intake trend, win/loss, portfolio outcomes, pipeline age, geography, disciplines, CRM linkage.'), ('CREATE bid', 'Wizard for new bid with account, study type, owner, and initial stage.'), ('Stage progression', 'Move bids through funnel — updates funnel chart and stage volume bars.'), ('Team scope', 'Filter register and all charts to selected delivery/sales teams.')],
        "permissions": [('Sales representative', 'Create bids; edit own; advance stages; attach documents on detail page.'), ('Sales manager', 'Team filter; reassign owners; view all team bids.'), ('Delivery lead', 'Read-only on bids linked to active POs or projects.'), ('Executive', 'Read-only portfolio analytics with team scope.')],
        "controls": [('CREATE bid', 'New bid wizard.', 'Requires account selection.'), ('SHOW / SORT / Filter', 'Status, owner, stage presets; text search.', 'Standard Lux header.'), ('Team scope', 'Multi-team checkbox.', 'Scopes register + 12 charts.'), ('Grid / List toggle', 'Card vs table density.', ''), ('Summary strip', 'Twelve chart panels.', 'Collapse when working register.'), ('Row → details', 'Open bid-details.html context.', 'Full record and docs.'), ('Pipeline funnel chart', 'Vertical stage funnel.', 'Identify bottleneck stage.')],
        "mistakes": [('Leaving bids in first stage too long', 'Pipeline age donut flags stale — advance or close to keep forecast honest.'), ('Wrong owner assignment', 'Owner workload chart skews — reassign when handoff occurs.'), ('Skipping account linkage', 'Orphan bids break PO and project traceability — always pick account on create.')],
        "faq": [('How many charts update with filters?', 'All twelve in summary strip respect SHOW, team, and text filters.'), ('Can I link Salesforce later?', 'Sync indicator on detail page — manual bids can be linked if integration enabled.'), ('What closes a bid?', 'Won (often creates PO path), Lost, or other closed statuses per org config.'), ('Do bids appear in Project module?', 'Only after PO and project creation — bid itself stays in Sales.')],
        "related": [('bid-details.html', 'Bid Details', 'Stage, documents, PO link.'), ('purchase-orders.html', 'Purchase Orders', 'Next step after Won.'), ('../project/accounts.html', 'Accounts', 'Client records on bids.'), ('../charts.html', 'Charts guide', 'How to read funnel and donut panels.')],
        "callouts": [('tip', 'Monday review', 'Sort by Pipeline age; call top five stale bid owners before noon.'), ('note', 'Chart drill-down', 'Click funnel segments where enabled to filter register rows.')],
    },
    "sales/index.html": {
        "audience": 'Sales operations, bid managers, and delivery leads navigating the bid-to-contract pipeline in Tracopus. Use this index to understand how Sales connects to Project delivery and HRMS billing.',
        "info_title": 'Sales → delivery handoff',
        "info_body": 'Winning bids become purchase orders; POs spawn projects in the Project module. This index maps each step.',
        "concepts": [('Bid request', 'Pre-contract sales opportunity tracked through funnel stages with owner, account, and estimated value.'), ('Purchase order (PO)', 'Signed contract record linking account, value, dates, and optional originating bid.'), ('Pipeline funnel', 'Visual stage progression from intake through won/lost — summary charts on list screens.'), ('CRM sync', 'Salesforce linkage indicator on bids and POs for dual-system orgs.'), ('Delivery spawn', 'Active PO can create a Project record — bridge from Sales to Project module.'), ('Lux register pattern', 'Bid Requests and PO lists share SHOW / SORT / Filter headers and chart galleries.')],
        "permissions": [('Sales representative', 'Create and own bids; view linked POs; read pipeline charts for own portfolio.'), ('Sales manager', 'Team-scoped registers and analytics; reassign bid owners.'), ('Delivery / PM lead', 'Read PO details; create projects from contracts; no bid creation.'), ('Finance', 'Read PO values and account linkage for invoicing alignment.')],
        "controls": [('Module grid', 'Links to bid and PO guides.', 'Five Sales screens documented.'), ('Pipeline overview', 'Explains bid → PO → project flow.', 'Onboarding copy on index.'), ('Sidebar navigation', 'Sales page list on every module page.', 'Matches app menu.'), ('Cross-links to Project', 'Handoff documentation.', 'See purchase-order-details.'), ('Cross-links to HRMS', 'Invoicing from billable work.', 'See invoices guide.'), ('Documentation search', 'Find bid or PO topics quickly.', 'Header search.')],
        "mistakes": [('Creating PO before bid win', 'Premature contracts distort pipeline analytics — move bid to Won first.'), ('Ignoring CRM sync status', 'Manual bids miss account updates from Salesforce — check linkage donut on register.')],
        "faq": [('What is the difference between bid and PO?', 'Bid = opportunity; PO = signed contract ready for delivery and billing reference.'), ('Can one bid have multiple POs?', 'Yes for phased contracts — link each PO on bid details.'), ('Who creates projects from POs?', 'Delivery leads with PO detail access — see Create project action.'), ('Does Sales module track hours?', 'No — hours live in HRMS Timesheet and Project; Sales tracks commercial records.')],
        "related": [('bid-requests.html', 'Bid Requests', 'Pipeline register and twelve analytics charts.'), ('purchase-orders.html', 'Purchase Orders', 'Contract register and delivery health.'), ('../project/project-list.html', 'Project List', 'Delivery projects spawned from POs.'), ('../hrms/invoices.html', 'Invoices', 'Billing uses PO numbers on client invoices.')],
        "callouts": [('info', 'Pipeline hygiene', 'Close or stage-advance stale bids weekly — stale slice visible on Pipeline age donut.'), ('tip', 'New sales users', 'Read Bid Requests guide first, then PO list after your first win.')],
    },
    "sales/purchase-order-details.html": {
        "audience": 'Delivery leads and sales managers managing one contract — milestones, linked projects, documents, and status workflow until completed or archived.',
        "info_title": 'Contract workspace',
        "info_body": 'Open from PO register — create projects here, track timeline risk, and align finance on PO numbers for invoicing.',
        "concepts": [('Contract header', 'Account, contract value, start/end dates, status, linked bid reference.'), ('Delivery tabs', 'Milestones, linked projects, documents — execution focus vs bid sales focus.'), ('Timeline risk', 'Overdue badges when milestones slip past today.'), ('Create project', 'Spawn Tracopus project pre-filled with account and PO reference.'), ('Status workflow', 'Pipeline → active → completed → archived progression.')],
        "permissions": [('Delivery / PM lead', 'Create projects; update milestone dates; upload delivery documents.'), ('Sales manager', 'Edit contract header; status transitions; link additional bids.'), ('Finance', 'Read-only value and dates; export documents.'), ('Project member', 'Read-only on PO if granted via project link.')],
        "controls": [('Edit header', 'Account, value, dates.', 'Some fields lock when completed.'), ('Milestones tab', 'Add/edit delivery milestones.', 'Drives timeline risk badges.'), ('Projects tab', 'Linked delivery projects.', 'Click through to project-details.'), ('Create project', 'New project from contract.', 'Pre-fills PO ref on project.'), ('Documents tab', 'Signed SOW, amendments.', 'Finance audit trail.'), ('Status workflow', 'Advance contract lifecycle.', 'Archived = read-only.'), ('Bid link', 'Jump to originating bid.', 'Read-only cross-nav.')],
        "mistakes": [('Creating project without milestone plan', 'PMs lack schedule anchor — add milestones before or immediately after project spawn.'), ('Archiving active contract', 'Hides overdue signals while work continues — complete or reactivate instead.'), ('PO number not copied to project', 'Invoice rejection — verify PO ref on project hero after create.')],
        "faq": [('Multiple projects per PO?', 'Phased delivery common — each phase may have its own project linked here.'), ('Can I change account after project created?', 'Restricted — may break invoice linkage; contact admin.'), ('Where do milestones appear in Project?', 'May sync to deliverables depending on org config — confirm with PM lead.'), ('How to complete a contract?', 'Status → completed when all projects delivered and invoices sent.')],
        "related": [('purchase-orders.html', 'Purchase Orders', 'Return to contract register.'), ('../project/project-details.html', 'Project Details', 'Execution on linked projects.'), ('bid-details.html', 'Bid Details', 'Sales origin record.'), ('../hrms/invoice-details.html', 'Invoice Details', 'PO on invoice header.')],
        "callouts": [('info', 'Handoff meeting', 'Review PO details with PM before Create project — confirm value, dates, and milestone list.'), ('success', 'Delivery ready', 'Project created · PO on project hero · milestones dated · team assigned in Project module.')],
    },
    "sales/purchase-orders.html": {
        "audience": 'Sales managers, delivery leads, and finance tracking signed contracts — status, delivery health, and account concentration. Primary register after bids convert to POs.',
        "info_title": 'Contract register',
        "info_body": 'Monitor Delivery health donut daily — overdue contracts need PM intervention on linked projects.',
        "concepts": [('PO register', 'Contracts with status, account, value, dates, bid linkage, and team assignment.'), ('Eleven summary charts', 'Delivery funnel, status mix, timeline health, creation trend, top accounts, team load.'), ('CREATE contract', 'New PO from won bid or standalone for repeat business.'), ('Delivery health donut', 'Overdue vs on-track open contracts — key PM escalation signal.'), ('Bid linkage donut', 'Traceability from sales opportunity to signed contract.')],
        "permissions": [('Sales manager', 'Create POs; edit contract metadata; view all team contracts.'), ('Delivery / PM lead', 'View and update delivery-related status; create projects.'), ('Finance', 'Read values and accounts for invoice PO references.'), ('Executive', 'Read-only portfolio analytics.')],
        "controls": [('CREATE contract', 'New PO wizard.', 'Can link bid on create.'), ('SHOW / SORT / Filter', 'Contract status, team, search.', 'Standard Lux header.'), ('Team scope', 'Filter register and charts.', ''), ('Delivery health donut', 'Overdue vs on-track.', 'Act on red slice first.'), ('Row → PO details', 'Full contract record.', 'Milestones and projects tabs.'), ('Summary strip', 'Eleven chart panels.', 'Respects filters.'), ('Export', 'Contract list download.', 'Finance use.')],
        "mistakes": [('Standalone PO without account', 'Breaks invoice and project linkage — always select account.'), ('Ignoring overdue health slice', 'Small overdue slice compounds — review linked project dates weekly.'), ('Duplicate PO for same SOW', 'Check bid linkage donut — merge or archive duplicates.')],
        "faq": [('PO vs project?', 'PO = commercial contract; Project = delivery execution — one PO may spawn one or more projects.'), ('Can PO exist without bid?', 'Yes — standalone for extensions; bid linkage donut tracks mix.'), ('Who updates contract value?', 'Sales manager or finance on detail page — may need approval workflow.'), ('How is overdue calculated?', 'Compare contract end/milestone dates to today for open statuses.')],
        "related": [('purchase-order-details.html', 'PO Details', 'Milestones, create project.'), ('bid-details.html', 'Bid Details', 'Originating opportunity.'), ('../project/project-list.html', 'Project List', 'Delivery records from POs.'), ('../hrms/invoices.html', 'Invoices', 'PO number on client invoices.')],
        "callouts": [('alert', 'Overdue contracts', 'Cross-check Delivery health donut with Project timeline — fix dates in one system if mismatched.'), ('tip', 'Account concentration', 'Top accounts chart — diversify if one client exceeds policy threshold.')],
    },
}


def render_page_enrichment(page_id):
    """Return combined enrichment HTML for a page, or empty string if no data."""
    data = RICH_PAGES.get(page_id)
    if not data:
        return ""

    parts = []

    if data.get("callouts"):
        parts.append(
            '<section class="doc-block doc-block--callouts" id="page-callouts">'
            '<h2 class="doc-block__title">Before you start</h2>'
            f'<div class="callout-stack callout-stack--dense">{render_callouts(data["callouts"])}</div>'
            "</section>"
        )

    parts.append('<div class="doc-enrich-grid">')

    parts.append(
        '<section class="doc-block" id="who-uses-this">'
        '<h2 class="doc-block__title">Who uses this screen</h2>'
        f'<p class="audience-text">{data["audience"]}</p>'
        f'{callout("info", data["info_title"], data["info_body"])}'
        "</section>"
    )

    parts.append(
        '<section class="doc-block" id="key-concepts">'
        '<h2 class="doc-block__title">Key concepts</h2>'
        f'{render_concepts(data["concepts"])}'
        "</section>"
    )

    parts.append(
        '<section class="doc-block" id="permissions">'
        '<h2 class="doc-block__title">Permissions</h2>'
        f'{render_permissions_table(data["permissions"])}'
        f'{callout("note", "Administrator override", "Org administrators and service accounts configured in the Admin console may bypass row-level scopes shown above. When in doubt, confirm access with your Tracopus administrator.")}'
        "</section>"
    )

    parts.append(
        '<section class="doc-block" id="controls-reference">'
        '<h2 class="doc-block__title">Controls reference</h2>'
        f'{render_controls_table(data["controls"])}'
        "</section>"
    )

    parts.append("</div>")  # doc-enrich-grid

    parts.append('<div class="doc-enrich-grid doc-enrich-grid--2">')

    parts.append(
        '<section class="doc-block" id="common-mistakes">'
        '<h2 class="doc-block__title">Common mistakes</h2>'
        f'<div class="callout-stack callout-stack--dense">{render_mistakes(data["mistakes"])}</div>'
        "</section>"
    )

    parts.append(
        '<section class="doc-block" id="faq">'
        '<h2 class="doc-block__title">FAQ</h2>'
        f'{render_faq(data["faq"])}'
        "</section>"
    )

    parts.append("</div>")

    parts.append(
        '<section class="doc-block doc-block--related" id="related-pages">'
        '<h2 class="doc-block__title">Related pages</h2>'
        f'{render_related(data["related"])}'
        "</section>"
    )

    return f'<div class="doc-enrichment">{"".join(parts)}</div>'


def get_tips_supplement(page_id):
    """Extra callouts appended to the Tips section on each page."""
    data = RICH_PAGES.get(page_id, {})
    extras = data.get("tips_extra")
    if extras:
        return f'<div class="callout-stack">{render_callouts(extras)}</div>'
    # Default: best-practice tips derived from page data
    tips = []
    for kind, title, body in data.get("callouts", []):
        if kind in ("tip", "success", "note") and len(tips) < 2:
            continue  # already shown in Before you start
    for _title, desc in data.get("concepts", [])[:1]:
        tips.append(("tip", "Remember", desc))
    for q, a in data.get("faq", [])[:1]:
        tips.append(("info", q, a))
    if not tips:
        return ""
    return f'<div class="callout-stack"><h3 class="subheading">More guidance</h3>{render_callouts(tips[:3])}</div>'

