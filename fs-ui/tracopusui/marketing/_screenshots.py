"""Product screenshot catalog for tracopus.com marketing pages.

Drop final captures into: public/tracopus.com/images/screenshots/
Supported formats: .webp (preferred), .png, .jpg

Until a file exists, the site shows an SVG placeholder labelled with the expected filename.
"""

SCREENSHOTS = {
    "01-project-dashboard": {
        "filename": "01-project-dashboard.webp",
        "alt": "Tracopus project portfolio dashboard with delivery trends and active projects",
        "title": "Portfolio dashboard",
        "caption": "Active projects, overdue work, and delivery trends in one view.",
        "capture": "Project module → Dashboard · light theme · 1440×900 crop",
        "frame": "browser",
    },
    "02-project-taskboard": {
        "filename": "02-project-taskboard.webp",
        "alt": "Tracopus Kanban taskboard with columns and work-in-progress cards",
        "title": "Kanban taskboard",
        "caption": "Visual workflow stages, filters, and card drawer for delivery teams.",
        "capture": "Project → Taskboard · show 3+ columns with cards · 1440×900",
        "frame": "browser",
    },
    "03-team-capacity": {
        "filename": "03-team-capacity.webp",
        "alt": "Tracopus team capacity overview with utilization gauges",
        "title": "Team capacity",
        "caption": "Overview, roster, timeline, and Gantt in one capacity workspace.",
        "capture": "Project → Team Capacity → Overview tab · 1440×900",
        "frame": "browser",
    },
    "04-hrms-timesheet": {
        "filename": "04-hrms-timesheet.webp",
        "alt": "Tracopus weekly timesheet with billable and project rows",
        "title": "Weekly timesheet",
        "caption": "Billable, non-billable, and leave rows with validation hints.",
        "capture": "HRMS → Timesheet · mid-week with rows filled · 1440×900",
        "frame": "browser",
    },
    "05-hrms-dashboard": {
        "filename": "05-hrms-dashboard.webp",
        "alt": "Tracopus employee dashboard with utilization charts",
        "title": "Workforce dashboard",
        "caption": "My and Team tabs with utilization donuts and hour breakdowns.",
        "capture": "HRMS → Dashboard · Team tab with charts expanded · 1440×900",
        "frame": "browser",
    },
    "06-bid-requests": {
        "filename": "06-bid-requests.webp",
        "alt": "Tracopus bid requests register with pipeline analytics",
        "title": "Bid pipeline",
        "caption": "Opportunity register with summary chart strip and stage funnel.",
        "capture": "Sales → Bid Requests · summary strip expanded · 1440×900",
        "frame": "browser",
    },
    "07-purchase-orders": {
        "filename": "07-purchase-orders.webp",
        "alt": "Tracopus purchase orders register",
        "title": "Purchase orders",
        "caption": "Contract register linking sales outcomes to delivery setup.",
        "capture": "Sales → Purchase Orders · 1440×900",
        "frame": "browser",
    },
    "08-luxury-shell": {
        "filename": "08-luxury-shell.webp",
        "alt": "Tracopus Luxury UI shell with sidebar, icon rail, and emerald theme",
        "title": "Luxury workspace shell",
        "caption": "Icon rail, collapsible analytics strip, and twelve theme palettes.",
        "capture": "Any module · full browser · sidebar + icon rail visible · 1440×900",
        "frame": "browser",
    },
    "09-mobile-projects": {
        "filename": "09-mobile-projects.webp",
        "alt": "Tracopus mobile projects hub on a phone",
        "title": "Mobile projects",
        "caption": "Assigned projects and quick task access from mobile.",
        "capture": "Mobile app → Projects · iPhone 14 Pro frame optional · 1170×2532",
        "frame": "phone",
    },
    "10-mobile-timesheet": {
        "filename": "10-mobile-timesheet.webp",
        "alt": "Tracopus mobile timesheet record day screen",
        "title": "Mobile timesheet",
        "caption": "Record day flow with project and deliverable pickers.",
        "capture": "Mobile app → Timesheet → Record day · 1170×2532",
        "frame": "phone",
    },
    "11-analytics-charts": {
        "filename": "11-analytics-charts.webp",
        "alt": "Tracopus analytics summary strip with charts expanded",
        "title": "Operational analytics",
        "caption": "Donut, bar, and funnel charts on list screens with team scope.",
        "capture": "Any list screen · expand summary chart strip · 1440×900",
        "frame": "browser",
    },
    "12-project-list": {
        "filename": "12-project-list.webp",
        "alt": "Tracopus project list register with filters",
        "title": "Project register",
        "caption": "SHOW · SORT · Filter pattern on the portfolio register.",
        "capture": "Project → Project List · 1440×900",
        "frame": "browser",
    },
}

# Per-page screenshot placement
PAGE_SCREENSHOTS = {
    "index": {
        "showcase": {
            "shot": "01-project-dashboard",
            "eyebrow": "Product preview",
            "heading": "See delivery health before the stand-up ends.",
            "lead": "Portfolio dashboards, taskboards, timesheets, and pipeline registers share one Luxury shell — so managers and ICs work from the same live picture.",
            "bullets": [
                "Summary chart strips on every major register",
                "Project-to-invoice traceability",
                "Mobile parity for tasks and time",
            ],
            "link": ("platform.html", "Explore the platform"),
        },
        "gallery": [
            "02-project-taskboard",
            "04-hrms-timesheet",
            "06-bid-requests",
            "09-mobile-projects",
        ],
    },
    "platform": {
        "inline": {
            "shot": "12-project-list",
            "eyebrow": "Unified registers",
            "heading": "One shell. Every module.",
            "lead": "Projects, HRMS, sales, and collaboration screens follow the same navigation, filter, and analytics patterns — reducing training time as teams adopt new modules.",
        },
    },
    "projects": {
        "inline": {
            "shot": "02-project-taskboard",
            "eyebrow": "Delivery workspace",
            "heading": "From portfolio to task card in two clicks.",
            "lead": "Kanban boards, deliverable hierarchies, capacity views, and twelve operational reports — without exporting to side spreadsheets.",
        },
    },
    "hrms": {
        "inline": {
            "shot": "04-hrms-timesheet",
            "eyebrow": "Workforce operations",
            "heading": "Timesheets managers actually trust.",
            "lead": "Weekly grids, utilization dashboards, attendance matrices, and invoice registers connected to the same employee and project records.",
        },
    },
    "sales": {
        "inline": {
            "shot": "06-bid-requests",
            "eyebrow": "Pipeline to delivery",
            "heading": "Opportunities that hand off cleanly.",
            "lead": "Bid stages, documents, purchase orders, and project creation from contract context — documented screen by screen.",
        },
    },
    "mobile": {
        "inline": {
            "shot": "09-mobile-projects",
            "eyebrow": "Field-ready",
            "heading": "Essential workflows in your pocket.",
            "lead": "Projects hub, task updates, Record day timesheets, and personal insights — same validation rules as the web workspace.",
        },
        "secondary": "10-mobile-timesheet",
    },
    "luxury-ui": {
        "inline": {
            "shot": "08-luxury-shell",
            "reverse": True,
            "eyebrow": "Luxury UI",
            "heading": "Enterprise density. Consumer-grade craft.",
            "lead": "Glass panels, emerald gradients, playful icon rail, collapsible analytics, and twelve curated palettes with mobile sync.",
            "bullets": [
                "12 theme palettes with mobile sync",
                "Assist dock for help and feedback",
                "SHOW · SORT · Filter on every register",
            ],
            "link": ("../documentation/interface.html", "Read the interface guide"),
        },
    },
    "analytics": {
        "inline": {
            "shot": "11-analytics-charts",
            "eyebrow": "Operational intelligence",
            "heading": "Charts that explain the week.",
            "lead": "Expand summary strips on list screens for utilization, pipeline stage mix, capacity heatmaps, and est-vs-actual — each chart documented in the user guide.",
        },
    },
    "solutions/delivery-teams": {
        "inline": {
            "shot": "03-team-capacity",
            "eyebrow": "Delivery teams",
            "heading": "Capacity you can act on.",
            "lead": "Overview gauges, roster grids, timeline bars, and Gantt — shared context for PMs and engineers without parallel trackers.",
        },
    },
    "solutions/consulting": {
        "inline": {
            "shot": "05-hrms-dashboard",
            "eyebrow": "Consulting firms",
            "heading": "Utilization and billing in one rhythm.",
            "lead": "Team dashboards, approved billable pools, and invoice drafts with PO references — the weekly loop professional services firms depend on.",
        },
    },
}
