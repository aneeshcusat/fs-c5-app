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
        prerequisites: [
          'timesheetApprovalEnabled org flag',
          'Hours logged and validated (full week when partial off; selected days when partial on)'
        ],
        steps: [
          'Open **Timesheet** for the target week.',
          'Resolve all validation errors (red hints).',
          'If **partialWeekSubmissionEnabled** is on, select day chips for the batch; otherwise submit the whole week.',
          'If Work-Time late-workflow is on and the week is past cut-off, complete the **late-reason** field (Other needs detail).',
          'Click **Submit for approval**.',
          'Confirm submission — status changes to **Submitted** (or batch pending).',
          'Monitor manager decision in timesheet header or notifications.',
          'If rejected, fix conflicts and resubmit (remaining draft days can still be submitted when partial is on).'
        ],
        outcome: 'Week or day batch enters approval queue; manager/delegate notified.',
        tips: [
          'Default: partialWeekSubmissionEnabled is off (full-week only).',
          'Deadline preview and late reason come from Work-Time Governance when those catalog flags are on.',
          'Payroll lock after full week approval prevents edits.',
          'Resolve conflicts before manager can approve.'
        ],
        related: ['hrms-approve-timesheet', 'hrms-log-timesheet', 'hrms-timesheet-governance']
      },
      {
        id: 'hrms-timesheet-governance',
        module: 'hrms',
        feature: 'Work-Time Governance',
        title: 'Submit a timesheet under work-time governance',
        route: '/hrms/timesheet',
        roles: ['Individual contributor'],
        prerequisites: [
          'timesheetApprovalEnabled',
          'Work-Time Governance: approval.chain, then timesheet.reminders and/or timesheet.late-workflow (and timesheet.validation if testing validation)'
        ],
        steps: [
          'Open **HRMS → Time Sheet** for the target week.',
          'Confirm the page loads a **deadline preview** for that week when reminders or late-workflow is on (banner / late state follows the server, not a local Friday 18:00 guess).',
          'Log hours as usual against project / non-project / leave rows.',
          'Clear **WARN** hints you can fix; confirm whether remaining issues are WARN (submit allowed) or BLOCK (submit disabled).',
          'If the week is late and **timesheet.late-workflow** is on, complete the **late-reason** field on Submit (Other needs detail). If late-workflow is off, that field is not shown.',
          'Click **Submit for approval** when the protected timesheet workflow allows it.',
          'Change to another week — late banner and late-reason must follow the new week’s preview, not the previous submit.',
          'If rejected, fix hours and resubmit; governance does not replace manager comments.'
        ],
        outcome: 'Week or day batch submitted through the existing timesheet workflow, with catalog validation and deadline preview applied.',
        tips: [
          'Catalog defaults are off; your tenant may enable a subset.',
          'Reminder emails also need timesheetSubmissionReminderEnabled and the reminder job — catalog reminders alone are not enough.',
          'Exactly seven elapsed days uses TIMESHEET-LATE-LTE7; later uses TIMESHEET-LATE-GT7.',
          'timesheet.period-lock needs lockAfterDays > 0 (often 7) and job TIMESHEET_PERIOD_LOCK; disableLastMonthAfterXDays still applies separately.'
        ],
        related: ['hrms-submit-timesheet', 'admin-work-time-governance', 'hrms-approve-timesheet']
      },
      {
        id: 'hrms-approve-timesheet',
        module: 'hrms',
        feature: 'Timesheet',
        title: 'Approve or reject a submitted timesheet',
        route: '/hrms/timesheet',
        roles: ['Manager', 'Delegate'],
        prerequisites: [
          'timesheetApprovalEnabled',
          'Pending weeks or submission batches in team scope',
          'Optional: timesheet.late-workflow + published TIMESHEET-LATE-LTE7 / TIMESHEET-LATE-GT7 policies for late routing'
        ],
        steps: [
          'Open **Timesheet** or **Workspace → Approvals**.',
          'Locate **Pending approvals** panel.',
          'Select employee week (flag off) or submission batch (flag on). Late items may land on the moderately late (≤7 days) or significantly late (>7 days) chain when late-workflow is on.',
          'Review hours, conflicts, and any late-reason category on the submission.',
          '**Approve** or **Reject** with comment as needed.',
          'When partial is on and leftover days remain, expect additional pending cards later.',
          'After full approval: confirm payroll / role month lock as configured. If timesheet.period-lock is on, approved weeks also auto-lock after lockAfterDays (often 7); reopen may require a reason.'
        ],
        outcome: 'Timesheet approved/rejected; employee notified. Late weeks follow the published late band when governance is on.',
        tips: [
          'Delegate actions show acting-for metadata in audit.',
          'The employee does not pick the approval route — late band chooses it.',
          'Reopen requires the configured reopen reason when period-lock requires it.'
        ],
        related: ['hrms-submit-timesheet', 'workspace-approvals', 'hrms-timesheet-governance']
      },
      {
        id: 'hrms-apply-leave',
        module: 'hrms',
        feature: 'Leave management',
        title: 'Apply for leave',
        route: '/people/leaves',
        roles: ['Individual contributor'],
        prerequisites: [
          'leaveManagementEnabled org flag',
          'Opening balance or accrual already loaded (Admin → Employee leave config)'
        ],
        steps: [
          'Navigate to **People → Leave management** (`/people/leaves`).',
          'Click **Apply leave** or **New request**.',
          'Select **leave type**, **from date**, **to date**, and half-day / floating catalogue options when the type requires them.',
          'Enter reason (may be redacted in audit per policy).',
          'Review balance and overlap warnings (day count excludes holidays / weekly offs).',
          'Submit — status becomes **Pending**.',
          'Track approval on the same page, notifications, or **Workspace → Approvals**.'
        ],
        outcome: 'Leave request submitted; on approval promotes to work items/calendar.',
        tips: [
          'Zero balance usually means HR has not imported opening balances yet — see Employee leave config.',
          'Check manager delegate if primary approver is away.'
        ],
        related: ['hrms-approve-leave', 'admin-employee-leave-config', 'admin-configure-global-leave', 'people-manage-holidays']
      },
      {
        id: 'hrms-approve-leave',
        module: 'hrms',
        feature: 'Leave management',
        title: 'Approve or reject leave request',
        route: '/people/leaves',
        roles: ['Manager', 'Delegate', 'HR'],
        prerequisites: ['leaveManagementEnabled', 'Pending leave in scope'],
        steps: [
          'Open **People → Leave management** or **Workspace → Approvals**.',
          'Review **Pending approvals** for leave requests in your scope.',
          'Open request — verify dates, balance, and team coverage.',
          'Click **Approve** or **Reject** (reject requires a comment).',
          'Approved leave appears on calendars and may create timesheet leave rows / attendance sync.'
        ],
        outcome: 'Leave decision recorded; balances updated.',
        tips: ['Overlap checks prevent duplicate approved leave.', 'Delegation inbox respects scope settings.'],
        related: ['hrms-apply-leave', 'workspace-approvals', 'admin-configure-global-leave', 'admin-employee-leave-config']
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
          'Open **Admin → Employee leave config** — download the **OB template**, fill from ZingHR, dry-run import, then spot-check balances.',
          'Verify an employee leave request spanning a holiday excludes that day from day count.'
        ],
        outcome: 'Published leave policy active; holidays assigned; balances ready for apply/approve.',
        tips: [
          'See screen doc: /documentation/hrms/leave-configuration.html',
          'Detailed policies guide (tabs): /documentation/hrms/leave-policies-guide.html',
          'Use Types & fallback for classic leave type catalog when needed.',
          'Legal Calendars publish syncs blocking holidays into People → Holidays.',
          'Opening-balance CSV: Download OB template on Employee leave config (do not invent balances).'
        ],
        related: ['hrms-apply-leave', 'people-manage-holidays', 'admin-employee-leave-config', 'admin-leave-ob-bulk-import', 'admin-delegation-rules']
      },
      {
        id: 'admin-employee-leave-config',
        module: 'admin',
        feature: 'Leave configuration',
        title: 'Set employee leave opening balances',
        route: '/admin/employee-leave-config',
        roles: ['HR admin', 'Admin'],
        prerequisites: [
          'leaveManagementEnabled on the org team',
          'adminModules.leavePoliciesEnabled (policyAdminEnabled)',
          'Published India / team leave policy preferred before cutover'
        ],
        steps: [
          'Open **Admin → Employee leave config** (`/admin/employee-leave-config`).',
          'Select the **team filter** so employees load (header team menu).',
          'For **bulk cutover**: click **Download OB template** (or **Download CSV** in the Opening balance template panel).',
          'Fill blank **entitlementAmount** / **amount** columns from ZingHR / HR export (keep employeeId and leaveTypeCode).',
          'Dry-run import via `POST /api/v2/admin/data-import/leave-balance?dryRun=true` (body also supports `"dryRun": true`).',
          'Fix failed rows from the response `reportCsv`, then re-POST with `dryRun=false`.',
          'For a **single employee**: pick the person, review balance cards, use **Adjust balance** (opening entitlement and/or +/− days) with a reason.',
          'Adjustments of **5+ days** require a second confirmer employee id.',
          'Confirm remaining balances, then prove apply on **People → Leaves**.'
        ],
        outcome: 'Employee balances usable for leave apply; cutover import validated with dry-run first.',
        tips: [
          'Template rows are PL/CL/SL by employee location (KA/MH/HR/TN) — amounts stay blank until HR fills them.',
          'Accrual / carry-forward / comp-off expire schedules continue after opening balances.',
          'Screen doc: /documentation/hrms/leave-configuration.html#employee-balances',
          'Scenario guide: /documentation/user-guide/admin/admin-employee-leave-config.html'
        ],
        related: ['admin-configure-global-leave', 'admin-leave-ob-bulk-import', 'hrms-apply-leave']
      },
      {
        id: 'admin-leave-ob-bulk-import',
        module: 'admin',
        feature: 'Leave configuration',
        title: 'Bulk import leave opening balances (dry-run then live)',
        route: '/admin/employee-leave-config',
        roles: ['HR admin', 'Admin'],
        prerequisites: [
          'leaveManagementEnabled',
          'Employees and leave types (PL/CL/SL) exist for the team',
          'ZingHR / legacy balance export mapped to Tracopus employeeId or empCode'
        ],
        steps: [
          'Open **Admin → Employee leave config** and select the target team(s).',
          'Download **OB template** CSV from the page.',
          'Paste ZingHR balances into **entitlementAmount** and/or **amount**.',
          'Convert filled rows to JSON (or use CLI dry-run JSON from production-migration scripts).',
          'POST dry-run: `/api/v2/admin/data-import/leave-balance?userTeamId={team}&actorId={you}&dryRun=true`.',
          'Review `results[]` / `reportCsv` — fix mapping errors (unknown emp, leave type, duplicates).',
          'POST live with `dryRun=false` only after dry-run is clean.',
          'Spot-check balance cards on Employee leave config and a sample leave apply.'
        ],
        outcome: 'Team opening balances imported without inventing data; dry-run gate passed.',
        tips: [
          'Never seed balances without an HR file — dry-run validates only.',
          'CLI alternative: fservices-app/build-tools/mysql/production-migration/scripts/generate-leave-opening-balance-import.py',
          'Runbook: fui/docs/leave/pending/CFA_LEAVE_OPENING_BALANCE_IMPORT_RUNBOOK.md'
        ],
        related: ['admin-employee-leave-config', 'admin-configure-global-leave', 'hrms-apply-leave']
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
        tips: [
          'Regularization may require separate employee request + approval.',
          'Work-Time swipe compose is a read projection — it does not write this matrix.',
          'attendance.period-lock has no lock service yet.',
          'Bulk export available per role.'
        ],
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
        related: ['admin-role-permissions', 'admin-feature-flags', 'admin-work-time-governance']
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
        related: ['integrations-sync-health', 'sales-import-po-salesforce', 'integrations-worktime-sync']
      },
      {
        id: 'integrations-worktime-sync',
        module: 'integrations',
        feature: 'Work-time adapters',
        title: 'Run vendor-neutral project import or timesheet export',
        route: '/integrations',
        roles: ['Integration admin'],
        prerequisites: [
          'integration.project-import and/or integration.timesheet-export effective',
          'Matching role gate on workTimeIntegrationRoles',
          'Mapping profile for the payload'
        ],
        steps: [
          'Confirm catalog features are **Enabled** (not Blocked) on **Admin → Feature flags** → Work-Time Governance.',
          'Confirm your role allows **project import** and/or **timesheet export**.',
          'Load or review the vendor-neutral **mapping** (external id → project / timesheet fields).',
          'For import: submit a mapped project payload; retry is idempotent on external id.',
          'For export: request timesheet rows for a scoped period and least-privilege org/project scope.',
          'Inspect the adapter result or error — there is no bundled vendor dead-letter queue until a connector provides one.',
          'Verify created projects or exported hours against Purchase Order → Project → Task Activity sources.'
        ],
        outcome: 'Projects imported or timesheet rows exported through the generic adapters, not a vendor-specific connector.',
        tips: [
          'A named vendor project-tracking adapter is not bundled.',
          'Export does not bypass timesheet RBAC.',
          'Import must not invent a second project source table.'
        ],
        related: ['integrations-configure', 'admin-work-time-governance', 'project-create-project']
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
        related: ['hrms-edit-employee', 'admin-system-errors']
      },
      {
        id: 'admin-system-errors',
        module: 'admin',
        feature: 'System errors',
        title: 'Triage a system error and resolve it',
        route: '/admin/system-errors',
        roles: ['HR Admin', 'Org Admin'],
        prerequisites: ['adminModules.systemErrorsEnabled (default on)', 'Logged in as ADMIN or HR_ADMIN'],
        steps: [
          'Open **Admin → System errors**.',
          'Read **Open** / **Critical** KPIs and filter to Open.',
          'Open a Salesforce or ZingHR row and read **Why this failed**.',
          'Follow **Open related screen** to Connections or Jobs and fix credentials / retry.',
          'Return and **Acknowledge**, then **Mark resolved** when the failure is handled.'
        ],
        outcome: 'Ops failure triaged with a clear next step; ledger status updated.',
        tips: [
          'Repeat failures bump occurrence count on the same fingerprint.',
          'Never paste passwords into the detail drawer — update Connections instead.'
        ],
        related: ['admin-jobs', 'integrations-sync-health', 'admin-audit-review']
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
        related: ['hrms-app-config', 'admin-work-time-governance']
      },
      {
        id: 'admin-work-time-governance',
        module: 'admin',
        feature: 'Work-Time Governance',
        title: 'Enable work-time catalog features from Feature Flags',
        route: '/admin/feature-flags',
        roles: ['Platform admin'],
        prerequisites: [
          'adminGovernanceEnabled',
          'featureFlagsAdminEnabled',
          'Pilot org unit selected'
        ],
        steps: [
          'Go to **Admin → Feature flags**.',
          'Open the **Work-Time Governance** panel (below org feature toggles).',
          'Review families: approval, timesheet, planning, attendance, integration, admin.',
          'Enable a base feature first (for example **approval.chain** before reminders / late-workflow, or **timesheet.validation** before period-lock).',
          'Enable dependents only after the parent is **Enabled**, not **Blocked**.',
          'For cut-offs and late submit: turn on **timesheet.reminders** and **timesheet.late-workflow**, confirm policy cut-off (often Friday 18:00 UTC) and **timesheetSubmissionReminderEnabled** for emails.',
          'Optionally enter a **project id** to overlay a project override; delete it to inherit the team value.',
          'Save — confirm Application Config stored the choice.',
          'Log in as a test contributor and open **Timesheet** — confirm deadline preview and late-reason behavior match the catalog.'
        ],
        outcome: 'Selected catalog features are effective for the org unit (and optional project) without a code deploy.',
        tips: [
          'Catalog defaults are off until Application Config turns them on.',
          'Role gates AND dependencies can leave a feature Blocked even when the toggle looks on.',
          'Keep approvalChainFallbackLegacy true until a TIMESHEET chain policy is published.',
          'attendance.period-lock has no lock service — do not enable it expecting attendance days to lock.'
        ],
        related: ['admin-feature-flags', 'hrms-timesheet-governance', 'hrms-app-config']
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
      {
        id: 'admin-approval-policies',
        module: 'admin',
        feature: 'Approval policies',
        title: 'Configure approval routing policies',
        route: '/admin/approval-policies',
        roles: ['Admin', 'HR admin'],
        prerequisites: ['approvalPoliciesEnabled', 'Admin persona'],
        steps: [
          'Open **Admin → Approval policies**.',
          'Filter by domain (leave, timesheet, attendance).',
          'Create or edit a policy — levels, SLA hours, escalation.',
          'Run **Simulate** with a sample requester.',
          'Save / publish — confirm My Approvals uses the new route.',
          'Non-admin: verify access blocked.'
        ],
        outcome: 'Domain approval routing published without changing source timesheet/leave/attendance tables.',
        tips: ['Draft policies do not route live work.', 'Delegation is configured separately.'],
        related: ['admin-delegation-rules', 'workspace-approvals', 'admin-feature-flags']
      },
      {
        id: 'admin-access-requests',
        module: 'admin',
        feature: 'Access requests',
        title: 'Fulfill an access or asset request',
        route: '/admin/access-requests',
        roles: ['Admin', 'HR admin'],
        prerequisites: ['accessRequestsEnabled'],
        steps: [
          'Open **Admin → Access requests**.',
          'Filter **Pending**.',
          'Open a request — review persona, asset, and justification.',
          'Approve to fulfill or deny with a reason.',
          'Confirm Roles / asset register reflects the grant.',
          'Check Audit for the decision event.'
        ],
        outcome: 'Elevated access or asset request closed through the universal approval engine.',
        tips: ['This page is not an independent permission store.', 'Some grants still need Roles & permissions.'],
        related: ['admin-role-permissions', 'admin-approval-policies', 'admin-audit-review']
      },
      {
        id: 'admin-org-structure',
        module: 'admin',
        feature: 'Org structure',
        title: 'Reassign a manager and update master lists',
        route: '/admin/org-structure',
        roles: ['HR admin', 'Admin'],
        prerequisites: ['orgStructureEnabled'],
        steps: [
          'Open **Admin → Org structure**.',
          'On **Reporting**, search the employee and reassign `manager_id`.',
          'Confirm the tree refresh shows the new parent.',
          'On **Master lists**, add/remove department, designation, team, or cost center.',
          'Verify Application Config HRMS lists updated.'
        ],
        outcome: 'Reporting line and HRMS lists updated from EmployeeModel + Application Config — no shadow org table.',
        tips: ['Hierarchy nodes infer type from depth.', 'Empty reassign payloads must not toast success.'],
        related: ['hrms-app-config', 'hrms-edit-employee', 'admin-setup-checklist']
      },
      {
        id: 'admin-setup-checklist',
        module: 'admin',
        feature: 'Setup checklist',
        title: 'Complete day-one customer setup',
        route: '/admin/setup-checklist',
        roles: ['Admin', 'HR admin'],
        prerequisites: ['appconfigEnabled'],
        steps: [
          'Open **Admin → Setup checklist**.',
          'Scan remaining items and open the next incomplete row.',
          'Follow the console or documentation link.',
          'Mark the item done.',
          'When core rows are green, continue with **Industry templates**.'
        ],
        outcome: 'Day-one activation checklist progressed; source data still lives in App Config and domain consoles.',
        tips: ['Do not skip Application Config.', 'Checklist state is workflow progress, not business truth.'],
        related: ['admin-industry-templates', 'hrms-app-config', 'admin-dashboard']
      },
      {
        id: 'admin-industry-templates',
        module: 'admin',
        feature: 'Industry templates',
        title: 'Apply an industry template',
        route: '/admin/industry-templates',
        roles: ['Admin'],
        prerequisites: ['appconfigEnabled', 'Admin persona'],
        steps: [
          'Open **Admin → Industry templates**.',
          'Select a pack and read which config keys it writes.',
          'Open **Apply**, confirm the write target, then apply.',
          'Spot-check Application Config lists and flags.',
          'Do not apply a second overlapping pack blindly.'
        ],
        outcome: 'Pack writes into Application Config and related source entities.',
        tips: ['Never apply blind on production.', 'Finish setup checklist items the pack assumes exist.'],
        related: ['admin-setup-checklist', 'hrms-app-config', 'admin-feature-flags']
      },
      {
        id: 'admin-security',
        module: 'admin',
        feature: 'Masking policy',
        title: 'Set persona field masking',
        route: '/admin/security',
        roles: ['Admin', 'Security reviewer'],
        prerequisites: ['securityEnabled'],
        steps: [
          'Open **Admin → Security settings**.',
          'Select a sensitive field (salary, bank, tax).',
          'Set VISIBLE, MASKED, or HIDDEN per persona.',
          'Save — then open Employee 360 as a restricted persona.',
          'Confirm exports honor the same grants.'
        ],
        outcome: 'Persona-aware masking enforced on live people paths; AI/graph must not persist raw values.',
        tips: ['Default to MASKED.', 'Pair with data retention for purge.'],
        related: ['admin-data-retention', 'admin-audit-review', 'people-employee-360']
      },
      {
        id: 'admin-data-retention',
        module: 'admin',
        feature: 'Data retention',
        title: 'Set a retention schedule',
        route: '/admin/data-retention',
        roles: ['Admin'],
        prerequisites: ['dataRetentionEnabled'],
        steps: [
          'Open **Admin → Data retention**.',
          'Select an entity family.',
          'Set retention days and optional legal hold.',
          'Save — confirm Scheduled jobs honor the window.',
          'Export compliance evidence before shortening a window.'
        ],
        outcome: 'Purge policy updated over existing source tables.',
        tips: ['Holds block purge.', 'Do not delete production rows by hand.'],
        related: ['admin-compliance-export', 'admin-jobs', 'admin-security']
      },
      {
        id: 'admin-compliance-export',
        module: 'admin',
        feature: 'Compliance export',
        title: 'Export a compliance pack',
        route: '/admin/compliance-export',
        roles: ['Admin', 'HR admin'],
        prerequisites: ['complianceExportEnabled'],
        steps: [
          'Open **Admin → Compliance export**.',
          'Review pack readiness.',
          'Generate the export.',
          'Confirm masking — no raw salary/bank/tax.',
          'Store the file with the auditor; it is not a system of record.'
        ],
        outcome: 'Evidence pack composed from live Employee, audit, and related sources.',
        tips: ['Fix readiness gaps first.', 'Treat the download as sensitive.'],
        related: ['admin-audit-review', 'admin-data-retention', 'admin-security']
      },
      {
        id: 'admin-jobs',
        module: 'admin',
        feature: 'Scheduled jobs',
        title: 'Run a scheduled job on demand',
        route: '/admin/jobs',
        roles: ['Admin'],
        prerequisites: ['Admin persona'],
        steps: [
          'Open **Admin → Scheduled jobs**.',
          'Review last-run status per ScheduleType.',
          'Use **Run now** only for recovery.',
          'Wait for completion — do not overlap runs.',
          'Confirm the domain screen the job feeds.'
        ],
        outcome: 'Known backend job executed against existing domain tables.',
        tips: ['This is an operations console, not a new scheduler database.'],
        related: ['admin-data-retention', 'admin-dashboard', 'admin-configure-global-leave']
      },
      {
        id: 'admin-vendors',
        module: 'admin',
        feature: 'Vendors',
        title: 'Review vendor PO coverage',
        route: '/admin/vendors',
        roles: ['Admin', 'Finance manager'],
        prerequisites: ['Admin or finance persona'],
        steps: [
          'Open **Admin → Vendors**.',
          'Select a vendor in the master register.',
          'Review BidRequest and PurchaseOrder aggregates.',
          'Jump to Sales purchase orders for contract edits.'
        ],
        outcome: 'Vendor master inspected; POs remain the contract source of truth.',
        tips: ['Do not invent a second vendor ledger.'],
        related: ['sales-create-po', 'admin-dashboard']
      },
      {
        id: 'admin-workflows',
        module: 'admin',
        feature: 'Workflow automation',
        title: 'Publish a workflow rule',
        route: '/admin/workflows',
        roles: ['Admin'],
        prerequisites: ['workflowsEnabled'],
        steps: [
          'Open **Admin → Workflow automation**.',
          'Filter draft vs published rules.',
          'Publish or pause a rule.',
          'Confirm domain events start or stop matching.',
          'Use **Rule builder** for graph edits.'
        ],
        outcome: 'Workflow configuration published over existing domain events.',
        tips: ['Pause before editing live rules.', 'Studio is the register; builder edits the graph.'],
        related: ['admin-automation-rules', 'admin-notification-templates', 'admin-audit-review']
      },
      {
        id: 'admin-automation-rules',
        module: 'admin',
        feature: 'Automation rules',
        title: 'Build and publish an automation rule',
        route: '/admin/automation-rules',
        roles: ['Admin'],
        prerequisites: ['automationRulesEnabled'],
        steps: [
          'Open **Admin → Workflow automation → Rule builder**.',
          'Select a domain trigger.',
          'Add conditions and actions — keep the graph small.',
          'Save draft, then publish.',
          'Trigger a sandbox event and inspect runs.'
        ],
        outcome: 'Trigger → action graph saved as workflow configuration.',
        tips: ['Drafts do not fire.', 'Actions must call canonical services.'],
        related: ['admin-workflows', 'admin-developer']
      },
      {
        id: 'admin-developer',
        module: 'admin',
        feature: 'Developer portal',
        title: 'Register an integration app',
        route: '/admin/developer',
        roles: ['Admin'],
        prerequisites: ['developerPortalOverviewEnabled'],
        steps: [
          'Open **Admin → Developer portal**.',
          'Register an app — name, owner, scopes.',
          'Issue an API key from the hub tab.',
          'Optionally add a webhook subscription.',
          'Monitor usage and revoke unused keys.'
        ],
        outcome: 'Integration app registered; tokens never pasted into docs or AI logs.',
        tips: ['Least privilege scopes.', 'Hub tabs cover keys and webhooks.'],
        related: ['admin-api-keys', 'admin-webhooks', 'admin-audit-review']
      },
      {
        id: 'admin-api-keys',
        module: 'admin',
        feature: 'API keys',
        title: 'Issue and revoke an API key',
        route: '/admin/api-keys',
        roles: ['Admin'],
        prerequisites: ['apiKeysEnabled'],
        steps: [
          'Open **Developer portal → API keys**.',
          'Create a key — name, app, expiry.',
          'Copy the secret once into the vault.',
          'Call a v2 endpoint and confirm RBAC still applies.',
          'Revoke immediately on leak or owner change.'
        ],
        outcome: 'Key issued against existing v2 APIs; CSV export is metadata only.',
        tips: ['Never commit secrets.', 'Persona masking still applies to API responses.'],
        related: ['admin-developer', 'admin-webhooks', 'admin-security']
      },
      {
        id: 'admin-webhooks',
        module: 'admin',
        feature: 'Webhooks',
        title: 'Subscribe to a domain webhook',
        route: '/admin/webhooks',
        roles: ['Admin'],
        prerequisites: ['webhooksEnabled'],
        steps: [
          'Open **Developer portal → Webhooks**.',
          'Create a subscription — HTTPS URL, secret, events.',
          'Trigger a domain event.',
          'Inspect deliveries; retry failures after fixing the endpoint.',
          'Confirm payloads stay masked for sensitive fields.'
        ],
        outcome: 'Outbound fan-out of existing domain events with signature verification.',
        tips: ['HTTPS only.', 'Receivers must be idempotent.'],
        related: ['admin-developer', 'admin-api-keys', 'admin-workflows']
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
      },

      /* BEGIN-REMAINING-HOWTO-SCENARIOS */
      {
        "id": "workspace-home",
        "module": "workspace",
        "feature": "Home",
        "title": "Land on persona home and jump to work",
        "route": "/workspace/home",
        "roles": [
          "All users"
        ],
        "prerequisites": [
          "Logged in",
          "homeEnabled"
        ],
        "steps": [
          "Sign in and land on **Workspace → Home** (or open it from the sidebar).",
          "Read the persona strip — shortcuts differ for employee, manager, and admin.",
          "Jump to **My work**, **My approvals**, or **Notifications** from the cards.",
          "Use favorites or recent items if shown, then work on the destination screen."
        ],
        "outcome": "You reached the owning register instead of treating Home as the system of record.",
        "tips": [
          "Home does not store tasks.",
          "Persona navigation still hides cards you cannot open."
        ],
        "related": [
          "workspace-my-work",
          "workspace-approvals",
          "workspace-notifications"
        ]
      },
      {
        "id": "workspace-my-paychecks",
        "module": "workspace",
        "feature": "Pay",
        "title": "Open a published payslip",
        "route": "/workspace/my-paychecks",
        "roles": [
          "Employee"
        ],
        "prerequisites": [
          "myPaychecksEnabled",
          "At least one published paycheck"
        ],
        "steps": [
          "Open **Workspace → My paychecks**.",
          "Pick a pay period.",
          "Open the payslip / PDF if offered.",
          "For questions, contact payroll — do not edit lines here."
        ],
        "outcome": "You viewed a published paycheck sourced from a finalized payroll run.",
        "tips": [
          "Draft runs are not visible here.",
          "Masking still applies to others’ pay."
        ],
        "related": [
          "payroll-view-paycheck",
          "payroll-create-run"
        ]
      },
      {
        "id": "workspace-my-tickets",
        "module": "workspace",
        "feature": "Tickets",
        "title": "Update a ticket from My tickets",
        "route": "/workspace/my-tickets",
        "roles": [
          "Employee",
          "Project team"
        ],
        "prerequisites": [
          "myTicketsEnabled"
        ],
        "steps": [
          "Open **Workspace → My tickets**.",
          "Filter open vs waiting.",
          "Open a ticket you own or requested.",
          "Comment or update status as allowed.",
          "Confirm **Projects → Tickets** shows the same row if you have that menu."
        ],
        "outcome": "Ticket updated on the service desk entity, visible in both My tickets and the team register.",
        "tips": [
          "SLA is on the ticket, not this queue.",
          "Do not paste secrets into comments."
        ],
        "related": [
          "project-tickets"
        ]
      },
      {
        "id": "workspace-work-graph",
        "module": "workspace",
        "feature": "Work graph",
        "title": "Explore connected work from a person or project",
        "route": "/workspace/work-graph",
        "roles": [
          "Manager",
          "Project manager",
          "Executive",
          "Admin"
        ],
        "prerequisites": [
          "workGraphEnabled"
        ],
        "steps": [
          "Open **Workspace → Work graph**.",
          "Search a person, project, or ticket.",
          "Expand neighbours — assignments, POs, approvals.",
          "Open a node to land on the source screen.",
          "Do not treat graph text as the salary or medical file."
        ],
        "outcome": "You navigated relationships and opened the canonical record.",
        "tips": [
          "Snippets are masked.",
          "Graph is an index, not a master."
        ],
        "related": [
          "analytics-work-graph",
          "hrms-edit-employee"
        ]
      },
      {
        "id": "people-documents",
        "module": "people",
        "feature": "Documents",
        "title": "Upload an employee document",
        "route": "/people/documents",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "documentsEnabled"
        ],
        "steps": [
          "Open **People → Documents**.",
          "Find the employee.",
          "Upload or open a file in the allowed category.",
          "Set retention / visibility as the vault allows.",
          "Do not copy medical or bank scans into Work Graph or tickets."
        ],
        "outcome": "Document stored on the employee vault with policy, not in chat.",
        "tips": [
          "Persona masking applies.",
          "Leave evidence may have its own leave-documents console."
        ],
        "related": [
          "hrms-edit-employee",
          "people-start-onboarding"
        ]
      },
      {
        "id": "people-assets",
        "module": "people",
        "feature": "Assets",
        "title": "Assign an asset to an employee",
        "route": "/people/assets",
        "roles": [
          "HR admin",
          "Admin"
        ],
        "prerequisites": [
          "assetsEnabled"
        ],
        "steps": [
          "Open **People → Assets**.",
          "Find or create the asset master row.",
          "Assign to an Employee.",
          "If the request came from Access requests, fulfill that row too.",
          "On exit, mark returned from Offboarding."
        ],
        "outcome": "Asset assignment written on the register against Employee.",
        "tips": [
          "Not a shadow vendor ledger.",
          "Serial numbers stay here, not in tickets only."
        ],
        "related": [
          "admin-access-requests",
          "people-start-offboarding"
        ]
      },
      {
        "id": "people-org-chart",
        "module": "people",
        "feature": "Org chart",
        "title": "Find someone on the organization chart",
        "route": "/people/org-chart",
        "roles": [
          "Manager",
          "HR admin",
          "Executive"
        ],
        "prerequisites": [
          "orgChartEnabled"
        ],
        "steps": [
          "Open **People → Organization chart**.",
          "Search a name.",
          "Read reporting line.",
          "To change a manager, open **Admin → Org structure** (if you can)."
        ],
        "outcome": "You found the live reporting line from Employee.",
        "tips": [
          "Empty manager fields make orphans.",
          "Chart is a view."
        ],
        "related": [
          "admin-org-structure",
          "hrms-edit-employee"
        ]
      },
      {
        "id": "recruiting-dashboard",
        "module": "people",
        "feature": "Recruiting",
        "title": "Scan recruiting pipeline health",
        "route": "/recruiting/dashboard",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "recruitingEnabled"
        ],
        "steps": [
          "Open **People → Recruiting**.",
          "Read funnel KPIs.",
          "Drill into requisitions or candidates.",
          "Act on those registers, then return."
        ],
        "outcome": "Pipeline health read from ATS sources, not a sidecar dashboard store.",
        "tips": [
          "Hired people become Employee via onboarding.",
          "Offers are not POs."
        ],
        "related": [
          "recruiting-requisitions",
          "people-start-onboarding"
        ]
      },
      {
        "id": "recruiting-requisitions",
        "module": "people",
        "feature": "Recruiting",
        "title": "Open a hiring requisition",
        "route": "/recruiting/requisitions",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "recruitingEnabled"
        ],
        "steps": [
          "Open **People → Requisitions**.",
          "Create or open a req.",
          "Set role, location, and hiring manager.",
          "Attach candidates as they apply.",
          "Close when filled or cancelled."
        ],
        "outcome": "Requisition is the ATS demand record; headcount still follows Employee when hired.",
        "tips": [
          "Staffing requests are resource demand on projects.",
          "Do not duplicate a req per candidate."
        ],
        "related": [
          "recruiting-candidates",
          "resources-staffing-request"
        ]
      },
      {
        "id": "recruiting-candidates",
        "module": "people",
        "feature": "Recruiting",
        "title": "Advance a candidate on a requisition",
        "route": "/recruiting/candidates",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "recruitingEnabled"
        ],
        "steps": [
          "Open **People → Candidates**.",
          "Filter by requisition or stage.",
          "Open a candidate.",
          "Move stage or schedule interview.",
          "On hire, start Employee + onboarding — do not keep them only as a candidate."
        ],
        "outcome": "Pipeline stage updated; hire creates Employee rather than promoting the candidate row as the HRIS.",
        "tips": [
          "GDPR/retention still apply.",
          "Do not paste unmasked PII into AI logs."
        ],
        "related": [
          "recruiting-interviews",
          "people-start-onboarding"
        ]
      },
      {
        "id": "recruiting-interviews",
        "module": "people",
        "feature": "Recruiting",
        "title": "Schedule an interview loop",
        "route": "/recruiting/interviews",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "recruitingEnabled",
          "Candidate on a requisition"
        ],
        "steps": [
          "Open **People → Interviews**.",
          "Create from a candidate or open an upcoming loop.",
          "Assign interviewers and time.",
          "Capture outcome back on the candidate."
        ],
        "outcome": "Interview recorded on the ATS candidate, not as a project task.",
        "tips": [
          "Project calendar is delivery.",
          "Feedback that changes offer still belongs on the candidate."
        ],
        "related": [
          "recruiting-candidates",
          "recruiting-offers"
        ]
      },
      {
        "id": "recruiting-offers",
        "module": "people",
        "feature": "Recruiting",
        "title": "Issue an offer to a candidate",
        "route": "/recruiting/offers",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "recruitingEnabled"
        ],
        "steps": [
          "Open **People → Offers**.",
          "Create from the candidate / req.",
          "Set package with masking in mind.",
          "Send / mark accepted or declined.",
          "On accept, create Employee and start onboarding; map pay on salary structures later."
        ],
        "outcome": "Offer tracked in ATS; workforce and payroll start after Employee exists.",
        "tips": [
          "PO is a customer contract.",
          "Do not put offer salary in Work Graph."
        ],
        "related": [
          "recruiting-candidates",
          "people-start-onboarding"
        ]
      },
      {
        "id": "learning-courses",
        "module": "people",
        "feature": "Learning",
        "title": "Publish a learning course",
        "route": "/learning/courses",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "learningEnabled"
        ],
        "steps": [
          "Open **People → Learning courses**.",
          "Create or edit a course.",
          "Publish.",
          "Assign via Learning assignments."
        ],
        "outcome": "Course exists in the catalog for assignment and My learning.",
        "tips": [
          "Policies hub is handbook ack.",
          "Compliance view tracks completions."
        ],
        "related": [
          "learning-assignments",
          "learning-my-learning"
        ]
      },
      {
        "id": "learning-my-learning",
        "module": "people",
        "feature": "Learning",
        "title": "Complete an assigned course",
        "route": "/learning/my-learning",
        "roles": [
          "Employee"
        ],
        "prerequisites": [
          "learningEnabled",
          "An assignment exists"
        ],
        "steps": [
          "Open **People → My learning**.",
          "Open an assigned course.",
          "Complete required steps.",
          "Confirm status shows complete for compliance."
        ],
        "outcome": "Completion recorded on the assignment against Employee.",
        "tips": [
          "Overdue items also show on learning compliance for managers."
        ],
        "related": [
          "learning-assignments",
          "learning-compliance"
        ]
      },
      {
        "id": "learning-assignments",
        "module": "people",
        "feature": "Learning",
        "title": "Assign a course to a population",
        "route": "/learning/assignments",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "learningEnabled",
          "Published course"
        ],
        "steps": [
          "Open **People → Learning assignments**.",
          "Pick a course.",
          "Select employees or a group the product supports.",
          "Set due date and save.",
          "Learners see **My learning**; managers see **Learning compliance**."
        ],
        "outcome": "Assignments created against Employee and the course catalog.",
        "tips": [
          "Do not assign to candidates.",
          "Reassign after content change if required."
        ],
        "related": [
          "learning-courses",
          "learning-compliance"
        ]
      },
      {
        "id": "learning-compliance",
        "module": "people",
        "feature": "Learning",
        "title": "Chase overdue learning",
        "route": "/learning/compliance",
        "roles": [
          "Manager",
          "HR admin"
        ],
        "prerequisites": [
          "learningEnabled"
        ],
        "steps": [
          "Open **People → Learning compliance**.",
          "Filter overdue.",
          "Open a person or assignment.",
          "Nudge the learner or extend due date if policy allows."
        ],
        "outcome": "Overdue training visible from live assignments and completions.",
        "tips": [
          "This is not statutory leave compliance.",
          "Reports export the same data."
        ],
        "related": [
          "learning-assignments",
          "learning-reports"
        ]
      },
      {
        "id": "learning-reports",
        "module": "people",
        "feature": "Learning",
        "title": "Export a learning completion report",
        "route": "/learning/reports",
        "roles": [
          "HR admin",
          "Manager"
        ],
        "prerequisites": [
          "learningEnabled"
        ],
        "steps": [
          "Open **People → Learning reports**.",
          "Pick a report and date range.",
          "Run and export.",
          "If a number is wrong, fix assignment or completion, then rerun."
        ],
        "outcome": "Snapshot of live learning sources.",
        "tips": [
          "Persona scope applies.",
          "Analytics hub is a different grain."
        ],
        "related": [
          "learning-compliance",
          "analytics-workforce"
        ]
      },
      {
        "id": "project-portfolio",
        "module": "project",
        "feature": "Portfolio",
        "title": "Review portfolio health and open a red project",
        "route": "/project/portfolio",
        "roles": [
          "Project manager",
          "Executive",
          "Finance manager"
        ],
        "prerequisites": [
          "portfolioEnabled"
        ],
        "steps": [
          "Open **Projects → Portfolio**.",
          "Read rollup KPIs and risk.",
          "Open a red project into **Project list / details**.",
          "Fix status, dates, or load there — not on the tower chart."
        ],
        "outcome": "Portfolio read from Project rows; action taken on the project file.",
        "tips": [
          "Scenarios on this tower are simulations, not extra projects.",
          "POs still parent commercial truth."
        ],
        "related": [
          "project-create-project",
          "analytics-control-tower"
        ]
      },
      {
        "id": "project-delivery-sprints",
        "module": "project",
        "feature": "Delivery",
        "title": "Plan a delivery sprint from existing tasks",
        "route": "/project/delivery",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "activitesEnabled"
        ],
        "steps": [
          "Open **Projects → Delivery sprints**.",
          "Pick a project and window.",
          "Pull in Task / TaskActivity already on the project.",
          "Run the sprint; complete work on the board or work items."
        ],
        "outcome": "Sprint is a timebox over existing delivery units.",
        "tips": [
          "Do not clone tasks into a sprint-only list.",
          "Hours still log on timesheet."
        ],
        "related": [
          "project-update-taskboard",
          "project-create-work-item"
        ]
      },
      {
        "id": "project-timeline",
        "module": "project",
        "feature": "Timeline",
        "title": "Adjust a task date on the Gantt",
        "route": "/project/timeline",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "ganttEnabled"
        ],
        "steps": [
          "Open **Projects → Timeline / Gantt**.",
          "Select a project.",
          "Move a bar; save.",
          "Confirm **Project details / deliverables** show the same dates."
        ],
        "outcome": "Dates written on Task / milestones, Gantt is the view.",
        "tips": [
          "Capacity still needed for load.",
          "Holidays affect people calendars, not this bar by itself."
        ],
        "related": [
          "project-add-deliverable",
          "project-team-capacity"
        ]
      },
      {
        "id": "project-milestones",
        "module": "project",
        "feature": "Governance",
        "title": "Add a milestone on a project",
        "route": "/project/milestones",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "milestonesEnabled"
        ],
        "steps": [
          "Open **Projects → Milestones**.",
          "Filter to a project.",
          "Create a milestone date.",
          "Link related tasks if the product allows.",
          "Track RAG on governance, not in a side slide as the only copy."
        ],
        "outcome": "Milestone stored on the project governance model, visible on Gantt.",
        "tips": [
          "Tasks still do the work.",
          "NPD gates are a different lifecycle."
        ],
        "related": [
          "project-timeline",
          "project-governance"
        ]
      },
      {
        "id": "project-risks",
        "module": "project",
        "feature": "Governance",
        "title": "Log a project risk",
        "route": "/project/risks",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "risksEnabled"
        ],
        "steps": [
          "Open **Projects → Risks**.",
          "Select project.",
          "Add risk, owner, mitigation.",
          "Review on Governance pack."
        ],
        "outcome": "Risk stored on the project governance records.",
        "tips": [
          "Issues are happened problems; risks are uncertain.",
          "AI risk agent reads sources — do not paste salary."
        ],
        "related": [
          "project-issues",
          "ai-risk-agent"
        ]
      },
      {
        "id": "project-issues",
        "module": "project",
        "feature": "Governance",
        "title": "Raise an issue and an action",
        "route": "/project/issues",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "issuesEnabled"
        ],
        "steps": [
          "Open **Projects → Issues & actions**.",
          "Add issue on the project.",
          "Add action with owner and due date.",
          "Close when done; promote to ticket if service desk should own it."
        ],
        "outcome": "Issue/action on project governance; ticket only if you create one.",
        "tips": [
          "Tickets have SLA.",
          "Do not duplicate the same problem in chat as source."
        ],
        "related": [
          "project-tickets",
          "project-risks"
        ]
      },
      {
        "id": "project-governance",
        "module": "project",
        "feature": "Governance",
        "title": "Run a governance pack from live RAID",
        "route": "/project/governance",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "governanceEnabled"
        ],
        "steps": [
          "Open **Projects → Governance**.",
          "Select project.",
          "Read RAG from milestones, risks, issues.",
          "Fix those registers, then refresh the pack."
        ],
        "outcome": "Steering view composed from governance child records.",
        "tips": [
          "Do not edit RAG only on a slide.",
          "Portfolio tower is multi-project."
        ],
        "related": [
          "project-milestones",
          "project-risks",
          "project-issues"
        ]
      },
      {
        "id": "project-tickets",
        "module": "project",
        "feature": "Tickets",
        "title": "Work a service ticket to SLA",
        "route": "/project/tickets",
        "roles": [
          "Project manager",
          "Service agent"
        ],
        "prerequisites": [
          "ticketsEnabled"
        ],
        "steps": [
          "Open **Projects → Tickets & service**.",
          "Filter SLA / assignee.",
          "Open a ticket, comment, change status.",
          "Requester sees it on **My tickets**."
        ],
        "outcome": "Ticket entity updated; SLA on this record.",
        "tips": [
          "Issues are project RAID.",
          "Access requests may be a different domain."
        ],
        "related": [
          "workspace-my-tickets",
          "project-issues"
        ]
      },
      {
        "id": "project-lessons-learned",
        "module": "project",
        "feature": "Knowledge",
        "title": "Capture a lesson after a milestone",
        "route": "/project/lessons-learned",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "lessonsLearnedEnabled"
        ],
        "steps": [
          "Open **Projects → Lessons learned**.",
          "Create a lesson on the project.",
          "Link RCA if this was a failure.",
          "Keep people-sensitive detail out of graph snippets."
        ],
        "outcome": "Lesson stored for reuse; RCA is the deeper failure analysis.",
        "tips": [
          "Not a blame file.",
          "Knowledge & RCA AI reads masked sources."
        ],
        "related": [
          "project-rca",
          "ai-knowledge"
        ]
      },
      {
        "id": "project-rca",
        "module": "project",
        "feature": "Knowledge",
        "title": "Complete an RCA after an incident",
        "route": "/project/rca",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "rcaEnabled"
        ],
        "steps": [
          "Open **Projects → Root cause analysis**.",
          "Create RCA linked to the project / issue.",
          "Record causes and actions.",
          "Publish a lesson if the org requires it."
        ],
        "outcome": "RCA stored; actions still need owners on issues or tickets.",
        "tips": [
          "AI knowledge can assist with masked sources.",
          "Not a HR performance review."
        ],
        "related": [
          "project-lessons-learned",
          "project-issues"
        ]
      },
      {
        "id": "npd-dashboard",
        "module": "project",
        "feature": "NPD",
        "title": "Scan NPD pipeline and open a gate",
        "route": "/npd/dashboard",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "npdEnabled"
        ],
        "steps": [
          "Open **Projects → NPD**.",
          "Read idea / gate / launch KPIs.",
          "Drill into ideas or gates.",
          "When a product is approved for delivery, ensure a Project (and PO if required) exists."
        ],
        "outcome": "NPD tower used as a view; delivery still uses Project.",
        "tips": [
          "Gates are not payroll.",
          "Ideas are not tasks."
        ],
        "related": [
          "npd-ideas",
          "npd-gates"
        ]
      },
      {
        "id": "npd-ideas",
        "module": "project",
        "feature": "NPD",
        "title": "Capture an NPD idea",
        "route": "/npd/ideas",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "npdEnabled"
        ],
        "steps": [
          "Open **Projects → NPD ideas**.",
          "Create an idea.",
          "Advance toward gates when ready.",
          "Do not create Task rows as the only idea file."
        ],
        "outcome": "Idea stored in NPD; gates decide; Project comes later.",
        "tips": [
          "Bids are commercial pursuit.",
          "My work will not list ideas as tasks."
        ],
        "related": [
          "npd-gates",
          "sales-create-bid"
        ]
      },
      {
        "id": "npd-gates",
        "module": "project",
        "feature": "NPD",
        "title": "Pass or hold an NPD gate",
        "route": "/npd/gates",
        "roles": [
          "Executive",
          "Project manager"
        ],
        "prerequisites": [
          "npdEnabled"
        ],
        "steps": [
          "Open **Projects → NPD gates**.",
          "Open a pending gate.",
          "Review idea/packet.",
          "Pass, hold, or kill.",
          "On pass toward build, ensure Project exists when required."
        ],
        "outcome": "Gate decision on the NPD record.",
        "tips": [
          "Not My Approvals leave inbox.",
          "Project governance is delivery RAG."
        ],
        "related": [
          "npd-ideas",
          "npd-launch"
        ]
      },
      {
        "id": "npd-launch",
        "module": "project",
        "feature": "NPD",
        "title": "Mark an NPD item launch-ready",
        "route": "/npd/launch",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "npdEnabled"
        ],
        "steps": [
          "Open **Projects → NPD launch**.",
          "Open an item that passed gates.",
          "Complete launch checklist.",
          "Link the delivery Project / tickets if the launch needs build or service work."
        ],
        "outcome": "Launch readiness on NPD; execution still on Project/tickets.",
        "tips": [
          "Not paycheck publish.",
          "Dossiers may hold the packet."
        ],
        "related": [
          "npd-gates",
          "project-tickets"
        ]
      },
      {
        "id": "dossiers-pack",
        "module": "project",
        "feature": "Dossiers",
        "title": "Assemble a dossier from live records",
        "route": "/dossiers",
        "roles": [
          "Project manager",
          "HR admin",
          "Executive"
        ],
        "prerequisites": [
          "dossiersEnabled"
        ],
        "steps": [
          "Open **Projects → Dossiers**.",
          "Create or open a pack.",
          "Attach live project / ticket / invoice references.",
          "Sign off; do not paste unmasked salary into the pack."
        ],
        "outcome": "Dossier composed from sources; pack is a snapshot plus links.",
        "tips": [
          "Compliance export is admin evidence.",
          "People documents stay in the people vault."
        ],
        "related": [
          "admin-compliance-export",
          "project-governance"
        ]
      },
      {
        "id": "resources-planner",
        "module": "resources",
        "feature": "Capacity",
        "title": "Simulate a staffing move before committing",
        "route": "/resources/planner",
        "roles": [
          "Resource manager"
        ],
        "prerequisites": [
          "plannerEnabled"
        ],
        "steps": [
          "Open **Resources → Capacity simulation**.",
          "Clone or start a scenario.",
          "Move people or demand.",
          "Compare to live **Team capacity**.",
          "Commit only via the live planner when you mean it."
        ],
        "outcome": "Scenario stays a sandbox until you commit on Team capacity.",
        "tips": [
          "Not a second assignment table.",
          "Staffing requests are demand tickets."
        ],
        "related": [
          "project-team-capacity",
          "resources-staffing-request"
        ]
      },
      {
        "id": "resources-utilization",
        "module": "resources",
        "feature": "Capacity",
        "title": "Find over-utilized people and open capacity",
        "route": "/resources/utilization",
        "roles": [
          "Resource manager"
        ],
        "prerequisites": [
          "utilizationEnabled"
        ],
        "steps": [
          "Open **Resources → Utilization & demand**.",
          "Filter a window.",
          "Open an over-utilized person.",
          "Rebalance on **Team capacity** or fulfill a staffing request."
        ],
        "outcome": "Load read from live assignments; change made on capacity/staffing.",
        "tips": [
          "Analytics resource intelligence is exec grain.",
          "Timesheet hours are a different source."
        ],
        "related": [
          "project-team-capacity",
          "resources-bench"
        ]
      },
      {
        "id": "resources-bench",
        "module": "resources",
        "feature": "Bench",
        "title": "Place someone from bench onto a request",
        "route": "/resources/bench",
        "roles": [
          "Resource manager"
        ],
        "prerequisites": [
          "benchEnabled"
        ],
        "steps": [
          "Open **Resources → Bench & roll-off**.",
          "See who is rolling off or available.",
          "Open a staffing request or Team capacity.",
          "Place the Employee."
        ],
        "outcome": "Bench supply converted to a live assignment.",
        "tips": [
          "Not performance ratings.",
          "Learning may fill gaps while on bench."
        ],
        "related": [
          "resources-staffing-request",
          "project-team-capacity"
        ]
      },
      {
        "id": "finance-dashboard",
        "module": "finance",
        "feature": "Dashboard",
        "title": "Scan finance health and drill a red KPI",
        "route": "/finance/dashboard",
        "roles": [
          "Finance manager",
          "Executive"
        ],
        "prerequisites": [
          "dashboardEnabled"
        ],
        "steps": [
          "Open **Finance → Finance dashboard**.",
          "Read KPIs.",
          "Drill invoices, POs, or project financials.",
          "Correct the source register, then refresh."
        ],
        "outcome": "Tower used as a view of PO / invoice / project finance.",
        "tips": [
          "Payroll has its own dashboard.",
          "Analytics finance is exec grain."
        ],
        "related": [
          "hrms-create-invoice",
          "sales-create-po"
        ]
      },
      {
        "id": "finance-project-financials",
        "module": "finance",
        "feature": "Project financials",
        "title": "Inspect a project’s billed vs contracted",
        "route": "/finance/project-financials",
        "roles": [
          "Finance manager",
          "Executive"
        ],
        "prerequisites": [
          "projectFinancialsEnabled"
        ],
        "steps": [
          "Open **Finance → Project financials**.",
          "Open a project.",
          "Compare contract (PO), billed invoices, and delivery.",
          "Fix PO/invoice/project on those screens if a number is wrong."
        ],
        "outcome": "Financial picture read from Project + PO + invoices.",
        "tips": [
          "Timesheet hours feed cost when configured.",
          "Revenue recognition is a sibling process."
        ],
        "related": [
          "sales-link-po-project",
          "hrms-create-invoice"
        ]
      },
      {
        "id": "finance-billing-plans",
        "module": "finance",
        "feature": "Billing",
        "title": "Attach a billing plan to a contract",
        "route": "/finance/billing-plans",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "billingPlansEnabled"
        ],
        "steps": [
          "Open **Finance → Billing plans**.",
          "Select a PO or project the product requires.",
          "Set milestones or recurring schedule.",
          "Generate or expect invoices from that plan — do not double-key the same bill."
        ],
        "outcome": "Plan stored; invoices still the bill documents.",
        "tips": [
          "Revenue recognition may consume the same milestones.",
          "Credit notes adjust invoices, not the plan alone."
        ],
        "related": [
          "hrms-create-invoice",
          "finance-revenue-recognition"
        ]
      },
      {
        "id": "finance-revenue-forecast",
        "module": "finance",
        "feature": "Forecast",
        "title": "Read forecast vs pipeline and open a gap",
        "route": "/finance/revenue-forecast",
        "roles": [
          "Finance manager",
          "Executive"
        ],
        "prerequisites": [
          "revenueForecastEnabled"
        ],
        "steps": [
          "Open **Finance → Revenue forecast**.",
          "Pick a horizon.",
          "Compare to bids/POs/plans.",
          "Fix the source (bid stage, PO, plan) if the forecast looks invented."
        ],
        "outcome": "Forecast treated as a view of commercial sources.",
        "tips": [
          "Bids are not booked.",
          "Analytics finance may chart similar grain."
        ],
        "related": [
          "sales-create-bid",
          "sales-create-po"
        ]
      },
      {
        "id": "finance-revenue-leakage",
        "module": "finance",
        "feature": "Leakage",
        "title": "Investigate an unbilled leakage row",
        "route": "/finance/revenue-leakage",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "revenueLeakageEnabled"
        ],
        "steps": [
          "Open **Finance → Revenue leakage**.",
          "Filter unbilled / variance.",
          "Open the project or PO.",
          "Raise an invoice or write-off via the proper console — not by editing the leakage chart."
        ],
        "outcome": "Leakage used as a finder; billing or write-off done on source consoles.",
        "tips": [
          "Write-offs are their own register.",
          "Timesheet lock may explain missing hours."
        ],
        "related": [
          "hrms-create-invoice",
          "finance-write-offs"
        ]
      },
      {
        "id": "finance-credit-notes",
        "module": "finance",
        "feature": "Credits",
        "title": "Issue a credit against an invoice",
        "route": "/finance/credit-notes",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "creditNotesEnabled",
          "An invoice exists"
        ],
        "steps": [
          "Open **Finance → Credit notes**.",
          "Create against an invoice.",
          "Set amount and reason.",
          "Post; confirm the invoice shows the credit."
        ],
        "outcome": "Credit document on the invoice entity family.",
        "tips": [
          "Write-offs are uncollectible, not credits.",
          "PO change is a contract change."
        ],
        "related": [
          "hrms-create-invoice",
          "finance-write-offs"
        ]
      },
      {
        "id": "finance-write-offs",
        "module": "finance",
        "feature": "Write-offs",
        "title": "Write off an uncollectible balance",
        "route": "/finance/write-offs",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "writeOffsEnabled"
        ],
        "steps": [
          "Open **Finance → Write-offs**.",
          "Select the invoice or balance the product requires.",
          "Reason and amount.",
          "Post; leakage/forecast should follow the source, not a hidden cell."
        ],
        "outcome": "Write-off recorded as its own document.",
        "tips": [
          "Credits are customer adjustments.",
          "Approval may apply."
        ],
        "related": [
          "finance-credit-notes",
          "finance-revenue-leakage"
        ]
      },
      {
        "id": "finance-revenue-recognition",
        "module": "finance",
        "feature": "Recognition",
        "title": "Run recognition for a period",
        "route": "/finance/revenue-recognition",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "revenueRecognitionEnabled"
        ],
        "steps": [
          "Open **Finance → Revenue recognition**.",
          "Confirm policies and schedules on the hub tabs.",
          "Generate / approve entries for the period.",
          "Period close when the product requires it."
        ],
        "outcome": "Recognition entries on the live contract/invoice chain.",
        "tips": [
          "Billed ≠ recognized.",
          "Hub has policies, schedules, entries, close."
        ],
        "related": [
          "finance-billing-plans",
          "hrms-create-invoice"
        ]
      },
      {
        "id": "finance-vendor-costs",
        "module": "finance",
        "feature": "Vendors",
        "title": "Inspect spend for a vendor",
        "route": "/finance/vendor-costs",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "vendorCostsEnabled"
        ],
        "steps": [
          "Open **Finance → Vendor costs**.",
          "Filter a vendor.",
          "Open linked PO / vendor invoice.",
          "Correct those documents if the cost is wrong."
        ],
        "outcome": "Spend read from vendor + PO + vendor invoices.",
        "tips": [
          "Admin vendors is the master.",
          "Employee expenses are payroll/finance expenses."
        ],
        "related": [
          "admin-vendors",
          "finance-vendor-invoices"
        ]
      },
      {
        "id": "finance-vendor-invoices",
        "module": "finance",
        "feature": "Vendors",
        "title": "Record a supplier invoice",
        "route": "/vendors/invoices",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "vendorInvoicesEnabled"
        ],
        "steps": [
          "Open **Finance → Vendor invoices** (or Vendors invoices).",
          "Create against a vendor / PO.",
          "Capture lines and status.",
          "Do not enter it on platform invoices — those are customer bills."
        ],
        "outcome": "Supplier invoice stored; vendor costs follow.",
        "tips": [
          "Platform invoices are /finance/invoice.",
          "Vendor master is Admin vendors."
        ],
        "related": [
          "admin-vendors",
          "finance-vendor-costs"
        ]
      },
      {
        "id": "finance-expenses",
        "module": "finance",
        "feature": "Expenses",
        "title": "Review an employee expense as finance",
        "route": "/finance/expenses",
        "roles": [
          "Finance manager"
        ],
        "prerequisites": [
          "expensesEnabled"
        ],
        "steps": [
          "Open **Finance → Expenses (finance view)**.",
          "Filter pending / period.",
          "Open a claim.",
          "Approve for pay or bounce; employee sees **Payroll → Expenses**."
        ],
        "outcome": "Same expense entity; finance vs employee seats.",
        "tips": [
          "Reimbursements may pay it.",
          "Not vendor invoices."
        ],
        "related": [
          "payroll-expenses",
          "payroll-reimbursements"
        ]
      },
      {
        "id": "payroll-dashboard",
        "module": "payroll",
        "feature": "Dashboard",
        "title": "Scan payroll health then open a red gate",
        "route": "/payroll/dashboard",
        "roles": [
          "Payroll manager"
        ],
        "prerequisites": [
          "dashboardEnabled"
        ],
        "steps": [
          "Open **Payroll → Payroll dashboard**.",
          "Read open runs and readiness.",
          "Drill **Payroll readiness**, **Runs**, or **Groups**.",
          "Do not calculate a run from the chart."
        ],
        "outcome": "Tower used to jump to groups/runs/readiness.",
        "tips": [
          "Admin payroll-config is the gate list.",
          "My paychecks is employee self-service."
        ],
        "related": [
          "admin-payroll-config",
          "payroll-create-run"
        ]
      },
      {
        "id": "payroll-groups",
        "module": "payroll",
        "feature": "Groups",
        "title": "Define a payroll group",
        "route": "/payroll/groups",
        "roles": [
          "Payroll manager"
        ],
        "prerequisites": [
          "groupsEnabled"
        ],
        "steps": [
          "Open **Payroll → Payroll groups**.",
          "Create or edit a group.",
          "Attach Employees by rule or list the product supports.",
          "Use the group on a run."
        ],
        "outcome": "Group is a population over Employee.",
        "tips": [
          "Do not duplicate people.",
          "Structures still attach to employees."
        ],
        "related": [
          "payroll-create-run",
          "hrms-create-employee"
        ]
      },
      {
        "id": "payroll-salary-structures",
        "module": "payroll",
        "feature": "Structures",
        "title": "Assign a salary structure to an employee",
        "route": "/payroll/salary-structures",
        "roles": [
          "Payroll manager"
        ],
        "prerequisites": [
          "salaryStructuresEnabled"
        ],
        "steps": [
          "Open **Payroll → Salary structures**.",
          "Create or edit a structure.",
          "Assign to Employee.",
          "Next run uses it; offers are not this register."
        ],
        "outcome": "Structure on Employee for payroll calculate.",
        "tips": [
          "Mask compensation.",
          "Deductions may overlay."
        ],
        "related": [
          "payroll-manage-deductions",
          "recruiting-offers"
        ]
      },
      {
        "id": "payroll-benefits",
        "module": "payroll",
        "feature": "Benefits",
        "title": "See a benefit deduction on payroll",
        "route": "/payroll/benefits",
        "roles": [
          "Payroll manager",
          "HR admin"
        ],
        "prerequisites": [
          "benefitsEnabled"
        ],
        "steps": [
          "Open **Payroll → Benefits (payroll)**.",
          "Find the employee/plan.",
          "Confirm enrollment feeds the run.",
          "Deep plan admin may live under **Benefits plans**."
        ],
        "outcome": "Payroll sees benefit impact; plans remain the catalog.",
        "tips": [
          "Enrollment is employee/HR.",
          "Carrier files are a sibling."
        ],
        "related": [
          "benefits-plans",
          "payroll-create-run"
        ]
      },
      {
        "id": "benefits-plans",
        "module": "payroll",
        "feature": "Benefits",
        "title": "Publish a benefits plan",
        "route": "/benefits/plans",
        "roles": [
          "HR admin",
          "Payroll manager"
        ],
        "prerequisites": [
          "benefitsEnabled"
        ],
        "steps": [
          "Open **Payroll → Benefits plans**.",
          "Create or edit a plan.",
          "Publish for enrollment.",
          "Do not store medical diagnoses on the plan record."
        ],
        "outcome": "Plan catalog updated; employees enroll separately.",
        "tips": [
          "Carrier files exchange elections.",
          "Payroll benefits shows pay impact."
        ],
        "related": [
          "benefits-enrollment",
          "payroll-benefits"
        ]
      },
      {
        "id": "benefits-enrollment",
        "module": "payroll",
        "feature": "Benefits",
        "title": "Elect a benefits plan",
        "route": "/benefits/enrollment",
        "roles": [
          "Employee",
          "HR admin"
        ],
        "prerequisites": [
          "benefitsEnabled",
          "Published plan"
        ],
        "steps": [
          "Open **Payroll → Benefits enrollment**.",
          "Select the employee (self or HR).",
          "Elect plans.",
          "Confirm payroll benefits and next run."
        ],
        "outcome": "Election on Employee; pay and carrier follow.",
        "tips": [
          "Windowed open enrollment.",
          "Life events follow product rules."
        ],
        "related": [
          "benefits-plans",
          "payroll-benefits"
        ]
      },
      {
        "id": "benefits-carrier-files",
        "module": "payroll",
        "feature": "Benefits",
        "title": "Generate a carrier file from enrollments",
        "route": "/benefits/carrier-files",
        "roles": [
          "HR admin",
          "Payroll manager"
        ],
        "prerequisites": [
          "benefitsEnabled"
        ],
        "steps": [
          "Open **Payroll → Benefits carrier files**.",
          "Pick carrier / period.",
          "Generate from live enrollments.",
          "Send/receive; fix elections if the file is wrong — do not only patch the flat file as truth."
        ],
        "outcome": "File produced from Employee elections.",
        "tips": [
          "Integrations hub may host the pipe.",
          "PHI in files — handle as sensitive."
        ],
        "related": [
          "benefits-enrollment",
          "integrations-configure"
        ]
      },
      {
        "id": "benefits-reports",
        "module": "payroll",
        "feature": "Benefits",
        "title": "Export a benefits census snapshot",
        "route": "/benefits/reports",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "benefitsEnabled"
        ],
        "steps": [
          "Open **Payroll → Benefits reports**.",
          "Pick report and filters.",
          "Export.",
          "If counts are wrong, fix enrollment, rerun."
        ],
        "outcome": "Snapshot of elections/plans.",
        "tips": [
          "Masking on exports.",
          "Analytics payroll may include cost grain."
        ],
        "related": [
          "benefits-enrollment",
          "analytics-payroll"
        ]
      },
      {
        "id": "payroll-compensation",
        "module": "payroll",
        "feature": "Compensation",
        "title": "Record a compensation award",
        "route": "/payroll/compensation",
        "roles": [
          "HR admin",
          "Payroll manager"
        ],
        "prerequisites": [
          "compensationEnabled"
        ],
        "steps": [
          "Open **Payroll → Compensation**.",
          "Select cycle/person.",
          "Record award; mask as required.",
          "Push to salary structures / next run per process — do not leave the award as the only pay source if structures must change."
        ],
        "outcome": "Award on Employee; structures/run still calculate pay.",
        "tips": [
          "Performance reviews inform, they are not this register.",
          "Graph snippets stay masked."
        ],
        "related": [
          "payroll-salary-structures",
          "performance-complete-review"
        ]
      },
      {
        "id": "payroll-reimbursements",
        "module": "payroll",
        "feature": "Reimbursements",
        "title": "Pay an approved expense reimbursement",
        "route": "/payroll/reimbursements",
        "roles": [
          "Payroll manager",
          "Finance manager"
        ],
        "prerequisites": [
          "reimbursementsEnabled"
        ],
        "steps": [
          "Open **Payroll → Reimbursements**.",
          "Select approved claims.",
          "Include in payout / run per product.",
          "Employee sees the expense status and eventually the slip or payout."
        ],
        "outcome": "Approved expense paid via reimbursement path.",
        "tips": [
          "Finance expenses is the ops review.",
          "Vendor invoices are suppliers."
        ],
        "related": [
          "payroll-expenses",
          "finance-expenses"
        ]
      },
      {
        "id": "payroll-employee-finance",
        "module": "payroll",
        "feature": "Employee finance",
        "title": "Open a person’s finance hub then jump to structures",
        "route": "/payroll/employee-finance",
        "roles": [
          "Payroll manager",
          "HR admin"
        ],
        "prerequisites": [
          "employeeFinanceEnabled"
        ],
        "steps": [
          "Open **Payroll → Employee finance**.",
          "Select Employee.",
          "Jump to structures, deductions, benefits, or expenses.",
          "Act on those consoles."
        ],
        "outcome": "Hub used as a door; writers remain the child registers.",
        "tips": [
          "Masking on the hub.",
          "Not Employee 360 HR file."
        ],
        "related": [
          "payroll-salary-structures",
          "people-employee-360"
        ]
      },
      {
        "id": "payroll-expenses",
        "module": "payroll",
        "feature": "Expenses",
        "title": "Submit an expense claim",
        "route": "/payroll/expenses",
        "roles": [
          "Employee"
        ],
        "prerequisites": [
          "expensesEnabled"
        ],
        "steps": [
          "Open **Payroll → Expenses (employee)**.",
          "Create a claim with receipts.",
          "Submit for policy/approval.",
          "Watch finance view and reimbursements for payout."
        ],
        "outcome": "Expense entity created; finance sees the same row.",
        "tips": [
          "No duplicate vendor invoice.",
          "Policy may require receipts."
        ],
        "related": [
          "finance-expenses",
          "payroll-reimbursements"
        ]
      },
      {
        "id": "payroll-reports",
        "module": "payroll",
        "feature": "Reports",
        "title": "Export a payroll register snapshot",
        "route": "/payroll/reports",
        "roles": [
          "Payroll manager",
          "Finance manager"
        ],
        "prerequisites": [
          "reportsEnabled"
        ],
        "steps": [
          "Open **Payroll → Payroll reports**.",
          "Pick report and period.",
          "Export.",
          "If a total is wrong, fix run/sources, rerun report."
        ],
        "outcome": "Snapshot of payroll sources.",
        "tips": [
          "Masking on exports.",
          "Analytics payroll is dashboards."
        ],
        "related": [
          "payroll-create-run",
          "analytics-payroll"
        ]
      },
      {
        "id": "performance-dashboard",
        "module": "performance",
        "feature": "Dashboard",
        "title": "Scan performance health then open a cycle",
        "route": "/performance/dashboard",
        "roles": [
          "Manager",
          "HR admin"
        ],
        "prerequisites": [
          "dashboardEnabled"
        ],
        "steps": [
          "Open **Performance → Performance dashboard**.",
          "Read cycle and goal KPIs.",
          "Drill goals, cycles, or reviews.",
          "Act on those screens."
        ],
        "outcome": "Tower used as a view of goals/reviews.",
        "tips": [
          "Not payroll.",
          "Calibration is a sibling."
        ],
        "related": [
          "performance-set-goal",
          "performance-complete-review"
        ]
      },
      {
        "id": "performance-review-cycles",
        "module": "performance",
        "feature": "Cycles",
        "title": "Open a review cycle",
        "route": "/performance/review-cycles",
        "roles": [
          "HR admin"
        ],
        "prerequisites": [
          "reviewCyclesEnabled"
        ],
        "steps": [
          "Open **Performance → Review cycles**.",
          "Create or open a cycle.",
          "Set dates and population.",
          "Reviews appear on **Performance reviews** for participants."
        ],
        "outcome": "Cycle opens review records on Employees.",
        "tips": [
          "Calibration is after drafts.",
          "Payroll compensation is later."
        ],
        "related": [
          "performance-complete-review",
          "performance-calibration"
        ]
      },
      {
        "id": "performance-calibration",
        "module": "performance",
        "feature": "Calibration",
        "title": "Calibrate review ratings in a session",
        "route": "/performance/calibration",
        "roles": [
          "HR admin",
          "Manager"
        ],
        "prerequisites": [
          "calibrationEnabled",
          "Draft reviews exist"
        ],
        "steps": [
          "Open **Performance → Calibration**.",
          "Select cycle / group.",
          "Compare distribution.",
          "Adjust per policy; keep the review as the narrative source."
        ],
        "outcome": "Calibrated ratings on the review records.",
        "tips": [
          "Not a compensation worksheet.",
          "Mask in exports."
        ],
        "related": [
          "performance-complete-review",
          "payroll-compensation"
        ]
      },
      {
        "id": "performance-continuous-feedback",
        "module": "performance",
        "feature": "Feedback",
        "title": "Give continuous feedback",
        "route": "/performance/feedback",
        "roles": [
          "Employee",
          "Manager"
        ],
        "prerequisites": [
          "continuousFeedbackEnabled"
        ],
        "steps": [
          "Open **Performance → Continuous feedback**.",
          "Give or request feedback on a person.",
          "Keep it out of project Feedback campaigns.",
          "Reviews may pull themes later."
        ],
        "outcome": "Feedback stored on the talent record, not the project campaign tool.",
        "tips": [
          "Project → Feedback is stakeholder surveys.",
          "Mask sensitive notes."
        ],
        "related": [
          "performance-complete-review",
          "project-submit-feedback"
        ]
      },
      {
        "id": "performance-1on1",
        "module": "performance",
        "feature": "1:1",
        "title": "Capture a 1:1 note",
        "route": "/performance/1on1",
        "roles": [
          "Manager",
          "Employee"
        ],
        "prerequisites": [
          "oneOnOnesEnabled"
        ],
        "steps": [
          "Open **Performance → 1:1 notes**.",
          "Select the other person.",
          "Write the note.",
          "Do not paste it into project chat as the only copy if it is talent-sensitive."
        ],
        "outcome": "1:1 stored on the talent side.",
        "tips": [
          "Growth plans may follow.",
          "Mask."
        ],
        "related": [
          "performance-growth-plans",
          "performance-continuous-feedback"
        ]
      },
      {
        "id": "performance-growth-plans",
        "module": "performance",
        "feature": "Growth",
        "title": "Create a growth plan and assign learning",
        "route": "/performance/growth-plans",
        "roles": [
          "Manager",
          "Employee"
        ],
        "prerequisites": [
          "growthPlansEnabled"
        ],
        "steps": [
          "Open **Performance → Growth plans**.",
          "Create a plan on the person.",
          "Link learning assignments if upskill is needed.",
          "Do not treat it as a payroll document."
        ],
        "outcome": "Plan on Employee; courses still assigned in learning.",
        "tips": [
          "Learning catalog is separate.",
          "Reviews may reference the plan."
        ],
        "related": [
          "learning-assignments",
          "performance-complete-review"
        ]
      },
      {
        "id": "analytics-hub",
        "module": "analytics",
        "feature": "Hub",
        "title": "Pick a domain from the analytics hub",
        "route": "/analytics/hub",
        "roles": [
          "Executive",
          "HR admin",
          "Finance manager",
          "Admin"
        ],
        "prerequisites": [
          "analyticsPlatformEnabled"
        ],
        "steps": [
          "Open **Analytics → Analytics hub**.",
          "Read which domain packs are on for your persona.",
          "Open workforce, delivery, finance, or another domain.",
          "Drill from that pack to the source register."
        ],
        "outcome": "Reached a domain analytics pack, then the owning entity.",
        "tips": [
          "Control tower is the exec cut.",
          "Report builder is ad-hoc, not a pack."
        ],
        "related": [
          "analytics-control-tower",
          "analytics-report-builder"
        ]
      },
      {
        "id": "analytics-executive",
        "module": "analytics",
        "feature": "Executive",
        "title": "Read executive analytics then open a source",
        "route": "/analytics/executive",
        "roles": [
          "Executive",
          "Finance manager"
        ],
        "prerequisites": [
          "executiveEnabled"
        ],
        "steps": [
          "Open **Analytics → Executive analytics**.",
          "Filter period / unit.",
          "Open a chart that needs a decision.",
          "Land on the project, PO, or people register."
        ],
        "outcome": "Exec grain used as a view, source updated elsewhere.",
        "tips": [
          "Control tower is the one-glance sibling.",
          "AI insights may card the same sources."
        ],
        "related": [
          "analytics-control-tower",
          "analytics-ai-insights"
        ]
      },
      {
        "id": "analytics-workforce",
        "module": "analytics",
        "feature": "Workforce",
        "title": "Read workforce analytics then open an employee",
        "route": "/analytics/workforce",
        "roles": [
          "HR admin",
          "Executive"
        ],
        "prerequisites": [
          "workforceEnabled"
        ],
        "steps": [
          "Open **Analytics → Workforce analytics**.",
          "Read headcount and movement.",
          "Drill a team or joiner/leaver cluster.",
          "Open **Employees** or onboarding/offboarding — do not edit a person on the chart."
        ],
        "outcome": "Workforce pack used as a view of Employee.",
        "tips": [
          "Org chart is structure.",
          "Payroll analytics is pay grain."
        ],
        "related": [
          "hrms-create-employee",
          "people-start-onboarding"
        ]
      },
      {
        "id": "analytics-delivery",
        "module": "analytics",
        "feature": "Delivery",
        "title": "Read delivery analytics then open a project",
        "route": "/analytics/delivery",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "deliveryEnabled"
        ],
        "steps": [
          "Open **Analytics → Delivery analytics**.",
          "Read throughput and slip.",
          "Open the red project or deliverable (Task).",
          "Move work on the board or details — not on the chart."
        ],
        "outcome": "Delivery pack used as a view of Project / Task / TaskActivity.",
        "tips": [
          "NPD gates are not tasks.",
          "Portfolio is the PM tower."
        ],
        "related": [
          "project-create-project",
          "project-update-taskboard"
        ]
      },
      {
        "id": "analytics-resource",
        "module": "analytics",
        "feature": "Resources",
        "title": "Read resource intelligence then open capacity",
        "route": "/analytics/resource",
        "roles": [
          "Resource manager",
          "Project manager"
        ],
        "prerequisites": [
          "resourcesEnabled"
        ],
        "steps": [
          "Open **Analytics → Resource intelligence**.",
          "Read load, bench, coverage.",
          "Open **Team capacity** or **Skills** to change assignments.",
          "Simulation stays on Capacity simulation until you commit."
        ],
        "outcome": "Pack used as a view; roster still edited on capacity.",
        "tips": [
          "Skills matrix is the skill register.",
          "Staffing requests are demand."
        ],
        "related": [
          "project-team-capacity",
          "resources-skills-matrix"
        ]
      },
      {
        "id": "analytics-payroll",
        "module": "analytics",
        "feature": "Payroll",
        "title": "Read payroll analytics then open a run",
        "route": "/analytics/payroll",
        "roles": [
          "Payroll manager",
          "Finance manager"
        ],
        "prerequisites": [
          "payrollEnabled"
        ],
        "steps": [
          "Open **Analytics → Payroll analytics**.",
          "Read cycle themes with masking on.",
          "Open **Runs**, **Groups**, or **Payroll dashboard** to act.",
          "Never key a net pay on the chart."
        ],
        "outcome": "Pay grain viewed; run still calculated on payroll.",
        "tips": [
          "My paychecks is employee.",
          "AI must not log raw nets."
        ],
        "related": [
          "payroll-create-run",
          "payroll-view-paycheck"
        ]
      },
      {
        "id": "analytics-finance",
        "module": "analytics",
        "feature": "Finance",
        "title": "Read financial analytics then open a contract",
        "route": "/analytics/finance",
        "roles": [
          "Finance manager",
          "Executive"
        ],
        "prerequisites": [
          "financeEnabled"
        ],
        "steps": [
          "Open **Analytics → Financial analytics**.",
          "Read margin, billing, leakage themes.",
          "Open the purchase contract, invoice, or project financials.",
          "Correct the commercial register, not the chart."
        ],
        "outcome": "Finance pack used as a view of PO / invoice / project financials.",
        "tips": [
          "Vendor invoices are AP.",
          "Payroll analytics is pay."
        ],
        "related": [
          "hrms-create-invoice",
          "sales-create-po"
        ]
      },
      {
        "id": "analytics-approvals",
        "module": "analytics",
        "feature": "Approvals",
        "title": "Read approvals analytics then open the inbox",
        "route": "/analytics/approvals",
        "roles": [
          "Manager",
          "HR admin"
        ],
        "prerequisites": [
          "approvalsEnabled"
        ],
        "steps": [
          "Open **Analytics → Approvals analytics**.",
          "Read aging and volume by domain.",
          "Open **My approvals** or the domain request to decide.",
          "Policies still live under Admin → Approval policies."
        ],
        "outcome": "Pack used as a view of the approval engine.",
        "tips": [
          "Delegation is Admin.",
          "Do not approve on the chart."
        ],
        "related": [
          "workspace-approvals",
          "admin-approval-policies"
        ]
      },
      {
        "id": "analytics-risk",
        "module": "analytics",
        "feature": "Risk",
        "title": "Read risk intelligence then open a risk",
        "route": "/analytics/risk",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "riskEnabled"
        ],
        "steps": [
          "Open **Analytics → Risk intelligence**.",
          "Read heat across portfolio.",
          "Open **Projects → Risks** (or issues/RCA) to write the row.",
          "AI risk agent may suggest; the register still owns the risk."
        ],
        "outcome": "Pack used as a view of project risk/issue records.",
        "tips": [
          "NPD gates are not this log.",
          "AI audit stores masked summaries."
        ],
        "related": [
          "project-risks",
          "ai-agent-query"
        ]
      },
      {
        "id": "analytics-work-graph",
        "module": "analytics",
        "feature": "Work graph",
        "title": "Read work graph analytics then open a node’s source",
        "route": "/analytics/work-graph",
        "roles": [
          "Admin",
          "Executive",
          "Analyst"
        ],
        "prerequisites": [
          "workGraphEnabled"
        ],
        "steps": [
          "Open **Analytics → Work graph analytics**.",
          "Read graph health and clusters.",
          "Open **Workspace → Work graph** to inspect a node.",
          "Follow the source reference — Employee, Project, Task — never treat the snippet as the file."
        ],
        "outcome": "Graph analytics used as a view; source entity remains truth.",
        "tips": [
          "Snippets stay masked.",
          "Search is on the explorer."
        ],
        "related": [
          "workspace-work-graph",
          "analytics-ai-insights"
        ]
      },
      {
        "id": "analytics-scheduled-reports",
        "module": "analytics",
        "feature": "Scheduled reports",
        "title": "Schedule a saved analytics report",
        "route": "/analytics/scheduled-reports",
        "roles": [
          "Admin",
          "Finance manager",
          "HR admin"
        ],
        "prerequisites": [
          "scheduledReportsEnabled",
          "A saved report definition"
        ],
        "steps": [
          "Open **Analytics → Scheduled reports**.",
          "Pick a saved definition from Report builder (or an allowed pack export).",
          "Set cadence and recipients who already have the grant.",
          "Do not use schedule to bypass persona masking."
        ],
        "outcome": "Cadence stored; each send still masked per recipient persona.",
        "tips": [
          "Recipients without grant should not be added.",
          "Jobs console is platform cron, not this."
        ],
        "related": [
          "analytics-report-builder",
          "admin-jobs"
        ]
      },
      {
        "id": "ai-wbs-assistant",
        "module": "ai",
        "feature": "WBS",
        "title": "Draft a WBS then save tasks on the project",
        "route": "/ai/wbs-assistant",
        "roles": [
          "Project manager"
        ],
        "prerequisites": [
          "wbsEnabled",
          "A live Project"
        ],
        "steps": [
          "Open **AI Intelligence → WBS assistant**.",
          "Select the Project (and purchase contract context if shown).",
          "Generate a draft breakdown.",
          "Accept rows onto **Task** / **TaskActivity** — discard the rest.",
          "Finish structure on the board or work items."
        ],
        "outcome": "Draft consumed into Task / TaskActivity; chat is not the WBS.",
        "tips": [
          "NPD ideas are not tasks.",
          "Deliverable = Task."
        ],
        "related": [
          "project-create-work-item",
          "project-add-deliverable"
        ]
      },
      {
        "id": "ai-staffing-agent",
        "module": "ai",
        "feature": "Staffing",
        "title": "Take a staffing suggestion to the planner",
        "route": "/ai/staffing-agent",
        "roles": [
          "Resource manager",
          "Project manager"
        ],
        "prerequisites": [
          "staffingEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Staffing agent**.",
          "Describe demand or pick a project.",
          "Review suggested people (skills + load).",
          "Commit on **Team capacity** or raise a **Staffing request**."
        ],
        "outcome": "Suggestion used; roster write is on capacity or the request.",
        "tips": [
          "Simulation first if the move is risky.",
          "Mask cost rates."
        ],
        "related": [
          "resources-staffing-request",
          "project-team-capacity"
        ]
      },
      {
        "id": "ai-timesheet-agent",
        "module": "ai",
        "feature": "Timesheet",
        "title": "Use timesheet hints then log hours on the timesheet",
        "route": "/ai/timesheet-agent",
        "roles": [
          "Employee",
          "Manager"
        ],
        "prerequisites": [
          "timesheetEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Timesheet agent**.",
          "Read missing-day or allocation hints.",
          "Open **People → Timesheet** (or approval) to enter or decide.",
          "Do not treat the agent as a posted week."
        ],
        "outcome": "Hints consumed; hours still on the timesheet record.",
        "tips": [
          "Approval engine unchanged.",
          "Locking still applies."
        ],
        "related": [
          "hrms-log-timesheet",
          "hrms-approve-timesheet"
        ]
      },
      {
        "id": "ai-payroll-readiness",
        "module": "ai",
        "feature": "Payroll readiness",
        "title": "Clear a readiness hint then open the payroll run",
        "route": "/ai/payroll-readiness",
        "roles": [
          "Payroll manager"
        ],
        "prerequisites": [
          "payrollReadinessEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Payroll readiness agent**.",
          "Read open gates and exceptions (masked).",
          "Fix timesheets, attendance, or config on those consoles.",
          "Calculate on **Payroll → Runs** — not in the agent."
        ],
        "outcome": "Hints cleared on source; run still calculated on payroll.",
        "tips": [
          "Admin payroll-config is the gate list.",
          "No raw nets in the transcript."
        ],
        "related": [
          "payroll-create-run",
          "hrms-submit-timesheet"
        ]
      },
      {
        "id": "ai-risk-agent",
        "module": "ai",
        "feature": "Risk",
        "title": "Take a risk suggestion to the project log",
        "route": "/ai/risk-agent",
        "roles": [
          "Project manager",
          "Executive"
        ],
        "prerequisites": [
          "riskEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Risk agent**.",
          "Review suggested concentrations.",
          "Open **Projects → Risks** (or issues) and write or update the row.",
          "Ignore suggestions that do not match the project file."
        ],
        "outcome": "Suggestion filed on the project risk register or discarded.",
        "tips": [
          "Analytics risk is the pack.",
          "NPD gates are not this log."
        ],
        "related": [
          "project-risks",
          "analytics-risk"
        ]
      },
      {
        "id": "ai-executive-briefing",
        "module": "ai",
        "feature": "Executive briefing",
        "title": "Read an executive briefing then verify a citation",
        "route": "/ai/executive-briefing",
        "roles": [
          "Executive",
          "Finance manager",
          "Admin"
        ],
        "prerequisites": [
          "executiveBriefingEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Executive briefing**.",
          "Read the narrative.",
          "Open each material citation (project, PO, people).",
          "Use **Executive control tower** if you need the non-AI cut."
        ],
        "outcome": "Briefing used as narrative; sources verified.",
        "tips": [
          "Mask pay.",
          "Do not paste the briefing into Work Graph unmasked."
        ],
        "related": [
          "analytics-control-tower",
          "ai-agent-query"
        ]
      },
      {
        "id": "ai-recommendations",
        "module": "ai",
        "feature": "Recommendations",
        "title": "Complete a recommendation on its source screen",
        "route": "/ai/recommendations",
        "roles": [
          "Manager",
          "Executive",
          "Admin"
        ],
        "prerequisites": [
          "recommendationsEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Recommendations**.",
          "Open a suggestion and read its source entity.",
          "Act on that console (task, approval, staffing, risk).",
          "Dismiss or complete the recommendation only after the source moved."
        ],
        "outcome": "Action taken on the source; recommendation is a pointer.",
        "tips": [
          "Not My work.",
          "Not a second Task table."
        ],
        "related": [
          "workspace-my-work",
          "analytics-ai-insights"
        ]
      },
      {
        "id": "ai-knowledge",
        "module": "ai",
        "feature": "Knowledge",
        "title": "Publish a knowledge article an agent can cite",
        "route": "/ai/knowledge",
        "roles": [
          "Admin",
          "Project manager"
        ],
        "prerequisites": [
          "knowledgeEnabled"
        ],
        "steps": [
          "Open **AI Intelligence → Knowledge & RCA**.",
          "Add or edit an article with source references.",
          "Keep snippets masked — no salary, bank, medical, raw reviews.",
          "Confirm agents cite the article instead of inventing policy."
        ],
        "outcome": "Corpus updated; live RCA still on Projects → RCA when it is an incident file.",
        "tips": [
          "Project RCA is the incident register.",
          "Policies for people live under People → Policies."
        ],
        "related": [
          "project-rca",
          "people-acknowledge-policy"
        ]
      },
      {
        "id": "integrations-connections",
        "module": "integrations",
        "feature": "Connections",
        "title": "Add or rotate a connector connection",
        "route": "/integrations/connections",
        "roles": [
          "Integration admin"
        ],
        "prerequisites": [
          "connectionsEnabled"
        ],
        "steps": [
          "Open **Integrations → Connections**.",
          "Add or open a connector instance.",
          "Set environment and credentials.",
          "Test, then map on **Data mapping**."
        ],
        "outcome": "Instance stored; mapping and jobs still sibling screens.",
        "tips": [
          "Marketplace installs the type.",
          "Admin API keys are a different vault."
        ],
        "related": [
          "integrations-configure",
          "integrations-sync-health"
        ]
      },
      {
        "id": "integrations-marketplace",
        "module": "integrations",
        "feature": "Marketplace",
        "title": "Install a connector type from the marketplace",
        "route": "/integrations/marketplace",
        "roles": [
          "Integration admin"
        ],
        "prerequisites": [
          "marketplaceEnabled"
        ],
        "steps": [
          "Open **Integrations → Connector marketplace**.",
          "Find a type (CRM, HRIS, identity, etc.).",
          "Install, then finish **Connections** and **Mapping**.",
          "Do not expect a named vendor to replace Project or Employee."
        ],
        "outcome": "Type available; instance and map still required.",
        "tips": [
          "Adapters page is runtime.",
          "Work-time import is generic."
        ],
        "related": [
          "integrations-configure",
          "integrations-worktime-sync"
        ]
      },
      {
        "id": "integrations-api-access",
        "module": "integrations",
        "feature": "API access",
        "title": "Issue an integration API token with least privilege",
        "route": "/integrations/api-access",
        "roles": [
          "Integration admin",
          "Admin"
        ],
        "prerequisites": [
          "apiAccessEnabled"
        ],
        "steps": [
          "Open **Integrations → API access**.",
          "Create a token with the smallest scope.",
          "Use the Integration API console or external caller.",
          "Rotate on a schedule; never paste into AI chat."
        ],
        "outcome": "Scoped token issued; platform developer keys still on Admin.",
        "tips": [
          "tk_* project create is documented separately.",
          "Webhooks are Admin developer."
        ],
        "related": [
          "admin-api-keys",
          "integrations-configure"
        ]
      },
      {
        "id": "integrations-mapping",
        "module": "integrations",
        "feature": "Mapping",
        "title": "Map vendor fields onto canonical entities",
        "route": "/integrations/mapping",
        "roles": [
          "Integration admin"
        ],
        "prerequisites": [
          "mappingEnabled",
          "A connection exists"
        ],
        "steps": [
          "Open **Integrations → Data mapping**.",
          "Select the connector profile.",
          "Map external fields to Employee / Project / PO / Task / time.",
          "Save, then test a sync and confirm the product row."
        ],
        "outcome": "Profile stored; business rows still canonical.",
        "tips": [
          "Do not map salary into Work Graph snippets.",
          "External id must be stable."
        ],
        "related": [
          "integrations-configure",
          "integrations-worktime-sync"
        ]
      },
      {
        "id": "integrations-jobs",
        "module": "integrations",
        "feature": "Jobs",
        "title": "Run or retry a connector import/export job",
        "route": "/integrations/jobs",
        "roles": [
          "Integration admin",
          "Ops"
        ],
        "prerequisites": [
          "jobsEnabled"
        ],
        "steps": [
          "Open **Integrations → Import/export jobs**.",
          "Select a job bound to a connection and mapping.",
          "Run or retry.",
          "Confirm rows on the canonical register; check **Sync monitor**."
        ],
        "outcome": "Batch ran; source entities updated or exported.",
        "tips": [
          "Admin → Scheduled jobs is platform cron.",
          "Do not double-run non-idempotent jobs."
        ],
        "related": [
          "integrations-sync-health",
          "admin-jobs"
        ]
      },
      {
        "id": "integrations-logs",
        "module": "integrations",
        "feature": "Logs",
        "title": "Inspect a connector log then fix mapping or data",
        "route": "/integrations/logs",
        "roles": [
          "Integration admin",
          "Ops"
        ],
        "prerequisites": [
          "logsEnabled"
        ],
        "steps": [
          "Open **Integrations → Integration logs**.",
          "Filter by connector and time.",
          "Open a failed entry — confirm payloads are masked for sensitive fields.",
          "Fix mapping or the source entity; retry from jobs."
        ],
        "outcome": "Failure understood; canonical data or map corrected.",
        "tips": [
          "Admin audit is org events.",
          "Do not paste logs into AI unmasked."
        ],
        "related": [
          "integrations-sync-health",
          "admin-audit-review"
        ]
      }
      /* END-REMAINING-HOWTO-SCENARIOS */
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
