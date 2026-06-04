"""Marketing copy and page definitions for tracopus.com — factual content from product docs."""

SITE = {
    "name": "Tracopus",
    "brand_tagline": "Enterprise Work Intelligence",
    "tagline": "One workspace for projects, people, sales, and delivery.",
    "lead": "Tracopus brings project delivery, workforce operations, sales pipeline tracking, contracts, timesheets, collaboration, mobile work updates, and business insights into one connected enterprise workspace.",
}

# Section 4 — hero data cards (descriptive, not numeric claims)
HERO_CARDS = [
    (
        "One Workspace",
        "Bring projects, HRMS, sales, contracts, timesheets, files, and reports together in a unified business platform.",
    ),
    (
        "Project-to-Invoice Visibility",
        "Track work from project planning and deliverables through task execution, time capture, and invoice-ready reporting.",
    ),
    (
        "Mobile-Ready Teams",
        "Enable team members to view projects, update tasks, record time, and review insights from mobile devices.",
    ),
    (
        "Leadership Insights",
        "Give managers and executives clearer visibility into workload, delivery health, utilization, pipeline progress, and operational trends.",
    ),
]

SECTION_COPY = {
    "problem": {
        "eyebrow": "Why Teams Need Tracopus",
        "heading": "Disconnected tools slow down fast-moving organizations.",
        "description": "Many companies manage projects in one tool, employees in another, timesheets in spreadsheets, sales opportunities in separate trackers, contracts in shared folders, and team conversations across multiple channels. Tracopus connects the core workflows modern companies rely on every day.",
    },
    "value": {
        "eyebrow": "The Tracopus Advantage",
        "heading": "A single platform for coordinated business execution.",
        "description": "Tracopus gives companies a practical operating layer for managing the full lifecycle of business work — broad enough for leadership visibility and detailed enough for everyday execution.",
    },
    "platform": {
        "eyebrow": "Platform Capabilities",
        "heading": "Everything your teams need to plan, execute, track, and improve.",
        "description": "Tracopus is organized around project delivery, workforce management, sales and contract tracking, reporting, collaboration, and mobile productivity — each module designed to work together.",
    },
    "collaboration": {
        "eyebrow": "Connected Teamwork",
        "heading": "Bring communication, files, notes, and work context together.",
        "description": "Work moves faster when teams do not have to search through multiple systems to understand what happened, who owns the next step, or where the latest document is stored.",
    },
    "enterprise": {
        "eyebrow": "Built for Business Control",
        "heading": "Structured access, organized workflows, and reliable operational governance.",
        "description": "Tracopus is designed for companies that need both usability and control — access-aware navigation, status-driven workflows, and business-friendly audit trails.",
    },
    "lifecycle": {
        "eyebrow": "Connected Business Flow",
        "heading": "From opportunity to execution, Tracopus keeps the full lifecycle visible.",
    },
    "personas": {
        "eyebrow": "Built for Every Team Involved in Delivery",
        "heading": "Different teams. One shared operating system.",
    },
    "use_cases": {
        "eyebrow": "Use Cases",
        "heading": "Designed for companies that manage people, projects, clients, and delivery commitments.",
    },
    "benefits": {
        "eyebrow": "Business Impact",
        "heading": "Give your teams clarity, speed, and operational control.",
    },
    "cta": {
        "heading": "Ready to bring projects, people, sales, and delivery operations into one workspace?",
        "description": "Tracopus helps companies replace fragmented tools with a connected platform for execution, visibility, and business control.",
    },
}

NAV = [
    {
        "label": "Product",
        "children": [
            ("platform.html", "Platform Overview", "One shell. Every module."),
            ("hrms.html", "HRMS", "People, time, billing."),
            ("projects.html", "Projects", "Delivery without drift."),
            ("sales.html", "Sales", "Bids to purchase orders."),
            ("mobile.html", "Mobile", "Work intelligence pocket-sized."),
            ("luxury-ui.html", "Luxury UI", "Themes, rails, delight."),
            ("analytics.html", "Analytics", "Charts that tell stories."),
        ],
    },
    {
        "label": "Solutions",
        "children": [
            ("solutions/enterprise.html", "Enterprise", "Governance at scale."),
            ("solutions/consulting.html", "Consulting Firms", "Utilization unlocked."),
            ("solutions/delivery-teams.html", "Delivery Teams", "Ship with clarity."),
        ],
    },
    {"label": "Customers", "href": "customers.html"},
    {"label": "Resources", "href": "resources.html"},
    {"label": "About", "href": "about.html"},
]

FOOTER_COLS = [
    ("Product", [
        ("platform.html", "Platform"),
        ("hrms.html", "HRMS"),
        ("projects.html", "Projects"),
        ("sales.html", "Sales"),
        ("mobile.html", "Mobile"),
        ("luxury-ui.html", "Luxury UI"),
        ("analytics.html", "Analytics"),
        ("security.html", "Security"),
        ("integrations.html", "Integrations"),
    ]),
    ("Solutions", [
        ("solutions/enterprise.html", "Enterprise"),
        ("solutions/consulting.html", "Consulting"),
        ("solutions/delivery-teams.html", "Delivery Teams"),
    ]),
    ("Company", [
        ("about.html", "About"),
        ("customers.html", "Customers"),
        ("contact.html", "Contact"),
        ("demo.html", "Request Demo"),
    ]),
    ("Learn", [
        ("resources.html", "Resources"),
        ("faq.html", "FAQ"),
        ("../documentation/index.html", "Documentation"),
    ]),
]

DEMO_FORM = {
    "title": "See how Tracopus can fit your organization",
    "lead": (
        "Tell us about your teams, workflows, and timeline — we will tailor a walkthrough "
        "to the modules and scenarios that matter most for your rollout."
    ),
    "company_sizes": [
        "1–50 employees",
        "51–200 employees",
        "201–500 employees",
        "501–1,000 employees",
        "1,000+ employees",
    ],
    "timelines": [
        ("exploring", "Just exploring"),
        ("1-3", "1–3 months"),
        ("3-6", "3–6 months"),
        ("6plus", "6+ months"),
    ],
    "focus_areas": [
        "Project delivery & taskboards",
        "Workforce, timesheets & attendance",
        "Sales pipeline & purchase orders",
        "Reporting, dashboards & analytics",
        "Mobile workforce",
        "Enterprise rollout & governance",
        "Complete platform overview",
    ],
    "modules": [
        ("projects", "Project Management"),
        ("hrms", "Workforce & HRMS"),
        ("sales", "Sales & Contracts"),
        ("mobile", "Mobile productivity"),
        ("analytics", "Analytics & reports"),
        ("collaboration", "Chat, files & notes"),
        ("platform", "Full platform tour"),
    ],
    "contact_methods": [
        ("email", "Email"),
        ("phone", "Phone"),
        ("either", "Either works"),
    ],
}

STATS = HERO_CARDS  # homepage cards use descriptive titles, not numeric stats

AUDIENCE_TAGS = [
    "Project Delivery",
    "Workforce Operations",
    "Sales Pipeline",
    "Timesheets",
    "Contracts",
    "Mobile Updates",
    "Business Insights",
    "Secure Access",
]

VALUE_PROPS = [
    (
        "One Operating Workspace",
        "Unify project management, workforce operations, sales tracking, contracts, time capture, documents, collaboration, and reporting in one platform.",
    ),
    (
        "Built for Enterprise Coordination",
        "Support structured workflows across teams, departments, managers, employees, finance, sales, and delivery leadership.",
    ),
    (
        "From Opportunity to Delivery",
        "Connect sales opportunities and purchase orders with project execution so teams move from deal tracking to delivery planning with less friction.",
    ),
    (
        "Better Workforce Visibility",
        "Help managers understand employee allocation, availability, timesheet status, attendance, and team capacity from one place.",
    ),
    (
        "Insight-Driven Management",
        "Use dashboards, charts, filters, and reports to monitor progress, identify risks, and improve operational decisions.",
    ),
    (
        "Work Anywhere",
        "Give mobile users access to projects, tasks, timesheets, and insights so updates do not wait until someone returns to a desk.",
    ),
]

PLATFORM_CAPABILITIES = [
    (
        "📁",
        "Project Management",
        "Plan projects, manage deliverables, create work items, run task boards, monitor team capacity, review reports, maintain accounts, and search across work items.",
        "projects.html",
    ),
    (
        "👥",
        "Workforce & HRMS",
        "Manage employee dashboards, directories, profiles, timesheets, attendance, invoice-related work records, and workforce visibility.",
        "hrms.html",
    ),
    (
        "💼",
        "Sales & Contracts",
        "Track bid requests, manage purchase orders, monitor contract progress, and support smoother transition from opportunity to execution.",
        "sales.html",
    ),
    (
        "📱",
        "Mobile Productivity",
        "Access assigned projects, update tasks, record timesheets, and review insights from mobile screens designed for quick updates.",
        "mobile.html",
    ),
    (
        "📊",
        "Dashboards & Reports",
        "Visibility into project health, utilization, team workload, sales pipeline, purchase order status, and operational trends.",
        "analytics.html",
    ),
    (
        "💬",
        "Collaboration & Knowledge",
        "Files, notes, chat, activity logs, calendars, feedback, and search in the same workspace as delivery work.",
        "platform.html",
    ),
]

COLLABORATION_CARDS = [
    ("Contextual Chat", "Support team conversations in the same workspace where projects, tasks, and delivery context live."),
    ("File Manager", "Organize project and business files through structured folders, previews, uploads, and access-aware sharing."),
    ("Notes", "Create personal or shared notes, organize them with tags, pin important items, and connect notes to project context."),
    ("Calendar", "View milestones, tasks, deliverables, and schedule-related items through calendar views that help teams plan ahead."),
    ("Activity History", "Track important changes, comments, ownership updates, stage movement, and status transitions through visible activity trails."),
    ("Feedback Capture", "Collect structured feedback linked to projects or delivery activities so teams can improve continuously."),
    ("Unified Search", "Find relevant work items, projects, files, people, notes, and tasks quickly without switching between multiple systems."),
]

ENTERPRISE_TRUST = [
    ("Role-Aware Experience", "Show users the modules, records, and actions that match their responsibilities and company policies."),
    ("Clear Ownership", "Assign work, bids, projects, tasks, accounts, employees, and documents to the right people and teams."),
    ("Status-Driven Workflows", "Move projects, bids, purchase orders, tasks, invoices, deliverables, and feedback through structured lifecycle stages."),
    ("Audit-Friendly Activity", "Keep a visible history of key updates, comments, stage changes, and operational actions where workflows require traceability."),
    ("Organized Data", "Maintain consistent records across projects, employees, accounts, bids, contracts, timesheets, attendance, files, and reports."),
    ("Scalable Operations", "Support growth by reducing reliance on spreadsheets, scattered messages, and disconnected departmental trackers."),
]

LIFECYCLE_STEPS = [
    ("1", "Capture the Opportunity", "Sales teams create and track bid requests with account information, ownership, stages, documents, expected value, and follow-up activity."),
    ("2", "Convert to Contract Clarity", "Teams connect bids with purchase orders or contract records to maintain commercial and delivery context."),
    ("3", "Launch Delivery with Context", "Delivery teams move from contract information into structured project planning with clearer expectations, timelines, and responsibilities."),
    ("4", "Organize Projects and Deliverables", "Project managers create projects, define deliverables, assign work items, manage files, and coordinate delivery activities."),
    ("5", "Execute Through Tasks", "Teams update tasks, communicate through contextual channels, create notes, attach files, and keep work activity visible."),
    ("6", "Track Time and Workforce", "Employees submit timesheets and attendance updates while managers review utilization, availability, and workload."),
    ("7", "Review Reports and Insights", "Leaders use dashboards and reports to evaluate delivery health, capacity, pipeline movement, and performance trends."),
    ("8", "Improve Continuously", "Feedback, reports, activity history, and visibility help teams refine planning, reduce delays, and improve future cycles."),
]

PERSONAS = [
    ("Executive Leaders", "Gain visibility into portfolio progress, delivery health, team workload, sales pipeline, contract status, and business performance without waiting for manual status reports."),
    ("Project Managers", "Plan projects, manage deliverables, assign work, track risks, review capacity, coordinate files, monitor timelines, and keep delivery moving."),
    ("HR and Operations Teams", "Manage employee records, attendance, timesheets, profiles, settings, and workforce insights from a structured HRMS workspace."),
    ("Sales Teams", "Track opportunities, manage bid stages, maintain documents, link purchase orders, and coordinate handoffs with delivery teams."),
    ("Finance and Billing Teams", "Review invoice-related work records, billable time, contract context, line items, and operational details needed for billing follow-up."),
    ("Team Members", "See assigned projects and tasks, update work progress, log time, access project files, communicate with teammates, and stay aligned from web or mobile."),
]

USE_CASES = [
    ("Professional Services Firms", "Manage client projects, billable work, team utilization, purchase orders, timesheets, reports, and delivery handoffs from one place."),
    ("Technology Delivery Teams", "Coordinate complex projects, deliverables, task boards, capacity planning, files, notes, chat, and reports across distributed teams."),
    ("Consulting Organizations", "Connect opportunity tracking, contract records, project delivery, resource planning, and time capture for client-focused engagements."),
    ("Corporate Operations Teams", "Bring HRMS, attendance, timesheets, team dashboards, approvals, documents, and operational reporting into a more structured workflow."),
    ("Sales-to-Delivery Organizations", "Improve the transition from bid requests and purchase orders to project execution, delivery tracking, and customer follow-up."),
    ("Growing Companies", "Replace scattered spreadsheets and disconnected tools with a single workspace that supports more people, projects, and operational complexity."),
]

BENEFITS = [
    ("Reduce Tool Switching", "Bring related work into one connected platform so teams spend less time moving between spreadsheets, chats, documents, and separate trackers."),
    ("Improve Delivery Accountability", "Make ownership, status, tasks, deliverables, timelines, and activity history easier to see and manage."),
    ("Strengthen Resource Planning", "Review capacity, availability, timesheets, utilization, and workload so managers can plan with better context."),
    ("Speed Up Sales-to-Project Handoffs", "Connect bid and purchase order information with project delivery so teams start execution with clearer context."),
    ("Make Reporting Easier", "Use dashboards, summaries, filters, and export-ready reports instead of building manual status updates from scattered sources."),
    ("Increase Employee Productivity", "Give employees a simpler way to view assignments, submit time, update tasks, access files, and communicate in context."),
    ("Support Operational Growth", "Create a structured platform foundation as your company adds more employees, projects, clients, teams, and workflows."),
    ("Improve Leadership Visibility", "Help executives and managers monitor project health, workforce trends, sales progress, and operational performance from one place."),
]

# Real workflow scenarios — no fake company names or invented metrics
WORKFLOW_SCENARIOS = [
    (
        "Weekly billing cycle",
        "Professional services",
        "Consultants log billable hours against project deliverables in the weekly timesheet grid. Managers review utilization on the HRMS dashboard. Finance opens the invoice register, pulls approved billable lines into a draft, attaches the purchase order reference from Sales, and generates a PDF for client AP.",
        ["Timesheet → Dashboard utilization → Invoice register → PDF"],
    ),
    (
        "Won deal to staffed project",
        "Sales & delivery",
        "A bid moves through pipeline stages on the bid requests register. On win, a purchase order is created and linked to the client account. Delivery opens PO details, spawns a project with the same account and contract context, assigns members, and dates deliverables — without re-keying client metadata.",
        ["Bid pipeline → Purchase order → Create project → Deliverables"],
    ),
    (
        "Sprint staffing decision",
        "Delivery teams",
        "A PM reviews team capacity — Overview gauges, Roster availability, Timeline allocation, and Gantt project bars — before committing work to the taskboard. Tasks move through Planned → To do → In progress → Done while summary charts show WIP and queue mix.",
        ["Team capacity → Taskboard → Task activity register"],
    ),
    (
        "Enterprise identity rollout",
        "IT & HR",
        "Employees sign in with Microsoft Entra ID. HR provisions accounts through the create-employee wizard (Profile → Access → Sign-in → Organization → Skills). Role templates control which modules appear in the sidebar. Org configuration inherits down the tree with override indicators for local policy.",
        ["SSO login → Employee wizard → Role templates → Org config"],
    ),
    (
        "Field time capture",
        "Mobile workforce",
        "A consultant between client meetings opens mobile timesheet, uses Record day to log billable hours against the active project, and sees the same week lock and validation hints as the web grid. Insights charts reflect the entry on the next sync.",
        ["Mobile login → Timesheet FAB → Web dashboard sync"],
    ),
    (
        "Month-end attendance reconciliation",
        "HR operations",
        "HR opens the attendance month matrix, filters to an org unit, marks or corrects day cells against timesheet leave rows, exports the matrix for payroll where permitted, and confirms attendance strips on employee dashboards align with the matrix.",
        ["Attendance matrix → Timesheet leave → Dashboard strip"],
    ),
]

MODULES = [
    (
        "projects.html",
        "📁",
        "Project Management",
        "Plan projects, manage deliverables, create work items, run task boards, monitor team capacity, review reports, maintain accounts, and search across work items.",
        ["Portfolio dashboard", "Kanban task board", "Team capacity", "Deliverables & milestones"],
    ),
    (
        "hrms.html",
        "👥",
        "Workforce & HRMS",
        "Manage employee dashboards, directories, profiles, timesheets, attendance, invoice-related records, and workforce visibility from a structured HRMS workspace.",
        ["Employee dashboard", "Weekly timesheets", "Attendance views", "Invoice tracking"],
    ),
    (
        "sales.html",
        "💼",
        "Sales & Contracts",
        "Track bid requests, manage purchase orders, monitor contract progress, link sales activity with delivery work, and support smoother opportunity-to-execution handoffs.",
        ["Bid pipeline", "Purchase orders", "Contract details", "Sales-to-delivery handoff"],
    ),
    (
        "mobile.html",
        "📱",
        "Mobile Productivity",
        "Access assigned projects, update tasks, record timesheets, and review insights from mobile screens designed for quick updates and field-friendly work.",
        ["Mobile timesheet", "Task updates", "Projects hub", "Personal insights"],
    ),
]

FAQ_ITEMS = [
    (
        "What is Tracopus?",
        "Tracopus is an enterprise operations platform that brings project management, workforce operations, timesheets, attendance, sales pipeline tracking, purchase order management, collaboration, mobile updates, and reporting into one connected workspace.",
    ),
    (
        "Who is Tracopus designed for?",
        "Tracopus is designed for corporate teams, professional services firms, consulting organizations, technology delivery groups, HR and operations teams, sales-to-delivery organizations, and growing companies that need better control over work, people, clients, and execution.",
    ),
    (
        "Can Tracopus support both project teams and HR teams?",
        "Yes. Tracopus includes project delivery capabilities such as dashboards, projects, deliverables, tasks, task boards, capacity, files, reports, and collaboration. It also includes workforce capabilities such as employee records, profiles, timesheets, attendance, invoices, settings, and employee dashboards.",
    ),
    (
        "Does Tracopus support sales and contract workflows?",
        "Yes. Sales teams can manage bid requests, bid details, opportunity stages, documents, purchase orders, contract records, and handoffs into delivery workflows.",
    ),
    (
        "Does Tracopus have a mobile experience?",
        "Yes. The mobile experience supports project visibility, task updates, timesheet recording, and personal insights so users can stay productive away from the desktop.",
    ),
    (
        "Can managers view dashboards and reports?",
        "Yes. Tracopus includes dashboards, charts, summaries, filters, and reports that help managers review project progress, workforce activity, utilization, capacity, sales progress, contract status, and operational trends based on their access level.",
    ),
    (
        "Can employees submit timesheets?",
        "Yes. Employees can record time through structured timesheet workflows, including billable, non-billable, leave, and project-linked work entries based on company rules.",
    ),
    (
        "Can Tracopus help with team capacity planning?",
        "Yes. Tracopus includes capacity views that help managers understand workload, utilization, availability, allocation, and planning pressure across people and teams.",
    ),
    (
        "Does Tracopus include collaboration tools?",
        "Yes. Tracopus includes collaboration features such as chat, notes, file management, comments, activity history, calendars, feedback, and unified search.",
    ),
    (
        "Is Tracopus suitable for growing companies?",
        "Yes. Tracopus is especially useful for companies that are outgrowing spreadsheets, disconnected trackers, and multiple separate tools. It provides a structured platform for scaling operations across teams and departments.",
    ),
    (
        "Can Tracopus help reduce manual reporting?",
        "Yes. Dashboards, summaries, filters, reports, and export-ready views help teams reduce the effort required to collect updates and prepare operational reports.",
    ),
    (
        "How can a company evaluate Tracopus?",
        "Companies can request a product demo to review the platform capabilities, discuss their operational needs, and understand how Tracopus can support their teams.",
    ),
]

RESOURCES = [
    (
        "Getting Started",
        "Login, SSO, navigation, and core Luxury UI concepts.",
        "Start with getting-started.html — then open your module index (HRMS, Project, or Sales) and bookmark daily screens like Timesheet and Taskboard.",
    ),
    (
        "Charts Reference",
        "Donut, bar, area, funnel, and mobile chart patterns.",
        "Every summary strip chart type is explained — utilization donuts, pipeline funnels, capacity heatmaps, and task queue mix.",
    ),
    (
        "Application Configuration",
        "Org tree, role templates, timesheet rules, and inheritance.",
        "Administrators configure org.json and role.json — inheritance chains, override indicators, and permission flags without code changes.",
    ),
    (
        "Admin & Access Controls",
        "RBAC, module visibility, export permissions, and MFA.",
        "How roles attach to org units and which CRUD actions each register exposes.",
    ),
    (
        "Mobile User Instructions",
        "Timesheet FAB, offline patterns, and permission parity.",
        "Field teams log hours under the same validation rules as the web grid.",
    ),
    (
        "Complete FAQ",
        "157+ searchable questions across modules.",
        "Self-serve answers on timesheet locks, bid stages, capacity views, and invoice workflows.",
    ),
]

TIMELINE = [
    (
        "Discover",
        "Map your teams to HRMS, Project, and Sales modules. Identify which registers replace current tools — timesheet, taskboard, bid pipeline, invoices.",
        "Week 1",
    ),
    (
        "Configure",
        "Set org tree, role templates, Entra ID SSO, notification emails, timesheet lock rules, and default palette.",
        "Week 2",
    ),
    (
        "Pilot",
        "One delivery team logs time, runs taskboard, and one HR admin manages roster and attendance. Validate summary charts against expectations.",
        "Week 3–4",
    ),
    (
        "Expand",
        "Connect Sales PO handoff to project creation, enable invoice pooling from approved hours, roll out mobile timesheet to field staff.",
        "Week 5–8",
    ),
    (
        "Optimize",
        "Adopt operational reports, tune Application Configuration from pilot feedback, and train teams on in-app Help Center search.",
        "Ongoing",
    ),
]

PAGE_META = {
    "index": {
        "title": "Tracopus | Enterprise Project, Workforce, Sales & Delivery Management Platform",
        "desc": "Tracopus brings project delivery, workforce operations, sales pipeline tracking, contracts, timesheets, collaboration, mobile work updates, and business insights into one connected enterprise workspace.",
        "hero_eyebrow": "Unified Enterprise Operations Platform",
        "hero_title": "Run projects, people, sales, and delivery<br><span class=\"gradient-text\">from one connected workspace.</span>",
        "hero_lead": "Tracopus helps growing companies bring delivery teams, HR operations, sales pipeline, contracts, timesheets, documents, and business insights into a single organized platform. Designed for organizations that need better visibility, stronger coordination, and smoother execution across projects, people, and business operations.",
        "hero_cta_primary": ("demo.html", "Request a Demo"),
        "hero_cta_secondary": ("platform.html", "View Platform Capabilities"),
    },
    "platform": {
        "title": "Platform Overview",
        "desc": "Everything your teams need to plan, execute, track, and improve — project delivery, workforce, sales, mobile, analytics, and collaboration in one platform.",
        "hero_eyebrow": "Platform Capabilities",
        "hero_title": "Everything your teams need<br><span class=\"gradient-text\">to plan, execute, track, and improve.</span>",
        "hero_lead": "Tracopus is organized around the core workflows that keep companies running. Each module is designed to work together so information flows naturally between business functions.",
    },
    "hrms": {
        "title": "Workforce & HRMS",
        "desc": "Manage people, time, attendance, and workforce records in one connected workspace.",
        "hero_eyebrow": "Workforce & HRMS Operations",
        "hero_title": "Manage people, time, attendance,<br><span class=\"gradient-text\">and workforce records.</span>",
        "hero_lead": "Tracopus includes HRMS capabilities that help companies manage employee information, timesheets, attendance, team dashboards, employee profiles, invoice-related records, and workforce insights.",
    },
    "projects": {
        "title": "Project Management",
        "desc": "Plan, track, and deliver projects with complete operational visibility.",
        "hero_eyebrow": "Project Delivery Management",
        "hero_title": "Plan, track, and deliver projects<br><span class=\"gradient-text\">with complete visibility.</span>",
        "hero_lead": "Tracopus gives project teams a centralized place to manage delivery work from planning to completion — projects, deliverables, tasks, capacity, files, feedback, and operational reports.",
    },
    "sales": {
        "title": "Sales & Contracts",
        "desc": "Move from opportunity tracking to delivery readiness with less handoff friction.",
        "hero_eyebrow": "Sales Pipeline & Contract Operations",
        "hero_title": "From opportunity tracking<br><span class=\"gradient-text\">to delivery readiness.</span>",
        "hero_lead": "Tracopus helps sales and delivery teams keep opportunity information, bid progress, purchase orders, contract status, documents, and delivery handoffs organized in one system.",
    },
    "mobile": {
        "title": "Mobile App",
        "desc": "Keep work moving from anywhere — projects, tasks, timesheets, and insights on mobile.",
        "hero_eyebrow": "Mobile Productivity",
        "hero_title": "Keep work moving<br><span class=\"gradient-text\">from anywhere.</span>",
        "hero_lead": "The Tracopus mobile experience helps employees and managers stay connected to essential work updates — view projects, manage tasks, record time, and review personal insights from a mobile-friendly interface.",
    },
    "luxury-ui": {
        "title": "Luxury UI",
        "desc": "Twelve palettes, icon rail, summary strips, global search, and assist dock.",
        "hero_eyebrow": "Luxury UI",
        "hero_title": "Software that<br><span class=\"gradient-text\">feels intentional.</span>",
        "hero_lead": "Emerald is the default, but twelve curated palettes let every user personalize the shell. A playful icon rail puts search, taskboard, calendar, notes, chat, files, and settings one click away — while collapsible summary strips and glass panels keep enterprise density without enterprise drab.",
    },
    "analytics": {
        "title": "Analytics & Reporting",
        "desc": "Turn daily work into meaningful business insight with dashboards, charts, filters, and reports.",
        "hero_eyebrow": "Operational Intelligence",
        "hero_title": "Turn daily work into<br><span class=\"gradient-text\">meaningful business insight.</span>",
        "hero_lead": "Dashboards, summaries, filters, charts, and reports give managers a clearer picture of project health, team workload, utilization, sales pipeline, contract status, and operational performance.",
    },
    "security": {
        "title": "Security & Governance",
        "desc": "Structured access, organized workflows, and reliable operational governance.",
        "hero_eyebrow": "Built for Business Control",
        "hero_title": "Structured access and<br><span class=\"gradient-text\">reliable governance.</span>",
        "hero_lead": "Tracopus is designed for companies that need both usability and control — role-aware navigation, status-driven workflows, organized records, and audit-friendly activity trails.",
    },
    "integrations": {
        "title": "Integrations",
        "desc": "Identity, notifications, exports, and documentation connectivity.",
        "hero_eyebrow": "Integrations",
        "hero_title": "Fits your<br><span class=\"gradient-text\">ecosystem.</span>",
        "hero_lead": "Entra ID for corporate login, configurable email routing for PO and project events, register exports where roles permit, deep links to bookmark timesheet and taskboard routes, and an in-app Help Center wired to the full documentation search index.",
    },
    "customers": {
        "title": "Customers & Use Cases",
        "desc": "Designed for companies that manage people, projects, clients, and delivery commitments.",
        "hero_eyebrow": "Use Cases",
        "hero_title": "Built for companies that<br><span class=\"gradient-text\">deliver and grow.</span>",
        "hero_lead": "Professional services firms, technology delivery teams, consulting organizations, corporate operations groups, and sales-to-delivery companies use Tracopus to replace scattered tools with one connected operating workspace.",
    },
    "about": {
        "title": "About Tracopus",
        "desc": "A practical platform for modern business operations.",
        "hero_eyebrow": "About Tracopus",
        "hero_title": "A practical platform for<br><span class=\"gradient-text\">modern business operations.</span>",
        "hero_lead": "Tracopus was created for organizations that need more than a simple task tracker and more flexibility than disconnected department tools — a shared workspace for planning, execution, communication, and performance review.",
    },
    "contact": {
        "title": "Contact",
        "desc": "Discover how Tracopus can support your company's operations.",
        "hero_eyebrow": "Talk to Us",
        "hero_title": "Discover how Tracopus<br><span class=\"gradient-text\">fits your organization.</span>",
        "hero_lead": "Tell us about your teams, project delivery process, workforce operations, sales pipeline, and reporting needs. We will help you understand how Tracopus can be configured as a practical operating platform for your organization.",
    },
    "demo": {
        "title": "Request a Demo",
        "desc": "See how Tracopus can fit your organization.",
        "hero_eyebrow": "Request a Demo",
        "hero_title": "See how Tracopus<br><span class=\"gradient-text\">can fit your organization.</span>",
        "hero_lead": "Whether you manage client projects, internal delivery, workforce operations, timesheets, contracts, or business reports, Tracopus gives your teams a single place to work with clarity.",
    },
    "resources": {
        "title": "Resources",
        "desc": "Guides, playbooks, and links to the complete user documentation.",
        "hero_eyebrow": "Resources",
        "hero_title": "Learn faster.<br><span class=\"gradient-text\">Roll out smarter.</span>",
        "hero_lead": "Implementation paths, chart references, admin configuration guides, and the full 38+ page user guide — everything your admins and team leads need to onboard with confidence, without inventing processes from scratch.",
    },
    "faq": {
        "title": "FAQ",
        "desc": "Common questions about Tracopus modules, security, and getting started.",
        "hero_eyebrow": "FAQ",
        "hero_title": "Answers,<br><span class=\"gradient-text\">on demand.</span>",
        "hero_lead": "Quick answers about modules, mobile parity, configuration, and security — with links to the complete FAQ library and screen-by-screen documentation when you need depth.",
    },
    "solutions/enterprise": {
        "title": "Enterprise",
        "desc": "SSO, org-wide configuration, RBAC, and audit-friendly registers at scale.",
        "hero_eyebrow": "Enterprise",
        "hero_title": "Scale without<br><span class=\"gradient-text\">sprawl.</span>",
        "hero_lead": "Multi-level org trees with inherited configuration, Entra ID SSO, role templates per department, MFA on employee profiles, session policies, and export permissions — so IT governs access while delivery teams keep a single Luxury workspace.",
    },
    "solutions/consulting": {
        "title": "Consulting Firms",
        "desc": "Utilization, billable time, attendance, and client invoicing for firms that sell hours.",
        "hero_eyebrow": "Consulting",
        "hero_title": "Billable clarity<br><span class=\"gradient-text\">every week.</span>",
        "hero_lead": "Consultants log hours against project deliverables. Managers read utilization donuts on scoped team dashboards. Finance pulls approved billable lines into invoice drafts with PO references — the weekly rhythm professional services firms depend on, without reconciliation archaeology.",
    },
    "solutions/delivery-teams": {
        "title": "Delivery Teams",
        "desc": "Taskboards, capacity, deliverables, and project health for makers and PMs.",
        "hero_eyebrow": "Delivery teams",
        "hero_title": "Ship with<br><span class=\"gradient-text\">shared context.</span>",
        "hero_lead": "Kanban taskboards with WIP analytics, deliverable hierarchies with est-vs-actual, team capacity across Overview, Roster, Timeline, and Gantt, plus twelve operational reports — engineers, designers, and PMs align on one portfolio view.",
    },
}

FEATURE_BLOCKS = {
    "platform": [
        ("🧭", "Unified navigation", "One sidebar, one icon rail, one global search — HRMS, Project, and Sales share the same Luxury shell and module expand/collapse based on role."),
        ("🔐", "Shared permissions", "Role templates attach to org units. Users see exactly the screens and CRUD actions their role allows — module sidebar prunes automatically."),
        ("📊", "Summary strips everywhere", "Collapsible KPI and chart rows on registers — expand for analytics, collapse for register focus. State persists in browser storage."),
        ("⚡", "Help Center built in", "Search the documentation index from inside the app — 38+ screen guides, charts reference, admin docs, and 157+ FAQ entries."),
        ("🎨", "Twelve palettes", "Emerald, sapphire, indigo, rose, and more — personal preference syncs to mobile after login."),
        ("📱", "Web + mobile parity", "Timesheet locks, task visibility, validation rules, and themes follow the same configuration on every device."),
        ("📋", "SHOW · SORT · Filter", "Standard list header on registers — status presets, sort columns, text search, and multi-team scope for charts and rows."),
        ("🔗", "Cross-module linkage", "Timesheet hours tie to project deliverables. POs link to accounts and spawn projects. Invoices trace back to billable rows."),
    ],
    "hrms": [
        ("📈", "Employee Dashboard", "Give employees and managers a clear view of attendance, utilization, tasks, leave or holiday context, and weekly work patterns."),
        ("👥", "Employee Directory", "Maintain an organized employee register with profile details, status, teams, roles, skills, and contact information."),
        ("👤", "Employee Profiles", "Centralize employee information, skills, team context, access preferences, notifications, and recent activity."),
        ("⏱", "Timesheets", "Capture billable, non-billable, leave, and project-linked hours through a structured weekly timesheet experience."),
        ("✅", "Attendance", "Review attendance through calendar-style views, employee filters, monthly summaries, and correction-friendly workflows."),
        ("🧾", "Invoices", "Support invoice-related operational tracking by connecting billable work, line items, status transitions, and related timesheet context."),
        ("⚙️", "Settings", "Allow users to manage personal settings, notifications, timesheet preferences, and workspace behavior based on organization rules."),
        ("📊", "Workforce Insights", "Use dashboards and summaries to understand headcount, attendance, team structure, skill distribution, utilization, and workforce trends."),
    ],
    "projects": [
        ("📋", "Portfolio Dashboard", "Review active projects, delivery trends, overdue work, and portfolio-level progress from a centralized dashboard."),
        ("📁", "Project List & Details", "Maintain a structured register of projects with status, dates, associated account, team members, and delivery progress."),
        ("🗂️", "Deliverables & Milestones", "Break projects into deliverables, milestones, or work packages so teams can track progress at the right level of detail."),
        ("✅", "Work Items & Task Activity", "Create, assign, update, and monitor project work items with clear ownership, status, priority, and activity history."),
        ("📌", "Task Board", "Use a visual task board to manage workflow stages, track work in progress, and quickly identify blocked or delayed activities."),
        ("👥", "Team Capacity", "Review workload, utilization, team availability, allocation trends, and capacity indicators to support better planning."),
        ("📑", "Project Reports", "Generate operational reports for project performance, estimate-versus-actual tracking, utilization, and delivery follow-up."),
        ("💬", "Calendar, Notes, Files & Chat", "Coordinate milestones, maintain shared notes, store project files, and communicate in context without switching tools."),
    ],
    "sales": [
        ("🎯", "Bid Requests", "Track opportunities, owners, stages, values, dates, accounts, and sales progress from a structured bid register."),
        ("📄", "Bid Details", "Manage stage progression, documents, activity history, ownership, and purchase order linkage in one opportunity workspace."),
        ("📋", "Purchase Orders", "Maintain a centralized register of purchase orders and contract records with status, value, account, dates, and delivery health."),
        ("🔗", "Purchase Order Details", "Track contract context, delivery milestones, related projects, documents, risk indicators, and progression to completion."),
        ("🚀", "Sales-to-Delivery Handoff", "Move from a won opportunity or active contract into project execution with better structure and less information loss."),
        ("📊", "Pipeline Visibility", "Use visual summaries and filtered views to understand funnel status, contract progress, account concentration, and follow-up needs."),
    ],
    "mobile": [
        ("🪪", "Mobile Login & Access", "Provide a convenient mobile entry point for users to access their workspace based on company access policies."),
        ("📁", "Projects Hub", "Give users a mobile view of assigned projects, project status, team context, and delivery shortcuts."),
        ("✅", "Tasks Hub", "Review assigned tasks, update status, manage checklist items, add comments, and stay current on work progress."),
        ("⏱", "Mobile Timesheet", "Record hours, choose work types, connect time to projects, and keep timesheets updated while work is fresh."),
        ("📊", "Insights Dashboard", "Quick mobile view of time, utilization, task status, project status, planned versus logged work, and weekly trends."),
        ("📶", "Offline-Friendly Workflows", "Support practical mobile work patterns where updates can be captured and synchronized based on connectivity."),
    ],
    "luxury-ui": [
        ("🎨", "Curated palettes", "Twelve luxury color systems documented in the interface guide — emerald default with indigo, sapphire, rose, and more."),
        ("🛤️", "Icon rail", "Search, taskboard, calendar, notes, chat, files, palette picker, settings — persistent one-click access."),
        ("📊", "Summary strip toggle", "Expand or collapse analytics rows on list screens; preference persists for the session."),
        ("🔍", "Global search", "Cross-module query for projects, tasks, employees, and files — scoped to team and permissions."),
        ("🧭", "Module sidebar", "HRMS, Sales, Project expand to show only routes your role template allows."),
        ("✨", "Micro-interactions", "Smooth transitions, glass panels, sticky gradient header, and assist dock for help and feedback."),
        ("📱", "Responsive layout", "Collapsible sidebar and register layouts adapt from wide portfolio views to focused mobile widths."),
        ("🧙", "Create wizards", "Multi-step flows for employees, bids, projects, and purchase orders — consistent stepper pattern."),
    ],
    "analytics": [
        ("📁", "Project Health", "Review active projects, overdue work, delivery trends, status distribution, estimate gaps, and completion patterns."),
        ("👥", "Team Capacity", "Understand workload, availability, utilization, allocation, and planning pressure across employees and teams."),
        ("⏱", "Timesheet Visibility", "Track billable and non-billable effort, weekly totals, leave hours, project-linked work, and invoice-ready activity."),
        ("💼", "Sales Pipeline", "Monitor bid stages, opportunity movement, account concentration, expected value, and follow-up activity."),
        ("📋", "Contract Tracking", "View purchase order status, delivery progress, milestone health, documents, and contract-related project readiness."),
        ("👤", "Workforce Trends", "Review employee activity, attendance, team composition, skills, and workforce distribution based on permitted access."),
        ("📑", "Reports & Exports", "Support operational review with report catalogs, date filters, team filters, and export-ready data for business follow-up."),
    ],
    "security": [
        ("🛡️", "Role-Aware Experience", "Show users the modules, records, and actions that match their responsibilities and company policies."),
        ("👤", "Clear Ownership", "Assign work, bids, projects, tasks, accounts, employees, and documents to the right people and teams."),
        ("🔄", "Status-Driven Workflows", "Move projects, bids, purchase orders, tasks, invoices, deliverables, and feedback through structured lifecycle stages."),
        ("📋", "Audit-Friendly Activity", "Keep a visible history of key updates, comments, stage changes, and operational actions where traceability is required."),
        ("🗂️", "Organized Data", "Maintain consistent records across projects, employees, accounts, bids, contracts, timesheets, attendance, files, and reports."),
        ("📈", "Scalable Operations", "Support growth by reducing reliance on spreadsheets, scattered messages, and disconnected departmental trackers."),
    ],
    "integrations": [
        ("🪪", "Entra ID / SSO", "Corporate login without separate passwords — OAuth flow on web and mobile."),
        ("📧", "Email routing", "PO, project, and notification recipient lists configured in org Application Configuration."),
        ("📤", "Register exports", "CSV and Excel from attendance, employees, and reports where roles permit."),
        ("📚", "Documentation hub", "User guide, FAQ index, and in-app Help Center search share one documentation index."),
        ("🔗", "Deep links", "Bookmark module routes — timesheet, taskboard, bid list — directly from browser."),
        ("🏗️", "Service-oriented backend", "API-ready patterns for future connectors — CRM sync indicator on bid details today."),
        ("🔄", "Leave sync", "Timesheet can pull approved leave from HR integration where configured."),
        ("📱", "Mobile identity", "Same SSO and token policies as web — biometric unlock after initial auth."),
    ],
}

# Per-page rich sections — intro, pains, outcomes, workflows, screens, audiences, extra FAQ
PAGE_SECTIONS = {
    "index": {
        "intro": "Tracopus helps growing companies bring their delivery teams, HR operations, sales pipeline, contracts, timesheets, documents, and business insights into a single organized platform. Instead of switching between disconnected tools, teams can plan work, manage people, track execution, collaborate across departments, and make faster decisions using real-time operational visibility.",
        "pains": [
            ("Fragmented Workflows", "Teams lose time when project updates, employee data, sales details, documents, and reports are scattered across different systems."),
            ("Limited Delivery Visibility", "Managers often struggle to see which projects are at risk, where resources are overloaded, and which deliverables need immediate attention."),
            ("Manual Timesheet and Reporting", "Manual time capture and disconnected reporting make it harder to understand utilization, billing readiness, and delivery performance."),
            ("Weak Sales-to-Delivery Handoff", "When bid details, contract status, project setup, and delivery execution are not connected, teams risk delays and communication gaps."),
            ("Unclear Ownership", "Without a structured workspace, tasks, approvals, documents, updates, and follow-ups can easily fall through the cracks."),
            ("Slow Decision-Making", "Executives and managers need clean dashboards and operational summaries, not scattered status updates across multiple tools."),
        ],
        "outcomes": [
            "One operating workspace for projects, workforce, sales, and delivery",
            "Project-to-invoice visibility across planning, execution, and reporting",
            "Mobile-ready teams with timesheet, task, and insight access",
            "Leadership dashboards for workload, utilization, and pipeline progress",
            "Collaboration tools connected to project and delivery context",
        ],
    },
    "platform": {
        "intro": "Tracopus is organized around the core workflows that keep companies running: project delivery, workforce management, sales and contract tracking, reporting, collaboration, and mobile productivity. Each module is designed to work together so information flows naturally between business functions.",
        "pains": [
            ("Inconsistent UX", "Switching between HR and PM tools means relearning filters, exports, and where analytics hide."),
            ("Permission drift", "Separate admin consoles for each tool make it hard to know who can export, edit locked weeks, or create POs."),
            ("Training burden", "Undocumented dashboards force every new hire to ask a veteran what each chart means."),
        ],
        "outcomes": [
            "Shared SHOW · SORT · Filter pattern on list registers",
            "Role templates control sidebar modules and CRUD flags",
            "Collapsible summary strips with documented chart meanings",
            "Icon rail and global search available on every module route",
        ],
        "workflows": [
            (
                "Admin setup path",
                "Typical enterprise configuration sequence from documentation.",
                [
                    "Configure org tree and inheritance in Application Configuration",
                    "Attach role templates to org units",
                    "Enable Entra ID SSO and notification email lists",
                    "Pilot timesheet rules — locks, max hours, edit windows",
                ],
            ),
        ],
        "screens": [
            ("getting-started.html", "Getting Started", "Login, SSO, navigation, core concepts."),
            ("interface.html", "Luxury Interface", "Shell, themes, icon rail, wizards."),
            ("application-configuration.html", "App Configuration", "Org data, roles, timesheet rules."),
            ("admin.html", "Admin & Access", "RBAC overview and permission patterns."),
        ],
    },
    "hrms": {
        "intro": "Tracopus includes HRMS capabilities that help companies manage employee information, timesheets, attendance, team dashboards, employee profiles, invoice-related records, and workforce insights. Employees can view their dashboard and update time; managers can review team information, utilization, and workload; HR teams maintain employee records and support cleaner workforce processes.",
        "pains": [
            ("Friday panic entry", "Consultants batch-enter hours days late — utilization charts lie until the grid is complete."),
            ("Billable ambiguity", "Hours logged without deliverable linkage break est-vs-actual and invoice traceability."),
            ("Manager blind spots", "Team utilization viewed company-wide instead of scoped org units leads to wrong staffing calls."),
            ("Attendance vs timesheet mismatch", "Leave on timesheet but absent in attendance matrix causes payroll disputes."),
        ],
        "outcomes": [
            "Weekly timesheet with billable, non-billable, and leave rows",
            "My and Team dashboard tabs with documented utilization charts",
            "Employee create wizard through Access and Skills steps",
            "Invoice register fed by approved billable pool",
        ],
        "workflows": [
            (
                "Weekly timesheet cycle",
                "Documented rhythm from individual contributor to finance.",
                [
                    "Contributor logs daily or before lock — billable rows require project/deliverable",
                    "Manager reviews Team dashboard with org scope set",
                    "Finance opens Invoices when timesheet period is approved",
                ],
            ),
            (
                "New hire onboarding",
                "HR provisions access before first login.",
                [
                    "CREATE employee via wizard — Profile through Skills",
                    "Complete Access and Sign-in steps for SSO",
                    "Employee sets MFA and notifications on Profile",
                ],
            ),
        ],
        "screens": [
            ("hrms/timesheet.html", "Timesheet", "Week grid, entry types, validation summary."),
            ("hrms/dashboard.html", "Dashboard", "Utilization donuts, six-week stack, leave list."),
            ("hrms/employees.html", "Employees", "Roster, nine charts, create wizard."),
            ("hrms/invoices.html", "Invoices", "Register KPIs and draft-to-paid workflow."),
        ],
    },
    "projects": {
        "intro": "Tracopus gives project teams a centralized place to manage delivery work from planning to completion. Teams can create and organize projects, define deliverables, break work into actionable tasks, monitor project health, review capacity, manage files, capture feedback, and generate operational reports — with portfolio-level visibility for delivery leaders and clear day-to-day structure for project managers and team members.",
        "pains": [
            ("Portfolio blind spots", "PMs discover overdue deliverables in status meetings instead of on a dashboard."),
            ("Staffing guesswork", "Sprint commitments made without Roster or Timeline capacity views lead to over-allocation."),
            ("Estimate drift", "Work items without estimates show up on estimate gap lists — but only if the portfolio register is authoritative."),
            ("Context switching", "Files, chat, notes, and calendar live outside the project record."),
        ],
        "outcomes": [
            "Portfolio dashboard with My vs team scope",
            "Kanban taskboard with five flow analytics panels",
            "Team capacity: Overview, Roster, Timeline, Gantt",
            "Twelve operational reports with export formats",
        ],
        "workflows": [
            (
                "Sprint planning",
                "Capacity-informed taskboard workflow.",
                [
                    "Review Team capacity Overview and Roster for availability",
                    "Filter taskboard by project and assignee",
                    "Move cards Planned → To do → In progress → Done",
                    "Check est-vs-actual on deliverable detail after sprint",
                ],
            ),
            (
                "New project kickoff",
                "From create wizard to staffed deliverables.",
                [
                    "CREATE project with type, team, dates, account link",
                    "Add members with roles on project details",
                    "Create deliverable hierarchy and work items",
                    "Upload SOW files in project file manager",
                ],
            ),
        ],
        "screens": [
            ("project/dashboard.html", "Project Dashboard", "Portfolio KPIs and trend charts."),
            ("project/team-capacity.html", "Team Capacity", "Four tabs for staffing decisions."),
            ("project/taskboard.html", "Taskboard", "Kanban with filters and card drawer."),
            ("project/reports.html", "Reports", "Twelve report types with date/team scope."),
        ],
    },
    "sales": {
        "intro": "Tracopus helps sales and delivery teams keep opportunity information, bid progress, purchase orders, contract status, documents, and delivery handoffs organized in one system. Sales teams gain clearer visibility into bid status and contract progress; delivery teams receive better context when work moves forward; leadership reviews pipeline and contract health through dashboards and summaries.",
        "pains": [
            ("Pipeline in spreadsheets", "Stage changes lack activity history and team-scoped analytics."),
            ("Lost PO context", "Delivery creates projects manually and misses contract value, dates, and account linkage."),
            ("Disconnected accounts", "Client records duplicated across sales, finance, and project modules."),
            ("Reactive delivery health", "Overdue contracts discovered late without summary strip indicators."),
        ],
        "outcomes": [
            "Bid funnel and twelve pipeline analytics panels",
            "PO register with delivery health donut",
            "Create project directly from PO details",
            "Account register tying projects and billing",
        ],
        "workflows": [
            (
                "Opportunity to contract",
                "Standard sales register flow.",
                [
                    "CREATE bid and move through documented stages",
                    "Attach documents on bid details",
                    "Create or link purchase order on win",
                    "Hand off to delivery via Create project on PO details",
                ],
            ),
        ],
        "screens": [
            ("sales/bid-requests.html", "Bid Requests", "Funnel, filters, twelve summary charts."),
            ("sales/purchase-orders.html", "Purchase Orders", "Contract analytics and CREATE flow."),
            ("sales/purchase-order-details.html", "PO Details", "Milestones, projects tab, create project."),
            ("project/accounts.html", "Accounts", "Client register with project concentration."),
        ],
    },
    "mobile": {
        "intro": "The Tracopus mobile experience helps employees and managers stay connected to essential work updates even when they are away from a desktop. Mobile access is especially valuable for distributed teams, consultants, field employees, managers on the move, and organizations that need faster operational updates throughout the day.",
        "pains": [
            ("Delayed field entry", "Consultants wait until hotel Wi-Fi to log client-site hours — mobile removes that friction."),
            ("Policy mismatch", "Mobile apps that ignore week locks train teams to work around compliance."),
            ("Separate mobile UX", "Different navigation and permissions erode trust in the data finance uses."),
        ],
        "outcomes": [
            "Record day FAB on mobile timesheet",
            "Task detail with checklist and status updates",
            "Six insight chart types with week selector",
            "SSO, biometrics, and palette sync",
        ],
        "workflows": [
            (
                "Same-day time capture",
                "Documented mobile timesheet path.",
                [
                    "Biometric unlock after Entra ID login",
                    "Record day → pick project for billable row",
                    "Entry appears on web timesheet on sync",
                ],
            ),
        ],
        "screens": [
            ("mobile/timesheet.html", "Mobile Timesheet", "FAB, week grid, validation parity."),
            ("mobile/tasks.html", "Mobile Tasks", "Queue, detail, offline sync notes."),
            ("mobile/insights.html", "Mobile Insights", "Utilization and portfolio charts."),
            ("mobile/login.html", "Mobile Login", "SSO, registration, biometrics."),
        ],
    },
    "luxury-ui": {
        "intro": "Luxury UI is the deliberate craft layer on top of enterprise workflows — twelve palettes, glass panels, sticky gradient headers, icon rail shortcuts, collapsible summary strips, multi-step create wizards, and an assist dock for help and feedback. The interface guide documents each shell element so admins explain where search, taskboard, and palette live on day one.",
        "pains": [
            ("Enterprise drab", "Teams resist tools that look like punishment — adoption suffers before features matter."),
            ("Hidden navigation", "Critical actions buried in hamburger menus slow daily registers work."),
            ("Analytics clutter", "Always-on chart rows steal register space — collapsible strips fix that tradeoff."),
        ],
        "outcomes": [
            "Twelve documented theme palettes with mobile sync",
            "Persistent icon rail for cross-module shortcuts",
            "SHOW · SORT · Filter on every list register",
            "Assist dock linking to Help Center search",
        ],
        "workflows": [
            (
                "Personalize your shell",
                "First-session setup from interface guide.",
                [
                    "Choose palette from icon rail picker",
                    "Pin taskboard and calendar shortcuts",
                    "Toggle summary strip expanded for weekly review",
                    "Open Help Center from assist dock",
                ],
            ),
        ],
        "screens": [
            ("interface.html", "Luxury Interface", "Shell anatomy and palette list."),
            ("getting-started.html", "Getting Started", "Navigation and module sidebar."),
            ("project/search.html", "Global Search", "Cross-module query patterns."),
        ],
    },
    "analytics": {
        "intro": "Tracopus helps teams understand what is happening across projects, people, sales activity, contracts, capacity, timesheets, and delivery execution. With better visibility, organizations can identify delivery risks earlier, understand team workload, review utilization, monitor attendance, evaluate sales pipeline movement, and make more confident decisions.",
        "pains": [
            ("Mystery metrics", "Undocumented charts become arguments instead of decisions."),
            ("Wrong scope", "Team charts read without org scope bar show blended company data."),
            ("Dashboard fatigue", "Separate BI tools duplicate registers people already filter daily."),
        ],
        "outcomes": [
            "Per-chart documentation on every screen guide",
            "Collapsible strips — expand for review, collapse for focus",
            "Team scope bar on manager analytics",
            "Twelve exportable project reports",
        ],
        "workflows": [
            (
                "Manager weekly review",
                "Documented analytics ritual.",
                [
                    "Set Team scope on HRMS Team dashboard",
                    "Expand summary strip on project list — scan estimate gaps",
                    "Open team capacity Overview before staffing changes",
                ],
            ),
        ],
        "screens": [
            ("charts.html", "Charts Reference", "Donut, bar, area, funnel patterns."),
            ("hrms/dashboard.html", "HRMS Dashboard", "Utilization and hour stack charts."),
            ("project/project-list.html", "Project List", "Seventeen summary panels."),
            ("project/team-capacity.html", "Team Capacity", "Gauges, heatmaps, Gantt."),
        ],
    },
    "security": {
        "intro": "Security in Tracopus spans identity, authorization, configuration inheritance, and export governance — documented in Getting Started, Admin, and Access Controls guides. Users sign in with Microsoft Entra ID; role templates gate module routes and CRUD actions; org configuration inherits with visible override markers; sensitive exports require explicit grants.",
        "pains": [
            ("Shadow admin", "Per-tool permission consoles diverge — nobody knows who can export roster data."),
            ("Weak field identity", "Separate passwords for time tracking invite credential sprawl."),
            ("Unaudited exports", "Bulk downloads without role gates risk PII exposure."),
        ],
        "outcomes": [
            "Entra ID SSO on web and mobile",
            "Role templates with module and CRUD flags",
            "MFA on employee profile Security tab",
            "Export permissions on attendance, employees, reports",
        ],
        "workflows": [
            (
                "Role provisioning",
                "Typical access setup from admin guide.",
                [
                    "Define role template with module visibility",
                    "Attach role to org unit",
                    "Verify sidebar prunes for test user",
                    "Confirm export buttons hidden without grant",
                ],
            ),
        ],
        "screens": [
            ("access-controls.html", "Access Controls", "RBAC patterns and flags."),
            ("admin.html", "Admin Guide", "Configuration overview."),
            ("hrms/profile.html", "Profile Security", "MFA and sessions."),
        ],
    },
    "integrations": {
        "intro": "Tracopus integrates where enterprise teams already operate — Entra ID for identity, configurable email lists for operational notifications, register exports for finance and HR, and a unified documentation index powering in-app Help Center search. Bid details show CRM sync status where Salesforce linkage is configured; timesheet supports leave pull from HR integration when enabled.",
        "pains": [
            ("Login fatigue", "Another password for time entry guarantees workarounds."),
            ("Notification chaos", "Ad-hoc email lists in code instead of org-configured routing."),
            ("Help silos", "Documentation living outside the app slows adoption."),
        ],
        "outcomes": [
            "Entra ID on web and mobile login flows",
            "Org-configured notification recipient lists",
            "CSV/Excel exports on key registers",
            "Help Center wired to documentation search index",
        ],
        "workflows": [
            (
                "Identity + help rollout",
                "Connect corporate IdP and self-serve support.",
                [
                    "Enable Entra ID in environment configuration",
                    "Train users on Help Center search from assist dock",
                    "Configure PO and project notification emails in org data",
                ],
            ),
        ],
        "screens": [
            ("getting-started.html", "Getting Started", "SSO login walkthrough."),
            ("application-configuration.html", "App Configuration", "Org data and email lists."),
            ("index.html", "Documentation Home", "Search index and module map."),
        ],
    },
    "customers": {
        "intro": "Tracopus is designed for companies that manage people, projects, clients, and delivery commitments every day — professional services firms, technology delivery teams, consulting organizations, corporate operations groups, and sales-to-delivery companies replacing scattered spreadsheets with one structured platform.",
        "pains": [
            ("Fragmented client delivery", "Projects, time, contracts, and reports live in different tools — handoffs lose context."),
            ("Scaling complexity", "Growing headcount and project volume outpace spreadsheet-based operations."),
            ("Role silos", "Sales, HR, delivery, and finance each maintain separate trackers instead of one shared workspace."),
        ],
        "outcomes": [
            "Use-case fit for professional services, technology, consulting, and corporate ops",
            "Persona-aligned workflows for leaders, PMs, HR, sales, finance, and team members",
            "End-to-end lifecycle from opportunity to continuous improvement",
        ],
    },
    "about": {
        "intro": "Tracopus was created for organizations that need more than a simple task tracker and more flexibility than disconnected department tools. Modern companies manage projects, people, sales opportunities, contracts, files, timesheets, reports, and collaboration every day. When these workflows are spread across separate systems, teams lose visibility and leadership loses time. Tracopus brings these operational workflows together in one business workspace — supporting both strategic visibility and everyday productivity.",
        "pains": [
            ("Scattered workflows", "Projects, people, sales, contracts, and reports spread across separate systems slow teams down."),
            ("Leadership blind spots", "Manual status reports replace real-time visibility into delivery and workforce activity."),
        ],
        "outcomes": [
            "One connected workspace for planning, execution, and review",
            "Leaders gain clearer view of the business",
            "Managers gain control over delivery and capacity",
            "Employees get a simpler way to update work",
        ],
    },
    "contact": {
        "intro": "Whether you are evaluating a pilot, planning an Entra ID rollout, or mapping which registers replace current tools, we will tailor the conversation to your modules and teams — not a generic slide deck.",
    },
    "demo": {
        "intro": "Demos focus on the workflows you name upfront — timesheet and utilization for HR-led evaluations, taskboard and capacity for delivery leads, bid-to-PO handoff for sales ops, or mobile Record day for field teams. We walk through the documented screens so you can match them to your rollout plan.",
    },
    "resources": {
        "intro": "Rollout succeeds when admins and team leads share the same reference material. Tracopus ships a complete user guide — getting started, module indexes, charts reference, application configuration, admin access, mobile instructions, and 157+ FAQ entries — searchable from the website and from inside the app.",
    },
    "faq": {
        "intro": "Answers to the most common questions about Tracopus — what it includes, who it is for, and how modules work together. For a complete list, see the full FAQ page or request a demo to discuss your organization's needs.",
    },
    "solutions/enterprise": {
        "intro": "Enterprise deployments need identity federation, org-wide configuration inheritance, department-scoped roles, and export governance — without giving every user a different product experience. Tracopus admin guides document org trees, role templates, override indicators, and permission flags so IT and HR roll out deliberately.",
        "pains": [
            ("Department silos", "Each division configures ad hoc — data and permissions diverge."),
            ("IT ticket volume", "Undocumented permission model floods helpdesk with access requests."),
            ("Compliance gaps", "Uncontrolled exports of roster and attendance data."),
        ],
        "outcomes": [
            "Entra ID SSO with MFA on profiles",
            "Org inheritance with override visibility",
            "Role templates per department",
            "Export gates on sensitive registers",
        ],
        "workflows": [
            (
                "Phased enterprise rollout",
                "From identity to module expansion.",
                [
                    "Enable SSO and pilot role template with one org unit",
                    "Validate sidebar pruning and export denials for test users",
                    "Expand modules — HRMS, Project, Sales — by department",
                    "Tune Application Configuration from pilot feedback",
                ],
            ),
        ],
        "screens": [
            ("admin.html", "Admin Guide", "Rollout checklist and config map."),
            ("access-controls.html", "Access Controls", "Permission flag reference."),
            ("application-configuration.html", "App Configuration", "Org tree and inheritance."),
        ],
    },
    "solutions/consulting": {
        "intro": "Consulting firms live on billable utilization — the gap between available hours and client work is the business. Tracopus HRMS module ties weekly timesheet rows to project deliverables, surfaces utilization on documented dashboard charts, and feeds approved billable hours toward invoice drafts with PO references from Sales.",
        "pains": [
            ("Month-end reconciliation", "Finance rebuilds billable totals from exports because time and invoicing systems disagree."),
            ("Utilization distrust", "Managers scope charts wrong or entries arrive too late for weekly review."),
            ("Partner visibility", "No single register connects hours, deliverables, and invoice lines."),
        ],
        "outcomes": [
            "Billable rows linked to deliverables",
            "Team-scoped utilization on dashboard",
            "Invoice traceability to timesheet lines",
            "PO number on invoice header from Sales",
        ],
        "workflows": [
            (
                "Weekly utilization rhythm",
                "Manager and contributor loop from docs.",
                [
                    "Contributors log daily on timesheet — billable requires project",
                    "Manager sets Team scope on dashboard before 1:1s",
                    "Finance drafts invoice after period approval",
                ],
            ),
        ],
        "screens": [
            ("hrms/timesheet.html", "Timesheet", "Billable grid and validation."),
            ("hrms/dashboard.html", "Dashboard", "Utilization donuts and hour stack."),
            ("hrms/invoices.html", "Invoices", "Draft register and KPI strip."),
            ("sales/purchase-orders.html", "Purchase Orders", "PO reference for billing."),
        ],
    },
    "solutions/delivery-teams": {
        "intro": "Delivery teams need shared context — what is on the board, who has capacity, which deliverables drift from estimate, and where files and decisions live. Eighteen project screens cover taskboard, capacity, deliverables, reports, and collaboration without forcing PMs to maintain parallel trackers.",
        "pains": [
            ("Shadow boards", "Engineers track real work in personal tools — official taskboard stale."),
            ("Capacity arguments", "Sprint planning without Roster or Timeline data — commitments based on gut feel."),
            ("Estimate surprises", "Deliverables missing estimates surface late on gap lists."),
        ],
        "outcomes": [
            "Kanban taskboard with documented WIP charts",
            "Four team capacity views",
            "Deliverable hierarchy with est-vs-actual",
            "Files, chat, notes in project context",
        ],
        "workflows": [
            (
                "Sprint execution",
                "Board + capacity loop.",
                [
                    "Staff sprint using Team capacity Roster tab",
                    "Run taskboard with project and assignee filters",
                    "Review est-vs-actual on deliverable detail mid-sprint",
                ],
            ),
        ],
        "screens": [
            ("project/taskboard.html", "Taskboard", "Columns, filters, card drawer."),
            ("project/team-capacity.html", "Team Capacity", "Overview through Gantt."),
            ("project/deliverables.html", "Deliverables", "Hierarchy register."),
            ("project/deliverable-details.html", "Deliverable Detail", "Est vs actual and work items."),
        ],
    },
}

PAGE_FAQ = {
    "hrms": [
        ("How is HRMS different from payroll?", "Tracopus HRMS handles operational time tracking, attendance matrices, roster management, and client invoicing — not full payroll calculation. Attendance and timesheet data may export to payroll where configured."),
        ("Can managers edit locked timesheet weeks?", "Only when role grants allow — past-week locks and edit windows are set in Application Configuration."),
    ],
    "projects": [
        ("How many project screens are documented?", "Eighteen — from dashboard and project list through taskboard, capacity, reports, and collaboration tools."),
        ("What reports are available?", "Twelve operational reports on the reports screen — utilization, est-vs-actual, and compliance variants with date range and team filters."),
    ],
    "sales": [
        ("How does PO to project handoff work?", "On purchase order details, Create project spawns a delivery project with account and contract context from the PO."),
        ("How many charts are on bid requests?", "Twelve analytics panels in the summary strip, including a vertical stage funnel."),
    ],
    "mobile": [
        ("Does mobile timesheet use the same week locks as web?", "Yes — validation rules and lock behaviour follow the same Application Configuration."),
        ("Is offline supported?", "Task and timesheet changes can queue for sync — see mobile screen guides for per-flow notes."),
    ],
    "luxury-ui": [
        ("How many palettes are available?", "Twelve curated luxury color systems — documented in the interface guide with mobile sync after login."),
        ("Where is global search?", "Icon rail and header search — indexes projects, tasks, employees, and files scoped to permissions."),
    ],
    "analytics": [
        ("Where are charts documented?", "charts.html for types; each screen page has per-chart summary cards explaining measures and actions."),
        ("Can I hide charts on list screens?", "Yes — collapse the summary strip; expand it for weekly review rituals."),
    ],
    "security": [
        ("What identity providers are supported?", "Microsoft Entra ID SSO is documented in Getting Started — for web and mobile login flows."),
        ("How are exports controlled?", "Attendance, employee register, and report exports require explicit role grants — buttons hide without permission."),
    ],
    "integrations": [
        ("Is there Salesforce integration?", "Bid details show CRM sync indicator where Salesforce linkage is configured in your deployment."),
        ("Can timesheet pull external leave?", "Sync external leaves action on timesheet pulls approved leave when HR integration is enabled."),
    ],
    "solutions/consulting": [
        ("Why link timesheet rows to deliverables?", "Billable hours roll into est-vs-actual on deliverables and trace to invoice lines — unlinked rows break that chain."),
    ],
    "solutions/delivery-teams": [
        ("What capacity views exist?", "Overview gauges, Roster grid, Timeline allocation bars, and Gantt project view — all on team capacity screen."),
    ],
    "solutions/enterprise": [
        ("How does org inheritance work?", "Configuration flows down the org tree — override indicators show where local policy deviates from parent units."),
    ],
}
