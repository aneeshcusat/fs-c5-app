/**
 * Tracopus docs bridge — Use Case Catalog ↔ Scenario Guide ↔ API Documentation
 * Generated: 2026-07-21
 * Do not edit by hand — run: node generate-use-case-catalog.mjs
 */
(function (global) {
  'use strict';
  global.TRACOPUS_DOC_BRIDGE = {
    scenarioToUseCase: {
  "auth-login-email": "auth-login",
  "auth-login-sso": "auth-login",
  "auth-forgot-password": "auth-forgot",
  "auth-activate-account": "auth-activate",
  "auth-change-password": "auth-changepwd",
  "workspace-my-work": "workspace-mywork",
  "workspace-approvals": "workspace-approvals",
  "workspace-notifications": "hdr-notifications",
  "hrms-create-employee": "people-employees",
  "hrms-edit-employee": "people-employees",
  "hrms-deactivate-employee": "people-employees",
  "hrms-log-timesheet": "people-timesheet",
  "hrms-submit-timesheet": "people-timesheet",
  "hrms-approve-timesheet": "people-timesheet",
  "hrms-apply-leave": "people-leaves",
  "hrms-approve-leave": "people-leaves",
  "admin-configure-global-leave": "admin-global-leave-policy",
  "admin-employee-leave-config": "admin-emp-leave-config",
  "admin-publish-legal-holiday-calendar": "admin-leave-legal-calendars",
  "hrms-mark-attendance": "people-attendance",
  "hrms-approve-attendance": "people-attendance",
  "hrms-create-invoice": "fin-invoice",
  "hrms-app-config": "hdr-appconfig",
  "people-start-onboarding": "people-onboarding",
  "people-complete-onboarding-tasks": "workspace-onboarding",
  "people-start-offboarding": "people-offboarding",
  "people-employee-360": "people-360-list",
  "people-acknowledge-policy": "people-policies",
  "people-manage-holidays": "people-holidays",
  "project-create-project": "project-list",
  "project-edit-project": "project-details",
  "project-add-deliverable": "project-deliverables",
  "project-create-work-item": "project-workitems",
  "project-update-taskboard": "hdr-taskboard",
  "project-team-capacity": "project-capacity",
  "project-run-report": "project-reports",
  "project-global-search": "hdr-search",
  "project-submit-feedback": "project-feedback",
  "sales-create-bid": "fin-bids",
  "sales-edit-bid": "fin-bid-detail",
  "sales-create-po": "fin-pos",
  "sales-link-po-project": "fin-po-detail",
  "sales-import-po-salesforce": "fin-pos",
  "resources-staffing-request": "res-staffing",
  "resources-skills-matrix": "res-skills",
  "finance-view-invoice": "fin-invoice",
  "payroll-create-run": "pay-runs",
  "payroll-view-paycheck": "workspace-paychecks",
  "payroll-manage-deductions": "pay-deductions",
  "performance-set-goal": "perf-goals",
  "performance-complete-review": "perf-reviews",
  "analytics-report-builder": "an-report-builder",
  "analytics-control-tower": "an-exec",
  "analytics-ai-insights": "an-ai-insights",
  "integrations-configure": "int-hub",
  "integrations-sync-health": "int-sync",
  "ai-agent-query": "ai-agents",
  "ai-audit-review": "ai-audit",
  "admin-role-permissions": "adm-roles",
  "admin-persona-navigation": "adm-org",
  "admin-delegation-rules": "adm-delegation",
  "admin-audit-review": "adm-audit",
  "admin-feature-flags": "adm-flags",
  "admin-notification-templates": "adm-notif-templates",
  "admin-payroll-config": "adm-payroll-config",
  "admin-dashboard": "adm-dashboard",
  "mobile-login": "auth-login",
  "mobile-log-timesheet": "people-timesheet",
  "mobile-update-task": "hdr-taskboard"
},
    useCaseToScenarios: {
  "auth-login": [
    {
      "id": "auth-login-email",
      "module": "auth",
      "title": "Sign in with email and password"
    },
    {
      "id": "auth-login-sso",
      "module": "auth",
      "title": "Sign in with Microsoft Entra ID (SSO)"
    },
    {
      "id": "mobile-login",
      "module": "mobile",
      "title": "Sign in on mobile"
    }
  ],
  "auth-forgot": [
    {
      "id": "auth-forgot-password",
      "module": "auth",
      "title": "Reset a forgotten password"
    }
  ],
  "auth-activate": [
    {
      "id": "auth-activate-account",
      "module": "auth",
      "title": "Activate a new account"
    }
  ],
  "auth-changepwd": [
    {
      "id": "auth-change-password",
      "module": "auth",
      "title": "Change password from secure link"
    }
  ],
  "hdr-search": [
    {
      "id": "project-global-search",
      "module": "project",
      "title": "Search across projects"
    }
  ],
  "hdr-taskboard": [
    {
      "id": "project-update-taskboard",
      "module": "project",
      "title": "Update taskboard"
    },
    {
      "id": "mobile-update-task",
      "module": "mobile",
      "title": "Update task on mobile"
    }
  ],
  "hdr-notifications": [
    {
      "id": "workspace-notifications",
      "module": "workspace",
      "title": "Manage workspace notifications"
    }
  ],
  "hdr-appconfig": [
    {
      "id": "hrms-app-config",
      "module": "hrms",
      "title": "Configure org settings and permissions"
    }
  ],
  "workspace-mywork": [
    {
      "id": "workspace-my-work",
      "module": "workspace",
      "title": "Triage My work queue"
    }
  ],
  "workspace-paychecks": [
    {
      "id": "payroll-view-paycheck",
      "module": "payroll",
      "title": "View paycheck"
    }
  ],
  "workspace-approvals": [
    {
      "id": "workspace-approvals",
      "module": "workspace",
      "title": "Approve items from Universal Inbox"
    }
  ],
  "workspace-onboarding": [
    {
      "id": "people-complete-onboarding-tasks",
      "module": "people",
      "title": "Complete onboarding tasks"
    }
  ],
  "project-list": [
    {
      "id": "project-create-project",
      "module": "project",
      "title": "Create a project"
    }
  ],
  "project-feedback": [
    {
      "id": "project-submit-feedback",
      "module": "project",
      "title": "Submit project feedback"
    }
  ],
  "project-reports": [
    {
      "id": "project-run-report",
      "module": "project",
      "title": "Run a project report"
    }
  ],
  "project-capacity": [
    {
      "id": "project-team-capacity",
      "module": "project",
      "title": "Review team capacity"
    }
  ],
  "project-details": [
    {
      "id": "project-edit-project",
      "module": "project",
      "title": "Edit project details"
    }
  ],
  "project-deliverables": [
    {
      "id": "project-add-deliverable",
      "module": "project",
      "title": "Add a deliverable"
    }
  ],
  "project-workitems": [
    {
      "id": "project-create-work-item",
      "module": "project",
      "title": "Create a work item"
    }
  ],
  "people-employees": [
    {
      "id": "hrms-create-employee",
      "module": "hrms",
      "title": "Create an employee"
    },
    {
      "id": "hrms-edit-employee",
      "module": "hrms",
      "title": "Edit an employee profile"
    },
    {
      "id": "hrms-deactivate-employee",
      "module": "hrms",
      "title": "Deactivate an employee"
    }
  ],
  "people-onboarding": [
    {
      "id": "people-start-onboarding",
      "module": "people",
      "title": "Start onboarding"
    }
  ],
  "people-offboarding": [
    {
      "id": "people-start-offboarding",
      "module": "people",
      "title": "Start offboarding"
    }
  ],
  "people-attendance": [
    {
      "id": "hrms-mark-attendance",
      "module": "hrms",
      "title": "Mark attendance"
    },
    {
      "id": "hrms-approve-attendance",
      "module": "hrms",
      "title": "Approve attendance"
    }
  ],
  "people-leaves": [
    {
      "id": "hrms-apply-leave",
      "module": "hrms",
      "title": "Apply for leave"
    },
    {
      "id": "hrms-approve-leave",
      "module": "hrms",
      "title": "Approve leave"
    }
  ],
  "people-timesheet": [
    {
      "id": "hrms-log-timesheet",
      "module": "hrms",
      "title": "Log timesheet hours"
    },
    {
      "id": "hrms-submit-timesheet",
      "module": "hrms",
      "title": "Submit a timesheet week"
    },
    {
      "id": "hrms-approve-timesheet",
      "module": "hrms",
      "title": "Approve a timesheet"
    },
    {
      "id": "mobile-log-timesheet",
      "module": "mobile",
      "title": "Log timesheet on mobile"
    }
  ],
  "people-policies": [
    {
      "id": "people-acknowledge-policy",
      "module": "people",
      "title": "Acknowledge a policy"
    }
  ],
  "people-360-list": [
    {
      "id": "people-employee-360",
      "module": "people",
      "title": "Open Employee 360"
    }
  ],
  "people-holidays": [
    {
      "id": "people-manage-holidays",
      "module": "people",
      "title": "Manage holidays"
    }
  ],
  "admin-emp-leave-config": [
    {
      "id": "admin-employee-leave-config",
      "module": "admin",
      "title": "Configure employee leave"
    }
  ],
  "admin-global-leave-policy": [
    {
      "id": "admin-configure-global-leave",
      "module": "admin",
      "title": "Configure Global Leave"
    }
  ],
  "admin-leave-legal-calendars": [
    {
      "id": "admin-publish-legal-holiday-calendar",
      "module": "admin",
      "title": "Publish legal holiday calendar"
    }
  ],
  "res-skills": [
    {
      "id": "resources-skills-matrix",
      "module": "resources",
      "title": "Review skills matrix"
    }
  ],
  "res-staffing": [
    {
      "id": "resources-staffing-request",
      "module": "resources",
      "title": "Create staffing request"
    }
  ],
  "fin-bids": [
    {
      "id": "sales-create-bid",
      "module": "sales",
      "title": "Create a bid request"
    }
  ],
  "fin-pos": [
    {
      "id": "sales-create-po",
      "module": "sales",
      "title": "Create a purchase order"
    },
    {
      "id": "sales-import-po-salesforce",
      "module": "sales",
      "title": "Import PO from Salesforce"
    }
  ],
  "fin-invoice": [
    {
      "id": "hrms-create-invoice",
      "module": "hrms",
      "title": "Create an invoice"
    },
    {
      "id": "finance-view-invoice",
      "module": "finance",
      "title": "View invoice"
    }
  ],
  "fin-bid-detail": [
    {
      "id": "sales-edit-bid",
      "module": "sales",
      "title": "Edit a bid request"
    }
  ],
  "fin-po-detail": [
    {
      "id": "sales-link-po-project",
      "module": "sales",
      "title": "Link PO to project"
    }
  ],
  "pay-runs": [
    {
      "id": "payroll-create-run",
      "module": "payroll",
      "title": "Create payroll run"
    }
  ],
  "pay-deductions": [
    {
      "id": "payroll-manage-deductions",
      "module": "payroll",
      "title": "Manage deductions"
    }
  ],
  "perf-goals": [
    {
      "id": "performance-set-goal",
      "module": "performance",
      "title": "Set a performance goal"
    }
  ],
  "perf-reviews": [
    {
      "id": "performance-complete-review",
      "module": "performance",
      "title": "Complete a review"
    }
  ],
  "an-exec": [
    {
      "id": "analytics-control-tower",
      "module": "analytics",
      "title": "Open executive control tower"
    }
  ],
  "an-ai-insights": [
    {
      "id": "analytics-ai-insights",
      "module": "analytics",
      "title": "Review AI insights"
    }
  ],
  "an-report-builder": [
    {
      "id": "analytics-report-builder",
      "module": "analytics",
      "title": "Build a report"
    }
  ],
  "ai-agents": [
    {
      "id": "ai-agent-query",
      "module": "ai",
      "title": "Query AI agent"
    }
  ],
  "ai-audit": [
    {
      "id": "ai-audit-review",
      "module": "ai",
      "title": "Review AI audit"
    }
  ],
  "int-hub": [
    {
      "id": "integrations-configure",
      "module": "integrations",
      "title": "Configure integrations"
    }
  ],
  "int-sync": [
    {
      "id": "integrations-sync-health",
      "module": "integrations",
      "title": "Check sync health"
    }
  ],
  "adm-roles": [
    {
      "id": "admin-role-permissions",
      "module": "admin",
      "title": "Configure role permissions"
    }
  ],
  "adm-delegation": [
    {
      "id": "admin-delegation-rules",
      "module": "admin",
      "title": "Configure delegation rules"
    }
  ],
  "adm-org": [
    {
      "id": "admin-persona-navigation",
      "module": "admin",
      "title": "Configure persona navigation"
    }
  ],
  "adm-flags": [
    {
      "id": "admin-feature-flags",
      "module": "admin",
      "title": "Toggle feature flags"
    }
  ],
  "adm-audit": [
    {
      "id": "admin-audit-review",
      "module": "admin",
      "title": "Review admin audit"
    }
  ],
  "adm-dashboard": [
    {
      "id": "admin-dashboard",
      "module": "admin",
      "title": "Review admin dashboard"
    }
  ],
  "adm-payroll-config": [
    {
      "id": "admin-payroll-config",
      "module": "admin",
      "title": "Configure payroll"
    }
  ],
  "adm-notif-templates": [
    {
      "id": "admin-notification-templates",
      "module": "admin",
      "title": "Configure notification templates"
    }
  ]
},
    byUseCase: {
  "auth-login": {
    "id": "auth-login",
    "pageName": "Login",
    "route": "/user/login",
    "module": "Authentication",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Login**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "description": "POST Login"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/login\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-login-email",
          "module": "auth",
          "title": "Sign in with email and password"
        },
        {
          "id": "auth-login-sso",
          "module": "auth",
          "title": "Sign in with Microsoft Entra ID (SSO)"
        },
        {
          "id": "mobile-login",
          "module": "mobile",
          "title": "Sign in on mobile"
        }
      ]
    }
  },
  "auth-forgot": {
    "id": "auth-forgot",
    "pageName": "Forgot password",
    "route": "/user/forgotpassword",
    "module": "Authentication",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Forgot password**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/forgotpassword",
          "description": "POST Forgot password"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/forgotpassword\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-forgot-password",
          "module": "auth",
          "title": "Reset a forgotten password"
        }
      ]
    }
  },
  "auth-activate": {
    "id": "auth-activate",
    "pageName": "Account activation",
    "route": "/user/activateaccount/:activationKey/:employeeId/:uniqueId",
    "module": "Authentication",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Account activation**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/activateaccount/{activationKey}/{employeeId}/{uniqueId}",
          "description": "POST Account activation"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/activateaccount/{activationKey}/{employeeId}/{uniqueId}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-activate-account",
          "module": "auth",
          "title": "Activate a new account"
        }
      ]
    }
  },
  "auth-changepwd": {
    "id": "auth-changepwd",
    "pageName": "Change password",
    "route": "/user/changepassword/:activationKey/:employeeId/:uniqueId",
    "module": "Authentication",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Change password**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/changepassword/{activationKey}/{employeeId}/{uniqueId}",
          "description": "POST Change password"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/changepassword/{activationKey}/{employeeId}/{uniqueId}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-change-password",
          "module": "auth",
          "title": "Change password from secure link"
        }
      ]
    }
  },
  "auth-error500": {
    "id": "auth-error500",
    "pageName": "Server error page",
    "route": "/error/error500",
    "module": "Authentication",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Server error page**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "(see Canonical mapping — UI route /error/error500)",
          "description": "Primary contract documented in Canonical mapping"
        }
      ],
      "sampleCurl": "# API not production-ready for this use case yet.\n# Enable the feature flag, then re-check Canonical mapping for the live path.",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "error boundary / ErrorPage",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-search": {
    "id": "hdr-search",
    "pageName": "Global search",
    "route": "/project/search",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Global search**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/search",
          "description": "GET Global search"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/search\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workGraphService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-global-search",
          "module": "project",
          "title": "Search across projects"
        }
      ]
    }
  },
  "hdr-taskboard": {
    "id": "hdr-taskboard",
    "pageName": "Taskboard",
    "route": "/project/taskboard",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Taskboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/taskboard",
          "description": "GET Taskboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/taskboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "taskboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-update-taskboard",
          "module": "project",
          "title": "Update taskboard"
        },
        {
          "id": "mobile-update-task",
          "module": "mobile",
          "title": "Update task on mobile"
        }
      ]
    }
  },
  "hdr-calendar": {
    "id": "hdr-calendar",
    "pageName": "Calendar",
    "route": "/project/calendar",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Calendar**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/calendar",
          "description": "GET Calendar"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/calendar\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "schedule.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-notes": {
    "id": "hdr-notes",
    "pageName": "Pending notes",
    "route": "Notes overlay",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Pending notes**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/Notes",
          "description": "overlay"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/Notes\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "taskService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-chat": {
    "id": "hdr-chat",
    "pageName": "Chat",
    "route": "/project/chat",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Chat**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/chat",
          "description": "GET Chat"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/chat\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project services",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-files": {
    "id": "hdr-files",
    "pageName": "File manager",
    "route": "/project/filemanager",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **File manager**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/filemanager",
          "description": "GET File manager"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/filemanager\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project services",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-notifications": {
    "id": "hdr-notifications",
    "pageName": "Notifications",
    "route": "/workspace/notifications",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Notifications**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/notifications",
          "description": "GET Notifications"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/notifications\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workspaceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-notifications",
          "module": "workspace",
          "title": "Manage workspace notifications"
        }
      ]
    }
  },
  "hdr-appconfig": {
    "id": "hdr-appconfig",
    "pageName": "Application config",
    "route": "/admin/appconfig",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Application config**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/appconfig",
          "description": "GET Application config"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/appconfig\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "appconfig.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-app-config",
          "module": "hrms",
          "title": "Configure org settings and permissions"
        }
      ]
    }
  },
  "hdr-settings": {
    "id": "hdr-settings",
    "pageName": "Settings",
    "route": "Settings panel",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Settings**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/Settings",
          "description": "panel"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/Settings\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "domain.service.js",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-today": {
    "id": "hdr-today",
    "pageName": "Today activity",
    "route": "Today activity panel",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Today activity**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/Today",
          "description": "activity panel"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/Today\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "dashboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "hdr-profile": {
    "id": "hdr-profile",
    "pageName": "User profile panel",
    "route": "User panel",
    "module": "Global header rail",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **User profile panel**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/User",
          "description": "panel"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/User\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "domain.service.js",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "workspace-home": {
    "id": "workspace-home",
    "pageName": "Home",
    "route": "/workspace/home",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Home**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/home",
          "description": "GET Home"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/home\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workspaceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "workspace-mywork": {
    "id": "workspace-mywork",
    "pageName": "My work",
    "route": "/workspace/my-work",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My work**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/workspace/my-work",
          "description": "GET My work"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/workspace/my-work\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workspaceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-my-work",
          "module": "workspace",
          "title": "Triage My work queue"
        }
      ]
    }
  },
  "workspace-paychecks": {
    "id": "workspace-paychecks",
    "pageName": "My paychecks",
    "route": "/workspace/my-paychecks",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My paychecks**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/my-paychecks",
          "description": "GET My paychecks"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/my-paychecks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-view-paycheck",
          "module": "payroll",
          "title": "View paycheck"
        }
      ]
    }
  },
  "workspace-approvals": {
    "id": "workspace-approvals",
    "pageName": "My approvals",
    "route": "/workspace/approvals",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My approvals**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "description": "GET My approvals"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/approvals/inbox\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "universalApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "note": "Universal inbox list before approve/reject"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-approvals",
          "module": "workspace",
          "title": "Approve items from Universal Inbox"
        }
      ]
    }
  },
  "workspace-onboarding": {
    "id": "workspace-onboarding",
    "pageName": "My onboarding",
    "route": "/people/onboarding/my-tasks",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My onboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding/my-tasks",
          "description": "GET My onboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding/my-tasks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-complete-onboarding-tasks",
          "module": "people",
          "title": "Complete onboarding tasks"
        }
      ]
    }
  },
  "workspace-tickets": {
    "id": "workspace-tickets",
    "pageName": "My tickets",
    "route": "/workspace/my-tickets",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My tickets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/my-tickets",
          "description": "GET My tickets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/my-tickets\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "ticketManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "workspace-workgraph": {
    "id": "workspace-workgraph",
    "pageName": "Work graph",
    "route": "/workspace/work-graph",
    "module": "Workspace",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Work graph**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/work-graph",
          "description": "GET Work graph"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/work-graph\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workGraphService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-dashboard": {
    "id": "project-dashboard",
    "pageName": "Project dashboard",
    "route": "/project/dashboard",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/dashboard",
          "description": "GET Project dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/dashboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "dashboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-portfolio": {
    "id": "project-portfolio",
    "pageName": "Portfolio control tower",
    "route": "/project/portfolio",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Portfolio control tower**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/portfolio/control-tower",
          "description": "GET Portfolio control tower"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/portfolio/control-tower\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "portfolioControlTowerService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-list": {
    "id": "project-list",
    "pageName": "Project list",
    "route": "/project/list",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project list**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/list",
          "description": "GET Project list"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/list\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-create-project",
          "module": "project",
          "title": "Create a project"
        }
      ]
    }
  },
  "project-activities": {
    "id": "project-activities",
    "pageName": "Work items / activity",
    "route": "/project/activites",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Work items / activity**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/activites",
          "description": "GET Work items / activity"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/activites\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workitem.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-timeline": {
    "id": "project-timeline",
    "pageName": "Timeline / Gantt",
    "route": "/project/timeline",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timeline / Gantt**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/timeline",
          "description": "GET Timeline / Gantt"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/timeline\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectGovernanceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-milestones": {
    "id": "project-milestones",
    "pageName": "Milestones",
    "route": "/project/milestones",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Milestones**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/milestones",
          "description": "GET Milestones"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/milestones\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectGovernanceService — listMilestones",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-risks": {
    "id": "project-risks",
    "pageName": "Risks",
    "route": "/project/risks",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Risks**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/risks",
          "description": "GET Risks"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/risks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectGovernanceService — createRisk",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-issues": {
    "id": "project-issues",
    "pageName": "Issues & actions",
    "route": "/project/issues",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Issues & actions**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/issues",
          "description": "GET Issues & actions"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/issues\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectGovernanceService — listIssues",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-governance": {
    "id": "project-governance",
    "pageName": "Governance",
    "route": "/project/governance",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Governance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/governance",
          "description": "GET Governance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/governance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectGovernanceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-tickets": {
    "id": "project-tickets",
    "pageName": "Tickets & service",
    "route": "/project/tickets",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Tickets & service**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/tickets",
          "description": "GET Tickets & service"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/tickets\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "ticketManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-lessons": {
    "id": "project-lessons",
    "pageName": "Lessons learned",
    "route": "/project/lessons-learned",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Lessons learned**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/lessons-learned",
          "description": "GET Lessons learned"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/lessons-learned\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "knowledgeRcaService — getLessonsOverview",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-rca": {
    "id": "project-rca",
    "pageName": "Root cause analysis",
    "route": "/project/rca",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Root cause analysis**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/rca",
          "description": "GET Root cause analysis"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/rca\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "knowledgeRcaService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-feedback": {
    "id": "project-feedback",
    "pageName": "Feedback",
    "route": "/project/feedback",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feedback**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/feedback",
          "description": "GET Feedback"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/feedback\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "feedback.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-submit-feedback",
          "module": "project",
          "title": "Submit project feedback"
        }
      ]
    }
  },
  "project-reports": {
    "id": "project-reports",
    "pageName": "Operational reports",
    "route": "/project/reports",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Operational reports**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/reports",
          "description": "GET Operational reports"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/reports\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "Core reporting",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-run-report",
          "module": "project",
          "title": "Run a project report"
        }
      ]
    }
  },
  "project-capacity": {
    "id": "project-capacity",
    "pageName": "Team capacity",
    "route": "/project/capacity",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Team capacity**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/capacity",
          "description": "GET Team capacity"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/capacity\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-team-capacity",
          "module": "project",
          "title": "Review team capacity"
        }
      ]
    }
  },
  "project-details": {
    "id": "project-details",
    "pageName": "Project details",
    "route": "/project/details/:projectId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/details/{id}",
          "description": "GET Project details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/details/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-edit-project",
          "module": "project",
          "title": "Edit project details"
        }
      ]
    }
  },
  "project-deliverables": {
    "id": "project-deliverables",
    "pageName": "Deliverables list",
    "route": "/project/deliverables/:projectId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Deliverables list**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/deliverables/{id}",
          "description": "GET Deliverables list"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/deliverables/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "task.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-add-deliverable",
          "module": "project",
          "title": "Add a deliverable"
        }
      ]
    }
  },
  "project-deliverable": {
    "id": "project-deliverable",
    "pageName": "Deliverable details",
    "route": "/project/deliverable/:taskId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Deliverable details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/deliverable/{id}",
          "description": "GET Deliverable details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/deliverable/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "task.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-workitems": {
    "id": "project-workitems",
    "pageName": "Work items for deliverable",
    "route": "/project/workitems/:taskId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Work items for deliverable**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/workitems/{id}",
          "description": "GET Work items for deliverable"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/workitems/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workitem.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-create-work-item",
          "module": "project",
          "title": "Create a work item"
        }
      ]
    }
  },
  "project-po-detail": {
    "id": "project-po-detail",
    "pageName": "PO details (project)",
    "route": "/project/purchaseorder/:purchaseOrderId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **PO details (project)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/purchaseorder/{id}",
          "description": "GET PO details (project)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/purchaseorder/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-bid-detail": {
    "id": "project-bid-detail",
    "pageName": "Bid details (project)",
    "route": "/project/bidrequest/:bidRequestId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bid details (project)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/bidrequest/{id}",
          "description": "GET Bid details (project)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/bidrequest/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "bid.requests.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-todolist": {
    "id": "project-todolist",
    "pageName": "Notes list",
    "route": "/project/todolist",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Notes list**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/todolist",
          "description": "GET Notes list"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/todolist\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "taskService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-portfolio-scenarios": {
    "id": "project-portfolio-scenarios",
    "pageName": "Portfolio scenarios",
    "route": "/project/portfolio/scenarios",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Portfolio scenarios**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/portfolio/scenarios",
          "description": "GET Portfolio scenarios"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/portfolio/scenarios\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "portfolioControlTowerService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-dashboard": {
    "id": "people-dashboard",
    "pageName": "HR dashboard",
    "route": "/people/dashboard",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **HR dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/dashboard",
          "description": "GET HR dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/dashboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "dashboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-employees": {
    "id": "people-employees",
    "pageName": "Employees",
    "route": "/people/employees",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employees**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees",
          "description": "GET Employees"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-employee",
          "module": "hrms",
          "title": "Create an employee"
        },
        {
          "id": "hrms-edit-employee",
          "module": "hrms",
          "title": "Edit an employee profile"
        },
        {
          "id": "hrms-deactivate-employee",
          "module": "hrms",
          "title": "Deactivate an employee"
        }
      ]
    }
  },
  "people-onboarding": {
    "id": "people-onboarding",
    "pageName": "Onboarding",
    "route": "/people/onboarding",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Onboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding",
          "description": "GET Onboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-start-onboarding",
          "module": "people",
          "title": "Start onboarding"
        }
      ]
    }
  },
  "people-onboarding-templates": {
    "id": "people-onboarding-templates",
    "pageName": "Onboarding templates",
    "route": "/people/onboarding/templates",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Onboarding templates**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding/templates",
          "description": "GET Onboarding templates"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding/templates\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-onboarding-case": {
    "id": "people-onboarding-case",
    "pageName": "Onboarding case detail",
    "route": "/people/onboarding/:caseId",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Onboarding case detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding/{id}",
          "description": "GET Onboarding case detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-offboarding": {
    "id": "people-offboarding",
    "pageName": "Offboarding",
    "route": "/people/offboarding",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Offboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/offboarding",
          "description": "GET Offboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/offboarding\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-start-offboarding",
          "module": "people",
          "title": "Start offboarding"
        }
      ]
    }
  },
  "people-offboarding-templates": {
    "id": "people-offboarding-templates",
    "pageName": "Offboarding templates",
    "route": "/people/offboarding/templates",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Offboarding templates**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/offboarding/templates",
          "description": "GET Offboarding templates"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/offboarding/templates\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-offboarding-case": {
    "id": "people-offboarding-case",
    "pageName": "Offboarding case detail",
    "route": "/people/offboarding/:caseId",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Offboarding case detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/offboarding/{id}",
          "description": "GET Offboarding case detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/offboarding/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-attendance": {
    "id": "people-attendance",
    "pageName": "Attendance",
    "route": "/people/attendance",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Attendance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/attendance",
          "description": "GET Attendance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/attendance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "attendance-regularization.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-mark-attendance",
          "module": "hrms",
          "title": "Mark attendance"
        },
        {
          "id": "hrms-approve-attendance",
          "module": "hrms",
          "title": "Approve attendance"
        }
      ]
    }
  },
  "people-leaves": {
    "id": "people-leaves",
    "pageName": "Leave management",
    "route": "/people/leaves",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave management**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/leaves",
          "description": "GET Leave management"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/leaves\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-apply-leave",
          "module": "hrms",
          "title": "Apply for leave"
        },
        {
          "id": "hrms-approve-leave",
          "module": "hrms",
          "title": "Approve leave"
        }
      ]
    }
  },
  "people-timesheet": {
    "id": "people-timesheet",
    "pageName": "Timesheets",
    "route": "/people/timesheet",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/timesheet",
          "description": "GET Timesheets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/timesheet\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "timesheetApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-log-timesheet",
          "module": "hrms",
          "title": "Log timesheet hours"
        },
        {
          "id": "hrms-submit-timesheet",
          "module": "hrms",
          "title": "Submit a timesheet week"
        },
        {
          "id": "hrms-approve-timesheet",
          "module": "hrms",
          "title": "Approve a timesheet"
        },
        {
          "id": "mobile-log-timesheet",
          "module": "mobile",
          "title": "Log timesheet on mobile"
        }
      ]
    }
  },
  "people-documents": {
    "id": "people-documents",
    "pageName": "Documents",
    "route": "/people/documents",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Documents**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/documents",
          "description": "GET Documents"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/documents\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "documentVaultService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-assets": {
    "id": "people-assets",
    "pageName": "Assets",
    "route": "/people/assets",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Assets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/assets",
          "description": "GET Assets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/assets\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "assetRegisterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-orgchart": {
    "id": "people-orgchart",
    "pageName": "Organization chart",
    "route": "/people/org-chart",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Organization chart**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/org-chart",
          "description": "GET Organization chart"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/org-chart\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "orgStructureService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-policies": {
    "id": "people-policies",
    "pageName": "Policies",
    "route": "/people/policies",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Policies**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/policies",
          "description": "GET Policies"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/policies\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "policyHubService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-acknowledge-policy",
          "module": "people",
          "title": "Acknowledge a policy"
        }
      ]
    }
  },
  "people-policy-detail": {
    "id": "people-policy-detail",
    "pageName": "Policy detail",
    "route": "/people/policies/:policyId",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Policy detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/policies/{id}",
          "description": "GET Policy detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/policies/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "policyHubService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-settings": {
    "id": "people-settings",
    "pageName": "Settings (ops)",
    "route": "/people/settings",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Settings (ops)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/settings",
          "description": "GET Settings (ops)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/settings\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "domain.service.js",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-profile": {
    "id": "people-profile",
    "pageName": "Employee profile",
    "route": "/people/employees/:employeeId",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee profile**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees/{id}",
          "description": "GET Employee profile"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-360-list": {
    "id": "people-360-list",
    "pageName": "Employee 360 hub",
    "route": "/people/employees/360",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee 360 hub**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees/360",
          "description": "GET Employee 360 hub"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees/360\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee360Service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-employee-360",
          "module": "people",
          "title": "Open Employee 360"
        }
      ]
    }
  },
  "people-360-detail": {
    "id": "people-360-detail",
    "pageName": "Employee 360 detail",
    "route": "/people/employees/:employeeId/360",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee 360 detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees/{id}/360",
          "description": "GET Employee 360 detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees/{id}/360\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee360Service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-holidays": {
    "id": "people-holidays",
    "pageName": "Holidays",
    "route": "/people/holidays",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Holidays**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "description": "Read Holidays"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/leaves/holidays\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-manage-holidays",
          "module": "people",
          "title": "Manage holidays"
        }
      ]
    }
  },
  "admin-leave-policies": {
    "id": "admin-leave-policies",
    "pageName": "Leave policies",
    "route": "/admin/leave-policies",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave policies**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave-policies",
          "description": "GET Leave policies"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave-policies\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": []
    }
  },
  "admin-emp-leave-config": {
    "id": "admin-emp-leave-config",
    "pageName": "Employee leave config",
    "route": "/admin/employee-leave-config",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee leave config**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/employee-leave-config",
          "description": "GET Employee leave config"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/employee-leave-config\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-employee-leave-config",
          "module": "admin",
          "title": "Configure employee leave"
        }
      ]
    }
  },
  "admin-global-leave-policy": {
    "id": "admin-global-leave-policy",
    "pageName": "Global Leave Policy Center",
    "route": "/admin/leave/global-policy-center",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Global Leave Policy Center**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave/global-policy-center",
          "description": "GET Global Leave Policy Center"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave/global-policy-center\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "globalLeavePolicy.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-configure-global-leave",
          "module": "admin",
          "title": "Configure Global Leave"
        }
      ]
    }
  },
  "admin-leave-legal-calendars": {
    "id": "admin-leave-legal-calendars",
    "pageName": "Leave legal calendars",
    "route": "/admin/leave/legal-calendars",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave legal calendars**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave/legal-calendars",
          "description": "GET Leave legal calendars"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave/legal-calendars\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leavePhase2.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-publish-legal-holiday-calendar",
          "module": "admin",
          "title": "Publish legal holiday calendar"
        }
      ]
    }
  },
  "admin-leave-policy-test-lab": {
    "id": "admin-leave-policy-test-lab",
    "pageName": "Leave policy test lab",
    "route": "/admin/leave/policy-test-lab",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave policy test lab**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave/policy-test-lab",
          "description": "GET Leave policy test lab"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave/policy-test-lab\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leavePhase2.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": []
    }
  },
  "people-delegation": {
    "id": "people-delegation",
    "pageName": "Delegation rules",
    "route": "/admin/delegation",
    "module": "People",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Delegation rules**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/delegation",
          "description": "GET Delegation rules"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/delegation\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "approvalDelegationService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "res-capacity": {
    "id": "res-capacity",
    "pageName": "Team capacity",
    "route": "/project/capacity",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Team capacity**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/capacity",
          "description": "GET Team capacity"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/capacity\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "res-skills": {
    "id": "res-skills",
    "pageName": "Skills matrix",
    "route": "/resources/skills",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Skills matrix**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/skills",
          "description": "GET Skills matrix"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/skills\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "resources-skills-matrix",
          "module": "resources",
          "title": "Review skills matrix"
        }
      ]
    }
  },
  "res-staffing": {
    "id": "res-staffing",
    "pageName": "Staffing requests",
    "route": "/resources/staffing-requests",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Staffing requests**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/staffing-requests",
          "description": "GET Staffing requests"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/staffing-requests\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "resources-staffing-request",
          "module": "resources",
          "title": "Create staffing request"
        }
      ]
    }
  },
  "res-bench": {
    "id": "res-bench",
    "pageName": "Bench & roll-off",
    "route": "/resources/bench",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bench & roll-off**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/bench",
          "description": "GET Bench & roll-off"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/bench\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "res-planner": {
    "id": "res-planner",
    "pageName": "Capacity simulation",
    "route": "/resources/planner",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Capacity simulation**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/planner",
          "description": "GET Capacity simulation"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/planner\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "res-utilization": {
    "id": "res-utilization",
    "pageName": "Resource analytics",
    "route": "/resources/utilization",
    "module": "Resources",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Resource analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/utilization",
          "description": "GET Resource analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/utilization\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-dashboard": {
    "id": "fin-dashboard",
    "pageName": "Finance dashboard",
    "route": "/finance/dashboard",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Finance dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/dashboard",
          "description": "GET Finance dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/dashboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "financeIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-accounts": {
    "id": "fin-accounts",
    "pageName": "Accounts",
    "route": "/finance/accounts",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Accounts**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/accounts",
          "description": "GET Accounts"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/accounts\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "account.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-bids": {
    "id": "fin-bids",
    "pageName": "Bid requests",
    "route": "/finance/bidrequests",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bid requests**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/bidrequests",
          "description": "GET Bid requests"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/bidrequests\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "bid.requests.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-create-bid",
          "module": "sales",
          "title": "Create a bid request"
        }
      ]
    }
  },
  "fin-pos": {
    "id": "fin-pos",
    "pageName": "Purchase orders",
    "route": "/finance/purchaseorders",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Purchase orders**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/purchaseorders",
          "description": "GET Purchase orders"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/purchaseorders\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-create-po",
          "module": "sales",
          "title": "Create a purchase order"
        },
        {
          "id": "sales-import-po-salesforce",
          "module": "sales",
          "title": "Import PO from Salesforce"
        }
      ]
    }
  },
  "fin-project-fin": {
    "id": "fin-project-fin",
    "pageName": "Project financials",
    "route": "/finance/project-financials",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project financials**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/project-financials",
          "description": "GET Project financials"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/project-financials\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "financeIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-invoice": {
    "id": "fin-invoice",
    "pageName": "Invoices",
    "route": "/finance/invoice",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Invoices**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/invoice",
          "description": "GET Invoices"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/invoice\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "invoice.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-invoice",
          "module": "hrms",
          "title": "Create an invoice"
        },
        {
          "id": "finance-view-invoice",
          "module": "finance",
          "title": "View invoice"
        }
      ]
    }
  },
  "fin-invoice-detail": {
    "id": "fin-invoice-detail",
    "pageName": "Invoice details",
    "route": "/finance/invoice/details/:invoiceId",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Invoice details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/invoice/details/{id}",
          "description": "GET Invoice details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/invoice/details/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "invoice.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-billing": {
    "id": "fin-billing",
    "pageName": "Billing plans",
    "route": "/finance/billing-plans",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Billing plans**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/billing-plans",
          "description": "GET Billing plans"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/billing-plans\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "financeIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-forecast": {
    "id": "fin-forecast",
    "pageName": "Revenue forecast",
    "route": "/finance/revenue-forecast",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Revenue forecast**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/revenue-forecast",
          "description": "GET Revenue forecast"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/revenue-forecast\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "financeIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-leakage": {
    "id": "fin-leakage",
    "pageName": "Revenue leakage",
    "route": "/finance/revenue-leakage",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Revenue leakage**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/revenue-leakage",
          "description": "GET Revenue leakage"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/revenue-leakage\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "financeIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-expenses": {
    "id": "fin-expenses",
    "pageName": "Expenses (finance view)",
    "route": "/finance/expenses",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Expenses (finance view)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/expenses",
          "description": "GET Expenses (finance view)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/expenses\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "expensesService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-bid-detail": {
    "id": "fin-bid-detail",
    "pageName": "Bid details",
    "route": "/finance/bidrequest/:bidRequestId",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bid details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/bidrequest/{id}",
          "description": "GET Bid details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/bidrequest/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "bid.requests.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-edit-bid",
          "module": "sales",
          "title": "Edit a bid request"
        }
      ]
    }
  },
  "fin-po-detail": {
    "id": "fin-po-detail",
    "pageName": "PO details",
    "route": "/finance/purchaseorder/:purchaseOrderId",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **PO details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/purchaseorder/{id}",
          "description": "GET PO details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/purchaseorder/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-link-po-project",
          "module": "sales",
          "title": "Link PO to project"
        }
      ]
    }
  },
  "pay-dashboard": {
    "id": "pay-dashboard",
    "pageName": "Payroll dashboard",
    "route": "/payroll/dashboard",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/dashboard",
          "description": "GET Payroll dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/dashboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-salary": {
    "id": "pay-salary",
    "pageName": "Salary structures",
    "route": "/payroll/salary-structures",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Salary structures**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/salary-structures",
          "description": "GET Salary structures"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/salary-structures\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-groups": {
    "id": "pay-groups",
    "pageName": "Payroll groups",
    "route": "/payroll/groups",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll groups**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/groups",
          "description": "GET Payroll groups"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/groups\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-runs": {
    "id": "pay-runs",
    "pageName": "Payroll runs",
    "route": "/payroll/runs",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll runs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/runs",
          "description": "GET Payroll runs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/runs\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-create-run",
          "module": "payroll",
          "title": "Create payroll run"
        }
      ]
    }
  },
  "pay-run-detail": {
    "id": "pay-run-detail",
    "pageName": "Payroll run detail",
    "route": "/payroll/runs/:runId",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll run detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/runs/{id}",
          "description": "GET Payroll run detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/runs/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-paychecks": {
    "id": "pay-paychecks",
    "pageName": "Paychecks",
    "route": "/payroll/paychecks",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Paychecks**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/paychecks",
          "description": "GET Paychecks"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/paychecks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-paycheck-detail": {
    "id": "pay-paycheck-detail",
    "pageName": "Paycheck detail",
    "route": "/payroll/paychecks/:paycheckId",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Paycheck detail**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/paychecks/{id}",
          "description": "GET Paycheck detail"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/paychecks/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-benefits": {
    "id": "pay-benefits",
    "pageName": "Benefits",
    "route": "/payroll/benefits",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Benefits**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/benefits",
          "description": "GET Benefits"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/benefits\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employeeFinanceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-compensation": {
    "id": "pay-compensation",
    "pageName": "Compensation",
    "route": "/payroll/compensation",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Compensation**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/compensation",
          "description": "GET Compensation"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/compensation\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employeeFinanceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-deductions": {
    "id": "pay-deductions",
    "pageName": "Deductions",
    "route": "/payroll/deductions",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Deductions**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/payroll/deductions",
          "description": "Read Deductions"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/payroll/deductions\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payroll.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-manage-deductions",
          "module": "payroll",
          "title": "Manage deductions"
        }
      ]
    }
  },
  "pay-reimburse": {
    "id": "pay-reimburse",
    "pageName": "Reimbursements",
    "route": "/payroll/reimbursements",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Reimbursements**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/reimbursements",
          "description": "GET Reimbursements"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/reimbursements\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "expensesService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-emp-fin": {
    "id": "pay-emp-fin",
    "pageName": "Employee finance",
    "route": "/payroll/employee-finance",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee finance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/employee-finance",
          "description": "GET Employee finance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/employee-finance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employeeFinanceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-expenses": {
    "id": "pay-expenses",
    "pageName": "Expenses (employee)",
    "route": "/payroll/expenses",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Expenses (employee)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/expenses",
          "description": "GET Expenses (employee)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/expenses\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "expensesService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "pay-reports": {
    "id": "pay-reports",
    "pageName": "Payroll reports",
    "route": "/payroll/reports",
    "module": "Payroll",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll reports**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/reports",
          "description": "GET Payroll reports"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/reports\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-dashboard": {
    "id": "perf-dashboard",
    "pageName": "Performance dashboard",
    "route": "/performance/dashboard",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Performance dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/dashboard",
          "description": "GET Performance dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/dashboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-goals": {
    "id": "perf-goals",
    "pageName": "Goals / OKRs",
    "route": "/performance/goals",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Goals / OKRs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/goals",
          "description": "GET Goals / OKRs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/goals\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "performance-set-goal",
          "module": "performance",
          "title": "Set a performance goal"
        }
      ]
    }
  },
  "perf-cycles": {
    "id": "perf-cycles",
    "pageName": "Review cycles",
    "route": "/performance/review-cycles",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Review cycles**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/review-cycles",
          "description": "GET Review cycles"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/review-cycles\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-reviews": {
    "id": "perf-reviews",
    "pageName": "Performance reviews",
    "route": "/performance/reviews",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Performance reviews**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/reviews",
          "description": "GET Performance reviews"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/reviews\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "performance-complete-review",
          "module": "performance",
          "title": "Complete a review"
        }
      ]
    }
  },
  "perf-feedback": {
    "id": "perf-feedback",
    "pageName": "Continuous feedback",
    "route": "/performance/feedback",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Continuous feedback**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/feedback",
          "description": "GET Continuous feedback"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/feedback\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-1on1": {
    "id": "perf-1on1",
    "pageName": "1:1 notes",
    "route": "/performance/1on1",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **1:1 notes**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/1on1",
          "description": "GET 1:1 notes"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/1on1\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-growth": {
    "id": "perf-growth",
    "pageName": "Growth plans",
    "route": "/performance/growth-plans",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Growth plans**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/growth-plans",
          "description": "GET Growth plans"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/growth-plans\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "perf-calibration": {
    "id": "perf-calibration",
    "pageName": "Calibration",
    "route": "/performance/calibration",
    "module": "Performance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Calibration**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/calibration",
          "description": "GET Calibration"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/calibration\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-control": {
    "id": "an-control",
    "pageName": "Executive control tower",
    "route": "/analytics/executive-control-tower",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Executive control tower**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/executive-control-tower",
          "description": "GET Executive control tower"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/executive-control-tower\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "portfolioControlTowerService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-hub": {
    "id": "an-hub",
    "pageName": "Analytics hub",
    "route": "/analytics/hub",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Analytics hub**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/hub",
          "description": "GET Analytics hub"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/hub\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-exec": {
    "id": "an-exec",
    "pageName": "Executive analytics",
    "route": "/analytics/executive",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Executive analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/executive",
          "description": "GET Executive analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/executive\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-control-tower",
          "module": "analytics",
          "title": "Open executive control tower"
        }
      ]
    }
  },
  "an-workforce": {
    "id": "an-workforce",
    "pageName": "Workforce analytics",
    "route": "/analytics/workforce",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Workforce analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/workforce",
          "description": "GET Workforce analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/workforce\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-delivery": {
    "id": "an-delivery",
    "pageName": "Delivery analytics",
    "route": "/analytics/delivery",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Delivery analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/delivery",
          "description": "GET Delivery analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/delivery\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-resource": {
    "id": "an-resource",
    "pageName": "Resource analytics",
    "route": "/analytics/resource",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Resource analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/resource",
          "description": "GET Resource analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/resource\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-payroll": {
    "id": "an-payroll",
    "pageName": "Payroll analytics",
    "route": "/analytics/payroll",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/payroll",
          "description": "GET Payroll analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/payroll\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-finance": {
    "id": "an-finance",
    "pageName": "Financial analytics",
    "route": "/analytics/finance",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Financial analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/finance",
          "description": "GET Financial analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/finance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-approvals": {
    "id": "an-approvals",
    "pageName": "Approvals analytics",
    "route": "/analytics/approvals",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Approvals analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "PATCH",
          "path": "/api/v2/approvals/{id}/approve",
          "description": "PATCH Approvals analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X PATCH \"${API_BASE}/api/v2/approvals/{id}/approve\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "note": "Universal inbox list before approve/reject"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-risk": {
    "id": "an-risk",
    "pageName": "Risk intelligence",
    "route": "/analytics/risk",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Risk intelligence**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/risk",
          "description": "GET Risk intelligence"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/risk\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-workgraph": {
    "id": "an-workgraph",
    "pageName": "Work graph analytics",
    "route": "/analytics/work-graph",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Work graph analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/work-graph",
          "description": "GET Work graph analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/work-graph\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workGraphService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "an-ai-insights": {
    "id": "an-ai-insights",
    "pageName": "AI insights",
    "route": "/analytics/ai-insights",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI insights**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/analytics/platform/ai-insights",
          "description": "Read AI insights"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/analytics/platform/ai-insights\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatform.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-ai-insights",
          "module": "analytics",
          "title": "Review AI insights"
        }
      ]
    }
  },
  "an-report-builder": {
    "id": "an-report-builder",
    "pageName": "Report builder",
    "route": "/analytics/report-builder",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Report builder**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/report-builder",
          "description": "GET Report builder"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/report-builder\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-report-builder",
          "module": "analytics",
          "title": "Build a report"
        }
      ]
    }
  },
  "an-scheduled": {
    "id": "an-scheduled",
    "pageName": "Scheduled reports",
    "route": "/analytics/scheduled-reports",
    "module": "Analytics",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Scheduled reports**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/scheduled-reports",
          "description": "GET Scheduled reports"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/scheduled-reports\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-agents": {
    "id": "ai-agents",
    "pageName": "AI agent registry",
    "route": "/ai/agents",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI agent registry**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/agents",
          "description": "GET AI agent registry"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/agents\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "ai-agent-query",
          "module": "ai",
          "title": "Query AI agent"
        }
      ]
    }
  },
  "ai-wbs": {
    "id": "ai-wbs",
    "pageName": "WBS assistant",
    "route": "/ai/wbs-assistant",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **WBS assistant**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/wbs-assistant",
          "description": "GET WBS assistant"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/wbs-assistant\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-staffing": {
    "id": "ai-staffing",
    "pageName": "Staffing agent",
    "route": "/ai/staffing-agent",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Staffing agent**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/staffing-agent",
          "description": "GET Staffing agent"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/staffing-agent\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-timesheet": {
    "id": "ai-timesheet",
    "pageName": "Timesheet agent",
    "route": "/ai/timesheet-agent",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheet agent**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/timesheet-agent",
          "description": "GET Timesheet agent"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/timesheet-agent\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-payroll": {
    "id": "ai-payroll",
    "pageName": "Payroll readiness agent",
    "route": "/ai/payroll-readiness",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll readiness agent**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/payroll-readiness",
          "description": "GET Payroll readiness agent"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/payroll-readiness\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-risk": {
    "id": "ai-risk",
    "pageName": "Risk agent",
    "route": "/ai/risk-agent",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Risk agent**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/risk-agent",
          "description": "GET Risk agent"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/risk-agent\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-exec": {
    "id": "ai-exec",
    "pageName": "Executive briefing",
    "route": "/ai/executive-briefing",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Executive briefing**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/executive-briefing",
          "description": "GET Executive briefing"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/executive-briefing\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-reco": {
    "id": "ai-reco",
    "pageName": "Recommendations",
    "route": "/ai/recommendations",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Recommendations**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/recommendations",
          "description": "GET Recommendations"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/recommendations\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-knowledge": {
    "id": "ai-knowledge",
    "pageName": "Knowledge & RCA",
    "route": "/ai/knowledge",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Knowledge & RCA**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/knowledge",
          "description": "GET Knowledge & RCA"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/knowledge\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "knowledgeRcaService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "ai-audit": {
    "id": "ai-audit",
    "pageName": "AI decision audit",
    "route": "/ai/audit",
    "module": "AI Intelligence",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI decision audit**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/ai/work-intelligence/audit",
          "description": "Read AI decision audit"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/ai/work-intelligence/audit\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligence.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "ai-audit-review",
          "module": "ai",
          "title": "Review AI audit"
        }
      ]
    }
  },
  "int-hub": {
    "id": "int-hub",
    "pageName": "Integration hub",
    "route": "/integrations/hub",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Integration hub**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/hub",
          "description": "GET Integration hub"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/hub\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "integrations-configure",
          "module": "integrations",
          "title": "Configure integrations"
        }
      ]
    }
  },
  "int-market": {
    "id": "int-market",
    "pageName": "Connector marketplace",
    "route": "/integrations/marketplace",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Connector marketplace**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/marketplace",
          "description": "GET Connector marketplace"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/marketplace\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "developerPortalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "int-sync": {
    "id": "int-sync",
    "pageName": "Sync monitor",
    "route": "/integrations/sync-health",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Sync monitor**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/sync-health",
          "description": "GET Sync monitor"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/sync-health\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "integrations-sync-health",
          "module": "integrations",
          "title": "Check sync health"
        }
      ]
    }
  },
  "int-mapping": {
    "id": "int-mapping",
    "pageName": "Data mapping",
    "route": "/integrations/mapping",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Data mapping**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/mapping",
          "description": "GET Data mapping"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/mapping\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "int-jobs": {
    "id": "int-jobs",
    "pageName": "Import/export jobs",
    "route": "/integrations/jobs",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Import/export jobs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/jobs",
          "description": "GET Import/export jobs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/jobs\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "int-logs": {
    "id": "int-logs",
    "pageName": "Integration logs",
    "route": "/integrations/logs",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Integration logs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/logs",
          "description": "GET Integration logs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/logs\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "int-adapters": {
    "id": "int-adapters",
    "pageName": "Connector adapters",
    "route": "/integrations/adapters",
    "module": "Integrations",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Connector adapters**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/adapters",
          "description": "GET Connector adapters"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/adapters\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-roles": {
    "id": "adm-roles",
    "pageName": "Roles & permissions",
    "route": "/admin/roles",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Roles & permissions**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/roles",
          "description": "GET Roles & permissions"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/roles\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "rolePermissionService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-role-permissions",
          "module": "admin",
          "title": "Configure role permissions"
        }
      ]
    }
  },
  "adm-approval-policies": {
    "id": "adm-approval-policies",
    "pageName": "Approval policies",
    "route": "/admin/approval-policies",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Approval policies**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "PATCH",
          "path": "/api/v2/approvals/{id}/approve",
          "description": "PATCH Approval policies"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X PATCH \"${API_BASE}/api/v2/approvals/{id}/approve\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "approvalPolicyService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "note": "Universal inbox list before approve/reject"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-delegation": {
    "id": "adm-delegation",
    "pageName": "Delegation rules",
    "route": "/admin/delegation",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Delegation rules**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/delegation",
          "description": "GET Delegation rules"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/delegation\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "approvalDelegationService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-delegation-rules",
          "module": "admin",
          "title": "Configure delegation rules"
        }
      ]
    }
  },
  "adm-workflows": {
    "id": "adm-workflows",
    "pageName": "Workflow studio",
    "route": "/admin/workflows",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Workflow studio**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/workflows",
          "description": "GET Workflow studio"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/workflows\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workflowAutomationService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-automation": {
    "id": "adm-automation",
    "pageName": "Automation rules",
    "route": "/admin/automation-rules",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Automation rules**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/automation-rules",
          "description": "GET Automation rules"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/automation-rules\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workflowAutomationService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-access-req": {
    "id": "adm-access-req",
    "pageName": "Access requests",
    "route": "/admin/access-requests",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Access requests**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/access-requests",
          "description": "GET Access requests"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/access-requests\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "assetRegisterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-org": {
    "id": "adm-org",
    "pageName": "Org structure",
    "route": "/admin/org-structure",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Org structure**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/org-structure",
          "description": "GET Org structure"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/org-structure\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "orgStructureService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-persona-navigation",
          "module": "admin",
          "title": "Configure persona navigation"
        }
      ]
    }
  },
  "adm-flags": {
    "id": "adm-flags",
    "pageName": "Feature flags",
    "route": "/admin/feature-flags",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feature flags**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/feature-flags",
          "description": "GET Feature flags"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/feature-flags\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "featureFlagService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-feature-flags",
          "module": "admin",
          "title": "Toggle feature flags"
        }
      ]
    }
  },
  "adm-audit": {
    "id": "adm-audit",
    "pageName": "Audit & compliance",
    "route": "/admin/audit",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Audit & compliance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/audit",
          "description": "GET Audit & compliance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/audit\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "auditService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-audit-review",
          "module": "admin",
          "title": "Review admin audit"
        }
      ]
    }
  },
  "adm-compliance": {
    "id": "adm-compliance",
    "pageName": "Compliance export",
    "route": "/admin/compliance-export",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Compliance export**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/compliance-export",
          "description": "GET Compliance export"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/compliance-export\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "compliancePackService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-insights": {
    "id": "adm-insights",
    "pageName": "Admin insights",
    "route": "/admin/insights",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Admin insights**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/insights",
          "description": "GET Admin insights"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/insights\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "adminInsightsService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-retention": {
    "id": "adm-retention",
    "pageName": "Data retention",
    "route": "/admin/data-retention",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Data retention**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/data-retention",
          "description": "GET Data retention"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/data-retention\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "dataRetentionService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-security": {
    "id": "adm-security",
    "pageName": "Security settings",
    "route": "/admin/security",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Security settings**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/security",
          "description": "GET Security settings"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/security\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "maskingPolicyService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-developer": {
    "id": "adm-developer",
    "pageName": "Developer portal",
    "route": "/admin/developer",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Developer portal**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/developer",
          "description": "GET Developer portal"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/developer\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "developerPortalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-apikeys": {
    "id": "adm-apikeys",
    "pageName": "API keys",
    "route": "/admin/api-keys",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **API keys**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/api-keys",
          "description": "GET API keys"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/api-keys\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "developerPortalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-webhooks": {
    "id": "adm-webhooks",
    "pageName": "Webhooks",
    "route": "/admin/webhooks",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Webhooks**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/webhooks",
          "description": "GET Webhooks"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/webhooks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "developerPortalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "adm-dashboard": {
    "id": "adm-dashboard",
    "pageName": "Admin dashboard",
    "route": "/admin/dashboard",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Admin dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/admin/insights (reuse)",
          "description": "Read Admin dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/admin/insights (reuse)\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "adminInsights.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-dashboard",
          "module": "admin",
          "title": "Review admin dashboard"
        }
      ]
    }
  },
  "adm-payroll-config": {
    "id": "adm-payroll-config",
    "pageName": "Payroll configuration",
    "route": "/admin/payroll-config",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll configuration**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/payroll/config",
          "description": "Read Payroll configuration"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/payroll/config\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payroll.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-payroll-config",
          "module": "admin",
          "title": "Configure payroll"
        }
      ]
    }
  },
  "adm-notif-templates": {
    "id": "adm-notif-templates",
    "pageName": "Notification templates",
    "route": "/admin/notification-templates",
    "module": "Administration",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Notification templates**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/workspace/notification-templates",
          "description": "Read Notification templates"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/workspace/notification-templates\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "notificationTemplate.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-notification-templates",
          "module": "admin",
          "title": "Configure notification templates"
        }
      ]
    }
  },
  "fin-proposal-lifecycle": {
    "id": "fin-proposal-lifecycle",
    "pageName": "Proposal & estimation lifecycle",
    "route": "/sales/proposals",
    "module": "Sales & Contracts",
    "apiDocumentation": {
      "overview": "API documentation for **Proposal & estimation lifecycle** is reserved until the feature ships. Linked scenarios describe the intended UI path.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/proposals",
          "description": "List/read Proposal & estimation lifecycle"
        },
        {
          "method": "POST",
          "path": "/api/v2/proposals",
          "description": "Create/update Proposal & estimation lifecycle"
        },
        {
          "method": "PATCH",
          "path": "/submit/approve/accept",
          "description": "PATCH Proposal & estimation lifecycle"
        },
        {
          "method": "POST",
          "path": "/convert-to-project",
          "description": "POST Proposal & estimation lifecycle"
        }
      ],
      "sampleCurl": "# API not production-ready for this use case yet.\n# Enable the feature flag, then re-check Canonical mapping for the live path.",
      "howToUse": [
        "This use case is **Planned** or the backend endpoint is not production-ready.",
        "Follow the Scenario Guide UI path for design intent; do not treat curl samples as go-live contracts.",
        "After the feature ships, regenerate this catalog so Canonical mapping and Sample curl refresh.",
        "Pair with linked scenarios below for end-user verification once live."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "proposalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "POST",
          "path": "/api/v2/proposals",
          "note": "Create/update Proposal & estimation lifecycle"
        },
        {
          "method": "PATCH",
          "path": "/submit/approve/accept",
          "note": "PATCH Proposal & estimation lifecycle"
        },
        {
          "method": "POST",
          "path": "/convert-to-project",
          "note": "POST Proposal & estimation lifecycle"
        }
      ],
      "relatedScenarios": []
    }
  },
  "fin-revenue-recognition": {
    "id": "fin-revenue-recognition",
    "pageName": "Revenue recognition",
    "route": "/finance/revenue-recognition",
    "module": "Finance",
    "apiDocumentation": {
      "overview": "API documentation for **Revenue recognition** is reserved until the feature ships. Linked scenarios describe the intended UI path.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/project-billing/revenue-recognition?projectId=&period=",
          "description": "GET Revenue recognition"
        }
      ],
      "sampleCurl": "# API not production-ready for this use case yet.\n# Enable the feature flag, then re-check Canonical mapping for the live path.",
      "howToUse": [
        "This use case is **Planned** or the backend endpoint is not production-ready.",
        "Follow the Scenario Guide UI path for design intent; do not treat curl samples as go-live contracts.",
        "After the feature ships, regenerate this catalog so Canonical mapping and Sample curl refresh.",
        "Pair with linked scenarios below for end-user verification once live."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "projectBillingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-npd-lifecycle": {
    "id": "project-npd-lifecycle",
    "pageName": "New Product Development lifecycle",
    "route": "/project/npd",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "API documentation for **New Product Development lifecycle** is reserved until the feature ships. Linked scenarios describe the intended UI path.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [],
      "sampleCurl": "# API not production-ready for this use case yet.\n# Enable the feature flag, then re-check Canonical mapping for the live path.",
      "howToUse": [
        "This use case is **Planned** or the backend endpoint is not production-ready.",
        "Follow the Scenario Guide UI path for design intent; do not treat curl samples as go-live contracts.",
        "After the feature ships, regenerate this catalog so Canonical mapping and Sample curl refresh.",
        "Pair with linked scenarios below for end-user verification once live."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "(not shipped)",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "project-dossier": {
    "id": "project-dossier",
    "pageName": "Dossier management",
    "route": "/project/dossier/:dossierId",
    "module": "Projects",
    "apiDocumentation": {
      "overview": "API documentation for **Dossier management** is reserved until the feature ships. Linked scenarios describe the intended UI path.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [],
      "sampleCurl": "# API not production-ready for this use case yet.\n# Enable the feature flag, then re-check Canonical mapping for the live path.",
      "howToUse": [
        "This use case is **Planned** or the backend endpoint is not production-ready.",
        "Follow the Scenario Guide UI path for design intent; do not treat curl samples as go-live contracts.",
        "After the feature ships, regenerate this catalog so Canonical mapping and Sample curl refresh.",
        "Pair with linked scenarios below for end-user verification once live."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "(not shipped — Document Vault/filemanager is separate)",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "doc-invoice": {
    "id": "doc-invoice",
    "pageName": "Public invoice view",
    "route": "/document/invoice/details/:invoiceId",
    "module": "Document (public)",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Public invoice view**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/document/invoice/details/{id}",
          "description": "GET Public invoice view"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/document/invoice/details/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "invoice.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "doc-feedback-req": {
    "id": "doc-feedback-req",
    "pageName": "Feedback request (external)",
    "route": "/document/feedback/request/:feedbackRequestId",
    "module": "Document (public)",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feedback request (external)**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/document/feedback/request/{id}",
          "description": "GET Feedback request (external)"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/document/feedback/request/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "feedback.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "doc-feedback-tpl": {
    "id": "doc-feedback-tpl",
    "pageName": "Feedback template link",
    "route": "/document/feedback/template/:templateId",
    "module": "Document (public)",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feedback template link**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/document/feedback/template/{id}",
          "description": "GET Feedback template link"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/document/feedback/template/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "feedback.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  },
  "doc-feedback": {
    "id": "doc-feedback",
    "pageName": "Feedback response",
    "route": "/document/feedback/:feedbackId",
    "module": "Document (public)",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feedback response**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/document/feedback/{id}",
          "description": "GET Feedback response"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/document/feedback/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Use How to use (UI) steps on this card to verify the screen after the API call."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "feedback.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": []
    }
  }
},
    byScenario: {
  "auth-login-email": {
    "scenarioId": "auth-login-email",
    "title": "Sign in with email and password",
    "module": "auth",
    "useCaseId": "auth-login",
    "useCaseName": "Login",
    "useCaseRoute": "/user/login",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Login**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "description": "POST Login"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/login\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-login-email",
          "module": "auth",
          "title": "Sign in with email and password"
        },
        {
          "id": "auth-login-sso",
          "module": "auth",
          "title": "Sign in with Microsoft Entra ID (SSO)"
        },
        {
          "id": "mobile-login",
          "module": "mobile",
          "title": "Sign in on mobile"
        }
      ]
    }
  },
  "auth-login-sso": {
    "scenarioId": "auth-login-sso",
    "title": "Sign in with Microsoft Entra ID (SSO)",
    "module": "auth",
    "useCaseId": "auth-login",
    "useCaseName": "Login",
    "useCaseRoute": "/user/login",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Login**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "description": "POST Login"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/login\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-login-email",
          "module": "auth",
          "title": "Sign in with email and password"
        },
        {
          "id": "auth-login-sso",
          "module": "auth",
          "title": "Sign in with Microsoft Entra ID (SSO)"
        },
        {
          "id": "mobile-login",
          "module": "mobile",
          "title": "Sign in on mobile"
        }
      ]
    }
  },
  "auth-forgot-password": {
    "scenarioId": "auth-forgot-password",
    "title": "Reset a forgotten password",
    "module": "auth",
    "useCaseId": "auth-forgot",
    "useCaseName": "Forgot password",
    "useCaseRoute": "/user/forgotpassword",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Forgot password**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/forgotpassword",
          "description": "POST Forgot password"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/forgotpassword\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-forgot-password",
          "module": "auth",
          "title": "Reset a forgotten password"
        }
      ]
    }
  },
  "auth-activate-account": {
    "scenarioId": "auth-activate-account",
    "title": "Activate a new account",
    "module": "auth",
    "useCaseId": "auth-activate",
    "useCaseName": "Account activation",
    "useCaseRoute": "/user/activateaccount/:activationKey/:employeeId/:uniqueId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Account activation**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/activateaccount/{activationKey}/{employeeId}/{uniqueId}",
          "description": "POST Account activation"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/activateaccount/{activationKey}/{employeeId}/{uniqueId}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-activate-account",
          "module": "auth",
          "title": "Activate a new account"
        }
      ]
    }
  },
  "auth-change-password": {
    "scenarioId": "auth-change-password",
    "title": "Change password from secure link",
    "module": "auth",
    "useCaseId": "auth-changepwd",
    "useCaseName": "Change password",
    "useCaseRoute": "/user/changepassword/:activationKey/:employeeId/:uniqueId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Change password**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/changepassword/{activationKey}/{employeeId}/{uniqueId}",
          "description": "POST Change password"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/changepassword/{activationKey}/{employeeId}/{uniqueId}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-change-password",
          "module": "auth",
          "title": "Change password from secure link"
        }
      ]
    }
  },
  "workspace-my-work": {
    "scenarioId": "workspace-my-work",
    "title": "Triage My work queue",
    "module": "workspace",
    "useCaseId": "workspace-mywork",
    "useCaseName": "My work",
    "useCaseRoute": "/workspace/my-work",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My work**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/workspace/my-work",
          "description": "GET My work"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/workspace/my-work\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workspaceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-my-work",
          "module": "workspace",
          "title": "Triage My work queue"
        }
      ]
    }
  },
  "workspace-approvals": {
    "scenarioId": "workspace-approvals",
    "title": "Approve items from Universal Inbox",
    "module": "workspace",
    "useCaseId": "workspace-approvals",
    "useCaseName": "My approvals",
    "useCaseRoute": "/workspace/approvals",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My approvals**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "description": "GET My approvals"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/approvals/inbox\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "universalApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/approvals/inbox",
          "note": "Universal inbox list before approve/reject"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-approvals",
          "module": "workspace",
          "title": "Approve items from Universal Inbox"
        }
      ]
    }
  },
  "workspace-notifications": {
    "scenarioId": "workspace-notifications",
    "title": "Manage workspace notifications",
    "module": "workspace",
    "useCaseId": "hdr-notifications",
    "useCaseName": "Notifications",
    "useCaseRoute": "/workspace/notifications",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Notifications**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/notifications",
          "description": "GET Notifications"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/notifications\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workspaceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "workspace-notifications",
          "module": "workspace",
          "title": "Manage workspace notifications"
        }
      ]
    }
  },
  "hrms-create-employee": {
    "scenarioId": "hrms-create-employee",
    "title": "Create an employee",
    "module": "hrms",
    "useCaseId": "people-employees",
    "useCaseName": "Employees",
    "useCaseRoute": "/people/employees",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employees**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees",
          "description": "GET Employees"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-employee",
          "module": "hrms",
          "title": "Create an employee"
        },
        {
          "id": "hrms-edit-employee",
          "module": "hrms",
          "title": "Edit an employee profile"
        },
        {
          "id": "hrms-deactivate-employee",
          "module": "hrms",
          "title": "Deactivate an employee"
        }
      ]
    }
  },
  "hrms-edit-employee": {
    "scenarioId": "hrms-edit-employee",
    "title": "Edit an employee profile",
    "module": "hrms",
    "useCaseId": "people-employees",
    "useCaseName": "Employees",
    "useCaseRoute": "/people/employees",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employees**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees",
          "description": "GET Employees"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-employee",
          "module": "hrms",
          "title": "Create an employee"
        },
        {
          "id": "hrms-edit-employee",
          "module": "hrms",
          "title": "Edit an employee profile"
        },
        {
          "id": "hrms-deactivate-employee",
          "module": "hrms",
          "title": "Deactivate an employee"
        }
      ]
    }
  },
  "hrms-deactivate-employee": {
    "scenarioId": "hrms-deactivate-employee",
    "title": "Deactivate an employee",
    "module": "hrms",
    "useCaseId": "people-employees",
    "useCaseName": "Employees",
    "useCaseRoute": "/people/employees",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employees**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees",
          "description": "GET Employees"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-employee",
          "module": "hrms",
          "title": "Create an employee"
        },
        {
          "id": "hrms-edit-employee",
          "module": "hrms",
          "title": "Edit an employee profile"
        },
        {
          "id": "hrms-deactivate-employee",
          "module": "hrms",
          "title": "Deactivate an employee"
        }
      ]
    }
  },
  "hrms-log-timesheet": {
    "scenarioId": "hrms-log-timesheet",
    "title": "Log timesheet hours",
    "module": "hrms",
    "useCaseId": "people-timesheet",
    "useCaseName": "Timesheets",
    "useCaseRoute": "/people/timesheet",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/timesheet",
          "description": "GET Timesheets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/timesheet\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "timesheetApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-log-timesheet",
          "module": "hrms",
          "title": "Log timesheet hours"
        },
        {
          "id": "hrms-submit-timesheet",
          "module": "hrms",
          "title": "Submit a timesheet week"
        },
        {
          "id": "hrms-approve-timesheet",
          "module": "hrms",
          "title": "Approve a timesheet"
        },
        {
          "id": "mobile-log-timesheet",
          "module": "mobile",
          "title": "Log timesheet on mobile"
        }
      ]
    }
  },
  "hrms-submit-timesheet": {
    "scenarioId": "hrms-submit-timesheet",
    "title": "Submit a timesheet week",
    "module": "hrms",
    "useCaseId": "people-timesheet",
    "useCaseName": "Timesheets",
    "useCaseRoute": "/people/timesheet",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/timesheet",
          "description": "GET Timesheets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/timesheet\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "timesheetApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-log-timesheet",
          "module": "hrms",
          "title": "Log timesheet hours"
        },
        {
          "id": "hrms-submit-timesheet",
          "module": "hrms",
          "title": "Submit a timesheet week"
        },
        {
          "id": "hrms-approve-timesheet",
          "module": "hrms",
          "title": "Approve a timesheet"
        },
        {
          "id": "mobile-log-timesheet",
          "module": "mobile",
          "title": "Log timesheet on mobile"
        }
      ]
    }
  },
  "hrms-approve-timesheet": {
    "scenarioId": "hrms-approve-timesheet",
    "title": "Approve a timesheet",
    "module": "hrms",
    "useCaseId": "people-timesheet",
    "useCaseName": "Timesheets",
    "useCaseRoute": "/people/timesheet",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/timesheet",
          "description": "GET Timesheets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/timesheet\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "timesheetApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-log-timesheet",
          "module": "hrms",
          "title": "Log timesheet hours"
        },
        {
          "id": "hrms-submit-timesheet",
          "module": "hrms",
          "title": "Submit a timesheet week"
        },
        {
          "id": "hrms-approve-timesheet",
          "module": "hrms",
          "title": "Approve a timesheet"
        },
        {
          "id": "mobile-log-timesheet",
          "module": "mobile",
          "title": "Log timesheet on mobile"
        }
      ]
    }
  },
  "hrms-apply-leave": {
    "scenarioId": "hrms-apply-leave",
    "title": "Apply for leave",
    "module": "hrms",
    "useCaseId": "people-leaves",
    "useCaseName": "Leave management",
    "useCaseRoute": "/people/leaves",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave management**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/leaves",
          "description": "GET Leave management"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/leaves\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-apply-leave",
          "module": "hrms",
          "title": "Apply for leave"
        },
        {
          "id": "hrms-approve-leave",
          "module": "hrms",
          "title": "Approve leave"
        }
      ]
    }
  },
  "hrms-approve-leave": {
    "scenarioId": "hrms-approve-leave",
    "title": "Approve leave",
    "module": "hrms",
    "useCaseId": "people-leaves",
    "useCaseName": "Leave management",
    "useCaseRoute": "/people/leaves",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave management**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/leaves",
          "description": "GET Leave management"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/leaves\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-apply-leave",
          "module": "hrms",
          "title": "Apply for leave"
        },
        {
          "id": "hrms-approve-leave",
          "module": "hrms",
          "title": "Approve leave"
        }
      ]
    }
  },
  "admin-configure-global-leave": {
    "scenarioId": "admin-configure-global-leave",
    "title": "Configure Global Leave",
    "module": "admin",
    "useCaseId": "admin-global-leave-policy",
    "useCaseName": "Global Leave Policy Center",
    "useCaseRoute": "/admin/leave/global-policy-center",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Global Leave Policy Center**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave/global-policy-center",
          "description": "GET Global Leave Policy Center"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave/global-policy-center\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "globalLeavePolicy.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-configure-global-leave",
          "module": "admin",
          "title": "Configure Global Leave"
        }
      ]
    }
  },
  "admin-employee-leave-config": {
    "scenarioId": "admin-employee-leave-config",
    "title": "Configure employee leave",
    "module": "admin",
    "useCaseId": "admin-emp-leave-config",
    "useCaseName": "Employee leave config",
    "useCaseRoute": "/admin/employee-leave-config",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee leave config**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/employee-leave-config",
          "description": "GET Employee leave config"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/employee-leave-config\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-employee-leave-config",
          "module": "admin",
          "title": "Configure employee leave"
        }
      ]
    }
  },
  "admin-publish-legal-holiday-calendar": {
    "scenarioId": "admin-publish-legal-holiday-calendar",
    "title": "Publish legal holiday calendar",
    "module": "admin",
    "useCaseId": "admin-leave-legal-calendars",
    "useCaseName": "Leave legal calendars",
    "useCaseRoute": "/admin/leave/legal-calendars",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Leave legal calendars**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/leave/legal-calendars",
          "description": "GET Leave legal calendars"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/leave/legal-calendars\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leavePhase2.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-publish-legal-holiday-calendar",
          "module": "admin",
          "title": "Publish legal holiday calendar"
        }
      ]
    }
  },
  "hrms-mark-attendance": {
    "scenarioId": "hrms-mark-attendance",
    "title": "Mark attendance",
    "module": "hrms",
    "useCaseId": "people-attendance",
    "useCaseName": "Attendance",
    "useCaseRoute": "/people/attendance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Attendance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/attendance",
          "description": "GET Attendance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/attendance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "attendance-regularization.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-mark-attendance",
          "module": "hrms",
          "title": "Mark attendance"
        },
        {
          "id": "hrms-approve-attendance",
          "module": "hrms",
          "title": "Approve attendance"
        }
      ]
    }
  },
  "hrms-approve-attendance": {
    "scenarioId": "hrms-approve-attendance",
    "title": "Approve attendance",
    "module": "hrms",
    "useCaseId": "people-attendance",
    "useCaseName": "Attendance",
    "useCaseRoute": "/people/attendance",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Attendance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/attendance",
          "description": "GET Attendance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/attendance\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "attendance-regularization.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-mark-attendance",
          "module": "hrms",
          "title": "Mark attendance"
        },
        {
          "id": "hrms-approve-attendance",
          "module": "hrms",
          "title": "Approve attendance"
        }
      ]
    }
  },
  "hrms-create-invoice": {
    "scenarioId": "hrms-create-invoice",
    "title": "Create an invoice",
    "module": "hrms",
    "useCaseId": "fin-invoice",
    "useCaseName": "Invoices",
    "useCaseRoute": "/finance/invoice",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Invoices**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/invoice",
          "description": "GET Invoices"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/invoice\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "invoice.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-invoice",
          "module": "hrms",
          "title": "Create an invoice"
        },
        {
          "id": "finance-view-invoice",
          "module": "finance",
          "title": "View invoice"
        }
      ]
    }
  },
  "hrms-app-config": {
    "scenarioId": "hrms-app-config",
    "title": "Configure org settings and permissions",
    "module": "hrms",
    "useCaseId": "hdr-appconfig",
    "useCaseName": "Application config",
    "useCaseRoute": "/admin/appconfig",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Application config**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/appconfig",
          "description": "GET Application config"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/appconfig\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "appconfig.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-app-config",
          "module": "hrms",
          "title": "Configure org settings and permissions"
        }
      ]
    }
  },
  "people-start-onboarding": {
    "scenarioId": "people-start-onboarding",
    "title": "Start onboarding",
    "module": "people",
    "useCaseId": "people-onboarding",
    "useCaseName": "Onboarding",
    "useCaseRoute": "/people/onboarding",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Onboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding",
          "description": "GET Onboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-start-onboarding",
          "module": "people",
          "title": "Start onboarding"
        }
      ]
    }
  },
  "people-complete-onboarding-tasks": {
    "scenarioId": "people-complete-onboarding-tasks",
    "title": "Complete onboarding tasks",
    "module": "people",
    "useCaseId": "workspace-onboarding",
    "useCaseName": "My onboarding",
    "useCaseRoute": "/people/onboarding/my-tasks",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My onboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/onboarding/my-tasks",
          "description": "GET My onboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/onboarding/my-tasks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-complete-onboarding-tasks",
          "module": "people",
          "title": "Complete onboarding tasks"
        }
      ]
    }
  },
  "people-start-offboarding": {
    "scenarioId": "people-start-offboarding",
    "title": "Start offboarding",
    "module": "people",
    "useCaseId": "people-offboarding",
    "useCaseName": "Offboarding",
    "useCaseRoute": "/people/offboarding",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Offboarding**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/offboarding",
          "description": "GET Offboarding"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/offboarding\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "onboardingService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-start-offboarding",
          "module": "people",
          "title": "Start offboarding"
        }
      ]
    }
  },
  "people-employee-360": {
    "scenarioId": "people-employee-360",
    "title": "Open Employee 360",
    "module": "people",
    "useCaseId": "people-360-list",
    "useCaseName": "Employee 360 hub",
    "useCaseRoute": "/people/employees/360",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Employee 360 hub**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/employees/360",
          "description": "GET Employee 360 hub"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/employees/360\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "employee360Service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-employee-360",
          "module": "people",
          "title": "Open Employee 360"
        }
      ]
    }
  },
  "people-acknowledge-policy": {
    "scenarioId": "people-acknowledge-policy",
    "title": "Acknowledge a policy",
    "module": "people",
    "useCaseId": "people-policies",
    "useCaseName": "Policies",
    "useCaseRoute": "/people/policies",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Policies**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/policies",
          "description": "GET Policies"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/policies\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "policyHubService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-acknowledge-policy",
          "module": "people",
          "title": "Acknowledge a policy"
        }
      ]
    }
  },
  "people-manage-holidays": {
    "scenarioId": "people-manage-holidays",
    "title": "Manage holidays",
    "module": "people",
    "useCaseId": "people-holidays",
    "useCaseName": "Holidays",
    "useCaseRoute": "/people/holidays",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Holidays**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "description": "Read Holidays"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/leaves/holidays\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "leave.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/leaves/holidays",
          "note": "Holiday calendars used in leave day counting"
        }
      ],
      "relatedScenarios": [
        {
          "id": "people-manage-holidays",
          "module": "people",
          "title": "Manage holidays"
        }
      ]
    }
  },
  "project-create-project": {
    "scenarioId": "project-create-project",
    "title": "Create a project",
    "module": "project",
    "useCaseId": "project-list",
    "useCaseName": "Project list",
    "useCaseRoute": "/project/list",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project list**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/list",
          "description": "GET Project list"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/list\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-create-project",
          "module": "project",
          "title": "Create a project"
        }
      ]
    }
  },
  "project-edit-project": {
    "scenarioId": "project-edit-project",
    "title": "Edit project details",
    "module": "project",
    "useCaseId": "project-details",
    "useCaseName": "Project details",
    "useCaseRoute": "/project/details/:projectId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Project details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/details/{id}",
          "description": "GET Project details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/details/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "project.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-edit-project",
          "module": "project",
          "title": "Edit project details"
        }
      ]
    }
  },
  "project-add-deliverable": {
    "scenarioId": "project-add-deliverable",
    "title": "Add a deliverable",
    "module": "project",
    "useCaseId": "project-deliverables",
    "useCaseName": "Deliverables list",
    "useCaseRoute": "/project/deliverables/:projectId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Deliverables list**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/deliverables/{id}",
          "description": "GET Deliverables list"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/deliverables/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "task.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-add-deliverable",
          "module": "project",
          "title": "Add a deliverable"
        }
      ]
    }
  },
  "project-create-work-item": {
    "scenarioId": "project-create-work-item",
    "title": "Create a work item",
    "module": "project",
    "useCaseId": "project-workitems",
    "useCaseName": "Work items for deliverable",
    "useCaseRoute": "/project/workitems/:taskId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Work items for deliverable**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/workitems/{id}",
          "description": "GET Work items for deliverable"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/workitems/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workitem.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-create-work-item",
          "module": "project",
          "title": "Create a work item"
        }
      ]
    }
  },
  "project-update-taskboard": {
    "scenarioId": "project-update-taskboard",
    "title": "Update taskboard",
    "module": "project",
    "useCaseId": "hdr-taskboard",
    "useCaseName": "Taskboard",
    "useCaseRoute": "/project/taskboard",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Taskboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/taskboard",
          "description": "GET Taskboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/taskboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "taskboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-update-taskboard",
          "module": "project",
          "title": "Update taskboard"
        },
        {
          "id": "mobile-update-task",
          "module": "mobile",
          "title": "Update task on mobile"
        }
      ]
    }
  },
  "project-team-capacity": {
    "scenarioId": "project-team-capacity",
    "title": "Review team capacity",
    "module": "project",
    "useCaseId": "project-capacity",
    "useCaseName": "Team capacity",
    "useCaseRoute": "/project/capacity",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Team capacity**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/capacity",
          "description": "GET Team capacity"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/capacity\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-team-capacity",
          "module": "project",
          "title": "Review team capacity"
        }
      ]
    }
  },
  "project-run-report": {
    "scenarioId": "project-run-report",
    "title": "Run a project report",
    "module": "project",
    "useCaseId": "project-reports",
    "useCaseName": "Operational reports",
    "useCaseRoute": "/project/reports",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Operational reports**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/reports",
          "description": "GET Operational reports"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/reports\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "Core reporting",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-run-report",
          "module": "project",
          "title": "Run a project report"
        }
      ]
    }
  },
  "project-global-search": {
    "scenarioId": "project-global-search",
    "title": "Search across projects",
    "module": "project",
    "useCaseId": "hdr-search",
    "useCaseName": "Global search",
    "useCaseRoute": "/project/search",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Global search**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/search",
          "description": "GET Global search"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/search\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "workGraphService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-global-search",
          "module": "project",
          "title": "Search across projects"
        }
      ]
    }
  },
  "project-submit-feedback": {
    "scenarioId": "project-submit-feedback",
    "title": "Submit project feedback",
    "module": "project",
    "useCaseId": "project-feedback",
    "useCaseName": "Feedback",
    "useCaseRoute": "/project/feedback",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feedback**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/feedback",
          "description": "GET Feedback"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/feedback\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "feedback.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-submit-feedback",
          "module": "project",
          "title": "Submit project feedback"
        }
      ]
    }
  },
  "sales-create-bid": {
    "scenarioId": "sales-create-bid",
    "title": "Create a bid request",
    "module": "sales",
    "useCaseId": "fin-bids",
    "useCaseName": "Bid requests",
    "useCaseRoute": "/finance/bidrequests",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bid requests**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/bidrequests",
          "description": "GET Bid requests"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/bidrequests\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "bid.requests.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-create-bid",
          "module": "sales",
          "title": "Create a bid request"
        }
      ]
    }
  },
  "sales-edit-bid": {
    "scenarioId": "sales-edit-bid",
    "title": "Edit a bid request",
    "module": "sales",
    "useCaseId": "fin-bid-detail",
    "useCaseName": "Bid details",
    "useCaseRoute": "/finance/bidrequest/:bidRequestId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Bid details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/bidrequest/{id}",
          "description": "GET Bid details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/bidrequest/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "bid.requests.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-edit-bid",
          "module": "sales",
          "title": "Edit a bid request"
        }
      ]
    }
  },
  "sales-create-po": {
    "scenarioId": "sales-create-po",
    "title": "Create a purchase order",
    "module": "sales",
    "useCaseId": "fin-pos",
    "useCaseName": "Purchase orders",
    "useCaseRoute": "/finance/purchaseorders",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Purchase orders**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/purchaseorders",
          "description": "GET Purchase orders"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/purchaseorders\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-create-po",
          "module": "sales",
          "title": "Create a purchase order"
        },
        {
          "id": "sales-import-po-salesforce",
          "module": "sales",
          "title": "Import PO from Salesforce"
        }
      ]
    }
  },
  "sales-link-po-project": {
    "scenarioId": "sales-link-po-project",
    "title": "Link PO to project",
    "module": "sales",
    "useCaseId": "fin-po-detail",
    "useCaseName": "PO details",
    "useCaseRoute": "/finance/purchaseorder/:purchaseOrderId",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **PO details**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/purchaseorder/{id}",
          "description": "GET PO details"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/purchaseorder/{id}\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-link-po-project",
          "module": "sales",
          "title": "Link PO to project"
        }
      ]
    }
  },
  "sales-import-po-salesforce": {
    "scenarioId": "sales-import-po-salesforce",
    "title": "Import PO from Salesforce",
    "module": "sales",
    "useCaseId": "fin-pos",
    "useCaseName": "Purchase orders",
    "useCaseRoute": "/finance/purchaseorders",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Purchase orders**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/purchaseorders",
          "description": "GET Purchase orders"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/purchaseorders\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "purchaseorder.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "sales-create-po",
          "module": "sales",
          "title": "Create a purchase order"
        },
        {
          "id": "sales-import-po-salesforce",
          "module": "sales",
          "title": "Import PO from Salesforce"
        }
      ]
    }
  },
  "resources-staffing-request": {
    "scenarioId": "resources-staffing-request",
    "title": "Create staffing request",
    "module": "resources",
    "useCaseId": "res-staffing",
    "useCaseName": "Staffing requests",
    "useCaseRoute": "/resources/staffing-requests",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Staffing requests**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/staffing-requests",
          "description": "GET Staffing requests"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/staffing-requests\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "resources-staffing-request",
          "module": "resources",
          "title": "Create staffing request"
        }
      ]
    }
  },
  "resources-skills-matrix": {
    "scenarioId": "resources-skills-matrix",
    "title": "Review skills matrix",
    "module": "resources",
    "useCaseId": "res-skills",
    "useCaseName": "Skills matrix",
    "useCaseRoute": "/resources/skills",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Skills matrix**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/resources/skills",
          "description": "GET Skills matrix"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/resources/skills\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "resourcePlanningService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "resources-skills-matrix",
          "module": "resources",
          "title": "Review skills matrix"
        }
      ]
    }
  },
  "finance-view-invoice": {
    "scenarioId": "finance-view-invoice",
    "title": "View invoice",
    "module": "finance",
    "useCaseId": "fin-invoice",
    "useCaseName": "Invoices",
    "useCaseRoute": "/finance/invoice",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Invoices**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/finance/invoice",
          "description": "GET Invoices"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/finance/invoice\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "invoice.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-create-invoice",
          "module": "hrms",
          "title": "Create an invoice"
        },
        {
          "id": "finance-view-invoice",
          "module": "finance",
          "title": "View invoice"
        }
      ]
    }
  },
  "payroll-create-run": {
    "scenarioId": "payroll-create-run",
    "title": "Create payroll run",
    "module": "payroll",
    "useCaseId": "pay-runs",
    "useCaseName": "Payroll runs",
    "useCaseRoute": "/payroll/runs",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll runs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/payroll/runs",
          "description": "GET Payroll runs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/payroll/runs\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-create-run",
          "module": "payroll",
          "title": "Create payroll run"
        }
      ]
    }
  },
  "payroll-view-paycheck": {
    "scenarioId": "payroll-view-paycheck",
    "title": "View paycheck",
    "module": "payroll",
    "useCaseId": "workspace-paychecks",
    "useCaseName": "My paychecks",
    "useCaseRoute": "/workspace/my-paychecks",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **My paychecks**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/workspace/my-paychecks",
          "description": "GET My paychecks"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/workspace/my-paychecks\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payrollService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-view-paycheck",
          "module": "payroll",
          "title": "View paycheck"
        }
      ]
    }
  },
  "payroll-manage-deductions": {
    "scenarioId": "payroll-manage-deductions",
    "title": "Manage deductions",
    "module": "payroll",
    "useCaseId": "pay-deductions",
    "useCaseName": "Deductions",
    "useCaseRoute": "/payroll/deductions",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Deductions**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/payroll/deductions",
          "description": "Read Deductions"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/payroll/deductions\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payroll.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "payroll-manage-deductions",
          "module": "payroll",
          "title": "Manage deductions"
        }
      ]
    }
  },
  "performance-set-goal": {
    "scenarioId": "performance-set-goal",
    "title": "Set a performance goal",
    "module": "performance",
    "useCaseId": "perf-goals",
    "useCaseName": "Goals / OKRs",
    "useCaseRoute": "/performance/goals",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Goals / OKRs**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/goals",
          "description": "GET Goals / OKRs"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/goals\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "performance-set-goal",
          "module": "performance",
          "title": "Set a performance goal"
        }
      ]
    }
  },
  "performance-complete-review": {
    "scenarioId": "performance-complete-review",
    "title": "Complete a review",
    "module": "performance",
    "useCaseId": "perf-reviews",
    "useCaseName": "Performance reviews",
    "useCaseRoute": "/performance/reviews",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Performance reviews**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/performance/reviews",
          "description": "GET Performance reviews"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/performance/reviews\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "performanceManagementService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "performance-complete-review",
          "module": "performance",
          "title": "Complete a review"
        }
      ]
    }
  },
  "analytics-report-builder": {
    "scenarioId": "analytics-report-builder",
    "title": "Build a report",
    "module": "analytics",
    "useCaseId": "an-report-builder",
    "useCaseName": "Report builder",
    "useCaseRoute": "/analytics/report-builder",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Report builder**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/report-builder",
          "description": "GET Report builder"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/report-builder\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-report-builder",
          "module": "analytics",
          "title": "Build a report"
        }
      ]
    }
  },
  "analytics-control-tower": {
    "scenarioId": "analytics-control-tower",
    "title": "Open executive control tower",
    "module": "analytics",
    "useCaseId": "an-exec",
    "useCaseName": "Executive analytics",
    "useCaseRoute": "/analytics/executive",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Executive analytics**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/analytics/executive",
          "description": "GET Executive analytics"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/analytics/executive\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatformService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-control-tower",
          "module": "analytics",
          "title": "Open executive control tower"
        }
      ]
    }
  },
  "analytics-ai-insights": {
    "scenarioId": "analytics-ai-insights",
    "title": "Review AI insights",
    "module": "analytics",
    "useCaseId": "an-ai-insights",
    "useCaseName": "AI insights",
    "useCaseRoute": "/analytics/ai-insights",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI insights**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/analytics/platform/ai-insights",
          "description": "Read AI insights"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/analytics/platform/ai-insights\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "analyticsPlatform.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "analytics-ai-insights",
          "module": "analytics",
          "title": "Review AI insights"
        }
      ]
    }
  },
  "integrations-configure": {
    "scenarioId": "integrations-configure",
    "title": "Configure integrations",
    "module": "integrations",
    "useCaseId": "int-hub",
    "useCaseName": "Integration hub",
    "useCaseRoute": "/integrations/hub",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Integration hub**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/hub",
          "description": "GET Integration hub"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/hub\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "integrations-configure",
          "module": "integrations",
          "title": "Configure integrations"
        }
      ]
    }
  },
  "integrations-sync-health": {
    "scenarioId": "integrations-sync-health",
    "title": "Check sync health",
    "module": "integrations",
    "useCaseId": "int-sync",
    "useCaseName": "Sync monitor",
    "useCaseRoute": "/integrations/sync-health",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Sync monitor**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/integrations/sync-health",
          "description": "GET Sync monitor"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/integrations/sync-health\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "integrationCenterService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "integrations-sync-health",
          "module": "integrations",
          "title": "Check sync health"
        }
      ]
    }
  },
  "ai-agent-query": {
    "scenarioId": "ai-agent-query",
    "title": "Query AI agent",
    "module": "ai",
    "useCaseId": "ai-agents",
    "useCaseName": "AI agent registry",
    "useCaseRoute": "/ai/agents",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI agent registry**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/ai/agents",
          "description": "GET AI agent registry"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/ai/agents\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligenceService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "ai-agent-query",
          "module": "ai",
          "title": "Query AI agent"
        }
      ]
    }
  },
  "ai-audit-review": {
    "scenarioId": "ai-audit-review",
    "title": "Review AI audit",
    "module": "ai",
    "useCaseId": "ai-audit",
    "useCaseName": "AI decision audit",
    "useCaseRoute": "/ai/audit",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **AI decision audit**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/ai/work-intelligence/audit",
          "description": "Read AI decision audit"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/ai/work-intelligence/audit\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "aiWorkIntelligence.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "ai-audit-review",
          "module": "ai",
          "title": "Review AI audit"
        }
      ]
    }
  },
  "admin-role-permissions": {
    "scenarioId": "admin-role-permissions",
    "title": "Configure role permissions",
    "module": "admin",
    "useCaseId": "adm-roles",
    "useCaseName": "Roles & permissions",
    "useCaseRoute": "/admin/roles",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Roles & permissions**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/roles",
          "description": "GET Roles & permissions"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/roles\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "rolePermissionService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-role-permissions",
          "module": "admin",
          "title": "Configure role permissions"
        }
      ]
    }
  },
  "admin-persona-navigation": {
    "scenarioId": "admin-persona-navigation",
    "title": "Configure persona navigation",
    "module": "admin",
    "useCaseId": "adm-org",
    "useCaseName": "Org structure",
    "useCaseRoute": "/admin/org-structure",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Org structure**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/org-structure",
          "description": "GET Org structure"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/org-structure\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "orgStructureService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-persona-navigation",
          "module": "admin",
          "title": "Configure persona navigation"
        }
      ]
    }
  },
  "admin-delegation-rules": {
    "scenarioId": "admin-delegation-rules",
    "title": "Configure delegation rules",
    "module": "admin",
    "useCaseId": "adm-delegation",
    "useCaseName": "Delegation rules",
    "useCaseRoute": "/admin/delegation",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Delegation rules**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/delegation",
          "description": "GET Delegation rules"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/delegation\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "approvalDelegationService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-delegation-rules",
          "module": "admin",
          "title": "Configure delegation rules"
        }
      ]
    }
  },
  "admin-audit-review": {
    "scenarioId": "admin-audit-review",
    "title": "Review admin audit",
    "module": "admin",
    "useCaseId": "adm-audit",
    "useCaseName": "Audit & compliance",
    "useCaseRoute": "/admin/audit",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Audit & compliance**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/audit",
          "description": "GET Audit & compliance"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/audit\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "auditService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-audit-review",
          "module": "admin",
          "title": "Review admin audit"
        }
      ]
    }
  },
  "admin-feature-flags": {
    "scenarioId": "admin-feature-flags",
    "title": "Toggle feature flags",
    "module": "admin",
    "useCaseId": "adm-flags",
    "useCaseName": "Feature flags",
    "useCaseRoute": "/admin/feature-flags",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Feature flags**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/admin/feature-flags",
          "description": "GET Feature flags"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/admin/feature-flags\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "featureFlagService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-feature-flags",
          "module": "admin",
          "title": "Toggle feature flags"
        }
      ]
    }
  },
  "admin-notification-templates": {
    "scenarioId": "admin-notification-templates",
    "title": "Configure notification templates",
    "module": "admin",
    "useCaseId": "adm-notif-templates",
    "useCaseName": "Notification templates",
    "useCaseRoute": "/admin/notification-templates",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Notification templates**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/workspace/notification-templates",
          "description": "Read Notification templates"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/workspace/notification-templates\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "notificationTemplate.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-notification-templates",
          "module": "admin",
          "title": "Configure notification templates"
        }
      ]
    }
  },
  "admin-payroll-config": {
    "scenarioId": "admin-payroll-config",
    "title": "Configure payroll",
    "module": "admin",
    "useCaseId": "adm-payroll-config",
    "useCaseName": "Payroll configuration",
    "useCaseRoute": "/admin/payroll-config",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Payroll configuration**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/payroll/config",
          "description": "Read Payroll configuration"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/payroll/config\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "payroll.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-payroll-config",
          "module": "admin",
          "title": "Configure payroll"
        }
      ]
    }
  },
  "admin-dashboard": {
    "scenarioId": "admin-dashboard",
    "title": "Review admin dashboard",
    "module": "admin",
    "useCaseId": "adm-dashboard",
    "useCaseName": "Admin dashboard",
    "useCaseRoute": "/admin/dashboard",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Admin dashboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/api/v2/admin/insights (reuse)",
          "description": "Read Admin dashboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/api/v2/admin/insights (reuse)\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "adminInsights.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "admin-dashboard",
          "module": "admin",
          "title": "Review admin dashboard"
        }
      ]
    }
  },
  "mobile-login": {
    "scenarioId": "mobile-login",
    "title": "Sign in on mobile",
    "module": "mobile",
    "useCaseId": "auth-login",
    "useCaseName": "Login",
    "useCaseRoute": "/user/login",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Login**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Public (no Bearer token)",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "description": "POST Login"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token.\nexport API_BASE=\"https://api.example.tracopus.com\"\ncurl -sS -X POST \"${API_BASE}/api/v2/user/login\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ }'",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows).",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "user.service",
          "note": "Frontend service module used by the UI"
        }
      ],
      "relatedScenarios": [
        {
          "id": "auth-login-email",
          "module": "auth",
          "title": "Sign in with email and password"
        },
        {
          "id": "auth-login-sso",
          "module": "auth",
          "title": "Sign in with Microsoft Entra ID (SSO)"
        },
        {
          "id": "mobile-login",
          "module": "mobile",
          "title": "Sign in on mobile"
        }
      ]
    }
  },
  "mobile-log-timesheet": {
    "scenarioId": "mobile-log-timesheet",
    "title": "Log timesheet on mobile",
    "module": "mobile",
    "useCaseId": "people-timesheet",
    "useCaseName": "Timesheets",
    "useCaseRoute": "/people/timesheet",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Timesheets**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/people/timesheet",
          "description": "GET Timesheets"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/people/timesheet\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "timesheetApprovalService",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        },
        {
          "method": "GET",
          "path": "/api/v2/timesheet/week",
          "note": "Week staging / entries before submit or approve"
        }
      ],
      "relatedScenarios": [
        {
          "id": "hrms-log-timesheet",
          "module": "hrms",
          "title": "Log timesheet hours"
        },
        {
          "id": "hrms-submit-timesheet",
          "module": "hrms",
          "title": "Submit a timesheet week"
        },
        {
          "id": "hrms-approve-timesheet",
          "module": "hrms",
          "title": "Approve a timesheet"
        },
        {
          "id": "mobile-log-timesheet",
          "module": "mobile",
          "title": "Log timesheet on mobile"
        }
      ]
    }
  },
  "mobile-update-task": {
    "scenarioId": "mobile-update-task",
    "title": "Update task on mobile",
    "module": "mobile",
    "useCaseId": "hdr-taskboard",
    "useCaseName": "Taskboard",
    "useCaseRoute": "/project/taskboard",
    "apiDocumentation": {
      "overview": "HTTP APIs backing **Taskboard**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.",
      "baseUrlHint": "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
      "auth": "Bearer token or session cookie from login",
      "endpoints": [
        {
          "method": "GET",
          "path": "/project/taskboard",
          "description": "GET Taskboard"
        }
      ],
      "sampleCurl": "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.\nexport API_BASE=\"https://api.example.tracopus.com\"\nexport TOKEN=\"<session-or-bearer-token>\"\ncurl -sS -X GET \"${API_BASE}/project/taskboard\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer ${TOKEN}\"",
      "howToUse": [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
      ],
      "relatedApis": [
        {
          "method": "—",
          "path": "taskboard.service",
          "note": "Frontend service module used by the UI"
        },
        {
          "method": "POST",
          "path": "/api/v2/user/login",
          "note": "Obtain session/token before calling protected APIs"
        }
      ],
      "relatedScenarios": [
        {
          "id": "project-update-taskboard",
          "module": "project",
          "title": "Update taskboard"
        },
        {
          "id": "mobile-update-task",
          "module": "mobile",
          "title": "Update task on mobile"
        }
      ]
    }
  }
}
  };
})(typeof window !== 'undefined' ? window : global);
