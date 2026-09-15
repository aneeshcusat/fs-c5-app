/** Central navigation tree — drives luxury header, mega-menus & sidebar */
(function (global) {
  'use strict';

  var shared = global.DOCS_UTILITY || {};

  function mergeHeader(overrides) {
    return Object.assign({}, shared, overrides);
  }

  var nav = {
    header: mergeHeader({
      eyebrow: 'Official Documentation',
      brandEmphasis: 'User Guide',
      subtitle: 'Enterprise Work Intelligence',
      homeHref: '__docs__/index.html'
    }),

    modules: {
      hrms: {
        label: 'HRMS',
        tagline: 'People, time & attendance',
        description: 'Manage employees, timesheets, attendance, invoices, and HR workspace configuration from one unified module.',
        icon: 'hrms',
        accent: '#10b981',
        index: 'hrms/index.html',
        featured: ['hrms/dashboard.html', 'hrms/leave-management-one-stop.html', 'hrms/leaves.html', 'hrms/leave-configuration.html', 'hrms/leave-policies-guide.html', 'hrms/timesheet-approval.html', 'hrms/work-time-governance.html'],
        pages: [
          { label: 'Overview', href: 'hrms/index.html', desc: 'Module introduction', icon: 'overview' },
          { label: 'Employee Dashboard', href: 'hrms/dashboard.html', desc: 'Personal HR analytics', icon: 'dashboard' },
          { label: 'Employees', href: 'hrms/employees.html', desc: 'Directory & profiles', icon: 'people' },
          { label: 'Timesheet', href: 'hrms/timesheet.html', desc: 'Weekly hour entry', icon: 'time' },
          { label: 'Timesheet Approval', href: 'hrms/timesheet-approval.html', desc: 'Submit, approve & lock', icon: 'time' },
          { label: 'Work-Time Governance', href: 'hrms/work-time-governance.html', desc: 'Catalog, validation, chain, import/export', icon: 'config' },
          { label: 'Leave Management', href: 'hrms/leaves.html', desc: 'Request & approve leave', icon: 'calendar' },
          { label: 'Leave One-Stop Guide', href: 'hrms/leave-management-one-stop.html', desc: 'Configure, dry-run, schedulers, approve + data-flow debug', icon: 'doc' },
          { label: 'Leave Configuration', href: 'hrms/leave-configuration.html', desc: 'Policies, holidays, balances, flags', icon: 'config' },
          { label: 'Leave Policies Guide', href: 'hrms/leave-policies-guide.html', desc: 'Supported policies, configure, scenarios (tabs)', icon: 'doc' },
          { label: 'Shift Policies', href: 'hrms/shift-policies.html', desc: 'Work-week calendars', icon: 'calendar' },
          { label: 'Persona Navigation', href: 'hrms/persona-navigation.html', desc: 'Org access kill switches & page personas', icon: 'people' },
          { label: 'Roles & permissions', href: 'hrms/roles-permissions.html', desc: 'personaModules, switcher, Advanced matrix', icon: 'admin' },
          { label: 'Attendance', href: 'hrms/attendance.html', desc: 'Presence tracking', icon: 'calendar' },
          { label: 'Audit Trail', href: 'hrms/audit-trail.html', desc: 'Unified activity history', icon: 'activity' },
          { label: 'Invoices', href: 'hrms/invoices.html', desc: 'Billing register', icon: 'invoice' },
          { label: 'Invoice Details', href: 'hrms/invoice-details.html', desc: 'Line-item view', icon: 'doc' },
          { label: 'Employee Profile', href: 'hrms/profile.html', desc: 'Personal record', icon: 'profile' },
          { label: 'Settings', href: 'hrms/settings.html', desc: 'HR preferences', icon: 'settings' },
          { label: 'Application Config', href: 'hrms/application-config.html', desc: 'org.json + role.json reference', icon: 'config' },
          { label: 'Admin Dashboard', href: 'admin/dashboard.html', desc: 'Audit, access & compliance ops', icon: 'dashboard' },
          { label: 'Admin consoles', href: 'admin/index.html', desc: 'How-to for every /admin screen', icon: 'admin' },
          { label: 'All screen how-tos', href: 'how-to-index.html', desc: 'Search & filter every Guide page', icon: 'doc' },
          { label: 'Feature Flags', href: 'admin/feature-flags.html', desc: 'Pilots, adoption, WTG catalog', icon: 'config' },
          { label: 'Notification Templates', href: 'admin/notification-templates.html', desc: 'Email & in-app templates', icon: 'doc' },
          { label: 'Approval Policies', href: 'admin/approval-policies.html', desc: 'Routing, SLA, simulation', icon: 'activity' },
          { label: 'Audit & compliance', href: 'admin/audit.html', desc: 'Org event register', icon: 'activity' },
          { label: 'System errors', href: 'admin/system-errors.html', desc: 'SF / ZingHR / health ops inbox', icon: 'activity' },
          { label: 'My Approvals', href: 'workspace/approvals.html', desc: 'Universal approval inbox', icon: 'activity' },
          { label: 'Admin & Access', href: 'admin.html', desc: 'RBAC, persona navigation, app config', icon: 'admin' },
          { label: 'User flows hub', href: 'user-flows/index.html', desc: 'Scenarios ↔ screen guides', icon: 'list' }
        ]
      },
      adminConsoles: {
        label: 'Admin consoles',
        tagline: 'Governance how-to guides',
        description: 'Screen guides for every Admin console. In-app Guide buttons open these pages.',
        icon: 'admin',
        accent: '#64748b',
        index: 'admin/index.html',
        featured: ['admin/index.html', 'admin/dashboard.html', 'admin/feature-flags.html', 'hrms/roles-permissions.html'],
        pages: [
          { label: 'Admin consoles', href: 'admin/index.html', desc: 'How-to index for /admin/*', icon: 'overview' },
          { label: 'Admin Dashboard', href: 'admin/dashboard.html', desc: 'Audit, access & compliance ops', icon: 'dashboard' },
          { label: 'Feature Flags', href: 'admin/feature-flags.html', desc: 'Pilots, adoption, WTG catalog', icon: 'config' },
          { label: 'Roles & permissions', href: 'hrms/roles-permissions.html', desc: 'Persona access and Advanced matrix', icon: 'admin' },
          { label: 'Persona navigation', href: 'hrms/persona-navigation.html', desc: 'Org kills and page maps', icon: 'people' },
          { label: 'Approval policies', href: 'admin/approval-policies.html', desc: 'Routing, SLA, simulation', icon: 'activity' },
          { label: 'Delegation', href: 'admin/delegation.html', desc: 'Acting managers', icon: 'people' },
          { label: 'Notification templates', href: 'admin/notification-templates.html', desc: 'Email & in-app templates', icon: 'doc' },
          { label: 'Audit & compliance', href: 'admin/audit.html', desc: 'Org event register', icon: 'activity' },
          { label: 'System errors', href: 'admin/system-errors.html', desc: 'SF / ZingHR / health ops inbox', icon: 'activity' },
          { label: 'Masking policy', href: 'admin/security.html', desc: 'Persona field grants', icon: 'admin' },
          { label: 'Application Config', href: 'hrms/application-config.html', desc: 'org.json + role.json', icon: 'config' },
          { label: 'Developer portal', href: 'admin/developer.html', desc: 'Apps, keys, webhooks', icon: 'config' },
          { label: 'Admin scenarios', href: 'user-guide/admin/index.html', desc: 'Step-by-step admin workflows', icon: 'list' }
        ]
      },
      userFlows: {
        label: 'User flows',
        tagline: 'Scenarios ↔ screen guides',
        description: 'Step-by-step user flows grouped separately from screen reference. Each flow links to the scenario walkthrough, the page guide, and the use case catalog.',
        icon: 'list',
        accent: '#6366f1',
        index: 'user-flows/index.html',
        featured: [
          'user-flows/index.html',
          'user-guide/admin/admin-persona-navigation.html',
          'user-guide/hrms/hrms-create-employee.html',
          'user-guide/hrms/hrms-log-timesheet.html'
        ],
        pages: [
          { label: 'User flows home', href: 'user-flows/index.html', desc: 'Bridge hub: flow + screen + catalog', icon: 'overview' },
          { label: 'All screen how-tos', href: 'how-to-index.html', desc: 'Search & filter Guide pages', icon: 'doc' },
          { label: 'All scenarios', href: 'user-guide/scenarios.html', desc: 'Flat A–Z scenario index', icon: 'list' },
          { label: 'Scenario Guide home', href: 'user-guide/index.html', desc: 'Module scenario indexes', icon: 'dashboard' },
          { label: 'Use Case Catalog', href: 'tracopus-use-case-catalog.html', desc: '718 business use cases', icon: 'doc' },
          { label: 'API Docs', href: 'api-docs.html', desc: 'Endpoints, sample curl, related APIs', icon: 'config' },
          { label: 'Integration API console', href: 'integration-api-console.html', desc: 'Token-driven interactive v2 explorer', icon: 'config' },
          { label: 'External project create', href: 'external-project-create.html', desc: 'Create projects with tk_* tokens', icon: 'doc' },
          { label: 'Persona navigation flow', href: 'user-guide/admin/admin-persona-navigation.html', desc: 'Scenario · Screen: Persona Navigation', icon: 'people' },
          { label: 'Create employee flow', href: 'user-guide/hrms/hrms-create-employee.html', desc: 'Scenario · Screen: Employees', icon: 'people' },
          { label: 'Timesheet flow', href: 'user-guide/hrms/hrms-log-timesheet.html', desc: 'Scenario · Screen: Timesheet', icon: 'time' },
          { label: 'Work-time governance flow', href: 'user-guide/admin/admin-work-time-governance.html', desc: 'Scenario · Screen: Work-Time Governance', icon: 'config' },
          { label: 'Leave flow', href: 'user-guide/hrms/hrms-apply-leave.html', desc: 'Scenario · Screen: Leave Management', icon: 'calendar' },
          { label: 'Attendance flow', href: 'user-guide/hrms/hrms-mark-attendance.html', desc: 'Scenario · Screen: Attendance', icon: 'calendar' },
          { label: 'Create project flow', href: 'user-guide/project/project-create-project.html', desc: 'Scenario · Screen: Project List', icon: 'project' },
          { label: 'Admin scenarios', href: 'user-guide/admin/index.html', desc: 'Roles, audit, flags, persona', icon: 'admin' },
          { label: 'HRMS scenarios', href: 'user-guide/hrms/index.html', desc: 'Employee, time, leave, attendance', icon: 'hrms' }
        ]
      },
      sales: {
        label: 'Sales',
        tagline: 'Bids, POs & pipeline',
        description: 'Track bid requests, evaluate opportunities, and manage purchase orders through the full sales lifecycle.',
        icon: 'sales',
        accent: '#34d399',
        index: 'sales/index.html',
        featured: ['sales/bid-requests.html', 'sales/purchase-orders.html'],
        pages: [
          { label: 'Overview', href: 'sales/index.html', desc: 'Pipeline introduction', icon: 'overview' },
          { label: 'Bid Requests', href: 'sales/bid-requests.html', desc: 'Intake & triage', icon: 'bid' },
          { label: 'Bid Details', href: 'sales/bid-details.html', desc: 'Single bid view', icon: 'doc' },
          { label: 'Purchase Orders', href: 'sales/purchase-orders.html', desc: 'Contract register', icon: 'order' },
          { label: 'PO Details', href: 'sales/purchase-order-details.html', desc: 'Order breakdown', icon: 'doc' }
        ]
      },
      project: {
        label: 'Project',
        tagline: 'Delivery & capacity',
        description: 'Plan deliverables, run task boards, manage team capacity, and collaborate across the full project portfolio.',
        icon: 'project',
        accent: '#6ee7b7',
        index: 'project/index.html',
        featured: ['project/dashboard.html', 'project/taskboard.html', 'project/team-capacity.html'],
        pages: [
          { label: 'Overview', href: 'project/index.html', desc: 'Module introduction', icon: 'overview' },
          { label: 'Dashboard', href: 'project/dashboard.html', desc: 'Portfolio analytics', icon: 'dashboard' },
          { label: 'Project List', href: 'project/project-list.html', desc: 'All projects', icon: 'list' },
          { label: 'Project Details', href: 'project/project-details.html', desc: 'Single project', icon: 'doc' },
          { label: 'Deliverables', href: 'project/deliverables.html', desc: 'Milestone register', icon: 'milestone' },
          { label: 'Deliverable Details', href: 'project/deliverable-details.html', desc: 'Deep dive', icon: 'doc' },
          { label: 'Work Items', href: 'project/work-items.html', desc: 'Task backlog', icon: 'tasks' },
          { label: 'Accounts', href: 'project/accounts.html', desc: 'Client accounts', icon: 'people' },
          { label: 'Task Board', href: 'project/taskboard.html', desc: 'Kanban view', icon: 'board' },
          { label: 'Task Activity', href: 'project/task-activity.html', desc: 'Audit trail', icon: 'activity' },
          { label: 'Team Capacity', href: 'project/team-capacity.html', desc: 'Roster & Gantt', icon: 'capacity' },
          { label: 'Reports', href: 'project/reports.html', desc: 'Delivery reports', icon: 'chart' },
          { label: 'Feedback', href: 'project/feedback.html', desc: 'Stakeholder input', icon: 'feedback' },
          { label: 'Notes', href: 'project/notes.html', desc: 'Shared notes', icon: 'notes' },
          { label: 'Calendar', href: 'project/calendar.html', desc: 'Schedule view', icon: 'calendar' },
          { label: 'File Manager', href: 'project/file-manager.html', desc: 'Documents', icon: 'files' },
          // Chat deferred (PROJ-025) — removed from production documentation nav
          { label: 'Governance', href: 'project/governance.html', desc: 'Risks, issues, milestones', icon: 'shield' },
          { label: 'Global Search', href: 'project/search.html', desc: 'Cross-project find', icon: 'search' }
        ]
      },
      mobile: {
        label: 'Mobile',
        tagline: 'Companion app',
        description: 'Access tasks, projects, timesheets, and insights on the go with the Tracopus mobile companion.',
        icon: 'mobile',
        accent: '#a7f3d0',
        index: 'mobile/index.html',
        featured: ['mobile/tasks.html', 'mobile/projects.html'],
        pages: [
          { label: 'Overview', href: 'mobile/index.html', desc: 'App introduction', icon: 'overview' },
          { label: 'Login & Registration', href: 'mobile/login.html', desc: 'Account access', icon: 'login' },
          { label: 'Tasks Hub', href: 'mobile/tasks.html', desc: 'Mobile tasks', icon: 'tasks' },
          { label: 'Insights Dashboard', href: 'mobile/insights.html', desc: 'Mobile analytics', icon: 'dashboard' },
          { label: 'Projects Hub', href: 'mobile/projects.html', desc: 'On-the-go projects', icon: 'project' },
          { label: 'Timesheet & Record', href: 'mobile/timesheet.html', desc: 'Log time mobile', icon: 'time' }
        ]
      },
      'data-flow': {
        label: 'Data flow',
        tagline: 'Interactive flag simulators',
        description: 'Live org/role flag toggles with table-level data flows — leave policy, accrual, request/approve, timesheet, attendance, and delegation authority.',
        icon: 'doc',
        accent: '#3d5a7a',
        index: 'data-flow/index.html',
        featured: [
          'data-flow/index.html',
          'data-flow/leave-policy-flags-data-flow.html',
          'data-flow/leave-flags-data-flow.html',
          'data-flow/delegation-flags-data-flow.html'
        ],
        pages: [
          { label: 'Data flow hub', href: 'data-flow/index.html', desc: 'All simulators & learning paths', icon: 'overview' },
          { label: 'Leave policy & accrual', href: 'data-flow/leave-policy-flags-data-flow.html', desc: 'GLP, balances, schedulers', icon: 'calendar' },
          { label: 'Leave request & approve', href: 'data-flow/leave-flags-data-flow.html', desc: 'SUBMITTED workflow', icon: 'calendar' },
          { label: 'Timesheet approval', href: 'data-flow/timesheet-flags-data-flow.html', desc: 'Week status & flags', icon: 'time' },
          { label: 'Attendance & reg', href: 'data-flow/attendance-flags-data-flow.html', desc: 'Mark, approve, regularization', icon: 'calendar' },
          { label: 'Approval delegation', href: 'data-flow/delegation-flags-data-flow.html', desc: 'resolve, canAct, inbox', icon: 'admin' },
          { label: 'Persona navigation', href: 'data-flow/persona-navigation-flags-data-flow.html', desc: 'pagePersonaMap, org kills', icon: 'admin' },
          { label: 'Roles & permissions', href: 'data-flow/admin-roles-flags-data-flow.html', desc: 'personaModules, Role Bar', icon: 'admin' },
          { label: 'Working day resolver', href: 'data-flow/working-day-flags-data-flow.html', desc: 'Shift, holidays, WDR', icon: 'calendar' },
          { label: 'Application config', href: 'hrms/application-config.html', desc: 'org.json flag keys', icon: 'config' }
        ]
      }
    },

    topNav: [],

    moduleNav: [
      { type: 'link', label: 'Home', href: 'index.html', icon: 'home' },
      { type: 'link', label: 'How-tos', href: 'how-to-index.html', icon: 'doc' },
      { type: 'link', label: 'Charts', href: 'charts.html', icon: 'chart' },
      { type: 'link', label: 'Data flow', href: 'data-flow/index.html', icon: 'doc' },
      { type: 'link', label: 'Admin', href: 'admin.html', icon: 'admin' },
      { sepBefore: true, type: 'mega', module: 'userFlows' },
      { type: 'mega', module: 'hrms' },
      { type: 'mega', module: 'sales' },
      { type: 'mega', module: 'project' },
      { type: 'mega', module: 'people' },
      { type: 'mega', module: 'workspace' },
      { type: 'mega', module: 'payroll' },
      { type: 'mega', module: 'finance' },
      { type: 'mega', module: 'resources' },
      { type: 'mega', module: 'performance' },
      { type: 'mega', module: 'analytics' },
      { type: 'mega', module: 'integrations' },
      { type: 'mega', module: 'ai' },
      { type: 'mega', module: 'admin' },
      { type: 'mega', module: 'auth' },
      { type: 'mega', module: 'mobile' }
    ],

    homeSidebar: [
      { label: 'All screen how-tos', href: 'how-to-index.html' },
      { label: 'Interactive data flow', href: 'data-flow/index.html' },
      { label: 'User flows', href: 'user-flows/index.html' },
      { label: 'Use Case Catalog', href: 'tracopus-use-case-catalog.html' },
      { label: 'API Docs', href: 'api-docs.html' },
      { label: 'Integration API console', href: 'integration-api-console.html' },
      { label: 'External project create', href: 'external-project-create.html' },
      { label: 'Test Plan', href: 'tracopus-test-plan.html' },
      { label: 'Scenario Guide', href: 'user-guide/index.html' },
      { label: 'Getting Started', href: 'getting-started.html' },
      { label: 'FAQ', href: 'faq/index.html' },
      { label: 'HRMS', href: 'hrms/index.html' },
      { label: 'Sales', href: 'sales/index.html' },
      { label: 'Project', href: 'project/index.html' },
      { label: 'Admin consoles', href: 'admin/index.html' },
      { label: 'People (scenarios)', href: 'user-guide/people/index.html' },
      { label: 'Payroll (scenarios)', href: 'user-guide/payroll/index.html' },
      { label: 'Mobile', href: 'mobile/index.html' },
      { label: 'Charts', href: 'charts.html' },
      { label: 'Admin screens', href: 'admin.html' }
    ]
  };

  function scenarioGuideModule(meta) {
    var base = 'user-guide/' + meta.index;
    return {
      label: meta.label,
      tagline: meta.tagline,
      description: meta.tagline + ' — step-by-step scenarios in the User Guide.',
      icon: meta.icon,
      accent: meta.accent,
      index: base,
      featured: [base, 'user-guide/scenarios.html'],
      pages: [
        { label: 'All scenarios', href: 'user-guide/scenarios.html', desc: 'Complete workflow index', icon: 'list' },
        { label: meta.label + ' overview', href: base, desc: meta.tagline, icon: 'overview' },
        { label: 'Use Case Catalog', href: 'tracopus-use-case-catalog.html', desc: '718 entries incl. gap UCs', icon: 'doc' },
        { label: 'API Docs', href: 'api-docs.html', desc: 'Endpoints, curl & related APIs', icon: 'config' },
        { label: 'Integration API console', href: 'integration-api-console.html', desc: 'Token-driven interactive v2 explorer', icon: 'config' },
        { label: 'External project create', href: 'external-project-create.html', desc: 'Create projects with tk_* tokens', icon: 'doc' },
        { label: 'Test Plan', href: 'tracopus-test-plan.html', desc: '10k+ QA + GD tests', icon: 'list' }
      ]
    };
  }

  var guideModulesMeta = {
    auth: { label: 'Authentication', tagline: 'Sign in, activate, credentials', icon: 'login', accent: '#6366f1', index: 'auth/index.html' },
    workspace: { label: 'Workspace', tagline: 'My work, approvals, notifications', icon: 'dashboard', accent: '#8b5cf6', index: 'workspace/index.html' },
    people: { label: 'People Ops', tagline: 'Onboarding, policies, Employee 360', icon: 'people', accent: '#14b8a6', index: 'people/index.html' },
    resources: { label: 'Resources', tagline: 'Skills, staffing, utilization', icon: 'capacity', accent: '#0d9488', index: 'resources/index.html' },
    finance: { label: 'Finance', tagline: 'Invoices, billing, expenses', icon: 'invoice', accent: '#d97706', index: 'finance/index.html' },
    payroll: { label: 'Payroll', tagline: 'Runs, paychecks, deductions', icon: 'invoice', accent: '#ca8a04', index: 'payroll/index.html' },
    performance: { label: 'Performance', tagline: 'Goals, reviews, feedback', icon: 'activity', accent: '#7c3aed', index: 'performance/index.html' },
    analytics: { label: 'Analytics', tagline: 'Dashboards and control tower', icon: 'chart', accent: '#2563eb', index: 'analytics/index.html' },
    integrations: { label: 'Integrations', tagline: 'Connectors and sync health', icon: 'config', accent: '#475569', index: 'integrations/index.html' },
    ai: { label: 'AI Assist', tagline: 'Agent console and knowledge', icon: 'sparkle', accent: '#a855f7', index: 'ai/index.html' },
    admin: { label: 'Administration', tagline: 'Roles, audit, feature flags', icon: 'admin', accent: '#64748b', index: 'admin/index.html' }
  };

  Object.keys(guideModulesMeta).forEach(function (key) {
    nav.modules[key] = scenarioGuideModule(guideModulesMeta[key]);
  });
  nav.modules.integrations.pages.splice(2, 0,
    { label: 'Integration API console', href: 'integration-api-console.html', desc: 'Token-driven interactive v2 explorer', icon: 'config' },
    { label: 'External project create', href: 'external-project-create.html', desc: 'Create projects with tk_* tokens', icon: 'doc' }
  );
  nav.modules.integrations.featured = [
    'integration-api-console.html',
    'external-project-create.html'
  ].concat(nav.modules.integrations.featured || []);

  /* BEGIN-REMAINING-HOWTO-NAV */
  (function spliceRemainingHowTos() {
    var grouped = {
      "workspace": [
        {
          "label": "Home",
          "href": "workspace/home.html",
          "desc": "Persona-aware home with shortcuts to approvals, work, and notifications ",
          "icon": "dashboard"
        },
        {
          "label": "My work",
          "href": "workspace/my-work.html",
          "desc": "Tasks, activities, and focus items assigned to you across projects — the",
          "icon": "dashboard"
        },
        {
          "label": "My paychecks",
          "href": "workspace/my-paychecks.html",
          "desc": "Published payslips and paycheck history for your employment — only what ",
          "icon": "dashboard"
        },
        {
          "label": "Notifications",
          "href": "workspace/notifications.html",
          "desc": "Alerts, mentions, and system updates that deep-link to the record that c",
          "icon": "dashboard"
        },
        {
          "label": "My onboarding",
          "href": "workspace/my-onboarding.html",
          "desc": "Tasks on your live onboarding case — documents, acknowledgements, and HR",
          "icon": "dashboard"
        },
        {
          "label": "My tickets",
          "href": "workspace/my-tickets.html",
          "desc": "Service tickets you opened or are assigned — the same ticket records the",
          "icon": "dashboard"
        },
        {
          "label": "Work graph",
          "href": "workspace/work-graph.html",
          "desc": "Connected operational truth across modules — nodes and edges that point ",
          "icon": "dashboard"
        }
      ],
      "people": [
        {
          "label": "Onboarding",
          "href": "people/onboarding.html",
          "desc": "HR operator register for joiner cases and templates — cases hang off Emp",
          "icon": "people"
        },
        {
          "label": "Offboarding",
          "href": "people/offboarding.html",
          "desc": "Exit cases, asset return, and access wind-down on the same Employee row ",
          "icon": "people"
        },
        {
          "label": "Documents",
          "href": "people/documents.html",
          "desc": "Employee document vault — contracts, IDs, and files on the person — with",
          "icon": "people"
        },
        {
          "label": "Assets",
          "href": "people/assets.html",
          "desc": "Asset register assigned to employees — laptops, badges, kits — fulfilled",
          "icon": "people"
        },
        {
          "label": "Organization chart",
          "href": "people/org-chart.html",
          "desc": "Read-only view of reporting lines sourced from Employee manager fields —",
          "icon": "people"
        },
        {
          "label": "Policies",
          "href": "people/policies.html",
          "desc": "Published company policies and acknowledgements — versioned documents pe",
          "icon": "people"
        },
        {
          "label": "Recruiting",
          "href": "recruiting/dashboard.html",
          "desc": "ATS control tower for requisitions, candidates, interviews, and offers —",
          "icon": "people"
        },
        {
          "label": "Requisitions",
          "href": "recruiting/requisitions.html",
          "desc": "Open roles the ATS is hiring for — demand that staffing and offers hang ",
          "icon": "people"
        },
        {
          "label": "Candidates",
          "href": "recruiting/candidates.html",
          "desc": "People in the hiring pipeline — applicants on requisitions, not Employee",
          "icon": "people"
        },
        {
          "label": "Interviews",
          "href": "recruiting/interviews.html",
          "desc": "Scheduled interviews on candidate × requisition — calendar coordination,",
          "icon": "people"
        },
        {
          "label": "Offers",
          "href": "recruiting/offers.html",
          "desc": "Offer letters on candidates — compensation drafts with masking — not Pur",
          "icon": "people"
        },
        {
          "label": "Learning courses",
          "href": "learning/courses.html",
          "desc": "Course catalog HR publishes — not the policy handbook and not a second d",
          "icon": "doc"
        },
        {
          "label": "My learning",
          "href": "learning/my-learning.html",
          "desc": "Assigned courses for the signed-in employee — complete them here; HR tra",
          "icon": "doc"
        },
        {
          "label": "Learning assignments",
          "href": "learning/assignments.html",
          "desc": "Who must take which course — assignments onto Employee, not a mailing li",
          "icon": "doc"
        },
        {
          "label": "Learning compliance",
          "href": "learning/compliance.html",
          "desc": "Overdue and complete training against assignments — a view on Employee c",
          "icon": "doc"
        },
        {
          "label": "Learning reports",
          "href": "learning/reports.html",
          "desc": "Permission-scoped learning exports — snapshots of assignments and comple",
          "icon": "doc"
        }
      ],
      "project": [
        {
          "label": "Portfolio",
          "href": "project/portfolio.html",
          "desc": "Portfolio control tower over live projects — health, risk, and scenarios",
          "icon": "project"
        },
        {
          "label": "Delivery sprints",
          "href": "project/delivery.html",
          "desc": "Sprint slices on existing tasks and work items — timeboxes, not a second",
          "icon": "project"
        },
        {
          "label": "Timeline / Gantt",
          "href": "project/timeline.html",
          "desc": "Gantt of project, milestone, and task dates — a calendar lens on the del",
          "icon": "project"
        },
        {
          "label": "Milestones",
          "href": "project/milestones.html",
          "desc": "Named delivery dates on a project — governance markers, not a replacemen",
          "icon": "project"
        },
        {
          "label": "Risks",
          "href": "project/risks.html",
          "desc": "Project risks on live projects — register and RAG, not a side RAID sprea",
          "icon": "project"
        },
        {
          "label": "Issues & actions",
          "href": "project/issues.html",
          "desc": "Realized project problems and actions — not tickets unless you promote t",
          "icon": "project"
        },
        {
          "label": "Governance",
          "href": "project/governance.html",
          "desc": "Steering pack: RAG across milestones, risks, issues — composed from thos",
          "icon": "project"
        },
        {
          "label": "Tickets & service",
          "href": "project/tickets.html",
          "desc": "SLA-backed service desk — the team register My tickets slices — not proj",
          "icon": "project"
        },
        {
          "label": "Lessons learned",
          "href": "project/lessons-learned.html",
          "desc": "Institutional memory from delivery — stored as lessons on projects, with",
          "icon": "project"
        },
        {
          "label": "Root cause analysis",
          "href": "project/rca.html",
          "desc": "Structured cause analysis on delivery failures — hangs off project/incid",
          "icon": "project"
        },
        {
          "label": "NPD",
          "href": "npd/dashboard.html",
          "desc": "New product development tower — ideas, gates, launch — on NPD records th",
          "icon": "milestone"
        },
        {
          "label": "NPD ideas",
          "href": "npd/ideas.html",
          "desc": "Idea intake for new products — not a task backlog and not a bid request.",
          "icon": "milestone"
        },
        {
          "label": "NPD gates",
          "href": "npd/gates.html",
          "desc": "Stage-gate decisions on NPD items — process decisions, not leave approva",
          "icon": "milestone"
        },
        {
          "label": "NPD launch",
          "href": "npd/launch.html",
          "desc": "Go-to-market / launch readiness for passed NPD items — not payroll publi",
          "icon": "milestone"
        },
        {
          "label": "Dossiers",
          "href": "dossiers/index.html",
          "desc": "Evidence packs composed from live entities — projects, tickets, invoices",
          "icon": "doc"
        }
      ],
      "resources": [
        {
          "label": "Capacity simulation",
          "href": "resources/planner.html",
          "desc": "What-if staffing and bench moves before you commit the roster — Team cap",
          "icon": "capacity"
        },
        {
          "label": "Utilization & demand",
          "href": "resources/utilization.html",
          "desc": "Utilization, demand, bench, and skill signals in one planning view — cha",
          "icon": "capacity"
        },
        {
          "label": "Skills matrix",
          "href": "resources/skills.html",
          "desc": "Proficiency, certifications, and gaps on Employee — then staff from capa",
          "icon": "capacity"
        },
        {
          "label": "Staffing requests",
          "href": "resources/staffing-requests.html",
          "desc": "Demand tickets to place people from skills and bench onto projects — ful",
          "icon": "capacity"
        },
        {
          "label": "Bench & roll-off",
          "href": "resources/bench.html",
          "desc": "Availability and roll-offs on Employee — the ready pool for staffing, no",
          "icon": "capacity"
        }
      ],
      "finance": [
        {
          "label": "Finance dashboard",
          "href": "finance/dashboard.html",
          "desc": "Finance control tower over POs, invoices, and project financials — chart",
          "icon": "invoice"
        },
        {
          "label": "Project financials",
          "href": "finance/project-financials.html",
          "desc": "Cost, billed, and margin on live projects and their POs — not a second p",
          "icon": "invoice"
        },
        {
          "label": "Billing plans",
          "href": "finance/billing-plans.html",
          "desc": "How a contract will be billed over time — plans on PurchaseOrder / proje",
          "icon": "invoice"
        },
        {
          "label": "Revenue forecast",
          "href": "finance/revenue-forecast.html",
          "desc": "Forward look composed from POs, plans, and pipeline — a forecast view, n",
          "icon": "invoice"
        },
        {
          "label": "Revenue leakage",
          "href": "finance/revenue-leakage.html",
          "desc": "Unbilled, under-billed, or leaked value vs delivery and contract — a det",
          "icon": "invoice"
        },
        {
          "label": "Credit notes",
          "href": "finance/credit-notes.html",
          "desc": "Credits against platform invoices — adjustments to bills, not a rewrite ",
          "icon": "invoice"
        },
        {
          "label": "Write-offs",
          "href": "finance/write-offs.html",
          "desc": "Uncollectible amounts — explicit write-off documents, not a silent edit ",
          "icon": "invoice"
        },
        {
          "label": "Revenue recognition",
          "href": "finance/revenue-recognition.html",
          "desc": "Policies, schedules, entries, and period close for recognized vs billed ",
          "icon": "invoice"
        },
        {
          "label": "Vendor costs",
          "href": "finance/vendor-costs.html",
          "desc": "Cost against vendors and POs — spend lens, not a second vendor master an",
          "icon": "invoice"
        },
        {
          "label": "Vendor invoices",
          "href": "finance/vendor-invoices.html",
          "desc": "Supplier bills — AP documents against vendors and POs, not platform cust",
          "icon": "invoice"
        },
        {
          "label": "Expenses (finance view)",
          "href": "finance/expenses.html",
          "desc": "Finance operations view of employee expense claims — the same expense re",
          "icon": "invoice"
        }
      ],
      "payroll": [
        {
          "label": "Payroll dashboard",
          "href": "payroll/dashboard.html",
          "desc": "Run readiness, open cycles, and payroll health — a tower on groups, runs",
          "icon": "invoice"
        },
        {
          "label": "Payroll groups",
          "href": "payroll/groups.html",
          "desc": "Populations a run can cover — groups of Employees, not a second director",
          "icon": "invoice"
        },
        {
          "label": "Payroll runs",
          "href": "payroll/runs.html",
          "desc": "Draft, calculate, and finalize cycles for a payroll group — the run is t",
          "icon": "invoice"
        },
        {
          "label": "Paychecks",
          "href": "payroll/paychecks.html",
          "desc": "Org-wide published slips from finalized runs — operators’ view of what e",
          "icon": "invoice"
        },
        {
          "label": "Salary structures",
          "href": "payroll/salary-structures.html",
          "desc": "Earnings and deduction components that compose employee pay — assigned t",
          "icon": "invoice"
        },
        {
          "label": "Benefits (payroll)",
          "href": "payroll/benefits-payroll.html",
          "desc": "Benefits as they hit pay — payroll seat on plans/enrollments, not the on",
          "icon": "invoice"
        },
        {
          "label": "Benefits plans",
          "href": "benefits/plans.html",
          "desc": "Plan catalog — what can be elected — not the payroll run and not medical",
          "icon": "invoice"
        },
        {
          "label": "Benefits enrollment",
          "href": "benefits/enrollment.html",
          "desc": "Elections on Employee against published plans — self-service and HR assi",
          "icon": "invoice"
        },
        {
          "label": "Benefits carrier files",
          "href": "benefits/carrier-files.html",
          "desc": "Exchange files with carriers — generated from enrollments, not a manual ",
          "icon": "invoice"
        },
        {
          "label": "Benefits reports",
          "href": "benefits/reports.html",
          "desc": "Permission-scoped benefits exports — snapshots of plans and elections, n",
          "icon": "invoice"
        },
        {
          "label": "Compensation",
          "href": "payroll/compensation.html",
          "desc": "Compensation programs on Employee — cycles and awards with masking — not",
          "icon": "invoice"
        },
        {
          "label": "Deductions",
          "href": "payroll/deductions.html",
          "desc": "Withholding schedules on Employee — statutory and voluntary — inputs to ",
          "icon": "invoice"
        },
        {
          "label": "Reimbursements",
          "href": "payroll/reimbursements.html",
          "desc": "Paying approved employee expenses — payout register on claims, not vendo",
          "icon": "invoice"
        },
        {
          "label": "Employee finance",
          "href": "payroll/employee-finance.html",
          "desc": "Workspace for benefits, compensation, and employee money on a person — a",
          "icon": "invoice"
        },
        {
          "label": "Expenses (employee)",
          "href": "payroll/expenses.html",
          "desc": "Submit and track your expense claims — the same records finance reviews,",
          "icon": "invoice"
        },
        {
          "label": "Payroll reports",
          "href": "payroll/reports.html",
          "desc": "Permission-scoped payroll exports — snapshots of runs and slips, not a l",
          "icon": "invoice"
        }
      ],
      "performance": [
        {
          "label": "Performance dashboard",
          "href": "performance/dashboard.html",
          "desc": "Goals, reviews, and growth at a glance — a tower on those registers, not",
          "icon": "activity"
        },
        {
          "label": "Goals / OKRs",
          "href": "performance/goals.html",
          "desc": "Objectives on Employee — aligned to work, not a second task tracker and ",
          "icon": "activity"
        },
        {
          "label": "Review cycles",
          "href": "performance/review-cycles.html",
          "desc": "Windows that open performance reviews — cycle admin, not the review writ",
          "icon": "activity"
        },
        {
          "label": "Performance reviews",
          "href": "performance/reviews.html",
          "desc": "Write-ups on Employee for a cycle — ratings and narrative, masked, not t",
          "icon": "activity"
        },
        {
          "label": "Calibration",
          "href": "performance/calibration.html",
          "desc": "Fairness meeting on review drafts — adjusts distribution, does not repla",
          "icon": "activity"
        },
        {
          "label": "Continuous feedback",
          "href": "performance/feedback.html",
          "desc": "Ongoing peer/manager notes on Employee — not project stakeholder campaig",
          "icon": "activity"
        },
        {
          "label": "1:1 notes",
          "href": "performance/1on1.html",
          "desc": "Manager–employee conversation notes — private talent records, not projec",
          "icon": "activity"
        },
        {
          "label": "Growth plans",
          "href": "performance/growth-plans.html",
          "desc": "Development plans on Employee — learning and career actions, not the LMS",
          "icon": "activity"
        }
      ],
      "analytics": [
        {
          "label": "Executive control tower",
          "href": "analytics/executive-control-tower.html",
          "desc": "Steering view over projects, people, and commercial health — KPIs compos",
          "icon": "chart"
        },
        {
          "label": "Analytics hub",
          "href": "analytics/hub.html",
          "desc": "Launch pad onto domain analytics — workforce, delivery, finance, payroll",
          "icon": "chart"
        },
        {
          "label": "Executive analytics",
          "href": "analytics/executive.html",
          "desc": "Deeper exec charts than the control tower — still a view on the same pro",
          "icon": "chart"
        },
        {
          "label": "Workforce analytics",
          "href": "analytics/workforce.html",
          "desc": "Headcount, joiners, attrition, and attendance themes on Employee — chart",
          "icon": "chart"
        },
        {
          "label": "Delivery analytics",
          "href": "analytics/delivery.html",
          "desc": "Throughput and slip on Project, Task, and TaskActivity — not the board a",
          "icon": "chart"
        },
        {
          "label": "Resource intelligence",
          "href": "analytics/resource.html",
          "desc": "Load, bench, and skill coverage composed from assignments and Employee —",
          "icon": "chart"
        },
        {
          "label": "Payroll analytics",
          "href": "analytics/payroll.html",
          "desc": "Pay-cycle themes on published runs and structures — masked, never a plac",
          "icon": "chart"
        },
        {
          "label": "Financial analytics",
          "href": "analytics/finance.html",
          "desc": "Commercial grain on purchase contracts, invoices, and project financials",
          "icon": "chart"
        },
        {
          "label": "Approvals analytics",
          "href": "analytics/approvals.html",
          "desc": "SLA and volume on the universal approval engine — charts on live request",
          "icon": "chart"
        },
        {
          "label": "Risk intelligence",
          "href": "analytics/risk.html",
          "desc": "Cross-portfolio risk themes on project risk/issue registers and commerci",
          "icon": "chart"
        },
        {
          "label": "Work graph analytics",
          "href": "analytics/work-graph.html",
          "desc": "Analytics on Work Graph nodes and edges — masked summaries and source re",
          "icon": "chart"
        },
        {
          "label": "AI insights",
          "href": "analytics/ai-insights.html",
          "desc": "Insight cards composed from canonical entities — each card cites a sourc",
          "icon": "chart"
        },
        {
          "label": "Report builder",
          "href": "analytics/report-builder.html",
          "desc": "Ad-hoc definitions over canonical domains — saved views, not a warehouse",
          "icon": "chart"
        },
        {
          "label": "Scheduled reports",
          "href": "analytics/scheduled-reports.html",
          "desc": "Cadence and recipients for saved report definitions — delivery config, n",
          "icon": "chart"
        }
      ],
      "ai": [
        {
          "label": "Agent console",
          "href": "ai/agents.html",
          "desc": "Conversation with domain agents that cite Employee, Project, Task, and r",
          "icon": "sparkle"
        },
        {
          "label": "WBS assistant",
          "href": "ai/wbs-assistant.html",
          "desc": "Draft work breakdowns you still save as Task and TaskActivity on a Proje",
          "icon": "sparkle"
        },
        {
          "label": "Staffing agent",
          "href": "ai/staffing-agent.html",
          "desc": "Staffing suggestions from skills and load — you still commit on Team cap",
          "icon": "sparkle"
        },
        {
          "label": "Timesheet agent",
          "href": "ai/timesheet-agent.html",
          "desc": "Hints on hours and exceptions — you still enter and approve on the prote",
          "icon": "sparkle"
        },
        {
          "label": "Payroll readiness agent",
          "href": "ai/payroll-readiness.html",
          "desc": "Gate and exception hints before a run — payroll still calculates and pub",
          "icon": "sparkle"
        },
        {
          "label": "Risk agent",
          "href": "ai/risk-agent.html",
          "desc": "Suggested risks and concentrations — you still write the row on Projects",
          "icon": "sparkle"
        },
        {
          "label": "Executive briefing",
          "href": "ai/executive-briefing.html",
          "desc": "Narrative briefing over control-tower sources — still citations, still n",
          "icon": "sparkle"
        },
        {
          "label": "Recommendations",
          "href": "ai/recommendations.html",
          "desc": "Suggested next actions with source ids — you complete them on the owning",
          "icon": "sparkle"
        },
        {
          "label": "Knowledge & RCA",
          "href": "ai/knowledge.html",
          "desc": "Curated corpus and RCA articles agents may cite — not the live project R",
          "icon": "sparkle"
        },
        {
          "label": "AI decision audit",
          "href": "ai/audit.html",
          "desc": "Masked run metadata for AI decisions — source references, not raw prompt",
          "icon": "sparkle"
        }
      ],
      "integrations": [
        {
          "label": "Integration hub",
          "href": "integrations/hub.html",
          "desc": "Launch pad for connectors that write Employee, Project, PurchaseOrder, T",
          "icon": "config"
        },
        {
          "label": "Connections",
          "href": "integrations/connections.html",
          "desc": "Installed connector instances and credentials — environment config, not ",
          "icon": "config"
        },
        {
          "label": "Connector marketplace",
          "href": "integrations/marketplace.html",
          "desc": "Catalog of connector types you can install — installing still creates a ",
          "icon": "config"
        },
        {
          "label": "API access",
          "href": "integrations/api-access.html",
          "desc": "Tokens and scopes for external callers of Tracopus APIs — not Admin API ",
          "icon": "config"
        },
        {
          "label": "Connector adapters",
          "href": "integrations/adapters.html",
          "desc": "Runtime adapters that translate vendor payloads into canonical entities ",
          "icon": "config"
        },
        {
          "label": "Sync monitor",
          "href": "integrations/sync-health.html",
          "desc": "Last run, lag, and errors per connector — a monitor, not the place you m",
          "icon": "config"
        },
        {
          "label": "Data mapping",
          "href": "integrations/mapping.html",
          "desc": "Field contracts from vendor payloads onto Employee, Project, PurchaseOrd",
          "icon": "config"
        },
        {
          "label": "Import/export jobs",
          "href": "integrations/jobs.html",
          "desc": "Connector batches — not Admin scheduled jobs, and not the payroll or tim",
          "icon": "config"
        },
        {
          "label": "Integration logs",
          "href": "integrations/logs.html",
          "desc": "Payload and error detail for connector runs — operational logs, masked, ",
          "icon": "config"
        }
      ]
    };
    function addPages(moduleKey, pages, beforeHref) {
      var m = nav.modules[moduleKey];
      if (!m || !m.pages || !pages || !pages.length) return;
      var have = {};
      m.pages.forEach(function (p) { have[p.href] = true; });
      var fresh = pages.filter(function (p) { return !have[p.href]; });
      if (!fresh.length) return;
      var idx = 2;
      if (beforeHref) {
        for (var i = 0; i < m.pages.length; i++) {
          if (m.pages[i].href === beforeHref) { idx = i; break; }
        }
      }
      for (var j = fresh.length - 1; j >= 0; j--) {
        m.pages.splice(idx, 0, fresh[j]);
      }
      m.featured = fresh.slice(0, 2).map(function (p) { return p.href; }).concat(m.featured || []);
    }
    addPages('workspace', grouped.workspace);
    addPages('people', grouped.people);
    addPages('resources', grouped.resources);
    addPages('finance', grouped.finance);
    addPages('payroll', grouped.payroll);
    addPages('performance', grouped.performance);
    addPages('analytics', grouped.analytics);
    addPages('integrations', grouped.integrations);
    addPages('ai', grouped.ai);
    addPages('project', grouped.project, 'project/search.html');
  })();
  /* END-REMAINING-HOWTO-NAV */

  /* Page-context brand overrides (same utility bar, different menubar label) */
  if (typeof document !== 'undefined' && document.location) {
    var path = document.location.pathname || '';
    if (path.indexOf('tracopus-use-case-catalog') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'Use Case Catalog',
        brandEmphasis: 'Use Case Catalog',
        subtitle: 'Pages + 549 gap-discovery use cases',
        homeHref: '__docs__/tracopus-use-case-catalog.html'
      });
    } else if (path.indexOf('integration-api-console') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'Integration API',
        brandEmphasis: 'API Console',
        subtitle: 'Token-driven v2 explorer',
        homeHref: '__docs__/integration-api-console.html'
      });
    } else if (path.indexOf('external-project-create') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'Integration API',
        brandEmphasis: 'Project create',
        subtitle: 'External project create with tk_* tokens',
        homeHref: '__docs__/external-project-create.html'
      });
    } else if (path.indexOf('api-docs') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'API Documentation',
        brandEmphasis: 'API Docs',
        subtitle: 'Endpoints, sample curl, related APIs',
        homeHref: '__docs__/api-docs.html'
      });
    } else if (path.indexOf('tracopus-test-plan') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'Test Plan',
        brandEmphasis: 'Test Plan',
        subtitle: 'QA scenarios + GD01–GD16 matrix',
        homeHref: '__docs__/tracopus-test-plan.html'
      });
    } else if (path.indexOf('/data-flow/') >= 0) {
      nav.header = mergeHeader({
        eyebrow: 'Interactive Data Flow',
        brandEmphasis: 'Data Flow',
        subtitle: 'Flags · tables · schedulers · authority',
        homeHref: '__docs__/data-flow/index.html'
      });
    }
  }

  global.DOCS_NAV = nav;
})(typeof window !== 'undefined' ? window : this);
