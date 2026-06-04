"""Complete feature lists per documentation page."""

LUX_BASE = [
    ("Luxury UI shell", "Emerald-themed glass cards, sticky gradient header, module sidebar, and responsive layout."),
    ("Documentation search", "Header search indexes all guide pages (docs site)."),
]

SUMMARY_STRIP = [
    ("Collapsible summary strip", "KPI row and chart gallery above the register; expand/collapse persists in browser storage."),
]

PAGE_FEATURES = {
    "hrms/index.html": [
        ("Module index grid", "Links to all nine HRMS screen guides with one-click navigation."),
        ("Sidebar navigation", "Persistent HRMS page list on every module page."),
    ],
    "hrms/dashboard.html": SUMMARY_STRIP + [
        ("My dashboard tab", "Personal attendance, utilization, task mix, and leave/holiday list."),
        ("Team dashboard tab", "Manager-only org analytics with team scope bar."),
        ("Team scope bar", "Filter all Team tab charts by organizational unit."),
        ("Chart drill-down", "Click chart segments where supported to filter related data."),
        ("Tab persistence", "Last selected dashboard tab remembered per session."),
    ],
    "hrms/employees.html": SUMMARY_STRIP + [
        ("Create employee", "Wizard (Profile → Access → Sign-in → Organization → Skills) or quick form."),
        ("Quick filter chips", "All · Active · Inactive status presets."),
        ("SHOW / SORT / Filter", "Dropdown status, sort by name/created/team, text search on name/email/ID."),
        ("Team selection", "Multi-team checkbox menu scopes register and charts."),
        ("Grid / List toggle", "Card grid or dense table view."),
        ("Row navigation", "Click row to open employee profile."),
        ("Nine summary charts", "Treemap, line, area, donut, and bar panels in summary strip."),
    ],
    "hrms/timesheet.html": [
        ("Week navigation", "Previous/next Monday–Sunday week selector."),
        ("Employee selector", "Managers review direct reports' sheets (permission required)."),
        ("Add entry modal", "Billable, non-billable, or leave/holiday with H or H.MM hours."),
        ("Day cell editing", "Click any day cell to open entry detail."),
        ("Sync external leaves", "Pull approved leave from HR integration."),
        ("Validation summary", "Week totals, billable ratio, and inline policy hints."),
        ("Project/deliverable linking", "Billable entries tie to project hierarchy."),
    ],
    "hrms/attendance.html": SUMMARY_STRIP + [
        ("Month matrix", "Employees × days grid with present/absent/leave markers."),
        ("Month navigation", "Move between calendar months."),
        ("Team / employee filters", "Scope matrix to org unit or individual."),
        ("Cell popover marking", "Mark or correct attendance per day."),
        ("Summary KPIs", "Month-level attendance rate and absence counts."),
        ("Export", "Download matrix for payroll (permission dependent)."),
    ],
    "hrms/invoices.html": SUMMARY_STRIP + [
        ("Invoice register", "List of invoices with status, amount, client, period."),
        ("SHOW / SORT / Filter", "Status presets, sort columns, text search."),
        ("Create invoice", "Start new invoice workflow (permission required)."),
        ("Row navigation", "Open invoice details for line items and PDF."),
        ("Summary KPIs", "Outstanding, paid, and draft totals in summary strip."),
    ],
    "hrms/invoice-details.html": [
        ("Invoice header", "Client, period, status, totals, and reference numbers."),
        ("Line items table", "Billable lines with quantity, rate, amount."),
        ("PDF preview / download", "Generate printable invoice document."),
        ("Status transitions", "Draft → sent → paid workflows (role dependent)."),
        ("Related timesheet link", "Trace lines back to logged hours where configured."),
    ],
    "hrms/profile.html": [
        ("Profile hero", "Photo, name, role, team, contact details."),
        ("Security tab", "Password, MFA, session management."),
        ("Notifications tab", "Email and in-app preference toggles."),
        ("Activity tab", "Recent actions and login history."),
        ("Skills & org", "Tags, department, manager, employment type."),
        ("Edit mode", "Self-service or HR edit depending on permissions."),
    ],
    "hrms/settings.html": [
        ("Personal preferences", "Locale, timezone, display options."),
        ("Notification rules", "Per-event email/push toggles."),
        ("Timesheet defaults", "Preferred entry type and week start."),
        ("Integration tokens", "API keys or connected apps (if enabled)."),
    ],
    "sales/index.html": [
        ("Module index grid", "Links to bid requests, PO list, and detail guides."),
        ("Pipeline overview copy", "Explains bid → PO → project handoff."),
    ],
    "sales/bid-requests.html": SUMMARY_STRIP + [
        ("Pipeline funnel chart", "Vertical stage funnel in summary strip."),
        ("Twelve bid charts", "Area, column, donut, and bar analytics panels."),
        ("CREATE bid", "New bid request wizard."),
        ("SHOW / SORT / Filter", "Status, owner, stage presets and text search."),
        ("Team scope", "Multi-team filter for register and charts."),
        ("Grid / List toggle", "Visual density control."),
        ("Row → bid details", "Open full bid record and documents."),
    ],
    "sales/bid-details.html": [
        ("Bid header", "Title, stage, owner, account, dates, value."),
        ("Stage progression", "Move bid through sales funnel stages."),
        ("Documents tab", "Attachments and proposals."),
        ("Activity log", "Status changes and comments."),
        ("Link to PO", "Create or associate purchase order."),
        ("CRM sync indicator", "Salesforce linkage status."),
    ],
    "sales/purchase-orders.html": SUMMARY_STRIP + [
        ("Eleven PO charts", "Funnel, donut, area, and bar contract analytics."),
        ("CREATE contract", "New purchase order from bid or standalone."),
        ("SHOW / SORT / Filter", "Contract status, team, text search."),
        ("Delivery health donut", "Overdue vs on-track open contracts."),
        ("Row → PO details", "Full contract record and delivery tabs."),
    ],
    "sales/purchase-order-details.html": [
        ("Contract header", "Account, value, dates, status, linked bid."),
        ("Delivery tabs", "Milestones, projects, documents."),
        ("Timeline risk", "Overdue indicators and health badges."),
        ("Create project", "Spawn delivery project from contract."),
        ("Status workflow", "Pipeline → active → completed → archived."),
    ],
    "project/index.html": [
        ("Module index grid", "Links to all 18 project module guides."),
        ("Cross-links", "Dashboard, taskboard, reports, collaboration tools."),
    ],
    "project/dashboard.html": SUMMARY_STRIP + [
        ("Portfolio KPIs", "Active projects, overdue, billable hours in summary strip."),
        ("My vs team views", "Scope toggle for personal vs org portfolio."),
        ("Quick links", "Jump to project list, taskboard, capacity."),
        ("Trend charts", "Creation and completion trends over time."),
    ],
    "project/project-list.html": SUMMARY_STRIP + [
        ("Seventeen summary charts", "Full portfolio analytics gallery."),
        ("CREATE project", "New project wizard with type, team, dates."),
        ("SHOW presets", "All · Active · Completed · My projects."),
        ("SORT / Filter / Team", "Standard Lux list header controls."),
        ("Estimate gaps list", "Clickable list of projects missing hour estimates."),
        ("Grid / List toggle", "Card or table register."),
    ],
    "project/project-details.html": [
        ("Project hero", "Name, status, dates, account, PO link, team."),
        ("Tab bar", "Overview · Members · Deliverables · Files · Settings · …"),
        ("Members panel", "Add/remove team with roles."),
        ("Status workflow", "Progress project through delivery states."),
        ("Billable settings", "Type, automation, sharing flags."),
        ("Activity feed", "Recent changes on the project."),
    ],
    "project/deliverables.html": SUMMARY_STRIP + [
        ("Deliverable register", "Hierarchy list with status and dates."),
        ("CREATE deliverable", "Add milestone or work package."),
        ("SHOW / SORT / Filter", "Status and text search."),
        ("Summary charts", "Status mix and timeline health donuts."),
    ],
    "project/deliverable-details.html": [
        ("Deliverable header", "Title, dates, estimate, assignee, status."),
        ("Work items tab", "Linked activities and tasks."),
        ("Est vs actual", "Planned vs logged hours comparison."),
        ("Documents", "Attachments on the deliverable."),
    ],
    "project/work-items.html": SUMMARY_STRIP + [
        ("Work item register", "Activities across projects with filters."),
        ("CREATE work item", "New activity linked to deliverable/project."),
        ("Bulk actions", "Assign, status change (permission dependent)."),
        ("Summary analytics", "Type and status distribution charts."),
    ],
    "project/accounts.html": SUMMARY_STRIP + [
        ("Account register", "Client accounts with project counts."),
        ("CREATE account", "New client record."),
        ("Account summary charts", "Revenue and project concentration."),
        ("Row → account detail", "Projects and contacts on account."),
    ],
    "project/taskboard.html": SUMMARY_STRIP + [
        ("Kanban columns", "Drag-and-drop task cards across workflow stages."),
        ("Five taskboard charts", "Funnel, donut, and bar flow analytics."),
        ("Column WIP", "Visual load per stage."),
        ("Quick add task", "Create card in column."),
        ("Filters", "Project, assignee, priority, category."),
        ("Card detail drawer", "Open task without leaving board."),
    ],
    "project/task-activity.html": SUMMARY_STRIP + [
        ("Activity register", "Detailed work item list with rich filters."),
        ("Five activity charts", "Status, priority, checklist, type, outcome."),
        ("CREATE activity", "New work item with checklist support."),
        ("Bulk update", "Multi-select status/assignee changes."),
    ],
    "project/team-capacity.html": SUMMARY_STRIP + [
        ("Overview tab", "Utilization gauges and heatmaps."),
        ("Roster tab", "People × availability grid."),
        ("Timeline tab", "Weekly allocation bars."),
        ("Gantt tab", "Project bars on shared timeline."),
        ("Team / date filters", "Scope capacity views."),
    ],
    "project/reports.html": [
        ("Report catalog", "Twelve operational and compliance reports."),
        ("Date range picker", "Scope all reports by period."),
        ("Team filter", "Limit report to org units."),
        ("Export formats", "CSV/Excel download per report type."),
        ("Est vs actual reports", "Deliverable and activity variance analysis."),
        ("Utilization reports", "Employee, my, and weekwise variants."),
    ],
    "project/feedback.html": [
        ("Feedback register", "Submitted feedback items with status."),
        ("CREATE feedback", "New feedback linked to project/deliverable."),
        ("Rating capture", "Score and comment fields."),
        ("Filter by project", "Scope list to engagement."),
    ],
    "project/notes.html": [
        ("Notes list", "Personal and shared notes."),
        ("CREATE note", "Rich text note with tags."),
        ("Pin / archive", "Organize active notes."),
        ("Link to project", "Associate note with delivery context."),
    ],
    "project/calendar.html": [
        ("Month / week views", "Calendar grid of milestones and tasks."),
        ("Event types", "Deliverables, tasks, leave overlays."),
        ("Drag reschedule", "Move events on calendar (permission dependent)."),
        ("Filters", "Project, team, event type."),
    ],
    "project/file-manager.html": [
        ("Folder tree", "Hierarchical file browser."),
        ("Upload", "Drag-drop or picker upload."),
        ("Preview", "Inline preview for common formats."),
        ("Permissions", "Folder-level access control."),
        ("Link to project", "Files scoped to project context."),
    ],
    "project/chat.html": [
        ("Channel list", "Project and team channels."),
        ("Direct messages", "1:1 conversations."),
        ("Thread replies", "Inline thread on messages."),
        ("Attachments", "Share files in chat."),
        ("Mentions", "@user notifications."),
    ],
    "project/search.html": [
        ("Global search", "Cross-module query across projects, tasks, people, files."),
        ("Type filters", "Limit results to entity type."),
        ("Recent searches", "Quick re-run prior queries."),
        ("Keyboard shortcut", "Focus search from anywhere (web app)."),
    ],
    "mobile/index.html": [
        ("Module overview", "Links to all mobile screen guides."),
        ("Platform notes", "iOS/Android parity and offline behaviour."),
    ],
    "mobile/login.html": [
        ("Email/password login", "Standard credential sign-in."),
        ("SSO / OAuth", "Enterprise single sign-on where configured."),
        ("Registration", "Self-signup or invite flow."),
        ("Biometric unlock", "Face ID / fingerprint after first login."),
        ("Forgot password", "Reset via email link."),
    ],
    "mobile/tasks.html": [
        ("Tasks hub", "Assigned tasks list with status badges."),
        ("Pull to refresh", "Sync latest assignments."),
        ("Task detail", "Checklist, comments, attachments."),
        ("Status update", "Move task from mobile."),
        ("Offline queue", "Changes sync when connectivity returns."),
    ],
    "mobile/insights.html": SUMMARY_STRIP + [
        ("Time & utilization charts", "Six chart types for personal analytics."),
        ("Status donuts", "Task and project status breakdowns."),
        ("Planned vs logged", "Dual-line variance chart."),
        ("Portfolio splits", "Project and account concentration."),
        ("Week selector", "Change period for all insight charts."),
    ],
    "mobile/projects.html": [
        ("Projects hub", "Card list of assigned projects."),
        ("Project detail", "Summary, team, deliverables shortcut."),
        ("Status badges", "Delivery state at a glance."),
        ("Deep link to web", "Open full project in browser."),
    ],
    "mobile/timesheet.html": [
        ("Record day FAB", "Primary action to log today's hours."),
        ("Week grid", "Compact mobile timesheet view."),
        ("Entry types", "Billable, non-billable, leave."),
        ("Project picker", "Search and select project for billable."),
        ("Sync with web", "Same validation rules as HRMS timesheet."),
    ],
}


def get_page_features(page_id):
    """Return full feature list for a page including Luxury UI base items."""
    specific = PAGE_FEATURES.get(page_id, [])
    # Pages with summary strip already include it in specific; others get base only
    has_summary = any(f[0] == "Collapsible summary strip" for f in specific)
    base = list(LUX_BASE)
    if has_summary:
        base = LUX_BASE  # summary already in specific
    elif page_id.endswith("/index.html"):
        base = LUX_BASE
    return base + specific
