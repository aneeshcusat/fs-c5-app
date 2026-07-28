/**
 * Generates use-case-catalog-data.js — run: node generate-use-case-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { elaboratePage } from "./use-case-catalog-elaboration.mjs";
import { V6H_PLANNED_PAGES } from "./v6h-planned-pages-config.mjs";
import {
  SCENARIO_TO_USE_CASE,
  SCENARIO_TITLES,
  SCENARIO_MODULES,
  scenariosForUseCase,
} from "./use-case-scenario-bridge.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "use-case-catalog-data.js");
const BRIDGE_OUT = path.join(__dirname, "api-docs-bridge.js");
const SCENARIO_BRIDGE_OUT = path.join(
  __dirname,
  "..",
  "user-guide",
  "js",
  "api-docs-bridge.js"
);

function uc(p) {
  return elaboratePage({
    id: p.id,
    module: p.module,
    route: p.route,
    pageName: p.name,
    feature: p.feature || "Existing",
    status: p.status || "Shipped",
    overview: p.overview,
    scenarios: p.scenarios || [],
    howToCreate: p.howToCreate || [],
    howToUse: p.howToUse || [],
    whyToUse: p.whyToUse || "",
    whoCanUse: p.whoCanUse || "",
    whenToUse: p.whenToUse || "",
    whereToUse: p.whereToUse || "",
    implementationNotes: p.implementationNotes || "",
    featureFlags: p.featureFlags || "",
    relatedServices: p.relatedServices || "",
    personas: p.personas || [],
    verification: p.verification || [],
    commonMistakes: p.commonMistakes || [],
  });
}

const pages = [];
const add = (p) => pages.push(uc(p));

const std = {
  governancePersonas: ["MANAGER", "PROJECT_MANAGER", "EXECUTIVE", "ADMIN"],
  pmPersonas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "EXECUTIVE", "ADMIN"],
  financePersonas: ["FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
  hrPersonas: ["HR_ADMIN", "MANAGER", "EXECUTIVE", "ADMIN"],
  adminPersonas: ["ADMIN"],
  employeeAll: "All authenticated users with module access and org feature flags enabled.",
};

// ─── AUTH ───
add({ id: "auth-login", module: "Authentication", route: "/user/login", name: "Login", overview: "Secure entry point for Tracopus with email/password and optional SSO.", scenarios: [{ title: "Daily sign-in", description: "User starts session and lands on default module." }, { title: "Deep-link after login", description: "User follows bookmarked URL; return URL restores destination." }], howToCreate: ["Provisioned by HR/Admin when employee record is created."], howToUse: ["Open Tracopus URL.", "Enter credentials or SSO.", "Complete MFA if required."], whoCanUse: "All active Tracopus users.", whenToUse: "Every session.", whereToUse: "Public route before secure shell.", implementationNotes: "Preserve return URLs for governance deep links.", relatedServices: "user.service" });
add({ id: "auth-forgot", module: "Authentication", route: "/user/forgotpassword", name: "Forgot password", overview: "Initiates password reset via registered email.", scenarios: [{ title: "Recover access", description: "User resets password after forgetting credentials." }], howToCreate: ["Requires existing employee email on file."], howToUse: ["From login, click Forgot password.", "Submit email.", "Use emailed link to set new password."], whoCanUse: "Users with registered email.", whenToUse: "Credential loss or expiry.", whereToUse: "/user/forgotpassword", relatedServices: "user.service" });
add({ id: "auth-activate", module: "Authentication", route: "/user/activateaccount/:activationKey/:employeeId/:uniqueId", name: "Account activation", overview: "First-time account setup for new users.", scenarios: [{ title: "New hire activation", description: "Employee activates account from HR invitation." }], howToCreate: ["HR creates employee → system emails activation link."], howToUse: ["Open email link.", "Set password.", "Sign in and complete onboarding tasks."], whoCanUse: "Newly provisioned employees.", whenToUse: "First login before activation.", whereToUse: "Email deep link.", relatedServices: "user.service, employee.service" });
add({ id: "auth-changepwd", module: "Authentication", route: "/user/changepassword/:activationKey/:employeeId/:uniqueId", name: "Change password", overview: "Completes password change from secure token.", scenarios: [{ title: "Complete reset", description: "User sets new password after reset flow." }], howToCreate: ["Triggered by forgot-password or admin reset."], howToUse: ["Open secure link.", "Enter compliant new password.", "Sign in."], whoCanUse: "Token holder.", whenToUse: "After reset request.", whereToUse: "/user/changepassword/...", relatedServices: "user.service" });
add({ id: "auth-error500", module: "Authentication", route: "/error/error500", name: "Server error page", overview: "Friendly error surface when unrecoverable server failure occurs.", scenarios: [{ title: "Graceful failure", description: "User sees guidance instead of blank screen." }], howToCreate: ["N/A — system generated."], howToUse: ["Retry or contact admin.", "Return to home when service restored."], whoCanUse: "Any user hitting server error.", whenToUse: "On HTTP 500 / unhandled failure.", whereToUse: "/error/error500" });

// ─── HEADER RAIL ───
[
  ["hdr-search", "/project/search", "Global search", "F26", "Search projects, tasks, people; Work Graph when F26 enabled.", "workGraphService", ["All personas with project access"]],
  ["hdr-taskboard", "/project/taskboard", "Taskboard", "Header", "Kanban for deliverables (TaskModel).", "taskboard.service", ["EMPLOYEE", "MANAGER", "PROJECT_MANAGER"]],
  ["hdr-calendar", "/project/calendar", "Calendar", "Header", "Schedule view from tasks, leave, milestones.", "schedule.service", ["All personas"]],
  ["hdr-notes", "Notes overlay", "Pending notes", "Header", "Quick notes overlay.", "taskService", ["All personas"]],
  ["hdr-chat", "/project/chat", "Chat", "Header", "Project messaging.", "project services", ["Project members"]],
  ["hdr-files", "/project/filemanager", "File manager", "Header", "Document repository.", "project services", ["Project members"]],
  ["hdr-notifications", "/workspace/notifications", "Notifications", "F21", "Approval and assignment alerts.", "workspaceService", ["All personas"]],
  ["hdr-appconfig", "/admin/appconfig", "Application config", "Header", "Org/role JSON configuration.", "appconfig.service", ["ADMIN"]],
  ["hdr-settings", "Settings panel", "Settings", "Header", "UI theme and layout preferences.", "", ["All personas"]],
  ["hdr-today", "Today activity panel", "Today activity", "Header", "Daily activity and timesheet hints.", "dashboard.service", ["All personas"]],
  ["hdr-profile", "User panel", "User profile panel", "Header", "Profile, persona switcher, logout.", "", ["All personas"]],
].forEach(([id, route, name, feature, overview, svc, personas]) =>
  add({
    id,
    module: "Global header rail",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "Quick access workflow", description: `Use ${name} from any module via header rail without losing your current context.` }],
    personas,
    relatedServices: svc,
  })
);

// ─── WORKSPACE ───
[
  ["workspace-home", "/workspace/home", "Home", "F21", "Persona widgets: approvals, work, KPIs.", "workspaceService", ["All personas"]],
  ["workspace-mywork", "/workspace/my-work", "My work", "F21", "Unified work queue across modules.", "workspaceService", ["All personas"]],
  ["workspace-paychecks", "/workspace/my-paychecks", "My paychecks", "F09", "Employee payslip self-service.", "payrollService", ["EMPLOYEE", "MANAGER"]],
  ["workspace-approvals", "/workspace/approvals", "My approvals", "F07", "Universal approval inbox.", "universalApprovalService", ["MANAGER", "HR_ADMIN", "PAYROLL_MANAGER", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"]],
  ["workspace-onboarding", "/people/onboarding/my-tasks", "My onboarding", "F03", "New hire self-service checklist.", "onboardingService", ["EMPLOYEE"]],
  ["workspace-tickets", "/workspace/my-tickets", "My tickets", "F19", "Personal service desk queue.", "ticketManagementService", ["EMPLOYEE", "MANAGER"]],
  ["workspace-workgraph", "/workspace/work-graph", "Work graph", "F26", "Entity relationship explorer.", "workGraphService", ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "EXECUTIVE", "ADMIN"]],
].forEach(([id, route, name, feature, overview, svc, personas]) =>
  add({
    id,
    module: "Workspace",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "Daily operating rhythm", description: `Start or coordinate work from ${name}.` }],
    personas,
    featureFlags: "workspaceModules.* flags in Application Config.",
    relatedServices: svc,
    implementationNotes: "Workspace is not a business truth store — data sourced from Employee, Project, Task, approvals.",
  })
);

// ─── PROJECTS (detailed governance) ───
add({
  id: "project-dashboard",
  module: "Projects",
  route: "/project/dashboard",
  name: "Project dashboard",
  feature: "Existing",
  overview: "Executive and personal delivery KPIs: portfolio health, task completion, risk signals, quick navigation.",
  scenarios: [
    { title: "Weekly delivery review", description: "PM reviews team KPIs and at-risk projects." },
    { title: "Personal performance check", description: "Consultant views My teams tab for own assignments." },
  ],
  howToCreate: ["Create projects and deliverables first; dashboard aggregates live data."],
  howToUse: ["Projects → Dashboard.", "Switch Personal vs Team scope if permitted.", "Use quick nav to risks, milestones, or list."],
  whoCanUse: "Personas with projectModules.dashboardEnabled.",
  personas: std.pmPersonas,
  whenToUse: "Daily/weekly steering; sprint reviews.",
  whereToUse: "Projects module → Dashboard.",
  relatedServices: "dashboard.service, workitem.service",
});

add({
  id: "project-portfolio",
  module: "Projects",
  route: "/project/portfolio",
  name: "Portfolio control tower",
  feature: "F16",
  overview: "Cross-project health, steering cards, and program-level visibility for portfolio managers.",
  scenarios: [
    { title: "Executive portfolio review", description: "Review health scores and at-risk count across programs." },
    { title: "What-if scenario", description: "Model portfolio scenarios via linked scenarios page." },
  ],
  howToCreate: ["Ensure projects linked to accounts/POs; portfolio rolls up ProjectModel health."],
  howToUse: ["Projects → Portfolio.", "Filter by health, owner, account.", "Drill into project or open scenarios."],
  whoCanUse: "PROJECT_MANAGER, RESOURCE_MANAGER, FINANCE_MANAGER, EXECUTIVE, ADMIN.",
  personas: ["PROJECT_MANAGER", "RESOURCE_MANAGER", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
  whenToUse: "Monthly QBR; portfolio steering committee.",
  whereToUse: "Projects → Portfolio; scenarios at /project/portfolio/scenarios.",
  featureFlags: "projectModules.portfolioEnabled",
  relatedServices: "portfolioControlTowerService",
  implementationNotes: "Portfolio health sourced from live F16 rollups — not isolated tables.",
});

add({
  id: "project-list",
  module: "Projects",
  route: "/project/list",
  name: "Project list",
  feature: "Existing",
  overview: "Searchable register of all projects with filters, status, and team scope.",
  scenarios: [{ title: "Create and find projects", description: "PM creates project and team locates it by code." }],
  howToCreate: ["Projects → Project list → Create project.", "Fill name, code, dates, account, team.", "Save and open project details."],
  howToUse: ["Filter/search list.", "Open row for project workspace.", "Use actions for edit/archive per permissions."],
  whoCanUse: "MANAGER, PROJECT_MANAGER, RESOURCE_MANAGER, FINANCE_MANAGER, EXECUTIVE, ADMIN.",
  personas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
  whenToUse: "Project initiation; ongoing lookup.",
  whereToUse: "Projects → Project list.",
  relatedServices: "project.service",
});

add({
  id: "project-activities",
  module: "Projects",
  route: "/project/activites",
  name: "Work items / activity",
  feature: "Existing",
  overview: "Calendar/list of TaskActivity (work items) across deliverables — execution telemetry.",
  scenarios: [{ title: "Track daily work items", description: "Team logs and reviews activity on deliverables." }],
  howToCreate: ["Project details → Deliverable → Add work item (TaskActivityModel)."],
  howToUse: ["Projects → Work items / activity.", "Filter by project/person/date.", "Open work item to edit hours/status."],
  whoCanUse: std.employeeAll,
  whenToUse: "Daily execution; timesheet source data.",
  whereToUse: "Projects → Work items / activity.",
  implementationNotes: "Work Item = TaskActivityModel per naming compatibility rule.",
  relatedServices: "workitem.service",
});

add({
  id: "project-timeline",
  module: "Projects",
  route: "/project/timeline",
  name: "Timeline / Gantt",
  feature: "F15",
  overview: "Delivery Gantt chart with dependencies, critical path, and schedule analysis.",
  scenarios: [
    { title: "Plan release schedule", description: "PM sequences milestones and dependencies on Gantt." },
    { title: "Identify critical path", description: "Review critical path panel before committing dates." },
  ],
  howToCreate: ["Create milestones first.", "Add dependencies (FS/SS/FF/SF) between milestones.", "Timeline auto-enriches from governance data."],
  howToUse: ["Projects → Timeline / Gantt.", "Select project filter.", "Adjust dates in drawer; validate dependencies."],
  whoCanUse: "MANAGER, PROJECT_MANAGER, RESOURCE_MANAGER, EXECUTIVE, ADMIN.",
  personas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "EXECUTIVE", "ADMIN"],
  whenToUse: "Planning phase; re-baseline after change requests.",
  whereToUse: "Projects → Timeline / Gantt.",
  featureFlags: "projectModules.ganttEnabled; isProjectGovernanceEnabled()",
  relatedServices: "projectGovernanceService",
  implementationNotes: "Aligns with PMI schedule domain — milestones as control points before activity detail.",
});

add({
  id: "project-milestones",
  module: "Projects",
  route: "/project/milestones",
  name: "Milestones",
  feature: "F15",
  overview: "Goal-oriented control points (PLANNED → IN_PROGRESS → COMPLETE / AT_RISK / BLOCKED) tied to ProjectModel. Supports dependencies, critical path, optional AI import, and gate linkage.",
  scenarios: [
    { title: "Define phase gates", description: "PM creates Initiate/Plan/Deliver/Close milestones with owners and dates." },
    { title: "Track at-risk milestone", description: "Steering committee reviews AT_RISK milestones in weekly cadence." },
    { title: "Billing milestone approval", description: "Finance links approved milestone to invoice draft (V6F)." },
  ],
  howToCreate: [
    "Enable projectModules.milestonesEnabled in Application Config.",
    "Projects → Milestones → use create panel or open Milestone drawer.",
    "Select project (required — milestones cannot exist without projectId).",
    "Enter name, planned start/end, owner, status PLANNED.",
    "Optionally link to governance gate.",
    "Add dependencies via Dependency register (predecessor/successor, lag days).",
    "Optional: import AI draft from Governance AI panel — human must approve before import.",
  ],
  howToUse: [
    "Filter by project, status, or search.",
    "Open milestone drawer to update % complete, actual dates, status.",
    "Review KPI strip: total, at-risk, blocked, on critical path.",
    "Use quick links to Risks, Issues, Governance.",
    "Export or refresh register after bulk updates.",
  ],
  whoCanUse: "MANAGER, PROJECT_MANAGER, EXECUTIVE, ADMIN with milestonesEnabled.",
  personas: std.governancePersonas,
  whenToUse: "Project planning; weekly status; before gate approvals; pre-invoice billing milestones.",
  whereToUse: "Projects module → Milestones (/project/milestones). Also referenced from Timeline, Governance, Portfolio.",
  featureFlags: "projectModules.milestonesEnabled; USE_PROJECT_GOVERNANCE_API; PROJECT_GOVERNANCE_AI_IMPORT_ENABLED",
  relatedServices: "projectGovernanceService — listMilestones, updateMilestone, createDependency",
  implementationNotes: "Per PMI: milestones are results-oriented control points, not activity lists. Must always reference ProjectModel. Status AT_RISK/BLOCKED drives portfolio signals. Dependency validation prevents circular logic.",
});

add({
  id: "project-risks",
  module: "Projects",
  route: "/project/risks",
  name: "Risks",
  feature: "F15",
  overview: "Risk register for uncertain future events (severity LOW→CRITICAL; status Open→Mitigating→Escalated→Closed). Distinct from Issues (events that already occurred).",
  scenarios: [
    { title: "Identify delivery risk", description: "PM logs vendor delay risk with mitigation plan and owner." },
    { title: "Escalate critical risk", description: "Escalate to executive steering with timestamp." },
    { title: "Risk materializes", description: "When risk occurs, create linked Issue; keep risk history for lessons learned." },
  ],
  howToCreate: [
    "Projects → Risks → New risk form.",
    "Select project (required).",
    "Enter title, severity, owner, mitigation plan, due date.",
    "Status defaults to Open.",
    "Save — appears in register and heatmap.",
  ],
  howToUse: [
    "Review heatmap by severity × status.",
    "Filter by project/severity/status.",
    "Open Risk drawer to update mitigation or close when accepted/mitigated.",
    "Escalate via drawer action for Escalated status.",
    "Link to RCA when root cause analysis needed (/project/rca).",
  ],
  whoCanUse: "MANAGER, PROJECT_MANAGER, EXECUTIVE, ADMIN.",
  personas: std.governancePersonas,
  whenToUse: "Planning (high uncertainty) and periodic review (monthly for long projects; weekly for short/high-change).",
  whereToUse: "Projects → Risks; analytics at /analytics/risk; AI Risk agent at /ai/risk-agent.",
  featureFlags: "projectModules.risksEnabled",
  relatedServices: "projectGovernanceService — createRisk, updateRisk, escalateRisk",
  implementationNotes: "PMI: risks are future events; review cadence scales with project length. Closure requires MITIGATED or ACCEPTED for project closure readiness. Must have projectId.",
});

add({
  id: "project-issues",
  module: "Projects",
  route: "/project/issues",
  name: "Issues & actions",
  feature: "F15",
  overview: "Issue log for events that have already happened, with prioritized actions (P1–P4), aging, and SLA tracking.",
  scenarios: [
    { title: "Production defect", description: "Log P1 issue with owner and corrective actions." },
    { title: "Action tracking", description: "Assign action items with due dates; close issue when all actions complete." },
    { title: "Materialized risk", description: "Convert realized risk into issue while preserving risk register history." },
  ],
  howToCreate: [
    "Projects → Issues & actions → Create issue.",
    "Select project (required).",
    "Set title, priority (P1 highest), owner, description, due date.",
    "Open issue drawer → Add actions with owners and SLA days.",
  ],
  howToUse: [
    "Monitor aging panel for overdue issues.",
    "Filter by priority/status/project.",
    "Update status Open → In progress → Resolved → Closed.",
    "Complete actions individually before closing issue.",
  ],
  whoCanUse: "MANAGER, PROJECT_MANAGER, EXECUTIVE, ADMIN.",
  personas: std.governancePersonas,
  whenToUse: "During execution and closure — focus intensifies near project end per PMI guidance.",
  whereToUse: "Projects → Issues & actions; linked from Governance dashboard.",
  featureFlags: "projectModules.issuesEnabled",
  relatedServices: "projectGovernanceService — listIssues, createIssue, listIssueActions, closeIssue",
  implementationNotes: "PMI: issues ≠ risks. Actions are child records with OPEN/COMPLETE status. Project closure requires all issues RESOLVED.",
});

add({
  id: "project-governance",
  module: "Projects",
  route: "/project/governance",
  name: "Governance",
  feature: "F15",
  overview: "Governance dashboard: gates (Initiate/Plan/Deliver/Close), decision log, change requests, and closure readiness.",
  scenarios: [
    { title: "Stage gate approval", description: "Approver reviews gate criteria linked to milestone." },
    { title: "Change request workflow", description: "Submit CR DRAFT→SUBMITTED→APPROVED→IMPLEMENTED." },
    { title: "Project closure check", description: "Run closure readiness — tasks done, risks mitigated, issues resolved, lessons published." },
  ],
  howToCreate: [
    "Gates: created per project stage with approver and criteria.",
    "Decisions: log scope/schedule/resource decisions with rationale.",
    "Change requests: draft impact summary and proposed scope.",
  ],
  howToUse: [
    "Projects → Governance.",
    "Review gate status PENDING/APPROVED/REJECTED/WAIVED.",
    "Approve/reject with decision notes.",
    "Track change requests through lifecycle.",
  ],
  whoCanUse: "PROJECT_MANAGER, EXECUTIVE, ADMIN.",
  personas: ["PROJECT_MANAGER", "EXECUTIVE", "ADMIN"],
  whenToUse: "Phase transitions; formal change control; project close-out.",
  whereToUse: "Projects → Governance.",
  featureFlags: "projectModules.governanceEnabled",
  relatedServices: "projectGovernanceService",
  implementationNotes: "Closure readiness evaluator checks terminal tasks, risks, issues, tickets, RCA, lessons — single source from Project aggregate.",
});

add({
  id: "project-tickets",
  module: "Projects",
  route: "/project/tickets",
  name: "Tickets & service",
  feature: "F19",
  overview: "Service desk queues for project/org support requests with assignment and SLA.",
  scenarios: [{ title: "IT support queue", description: "Ops team triages incoming tickets." }],
  howToCreate: ["Create ticket with category, priority, requester, project link."],
  howToUse: ["Projects → Tickets.", "Assign, update status, resolve."],
  whoCanUse: "MANAGER, PROJECT_MANAGER, ADMIN.",
  personas: ["MANAGER", "PROJECT_MANAGER", "ADMIN"],
  whenToUse: "Service operations; employee requests via My tickets.",
  whereToUse: "Projects → Tickets; employee view at /workspace/my-tickets.",
  featureFlags: "projectModules.ticketsEnabled",
  relatedServices: "ticketManagementService",
});

add({
  id: "project-lessons",
  module: "Projects",
  route: "/project/lessons-learned",
  name: "Lessons learned",
  feature: "F28",
  overview: "Knowledge capture from project execution — publishable lessons with pattern analytics. Updated throughout project life, not only at close (PMI best practice).",
  scenarios: [
    { title: "Capture mid-project insight", description: "Team documents tooling lesson after sprint retrospective." },
    { title: "Publish for org knowledge", description: "PM publishes approved lesson for search/AI knowledge base." },
    { title: "Closure requirement", description: "Publish required lessons before project closure readiness passes." },
  ],
  howToCreate: [
    "Enable projectModules.lessonsLearnedEnabled.",
    "Projects → Lessons learned → create lesson linked to projectId.",
    "Draft content: context, lesson, recommendation, category.",
    "Publish when reviewed (publishLesson action).",
  ],
  howToUse: [
    "Browse register; filter by status.",
    "Review KPI cards and pattern insights panel.",
    "Export CSV for PMO repository.",
    "Cross-link to RCA records where applicable.",
  ],
  whoCanUse: "MANAGER, PROJECT_MANAGER, EXECUTIVE, ADMIN.",
  personas: std.governancePersonas,
  whenToUse: "Retrospectives; gate reviews; project closure.",
  whereToUse: "Projects → Lessons learned; AI Knowledge at /ai/knowledge.",
  featureFlags: "lessonsLearnedEnabled; isKnowledgeRcaEnabled()",
  relatedServices: "knowledgeRcaService — getLessonsOverview, publishLesson, exportLessonsCsv",
  implementationNotes: "Lessons must link to ProjectModel. Store summaries only in AI audit when masking applies. Feeds organizational learning loop per PMBOK Closing focus area.",
});

add({
  id: "project-rca",
  module: "Projects",
  route: "/project/rca",
  name: "Root cause analysis",
  feature: "F28",
  overview: "Structured RCA linked to projectId and optionally ticketId, issueId, riskId, taskId, ownerEmployeeId.",
  scenarios: [
    { title: "Post-incident RCA", description: "After P1 issue, team documents root cause and corrective actions." },
    { title: "Risk deep-dive", description: "Analyze recurring risk pattern before mitigation update." },
  ],
  howToCreate: ["Projects → RCA → New record.", "Link project and optional issue/risk/task.", "Document findings; submit for approval/publication."],
  howToUse: ["Filter RCA register.", "Open detail; link to lessons learned.", "Track approval for closure readiness."],
  whoCanUse: "MANAGER, PROJECT_MANAGER, EXECUTIVE, ADMIN.",
  personas: std.governancePersonas,
  whenToUse: "After significant incidents; before repeating mitigation.",
  whereToUse: "Projects → Root cause analysis.",
  featureFlags: "projectModules.rcaEnabled",
  relatedServices: "knowledgeRcaService",
  implementationNotes: "RCA links validated via KnowledgeRcaLinkValidator; rootEntity=ProjectModel.",
});

add({
  id: "project-feedback",
  module: "Projects",
  route: "/project/feedback",
  name: "Feedback",
  feature: "Existing",
  overview: "Project feedback templates and response collection (internal and external via document links).",
  scenarios: [{ title: "Client satisfaction survey", description: "Send feedback request link after milestone." }],
  howToCreate: ["Configure template; send request from project feedback page."],
  howToUse: ["Track responses; analyze in project context."],
  whoCanUse: std.employeeAll,
  whenToUse: "Milestone completion; project closure.",
  whereToUse: "Projects → Feedback; external at /document/feedback/...",
  relatedServices: "feedback.service",
});

add({
  id: "project-reports",
  module: "Projects",
  route: "/project/reports",
  name: "Operational reports",
  feature: "Existing",
  overview: "Project operational reporting and exports.",
  scenarios: [{ title: "Weekly status export", description: "PM exports progress report for stakeholders." }],
  howToCreate: ["Configure report parameters; run from reports page."],
  howToUse: ["Select project/period.", "Generate and download."],
  whoCanUse: "MANAGER, PROJECT_MANAGER, FINANCE_MANAGER, EXECUTIVE, ADMIN.",
  personas: ["MANAGER", "PROJECT_MANAGER", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
  whenToUse: "Status reporting cadence.",
  whereToUse: "Projects → Operational reports.",
  relatedServices: "Core reporting",
});

// Project detail/hidden routes
[
  ["project-capacity", "/project/capacity", "Team capacity", "F13", "Overview/Roster/Timeline/Gantt tabs for resource capacity.", "resourcePlanningService"],
  ["project-details", "/project/details/:projectId", "Project details", "Existing", "Full project workspace: members, files, dashboard tabs.", "project.service"],
  ["project-deliverables", "/project/deliverables/:projectId", "Deliverables list", "Existing", "Task/deliverable list for a project.", "task.service"],
  ["project-deliverable", "/project/deliverable/:taskId", "Deliverable details", "Existing", "Single Task (deliverable) detail.", "task.service"],
  ["project-workitems", "/project/workitems/:taskId", "Work items for deliverable", "Existing", "TaskActivity list for deliverable.", "workitem.service"],
  ["project-po-detail", "/project/purchaseorder/:purchaseOrderId", "PO details (project)", "Existing", "Purchase order detail from project context.", "purchaseorder.service"],
  ["project-bid-detail", "/project/bidrequest/:bidRequestId", "Bid details (project)", "Existing", "Bid request detail.", "bid.requests.service"],
  ["project-todolist", "/project/todolist", "Notes list", "Existing", "Personal/project notes.", "taskService"],
  ["project-portfolio-scenarios", "/project/portfolio/scenarios", "Portfolio scenarios", "F16", "What-if portfolio modeling.", "portfolioControlTowerService"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Projects",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "Deep execution workflow", description: `Navigate to ${name} from project context or direct URL.` }],
    howToCreate: id.includes("deliverable") ? ["Project details → Add deliverable (TaskModel)."] : ["Create parent project/PO/bid first."],
    howToUse: ["Open from project list/details or bookmarked URL.", "Complete actions in page tabs/drawers."],
    whoCanUse: std.employeeAll,
    whenToUse: "During active project delivery.",
    whereToUse: route,
    relatedServices: svc,
    implementationNotes: id.includes("deliverable") ? "Deliverable = TaskModel per naming rule." : "",
  })
);

// ─── PEOPLE ───
const peoplePages = [
  ["people-dashboard", "/people/dashboard", "HR dashboard", "Existing", "Role-based HR workforce dashboard.", "dashboard.service", std.hrPersonas],
  ["people-employees", "/people/employees", "Employees", "Existing", "Employee directory and HR management.", "employee.service", ["HR_ADMIN", "MANAGER", "ADMIN"]],
  ["people-onboarding", "/people/onboarding", "Onboarding", "F03", "Onboarding case management.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-onboarding-templates", "/people/onboarding/templates", "Onboarding templates", "F03", "Reusable onboarding checklists.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-onboarding-case", "/people/onboarding/:caseId", "Onboarding case detail", "F03", "Single onboarding case tasks and status.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-offboarding", "/people/offboarding", "Offboarding", "F03", "Offboarding case management.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-offboarding-templates", "/people/offboarding/templates", "Offboarding templates", "F03", "Reusable offboarding checklists.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-offboarding-case", "/people/offboarding/:caseId", "Offboarding case detail", "F03", "Single offboarding case.", "onboardingService", ["HR_ADMIN", "ADMIN"]],
  ["people-attendance", "/people/attendance", "Attendance", "Existing", "Attendance tracking and regularization.", "attendance-regularization.service", ["EMPLOYEE", "MANAGER", "HR_ADMIN"]],
  ["people-leaves", "/people/leaves", "Leave management", "F04", "Leave requests and balances.", "leave.service", ["EMPLOYEE", "MANAGER", "HR_ADMIN"]],
  ["people-timesheet", "/people/timesheet", "Timesheets", "F06", "Timesheet entry and approval workflow.", "timesheetApprovalService", ["EMPLOYEE", "MANAGER"]],
  ["people-documents", "/people/documents", "Documents", "F11", "Employee document vault.", "documentVaultService", ["EMPLOYEE", "HR_ADMIN"]],
  ["people-assets", "/people/assets", "Assets", "F12", "IT/asset register.", "assetRegisterService", ["HR_ADMIN", "ADMIN"]],
  ["people-orgchart", "/people/org-chart", "Organization chart", "F25", "Interactive org structure.", "orgStructureService", std.hrPersonas],
  ["people-policies", "/people/policies", "Policies", "F11/F25", "Policy hub and acknowledgments.", "policyHubService", std.hrPersonas],
  ["people-policy-detail", "/people/policies/:policyId", "Policy detail", "F11", "Single policy view and acknowledgment.", "policyHubService", std.hrPersonas],
  ["people-settings", "/people/settings", "Settings (ops)", "Existing", "HR operational profile settings.", "", ["HR_ADMIN", "ADMIN"]],
  ["people-profile", "/people/employees/:employeeId", "Employee profile", "Existing", "Full employee profile.", "employee.service", ["HR_ADMIN", "MANAGER", "ADMIN"]],
  ["people-360-list", "/people/employees/360", "Employee 360 hub", "F02", "Employee 360 list view.", "employee360Service", ["HR_ADMIN", "MANAGER", "ADMIN"]],
  ["people-360-detail", "/people/employees/:employeeId/360", "Employee 360 detail", "F02", "Holistic employee view.", "employee360Service", ["HR_ADMIN", "MANAGER", "ADMIN"]],
  ["people-holidays", "/people/holidays", "Holidays", "F25", "V6H-EA02: HR holiday calendar from Application Config org calendar + leave policy.", "leave.service", std.hrPersonas, "Shipped"],
  ["admin-leave-policies", "/admin/leave-policies", "Leave policies", "F04", "Admin leave policy configuration.", "leave.service", ["HR_ADMIN", "ADMIN"]],
  ["admin-emp-leave-config", "/admin/employee-leave-config", "Employee leave config", "F04", "Per-employee leave setup.", "leave.service", ["HR_ADMIN", "ADMIN"]],
  ["admin-global-leave-policy", "/admin/leave/global-policy-center", "Global Leave Policy Center", "F04", "Jurisdictions, templates, versioned accrual policies, holiday calendar assignment, OT/comp-off, compliance.", "globalLeavePolicy.service", ["HR_ADMIN", "ADMIN"]],
  ["admin-leave-legal-calendars", "/admin/leave/legal-calendars", "Leave legal calendars", "GLP-18", "Draft/publish official holiday calendars that sync to People → Holidays for leave day counting.", "leavePhase2.service", ["HR_ADMIN", "ADMIN"]],
  ["admin-leave-policy-test-lab", "/admin/leave/policy-test-lab", "Leave policy test lab", "GLP-20", "Scenario runs and publish gates before promoting a leave policy version.", "leavePhase2.service", ["HR_ADMIN", "ADMIN"]],
  ["people-delegation", "/admin/delegation", "Delegation rules", "F07", "Approval delegation when approver unavailable.", "approvalDelegationService", ["HR_ADMIN", "ADMIN", "MANAGER"]],
];
peoplePages.forEach((row) => {
  const [id, route, name, feature, overview, svc, personas, status] = row;
  const leaveAdminIds = new Set([
    "admin-leave-policies",
    "admin-emp-leave-config",
    "admin-global-leave-policy",
    "admin-leave-legal-calendars",
    "admin-leave-policy-test-lab",
  ]);
  const featureFlags = leaveAdminIds.has(id)
    ? id === "admin-global-leave-policy" || id === "admin-leave-legal-calendars" || id === "admin-leave-policy-test-lab"
      ? "leaveAdditional.globalLeavePoliciesEnabled + adminModules.globalLeavePoliciesEnabled"
      : "adminModules.leavePoliciesEnabled"
    : id.startsWith("admin-")
      ? "adminModules.leavePoliciesEnabled"
      : "peopleModules.* (page-specific flag)";
  add({
    id,
    module: id.startsWith("admin-") ? "Administration" : "People",
    route,
    name,
    feature,
    status: status || "Shipped",
    overview,
    scenarios:
      id === "admin-global-leave-policy"
        ? [
            { title: "Publish jurisdiction policy", description: "Apply template, simulate, assign holiday key, publish version." },
            { title: "Holiday-aware leave days", description: "Prove leave spanning a holiday excludes that day from numberOfDays." },
          ]
        : id === "admin-leave-legal-calendars"
          ? [
              { title: "Create and publish calendar", description: "Draft entries, publish, sync to People holidays." },
              { title: "Optional vs blocking", description: "Optional entries do not sync; blocking entries drive leave day count." },
            ]
          : [
              { title: "HR operational workflow", description: `Complete ${name} as part of standard workforce management.` },
              { title: "Manager self-service", description: "Manager acts on team records within role scope." },
            ],
    personas,
    featureFlags,
    relatedServices: svc,
    implementationNotes:
      id.startsWith("admin-leave") || id === "admin-global-leave-policy" || id === "admin-emp-leave-config"
        ? "Canonical sources: Employee, LeavePolicy/GlobalLeave, fs_holiday_model, TaskActivity promotion. See /documentation/hrms/leave-configuration.html."
        : "EmployeeModel is source of truth; onboarding/offboarding are workflow records not duplicate employee stores.",
  });
});

// ─── RESOURCES ───
[
  ["res-capacity", "/project/capacity", "Team capacity", "F13", "Tabs: Overview, Roster, Timeline, Gantt.", "resourcePlanningService"],
  ["res-skills", "/resources/skills", "Skills matrix", "F13", "Skills inventory and gap analysis.", "resourcePlanningService"],
  ["res-staffing", "/resources/staffing-requests", "Staffing requests", "F13", "Open staffing demand tracking.", "resourcePlanningService"],
  ["res-bench", "/resources/bench", "Bench & roll-off", "F13", "Bench management and roll-off planning.", "resourcePlanningService"],
  ["res-planner", "/resources/planner", "Capacity simulation", "F13", "What-if capacity modeling.", "resourcePlanningService"],
  ["res-utilization", "/resources/utilization", "Resource analytics", "F13/F24", "Utilization metrics and trends.", "resourcePlanningService"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Resources",
    route,
    name,
    feature,
    overview,
    scenarios: [
      { title: "Staff project team", description: "Resource manager checks capacity before approving staffing request." },
      { title: "Bench planning", description: "Identify available consultants for new bid." },
    ],
    personas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "EXECUTIVE", "ADMIN"],
    featureFlags: "resourcesModules.*",
    relatedServices: svc,
    implementationNotes: "Capacity data sourced from Employee + Project assignments — not isolated truth.",
  })
);

// ─── FINANCE ───
[
  ["fin-dashboard", "/finance/dashboard", "Finance dashboard", "F22", "Finance KPIs and steering.", "financeIntelligenceService"],
  ["fin-accounts", "/finance/accounts", "Accounts", "Existing", "Client account register.", "account.service"],
  ["fin-bids", "/finance/bidrequests", "Bid requests", "Existing", "Sales bid/opportunity register.", "bid.requests.service"],
  ["fin-pos", "/finance/purchaseorders", "Purchase orders", "Existing", "PO register (PurchaseOrderModel).", "purchaseorder.service"],
  ["fin-project-fin", "/finance/project-financials", "Project financials", "F22", "Project-level financial roll-ups.", "financeIntelligenceService"],
  ["fin-invoice", "/finance/invoice", "Invoices", "Existing", "Invoice list and management.", "invoice.service"],
  ["fin-invoice-detail", "/finance/invoice/details/:invoiceId", "Invoice details", "Existing", "Single invoice view.", "invoice.service"],
  ["fin-billing", "/finance/billing-plans", "Billing plans", "F22", "Billing plan management.", "financeIntelligenceService"],
  ["fin-forecast", "/finance/revenue-forecast", "Revenue forecast", "F22", "Revenue forecasting.", "financeIntelligenceService"],
  ["fin-leakage", "/finance/revenue-leakage", "Revenue leakage", "F22", "Leakage detection.", "financeIntelligenceService"],
  ["fin-expenses", "/finance/expenses", "Expenses (finance view)", "F10", "Finance expense approval queue.", "expensesService"],
  ["fin-bid-detail", "/finance/bidrequest/:bidRequestId", "Bid details", "Existing", "Bid detail page.", "bid.requests.service"],
  ["fin-po-detail", "/finance/purchaseorder/:purchaseOrderId", "PO details", "Existing", "PO detail page.", "purchaseorder.service"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Finance",
    route,
    name,
    feature,
    overview,
    scenarios: [
      { title: "Contract-to-cash", description: "Bid → PO → Project → Invoice flow." },
      { title: "Revenue steering", description: "CFO reviews forecast and leakage." },
    ],
    personas: std.financePersonas,
    featureFlags: "financeModules.*",
    relatedServices: svc,
    implementationNotes: "Purchase Contract = PurchaseOrderModel. Invoice drafts from approved milestone/TaskActivity/expense per V6F scope.",
  })
);

// ─── PAYROLL ───
[
  ["pay-dashboard", "/payroll/dashboard", "Payroll dashboard", "F08", "Payroll ops overview.", "payrollService"],
  ["pay-salary", "/payroll/salary-structures", "Salary structures", "F08", "Compensation structure definitions.", "payrollService"],
  ["pay-groups", "/payroll/groups", "Payroll groups", "F08", "Payroll run grouping.", "payrollService"],
  ["pay-runs", "/payroll/runs", "Payroll runs", "F08", "Run management.", "payrollService"],
  ["pay-run-detail", "/payroll/runs/:runId", "Payroll run detail", "F08", "Single run processing.", "payrollService"],
  ["pay-paychecks", "/payroll/paychecks", "Paychecks", "F09", "Published payslips admin view.", "payrollService"],
  ["pay-paycheck-detail", "/payroll/paychecks/:paycheckId", "Paycheck detail", "F09", "Single paycheck.", "payrollService"],
  ["pay-benefits", "/payroll/benefits", "Benefits", "F23", "Benefits catalog and enrollments.", "employeeFinanceService"],
  ["pay-compensation", "/payroll/compensation", "Compensation", "F23", "Compensation change workflow.", "employeeFinanceService"],
  ["pay-deductions", "/payroll/deductions", "Deductions", "F08", "V6H-EA03: Payroll child deduction rules with run preview and paycheck impact.", "payroll.service", "Shipped"],
  ["pay-reimburse", "/payroll/reimbursements", "Reimbursements", "F10", "Reimbursement payout queue.", "expensesService"],
  ["pay-emp-fin", "/payroll/employee-finance", "Employee finance", "F23", "CTC, advances, loans.", "employeeFinanceService"],
  ["pay-expenses", "/payroll/expenses", "Expenses (employee)", "F10", "Employee expense claims.", "expensesService"],
  ["pay-reports", "/payroll/reports", "Payroll reports", "F08/F24", "Payroll reporting.", "analyticsPlatformService"],
].forEach((row) => {
  const [id, route, name, feature, overview, svc, status] = row;
  add({
    id,
    module: "Payroll",
    route,
    name,
    feature,
    status: status || "Shipped",
    overview,
    scenarios: [{ title: "Payroll cycle", description: "Configure → Run → Publish paychecks." }, { title: "Employee claim", description: "Employee submits expense/reimbursement." }],
    personas: ["PAYROLL_MANAGER", "FINANCE_MANAGER", "HR_ADMIN", "ADMIN", "EMPLOYEE"],
    featureFlags: "payrollModules.*",
    relatedServices: svc,
  });
});

// ─── PERFORMANCE ───
[
  ["perf-dashboard", "/performance/dashboard", "Performance dashboard", "F14", "Cycle overview.", "performanceManagementService"],
  ["perf-goals", "/performance/goals", "Goals / OKRs", "F14", "Goal setting and tracking.", "performanceManagementService"],
  ["perf-cycles", "/performance/review-cycles", "Review cycles", "F14", "Cycle administration.", "performanceManagementService"],
  ["perf-reviews", "/performance/reviews", "Performance reviews", "F14", "Review submissions and scoring.", "performanceManagementService"],
  ["perf-feedback", "/performance/feedback", "Continuous feedback", "F14", "Ongoing feedback.", "performanceManagementService"],
  ["perf-1on1", "/performance/1on1", "1:1 notes", "F14", "Manager-employee 1:1 records.", "performanceManagementService"],
  ["perf-growth", "/performance/growth-plans", "Growth plans", "F14", "Individual development plans.", "performanceManagementService"],
  ["perf-calibration", "/performance/calibration", "Calibration", "F14", "Review calibration sessions.", "performanceManagementService"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Performance",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "Performance cycle", description: "Goals → Reviews → Calibration → Growth plans." }],
    personas: ["EMPLOYEE", "MANAGER", "HR_ADMIN", "EXECUTIVE", "ADMIN"],
    featureFlags: "performanceModules.*; isPerformanceManagementEnabled()",
    relatedServices: svc,
    implementationNotes: "Distinct from project feedback — performance feedback is HR cycle scoped.",
  })
);

// ─── ANALYTICS ───
[
  ["an-control", "/analytics/executive-control-tower", "Executive control tower", "F16", "Enterprise steering dashboard.", "portfolioControlTowerService"],
  ["an-hub", "/analytics/hub", "Analytics hub", "F24", "Analytics platform entry.", "analyticsPlatformService"],
  ["an-exec", "/analytics/executive", "Executive analytics", "F24", "Leadership KPIs.", "analyticsPlatformService"],
  ["an-workforce", "/analytics/workforce", "Workforce analytics", "F24", "Headcount, attrition, hiring.", "analyticsPlatformService"],
  ["an-delivery", "/analytics/delivery", "Delivery analytics", "F24", "Velocity and quality metrics.", "analyticsPlatformService"],
  ["an-resource", "/analytics/resource", "Resource analytics", "F24", "Utilization analytics.", "analyticsPlatformService"],
  ["an-payroll", "/analytics/payroll", "Payroll analytics", "F24", "Payroll cost analytics.", "analyticsPlatformService"],
  ["an-finance", "/analytics/finance", "Financial analytics", "F24", "Revenue and margin.", "analyticsPlatformService"],
  ["an-approvals", "/analytics/approvals", "Approvals analytics", "F24", "Approval SLA throughput.", "analyticsPlatformService"],
  ["an-risk", "/analytics/risk", "Risk intelligence", "F24", "Cross-portfolio risk signals.", "analyticsPlatformService"],
  ["an-workgraph", "/analytics/work-graph", "Work graph analytics", "F26", "Graph-based analytics.", "workGraphService"],
  ["an-ai-insights", "/analytics/ai-insights", "AI insights", "F17", "V6H-EA05: Analytics AI insight cards with sourceEntity references and persona masking.", "analyticsPlatform.service", "Shipped"],
  ["an-report-builder", "/analytics/report-builder", "Report builder", "F24", "Ad-hoc report construction.", "analyticsPlatformService"],
  ["an-scheduled", "/analytics/scheduled-reports", "Scheduled reports", "F24", "Scheduled report management.", "analyticsPlatformService"],
].forEach((row) => {
  const [id, route, name, feature, overview, svc, status] = row;
  add({
    id,
    module: "Analytics",
    route,
    name,
    feature,
    status: status || "Shipped",
    overview,
    scenarios: [{ title: "Steering committee", description: "Leadership reviews domain KPIs." }, { title: "Ad-hoc analysis", description: "Analyst builds custom report." }],
    personas: id.includes("workforce") ? std.hrPersonas : id.includes("finance") ? std.financePersonas : id.includes("delivery") || id.includes("resource") ? ["PROJECT_MANAGER", "RESOURCE_MANAGER", "EXECUTIVE", "ADMIN"] : ["EXECUTIVE", "ADMIN"],
    featureFlags: "analyticsModules.*",
    relatedServices: svc,
    implementationNotes: "Analytics datasets source from Employee, Project, PO, approvals — not isolated truth stores.",
  });
});

// ─── AI ───
[
  ["ai-agents", "/ai/agents", "AI agent registry", "F17", "Agent catalog and console.", "aiWorkIntelligenceService"],
  ["ai-wbs", "/ai/wbs-assistant", "WBS assistant", "F17", "AI-assisted work breakdown.", "aiWorkIntelligenceService"],
  ["ai-staffing", "/ai/staffing-agent", "Staffing agent", "F17", "Staffing recommendations.", "aiWorkIntelligenceService"],
  ["ai-timesheet", "/ai/timesheet-agent", "Timesheet agent", "F17", "Timesheet anomaly assist.", "aiWorkIntelligenceService"],
  ["ai-payroll", "/ai/payroll-readiness", "Payroll readiness agent", "F17", "Pre-run payroll checks.", "aiWorkIntelligenceService"],
  ["ai-risk", "/ai/risk-agent", "Risk agent", "F17", "Risk detection assistant.", "aiWorkIntelligenceService"],
  ["ai-exec", "/ai/executive-briefing", "Executive briefing", "F17", "Leadership briefing generation.", "aiWorkIntelligenceService"],
  ["ai-reco", "/ai/recommendations", "Recommendations", "F17", "AI recommendation feed.", "aiWorkIntelligenceService"],
  ["ai-knowledge", "/ai/knowledge", "Knowledge & RCA", "F28", "Knowledge base and RCA articles.", "knowledgeRcaService"],
  ["ai-audit", "/ai/audit", "AI decision audit", "F17", "V6H-EA06: Masked AI run audit — source references, no raw sensitive prompts.", "aiWorkIntelligence.service", "Shipped"],
].forEach((row) => {
  const [id, route, name, feature, overview, svc, status] = row;
  add({
    id,
    module: "AI Intelligence",
    route,
    name,
    feature,
    status: status || "Shipped",
    overview,
    scenarios: [{ title: "Assisted decision", description: "Human reviews AI suggestion before applying to canonical records." }],
    personas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "HR_ADMIN", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
    featureFlags: "aiModules.*",
    relatedServices: svc,
    implementationNotes: "AI audits store masked summaries only when persona masking applies. Never persist raw sensitive fields.",
  });
});

// ─── INTEGRATIONS ───
[
  ["int-hub", "/integrations/hub", "Integration hub", "F18", "Connector overview and health.", "integrationCenterService"],
  ["int-market", "/integrations/marketplace", "Connector marketplace", "F30", "Available connectors.", "developerPortalService"],
  ["int-sync", "/integrations/sync-health", "Sync monitor", "F18", "Sync status monitoring.", "integrationCenterService"],
  ["int-mapping", "/integrations/mapping", "Data mapping", "F18", "Field/entity mapping.", "integrationCenterService"],
  ["int-jobs", "/integrations/jobs", "Import/export jobs", "F18", "Batch job management.", "integrationCenterService"],
  ["int-logs", "/integrations/logs", "Integration logs", "F18", "Integration event logs.", "integrationCenterService"],
  ["int-adapters", "/integrations/adapters", "Connector adapters", "F18", "Adapter configuration.", "integrationCenterService"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Integrations",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "ERP sync", description: "Monitor nightly employee sync health." }],
    personas: ["MANAGER", "PROJECT_MANAGER", "RESOURCE_MANAGER", "HR_ADMIN", "FINANCE_MANAGER", "EXECUTIVE", "ADMIN"],
    featureFlags: "isIntegrationCenterEnabled()",
    relatedServices: svc,
  })
);

// ─── ADMIN ───
[
  ["adm-roles", "/admin/roles", "Roles & permissions", "F20", "RBAC matrix.", "rolePermissionService"],
  ["adm-approval-policies", "/admin/approval-policies", "Approval policies", "F07", "Universal approval policy config.", "approvalPolicyService"],
  ["adm-delegation", "/admin/delegation", "Delegation rules", "F07", "Approval delegation.", "approvalDelegationService"],
  ["adm-workflows", "/admin/workflows", "Workflow studio", "F27", "Visual workflow builder.", "workflowAutomationService"],
  ["adm-automation", "/admin/automation-rules", "Automation rules", "F27", "Rule-based automation.", "workflowAutomationService"],
  ["adm-access-req", "/admin/access-requests", "Access requests", "F12", "IT access provisioning.", "assetRegisterService"],
  ["adm-org", "/admin/org-structure", "Org structure", "F25", "Org unit administration.", "orgStructureService"],
  ["adm-flags", "/admin/feature-flags", "Feature flags", "F20", "Feature flag registry.", "featureFlagService"],
  ["adm-audit", "/admin/audit", "Audit & compliance", "F20", "Unified audit log.", "auditService"],
  ["adm-compliance", "/admin/compliance-export", "Compliance export", "F20", "Compliance data export packs.", "compliancePackService"],
  ["adm-insights", "/admin/insights", "Admin insights", "F20", "Admin operational insights.", "adminInsightsService"],
  ["adm-retention", "/admin/data-retention", "Data retention", "F20", "Retention policy management.", "dataRetentionService"],
  ["adm-security", "/admin/security", "Security settings", "F20", "Masking/security policies.", "maskingPolicyService"],
  ["adm-developer", "/admin/developer", "Developer portal", "F30", "API docs and tools.", "developerPortalService"],
  ["adm-apikeys", "/admin/api-keys", "API keys", "F30", "API key management.", "developerPortalService"],
  ["adm-webhooks", "/admin/webhooks", "Webhooks", "F30", "Webhook endpoints.", "developerPortalService"],
  ["adm-dashboard", "/admin/dashboard", "Admin dashboard", "F20", "V6H-EA07: Composed admin KPIs — no new truth table.", "adminInsights.service", "Shipped"],
  ["adm-payroll-config", "/admin/payroll-config", "Payroll configuration", "F08", "V6H-EA04: Org payroll setup and readiness validation.", "payroll.service", "Shipped"],
  ["adm-notif-templates", "/admin/notification-templates", "Notification templates", "F21", "V6H-EA01: Workspace notification template config — not delivery truth.", "notificationTemplate.service", "Shipped"],
].forEach((row) => {
  const [id, route, name, feature, overview, svc, status] = row;
  add({
    id,
    module: "Administration",
    route,
    name,
    feature,
    status: status || "Shipped",
    overview,
    scenarios: [{ title: "Platform governance", description: "Admin configures org behavior safely." }],
    personas: std.adminPersonas,
    featureFlags: "adminModules.*",
    relatedServices: svc,
    implementationNotes: "Protected core — minimal changes to Application Config and approval authority unless explicitly authorized.",
  });
});

// ─── COMMERCIAL LIFECYCLE (V6F — CODE_PATH_VERIFIED) ───
add({
  id: "fin-proposal-lifecycle",
  module: "Sales & Contracts",
  route: "/sales/proposals",
  name: "Proposal & estimation lifecycle",
  feature: "V6F-EA39",
  status: "Planned",
  overview: "BidRequest → Proposal → Estimate version → Approval → PO/Project conversion with estimate-vs-actual from TaskActivityModel.",
  scenarios: [
    { title: "Create proposal from bid", description: "Sales converts opportunity to formal proposal with estimate lines." },
    { title: "Approve and convert to project", description: "Accepted proposal creates PO and Project baseline tasks." },
    { title: "Estimate vs actual", description: "Compare estimate lines to logged TaskActivity hours/cost." },
  ],
  personas: std.financePersonas.concat(["PROJECT_MANAGER"]),
  featureFlags: "commercialModules.proposalEnabled",
  relatedServices: "proposalService, bid.requests.service, purchaseorder.service, project.service",
  implementationNotes: "CODE_PATH_VERIFIED per V6F-EA39 — uses BidRequestModel/PO/ProjectModel; ts_proposal child entities only.",
});
add({
  id: "fin-revenue-recognition",
  module: "Finance",
  route: "/finance/revenue-recognition",
  name: "Revenue recognition",
  feature: "V6F-EA38",
  status: "Planned",
  overview: "Project/client revenue recognition schedule linked to billing plan, invoice lines, PO, and approved work — not platform HRMS invoices.",
  scenarios: [
    { title: "Period recognition", description: "Finance posts recognition for project period from approved sources." },
    { title: "Milestone-triggered recognition", description: "Recognition event on milestone gate approval." },
  ],
  personas: std.financePersonas,
  featureFlags: "commercialModules.revenueRecognitionEnabled",
  relatedServices: "projectBillingService, purchaseorder.service",
  implementationNotes: "CODE_PATH_VERIFIED per V6F-EA38 — forbidden: fs_hrms_invoice as project revenue source.",
});
add({
  id: "project-npd-lifecycle",
  module: "Projects",
  route: "/project/npd",
  name: "New Product Development lifecycle",
  feature: "V6F-EA40",
  status: "Deferred",
  overview: "DEFERRED (W14 NPD-*): NPD lifecycle not shipped. No production route, menu, or controller. Do not sell or QA as live.",
  scenarios: [
    { title: "NPD stage-gate progression", description: "Idea through Launch with gate approvals — deferred." },
    { title: "Launch readiness", description: "Checklist verification before Launch stage — deferred." },
  ],
  personas: std.pmPersonas,
  featureFlags: "projectModules.npdEnabled (not enabled)",
  relatedServices: "(not shipped)",
  implementationNotes: "DEFERRED W14 — no CODE_PATH_VERIFIED claim; ProjectModel specialization not implemented.",
});
add({
  id: "project-dossier",
  module: "Projects",
  route: "/project/dossier/:dossierId",
  name: "Dossier management",
  feature: "V6F-EA41",
  status: "Deferred",
  overview: "DEFERRED (W14 DOS-*): Dossier package lifecycle not shipped. Document Vault/filemanager is separate. Do not sell or QA as live.",
  scenarios: [
    { title: "Build regulatory dossier", description: "Sections/reviews/baselines — deferred." },
    { title: "Controlled export", description: "Baseline export — deferred." },
  ],
  personas: std.pmPersonas.concat(std.adminPersonas),
  featureFlags: "projectModules.dossierEnabled (not enabled)",
  relatedServices: "(not shipped — Document Vault/filemanager is separate)",
  implementationNotes: "DEFERRED W14 — no CODE_PATH_VERIFIED claim; no DossierController/ts_dossier*.",
});

// ─── DOCUMENT / PUBLIC ───
[
  ["doc-invoice", "/document/invoice/details/:invoiceId", "Public invoice view", "Existing", "Shareable invoice for clients.", "invoice.service"],
  ["doc-feedback-req", "/document/feedback/request/:feedbackRequestId", "Feedback request (external)", "Existing", "External feedback form link.", "feedback.service"],
  ["doc-feedback-tpl", "/document/feedback/template/:templateId", "Feedback template link", "Existing", "Template-based feedback.", "feedback.service"],
  ["doc-feedback", "/document/feedback/:feedbackId", "Feedback response", "Existing", "Submitted feedback view.", "feedback.service"],
].forEach(([id, route, name, feature, overview, svc]) =>
  add({
    id,
    module: "Document (public)",
    route,
    name,
    feature,
    overview,
    scenarios: [{ title: "External stakeholder", description: "Client accesses shared link without full Tracopus login." }],
    relatedServices: svc,
  })
);

const js = `/**
 * Tracopus Use Case Catalog — page definitions
 * Generated: ${new Date().toISOString().slice(0, 10)}
 * Total pages: ${pages.length}
 */
window.TRACOPUS_USE_CASE_CATALOG = ${JSON.stringify(pages, null, 2)};
`;

fs.writeFileSync(OUT, js, "utf8");
console.log(`Wrote ${pages.length} pages to ${OUT}`);

// Compact bridge for Scenario Guide ↔ Use Case Catalog ↔ API docs
const byUseCase = {};
pages.forEach((p) => {
  byUseCase[p.id] = {
    id: p.id,
    pageName: p.pageName,
    route: p.route,
    module: p.module,
    apiDocumentation: p.apiDocumentation || null,
  };
});

const byScenario = {};
Object.entries(SCENARIO_TO_USE_CASE).forEach(([scenarioId, useCaseId]) => {
  const uc = byUseCase[useCaseId];
  byScenario[scenarioId] = {
    scenarioId,
    title: SCENARIO_TITLES[scenarioId] || scenarioId,
    module: SCENARIO_MODULES[scenarioId] || "hrms",
    useCaseId,
    useCaseName: uc?.pageName || useCaseId,
    useCaseRoute: uc?.route || "",
    apiDocumentation: uc?.apiDocumentation || null,
  };
});

const useCaseToScenarios = {};
pages.forEach((p) => {
  const list = scenariosForUseCase(p.id);
  if (list.length) useCaseToScenarios[p.id] = list;
});

const bridgeJs = `/**
 * Tracopus docs bridge — Use Case Catalog ↔ Scenario Guide ↔ API Documentation
 * Generated: ${new Date().toISOString().slice(0, 10)}
 * Do not edit by hand — run: node generate-use-case-catalog.mjs
 */
(function (global) {
  'use strict';
  global.TRACOPUS_DOC_BRIDGE = {
    scenarioToUseCase: ${JSON.stringify(SCENARIO_TO_USE_CASE, null, 2)},
    useCaseToScenarios: ${JSON.stringify(useCaseToScenarios, null, 2)},
    byUseCase: ${JSON.stringify(byUseCase, null, 2)},
    byScenario: ${JSON.stringify(byScenario, null, 2)}
  };
})(typeof window !== 'undefined' ? window : global);
`;

fs.writeFileSync(BRIDGE_OUT, bridgeJs, "utf8");
fs.writeFileSync(SCENARIO_BRIDGE_OUT, bridgeJs, "utf8");
console.log(`Wrote API docs bridge to ${BRIDGE_OUT}`);
console.log(`Wrote Scenario Guide copy to ${SCENARIO_BRIDGE_OUT}`);
console.log("Next: node generate-test-plan.mjs && node sync-gap-discovery-docs.mjs");

