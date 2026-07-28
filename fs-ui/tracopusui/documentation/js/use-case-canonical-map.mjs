/**
 * Canonical source mapping for use-case catalog and test plan.
 * Maps pages to backend endpoints, services, entities, and verification status.
 */

import { V6H_PLANNED_PAGES, V6H_PAGE_IDS } from "./v6h-planned-pages-config.mjs";

/** Shadow / invalid isolated tables — must NOT receive writes from this page */
export const FORBIDDEN_SHADOW_TABLES = [
  "ts_my_work_queue",
  "ts_approval_inbox_shadow",
  "ts_admin_role_shadow",
  "ts_skill_matrix_duplicate",
  "ts_analytics_org_unit_rows",
  "ts_capacity_snapshot_isolated",
  "ts_finance_snapshot_isolated",
  "ts_portfolio_whatif_contamination",
  "ts_work_graph_metadata_raw",
];

/** Pages that must never show generic Create/Add workflows */
export const NON_CREATABLE_IDS = new Set([
  "auth-login",
  "auth-forgot",
  "auth-activate",
  "auth-changepwd",
  "auth-error500",
  "hdr-search",
  "hdr-settings",
  "hdr-profile",
  "hdr-today",
  "doc-invoice",
  "doc-feedback-req",
  "doc-feedback-tpl",
  "doc-feedback",
]);

const LIVE_BACKEND = new Set([
  "auth-login",
  "auth-forgot",
  "hrms-submit-timesheet",
  "hrms-approve-timesheet",
  "project-list",
  "project-milestones",
  "project-risks",
  "project-issues",
  "workspace-approvals",
  "workspace-mywork",
  "sales-bids",
  "sales-po",
]);

/** Explicit canonical overrides keyed by use-case id */
export const CANONICAL_OVERRIDES = {
  "auth-login": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "POST /api/v2/user/login",
    frontendService: "user.service.js",
    controllerService: "UserController / AuthenticationService",
    canonicalSourceEntities: ["EmployeeModel (credentials)", "Application Config (org.json SSO flags)"],
    allowedTables: ["fs_employee", "fs_user_session"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "ssoEnabled / localAuthEnabled in Application Config",
    personaScope: "PUBLIC — unauthenticated",
    auditRequirement: "Login attempt audit; no PII in client logs",
  },
  "auth-forgot": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "POST /api/v2/user/forgotpassword",
    frontendService: "user.service.js",
    controllerService: "UserController",
    canonicalSourceEntities: ["EmployeeModel.email"],
    allowedTables: ["fs_employee", "fs_password_reset_token"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "passwordResetEnabled",
    personaScope: "PUBLIC — unauthenticated",
    auditRequirement: "Reset request logged; token single-use",
  },
  "auth-activate": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "POST /api/v2/user/activateaccount/{activationKey}/{employeeId}/{uniqueId}",
    frontendService: "user.service.js",
    controllerService: "UserController",
    canonicalSourceEntities: ["EmployeeModel", "activation token"],
    allowedTables: ["fs_employee", "fs_activation_token"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "employeeProvisioningEnabled",
    personaScope: "Token holder — no prior session",
    auditRequirement: "Activation event + employee status ACTIVE",
  },
  "auth-changepwd": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "POST /api/v2/user/changepassword/{activationKey}/{employeeId}/{uniqueId}",
    frontendService: "user.service.js",
    controllerService: "UserController",
    canonicalSourceEntities: ["EmployeeModel", "password reset token"],
    allowedTables: ["fs_employee", "fs_password_reset_token"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "passwordResetEnabled",
    personaScope: "Valid token holder — no authenticated session required",
    auditRequirement: "Password change audit; invalidate prior tokens",
  },
  "auth-error500": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "N/A — static error route /error/error500",
    frontendService: "error boundary / ErrorPage",
    controllerService: "Global exception handler",
    canonicalSourceEntities: [],
    allowedTables: [],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "none",
    personaScope: "Any user hitting unrecoverable server error",
    auditRequirement: "Server-side error log; no sensitive payload in UI",
  },
  "workspace-mywork": {
    verificationStatus: "CODE_PATH_VERIFIED",
    backendEndpoint: "GET /api/v2/workspace/my-work",
    frontendService: "workspaceService.js",
    controllerService: "WorkspaceController → TaskModel + approvals rollup",
    canonicalSourceEntities: ["TaskModel", "TaskActivityModel", "UniversalApprovalService"],
    allowedTables: ["fs_task", "fs_task_activity", "fs_approval_request"],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, "ts_my_work_queue"],
    featureFlag: "workspaceModules.myWorkEnabled",
    personaScope: "Authenticated employee — own scope",
    auditRequirement: "Read-only aggregate; writes go to source modules",
  },
  "workspace-approvals": {
    verificationStatus: "LIVE_BACKEND_VERIFIED",
    backendEndpoint: "GET /api/v2/approvals/inbox",
    frontendService: "universalApprovalService.js",
    controllerService: "UniversalApprovalService / ApprovalAuthorityService",
    canonicalSourceEntities: ["Approval request records sourced from timesheet, leave, attendance, payroll"],
    allowedTables: ["fs_approval_request", "fs_timesheet", "fs_leave_request"],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, "ts_approval_inbox_shadow"],
    featureFlag: "workspaceModules.approvalsEnabled",
    personaScope: "Manager, HR_ADMIN, PAYROLL_MANAGER, FINANCE_MANAGER per delegation",
    auditRequirement: "Approve/reject writes source entity + audit trail",
  },
  "project-portfolio": {
    verificationStatus: "CODE_PATH_VERIFIED",
    backendEndpoint: "GET /api/v2/portfolio/control-tower",
    frontendService: "portfolioControlTowerService.js",
    controllerService: "PortfolioControlTowerService → ProjectModel rollups",
    canonicalSourceEntities: ["ProjectModel", "PurchaseOrderModel (linked)"],
    allowedTables: ["fs_project", "fs_purchase_order"],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, "ts_portfolio_whatif_contamination"],
    featureFlag: "projectModules.portfolioEnabled",
    personaScope: "PROJECT_MANAGER, RESOURCE_MANAGER, FINANCE_MANAGER, EXECUTIVE",
    auditRequirement: "What-if scenarios must not persist as production truth",
  },
  "fin-proposal-lifecycle": {
    verificationStatus: "CODE_PATH_VERIFIED",
    backendEndpoint: "GET/POST /api/v2/proposals, PATCH submit/approve/accept, POST convert-to-project",
    frontendService: "proposalService.js (planned), bid.requests.service.js (current intake)",
    controllerService: "ProposalController → BidRequestModel / PurchaseOrderModel / ProjectModel",
    canonicalSourceEntities: ["BidRequestModel", "PurchaseOrderModel", "ProjectModel", "TaskModel", "Document Vault"],
    allowedTables: ["fs_bid_request", "fs_purchase_order", "fs_project", "fs_task", "ts_proposal", "ts_estimate_version", "ts_estimate_line"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "commercialModules.proposalEnabled (V6F-EA39)",
    personaScope: "FINANCE_MANAGER, SALES, PROJECT_MANAGER",
    auditRequirement: "Proposal approval + conversion audit; estimate-vs-actual from TaskActivityModel",
  },
  "fin-revenue-recognition": {
    verificationStatus: "CODE_PATH_VERIFIED",
    backendEndpoint: "GET /api/v2/project-billing/revenue-recognition?projectId=&period=",
    frontendService: "projectBillingService.js (planned)",
    controllerService: "ProjectBillingController → PO + Project + invoice lines",
    canonicalSourceEntities: ["PurchaseOrderModel", "ProjectModel", "approved TaskActivityModel", "milestone gates"],
    allowedTables: ["fs_purchase_order", "fs_project", "fs_task_activity", "ts_project_billing_plan", "ts_revenue_recognition_event"],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, "ts_finance_snapshot_isolated", "fs_hrms_invoice (platform billing — not project revenue)"],
    featureFlag: "commercialModules.revenueRecognitionEnabled (V6F-EA38)",
    personaScope: "FINANCE_MANAGER, EXECUTIVE",
    auditRequirement: "Recognition events linked to invoice line + period; no platform invoice reuse",
  },
  "project-npd-lifecycle": {
    verificationStatus: "DEFERRED",
    backendEndpoint: "(planned — no NPD lifecycle controller; W14 DEFER)",
    frontendService: "(not shipped — no production route/menu)",
    controllerService: "(not shipped)",
    canonicalSourceEntities: ["ProjectModel (future projectType=NPD)", "TaskModel", "TaskActivityModel"],
    allowedTables: ["fs_project", "fs_task", "fs_task_activity"],
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: "projectModules.npdEnabled (not enabled — W14 DEFER)",
    personaScope: "PROJECT_MANAGER, NPD lead, EXECUTIVE",
    auditRequirement: "N/A until shipped — do not sell or QA as live",
  },
  "project-dossier": {
    verificationStatus: "DEFERRED",
    backendEndpoint: "(planned — no DossierController; Document Vault filemanager is separate)",
    frontendService: "(not shipped — dossierService.js absent)",
    controllerService: "(not shipped)",
    canonicalSourceEntities: ["ProjectModel", "Document Vault (filemanager — not dossier package)"],
    allowedTables: ["fs_document"],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, "ts_dossier (not created)", "ts_dossier_section", "ts_dossier_baseline"],
    featureFlag: "projectModules.dossierEnabled (not enabled — W14 DEFER)",
    personaScope: "PROJECT_MANAGER, compliance reviewer, document controller",
    auditRequirement: "N/A until shipped — do not sell or QA as live",
  },
};

/** V6H planned pages — canonical mapping from scope completion plan */
V6H_PAGE_IDS.forEach((id) => {
  const p = V6H_PLANNED_PAGES[id];
  const shipped = p.productionStatus === "SHIPPED";
  CANONICAL_OVERRIDES[id] = {
    verificationStatus: shipped ? "CODE_PATH_VERIFIED" : "PLANNED",
    backendEndpoint: p.api,
    frontendService: p.frontendService,
    controllerService: p.controllerService,
    canonicalSourceEntities: Array.isArray(p.canonicalSourceEntities) ? p.canonicalSourceEntities : [p.canonicalSourceEntities],
    allowedTables: Array.isArray(p.allowedTables) ? p.allowedTables : [p.allowedTables],
    forbiddenTables: [...FORBIDDEN_SHADOW_TABLES, ...(Array.isArray(p.forbiddenTables) ? p.forbiddenTables : [p.forbiddenTables])],
    featureFlag: p.featureFlag,
    personaScope: p.personaScope,
    teamScopeRule: p.teamScopeRule,
    auditRequirement: p.auditRequirement,
    notificationRequirement: p.notificationRequirement,
    automationStatus: p.automationStatus,
    productionStatus: p.productionStatus,
    v6hTaskId: p.taskId,
    v6hSprint: p.sprint,
    v6hPriority: p.priority,
    testId: p.testId,
    evidencePath: p.evidencePath,
    playwrightSpec: p.playwrightSpec,
  };
});

/** HRMS + Project verification overrides (keys match use-case page ids) */
export const VERIFICATION_OVERRIDES = {
  "people-timesheet": [
    "Hours saved against TaskActivityModel linked to valid TaskModel/deliverable",
    "No write to ts_my_work_queue or shadow tables",
    "Submit transitions status DRAFT → SUBMITTED with audit event",
    "Manager sees pending item in Universal Approval inbox — not ts_approval_inbox_shadow",
    "Approved hours visible in payroll validation when period closed",
  ],
  "people-employees": [
    "Employee row created in fs_employee with org unit",
    "Activation email triggered; no orphan user without employee",
    "Skills stored in canonical skill assignment — not ts_skill_matrix_duplicate",
    "Persona masking hides salary/bank from unauthorized roles",
  ],
  "people-leaves": [
    "Leave balance read from canonical leave service",
    "Leave request creates fs_leave_request; approval via universal inbox",
    "Approved leave reflected in calendar and capacity views",
  ],
  "people-attendance": [
    "Attendance mark creates canonical attendance record",
    "Manager approval updates source row — not shadow approval table",
  ],
  "workspace-approvals": [
    "Approval writes source entity via ApprovalAuthorityService",
    "No duplicate approval possible",
    "Notification sent on approve/reject",
  ],
  "project-list": [
    "Project list reads fs_project with team scope filter",
    "Create project writes ProjectModel with account/PO link when required",
    "proposalNumber field maps to project attribute — not isolated proposal store for list-only",
  ],
  "project-milestones": [
    "Milestone requires projectId on ProjectModel",
    "Gate validation blocks deliverable when configured",
    "Timeline/Gantt reflects milestone from canonical project schedule",
  ],
  "project-risks": [
    "Risk record requires projectId; severity/status enums enforced",
    "Distinct from Issues — risk = future uncertainty",
    "No write to isolated risk shadow table",
  ],
  "project-issues": [
    "Issue record requires projectId; linked actions as child records",
    "PMI distinction: issue = occurred event",
    "Project closure blocked when open issues remain",
  ],
  "project-deliverables": [
    "Deliverable list reads TaskModel for projectId",
    "Create deliverable writes TaskModel not duplicate deliverable table",
  ],
  "project-capacity": [
    "Capacity reads Employee allocations + TaskModel hours",
    "Snapshot views read-only — no write to ts_capacity_snapshot_isolated",
    "Team scope enforced per role.json",
  ],
  "project-reports": [
    "Report data sourced from TaskActivityModel and ProjectModel rollups",
    "Export respects persona masking on salary/PII columns",
    "Weekly PO Estimation reads PO + project estimation — not finance snapshot table",
  ],
  "project-dashboard": [
    "KPIs aggregate live TaskModel/ProjectModel — not mock dashboard store",
    "Personal vs team scope switches data boundary correctly",
  ],
  "project-portfolio": [
    "Health scores roll up from live ProjectModel",
    "What-if scenario page does not persist scenario as production project state",
  ],
  "adm-notif-templates": [
    "API returns 403 when isWorkspaceNotificationsEnabled() is false",
    "Template preview masks sensitive placeholders",
    "Notification delivery/read-state separate from template config",
  ],
  "people-holidays": [
    "Leave duration calculation excludes holiday dates",
    "Timesheet/attendance calendar marks holidays",
    "Payroll readiness respects holiday logic",
    "No duplicate isolated holiday source",
  ],
  "pay-deductions": [
    "Deduction appears in payroll run preview and paycheck lines",
    "Locked payroll run requires reversal not destructive edit",
  ],
  "adm-payroll-config": [
    "Payroll run blocked if mandatory config missing",
    "Config changes audited; non-admin cannot mutate",
  ],
  "an-ai-insights": [
    "Insight payload includes sourceEntityType and sourceEntityId",
    "Cross-team insights blocked; sensitive fields masked",
  ],
  "ai-audit": [
    "Raw sensitive prompt data not persisted or displayed",
    "Export is masked; source entity and actor on each record",
  ],
  "adm-dashboard": [
    "Dashboard loads live KPIs from existing services",
    "Quick links route to real shipped pages only",
    "Non-admin blocked",
  ],
};

export const COMMON_MISTAKES_OVERRIDES = {
  "people-timesheet": [
    "Logging hours without assigned task/deliverable — link TaskActivity to valid taskId",
    "Using wrong week boundary — confirm timesheet period config in Application Config",
    "Expecting manager approval before submit — must Submit first",
    "Treating My Work as write target — timesheet writes go to fs_task_activity/fs_timesheet",
  ],
  "people-employees": [
    "Creating employee without org unit — required for scope and approvals",
    "Expecting manager to see unmasked salary — check persona masking policy",
  ],
  "project-milestones": [
    "Creating milestone without projectId — governance records require project context",
    "Confusing milestone with deliverable — milestones are schedule control points",
  ],
  "project-risks": [
    "Recording occurred problems as risks — use Issues for events that happened",
    "Missing projectId — all governance records require project linkage",
  ],
  "project-issues": [
    "Closing issue without resolution notes when policy requires",
    "Creating issue without owner — assign owner for accountability",
  ],
  "project-portfolio": [
    "Treating what-if scenario results as committed portfolio state",
    "Feature flag portfolioEnabled off — menu hidden entirely",
  ],
  "workspace-mywork": [
    "Expecting My Work to be writable truth store — it aggregates Task/approval sources",
    "Stale queue after approval — refresh; data sourced from canonical services",
  ],
  "adm-notif-templates": [
    "Storing notification delivery/read-state in template table — templates are config only",
    "Allowing unmasked salary/bank/tax/performance placeholders in preview",
    "Shipping page without isWorkspaceNotificationsEnabled() guard",
  ],
  "people-holidays": [
    "Creating duplicate holiday in isolated table — use org calendar config",
    "Employee attempting to mutate holidays — HR admin only",
    "Ignoring downstream leave/timesheet/payroll calendar impact after import",
  ],
  "pay-deductions": [
    "Destructive edit on locked payroll run — use reversal workflow",
    "Duplicate employee finance truth instead of payroll child deduction record",
  ],
  "adm-payroll-config": [
    "Non-admin mutating payroll config — admin/payroll manager only",
    "Starting payroll run with missing mandatory config",
  ],
  "an-ai-insights": [
    "Treating AI insight cards as source truth — always drill to sourceEntity",
    "Expecting cross-team insights without scope permission",
  ],
  "ai-audit": [
    "Expecting raw sensitive prompt text in audit export — masked only",
    "Cross-team audit access without admin/security persona",
  ],
  "adm-dashboard": [
    "Expecting new admin dashboard truth table — KPIs compose from live services",
    "Showing planned-only quick links as shipped routes",
  ],
};

function inferFromPage(page) {
  const svc = page.relatedServices || "domain.service";
  const mod = page.module;
  const isPlanned = page.status === "Planned" || page.verificationStatus === "PLANNED";
  const route = page.route || "";

  let verificationStatus = "CODE_PATH_VERIFIED";
  if (isPlanned) verificationStatus = "PLANNED";
  else if (LIVE_BACKEND.has(page.id)) verificationStatus = "LIVE_BACKEND_VERIFIED";
  else if (page.feature?.startsWith("F") && page.status === "Planned") verificationStatus = "PLANNED";

  let backendEndpoint = `GET ${route.replace(/:[^/]+/g, "{id}")}`;
  if (/login/i.test(page.id)) backendEndpoint = "POST /api/v2/user/login";
  if (/timesheet/i.test(page.id) && /submit/i.test(page.id)) backendEndpoint = "POST /api/v2/timesheet/submit";
  if (/approv/i.test(page.id)) backendEndpoint = "PATCH /api/v2/approvals/{id}/approve";

  const entityMap = {
    Projects: ["ProjectModel", "TaskModel", "TaskActivityModel"],
    HRMS: ["EmployeeModel", "TimesheetModel", "LeaveModel", "AttendanceModel"],
    Workspace: ["EmployeeModel", "TaskModel", "ApprovalAuthorityService"],
    "Sales & Contracts": ["BidRequestModel", "PurchaseOrderModel"],
    Finance: ["PurchaseOrderModel", "InvoiceModel (platform HRMS billing)"],
    Analytics: ["read models from canonical services"],
    Authentication: ["EmployeeModel", "User session"],
  };

  return {
    verificationStatus,
    backendEndpoint,
    frontendService: `${svc}.js`,
    controllerService: `${svc} (backend domain service)`,
    canonicalSourceEntities: entityMap[mod] || ["EmployeeModel", "ProjectModel", "Application Config"],
    allowedTables: inferAllowedTables(mod, page.id),
    forbiddenTables: FORBIDDEN_SHADOW_TABLES,
    featureFlag: page.featureFlags || `${mod} module flags in Application Config`,
    personaScope: (page.personas || []).join(", ") || "See role.json permissions",
    auditRequirement: isPlanned
      ? "OUT_OF_SCOPE until feature ships — no production audit required"
      : "Domain audit trail on create/update/approve; persona masking on sensitive reads",
  };
}

function inferAllowedTables(mod, id) {
  const base = {
    Projects: ["fs_project", "fs_task", "fs_task_activity"],
    HRMS: ["fs_employee", "fs_timesheet", "fs_task_activity", "fs_leave_request"],
    Workspace: ["fs_task", "fs_approval_request"],
    "Sales & Contracts": ["fs_bid_request", "fs_purchase_order"],
  }[mod] || ["fs_employee", "fs_project"];
  if (/milestone|risk|issue|lesson/i.test(id)) return [...base, "fs_governance_record"];
  return base;
}

export function isNonCreatablePage(page) {
  if (NON_CREATABLE_IDS.has(page.id)) return true;
  if (page.status === "Planned" || page.verificationStatus === "PLANNED") return true;
  if (page.module === "Authentication") return true;
  if (page.module === "Document (public)") return true;
  const name = page.pageName || "";
  const route = page.route || "";
  if (/dashboard|control tower|insights|utilization|forecast|audit trail|my paychecks/i.test(name)) return true;
  if (/analytics/i.test(page.module) && !/builder|create|config/i.test(name)) return true;
  if (/error|login|forgot|activate|changepassword/i.test(route)) return true;
  return false;
}

export function enrichCanonical(page) {
  const override = CANONICAL_OVERRIDES[page.id] || {};
  const inferred = inferFromPage(page);
  const merged = { ...inferred, ...override, ...(page.canonical || {}) };
  if (V6H_PLANNED_PAGES[page.id]) {
    const v6h = V6H_PLANNED_PAGES[page.id];
    const shipped = page.status === "Shipped" || v6h.productionStatus === "SHIPPED";
    merged.productionStatus = shipped ? "SHIPPED" : "PLANNED";
    merged.verificationStatus = shipped ? "CODE_PATH_VERIFIED" : "PLANNED";
  }
  return merged;
}

export function getVerificationStatus(page) {
  const c = enrichCanonical(page);
  if (page.status === "Planned") return "PLANNED";
  return c.verificationStatus || "CODE_PATH_VERIFIED";
}

/** Global regression tests for historical isolation risks */
export function getGlobalRegressionTests() {
  return [
    {
      id: "global-reg-shadow-my-work",
      useCaseId: "workspace-mywork",
      useCaseName: "My work",
      module: "Cross-cutting",
      route: "/workspace/my-work",
      feature: "F21",
      title: "[Regression] My Work must not write ts_my_work_queue shadow table",
      type: "regression",
      priority: "P0",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "My Work is a read aggregate from TaskModel and approvals — never an independent truth store.",
      prerequisites: ["DB query access on staging", "Employee with tasks and pending approvals"],
      steps: [
        "Complete action from My Work link (open task, approve item).",
        "Verify write lands on fs_task / fs_approval_request / fs_timesheet.",
        "Query ts_my_work_queue — must remain empty or read-only cache without business writes.",
        "Compare API payload sourceEntity references to canonical IDs.",
      ],
      expectedResult: "No INSERT/UPDATE to ts_my_work_queue during normal My Work workflows.",
      expectedBehavior: "Workspace service reads canonical sources only per domain source rule.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/workspace/my-work",
        sourceEntity: "TaskModel + UniversalApprovalService",
        expectedDbUpdate: "fs_task or fs_approval_request only — NOT ts_my_work_queue",
        auditEvent: "workspace.mywork.read",
        notificationEvent: "none on read",
        forbiddenShadowTable: "ts_my_work_queue",
      },
    },
    {
      id: "global-reg-shadow-approval",
      useCaseId: "workspace-approvals",
      useCaseName: "My approvals",
      module: "Cross-cutting",
      route: "/workspace/approvals",
      feature: "F07",
      title: "[Regression] Approval inbox must not use ts_approval_inbox_shadow",
      type: "regression",
      priority: "P0",
      verificationStatus: "LIVE_BACKEND_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Universal approval inbox reads/writes ApprovalAuthorityService source records.",
      prerequisites: ["Pending timesheet or leave approval", "Manager persona"],
      steps: [
        "Approve item from Workspace → My approvals.",
        "Verify fs_approval_request and source entity (fs_timesheet) updated.",
        "Confirm ts_approval_inbox_shadow has no new rows.",
      ],
      expectedResult: "Approval state change on canonical tables only.",
      expectedBehavior: "ApprovalAuthorityService delegation respected; audit on approve.",
      backendValidation: {
        apiEndpoint: "PATCH /api/v2/approvals/{id}/approve",
        sourceEntity: "ApprovalAuthorityService → source timesheet/leave record",
        expectedDbUpdate: "fs_timesheet.status=APPROVED or fs_leave_request.status=APPROVED",
        auditEvent: "approval.approved",
        notificationEvent: "workspace.notification.approval_complete",
        forbiddenShadowTable: "ts_approval_inbox_shadow",
      },
    },
    {
      id: "global-reg-admin-role-shadow",
      useCaseId: "adm-roles",
      useCaseName: "Roles & permissions",
      module: "Administration",
      route: "/admin/roles",
      feature: "F20",
      title: "[Regression] Role changes must not write ts_admin_role_shadow",
      type: "regression",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "RBAC changes persist to Application Config / role.json canonical path.",
      prerequisites: ["ADMIN persona", "Non-production org unit"],
      steps: [
        "Toggle a permission flag for test role.",
        "Save Application Config.",
        "Verify role.json or fs_role_permission updated.",
        "Confirm ts_admin_role_shadow unchanged.",
      ],
      expectedResult: "Permission change effective via canonical config store.",
      expectedBehavior: "Menu access reflects on reload; no shadow role table writes.",
      backendValidation: {
        apiEndpoint: "PATCH /api/v2/admin/roles/{roleId}",
        sourceEntity: "Application Config role.json",
        expectedDbUpdate: "role permission record in canonical config",
        auditEvent: "admin.role.permission_changed",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_admin_role_shadow",
      },
    },
    {
      id: "global-reg-skill-duplicate",
      useCaseId: "people-employees",
      useCaseName: "Employees",
      module: "Cross-cutting",
      route: "/people/employees",
      feature: "Existing",
      title: "[Regression] Employee skills must not duplicate ts_skill_matrix_duplicate",
      type: "regression",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Skills on employee profile use canonical skill assignment tables.",
      prerequisites: ["HR_ADMIN", "Test employee"],
      steps: [
        "Add skill to employee profile.",
        "Verify canonical fs_employee_skill or equivalent updated.",
        "Query ts_skill_matrix_duplicate — no write.",
      ],
      expectedResult: "Single skill truth for staffing matrix and employee 360.",
      expectedBehavior: "Skills matrix reads same canonical assignment.",
      backendValidation: {
        apiEndpoint: "POST /api/v2/employee/{id}/skills",
        sourceEntity: "EmployeeModel skill assignment",
        expectedDbUpdate: "fs_employee_skill row",
        auditEvent: "employee.skill.updated",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_skill_matrix_duplicate",
      },
    },
    {
      id: "global-reg-analytics-org-unit",
      useCaseId: "an-exec-tower",
      useCaseName: "Executive control tower",
      module: "Cross-cutting",
      route: "/analytics/executive-control-tower",
      feature: "F17",
      title: "[Regression] Analytics must not persist ts_analytics_org_unit_rows as truth",
      type: "regression",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Analytics dashboards read rollups from canonical services — not isolated ORG_UNIT store.",
      prerequisites: ["EXECUTIVE persona", "Multi org-unit data"],
      steps: [
        "Change source project status in Projects module.",
        "Refresh analytics dashboard.",
        "Verify KPI reflects change from ProjectModel rollup.",
        "Confirm ts_analytics_org_unit_rows not written as authoritative source.",
      ],
      expectedResult: "Dashboard reflects live canonical data after refresh.",
      expectedBehavior: "Read models may cache but cannot be sole write target for business truth.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/analytics/executive-control-tower",
        sourceEntity: "ProjectModel + EmployeeModel rollups",
        expectedDbUpdate: "none on read; source change on fs_project",
        auditEvent: "analytics.dashboard.view",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_analytics_org_unit_rows",
      },
    },
    {
      id: "global-reg-capacity-snapshot",
      useCaseId: "project-capacity",
      useCaseName: "Team capacity",
      module: "Cross-cutting",
      route: "/project/capacity",
      feature: "F13",
      title: "[Regression] Capacity view must not write ts_capacity_snapshot_isolated",
      type: "regression",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Capacity planning reads allocations; snapshots are read-only exports.",
      prerequisites: ["RESOURCE_MANAGER", "Project with team allocations"],
      steps: [
        "Open Team capacity roster/Gantt.",
        "Adjust allocation via canonical staffing flow (not snapshot table).",
        "Verify fs_project_member or allocation source updated.",
        "ts_capacity_snapshot_isolated remains read-only.",
      ],
      expectedResult: "Staffing changes persist to canonical allocation entities.",
      expectedBehavior: "Gantt reflects Employee–Project allocation truth.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/resource-planning/capacity",
        sourceEntity: "EmployeeModel + ProjectModel allocations",
        expectedDbUpdate: "allocation source table on staffing change",
        auditEvent: "capacity.allocation.changed",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_capacity_snapshot_isolated",
      },
    },
    {
      id: "global-reg-finance-snapshot",
      useCaseId: "fin-invoices",
      useCaseName: "Finance invoices",
      module: "Cross-cutting",
      route: "/finance/invoices",
      feature: "F14",
      title: "[Regression] Finance views must not write ts_finance_snapshot_isolated",
      type: "regression",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Finance dashboards read PO/project billing sources — snapshots are not truth.",
      prerequisites: ["FINANCE_MANAGER", "Linked PO and project"],
      steps: [
        "Update PO amount in Sales module.",
        "Refresh finance invoice/billing view.",
        "Verify roll-up from PurchaseOrderModel.",
        "No write to ts_finance_snapshot_isolated as authoritative store.",
      ],
      expectedResult: "Financial figures match canonical PO/project billing.",
      expectedBehavior: "Project revenue distinct from platform HRMS subscription invoices.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/finance/invoices",
        sourceEntity: "PurchaseOrderModel + project billing",
        expectedDbUpdate: "fs_purchase_order on PO edit",
        auditEvent: "finance.invoice.view",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_finance_snapshot_isolated",
      },
    },
    {
      id: "global-reg-whatif-contamination",
      useCaseId: "project-portfolio-scenarios",
      useCaseName: "Portfolio scenarios",
      module: "Cross-cutting",
      route: "/project/portfolio/scenarios",
      feature: "F16",
      title: "[Regression] Portfolio what-if must not contaminate production ProjectModel",
      type: "regression",
      priority: "P0",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "What-if scenarios are simulation only — must not persist as live project state.",
      prerequisites: ["portfolioEnabled", "Multiple active projects"],
      steps: [
        "Run what-if scenario with staffing/timeline change.",
        "Save simulation (if UI allows).",
        "Verify fs_project rows unchanged for production projects.",
        "Simulation stored in ts_portfolio_scenario read model only — not ts_portfolio_whatif_contamination as truth.",
      ],
      expectedResult: "Production project dates/status unchanged after what-if.",
      expectedBehavior: "Portfolio main view still shows live health scores.",
      backendValidation: {
        apiEndpoint: "POST /api/v2/portfolio/scenarios/simulate",
        sourceEntity: "ProjectModel (read) → scenario read model (write)",
        expectedDbUpdate: "scenario read model only — NOT fs_project production fields",
        auditEvent: "portfolio.scenario.simulated",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_portfolio_whatif_contamination",
      },
    },
  ];
}

/** Global security tests */
export function getGlobalSecurityTests() {
  return [
    {
      id: "global-sec-cross-team-read",
      useCaseId: "project-list",
      useCaseName: "Project list",
      module: "Security",
      route: "/project/list",
      feature: "Existing",
      title: "[Security] Cross-team project read blocked for scoped role",
      type: "security",
      priority: "P0",
      verificationStatus: "LIVE_BACKEND_VERIFIED",
      testDisposition: "SHIPPED",
      description: "User with listOnlyCurrentTeamProject cannot read other team projects via API or direct URL.",
      prerequisites: ["Employee on Team A only", "Project owned by Team B"],
      steps: [
        "Sign in as Team A employee with team-scoped role.",
        "API GET /api/v2/projects?teamScope=mine — Team B project absent.",
        "Direct URL /project/details/{teamBProjectId} — PersonaAccessDenied or 403.",
      ],
      expectedResult: "No Team B project data in response body or UI partial render.",
      expectedBehavior: "403 on API; UI shows access denied without leaking names/IDs.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/projects/{projectId}",
        sourceEntity: "ProjectModel with team scope filter",
        expectedDbUpdate: "none",
        auditEvent: "access.denied.cross_team",
        notificationEvent: "none",
        forbiddenShadowTable: "none",
      },
    },
    {
      id: "global-sec-cross-team-write",
      useCaseId: "project-details",
      useCaseName: "Project details",
      module: "Security",
      route: "/project/details/:projectId",
      feature: "Existing",
      title: "[Security] Cross-team project write blocked",
      type: "security",
      priority: "P0",
      verificationStatus: "LIVE_BACKEND_VERIFIED",
      testDisposition: "SHIPPED",
      description: "PATCH/POST on out-of-scope project returns 403.",
      prerequisites: ["Team-scoped user", "Foreign project ID"],
      steps: [
        "Attempt PATCH project fields via API with foreign projectId.",
        "Attempt deliverable create on foreign project.",
        "Verify 403 and no fs_project/fs_task rows modified.",
      ],
      expectedResult: "All write attempts rejected.",
      expectedBehavior: "Audit logs access.denied; no silent partial success.",
      backendValidation: {
        apiEndpoint: "PATCH /api/v2/projects/{projectId}",
        sourceEntity: "ProjectModel",
        expectedDbUpdate: "none — write rejected",
        auditEvent: "access.denied.cross_team_write",
        notificationEvent: "none",
        forbiddenShadowTable: "none",
      },
    },
    {
      id: "global-sec-persona-masking",
      useCaseId: "people-employees",
      useCaseName: "Employees",
      module: "Security",
      route: "/people/employees",
      feature: "Existing",
      title: "[Security] Persona masking hides salary/bank fields",
      type: "security",
      priority: "P0",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "MANAGER persona must not see raw compensation fields masked by policy.",
      prerequisites: ["MANAGER persona", "Employee with salary data", "maskingPolicy enabled"],
      steps: [
        "Open employee profile as MANAGER.",
        "Verify salary/bank/tax fields masked or absent.",
        "API response must not include unmasked sensitive keys.",
        "HR_ADMIN sees full fields per policy.",
      ],
      expectedResult: "Sensitive fields masked per persona in UI and API JSON.",
      expectedBehavior: "maskingPolicyService applied server-side — not UI-only hide.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/employee/{employeeId}",
        sourceEntity: "EmployeeModel",
        expectedDbUpdate: "none",
        auditEvent: "employee.profile.view",
        notificationEvent: "none",
        forbiddenShadowTable: "none",
      },
    },
    {
      id: "global-sec-document-download",
      useCaseId: "project-dossier",
      useCaseName: "Dossier / file manager",
      module: "Security",
      route: "/project/filemanager",
      feature: "Existing",
      title: "[Security] Document download authorization enforced",
      type: "security",
      priority: "P0",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "User without project membership cannot download attached documents.",
      prerequisites: ["Document on Project A", "User not on Project A roster"],
      steps: [
        "Attempt direct download URL / API GET document/{id}/content.",
        "Verify 403.",
        "Add user to project — download succeeds.",
      ],
      expectedResult: "Download denied without project/document permission.",
      expectedBehavior: "Document Vault checks sourceEntity + membership.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/documents/{documentId}/download",
        sourceEntity: "Document Vault + ProjectModel membership",
        expectedDbUpdate: "none",
        auditEvent: "document.download.denied or document.download",
        notificationEvent: "none",
        forbiddenShadowTable: "none",
      },
    },
    {
      id: "global-sec-ai-context-masking",
      useCaseId: "ai-agent",
      useCaseName: "AI agent console",
      module: "Security",
      route: "/ai/agent",
      feature: "F17",
      title: "[Security] AI audit stores masked summaries only",
      type: "security",
      priority: "P0",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "AI queries about sensitive employee data return masked summaries; audit log has no raw salary/bank.",
      prerequisites: ["AI enabled", "Employee with sensitive fields", "MANAGER persona"],
      steps: [
        "Query AI about employee compensation.",
        "Verify response masked.",
        "Inspect AI audit log — masked summary + source reference only.",
      ],
      expectedResult: "No raw sensitive values in AI audit persistence.",
      expectedBehavior: "Sensitive data rule enforced per enhancement master plan.",
      backendValidation: {
        apiEndpoint: "POST /api/v2/ai/agent/query",
        sourceEntity: "EmployeeModel (masked read)",
        expectedDbUpdate: "ts_ai_audit_log with maskedSummary only",
        auditEvent: "ai.query.executed",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_work_graph_metadata_raw",
      },
    },
    {
      id: "global-sec-work-graph-masking",
      useCaseId: "workspace-workgraph",
      useCaseName: "Work graph",
      module: "Security",
      route: "/workspace/work-graph",
      feature: "F26",
      title: "[Security] Work Graph snippets respect persona masking",
      type: "security",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Work Graph search snippets must not expose unmasked sensitive metadata.",
      prerequisites: ["workGraphEnabled", "MANAGER persona", "Sensitive employee node"],
      steps: [
        "Search Work Graph for employee entity.",
        "Verify snippet excludes salary/bank/medical fields.",
        "Graph metadata stores references not raw sensitive values.",
      ],
      expectedResult: "Masked snippets in UI and graph index.",
      expectedBehavior: "workGraphService applies persona mask to node metadata.",
      backendValidation: {
        apiEndpoint: "GET /api/v2/work-graph/search?q=",
        sourceEntity: "Work Graph index (derived from canonical entities)",
        expectedDbUpdate: "none on read",
        auditEvent: "workgraph.search",
        notificationEvent: "none",
        forbiddenShadowTable: "ts_work_graph_metadata_raw",
      },
    },
    {
      id: "global-sec-export-masking",
      useCaseId: "project-reports",
      useCaseName: "Reports",
      module: "Security",
      route: "/project/reports",
      feature: "Existing",
      title: "[Security] Report export masks PII per role",
      type: "security",
      priority: "P1",
      verificationStatus: "CODE_PATH_VERIFIED",
      testDisposition: "SHIPPED",
      description: "Data Dump and utilization exports exclude or mask columns per export policy.",
      prerequisites: ["Report role with limited export", "Data containing PII"],
      steps: [
        "Export Data Dump as scoped role.",
        "Open CSV — verify PII columns masked or omitted.",
        "Compare with ADMIN export policy difference.",
      ],
      expectedResult: "Export file complies with role masking policy.",
      expectedBehavior: "Server-side export generation — not client-side filter only.",
      backendValidation: {
        apiEndpoint: "POST /api/v2/reports/export",
        sourceEntity: "TaskActivityModel + EmployeeModel",
        expectedDbUpdate: "none",
        auditEvent: "report.export.generated",
        notificationEvent: "none",
        forbiddenShadowTable: "none",
      },
    },
  ];
}

export function buildBackendValidation(page, testType = "functional") {
  const c = enrichCanonical(page);
  const v6h = V6H_PLANNED_PAGES[page.id];
  const base = {
    apiEndpoint: c.backendEndpoint,
    sourceEntity: (c.canonicalSourceEntities || []).join(", "),
    sourceValidation: `Reads/writes canonical ${(c.canonicalSourceEntities || [])[0] || "source"} — not shadow table`,
    expectedDbUpdate: testType === "smoke" ? "none on page load" : `Canonical write on ${(c.allowedTables || [])[0] || "source table"}`,
    databaseValidation: `Allowed: ${(c.allowedTables || []).join(", ")}; Forbidden: ${(c.forbiddenTables || []).slice(0, 2).join(", ")}`,
    auditEvent: c.auditRequirement?.includes("audit") ? `${page.id}.action` : c.auditRequirement || "domain.audit",
    auditValidation: c.auditRequirement || "Domain audit on mutate/sensitive read",
    notificationEvent: c.notificationRequirement || (/approv|submit|notify/i.test(page.pageName || "") ? "workspace.notification" : "none"),
    notificationValidation: c.notificationRequirement || "none unless workflow triggers notify",
    securityValidation: c.teamScopeRule ? `Team scope: ${c.teamScopeRule}` : "RBAC/persona enforced",
    forbiddenShadowTable: (c.forbiddenTables || FORBIDDEN_SHADOW_TABLES).find((t) => String(t).startsWith("ts_")) || FORBIDDEN_SHADOW_TABLES[0],
    verificationStatus: c.verificationStatus,
    playwrightSpec: v6h?.playwrightSpec || c.playwrightSpec || null,
    smokeProbe: v6h?.testId || c.testId || `page-${page.id}`,
    environment: "staging",
    evidencePath: v6h?.evidencePath || c.evidencePath || null,
    defectId: null,
  };
  return base;
}
