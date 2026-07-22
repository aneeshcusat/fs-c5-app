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
        featured: ['hrms/dashboard.html', 'hrms/leaves.html', 'hrms/leave-configuration.html', 'hrms/timesheet-approval.html'],
        pages: [
          { label: 'Overview', href: 'hrms/index.html', desc: 'Module introduction', icon: 'overview' },
          { label: 'Employee Dashboard', href: 'hrms/dashboard.html', desc: 'Personal HR analytics', icon: 'dashboard' },
          { label: 'Employees', href: 'hrms/employees.html', desc: 'Directory & profiles', icon: 'people' },
          { label: 'Timesheet', href: 'hrms/timesheet.html', desc: 'Weekly hour entry', icon: 'time' },
          { label: 'Timesheet Approval', href: 'hrms/timesheet-approval.html', desc: 'Submit, approve & lock', icon: 'time' },
          { label: 'Leave Management', href: 'hrms/leaves.html', desc: 'Request & approve leave', icon: 'calendar' },
          { label: 'Leave Configuration', href: 'hrms/leave-configuration.html', desc: 'Policies, holidays, balances, flags', icon: 'config' },
          { label: 'Shift Policies', href: 'hrms/shift-policies.html', desc: 'Work-week calendars', icon: 'calendar' },
          { label: 'Persona Navigation', href: 'hrms/persona-navigation.html', desc: 'Org access kill switches & page personas', icon: 'people' },
          { label: 'Attendance', href: 'hrms/attendance.html', desc: 'Presence tracking', icon: 'calendar' },
          { label: 'Audit Trail', href: 'hrms/audit-trail.html', desc: 'Unified activity history', icon: 'activity' },
          { label: 'Invoices', href: 'hrms/invoices.html', desc: 'Billing register', icon: 'invoice' },
          { label: 'Invoice Details', href: 'hrms/invoice-details.html', desc: 'Line-item view', icon: 'doc' },
          { label: 'Employee Profile', href: 'hrms/profile.html', desc: 'Personal record', icon: 'profile' },
          { label: 'Settings', href: 'hrms/settings.html', desc: 'HR preferences', icon: 'settings' },
          { label: 'Application Config', href: 'hrms/application-config.html', desc: 'org.json + role.json reference', icon: 'config' },
          { label: 'Admin Dashboard', href: 'admin/dashboard.html', desc: 'Audit, access & compliance ops', icon: 'dashboard' },
          { label: 'Notification Templates', href: 'admin/notification-templates.html', desc: 'Email & in-app templates', icon: 'doc' },
          { label: 'My Approvals', href: 'workspace/approvals.html', desc: 'Universal approval inbox', icon: 'activity' },
          { label: 'Admin & Access', href: 'admin.html', desc: 'RBAC, persona navigation, app config', icon: 'admin' },
          { label: 'User flows hub', href: 'user-flows/index.html', desc: 'Scenarios ↔ screen guides', icon: 'list' }
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
          { label: 'All scenarios', href: 'user-guide/scenarios.html', desc: 'Flat A–Z scenario index', icon: 'list' },
          { label: 'Scenario Guide home', href: 'user-guide/index.html', desc: 'Module scenario indexes', icon: 'dashboard' },
          { label: 'Use Case Catalog', href: 'tracopus-use-case-catalog.html', desc: '718 business use cases', icon: 'doc' },
          { label: 'API Docs', href: 'api-docs.html', desc: 'Endpoints, sample curl, related APIs', icon: 'config' },
          { label: 'Persona navigation flow', href: 'user-guide/admin/admin-persona-navigation.html', desc: 'Scenario · Screen: Persona Navigation', icon: 'people' },
          { label: 'Create employee flow', href: 'user-guide/hrms/hrms-create-employee.html', desc: 'Scenario · Screen: Employees', icon: 'people' },
          { label: 'Timesheet flow', href: 'user-guide/hrms/hrms-log-timesheet.html', desc: 'Scenario · Screen: Timesheet', icon: 'time' },
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
      }
    },

    topNav: [],

    moduleNav: [
      { type: 'link', label: 'Home', href: 'index.html', icon: 'home' },
      { type: 'link', label: 'Charts', href: 'charts.html', icon: 'chart' },
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
      { label: 'User flows', href: 'user-flows/index.html' },
      { label: 'Use Case Catalog', href: 'tracopus-use-case-catalog.html' },
      { label: 'API Docs', href: 'api-docs.html' },
      { label: 'Test Plan', href: 'tracopus-test-plan.html' },
      { label: 'Scenario Guide', href: 'user-guide/index.html' },
      { label: 'Getting Started', href: 'getting-started.html' },
      { label: 'FAQ', href: 'faq/index.html' },
      { label: 'HRMS', href: 'hrms/index.html' },
      { label: 'Sales', href: 'sales/index.html' },
      { label: 'Project', href: 'project/index.html' },
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
    }
  }

  global.DOCS_NAV = nav;
})(typeof window !== 'undefined' ? window : this);
