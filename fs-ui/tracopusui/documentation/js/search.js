(function () {
  'use strict';

  function getBasePath() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    return depth > 0 ? '../' : '';
  }

  function getBasePathAtLoad() {
    var depth = 0;
    if (document.body) {
      depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    } else if (/\/(project|sales|mobile|hrms|faq)\//.test(window.location.pathname)) {
      depth = 1;
    }
    return depth > 0 ? '../' : '';
  }

  var basePath = getBasePathAtLoad();
  var documentationPages = [
  {
    "title": "Home",
    "url": "index.html",
    "description": "Documentation home and navigation",
    "keywords": [
      "home",
      "overview",
      "guide"
    ]
  },
  {
    "title": "Interactive Data Flow",
    "url": "data-flow/index.html",
    "description": "Live flag simulators — leave policy, accrual, request/approve, timesheet, attendance, delegation",
    "keywords": [
      "data flow",
      "flags",
      "simulator",
      "leave",
      "timesheet",
      "attendance",
      "delegation",
      "accrual",
      "sql",
      "scheduler"
    ]
  },
  {
    "title": "Leave policy & accrual (data flow)",
    "url": "data-flow/leave-policy-flags-data-flow.html",
    "description": "GLP publish, opening balances, accrual jobs, employee balances",
    "keywords": [
      "leave policy",
      "accrual",
      "opening balance",
      "glp",
      "scheduler"
    ]
  },
  {
    "title": "Leave request & approve (data flow)",
    "url": "data-flow/leave-flags-data-flow.html",
    "description": "SUBMITTED workflow, manager approve, promote, attendance sync",
    "keywords": [
      "leave",
      "approve",
      "submit",
      "workflow",
      "promote"
    ]
  },
  {
    "title": "Persona navigation (data flow)",
    "url": "data-flow/persona-navigation-flags-data-flow.html",
    "description": "pagePersonaMap, disabledPersonas, sidebar catalog",
    "keywords": ["persona", "navigation", "pagePersonaMap", "access"]
  },
  {
    "title": "Roles & permissions (data flow)",
    "url": "data-flow/admin-roles-flags-data-flow.html",
    "description": "personaModules, allowedPersonas, defaultPersona, Role Bar, rbacAdminEnabled",
    "keywords": ["roles", "permissions", "personaModules", "admin", "RBAC"]
  },
  {
    "title": "Roles & permissions (screen guide)",
    "url": "hrms/roles-permissions.html",
    "description": "/admin/roles persona access tab, Advanced CRUD matrix",
    "keywords": ["roles", "admin", "personaModules", "screen guide"]
  },
  {
    "title": "Working day resolver (data flow)",
    "url": "data-flow/working-day-flags-data-flow.html",
    "description": "Shift policies, holidays, leave day count WDR chain",
    "keywords": ["working day", "shift", "holiday", "WDR", "leave count"]
  },
  {
    "title": "Scenario User Guide",
    "url": "user-guide/index.html",
    "description": "65 step-by-step workflows — permissions, flags, warnings, QA checklists",
    "keywords": [
      "scenario",
      "workflow",
      "steps",
      "test",
      "qa",
      "permissions"
    ]
  },
  {
    "title": "All scenarios",
    "url": "user-guide/scenarios.html",
    "description": "Flat index of all 65 scenario workflows",
    "keywords": [
      "scenarios",
      "all",
      "workflows",
      "index"
    ]
  },
  {
    "title": "Create employee (scenario)",
    "url": "user-guide/hrms/hrms-create-employee.html",
    "description": "HRMS wizard — create employee with access and sign-in",
    "keywords": [
      "create",
      "employee",
      "hrms",
      "wizard",
      "onboarding"
    ]
  },
  {
    "title": "Create project (scenario)",
    "url": "user-guide/project/project-create-project.html",
    "description": "7-step project wizard walkthrough",
    "keywords": [
      "create",
      "project",
      "wizard",
      "delivery"
    ]
  },
  {
    "title": "Getting Started",
    "url": "getting-started.html",
    "description": "Login, SSO, onboarding basics",
    "keywords": [
      "login",
      "sso",
      "password",
      "basics"
    ]
  },
  {
    "title": "Luxury Interface",
    "url": "interface.html",
    "description": "Shell layout, themes, and palettes",
    "keywords": [
      "interface",
      "theme",
      "palette",
      "navigation"
    ]
  },
  {
    "title": "Charts",
    "url": "charts.html",
    "description": "Chart type reference",
    "keywords": [
      "charts",
      "analytics",
      "donut",
      "bar",
      "area"
    ]
  },
  {
    "title": "Admin",
    "url": "admin.html",
    "description": "Permissions and configuration",
    "keywords": [
      "admin",
      "access",
      "permissions"
    ]
  },
  {
    "title": "FAQ",
    "url": "faq/index.html",
    "description": "Frequently asked questions \u2014 157+ answers for Tracopus",
    "keywords": [
      "faq",
      "questions",
      "answers",
      "help",
      "troubleshooting",
      "login & account access",
      "how",
      "sign",
      "what",
      "microsoft",
      "sso?",
      "forgot",
      "password",
      "why",
      "stuck",
      "activate",
      "can",
      "stay",
      "signed",
      "does",
      "session",
      "landing",
      "page",
      "change",
      "sso",
      "user",
      "navigation & luxury ui",
      "where",
      "the",
      "main",
      "icon",
      "show",
      "summary",
      "global",
      "search",
      "sidebar",
      "bookmark",
      "breadcrumb",
      "collapse",
      "hrms & employee records",
      "personal",
      "view",
      "are",
      "departments",
      "and",
      "utilization",
      "export",
      "attendance",
      "enable",
      "who",
      "updates",
      "skills",
      "can't",
      "see",
      "employee",
      "team",
      "filters",
      "timesheet & time entry",
      "log",
      "pick",
      "work",
      "copy",
      "last",
      "week",
      "non-project",
      "hours?",
      "managers",
      "approve",
      "add",
      "max",
      "hours",
      "mobile",
      "timesheet",
      "same",
      "billable",
      "happens",
      "projects & delivery",
      "create",
      "deliverable?",
      "open"
    ]
  },
  {
    "title": "HRMS Overview",
    "url": "hrms/index.html",
    "description": "HRMS Overview documentation page",
    "keywords": [
      "hrms",
      "hrms overview"
    ]
  },
  {
    "title": "Employee Dashboard",
    "url": "hrms/dashboard.html",
    "description": "Employee Dashboard documentation page",
    "keywords": [
      "hrms",
      "employee dashboard"
    ]
  },
  {
    "title": "Employees",
    "url": "hrms/employees.html",
    "description": "Employees documentation page",
    "keywords": [
      "hrms",
      "employees"
    ]
  },
  {
    "title": "Timesheet",
    "url": "hrms/timesheet.html",
    "description": "Weekly timesheet grid — billable, non-billable, and leave entry",
    "keywords": [
      "hrms",
      "timesheet",
      "hours",
      "week grid"
    ]
  },
  {
    "title": "Timesheet Approval",
    "url": "hrms/timesheet-approval.html",
    "description": "Submit, manager approve, conflict resolution, payroll lock, and approval delegation",
    "keywords": [
      "hrms",
      "timesheet",
      "approval",
      "pending",
      "delegation",
      "lock",
      "payroll"
    ]
  },
  {
    "title": "Leave Management",
    "url": "hrms/leaves.html",
    "description": "Native leave apply/approve lifecycle, balances, working-week day counts, timesheet promotion",
    "keywords": [
      "hrms",
      "leave",
      "leave management",
      "balance",
      "accrual",
      "approve",
      "apply leave",
      "working days",
      "half-day",
      "pending"
    ]
  },
  {
    "title": "Leave Configuration",
    "url": "hrms/leave-configuration.html",
    "description": "Admin leave setup: Global Policy Center, holidays, working days, jurisdictions, employee balances, org/role flags",
    "keywords": [
      "leave configuration",
      "global leave policy",
      "leave policies",
      "holiday calendar",
      "legal calendars",
      "working days",
      "working-day rules",
      "employee leave config",
      "accrual",
      "jurisdiction",
      "publish",
      "leaveAdditional",
      "Sun-Thu",
      "Mon-Sat"
    ]
  },
  {
    "title": "Leave Policies User Guide",
    "url": "hrms/leave-policies-guide.html",
    "description": "Tabbed guide: supported leave types, CFA India packs, how to configure Global Policy Center, scenarios, new vs existing requirements",
    "keywords": [
      "leave policies guide",
      "supported policies",
      "privilege leave",
      "casual leave",
      "sick leave",
      "maternity",
      "paternity",
      "comp-off",
      "floating holiday",
      "wellness leave",
      "milestone leave",
      "CFA-IN-KA",
      "configure leave policy",
      "global policy center",
      "opening balance"
    ]
  },
  {
    "title": "Attendance",
    "url": "hrms/attendance.html",
    "description": "Attendance matrix, mark, regularization, approvals, leave sync, payroll lock — with Mermaid flowcharts",
    "keywords": [
      "hrms",
      "attendance",
      "matrix",
      "regularization",
      "mark attendance",
      "payroll lock",
      "leave sync",
      "flowchart"
    ]
  },
  {
    "title": "Unified Audit Trail",
    "url": "hrms/audit-trail.html",
    "description": "Unified audit timeline across HRMS and project screens — actor and entity history",
    "keywords": [
      "audit",
      "history",
      "timeline",
      "activity",
      "approval",
      "hrms",
      "project"
    ]
  },
  {
    "title": "Persona Navigation",
    "url": "hrms/persona-navigation.html",
    "description": "Turn off personas, modules, or pages org-wide, or customize which personas can open each page",
    "keywords": [
      "persona",
      "persona navigation",
      "pagePersonaMap",
      "disabledPersonas",
      "disabledPaths",
      "access",
      "admin",
      "kill switch",
      "org access"
    ]
  },
  {
    "title": "User Flows",
    "url": "user-flows/index.html",
    "description": "User flow hub linking scenario walkthroughs, screen guides, and the use case catalog",
    "keywords": [
      "user flows",
      "workflows",
      "scenarios",
      "use cases",
      "persona navigation",
      "timesheet",
      "leave",
      "attendance"
    ]
  },
  {
    "title": "Invoices",
    "url": "hrms/invoices.html",
    "description": "Invoices documentation page",
    "keywords": [
      "hrms",
      "invoices"
    ]
  },
  {
    "title": "Invoice Details",
    "url": "hrms/invoice-details.html",
    "description": "Invoice Details documentation page",
    "keywords": [
      "hrms",
      "invoice details"
    ]
  },
  {
    "title": "Employee Profile",
    "url": "hrms/profile.html",
    "description": "Employee Profile documentation page",
    "keywords": [
      "hrms",
      "employee profile"
    ]
  },
  {
    "title": "Settings",
    "url": "hrms/settings.html",
    "description": "Settings documentation page",
    "keywords": [
      "hrms",
      "settings"
    ]
  },
  {
    "title": "Application Configuration",
    "url": "hrms/application-config.html",
    "description": "org.json application configuration, role.json access control, personaNavigationAdditional, personaModules, FAQ and common mistakes",
    "keywords": [
      "appconfig",
      "application configuration",
      "access control",
      "org.json",
      "role.json",
      "permissions",
      "persona",
      "personaNavigationAdditional",
      "pagePersonaMap",
      "personaModules",
      "persona navigation",
      "hrms",
      "admin",
      "service line",
      "categoryMap",
      "timesheet",
      "modules",
      "faq",
      "common mistakes",
      "inherit",
      "override",
      "lock"
    ]
  },
  {
    "title": "Sales Overview",
    "url": "sales/index.html",
    "description": "Sales Overview documentation page",
    "keywords": [
      "sales",
      "sales overview"
    ]
  },
  {
    "title": "Bid Requests",
    "url": "sales/bid-requests.html",
    "description": "Bid Requests documentation page",
    "keywords": [
      "sales",
      "bid requests"
    ]
  },
  {
    "title": "Bid Details",
    "url": "sales/bid-details.html",
    "description": "Bid Details documentation page",
    "keywords": [
      "sales",
      "bid details"
    ]
  },
  {
    "title": "Purchase Orders",
    "url": "sales/purchase-orders.html",
    "description": "Purchase Orders documentation page",
    "keywords": [
      "sales",
      "purchase orders"
    ]
  },
  {
    "title": "PO Details",
    "url": "sales/purchase-order-details.html",
    "description": "PO Details documentation page",
    "keywords": [
      "sales",
      "po details"
    ]
  },
  {
    "title": "Project Overview",
    "url": "project/index.html",
    "description": "Project Overview documentation page",
    "keywords": [
      "project",
      "project overview"
    ]
  },
  {
    "title": "Project Dashboard",
    "url": "project/dashboard.html",
    "description": "Project Dashboard documentation page",
    "keywords": [
      "project",
      "project dashboard"
    ]
  },
  {
    "title": "Project List",
    "url": "project/project-list.html",
    "description": "Project List documentation page",
    "keywords": [
      "project",
      "project list"
    ]
  },
  {
    "title": "Project Details",
    "url": "project/project-details.html",
    "description": "Project Details documentation page",
    "keywords": [
      "project",
      "project details"
    ]
  },
  {
    "title": "Deliverables",
    "url": "project/deliverables.html",
    "description": "Deliverables documentation page",
    "keywords": [
      "project",
      "deliverables"
    ]
  },
  {
    "title": "Deliverable Details",
    "url": "project/deliverable-details.html",
    "description": "Deliverable Details documentation page",
    "keywords": [
      "project",
      "deliverable details"
    ]
  },
  {
    "title": "Work Items",
    "url": "project/work-items.html",
    "description": "Work Items documentation page",
    "keywords": [
      "project",
      "work items"
    ]
  },
  {
    "title": "Accounts",
    "url": "project/accounts.html",
    "description": "Accounts documentation page",
    "keywords": [
      "project",
      "accounts"
    ]
  },
  {
    "title": "Task Board",
    "url": "project/taskboard.html",
    "description": "Task Board documentation page",
    "keywords": [
      "project",
      "task board"
    ]
  },
  {
    "title": "Task Activity",
    "url": "project/task-activity.html",
    "description": "Task Activity documentation page",
    "keywords": [
      "project",
      "task activity"
    ]
  },
  {
    "title": "Team Capacity",
    "url": "project/team-capacity.html",
    "description": "Team Capacity documentation page",
    "keywords": [
      "project",
      "team capacity"
    ]
  },
  {
    "title": "Reports",
    "url": "project/reports.html",
    "description": "Reports documentation page",
    "keywords": [
      "project",
      "reports"
    ]
  },
  {
    "title": "Feedback",
    "url": "project/feedback.html",
    "description": "Feedback documentation page",
    "keywords": [
      "project",
      "feedback"
    ]
  },
  {
    "title": "Notes",
    "url": "project/notes.html",
    "description": "Notes documentation page",
    "keywords": [
      "project",
      "notes"
    ]
  },
  {
    "title": "Calendar",
    "url": "project/calendar.html",
    "description": "Calendar documentation page",
    "keywords": [
      "project",
      "calendar"
    ]
  },
  {
    "title": "File Manager",
    "url": "project/file-manager.html",
    "description": "File Manager documentation page",
    "keywords": [
      "project",
      "file manager"
    ]
  },
  {
    "title": "Chat",
    "url": "project/chat.html",
    "description": "Chat documentation page",
    "keywords": [
      "project",
      "chat"
    ]
  },
  {
    "title": "Global Search",
    "url": "project/search.html",
    "description": "Global Search documentation page",
    "keywords": [
      "project",
      "global search"
    ]
  },
  {
    "title": "Mobile Overview",
    "url": "mobile/index.html",
    "description": "Mobile Overview documentation page",
    "keywords": [
      "mobile",
      "mobile overview"
    ]
  },
  {
    "title": "Login & Registration",
    "url": "mobile/login.html",
    "description": "Login & Registration documentation page",
    "keywords": [
      "mobile",
      "login & registration"
    ]
  },
  {
    "title": "Tasks Hub",
    "url": "mobile/tasks.html",
    "description": "Tasks Hub documentation page",
    "keywords": [
      "mobile",
      "tasks hub"
    ]
  },
  {
    "title": "Insights Dashboard",
    "url": "mobile/insights.html",
    "description": "Insights Dashboard documentation page",
    "keywords": [
      "mobile",
      "insights dashboard"
    ]
  },
  {
    "title": "Projects Hub",
    "url": "mobile/projects.html",
    "description": "Projects Hub documentation page",
    "keywords": [
      "mobile",
      "projects hub"
    ]
  },
  {
    "title": "Timesheet & Record",
    "url": "mobile/timesheet.html",
    "description": "Timesheet & Record documentation page",
    "keywords": [
      "mobile",
      "timesheet & record"
    ]
  },
  {
    "title": "How do I sign in to Tracopus?",
    "url": "faq/index.html#faq-q-faq-login-0",
    "description": "Open your organization URL, enter username and password on the Luxury login screen, then click Sign In. SSO users click Sign in with Microsoft instead.",
    "keywords": [
      "how",
      "sign",
      "tracopus",
      "login & account access"
    ]
  },
  {
    "title": "What is Microsoft SSO?",
    "url": "faq/index.html#faq-q-faq-login-1",
    "description": "Single Sign-On redirects you to Microsoft Entra ID (Azure AD). After corporate authentication you return to Tracopus already logged in \u2014 no separate password required.",
    "keywords": [
      "what",
      "microsoft",
      "sso",
      "login & account access"
    ]
  },
  {
    "title": "I forgot my password \u2014 what should I do?",
    "url": "faq/index.html#faq-q-faq-login-2",
    "description": "Click Forgot Password on the login page, submit your username or email, and follow the reset link. Contact your admin if mail does not arrive within 15 minutes.",
    "keywords": [
      "forgot",
      "password",
      "what",
      "should",
      "login & account access"
    ]
  },
  {
    "title": "Why am I stuck on the login page after SSO?",
    "url": "faq/index.html#faq-q-faq-login-3",
    "description": "Your account may be inactive, not provisioned, or missing a default team. Ask your workspace administrator to verify employee status and role assignment.",
    "keywords": [
      "why",
      "stuck",
      "the",
      "login",
      "page",
      "after",
      "sso",
      "login & account access"
    ]
  },
  {
    "title": "How do I activate a new employee account?",
    "url": "faq/index.html#faq-q-faq-login-4",
    "description": "Open the activation link from your welcome email (/user/activateaccount/\u2026), set a password, then sign in. Links expire \u2014 request a new invite from HR if needed.",
    "keywords": [
      "how",
      "activate",
      "new",
      "employee",
      "account",
      "login & account access"
    ]
  },
  {
    "title": "Can I stay signed in on my laptop?",
    "url": "faq/index.html#faq-q-faq-login-5",
    "description": "Yes \u2014 sessions persist in the browser. Always sign out on shared machines via the header account menu.",
    "keywords": [
      "can",
      "stay",
      "signed",
      "laptop",
      "login & account access"
    ]
  },
  {
    "title": "Why does my session expire?",
    "url": "faq/index.html#faq-q-faq-login-6",
    "description": "Security policy may enforce idle timeout or daily re-auth. SSO tenants often require re-login after token expiry \u2014 sign in again normally.",
    "keywords": [
      "why",
      "does",
      "session",
      "expire",
      "login & account access"
    ]
  },
  {
    "title": "What landing page do I see after login?",
    "url": "faq/index.html#faq-q-faq-login-7",
    "description": "Your default module dashboard (Project, HRMS, or Sales) depends on role permissions configured by your administrator.",
    "keywords": [
      "what",
      "landing",
      "page",
      "see",
      "after",
      "login",
      "login & account access"
    ]
  },
  {
    "title": "How do I change my password?",
    "url": "faq/index.html#faq-q-faq-login-8",
    "description": "Account menu \u2192 Profile \u2192 Security, or use the forced change link at /user/changepassword/\u2026 when prompted.",
    "keywords": [
      "how",
      "change",
      "password",
      "login & account access"
    ]
  },
  {
    "title": "SSO user \u2014 why is password change hidden?",
    "url": "faq/index.html#faq-q-faq-login-9",
    "description": "Credentials are managed by your identity provider. Use Microsoft account settings or IT helpdesk for password resets.",
    "keywords": [
      "sso",
      "user",
      "why",
      "password",
      "change",
      "hidden",
      "login & account access"
    ]
  },
  {
    "title": "Where is the main module menu?",
    "url": "faq/index.html#faq-q-faq-navigation-0",
    "description": "The left sidebar lists HRMS, Sales, and Project modules. Expand each to see permitted screens for your role.",
    "keywords": [
      "where",
      "the",
      "main",
      "module",
      "menu",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "What is the icon rail?",
    "url": "faq/index.html#faq-q-faq-navigation-1",
    "description": "The narrow vertical rail on the left edge provides quick links: Search, Taskboard, Calendar, Notes, Chat, Files, theme palette, and settings.",
    "keywords": [
      "what",
      "the",
      "icon",
      "rail",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "How do I change the color theme?",
    "url": "faq/index.html#faq-q-faq-navigation-2",
    "description": "Click the palette droplet on the icon rail and pick a Luxury palette (Emerald, Indigo, Sapphire, etc.). Choice syncs to mobile after login.",
    "keywords": [
      "how",
      "change",
      "the",
      "color",
      "theme",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "What does SHOW / SORT / Filter mean?",
    "url": "faq/index.html#faq-q-faq-navigation-3",
    "description": "Standard list header controls: SHOW = status presets, SORT = column order, Filter = text search on the register below.",
    "keywords": [
      "what",
      "does",
      "show",
      "sort",
      "filter",
      "mean",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "What is the summary strip?",
    "url": "faq/index.html#faq-q-faq-navigation-4",
    "description": "Collapsible KPI and chart row at the top of many list screens. Expand for analytics; collapse for a wider data table.",
    "keywords": [
      "what",
      "the",
      "summary",
      "strip",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "How does global search work?",
    "url": "faq/index.html#faq-q-faq-navigation-5",
    "description": "Header search (or icon rail Search) finds projects, tasks, employees, and more. Results respect your team scope and permissions.",
    "keywords": [
      "how",
      "does",
      "global",
      "search",
      "work",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "Why is a sidebar item missing?",
    "url": "faq/index.html#faq-q-faq-navigation-6",
    "description": "Your role lacks module or page permission. Administrators enable routes in Application Configuration and role templates.",
    "keywords": [
      "why",
      "sidebar",
      "item",
      "missing",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "Can I bookmark a screen?",
    "url": "faq/index.html#faq-q-faq-navigation-7",
    "description": "Yes \u2014 copy the browser URL. Module routes like /hrms/timesheet open directly when you have access.",
    "keywords": [
      "can",
      "bookmark",
      "screen",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "What is the breadcrumb trail?",
    "url": "faq/index.html#faq-q-faq-navigation-8",
    "description": "The path under the header (e.g. Home \u2192 HRMS \u2192 Invoices) shows where you are in the documentation or app hierarchy.",
    "keywords": [
      "what",
      "the",
      "breadcrumb",
      "trail",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "How do I collapse the summary charts?",
    "url": "faq/index.html#faq-q-faq-navigation-9",
    "description": "Click the summary strip toggle/chevron on list screens \u2014 state may persist in browser storage for your session.",
    "keywords": [
      "how",
      "collapse",
      "the",
      "summary",
      "charts",
      "navigation & luxury ui"
    ]
  },
  {
    "title": "Where is my personal dashboard?",
    "url": "faq/index.html#faq-q-faq-hrms-0",
    "description": "HRMS \u2192 Dashboard shows attendance strip, utilization donut, task queue mix, and quick links for the current week.",
    "keywords": [
      "where",
      "personal",
      "dashboard",
      "hrms & employee records"
    ]
  },
  {
    "title": "How do I view another employee's profile?",
    "url": "faq/index.html#faq-q-faq-hrms-1",
    "description": "HRMS \u2192 Employees \u2192 click a row. Managers see direct reports; HR admins see the full roster.",
    "keywords": [
      "how",
      "view",
      "another",
      "employee",
      "profile",
      "hrms & employee records"
    ]
  },
  {
    "title": "What is on the employee profile?",
    "url": "faq/index.html#faq-q-faq-hrms-2",
    "description": "Tabs for personal info, skills, security, notifications, and activity. Self-service users edit contact details; HR edits org fields.",
    "keywords": [
      "what",
      "the",
      "employee",
      "profile",
      "hrms & employee records"
    ]
  },
  {
    "title": "How are departments and bands assigned?",
    "url": "faq/index.html#faq-q-faq-hrms-3",
    "description": "Values come from Application Configuration org data (department, band, grade) on the employee wizard and profile.",
    "keywords": [
      "how",
      "are",
      "departments",
      "and",
      "bands",
      "assigned",
      "hrms & employee records"
    ]
  },
  {
    "title": "What is utilization on the HRMS dashboard?",
    "url": "faq/index.html#faq-q-faq-hrms-4",
    "description": "Billable hours vs capacity for the selected period \u2014 read the donut and KPI tiles in the summary strip for trends.",
    "keywords": [
      "what",
      "utilization",
      "the",
      "hrms",
      "dashboard",
      "hrms & employee records"
    ]
  },
  {
    "title": "Can I export the employee list?",
    "url": "faq/index.html#faq-q-faq-hrms-5",
    "description": "Use list export controls if your role includes export permission \u2014 typically HR and admin roles.",
    "keywords": [
      "can",
      "export",
      "the",
      "employee",
      "list",
      "hrms & employee records"
    ]
  },
  {
    "title": "What is attendance vs timesheet?",
    "url": "faq/index.html#faq-q-faq-hrms-6",
    "description": "Attendance tracks check-in/out and device events. Timesheet tracks billable/non-billable hours against projects.",
    "keywords": [
      "what",
      "attendance",
      "timesheet",
      "hrms & employee records"
    ]
  },
  {
    "title": "How do I enable MFA?",
    "url": "faq/index.html#faq-q-faq-hrms-7",
    "description": "Profile \u2192 Security \u2014 follow prompts to register an authenticator if your org requires multi-factor authentication.",
    "keywords": [
      "how",
      "enable",
      "mfa",
      "hrms & employee records"
    ]
  },
  {
    "title": "Who updates my skills list?",
    "url": "faq/index.html#faq-q-faq-hrms-8",
    "description": "You or your manager on the profile Skills section. Options are defined in App Config skills key.",
    "keywords": [
      "who",
      "updates",
      "skills",
      "list",
      "hrms & employee records"
    ]
  },
  {
    "title": "Why can't I see HRMS at all?",
    "url": "faq/index.html#faq-q-faq-hrms-9",
    "description": "Your role lacks hrmsModules visibility flags. Request HRMS access from your workspace administrator.",
    "keywords": [
      "why",
      "can",
      "see",
      "hrms",
      "all",
      "hrms & employee records"
    ]
  },
  {
    "title": "What is the employee create wizard?",
    "url": "faq/index.html#faq-q-faq-hrms-10",
    "description": "Multi-step flow: personal details, org assignment, skills, and security \u2014 used by HR when onboarding new staff.",
    "keywords": [
      "what",
      "the",
      "employee",
      "create",
      "wizard",
      "hrms & employee records"
    ]
  },
  {
    "title": "How do team filters work on HRMS lists?",
    "url": "faq/index.html#faq-q-faq-hrms-11",
    "description": "Header team scope limits rows to your org unit or selected team \u2014 managers often default to their delivery team.",
    "keywords": [
      "how",
      "team",
      "filters",
      "work",
      "hrms",
      "lists",
      "hrms & employee records"
    ]
  },
  {
    "title": "Where do I log hours?",
    "url": "faq/index.html#faq-q-faq-timesheet-0",
    "description": "HRMS \u2192 Time Sheet \u2014 weekly grid with billable project rows, non-project categories, and leave types.",
    "keywords": [
      "where",
      "log",
      "hours",
      "timesheet & time entry"
    ]
  },
  {
    "title": "How do I pick the correct week?",
    "url": "faq/index.html#faq-q-faq-timesheet-1",
    "description": "Use the week selector in the header. Past weeks may be read-only depending on role policy (enablePastTimeSheetView).",
    "keywords": [
      "how",
      "pick",
      "the",
      "correct",
      "week",
      "timesheet & time entry"
    ]
  },
  {
    "title": "What is a work item on the timesheet?",
    "url": "faq/index.html#faq-q-faq-timesheet-2",
    "description": "A granular activity under a deliverable/project. You log hours against work items when billable project time is required.",
    "keywords": [
      "what",
      "work",
      "item",
      "the",
      "timesheet",
      "timesheet & time entry"
    ]
  },
  {
    "title": "Can I copy last week's rows?",
    "url": "faq/index.html#faq-q-faq-timesheet-3",
    "description": "Use copy/pre-fill actions if enabled on your timesheet \u2014 saves re-selecting the same projects each week.",
    "keywords": [
      "can",
      "copy",
      "last",
      "week",
      "rows",
      "timesheet & time entry"
    ]
  },
  {
    "title": "Why is last week locked?",
    "url": "faq/index.html#faq-q-faq-timesheet-4",
    "description": "Role policy may set disableLastMonthAfterXDays \u2014 after day X of the month, prior month becomes read-only for payroll.",
    "keywords": [
      "why",
      "last",
      "week",
      "locked",
      "timesheet & time entry"
    ]
  },
  {
    "title": "What are non-project hours?",
    "url": "faq/index.html#faq-q-faq-timesheet-5",
    "description": "Internal categories (training, admin, PTO) configured in App Config \u2014 separate from client billable project rows.",
    "keywords": [
      "what",
      "are",
      "non",
      "project",
      "hours",
      "timesheet & time entry"
    ]
  },
  {
    "title": "How do managers approve timesheets?",
    "url": "faq/index.html#faq-q-faq-timesheet-6",
    "description": "Approval workflows depend on org setup \u2014 check HRMS settings and your role's approve flags; some orgs use export-only review.",
    "keywords": [
      "how",
      "managers",
      "approve",
      "timesheets",
      "timesheet & time entry"
    ]
  },
  {
    "title": "Why can't I add a project row?",
    "url": "faq/index.html#faq-q-faq-timesheet-7",
    "description": "Project may be closed, you may not be a member, or enableTimeSheetEdit is false for your role.",
    "keywords": [
      "why",
      "can",
      "add",
      "project",
      "row",
      "timesheet & time entry"
    ]
  },
  {
    "title": "What is max hours validation?",
    "url": "faq/index.html#faq-q-faq-timesheet-8",
    "description": "Daily caps from role config (maxHoursAllowedToEnter) prevent accidental over-entry \u2014 split across rows if needed.",
    "keywords": [
      "what",
      "max",
      "hours",
      "validation",
      "timesheet & time entry"
    ]
  },
  {
    "title": "Mobile timesheet \u2014 same rules?",
    "url": "faq/index.html#faq-q-faq-timesheet-9",
    "description": "Yes \u2014 mobile HRMS timesheet respects the same permissions and week locks as the web app.",
    "keywords": [
      "mobile",
      "timesheet",
      "same",
      "rules",
      "timesheet & time entry"
    ]
  },
  {
    "title": "How do billable hours reach an invoice?",
    "url": "faq/index.html#faq-q-faq-timesheet-10",
    "description": "Approved billable timesheet hours aggregate into the invoice pool for the billing period on HRMS \u2192 Invoice.",
    "keywords": [
      "how",
      "billable",
      "hours",
      "reach",
      "invoice",
      "timesheet & time entry"
    ]
  },
  {
    "title": "What happens if I forget to submit?",
    "url": "faq/index.html#faq-q-faq-timesheet-11",
    "description": "Hours may remain draft \u2014 managers and finance reports show gaps. Catch up before month lock date.",
    "keywords": [
      "what",
      "happens",
      "forget",
      "submit",
      "timesheet & time entry"
    ]
  },
  {
    "title": "How do I create a project?",
    "url": "faq/index.html#faq-q-faq-project-0",
    "description": "Project \u2192 Project List \u2192 Create (if permitted). Link account, team, dates, and optional purchase order.",
    "keywords": [
      "how",
      "create",
      "project",
      "projects & delivery"
    ]
  },
  {
    "title": "What is a deliverable?",
    "url": "faq/index.html#faq-q-faq-project-1",
    "description": "A planned outcome or task within a project \u2014 has status, estimates, assignees, and child work items.",
    "keywords": [
      "what",
      "deliverable",
      "projects & delivery"
    ]
  },
  {
    "title": "What is a work item?",
    "url": "faq/index.html#faq-q-faq-project-2",
    "description": "Granular unit of work under a deliverable where time is logged and progress tracked.",
    "keywords": [
      "what",
      "work",
      "item",
      "projects & delivery"
    ]
  },
  {
    "title": "How do I open the taskboard?",
    "url": "faq/index.html#faq-q-faq-project-3",
    "description": "Project \u2192 Task Board or icon rail shortcut \u2014 Kanban columns: Planned, To do, In progress, Done.",
    "keywords": [
      "how",
      "open",
      "the",
      "taskboard",
      "projects & delivery"
    ]
  },
  {
    "title": "What is team capacity?",
    "url": "faq/index.html#faq-q-faq-project-4",
    "description": "Project \u2192 Team Capacity shows allocation and availability charts for staffing decisions.",
    "keywords": [
      "what",
      "team",
      "capacity",
      "projects & delivery"
    ]
  },
  {
    "title": "How do project members get access?",
    "url": "faq/index.html#faq-q-faq-project-5",
    "description": "Project Details \u2192 Members tab \u2014 add employees with appropriate project role. They then see the project in lists and timesheet.",
    "keywords": [
      "how",
      "project",
      "members",
      "get",
      "access",
      "projects & delivery"
    ]
  },
  {
    "title": "What is a project account?",
    "url": "faq/index.html#faq-q-faq-project-6",
    "description": "The client or org node from Accounts \u2014 ties billing, invoices, and reporting to the customer record.",
    "keywords": [
      "what",
      "project",
      "account",
      "projects & delivery"
    ]
  },
  {
    "title": "Can a project link to a purchase order?",
    "url": "faq/index.html#faq-q-faq-project-7",
    "description": "Yes \u2014 when Sales PO exists, link on project create or details for AP alignment and revenue tracking.",
    "keywords": [
      "can",
      "project",
      "link",
      "purchase",
      "order",
      "projects & delivery"
    ]
  },
  {
    "title": "Where are project files?",
    "url": "faq/index.html#faq-q-faq-project-8",
    "description": "Project \u2192 File Manager or project details Files panel \u2014 folder tree with upload/download per permissions.",
    "keywords": [
      "where",
      "are",
      "project",
      "files",
      "projects & delivery"
    ]
  },
  {
    "title": "What is project feedback?",
    "url": "faq/index.html#faq-q-faq-project-9",
    "description": "Project \u2192 Feedback captures client or internal feedback records linked to delivery milestones.",
    "keywords": [
      "what",
      "project",
      "feedback",
      "projects & delivery"
    ]
  },
  {
    "title": "How do I run project reports?",
    "url": "faq/index.html#faq-q-faq-project-10",
    "description": "Project \u2192 Reports \u2014 catalog of utilization, status, and financial reports filtered by team and date.",
    "keywords": [
      "how",
      "run",
      "project",
      "reports",
      "projects & delivery"
    ]
  },
  {
    "title": "What closes a project?",
    "url": "faq/index.html#faq-q-faq-project-11",
    "description": "Status transition to Complete/Closed on project details \u2014 may lock new timesheet rows depending on policy.",
    "keywords": [
      "what",
      "closes",
      "project",
      "projects & delivery"
    ]
  },
  {
    "title": "What is the project dashboard?",
    "url": "faq/index.html#faq-q-faq-project-12",
    "description": "Summary KPIs, health charts, and active deliverables for projects you manage or belong to.",
    "keywords": [
      "what",
      "the",
      "project",
      "dashboard",
      "projects & delivery"
    ]
  },
  {
    "title": "How does global project search work?",
    "url": "faq/index.html#faq-q-faq-project-13",
    "description": "Project \u2192 Search or header search \u2014 finds projects, deliverables, and tasks by keyword within scope.",
    "keywords": [
      "how",
      "does",
      "global",
      "project",
      "search",
      "work",
      "projects & delivery"
    ]
  },
  {
    "title": "Where are bid requests?",
    "url": "faq/index.html#faq-q-faq-sales-0",
    "description": "Sales \u2192 Bid Requests \u2014 pipeline list from intake through won/lost with status chips and filters.",
    "keywords": [
      "where",
      "are",
      "bid",
      "requests",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "How do I create a bid?",
    "url": "faq/index.html#faq-q-faq-sales-1",
    "description": "Click Create on Bid Requests \u2014 fill commercial details, account, and study type from configured dropdowns.",
    "keywords": [
      "how",
      "create",
      "bid",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "What happens when a bid is won?",
    "url": "faq/index.html#faq-q-faq-sales-2",
    "description": "Workflow may spawn a purchase order and optionally a project \u2014 follow your org's sales-to-delivery handoff.",
    "keywords": [
      "what",
      "happens",
      "when",
      "bid",
      "won",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "Where are purchase orders?",
    "url": "faq/index.html#faq-q-faq-sales-3",
    "description": "Sales \u2192 Purchase Orders \u2014 contract records linked to accounts and often to projects.",
    "keywords": [
      "where",
      "are",
      "purchase",
      "orders",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "Why do invoices need a PO number?",
    "url": "faq/index.html#faq-q-faq-sales-4",
    "description": "Client AP teams reject invoices without PO reference \u2014 copy PO from Sales when creating HRMS invoices.",
    "keywords": [
      "why",
      "invoices",
      "need",
      "number",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "Can I attach files to a bid?",
    "url": "faq/index.html#faq-q-faq-sales-5",
    "description": "Bid Details includes documents panel \u2014 upload RFP, proposals, and signed contracts per permissions.",
    "keywords": [
      "can",
      "attach",
      "files",
      "bid",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "What statuses does a bid pass through?",
    "url": "faq/index.html#faq-q-faq-sales-6",
    "description": "Typical flow: Draft \u2192 Submitted \u2192 Under review \u2192 Won / Lost \u2014 exact labels from App Config sales lists.",
    "keywords": [
      "what",
      "statuses",
      "does",
      "bid",
      "pass",
      "through",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "Who can see all bids?",
    "url": "faq/index.html#faq-q-faq-sales-7",
    "description": "Sales managers and admins with cross-team scope \u2014 ICs often see only assigned accounts.",
    "keywords": [
      "who",
      "can",
      "see",
      "all",
      "bids",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "How do bids link to projects?",
    "url": "faq/index.html#faq-q-faq-sales-8",
    "description": "On win, link PO and create project with bid reference \u2014 traceability from sales pipeline to delivery.",
    "keywords": [
      "how",
      "bids",
      "link",
      "projects",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "What is bid details vs list?",
    "url": "faq/index.html#faq-q-faq-sales-9",
    "description": "List is the register; Details is single-record view with tabs, timeline, files, and status actions.",
    "keywords": [
      "what",
      "bid",
      "details",
      "list",
      "sales, bids & purchase orders"
    ]
  },
  {
    "title": "Where is the invoice list?",
    "url": "faq/index.html#faq-q-faq-billing-0",
    "description": "HRMS \u2192 Invoice \u2014 billing register with status, amount, account, and fiscal year scope.",
    "keywords": [
      "where",
      "the",
      "invoice",
      "list",
      "invoices & billing"
    ]
  },
  {
    "title": "How are invoice amounts calculated?",
    "url": "faq/index.html#faq-q-faq-billing-1",
    "description": "Primarily from approved billable timesheet hours \u00d7 rates, plus manual adjustments on invoice details.",
    "keywords": [
      "how",
      "are",
      "invoice",
      "amounts",
      "calculated",
      "invoices & billing"
    ]
  },
  {
    "title": "What invoice statuses exist?",
    "url": "faq/index.html#faq-q-faq-billing-2",
    "description": "Draft \u2192 Pending \u2192 Approved \u2192 Paid \u2192 Closed (labels may vary by org configuration).",
    "keywords": [
      "what",
      "invoice",
      "statuses",
      "exist",
      "invoices & billing"
    ]
  },
  {
    "title": "How do I create an invoice?",
    "url": "faq/index.html#faq-q-faq-billing-3",
    "description": "Click Create on the invoice list \u2014 pick account, billing period, and billable pool (permission required).",
    "keywords": [
      "how",
      "create",
      "invoice",
      "invoices & billing"
    ]
  },
  {
    "title": "Where is the PDF?",
    "url": "faq/index.html#faq-q-faq-billing-4",
    "description": "Open invoice \u2192 Invoice Details \u2192 PDF preview or download after lines are finalized.",
    "keywords": [
      "where",
      "the",
      "pdf",
      "invoices & billing"
    ]
  },
  {
    "title": "What is the fiscal year selector?",
    "url": "faq/index.html#faq-q-faq-billing-5",
    "description": "Filters register and summary charts to the selected FY \u2014 important for monthly billing bar trends.",
    "keywords": [
      "what",
      "the",
      "fiscal",
      "year",
      "selector",
      "invoices & billing"
    ]
  },
  {
    "title": "Can I invoice without a project?",
    "url": "faq/index.html#faq-q-faq-billing-6",
    "description": "Some orgs allow manual line items \u2014 default is project-linked billable hours from timesheet.",
    "keywords": [
      "can",
      "invoice",
      "without",
      "project",
      "invoices & billing"
    ]
  },
  {
    "title": "Who marks an invoice paid?",
    "url": "faq/index.html#faq-q-faq-billing-7",
    "description": "Finance role typically \u2014 updates status and summary KPI tiles on the list.",
    "keywords": [
      "who",
      "marks",
      "invoice",
      "paid",
      "invoices & billing"
    ]
  },
  {
    "title": "Why is my draft missing hours?",
    "url": "faq/index.html#faq-q-faq-billing-8",
    "description": "Timesheets for the period may be unapproved or still open \u2014 lock and approve before billing.",
    "keywords": [
      "why",
      "draft",
      "missing",
      "hours",
      "invoices & billing"
    ]
  },
  {
    "title": "What is the outstanding panel?",
    "url": "faq/index.html#faq-q-faq-billing-9",
    "description": "Summary chart showing open amounts awaiting payment within the active FY filters.",
    "keywords": [
      "what",
      "the",
      "outstanding",
      "panel",
      "invoices & billing"
    ]
  },
  {
    "title": "How do I register my phone?",
    "url": "faq/index.html#faq-q-faq-mobile-0",
    "description": "After web login, open mobile User Login and scan the QR code from HRMS Settings \u2192 device registration.",
    "keywords": [
      "how",
      "register",
      "phone",
      "mobile app"
    ]
  },
  {
    "title": "Can I use PIN or biometric login?",
    "url": "faq/index.html#faq-q-faq-mobile-1",
    "description": "Yes \u2014 after QR registration, set PIN or enable Face ID / fingerprint on the mobile login screen.",
    "keywords": [
      "can",
      "use",
      "pin",
      "biometric",
      "login",
      "mobile app"
    ]
  },
  {
    "title": "Does mobile show the same projects?",
    "url": "faq/index.html#faq-q-faq-mobile-2",
    "description": "Mobile Projects lists assigned projects \u2014 tap for summary; deep links may open web for full details.",
    "keywords": [
      "does",
      "mobile",
      "show",
      "the",
      "same",
      "projects",
      "mobile app"
    ]
  },
  {
    "title": "Mobile timesheet vs web?",
    "url": "faq/index.html#faq-q-faq-mobile-3",
    "description": "Same data and permission rules \u2014 log hours on mobile when away from desk; week locks apply equally.",
    "keywords": [
      "mobile",
      "timesheet",
      "web",
      "mobile app"
    ]
  },
  {
    "title": "What are mobile insights?",
    "url": "faq/index.html#faq-q-faq-mobile-4",
    "description": "Personal analytics charts: utilization, status mix, and weekly trends \u2014 mirrors web HRMS dashboard concepts.",
    "keywords": [
      "what",
      "are",
      "mobile",
      "insights",
      "mobile app"
    ]
  },
  {
    "title": "Why did QR registration fail?",
    "url": "faq/index.html#faq-q-faq-mobile-5",
    "description": "Ensure web session is active, camera permission granted, and device registration enabled in org settings.",
    "keywords": [
      "why",
      "did",
      "registration",
      "fail",
      "mobile app"
    ]
  },
  {
    "title": "Can admins use App Config on mobile?",
    "url": "faq/index.html#faq-q-faq-mobile-6",
    "description": "No \u2014 Application Configuration is desktop admin only. Use a full browser session.",
    "keywords": [
      "can",
      "admins",
      "use",
      "app",
      "config",
      "mobile",
      "mobile app"
    ]
  },
  {
    "title": "Do theme palettes sync to mobile?",
    "url": "faq/index.html#faq-q-faq-mobile-7",
    "description": "Yes \u2014 palette choice on web syncs after mobile login refresh.",
    "keywords": [
      "theme",
      "palettes",
      "sync",
      "mobile",
      "mobile app"
    ]
  },
  {
    "title": "How do I log out of mobile?",
    "url": "faq/index.html#faq-q-faq-mobile-8",
    "description": "Use sign out on mobile profile/settings \u2014 also revoke device in HRMS Settings if phone is lost.",
    "keywords": [
      "how",
      "log",
      "out",
      "mobile",
      "mobile app"
    ]
  },
  {
    "title": "Are push notifications supported?",
    "url": "faq/index.html#faq-q-faq-mobile-9",
    "description": "Notification preferences are in employee profile \u2014 delivery depends on org mobile push configuration.",
    "keywords": [
      "are",
      "push",
      "notifications",
      "supported",
      "mobile app"
    ]
  },
  {
    "title": "Where is the chart type reference?",
    "url": "faq/index.html#faq-q-faq-charts-0",
    "description": "Documentation \u2192 Charts explains donut, bar, area, line, funnel, and treemap usage.",
    "keywords": [
      "where",
      "the",
      "chart",
      "type",
      "reference",
      "charts & analytics"
    ]
  },
  {
    "title": "Do charts respect filters?",
    "url": "faq/index.html#faq-q-faq-charts-1",
    "description": "Yes \u2014 summary strip charts on list screens recalculate when SHOW, team, date, or text filters change.",
    "keywords": [
      "charts",
      "respect",
      "filters",
      "charts & analytics"
    ]
  },
  {
    "title": "What is a utilization donut?",
    "url": "faq/index.html#faq-q-faq-charts-2",
    "description": "Billable vs available hours ratio for a person or team \u2014 common on HRMS dashboard and mobile insights.",
    "keywords": [
      "what",
      "utilization",
      "donut",
      "charts & analytics"
    ]
  },
  {
    "title": "What is a segment bar?",
    "url": "faq/index.html#faq-q-faq-charts-3",
    "description": "Horizontal stacked bar showing proportional mix (e.g. invoice status or task status) with color legend.",
    "keywords": [
      "what",
      "segment",
      "bar",
      "charts & analytics"
    ]
  },
  {
    "title": "Why is a chart empty?",
    "url": "faq/index.html#faq-q-faq-charts-4",
    "description": "No data in the active filter scope \u2014 widen date range, clear text filter, or check team selection.",
    "keywords": [
      "why",
      "chart",
      "empty",
      "charts & analytics"
    ]
  },
  {
    "title": "Can I export chart data?",
    "url": "faq/index.html#faq-q-faq-charts-5",
    "description": "Export list/register actions may include summary data \u2014 chart-specific export depends on screen implementation.",
    "keywords": [
      "can",
      "export",
      "chart",
      "data",
      "charts & analytics"
    ]
  },
  {
    "title": "What is team capacity chart?",
    "url": "faq/index.html#faq-q-faq-charts-6",
    "description": "Project \u2192 Team Capacity \u2014 shows allocation vs availability for staffing planning.",
    "keywords": [
      "what",
      "team",
      "capacity",
      "chart",
      "charts & analytics"
    ]
  },
  {
    "title": "How do I read the monthly billing bar?",
    "url": "faq/index.html#faq-q-faq-charts-7",
    "description": "HRMS Invoice summary \u2014 invoiced amount by month within selected fiscal year.",
    "keywords": [
      "how",
      "read",
      "the",
      "monthly",
      "billing",
      "bar",
      "charts & analytics"
    ]
  },
  {
    "title": "Who is a workspace administrator?",
    "url": "faq/index.html#faq-q-faq-admin-0",
    "description": "Users with App Config access, HRMS Settings, or elevated role templates \u2014 documented in Admin guide.",
    "keywords": [
      "who",
      "workspace",
      "administrator",
      "admin, roles & security"
    ]
  },
  {
    "title": "How are permissions assigned?",
    "url": "faq/index.html#faq-q-faq-admin-1",
    "description": "Role templates in Application Configuration attach to org units; users inherit via team membership.",
    "keywords": [
      "how",
      "are",
      "permissions",
      "assigned",
      "admin, roles & security"
    ]
  },
  {
    "title": "What is the difference between role and org config?",
    "url": "faq/index.html#faq-q-faq-admin-2",
    "description": "Org nodes hold dropdown data and lists; role nodes hold CRUD and module visibility flags.",
    "keywords": [
      "what",
      "the",
      "difference",
      "between",
      "role",
      "and",
      "org",
      "config",
      "admin, roles & security"
    ]
  },
  {
    "title": "Can I give someone read-only project access?",
    "url": "faq/index.html#faq-q-faq-admin-3",
    "description": "Clone a manager role, disable create/update/delete flags on project permission groups, assign to org unit.",
    "keywords": [
      "can",
      "give",
      "someone",
      "read",
      "only",
      "project",
      "access",
      "admin, roles & security"
    ]
  },
  {
    "title": "Where is Application Configuration?",
    "url": "faq/index.html#faq-q-faq-admin-4",
    "description": "HRMS \u2192 Application Configuration (/hrms/appconfig) \u2014 requires appconfigEnabled.",
    "keywords": [
      "where",
      "application",
      "configuration",
      "admin, roles & security"
    ]
  },
  {
    "title": "What is HRMS Settings vs App Config?",
    "url": "faq/index.html#faq-q-faq-admin-5",
    "description": "Settings = devices, schedulers, company info. App Config = org/role trees for lists and permissions.",
    "keywords": [
      "what",
      "hrms",
      "settings",
      "app",
      "config",
      "admin, roles & security"
    ]
  },
  {
    "title": "How do I audit permission changes?",
    "url": "faq/index.html#faq-q-faq-admin-6",
    "description": "Rely on server audit logs and change-management \u2014 test role changes on a child org unit before Root edits.",
    "keywords": [
      "how",
      "audit",
      "permission",
      "changes",
      "admin, roles & security"
    ]
  },
  {
    "title": "Why can a user see a button but get an error on click?",
    "url": "faq/index.html#faq-q-faq-admin-7",
    "description": "UI visibility flags may differ from API enforcement \u2014 verify both module and CRUD permission groups.",
    "keywords": [
      "why",
      "can",
      "user",
      "see",
      "button",
      "but",
      "get",
      "error",
      "click",
      "admin, roles & security"
    ]
  },
  {
    "title": "What is team scope?",
    "url": "faq/index.html#faq-q-faq-admin-8",
    "description": "Filters data to the user's org unit/team \u2014 managers see their tree unless given broader scope.",
    "keywords": [
      "what",
      "team",
      "scope",
      "admin, roles & security"
    ]
  },
  {
    "title": "How do I request access for a new hire?",
    "url": "faq/index.html#faq-q-faq-admin-9",
    "description": "HR creates employee record, assigns team and role \u2014 user receives activation email.",
    "keywords": [
      "how",
      "request",
      "access",
      "for",
      "new",
      "hire",
      "admin, roles & security"
    ]
  },
  {
    "title": "Page loads but data is empty",
    "url": "faq/index.html#faq-q-faq-troubleshooting-0",
    "description": "Check team filter, SHOW preset, and date range. Confirm you have list permission for that module.",
    "keywords": [
      "page",
      "loads",
      "but",
      "data",
      "empty",
      "troubleshooting"
    ]
  },
  {
    "title": "Changes not saving",
    "url": "faq/index.html#faq-q-faq-troubleshooting-1",
    "description": "Look for validation errors, unsaved indicator, or network errors in browser dev tools. Confirm update permission on your role.",
    "keywords": [
      "changes",
      "not",
      "saving",
      "troubleshooting"
    ]
  },
  {
    "title": "Dropdown missing a new value",
    "url": "faq/index.html#faq-q-faq-troubleshooting-2",
    "description": "App Config change may be on wrong org node \u2014 verify user's team inheritance and refresh the form.",
    "keywords": [
      "dropdown",
      "missing",
      "new",
      "value",
      "troubleshooting"
    ]
  },
  {
    "title": "Timesheet row rejected",
    "url": "faq/index.html#faq-q-faq-troubleshooting-3",
    "description": "Check daily hour cap, closed project, week lock, or missing work item permission.",
    "keywords": [
      "timesheet",
      "row",
      "rejected",
      "troubleshooting"
    ]
  },
  {
    "title": "Invoice total looks wrong",
    "url": "faq/index.html#faq-q-faq-troubleshooting-4",
    "description": "Compare billable pool on details vs timesheet approvals for the billing period.",
    "keywords": [
      "invoice",
      "total",
      "looks",
      "wrong",
      "troubleshooting"
    ]
  },
  {
    "title": "SSO loop back to login",
    "url": "faq/index.html#faq-q-faq-troubleshooting-5",
    "description": "Clear cookies, try incognito, contact admin to verify IdP app registration and user provisioning.",
    "keywords": [
      "sso",
      "loop",
      "back",
      "login",
      "troubleshooting"
    ]
  },
  {
    "title": "Mobile QR won't scan",
    "url": "faq/index.html#faq-q-faq-troubleshooting-6",
    "description": "Renew web session, check camera permission, confirm device registration enabled in settings.",
    "keywords": [
      "mobile",
      "won",
      "scan",
      "troubleshooting"
    ]
  },
  {
    "title": "Search returns no results",
    "url": "faq/index.html#faq-q-faq-troubleshooting-7",
    "description": "Try shorter keywords, verify module access, and ensure spelling matches indexed fields.",
    "keywords": [
      "search",
      "returns",
      "results",
      "troubleshooting"
    ]
  },
  {
    "title": "Chart shows stale numbers",
    "url": "faq/index.html#faq-q-faq-troubleshooting-8",
    "description": "Hard refresh browser; charts refresh on filter change \u2014 cached session rarely stale.",
    "keywords": [
      "chart",
      "shows",
      "stale",
      "numbers",
      "troubleshooting"
    ]
  },
  {
    "title": "Still stuck \u2014 who do I contact?",
    "url": "faq/index.html#faq-q-faq-troubleshooting-9",
    "description": "Your Tracopus workspace administrator or internal IT support with screen URL, username, and timestamp.",
    "keywords": [
      "still",
      "stuck",
      "who",
      "contact",
      "troubleshooting"
    ]
  },
  {
    "title": "Who can open Application Configuration?",
    "url": "faq/index.html#faq-q-cfg-faq-access-0",
    "description": "Users whose role has hrmsModules.appconfigEnabled set to true (see Access control \u2192 HRMS Modules Access). Without this flag the /hrms/appconfig route is hidden from the sidebar.",
    "keywords": [
      "who",
      "can",
      "open",
      "application",
      "configuration",
      "app config \u00b7 access & getting started"
    ]
  },
  {
    "title": "What is the difference between Settings and App Config?",
    "url": "faq/index.html#faq-q-cfg-faq-access-1",
    "description": "Settings (/hrms/settings) covers operational cards: devices, schedulers, company info, locale. App Config is the hierarchical org/role tree that drives dropdown lists, feature togg",
    "keywords": [
      "what",
      "the",
      "difference",
      "between",
      "settings",
      "and",
      "app",
      "config",
      "app config \u00b7 access & getting started"
    ]
  },
  {
    "title": "Why do I see an empty screen or \u201cno config\u201d message?",
    "url": "faq/index.html#faq-q-cfg-faq-access-2",
    "description": "Ensure your user team has a valid org node selected. The page loads config via initializeConfig(currentUserTeamId) on mount. If the team is not mapped to an org unit, contact a sup",
    "keywords": [
      "why",
      "see",
      "empty",
      "screen",
      "config",
      "message",
      "app config \u00b7 access & getting started"
    ]
  },
  {
    "title": "Can I use App Config on mobile?",
    "url": "faq/index.html#faq-q-cfg-faq-access-3",
    "description": "No \u2014 Application Configuration is a desktop admin screen only. Use a full browser session; mobile HRMS apps do not expose this route.",
    "keywords": [
      "can",
      "use",
      "app",
      "config",
      "mobile",
      "app config \u00b7 access & getting started"
    ]
  },
  {
    "title": "How do I get Site Admin\u2013level access?",
    "url": "faq/index.html#faq-q-cfg-faq-access-4",
    "description": "An existing admin must enable appconfigEnabled on your role template, assign that role to your org unit via Role Bar, and ensure your user belongs to the correct team.",
    "keywords": [
      "how",
      "get",
      "site",
      "admin",
      "level",
      "access",
      "app config \u00b7 access & getting started"
    ]
  },
  {
    "title": "What is the difference between org nodes and role nodes?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-0",
    "description": "Org nodes (type=org) store application data: departments, categoryMap, notification emails. Role nodes (type=role) store permission templates: CRUD flags, timesheet windows, module",
    "keywords": [
      "what",
      "the",
      "difference",
      "between",
      "org",
      "nodes",
      "and",
      "role",
      "nodes",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "What does the chain icon do?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-1",
    "description": "Linked chain (fa-chain) = inherit parentValue from the parent org unit. Broken chain (fa-chain-broken, overridden=true) = this node stores its own value. Click the chain button on ",
    "keywords": [
      "what",
      "does",
      "the",
      "chain",
      "icon",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "What happens when I lock a setting?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-2",
    "description": "locked=true prevents child org units from overriding that key. Combined with hidden=true, non-admin users may not see the block at all. Use lock on Root for enterprise-wide standar",
    "keywords": [
      "what",
      "happens",
      "when",
      "lock",
      "setting",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "Should I edit Root or a child team?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-3",
    "description": "Edit Root for defaults that apply everywhere. Edit a child org unit only when that team needs a local override (regional departments, team-specific notification list). Always test ",
    "keywords": [
      "should",
      "edit",
      "root",
      "child",
      "team",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "How do I create a new org unit or team node?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-4",
    "description": "Organization tab \u2192 select parent \u2192 (+) add child. Set name, parent, and category in the hero bar \u2192 save identity fields. New nodes inherit all parent config until you break the cha",
    "keywords": [
      "how",
      "create",
      "new",
      "org",
      "unit",
      "team",
      "node",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "What does parentLocked mean?",
    "url": "faq/index.html#faq-q-cfg-faq-org-tree-5",
    "description": "When the parent node has locked a key, child nodes show parentLocked and cannot change inherit/lock/hide on that item \u2014 the chain and lock buttons are disabled.",
    "keywords": [
      "what",
      "does",
      "parentlocked",
      "mean",
      "app config \u00b7 organization tree & inheritance"
    ]
  },
  {
    "title": "When do I need to click Save?",
    "url": "faq/index.html#faq-q-cfg-faq-saving-0",
    "description": "Module-level Save persists value changes (updateConfig). Property-only edits (name, parent, category, overridden, locked, hidden) use updateConfigProperty and may save per-field. W",
    "keywords": [
      "when",
      "need",
      "click",
      "save",
      "app config \u00b7 saving & filters"
    ]
  },
  {
    "title": "What do the All / Overridden / Locked filters do?",
    "url": "faq/index.html#faq-q-cfg-faq-saving-1",
    "description": "All \u2014 every visible config on the selected node. Overridden \u2014 keys where this node broke inheritance. Locked \u2014 keys locked on this node (children cannot override). Use with the sea",
    "keywords": [
      "what",
      "the",
      "all",
      "overridden",
      "locked",
      "filters",
      "app config \u00b7 saving & filters"
    ]
  },
  {
    "title": "Do UI edits overwrite org.json on disk?",
    "url": "faq/index.html#faq-q-cfg-faq-saving-2",
    "description": "No. org.json and role.json seed deployment. Runtime edits persist to the database. Re-deploying from JSON without migration can overwrite DB changes \u2014 export or document before maj",
    "keywords": [
      "edits",
      "overwrite",
      "org",
      "json",
      "disk",
      "app config \u00b7 saving & filters"
    ]
  },
  {
    "title": "Can I undo a change?",
    "url": "faq/index.html#faq-q-cfg-faq-saving-3",
    "description": "There is no global undo. Re-link the chain to inherit parent again, or manually restore previous values. For roles, clone Site Admin to a backup role before large permission edits.",
    "keywords": [
      "can",
      "undo",
      "change",
      "app config \u00b7 saving & filters"
    ]
  },
  {
    "title": "Why is Save disabled or missing?",
    "url": "faq/index.html#faq-q-cfg-faq-saving-4",
    "description": "You may lack appconfigEnabled, the module may be disabled on this node, or the key may be parentLocked. Check role permissions and parent lock state.",
    "keywords": [
      "why",
      "save",
      "disabled",
      "missing",
      "app config \u00b7 saving & filters"
    ]
  },
  {
    "title": "Where do employee dropdown values come from?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-0",
    "description": "HRMS module keys: band, grade, department, designation, skills, etc. Changes appear on the employee create wizard and profile after users refresh or open a new form.",
    "keywords": [
      "where",
      "employee",
      "dropdown",
      "values",
      "come",
      "from",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "What is categoryMap used for?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-1",
    "description": "Three-level tree: Service Line \u2192 Delivery Category \u2192 Task Category. Drives billable categorization on timesheets, project/deliverable forms, and reporting. Large trees affect picke",
    "keywords": [
      "what",
      "categorymap",
      "used",
      "for",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "What is practiceMap?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-2",
    "description": "Two-level HR practice hierarchy (Primary \u2192 Secondary Practice) on employee profiles. Used for staffing filters and practice-based analytics, separate from project categoryMap.",
    "keywords": [
      "what",
      "practicemap",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "How do notification email lists work?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-3",
    "description": "Keys like defaultNotificationEmails, defaultPurchaseOrderNotificationEmails set default distribution when projects or POs trigger workflow emails. Finance-specific keys route to fi",
    "keywords": [
      "how",
      "notification",
      "email",
      "lists",
      "work",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "What are NONPROJECT categories?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-4",
    "description": "NONPROJECT module \u2192 taskActCategory lists non-billable timesheet types (meetings, training, leave). excludeAdditionalFieldsForCategory hides extra fields for quick entry on Leave/H",
    "keywords": [
      "what",
      "are",
      "nonproject",
      "categories",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "Can I enable multi service line estimates?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-5",
    "description": "PROJECT toggles: enableServiceLineEstimate, enableServiceLineSelection, enableCategorySelection. When enabled, projects and POs show estimate panels per service line \u2014 coordinate w",
    "keywords": [
      "can",
      "enable",
      "multi",
      "service",
      "line",
      "estimates",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "Can I delete a categoryMap leaf used in old timesheets?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-6",
    "description": "Avoid hard deletes. Historical rows reference leaf IDs/names. Prefer stopping new use (hide/lock at Root) while retaining legacy values for reports.",
    "keywords": [
      "can",
      "delete",
      "categorymap",
      "leaf",
      "used",
      "old",
      "timesheets",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "How do I bulk-add list values?",
    "url": "faq/index.html#faq-q-cfg-faq-app-data-7",
    "description": "In any list config block, use the multi-add textarea (toggle from single-line add) and paste one value per line from Excel, then save the module.",
    "keywords": [
      "how",
      "bulk",
      "add",
      "list",
      "values",
      "app config \u00b7 application config (org.json data)"
    ]
  },
  {
    "title": "How are roles assigned to users?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-0",
    "description": "Roles attach to org units via ApplicationConfigRoleBar on an org node \u2014 not directly on user records. Users inherit the role mapped to their team\u2019s org unit.",
    "keywords": [
      "how",
      "are",
      "roles",
      "assigned",
      "users",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "How do I create a custom Manager role?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-1",
    "description": "Roles tab \u2192 (+) new role \u2192 configure module visibility and permission groups \u2192 save. Start from Site Admin and disable delete/archive/appconfig flags. Assign via Role Bar on delive",
    "keywords": [
      "how",
      "create",
      "custom",
      "manager",
      "role",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "Why can a user see a menu item but not perform actions?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-2",
    "description": "Module visibility (*Enabled in hrmsModules/projectModules) is separate from CRUD groups (createEnabled, editEnabled). Enable both the module flag and the action flag in the correct",
    "keywords": [
      "why",
      "can",
      "user",
      "see",
      "menu",
      "item",
      "but",
      "not",
      "perform",
      "actions",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "What is defaultRedirectPage?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-3",
    "description": "Landing slug when the user opens a module (e.g. dashboard, activites, bidrequests). Set per role under HRMS/Project/Sales Modules Access.",
    "keywords": [
      "what",
      "defaultredirectpage",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "How do report permissions work?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-4",
    "description": "reporting group lists each report type as a boolean. Users only see reports they are allowed to run in the REPORT dropdown.",
    "keywords": [
      "how",
      "report",
      "permissions",
      "work",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "Can managers edit other employees\u2019 timesheets?",
    "url": "faq/index.html#faq-q-cfg-faq-roles-5",
    "description": "Controlled by timeSheet.switchEmployeesEnabled, enableTimeSheetEdit, and related work-item flags. Set on the manager\u2019s role template, not per user.",
    "keywords": [
      "can",
      "managers",
      "edit",
      "other",
      "employees",
      "timesheets",
      "app config \u00b7 roles & access control"
    ]
  },
  {
    "title": "Why can\u2019t a user log time for last week?",
    "url": "faq/index.html#faq-q-cfg-faq-timesheet-0",
    "description": "Check enableTimeSheetEdit, enablePastTimeSheetView, disableLastMonthAfterXDays, and work-item window flags (disableProjectWorkItemCreateBeforeXWorkingDays, etc.) on their role.",
    "keywords": [
      "why",
      "can",
      "user",
      "log",
      "time",
      "for",
      "last",
      "week",
      "app config \u00b7 timesheet & work item rules"
    ]
  },
  {
    "title": "What does disableLastMonthAfterXDays do?",
    "url": "faq/index.html#faq-q-cfg-faq-timesheet-1",
    "description": "Locks the previous month\u2019s timesheet after X days into the current month (e.g. 5 = after the 5th, prior month is read-only). Common payroll control.",
    "keywords": [
      "what",
      "does",
      "disablelastmonthafterxdays",
      "app config \u00b7 timesheet & work item rules"
    ]
  },
  {
    "title": "What is maxHoursAllowedToEnter?",
    "url": "faq/index.html#faq-q-cfg-faq-timesheet-2",
    "description": "Daily or per-entry hour cap validation on timesheet rows. Prevents accidental 24+ hour entries.",
    "keywords": [
      "what",
      "maxhoursallowedtoenter",
      "app config \u00b7 timesheet & work item rules"
    ]
  },
  {
    "title": "Why are non-project entries blocked?",
    "url": "faq/index.html#faq-q-cfg-faq-timesheet-3",
    "description": "Review disableNonProjectWorkItemCreateBeforeXWorkingDays / AfterXWorkingDays and NONPROJECT categories in org config. Value -1 often means rule disabled \u2014 check your deployment\u2019s c",
    "keywords": [
      "why",
      "are",
      "non",
      "project",
      "entries",
      "blocked",
      "app config \u00b7 timesheet & work item rules"
    ]
  },
  {
    "title": "Can users book leave for future dates?",
    "url": "faq/index.html#faq-q-cfg-faq-timesheet-4",
    "description": "allowLeaveAndHolidayForFuture and allowLeaveAndHolidayForPast on the role control leave booking direction on non-project categories.",
    "keywords": [
      "can",
      "users",
      "book",
      "leave",
      "for",
      "future",
      "dates",
      "app config \u00b7 timesheet & work item rules"
    ]
  },
  {
    "title": "Dropdown missing a value I added in App Config",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-0",
    "description": "Confirm you saved the module, selected the correct org node (user\u2019s team scope), and refreshed the target form. Child teams inherit Root unless overridden \u2014 add the value on the no",
    "keywords": [
      "dropdown",
      "missing",
      "value",
      "added",
      "app",
      "config",
      "app config \u00b7 troubleshooting"
    ]
  },
  {
    "title": "Permission change not taking effect",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-1",
    "description": "Ask the user to log out and back in. Clear browser cache if menu items persist. Verify Role Bar mapping on the user\u2019s org unit matches the role you edited.",
    "keywords": [
      "permission",
      "change",
      "not",
      "taking",
      "effect",
      "app config \u00b7 troubleshooting"
    ]
  },
  {
    "title": "User sees App Config but changes fail",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-2",
    "description": "UI may show read-only if parent locked keys or module is disabled. Check API errors in network tab \u2014 server enforces permissions independently.",
    "keywords": [
      "user",
      "sees",
      "app",
      "config",
      "but",
      "changes",
      "fail",
      "app config \u00b7 troubleshooting"
    ]
  },
  {
    "title": "categoryMap picker is slow",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-3",
    "description": "Tree too large or too many leaf nodes. Archive obsolete branches, use lock at Root to prevent duplicate local trees, and limit depth to three meaningful levels.",
    "keywords": [
      "categorymap",
      "picker",
      "slow",
      "app config \u00b7 troubleshooting"
    ]
  },
  {
    "title": "Two teams see different department lists",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-4",
    "description": "Expected if one team overrode HRMS \u2192 department on a child org node. Compare org nodes in App Config with Overridden filter.",
    "keywords": [
      "two",
      "teams",
      "see",
      "different",
      "department",
      "lists",
      "app config \u00b7 troubleshooting"
    ]
  },
  {
    "title": "When do users see config changes?",
    "url": "faq/index.html#faq-q-cfg-faq-troubleshooting-5",
    "description": "List values: usually next page load. Permissions: often next session. Some caches may delay up to a few minutes \u2014 document your org\u2019s refresh policy.",
    "keywords": [
      "when",
      "users",
      "see",
      "config",
      "changes",
      "app config \u00b7 troubleshooting"
    ]
  }
];
  documentationPages.forEach(function (p) {
    p.url = basePath + p.url;
  });

  function searchDocumentation(query) {
    if (!query || query.trim().length < 2) return [];
    var searchTerm = query.toLowerCase().trim();
    var results = [];

    documentationPages.forEach(function (page) {
      var score = 0;
      if (page.title.toLowerCase().indexOf(searchTerm) >= 0) score += 10;
      if (page.description.toLowerCase().indexOf(searchTerm) >= 0) score += 5;
      (page.keywords || []).forEach(function (kw) {
        if (String(kw).toLowerCase().indexOf(searchTerm) >= 0) score += 2;
      });
      if (score > 0) results.push(Object.assign({}, page, { score: score }));
    });

    document.querySelectorAll('.section[id], .section h2, .section h3').forEach(function (el) {
      var text = (el.textContent || '').toLowerCase();
      if (text.indexOf(searchTerm) >= 0) {
        var section = el.classList && el.classList.contains('section') ? el : el.closest('.section');
        var id = (section && section.id) || el.id || '';
        var title = el.tagName.match(/^H[234]$/) ? el.textContent.trim() : (section && section.querySelector('h2,h3')) ? section.querySelector('h2,h3').textContent.trim() : text.substring(0, 60);
        if (title && !results.some(function (r) { return r.url === '#' + id; })) {
          results.push({ title: title, url: id ? '#' + id : window.location.pathname.split('/').pop(), description: text.substring(0, 120) + '…', score: 3, matchType: 'content' });
        }
      }
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 10);
  }

  function highlightText(text, query) {
    if (!query) return text;
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function displaySearchResults(results, query) {
    var searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    if (!results.length) {
      searchResults.innerHTML = '<div class="no-results">No results found</div>';
      searchResults.classList.add('active');
      return;
    }
    searchResults.innerHTML = results.map(function (result, index) {
      var isAnchor = result.url.indexOf('#') === 0;
      var fullUrl;
      if (isAnchor) {
        fullUrl = (window.location.pathname.split('/').pop() || 'index.html') + result.url;
      } else if (result.url.indexOf('../') === 0 || result.url.indexOf('/') === 0) {
        fullUrl = result.url;
      } else {
        fullUrl = getBasePath() + result.url;
      }
      return '<div class="result-item ' + (index === 0 ? 'active' : '') + '">' +
        '<a href="' + fullUrl + '">' +
        '<div class="result-title">' + highlightText(result.title, query) + '</div>' +
        '<div class="result-description">' + highlightText(result.description, query) + '</div>' +
        (result.matchType ? '<div class="result-type">' + result.matchType + '</div>' : '') +
        '</a></div>';
    }).join('');
    searchResults.classList.add('active');
  }

  function createSearchUI() {
    var actions =
      document.querySelector('.docs-shell-actions') ||
      document.querySelector('header .header-content');
    if (!actions || document.getElementById('docSearchInput')) return;

    var searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML =
      '<div class="search-wrapper">' +
      '<input type="text" id="docSearchInput" class="search-input" placeholder="Search…" autocomplete="off" />' +
      '<kbd class="search-kbd" aria-hidden="true">⌘K</kbd>' +
      '<div id="searchResults" class="search-results"></div></div>';
    actions.appendChild(searchContainer);

    var searchInput = document.getElementById('docSearchInput');
    var searchResults = document.getElementById('searchResults');
    var searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      var query = this.value;
      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
      }
      searchTimeout = setTimeout(function () {
        displaySearchResults(searchDocumentation(query), query);
      }, 180);
    });

    searchInput.addEventListener('focus', function () {
      if (this.value.length >= 2) displaySearchResults(searchDocumentation(this.value), this.value);
    });

    document.addEventListener('click', function (e) {
      if (!searchContainer.contains(e.target)) searchResults.classList.remove('active');
    });
  }

  function bootSearch() {
    if (document.querySelector('.docs-shell-actions') || document.querySelector('header .header-content')) {
      createSearchUI();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSearch);
  } else {
    bootSearch();
  }
  document.addEventListener('docs-header-ready', bootSearch);
})();
