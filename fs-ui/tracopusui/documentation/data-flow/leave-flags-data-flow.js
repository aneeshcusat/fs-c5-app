/* Leave flags + data flow */
(function () {
  const FLAG_DEFS = [
    { id: "leaveManagementEnabled", scope: "org", group: "Org · leaveAdditional", name: "Leave management", key: "leaveManagementEnabled",
      description: "Master org switch for leave APIs.", whenOn: "Create/submit/approve workflow.", whenOff: "403 fail closed." },
    { id: "leaveAutoSyncToAttendance", scope: "org", group: "Org · leaveAdditional", name: "Auto-sync to attendance", key: "leaveAutoSyncToAttendance",
      description: "After promotion writes LEAVE/HALF_DAY rows.", whenOn: "LeaveAttendanceSyncService runs.", whenOff: "TaskActivity only." },
    { id: "leaveAllowNegativeBalance", scope: "org", group: "Org · leaveAdditional", name: "Allow negative balance", key: "leaveAllowNegativeBalance",
      description: "Submit without sufficient balance.", whenOn: "validateAvailable allows negative.", whenOff: "Blocked unless unpaid special." },
    { id: "leaveBlockOverlapRegardlessOfType", scope: "org", group: "Org · leaveAdditional", name: "Block overlap", key: "leaveBlockOverlapRegardlessOfType",
      description: "Overlap validation on create/submit.", whenOn: "Conflicting dates rejected.", whenOff: "Looser overlap rules." },
    { id: "leaveBlockNonWorkingDayLeave", scope: "org", group: "Org · leaveAdditional", name: "Block non-working days", key: "leaveBlockNonWorkingDayLeave",
      description: "Holiday/weekend validation.", whenOn: "Non-working days blocked.", whenOff: "More permissive dates." },
    { id: "leavesEnabled", scope: "role", group: "Role · menu", name: "Leave menu", key: "hrmsModules.leavesEnabled",
      description: "Shows /people/leaves.", whenOn: "Leave UI visible.", whenOff: "Menu hidden (org may still gate APIs)." },
    { id: "approveTeamEnabled", scope: "role", group: "Role · manager", name: "Approve team", key: "approveTeamEnabled",
      description: "Manager approves leave via canAct.", whenOn: "Manager/delegate approve.", whenOff: "Cannot approve." },
    { id: "approvalDelegationEnabled", scope: "org", group: "Org · delegation", name: "Approval delegation", key: "approvalDelegationEnabled",
      description: "Delegate in effectiveApproverIds for LEAVE.", whenOn: "Delegate can approve.", whenOff: "Manager only." },
    { id: "scopeLeave", scope: "sim", group: "Simulated delegation", name: "Scope: LEAVE", key: "approval_types[] LEAVE",
      description: "Delegation row includes LEAVE.", whenOn: "canAct(501, emp, LEAVE).", whenOff: "Manager-only approve." },
    { id: "universalApprovalInboxEnabled", scope: "org", group: "Org · workspace", name: "Universal inbox", key: "universalApprovalInboxEnabled",
      description: "Workspace Approvals LEAVE domain.", whenOn: "Inbox shows leave.", whenOff: "Leave pending UI only." },
    { id: "approvalReminderEnabled", scope: "org", group: "Org · delegation", name: "Approval reminders", key: "approvalReminderEnabled",
      description: "SLA for SUBMITTED leave.", whenOn: "Reminder emails.", whenOff: "No auto reminders." }
  ];

  const PRESETS = {
    production: { leaveManagementEnabled: true, leaveAutoSyncToAttendance: true, leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true, leavesEnabled: true, approveTeamEnabled: true, approvalDelegationEnabled: true, scopeLeave: true, universalApprovalInboxEnabled: true, approvalReminderEnabled: true },
    leaveOff: { leaveManagementEnabled: false, leaveAutoSyncToAttendance: true, leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true, leavesEnabled: true, approveTeamEnabled: true, approvalDelegationEnabled: true, scopeLeave: true, universalApprovalInboxEnabled: true, approvalReminderEnabled: true },
    menuOff: { leaveManagementEnabled: true, leaveAutoSyncToAttendance: true, leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true, leavesEnabled: false, approveTeamEnabled: true, approvalDelegationEnabled: true, scopeLeave: true, universalApprovalInboxEnabled: true, approvalReminderEnabled: true },
    strictPolicy: { leaveManagementEnabled: true, leaveAutoSyncToAttendance: true, leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true, leavesEnabled: true, approveTeamEnabled: true, approvalDelegationEnabled: true, scopeLeave: true, universalApprovalInboxEnabled: true, approvalReminderEnabled: true },
    noSync: { leaveManagementEnabled: true, leaveAutoSyncToAttendance: false, leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true, leavesEnabled: true, approveTeamEnabled: true, approvalDelegationEnabled: true, scopeLeave: true, universalApprovalInboxEnabled: true, approvalReminderEnabled: true }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "leaveManagementEnabled";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function ctxFrom(f) {
    const leaveOn = !!f.leaveManagementEnabled;
    const menu = !!f.leavesEnabled;
    const syncAtt = !!f.leaveAutoSyncToAttendance;
    const allowNeg = !!f.leaveAllowNegativeBalance;
    const blockOverlap = !!f.leaveBlockOverlapRegardlessOfType;
    const blockNonWorking = !!f.leaveBlockNonWorkingDayLeave;
    const approveTeam = !!f.approveTeamEnabled;
    const delegation = !!f.approvalDelegationEnabled;
    const scopeLeave = !!f.scopeLeave;
    const inbox = !!f.universalApprovalInboxEnabled;
    const reminders = !!f.approvalReminderEnabled;

    const canUseLeave = leaveOn && menu;
    const canCreate = leaveOn;
    const canSubmit = leaveOn;
    const canApprove = leaveOn && approveTeam;
    const delegateApprove = leaveOn && delegation && scopeLeave && approveTeam;
    const canPending = leaveOn && canApprove;
    const strictValidation = blockOverlap && blockNonWorking && !allowNeg;

    return {
      leaveOn, menu, syncAtt, allowNeg, blockOverlap, blockNonWorking, approveTeam, delegation, scopeLeave, inbox, reminders,
      canUseLeave, canCreate, canSubmit, canApprove, delegateApprove, canPending, strictValidation,
      mode: !leaveOn ? "off" : "pending"
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "Leave APIs": c.canCreate,
        "Submit leave": c.canSubmit,
        "Manager approve": c.canApprove,
        "Delegate approve": c.delegateApprove,
        "Attendance sync on promote": c.syncAtt && c.leaveOn,
        "Strict overlap/non-working": c.blockOverlap && c.blockNonWorking,
        "Universal inbox leave": c.inbox && c.leaveOn
      };
    };
    const a = caps(prev), b = caps(next);
    const gained = [], lost = [];
    Object.keys(b).forEach((k) => {
      if (!a[k] && b[k]) gained.push(k);
      if (a[k] && !b[k]) lost.push(k);
    });
    return { gained, lost };
  }

  function computeBehavior(f) {
    const c = ctxFrom(f);
    const summary = !c.leaveOn
      ? "leaveManagementEnabled OFF — all leave workflow APIs fail closed."
      : "Create (CREATED) → Submit (SUBMITTED, balance reserve) → Manager/delegate Approve (APPROVED, debit + promotion) → TaskActivity LEAVE + optional attendance sync.";

    const requestSteps = [
      { label: "Create draft", state: c.canCreate ? "on" : "off" },
      { label: "Validate policy", state: c.canSubmit && c.strictValidation ? "on" : c.canSubmit ? "on" : "off" },
      { label: "Submit", state: c.canSubmit ? "on" : "off" },
      { label: "Reserve balance", state: c.canSubmit ? "on" : "off" }
    ];
    const approveSteps = [
      { label: "Pending SUBMITTED", state: c.canPending ? "on" : "off" },
      { label: "canAct LEAVE", state: c.canApprove ? "on" : "off" },
      { label: "Approve/Reject", state: c.canApprove ? "on" : "off" },
      { label: "Promote + sync", state: c.leaveOn && c.syncAtt ? "on" : c.leaveOn ? "on" : "off" }
    ];
    const cards = [
      { title: "Leave module", html: c.leaveOn ? `<span class="on">APIs enabled</span>` : `<span class="off">Off</span>` },
      { title: "Menu /people/leaves", html: c.canUseLeave ? `<span class="on">Visible</span>` : `<span class="off">Hidden or gated</span>` },
      { title: "Delegate approve", html: c.delegateApprove ? `<span class="on">DELEGATE audit</span>` : `<span class="off">Manager only</span>` },
      { title: "Negative balance", html: c.allowNeg ? `<span class="on">Allowed</span>` : `<span class="off">Blocked</span>` },
      { title: "Attendance sync", html: c.syncAtt && c.leaveOn ? `<span class="on">After promote</span>` : `<span class="off">Off</span>` },
      { title: "Inbox / reminders", html: `${c.inbox ? `<span class="on">Inbox</span>` : `<span class="off">Inbox</span>`} · ${c.reminders ? `<span class="on">Reminders</span>` : `<span class="off">Reminders</span>`}` }
    ];
    const matrix = [
      { cap: "Leave management (org)", ok: c.leaveOn, why: "leaveManagementEnabled" },
      { cap: "Create leave request", ok: c.canCreate, why: "org master" },
      { cap: "Submit → SUBMITTED", ok: c.canSubmit, why: "org master" },
      { cap: "Manager approve/reject", ok: c.canApprove, why: "approveTeamEnabled + org" },
      { cap: "Delegate approve (LEAVE)", ok: c.delegateApprove, why: "delegation + scopeLeave" },
      { cap: "Block overlapping dates", ok: c.blockOverlap, why: "leaveBlockOverlapRegardlessOfType" },
      { cap: "Block non-working days", ok: c.blockNonWorking, why: "leaveBlockNonWorkingDayLeave" },
      { cap: "Allow negative balance", ok: c.allowNeg, why: "leaveAllowNegativeBalance" },
      { cap: "Sync to attendance", ok: c.syncAtt && c.leaveOn, why: "leaveAutoSyncToAttendance" },
      { cap: "Universal Approvals inbox", ok: c.inbox && c.leaveOn, why: "universalApprovalInboxEnabled" }
    ];
    return { summary, requestSteps, approveSteps, cards, matrix, mode: c.mode };
  }

  function describeBehaviorChange(prev, next, id) {
    const a = computeBehavior(prev), b = computeBehavior(next);
    const diffs = [];
    const def = FLAG_DEFS.find((d) => d.id === id);
    if (def) diffs.push({ type: next[id] ? "pos" : "neg", text: `${def.name} → ${next[id] ? "ON" : "OFF"}` });
    a.matrix.forEach((row, i) => {
      if (row.ok !== b.matrix[i].ok) diffs.push({ type: b.matrix[i].ok ? "pos" : "neg", text: `${row.cap}: ${row.ok ? "yes" : "no"} → ${b.matrix[i].ok ? "yes" : "no"}` });
    });
    return diffs;
  }

  function mermaidBlock(id, code, dimmed) {
    return `<div class="diagram ${dimmed ? "is-dimmed" : ""}"><div class="diagram__label">Data flow diagram</div>
      <pre class="mermaid" id="${id}">${esc(code.trim())}</pre></div>`;
  }
  function sqlBlock(code) { return `<div class="sql">${esc(code.trim())}</div>`; }
  function flowCards(cards) {
    return `<div class="flow-cards">${cards.map((x) =>
      `<div class="flow-card is-${x.kind}"><strong>${esc(x.table)}</strong><br/>${esc(x.action)}</div>`
    ).join("")}</div>`;
  }
  function stepOpen(opts) {
    const { id, num, title, badges, blocked, reason, flashIds } = opts;
    const flash = lastChanged && flashIds && flashIds.includes(lastChanged) ? "is-flash" : "";
    const badgeHtml = (badges || []).map((b) => `<span class="badge badge--${b.t}">${esc(b.l)}</span>`).join("");
    return `<section class="step ${blocked ? "is-blocked" : ""} ${flash}" id="${id}">
      <div class="step__head"><span class="step__num">${esc(String(num))}</span><h3>${title}</h3>${badgeHtml}
        ${blocked ? `<span class="badge badge--off">Not applicable</span>` : `<span class="badge badge--active">In flow</span>`}</div>
      <div class="block-reason"><strong>Why blocked</strong> ${reason || ""}</div><div class="step__body">`;
  }
  function stepClose() { return `</div></section>`; }

  function changeBannerHtml() {
    if (!lastChanged) return "";
    const def = FLAG_DEFS.find((d) => d.id === lastChanged);
    const { gained, lost } = impactDiff(prevState, state);
    const list = (items, empty) => items.length ? items.map((i) => `<li>${esc(i)}</li>`).join("") : `<li class="impact-empty">${empty}</li>`;
    return `<div class="change-banner is-visible"><div class="change-banner__title">What just changed</div>
      <p><strong>${esc(def ? def.name : lastChanged)}</strong> → <code>${state[lastChanged] ? "ON" : "OFF"}</code></p>
      <div class="impact-grid"><div class="impact-col impact-col--gained"><h5>Now available</h5><ul>${list(gained, "None")}</ul></div>
      <div class="impact-col impact-col--lost"><h5>Now blocked</h5><ul>${list(lost, "None")}</ul></div></div></div>`;
  }

  function pipelineHtml(c) {
    if (!c.leaveOn) {
      return `<div class="pipeline"><div class="pipeline__label">End-to-end leave flow</div><div class="pipeline__track">
        <div class="pipe-node is-blocked">Module off<span class="pipe-node__sub">Blocked</span></div></div></div>`;
    }
    const nodes = [
      { n: "1 Create", s: "CREATED", st: "active" },
      { n: "2 Submit", s: "SUBMITTED", st: "active" },
      { n: "3 Pending", s: c.canPending ? "Inbox" : "Blocked", st: c.canPending ? "active" : "blocked" },
      { n: "4 Approve", s: c.canApprove ? "APPROVED" : "Blocked", st: c.canApprove ? "active" : "blocked" },
      { n: "5 Promote", s: "TaskActivity", st: "active" },
      { n: "6 Sync", s: c.syncAtt ? "Attendance" : "Skip", st: c.syncAtt ? "active" : "blocked" }
    ];
    let track = "";
    nodes.forEach((n, i) => {
      if (i) track += `<span class="pipe-arrow">→</span>`;
      track += `<div class="pipe-node is-${n.st}">${esc(n.n)}<span class="pipe-node__sub">${esc(n.s)}</span></div>`;
    });
    return `<div class="pipeline"><div class="pipeline__label">End-to-end leave flow (current flags)</div><div class="pipeline__track">${track}</div></div>`;
  }

  function renderDoc() {
    const c = ctx();
    const seq = ++renderSeq;
    let html = changeBannerHtml();
    html += `<div class="mode-pill mode-pill--${c.mode}">${c.leaveOn ? "Mode: Manager review (SUBMITTED pending)" : "Mode: Leave management off"}</div>`;
    html += pipelineHtml(c);

    html += `<nav class="toc"><h3>Steps</h3><ol>
      <li><a href="#t0">Table map</a></li><li><a href="#tEx">Example cast</a></li>`;
    if (!c.leaveOn) html += `<li class="blocked-link">All flows blocked</li>`;
    else {
      html += `<li><a href="#t1">1. Create leave (draft)</a></li>`;
      html += `<li><a href="#t2">2. Submit for approval</a></li>`;
      html += `<li class="${c.canPending ? "" : "blocked-link"}"><a href="#t3">3. Pending queue query</a></li>`;
      html += `<li class="${c.canApprove ? "" : "blocked-link"}"><a href="#t4">4. Manager approve</a></li>`;
      html += `<li class="${c.canApprove ? "" : "blocked-link"}"><a href="#t5">5. Reject → fix → resubmit</a></li>`;
      html += `<li class="${c.delegateApprove ? "" : "blocked-link"}"><a href="#t6">6. Delegate approve</a></li>`;
      html += `<li><a href="#t7">7. Withdraw / cancel</a></li>`;
      html += `<li><a href="#t8">8. Promotion (TaskActivity)</a></li>`;
      html += `<li class="${c.syncAtt ? "" : "blocked-link"}"><a href="#t9">9. Attendance sync</a></li>`;
      html += `<li class="${c.inbox ? "" : "blocked-link"}"><a href="#t10">10. Universal inbox</a></li>`;
      html += `<li><a href="#tLife">Status lifecycle</a></li>
      <li><a href="./leave-policy-flags-data-flow.html">← Policy &amp; accrual (prerequisite)</a></li>`;
    }
    html += `</ol></nav>`;

    if (!c.leaveOn) {
      html += stepOpen({ id: "t0", num: "!", title: "Leave management off", badges: [{ t: "off", l: "OFF" }], blocked: true, reason: "leaveManagementEnabled OFF.", flashIds: ["leaveManagementEnabled"] });
      html += `<p class="step__desc">Enable org <code>leaveManagementEnabled</code> to see the full data flow.</p>${stepClose()}`;
      document.getElementById("docPanel").innerHTML = html;
      return runMermaid(seq);
    }

    // 0 map
    html += stepOpen({ id: "t0", num: "0", title: "Table map", badges: [{ t: "approved", l: "CORE" }], blocked: false, flashIds: ["leaveManagementEnabled"] });
    html += `<p class="step__desc">Leave requests live in protected core <code>fs_emp_leave_master_model</code>. Balance holds are in <code>ts_employee_leave_balance_model</code> + ledger. Policy rules come from published global version or classic policy — see <a href="./leave-policy-flags-data-flow.html">leave policy data flow</a>. After approve, <code>LeavePromotionService</code> writes TaskActivity LEAVE and optionally attendance rows.</p>
      <div class="table-map">
        <span class="pill pill--core">fs_emp_leave_master_model</span>
        <span class="pill pill--balance">ts_employee_leave_balance_model</span>
        <span class="pill pill--balance">ts_leave_balance_ledger_model</span>
        <span class="pill pill--core">fs_task_activity_model</span>
        <span class="pill pill--core">fs_user_attendance_model</span>
      </div>`;
    html += mermaidBlock("m-er", `
flowchart TB
  LV["fs_emp_leave_master_model<br/>workflow_status"] --> BAL["LeaveBalanceEngine<br/>reserve / debit / release"]
  LV -->|approve| PROM["LeavePromotionService"]
  PROM --> TA["fs_task_activity LEAVE"]
  PROM --> ATT["fs_user_attendance LEAVE/HALF_DAY"]
    `);
    html += stepClose();

    // Example
    html += stepOpen({ id: "tEx", num: "★", title: "Example cast", badges: [], blocked: false });
    html += `<div class="scenario-box"><h4>Story — Annual leave 2026-07-21 → 2026-07-23 (3 days)</h4>
      <p>Rahul Kapoor (200) requests leave. Meera Shah (300) approves. ${c.delegateApprove ? "Or delegate Anil Rao (501) with Acting for Meera." : "Delegation off or LEAVE scope off — manager only."}</p></div>
      <table class="data"><thead><tr><th>Role</th><th>Name</th><th>id</th></tr></thead><tbody>
      <tr><td>Employee</td><td>Rahul Kapoor</td><td>200</td></tr>
      <tr><td>Manager</td><td>Meera Shah</td><td>300</td></tr>
      <tr><td>Delegate</td><td>Anil Rao</td><td>501</td></tr></tbody></table>`;
    html += stepClose();

    // 1 Create
    html += stepOpen({ id: "t1", num: "1", title: "Create leave request (draft)", badges: [{ t: "pending", l: "CREATED" }], blocked: false, flashIds: ["leaveBlockOverlapRegardlessOfType", "leaveBlockNonWorkingDayLeave"] });
    html += `<p class="step__desc">Rahul creates annual leave Jul 21–23. Validates overlap ${c.blockOverlap ? "(ON)" : "(OFF)"}, non-working days ${c.blockNonWorking ? "(ON)" : "(OFF)"}, working-day count.</p>
      <div class="api"><span>POST</span> /api/v2/leaves (operation=CREATE, employeeId=200)</div>`;
    html += flowCards([
      { table: "fs_emp_leave_master", action: "INSERT workflow_status=CREATED", kind: "write" },
      { table: "balance", action: "NOT YET reserved", kind: "read" }
    ]);
    html += mermaidBlock("m-create", `
flowchart LR
  FORM["Leave form"] --> POST["POST /leaves CREATE"]
  POST --> ROW["fs_emp_leave_master id=880<br/>CREATED"]
      `);
    html += `<table class="data"><thead><tr><th>id</th><th>employee_id</th><th>dates</th><th>leave_type</th><th>days</th><th>workflow_status</th></tr></thead>
      <tbody><tr class="changed"><td>880</td><td>200</td><td>2026-07-21 … 23</td><td>ANNUAL</td><td class="hl">3</td><td class="hl">CREATED</td></tr></tbody></table>`;
    html += stepClose();

    // 2 Submit
    html += stepOpen({ id: "t2", num: "2", title: "Submit for approval", badges: [{ t: "pending", l: "SUBMITTED" }], blocked: false, flashIds: ["leaveAllowNegativeBalance"] });
    html += `<p class="step__desc">Submit moves to SUBMITTED, reserves balance pending hold, notifies manager${c.delegateApprove ? " + delegate" : ""}. Balance check: ${c.allowNeg ? "negative allowed" : "must have available days"} (balance seeded via <a href="./leave-policy-flags-data-flow.html#t6">opening import/accrual</a>). <code>enforceRuntimePolicyRules</code> applies eligibility from published <code>rules_json</code>.</p>
      <div class="api"><span>PATCH</span> /api/v2/leaves/880/submit?actorId=200</div>`;
    html += flowCards([
      { table: "fs_emp_leave_master", action: "→ SUBMITTED", kind: "write" },
      { table: "leave balance", action: "reserveOnSubmit", kind: "write" },
      { table: "audit", action: "SUBMIT event", kind: "write" }
    ]);
    html += mermaidBlock("m-submit", `
flowchart LR
  CREATED["CREATED"] -->|submit| SUB["SUBMITTED"]
  SUB --> RES["balance reserve pending"]
  SUB --> NOTIFY["notify manager 300"]
      `);
    html += `<table class="data"><thead><tr><th>id</th><th>workflow_status</th><th>submitted_at</th><th>balance pending</th></tr></thead>
      <tbody><tr class="changed"><td>880</td><td class="hl">SUBMITTED</td><td class="hl">2026-07-18</td><td class="hl">+3 days held</td></tr></tbody></table>`;
    html += stepClose();

    // 3 Pending
    {
      const blocked = !c.canPending;
      html += stepOpen({ id: "t3", num: "3", title: "Pending approval queue (query + canAct)", badges: [{ t: "pending", l: "QUERY" }], blocked,
        reason: "Need approveTeamEnabled for manager inbox.", flashIds: ["approveTeamEnabled"] });
      html += `<p class="step__desc">Pending leave uses <code>workflow_status = SUBMITTED</code> (not PENDING_APPROVAL). Inbox queries team rows then filters with <code>canAct(approverId, employeeId, LEAVE)</code>.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/leaves/pending?managerId=300&amp;userTeamId=7</div>`;
      html += sqlBlock(`SELECT * FROM fs_emp_leave_master_model
WHERE user_team_id IN (7)
  AND workflow_status = 'SUBMITTED';`);
      html += `<ul class="steps-list"><li>Per row 880: <code>canAct(300, 200, LEAVE)</code> → resolve effectiveApproverIds</li>
        <li>Response includes <code>actingAsDelegate</code> + <code>authorityManagerId</code> when viewer is a delegate (same pattern as timesheet/attendance pending)</li>
        <li>${c.inbox ? "Also surfaced in Universal Approvals LEAVE domain" : "Domain-specific pending UI only"}</li></ul>`;
      html += mermaidBlock("m-pending", `
flowchart TB
  SQL["findPendingByUserTeamIds SUBMITTED"] --> ROW["leave 880"]
  ROW --> CA["canAct manager/delegate LEAVE"]
  CA --> MAP["mapApi + resolve → acting fields"]
  MAP --> INBOX["Manager pending panel + Acting for badge"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>employee</th><th>workflow_status</th><th>in Meera inbox?</th><th>actingAsDelegate (Anil)</th></tr></thead>
        <tbody><tr class="changed"><td>880</td><td>200</td><td>SUBMITTED</td><td class="hl">${blocked ? "no" : "yes"}</td><td class="hl">${blocked || !c.delegateApprove ? "—" : "true"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 4 Approve manager
    {
      const blocked = !c.canApprove;
      html += stepOpen({ id: "t4", num: "4", title: "Manager approve", badges: [{ t: "approved", l: "APPROVED" }], blocked,
        reason: "approveTeamEnabled OFF.", flashIds: ["approveTeamEnabled"] });
      html += `<p class="step__desc">Meera approves leave 880. Debits balance, sets promotionStatus=PENDING, runs LeavePromotionService.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> /api/v2/leaves/880/approve?approverId=300</div>`;
      html += mermaidBlock("m-apr", `
flowchart LR
  SUB["SUBMITTED"] -->|approve| APR["APPROVED"]
  APR --> DEB["debitOnApprove"]
  APR --> PROM["promotion PENDING→SUCCESS"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>workflow_status</th><th>approver_id</th><th>approval_authority_type</th><th>promotion_status</th></tr></thead>
        <tbody><tr class="changed"><td>880</td><td class="hl">APPROVED</td><td class="hl">300</td><td class="hl">MANAGER</td><td class="hl">SUCCESS</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 5 Reject
    {
      const blocked = !c.canApprove;
      html += stepOpen({ id: "t5", num: "5", title: "Reject → employee fixes → resubmit", badges: [{ t: "rejected", l: "REJECTED" }], blocked,
        reason: "Same gates as approve.", flashIds: ["approveTeamEnabled"] });
      html += `<div class="scenario-box"><h4>Scenario B — leave 881</h4><p>Meera rejects with comment. Balance pending released. Rahul edits and resubmits from REJECTED → SUBMITTED.</p></div>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> /api/v2/leaves/881/reject?approverId=300 + comment</div>`;
      html += mermaidBlock("m-rej", `
flowchart LR
  SUB["SUBMITTED"] -->|reject| REJ["REJECTED"]
  REJ --> REL["releaseOnRejectOrWithdraw"]
  REJ --> FIX["edit → resubmit → SUBMITTED"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>workflow_status</th><th>approval_comment</th></tr></thead>
        <tbody><tr class="changed"><td>881</td><td class="hl">REJECTED</td><td class="hl">Insufficient coverage plan</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 6 Delegate
    {
      const blocked = !c.delegateApprove;
      let reason = !c.delegation ? "approvalDelegationEnabled OFF." : !c.scopeLeave ? "LEAVE not in delegation scope." : "approveTeamEnabled OFF.";
      html += stepOpen({ id: "t6", num: "6", title: "Delegate approve (LEAVE scope)", badges: [{ t: "approved", l: "DELEGATE" }], blocked, reason,
        flashIds: ["approvalDelegationEnabled", "scopeLeave"] });
      html += `<p class="step__desc">Anil (501) approves via <code>canAct(501, 200, LEAVE)</code>. Pending list already exposed <code>actingAsDelegate=true</code> for UI badge. Sets <code>acted_on_behalf_of=300</code>, <code>approval_authority_type=DELEGATE</code>. See <a href="./delegation-flags-data-flow.html#t7">delegation step 7</a>.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> …/leaves/880/approve?approverId=501</div>
        <span class="badge-acting">Acting for Meera Shah</span>`;
      html += mermaidBlock("m-del", `
flowchart LR
  ANIL["approver 501"] --> CAN["canAct LEAVE"]
  CAN --> APR["APPROVED"]
  APR --> AUD["acted_on_behalf_of=300<br/>DELEGATE"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>approver_id</th><th>approval_authority_type</th><th>acted_on_behalf_of</th></tr></thead>
        <tbody><tr class="changed"><td class="hl">${blocked ? "—" : "501"}</td><td class="hl">${blocked ? "—" : "DELEGATE"}</td><td class="hl">${blocked ? "—" : "300"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 7 Withdraw/cancel
    html += stepOpen({ id: "t7", num: "7", title: "Withdraw (draft/submitted) or cancel (approved)", badges: [{ t: "off", l: "WITHDRAW/CANCEL" }], blocked: false });
    html += `<p class="step__desc">Withdraw from CREATED/SUBMITTED → WITHDRAWN (releases pending). Cancel from APPROVED → CANCELLED (credits balance + demote promotion).</p>
      <div class="api"><span>PATCH</span> …/withdraw or …/cancel?actorId=200</div>`;
    html += `<table class="data"><thead><tr><th>Action</th><th>From</th><th>To</th><th>Balance</th></tr></thead><tbody>
      <tr><td>Withdraw</td><td>SUBMITTED</td><td class="hl">WITHDRAWN</td><td>release pending</td></tr>
      <tr><td>Cancel</td><td>APPROVED</td><td class="hl">CANCELLED</td><td>credit + demote</td></tr></tbody></table>`;
    html += stepClose();

    // 8 Promotion
    html += stepOpen({ id: "t8", num: "8", title: "Promotion — TaskActivity LEAVE", badges: [{ t: "approved", l: "PROMOTE" }], blocked: false });
    html += `<p class="step__desc">After approve, LeavePromotionService creates/updates <code>fs_task_activity_model</code> with taskType LEAVE for working days in range. Sets promotion_status SUCCESS or FAILED (retry scheduler).</p>`;
    html += mermaidBlock("m-prom", `
flowchart LR
  APR["APPROVED leave 880"] --> PROM["LeavePromotionService"]
  PROM --> TA["fs_task_activity LEAVE<br/>3 working days"]
  PROM --> PS["promotion_status SUCCESS"]
      `);
    html += `<table class="data"><thead><tr><th>leave id</th><th>task_activity</th><th>promotion_status</th><th>sync flag</th></tr></thead>
      <tbody><tr class="changed"><td>880</td><td class="hl">3 LEAVE rows</td><td class="hl">SUCCESS</td><td>true</td></tr></tbody></table>`;
    html += stepClose();

    // 9 Attendance sync
    {
      const blocked = !c.syncAtt;
      html += stepOpen({ id: "t9", num: "9", title: "Attendance sync after promotion", badges: [{ t: "approved", l: "SYNC" }], blocked,
        reason: "leaveAutoSyncToAttendance OFF.", flashIds: ["leaveAutoSyncToAttendance"] });
      html += `<p class="step__desc">When org flag ON, LeaveAttendanceSyncService writes <code>fs_user_attendance_model</code> LEAVE/HALF_DAY per day — blocks manual mark on those dates.</p>`;
      html += mermaidBlock("m-sync", `
flowchart LR
  PROM["promotion SUCCESS"] --> SYNC["LeaveAttendanceSyncService"]
  SYNC --> ATT["fs_user_attendance<br/>Jul 21-23 status=LEAVE"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>date</th><th>employee_id</th><th>status</th></tr></thead>
        <tbody><tr class="changed"><td>2026-07-21</td><td>200</td><td class="hl">LEAVE</td></tr>
        <tr class="changed"><td>2026-07-22</td><td>200</td><td class="hl">LEAVE</td></tr>
        <tr class="changed"><td>2026-07-23</td><td>200</td><td class="hl">LEAVE</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 10 Inbox
    {
      const blocked = !c.inbox;
      html += stepOpen({ id: "t10", num: "10", title: "Universal Approvals inbox (LEAVE domain)", badges: [{ t: "pending", l: "INBOX" }], blocked,
        reason: "universalApprovalInboxEnabled OFF.", flashIds: ["universalApprovalInboxEnabled"] });
      html += `<p class="step__desc">Workspace aggregates SUBMITTED leave with timesheet/attendance pending. Each item still requires canAct for viewer. Approve/reject from inbox via <code>POST /approvals/inbox/LEAVE/{id}/{action}</code> (same as timesheet). Rows carry <code>actingAsDelegate</code> for delegate viewers.</p>`;
      html += mermaidBlock("m-inbox", `
flowchart LR
  INBOX["Universal Approvals"] --> LEAVE["LEAVE domain items"]
  LEAVE --> CA["canAct filter"]
      `, blocked);
      html += stepClose();
    }

    // Lifecycle
    html += stepOpen({ id: "tLife", num: "∞", title: "Workflow status lifecycle", badges: [], blocked: false });
    html += mermaidBlock("m-life", `
stateDiagram-v2
  [*] --> CREATED: create
  CREATED --> SUBMITTED: submit
  REJECTED --> SUBMITTED: resubmit
  SUBMITTED --> APPROVED: approve
  SUBMITTED --> REJECTED: reject
  CREATED --> WITHDRAWN: withdraw
  SUBMITTED --> WITHDRAWN: withdraw
  APPROVED --> CANCELLED: cancel
  APPROVED --> SYNCED: external sync
  APPROVED --> promotion: TaskActivity + attendance
    `);
    html += `<ul class="steps-list">
      <li>Manager approve: <strong style="color:${c.canApprove ? "var(--ok)" : "var(--danger)"}">${c.canApprove ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>Delegate LEAVE: <strong style="color:${c.delegateApprove ? "var(--ok)" : "var(--danger)"}">${c.delegateApprove ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>Attendance sync: <strong>${c.syncAtt ? "ON" : "OFF"}</strong></li></ul>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + b.mode;
    pill.textContent = b.mode === "off" ? "Mode: Leave off" : "Mode: Submit → manager review";
    document.getElementById("bhSummary").textContent = b.summary;
    const renderFlow = (el, steps) => {
      document.getElementById(el).innerHTML = steps.map((s, i) => {
        const arrow = i < steps.length - 1 ? `<span class="flow-arrow">→</span>` : "";
        return `<span class="bh-flow-step is-${s.state}">${esc(s.label)}</span>${arrow}`;
      }).join("");
    };
    renderFlow("bhFlowRequest", b.requestSteps);
    renderFlow("bhFlowApprove", b.approveSteps);
    document.getElementById("bhCards").innerHTML = b.cards.map((card) =>
      `<div class="bh-card"><div class="bh-card__title">${esc(card.title)}</div><p class="bh-card__body">${card.html}</p></div>`
    ).join("");
    document.getElementById("bhMatrixBody").innerHTML = b.matrix.map((row) => {
      const flash = lastChanged && describeBehaviorChange(prevState, state, lastChanged).some((d) => d.text.startsWith(row.cap)) ? "is-flash" : "";
      return `<tr class="${flash}"><td>${esc(row.cap)}</td><td class="${row.ok ? "yes" : "no"}">${row.ok ? "YES" : "NO"}</td><td>${esc(row.why)}</td></tr>`;
    }).join("");
    const banner = document.getElementById("bhChangeBanner");
    const diffList = document.getElementById("bhDiffList");
    if (lastChanged) {
      banner.className = "change-banner is-visible";
      banner.innerHTML = `<strong>Flag changed:</strong> <code>${esc(lastChanged)}</code>`;
      diffList.innerHTML = describeBehaviorChange(prevState, state, lastChanged).map((d) =>
        `<li class="${d.type === "neg" ? "neg" : ""}">${esc(d.text)}</li>`
      ).join("");
    } else { banner.className = "change-banner"; banner.innerHTML = ""; diffList.innerHTML = ""; }
  }

  async function runMermaid(seq) {
    if (!mermaidReady || !window.__mermaid || seq !== renderSeq) return;
    try { await window.__mermaid.run({ nodes: document.querySelectorAll("#tabDataflow .mermaid") }); } catch (e) { console.warn(e); }
  }

  function renderFlags() {
    const groups = [...new Set(FLAG_DEFS.map((f) => f.group))];
    document.getElementById("flagList").innerHTML = groups.map((g) => {
      const items = FLAG_DEFS.filter((f) => f.group === g).map((f) => `
        <div class="flag ${lastChanged === f.id ? "is-flash" : ""} ${selectedFlagId === f.id ? "is-selected" : ""}">
          <div><button type="button" class="flag__name" data-select="${f.id}">${esc(f.name)}</button>
            <span class="flag__key">${esc(f.key)}</span>
            <span class="flag__scope scope-${f.scope === "org" ? "org" : f.scope === "sim" ? "sim" : "role"}">${f.scope}</span></div>
          <label class="switch"><input type="checkbox" data-toggle="${f.id}" ${state[f.id] ? "checked" : ""} /><span class="track"></span></label>
        </div>`).join("");
      return `<div class="group-label">${esc(g)}</div>${items}`;
    }).join("");
    const def = FLAG_DEFS.find((f) => f.id === selectedFlagId);
    if (def) document.getElementById("flagDetail").innerHTML = `<h4>${esc(def.name)}</h4><p>${esc(def.description)}</p>
      <div class="when-pair"><div class="when when--on"><strong>When ON</strong>${esc(def.whenOn)}</div>
      <div class="when when--off"><strong>When OFF</strong>${esc(def.whenOff)}</div></div>`;
  }

  function switchTab(tabId) {
    document.querySelectorAll(".right-tabs__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabId);
    });
    document.getElementById("tabDataflow").classList.toggle("is-active", tabId === "dataflow");
    document.getElementById("tabBehavior").classList.toggle("is-active", tabId === "behavior");
    document.getElementById("tabBehavior").hidden = tabId !== "behavior";
    if (tabId === "dataflow") runMermaid(renderSeq);
  }

  function refresh() { renderFlags(); renderDoc(); renderBehavior(); }

  document.getElementById("flagList").addEventListener("change", (e) => {
    const id = e.target.getAttribute("data-toggle");
    if (!id) return;
    prevState = { ...state }; state[id] = e.target.checked; lastChanged = id;
    document.querySelectorAll("#presets button").forEach((b) => b.classList.remove("is-active"));
    refresh();
  });
  document.getElementById("flagList").addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-select");
    if (id) { selectedFlagId = id; renderFlags(); }
  });
  document.getElementById("presets").addEventListener("click", (e) => {
    const name = e.target.getAttribute("data-preset");
    if (!name || !PRESETS[name]) return;
    prevState = { ...state }; state = { ...PRESETS[name] };
    lastChanged = name === "leaveOff" ? "leaveManagementEnabled" : name === "menuOff" ? "leavesEnabled" : name === "noSync" ? "leaveAutoSyncToAttendance" : null;
    document.querySelectorAll("#presets button").forEach((b) => b.classList.toggle("is-active", b.dataset.preset === name));
    refresh();
  });
  document.querySelector(".right-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".right-tabs__btn");
    if (tab && tab.dataset.tab) switchTab(tab.dataset.tab);
  });

  function boot() {
    mermaidReady = true;
    document.querySelector('#presets button[data-preset="production"]').classList.add("is-active");
    refresh();
  }
  if (window.__mermaid) boot();
  else window.addEventListener("mermaid-ready", boot);
})();
