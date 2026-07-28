/**
 * Generates detailed test scenarios from elaborated use case pages.
 * Used by generate-test-plan.mjs
 */

import {
  isNonCreatablePage,
  buildBackendValidation,
  getGlobalRegressionTests,
  getGlobalSecurityTests,
} from "./use-case-canonical-map.mjs";
import { V6H_PLANNED_PAGES } from "./v6h-planned-pages-config.mjs";

const TEST_OVERRIDES = {
  "project-portfolio": (page, base) => [
    {
      id: `${page.id}-tp-func-exec-review`,
      ...base,
      title: "[Functional] Executive portfolio review — health rollups",
      type: "functional",
      priority: "P0",
      description: "Portfolio manager reviews cross-project health scores and at-risk programs during QBR.",
      prerequisites: [
        "At least 3 active projects with mixed health (green/amber/red)",
        "User: PROJECT_MANAGER or EXECUTIVE persona",
        "projectModules.portfolioEnabled = true",
      ],
      steps: [
        "Sign in as Portfolio Manager or Executive.",
        "Navigate: Projects → Portfolio (`/project/portfolio`).",
        "Verify hero KPIs show total projects, at-risk count, and aggregate health score.",
        "Apply filter by account or program owner.",
        "Click an at-risk project card — confirm drill-down opens project dashboard.",
        "Open Portfolio scenarios (`/project/portfolio/scenarios`) and confirm link from portfolio page works.",
        "Export or screenshot steering summary for meeting notes.",
      ],
      expectedResult: "Portfolio grid reflects live ProjectModel health; filters narrow results correctly; drill-down navigates without error.",
      expectedBehavior: "Health badges match project detail status; no stale mock data; F16 rollup sourced from canonical projects.",
    },
  ],
  "project-milestones": (page, base) => [
    {
      id: `${page.id}-tp-func-gate`,
      ...base,
      title: "[Functional] Milestone gate blocks deliverable when configured",
      type: "functional",
      priority: "P0",
      description: "Verify milestone gate enforcement on deliverable completion per PMI schedule control.",
      prerequisites: [
        "Project with deliverable (TaskModel) linked to incomplete milestone gate",
        "User: PROJECT_MANAGER",
        "Milestone and gate configured in Application Config",
      ],
      steps: [
        "Open project → Milestones → create milestone with target date.",
        "Configure gate on deliverable requiring milestone completion.",
        "Attempt to mark deliverable complete before milestone date.",
        "Complete milestone (mark achieved).",
        "Retry deliverable completion.",
      ],
      expectedResult: "Deliverable blocked until milestone achieved; succeeds after milestone completion.",
      expectedBehavior: "Clear validation message references milestone; timeline/Gantt shows milestone marker.",
    },
  ],
  "people-timesheet": (page, base) => [
    {
      id: `${page.id}-tp-func-approval-chain`,
      ...base,
      title: "[Functional] Timesheet submit → manager approval → payroll visibility",
      type: "functional",
      priority: "P0",
      description: "End-to-end timesheet approval chain from employee submit to manager inbox.",
      prerequisites: [
        "Employee with assigned project/task",
        "Manager in approval hierarchy",
        "Timesheet period open",
      ],
      steps: [
        "Employee: HRMS → Timesheets → log hours against task activity.",
        "Submit timesheet for the week.",
        "Manager: Workspace → My approvals — locate pending timesheet.",
        "Approve timesheet.",
        "Employee: verify status Submitted → Approved.",
        "Payroll admin: confirm hours appear in payroll run validation (if period closed).",
      ],
      expectedResult: "Status transitions Submitted → Approved; approved hours visible to payroll validation.",
      expectedBehavior: "Notifications sent on submit and approve; no duplicate approval possible.",
      backendValidation: {
        apiEndpoint: "POST /api/v2/timesheet/submit; PATCH /api/v2/approvals/{id}/approve",
        sourceEntity: "TaskActivityModel, fs_timesheet, ApprovalAuthorityService",
        expectedDbUpdate: "fs_timesheet.status APPROVED",
        auditEvent: "timesheet.submitted; approval.approved",
        notificationEvent: "workspace.notification.approval_complete",
        forbiddenShadowTable: "ts_approval_inbox_shadow",
      },
    },
  ],
  "fin-proposal-lifecycle": (page, base) => [
    {
      id: `${page.id}-tp-func-convert`,
      ...base,
      title: "[Functional] Proposal → PO → Project conversion (V6F-EA39)",
      type: "functional",
      priority: "P1",
      testDisposition: "OUT_OF_SCOPE",
      verificationStatus: "CODE_PATH_VERIFIED",
      description: "Accepted proposal converts to PurchaseOrderModel and ProjectModel without duplicate truth.",
      prerequisites: ["BidRequest with Account", "Proposal estimate lines", "commercialModules.proposalEnabled (dev)"],
      steps: [
        "Create proposal from BidRequest.",
        "Add estimate version with role/phase lines.",
        "Submit and approve proposal.",
        "Accept and convert to PO + Project.",
        "Log TaskActivity — run estimate-vs-actual.",
      ],
      expectedResult: "PO and Project created via canonical services; estimate-vs-actual from TaskActivityModel.",
      expectedBehavior: "No isolated proposal store as sole truth — ts_proposal child of BidRequest/PO flow.",
      backendValidation: buildBackendValidation(page, "functional"),
    },
  ],
  "fin-revenue-recognition": (page, base) => [
    {
      id: `${page.id}-tp-func-period`,
      ...base,
      title: "[Functional] Revenue recognition schedule by period (V6F-EA38)",
      type: "functional",
      priority: "P1",
      testDisposition: "OUT_OF_SCOPE",
      verificationStatus: "CODE_PATH_VERIFIED",
      description: "Recognition events linked to invoice line, project, PO, period — not platform HRMS invoices.",
      prerequisites: ["Project with PO and billing plan", "Approved milestone/work sources"],
      steps: [
        "GET /api/v2/project-billing/revenue-recognition?projectId=&period=",
        "Verify recognition from approved sources.",
        "Confirm fs_hrms_invoice NOT used as project revenue.",
      ],
      expectedResult: "Recognition schedule reflects canonical billing sources.",
      expectedBehavior: "ts_revenue_recognition_event linked to project billing — not ts_finance_snapshot_isolated.",
      backendValidation: buildBackendValidation(page, "functional"),
    },
  ],
  "project-npd-lifecycle": (page, base) => [
    {
      id: `${page.id}-tp-func-stage-gate`,
      ...base,
      title: "[Functional] NPD stage-gate progression (V6F-EA40)",
      type: "functional",
      priority: "P1",
      testDisposition: "OUT_OF_SCOPE",
      verificationStatus: "CODE_PATH_VERIFIED",
      description: "NPD projectType with gate approval between stages.",
      prerequisites: ["npdStageTemplate in Application Config", "NPD project created"],
      steps: [
        "POST /api/v2/projects?projectType=NPD",
        "Complete stage work in TaskModel.",
        "PATCH submit-gate → approve-gate.",
        "Verify launch readiness checklist.",
      ],
      expectedResult: "Stage gates audited; portfolio what-if does not alter production project.",
      expectedBehavior: "ProjectModel.projectType=NPD — governance on project-owned records.",
      backendValidation: buildBackendValidation(page, "functional"),
    },
  ],
  "project-dossier": (page, base) => [
    {
      id: `${page.id}-tp-func-baseline`,
      ...base,
      title: "[Functional] Dossier baseline and controlled export (V6F-EA41)",
      type: "functional",
      priority: "P1",
      testDisposition: "OUT_OF_SCOPE",
      verificationStatus: "CODE_PATH_VERIFIED",
      description: "Dossier package linked to Project via sourceEntity; export authorized per persona.",
      prerequisites: ["Project with dossierEnabled", "Document Vault configured"],
      steps: [
        "Create dossier linked to Project sourceEntity.",
        "Add sections and upload documents.",
        "Submit review → baseline.",
        "Export — verify download authorization audit.",
      ],
      expectedResult: "Dossier baseline audit event; unauthorized download denied.",
      expectedBehavior: "Document Vault source-linked — not isolated file repo.",
      backendValidation: buildBackendValidation(page, "functional"),
    },
  ],
};

function stripNumber(s) {
  return String(s).replace(/^\d+\.\s*/, "").replace(/\*\*/g, "");
}

function truncate(s, n) {
  const t = String(s);
  return t.length <= n ? t : t.slice(0, n - 1) + "…";
}

function navigationPath(page) {
  if (page.whereToUse && typeof page.whereToUse === "object" && page.whereToUse.navigation) {
    return page.whereToUse.navigation.replace(/\*\*/g, "");
  }
  return `${page.module} → ${page.pageName}`;
}

function buildPrerequisites(page) {
  const prereqs = [];
  const vStatus = page.verificationStatus || page.status;
  const isPublicAuth = /auth-login|auth-forgot|auth-error500/i.test(page.id);
  const isTokenAuth = /auth-activate|auth-changepwd/i.test(page.id);

  if (isPublicAuth) {
    prereqs.push("**No authenticated session** — use incognito or logged-out browser");
  } else if (isTokenAuth) {
    prereqs.push("**Valid activation/reset token** in URL — no prior session");
  } else if (page.whoCanUse && typeof page.whoCanUse === "object") {
    if (page.whoCanUse.prerequisites) prereqs.push(...page.whoCanUse.prerequisites);
    if (page.whoCanUse.personas && page.whoCanUse.personas.length) {
      prereqs.push(`Test user persona: ${page.whoCanUse.personas[0]}`);
    }
  } else if (page.personas && page.personas.length) {
    prereqs.push(`Test user persona: ${page.personas[0]}`);
  }

  if (!isPublicAuth && !isTokenAuth) {
    prereqs.push("Tracopus test/staging environment with Application Config (org.json, role.json) loaded");
  }
  if (page.featureFlags) prereqs.push(`Feature enabled: ${page.featureFlags}`);
  if (vStatus === "PLANNED" || page.status === "Planned") {
    prereqs.push("Dev preview: REACT_APP_SHOW_PLANNED_MENU_ITEMS=true (non-production only)");
  }
  return [...new Set(prereqs.filter(Boolean))];
}

function isNoCreate(page) {
  return isNonCreatablePage(page);
}

function withBackendValidation(test, page, testType) {
  const priority = test.priority || "P2";
  if (priority === "P0" || priority === "P1") {
    test.backendValidation = {
      ...buildBackendValidation(page, testType || test.type),
      ...(test.backendValidation || {}),
    };
    test.verificationStatus = page.verificationStatus || page.canonical?.verificationStatus || "CODE_PATH_VERIFIED";
  }
  test.testDisposition =
    page.status === "Planned" || page.verificationStatus === "PLANNED"
      ? test.testDisposition || "OUT_OF_SCOPE"
      : test.testDisposition || "SHIPPED";
  return test;
}

function v6hPriorityForType(v6h, specType) {
  if (specType === "smoke") return v6h.priority === "P1" ? "P1" : "P2";
  if (specType === "negative" || specType === "permission") return "P3";
  return v6h.priority === "P1" ? "P1" : v6h.priority === "P2" ? "P2" : "P3";
}

function generateV6hShippedAcceptanceTests(page) {
  const v6h = V6H_PLANNED_PAGES[page.id];
  if (!v6h) return [];
  const base = {
    useCaseId: page.id,
    useCaseName: page.pageName,
    module: page.module,
    route: page.route,
    feature: page.feature || v6h.feature,
    verificationStatus: "CODE_PATH_VERIFIED",
    testDisposition: "SHIPPED",
  };
  const acceptance = V6H_ACCEPTANCE_TESTS[page.id] || [];
  return acceptance.map((spec, idx) =>
    withBackendValidation(
      {
        id: `${page.id}-tp-v6h-${idx + 1}`,
        ...base,
        title: `[V6H ${v6h.sprint}] ${spec.title}`,
        type: spec.type || "functional",
        priority: v6hPriorityForType(v6h, spec.type),
        description: `${v6h.taskId} acceptance — shipped ${v6h.priority}.`,
        prerequisites: spec.prerequisites || buildPrerequisites(page),
        steps: spec.steps,
        expectedResult: spec.expectedResult,
        expectedBehavior: spec.expectedBehavior || v6h.overview,
      },
      page,
      spec.type || "functional"
    )
  );
}

function generatePlannedTests(page) {
  const base = {
    useCaseId: page.id,
    useCaseName: page.pageName,
    module: page.module,
    route: page.route,
    feature: page.feature || "Existing",
    verificationStatus: "PLANNED",
  };
  const v6h = V6H_PLANNED_PAGES[page.id];
  const tests = [
    withBackendValidation(
      {
        id: `${page.id}-tp-out-of-scope`,
        ...base,
        title: `[OUT_OF_SCOPE] ${page.pageName} — not a production release blocker`,
        type: "negative",
        priority: "P4",
        testDisposition: "OUT_OF_SCOPE",
        description: `Route ${page.route} is PLANNED (${v6h?.taskId || page.feature || "feature"}) — exclude from P0/P1 production QA until shipped.`,
        prerequisites: buildPrerequisites(page),
        steps: [
          "Confirm route absent from production navigation when planned flag off.",
          "Enable dev preview flag only in non-production environment.",
          "Verify no P0 production test suite references this route as shipped.",
          `Track ${v6h?.taskId || "enhancement task"} in V6H scope completion plan before promotion.`,
        ],
        expectedResult: "Production QA treats page as OUT_OF_SCOPE; no false ship-blocker failures.",
        expectedBehavior: v6h?.overview || page.implementationNotes || "See V6H planned pages scope completion plan.",
      },
      page,
      "negative"
    ),
    withBackendValidation(
      {
        id: `${page.id}-tp-blocked`,
        ...base,
        title: `[BLOCKED] ${page.pageName} — awaiting backend/UI shipment`,
        type: "negative",
        priority: "P4",
        testDisposition: "BLOCKED",
        description: `Implementation blocked until ${v6h?.taskId || page.feature || "feature"} ships with canonical source wiring.`,
        prerequisites: buildPrerequisites(page),
        steps: [
          "Review use case canonical mapping for allowedTables and backendEndpoint.",
          `Confirm API ${v6h?.api || page.route} returns 404 or feature-gated response in production.`,
          `Evidence file required: ${v6h?.evidencePath || "docs/enhancement-evidence/<task-id>.md"}.`,
          `Playwright spec target: ${v6h?.playwrightSpec || "e2e/<module>/<slug>.spec.ts"}.`,
        ],
        expectedResult: "Test marked BLOCKED — not counted in production pass rate.",
        expectedBehavior: page.implementationNotes || v6h?.overview || "See V6H enhancement plan.",
      },
      page,
      "negative"
    ),
  ];

  if (v6h) {
    const acceptance = V6H_ACCEPTANCE_TESTS[page.id] || [];
    acceptance.forEach((spec, idx) => {
      tests.push(
        withBackendValidation(
          {
            id: `${page.id}-tp-v6h-${idx + 1}`,
            ...base,
            title: `[PLANNED ${v6h.sprint}] ${spec.title}`,
            type: spec.type || "functional",
            priority: "P4",
            testDisposition: "OUT_OF_SCOPE",
            description: `${v6h.taskId} acceptance — runs after page ships (${v6h.priority}).`,
            prerequisites: spec.prerequisites || buildPrerequisites(page),
            steps: spec.steps,
            expectedResult: spec.expectedResult,
            expectedBehavior: spec.expectedBehavior || v6h.overview,
          },
          page,
          spec.type || "functional"
        )
      );
    });
  }

  return tests;
}

/** V6H acceptance criteria — detailed tests promoted to SHIPPED when page goes live */
const V6H_ACCEPTANCE_TESTS = {
  "adm-notif-templates": [
    {
      title: "Smoke — authorized admin loads notification templates",
      type: "smoke",
      steps: ["Sign in as ADMIN.", "Navigate to /admin/notification-templates.", "Verify data-testid page-admin-notification-templates.", "List loads from API."],
      expectedResult: "Page renders template list without error.",
    },
    {
      title: "Functional — create/edit/disable template with masked preview",
      type: "functional",
      steps: ["Create template with valid placeholders.", "Preview — verify salary/bank masked.", "Disable template.", "Verify audit events on CRUD."],
      expectedResult: "Template CRUD works; preview masks sensitive placeholders.",
    },
    {
      title: "Permission — non-admin blocked",
      type: "permission",
      steps: ["Sign in as EMPLOYEE.", "Navigate to /admin/notification-templates.", "Verify 403 or redirect."],
      expectedResult: "Non-admin cannot access mutate UI.",
    },
    {
      title: "Negative — F21 disabled returns 403",
      type: "negative",
      steps: ["Disable isWorkspaceNotificationsEnabled().", "Call GET /api/v2/workspace/notification-templates.", "Verify 403."],
      expectedResult: "API and UI gated when F21 off.",
    },
    {
      title: "Regression — template cannot expose sensitive placeholder values",
      type: "regression",
      steps: ["Create template with salary placeholder.", "Preview as non-HR persona.", "Verify masked output."],
      expectedResult: "No unmasked sensitive values in preview or API response.",
    },
  ],
  "people-holidays": [
    {
      title: "Smoke — holidays page loads",
      type: "smoke",
      steps: ["Sign in as HR_ADMIN.", "Navigate to /people/holidays.", "Verify page-people-holidays test id.", "List loads for current year."],
      expectedResult: "Holiday calendar renders.",
    },
    {
      title: "Functional — add holiday excludes leave duration",
      type: "functional",
      steps: ["Add holiday on date D.", "Create leave spanning D.", "Verify duration excludes D."],
      expectedResult: "Leave calculation respects holiday.",
    },
    {
      title: "Functional — import holiday calendar",
      type: "functional",
      steps: ["Import CSV with holidays.", "Verify list updated.", "Check timesheet calendar marks non-working days."],
      expectedResult: "Import succeeds; downstream calendars updated.",
    },
    {
      title: "Permission — HR admin mutate; employee read-only",
      type: "permission",
      steps: ["Employee: view holidays — OK.", "Employee: attempt create — blocked.", "HR_ADMIN: create — OK."],
      expectedResult: "RBAC enforced per persona.",
    },
    {
      title: "Regression — no duplicate isolated holiday truth table",
      type: "regression",
      steps: ["Verify holidays sourced from org calendar config.", "Confirm no orphan ts_* holiday truth duplicate."],
      expectedResult: "Single canonical holiday source.",
    },
  ],
  "pay-deductions": [
    {
      title: "Functional — deduction in run preview and paycheck",
      type: "functional",
      steps: ["Create deduction for employee.", "Open payroll run preview.", "Verify deduction line.", "Finalize run — verify paycheck line item."],
      expectedResult: "Deduction flows to preview and paycheck.",
    },
    {
      title: "Negative — locked run blocks destructive edit",
      type: "negative",
      steps: ["Lock payroll run.", "Attempt delete deduction.", "Verify reversal required."],
      expectedResult: "Locked run protected; audit on reversal.",
    },
  ],
  "adm-payroll-config": [
    {
      title: "Functional — config change appears in run preview",
      type: "functional",
      steps: ["Update pay frequency.", "Start run preview.", "Verify new config applied."],
      expectedResult: "Config changes reflected in preview.",
    },
    {
      title: "Negative — run blocked if mandatory config missing",
      type: "negative",
      steps: ["Clear mandatory statutory field.", "Attempt payroll run.", "Verify blocked with message."],
      expectedResult: "Readiness validation prevents run.",
    },
    {
      title: "Permission — non-admin cannot mutate",
      type: "permission",
      steps: ["Sign in as EMPLOYEE.", "Navigate /admin/payroll-config.", "Verify blocked."],
      expectedResult: "Admin/payroll manager only.",
    },
  ],
  "an-ai-insights": [
    {
      title: "Functional — insight cards with source references",
      type: "functional",
      steps: ["Open /analytics/ai-insights.", "Load insights.", "Verify sourceEntityType/id on cards.", "Drill to source entity."],
      expectedResult: "Insights derived with source links.",
    },
    {
      title: "Security — cross-team insights blocked; sensitive masked",
      type: "security",
      steps: ["Sign in as scoped manager.", "Request insight outside team.", "Verify blocked or masked."],
      expectedResult: "Scope and masking enforced.",
    },
  ],
  "ai-audit": [
    {
      title: "Functional — list/filter AI audit with masking",
      type: "functional",
      steps: ["Admin opens /ai/audit.", "Filter by module and date.", "Verify no raw sensitive prompts.", "Export masked CSV."],
      expectedResult: "Audit list masked; export safe.",
    },
    {
      title: "Permission — unauthorized persona blocked",
      type: "permission",
      steps: ["Employee navigates to /ai/audit.", "Verify 403."],
      expectedResult: "Admin/security only.",
    },
  ],
  "adm-dashboard": [
    {
      title: "Smoke — admin dashboard loads live KPIs",
      type: "smoke",
      steps: ["Sign in as ADMIN.", "Open /admin/dashboard.", "Verify KPI widgets from live services.", "Quick links only to shipped routes."],
      expectedResult: "Composed dashboard without mock data.",
    },
    {
      title: "Permission — non-admin blocked",
      type: "permission",
      steps: ["Non-admin navigates /admin/dashboard.", "Verify blocked."],
      expectedResult: "Admin persona required.",
    },
  ],
};

function authSmokeSteps(page) {
  if (/auth-login/i.test(page.id)) {
    return [
      "Open /user/login in incognito (**no session**).",
      "Enter valid test credentials.",
      "Verify POST login API returns 200 and session cookie set.",
      "Verify redirect to default module.",
    ];
  }
  if (/auth-forgot/i.test(page.id)) {
    return [
      "Open /user/forgotpassword (**no session**).",
      "Submit registered email.",
      "Verify reset email/token flow initiated.",
    ];
  }
  if (/auth-activate|auth-changepwd/i.test(page.id)) {
    return [
      "Open URL with valid test token (**no prior session**).",
      "Complete password set/change form.",
      "Verify token consumed and employee status updated.",
    ];
  }
  return null;
}

function deriveExpectedBehavior(page, scenario) {
  const parts = [];
  if (page.implementationNotes) parts.push(page.implementationNotes);
  parts.push(`Workflow "${scenario.title}" completes with UI feedback (toast/success) and persisted state in ${page.relatedServices || "canonical services"}.`);
  if (page.verification && page.verification.length) {
    parts.push(`Verify: ${page.verification[0]}`);
  }
  return parts.join(" ");
}

function autoGenerateTests(page) {
  if (page.status === "Planned" || page.verificationStatus === "PLANNED") {
    return generatePlannedTests(page);
  }

  const tests = [];
  const base = {
    useCaseId: page.id,
    useCaseName: page.pageName,
    module: page.module,
    route: page.route,
    feature: page.feature || "Existing",
    verificationStatus: page.verificationStatus || page.canonical?.verificationStatus || "CODE_PATH_VERIFIED",
    testDisposition: "SHIPPED",
  };

  const authSteps = authSmokeSteps(page);
  const smokeSteps = authSteps || [
    `Sign in as user with ${page.module} access${page.personas?.length ? ` (${page.personas[0]} persona)` : ""}.`,
    page.featureFlags
      ? `Verify Application Config: ${page.featureFlags} is enabled.`
      : `Verify ${page.module} module flags are enabled in Application Config.`,
    `Navigate: ${navigationPath(page)}.`,
    `Direct URL test: open ${page.route} in new tab (substitute valid IDs for route params).`,
    "Wait for shell, toolbar, and primary content to finish loading.",
    "Check browser network: no HTTP 500; primary API calls return 2xx.",
    "Confirm breadcrumb/module chrome visible; no PersonaAccessDenied overlay.",
    `Validate API: ${page.canonical?.backendEndpoint || "primary list/detail endpoint"} returns expected shape.`,
    `Confirm no write to forbidden shadow table: ${page.canonical?.forbiddenTables?.[0] || "ts_* shadow tables"}.`,
  ];

  tests.push(
    withBackendValidation(
      {
        id: `${page.id}-tp-smoke`,
        ...base,
        title: `[Smoke] ${page.pageName} — ${authSteps ? "public/token access" : "authorized page load"}`,
        type: "smoke",
        priority: "P0",
        description: `Confirm ${page.pageName} (${page.route}) loads without server or access errors.`,
        prerequisites: buildPrerequisites(page),
        steps: smokeSteps,
        expectedResult: "Page renders completely — no blank screen, 500 error page, or unhandled exception toast.",
        expectedBehavior: `${page.pageName} shows role-appropriate content. Canonical source: ${(page.canonical?.canonicalSourceEntities || []).join(", ")}.`,
      },
      page,
      "smoke"
    )
  );

  // Functional — one test per documented scenario
  const scenarios =
    page.scenarios && page.scenarios.length
      ? page.scenarios
      : [{ title: `Primary ${page.pageName} workflow`, description: page.overview }];

  scenarios.forEach((scenario, idx) => {
    const useSteps = (page.howToUse || []).slice(0, 6);
    const numberedSteps = [
      `Sign in with persona authorized for scenario: "${scenario.title}".`,
      ...useSteps.map((s, i) => `${i + 1}. ${stripNumber(s)}`),
      `Execute scenario-specific actions for: ${scenario.title}.`,
      "Record entity IDs, timestamps, and screenshots for traceability.",
      "Sign out and sign in as secondary persona (if multi-role scenario) to validate visibility scope.",
    ];
    tests.push(
      withBackendValidation(
        {
          id: `${page.id}-tp-func-${idx + 1}`,
          ...base,
          title: `[Functional] ${scenario.title}`,
          type: "functional",
          priority: "P1",
          description: scenario.description,
          prerequisites: buildPrerequisites(page),
          steps: [
            ...numberedSteps,
            `API validation: ${page.canonical?.backendEndpoint || "workflow endpoint"} returns success.`,
            `DB check: write on ${(page.canonical?.allowedTables || ["canonical source table"])[0]} only.`,
            `Audit: confirm ${page.canonical?.auditRequirement || "domain audit event"}.`,
          ],
          expectedResult: `Scenario "${scenario.title}" completes; data in canonical services only.`,
          expectedBehavior: deriveExpectedBehavior(page, scenario),
        },
        page,
        "functional"
      )
    );
  });

  // Create / provision flow
  if (page.howToCreate && page.howToCreate.length && !isNoCreate(page)) {
    tests.push(
      withBackendValidation(
        {
          id: `${page.id}-tp-create`,
          ...base,
          title: `[Functional] Create / provision — ${page.pageName}`,
          type: "functional",
          priority: "P1",
          description: `End-to-end create workflow for ${page.pageName}.`,
          prerequisites: buildPrerequisites(page),
          steps: [
            ...(page.howToCreate || []).map((s, i) => `${i + 1}. ${stripNumber(s)}`),
            `Verify API ${page.canonical?.backendEndpoint || "POST create endpoint"} returns 201/200.`,
            `Verify row in ${(page.canonical?.allowedTables || ["source table"])[0]}.`,
            `Verify NO write to ${page.canonical?.forbiddenTables?.[0] || "shadow tables"}.`,
          ],
          expectedResult: "Record persisted in canonical table; survives reload.",
          expectedBehavior: "Success notification; parent links enforced (projectId, employeeId, etc.).",
        },
        page,
        "functional"
      )
    );
  }

  // Verification checklist items → individual tests
  const verificationItems =
    page.verification && page.verification.length
      ? page.verification
      : [
          "Page loads without PersonaAccessDenied for authorized role.",
          "Expected data visible after completing documented create/use steps.",
        ];

  verificationItems.forEach((item, idx) => {
    tests.push(
      withBackendValidation(
        {
          id: `${page.id}-tp-verify-${idx + 1}`,
          ...base,
          title: `[Verification] ${truncate(item, 72)}`,
          type: "verification",
          priority: "P1",
          description: `Acceptance criterion: ${item}`,
          prerequisites: [...buildPrerequisites(page), "Prerequisite workflow completed"],
          steps: [
            `Navigate: ${navigationPath(page)}.`,
            `Inspect: ${item}`,
            `API: ${page.canonical?.backendEndpoint || "relevant endpoint"}.`,
            "Compare UI, API JSON, and DB row.",
            "Attach HAR/screenshot evidence.",
          ],
          expectedResult: item,
          expectedBehavior: `Criterion met — ${item}`,
        },
        page,
        "verification"
      )
    );
  });

  // Permission negative
  if (page.personas && page.personas.length && page.module !== "Authentication") {
    tests.push({
      id: `${page.id}-tp-permission`,
      ...base,
      title: `[Permission] Unauthorized access denied — ${page.pageName}`,
      type: "permission",
      priority: "P2",
      description: `User without ${page.module} permission must not access ${page.pageName} or see sensitive data.`,
      prerequisites: [
        "Test user with EMPLOYEE persona only — module admin flags disabled",
        "Same organization as test data",
      ],
      steps: [
        "Sign in as user lacking module permission (or switch to unauthorized persona).",
        `Attempt sidebar navigation to ${page.pageName}.`,
        `Attempt direct URL: ${page.route} (replace params with valid IDs).`,
        "Observe HTTP status on API calls and UI response.",
        "Check that partial data is not rendered before access check.",
      ],
      expectedResult: "Access denied — hidden menu, PersonaAccessDenied, or redirect to permitted home.",
      expectedBehavior: "No sensitive records leaked in API JSON or UI; 403/401 on protected endpoints.",
    });
  }

  // Feature flag off
  if (page.featureFlags && String(page.featureFlags).trim()) {
    tests.push({
      id: `${page.id}-tp-flag-off`,
      ...base,
      title: `[Negative] Feature flag disabled — ${page.pageName} hidden`,
      type: "negative",
      priority: "P2",
      description: `When ${page.featureFlags} is disabled, ${page.pageName} must not appear in production navigation.`,
      prerequisites: ["Admin access to Application Config", page.featureFlags],
      steps: [
        "As Admin, open Application Config (`/admin/appconfig`).",
        `Disable flag: ${page.featureFlags}.`,
        "Save and reload application for standard test user.",
        `Search sidebar, header rail, and workspace for "${page.pageName}".`,
        `Attempt direct navigation to ${page.route}.`,
        "Re-enable flag and confirm access restored.",
      ],
      expectedResult: "Menu entry absent when flag off; direct URL blocked or redirected.",
      expectedBehavior: "No partial feature UI exposed; restoring flag immediately restores access.",
    });
  }

  // Common mistakes → regression tests
  (page.commonMistakes || []).slice(0, 2).forEach((mistake, idx) => {
    tests.push({
      id: `${page.id}-tp-regression-${idx + 1}`,
      ...base,
      title: `[Regression] Guard against: ${truncate(mistake, 60)}`,
      type: "regression",
      priority: "P2",
      description: `Regression test for documented common mistake: ${mistake}`,
      prerequisites: buildPrerequisites(page),
      steps: [
        `Reproduce conditions described: ${mistake}`,
        `Navigate to ${page.pageName} and attempt workflow.`,
        "Apply documented fix (enable flag, switch persona, link parent record).",
        "Retry workflow.",
      ],
      expectedResult: "After applying fix, workflow succeeds; mistake condition shows clear guidance.",
      expectedBehavior: mistake,
    });
  });

  if (V6H_PLANNED_PAGES[page.id]) {
    tests.push(...generateV6hShippedAcceptanceTests(page));
  }

  return tests;
}

/**
 * @param {object} page — elaborated use case page
 * @returns {object[]}
 */
export function generateTestsForPage(page) {
  const base = {
    useCaseId: page.id,
    useCaseName: page.pageName,
    module: page.module,
    route: page.route,
    feature: page.feature || "Existing",
  };

  const overrideFn = TEST_OVERRIDES[page.id];
  if (overrideFn) {
    const auto = autoGenerateTests(page);
    const overrideIds = new Set(overrideFn(page, base).map((t) => t.id));
    return [...overrideFn(page, base), ...auto.filter((t) => !overrideIds.has(t.id))];
  }

  return autoGenerateTests(page);
}

export function generateAllTests(pages) {
  const all = [];
  pages.forEach((page) => {
    all.push(...generateTestsForPage(page));
  });
  all.push(...getGlobalRegressionTests());
  all.push(...getGlobalSecurityTests());
  return all;
}

export { getGlobalRegressionTests, getGlobalSecurityTests };
