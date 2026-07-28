/**
 * Additional FAQ categories and display order for generate-faq-page.js
 */
module.exports = {
  categoryOrder: [
    'faq-docs',
    'faq-scenarios',
    'faq-login',
    'faq-navigation',
    'faq-workspace',
    'faq-hrms',
    'faq-leave',
    'faq-attendance',
    'faq-timesheet',
    'faq-approval',
    'faq-audit',
    'faq-people',
    'faq-project',
    'faq-sales',
    'faq-billing',
    'faq-payroll',
    'faq-resources',
    'faq-performance',
    'faq-mobile',
    'faq-charts',
    'faq-integrations',
    'faq-admin',
    'faq-troubleshooting',
    'cfg-faq-access',
    'cfg-faq-org-tree',
    'cfg-faq-saving',
    'cfg-faq-app-data',
    'cfg-faq-roles',
    'cfg-faq-timesheet',
    'cfg-faq-troubleshooting'
  ],

  categories: [
    {
      id: 'faq-docs',
      icon: '📚',
      title: 'Documentation & screen guides',
      items: [
        {
          q: 'Where is the main Tracopus documentation?',
          a: 'Open <strong>Documentation</strong> at <code>/doucuments/index.html</code> — screen-by-screen guides for HRMS, Project, Sales, Mobile, Charts, and Admin.'
        },
        {
          q: 'What is the difference between screen docs and the Scenario Guide?',
          a: '<strong>Screen docs</strong> describe each UI screen (fields, charts, permissions). The <strong>Scenario Guide</strong> walks through end-to-end workflows (Feature → Scenario → Steps) for testers and end users.'
        },
        {
          q: 'How do I find documentation for a specific screen?',
          a: 'Use the header module mega-menu, home page module cards, or global search (<kbd>Ctrl</kbd>+<kbd>K</kbd>). Each screen doc includes breadcrumbs back to its module index.'
        },
        {
          q: 'Where is Getting Started?',
          a: '<code>getting-started.html</code> — first-day orientation: login, navigation, Luxury UI, and links to HRMS, Project, and Sales modules.'
        },
        {
          q: 'Where is the chart type reference?',
          a: '<code>charts.html</code> explains donut, bar, area, line, funnel, and treemap patterns used in summary strips and dashboards.'
        },
        {
          q: 'How do I open Application Configuration documentation?',
          a: '<strong>HRMS → Application Config</strong> in docs (<code>hrms/application-config.html</code>) plus linked config FAQ sections at the bottom of this page.'
        },
        {
          q: 'Are documentation pages updated with the app?',
          a: 'Docs are static HTML in the repo — version query strings on CSS/JS (<code>?v=…</code>) bust cache after releases. Hard-refresh if styles look stale.'
        },
        {
          q: 'Can I link directly to a section in a screen doc?',
          a: 'Yes — copy the URL with the heading anchor (e.g. <code>hrms/timesheet.html#weekly-grid</code>). Breadcrumb and sidebar help you navigate back.'
        },
        {
          q: 'Who maintains the documentation?',
          a: 'Your workspace administrator or internal product team. Report gaps with the screen URL and expected behavior.'
        },
        {
          q: 'Is there a printable or offline copy?',
          a: 'Use the browser print dialog on any page. For bulk export, clone the <code>doucuments/</code> folder from your deployment package.'
        }
      ]
    },
    {
      id: 'faq-scenarios',
      icon: '🎯',
      title: 'Scenario user guide',
      items: [
        {
          q: 'Where is the Scenario User Guide?',
          a: '<code>/doucuments/user-guide/index.html</code> — 65 scenarios across 15 modules with step-by-step instructions.'
        },
        {
          q: 'How is a scenario page structured?',
          a: 'Each scenario shows <strong>roles</strong>, <strong>prerequisites</strong>, numbered <strong>steps</strong>, <strong>outcome</strong>, tips, and links to related scenarios and screen docs.'
        },
        {
          q: 'What extra detail do enriched scenarios include?',
          a: 'Permissions tables, org/feature flags, warnings, role-specific behavior notes, and a QA verify checklist — useful for testers and trainers.'
        },
        {
          q: 'How do I find a scenario for my task?',
          a: 'Browse by module index, open <strong>All scenarios</strong>, or search from the scenario home. Scenarios are grouped by feature (Login, Timesheet, Bid Requests, etc.).'
        },
        {
          q: 'Can I use scenarios for UAT test cases?',
          a: 'Yes — copy the verify checklist and steps into your test plan. Link the scenario URL as traceability to requirements.'
        },
        {
          q: 'Why does a scenario mention a permission I do not have?',
          a: 'Scenarios document all supported roles. Your effective permissions come from Application Configuration role templates on your org unit.'
        },
        {
          q: 'How do scenarios link to screen documentation?',
          a: 'Related links at the bottom point to matching screen guides (e.g. timesheet scenario → <code>hrms/timesheet.html</code>).'
        },
        {
          q: 'How often are scenarios updated?',
          a: 'When new modules or workflows ship. Regenerate pages with <code>node user-guide/generate-pages.js</code> after editing <code>scenarios-data.js</code>.'
        },
        {
          q: 'Is the Scenario Guide different from FAQ?',
          a: '<strong>FAQ</strong> answers short common questions. <strong>Scenarios</strong> are procedural walkthroughs for completing real tasks end-to-end.'
        },
        {
          q: 'Mobile scenarios — where are they?',
          a: 'Scenario Guide → <strong>Mobile App</strong> module covers QR login, PIN, timesheet, tasks, and insights on Android.'
        }
      ]
    },
    {
      id: 'faq-workspace',
      icon: '🏠',
      title: 'Workspace, tasks & approvals',
      items: [
        {
          q: 'What is the Workspace module?',
          a: 'Your personal hub: <strong>My Work</strong>, task queue, pending approvals, notifications, and quick links to Project and HRMS screens.'
        },
        {
          q: 'Where do I see items waiting for my approval?',
          a: 'Workspace → <strong>Approvals</strong> (or notification bell) lists timesheets, leave requests, and other workflow items assigned to you as approver.'
        },
        {
          q: 'How do I open my task queue?',
          a: 'Icon rail → <strong>Taskboard</strong> or Workspace dashboard — shows assigned deliverables and work items across projects.'
        },
        {
          q: 'What is My Work?',
          a: 'Aggregated view of your active assignments, due dates, and status mix — complements the Project task board with a personal lens.'
        },
        {
          q: 'How do notifications work?',
          a: 'In-app notifications appear in the header bell. Email delivery depends on org notification lists in App Config and your profile preferences.'
        },
        {
          q: 'Can I approve from mobile?',
          a: 'Some approval types are mobile-friendly; complex reviews may redirect to the web app. Check your org\'s mobile rollout policy.'
        },
        {
          q: 'Why is my approval list empty?',
          a: 'You may have no pending items, lack approver role flags, or team scope filters exclude other teams\' requests.'
        },
        {
          q: 'What is the difference between Workspace and HRMS dashboard?',
          a: '<strong>Workspace</strong> focuses on cross-module tasks and approvals. <strong>HRMS dashboard</strong> emphasizes utilization, attendance, and personal HR KPIs.'
        },
        {
          q: 'How do I snooze or dismiss notifications?',
          a: 'Open the notification panel — mark read or follow the link to resolve the underlying item (approve, reject, or complete).'
        },
        {
          q: 'Where are notes, chat, and files shortcuts?',
          a: 'Icon rail on the left — quick access to shared notes, team chat, and file manager without opening a full module first.'
        }
      ]
    },
    {
      id: 'faq-leave',
      icon: '🌴',
      title: 'Leave management',
      items: [
        {
          q: 'Where do I request leave?',
          a: '<strong>People → Leave management</strong> (<code>/people/leaves</code>) — create a request with type, date range, and optional notes. Legacy bookmark <code>/hrms/leaves</code> redirects here. Some orgs also allow leave rows on the timesheet.'
        },
        {
          q: 'What leave types are available?',
          a: 'Configured in App Config <code>NONPROJECT</code> categories (annual, sick, holiday, etc.). Your HR admin maintains the list per org unit.'
        },
        {
          q: 'How do I check leave balance?',
          a: 'Leave Management summary or employee profile may show balance — depends on org policy and whether balances are tracked in your deployment.'
        },
        {
          q: 'Who approves leave requests?',
          a: 'Typically your manager or HR approver role. Workflow routes appear in Workspace → Approvals and the requester\'s leave list status.'
        },
        {
          q: 'Can I cancel a submitted leave request?',
          a: 'If status is still <strong>Pending</strong>, open the request and cancel or ask your approver to reject. Approved leave may require HR to adjust.'
        },
        {
          q: 'Why was my leave request rejected?',
          a: 'Common reasons: overlapping requests, insufficient balance, blackout period, or missing approver. Check comments on the request record.'
        },
        {
          q: 'How does leave appear on the timesheet?',
          a: 'Approved leave often maps to non-project categories on the weekly grid — hours may auto-fill or require manual entry per org rules.'
        },
        {
          q: 'Can I book leave for past dates?',
          a: 'Controlled by role flags <code>allowLeaveAndHolidayForPast</code> and <code>allowLeaveAndHolidayForFuture</code> in Application Configuration.'
        },
        {
          q: 'Half-day or hourly leave — supported?',
          a: 'Depends on org configuration and leave type. Use the hours field on the request or timesheet row if enabled.'
        },
        {
          q: 'Manager — how do I approve team leave?',
          a: '<strong>Workspace → Approvals</strong>, or <strong>People → Leave management</strong> filtered to your team. Approve or reject with an optional comment.'
        },
        {
          q: 'Where do I configure leave policies and holidays?',
          a: 'Use <strong>Admin → Leave admin → Global Policy Center</strong> for jurisdictions, templates, publish, and holiday calendar assignment. Set opening balances under <strong>Admin → Employee leave config</strong> (download <strong>OB template</strong>, dry-run import, or <strong>Adjust balance</strong>). Manage the holiday ledger under <strong>People → Holidays</strong>. Guides: <a href="../hrms/leave-configuration.html">Leave Configuration</a> · <a href="../hrms/leave-policies-guide.html">Leave Policies User Guide</a> (supported types &amp; configure tabs) · <a href="../hrms/leave-configuration.html#employee-balances">Employee balances</a>.'
        },
        {
          q: 'How do I import ZingHR / legacy leave opening balances?',
          a: 'On <strong>Admin → Employee leave config</strong>, click <strong>Download OB template</strong>, fill <code>entitlementAmount</code>/<code>amount</code> from your HR export (do not invent values), then call <code>POST /api/v2/admin/data-import/leave-balance?dryRun=true</code>. Fix <code>reportCsv</code> failures, then re-POST with <code>dryRun=false</code>. Scenario: <a href="../user-guide/admin/admin-leave-ob-bulk-import.html">Bulk import opening balances</a>.'
        },
        {
          q: 'Why do employees have zero leave balance after policy publish?',
          a: 'Publishing a Global Leave policy does not invent opening balances. Load balances via <strong>Employee leave config</strong> (template import or Adjust balance) or wait for the accrual schedule. Empty ledgers after cutover tooling-only deploy are expected until HR imports real data.'
        },
        {
          q: 'Why does leave day count skip a public holiday?',
          a: 'Working-day calculation excludes weekends and holidays from <code>fs_holiday_model</code> whose locations match the team’s assigned holiday calendar key. Publish Legal Calendars or create People holidays, then assign the key in Global Policy Center → Holiday calendars.'
        }
      ]
    },
    {
      id: 'faq-attendance',
      icon: '📍',
      title: 'Attendance & presence',
      items: [
        {
          q: 'Where is attendance tracked?',
          a: '<strong>HRMS → Attendance</strong> — check-in/out events, device punches, and daily presence summary for your team scope.'
        },
        {
          q: 'How is attendance different from timesheet?',
          a: '<strong>Attendance</strong> records presence (when you were at work). <strong>Timesheet</strong> records what you worked on (projects and hours).'
        },
        {
          q: 'Can I check in from mobile?',
          a: 'If mobile attendance is enabled for your org, use the mobile app check-in action — geo or device rules may apply.'
        },
        {
          q: 'Why is my attendance missing a day?',
          a: 'Forgot check-in, device offline, or exempt role. Contact HR to correct with audit justification.'
        },
        {
          q: 'What devices register for attendance?',
          a: '<strong>HRMS → Settings → Devices</strong> — admins register kiosks or mobile devices used for punch capture.'
        },
        {
          q: 'How do managers review team attendance?',
          a: 'Attendance list with team filter and date range — summary strip may show late, absent, or incomplete patterns.'
        },
        {
          q: 'Does attendance affect payroll?',
          a: 'In integrated deployments, attendance exceptions may feed payroll runs — confirm with your HR/payroll administrator.'
        },
        {
          q: 'Remote work — how is presence recorded?',
          a: 'Policy varies: timesheet-only, manual attendance, or honor system. Your org defines required signals in HRMS settings.'
        }
      ]
    },
    {
      id: 'faq-approval',
      icon: '✅',
      title: 'Timesheet approval & locking',
      items: [
        {
          q: 'Where do managers approve timesheets?',
          a: '<strong>HRMS → Timesheet Approval</strong> — review team weekly grids, approve, reject, or request corrections.'
        },
        {
          q: 'What is submit vs approve?',
          a: '<strong>Submit</strong> — employee finalizes their week. <strong>Approve</strong> — manager (or delegate) confirms hours for billing and payroll.'
        },
        {
          q: 'Can I approve partial weeks?',
          a: 'Depends on workflow — some orgs require full-week approval; others allow day-level review. Check status chips on the approval register.'
        },
        {
          q: 'What happens after approval?',
          a: 'Hours become eligible for invoice pools and utilization reports. Reopening may require admin or payroll role.'
        },
        {
          q: 'How do I reject a timesheet?',
          a: 'Open the employee week in Timesheet Approval → <strong>Reject</strong> with a comment. Employee edits and resubmits.'
        },
        {
          q: 'What is timesheet lock?',
          a: 'Payroll or admin <strong>locks</strong> a period so no further edits occur — often after month-end close (<code>disableLastMonthAfterXDays</code>).'
        },
        {
          q: 'Can I switch employees on the approval screen?',
          a: 'Requires <code>timeSheet.switchEmployeesEnabled</code> on your manager role — lets you review direct reports from one grid.'
        },
        {
          q: 'Why can\'t I approve my own timesheet?',
          a: 'Separation of duties — submitters cannot approve their own hours unless a special role exception exists.'
        },
        {
          q: 'Bulk approve — is it supported?',
          a: 'Some registers support multi-select approve for a team/week. Verify totals before bulk actions — mistakes affect billing.'
        },
        {
          q: 'Approval notifications — where?',
          a: 'Approvers receive in-app and optional email alerts when team members submit. Configure distribution in App Config notification lists.'
        }
      ]
    },
    {
      id: 'faq-audit',
      icon: '📜',
      title: 'Audit trail & activity history',
      items: [
        {
          q: 'Where is the unified audit trail?',
          a: '<strong>HRMS → Audit Trail</strong> — searchable history of creates, updates, status changes, and logins within your permission scope.'
        },
        {
          q: 'What events are logged?',
          a: 'Typical entries: employee profile edits, timesheet changes, invoice status, project updates, config saves, and authentication events.'
        },
        {
          q: 'How do I filter audit records?',
          a: 'Use date range, actor, entity type, and text filter on the register. Team scope limits rows to your org visibility.'
        },
        {
          q: 'Who can see audit trail?',
          a: 'HR admins, compliance roles, and workspace administrators — controlled by module and list permissions on the role template.'
        },
        {
          q: 'Is audit trail the same as Project Task Activity?',
          a: '<strong>Task Activity</strong> is delivery-focused (deliverables/work items). <strong>Audit Trail</strong> is cross-module compliance history.'
        },
        {
          q: 'How long is audit data retained?',
          a: 'Retention is deployment-specific — consult your administrator for archive and export policy.'
        },
        {
          q: 'Can I export audit logs?',
          a: 'Use list export if your role includes export permission — common for compliance reviews.'
        },
        {
          q: 'Why can\'t I find a specific change?',
          a: 'Actor may be a system job, timestamp outside your filter, or the change occurred on an entity your role cannot list.'
        }
      ]
    },
    {
      id: 'faq-people',
      icon: '👔',
      title: 'People ops & lifecycle',
      items: [
        {
          q: 'What is People Ops in Tracopus?',
          a: 'Onboarding, offboarding, policies, and <strong>Employee 360</strong> views — complements core HRMS employee records.'
        },
        {
          q: 'Where is the onboarding checklist?',
          a: 'People Ops module (Scenario Guide → People) — tasks for IT, HR, and manager steps when a new hire starts.'
        },
        {
          q: 'How do I offboard an employee?',
          a: 'Deactivate status on employee profile, revoke devices, reassign open tasks, and archive access — follow your org offboarding scenario.'
        },
        {
          q: 'What is Employee 360?',
          a: 'Consolidated view: profile, skills, utilization, leave, timesheet health, and project assignments for workforce planning.'
        },
        {
          q: 'Where are HR policies stored?',
          a: 'People Ops policy library or linked documents — version and acknowledgment tracking depends on org setup.'
        },
        {
          q: 'How do skills feed staffing?',
          a: 'Profile skills (from App Config <code>skills</code>) align with Resource Intelligence searches for bench and project staffing.'
        },
        {
          q: 'Can employees update their own emergency contacts?',
          a: 'Yes on self-service profile tabs — HR-controlled fields (department, band) remain admin-only.'
        },
        {
          q: 'What triggers a welcome email?',
          a: 'Employee create wizard completion with active status — activation link at <code>/user/activateaccount/…</code>.'
        },
        {
          q: 'How do I transfer an employee to another team?',
          a: 'HR edits org assignment on profile or wizard — permissions inherit from the new org unit\'s role bar mapping.'
        },
        {
          q: 'People Ops vs HRMS Employees — difference?',
          a: '<strong>Employees</strong> is the system of record list. <strong>People Ops</strong> adds lifecycle workflows and 360 analytics on top.'
        }
      ]
    },
    {
      id: 'faq-payroll',
      icon: '💰',
      title: 'Payroll & compensation',
      items: [
        {
          q: 'Where is payroll managed?',
          a: 'Payroll module (if enabled): salary structures, pay runs, and paycheck preview — often restricted to HR/finance roles.'
        },
        {
          q: 'How do timesheets feed payroll?',
          a: 'Approved hours export or sync into pay period calculations — integration depth varies by deployment.'
        },
        {
          q: 'What is a pay run?',
          a: 'Batch process that computes gross/net pay for a period from attendance, timesheet, and salary structure rules.'
        },
        {
          q: 'Who can view salary details?',
          a: 'Highly restricted — typically HR payroll admin. Employees may see payslips only if self-service is enabled.'
        },
        {
          q: 'Payroll vs invoicing — difference?',
          a: '<strong>Invoicing</strong> bills clients for billable work. <strong>Payroll</strong> pays employees — different periods, rates, and approvals.'
        },
        {
          q: 'Why are payroll hours different from timesheet?',
          a: 'Payroll may use rounded units, exclude certain non-project categories, or apply separate approval lock — reconcile in pay run preview.'
        },
        {
          q: 'Can I rerun a failed pay run?',
          a: 'Payroll admins reverse or regenerate per org policy — document adjustments in audit trail.'
        },
        {
          q: 'Is payroll available on mobile?',
          a: 'No — use desktop HRMS/payroll screens for pay runs and structure edits.'
        }
      ]
    },
    {
      id: 'faq-resources',
      icon: '📈',
      title: 'Resource intelligence & staffing',
      items: [
        {
          q: 'What is Resource Intelligence?',
          a: 'Skills inventory, bench reporting, staffing recommendations, and utilization analytics across the workforce.'
        },
        {
          q: 'How do I find available people for a project?',
          a: 'Resource module search — filter by skill, practice, utilization band, and availability window.'
        },
        {
          q: 'What is bench reporting?',
          a: 'Lists consultants not fully allocated — helps sales and delivery managers staff new engagements.'
        },
        {
          q: 'How does team capacity relate to resources?',
          a: '<strong>Team Capacity</strong> (Project) is project-centric allocation. Resource Intelligence is org-wide skills and bench view.'
        },
        {
          q: 'Can I export a skills matrix?',
          a: 'Use register export if permitted — matrix reports may live under Analytics or Resource reports.'
        },
        {
          q: 'Why is utilization different on two screens?',
          a: 'Date range, billable definition, and team scope may differ — align filters before comparing HRMS dashboard vs resource reports.'
        },
        {
          q: 'How do I update skills for staffing accuracy?',
          a: 'Employee profile → Skills, or manager bulk updates — options from App Config <code>skills</code> and <code>practiceMap</code>.'
        },
        {
          q: 'Who owns resource planning?',
          a: 'Typically delivery managers and resource managers with cross-team scope — permissions on role template.'
        }
      ]
    },
    {
      id: 'faq-performance',
      icon: '⭐',
      title: 'Performance & goals',
      items: [
        {
          q: 'Where are performance reviews?',
          a: 'Performance module — review cycles, goals, and feedback collection when enabled for your org.'
        },
        {
          q: 'How do I set goals for my team?',
          a: 'Manager flow in Performance → Goals — align to review period and visibility rules.'
        },
        {
          q: 'Can employees submit self-assessments?',
          a: 'Yes when the review cycle includes self-assessment phase — notifications via Workspace.'
        },
        {
          q: 'How does feedback link to projects?',
          a: 'Project Feedback captures delivery input; Performance module handles HR review cycles — complementary, not duplicate.'
        },
        {
          q: 'Who configures review cycles?',
          a: 'HR admin — templates, rating scales, and participant lists per org policy.'
        },
        {
          q: 'Are performance ratings visible on Employee 360?',
          a: 'Summary may appear for managers with permission — detailed history restricted to HR and line management chain.'
        }
      ]
    },
    {
      id: 'cfg-faq-roles',
      icon: '🔐',
      title: 'App config · Roles & access control',
      items: [
        {
          q: 'Where is persona access configured — org.json or role.json?',
          a: '<strong>Role</strong> which personas a user may switch into: <code>role.json</code> → HRMS → <code>personaModules</code> (Admin → Roles). <strong>Org</strong> page→persona map and kill switches: <code>org.json</code> → HRMS → <code>personaNavigationAdditional</code> (Admin → Persona navigation). Product page defaults live in the sidebar catalog until you customize a path.'
        },
        {
          q: 'How do I use the simplified Persona navigation page?',
          a: 'Open <code>/admin/persona-navigation</code>. <strong>Turn off</strong> — chip toggles for personas/modules and a searchable page list. <strong>Page access</strong> — select one page, choose Product default or Custom, then toggle personas. Click <strong>Save changes</strong> once. Roles links here via the Organization access card.'
        },
        {
          q: 'What are the seed defaults for persona config?',
          a: '<code>org.json</code> seeds empty <code>pagePersonaMap</code> and empty <code>disabledPersonas</code> / <code>disabledPaths</code> / <code>disabledModules</code>. Site Admin <code>role.json</code> seeds all personas allowed, <code>defaultPersona: ADMIN</code>, <code>personaSwitchEnabled: true</code>.'
        },
        {
          q: 'Do org kill switches override role persona access?',
          a: 'Yes. Evaluation order: role module flags → role <code>personaModules</code> → org <code>pagePersonaMap</code> (if set) → org <code>disabledPersonas</code> / <code>disabledPaths</code> / <code>disabledModules</code> (always win). Protected admin paths cannot be killed.'
        }
      ]
    },
    {
      id: 'faq-admin',
      icon: '🛠️',
      title: 'Administration & persona access',
      items: [
        {
          q: 'Where do I configure personas for a role?',
          a: '<strong>Admin → Roles &amp; permissions</strong> (<code>/admin/roles</code>). Persona access writes <code>role.json</code> → HRMS → <code>personaModules</code> (allowedPersonas, defaultPersona, personaSwitchEnabled).'
        },
        {
          q: 'Where do I turn pages or personas off for the whole org?',
          a: '<strong>Admin → Persona navigation</strong> (<code>/admin/persona-navigation</code>) — <em>Turn off</em> and <em>Page access</em> tabs. Saves <code>org.json</code> → HRMS → <code>personaNavigationAdditional</code>.'
        },
        {
          q: 'Is the default in org.json or role.json?',
          a: 'Both: org seeds empty <code>pagePersonaMap</code> and empty disable lists; Site Admin role seeds all personas with default ADMIN. Product page defaults come from the sidebar catalog until you customize a path.'
        },
        {
          q: 'Where is the Application Config documentation?',
          a: '<code>hrms/application-config.html</code> — cards for <code>personaNavigationAdditional</code> and <code>personaModules</code>, plus Admin &amp; Access chapter <code>admin.html#persona-access</code>.'
        }
      ]
    },
    {
      id: 'faq-integrations',
      icon: '🔗',
      title: 'Integrations & data exchange',
      items: [
        {
          q: 'What integrations does Tracopus support?',
          a: 'Common connectors: identity (Microsoft Entra), email, export to finance/ERP, and mobile push — exact set is deployment-specific.'
        },
        {
          q: 'Where do I check sync health?',
          a: 'Integrations module (if enabled) — last sync time, error queue, and field mappings.'
        },
        {
          q: 'How do I export timesheet data?',
          a: 'HRMS reports or list export — CSV/Excel for payroll or external BI. Permissions required.'
        },
        {
          q: 'Can invoices export to accounting software?',
          a: 'Finance integrations may push approved invoices — coordinate file format and GL mapping with your administrator.'
        },
        {
          q: 'SSO — which provider?',
          a: 'Microsoft Entra ID (Azure AD) is the primary SSO path documented in login scenarios and FAQ.'
        },
        {
          q: 'API access for custom integrations?',
          a: 'Contact your workspace administrator — API keys, scopes, and rate limits are tenant-controlled.'
        }
      ]
    }
  ]
};
