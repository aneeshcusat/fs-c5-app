/**
 * Rich enrichment metadata for Tracopus scenario guide pages.
 * Keyed by scenario id from scenarios-data.js.
 */
(function (global) {
  'use strict';

  var SCENARIO_ENRICHMENT = {
  "auth-login-email": {
    "context": "Every Tracopus user begins here before accessing Workspace, Project, HRMS, or People modules. Email and password login uses Tracopus (FS) credentials provisioned during employee creation Access and Sign-in steps. Use this path when SSO is unavailable, for break-glass admin access, or when testing persona RBAC with a dedicated test account.",
    "summary": "Sign in with work email and FS password to establish a Tracopus web session.",
    "permissions": [
      {
        "name": "HRMS module access",
        "path": "hrmsModules.active",
        "level": "Inherited from role",
        "notes": "Not required for login itself; determines post-login default module."
      },
      {
        "name": "Profile self-service",
        "path": "hrmsModules.profileEnabled",
        "level": "Read",
        "notes": "Available after authentication for password and notification settings."
      },
      {
        "name": "Employee record active",
        "path": "employees.status",
        "level": "Active",
        "notes": "Inactive employees cannot authenticate even with valid credentials."
      },
      {
        "name": "Platform login enabled",
        "path": "employees.access.platformLoginEnabled",
        "level": "True",
        "notes": "HR must enable FS password on Access tab during onboarding."
      }
    ],
    "featureFlags": [
      {
        "flag": "adminGovernanceEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admin menus visible for governance roles after login.",
        "whenDisabled": "Admin rail entries hidden; core modules unaffected."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Individual contributor",
        "effect": "Lands on Workspace or Project default per role template.",
        "notes": "Default redirect comes from hrmsModules.defaultRedirectPage or projectModules.defaultRedirectPage."
      },
      {
        "role": "HR administrator",
        "effect": "May land on HRMS dashboard with full employee directory scope.",
        "notes": "List scope flags control cross-team visibility."
      },
      {
        "role": "Org with SSO only",
        "effect": "Email login may be disabled at org unit via Sign-in settings.",
        "notes": "Child teams can inherit or override parent login method policy."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Duplicate email accounts",
        "text": "Two employee records sharing an email break both SSO and password login. Search Employees before creating accounts."
      },
      {
        "type": "danger",
        "title": "Incomplete Access setup",
        "text": "Employees without completed Access and Sign-in steps cannot log in even after activation link is sent."
      }
    ],
    "considerations": [
      "Verify activation completed before first timesheet week.",
      "Test login with each persona (employee, manager, HR admin) after Application Config changes.",
      "Confirm org unit inheritance for login method does not lock out pilot team.",
      "Session expiry and forced password change policies apply per Security tab settings."
    ],
    "verify": [
      "Valid credentials redirect to expected default module.",
      "Invalid password shows error without exposing account existence details.",
      "Inactive employee receives access denied after credential check.",
      "Forgot password link navigates to /user/forgotpassword.",
      "Session persists across page refresh until logout or expiry."
    ],
    "screenDoc": "getting-started.html"
  },
  "auth-login-sso": {
    "context": "Organizations using Microsoft Entra ID should prefer SSO for centralized identity governance and MFA enforcement. The Tracopus login page exposes a Microsoft section when SSO is configured on the employee record and org Application Config. Mobile and web share the same Entra redirect flow.",
    "summary": "Authenticate via Microsoft Entra ID for SSO parity with corporate identity policies.",
    "permissions": [
      {
        "name": "SSO enabled on employee",
        "path": "employees.access.ssoEnabled",
        "level": "True",
        "notes": "Configured in employee wizard Step 3 — Sign-in."
      },
      {
        "name": "Email match",
        "path": "employees.email",
        "level": "Exact match",
        "notes": "Entra UPN must match Tracopus employee email exactly."
      },
      {
        "name": "HRMS module",
        "path": "hrmsModules.active",
        "level": "Role-dependent",
        "notes": "Determines modules available post-SSO login."
      },
      {
        "name": "Profile access",
        "path": "hrmsModules.profileEnabled",
        "level": "Read",
        "notes": "Security tab shows linked identity provider."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Entra ID connector manageable from Integrations hub.",
        "whenDisabled": "SSO may still work if pre-configured at deployment; hub hidden."
      }
    ],
    "behaviorChanges": [
      {
        "role": "All SSO users",
        "effect": "Same RBAC and menu access as email login after token exchange.",
        "notes": "Persona permissions loaded from encrypted access control cache."
      },
      {
        "role": "Mobile user",
        "effect": "Identical Microsoft redirect in Android app.",
        "notes": "Device registration may be required per org Settings."
      },
      {
        "role": "Mixed login org",
        "effect": "Some teams inherit SSO-only; others allow FS password.",
        "notes": "Use inherit/override/lock on org unit Sign-in settings."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Email mismatch",
        "text": "SSO succeeds at Microsoft but Tracopus rejects if employee email differs from Entra UPN."
      },
      {
        "type": "warning",
        "title": "Unlinked employee",
        "text": "Microsoft account with no matching employee record cannot provision permissions automatically."
      }
    ],
    "considerations": [
      "Coordinate Entra app registration with integration admin.",
      "Test SSO from mobile and web with same test employee.",
      "Verify MFA prompts align with org security policy.",
      "Document break-glass FS password accounts for SSO outages."
    ],
    "verify": [
      "Microsoft button visible on login page when SSO configured.",
      "Successful redirect lands on default module with correct menu scope.",
      "Logout clears SSO session per browser settings.",
      "Mobile app completes same flow without duplicate accounts.",
      "Audit UI records login event when audit writes enabled."
    ],
    "screenDoc": "getting-started.html"
  },
  "auth-forgot-password": {
    "context": "Employees who forget FS passwords use self-service recovery without HR intervention. The flow sends a time-limited reset link to the registered email on the employee profile. This is the standard recovery path when SSO is not enabled or as backup for FS password accounts.",
    "summary": "Reset a forgotten FS password via emailed recovery link.",
    "permissions": [
      {
        "name": "Registered email",
        "path": "employees.email",
        "level": "Required",
        "notes": "Reset link sent only to profile email on file."
      },
      {
        "name": "Platform login",
        "path": "employees.access.platformLoginEnabled",
        "level": "True",
        "notes": "SSO-only accounts may not use password reset."
      },
      {
        "name": "Active status",
        "path": "employees.status",
        "level": "Active",
        "notes": "Inactive employees cannot reset passwords."
      }
    ],
    "featureFlags": [
      {
        "flag": "adminGovernanceEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admins can trigger forced password change from Security tab.",
        "whenDisabled": "Self-service remains primary recovery path."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Employee (FS password)",
        "effect": "Full self-service reset via /user/forgotpassword.",
        "notes": "Policy enforces complexity rules on new password."
      },
      {
        "role": "SSO-only user",
        "effect": "Forgot password may be hidden or ineffective.",
        "notes": "Direct user to IT for Entra password reset."
      },
      {
        "role": "HR admin",
        "effect": "Can resend activation or change-password links from profile.",
        "notes": "Audit trail captures admin-initiated resets when enabled."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Link expiration",
        "text": "Reset links expire per security policy; request a new link if expired."
      },
      {
        "type": "danger",
        "title": "Wrong email",
        "text": "Typos or personal emails not on employee record will not receive reset mail."
      }
    ],
    "considerations": [
      "Check spam filters during UAT.",
      "Confirm password policy requirements displayed on reset form.",
      "Test with locked-out account after max failed attempts.",
      "Verify old password invalid immediately after successful reset."
    ],
    "verify": [
      "Submit valid email shows confirmation without revealing account state.",
      "Email arrives with working reset link within expected SLA.",
      "New password meeting policy allows login.",
      "Expired link shows clear error and re-request option.",
      "Old password rejected after reset completes."
    ],
    "screenDoc": "getting-started.html"
  },
  "auth-activate-account": {
    "context": "New hires receive an activation link after HR completes employee creation and sends the invite from Step 3 — Sign-in. Activation binds FS credentials to the employee record and is required before first login, timesheet entry, or onboarding self-service tasks.",
    "summary": "Complete first-time account activation from HR invite link.",
    "permissions": [
      {
        "name": "Employee create completed",
        "path": "employees.createEnabled",
        "level": "HR role",
        "notes": "HR must finish wizard before invite is valid."
      },
      {
        "name": "Activation invite sent",
        "path": "employees.access.activationPending",
        "level": "True",
        "notes": "Status visible on employee Security tab."
      },
      {
        "name": "Onboarding access",
        "path": "peopleModules.onboardingSelfServiceEnabled",
        "level": "Optional",
        "notes": "Self-service onboarding tasks unlock after activation."
      }
    ],
    "featureFlags": [
      {
        "flag": "onboardingEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "Post-activation redirect may include People onboarding tasks.",
        "whenDisabled": "User lands on standard default module only."
      },
      {
        "flag": "onboardingSelfServiceEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "New hire sees My onboarding queue after first login.",
        "whenDisabled": "HR completes onboarding tasks on behalf of hire."
      }
    ],
    "behaviorChanges": [
      {
        "role": "New hire",
        "effect": "Sets password and activates account via unique URL key.",
        "notes": "Link includes employeeId and uniqueId parameters."
      },
      {
        "role": "HR admin",
        "effect": "Can resend activation from employee profile Access tab.",
        "notes": "Previous link invalidated on resend per policy."
      },
      {
        "role": "SSO-configured hire",
        "effect": "May skip password set and use Microsoft on first login.",
        "notes": "Depends on org unit Sign-in inheritance settings."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Expired activation link",
        "text": "HR must resend invite; expired keys cannot be reused."
      },
      {
        "type": "warning",
        "title": "Activate before timesheet week",
        "text": "Unactivated employees cannot log hours or access Workspace."
      }
    ],
    "considerations": [
      "Complete employee wizard Steps 1–3 before sending invite.",
      "Test activation on mobile browser for field staff.",
      "Verify email delivery to corporate domain.",
      "Coordinate activation timing with onboarding case start date."
    ],
    "verify": [
      "Activation link opens identity verification screen.",
      "Password set succeeds and redirects to login.",
      "First login works with new credentials or SSO.",
      "Employee status shows Active after activation.",
      "Onboarding tasks visible when flags enabled."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "auth-change-password": {
    "context": "Logged-in users and those following admin-issued change-password links update FS credentials without full account recovery. Org security policies may force password change on schedule or after compromise. Forced changes can block other pages until complete.",
    "summary": "Update FS password while authenticated or via admin link.",
    "permissions": [
      {
        "name": "Profile security access",
        "path": "hrmsModules.profileEnabled",
        "level": "Edit own",
        "notes": "Change password from Profile → Security."
      },
      {
        "name": "Platform login",
        "path": "employees.access.platformLoginEnabled",
        "level": "True",
        "notes": "SSO-only users change password in Entra, not Tracopus."
      },
      {
        "name": "Current password",
        "path": "auth.currentPasswordRequired",
        "level": "Policy",
        "notes": "Required unless using one-time admin link."
      }
    ],
    "featureFlags": [
      {
        "flag": "rbacAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admins can force password reset from Admin → Roles flow.",
        "whenDisabled": "HR uses employee profile Security tab only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Employee",
        "effect": "Self-service change from profile with current password verification.",
        "notes": "Session may invalidate requiring re-login."
      },
      {
        "role": "Admin forced reset",
        "effect": "User blocked until new password set via emailed link.",
        "notes": "Shows banner across shell until complete."
      },
      {
        "role": "Delegate/manager",
        "effect": "No access to change others passwords.",
        "notes": "HR admin handles credential issues."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Session invalidation",
        "text": "Successful change may log out other active sessions per policy."
      },
      {
        "type": "danger",
        "title": "Policy non-compliance",
        "text": "Weak passwords rejected; user must meet complexity rules."
      }
    ],
    "considerations": [
      "Test forced change flow for compliance audits.",
      "Verify password history prevents reuse if configured.",
      "Confirm mobile app prompts re-login after change.",
      "Document break-glass admin password rotation procedure."
    ],
    "verify": [
      "Valid current + new password updates successfully.",
      "Wrong current password shows error without lockout (unless policy).",
      "Forced change banner blocks navigation until complete.",
      "New password works on next login.",
      "Audit event recorded when audit writes enabled."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "workspace-approvals": {
    "context": "The universal approval inbox consolidates pending timesheet, leave, attendance regularization, and other approval domains into Workspace → Approvals. Managers, delegates, and HR admins process decisions without visiting each HRMS screen separately. Requires universalApprovalInboxEnabled at the org unit (inherit/override/lock applies to child teams).",
    "summary": "Process pending approvals from the Workspace universal inbox.",
    "permissions": [
      {
        "name": "Approvals menu",
        "path": "workspaceModules.approvalsEnabled",
        "level": "Read",
        "notes": "Tied to universalApprovalInboxEnabled org flag."
      },
      {
        "name": "Timesheet approval",
        "path": "timeSheet.enableTimeSheetApproval",
        "level": "Manager scope",
        "notes": "Timesheet items appear when timesheetApprovalEnabled is on."
      },
      {
        "name": "Leave approval",
        "path": "leaves.approveTeamEnabled",
        "level": "Team",
        "notes": "Requires leaveManagementEnabled org flag."
      },
      {
        "name": "Attendance approval",
        "path": "attendance.approveEnabled",
        "level": "Delegate eligible",
        "notes": "Regularization panel when attendanceRegularizationEnabled."
      },
      {
        "name": "Delegation inbox",
        "path": "adminModules.delegationEnabled",
        "level": "Acting-for",
        "notes": "Delegate sees scoped items with acting-for metadata."
      }
    ],
    "featureFlags": [
      {
        "flag": "universalApprovalInboxEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Workspace → Approvals aggregates cross-domain pending items.",
        "whenDisabled": "Approvers use module-specific pending panels only."
      },
      {
        "flag": "approvalDelegationEnabled",
        "group": "approvalDelegation",
        "whenEnabled": "Delegate decisions recorded with acting-for audit metadata.",
        "whenDisabled": "Only primary approver can action inbox items."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Sees team-scoped pending items grouped by type.",
        "notes": "List scope from role template controls breadth."
      },
      {
        "role": "Delegate",
        "effect": "Inbox shows delegate badge; audit UI captures acting-for.",
        "notes": "Configured on profile Delegation tab."
      },
      {
        "role": "HR admin",
        "effect": "May see cross-team items when approveAllEnabled.",
        "notes": "Persona RBAC still masks sensitive leave reasons."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Reject requires resubmission",
        "text": "Rejected timesheets and leave requests return to employee for correction before re-approval."
      },
      {
        "type": "danger",
        "title": "Payroll lock after approval",
        "text": "Approved timesheet weeks may lock; reopen requires payroll admin when payroll lock enabled."
      }
    ],
    "considerations": [
      "Enable universalApprovalInboxEnabled on pilot team before root lock.",
      "Configure delegation rules before manager PTO periods.",
      "Verify SLA reminder emails when approvalReminderEnabled.",
      "Cross-check Workspace inbox with HRMS pending panels during UAT."
    ],
    "verify": [
      "Approvals menu visible when flag and RBAC enabled.",
      "Pending timesheet appears after employee submission.",
      "Approve action updates status and notifies employee.",
      "Reject with comment returns item to employee queue.",
      "Delegate action shows acting-for in audit timeline.",
      "Leave and attendance types grouped correctly."
    ],
    "screenDoc": "interface.html"
  },
  "workspace-notifications": {
    "context": "Workspace notifications centralize project updates, approval outcomes, mentions, and system alerts. Users triage unread items and deep-link to related records from the bell icon or Workspace → Notifications. Controlled by workspaceNotificationsEnabled org flag with profile-level digest preferences.",
    "summary": "Manage notification queue and jump to related Tracopus records.",
    "permissions": [
      {
        "name": "Notifications menu",
        "path": "workspaceModules.notificationsEnabled",
        "level": "Read",
        "notes": "Requires workspaceNotificationsEnabled org flag."
      },
      {
        "name": "Profile preferences",
        "path": "hrmsModules.profileEnabled",
        "level": "Edit own",
        "notes": "Email digest and channel toggles under Profile → Notifications."
      },
      {
        "name": "Project read",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Project notification links respect team list scope."
      },
      {
        "name": "Approval read",
        "path": "workspaceModules.approvalsEnabled",
        "level": "Optional",
        "notes": "Approval alerts deep-link to Approvals inbox."
      }
    ],
    "featureFlags": [
      {
        "flag": "workspaceNotificationsEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Bell icon and Notifications page active.",
        "whenDisabled": "Users rely on email-only or module banners."
      },
      {
        "flag": "workspaceAiBriefingEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "AI summary cards may appear atop notification feed.",
        "whenDisabled": "Standard chronological notification list only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "All users",
        "effect": "Receive scoped notifications for assigned work and approvals.",
        "notes": "Masking policy may redact PII in preview text."
      },
      {
        "role": "Manager",
        "effect": "Additional alerts for team submissions and SLA breaches.",
        "notes": "Approval reminder emails fire when configured."
      },
      {
        "role": "Mobile user",
        "effect": "Push parity depends on app version; web queue is authoritative.",
        "notes": "Verify mobile notification settings separately."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stale read state",
        "text": "Mark-read may not sync instantly across tabs; refresh if counts mismatch."
      },
      {
        "type": "warning",
        "title": "Deep link scope",
        "text": "Notification link fails silently if RBAC revoked since alert was sent."
      }
    ],
    "considerations": [
      "Enable workspaceNotificationsEnabled before removing legacy email-only flows.",
      "Test digest frequency with approval-heavy managers.",
      "Confirm PII masking in notification preview per org policy.",
      "Verify bell badge count matches unread register rows."
    ],
    "verify": [
      "Bell icon shows unread count when new alert exists.",
      "Click notification opens correct record route.",
      "Mark read reduces unread badge.",
      "Profile notification preferences persist after re-login.",
      "Cross-team notifications hidden for employee persona."
    ],
    "screenDoc": "interface.html"
  },
  "hrms-create-employee": {
    "context": "HR administrators create employee records via the five-step wizard in HRMS → Employees. The workflow provisions profile, team/role access, sign-in method, org structure, and skills in one pass. Incomplete Access or Sign-in steps block login and delay onboarding cases.",
    "summary": "Create a new employee with wizard-driven profile, access, and sign-in setup.",
    "permissions": [
      {
        "name": "Employees menu",
        "path": "hrmsModules.employeesEnabled",
        "level": "Active",
        "notes": "Module must be enabled at org unit."
      },
      {
        "name": "Create employee",
        "path": "employees.createEnabled",
        "level": "Create",
        "notes": "HR administrator role template typically grants this."
      },
      {
        "name": "Application config read",
        "path": "hrmsModules.appconfigEnabled",
        "level": "Read",
        "notes": "Verify team/role templates exist before create."
      },
      {
        "name": "Team switch",
        "path": "employees.switchUserTeamsEnabled",
        "level": "Optional",
        "notes": "Assign primary and additional teams in Step 4."
      },
      {
        "name": "Archive (later)",
        "path": "employees.archiveEnabled",
        "level": "Separate",
        "notes": "Not used at create; prefer Inactive over delete."
      }
    ],
    "featureFlags": [
      {
        "flag": "onboardingEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "Post-create onboarding case can be started from People module.",
        "whenDisabled": "Manual HR follow-up only after employee exists."
      },
      {
        "flag": "employee360Enabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "360 view available after profile populated.",
        "whenDisabled": "Standard profile tabs only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR administrator",
        "effect": "Full wizard access including Access and Sign-in steps.",
        "notes": "Can send activation invite from Step 3."
      },
      {
        "role": "Manager",
        "effect": "Typically no create permission; may propose hire via access request.",
        "notes": "Persona RBAC blocks Create button."
      },
      {
        "role": "Org unit override",
        "effect": "Child team may lock createEnabled while parent allows.",
        "notes": "Use inherit/override/lock in Application Config."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Duplicate email",
        "text": "Duplicate emails break SSO and password login for both records."
      },
      {
        "type": "warning",
        "title": "Missing Sign-in step",
        "text": "Employee cannot log in until Access and Sign-in wizard steps complete."
      }
    ],
    "considerations": [
      "Search directory before create to avoid duplicate emails.",
      "Configure role template on pilot team before root rollout.",
      "Send activation invite only after Steps 1–3 validated.",
      "Tag skills in Step 5 for resources matrix accuracy."
    ],
    "verify": [
      "New employee appears in register with Active status.",
      "Primary team and role template saved on Access tab.",
      "Activation email sent when FS password selected.",
      "SSO flag saved when Microsoft sign-in chosen.",
      "Reporting manager and department visible on Organization tab.",
      "Audit UI records create when audit writes enabled."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "hrms-edit-employee": {
    "context": "HR admins and scoped managers update employee profiles across Personal, Organization, Skills, Access, Security, Leave, and Activity tabs. Changes respect persona RBAC field masking and org unit permission inheritance. Profile history and audit tabs capture compliance evidence when audit UI is enabled.",
    "summary": "Update employee profile fields with RBAC-scoped edit access.",
    "permissions": [
      {
        "name": "View employee",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "List scope controls cross-team directory access."
      },
      {
        "name": "Edit employee",
        "path": "employees.editEnabled",
        "level": "Edit",
        "notes": "Managers may have limited tab access per role template."
      },
      {
        "name": "Profile module",
        "path": "hrmsModules.profileEnabled",
        "level": "Active",
        "notes": "Profile route requires module flag."
      },
      {
        "name": "Security tab",
        "path": "employees.access.platformLoginEnabled",
        "level": "HR only",
        "notes": "MFA and platform access typically HR-restricted."
      },
      {
        "name": "Exit date update",
        "path": "employees.updateUserExitDateEnabled",
        "level": "HR",
        "notes": "Coordinates with offboarding case timing."
      }
    ],
    "featureFlags": [
      {
        "flag": "auditUiEnabled",
        "group": "auditAdditional",
        "whenEnabled": "Profile history and Activity tab show audit timeline.",
        "whenDisabled": "Limited change visibility; comments separate from audit."
      },
      {
        "flag": "maskingPolicyAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "PII fields masked per persona on profile views.",
        "whenDisabled": "Role template alone controls field visibility."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR administrator",
        "effect": "Full tab edit including Access and Security.",
        "notes": "Can revoke SSO and platform login on offboard."
      },
      {
        "role": "Manager",
        "effect": "May edit skills and team fields only.",
        "notes": "Compensation and security tabs hidden by persona."
      },
      {
        "role": "Employee (self)",
        "effect": "Limited self-service on Personal and notification prefs.",
        "notes": "Cannot elevate own role template."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Role template change",
        "text": "Changing primary role requires user re-login to refresh access cache."
      },
      {
        "type": "danger",
        "title": "Email change",
        "text": "Email edits break SSO match if Entra UPN not updated simultaneously."
      }
    ],
    "considerations": [
      "Review audit trail after sensitive Security tab edits.",
      "Test manager edit scope on pilot persona before production.",
      "Coordinate org unit changes with Application Config inheritance.",
      "Verify Employee 360 reflects updates when employee360Enabled."
    ],
    "verify": [
      "Edited fields persist after save and register refresh.",
      "Manager cannot access Security tab when RBAC restricts.",
      "Profile history shows change events when audit UI on.",
      "Skills updates appear in Resources skills matrix.",
      "Team change reflects in list scope on next login."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "hrms-deactivate-employee": {
    "context": "HR administrators deactivate departing employees by setting Inactive status and revoking platform access while retaining historical data for audit and billing. Coordinate with People offboarding cases and resolve open timesheets before access revocation. Prefer Inactive over delete for compliance retention.",
    "summary": "Deactivate employee access while retaining directory history.",
    "permissions": [
      {
        "name": "Edit employee",
        "path": "employees.editEnabled",
        "level": "Edit",
        "notes": "Required to change employment status."
      },
      {
        "name": "Archive employee",
        "path": "employees.archiveEnabled",
        "level": "Archive",
        "notes": "Alternative to Inactive filter depending on policy."
      },
      {
        "name": "Security revoke",
        "path": "employees.access.platformLoginEnabled",
        "level": "False",
        "notes": "Disable FS password and SSO on Security tab."
      },
      {
        "name": "View inactive",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "Inactive filter in Employees register."
      }
    ],
    "featureFlags": [
      {
        "flag": "offboardingEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "Structured offboarding checklist runs parallel to deactivation.",
        "whenDisabled": "Manual HR checklist outside People module."
      },
      {
        "flag": "auditEnabled",
        "group": "auditAdditional",
        "whenEnabled": "Deactivation and access revoke write audit events.",
        "whenDisabled": "Limited forensic trail for access changes."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR administrator",
        "effect": "Can set Inactive and revoke login immediately.",
        "notes": "Employee cannot authenticate after Security save."
      },
      {
        "role": "Manager",
        "effect": "Cannot deactivate; may reassign tasks only.",
        "notes": "Offboarding case owned by HR."
      },
      {
        "role": "Payroll admin",
        "effect": "Final paycheck may still reference inactive employee.",
        "notes": "Historical timesheet data retained."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Open timesheets",
        "text": "Pending submission or approval blocks clean offboard; resolve first."
      },
      {
        "type": "warning",
        "title": "Owned projects",
        "text": "Reassign project owner and open tasks before deactivation."
      }
    ],
    "considerations": [
      "Start People offboarding case before last working day.",
      "Export attendance matrix if audit copy required.",
      "Verify delegate rules removed for departing manager.",
      "Confirm mobile session invalidated after access revoke."
    ],
    "verify": [
      "Inactive employee hidden from Active register filter.",
      "Login fails with valid former credentials.",
      "Historical timesheets and projects still viewable to HR.",
      "Offboarding case linked when offboardingEnabled.",
      "Audit event captured for status and access change."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "hrms-log-timesheet": {
    "context": "Individual contributors log weekly hours against assigned projects and deliverables in HRMS → Timesheet. Validation hints enforce project linkage, billable flags, and org-configured working-day rules. Mobile field staff can mirror entries via Android app with web grid as source of truth.",
    "summary": "Log weekly billable and non-billable hours on the timesheet grid.",
    "permissions": [
      {
        "name": "Timesheet menu",
        "path": "hrmsModules.timesheetEnabled",
        "level": "Active",
        "notes": "Module flag at org unit."
      },
      {
        "name": "Time entry",
        "path": "timeSheet.enableTimeSheetEntry",
        "level": "Create",
        "notes": "Disabled when week locked or payroll approved."
      },
      {
        "name": "Time edit",
        "path": "timeSheet.enableTimeSheetEdit",
        "level": "Edit",
        "notes": "Past-week edit may be restricted by disableLastMonthAfterXDays."
      },
      {
        "name": "Project list scope",
        "path": "timeSheet.listOnlyCurrentTeamProject",
        "level": "Team",
        "notes": "Limits project picker to current team assignments."
      },
      {
        "name": "Non-billable accounts",
        "path": "timeSheet.timeSheetNonBillableShowAllAccountsEnabled",
        "level": "Optional",
        "notes": "Shows all accounts for non-billable rows when enabled."
      }
    ],
    "featureFlags": [
      {
        "flag": "timesheetApprovalEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Submit for approval button appears when week complete.",
        "whenDisabled": "Hours save directly without approval workflow."
      },
      {
        "flag": "timesheetIntelligenceEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Validation hints and conflict suggestions enhanced.",
        "whenDisabled": "Standard grid validation only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Individual contributor",
        "effect": "Logs own hours; defaults to self in employee picker.",
        "notes": "Cannot edit others weeks without delegate/HR scope."
      },
      {
        "role": "Manager",
        "effect": "May log own hours; team view separate from entry.",
        "notes": "Approval actions on different panel."
      },
      {
        "role": "Locked week",
        "effect": "Grid read-only after approval or payroll lock.",
        "notes": "Reopen requires payroll admin permission."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Missing deliverable",
        "text": "Some projects require deliverable on each row; validation blocks save."
      },
      {
        "type": "warning",
        "title": "Skills restriction",
        "text": "restrictedBySkillsEnabled limits project rows to employee skills."
      }
    ],
    "considerations": [
      "Assign projects before first timesheet week of new hire.",
      "Sync external leave when ZingHR integration enabled.",
      "Test mobile parity for field logging scenarios.",
      "Verify future week view when enableFutureTimeSheetView on."
    ],
    "verify": [
      "Hours save and persist on week navigation.",
      "Project/deliverable picker shows assigned work only.",
      "Billable toggle respects project configuration.",
      "Validation errors block save with clear hints.",
      "Mobile entries appear on web grid after sync.",
      "Locked week prevents edit with user-visible message."
    ],
    "screenDoc": "hrms/timesheet.html"
  },
  "hrms-submit-timesheet": {
    "context": "Employees submit completed timesheet weeks for manager approval when timesheetApprovalEnabled is active at the org unit. Submission moves status to Submitted and notifies approvers via Workspace or module pending panels. Resolve all validation conflicts before submit to avoid rejection cycles.",
    "summary": "Submit a completed timesheet week into the approval workflow.",
    "permissions": [
      {
        "name": "Time entry",
        "path": "timeSheet.enableTimeSheetEntry",
        "level": "Complete",
        "notes": "Week must be fully logged."
      },
      {
        "name": "Approval workflow",
        "path": "timeSheet.enableTimeSheetApproval",
        "level": "Submit",
        "notes": "Requires timesheetApprovalEnabled org flag."
      },
      {
        "name": "Timesheet module",
        "path": "hrmsModules.timesheetEnabled",
        "level": "Active",
        "notes": "Module and entry flags both required."
      }
    ],
    "featureFlags": [
      {
        "flag": "timesheetApprovalEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Submit for approval action available on complete weeks.",
        "whenDisabled": "No submission step; hours remain draft/saved only."
      },
      {
        "flag": "universalApprovalInboxEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Manager sees submission in Workspace → Approvals.",
        "whenDisabled": "Manager uses Timesheet pending panel only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Individual contributor",
        "effect": "Submit locks editing until rejected or reopened.",
        "notes": "Status chip shows Submitted."
      },
      {
        "role": "Manager",
        "effect": "Receives notification; no submit on behalf unless HR scope.",
        "notes": "Delegate can approve via delegation rules."
      },
      {
        "role": "Payroll lock org",
        "effect": "Approved weeks trigger payroll lock preventing edits.",
        "notes": "Coordinate submit deadline with payroll calendar."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Validation errors",
        "text": "Red hints must be cleared before Submit enables."
      },
      {
        "type": "danger",
        "title": "Late submit",
        "text": "disableLastMonthAfterXDays may block prior-month submission."
      }
    ],
    "considerations": [
      "Enable timesheetApprovalEnabled on pilot team first.",
      "Communicate weekly submit deadline to all ICs.",
      "Test rejection and resubmit loop end-to-end.",
      "Verify delegate receives notification when primary away."
    ],
    "verify": [
      "Submit disabled until validation passes.",
      "Status changes to Submitted with timestamp.",
      "Manager sees item in pending approvals.",
      "Employee cannot edit rows while Submitted.",
      "Rejection returns to editable with comment visible.",
      "Approved week shows Approved status chip."
    ],
    "screenDoc": "hrms/timesheet.html"
  },
  "hrms-approve-timesheet": {
    "context": "Managers and delegates approve or reject submitted timesheet weeks from Timesheet pending panel or Workspace → Approvals. Review hours by project/deliverable, check conflicts, and optionally trigger payroll lock on final approval. Delegate actions record acting-for metadata in audit UI.",
    "summary": "Approve or reject submitted timesheets with optional payroll lock.",
    "permissions": [
      {
        "name": "Timesheet approval",
        "path": "timeSheet.enableTimeSheetApproval",
        "level": "Approve",
        "notes": "Manager or delegate scope."
      },
      {
        "name": "Team scope",
        "path": "timeSheet.listOnlyCurrentTeamProject",
        "level": "Team",
        "notes": "Limits visible submissions to direct reports."
      },
      {
        "name": "Delegation",
        "path": "timeSheet.approvalDelegationEnabled",
        "level": "Acting-for",
        "notes": "Delegate inbox when approvalDelegationEnabled."
      },
      {
        "name": "Payroll reopen",
        "path": "payrollModules.runsEditEnabled",
        "level": "Admin",
        "notes": "Required to unlock payroll-locked weeks."
      }
    ],
    "featureFlags": [
      {
        "flag": "timesheetApprovalEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Approval actions visible on pending submissions.",
        "whenDisabled": "No approval workflow; scenario N/A."
      },
      {
        "flag": "approvalReminderEnabled",
        "group": "approvalDelegation",
        "whenEnabled": "SLA reminder emails for stale pending timesheets.",
        "whenDisabled": "Manual manager follow-up only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Approve/reject direct report weeks in team scope.",
        "notes": "Comments optional per org policy."
      },
      {
        "role": "Delegate",
        "effect": "Same actions with acting-for badge in audit.",
        "notes": "Configured on manager profile Delegation tab."
      },
      {
        "role": "HR admin",
        "effect": "May see cross-team pending when scope permits.",
        "notes": "Does not bypass payroll lock without admin role."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Payroll lock",
        "text": "Final approval may lock week for payroll processing; reopen is restricted."
      },
      {
        "type": "warning",
        "title": "Conflict hours",
        "text": "Over-allocation or missing project rows should trigger reject with comment."
      }
    ],
    "considerations": [
      "Process approvals before payroll run cutoff.",
      "Verify delegate coverage during manager leave.",
      "Use Workspace inbox for multi-domain approvers.",
      "Export approved hours for billing reconciliation."
    ],
    "verify": [
      "Pending panel lists submitted weeks in scope.",
      "Approve updates status and notifies employee.",
      "Reject includes comment visible to employee.",
      "Delegate action shows acting-for in audit timeline.",
      "Payroll lock prevents post-approval edits.",
      "Cross-team submission hidden from wrong manager."
    ],
    "screenDoc": "hrms/timesheet.html"
  },
  "hrms-apply-leave": {
    "context": "Employees apply for leave through HRMS → Leave management when leaveManagementEnabled is active at the org unit. Native leave coexists with ZingHR sync when integration configured; balances and overlap checks apply before submission. Approved leave may promote to timesheet leave rows and calendar blocks.",
    "summary": "Submit a leave request with balance and overlap validation.",
    "permissions": [
      {
        "name": "Leave menu",
        "path": "hrmsModules.leavesEnabled",
        "level": "Active",
        "notes": "Requires leaveManagementEnabled org flag."
      },
      {
        "name": "Create leave",
        "path": "leaves.createEnabled",
        "level": "Create",
        "notes": "Employee self-service apply."
      },
      {
        "name": "View balances",
        "path": "leaves.viewEnabled",
        "level": "Read",
        "notes": "Balance panel on apply form."
      },
      {
        "name": "Future/past dates",
        "path": "timeSheet.allowLeaveAndHolidayForFuture",
        "level": "Policy",
        "notes": "Org rules for date range eligibility."
      }
    ],
    "featureFlags": [
      {
        "flag": "leaveManagementEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Native leave apply and approval workflow active.",
        "whenDisabled": "Use ZingHR sync or external HRIS only."
      },
      {
        "flag": "leaveEnhancementsEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Enhanced overlap checks and partial-day options.",
        "whenDisabled": "Standard leave types and full-day default."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Individual contributor",
        "effect": "Apply leave for self; reason may be audit-redacted.",
        "notes": "Persona masking on sensitive reason fields."
      },
      {
        "role": "Manager",
        "effect": "Does not apply on behalf unless HR scope.",
        "notes": "Approves via separate workflow."
      },
      {
        "role": "ZingHR org",
        "effect": "Native apply may be read-only when sync authoritative.",
        "notes": "Check integration sync health."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Insufficient balance",
        "text": "Apply blocked or warned when balance insufficient per policy."
      },
      {
        "type": "warning",
        "title": "Overlap",
        "text": "Duplicate approved leave dates rejected by overlap check."
      }
    ],
    "considerations": [
      "Configure leave types and balances in Application Config.",
      "Test ZingHR sync if native leave disabled.",
      "Verify manager delegate when primary approver away.",
      "Check timesheet leave row creation after approval."
    ],
    "verify": [
      "Apply form shows correct balances per leave type.",
      "Submit creates Pending request.",
      "Overlap warning prevents duplicate dates.",
      "Employee notified on approval/rejection.",
      "Approved leave visible on calendar.",
      "Timesheet shows leave rows when configured."
    ],
    "screenDoc": "hrms/leaves.html"
  },
  "hrms-approve-leave": {
    "context": "Managers, delegates, and HR approve or reject pending leave requests from Leave management or Workspace → Approvals. Verify team coverage, balances, and overlap before decision. Approved leave updates balances and may sync to timesheet and external HRIS.",
    "summary": "Approve or reject employee leave requests in team scope.",
    "permissions": [
      {
        "name": "Team approve",
        "path": "leaves.approveTeamEnabled",
        "level": "Manager",
        "notes": "Direct report requests in scope."
      },
      {
        "name": "Approve all",
        "path": "leaves.approveAllEnabled",
        "level": "HR",
        "notes": "Cross-team when leave policy admin enabled."
      },
      {
        "name": "Leave module",
        "path": "leaves.leaveManagementEnabled",
        "level": "Active",
        "notes": "Org flag required."
      },
      {
        "name": "Delegation",
        "path": "leaves.approvalDelegationEnabled",
        "level": "Delegate",
        "notes": "Acting-for metadata on approve."
      }
    ],
    "featureFlags": [
      {
        "flag": "leaveManagementEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Pending approvals panel active.",
        "whenDisabled": "Scenario not applicable."
      },
      {
        "flag": "universalApprovalInboxEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Leave items appear in Workspace Approvals.",
        "whenDisabled": "Module pending panel only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Approve/reject team leave with optional comment.",
        "notes": "Delegation inbox when configured."
      },
      {
        "role": "Delegate",
        "effect": "Acting-for recorded in audit metadata.",
        "notes": "Same scope as delegating manager."
      },
      {
        "role": "HR admin",
        "effect": "Cross-team approve when approveAllEnabled.",
        "notes": "Policy admin can override balance rules per config."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Team coverage",
        "text": "Reject or escalate when insufficient coverage for critical projects."
      },
      {
        "type": "danger",
        "title": "Balance overrun",
        "text": "Approve beyond balance may require HR override per policy."
      }
    ],
    "considerations": [
      "Review overlap with existing approved leave.",
      "Coordinate with project capacity for key deliverables.",
      "Verify ZingHR sync after approval when integrated.",
      "Use delegate rules before manager PTO."
    ],
    "verify": [
      "Pending panel lists requests in manager scope.",
      "Approve updates balance and status.",
      "Reject returns request to employee with comment.",
      "Workspace inbox shows leave type correctly.",
      "Delegate audit shows acting-for actor.",
      "Calendar reflects approved dates."
    ],
    "screenDoc": "hrms/leaves.html"
  },
  "admin-configure-global-leave": {
    "context": "HR configures enterprise leave in Global Policy Center: jurisdictions, templates, versioned policies, holiday calendar keys, then publishes. Employee leave config sets opening balances. See Leave Configuration screen doc for the full go-live checklist.",
    "summary": "Configure and publish Global Leave policies with holiday assignment.",
    "permissions": [
      {
        "name": "Global leave admin",
        "path": "adminModules.globalLeavePoliciesEnabled",
        "level": "Admin",
        "notes": "Requires leaveAdditional.globalLeavePoliciesEnabled."
      },
      {
        "name": "Leave policies",
        "path": "adminModules.leavePoliciesEnabled",
        "level": "Admin",
        "notes": "Types & fallback catalog."
      }
    ],
    "featureFlags": [
      {
        "flag": "globalLeavePoliciesEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Global Policy Center drives accrual and resolve.",
        "whenDisabled": "Use classic leave policies only."
      },
      {
        "flag": "leaveManagementEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Native leave runtime active.",
        "whenDisabled": "Configuration screens may still exist but apply is off."
      }
    ],
    "behaviorChanges": [
      "Published versions are immutable.",
      "Holiday calendar keys filter People holidays for day counting.",
      "Policy Test Lab may gate publish."
    ],
    "verify": [
      "Jurisdiction and published policy visible for team.",
      "Holiday assignment key matches People holiday locations.",
      "Employee apply excludes holiday from numberOfDays.",
      "Documentation link opens leave-configuration.html."
    ],
    "screenDoc": "hrms/leave-configuration.html"
  },
  "admin-employee-leave-config": {
    "context": "HR sets per-employee opening balances and adjustments after policies are published.",
    "summary": "Adjust employee leave balances by type.",
    "permissions": [
      {
        "name": "Leave policy admin",
        "path": "adminModules.leavePoliciesEnabled",
        "level": "Admin",
        "notes": "Or global leave admin role."
      }
    ],
    "featureFlags": [
      {
        "flag": "leaveManagementEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Balances used by apply/submit.",
        "whenDisabled": "Adjustments may be blocked."
      }
    ],
    "behaviorChanges": [
      "Adjustments write audit when audit enabled.",
      "Accrual continues after opening balances."
    ],
    "verify": [
      "Balance cards update after adjustment.",
      "Employee can apply leave against remaining balance."
    ],
    "screenDoc": "hrms/leave-configuration.html#employee-balances"
  },
  "admin-publish-legal-holiday-calendar": {
    "context": "Legal Calendars draft and publish blocking holidays into People → Holidays (fs_holiday_model) for leave day counting.",
    "summary": "Publish legal holiday calendar synced to People holidays.",
    "permissions": [
      {
        "name": "Leave admin",
        "path": "adminModules.globalLeavePoliciesEnabled",
        "level": "Admin",
        "notes": "Legal calendars under leave admin."
      }
    ],
    "featureFlags": [
      {
        "flag": "leaveManagementEnabled",
        "group": "leaveAdditional",
        "whenEnabled": "Leave runtime uses synced holidays.",
        "whenDisabled": "Calendar publish still possible but leave apply may be off."
      }
    ],
    "behaviorChanges": [
      "Optional holidays are not synced.",
      "Publish ensures holiday calendar assignment when jurisdiction set."
    ],
    "verify": [
      "Published holidays appear in People → Holidays.",
      "Leave spanning holiday excludes that day."
    ],
    "screenDoc": "hrms/leave-configuration.html#holidays"
  },
  "hrms-mark-attendance": {
    "context": "HR admins and managers record or correct attendance in the monthly matrix under HRMS → Attendance. Cell-level status (Present, Absent, Leave, WFH) updates immediately; bulk export supports audit copies. Regularization requests from employees follow a separate approval path when attendanceRegularizationEnabled.",
    "summary": "Mark or correct daily attendance in the monthly matrix.",
    "permissions": [
      {
        "name": "Attendance menu",
        "path": "hrmsModules.attendanceEnabled",
        "level": "Active",
        "notes": "Module enabled at org unit."
      },
      {
        "name": "Edit attendance",
        "path": "attendance.editEnabled",
        "level": "Edit",
        "notes": "HR admin or scoped manager."
      },
      {
        "name": "View matrix",
        "path": "attendance.viewEnabled",
        "level": "Read",
        "notes": "Team filter respects list scope."
      },
      {
        "name": "Export",
        "path": "attendance.exportEnabled",
        "level": "Export",
        "notes": "Month matrix CSV for audit."
      }
    ],
    "featureFlags": [
      {
        "flag": "attendanceRegularizationEnabled",
        "group": "attendanceAdditional",
        "whenEnabled": "Employee requests route to approval panel.",
        "whenDisabled": "HR direct edit only."
      },
      {
        "flag": "auditUiEnabled",
        "group": "auditAdditional",
        "whenEnabled": "Cell changes visible in audit timeline.",
        "whenDisabled": "Limited change history."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR administrator",
        "effect": "Full matrix edit across org units in scope.",
        "notes": "Bulk export for compliance."
      },
      {
        "role": "Manager",
        "effect": "Edit team rows when editEnabled on role.",
        "notes": "Cannot edit other teams without scope."
      },
      {
        "role": "Employee",
        "effect": "Self mark via regularization request when enabled.",
        "notes": "Not direct matrix edit."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Retroactive edits",
        "text": "Past-month edits may affect payroll when integrated."
      },
      {
        "type": "warning",
        "title": "Leave mismatch",
        "text": "Attendance Leave should align with approved leave records."
      }
    ],
    "considerations": [
      "Reconcile attendance with approved leave weekly.",
      "Export matrix before month close for audit archive.",
      "Test regularization flow separately from direct edit.",
      "Verify org unit filter on large directories."
    ],
    "verify": [
      "Cell click sets status and saves immediately.",
      "Month navigation loads correct employee rows.",
      "Team filter narrows matrix to scope.",
      "Export produces expected CSV columns.",
      "Regularization request appears in pending when enabled.",
      "Audit records cell change when writes enabled."
    ],
    "screenDoc": "hrms/attendance.html"
  },
  "hrms-approve-attendance": {
    "context": "Managers and delegates approve employee attendance regularization requests from the Attendance pending panel or Workspace → Approvals. Approved corrections apply to matrix cells with audit trail; rejections return to employee with comment. Requires attendanceRegularizationEnabled for employee-initiated requests.",
    "summary": "Approve or reject attendance regularization requests.",
    "permissions": [
      {
        "name": "Approve attendance",
        "path": "attendance.approveEnabled",
        "level": "Manager",
        "notes": "Pending regularization panel."
      },
      {
        "name": "Attendance module",
        "path": "hrmsModules.attendanceEnabled",
        "level": "Active",
        "notes": "Module flag required."
      },
      {
        "name": "Delegation",
        "path": "attendance.approvalDelegationEnabled",
        "level": "Delegate",
        "notes": "Acting-for on approve action."
      },
      {
        "name": "Edit matrix",
        "path": "attendance.editEnabled",
        "level": "Post-approve",
        "notes": "Approved request updates cells automatically."
      }
    ],
    "featureFlags": [
      {
        "flag": "attendanceRegularizationEnabled",
        "group": "attendanceAdditional",
        "whenEnabled": "Employee requests and approval workflow active.",
        "whenDisabled": "HR direct matrix edit only."
      },
      {
        "flag": "approvalDelegationEnabled",
        "group": "approvalDelegation",
        "whenEnabled": "Delegate can approve regularization.",
        "whenDisabled": "Primary manager only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Review request reason and dates; approve or reject.",
        "notes": "Matrix updates on approve."
      },
      {
        "role": "Delegate",
        "effect": "Acting-for shown in approval metadata.",
        "notes": "Audit UI captures delegate actor."
      },
      {
        "role": "HR admin",
        "effect": "May override or direct-edit when policy allows.",
        "notes": "Separate from regularization path."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Conflicting leave",
        "text": "Approve only when aligned with leave records."
      },
      {
        "type": "danger",
        "title": "Duplicate correction",
        "text": "Overlapping requests for same dates need consolidation."
      }
    ],
    "considerations": [
      "Process regularization before payroll attendance export.",
      "Verify delegate coverage for field managers.",
      "Cross-check with timesheet hours same day.",
      "Document reject reasons for employee resubmission."
    ],
    "verify": [
      "Pending panel lists employee regularization requests.",
      "Approve applies corrected cells in matrix.",
      "Reject shows comment to employee.",
      "Delegate action has acting-for in audit.",
      "Workspace inbox includes attendance type.",
      "Matrix reflects change without manual re-entry."
    ],
    "screenDoc": "hrms/attendance.html"
  },
  "hrms-create-invoice": {
    "context": "Finance and billing roles create client invoices in HRMS → Invoices linking projects, deliverables, and purchase orders for line items. Workflow supports draft, finalize, PDF generation, and external share routes. Mandatory PO mode on projects requires PO reference on related billing lines.",
    "summary": "Create a client invoice with project and PO line items.",
    "permissions": [
      {
        "name": "Invoice menu",
        "path": "hrmsModules.invoiceEnabled",
        "level": "Active",
        "notes": "Module at org unit."
      },
      {
        "name": "Create invoice",
        "path": "invoice.createEnabled",
        "level": "Create",
        "notes": "Finance admin or billing role."
      },
      {
        "name": "Edit invoice",
        "path": "invoice.editEnabled",
        "level": "Edit",
        "notes": "Draft edits before finalize."
      },
      {
        "name": "View PO",
        "path": "purchaseOrders.viewEnabled",
        "level": "Read",
        "notes": "Link PO references on line items."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Select billable projects for lines."
      }
    ],
    "featureFlags": [
      {
        "flag": "financeIntelligenceEnabled",
        "group": "tracopusFinanceAdditional",
        "whenEnabled": "Enhanced billing analytics and intelligence panels.",
        "whenDisabled": "Standard invoice register and detail."
      },
      {
        "flag": "purchaseOrderMandatoryEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Line items require valid PO reference.",
        "whenDisabled": "PO link optional per project policy."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Finance admin",
        "effect": "Full create, edit, finalize, and PDF.",
        "notes": "Cross-team PO access when role permits."
      },
      {
        "role": "Project manager",
        "effect": "Typically view only; may propose lines.",
        "notes": "Create usually finance-restricted."
      },
      {
        "role": "Client manager",
        "effect": "Share document link when external sharing enabled.",
        "notes": "Token-based public route per security policy."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Finalize irreversible",
        "text": "Finalized invoices may restrict edits; use draft for review cycles."
      },
      {
        "type": "danger",
        "title": "PO mismatch",
        "text": "Billing period outside PO dates rejected when date restriction enabled."
      }
    ],
    "considerations": [
      "Link PO before finalize when mandatory mode on.",
      "Verify approved timesheet hours for T&M lines.",
      "Test PDF layout before client send.",
      "Audit invoice create when audit writes enabled."
    ],
    "verify": [
      "Create panel saves draft with line items.",
      "Project and PO pickers show scoped records.",
      "Totals and tax calculate per org config.",
      "Finalize changes status appropriately.",
      "PDF generates from invoice detail.",
      "Share link works when external sharing on."
    ],
    "screenDoc": "hrms/invoices.html"
  },
  "hrms-app-config": {
    "context": "Org administrators configure Tracopus behavior per org unit in HRMS → Application configuration without code deploy. Tabs cover Modules, Permissions, Org data, and Settings with inherit/override/lock controls for child teams. Changes apply on next login or config refresh; pilot on child team before root override.",
    "summary": "Configure org modules, permissions, and flags via Application Config.",
    "permissions": [
      {
        "name": "App config menu",
        "path": "hrmsModules.appconfigEnabled",
        "level": "Admin",
        "notes": "Org administrator role required."
      },
      {
        "name": "Admin governance",
        "path": "adminModules.active",
        "level": "Active",
        "notes": "Master admin module switch."
      },
      {
        "name": "RBAC admin",
        "path": "adminModules.rolesEnabled",
        "level": "Edit",
        "notes": "Role template CRUD matrices."
      },
      {
        "name": "Org structure",
        "path": "adminModules.orgStructureEnabled",
        "level": "Edit",
        "notes": "Team tree and inheritance."
      }
    ],
    "featureFlags": [
      {
        "flag": "adminGovernanceEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admin rail and governance screens accessible.",
        "whenDisabled": "App config may be HRMS-only path for admins."
      },
      {
        "flag": "rbacAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Dedicated Admin → Roles & permissions route.",
        "whenDisabled": "Role edits within Application Config tabs only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Org administrator",
        "effect": "Full tree edit with inherit/override/lock.",
        "notes": "Lock prevents child override of critical flags."
      },
      {
        "role": "Team admin",
        "effect": "Override only on assigned org unit subtree.",
        "notes": "Cannot change root locked values."
      },
      {
        "role": "All users",
        "effect": "Menu and permissions refresh after save.",
        "notes": "Re-login recommended for access cache refresh."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Root lock mistake",
        "text": "Locking wrong flag at root affects entire org; test on pilot team first."
      },
      {
        "type": "warning",
        "title": "DB migrations",
        "text": "Some HRMS flags require coordinated DB migrations per release runbook."
      }
    ],
    "considerations": [
      "Document inherit vs override vs lock for each flag changed.",
      "Test persona RBAC after role template edits.",
      "Coordinate with Admin feature flags for pilot rollout.",
      "Export config snapshot before major changes."
    ],
    "verify": [
      "Org unit tree selection loads correct config tabs.",
      "Module toggle saves and reflects in test user menu.",
      "Child inherit shows parent value until override.",
      "Lock prevents child team override UI.",
      "Role CRUD matrix saves per template.",
      "Test user re-login shows updated permissions."
    ],
    "screenDoc": "hrms/application-config.html"
  },
  "workspace-my-work": {
    "context": "Workspace My Work is the personal execution queue for assigned project work items, approvals awaiting action, and cross-module tasks surfaced by the work graph. Individual contributors and managers use it daily to prioritize delivery without opening each project separately. Enable myWorkQueueEnabled at a pilot org unit before root inherit/override/lock rollout.",
    "summary": "Review and action assigned work items from the unified My Work register.",
    "permissions": [
      {
        "name": "My Work menu",
        "path": "workspaceModules.myWorkEnabled",
        "level": "Read",
        "notes": "Gated by myWorkQueueEnabled org flag and role template."
      },
      {
        "name": "Work item view",
        "path": "workItems.viewEnabled",
        "level": "Team scope",
        "notes": "List scope flags limit cross-team task visibility."
      },
      {
        "name": "Work item edit",
        "path": "workItems.editEnabled",
        "level": "Assignee or manager",
        "notes": "Status and hours editable per persona RBAC."
      },
      {
        "name": "Project module",
        "path": "projectModules.active",
        "level": "Active",
        "notes": "Most queue items deep-link into Project delivery screens."
      },
      {
        "name": "Taskboard access",
        "path": "projectModules.taskboardEnabled",
        "level": "Read",
        "notes": "Alternate path to same tasks via Kanban view."
      }
    ],
    "featureFlags": [
      {
        "flag": "myWorkQueueEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Workspace → My Work appears in left menu and icon rail.",
        "whenDisabled": "Users rely on Project taskboard or global search only."
      },
      {
        "flag": "workGraphEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Queue aggregates tasks, approvals, and linked entities.",
        "whenDisabled": "My Work shows project tasks only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Individual contributor",
        "effect": "Sees only self-assigned and team-scoped items.",
        "notes": "Persona RBAC masks other employees assignments."
      },
      {
        "role": "Manager",
        "effect": "May see direct-report items when list scope permits.",
        "notes": "Does not replace formal approval inbox."
      },
      {
        "role": "Delegate",
        "effect": "Acting-for items appear with delegate metadata badge.",
        "notes": "Audit UI records delegate context on updates."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stale assignments",
        "text": "Completed tasks may linger until sync from taskboard; refresh register after bulk updates."
      },
      {
        "type": "warning",
        "title": "Flag off at root",
        "text": "Child org units inheriting disabled myWorkQueueEnabled hide the menu even if role allows."
      }
    ],
    "considerations": [
      "Pilot enable myWorkQueueEnabled on one team before root override.",
      "Compare My Work filters with Project global search for UAT coverage.",
      "Verify mobile task updates reflect in My Work after sync.",
      "Pin common filters for field staff with high task volume."
    ],
    "verify": [
      "My Work menu visible when flag and RBAC enabled.",
      "Assigned work item opens correct project detail on row click.",
      "SHOW/SORT/Filter controls narrow register as expected.",
      "Status update persists and appears on web taskboard.",
      "Cross-team items hidden for employee persona.",
      "Delegate badge shown when acting for another manager."
    ],
    "screenDoc": "interface.html"
  },
  "people-start-onboarding": {
    "context": "People Ops starts structured onboarding cases for new hires after the employee record exists in HRMS. Templates define phased checklists (IT, HR, manager) with owners and deadlines. Requires onboardingEnabled at the org unit; coordinate with employee wizard Access and Sign-in before assigning self-service tasks.",
    "summary": "Open an onboarding case with template-driven checklist tasks.",
    "permissions": [
      {
        "name": "Onboarding menu",
        "path": "peopleModules.onboardingEnabled",
        "level": "Create",
        "notes": "Requires onboardingEnabled org flag."
      },
      {
        "name": "Create employee",
        "path": "employees.createEnabled",
        "level": "Prerequisite",
        "notes": "Employee must exist before case start."
      },
      {
        "name": "View employee",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "Select hire from directory."
      },
      {
        "name": "People module",
        "path": "peopleModules.active",
        "level": "Active",
        "notes": "People Ops rail entry."
      }
    ],
    "featureFlags": [
      {
        "flag": "onboardingEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "People → Onboarding register and New case action available.",
        "whenDisabled": "Manual HR checklist outside Tracopus."
      },
      {
        "flag": "onboardingSelfServiceEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "New hire receives My onboarding task queue after activation.",
        "whenDisabled": "HR completes all tasks on case detail."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR admin",
        "effect": "Creates case, assigns template, sets owners.",
        "notes": "Progress % visible in register."
      },
      {
        "role": "New hire",
        "effect": "Receives self-service tasks when flag enabled.",
        "notes": "Requires completed account activation."
      },
      {
        "role": "IT owner",
        "effect": "Sees assigned tasks on case detail.",
        "notes": "Audit UI tracks task completion when enabled."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Employee not activated",
        "text": "Self-service tasks fail if hire has not completed activation link."
      },
      {
        "type": "danger",
        "title": "Missing template",
        "text": "Case without template produces empty checklist; configure templates first."
      }
    ],
    "considerations": [
      "Complete hrms-create-employee before starting case.",
      "Align case start date with date of join.",
      "Link policy acknowledgment tasks when policy campaigns enabled.",
      "Pilot onboardingEnabled on one org unit before root lock."
    ],
    "verify": [
      "New case appears in onboarding register with progress.",
      "Template tasks populate on case detail.",
      "Assigned owners receive notifications when enabled.",
      "Employee selectable only if Active in directory.",
      "Self-service queue visible to hire when flag on.",
      "Audit records case create when writes enabled."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "people-complete-onboarding-tasks": {
    "context": "HR, IT, managers, and new hires complete onboarding checklist tasks from case detail or My onboarding. Mandatory tasks block case closure until done; evidence attachments may be required per task type. Overdue tasks surface on manager dashboards when configured.",
    "summary": "Complete assigned onboarding tasks to progress the hire readiness case.",
    "permissions": [
      {
        "name": "Onboarding view",
        "path": "peopleModules.onboardingEnabled",
        "level": "Read",
        "notes": "Case and task list access."
      },
      {
        "name": "Task complete",
        "path": "onboarding.completeTaskEnabled",
        "level": "Edit",
        "notes": "Role-dependent per task owner."
      },
      {
        "name": "Self-service",
        "path": "peopleModules.onboardingSelfServiceEnabled",
        "level": "Own tasks",
        "notes": "New hire My onboarding route."
      },
      {
        "name": "Document upload",
        "path": "peopleModules.documentsEnabled",
        "level": "Attach",
        "notes": "When documentVaultEnabled for evidence tasks."
      }
    ],
    "featureFlags": [
      {
        "flag": "onboardingSelfServiceEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "New hire completes tasks via People → My onboarding.",
        "whenDisabled": "HR marks complete on case detail only."
      },
      {
        "flag": "documentVaultEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Attachment tasks store files in document vault.",
        "whenDisabled": "Notes-only completion on tasks."
      }
    ],
    "behaviorChanges": [
      {
        "role": "New hire",
        "effect": "Completes self-service tasks; cannot close others tasks.",
        "notes": "Persona RBAC limits scope."
      },
      {
        "role": "HR admin",
        "effect": "Can complete any task and close case.",
        "notes": "Override for blocked hires."
      },
      {
        "role": "Manager",
        "effect": "Completes manager-phase tasks only.",
        "notes": "Equipment and access tasks often IT-owned."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Mandatory tasks",
        "text": "Case cannot auto-complete until all mandatory tasks marked done."
      },
      {
        "type": "warning",
        "title": "Overdue SLA",
        "text": "Overdue tasks may trigger reminder emails when workflow automation enabled."
      }
    ],
    "considerations": [
      "Verify activation before self-service tasks.",
      "Track overdue items before production access date.",
      "Coordinate IT tasks with Security tab access provisioning.",
      "Link people-acknowledge-policy tasks in template."
    ],
    "verify": [
      "Task mark Complete updates case progress %.",
      "Mandatory gate blocks case closure when incomplete.",
      "Attachment uploads when task type requires.",
      "My onboarding shows only hire-assigned tasks.",
      "Overdue badge appears past deadline.",
      "Audit captures task completion events."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "people-start-offboarding": {
    "context": "HR initiates structured offboarding cases for departing employees with IT asset return, access revocation, and manager handoff tasks. Run parallel to hrms-deactivate-employee for timing of last working day and platform access. Requires offboardingEnabled at org unit with template configuration.",
    "summary": "Start an offboarding checklist case for a departing employee.",
    "permissions": [
      {
        "name": "Offboarding menu",
        "path": "peopleModules.offboardingEnabled",
        "level": "Create",
        "notes": "Requires offboardingEnabled org flag."
      },
      {
        "name": "Edit employee",
        "path": "employees.editEnabled",
        "level": "Edit",
        "notes": "Set exit date and Inactive status."
      },
      {
        "name": "Security revoke",
        "path": "employees.access.platformLoginEnabled",
        "level": "HR",
        "notes": "Coordinate access revoke with case tasks."
      },
      {
        "name": "Asset register",
        "path": "peopleModules.assetsEnabled",
        "level": "Optional",
        "notes": "Asset return tasks when assetRegisterEnabled."
      }
    ],
    "featureFlags": [
      {
        "flag": "offboardingEnabled",
        "group": "lifecycleAdditional",
        "whenEnabled": "People → Offboarding register and New case available.",
        "whenDisabled": "Manual offboard checklist outside module."
      },
      {
        "flag": "assetRegisterEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Asset return tasks link to asset register.",
        "whenDisabled": "Generic checklist items only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "HR admin",
        "effect": "Creates case, sets last working day, assigns owners.",
        "notes": "Case runs until all tasks complete."
      },
      {
        "role": "IT",
        "effect": "Completes access and asset tasks.",
        "notes": "Sync with Security tab revoke timing."
      },
      {
        "role": "Manager",
        "effect": "Handoff and knowledge transfer tasks.",
        "notes": "Reassign projects before deactivation."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Early access revoke",
        "text": "Revoking login before last day blocks legitimate timesheet entry."
      },
      {
        "type": "warning",
        "title": "Open approvals",
        "text": "Resolve pending timesheet and leave before final deactivation."
      }
    ],
    "considerations": [
      "Set last working day on case and employee profile consistently.",
      "Schedule Security revoke for end of last day.",
      "Reassign owned projects and tasks in Project module.",
      "Export audit trail after case closure for compliance."
    ],
    "verify": [
      "Offboarding case created with template tasks.",
      "Last working day saved on case and profile.",
      "IT tasks visible to assigned owners.",
      "Case progress tracks completed tasks.",
      "Access revoke aligns with case timeline.",
      "Employee set Inactive after case completion."
    ],
    "screenDoc": "hrms/employees.html"
  },
  "people-employee-360": {
    "context": "Employee 360 consolidates profile, projects, utilization, leave, and performance snippets into one People view for managers, HR, and scoped executives. Field visibility follows persona RBAC and masking policy; export may be restricted for PII. Requires employee360Enabled at org unit.",
    "summary": "View a consolidated Employee 360 profile across Tracopus modules.",
    "permissions": [
      {
        "name": "Employee 360",
        "path": "peopleModules.employee360Enabled",
        "level": "Read",
        "notes": "Org flag and hrmsModules.employee360Enabled role flag."
      },
      {
        "name": "View employee",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "Directory scope applies."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Project panels respect team list scope."
      },
      {
        "name": "Performance view",
        "path": "performanceModules.viewEnabled",
        "level": "Optional",
        "notes": "When performanceManagementEnabled."
      }
    ],
    "featureFlags": [
      {
        "flag": "employee360Enabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "360 view tab and route available on employee profile.",
        "whenDisabled": "Standard HRMS profile tabs only."
      },
      {
        "flag": "maskingPolicyAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Compensation and PII panels masked per persona.",
        "whenDisabled": "Role template alone controls panel visibility."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Sees direct-report 360 within team scope.",
        "notes": "Compensation may be masked."
      },
      {
        "role": "HR admin",
        "effect": "Broader panel access including leave balances.",
        "notes": "Cross-team when view scope permits."
      },
      {
        "role": "Executive",
        "effect": "Portfolio-level analytics sections when scoped.",
        "notes": "Export restrictions apply."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stale utilization",
        "text": "Analytics panels cache; refresh date range for current data."
      },
      {
        "type": "danger",
        "title": "PII export",
        "text": "Compliance export may be blocked; follow data retention policy."
      }
    ],
    "considerations": [
      "Enable employee360Enabled on pilot manager team first.",
      "Verify masking for manager vs HR personas.",
      "Drill-through links respect target module RBAC.",
      "Use date filters on utilization sections."
    ],
    "verify": [
      "360 route loads panels without error.",
      "Manager cannot see masked compensation fields.",
      "Project list matches employee assignments.",
      "Leave panel shows balances when leave enabled.",
      "Drill links open permitted detail pages.",
      "Export disabled when compliance policy requires."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "people-acknowledge-policy": {
    "context": "All employees acknowledge assigned org policies from People → Policy hub for compliance audit. Campaigns may tie to onboarding tasks or periodic attestation; acknowledgment timestamps store on profile compliance log. Policy versioning tracks document revisions when policyVersioningEnabled.",
    "summary": "Read and acknowledge an assigned organizational policy.",
    "permissions": [
      {
        "name": "Policy hub",
        "path": "peopleModules.policiesEnabled",
        "level": "Read",
        "notes": "Requires policiesEnabled on role and org unit."
      },
      {
        "name": "Acknowledge",
        "path": "policies.acknowledgeEnabled",
        "level": "Self",
        "notes": "Employee attestation action."
      },
      {
        "name": "Profile",
        "path": "hrmsModules.profileEnabled",
        "level": "Read",
        "notes": "Compliance log on profile when enabled."
      }
    ],
    "featureFlags": [
      {
        "flag": "policyCampaignsEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Campaign badges and due dates on policy list.",
        "whenDisabled": "Static policy list without campaign SLA."
      },
      {
        "flag": "policyVersioningEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Re-acknowledgment required on new policy version.",
        "whenDisabled": "Single acknowledgment per policy document."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Employee",
        "effect": "Must acknowledge assigned policies; overdue shown in hub.",
        "notes": "May block onboarding case completion."
      },
      {
        "role": "HR admin",
        "effect": "Tracks completion in admin reports.",
        "notes": "Cannot acknowledge on behalf without delegate policy."
      },
      {
        "role": "Org unit inherit",
        "effect": "Policies assigned per team tree inherit/override.",
        "notes": "Child team may add local policies."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Overdue acknowledgment",
        "text": "Overdue policies may appear in onboarding and compliance dashboards."
      },
      {
        "type": "warning",
        "title": "Version bump",
        "text": "New policy version resets acknowledgment requirement."
      }
    ],
    "considerations": [
      "Assign policies at correct org unit before campaign launch.",
      "Link acknowledgment tasks in onboarding templates.",
      "Test policyAiEnabled summaries do not replace reading requirement.",
      "Audit acknowledgment timestamps for compliance export."
    ],
    "verify": [
      "Required badge shown on assigned policies.",
      "Acknowledge button records timestamp.",
      "Compliance log updated on employee profile.",
      "Overdue policy highlighted in hub.",
      "Re-ack required after version publish when versioning on.",
      "Onboarding task auto-completes when linked."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "project-create-project": {
    "context": "Project managers and delivery admins create projects via the seven-step wizard linking PO, client, service scope, fieldwork, compliance, team, and task access. Mandatory PO mode blocks submit without purchase order when enabled at org unit. New projects typically start in NEW status pending team and deliverable setup.",
    "summary": "Create a delivery project using the multi-step creation wizard.",
    "permissions": [
      {
        "name": "Project list",
        "path": "projectModules.listEnabled",
        "level": "Active",
        "notes": "Project module enabled."
      },
      {
        "name": "Create project",
        "path": "projects.createEnabled",
        "level": "Create",
        "notes": "PM or delivery admin role."
      },
      {
        "name": "PO link",
        "path": "projects.enableProjectPurchaseOrderEditable",
        "level": "Edit",
        "notes": "Required when PO mandatory mode on."
      },
      {
        "name": "Team select",
        "path": "projects.showAllUserTeamsSelectableInProjectCreateWindow",
        "level": "Scope",
        "notes": "Limits team picker in wizard Step 6."
      },
      {
        "name": "View PO",
        "path": "purchaseOrders.viewEnabled",
        "level": "Read",
        "notes": "Select PO in Step 1 when required."
      }
    ],
    "featureFlags": [
      {
        "flag": "purchaseOrderMandatoryEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Wizard Step 1 requires PO before submit.",
        "whenDisabled": "PO optional unless project policy sets requirement."
      },
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Compliance and governance fields in wizard Step 5.",
        "whenDisabled": "Reduced compliance step fields."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Full wizard create within team scope.",
        "notes": "List scope may limit visible POs."
      },
      {
        "role": "Delivery admin",
        "effect": "Cross-team create when allowAccessToOtherUserTeamProjects.",
        "notes": "Audit UI records create when enabled."
      },
      {
        "role": "Sales handoff",
        "effect": "Won bid links to PO in Step 1.",
        "notes": "Salesforce sync indicator when integrated."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "PO mandatory block",
        "text": "Submit fails without PO when mandatory mode enabled at org unit."
      },
      {
        "type": "warning",
        "title": "Date restriction",
        "text": "projectDatesRestrictedByPurchaseOrderDates limits start/end vs PO dates."
      }
    ],
    "considerations": [
      "Create or link PO before project when mandatory mode on.",
      "Use Duplicate from row menu to clone similar studies.",
      "Assign task access restrictions in Step 7 for sensitive work.",
      "Transition status after adding deliverables and team."
    ],
    "verify": [
      "Wizard submits and project appears in list.",
      "PO link visible on project detail when selected.",
      "Team, owner, and lead saved from Step 6.",
      "Task access restrictions apply on work item create.",
      "Mandatory PO validation fires when expected.",
      "Audit records project create when writes enabled."
    ],
    "screenDoc": "project/project-list.html"
  },
  "project-edit-project": {
    "context": "Project managers update metadata, team, estimates, and status on Project details using edit mode or wizard panels. Status transitions may be role-gated; Audit tab shows change history when audit UI enabled. Comments tab is separate from audit timeline events.",
    "summary": "Edit project metadata, team, and status on Project details.",
    "permissions": [
      {
        "name": "View project",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Team list scope applies."
      },
      {
        "name": "Edit project",
        "path": "projects.editEnabled",
        "level": "Edit",
        "notes": "PM or editor role."
      },
      {
        "name": "Status change",
        "path": "projects.allowStatusChange",
        "level": "Gated",
        "notes": "changeableStatus list per role."
      },
      {
        "name": "PO edit",
        "path": "projects.enableProjectPurchaseOrderEditable",
        "level": "Optional",
        "notes": "Relink PO when permitted."
      }
    ],
    "featureFlags": [
      {
        "flag": "auditUiEnabled",
        "group": "auditAdditional",
        "whenEnabled": "Audit tab shows field-level change timeline.",
        "whenDisabled": "Limited history; comments not audit events."
      },
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Governance fields editable on detail.",
        "whenDisabled": "Standard metadata fields only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Edit within assigned project scope.",
        "notes": "Cannot downgrade status if allowStatusLevelDown false."
      },
      {
        "role": "Viewer",
        "effect": "Read-only detail; Edit hidden.",
        "notes": "Persona RBAC enforced."
      },
      {
        "role": "Finance",
        "effect": "May edit commercial estimates when role permits.",
        "notes": "Service line visibility per viewServiceLineEstimate."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Status gate",
        "text": "COMPLETED → CLOSED may require executive role."
      },
      {
        "type": "warning",
        "title": "PO date sync",
        "text": "Changing dates may conflict with PO restriction rules."
      }
    ],
    "considerations": [
      "Review Audit tab after commercial field changes.",
      "Coordinate status change with deliverable completion.",
      "Notify team when task access restrictions change.",
      "Verify billing reports after PO relink."
    ],
    "verify": [
      "Edit saves and register refreshes.",
      "Status dropdown respects changeableStatus list.",
      "Audit tab shows change when audit UI on.",
      "PO field updates cross-link on PO detail.",
      "Viewer persona cannot access Edit.",
      "Comments do not appear as audit events."
    ],
    "screenDoc": "project/project-details.html"
  },
  "project-add-deliverable": {
    "context": "Project managers add deliverables under a project for milestone planning, capacity, and work item linkage. Deliverable dates drive calendar and Gantt views when enabled. Service line breakdown and owner assignment follow org-configured estimate fields.",
    "summary": "Add a deliverable milestone to a project for planning and execution.",
    "permissions": [
      {
        "name": "Project edit",
        "path": "projects.editEnabled",
        "level": "Edit",
        "notes": "Required to add deliverables."
      },
      {
        "name": "Deliverable create",
        "path": "deliverables.createEnabled",
        "level": "Create",
        "notes": "PM or team lead."
      },
      {
        "name": "Details module",
        "path": "projectModules.detailsEnabled",
        "level": "Active",
        "notes": "Deliverables tab on project detail."
      },
      {
        "name": "Calendar view",
        "path": "projectModules.calendarEnabled",
        "level": "Read",
        "notes": "Deliverable dates appear on calendar."
      }
    ],
    "featureFlags": [
      {
        "flag": "ganttEnabled",
        "group": "projectModules.ganttEnabled",
        "whenEnabled": "Deliverable dates appear on Timeline/Gantt.",
        "whenDisabled": "List and calendar views only."
      },
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Compliance flags on deliverable when configured.",
        "whenDisabled": "Standard deliverable fields."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Create and edit all project deliverables.",
        "notes": "Owners assignable to team members."
      },
      {
        "role": "Team lead",
        "effect": "Create when deliverables.createEnabled on role.",
        "notes": "Scope limited to assigned project."
      },
      {
        "role": "Resource manager",
        "effect": "Views deliverables on capacity timeline.",
        "notes": "No create unless edit permission."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Missing dates",
        "text": "Undated deliverables weaken capacity and Gantt accuracy."
      },
      {
        "type": "warning",
        "title": "Timesheet linkage",
        "text": "Some orgs require deliverable on each billable timesheet row."
      }
    ],
    "considerations": [
      "Set milestone dates before work item bulk create.",
      "Link feedback requests at deliverable level when needed.",
      "Align service line estimates with PO commercial scope.",
      "Verify capacity view reflects new deliverable hours."
    ],
    "verify": [
      "Deliverable appears in project deliverables list.",
      "Dates show on calendar when configured.",
      "Work item create can select new deliverable.",
      "Owner assignment saves correctly.",
      "Capacity timeline includes deliverable allocation.",
      "Audit records create when writes enabled."
    ],
    "screenDoc": "project/deliverables.html"
  },
  "project-create-work-item": {
    "context": "Team members create work items (tasks/activities) against project deliverables for execution, taskboard, and timesheet logging. Categories may be org-configured per service line; bulk create from templates available when enabled. Items appear on taskboard and My Work queue.",
    "summary": "Create a work item linked to a project deliverable for execution.",
    "permissions": [
      {
        "name": "Work item create",
        "path": "workItems.createEnabled",
        "level": "Create",
        "notes": "Team member or manager."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Access to parent project."
      },
      {
        "name": "Deliverable view",
        "path": "deliverables.viewEnabled",
        "level": "Read",
        "notes": "Typical prerequisite for row linkage."
      },
      {
        "name": "Task access",
        "path": "projects.taskAccessRestrictions",
        "level": "Scope",
        "notes": "Step 7 restrictions may limit assignees."
      },
      {
        "name": "Timesheet entry",
        "path": "timeSheet.enableTimeSheetEntry",
        "level": "Downstream",
        "notes": "Logged hours require work item assignment."
      }
    ],
    "featureFlags": [
      {
        "flag": "workGraphEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "New items surface in My Work queue.",
        "whenDisabled": "Taskboard primary visibility path."
      },
      {
        "flag": "timesheetIntelligenceEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Suggested rows when logging hours against item.",
        "whenDisabled": "Manual project/deliverable selection on timesheet."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Team member",
        "effect": "Create items on assigned projects.",
        "notes": "Assignee defaults to self when permitted."
      },
      {
        "role": "Manager",
        "effect": "Create and assign to direct reports.",
        "notes": "Cross-team assign blocked by task access rules."
      },
      {
        "role": "Skills restriction",
        "effect": "Assignee must match skill tags when restrictedBySkillsEnabled.",
        "notes": "Validates against employee skills profile."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Working-day windows",
        "text": "timeSheet disableProjectWorkItemCreate* rules may block retroactive item create."
      },
      {
        "type": "warning",
        "title": "No deliverable",
        "text": "Some projects require deliverable on each item for billing."
      }
    ],
    "considerations": [
      "Create deliverable first when project structure requires it.",
      "Set planned dates for capacity and calendar views.",
      "Match category to org service line configuration.",
      "Verify mobile task list shows new item after sync."
    ],
    "verify": [
      "Work item saved and visible on work items register.",
      "Card appears on taskboard in Planned/To do column.",
      "Assignee receives My Work entry when enabled.",
      "Timesheet can log hours against item.",
      "Task access restriction blocks unauthorized assignee.",
      "Status can be set at create time."
    ],
    "screenDoc": "project/work-items.html"
  },
  "project-update-taskboard": {
    "context": "Project teams manage execution on the Kanban taskboard by dragging cards across Planned → To do → In progress → Done or editing detail inline. WIP limits may warn per column; status permissions vary by persona RBAC. Changes sync to My Work and mobile Tasks hub.",
    "summary": "Update task status and details on the project Kanban taskboard.",
    "permissions": [
      {
        "name": "Taskboard menu",
        "path": "projectModules.taskboardEnabled",
        "level": "Active",
        "notes": "Module flag required."
      },
      {
        "name": "Work item edit",
        "path": "workItems.editEnabled",
        "level": "Edit",
        "notes": "Assignee or manager scope."
      },
      {
        "name": "Status change",
        "path": "workItems.statusChangeEnabled",
        "level": "Role-gated",
        "notes": "Some roles cannot move to Done."
      },
      {
        "name": "Project filter",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Filter by projects in team scope."
      }
    ],
    "featureFlags": [
      {
        "flag": "myWorkQueueEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Board updates reflect in My Work register.",
        "whenDisabled": "Taskboard is primary status surface."
      },
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "WIP and governance columns may appear.",
        "whenDisabled": "Standard four-column board."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Assignee",
        "effect": "Move own cards; edit hours on detail.",
        "notes": "Cannot reassign unless edit scope allows."
      },
      {
        "role": "Manager",
        "effect": "Move team cards; override WIP warnings.",
        "notes": "Audit UI on status change when enabled."
      },
      {
        "role": "Mobile user",
        "effect": "Same status values sync from mobile Tasks.",
        "notes": "Mobile parity on validation rules."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "WIP limit",
        "text": "Column may show warning when WIP exceeded per org config."
      },
      {
        "type": "warning",
        "title": "Hours mismatch",
        "text": "Done status with zero actual hours may fail validation on some projects."
      }
    ],
    "considerations": [
      "Log actual hours on timesheet when marking Done.",
      "Use filters for multi-project boards.",
      "Compare WIP summary with team capacity view.",
      "Test mobile drag-equivalent status changes."
    ],
    "verify": [
      "Drag updates column and persists on refresh.",
      "Detail panel save updates assignee and dates.",
      "WIP warning displays when limit exceeded.",
      "My Work status matches board after update.",
      "Mobile status change reflects on web board.",
      "Unauthorized persona blocked from status change."
    ],
    "screenDoc": "project/taskboard.html"
  },
  "project-team-capacity": {
    "context": "Resource and project managers plan allocations in Team capacity using Overview gauges, Roster, Timeline, and Gantt views. Drag allocations to resolve overload signals; changes feed utilization reports. Requires resourcePlanningEnabled or projectModules.resourcePlannerEnabled at org unit.",
    "summary": "Plan and balance team capacity across projects and weeks.",
    "permissions": [
      {
        "name": "Capacity menu",
        "path": "projectModules.resourcePlannerEnabled",
        "level": "Active",
        "notes": "Also gated by resourcePlanningEnabled org flag."
      },
      {
        "name": "Allocation edit",
        "path": "projects.resourceLevelProjectHoursAllocationEnabled",
        "level": "Edit",
        "notes": "Drag/edit hours on timeline."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "See assigned projects on roster."
      },
      {
        "name": "Gantt view",
        "path": "projectModules.ganttEnabled",
        "level": "Read",
        "notes": "Employee vs work-item axis planning."
      }
    ],
    "featureFlags": [
      {
        "flag": "resourcePlanningEnabled",
        "group": "tracopusResourcesAdditional",
        "whenEnabled": "Full capacity module with Resources cross-links.",
        "whenDisabled": "Project capacity only if resourcePlannerEnabled on role."
      },
      {
        "flag": "portfolioControlTowerEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Overload signals tie to portfolio KPIs.",
        "whenDisabled": "Local team gauges only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Resource manager",
        "effect": "Cross-project allocation edits on timeline.",
        "notes": "Compare with skills matrix for gaps."
      },
      {
        "role": "Project manager",
        "effect": "Adjust allocations for own project team.",
        "notes": "May not see other projects without scope."
      },
      {
        "role": "Executive",
        "effect": "Read-only overview for steering reviews.",
        "notes": "Export for leadership meetings."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Double booking",
        "text": "Overlapping allocations show conflict on timeline."
      },
      {
        "type": "warning",
        "title": "Stale estimates",
        "text": "Capacity uses planned hours; reconcile with actual timesheet."
      }
    ],
    "considerations": [
      "Cross-check Resources skills matrix before staffing.",
      "Export allocation before major replanning.",
      "Link staffing requests when gaps identified.",
      "Verify Gantt enabled for employee-axis view."
    ],
    "verify": [
      "Overview gauges load utilization metrics.",
      "Timeline drag saves allocation hours.",
      "Roster filter by team and skills works.",
      "Gantt view renders when ganttEnabled.",
      "Conflict indicator shows on overload.",
      "Utilization report reflects saved allocations."
    ],
    "screenDoc": "project/team-capacity.html"
  },
  "project-run-report": {
    "context": "Managers, finance, and analysts run operational reports from Project → Reports catalog including utilization, estimate vs actual, and data dumps. Parameters cover date range, team, and project filters; results preview in browser or export CSV/Excel. Scheduled email reports available when role permits.",
    "summary": "Generate delivery and utilization reports from the Project catalog.",
    "permissions": [
      {
        "name": "Reports menu",
        "path": "projectModules.reportsEnabled",
        "level": "Active",
        "notes": "Module flag on role."
      },
      {
        "name": "Utilization report",
        "path": "reports.utilizationEnabled",
        "level": "Run",
        "notes": "My Utilization vs Employee Utilization differ by scope."
      },
      {
        "name": "Data dump",
        "path": "reports.dataDumpEnabled",
        "level": "Export",
        "notes": "Large exports may be async."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Filters respect team list scope."
      }
    ],
    "featureFlags": [
      {
        "flag": "analyticsPlatformEnabled",
        "group": "tracopusAnalyticsAdditional",
        "whenEnabled": "Cross-link to Analytics report builder for advanced defs.",
        "whenDisabled": "Project catalog reports only."
      },
      {
        "flag": "timesheetIntelligenceEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Defaulter notifications may email on schedule.",
        "whenDisabled": "Manual report runs only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Team-scoped utilization reports.",
        "notes": "Employee Utilization shows direct reports."
      },
      {
        "role": "Finance",
        "effect": "Commercial and billing-oriented reports.",
        "notes": "May require cross-team scope on role."
      },
      {
        "role": "Analyst",
        "effect": "Data dump and custom parameter sets.",
        "notes": "Export CSV for external BI."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Large date range",
        "text": "Wide ranges slow generation; narrow filters for interactive preview."
      },
      {
        "type": "warning",
        "title": "Unapproved timesheets",
        "text": "Utilization may exclude unsubmitted hours per report definition."
      }
    ],
    "considerations": [
      "Approve timesheets before est-vs-actual runs.",
      "Compare My Utilization scope with role expectations.",
      "Schedule recurring reports for defaulter tracking.",
      "Use analytics-report-builder for reusable custom defs."
    ],
    "verify": [
      "Report catalog lists enabled reports for role.",
      "Run produces preview or download file.",
      "Filters apply correctly to result set.",
      "CSV export opens with expected columns.",
      "Team scope hides other teams data for manager.",
      "Scheduled email fires when configured."
    ],
    "screenDoc": "project/reports.html"
  },
  "project-global-search": {
    "context": "Global search finds projects, tasks, files, people, and notes within RBAC scope from shell Search or Project → Global search. Results respect team masking and persona permissions; useful for UAT verification and cross-project navigation.",
    "summary": "Search across projects, tasks, people, and files within access scope.",
    "permissions": [
      {
        "name": "Search menu",
        "path": "projectModules.searchEnabled",
        "level": "Active",
        "notes": "Module flag required."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Project hits limited to scope."
      },
      {
        "name": "Work item view",
        "path": "workItems.viewEnabled",
        "level": "Scoped",
        "notes": "Task results masked per team."
      },
      {
        "name": "Employee view",
        "path": "employees.viewEnabled",
        "level": "Scoped",
        "notes": "People results follow directory scope."
      }
    ],
    "featureFlags": [
      {
        "flag": "workGraphEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Search indexes linked work graph entities.",
        "whenDisabled": "Standard project/task/file index."
      },
      {
        "flag": "aiWorkIntelligenceEnabled",
        "group": "tracopusAnalyticsAdditional",
        "whenEnabled": "AI may suggest related queries in Assist dock.",
        "whenDisabled": "Keyword search only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "All users",
        "effect": "Results filtered to permitted records only.",
        "notes": "No elevation via search."
      },
      {
        "role": "Manager",
        "effect": "Broader team hits than individual contributor.",
        "notes": "Cross-team still blocked without scope."
      },
      {
        "role": "Admin",
        "effect": "Wider index when list scope allows.",
        "notes": "PII masking still applies."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Index lag",
        "text": "Recently created records may take moments to appear in index."
      },
      {
        "type": "warning",
        "title": "Masked fields",
        "text": "Snippets may redact PII per masking policy."
      }
    ],
    "considerations": [
      "Use quoted phrases for exact match tests.",
      "Apply type filters to narrow large result sets.",
      "Verify UAT scenarios via known project keywords.",
      "Compare with My Work for assigned task discovery."
    ],
    "verify": [
      "Search returns expected project by name.",
      "Task result opens correct work item detail.",
      "Out-of-scope record not in results for employee persona.",
      "Type filter limits to selected entity types.",
      "People result respects directory masking.",
      "Deep link route loads without 403."
    ],
    "screenDoc": "project/search.html"
  },
  "project-submit-feedback": {
    "context": "Project managers and client liaisons capture structured stakeholder feedback on projects or deliverables using templates from Project → Feedback. Entries feed feedback register and dump reports; anonymous mode depends on template config. External stakeholders may use document share route when enabled.",
    "summary": "Submit structured stakeholder feedback on a project or deliverable.",
    "permissions": [
      {
        "name": "Feedback menu",
        "path": "projectModules.feedbackEnabled",
        "level": "Active",
        "notes": "Module flag required."
      },
      {
        "name": "Feedback create",
        "path": "feedback.createEnabled",
        "level": "Create",
        "notes": "PM or client liaison role."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Select project on form."
      },
      {
        "name": "Deliverable view",
        "path": "deliverables.viewEnabled",
        "level": "Optional",
        "notes": "Deliverable-level feedback when configured."
      }
    ],
    "featureFlags": [
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Feedback tied to governance quality metrics.",
        "whenDisabled": "Standalone feedback register."
      },
      {
        "flag": "policyAiEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "AI may summarize feedback dumps for admins.",
        "whenDisabled": "Manual report review only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Create internal and client-facing submissions.",
        "notes": "Template drives question set."
      },
      {
        "role": "External stakeholder",
        "effect": "Public link submission when share route enabled.",
        "notes": "Token security per org policy."
      },
      {
        "role": "Analyst",
        "effect": "Read-only on register and dump report.",
        "notes": "Anonymous responses masked in dump."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Anonymous template",
        "text": "Anonymous mode hides submitter in register per template."
      },
      {
        "type": "warning",
        "title": "Public link expiry",
        "text": "Share tokens may expire; regenerate from detail."
      }
    ],
    "considerations": [
      "Select template before sending external link.",
      "Link feedback to deliverable for milestone reviews.",
      "Run feedback dump report for quarterly QA.",
      "Do not include PII in public link forms."
    ],
    "verify": [
      "Submission appears in feedback register.",
      "Template questions render and validate required fields.",
      "Deliverable linkage saves on detail.",
      "Public share link submits when enabled.",
      "Dump report aggregates new submission.",
      "Anonymous entry hides identity when configured."
    ],
    "screenDoc": "project/feedback.html"
  },
  "sales-create-bid": {
    "context": "Sales admins and BD managers create bid requests (opportunities) in Sales → Bid requests with client, study type, pipeline stage, and commercial estimates. CRM sync indicator shows Salesforce link when integration configured. Won bids feed PO and project creation workflows.",
    "summary": "Create a bid request opportunity in the sales pipeline register.",
    "permissions": [
      {
        "name": "Bid requests menu",
        "path": "salesModules.bidRequestsEnabled",
        "level": "Active",
        "notes": "Sales module on role."
      },
      {
        "name": "Create bid",
        "path": "bidRequests.createEnabled",
        "level": "Create",
        "notes": "Sales admin or BD manager."
      },
      {
        "name": "Edit bid",
        "path": "bidRequests.editEnabled",
        "level": "Edit",
        "notes": "Owner team assignment on create."
      },
      {
        "name": "View accounts",
        "path": "projectModules.accountsEnabled",
        "level": "Read",
        "notes": "Client/account picker on form."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Salesforce sync fields visible on bid detail.",
        "whenDisabled": "Manual bid entry only."
      },
      {
        "flag": "financeIntelligenceEnabled",
        "group": "tracopusFinanceAdditional",
        "whenEnabled": "Pipeline charts include finance intelligence tiles.",
        "whenDisabled": "Standard register charts."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Sales admin",
        "effect": "Full create with documents and demographics.",
        "notes": "Cross-team when switchUserTeamsEnabled."
      },
      {
        "role": "BD manager",
        "effect": "Create and assign owner team.",
        "notes": "Stage transitions on edit scenario."
      },
      {
        "role": "Project manager",
        "effect": "Read-only pipeline view when permitted.",
        "notes": "No create without sales role."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Duplicate opportunity",
        "text": "Search register before create to avoid duplicate client/study rows."
      },
      {
        "type": "warning",
        "title": "CRM drift",
        "text": "Local bid may diverge from Salesforce if sync job failed."
      }
    ],
    "considerations": [
      "Set accurate stage for pipeline analytics.",
      "Attach supporting documents on create.",
      "Verify Salesforce ID when CRM linked.",
      "Plan PO create on win transition."
    ],
    "verify": [
      "Bid appears in register with NEW or selected stage.",
      "Owner team and documents saved.",
      "Pipeline chart includes new bid value.",
      "Bid detail opens from row click.",
      "CRM sync indicator shows when integrated.",
      "Audit records create when writes enabled."
    ],
    "screenDoc": "sales/bid-requests.html"
  },
  "sales-edit-bid": {
    "context": "Sales owners update bid details and advance pipeline stages (qualified, won, lost) on Bid details. Commercial estimates and documents refresh pipeline charts; won bids trigger PO and project handoff. Lost bids retain history for post-mortem reports.",
    "summary": "Update bid details and advance pipeline stage on the opportunity.",
    "permissions": [
      {
        "name": "View bid",
        "path": "bidRequests.viewEnabled",
        "level": "Read",
        "notes": "Team scope on register."
      },
      {
        "name": "Edit bid",
        "path": "bidRequests.editEnabled",
        "level": "Edit",
        "notes": "Owner or sales admin."
      },
      {
        "name": "Stage change",
        "path": "bidRequests.allowStatusChange",
        "level": "Gated",
        "notes": "changeableStatus per role."
      },
      {
        "name": "Documents",
        "path": "bidRequests.documentsEnabled",
        "level": "Edit",
        "notes": "Attach/update supporting files."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Bid updates may sync to Salesforce.",
        "whenDisabled": "Local record only."
      },
      {
        "flag": "purchaseOrderMandatoryEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Won stage prompts PO create before project.",
        "whenDisabled": "Project may proceed without PO per policy."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Sales owner",
        "effect": "Edit assigned bids and advance stage.",
        "notes": "Pipeline analytics update on save."
      },
      {
        "role": "Sales admin",
        "effect": "Cross-team edit when role scope allows.",
        "notes": "Audit UI on stage change when enabled."
      },
      {
        "role": "Executive",
        "effect": "Read-only on detail for reviews.",
        "notes": "Export via reports."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stage regression",
        "text": "allowStatusLevelDown may block moving to earlier stage."
      },
      {
        "type": "warning",
        "title": "Won without PO",
        "text": "Downstream project create may fail when PO mandatory."
      }
    ],
    "considerations": [
      "Document loss reason when marking lost.",
      "Create PO promptly on won stage.",
      "Refresh CRM sync after major field changes.",
      "Review pipeline chart after bulk stage updates."
    ],
    "verify": [
      "Edit saves and detail refreshes.",
      "Stage chip updates on register.",
      "Pipeline chart reflects new stage/value.",
      "Documents upload and persist.",
      "Won bid links to PO create workflow.",
      "Lost bid retained in register filter."
    ],
    "screenDoc": "sales/bid-details.html"
  },
  "sales-create-po": {
    "context": "Sales admins and finance create purchase orders via four-step wizard covering contract core, client/account, delivery scope, and references including bid link and Salesforce ID. POs link to projects and invoice line items; import from Salesforce available when org toggle enabled.",
    "summary": "Create a purchase order contract using the PO wizard.",
    "permissions": [
      {
        "name": "PO menu",
        "path": "salesModules.purchaseordersEnabled",
        "level": "Active",
        "notes": "Sales module flag."
      },
      {
        "name": "Create PO",
        "path": "purchaseOrders.createEnabled",
        "level": "Create",
        "notes": "Sales admin or finance role."
      },
      {
        "name": "Service line estimates",
        "path": "purchaseOrders.enableServiceLineEstimateHourVisible",
        "level": "View/Edit",
        "notes": "Commercial estimate fields per role."
      },
      {
        "name": "Status change",
        "path": "purchaseOrders.allowStatusChange",
        "level": "Optional",
        "notes": "PO lifecycle status on role."
      }
    ],
    "featureFlags": [
      {
        "flag": "purchaseOrderImportFromSalesForceEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Import action on register mirrors CRM contracts.",
        "whenDisabled": "Manual wizard create only."
      },
      {
        "flag": "financeIntelligenceEnabled",
        "group": "tracopusFinanceAdditional",
        "whenEnabled": "Finance panels on PO detail enhanced.",
        "whenDisabled": "Standard PO detail tabs."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Sales admin",
        "effect": "Full wizard with bid and Salesforce references.",
        "notes": "Owners assigned on Step 4."
      },
      {
        "role": "Finance",
        "effect": "Edit commercial estimates and tax fields.",
        "notes": "Cross-link to invoice creation."
      },
      {
        "role": "Project manager",
        "effect": "Read PO for project linking.",
        "notes": "Create usually sales/finance restricted."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Duplicate PO number",
        "text": "Duplicate proposal/PO numbers break billing reconciliation."
      },
      {
        "type": "warning",
        "title": "Date alignment",
        "text": "Project dates may be restricted by PO date range when enabled."
      }
    ],
    "considerations": [
      "Link won bid on Step 4 for traceability.",
      "Store Salesforce ID for re-import sync.",
      "Verify linked projects tab after project attach.",
      "Enable mandatory PO mode only after PO catalog populated."
    ],
    "verify": [
      "Wizard submits and PO appears in register.",
      "Bid link visible on PO detail.",
      "Client/account mapping saved.",
      "Commercial estimates visible per role flags.",
      "Linked projects tab empty until attach.",
      "Sync indicator shows Salesforce ID when set."
    ],
    "screenDoc": "sales/purchase-orders.html"
  },
  "sales-link-po-project": {
    "context": "Project managers and sales admins link purchase orders to projects at create time (wizard Step 1), project edit panel, or PO detail Linked projects tab. Mandatory PO mode blocks project submit without link. Multiple projects per PO may be allowed per org policy.",
    "summary": "Link a purchase order to a project for financial traceability.",
    "permissions": [
      {
        "name": "Edit project",
        "path": "projects.editEnabled",
        "level": "Edit",
        "notes": "Set purchaseOrderId on project."
      },
      {
        "name": "PO edit",
        "path": "purchaseOrders.editEnabled",
        "level": "Edit",
        "notes": "Attach from PO Linked projects tab."
      },
      {
        "name": "PO on project",
        "path": "projects.enableProjectPurchaseOrderEditable",
        "level": "Edit",
        "notes": "Field editable when flag true."
      },
      {
        "name": "View PO",
        "path": "purchaseOrders.viewEnabled",
        "level": "Read",
        "notes": "Picker shows scoped POs."
      }
    ],
    "featureFlags": [
      {
        "flag": "purchaseOrderMandatoryEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Project create blocked without PO selection.",
        "whenDisabled": "Link optional unless team override."
      },
      {
        "flag": "projectDatesRestrictedByPurchaseOrderDates",
        "group": "projectsAdditional",
        "whenEnabled": "Project dates validated against PO contract dates.",
        "whenDisabled": "Independent project date entry."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Link PO during create or edit.",
        "notes": "Billing reports pick up PO reference."
      },
      {
        "role": "Sales admin",
        "effect": "Link from PO detail to multiple projects.",
        "notes": "showAllPurchaseOrderProjects may apply."
      },
      {
        "role": "Finance",
        "effect": "Verifies cross-links for invoice lines.",
        "notes": "Read-only link unless edit on both sides."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Mandatory mode",
        "text": "Unlinked project cannot submit when PO mandatory at org unit."
      },
      {
        "type": "warning",
        "title": "Wrong PO",
        "text": "Incorrect link affects revenue recognition and invoice lines."
      }
    ],
    "considerations": [
      "Verify bid → PO → project chain for won opportunities.",
      "Check both project detail and PO detail after save.",
      "Run billing report sample after link.",
      "Use inherit/override carefully for mandatory mode on child teams."
    ],
    "verify": [
      "PO field saved on project detail.",
      "PO Linked projects tab shows project.",
      "Mandatory validation fires when enabled.",
      "Invoice line item can reference linked PO.",
      "Date restriction warning when dates outside PO.",
      "Audit records link change when enabled."
    ],
    "screenDoc": "project/project-list.html"
  },
  "sales-import-po-salesforce": {
    "context": "Sales admins import purchase orders from Salesforce when purchaseOrderImportFromSalesForceEnabled and Integration Center connector configured. Search by Salesforce ID or opportunity reference; re-import updates existing PO by external ID. Check sync health before dependent billing workflows.",
    "summary": "Import or update a purchase order from Salesforce CRM.",
    "permissions": [
      {
        "name": "PO create",
        "path": "purchaseOrders.createEnabled",
        "level": "Import",
        "notes": "Import action equivalent to create."
      },
      {
        "name": "PO view",
        "path": "purchaseOrders.viewEnabled",
        "level": "Read",
        "notes": "Preview mapped fields before confirm."
      },
      {
        "name": "Integration admin",
        "path": "integrationCenterEnabled",
        "level": "Configure",
        "notes": "Connector must be active."
      },
      {
        "name": "Switch teams",
        "path": "purchaseOrders.switchUserTeamsEnabled",
        "level": "Optional",
        "notes": "Assign imported PO to correct team."
      }
    ],
    "featureFlags": [
      {
        "flag": "purchaseOrderImportFromSalesForceEnabled",
        "group": "purchaseOrdersAdditional",
        "whenEnabled": "Import from Salesforce action on PO register.",
        "whenDisabled": "Manual PO wizard only."
      },
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Salesforce adapter configurable in Integrations hub.",
        "whenDisabled": "Import fails without pre-deployed connector."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Sales admin",
        "effect": "Search CRM and confirm field mapping preview.",
        "notes": "Creates or updates local PO by external ID."
      },
      {
        "role": "Integration admin",
        "effect": "Fixes mapping and retries failed import.",
        "notes": "Sync health shows batch errors."
      },
      {
        "role": "Finance",
        "effect": "Reviews imported commercial fields before project link.",
        "notes": "Read-only on import action typically."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Sync failure",
        "text": "Import errors often indicate stale credentials or mapping mismatch."
      },
      {
        "type": "warning",
        "title": "Re-import overwrite",
        "text": "Re-import may overwrite local edits matched by Salesforce ID."
      }
    ],
    "considerations": [
      "Verify sync health green before bulk import.",
      "Map account and service category fields in Integration hub.",
      "Compare CRM stage with local PO status after import.",
      "Link imported PO to project before mandatory-mode create."
    ],
    "verify": [
      "Import action visible when org flag enabled.",
      "Search returns CRM record by ID.",
      "Preview mapping shows expected fields.",
      "Confirm creates PO with Salesforce ID stored.",
      "Sync indicator on PO detail shows linked.",
      "Re-import updates same PO not duplicate."
    ],
    "screenDoc": "sales/purchase-orders.html"
  },
  "resources-staffing-request": {
    "context": "Project managers raise staffing requests in Resources → Staffing requests specifying project, skills, FTE/hours, and date range for resource managers to fulfill. Cross-check skills matrix before submit; link bench candidates when available. Requires resourcePlanningEnabled or Resources module active.",
    "summary": "Raise a staffing request for skills and capacity needed on a project.",
    "permissions": [
      {
        "name": "Resources module",
        "path": "resourcesModules.active",
        "level": "Active",
        "notes": "Resource Intelligence rail entry."
      },
      {
        "name": "Staffing create",
        "path": "staffingRequests.createEnabled",
        "level": "Create",
        "notes": "PM or resource manager."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Link request to project."
      },
      {
        "name": "Capacity view",
        "path": "projectModules.resourcePlannerEnabled",
        "level": "Read",
        "notes": "Compare with team capacity before submit."
      }
    ],
    "featureFlags": [
      {
        "flag": "resourcePlanningEnabled",
        "group": "tracopusResourcesAdditional",
        "whenEnabled": "Staffing queue integrated with capacity planning.",
        "whenDisabled": "Standalone request register."
      },
      {
        "flag": "workGraphEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Request status may surface in My Work for assignees.",
        "whenDisabled": "Email/notification only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Project manager",
        "effect": "Submit request with justification and priority.",
        "notes": "Tracks status on detail page."
      },
      {
        "role": "Resource manager",
        "effect": "Fulfills from queue; assigns candidates.",
        "notes": "Skills matrix informs matching."
      },
      {
        "role": "HR",
        "effect": "Views skills gaps from matrix reports.",
        "notes": "May not fulfill without resource role."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Unrealistic dates",
        "text": "Requests outside project timeline rejected or deprioritized."
      },
      {
        "type": "warning",
        "title": "Missing skills tags",
        "text": "Employees without profile skills reduce match quality."
      }
    ],
    "considerations": [
      "Update employee skills during onboarding.",
      "Compare with project-team-capacity overload signals.",
      "Set priority for critical deliverable windows.",
      "Close loop when candidate assigned to project."
    ],
    "verify": [
      "New request appears in staffing queue.",
      "Project link saves on detail.",
      "Skills and hours fields persist.",
      "Resource manager can update status.",
      "Assigned candidate visible on detail.",
      "Notification sent to resource manager when enabled."
    ],
    "screenDoc": "project/team-capacity.html"
  },
  "resources-skills-matrix": {
    "context": "Resource managers and HR review organization skills coverage in Resources → Skills matrix filtering by team, category, and proficiency. Low-coverage cells indicate staffing gaps; click through to employee profile skills tab. Matrix informs project task access restrictions and staffing requests.",
    "summary": "Review organization skills coverage and gaps in the matrix view.",
    "permissions": [
      {
        "name": "Resources module",
        "path": "resourcesModules.active",
        "level": "Active",
        "notes": "Module enabled on role."
      },
      {
        "name": "Skills matrix view",
        "path": "resourcesModules.skillsMatrixEnabled",
        "level": "Read",
        "notes": "Matrix register access."
      },
      {
        "name": "Employee view",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "Drill to profile skills tab."
      },
      {
        "name": "Employee edit",
        "path": "employees.editEnabled",
        "level": "Optional",
        "notes": "HR updates skills from drill-through."
      }
    ],
    "featureFlags": [
      {
        "flag": "resourcePlanningEnabled",
        "group": "tracopusResourcesAdditional",
        "whenEnabled": "Matrix links to staffing and capacity modules.",
        "whenDisabled": "Standalone matrix export."
      },
      {
        "flag": "employee360Enabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Skills panel also on Employee 360 view.",
        "whenDisabled": "Profile skills tab only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Resource manager",
        "effect": "Export matrix for staffing meetings.",
        "notes": "Identifies bench and gaps."
      },
      {
        "role": "HR admin",
        "effect": "Updates skills on employee profile from gaps.",
        "notes": "Onboarding Step 5 feeds matrix."
      },
      {
        "role": "Project manager",
        "effect": "Read-only for task access planning.",
        "notes": "restrictedBySkillsEnabled uses same data."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stale skills",
        "text": "Outdated profile skills skew matrix heatmap."
      },
      {
        "type": "warning",
        "title": "Export PII",
        "text": "Matrix export may include employee names; follow compliance policy."
      }
    ],
    "considerations": [
      "Refresh skills after certifications earned.",
      "Use export in staffing review cadence.",
      "Align skill categories with org config taxonomy.",
      "Cross-check with staffing request skills fields."
    ],
    "verify": [
      "Matrix loads with team filter applied.",
      "Low coverage cells identifiable visually.",
      "Cell click opens employee skills tab.",
      "Export produces expected row/column layout.",
      "Updated skills reflect after profile save.",
      "Task access restriction honors skill tags when enabled."
    ],
    "screenDoc": "project/team-capacity.html"
  },
  "finance-view-invoice": {
    "context": "Finance and client managers review invoice details, line items, tax, and linked project/PO references from the Invoices register. Generate PDF and share document link with clients when external sharing enabled; token routes may be public per security policy.",
    "summary": "Review invoice details and distribute PDF or share link to clients.",
    "permissions": [
      {
        "name": "Invoice menu",
        "path": "hrmsModules.invoiceEnabled",
        "level": "Active",
        "notes": "Or financeModules when finance intelligence enabled."
      },
      {
        "name": "View invoice",
        "path": "invoice.viewEnabled",
        "level": "Read",
        "notes": "Finance and scoped client managers."
      },
      {
        "name": "Share document",
        "path": "invoice.shareEnabled",
        "level": "Share",
        "notes": "External token link when enabled."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Read",
        "notes": "Verify linked project on lines."
      }
    ],
    "featureFlags": [
      {
        "flag": "financeIntelligenceEnabled",
        "group": "tracopusFinanceAdditional",
        "whenEnabled": "Enhanced invoice analytics on detail panels.",
        "whenDisabled": "Standard invoice detail layout."
      },
      {
        "flag": "employeeFinanceEnabled",
        "group": "tracopusPayrollAdditional",
        "whenEnabled": "Employee-facing finance widgets may reference invoice status.",
        "whenDisabled": "Finance admin view only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Finance admin",
        "effect": "Full detail, PDF, and share actions.",
        "notes": "Cross-client when scope permits."
      },
      {
        "role": "Client manager",
        "effect": "View and share assigned client invoices.",
        "notes": "Cannot edit finalized amounts."
      },
      {
        "role": "Project manager",
        "effect": "Read-only line review for delivery reconciliation.",
        "notes": "No share without finance role."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Public share token",
        "text": "Document links may be accessible without login; follow security policy."
      },
      {
        "type": "warning",
        "title": "Draft vs finalized",
        "text": "PDF content differs by status; verify before client send."
      }
    ],
    "considerations": [
      "Reconcile line items with approved timesheets.",
      "Confirm PO reference on each billable line.",
      "Revoke share tokens when policy requires.",
      "Audit PDF generation for compliance."
    ],
    "verify": [
      "Invoice detail shows lines, tax, totals.",
      "Project/PO links navigate correctly.",
      "PDF downloads with expected layout.",
      "Share link works for external recipient when enabled.",
      "Client manager scope hides other clients.",
      "Finalized invoice restricts edit actions."
    ],
    "screenDoc": "hrms/invoice-details.html"
  },
  "payroll-create-run": {
    "context": "Payroll administrators create and process payroll runs after timesheets approved and locked, pulling gross inputs from approved hours and salary structures. Workflow may include approval before finalize and paycheck generation. Employee persona cannot access runs per RBAC.",
    "summary": "Create and finalize a payroll run for a pay period.",
    "permissions": [
      {
        "name": "Payroll module",
        "path": "payrollModules.active",
        "level": "Active",
        "notes": "Requires payrollManagementEnabled org flag."
      },
      {
        "name": "Run create",
        "path": "payrollModules.runsCreateEnabled",
        "level": "Create",
        "notes": "Payroll administrator only."
      },
      {
        "name": "Run edit",
        "path": "payrollModules.runsEditEnabled",
        "level": "Edit",
        "notes": "Adjustments before finalize."
      },
      {
        "name": "Timesheet lock",
        "path": "timeSheet.enableTimeSheetApproval",
        "level": "Prerequisite",
        "notes": "Approved weeks required for inputs."
      }
    ],
    "featureFlags": [
      {
        "flag": "payrollManagementEnabled",
        "group": "tracopusPayrollAdditional",
        "whenEnabled": "Payroll → Runs menu and API available.",
        "whenDisabled": "Payroll module hidden entirely."
      },
      {
        "flag": "payrollReadinessAiEnabled",
        "group": "tracopusPayrollAdditional",
        "whenEnabled": "AI readiness brief highlights exceptions pre-run.",
        "whenDisabled": "Manual exception review only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Payroll administrator",
        "effect": "Full run create, calculate, finalize.",
        "notes": "Generates paychecks on finalize."
      },
      {
        "role": "Manager",
        "effect": "No access to runs; approves timesheets upstream.",
        "notes": "Persona RBAC blocks payroll routes."
      },
      {
        "role": "Employee",
        "effect": "Views paycheck only via my-paychecks.",
        "notes": "Cannot see run register."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Unapproved timesheets",
        "text": "Run calculation exceptions when hours not approved/locked."
      },
      {
        "type": "danger",
        "title": "Finalize irreversible",
        "text": "Finalized runs require controlled reversal process."
      }
    ],
    "considerations": [
      "Complete timesheet approvals before cutoff.",
      "Resolve salary structure gaps for included employees.",
      "Review AI readiness brief when enabled.",
      "Coordinate with finance for bank file export if configured."
    ],
    "verify": [
      "New run selects pay period and group.",
      "Employee inclusion list matches rules.",
      "Calculation completes with exception report.",
      "Finalize generates paychecks.",
      "Employee persona cannot access /payroll/runs.",
      "Locked timesheet weeks included in gross."
    ],
    "screenDoc": "admin.html"
  },
  "payroll-view-paycheck": {
    "context": "Employees access payslips via Workspace → My paychecks after payroll finalize when paychecksEnabled. Admins use Paychecks register for all employees. Compensation fields may be masked from managers via persona RBAC and masking policy.",
    "summary": "View and download payslip for a processed pay period.",
    "permissions": [
      {
        "name": "My paychecks",
        "path": "workspaceModules.myPaychecksEnabled",
        "level": "Self",
        "notes": "Employee self-service route."
      },
      {
        "name": "Paychecks admin",
        "path": "payrollModules.paychecksEnabled",
        "level": "Admin",
        "notes": "Full register for payroll admin."
      },
      {
        "name": "Payroll module",
        "path": "payrollModules.active",
        "level": "Active",
        "notes": "Requires payrollManagementEnabled."
      },
      {
        "name": "Employee self",
        "path": "employees.viewEnabled",
        "level": "Own record",
        "notes": "Only own slips for employee persona."
      }
    ],
    "featureFlags": [
      {
        "flag": "paychecksEnabled",
        "group": "tracopusPayrollAdditional",
        "whenEnabled": "My paychecks and payslip PDF available.",
        "whenDisabled": "Payroll processed but slips not exposed in UI."
      },
      {
        "flag": "maskingPolicyAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Managers cannot view report compensation via 360.",
        "whenDisabled": "Role template controls visiblity."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Employee",
        "effect": "Select period and view/download own payslip.",
        "notes": "Workspace → My paychecks default route."
      },
      {
        "role": "Payroll admin",
        "effect": "All employee paychecks in register.",
        "notes": "Search by period and employee."
      },
      {
        "role": "Manager",
        "effect": "Typically no access to report payslips.",
        "notes": "Masking policy enforced."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Period not processed",
        "text": "Payslip unavailable until run finalized for period."
      },
      {
        "type": "warning",
        "title": "PDF generation lag",
        "text": "PDF may appear minutes after finalize."
      }
    ],
    "considerations": [
      "Enable paychecksEnabled with payrollManagementEnabled.",
      "Test employee mobile access to payslip if offered.",
      "Verify PDF redaction matches compliance policy.",
      "Communicate pay period availability dates to staff."
    ],
    "verify": [
      "My paychecks lists processed periods for employee.",
      "Earnings, deductions, net pay display correctly.",
      "PDF download works when available.",
      "Admin register shows all employees for period.",
      "Manager blocked from employee payslip route.",
      "No payslip before run finalize."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "performance-set-goal": {
    "context": "Managers and employees set performance goals with metrics, targets, and due dates aligned to review cycles when performanceManagementEnabled. Employees may propose goals pending manager approval; progress tracked via check-ins on Performance → Goals dashboard.",
    "summary": "Create a performance goal with metric, target, and owner assignment.",
    "permissions": [
      {
        "name": "Performance module",
        "path": "performanceModules.active",
        "level": "Active",
        "notes": "Requires performanceManagementEnabled org flag."
      },
      {
        "name": "Goal create",
        "path": "performanceModules.goalsCreateEnabled",
        "level": "Create",
        "notes": "Manager or employee propose."
      },
      {
        "name": "Goal edit",
        "path": "performanceModules.goalsEditEnabled",
        "level": "Edit",
        "notes": "Owner and manager scope."
      },
      {
        "name": "Employee view",
        "path": "employees.viewEnabled",
        "level": "Read",
        "notes": "Assign to direct report or self."
      }
    ],
    "featureFlags": [
      {
        "flag": "performanceManagementEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Performance rail, goals, and reviews active.",
        "whenDisabled": "Performance scenarios not applicable."
      },
      {
        "flag": "employee360Enabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Goal snippets visible on Employee 360.",
        "whenDisabled": "Goals only on Performance module."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Manager",
        "effect": "Create goals for direct reports; approve employee proposals.",
        "notes": "Align to department objectives when configured."
      },
      {
        "role": "Employee",
        "effect": "Propose own goals when permitted.",
        "notes": "Pending until manager approval."
      },
      {
        "role": "HR",
        "effect": "Configure cycles and monitor adoption.",
        "notes": "Cannot edit goal content without scope."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Orphan goals",
        "text": "Goals outside active cycle may not appear in review workflow."
      },
      {
        "type": "warning",
        "title": "Metric ambiguity",
        "text": "Unclear metrics complicate review rating."
      }
    ],
    "considerations": [
      "Align goal due dates with review cycle calendar.",
      "Use check-ins before formal review period.",
      "Link goals to project delivery OKRs when relevant.",
      "Pilot performanceManagementEnabled on one BU first."
    ],
    "verify": [
      "Goal appears on Performance → Goals dashboard.",
      "Owner and target fields save correctly.",
      "Employee proposal shows pending manager state.",
      "Manager approval activates goal.",
      "360 snippet shows goal when flags enabled.",
      "Audit records goal create when writes on."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "performance-complete-review": {
    "context": "Managers, employees, and HR complete formal review cycles with self-assessment, manager ratings, calibration, and employee acknowledgment. HR monitors completion dashboard and sends reminders; calibration page adjusts ratings post-manager submit when configured.",
    "summary": "Complete self-assessment and manager review in an active cycle.",
    "permissions": [
      {
        "name": "Performance module",
        "path": "performanceModules.active",
        "level": "Active",
        "notes": "performanceManagementEnabled required."
      },
      {
        "name": "Self assessment",
        "path": "performanceModules.selfAssessmentEnabled",
        "level": "Employee",
        "notes": "Own review form."
      },
      {
        "name": "Manager review",
        "path": "performanceModules.managerReviewEnabled",
        "level": "Manager",
        "notes": "Direct report reviews."
      },
      {
        "name": "HR monitor",
        "path": "performanceModules.hrAdminEnabled",
        "level": "HR",
        "notes": "Completion dashboard and reminders."
      }
    ],
    "featureFlags": [
      {
        "flag": "performanceManagementEnabled",
        "group": "tracopusPeopleAdditional",
        "whenEnabled": "Review cycles, calibration, acknowledgment active.",
        "whenDisabled": "Module hidden."
      },
      {
        "flag": "workflowAutomationEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Reminder emails for overdue review steps.",
        "whenDisabled": "Manual HR follow-up."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Employee",
        "effect": "Complete self-assessment by deadline.",
        "notes": "Acknowledges final rating in portal."
      },
      {
        "role": "Manager",
        "effect": "Rate competencies and submit review.",
        "notes": "Calibration may adjust post-submit."
      },
      {
        "role": "HR admin",
        "effect": "Monitors completion; runs calibration session.",
        "notes": "Audit UI on finalization when enabled."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Missed deadline",
        "text": "Late self-assessment may block manager review step."
      },
      {
        "type": "danger",
        "title": "Calibration override",
        "text": "Calibration adjustments should be documented for fairness audit."
      }
    ],
    "considerations": [
      "Communicate cycle deadlines to all participants.",
      "Run calibration before employee acknowledgment.",
      "Separate continuous feedback from formal review records.",
      "Export completion report for HR compliance."
    ],
    "verify": [
      "Active cycle visible on Review cycles page.",
      "Employee self-assessment saves and locks at submit.",
      "Manager review accessible after self-assessment.",
      "HR dashboard shows accurate completion %.",
      "Final acknowledgment recorded on employee side.",
      "Calibration changes reflected in final rating."
    ],
    "screenDoc": "hrms/profile.html"
  },
  "analytics-report-builder": {
    "context": "Analysts and admins build reusable custom reports in Analytics → Report builder choosing domains (projects, people, finance), dimensions, metrics, and filters. Saved definitions may schedule via Scheduled reports; compare with Project → Reports for operational catalogs.",
    "summary": "Build and save a custom analytics report definition.",
    "permissions": [
      {
        "name": "Analytics module",
        "path": "analyticsModules.active",
        "level": "Active",
        "notes": "Requires analyticsPlatformEnabled org flag."
      },
      {
        "name": "Report builder",
        "path": "analyticsModules.reportBuilderEnabled",
        "level": "Create",
        "notes": "Analyst or admin role."
      },
      {
        "name": "Scheduled reports",
        "path": "analyticsModules.scheduledReportsEnabled",
        "level": "Optional",
        "notes": "Email delivery when permitted."
      },
      {
        "name": "Data scope",
        "path": "analyticsModules.scopeEnabled",
        "level": "Scoped",
        "notes": "Team/org filters per persona."
      }
    ],
    "featureFlags": [
      {
        "flag": "analyticsPlatformEnabled",
        "group": "tracopusAnalyticsAdditional",
        "whenEnabled": "Analytics hub and report builder menus active.",
        "whenDisabled": "Project operational reports only."
      },
      {
        "flag": "analyticsAiInsightsEnabled",
        "group": "analyticsModules.aiInsightsEnabled",
        "whenEnabled": "AI suggests dimensions/metrics in builder.",
        "whenDisabled": "Manual field selection only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Analyst",
        "effect": "Create, save, and run custom definitions.",
        "notes": "Export chart/table output."
      },
      {
        "role": "Admin",
        "effect": "Broader data scope across org units.",
        "notes": "Masking still applies to PII metrics."
      },
      {
        "role": "Executive",
        "effect": "Run saved reports shared to role.",
        "notes": "May not edit others definitions."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Heavy query",
        "text": "Wide dimensions on large org may timeout; add filters."
      },
      {
        "type": "warning",
        "title": "PII in export",
        "text": "Compliance export rules may block certain metrics."
      }
    ],
    "considerations": [
      "Start from Project reports for operational parity tests.",
      "Use pilot org unit data before executive rollout.",
      "Schedule recurring delivery for steering metrics.",
      "Link to control tower KPIs for portfolio view."
    ],
    "verify": [
      "Builder loads domain and field pickers.",
      "Preview renders chart/table for sample run.",
      "Save persists definition in catalog.",
      "Re-run produces consistent results.",
      "Schedule email delivers when configured.",
      "Scoped persona cannot query out-of-scope teams."
    ],
    "screenDoc": "charts.html"
  },
  "analytics-control-tower": {
    "context": "Executives and PMO monitor portfolio health in Analytics hub or Portfolio control tower with KPI tiles for health, risk, utilization, and revenue at risk. Drill into failing projects; scenario planning supports what-if capacity when enabled. Requires portfolioControlTowerEnabled.",
    "summary": "Monitor portfolio KPIs and drill into at-risk projects.",
    "permissions": [
      {
        "name": "Control tower",
        "path": "analyticsModules.controlTowerEnabled",
        "level": "Read",
        "notes": "Also projectModules.portfolioEnabled."
      },
      {
        "name": "Portfolio module",
        "path": "projectModules.portfolioEnabled",
        "level": "Active",
        "notes": "Gated by portfolioControlTowerEnabled."
      },
      {
        "name": "Project view",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Drill-down respects team scope."
      },
      {
        "name": "Reports run",
        "path": "projectModules.reportsEnabled",
        "level": "Optional",
        "notes": "Export snapshot for committee."
      }
    ],
    "featureFlags": [
      {
        "flag": "portfolioControlTowerEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Control tower route and KPI tiles active.",
        "whenDisabled": "Standard project dashboard only."
      },
      {
        "flag": "projectGovernanceEnabled",
        "group": "tracopusProjectsAdditional",
        "whenEnabled": "Risk/issue governance links from tower.",
        "whenDisabled": "Health metrics without governance drill."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Executive",
        "effect": "Portfolio-wide KPIs with scenario filters.",
        "notes": "Region and service line filters."
      },
      {
        "role": "PMO",
        "effect": "Drill to overdue milestones and failing projects.",
        "notes": "Export steering snapshot."
      },
      {
        "role": "Project manager",
        "effect": "Limited tower view to own portfolio slice.",
        "notes": "Persona scope on drill links."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Stale KPIs",
        "text": "Tiles refresh on schedule; verify timestamp before decisions."
      },
      {
        "type": "warning",
        "title": "Incomplete timesheet data",
        "text": "Utilization KPIs skewed when weeks unsubmitted."
      }
    ],
    "considerations": [
      "Approve timesheets before utilization steering reviews.",
      "Enable governance flags for risk drill-through.",
      "Compare tower metrics with project-run-report exports.",
      "Use scenario planning for capacity what-if sessions."
    ],
    "verify": [
      "Control tower loads KPI tiles without error.",
      "Filters narrow projects by team/region.",
      "Drill opens permitted project detail.",
      "At-risk list matches known overdue projects.",
      "Export snapshot downloads for meeting.",
      "PM persona scope limits visible projects."
    ],
    "screenDoc": "project/dashboard.html"
  },
  "integrations-configure": {
    "context": "Integration admins configure connectors (Salesforce, ZingHR, Entra ID, etc.) in Integrations → Hub with credentials, field mapping, test sync, and scheduled jobs. ZingHR leave sync coexists with native leave when both configured. Requires integrationCenterEnabled at org unit.",
    "summary": "Configure an integration connector with mapping and scheduled sync.",
    "permissions": [
      {
        "name": "Integration hub",
        "path": "integrationCenterEnabled",
        "level": "Admin",
        "notes": "Org flag and admin role."
      },
      {
        "name": "Admin module",
        "path": "adminModules.active",
        "level": "Active",
        "notes": "Governance master switch."
      },
      {
        "name": "Credentials manage",
        "path": "integrations.credentialsEnabled",
        "level": "Admin",
        "notes": "Store connector secrets securely."
      },
      {
        "name": "Jobs schedule",
        "path": "integrations.jobsEnabled",
        "level": "Admin",
        "notes": "Enable recurring sync jobs."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Integrations rail and marketplace visible.",
        "whenDisabled": "Connectors pre-deployed only; hub hidden."
      },
      {
        "flag": "developerPortalEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "API docs and webhook testing available.",
        "whenDisabled": "Standard connector UI only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Integration admin",
        "effect": "Full configure, map, test, schedule.",
        "notes": "Audit UI on credential change when enabled."
      },
      {
        "role": "Sales admin",
        "effect": "Uses Salesforce import after admin configures.",
        "notes": "No credential access."
      },
      {
        "role": "HR admin",
        "effect": "Benefits from ZingHR leave sync when mapped.",
        "notes": "Native leave may be read-only if sync authoritative."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Credential exposure",
        "text": "Never share connector secrets; rotate on compromise."
      },
      {
        "type": "warning",
        "title": "Mapping mismatch",
        "text": "Wrong field map causes silent data drift; test sync required."
      }
    ],
    "considerations": [
      "Run test sync before enabling production schedule.",
      "Document mapping decisions for audit.",
      "Coordinate Entra ID with SSO employee Sign-in settings.",
      "Monitor sync health after go-live."
    ],
    "verify": [
      "Connector saves credentials and endpoints.",
      "Mapping page persists field pairs.",
      "Test sync returns success sample.",
      "Scheduled job appears on Jobs tab.",
      "Salesforce PO import works after configure.",
      "Audit records config change when writes on."
    ],
    "screenDoc": "admin.html"
  },
  "integrations-sync-health": {
    "context": "Integration admins and ops monitor connector status on Integrations → Sync health: last run, errors, lag, and failed job payloads. Retry jobs after fixing mapping; confirm green status before PO import, leave sync, and other dependent workflows.",
    "summary": "Monitor integration sync status and resolve failed jobs.",
    "permissions": [
      {
        "name": "Sync health view",
        "path": "integrationCenterEnabled",
        "level": "Read",
        "notes": "Requires configured connector."
      },
      {
        "name": "Job retry",
        "path": "integrations.jobsRetryEnabled",
        "level": "Admin",
        "notes": "Retry failed batch from detail."
      },
      {
        "name": "Logs view",
        "path": "integrations.logsEnabled",
        "level": "Read",
        "notes": "Payload and error detail drill-down."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Sync health dashboard available.",
        "whenDisabled": "Health checks via server logs only."
      },
      {
        "flag": "workflowAutomationEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Alert emails on repeated sync failures.",
        "whenDisabled": "Manual monitoring required."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Integration admin",
        "effect": "View all connectors and retry jobs.",
        "notes": "Fix mapping and re-run."
      },
      {
        "role": "Ops",
        "effect": "Read-only monitoring; escalates to admin.",
        "notes": "Confirm green before business workflows."
      },
      {
        "role": "Sales admin",
        "effect": "Checks health before Salesforce PO import.",
        "notes": "Import blocked or warns on red status."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "Repeated failures",
        "text": "Cascading failures affect PO import and leave sync downstream."
      },
      {
        "type": "warning",
        "title": "Lag threshold",
        "text": "Stale last-run time indicates scheduler or credential issue."
      }
    ],
    "considerations": [
      "Set up alerts for repeated failure patterns.",
      "Document retry procedure in runbook.",
      "Verify dependent workflow after green status.",
      "Review payload logs for PII before sharing externally."
    ],
    "verify": [
      "Status card shows last run time per connector.",
      "Failed job drill shows error message.",
      "Retry succeeds after mapping fix.",
      "Green status before PO import test.",
      "Lag indicator updates after scheduled run.",
      "Alert email fires when automation enabled."
    ],
    "screenDoc": "admin.html"
  },
  "ai-agent-query": {
    "context": "Users with AI access ask natural language questions in AI → Agent console or Assist dock chat with cited knowledge base articles and suggested Tracopus links. Domain context (HR, Project) improves relevance; do not paste sensitive PII into prompts per org policy.",
    "summary": "Query the AI agent for Tracopus guidance and suggested actions.",
    "permissions": [
      {
        "name": "AI module",
        "path": "aiModules.active",
        "level": "Active",
        "notes": "Environment and org AI flags."
      },
      {
        "name": "Agent console",
        "path": "aiModules.consoleEnabled",
        "level": "Use",
        "notes": "Role with AI access persona."
      },
      {
        "name": "Knowledge base read",
        "path": "aiModules.knowledgeBaseEnabled",
        "level": "Read",
        "notes": "Cited articles from approved corpus."
      }
    ],
    "featureFlags": [
      {
        "flag": "aiWorkIntelligenceEnabled",
        "group": "tracopusAnalyticsAdditional",
        "whenEnabled": "AI Assist dock and console active.",
        "whenDisabled": "AI routes hidden; manual docs only."
      },
      {
        "flag": "aiWorkIntelligenceLlmEnabled",
        "group": "tracopusAnalyticsAdditional",
        "whenEnabled": "LLM-backed responses with action suggestions.",
        "whenDisabled": "Keyword/knowledge-base retrieval only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Standard user",
        "effect": "Ask HR/Project questions; receive cited answers.",
        "notes": "Approved actions only when policy allows."
      },
      {
        "role": "Admin curator",
        "effect": "Maintains knowledge base content separately.",
        "notes": "Not end-user query path."
      },
      {
        "role": "Mobile user",
        "effect": "Assist dock may differ; web console authoritative for UAT.",
        "notes": "Same RBAC on suggested links."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "PII in prompts",
        "text": "Do not paste SSN, salary, or client confidential data into chat."
      },
      {
        "type": "warning",
        "title": "Hallucination risk",
        "text": "Verify cited links and do not rely on AI for compliance decisions alone."
      }
    ],
    "considerations": [
      "Rate responses to improve recommendations.",
      "Use domain context selector when available.",
      "Cross-check AI links with persona RBAC before acting.",
      "Curate knowledge base after major release changes."
    ],
    "verify": [
      "Console accepts query and returns response.",
      "Citations link to valid knowledge articles.",
      "Suggested Tracopus page links load for user RBAC.",
      "Out-of-scope action not executed without approval.",
      "Rate feedback control records response.",
      "AI hidden when aiWorkIntelligenceEnabled off."
    ],
    "screenDoc": "interface.html"
  },
  "admin-role-permissions": {
    "context": "Org administrators configure which personas a role may use on Admin → Roles (personaModules in role.json). Page toggles write the shared org pagePersonaMap. Org-wide kill switches are edited on Persona navigation, not on the Roles matrix. Module CRUD stays under Advanced.",
    "summary": "Configure role persona access; link to Persona navigation for org offs.",
    "permissions": [
      {
        "name": "RBAC admin",
        "path": "adminModules.rolesEnabled",
        "level": "Admin",
        "notes": "Requires rbacAdminEnabled org flag."
      },
      {
        "name": "Persona modules",
        "path": "HRMS.personaModules",
        "level": "Edit",
        "notes": "allowedPersonas, defaultPersona, personaSwitchEnabled."
      },
      {
        "name": "App config",
        "path": "hrmsModules.appconfigEnabled",
        "level": "Edit",
        "notes": "Alternate path for same role templates."
      },
      {
        "name": "Admin governance",
        "path": "adminGovernanceEnabled",
        "level": "Master",
        "notes": "Master switch for admin rail."
      }
    ],
    "featureFlags": [
      {
        "flag": "rbacAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Dedicated Admin → Roles route.",
        "whenDisabled": "RBAC edits in Application Config only."
      }
    ],
    "warnings": [
      {
        "level": "warning",
        "text": "Org kill switches are not on this page — use Admin → Persona navigation."
      },
      {
        "level": "note",
        "text": "Automatic persona mode means personaModules was never explicitly saved."
      }
    ],
    "expectedBehavior": [
      "Persona chips reflect allowedPersonas after save.",
      "Test user must re-login to refresh encrypted access.",
      "Employee persona blocked from admin routes."
    ],
    "qaChecklist": [
      "Enable/disable a persona on a pilot role and verify switcher.",
      "Confirm Advanced matrix still available.",
      "Open simple editor link reaches Persona navigation.",
      "Test employee persona blocked from admin routes."
    ],
    "screenDoc": "admin.html#persona-access"
  },
  "admin-persona-navigation": {
    "context": "Org administrators use the simplified Persona navigation page to turn personas, modules, or pages off for everyone, or customize which personas can open a single page. Saves org.json HRMS.personaNavigationAdditional (pagePersonaMap + disable lists). Empty map keeps sidebar catalog defaults.",
    "summary": "Org-wide Turn off and Page access editor with one Save.",
    "permissions": [
      {
        "name": "Persona navigation",
        "path": "adminModules.personaNavigationEnabled",
        "level": "Admin",
        "notes": "Also available when Roles is enabled for the role."
      },
      {
        "name": "Roles",
        "path": "adminModules.rolesEnabled",
        "level": "Admin",
        "notes": "Alternate gate for the same admin page."
      }
    ],
    "featureFlags": [
      {
        "flag": "personaNavigationAdditional",
        "group": "HRMS org",
        "whenEnabled": "Custom pagePersonaMap and kill lists apply at runtime.",
        "whenDisabled": "Empty defaults — catalog personas[] only."
      }
    ],
    "warnings": [
      {
        "level": "alert",
        "text": "Org disables always win — can hide pages for all roles including managers."
      },
      {
        "level": "note",
        "text": "Roles, Persona navigation, App Config, and Setup checklist cannot be killed."
      }
    ],
    "expectedBehavior": [
      "Turn off chips update disabledPersonas/Modules.",
      "Page Off updates disabledPaths.",
      "Custom page map persists after Save and refresh.",
      "Non-admin test account loses access to killed pages."
    ],
    "qaChecklist": [
      "Kill a non-critical page and confirm sidebar hide.",
      "Reset page to Product default and confirm catalog personas.",
      "Confirm protected paths cannot be turned off.",
      "Save notice shows API or local source."
    ],
    "screenDoc": "hrms/persona-navigation.html"
  },
  "admin-delegation-rules": {
    "context": "Admins configure approval delegation policy for attendance, timesheet, and leave scopes with default duration and eligibility. Managers assign delegates on profile Delegation tab; delegates see acting-for metadata on approve actions and in audit UI when approvalDelegationEnabled.",
    "summary": "Configure approval delegation rules and manager delegate assignments.",
    "permissions": [
      {
        "name": "Delegation admin",
        "path": "adminModules.delegationEnabled",
        "level": "Admin",
        "notes": "Requires approvalDelegationEnabled org flag."
      },
      {
        "name": "Delegation assign",
        "path": "profile.delegationAssignEnabled",
        "level": "Manager",
        "notes": "Profile Delegation tab."
      },
      {
        "name": "Timesheet delegate approve",
        "path": "timeSheet.approvalDelegationEnabled",
        "level": "Acting-for",
        "notes": "Timesheet scope."
      },
      {
        "name": "Leave delegate approve",
        "path": "leaves.approvalDelegationEnabled",
        "level": "Acting-for",
        "notes": "Leave scope."
      }
    ],
    "featureFlags": [
      {
        "flag": "approvalDelegationEnabled",
        "group": "approvalDelegation",
        "whenEnabled": "Delegation rules admin and profile assign active.",
        "whenDisabled": "Primary approver only."
      },
      {
        "flag": "approvalReminderEnabled",
        "group": "approvalDelegation",
        "whenEnabled": "SLA reminder emails for pending items.",
        "whenDisabled": "No automated delegation reminders."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Admin",
        "effect": "Defines scopes, duration defaults, eligibility rules.",
        "notes": "Org unit inherit/override applies."
      },
      {
        "role": "Manager",
        "effect": "Assigns delegate on profile for date range.",
        "notes": "Delegate inbox activates in period."
      },
      {
        "role": "Delegate",
        "effect": "Approves with acting-for badge in audit.",
        "notes": "Workspace and module pending panels."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Expired delegation",
        "text": "Delegate loses inbox access after end date automatically."
      },
      {
        "type": "warning",
        "title": "Overlapping delegates",
        "text": "Multiple delegates may cause duplicate approvals if not scoped."
      }
    ],
    "considerations": [
      "Set delegation before manager PTO.",
      "Test acting-for metadata in audit export.",
      "Verify universal inbox shows delegate items.",
      "Communicate SLA reminders when approvalReminderEnabled."
    ],
    "verify": [
      "Delegation rules save per scope.",
      "Manager assigns delegate on profile.",
      "Delegate sees pending in Approvals inbox.",
      "Approve records acting-for in audit.",
      "Delegate access ends after configured date.",
      "Primary approver inbox reduced during delegation."
    ],
    "screenDoc": "admin.html"
  },
  "admin-audit-review": {
    "context": "Compliance admins review unified audit trail in Admin → Audit or entity Audit tabs on project, PO, and profile records. Toggle Activity vs History views; export CSV with same read permission. Writes require auditEnabled; UI reads use auditUiEnabled. Timelines start at go-live without legacy backfill.",
    "summary": "Review and export unified audit events for compliance investigation.",
    "permissions": [
      {
        "name": "Audit admin read",
        "path": "adminModules.auditEnabled",
        "level": "Read",
        "notes": "Requires auditAdminEnabled and auditUiEnabled."
      },
      {
        "name": "Audit export",
        "path": "adminModules.auditExportEnabled",
        "level": "Export",
        "notes": "CSV export same as read scope."
      },
      {
        "name": "Entity audit tab",
        "path": "auditUiEnabled",
        "level": "Read",
        "notes": "Per-record Audit tab when UI flag on."
      },
      {
        "name": "Audit writes",
        "path": "auditEnabled",
        "level": "System",
        "notes": "Backend writes; separate from UI read flag."
      }
    ],
    "featureFlags": [
      {
        "flag": "auditUiEnabled",
        "group": "auditAdditional",
        "whenEnabled": "Audit UI panels and Admin → Audit route.",
        "whenDisabled": "No timeline UI; writes may still occur if auditEnabled."
      },
      {
        "flag": "complianceExportAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Bulk compliance export packages available.",
        "whenDisabled": "Standard CSV export only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Compliance admin",
        "effect": "Filter by entity, actor, date; export CSV.",
        "notes": "Deep link to related records."
      },
      {
        "role": "Auditor read-only",
        "effect": "View and export without admin config access.",
        "notes": "Persona RBAC scoped."
      },
      {
        "role": "Standard user",
        "effect": "Entity Audit tab on permitted records only.",
        "notes": "Comments not audit events."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "No legacy backfill",
        "text": "Events before audit go-live absent from timeline."
      },
      {
        "type": "warning",
        "title": "Comments vs audit",
        "text": "Project comments do not appear in audit export."
      }
    ],
    "considerations": [
      "Enable auditUiEnabled before compliance audit season.",
      "Separate delegate acting-for events in filter.",
      "Store CSV exports per retention policy.",
      "Verify write flag on before expecting new events."
    ],
    "verify": [
      "Admin Audit page loads with filters.",
      "Entity Audit tab shows timeline when UI on.",
      "Activity vs History toggle changes view.",
      "CSV export downloads with expected columns.",
      "Delegate approve shows acting-for actor.",
      "No events when audit writes disabled."
    ],
    "screenDoc": "admin.html"
  },
  "admin-feature-flags": {
    "context": "Platform admins toggle pilot feature flags (onboardingEnabled, ganttEnabled, etc.) from Admin → Feature flags for gradual rollout without deploy. Coordinate with DB migrations for HRMS flags; menu flags may hide routes that still exist at API level. Test on pilot org unit before root override/lock.",
    "summary": "Toggle org feature flags for controlled pilot rollout.",
    "permissions": [
      {
        "name": "Feature flags admin",
        "path": "adminModules.featureFlagsEnabled",
        "level": "Admin",
        "notes": "Requires featureFlagsAdminEnabled under adminGovernanceEnabled."
      },
      {
        "name": "Admin governance",
        "path": "adminGovernanceEnabled",
        "level": "Master",
        "notes": "Master admin governance switch."
      },
      {
        "name": "App config",
        "path": "hrmsModules.appconfigEnabled",
        "level": "Alternate",
        "notes": "Some flags also in Application Config tabs."
      }
    ],
    "featureFlags": [
      {
        "flag": "featureFlagsAdminEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admin → Feature flags route active.",
        "whenDisabled": "Flag changes via Application Config or env only."
      },
      {
        "flag": "adminGovernanceEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Admin rail visible for platform admins.",
        "whenDisabled": "Feature flag UI hidden entirely."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Platform admin",
        "effect": "Enable/disable flags per org unit with inherit/override/lock.",
        "notes": "Monitor errors after enable."
      },
      {
        "role": "Test persona",
        "effect": "Verifies menu entries appear/disappear after flag change.",
        "notes": "Re-login may be required."
      },
      {
        "role": "Developer",
        "effect": "Uses developerPortalEnabled for API docs when flagged.",
        "notes": "Separate from business flags."
      }
    ],
    "warnings": [
      {
        "type": "danger",
        "title": "API without UI",
        "text": "Disabled menu does not always block API writes; verify RBAC separately."
      },
      {
        "type": "warning",
        "title": "Migration dependency",
        "text": "Some flags require DB migration per release runbook."
      }
    ],
    "considerations": [
      "Pilot on child org unit before root enable.",
      "Document rollback procedure for each flag.",
      "Coordinate with hrms-app-config for duplicate toggles.",
      "Monitor error logs after enabling LLM or AI flags."
    ],
    "verify": [
      "Feature flags page lists org flags.",
      "Toggle saves and reflects on test user menu.",
      "Pilot team sees new route when flag on.",
      "Root lock prevents child override when set.",
      "Rollback disables menu without deploy.",
      "Error rate stable after enable window."
    ],
    "screenDoc": "admin.html"
  },
  "mobile-login": {
    "context": "Field staff and mobile users install Tracopus Android app (com.infleca.device.tracopus) and sign in via Microsoft SSO or org credentials with same RBAC as web. Device registration may be required per HRMS Settings; QR link available from web device registration popup.",
    "summary": "Sign in to the Tracopus Android app with SSO or org credentials.",
    "permissions": [
      {
        "name": "Platform login",
        "path": "employees.access.platformLoginEnabled",
        "level": "True",
        "notes": "Or SSO enabled on employee record."
      },
      {
        "name": "Active employee",
        "path": "employees.status",
        "level": "Active",
        "notes": "Inactive blocked on mobile same as web."
      },
      {
        "name": "Mobile module",
        "path": "mobileModules.active",
        "level": "Active",
        "notes": "Org allows mobile access."
      },
      {
        "name": "Device registration",
        "path": "hrmsModules.settingsEnabled",
        "level": "Optional",
        "notes": "Register device when org requires."
      }
    ],
    "featureFlags": [
      {
        "flag": "integrationCenterEnabled",
        "group": "tracopusAdminAdditional",
        "whenEnabled": "Entra SSO on mobile matches web connector config.",
        "whenDisabled": "Pre-configured SSO only."
      },
      {
        "flag": "workspaceNotificationsEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Push notifications may follow web notification events.",
        "whenDisabled": "In-app alerts only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Field employee",
        "effect": "Lands on mobile home with Projects, Tasks, Timesheet tabs.",
        "notes": "Same menu scope as web RBAC."
      },
      {
        "role": "SSO user",
        "effect": "Microsoft redirect flow in app WebView/browser.",
        "notes": "Email must match employee record."
      },
      {
        "role": "Org with device lock",
        "effect": "Unregistered device blocked after login attempt.",
        "notes": "QR from web Settings registration."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Email mismatch",
        "text": "SSO fails if Entra UPN differs from Tracopus email."
      },
      {
        "type": "warning",
        "title": "Outdated app",
        "text": "Old app versions may lack parity with web validation rules."
      }
    ],
    "considerations": [
      "Test SSO on mobile and web with same account.",
      "Complete device registration before field rollout.",
      "Verify MFA prompts acceptable on mobile form factor.",
      "Document break-glass FS password for SSO outage."
    ],
    "verify": [
      "App installs from Play Store package ID.",
      "SSO or password login succeeds.",
      "Home shows permitted tabs per RBAC.",
      "Logout clears session.",
      "Unregistered device blocked when policy on.",
      "MFA completes when org requires."
    ],
    "screenDoc": "mobile/login.html"
  },
  "mobile-log-timesheet": {
    "context": "Field staff record daily hours on mobile Timesheet tab or Record day FAB; entries sync to web HRMS timesheet grid with same validation rules. Week submission for approval still typically done on web when timesheetApprovalEnabled; offline mode depends on app version settings.",
    "summary": "Log daily project hours on mobile with sync to web timesheet.",
    "permissions": [
      {
        "name": "Timesheet module",
        "path": "hrmsModules.timesheetEnabled",
        "level": "Active",
        "notes": "Web and mobile parity."
      },
      {
        "name": "Time entry",
        "path": "timeSheet.enableTimeSheetEntry",
        "level": "Create",
        "notes": "Blocked when week locked."
      },
      {
        "name": "Mobile login",
        "path": "mobileModules.active",
        "level": "Session",
        "notes": "Authenticated mobile session."
      },
      {
        "name": "Project assignment",
        "path": "projects.viewEnabled",
        "level": "Scoped",
        "notes": "Picker shows assigned projects."
      }
    ],
    "featureFlags": [
      {
        "flag": "timesheetApprovalEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Mobile saves draft; web Submit for approval required.",
        "whenDisabled": "Saved hours final without submit step."
      },
      {
        "flag": "timesheetIntelligenceEnabled",
        "group": "timesheetAdditional",
        "whenEnabled": "Mobile validation hints match web intelligence.",
        "whenDisabled": "Standard validation messages."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Field employee",
        "effect": "Record day hours with project/deliverable picker.",
        "notes": "Billable flag per row."
      },
      {
        "role": "Manager (self)",
        "effect": "Can log own hours on mobile.",
        "notes": "Approves team on web."
      },
      {
        "role": "Locked week",
        "effect": "Mobile save rejected same as web.",
        "notes": "User message directs to manager/HR."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Sync delay",
        "text": "Web grid may lag seconds after mobile save."
      },
      {
        "type": "warning",
        "title": "Offline limits",
        "text": "Offline queue may drop entries on conflict; verify web grid."
      }
    ],
    "considerations": [
      "Submit week on web before payroll cutoff when approval on.",
      "Assign deliverables before field logging if required.",
      "Test validation parity in UAT mobile vs web.",
      "Train staff to verify sync on web weekly."
    ],
    "verify": [
      "Mobile save succeeds for assigned project.",
      "Hours appear on web timesheet same week/day.",
      "Billable toggle persists after sync.",
      "Validation error shown for missing deliverable.",
      "Locked week blocks save with clear message.",
      "Web submit works after mobile entry complete."
    ],
    "screenDoc": "mobile/timesheet.html"
  },
  "mobile-update-task": {
    "context": "Project team members update assigned task status on mobile Tasks hub; changes sync to web taskboard and My Work queue. Comments optional; Insights tab shows personal utilization charts on same app session. Status permissions match web persona RBAC.",
    "summary": "Update work item status from the mobile Tasks hub.",
    "permissions": [
      {
        "name": "Work item edit",
        "path": "workItems.editEnabled",
        "level": "Edit",
        "notes": "Assignee or manager on mobile."
      },
      {
        "name": "Taskboard module",
        "path": "projectModules.taskboardEnabled",
        "level": "Active",
        "notes": "Web board receives sync."
      },
      {
        "name": "Mobile tasks",
        "path": "mobileModules.tasksEnabled",
        "level": "Active",
        "notes": "Tasks hub on app home."
      },
      {
        "name": "Status change",
        "path": "workItems.statusChangeEnabled",
        "level": "Gated",
        "notes": "Same gates as web board."
      }
    ],
    "featureFlags": [
      {
        "flag": "myWorkQueueEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Mobile status sync updates My Work register.",
        "whenDisabled": "Taskboard primary consumer of sync."
      },
      {
        "flag": "workGraphEnabled",
        "group": "tracopusWorkspaceAdditional",
        "whenEnabled": "Linked entities update in work graph on status change.",
        "whenDisabled": "Task record only."
      }
    ],
    "behaviorChanges": [
      {
        "role": "Assignee",
        "effect": "Move To do → In progress → Done on mobile.",
        "notes": "Optional comment on detail."
      },
      {
        "role": "Manager",
        "effect": "Update team tasks when edit scope allows.",
        "notes": "Audit on change when enabled."
      },
      {
        "role": "Viewer",
        "effect": "Read-only task detail; no status controls.",
        "notes": "RBAC enforced on mobile API."
      }
    ],
    "warnings": [
      {
        "type": "warning",
        "title": "Done without hours",
        "text": "Some projects require timesheet hours before Done status."
      },
      {
        "type": "warning",
        "title": "Sync conflict",
        "text": "Simultaneous web and mobile edits last-write-wins."
      }
    ],
    "considerations": [
      "Log hours on mobile or web timesheet when marking Done.",
      "Filter tasks by project on large assignments.",
      "Use Insights tab for utilization self-check.",
      "Verify web taskboard after field status updates."
    ],
    "verify": [
      "Task list shows assigned items after login.",
      "Status change saves on mobile detail.",
      "Web taskboard column matches mobile status.",
      "My Work updates when myWorkQueueEnabled.",
      "Unauthorized status change blocked on mobile.",
      "Comment persists on web task detail."
    ],
    "screenDoc": "mobile/tasks.html"
  },
  "people-manage-holidays": {
    "context": "V6H-EA02 S1 planned page. HR admins manage org holiday calendar sourced from Application Config org calendar and leave policy — feeds leave duration, timesheet, attendance, and payroll readiness. Employees read-only.",
    "summary": "Add and import holidays; verify downstream leave and calendar impact.",
    "permissions": [
      { "name": "Leave module", "path": "leaveManagementEnabled", "level": "Active", "notes": "isLeaveManagementEnabled() guard." },
      { "name": "Holiday mutate", "path": "peopleModules.holidaysEditEnabled", "level": "Edit", "notes": "HR admin only." },
      { "name": "Holiday read", "path": "peopleModules.holidaysReadEnabled", "level": "Read", "notes": "All employees scoped by org." }
    ],
    "featureFlags": [{ "name": "Leave management", "path": "leaveManagementEnabled", "notes": "Required for page." }],
    "verify": [
      "Leave duration excludes holiday date.",
      "Timesheet/attendance marks non-working day.",
      "No duplicate isolated holiday truth table.",
      "Employee cannot mutate holidays."
    ],
    "useCaseId": "people-holidays",
    "testPlanAnchor": "people-holidays-tp-v6h-2"
  },
  "payroll-manage-deductions": {
    "context": "V6H-EA03 S2 planned page. Payroll child deduction rules assigned to employees or groups with run preview and paycheck line impact. Locked runs require reversal.",
    "summary": "Create deduction and verify payroll run and paycheck impact.",
    "permissions": [
      { "name": "Payroll module", "path": "payrollManagementEnabled", "level": "Active", "notes": "Required." },
      { "name": "Deduction CRUD", "path": "payrollModules.deductionsEnabled", "level": "Edit", "notes": "Payroll manager / HR admin." }
    ],
    "verify": [
      "Deduction in run preview.",
      "Paycheck line item shows deduction.",
      "Locked run blocks destructive edit.",
      "Audit on CRUD."
    ],
    "useCaseId": "pay-deductions",
    "testPlanAnchor": "pay-deductions-tp-v6h-1"
  },
  "analytics-ai-insights": {
    "context": "V6H-EA05 S2 planned page. AI insight cards from canonical analytics composers with sourceEntity references and persona masking. Derived read model — not source truth.",
    "summary": "Review AI insights with source drill-down and masking.",
    "permissions": [
      { "name": "Analytics AI", "path": "analyticsModules.aiInsightsEnabled", "level": "Read", "notes": "Analytics + AI flags." }
    ],
    "verify": [
      "Insight payload includes source references.",
      "Sensitive fields masked.",
      "Cross-team insights blocked.",
      "Audit on sensitive context access."
    ],
    "useCaseId": "an-ai-insights",
    "testPlanAnchor": "an-ai-insights-tp-v6h-1"
  },
  "ai-audit-review": {
    "context": "V6H-EA06 S3 planned page. Admin/security review of AI runs with masking, source references, outcomes. No raw sensitive prompt persistence.",
    "summary": "Filter and export masked AI audit records.",
    "permissions": [
      { "name": "AI audit read", "path": "aiModules.auditEnabled", "level": "Read", "notes": "Admin/security persona." }
    ],
    "verify": [
      "No raw sensitive prompts displayed.",
      "Export masked CSV.",
      "Source entity and actor on each record.",
      "Unauthorized blocked."
    ],
    "useCaseId": "ai-audit",
    "testPlanAnchor": "ai-audit-tp-v6h-1"
  },
  "admin-notification-templates": {
    "context": "V6H-EA01 S1 planned page. Workspace notification template config — workflow records, not delivery truth. Preview masks sensitive placeholders.",
    "summary": "Create and preview notification templates with placeholder validation.",
    "permissions": [
      { "name": "Workspace notifications", "path": "workspaceNotificationsEnabled", "level": "Active", "notes": "F21 guard." },
      { "name": "Template admin", "path": "adminModules.notificationTemplatesEnabled", "level": "Edit", "notes": "Admin / HR admin." }
    ],
    "verify": [
      "API 403 when F21 disabled.",
      "Preview masks sensitive placeholders.",
      "Delivery state separate from template config.",
      "Audit on CRUD."
    ],
    "useCaseId": "adm-notif-templates",
    "testPlanAnchor": "adm-notif-templates-tp-v6h-2"
  },
  "admin-payroll-config": {
    "context": "V6H-EA04 S2 planned page. Org payroll setup from Application Config payroll nodes plus bridge rows. Readiness validation gates runs.",
    "summary": "Configure payroll org settings and verify readiness checklist.",
    "permissions": [
      { "name": "Payroll config", "path": "payrollModules.configAdminEnabled", "level": "Edit", "notes": "Admin / payroll manager." }
    ],
    "verify": [
      "Run blocked if mandatory config missing.",
      "Config changes audited.",
      "Non-admin cannot mutate.",
      "Preview reflects config changes."
    ],
    "useCaseId": "adm-payroll-config",
    "testPlanAnchor": "adm-payroll-config-tp-v6h-1"
  },
  "admin-dashboard": {
    "context": "V6H-EA07 S3 planned page. Composed admin KPIs from live services — config health, flags, audit, integration. No new truth table.",
    "summary": "Review admin operational dashboard and quick links.",
    "permissions": [
      { "name": "Admin dashboard", "path": "adminModules.dashboardEnabled", "level": "Read", "notes": "Admin persona only." }
    ],
    "verify": [
      "KPIs from live services.",
      "Quick links to shipped routes only.",
      "Non-admin blocked.",
      "Sensitive drill-down audited."
    ],
    "useCaseId": "adm-dashboard",
    "testPlanAnchor": "adm-dashboard-tp-v6h-1"
  }
};

  global.SCENARIO_ENRICHMENT = SCENARIO_ENRICHMENT;

  global.getScenarioEnrichment = function (scenario) {
    return SCENARIO_ENRICHMENT[scenario.id] || {};
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);

if (typeof module !== 'undefined') {
  module.exports = {
    SCENARIO_ENRICHMENT: (typeof window !== 'undefined' ? window : global).SCENARIO_ENRICHMENT,
    getScenarioEnrichment: function (scenario) {
      var enrichment = (typeof window !== 'undefined' ? window : global).SCENARIO_ENRICHMENT;
      return enrichment[scenario.id] || {};
    }
  };
}
