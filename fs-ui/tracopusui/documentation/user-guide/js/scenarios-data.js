/**
 * Scenario-based user guide catalog.
 * Structure: module → feature → scenarios[] with steps.
 */
(function (global) {
  'use strict';

  global.SCENARIO_GUIDE = {
    meta: {
      title: 'Tracopus Scenario Guide',
      subtitle: 'Feature → Scenario → Steps',
      version: '1.0'
    },

    modules: {
      auth: {
        label: 'Authentication & Account',
        tagline: 'Sign in, activate, and manage credentials',
        icon: 'login',
        accent: '#6366f1',
        index: 'auth/index.html'
      },
      workspace: {
        label: 'Workspace',
        tagline: 'My work, approvals, and notifications',
        icon: 'dashboard',
        accent: '#8b5cf6',
        index: 'workspace/index.html'
      },
      hrms: {
        label: 'HRMS',
        tagline: 'Employees, time, attendance, and billing',
        icon: 'hrms',
        accent: '#10b981',
        index: 'hrms/index.html'
      },
      people: {
        label: 'People Ops',
        tagline: 'Onboarding, offboarding, policies, and Employee 360',
        icon: 'people',
        accent: '#14b8a6',
        index: 'people/index.html'
      },
      project: {
        label: 'Project Delivery',
        tagline: 'Projects, deliverables, tasks, and capacity',
        icon: 'project',
        accent: '#059669',
        index: 'project/index.html'
      },
      sales: {
        label: 'Sales & Contracts',
        tagline: 'Bid requests and purchase orders',
        icon: 'sales',
        accent: '#34d399',
        index: 'sales/index.html'
      },
      resources: {
        label: 'Resource Intelligence',
        tagline: 'Skills, staffing, bench, and utilization',
        icon: 'capacity',
        accent: '#0d9488',
        index: 'resources/index.html'
      },
      finance: {
        label: 'Finance',
        tagline: 'Invoices, billing, and expenses',
        icon: 'invoice',
        accent: '#d97706',
        index: 'finance/index.html'
      },
      payroll: {
        label: 'Payroll',
        tagline: 'Salary structures, runs, and paychecks',
        icon: 'invoice',
        accent: '#ca8a04',
        index: 'payroll/index.html'
      },
      performance: {
        label: 'Performance',
        tagline: 'Goals, reviews, feedback, and growth',
        icon: 'activity',
        accent: '#7c3aed',
        index: 'performance/index.html'
      },
      analytics: {
        label: 'Analytics',
        tagline: 'Dashboards, reports, and control tower',
        icon: 'chart',
        accent: '#2563eb',
        index: 'analytics/index.html'
      },
      integrations: {
        label: 'Integrations',
        tagline: 'Connectors, sync health, and mappings',
        icon: 'config',
        accent: '#475569',
        index: 'integrations/index.html'
      },
      ai: {
        label: 'AI Assist',
        tagline: 'Agent console and knowledge base',
        icon: 'sparkle',
        accent: '#a855f7',
        index: 'ai/index.html'
      },
      admin: {
        label: 'Administration',
        tagline: 'Roles, persona navigation, audit, and automation',
        icon: 'admin',
        accent: '#64748b',
        index: 'admin/index.html'
      },
      mobile: {
        label: 'Mobile App',
        tagline: 'Android companion workflows',
        icon: 'mobile',
        accent: '#a7f3d0',
        index: 'mobile/index.html'
      }
    },

    scenarios: [
      /* ── AUTH ── */
      {
        id: 'auth-login-email',
        module: 'auth',
        feature: 'Login',
        title: 'Sign in with email and password',
        route: '/user/login',
        roles: ['All users'],
        prerequisites: ['Valid Tracopus account with email/password credentials', 'HR has completed Access and Sign-in steps on your employee record'],
        steps: [
          'Open your workspace URL (e.g. https://your-org.tracopus.com).',
          'You are redirected to **Login** if not authenticated.',
          'Enter your **work email** in the email field.',
          'Enter your **password**.',
          'Click **Sign in**.',
          'On success you land on your default module (usually Workspace or Project dashboard).'
        ],
        outcome: 'You are logged in; session persists until logout or expiry.',
        tips: ['Use **Forgot password** if you cannot sign in.', 'Duplicate email accounts break SSO — contact HR if login fails after activation.'],
        related: ['auth-login-sso', 'auth-forgot-password']
      },
      {
        id: 'auth-login-sso',
        module: 'auth',
        feature: 'Login',
        title: 'Sign in with Microsoft Entra ID (SSO)',
        route: '/user/login',
        roles: ['All users with SSO enabled'],
        prerequisites: ['Microsoft work account linked to your Tracopus employee record'],
        steps: [
          'Go to **Login**.',
          'In the Microsoft section, click **Sign in with Microsoft**.',
          'Complete Microsoft authentication in the redirect window.',
          'Return to Tracopus — you are signed in automatically.'
        ],
        outcome: 'SSO session established; same permissions as email login.',
        tips: ['Mobile app uses the same SSO flow.', 'If SSO fails, verify your email matches the employee record exactly.'],
        related: ['auth-login-email', 'mobile-login']
      },
      {
        id: 'auth-forgot-password',
        module: 'auth',
        feature: 'Password recovery',
        title: 'Reset a forgotten password',
        route: '/user/forgotpassword',
        roles: ['All users'],
        prerequisites: ['Registered email on employee profile'],
        steps: [
          'From **Login**, click **Forgot password?**.',
          'Enter your registered **email address**.',
          'Submit the form.',
          'Check email for reset link (may take a few minutes).',
          'Open the link and set a **new password** meeting policy requirements.',
          'Return to **Login** and sign in with the new password.'
        ],
        outcome: 'Password updated; old password no longer works.',
        tips: ['Check spam folder.', 'Link expires — request a new reset if expired.'],
        related: ['auth-login-email', 'auth-change-password']
      },
      {
        id: 'auth-activate-account',
        module: 'auth',
        feature: 'Account activation',
        title: 'Activate a new account from invite link',
        route: '/user/activateaccount/:key/:employeeId/:uniqueId',
        roles: ['New hires'],
        prerequisites: ['Activation email from HR or system invite'],
        steps: [
          'Open the **activation link** from your invite email.',
          'Verify your identity details shown on screen.',
          'Set a **new password** (and confirm).',
          'Submit to complete activation.',
          'Sign in at **Login** with email + new password or SSO.'
        ],
        outcome: 'Account is active and can access Tracopus.',
        tips: ['Complete activation before first timesheet week.', 'Contact HR if the link is invalid or expired.'],
        related: ['hrms-create-employee', 'auth-login-email']
      },
      {
        id: 'auth-change-password',
        module: 'auth',
        feature: 'Security',
        title: 'Change password while logged in',
        route: '/user/changepassword',
        roles: ['All users'],
        prerequisites: ['Logged in or valid change-password link from admin'],
        steps: [
          'Open **Change password** from profile/security settings or the emailed link.',
          'Enter **current password** (if prompted).',
          'Enter **new password** twice.',
          'Submit — success message confirms update.',
          'Re-login if session was invalidated.'
        ],
        outcome: 'Password changed per org security policy.',
        tips: ['Forced password change may block other pages until complete.'],
        related: ['auth-forgot-password']
      },

      /* ── WORKSPACE ── */
      {
        id: 'workspace-my-work',
        module: 'workspace',
        feature: 'My Work',
        title: 'Review and action assigned work items',
        route: '/workspace/my-work',
        roles: ['Individual contributor', 'Manager'],
        prerequisites: ['Logged in', 'Assigned tasks or work items exist'],
        steps: [
          'Click **Workspace** in the icon rail.',
          'Open **My Work** from the left menu.',
          'Review the register: tasks, due dates, and status chips.',
          'Use **SHOW / SORT / Filter** to narrow by status or project.',
          'Click a row to open the task or work item detail.',
          'Update status, hours, or comments as needed and save.'
        ],
        outcome: 'Personal work queue reviewed and items updated.',
        tips: ['Pin frequently used filters.', 'Use global search for cross-project items.'],
        related: ['project-update-taskboard', 'workspace-approvals']
      },
      {
        id: 'workspace-approvals',
        module: 'workspace',
        feature: 'Approvals',
        title: 'Process pending approvals from universal inbox',
        route: '/workspace/approvals',
        roles: ['Manager', 'Delegate', 'HR admin'],
        prerequisites: ['Approval permissions for timesheet, leave, attendance, or other domains'],
        steps: [
          'Navigate to **Workspace → Approvals**.',
          'Review pending items grouped by type (timesheet, leave, attendance, etc.).',
          'Open an item to see detail, employee context, and audit history.',
          'Choose **Approve** or **Reject** (add comment if required).',
          'Repeat until inbox is clear or delegate per policy.'
        ],
        outcome: 'Approval decision recorded; employee notified per org settings.',
        tips: ['Acting-as-delegate shows in audit metadata.', 'Rejections may require employee resubmission.'],
        related: ['hrms-approve-timesheet', 'hrms-approve-leave', 'hrms-approve-attendance']
      },
      {
        id: 'workspace-notifications',
        module: 'workspace',
        feature: 'Notifications',
        title: 'Manage notifications and alerts',
        route: '/workspace/notifications',
        roles: ['All users'],
        prerequisites: ['Logged in'],
        steps: [
          'Open **Workspace → Notifications** (or bell icon in shell).',
          'Scan unread items — project updates, approvals, mentions.',
          'Click a notification to jump to the related record.',
          'Mark items read or dismiss as supported.',
          'Adjust notification preferences under **Profile → Notifications** if needed.'
        ],
        outcome: 'Notification queue managed; deep links opened relevant records.',
        tips: ['Enable email digests in profile settings for critical alerts.'],
        related: ['workspace-approvals']
      },

      /* ── HRMS ── */
      {
        id: 'hrms-create-employee',
        module: 'hrms',
        feature: 'Employees',
        title: 'Create a new employee',
        route: '/hrms/employees or /people/employees',
        roles: ['HR administrator'],
        prerequisites: ['Create permission on Employees', 'Org teams and roles configured in Application Config'],
        steps: [
          'Go to **HRMS → Employees** (or **People → Employees**).',
          'Click **Create** in the list header.',
          'Choose **Wizard** (recommended) in the create panel.',
          '**Step 1 — Profile:** Enter name, email, employment type, and date of join. Click **Next**.',
          '**Step 2 — Access:** Select primary **team** and **role template**. Click **Next**.',
          '**Step 3 — Sign-in:** Configure login method (FS password and/or SSO). Send activation invite if applicable. Click **Next**.',
          '**Step 4 — Organization:** Set department, designation, band, reporting manager, and additional teams. Click **Next**.',
          '**Step 5 — Skills:** Tag skills and certifications. Click **Submit**.',
          'Verify the new employee appears in the register with **Active** status.',
          'Optional: open the profile to confirm access and notification settings.'
        ],
        outcome: 'Employee record created; user can be activated to log in.',
        tips: ['Search before create to avoid duplicate emails.', 'Complete Access + Sign-in or the employee cannot log in.', 'Use quick form only for minimal records.'],
        related: ['auth-activate-account', 'hrms-deactivate-employee', 'hrms-edit-employee']
      },
      {
        id: 'hrms-edit-employee',
        module: 'hrms',
        feature: 'Employees',
        title: 'Edit an employee profile',
        route: '/hrms/profile/:employeeId or /people/employees/:employeeId',
        roles: ['HR admin', 'Manager (limited fields)'],
        prerequisites: ['Edit permission on employee', 'Employee exists in directory'],
        steps: [
          'Open **Employees** and find the person (filter/search).',
          'Click the row to open **Employee profile**.',
          'Use tabs: **Personal**, **Organization**, **Skills**, **Access**, **Security**, **Leave**, **Activity**.',
          'Click **Edit** on the relevant section or use inline controls.',
          'Update fields and **Save**.',
          'Review **Profile history** tab for audit trail (when audit UI enabled).'
        ],
        outcome: 'Profile updated; changes visible on next register refresh.',
        tips: ['Managers may only edit skills/team per policy.', 'Security tab controls MFA and platform access.'],
        related: ['hrms-create-employee', 'people-employee-360']
      },
      {
        id: 'hrms-deactivate-employee',
        module: 'hrms',
        feature: 'Employees',
        title: 'Deactivate an employee (offboard access)',
        route: '/hrms/employees',
        roles: ['HR administrator'],
        prerequisites: ['Edit/archive permission', 'Open timesheets and approvals resolved'],
        steps: [
          'Open the employee **profile** from the directory.',
          'Set employment status to **Inactive** (or use archive action if permitted).',
          'In **Security / Access**, revoke platform login and SSO.',
          'Confirm no **open timesheet weeks** pending submission.',
          'Reassign owned projects/tasks if required.',
          'Save — employee remains in directory under Inactive filter for audit.'
        ],
        outcome: 'Access revoked; historical data retained.',
        tips: ['Prefer Inactive over delete.', 'Use People → Offboarding for structured checklists when enabled.'],
        related: ['people-start-offboarding', 'hrms-create-employee']
      },
      {
        id: 'hrms-log-timesheet',
        module: 'hrms',
        feature: 'Timesheet',
        title: 'Log weekly hours on timesheet',
        route: '/hrms/timesheet',
        roles: ['Individual contributor', 'Manager (for self)'],
        prerequisites: ['Timesheet module enabled', 'Assigned projects/deliverables for billable rows'],
        steps: [
          'Go to **HRMS → Timesheet**.',
          'Select **employee** (defaults to you) and **week** using week navigation.',
          'For each day, add rows: choose **project**, **deliverable** (if required), and **hours**.',
          'Mark rows **billable** or **non-billable** / leave category as applicable.',
          'Use validation hints to fix missing project or over-allocation.',
          'Click **Save** (or auto-save if enabled).',
          'If approval workflow is on, proceed to **Submit** scenario when week is complete.'
        ],
        outcome: 'Hours saved for the selected week.',
        tips: ['Sync external leave if integration enabled.', 'Locked weeks cannot be edited — contact manager.'],
        related: ['hrms-submit-timesheet', 'mobile-log-timesheet']
      },
      {
        id: 'hrms-submit-timesheet',
        module: 'hrms',
        feature: 'Timesheet',
        title: 'Submit timesheet week for manager approval',
        route: '/hrms/timesheet',
        roles: ['Individual contributor'],
        prerequisites: ['timesheetApprovalEnabled org flag', 'Week fully logged and validated'],
        steps: [
          'Open **Timesheet** for the target week.',
          'Resolve all validation errors (red hints).',
          'Click **Submit for approval**.',
          'Confirm submission — status changes to **Submitted**.',
          'Monitor manager decision in timesheet header or notifications.',
          'If rejected, fix conflicts and resubmit.'
        ],
        outcome: 'Week enters approval queue; manager/delegate notified.',
        tips: ['Payroll lock after approval prevents edits.', 'Resolve conflicts before manager can approve.'],
        related: ['hrms-approve-timesheet', 'hrms-log-timesheet']
      },
      {
        id: 'hrms-approve-timesheet',
        module: 'hrms',
        feature: 'Timesheet',
        title: 'Approve or reject a submitted timesheet',
        route: '/hrms/timesheet',
        roles: ['Manager', 'Delegate'],
        prerequisites: ['timesheetApprovalEnabled', 'Pending submissions in team scope'],
        steps: [
          'Open **Timesheet** or **Workspace → Approvals**.',
          'Locate **Pending approvals** panel.',
          'Select employee and week submitted.',
          'Review hours by project/deliverable; check conflicts.',
          'Click **Approve** or **Reject** with optional comment.',
          'For payroll lock (if enabled), confirm lock after final approval.'
        ],
        outcome: 'Timesheet approved/rejected; employee notified.',
        tips: ['Delegate actions show acting-for metadata in audit.', 'Reopen requires payroll admin permission when locked.'],
        related: ['hrms-submit-timesheet', 'workspace-approvals']
      },
      {
        id: 'hrms-apply-leave',
        module: 'hrms',
        feature: 'Leave management',
        title: 'Apply for leave',
        route: '/hrms/leaves',
        roles: ['Individual contributor'],
        prerequisites: ['leaveManagementEnabled org flag', 'Leave balances configured'],
        steps: [
          'Navigate to **HRMS → Leave management**.',
          'Click **Apply leave** or **New request**.',
          'Select **leave type**, **from date**, **to date**, and partial-day if needed.',
          'Enter reason (may be redacted in audit per policy).',
          'Review balance and overlap warnings.',
          'Submit — status becomes **Pending**.',
          'Track approval in the same page or notifications.'
        ],
        outcome: 'Leave request submitted; on approval promotes to work items/calendar.',
        tips: ['Check manager delegate if primary approver is away.', 'ZingHR sync may apply when native leave is off.'],
        related: ['hrms-approve-leave', 'admin-configure-global-leave', 'people-manage-holidays']
      },
      {
        id: 'hrms-approve-leave',
        module: 'hrms',
        feature: 'Leave management',
        title: 'Approve or reject leave request',
        route: '/hrms/leaves',
        roles: ['Manager', 'Delegate', 'HR'],
        prerequisites: ['leaveManagementEnabled', 'Pending leave in scope'],
        steps: [
          'Open **Leave management**.',
          'Review **Pending approvals** panel (or Workspace → Approvals).',
          'Open request — verify dates, balance, and team coverage.',
          'Click **Approve** or **Reject**.',
          'Approved leave appears on calendars and may create timesheet leave rows.'
        ],
        outcome: 'Leave decision recorded; balances updated.',
        tips: ['Overlap checks prevent duplicate approved leave.', 'Delegation inbox respects scope settings.'],
        related: ['hrms-apply-leave', 'workspace-approvals', 'admin-configure-global-leave']
      },
      {
        id: 'admin-configure-global-leave',
        module: 'admin',
        feature: 'Leave configuration',
        title: 'Configure Global Leave Policy Center',
        route: '/admin/leave/global-policy-center',
        roles: ['HR admin', 'Org administrator'],
        prerequisites: [
          'leaveManagementEnabled and globalLeavePoliciesEnabled org flags',
          'adminModules.globalLeavePoliciesEnabled on role'
        ],
        steps: [
          'Open **Admin → Leave admin → Global Policy Center** (or Documentation → Leave Configuration).',
          'Create or select a **jurisdiction**.',
          'Apply a **country template** into a draft team policy (or create a blank draft).',
          'Edit type entitlements / accrual rules on the draft version.',
          'Run **Simulate** or employee preview for a sample employee.',
          'Assign a **holiday calendar key** (matching People → Holidays locations).',
          '**Publish** the version (complete Policy Test Lab gate if required).',
          'Open **Employee leave config** and set opening balances.',
          'Verify an employee leave request spanning a holiday excludes that day from day count.'
        ],
        outcome: 'Published leave policy active; holidays assigned; balances ready for apply/approve.',
        tips: [
          'See screen doc: /documentation/hrms/leave-configuration.html',
          'Use Types & fallback for classic leave type catalog when needed.',
          'Legal Calendars publish syncs blocking holidays into People → Holidays.'
        ],
        related: ['hrms-apply-leave', 'people-manage-holidays', 'admin-employee-leave-config', 'admin-delegation-rules']
      },
      {
        id: 'admin-employee-leave-config',
        module: 'admin',
        feature: 'Leave configuration',
        title: 'Set employee leave opening balances',
        route: '/admin/employee-leave-config',
        roles: ['HR admin', 'Admin'],
        prerequisites: ['leaveManagementEnabled', 'leavePoliciesEnabled or globalLeavePoliciesEnabled'],
        steps: [
          'Navigate to **Admin → Employee leave config**.',
          'Select team (if multi-team) and choose an employee.',
          'Review balance cards by leave type.',
          'Post an **opening balance** or adjustment with a reason.',
          'Confirm remaining balance updates.',
          'Optionally open Leave Configuration documentation from Global Policy Center for the full checklist.'
        ],
        outcome: 'Employee has usable balances for leave apply.',
        tips: ['Accrual scheduler continues after opening balances.', 'Audit trail records adjustments when audit is on.'],
        related: ['admin-configure-global-leave', 'hrms-apply-leave']
      },
      {
        id: 'admin-publish-legal-holiday-calendar',
        module: 'admin',
        feature: 'Leave configuration',
        title: 'Publish legal holiday calendar to People holidays',
        route: '/admin/leave/legal-calendars',
        roles: ['HR admin', 'Admin'],
        prerequisites: ['leaveManagementEnabled', 'Legal calendars admin access'],
        steps: [
          'Open **Admin → Leave → Legal calendars**.',
          'Create a **draft** calendar with holiday calendar key (e.g. IN-KA).',
          'Add blocking holiday entries (date + name); mark optional festivals as optional.',
          'Preview impact, then **Publish selected**.',
          'Confirm holidays appear under **People → Holidays** with matching location.',
          'Confirm leave day counting excludes those dates for assigned teams.'
        ],
        outcome: 'Official holidays synced to fs_holiday_model and leave runtime.',
        tips: ['Optional holidays are not synced.', 'Assign calendar key in Global Policy Center → Holiday calendars.'],
        related: ['people-manage-holidays', 'admin-configure-global-leave', 'hrms-apply-leave']
      },
      {
        id: 'hrms-mark-attendance',
        module: 'hrms',
        feature: 'Attendance',
        title: 'Mark or correct attendance',
        route: '/hrms/attendance',
        roles: ['HR admin', 'Manager'],
        prerequisites: ['Attendance module enabled', 'Edit permission on attendance'],
        steps: [
          'Go to **HRMS → Attendance**.',
          'Select **month** and filter by org unit/team if needed.',
          'Locate employee row and day cell in the matrix.',
          'Click cell to set status (Present, Absent, Leave, WFH, etc.).',
          'Save changes — cell updates immediately.',
          'Export month matrix if audit copy required.'
        ],
        outcome: 'Attendance recorded for selected day(s).',
        tips: ['Regularization may require separate employee request + approval.', 'Bulk export available per role.'],
        related: ['hrms-approve-attendance']
      },
      {
        id: 'hrms-approve-attendance',
        module: 'hrms',
        feature: 'Attendance',
        title: 'Approve attendance regularization',
        route: '/hrms/attendance',
        roles: ['Manager', 'Delegate'],
        prerequisites: ['Pending regularization requests'],
        steps: [
          'Open **Attendance**.',
          'Expand **Pending approvals** panel.',
          'Review employee request, dates, and reason.',
          'Approve to apply corrected cells, or reject with comment.',
          'Verify matrix reflects approved changes.'
        ],
        outcome: 'Regularization applied or rejected with audit trail.',
        tips: ['Acting-for delegate shown in approval metadata.'],
        related: ['hrms-mark-attendance', 'workspace-approvals']
      },
      {
        id: 'hrms-create-invoice',
        module: 'hrms',
        feature: 'Invoices',
        title: 'Create a client invoice',
        route: '/hrms/invoice',
        roles: ['Finance admin', 'Billing role'],
        prerequisites: ['Invoice create permission', 'Projects/POs linked for line items'],
        steps: [
          'Navigate to **HRMS → Invoices**.',
          'Click **Create invoice**.',
          'Select **account/client**, billing period, and currency.',
          'Add **line items** — link projects, deliverables, or PO references.',
          'Enter quantities, rates, and tax as configured.',
          'Review totals in summary panel.',
          'Save as draft or **Submit/Finalize** per workflow.',
          'Open invoice detail to **generate PDF** or send.'
        ],
        outcome: 'Invoice created and available in register.',
        tips: ['Link PO when mandatory mode enabled on projects.', 'Share document route available for external clients.'],
        related: ['finance-view-invoice', 'project-create-project']
      },
      {
        id: 'hrms-app-config',
        module: 'hrms',
        feature: 'Application configuration',
        title: 'Configure org settings and permissions',
        route: '/hrms/appconfig',
        roles: ['Org administrator'],
        prerequisites: ['Application config access'],
        steps: [
          'Go to **HRMS → Application configuration**.',
          'Select **org unit** in the tree (root or child team).',
          'Choose tab: **Modules**, **Permissions**, **Org data**, or **Settings**.',
          'Toggle module flags (e.g. leaveManagementEnabled, timesheetApprovalEnabled).',
          'Edit role templates and CRUD matrices as needed.',
          'Use **inherit / override / lock** controls for child teams.',
          'Save — changes apply to users on next login or config refresh.'
        ],
        outcome: 'Org behavior and access updated without code deploy.',
        tips: ['Test flags in pilot team before root override.', 'See HRMS combined release runbook for flagged workflows.'],
        related: ['admin-role-permissions', 'admin-feature-flags']
      },

      /* ── PEOPLE ── */
      {
        id: 'people-start-onboarding',
        module: 'people',
        feature: 'Onboarding',
        title: 'Start an onboarding case for a new hire',
        route: '/people/onboarding',
        roles: ['HR admin', 'People ops'],
        prerequisites: ['onboardingEnabled', 'Employee record exists', 'Template configured'],
        steps: [
          'Open **People → Onboarding**.',
          'Click **New case** or **Start onboarding**.',
          'Select **employee** and **onboarding template**.',
          'Set start date and assign owners for task groups.',
          'Submit — case appears in register with progress %.',
          'Open case detail to track tasks and deadlines.'
        ],
        outcome: 'Onboarding case active with assigned checklist tasks.',
        tips: ['Complete employee create first.', 'Use templates for repeatable role-based checklists.'],
        related: ['hrms-create-employee', 'people-complete-onboarding-tasks']
      },
      {
        id: 'people-complete-onboarding-tasks',
        module: 'people',
        feature: 'Onboarding',
        title: 'Complete onboarding tasks (HR or new hire)',
        route: '/people/onboarding/my-tasks or /people/onboarding/:caseId',
        roles: ['New hire', 'HR', 'IT'],
        prerequisites: ['Active onboarding case with assigned tasks'],
        steps: [
          'New hire: open **People → My onboarding**.',
          'HR: open the **case detail** from onboarding register.',
          'Review task list grouped by phase (IT, HR, manager).',
          'Mark each task **Complete** with evidence/notes if required.',
          'Upload documents where task type requires attachments.',
          'When all mandatory tasks done, close case or trigger auto-complete.'
        ],
        outcome: 'Onboarding progress updated; hire ready for production access.',
        tips: ['Overdue tasks appear in manager dashboards.', 'Link to policy acknowledgment tasks when enabled.'],
        related: ['people-start-onboarding', 'people-acknowledge-policy']
      },
      {
        id: 'people-start-offboarding',
        module: 'people',
        feature: 'Offboarding',
        title: 'Start an offboarding case',
        route: '/people/offboarding',
        roles: ['HR admin'],
        prerequisites: ['offboardingEnabled', 'Employee active'],
        steps: [
          'Navigate to **People → Offboarding**.',
          'Click **New case**.',
          'Select departing **employee** and **offboarding template**.',
          'Set last working day and asset return dates.',
          'Assign IT, HR, and manager tasks.',
          'Submit and monitor case until all tasks complete.'
        ],
        outcome: 'Structured offboarding checklist initiated.',
        tips: ['Coordinate with hrms-deactivate-employee for access revocation timing.'],
        related: ['hrms-deactivate-employee']
      },
      {
        id: 'people-employee-360',
        module: 'people',
        feature: 'Employee 360',
        title: 'View Employee 360 consolidated profile',
        route: '/people/employees/:employeeId/360',
        roles: ['Manager', 'HR', 'Executive (scoped)'],
        prerequisites: ['employee360Enabled', 'View permission on employee'],
        steps: [
          'Open **People → Employees** and select an employee.',
          'Click **360 view** or navigate to `/people/employees/{id}/360`.',
          'Review panels: profile, projects, utilization, leave, performance snippets.',
          'Use filters and date range on analytics sections.',
          'Drill into linked records (projects, timesheets) as permitted.'
        ],
        outcome: 'Holistic view of employee across modules.',
        tips: ['Masked fields depend on persona RBAC.', 'Export may be restricted for PII.'],
        related: ['hrms-edit-employee']
      },
      {
        id: 'people-acknowledge-policy',
        module: 'people',
        feature: 'Policy hub',
        title: 'Acknowledge an org policy',
        route: '/people/policies',
        roles: ['All employees'],
        prerequisites: ['Policy assigned to your org unit'],
        steps: [
          'Go to **People → Policy hub**.',
          'Find policies with **Acknowledgment required** badge.',
          'Open policy document and read content.',
          'Click **Acknowledge** (may require checkbox attestation).',
          'Confirmation recorded with timestamp in your profile/compliance log.'
        ],
        outcome: 'Policy acknowledgment stored for compliance audit.',
        tips: ['Overdue policies may appear in onboarding tasks.', 'HR can track completion in admin reports.'],
        related: ['people-complete-onboarding-tasks']
      },
      {
        id: 'people-manage-holidays',
        module: 'people',
        feature: 'Holidays',
        title: 'Manage org holiday calendar (V6H-EA02)',
        route: '/people/holidays',
        roles: ['HR admin'],
        status: 'Planned',
        prerequisites: ['isLeaveManagementEnabled()', 'HR admin persona'],
        steps: [
          'Navigate to **People → Holidays** (`/people/holidays`).',
          'Filter holidays by **year**, **org**, **team**, or **location**.',
          'Click **Add holiday** — enter date, name, and scope.',
          'Save — verify holiday appears in list.',
          'Optional: **Import** CSV calendar for bulk load.',
          'Verify **leave duration** excludes the new holiday when employee applies leave spanning that date.',
          'Confirm **timesheet/attendance** calendar marks the date as non-working.',
          'Employee persona: confirm **read-only** view (no create/edit).'
        ],
        outcome: 'Org holiday calendar updated; downstream leave, timesheet, attendance, and payroll readiness respect holidays.',
        tips: ['Holidays source from Application Config org calendar — not an isolated truth table.', 'Page ships in V6H S1 — planned until route/API/test evidence complete.'],
        related: ['hrms-apply-leave', 'payroll-create-run']
      },

      /* ── PROJECT ── */
      {
        id: 'project-create-project',
        module: 'project',
        feature: 'Projects',
        title: 'Create a new project',
        route: '/project/list',
        roles: ['Project manager', 'Delivery admin'],
        prerequisites: ['Create permission on projects', 'Account/PO available if mandatory'],
        steps: [
          'Navigate to **Project → Project list**.',
          'Click **Create** in the list header.',
          'In the create panel, select **Wizard** mode.',
          '**Step 1 — Project setup:** Link PO (if required), enter project name, code, type, estimated start/completion dates. **Next**.',
          '**Step 2 — Client & study:** Select account, client contacts, location, study/survey type. **Next**.',
          '**Step 3 — Service scope:** Choose categories and service lines; enter estimates if enabled. **Next**.',
          '**Step 4 — Fieldwork & sample:** Set region, sample size, LOI, currency, target audience. **Next**.',
          '**Step 5 — Compliance & summary:** PII flags, automation, narrative summary. **Next**.',
          '**Step 6 — Team & estimates:** Assign team, owner, lead, hours, cost estimates. **Next**.',
          '**Step 7 — Task access:** Restrict by teams, skills, or named employees if needed.',
          'Click **Submit** — project appears in list (often status NEW).',
          'Open **Project details** to add members, deliverables, and transition status.'
        ],
        outcome: 'Project created and visible in portfolio registers.',
        tips: ['Mandatory PO mode blocks submit without PO.', 'Duplicate project from row menu to clone structure.', 'Use Form mode for quick edits to existing projects.'],
        related: ['project-add-deliverable', 'sales-link-po-project', 'project-edit-project']
      },
      {
        id: 'project-edit-project',
        module: 'project',
        feature: 'Projects',
        title: 'Edit an existing project',
        route: '/project/details/:projectId',
        roles: ['Project manager', 'Editor role'],
        prerequisites: ['Edit permission on project'],
        steps: [
          'Open **Project list** and click the project row (or use search).',
          'On **Project details**, click **Edit** or open create panel in edit mode.',
          'Update fields across wizard steps or full form.',
          'Adjust team, estimates, or status if permitted.',
          'Save — dashboard and registers refresh.',
          'Review **Audit** tab for change history when audit UI enabled.'
        ],
        outcome: 'Project metadata and settings updated.',
        tips: ['Status transitions may be role-gated (e.g. COMPLETED → CLOSED).', 'Comments tab is separate from audit timeline.'],
        related: ['project-create-project']
      },
      {
        id: 'project-add-deliverable',
        module: 'project',
        feature: 'Deliverables',
        title: 'Add a deliverable to a project',
        route: '/project/deliverables/:projectId',
        roles: ['Project manager', 'Team lead'],
        prerequisites: ['Edit permission on project', 'Project exists'],
        steps: [
          'Open **Project details** → **Deliverables** tab or go to deliverables register.',
          'Click **Create deliverable**.',
          'Enter name, milestone dates, status, and category.',
          'Add estimates and service line breakdown if configured.',
          'Assign owners and dependencies.',
          'Save — deliverable appears in list and capacity views.'
        ],
        outcome: 'Deliverable created under project for work item planning.',
        tips: ['Deliverable dates drive calendar and Gantt views.', 'Link feedback requests at deliverable level when needed.'],
        related: ['project-create-work-item', 'project-create-project']
      },
      {
        id: 'project-create-work-item',
        module: 'project',
        feature: 'Work items',
        title: 'Create a work item (task/activity)',
        route: '/project/workitems/:projectId',
        roles: ['Project team member', 'Manager'],
        prerequisites: ['Create permission on work items', 'Deliverable exists (typical)'],
        steps: [
          'Navigate to **Work items** for the project or open from deliverable detail.',
          'Click **Create work item**.',
          'Select **deliverable**, category, assignee, and planned dates.',
          'Enter estimated hours and description.',
          'Save — item appears on taskboard and activity calendar.',
          'Optional: set status to To do / In progress immediately.'
        ],
        outcome: 'Work item available for execution and timesheet logging.',
        tips: ['Categories may be org-configured per service line.', 'Bulk create from templates where enabled.'],
        related: ['project-update-taskboard', 'hrms-log-timesheet']
      },
      {
        id: 'project-update-taskboard',
        module: 'project',
        feature: 'Taskboard',
        title: 'Move and update tasks on Kanban board',
        route: '/project/taskboard',
        roles: ['Project team'],
        prerequisites: ['Taskboard module enabled', 'Work items assigned'],
        steps: [
          'Open **Project → Taskboard**.',
          'Filter by project, assignee, or team if needed.',
          'Drag card across columns: **Planned → To do → In progress → Done**.',
          'Or click card to open detail — update status, hours, assignee.',
          'Save — WIP summaries and queue charts update.',
          'Log actual hours on timesheet for the same work item.'
        ],
        outcome: 'Task status reflects current delivery state.',
        tips: ['WIP limits may show warnings per column.', 'Status change permissions vary by role.'],
        related: ['project-create-work-item', 'workspace-my-work']
      },
      {
        id: 'project-team-capacity',
        module: 'project',
        feature: 'Team capacity',
        title: 'Plan team capacity and allocation',
        route: '/project/capacity',
        roles: ['Resource manager', 'Project manager'],
        prerequisites: ['Capacity module enabled'],
        steps: [
          'Go to **Project → Team capacity**.',
          'Review **Overview** gauges for utilization and overload signals.',
          'Open **Roster** tab — filter by team, skills, availability.',
          'Switch to **Timeline** to adjust allocations by week.',
          'Use **Gantt** view for employee vs work-item axis planning.',
          'Drag allocations or edit hours to resolve conflicts.',
          'Save changes — reflected in utilization reports.'
        ],
        outcome: 'Team load balanced across projects and weeks.',
        tips: ['Compare with Resources module skills matrix for staffing gaps.', 'Export allocation for leadership reviews.'],
        related: ['resources-staffing-request']
      },
      {
        id: 'project-run-report',
        module: 'project',
        feature: 'Reports',
        title: 'Run a delivery or utilization report',
        route: '/project/reports',
        roles: ['Manager', 'Finance', 'Analyst'],
        prerequisites: ['Reports module enabled for role'],
        steps: [
          'Navigate to **Project → Reports**.',
          'Browse report catalog (utilization, est vs actual, data dump, etc.).',
          'Select report and configure parameters: date range, team, project filter.',
          'Click **Run** or **Generate**.',
          'Preview results in browser or download CSV/Excel.',
          'Optional: schedule recurring email report if permitted.'
        ],
        outcome: 'Report generated for analysis or export.',
        tips: ['My Utilization vs Employee Utilization differ by scope.', 'Defaulter notifications may email on schedule.'],
        related: ['analytics-report-builder']
      },
      {
        id: 'project-global-search',
        module: 'project',
        feature: 'Search',
        title: 'Search across projects, tasks, and people',
        route: '/project/search or global search',
        roles: ['All users (scoped)'],
        prerequisites: ['Search module enabled'],
        steps: [
          'Click **Search** in shell or go to **Project → Global search**.',
          'Enter keywords — project name, task, file, person, note.',
          'Apply type filters (Projects, Tasks, Files, People, Notes).',
          'Open result to navigate to detail page.',
          'Refine query with quotes or additional terms.'
        ],
        outcome: 'Cross-module records found within access scope.',
        tips: ['Results respect team and RBAC masking.', 'Use for test scenario verification.'],
        related: ['workspace-my-work']
      },
      {
        id: 'project-submit-feedback',
        module: 'project',
        feature: 'Feedback',
        title: 'Submit stakeholder feedback on a project',
        route: '/project/feedback',
        roles: ['Project manager', 'Client liaison'],
        prerequisites: ['Feedback module enabled'],
        steps: [
          'Open **Project → Feedback** or project detail feedback section.',
          'Click **Request feedback** or **New submission**.',
          'Select project/deliverable and template.',
          'Fill structured questions and ratings.',
          'Submit — entry appears in feedback register and dumps.',
          'Share public feedback link if external stakeholder (document route).'
        ],
        outcome: 'Feedback captured for quality and reporting.',
        tips: ['Feedback dump report aggregates all submissions.', 'Anonymous mode depends on template config.'],
        related: ['project-add-deliverable']
      },

      /* ── SALES ── */
      {
        id: 'sales-create-bid',
        module: 'sales',
        feature: 'Bid requests',
        title: 'Create a bid request (sales opportunity)',
        route: '/sales/bidrequests',
        roles: ['Sales admin', 'BD manager'],
        prerequisites: ['Create permission on bids'],
        steps: [
          'Navigate to **Sales → Bid requests**.',
          'Click **Create**.',
          'Enter opportunity name, client, study type, geography, and medical verticals as applicable.',
          'Set pipeline **stage** and estimated value.',
          'Attach documents and demographics fields.',
          'Assign owner team and save.',
          'Track in register charts and open **Bid details** for updates.'
        ],
        outcome: 'Bid request in pipeline for triage and conversion.',
        tips: ['CRM sync indicator shows Salesforce link when configured.', 'Use filters and summary charts for pipeline reviews.'],
        related: ['sales-create-po', 'sales-edit-bid']
      },
      {
        id: 'sales-edit-bid',
        module: 'sales',
        feature: 'Bid requests',
        title: 'Update bid stage and details',
        route: '/sales/bidrequest/:id',
        roles: ['Sales owner', 'Sales admin'],
        prerequisites: ['Edit permission on bid'],
        steps: [
          'Open bid from **Bid requests** register.',
          'Edit fields on detail page or via edit sidebar.',
          'Advance **stage** (e.g. qualified → won/lost).',
          'Update documents and commercial estimates.',
          'Save — pipeline charts refresh.',
          'On win, proceed to create PO or project.'
        ],
        outcome: 'Bid record current; pipeline analytics updated.',
        tips: ['Lost bids retain history for post-mortem reports.'],
        related: ['sales-create-bid', 'sales-create-po']
      },
      {
        id: 'sales-create-po',
        module: 'sales',
        feature: 'Purchase orders',
        title: 'Create a purchase order (contract)',
        route: '/sales/purchaseorders',
        roles: ['Sales admin', 'Finance'],
        prerequisites: ['Create permission on POs'],
        steps: [
          'Go to **Sales → Purchase orders**.',
          'Click **Create** and choose **Wizard**.',
          '**Step 1 — Contract core:** Name, proposal number, dates, contract type. **Next**.',
          '**Step 2 — Client & account:** Account mapping, client contacts, service category. **Next**.',
          '**Step 3 — Delivery scope:** Sample, currency, commercial estimates. **Next**.',
          '**Step 4 — References & ownership:** PO number, bid link, Salesforce ID, owners. **Submit**.',
          'Verify PO in register and open **PO details** for linked projects tab.'
        ],
        outcome: 'Purchase order available to link to projects and invoices.',
        tips: ['Import from Salesforce when org toggle enabled.', 'PO mandatory mode requires link at project create.'],
        related: ['sales-link-po-project', 'project-create-project']
      },
      {
        id: 'sales-link-po-project',
        module: 'sales',
        feature: 'Purchase orders',
        title: 'Link a purchase order to a project',
        route: '/project/list or /sales/purchaseorder/:id',
        roles: ['Project manager', 'Sales admin'],
        prerequisites: ['PO and project exist', 'Edit permissions'],
        steps: [
          'Option A — at project create: select **purchase order** in Step 1 of project wizard.',
          'Option B — edit project: open create/edit panel and set **purchaseOrderId** / PO field.',
          'Option C — from PO details: open **Linked projects** tab and attach project.',
          'Save both sides — verify cross-links on project detail and PO detail.',
          'Confirm billing reports pick up PO reference.'
        ],
        outcome: 'Project financially tied to contract.',
        tips: ['Mandatory PO mode blocks project create without link.', 'Multiple projects may link to one PO per policy.'],
        related: ['project-create-project', 'sales-create-po']
      },
      {
        id: 'sales-import-po-salesforce',
        module: 'sales',
        feature: 'Purchase orders',
        title: 'Import purchase order from Salesforce',
        route: '/sales/purchaseorders',
        roles: ['Sales admin'],
        prerequisites: ['purchaseOrderImportFromSalesForceEnabled', 'Salesforce integration configured'],
        steps: [
          'Open **Purchase orders** register.',
          'Click **Import from Salesforce** (or equivalent action).',
          'Search by Salesforce ID or opportunity reference.',
          'Select record and map fields in preview.',
          'Confirm import — PO created or updated locally.',
          'Review sync indicator on PO details.'
        ],
        outcome: 'PO mirrored from CRM with Salesforce ID stored.',
        tips: ['Re-import may update existing PO by external ID.', 'Check integration sync health if import fails.'],
        related: ['integrations-sync-health', 'sales-create-po']
      },

      /* ── RESOURCES ── */
      {
        id: 'resources-staffing-request',
        module: 'resources',
        feature: 'Staffing requests',
        title: 'Raise a staffing request',
        route: '/resources/staffing-requests',
        roles: ['Project manager', 'Resource manager'],
        prerequisites: ['Staffing module enabled'],
        steps: [
          'Navigate to **Resources → Staffing requests**.',
          'Click **New request**.',
          'Specify project, skills needed, FTE/hours, and date range.',
          'Set priority and justification.',
          'Submit — request enters queue for resource managers.',
          'Track status and assigned candidates on detail page.'
        ],
        outcome: 'Staffing need logged for fulfillment.',
        tips: ['Cross-check skills matrix before submitting.', 'Link to bench candidates when available.'],
        related: ['resources-skills-matrix', 'project-team-capacity']
      },
      {
        id: 'resources-skills-matrix',
        module: 'resources',
        feature: 'Skills matrix',
        title: 'Review organization skills matrix',
        route: '/resources/skills-matrix',
        roles: ['Resource manager', 'HR'],
        prerequisites: ['Resources module enabled'],
        steps: [
          'Open **Resources → Skills matrix**.',
          'Filter by team, skill category, or proficiency.',
          'Identify gaps (low coverage cells) and surpluses.',
          'Click employee cell to open profile skills tab.',
          'Export matrix for staffing meetings.'
        ],
        outcome: 'Capability map understood for planning.',
        tips: ['Keep employee skills updated during onboarding.', 'Used by project task access restrictions.'],
        related: ['hrms-create-employee', 'resources-staffing-request']
      },

      /* ── FINANCE ── */
      {
        id: 'finance-view-invoice',
        module: 'finance',
        feature: 'Invoices',
        title: 'Review and share invoice document',
        route: '/hrms/invoice or /finance',
        roles: ['Finance', 'Client manager'],
        prerequisites: ['Invoice exists'],
        steps: [
          'Open **Invoices** register and filter by status/client.',
          'Click invoice row for **Invoice details**.',
          'Review line items, tax, and linked project/PO references.',
          'Generate or download **PDF**.',
          'Share document link with client if external sharing enabled.'
        ],
        outcome: 'Invoice verified and distributed.',
        tips: ['Document layout route may be public with token — follow security policy.'],
        related: ['hrms-create-invoice']
      },

      /* ── PAYROLL ── */
      {
        id: 'payroll-create-run',
        module: 'payroll',
        feature: 'Payroll runs',
        title: 'Create and process a payroll run',
        route: '/payroll/runs',
        roles: ['Payroll administrator'],
        prerequisites: ['Payroll module enabled', 'Salary structures assigned', 'Timesheets approved/locked'],
        steps: [
          'Go to **Payroll → Payroll runs**.',
          'Click **New run**.',
          'Select **pay period**, **payroll group**, and inclusion rules.',
          'Validate employee list and gross inputs from approved timesheets.',
          'Run calculation — review exceptions and adjustments.',
          'Submit for approval if workflow requires.',
          'Finalize run to generate paychecks.'
        ],
        outcome: 'Payroll run completed; paychecks available.',
        tips: ['Employee persona cannot access runs — verify RBAC.', 'Resolve timesheet lock conflicts first.'],
        related: ['payroll-view-paycheck', 'hrms-approve-timesheet']
      },
      {
        id: 'payroll-view-paycheck',
        module: 'payroll',
        feature: 'Paychecks',
        title: 'View my paycheck (employee self-service)',
        route: '/workspace/my-paychecks or /payroll/paychecks',
        roles: ['Employee'],
        prerequisites: ['Payroll processed for period'],
        steps: [
          'Open **Workspace → My paychecks** (or Payroll → Paychecks for admins).',
          'Select pay period.',
          'Review earnings, deductions, and net pay.',
          'Download payslip PDF if available.'
        ],
        outcome: 'Employee accesses payslip for period.',
        tips: ['Admins use Paychecks register for all employees.', 'Masking may hide compensation from managers.'],
        related: ['payroll-create-run']
      },
      {
        id: 'payroll-manage-deductions',
        module: 'payroll',
        feature: 'Deductions',
        title: 'Configure payroll deductions (V6H-EA03)',
        route: '/payroll/deductions',
        roles: ['Payroll manager', 'HR admin'],
        status: 'Planned',
        prerequisites: ['isPayrollManagementEnabled()', 'Payroll admin persona'],
        steps: [
          'Navigate to **Payroll → Deductions** (`/payroll/deductions`).',
          'Click **Create deduction type** — name, category, calculation rule.',
          'Assign to **employee** or **payroll group** with effective and expiry dates.',
          'Set **one-time** or **recurring** schedule.',
          'Open **payroll run preview** — verify deduction line appears.',
          'Finalize run — confirm **paycheck line item** shows deduction.',
          'On **locked run**: attempt edit — verify reversal required instead of destructive delete.'
        ],
        outcome: 'Deduction rules applied in payroll run and paycheck; audit trail on CRUD.',
        tips: ['Deductions are payroll child records — not duplicate employee finance truth.', 'Ships V6H S2.'],
        related: ['payroll-create-run', 'payroll-view-paycheck']
      },

      /* ── PERFORMANCE ── */
      {
        id: 'performance-set-goal',
        module: 'performance',
        feature: 'Goals',
        title: 'Set an employee performance goal',
        route: '/performance/goals',
        roles: ['Manager', 'Employee'],
        prerequisites: ['Performance module enabled'],
        steps: [
          'Navigate to **Performance → Goals**.',
          'Click **Create goal**.',
          'Define title, metric, target, and due date.',
          'Assign owner (self or direct report).',
          'Align to cycle or department objective if prompted.',
          'Save and track progress with check-ins.'
        ],
        outcome: 'Goal visible on performance dashboard.',
        tips: ['Employees may propose goals pending manager approval.'],
        related: ['performance-complete-review']
      },
      {
        id: 'performance-complete-review',
        module: 'performance',
        feature: 'Reviews',
        title: 'Complete a performance review cycle',
        route: '/performance/reviews',
        roles: ['Manager', 'Employee', 'HR'],
        prerequisites: ['Active review cycle configured'],
        steps: [
          'Open **Performance → Review cycles** and confirm active cycle.',
          'Employee: complete **self-assessment** by deadline.',
          'Manager: open direct report review, rate competencies, add comments.',
          'HR: monitor completion dashboard and send reminders.',
          'Finalize ratings — may feed calibration session.',
          'Employee acknowledges final review in portal.'
        ],
        outcome: 'Review cycle closed with documented ratings.',
        tips: ['Calibration page adjusts ratings post-manager submit.', 'Continuous feedback complements formal reviews.'],
        related: ['performance-set-goal']
      },

      /* ── ANALYTICS ── */
      {
        id: 'analytics-report-builder',
        module: 'analytics',
        feature: 'Report builder',
        title: 'Build a custom analytics report',
        route: '/analytics/report-builder',
        roles: ['Analyst', 'Admin'],
        prerequisites: ['Analytics module enabled'],
        steps: [
          'Go to **Analytics → Report builder**.',
          'Choose data domain (projects, people, finance, etc.).',
          'Add dimensions, metrics, and filters.',
          'Preview chart/table output.',
          'Save report definition.',
          'Optional: schedule delivery via **Scheduled reports**.'
        ],
        outcome: 'Reusable custom report saved.',
        tips: ['Compare with Project → Reports for operational catalogs.', 'Control tower shows portfolio KPIs.'],
        related: ['project-run-report', 'analytics-control-tower']
      },
      {
        id: 'analytics-control-tower',
        module: 'analytics',
        feature: 'Portfolio control tower',
        title: 'Monitor portfolio health in control tower',
        route: '/project/control-tower or /analytics',
        roles: ['Executive', 'PMO'],
        prerequisites: ['Control tower / analytics enabled'],
        steps: [
          'Open **Analytics hub** or **Portfolio control tower**.',
          'Review KPI tiles: health, risk, utilization, revenue at risk.',
          'Drill into failing projects or overdue milestones.',
          'Apply scenario filters (team, region, service line).',
          'Export snapshot for steering committee.'
        ],
        outcome: 'Portfolio risks and priorities identified.',
        tips: ['Scenario planning page supports what-if capacity.', 'Links to project governance (risks/issues).'],
        related: ['project-run-report']
      },
      {
        id: 'analytics-ai-insights',
        module: 'analytics',
        feature: 'AI insights',
        title: 'Review analytics AI insight cards (V6H-EA05)',
        route: '/analytics/ai-insights',
        roles: ['Executive', 'Manager', 'Admin'],
        status: 'Planned',
        prerequisites: ['Analytics + AI modules enabled', 'Scoped persona'],
        steps: [
          'Navigate to **Analytics → AI insights** (`/analytics/ai-insights`).',
          'Wait for insight cards to load from canonical composers.',
          'Filter by domain: project, people, payroll, finance, risk, resource, executive.',
          'Open an insight — verify **sourceEntityType**, **sourceEntityId**, confidence, and rationale.',
          'Drill into linked source entity (project, employee, etc.).',
          'Verify **sensitive fields masked** per persona policy.',
          'Mark insight **helpful / not helpful** for feedback loop.'
        ],
        outcome: 'Actionable AI insights with traceable source references — never treated as standalone truth.',
        tips: ['Cross-team insights blocked without scope.', 'Ships V6H S2.'],
        related: ['analytics-control-tower', 'ai-agent-query']
      },

      /* ── INTEGRATIONS ── */
      {
        id: 'integrations-configure',
        module: 'integrations',
        feature: 'Integration hub',
        title: 'Configure an integration connector',
        route: '/integrations',
        roles: ['Integration admin'],
        prerequisites: ['Admin access to integration hub'],
        steps: [
          'Navigate to **Integrations → Hub**.',
          'Browse marketplace or installed adapters.',
          'Select connector (Salesforce, ZingHR, Entra ID, etc.).',
          'Enter credentials and environment endpoints.',
          'Map fields on **Mapping** page.',
          'Run test sync and check **Sync health**.',
          'Enable scheduled jobs on **Jobs** tab.'
        ],
        outcome: 'Integration active with monitored sync.',
        tips: ['Check logs for failed batches.', 'ZingHR leave sync works alongside native leave when configured.'],
        related: ['integrations-sync-health', 'sales-import-po-salesforce']
      },
      {
        id: 'integrations-sync-health',
        module: 'integrations',
        feature: 'Sync health',
        title: 'Monitor integration sync health',
        route: '/integrations/sync-health',
        roles: ['Integration admin', 'Ops'],
        prerequisites: ['At least one integration configured'],
        steps: [
          'Open **Integrations → Sync health**.',
          'Review status cards per connector: last run, errors, lag.',
          'Drill into failed job for payload details.',
          'Retry job or fix mapping issue.',
          'Confirm green status before dependent workflows (PO import, leave sync).'
        ],
        outcome: 'Sync issues identified and resolved.',
        tips: ['Set up alerts for repeated failures.'],
        related: ['integrations-configure']
      },

      /* ── AI ── */
      {
        id: 'ai-agent-query',
        module: 'ai',
        feature: 'AI agent console',
        title: 'Ask the AI agent for workspace help',
        route: '/ai/console',
        roles: ['Users with AI access'],
        prerequisites: ['AI module enabled in environment'],
        steps: [
          'Open **AI → Agent console** (or Assist dock AI chat).',
          'Select domain context if prompted (HR, Project, etc.).',
          'Type natural language question or task.',
          'Review response with cited knowledge base articles.',
          'Follow suggested links to Tracopus pages or execute approved actions.',
          'Rate response to improve recommendations.'
        ],
        outcome: 'Guidance or action from AI assistant.',
        tips: ['Do not paste sensitive PII into prompts.', 'Knowledge base admin curates approved content.'],
        related: ['project-global-search']
      },
      {
        id: 'ai-audit-review',
        module: 'ai',
        feature: 'AI audit',
        title: 'Review AI decision audit trail (V6H-EA06)',
        route: '/ai/audit',
        roles: ['Admin', 'Security reviewer'],
        status: 'Planned',
        prerequisites: ['AI module enabled', 'Admin or security persona'],
        steps: [
          'Navigate to **AI → Audit** (`/ai/audit`).',
          'Filter by date range, user, module, source entity, risk level.',
          'Review run records — verify **masking applied** status.',
          'Confirm **no raw sensitive prompt text** in list or detail.',
          'Drill to **source entity** reference on each record.',
          'Export **masked CSV** for compliance review.',
          'Verify unauthorized persona receives 403.'
        ],
        outcome: 'Controlled AI audit review with masked exports and source traceability.',
        tips: ['Audit records are read-state metadata — not raw prompt storage.', 'Ships V6H S3.'],
        related: ['admin-audit-review', 'ai-agent-query']
      },

      /* ── ADMIN ── */
      {
        id: 'admin-role-permissions',
        module: 'admin',
        feature: 'Roles & permissions',
        title: 'Configure role persona access and permissions',
        route: '/admin/roles',
        roles: ['Org administrator'],
        prerequisites: ['Admin access', 'rbacAdminEnabled + rolesEnabled'],
        steps: [
          'Open **Admin → Roles & permissions**.',
          'Select a role from the register.',
          'Under **Persona access**, enable/disable personas for that role (`personaModules` in role.json).',
          'Expand a persona to preview pages; toggles write the shared org **pagePersonaMap**.',
          'Use **Organization access** card → **Open simple editor** for org-wide offs (Persona navigation).',
          'Open **Advanced** only when you need the full module permission matrix.',
          'Ask a test user to re-login and verify the persona switcher and menus.'
        ],
        outcome: 'Role persona list and optional page map updates saved; module flags under Advanced when needed.',
        tips: [
          'Org kill switches are not edited on Roles — use Persona navigation.',
          'If personaModules was never saved, personas show as Automatic (module-flag heuristic).'
        ],
        related: ['admin-persona-navigation', 'hrms-app-config', 'admin-feature-flags']
      },
      {
        id: 'admin-persona-navigation',
        module: 'admin',
        feature: 'Persona navigation',
        title: 'Turn off org access or customize page personas',
        route: '/admin/persona-navigation',
        roles: ['Org administrator'],
        prerequisites: ['personaNavigationEnabled or Roles enabled for your admin role'],
        steps: [
          'Open **Admin → Persona navigation**.',
          'On **Turn off**, toggle personas or modules Off for everyone, or search and turn individual pages Off.',
          'On **Page access**, select one page from the list.',
          'Choose **Product default** (sidebar catalog) or **Custom**, then toggle which personas can open it.',
          'Click **Save changes** once (writes org.json `personaNavigationAdditional`).',
          'Verify with a non-admin test account: killed personas/pages stay hidden after refresh.'
        ],
        outcome: 'Org pagePersonaMap and/or disable lists updated in Application Config.',
        tips: [
          'Empty pagePersonaMap means product catalog defaults.',
          'Roles, Persona navigation, App Config, and Setup checklist cannot be killed.'
        ],
        related: ['admin-role-permissions', 'hrms-app-config']
      },
      {
        id: 'admin-delegation-rules',
        module: 'admin',
        feature: 'Delegation',
        title: 'Configure approval delegation rules',
        route: '/admin/delegation',
        roles: ['Admin', 'HR'],
        prerequisites: ['approvalDelegationEnabled org flag'],
        steps: [
          'Navigate to **Admin → Delegation rules**.',
          'Define scopes: attendance, timesheet, leave.',
          'Set default delegate duration and eligibility.',
          'Managers assign delegates on profile **Delegation** tab.',
          'Verify delegate inbox on timesheet/leave pages.'
        ],
        outcome: 'Delegation policy active for managers.',
        tips: ['SLA reminder emails fire when configured.', 'Delegates see acting-for metadata on approve.'],
        related: ['workspace-approvals']
      },
      {
        id: 'admin-audit-review',
        module: 'admin',
        feature: 'Audit',
        title: 'Review unified audit trail and export',
        route: '/admin/audit or entity audit panels',
        roles: ['Compliance admin', 'Auditor'],
        prerequisites: ['auditUiEnabled (reads); auditEnabled for writes'],
        steps: [
          'Open **Admin → Audit** or entity **Audit** tab on project/PO/profile.',
          'Filter by entity type, actor, or date range.',
          'Toggle **Activity** vs **History** view modes.',
          'Paginate through timeline events.',
          'Export **CSV** via export action (same permission as read).',
          'Deep link to related records for investigation.'
        ],
        outcome: 'Audit evidence collected for compliance.',
        tips: ['Timelines start at go-live when writes enabled — no legacy backfill.', 'Comments are separate from audit events.'],
        related: ['hrms-edit-employee']
      },
      {
        id: 'admin-feature-flags',
        module: 'admin',
        feature: 'Feature flags',
        title: 'Toggle feature flags for pilot rollout',
        route: '/admin/feature-flags',
        roles: ['Platform admin'],
        prerequisites: ['Feature flags admin access'],
        steps: [
          'Go to **Admin → Feature flags**.',
          'Locate flag (e.g. onboardingEnabled, ganttEnabled).',
          'Enable for pilot org unit or globally.',
          'Verify menu entries appear for test persona.',
          'Monitor errors and disable if rollback needed.'
        ],
        outcome: 'Feature availability changed without deploy.',
        tips: ['Coordinate with DB migrations for HRMS flags.', 'Menu flags may hide routes that still exist.'],
        related: ['hrms-app-config']
      },
      {
        id: 'admin-notification-templates',
        module: 'admin',
        feature: 'Notification templates',
        title: 'Configure workspace notification templates (V6H-EA01)',
        route: '/admin/notification-templates',
        roles: ['Admin', 'HR admin'],
        status: 'Planned',
        prerequisites: ['isWorkspaceNotificationsEnabled()', 'Admin persona'],
        steps: [
          'Navigate to **Admin → Notification templates** (`/admin/notification-templates`).',
          'Review existing templates — channel, key, active status.',
          'Click **Create** — enter template key, channel, body with placeholders.',
          'Validate placeholder keys against allowed list.',
          'Use **Preview** — confirm salary/bank/tax/performance placeholders are **masked**.',
          'Save — verify audit event on create.',
          'Edit or **disable** template — delivery falls back to classpath template when disabled.',
          'Confirm notification **delivery/read-state** is not stored in template table.'
        ],
        outcome: 'Workspace notification templates configured as workflow/config records.',
        tips: ['Templates configure delivery — domain events remain source of notification truth.', 'Ships V6H S1.'],
        related: ['workspace-notifications', 'admin-feature-flags']
      },
      {
        id: 'admin-payroll-config',
        module: 'admin',
        feature: 'Payroll configuration',
        title: 'Configure org payroll settings (V6H-EA04)',
        route: '/admin/payroll-config',
        roles: ['Admin', 'Payroll manager'],
        status: 'Planned',
        prerequisites: ['isPayrollManagementEnabled()', 'Admin or payroll manager persona'],
        steps: [
          'Navigate to **Admin → Payroll configuration** (`/admin/payroll-config`).',
          'Set **pay frequency**, **payroll groups**, statutory IDs, earning/deduction categories.',
          'Configure **cut-off**, **lock rules**, and approval workflow.',
          'Review **readiness checklist** — resolve any missing mandatory fields.',
          'Save — verify config change **audited**.',
          'Start payroll run preview — confirm updated config reflected.',
          'Non-admin: verify **read-only or blocked** access.'
        ],
        outcome: 'Org payroll configuration complete; readiness validation gates payroll runs.',
        tips: ['Primary source is Application Config payroll nodes plus valid bridge rows.', 'Ships V6H S2.'],
        related: ['payroll-create-run', 'payroll-manage-deductions']
      },
      {
        id: 'admin-dashboard',
        module: 'admin',
        feature: 'Admin dashboard',
        title: 'Review admin operations dashboard (V6H-EA07)',
        route: '/admin/dashboard',
        roles: ['Admin'],
        status: 'Planned',
        prerequisites: ['Admin persona', 'adminModules enabled'],
        steps: [
          'Navigate to **Admin → Dashboard** (`/admin/dashboard`).',
          'Review KPI widgets: config health, feature flags, audit alerts, integration/workflow health.',
          'Use **quick links** — verify only **shipped** routes appear (no planned-only links as live).',
          'Drill into audit, security, or integration alert.',
          'Verify KPIs load from **live services** — not mock or isolated dashboard table.',
          'Non-admin: confirm access blocked.'
        ],
        outcome: 'Admin operational overview from composed live KPIs.',
        tips: ['No new admin dashboard truth table — composition only.', 'Ships V6H S3.'],
        related: ['admin-audit-review', 'admin-feature-flags', 'integrations-sync-health']
      },

      /* ── MOBILE ── */
      {
        id: 'mobile-login',
        module: 'mobile',
        feature: 'Mobile access',
        title: 'Log in on Android mobile app',
        route: 'Mobile app',
        roles: ['All mobile users'],
        prerequisites: ['App installed from Play Store', 'Device registration optional per org'],
        steps: [
          'Install Tracopus from Google Play (`com.infleca.device.tracopus`).',
          'Open app and tap **Sign in**.',
          'Use **Microsoft SSO** or org-provided credentials.',
          'Complete MFA if prompted.',
          'Land on mobile home — Projects, Tasks, Timesheet, Insights tabs.'
        ],
        outcome: 'Mobile session active with same RBAC as web.',
        tips: ['Register device in HRMS Settings if org requires.', 'QR link available from web device registration popup.'],
        related: ['auth-login-sso', 'mobile-log-timesheet']
      },
      {
        id: 'mobile-log-timesheet',
        module: 'mobile',
        feature: 'Mobile timesheet',
        title: 'Record day hours on mobile',
        route: 'Mobile → Timesheet',
        roles: ['Field staff', 'Employees'],
        prerequisites: ['Mobile login', 'Projects assigned'],
        steps: [
          'Open **Timesheet** tab or FAB → **Record day**.',
          'Select date and project/deliverable.',
          'Enter hours and billable flag.',
          'Save — syncs to web timesheet grid.',
          'Submit week on web if approval workflow required.'
        ],
        outcome: 'Hours captured in field; visible on web.',
        tips: ['Validation rules match web.', 'Offline mode depends on app version/settings.'],
        related: ['hrms-log-timesheet', 'mobile-login']
      },
      {
        id: 'mobile-update-task',
        module: 'mobile',
        feature: 'Mobile tasks',
        title: 'Update task status on mobile',
        route: 'Mobile → Tasks',
        roles: ['Project team'],
        prerequisites: ['Assigned tasks'],
        steps: [
          'Open **Tasks** hub.',
          'Filter by project if needed.',
          'Tap task to open detail.',
          'Change status (e.g. To do → In progress → Done).',
          'Add comment optional.',
          'Sync reflects on web taskboard.'
        ],
        outcome: 'Task progress updated from mobile.',
        tips: ['Use Insights tab for personal utilization charts.'],
        related: ['project-update-taskboard', 'mobile-login']
      }
    ]
  };

  /** Lookup helpers */
  global.SCENARIO_GUIDE.getScenario = function (id) {
    return global.SCENARIO_GUIDE.scenarios.find(function (s) { return s.id === id; }) || null;
  };

  global.SCENARIO_GUIDE.getModuleScenarios = function (moduleId) {
    return global.SCENARIO_GUIDE.scenarios.filter(function (s) { return s.module === moduleId; });
  };

  global.SCENARIO_GUIDE.getFeatures = function (moduleId) {
    var map = {};
    global.SCENARIO_GUIDE.getModuleScenarios(moduleId).forEach(function (s) {
      if (!map[s.feature]) map[s.feature] = [];
      map[s.feature].push(s);
    });
    return map;
  };

  global.SCENARIO_GUIDE.allForSearch = function () {
    var enrich = (typeof window !== 'undefined' && window.SCENARIO_ENRICHMENT) || {};
    return global.SCENARIO_GUIDE.scenarios.map(function (s) {
      var mod = global.SCENARIO_GUIDE.modules[s.module];
      var extra = enrich[s.id] || {};
      var flagKeys = (extra.featureFlags || []).map(function (f) { return f.flag; });
      var permKeys = (extra.permissions || []).map(function (p) { return p.path || p.name; });
      return {
        title: s.title,
        url: s.module + '/' + s.id + '.html',
        description: extra.summary || (s.feature + ' — ' + (mod ? mod.label : s.module)),
        keywords: [s.feature, s.module, s.route, s.title]
          .concat(s.roles || [])
          .concat(flagKeys)
          .concat(permKeys)
          .concat(extra.considerations || [])
      };
    });
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = (typeof window !== 'undefined' ? window : global).SCENARIO_GUIDE;
}
