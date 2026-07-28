/**
 * Elaborates use-case catalog entries with detailed who/when/why/where/how sections.
 * Used by generate-use-case-catalog.mjs
 */

import {
  enrichCanonical,
  getVerificationStatus,
  isNonCreatablePage,
  VERIFICATION_OVERRIDES,
  COMMON_MISTAKES_OVERRIDES,
} from "./use-case-canonical-map.mjs";
import { V6H_PLANNED_PAGES } from "./v6h-planned-pages-config.mjs";
import { buildApiDocumentation } from "./use-case-api-docs.mjs";

const NAV = {
  login: "Open Tracopus URL → `/user/login`",
  projects: "Icon rail **Projects** → sidebar item",
  workspace: "Icon rail **Workspace** → sidebar item",
  people: "Icon rail **People** → sidebar item",
  finance: "Icon rail **Finance** → sidebar item",
  resources: "Icon rail **Resources** → sidebar item (Team capacity uses Projects path)",
  payroll: "Icon rail **Payroll** → sidebar item",
  performance: "Icon rail **Performance** → sidebar item",
  analytics: "Icon rail **Analytics** → sidebar item",
  ai: "Icon rail **AI Intelligence** → sidebar item",
  integrations: "Icon rail **Integrations** → sidebar item",
  admin: "Icon rail **Admin** → sidebar item",
  header: "Top **header rail** (available from any authenticated page)",
  appconfig: "Header **App config** icon OR Admin → Application config (`/admin/appconfig`)",
};

function steps(items) {
  return items.map((s, i) => `${i + 1}. ${s}`);
}

function whoBlock({ summary, personas, roles, permissions, prerequisites }) {
  return {
    summary: summary || "",
    personas: personas || [],
    roles: roles || "",
    permissions: permissions || [],
    prerequisites: prerequisites || [],
  };
}

function whenBlock({ summary, triggers, cadence, examples }) {
  return { summary, triggers: triggers || [], cadence: cadence || "", examples: examples || [] };
}

function whereBlock({ navigation, route, relatedPages, deepLinks, moduleContext }) {
  return {
    navigation: navigation || "",
    route: route || "",
    relatedPages: relatedPages || [],
    deepLinks: deepLinks || [],
    moduleContext: moduleContext || "",
  };
}

/** Page-specific rich overrides keyed by id */
export const PAGE_OVERRIDES = {
  "auth-login": (p) => ({
    howToCreate: steps([
      "**Not applicable** — Login is not created by end users.",
      "Accounts are provisioned by HR/Admin via Employee create → activation email.",
    ]),
    howToUse: steps([
      "Open Tracopus URL (public route — **no authenticated session required**).",
      "Enter email/password or choose SSO provider if enabled.",
      "Complete MFA challenge if org policy requires.",
      "On success, session established and user lands on default module or return URL.",
    ]),
    whoCanUse: whoBlock({
      summary: "All provisioned Tracopus users — page is public before login.",
      personas: [],
      permissions: ["PUBLIC route — no session cookie required"],
      prerequisites: ["Active employee record with credentials or SSO mapping", "NOT logged in already (redirect if session valid)"],
    }),
    verification: [
      "Login succeeds with valid credentials — session cookie set.",
      "Invalid credentials show error without leaking account existence details.",
      "Deep-link return URL preserved and restored post-login.",
      "No write to any shadow table on login.",
    ],
    commonMistakes: [
      "Expecting Create/Add on login page — login is sign-in only.",
      "Testing while already authenticated — logout first or use incognito.",
    ],
  }),
  "auth-forgot": (p) => ({
    howToCreate: steps(["**Not applicable** — password reset is initiated, not created, by the user."]),
    howToUse: steps([
      "From login page, click **Forgot password** (public — **no session required**).",
      "Enter registered work email.",
      "Check email for reset link with activation key.",
      "Follow link to Change password page.",
    ]),
    whoCanUse: whoBlock({
      summary: "Anyone with registered email on employee record.",
      prerequisites: ["NOT authenticated", "Email exists on fs_employee"],
    }),
    verification: [
      "Reset email sent for valid registered email.",
      "Token single-use; expired token rejected.",
      "No authenticated session required to initiate reset.",
    ],
  }),
  "auth-activate": (p) => ({
    howToCreate: steps([
      "**Not a generic Create workflow** — activation uses HR-provisioned token.",
      "HR creates employee → system emails activation link with activationKey, employeeId, uniqueId.",
    ]),
    howToUse: steps([
      "Open activation link from email (**valid token required — no prior session**).",
      "Set compliant password per org policy.",
      "Submit → account status becomes active.",
      "Sign in via Login page.",
    ]),
    whoCanUse: whoBlock({
      summary: "New hire holding valid activation token from email.",
      prerequisites: ["Valid activationKey + employeeId + uniqueId in URL", "NOT authenticated"],
    }),
  }),
  "auth-changepwd": (p) => ({
    howToCreate: steps(["**Not applicable** — triggered by forgot-password or admin reset token."]),
    howToUse: steps([
      "Open secure reset link (**valid token required — no authenticated session**).",
      "Enter new password meeting complexity rules.",
      "Confirm password → submit.",
      "Sign in with new credentials.",
    ]),
    whoCanUse: whoBlock({
      summary: "User or admin reset flow token holder.",
      prerequisites: ["Valid activationKey/reset token in URL", "NOT authenticated unless policy allows in-session change separately"],
    }),
  }),
  "auth-error500": (p) => ({
    howToCreate: steps(["**Not applicable** — system-generated error surface."]),
    howToUse: steps([
      "When server returns unrecoverable error, user redirected or shown /error/error500.",
      "Read guidance message.",
      "Retry or contact administrator.",
      "Return home when service restored.",
    ]),
    whoCanUse: whoBlock({
      summary: "Any user when server failure occurs.",
      prerequisites: ["None — may occur during or outside authenticated session"],
    }),
    verification: ["Friendly error UI shown — not blank screen.", "No sensitive stack trace in production UI."],
  }),
  "project-portfolio": (p) => ({
    whyToUse:
      "Portfolio control tower gives executives and PMO a single pane of glass across all active projects. Instead of opening each project dashboard, you see rolled-up health scores, at-risk counts, revenue exposure, and staffing signals sourced from live ProjectModel data. This supports steering committee decisions, QBR preparation, and early intervention before slippage becomes financial loss.",
    whoCanUse: whoBlock({
      summary: "Leaders who own cross-project outcomes — not individual contributors logging tasks.",
      personas: p.personas,
      roles: "Project Manager (program view), Resource Manager (capacity conflicts), Finance Manager (revenue at risk), Executive, Admin.",
      permissions: [
        "Role must have `projectModules.portfolioEnabled = true` in Application Config.",
        "Persona switcher: use PROJECT_MANAGER, RESOURCE_MANAGER, FINANCE_MANAGER, or EXECUTIVE.",
        "Team scope may limit visible projects if `listOnlyCurrentTeamProject` is set for the role.",
      ],
      prerequisites: [
        "At least one active ProjectModel record exists.",
        "Projects should have owners, dates, and status populated for meaningful health scores.",
        "For financial roll-ups: link projects to Finance → Accounts and Purchase Orders where applicable.",
      ],
    }),
    whenToUse: whenBlock({
      summary: "Use when you need portfolio-level insight, not single-project task tracking.",
      triggers: [
        "Monthly or quarterly business review (QBR) preparation.",
        "Executive asks: 'Which projects are red and why?'",
        "Resource contention across multiple projects (same team double-booked).",
        "Finance needs revenue-at-risk before quarter close.",
      ],
      cadence: "Weekly for active portfolios; daily during critical delivery windows.",
      examples: [
        "Monday steering: filter health = At Risk → assign PM actions before customer call.",
        "End of month: export portfolio KPIs for leadership deck.",
      ],
    }),
    whereToUse: whereBlock({
      navigation: `${NAV.projects} → **Portfolio**`,
      route: p.route,
      moduleContext: "Projects module (F16 portfolio control tower).",
      relatedPages: [
        "/project/dashboard — single-team delivery KPIs",
        "/project/list — create/edit projects that feed portfolio",
        "/project/portfolio/scenarios — what-if scenario modeling",
        "/analytics/executive-control-tower — enterprise-wide analytics view",
        "/project/risks — drill into project-level risks from at-risk projects",
      ],
      deepLinks: ["/project/portfolio", "/project/portfolio/scenarios"],
    }),
    howToCreate: steps([
      "Confirm Admin enabled `projectModules.portfolioEnabled` for your org unit in Application Config (`/admin/appconfig` → org.json → projectModules).",
      "Create or verify **Accounts**: Finance → Accounts → create client account (name, code, billing contact).",
      "Create **Bid / PO** (optional but recommended for financial roll-up): Finance → Bid requests → convert to Purchase Order when won.",
      "Create **Projects**: Projects → Project list → **Create project** → enter name, code, start/end dates, status Active, assign **Account** and link **Purchase Order** if applicable.",
      "Add **Project members** and **Deliverables**: open Project details → Members tab → add team; Deliverables tab → create Tasks.",
      "Populate **governance signals** (improves health accuracy): Projects → Milestones, Risks, Issues — add at least baseline records.",
      "Return to **Projects → Portfolio** — projects appear once ProjectModel health rollups compute (refresh page if empty).",
      "Optional: Finance → Project financials to attach budget/forecast numbers consumed by portfolio financial tiles.",
    ]),
    howToUse: steps([
      "Navigate: Icon rail **Projects** → sidebar **Portfolio** (`/project/portfolio`).",
      "Review the **KPI strip** at top: total projects, healthy vs at-risk counts, utilization/overdue signals (exact tiles depend on org config).",
      "Use **filters**: health status, account, project manager, date range — narrow to programs you steer.",
      "Scan **steering cards / insight alerts** for auto-generated warnings (overdue milestones, critical risks, capacity overload).",
      "Click a **project row or card** to drill into Project details or Dashboard for root-cause analysis.",
      "Open **Portfolio scenarios** (`/project/portfolio/scenarios`) to model what-if staffing or timeline changes.",
      "Cross-check **Analytics → Executive control tower** for enterprise-wide view if you hold Executive persona.",
      "Export or screenshot KPIs for steering minutes; assign follow-ups via Issues or My work queues.",
    ]),
    verification: [
      "Portfolio list shows expected project count matching Project list filter.",
      "At-risk badge aligns with project having open HIGH/CRITICAL risks or AT_RISK milestones.",
      "Drill-down opens correct Project details for selected row.",
    ],
    commonMistakes: [
      "Expecting portfolio data without creating projects first — portfolio reads ProjectModel, it does not create projects.",
      "Missing account/PO linkage then wondering why financial tiles are empty.",
      "Using Employee persona — portfolio menu is hidden; switch persona to Project Manager or Executive.",
    ],
  }),

  "project-milestones": (p) => ({
    whyToUse:
      "Milestones are goal-oriented control points (PMI schedule domain) — they answer 'Have we reached the next meaningful state?' rather than listing every task. In Tracopus they drive Gantt timelines, gate approvals, portfolio health, and (when approved) billing milestone invoicing. They must always belong to a project.",
    whoCanUse: whoBlock({
      summary: "Delivery leaders and steering roles who own schedule commitments.",
      personas: p.personas,
      roles: "Manager, Project Manager, Executive (read/steer), Admin.",
      permissions: ["`projectModules.milestonesEnabled = true`", "`shouldUseProjectGovernance()` returns true for org"],
      prerequisites: ["Active ProjectModel", "Governance feature enabled in pilot config"],
    }),
    whenToUse: whenBlock({
      summary: "During planning, execution monitoring, gate reviews, and billing events.",
      triggers: ["Project kickoff — define phase milestones", "Weekly status — update % complete", "Gate review before next phase", "Customer billing tied to milestone acceptance"],
      cadence: "Update weekly; review at-risk milestones in every steering meeting.",
    }),
    whereToUse: whereBlock({
      navigation: `${NAV.projects} → **Milestones**`,
      route: p.route,
      relatedPages: ["/project/timeline", "/project/governance", "/project/risks", "/finance/billing-plans"],
    }),
    howToCreate: steps([
      "Enable flags: App config → `projectModules.milestonesEnabled = true`.",
      "Navigate: Projects → **Milestones**.",
      "In the create panel (or **+ Milestone** action), select **Project** — required; system rejects orphan milestones.",
      "Enter **Name** (e.g. 'Phase 1 — Design Complete'), **Planned start/end**, **Owner**.",
      "Set **Status** = PLANNED for new items.",
      "Optional: link **Gate** if governance gates configured.",
      "Click **Save** — milestone appears in register and Timeline.",
      "Add **Dependencies**: in Dependency register section → choose Predecessor milestone → Successor → Type (Finish-to-Start default) → Lag days → Save.",
      "Optional AI import: Governance AI panel → review draft → **Approve import** (human approval mandatory).",
    ]),
    howToUse: steps([
      "Open Projects → Milestones.",
      "Use **search** and filters: Status, Project.",
      "Review KPI strip: total, at-risk, blocked, on critical path.",
      "Click row → **Milestone drawer** → update actual dates, % complete, status (IN_PROGRESS, COMPLETE, AT_RISK, BLOCKED).",
      "Check **Dependency validation** panel for schedule conflicts.",
      "Use **quick links** to Risks/Issues/Governance for linked remediation.",
      "Refresh after bulk edits; export if needed for status reports.",
    ]),
    verification: ["Milestone visible on Timeline Gantt", "Dependency validation shows no circular references", "Gate shows linked milestone when configured"],
  }),

  "project-risks": (p) => ({
    whyToUse: "Risks track uncertain future events that could impact scope, schedule, cost, or quality. Separating risks from issues (which already happened) follows PMI guidance and keeps mitigation proactive rather than reactive.",
    whoCanUse: whoBlock({ summary: "Project leadership accountable for uncertainty management.", personas: p.personas, permissions: ["`projectModules.risksEnabled = true`"] }),
    whenToUse: whenBlock({ summary: "Highest focus at project start; periodic review thereafter.", cadence: "Long projects: monthly. 3–6 month projects: monthly. <2 months: every 1–2 weeks. High change: weekly.", triggers: ["New vendor/integration", "Scope change", "Resource loss"] }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Risks**`, route: p.route, relatedPages: ["/project/issues", "/project/rca", "/analytics/risk", "/ai/risk-agent"] }),
    howToCreate: steps([
      "Projects → **Risks**.",
      "Click **New risk** / open create form.",
      "Select **Project** (required).",
      "Enter **Title**, **Severity** (LOW/MEDIUM/HIGH/CRITICAL), **Owner**, **Mitigation plan**, **Due date**.",
      "Status defaults to **Open** — Save.",
      "Verify entry on **Risk heatmap** (severity × status).",
    ]),
    howToUse: steps([
      "Review **heatmap** for concentration of HIGH/CRITICAL open risks.",
      "Filter by project, severity, status.",
      "Open **Risk drawer** → update mitigation progress → set **Mitigating**.",
      "Use **Escalate** when executive attention needed → status **Escalated**.",
      "When risk materializes: create **Issue** (Issues & actions) — keep risk record for lessons learned.",
      "Close risk when **Mitigated** or **Accepted** (required for project closure readiness).",
    ]),
  }),

  "project-issues": (p) => ({
    whyToUse: "Issues record events that have already occurred and need resolution. Action items under each issue provide accountable remediation with SLA tracking — essential for closure readiness and customer transparency.",
    whoCanUse: whoBlock({ summary: "Delivery managers resolving active blockers.", personas: p.personas, permissions: ["`projectModules.issuesEnabled = true`"] }),
    whenToUse: whenBlock({ summary: "Intensifies during execution and pre-closeout.", triggers: ["Defect found", "Risk materialized", "Customer escalation"], cadence: "Review open issues daily near release; weekly otherwise." }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Issues & actions**`, route: p.route, relatedPages: ["/project/risks", "/project/governance"] }),
    howToCreate: steps([
      "Projects → **Issues & actions**.",
      "Create issue → select **Project** (required).",
      "Set **Title**, **Priority** P1 (highest)–P4, **Owner**, **Description**, **Due date**.",
      "Save → open **Issue drawer**.",
      "Add **Actions**: title, owner, due date, SLA days (default 5) for each corrective step.",
    ]),
    howToUse: steps([
      "Monitor **Aging panel** for overdue issues/actions.",
      "Filter by priority/status/project.",
      "Progress status: Open → In progress → Resolved.",
      "Mark each **Action** Complete before closing issue.",
      "Close issue when all actions done — required for governance closure check.",
    ]),
  }),

  "project-lessons": (p) => ({
    whyToUse: "Lessons learned capture institutional knowledge so future projects avoid repeat mistakes. PMI recommends updating throughout the project lifecycle — not only at close. Published lessons feed AI knowledge base and closure readiness.",
    whoCanUse: whoBlock({ summary: "PMs and leaders with authority to publish org-visible knowledge.", personas: p.personas, permissions: ["`projectModules.lessonsLearnedEnabled = true`", "`isKnowledgeRcaEnabled()`"] }),
    whenToUse: whenBlock({ summary: "After retrospectives, incidents, phase gates, and before project close.", triggers: ["Sprint retro", "Failed release postmortem", "Successful pattern to replicate"] }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Lessons learned**`, route: p.route, relatedPages: ["/project/rca", "/ai/knowledge"] }),
    howToCreate: steps([
      "Projects → **Lessons learned**.",
      "Create lesson → link **Project** (required).",
      "Enter context, what happened, recommendation, category/tags.",
      "Save as draft → review with team.",
      "Click **Publish** when approved for org visibility.",
    ]),
    howToUse: steps([
      "Browse register; filter by status (draft/published).",
      "Review **KPI cards** and **pattern insights** for recurring themes.",
      "Export CSV for PMO repository.",
      "Link related **RCA** records when incident-driven.",
    ]),
  }),

  "project-list": (p) => ({
    whyToUse: "Project list is the canonical register of all ProjectModel records — every delivery, governance, and financial roll-up starts here.",
    whoCanUse: whoBlock({ summary: "Managers and above who initiate or oversee projects.", personas: p.personas, permissions: ["`projectModules.listEnabled = true`"] }),
    whenToUse: whenBlock({ summary: "Project initiation and daily lookup.", triggers: ["New customer engagement", "Internal initiative kickoff"] }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Project list**`, route: p.route }),
    howToCreate: steps([
      "Projects → **Project list** → **Create project** (or + button).",
      "Step 1: **Name**, **Code** (unique), **Description**.",
      "Step 2: **Dates** — planned start/end.",
      "Step 3: **Account** — select Finance account (create in Finance → Accounts if missing).",
      "Step 4: **Purchase order** — link PO if contract exists.",
      "Step 5: **Team** — assign project manager and members.",
      "Step 6: **Status** — typically Active on kickoff.",
      "Save → open **Project details** to add deliverables.",
    ]),
    howToUse: steps([
      "Use **SHOW/SORT/Filter** header: status, team scope, search by code/name.",
      "Click row → **Project details** workspace.",
      "Use row actions: Edit, Archive (per permissions).",
      "Bulk operations if enabled for admins.",
    ]),
  }),

  "workspace-approvals": (p) => ({
    whyToUse: "Single inbox for all approval types (timesheet, leave, expense, governance) so approvers don't hunt across modules.",
    whoCanUse: whoBlock({ summary: "Anyone with approver/delegate role.", personas: p.personas, permissions: ["`workspaceModules.approvalsEnabled = true`"] }),
    whenToUse: whenBlock({ summary: "Daily for managers; immediately before payroll cut-off.", triggers: ["Team submitted timesheets", "Leave requests pending", "Expense claims"] }),
    whereToUse: whereBlock({ navigation: `${NAV.workspace} → **My approvals**`, route: p.route, relatedPages: ["/people/timesheet", "/people/leaves", "/admin/approval-policies"] }),
    howToCreate: steps(["Approvals are created when submitters send items for approval — you don't create approvals here.", "Configure policies: Admin → Approval policies.", "Configure delegation: Admin → Delegation rules when approver is away."]),
    howToUse: steps([
      "Workspace → **My approvals**.",
      "Filter by type: Timesheet, Leave, Expense, etc.",
      "Open item → review details and attachments.",
      "**Approve** or **Reject** with comment.",
      "Verify item leaves queue; submitter notified.",
    ]),
  }),

  "people-timesheet": (p) => ({
    whyToUse:
      "Timesheets capture billable and non-billable hours against projects and deliverables (TaskModel/TaskActivityModel). Approved timesheets feed payroll calculation, client invoicing, utilization analytics, and billing milestones — they must reference real project assignments, not free-text entries.",
    whoCanUse: whoBlock({
      summary: "Employees log their own time; managers approve via Workspace → My approvals; HR/payroll consumes approved data.",
      personas: p.personas,
      roles: "Employee (create/submit), Manager (approve team), HR Admin (configure rules)",
      permissions: ["`peopleModules.timesheetEnabled = true`", "Employee must be project member to log against project"],
      prerequisites: ["Active employee profile", "Project membership with deliverables", "Timesheet period open per org config"],
    }),
    whenToUse: whenBlock({
      summary: "Log time daily or weekly; submit before org deadline; approve before payroll lock.",
      triggers: ["End of work day", "Friday weekly submit reminder", "Billing milestone requires approved hours"],
      cadence: "Log daily recommended; submit weekly; manager approve within 48h of submit.",
      examples: ["Consultant logs 8h against Project X deliverable each day", "Manager bulk-approves team timesheets Monday morning"],
    }),
    whereToUse: whereBlock({
      navigation: `${NAV.people} → **Timesheets**`,
      route: p.route,
      moduleContext: "People module · F06 Timesheet approval",
      relatedPages: ["/workspace/approvals", "/project/activites", "/project/taskboard", "/payroll/runs"],
    }),
    howToCreate: steps([
      "Verify you are assigned to projects: Projects → Project list → open project → **Members** tab includes you.",
      "Verify deliverables exist: Project details → **Deliverables** tab has Tasks you can log against.",
      "Navigate: People → **Timesheets** (`/people/timesheet`).",
      "Select **period/week** from the period picker (must be open for entry per org rules).",
      "Click **Add entry** or empty cell → choose **Project** → **Deliverable (Task)** → optional **Work item**.",
      "Enter **hours** for each day column; add **notes** for overtime, on-call, or non-standard work.",
      "**Save** draft frequently — status remains Draft until submitted.",
      "When week complete: click **Submit for approval** — item appears in manager's Workspace → My approvals.",
    ]),
    howToUse: steps([
      "Open People → Timesheets and confirm correct **period** is selected.",
      "Review **summary strip**: total hours, missing days highlighted, policy warnings (max hours, holiday overlap).",
      "Edit **Draft** rows: change project/task/hours before submission.",
      "After submit: status shows **Submitted** — wait for manager action.",
      "If **Rejected**: read manager comment, correct rows, re-submit.",
      "When **Approved**: hours lock (per policy) and flow to payroll/utilization.",
      "Managers: approve/reject from Workspace → My approvals, not from this page.",
      "Use **Today activity** header panel to spot missing days before deadline.",
    ]),
    verification: ["Grid shows Submitted then Approved status", "Manager sees pending item in My approvals", "Approved hours visible in payroll run validation"],
    commonMistakes: ["Logging against project you're not member of", "Submitting before fixing validation warnings", "Confusing this with Work items page — timesheet is approval-oriented weekly grid"],
  }),

  "fin-bids": (p) => ({
    whyToUse:
      "Bid requests track pre-contract sales opportunities. They are the first step in contract-to-cash: Bid → Purchase Order → Project → Billing plan → Invoice. Linking bids to Accounts ensures portfolio and finance roll-ups stay accurate.",
    whoCanUse: whoBlock({
      summary: "Finance and sales operations staff managing the opportunity pipeline.",
      personas: p.personas,
      permissions: ["`financeModules.bidrequestsEnabled = true`", "Finance module visible only to FINANCE_MANAGER, EXECUTIVE, ADMIN personas"],
      prerequisites: ["Client Account exists in Finance → Accounts"],
    }),
    whenToUse: whenBlock({
      summary: "When pursuing new revenue before contract signature.",
      triggers: ["RFP received", "Proactive proposal", "Renewal negotiation"],
      cadence: "Update pipeline weekly during active sales cycle.",
    }),
    whereToUse: whereBlock({
      navigation: `${NAV.finance} → **Bid requests**`,
      route: p.route,
      relatedPages: ["/finance/accounts", "/finance/purchaseorders", "/finance/bidrequest/:bidRequestId", "/project/list"],
    }),
    howToCreate: steps([
      "Create **Account** if new client: Finance → Accounts → Create (name, code, billing contact).",
      "Finance → **Bid requests** → click **Create bid** / **+ New**.",
      "Enter **Opportunity name**, link **Account**, estimated **value**, **probability %**, **expected close date**.",
      "Add **scope summary** and line items if wizard includes them.",
      "Assign **owner** (sales/AM employee).",
      "Save as **Draft** → move status as deal progresses (Qualified, Proposal, Negotiation, etc.).",
      "When **Won**: use **Convert to Purchase Order** action to create PO automatically.",
      "After PO: create **Project** in Project list linking same Account and PO.",
    ]),
    howToUse: steps([
      "Open Finance → Bid requests.",
      "Filter by **stage**, **account**, **owner**, **date range**.",
      "Update **probability** and **close date** after each client meeting.",
      "Open bid **detail** page to attach proposals, SOW drafts, notes.",
      "Lost deals: set status Lost with reason for pipeline analytics.",
      "Won deals: verify PO created and project kicked off within 5 business days.",
    ]),
  }),

  "project-dashboard": (p) => ({
    whyToUse:
      "Project dashboard is your delivery command center — it aggregates task completion, project health, personal vs team scope, and insight cards so you act on risks before opening every project individually.",
    whoCanUse: whoBlock({
      summary: "All delivery personas; Team tab requires manager permissions and may respect team scope limits.",
      personas: p.personas,
      permissions: ["`projectModules.dashboardEnabled = true`"],
    }),
    whenToUse: whenBlock({
      summary: "Start of day for ICs; weekly for managers running team reviews.",
      cadence: "Daily check for personal tab; weekly deep-dive for team tab.",
    }),
    whereToUse: whereBlock({
      navigation: `${NAV.projects} → **Dashboard**`,
      route: p.route,
      relatedPages: ["/project/list", "/project/milestones", "/project/risks", "/project/issues", "/project/taskboard"],
    }),
    howToCreate: steps([
      "Dashboard is **read-only** — create underlying delivery data first.",
      "Projects → Project list → **Create project** with team members.",
      "Add **Deliverables** (Tasks) in Project details.",
      "Team logs work on **Taskboard** or Work items; update statuses.",
      "Add **Milestones** and **Risks** for health/insight cards to populate.",
      "Return to Dashboard — KPIs compute from live ProjectModel/TaskModel rollups.",
    ]),
    howToUse: steps([
      "Navigate Projects → **Dashboard**.",
      "Select **Personal** tab for your assignments or **Team** tab if you manage others.",
      "Review headline KPI: project count, task completion %, at-risk count.",
      "Read **insight cards** — each suggests an action (review overdue task, escalate risk).",
      "Use **quick navigation** links to Milestones, Risks, Issues, Project list.",
      "Switch team scope dropdown if you manage multiple teams.",
      "Drill into a specific project from 'My projects' list section.",
    ]),
  }),

  "people-employees": (p) => ({
    whyToUse: "Employee register (EmployeeModel) is HR source of truth for login, payroll, leave, org chart, and all people workflows.",
    whoCanUse: whoBlock({ summary: "HR admins and managers with create rights.", personas: p.personas }),
    whenToUse: whenBlock({ summary: "Hire, role change, exit.", triggers: ["Offer accepted", "Promotion"] }),
    whereToUse: whereBlock({ navigation: `${NAV.people} → **Employees**`, route: p.route, relatedPages: ["/people/onboarding", "/people/employees/:id/360"] }),
    howToCreate: steps([
      "People → Employees → **Create employee** wizard.",
      "Complete identity, employment, role, leave policy steps.",
      "Save → activation email sent.",
      "Optional: start Onboarding case.",
    ]),
    howToUse: steps(["Search/filter list.", "Open profile → edit tabs.", "Deactivate on exit."]),
  }),

  "people-leaves": (p) => ({
    whyToUse: "Tracks leave balances and approvals against configured policies.",
    whoCanUse: whoBlock({ summary: "Employees apply; managers approve.", personas: p.personas }),
    whereToUse: whereBlock({ navigation: `${NAV.people} → **Leave management**`, route: p.route }),
    howToCreate: steps(["Admin → Leave policies first.", "Employee: Apply leave → type, dates, reason → Submit.", "Manager approves in My approvals."]),
    howToUse: steps(["View balances.", "Track pending/approved history.", "Cancel pending if needed."]),
  }),

  "project-governance": (p) => ({
    whyToUse: "Centralizes gates, decisions, change requests, and closure readiness.",
    whoCanUse: whoBlock({ summary: "PMs and executives.", personas: p.personas }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Governance**`, route: p.route }),
    howToCreate: steps(["Create gates linked to milestones.", "Log decisions and change requests.", "Submit CR for approval."]),
    howToUse: steps(["Approve/reject gates.", "Track CR lifecycle.", "Run closure readiness before close."]),
    implementationNotes: "Closure evaluator checks tasks, risks, issues, tickets, lessons, RCA.",
  }),

  "project-rca": (p) => ({
    whyToUse: "Structured root cause analysis linked to project and optional issue/risk/task.",
    whoCanUse: whoBlock({ summary: "Delivery leaders.", personas: p.personas }),
    whereToUse: whereBlock({ navigation: `${NAV.projects} → **Root cause analysis**`, route: p.route }),
    howToCreate: steps(["New RCA → select project.", "Link issue/risk/task optional.", "Document findings → publish."]),
    howToUse: steps(["Filter register.", "Link to lessons learned when complete."]),
  }),

  "res-capacity": (p) => ({
    whyToUse: "Shows allocation, availability, overload across projects via Overview/Roster/Timeline/Gantt tabs.",
    whoCanUse: whoBlock({ summary: "Resource and project managers.", personas: p.personas }),
    whereToUse: whereBlock({ navigation: "Resources → **Team capacity**", route: p.route, deepLinks: ["?tab=roster", "?tab=timeline", "?tab=gantt"] }),
    howToCreate: steps(["Assign members on Project details.", "Set allocation %.", "Staffing requests for open demand."]),
    howToUse: steps(["Open Team capacity.", "Switch tabs: Overview, Roster, Timeline, Gantt.", "Filter team/project; act on overload alerts."]),
  }),

  "fin-pos": (p) => ({
    whyToUse: "PurchaseOrderModel represents signed contracts for projects and billing.",
    whereToUse: whereBlock({ navigation: `${NAV.finance} → **Purchase orders**`, route: p.route }),
    howToCreate: steps(["Create PO or convert from bid.", "Link account, line items.", "Attach when creating project."]),
    howToUse: steps(["Track utilization vs spend.", "Link invoices and billing plans."]),
  }),

  "pay-runs": (p) => ({
    whyToUse: "Batch payroll processing for a period before publishing paychecks.",
    whereToUse: whereBlock({ navigation: `${NAV.payroll} → **Payroll runs**`, route: p.route }),
    howToCreate: steps(["Configure structures/groups.", "Approve timesheets.", "Create run → validate → process → publish."]),
    howToUse: steps(["Monitor run status.", "Fix exceptions.", "Employees see My paychecks after publish."]),
  }),
  "fin-proposal-lifecycle": (p) => ({
    whyToUse: "End-to-end commercial pre-project lifecycle: BidRequest → Proposal → Estimate → Approval → PO → Project baseline. Ensures estimate-vs-actual compares to TaskActivityModel without duplicate project truth (V6F-EA39).",
    whoCanUse: whoBlock({
      summary: "Sales, finance, and delivery leads managing proposals before project kickoff.",
      personas: ["FINANCE_MANAGER", "PROJECT_MANAGER", "EXECUTIVE", "ADMIN"],
      prerequisites: ["Account/Client record", "BidRequest or opportunity intake", "Rate cards in Application Config"],
    }),
    howToCreate: steps([
      "Sales → Bid Requests → create or open opportunity.",
      "Create **Proposal** linked to BidRequest and Account.",
      "Add **Estimate version** with role/phase/task lines (hours, rate, margin).",
      "Attach proposal documents via Document Vault.",
      "Submit → approval workflow → client acceptance.",
      "Convert to **PurchaseOrderModel** and **ProjectModel** using existing conversion services.",
      "Baseline TaskModel from accepted estimate lines.",
    ]),
    howToUse: steps([
      "Track proposal status through funnel stages.",
      "Revise estimate versions — prior version retained for audit.",
      "On acceptance, run convert-to-project wizard.",
      "Delivery logs TaskActivity — run estimate-vs-actual report.",
    ]),
    verification: [
      "Proposal links to BidRequest/Account — not isolated store.",
      "Accepted proposal creates PO + Project via canonical services.",
      "Estimate-vs-actual reads TaskActivityModel.",
      "Documents in Document Vault — not orphan file paths.",
    ],
    commonMistakes: [
      "Creating project before proposal acceptance — use conversion flow.",
      "Storing rates only in spreadsheet — use rate_card / Application Config.",
    ],
  }),
  "fin-revenue-recognition": (p) => ({
    whyToUse: "Project/client revenue recognition schedule linked to billing plan, invoice lines, PO, and approved work/milestones — distinct from platform HRMS subscription invoices (V6F-EA38).",
    howToCreate: steps([
      "Ensure Project linked to PO with billing plan configured.",
      "Finance → Revenue Recognition → select project and period.",
      "Define recognition rules tied to milestone/work completion.",
      "Generate recognition schedule from approved sources.",
    ]),
    howToUse: steps([
      "Review recognition schedule by period.",
      "Drill into invoice line linkage.",
      "Adjust for approved change orders via canonical PO/project update.",
      "Export for finance steering — masked per persona.",
    ]),
    verification: [
      "Recognition events link invoice line + project + PO + period.",
      "No use of fs_hrms_invoice (platform billing) as project revenue.",
      "Milestone/work sources verified before recognition posts.",
    ],
  }),
  "project-npd-lifecycle": (p) => ({
    whyToUse: "DEFERRED (W14): NPD lifecycle is not shipped. Do not sell or QA as live.",
    howToCreate: steps([
      "Not available in this release — W14 DEFER.",
      "No production route `/project/npd` or npdEnabled menu.",
    ]),
    howToUse: steps([
      "Not available — use standard Project workflows only.",
    ]),
    verification: [
      "No production menu/route claiming NPD as shipped.",
      "Catalog status Deferred; verificationStatus DEFERRED.",
    ],
  }),
  "project-dossier": (p) => ({
    whyToUse: "DEFERRED (W14): Dossier package lifecycle is not shipped. Document Vault/filemanager is separate.",
    howToCreate: steps([
      "Not available in this release — W14 DEFER.",
      "Use `/project/filemanager` for Document Vault only (not dossier packages).",
    ]),
    howToUse: steps([
      "Not available — do not QA dossier baseline/export as live.",
    ]),
    verification: [
      "No production menu/route claiming dossier as shipped.",
      "Catalog status Deferred; verificationStatus DEFERRED.",
    ],
  }),
  "adm-notif-templates": (p) => ({
    whyToUse: "Configure workspace notification templates (V6H-EA01 S1). Templates are workflow/config records — delivery/read-state remains on domain events.",
    scenarios: [
      { title: "Create notification template", description: "Admin defines template with validated placeholders." },
      { title: "Preview with masking", description: "Preview masks salary/bank/tax/performance placeholders." },
    ],
    howToCreate: steps([
      "**SHIPPED (V6H-EA01)** — route and API live; create workflow uses validated placeholders.",
      "Admin → Notification templates (`/admin/notification-templates`).",
      "Click Create → enter template key, channel, body with placeholders.",
      "Validate placeholder keys against allowed list.",
      "Save → audit event created.",
    ]),
    howToUse: steps([
      "List templates; filter active/disabled.",
      "Edit template → preview with masked sample data.",
      "Disable template — delivery uses fallback classpath template.",
      "Verify notification delivery state is NOT stored in template table.",
    ]),
    verification: VERIFICATION_OVERRIDES["adm-notif-templates"] || [
      "API 403 when F21 disabled.",
      "Preview masks sensitive placeholders.",
      "Create/update/delete audited.",
    ],
    implementationNotes: "V6H-EA01 · ts_workspace_notification_template_model allowed as config record.",
  }),
  "people-holidays": (p) => ({
    whyToUse: "Manage org holiday calendar (V6H-EA02 S1) feeding leave duration, timesheet, attendance, payroll — sourced from Application Config org calendar.",
    scenarios: [
      { title: "Add holiday", description: "HR admin adds holiday; leave calculation excludes date." },
      { title: "Import calendar", description: "Bulk import holidays for year/org/location." },
    ],
    howToCreate: steps([
      "**SHIPPED (V6H-EA02)** — page uses live holiday API.",
      "People → Holidays (`/people/holidays`).",
      "Click Add holiday → date, name, org/team/location scope.",
      "Save → downstream leave/timesheet calendars updated on refresh.",
    ]),
    howToUse: steps([
      "Filter holidays by year and location.",
      "Import CSV calendar if enabled.",
      "Verify leave request duration excludes holiday dates.",
      "Employee: read-only view of holiday list.",
    ]),
    verification: [
      "Leave duration excludes holiday.",
      "Timesheet/attendance marks non-working day.",
      "No duplicate isolated holiday truth table.",
    ],
  }),
  "pay-deductions": (p) => ({
    whyToUse: "Payroll deduction rules (V6H-EA03 S2) — valid child of Employee/PayrollRun/Paycheck; not duplicate finance truth.",
    howToCreate: steps([
      "**SHIPPED (V6H-EA03)** — `/payroll/deductions` lists deductions from PayrollController.",
      "Payroll → Deductions → Create deduction type.",
      "Assign to employee or payroll group with effective dates.",
      "Preview impact on payroll run before lock.",
    ]),
    howToUse: steps([
      "Manage one-time and recurring deductions.",
      "View paycheck line-item impact after run.",
      "Locked run: reversal required — no destructive edit.",
    ]),
    verification: [
      "Deduction in run preview and paycheck lines.",
      "Locked run blocks destructive update.",
      "Audit on CRUD.",
    ],
  }),
  "adm-payroll-config": (p) => ({
    whyToUse: "Org payroll configuration (V6H-EA04 S2) — primarily Application Config payroll nodes plus valid bridge rows.",
    howToCreate: steps([
      "**SHIPPED (V6H-EA04)** — admin payroll readiness dashboard live.",
      "Admin → Payroll configuration.",
      "Set pay frequency, groups, statutory IDs, categories.",
      "Configure cut-off, lock rules, approval workflow.",
      "Save → readiness validation updated.",
    ]),
    howToUse: steps([
      "Review readiness checklist before payroll run.",
      "Non-admin: read-only or blocked.",
      "Config changes appear in next run preview.",
    ]),
    verification: ["Run blocked if mandatory config missing.", "Config changes audited.", "Non-admin cannot mutate."],
  }),
  "an-ai-insights": (p) => ({
    whyToUse: "Analytics AI insights (V6H-EA05 S2) — derived read model with sourceEntityType/sourceEntityId; never source truth.",
    howToCreate: steps([
      "**SHIPPED (V6H-EA05)** — read-only insights page from canonical composers.",
      "Enable analytics + AI flags.",
      "Analytics → AI insights.",
      "Insights generated from canonical composers on refresh.",
    ]),
    howToUse: steps([
      "Filter by project, people, payroll, finance, risk domains.",
      "Drill to source entity from insight card.",
      "Verify source references and confidence/rationale shown.",
      "Mark helpful/not helpful feedback.",
    ]),
    verification: [
      "Payload includes source references.",
      "Sensitive fields masked.",
      "Cross-team insights blocked.",
      "Audit on sensitive context access.",
    ],
  }),
  "ai-audit": (p) => ({
    whyToUse: "AI decision audit (V6H-EA06 S3) — review runs, masking, outcomes; no raw sensitive prompt persistence.",
    howToCreate: steps([
      "**SHIPPED (V6H-EA06)** — admin/security persona audit surface live.",
      "AI → Audit (`/ai/audit`).",
      "No create workflow — audit records from AI runs.",
    ]),
    howToUse: steps([
      "Filter by date, user, module, source entity, risk level.",
      "Review masking-applied status per record.",
      "Export masked audit CSV.",
    ]),
    verification: [
      "Raw sensitive fields not visible.",
      "Each record has source entity + actor.",
      "Unauthorized/cross-team blocked.",
    ],
  }),
  "adm-dashboard": (p) => ({
    whyToUse: "Admin dashboard (V6H-EA07 S3) — composed KPIs from live services; no new admin dashboard truth table.",
    howToCreate: steps([
      "**SHIPPED (V6H-EA07)** — read-only composition from live admin services.",
      "No create workflow — dashboard aggregates Application Config, audit, integration, workflow stats.",
    ]),
    howToUse: steps([
      "Admin → Dashboard.",
      "Review config health, feature flags, pending actions.",
      "Use quick links — only shipped routes appear.",
      "Drill audit/security/integration alerts.",
    ]),
    verification: [
      "KPIs from live services.",
      "Non-admin blocked.",
      "No planned-only links shown as shipped.",
    ],
  }),
};

/**
 * Auto-elaborate any page with category-aware detailed content.
 */
export function elaboratePage(page) {
  const override = PAGE_OVERRIDES[page.id];
  const elaboration = override ? override(page) : autoElaborate(page);
  const base = { ...page, ...elaboration };

  // Normalize legacy string fields into rich blocks if needed
  if (typeof base.whoCanUse === "string") {
    base.whoCanUse = whoBlock({
      summary: base.whoCanUse,
      personas: base.personas || [],
      permissions: base.featureFlags ? [`Feature flags: ${base.featureFlags}`] : [],
    });
  }
  if (typeof base.whenToUse === "string") {
    base.whenToUse = whenBlock({ summary: base.whenToUse, triggers: [], examples: [] });
  }
  if (typeof base.whereToUse === "string") {
    base.whereToUse = whereBlock({
      navigation: base.whereToUse,
      route: page.route,
      relatedPages: [],
    });
  }
  if (!base.whyToUse) {
    base.whyToUse = `This page supports ${page.pageName} workflows within the ${page.module} module${page.feature && page.feature !== "Existing" ? ` (${page.feature})` : ""}. It helps teams execute Tracopus processes with data sourced from canonical models (Employee, Project, Task, TaskActivity, PO) rather than isolated stores.`;
  }

  // Canonical source mapping (required on every use case)
  base.canonical = enrichCanonical({ ...page, ...base });
  base.verificationStatus = getVerificationStatus({ ...page, ...base });

  // Verification & common mistakes — page overrides or sensible defaults
  if (VERIFICATION_OVERRIDES[base.id]) {
    base.verification = VERIFICATION_OVERRIDES[base.id];
  } else if (!base.verification || !base.verification.length) {
    base.verification = isNonCreatablePage(base)
      ? [
          "Page loads without error for intended access context.",
          "No inappropriate Create/Add workflow exposed.",
          `Data read from canonical sources per ${base.canonical.canonicalSourceEntities?.[0] || "domain services"}.`,
        ]
      : [
          "Page loads without PersonaAccessDenied for authorized role.",
          "Expected data visible after completing documented workflow steps.",
          "Writes persist to allowed tables only — no shadow table writes.",
        ];
  }

  if (COMMON_MISTAKES_OVERRIDES[base.id]) {
    base.commonMistakes = COMMON_MISTAKES_OVERRIDES[base.id];
  } else if (!base.commonMistakes || !base.commonMistakes.length) {
    base.commonMistakes = [
      "Feature flag off — menu hidden; enable in Application Config.",
      "Wrong persona — switch via header user panel.",
      base.verificationStatus === "PLANNED" ? "Treating planned route as production ship blocker — use OUT_OF_SCOPE tests only." : null,
    ].filter(Boolean);
  }

  // Non-creatable pages — remove generic Create/Add workflows (unless override supplied steps)
  if (isNonCreatablePage(base) && !elaboration.howToCreate?.length) {
    if (!PAGE_OVERRIDES[page.id] || !String(base.howToCreate?.[0] || "").includes("Not applicable")) {
      const naNote =
        base.module === "Authentication"
          ? "**Not applicable** — authentication pages do not use Create/Add record workflows."
          : base.status === "Planned" || base.verificationStatus === "PLANNED"
            ? "**OUT_OF_SCOPE** — planned route; no production create workflow until shipped."
            : `${base.pageName} is a **read-only or public** surface — records are created upstream or not at all.`;
      base.howToCreate = steps([naNote, "See Prerequisites and How to use for the correct entry path."]);
    }
    // Auth prerequisites — no session for login/forgot; token for activate/changepwd
    if (base.module === "Authentication" && base.whoCanUse && typeof base.whoCanUse === "object") {
      const isPublicAuth = /login|forgot|error500/i.test(page.id);
      const isTokenAuth = /activate|changepwd/i.test(page.id);
      if (isPublicAuth) {
        base.whoCanUse.prerequisites = (base.whoCanUse.prerequisites || []).filter((p) => !/authenticated session/i.test(p));
        base.whoCanUse.prerequisites.unshift("**No authenticated session** — public route");
      }
      if (isTokenAuth) {
        base.whoCanUse.prerequisites = (base.whoCanUse.prerequisites || []).filter((p) => !/authenticated session/i.test(p));
        base.whoCanUse.prerequisites.unshift("**Valid token/key in URL** — no prior session required");
      }
    }
  }

  // Planned pages
  if (base.status === "Planned" || base.verificationStatus === "PLANNED") {
    base.verificationStatus = "PLANNED";
    base.implementationNotes = (base.implementationNotes || "") + " Status: PLANNED — not a production release blocker; QA should use OUT_OF_SCOPE/BLOCKED test disposition.";
  }


  // Prefer elaborated steps; fall back to numbered originals
  if (base.howToCreate && base.howToCreate.length && !String(base.howToCreate[0]).match(/^\d+\./)) {
    base.howToCreate = steps(base.howToCreate);
  }
  if (base.howToUse && base.howToUse.length && !String(base.howToUse[0]).match(/^\d+\./)) {
    base.howToUse = steps(base.howToUse);
  }

  // API Documentation — sample curl, how to call, related APIs, scenario links
  base.apiDocumentation = buildApiDocumentation(base);

  return base;
}

function autoElaborate(p) {
  const mod = p.module;
  const name = p.pageName;
  const route = p.route;
  const personas = p.personas || [];

  const modNav = {
    Workspace: NAV.workspace,
    Projects: NAV.projects,
    People: NAV.people,
    Finance: NAV.finance,
    Resources: NAV.resources,
    Payroll: NAV.payroll,
    Performance: NAV.performance,
    Analytics: NAV.analytics,
    "AI Intelligence": NAV.ai,
    Integrations: NAV.integrations,
    Administration: NAV.admin,
    "Global header rail": NAV.header,
    Authentication: "Public URL before login",
    "Document (public)": "External link (no full app login)",
  }[mod] || `Module: ${mod}`;

  const isDashboard = /dashboard|control tower|hub/i.test(name);
  const isList = /list|register|requests|orders|invoices|employees|runs|paychecks/i.test(name);
  const isDetail = route.includes(":");
  const isPlanned = p.status === "Planned";
  const isReadOnly =
    isNonCreatablePage(p) ||
    (/analytics|dashboard|utilization|forecast|reports/i.test(name) && !/create|builder/i.test(name));

  let whyToUse = `${name} helps ${mod} users ${isDashboard ? "monitor KPIs and make steering decisions" : isList ? "find, create, and manage records in a searchable register" : isDetail ? "view and edit a single record in full context" : "complete " + name.toLowerCase() + " workflows"} without leaving the Tracopus luxury shell. Data reflects live canonical services — not mock-only stores.`;

  let howToCreate;
  let howToUse;

  if (isPlanned) {
    howToCreate = steps([
      "**OUT_OF_SCOPE for production QA** — route marked Planned.",
      "Dev preview only: `REACT_APP_SHOW_PLANNED_MENU_ITEMS=true`.",
      "Until shipped, use related existing pages listed in Related pages.",
    ]);
    howToUse = steps([
      `When shipped: ${modNav} → **${name}**.`,
      "Follow on-screen empty state guidance.",
      "Contact Admin if menu item missing after flag enable.",
    ]);
  } else if (isReadOnly) {
    howToCreate = steps([
      `${name} is a **read-only / non-creatable** surface — no Create/Add workflow on this page.`,
      "Ensure source data exists in operational modules (see Prerequisites).",
      `Enable feature flags: ${p.featureFlags || "see Application Config for " + mod + " module flags"}.`,
      "Allow up to one refresh cycle for rollups to populate after source changes.",
    ]);
    howToUse = steps([
      `${modNav} → **${name}** (${route}).`,
      "Select date range, filters, and team scope as available.",
      "Review KPI tiles and charts — hover for definitions where provided.",
      "Drill down into linked registers (project list, employee list, etc.) for action.",
      "Export or schedule reports if page provides export (see Report builder / Scheduled reports).",
    ]);
  } else if (isList) {
    howToCreate = steps([
      `Verify permissions: ${personas.length ? personas.join(", ") + " persona" : "appropriate role"} and module flag enabled.`,
      `${modNav} → **${name}**.`,
      "Click **Create** / **+ New** / wizard button in page hero or toolbar.",
      "Complete all required fields (marked with *); link to parent records (project, employee, account) when prompted.",
      "Save → confirm new row appears in register.",
      "Open detail view to add child records if workflow requires (lines, tasks, attachments).",
    ]);
    howToUse = steps([
      `${modNav} → **${name}**.`,
      "Use **SHOW / SORT / Filter** controls to narrow results.",
      "Search by name, code, or ID.",
      "Click row to open detail drawer or detail page.",
      "Use row actions (Edit, Delete, Submit, Approve) per your role.",
      "Refresh after bulk imports or integration sync.",
    ]);
  } else if (isDetail) {
    howToCreate = steps([
      `Create parent record first from the corresponding list page in ${mod}.`,
      "From list, click row to open this detail view — or use direct URL with valid ID.",
      "Use **Edit** mode to update fields; Save after each section.",
      "Add related child entities via tabs (members, lines, attachments, history).",
    ]);
    howToUse = steps([
      "Navigate from list or notification deep link.",
      "Review summary header: status, owner, dates.",
      "Work through tabs left-to-right for complete workflow.",
      "Use **Actions** menu for submit, approve, cancel, export.",
      "Return to list via breadcrumb when done.",
    ]);
  } else {
    howToCreate = steps([
      `Enable ${p.featureFlags || mod + " module flags"} in Application Config if page is gated.`,
      `${modNav} → **${name}**.`,
      "Use on-page **Create** / **Add** / **+ New** button (label varies by screen).",
      "Complete all required fields (*); link parent records (Project, Employee, Account, PO) when prompted.",
      "Save — confirm success message and new row/card appears.",
      "Open detail view to add child records if the workflow continues (lines, tasks, attachments, approvals).",
    ]);
    howToUse = steps([
      `${modNav} → **${name}** (${route}).`,
      "Read hero KPIs and insight alerts at the top before acting.",
      "Apply **SHOW / SORT / Filter** controls to match your persona scope.",
      "Execute the primary workflow: review → edit → submit/approve/export as applicable.",
      "Use quick links or breadcrumbs to related pages when blocked (e.g. create project before milestone).",
      "Refresh after integration sync or bulk admin changes.",
    ]);
  }

  return {
    whyToUse,
    whoCanUse: whoBlock({
      summary: p.whoCanUse || `Users with ${mod} module access${personas.length ? " and appropriate persona" : ""}.`,
      personas,
      roles: personas.length ? personas.map((x) => x.replace(/_/g, " ")).join(", ") : "See role.json permissions",
      permissions: [
        p.featureFlags ? `Feature: ${p.featureFlags}` : `${mod} module enabled in Application Config`,
        "Role menu access via accessUtils.getMenuAccessControl()",
        isPlanned ? "Planned — not production until shipped" : null,
      ].filter(Boolean),
      prerequisites: isReadOnly
        ? ["Source operational data created in upstream modules", "Integration sync complete if using external ERP"]
        : mod === "Authentication"
          ? []
          : ["Valid authenticated session", "Org unit assigned to your employee profile"],
    }),
    whenToUse: whenBlock({
      summary: p.whenToUse || `Whenever ${name.toLowerCase()} workflow is part of your ${mod} responsibilities.`,
      triggers: p.scenarios ? p.scenarios.map((s) => s.title) : ["Regular business process cadence"],
      cadence: isDashboard ? "Review weekly or per steering meeting" : "As needed during operational work",
      examples: p.scenarios ? p.scenarios.map((s) => s.description) : [],
    }),
    whereToUse: whereBlock({
      navigation: `${modNav} → **${name}**`,
      route,
      moduleContext: `${mod} module${p.feature && p.feature !== "Existing" ? " · " + p.feature : ""}`,
      relatedPages: p.relatedServices ? [p.relatedServices] : [],
    }),
    howToCreate,
    howToUse,
  };
}

export { steps, whoBlock, whenBlock, whereBlock, NAV };
