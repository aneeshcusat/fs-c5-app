/* Approval delegation flags + data flow */
(function () {
  const FLAG_DEFS = [
    { id: "approvalDelegationEnabled", scope: "org", group: "Org · approvalDelegation", name: "Approval delegation", key: "approvalDelegationEnabled",
      description: "Master org switch.", whenOn: "Delegates in effectiveApproverIds.", whenOff: "Manager-only authority." },
    { id: "approvalReminderEnabled", scope: "org", group: "Org · approvalDelegation", name: "Approval reminders", key: "approvalReminderEnabled",
      description: "SLA reminder scheduler.", whenOn: "Emails for pending.", whenOff: "No auto reminders." },
    { id: "universalApprovalInboxEnabled", scope: "org", group: "Org · workspace", name: "Universal inbox", key: "universalApprovalInboxEnabled",
      description: "Workspace Approvals aggregate.", whenOn: "Cross-domain inbox.", whenOff: "Domain UIs only." },
    { id: "timesheetApprovalEnabled", scope: "org", group: "Org · module workflows", name: "Timesheet approval", key: "timesheetApprovalEnabled",
      description: "Timesheet workflow.", whenOn: "TIMESHEET pending exists.", whenOff: "No TS pending." },
    { id: "leaveManagementEnabled", scope: "org", group: "Org · module workflows", name: "Leave management", key: "leaveManagementEnabled",
      description: "Leave workflow.", whenOn: "LEAVE pending.", whenOff: "No leave pending." },
    { id: "attendanceRegularizationEnabled", scope: "org", group: "Org · module workflows", name: "Attendance regularization", key: "attendanceRegularizationEnabled",
      description: "Reg workflow uses ATTENDANCE authority.", whenOn: "Reg pending for delegate.", whenOff: "Reg off." },
    { id: "enableTimeSheetApproval", scope: "role", group: "Role · manager", name: "Can approve timesheets", key: "enableTimeSheetApproval",
      description: "Required to create TIMESHEET delegation.", whenOn: "Manager/delegate TS approve.", whenOff: "Cannot create TS delegation." },
    { id: "approveTeamEnabled", scope: "role", group: "Role · manager", name: "Approve team attendance", key: "approveTeamEnabled",
      description: "Proxy for attendance/leave approver.", whenOn: "Team approve.", whenOff: "No team approve." },
    { id: "adminDelegationEnabled", scope: "role", group: "Role · admin", name: "Admin delegation rules", key: "adminDelegationEnabled",
      description: "Admin /admin/delegation page.", whenOn: "Org register visible.", whenOff: "Hidden." },
    { id: "scopeTimesheet", scope: "sim", group: "Simulated delegation row", name: "Scope: TIMESHEET", key: "approval_types[] TIMESHEET",
      description: "Row includes TIMESHEET.", whenOn: "canAct TIMESHEET.", whenOff: "TS manager-only." },
    { id: "scopeLeave", scope: "sim", group: "Simulated delegation row", name: "Scope: LEAVE", key: "approval_types[] LEAVE",
      description: "Row includes LEAVE.", whenOn: "canAct LEAVE.", whenOff: "Leave manager-only." },
    { id: "scopeAttendance", scope: "sim", group: "Simulated delegation row", name: "Scope: ATTENDANCE", key: "approval_types[] ATTENDANCE",
      description: "Mark/removal + reg.", whenOn: "canAct ATTENDANCE.", whenOff: "Attendance manager-only." }
  ];

  const PRESETS = {
    production: { approvalDelegationEnabled: true, approvalReminderEnabled: true, universalApprovalInboxEnabled: true, timesheetApprovalEnabled: true, leaveManagementEnabled: true, attendanceRegularizationEnabled: true, enableTimeSheetApproval: true, approveTeamEnabled: true, adminDelegationEnabled: true, scopeTimesheet: true, scopeLeave: true, scopeAttendance: true },
    off: { approvalDelegationEnabled: false, approvalReminderEnabled: true, universalApprovalInboxEnabled: true, timesheetApprovalEnabled: true, leaveManagementEnabled: true, attendanceRegularizationEnabled: true, enableTimeSheetApproval: true, approveTeamEnabled: true, adminDelegationEnabled: true, scopeTimesheet: true, scopeLeave: true, scopeAttendance: true },
    timesheetOnly: { approvalDelegationEnabled: true, approvalReminderEnabled: false, universalApprovalInboxEnabled: true, timesheetApprovalEnabled: true, leaveManagementEnabled: true, attendanceRegularizationEnabled: true, enableTimeSheetApproval: true, approveTeamEnabled: true, adminDelegationEnabled: false, scopeTimesheet: true, scopeLeave: false, scopeAttendance: false },
    noInbox: { approvalDelegationEnabled: true, approvalReminderEnabled: true, universalApprovalInboxEnabled: false, timesheetApprovalEnabled: true, leaveManagementEnabled: true, attendanceRegularizationEnabled: true, enableTimeSheetApproval: true, approveTeamEnabled: true, adminDelegationEnabled: true, scopeTimesheet: true, scopeLeave: true, scopeAttendance: true }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "approvalDelegationEnabled";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function ctxFrom(f) {
    const master = !!f.approvalDelegationEnabled;
    const reminders = !!f.approvalReminderEnabled;
    const inbox = !!f.universalApprovalInboxEnabled;
    const tsWorkflow = !!f.timesheetApprovalEnabled;
    const leaveWorkflow = !!f.leaveManagementEnabled;
    const reg = !!f.attendanceRegularizationEnabled;
    const canApproveTs = !!f.enableTimeSheetApproval;
    const canApproveTeam = !!f.approveTeamEnabled;
    const adminRules = !!f.adminDelegationEnabled;
    const scopeTs = !!f.scopeTimesheet;
    const scopeLeave = !!f.scopeLeave;
    const scopeAtt = !!f.scopeAttendance;

    const types = [];
    if (scopeTs) types.push("TIMESHEET");
    if (scopeLeave) types.push("LEAVE");
    if (scopeAtt) types.push("ATTENDANCE");

    const canCreate = master && canApproveTs;
    const delegateTs = master && scopeTs && tsWorkflow && canApproveTs;
    const delegateLeave = master && scopeLeave && leaveWorkflow && canApproveTeam;
    const delegateAtt = master && scopeAtt && canApproveTeam;
    const delegateReg = delegateAtt && reg;
    const acting = delegateTs || delegateLeave || delegateAtt;

    return {
      master, reminders, inbox, tsWorkflow, leaveWorkflow, reg, canApproveTs, canApproveTeam, adminRules,
      scopeTs, scopeLeave, scopeAtt, types, canCreate, delegateTs, delegateLeave, delegateAtt, delegateReg, acting,
      effectiveIds: master ? [300, 501] : [300],
      mode: master ? "on" : "off"
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "Create delegation": c.canCreate,
        "Delegate canAct TIMESHEET": c.delegateTs,
        "Delegate canAct LEAVE": c.delegateLeave,
        "Delegate canAct ATTENDANCE": c.delegateAtt,
        "Delegate pending inbox": c.master,
        "Universal inbox": c.inbox && c.master,
        "Acting for badge": c.acting
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
    const summary = c.master
      ? "Delegation ON — resolve(employeeId, requestType) loads manager from fs_employee_model, queries ts_approval_delegation_model, builds effectiveApproverIds = [manager + delegates]. Pending lists query domain tables then filter with canAct(approverId, employeeId, scope)."
      : "Delegation OFF — effectiveApproverIds = [managerId] only. DB delegation rows ignored for canAct.";

    const journey = [
      { label: "Org master ON", state: c.master ? "on" : "off" },
      { label: "Create row", state: c.canCreate ? "on" : "off" },
      { label: "resolve()", state: c.master ? "query" : "off" },
      { label: "Pending query", state: c.master ? "query" : "on" },
      { label: "canAct filter", state: c.master ? "on" : "off" },
      { label: "Approve DELEGATE", state: c.acting ? "on" : "off" }
    ];
    const querySteps = [
      { label: "Employee.manager_id", state: "query" },
      { label: "findActiveByDelegatorId", state: c.master ? "query" : "off" },
      { label: "effectiveApproverIds", state: c.master ? "on" : "off" },
      { label: "canAct ∈ ids?", state: c.master ? "on" : "off" }
    ];
    const domains = [
      { name: "Timesheet", active: c.delegateTs, detail: "findPendingByUserTeamIds + canAct TIMESHEET" },
      { name: "Leave", active: c.delegateLeave, detail: "findPendingByUserTeamIds + canAct LEAVE" },
      { name: "Attendance", active: c.delegateAtt, detail: "findPendingAttendance + canAct ATTENDANCE" },
      { name: "Reg", active: c.delegateReg, detail: "reg pending + ATTENDANCE canAct" }
    ];
    const cards = [
      { title: "Create (Profile)", html: c.canCreate ? `<span class="on">POST /approval-delegations</span>` : `<span class="off">403</span>` },
      { title: "Delegate GET /acting", html: c.master ? `<span class="on">findActiveByDelegateId</span>` : `<span class="off">403</span>` },
      { title: "Acting for badge", html: c.acting ? `<span class="on">approvedOnBehalfOf=300</span>` : `<span class="off">N/A</span>` },
      { title: "Universal inbox", html: c.inbox && c.master ? `<span class="on">Aggregates domains</span>` : `<span class="off">Domain UI only</span>` },
      { title: "Admin rules", html: c.master && c.adminRules ? `<span class="on">/admin/delegation</span>` : `<span class="off">Hidden</span>` },
      { title: "Reminders", html: c.reminders ? `<span class="on">SLA scheduler</span>` : `<span class="off">Off</span>` }
    ];
    const matrix = [
      { cap: "Delegation master", ok: c.master, why: "approvalDelegationEnabled" },
      { cap: "Manager creates row", ok: c.canCreate, why: "master + enableTimeSheetApproval" },
      { cap: "Delegate canAct TIMESHEET", ok: c.delegateTs, why: "scope + workflow + role" },
      { cap: "Delegate canAct LEAVE", ok: c.delegateLeave, why: "LEAVE scope + leave on" },
      { cap: "Delegate canAct ATTENDANCE", ok: c.delegateAtt, why: "ATTENDANCE + approveTeam" },
      { cap: "Delegate canAct regularization", ok: c.delegateReg, why: "ATTENDANCE + reg org" },
      { cap: "Manager in effectiveApproverIds", ok: true, why: "Manager never removed" },
      { cap: "Universal inbox", ok: c.inbox && c.master, why: "universalApprovalInboxEnabled" },
      { cap: "Inbox act (TS/leave/att/reg)", ok: c.inbox && c.master, why: "POST /approvals/inbox/{domain}/{id}/{action}" },
      { cap: "Revoke delegation", ok: c.master, why: "PATCH …/revoke" }
    ];
    return { summary, journey, querySteps, domains, cards, matrix, mode: c.mode };
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

  function sqlBlock(code) {
    return `<div class="sql">${esc(code.trim())}</div>`;
  }

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
    const nodes = c.master
      ? [
          { n: "1 Create", s: c.canCreate ? "Row" : "Blocked", st: c.canCreate ? "active" : "blocked" },
          { n: "2 resolve", s: "SQL", st: "query" },
          { n: "3 Pending", s: "Domain Q", st: "query" },
          { n: "4 canAct", s: "Filter", st: "active" },
          { n: "5 Approve", s: c.acting ? "DELEGATE" : "Mgr", st: c.acting ? "active" : "query" },
          { n: "6 Inbox", s: c.inbox ? "Unified" : "Split", st: c.inbox ? "active" : "query" }
        ]
      : [
          { n: "Delegation", s: "OFF", st: "blocked" },
          { n: "Manager only", s: "canAct", st: "active" }
        ];
    let track = "";
    nodes.forEach((n, i) => {
      if (i) track += `<span class="pipe-arrow ${n.st === "blocked" ? "is-blocked" : ""}">→</span>`;
      track += `<div class="pipe-node is-${n.st}">${esc(n.n)}<span class="pipe-node__sub">${esc(n.s)}</span></div>`;
    });
    return `<div class="pipeline"><div class="pipeline__label">End-to-end delegation flow (current flags)</div><div class="pipeline__track">${track}</div></div>`;
  }

  function typesJson(c) {
    return JSON.stringify(c.types);
  }

  function renderDoc() {
    const c = ctx();
    const seq = ++renderSeq;
    let html = changeBannerHtml();
    html += `<div class="mode-pill mode-pill--${c.mode}">${c.master ? "Mode: Delegation ACTIVE" : "Mode: Manager-only (delegation OFF)"}</div>`;
    html += pipelineHtml(c);

    html += `<nav class="toc"><h3>Steps</h3><ol>
      <li><a href="#t0">Table map</a></li><li><a href="#tEx">Example cast</a></li>
      <li class="${c.master ? "" : "blocked-link"}"><a href="#t1">1. Org master flag</a></li>
      <li class="${c.canCreate ? "" : "blocked-link"}"><a href="#t2">2. Create delegation row</a></li>
      <li><a href="#t3">3. resolve() — how authority is queried</a></li>
      <li class="${c.master ? "" : "blocked-link"}"><a href="#t4">4. Delegate GET /acting</a></li>
      <li class="${c.delegateTs ? "" : "blocked-link"}"><a href="#t5">5. Pending timesheet query</a></li>
      <li class="${c.delegateTs ? "" : "blocked-link"}"><a href="#t6">6. Delegate approves timesheet</a></li>
      <li class="${c.delegateLeave ? "" : "blocked-link"}"><a href="#t7">7. Leave pending + approve</a></li>
      <li class="${c.delegateAtt ? "" : "blocked-link"}"><a href="#t8">8. Attendance pending + approve</a></li>
      <li class="${c.delegateReg ? "" : "blocked-link"}"><a href="#t9">9. Regularization pending</a></li>
      <li class="${c.inbox && c.master ? "" : "blocked-link"}"><a href="#t10">10. Universal inbox query</a></li>
      <li class="${c.master ? "" : "blocked-link"}"><a href="#t11">11. Revoke delegation</a></li>
      <li><a href="#t12">12. Master OFF fallback</a></li>
      <li><a href="#tLife">Authority lifecycle</a></li></ol></nav>`;

    // 0 Table map
    html += stepOpen({ id: "t0", num: "0", title: "Table map — delegation + domain pending sources", badges: [{ t: "query", l: "READ/WRITE" }], blocked: false, flashIds: ["approvalDelegationEnabled"] });
    html += `<p class="step__desc">Delegation is stored in <code>ts_approval_delegation_model</code>. Authority resolution reads employee manager + active delegation rows. Pending items come from domain tables; delegation filters who can act — it does not store pending rows.</p>
      <div class="table-map">
        <span class="pill pill--stage">ts_approval_delegation_model</span>
        <span class="pill pill--core">fs_employee_model</span>
        <span class="pill pill--domain">ts_timesheet_week_model</span>
        <span class="pill pill--domain">fs_user_attendance_model</span>
        <span class="pill pill--domain">fs_employee_leave_transaction</span>
        <span class="pill pill--domain">ts_attendance_regularization_model</span>
      </div>`;
    html += mermaidBlock("m-er", `
flowchart TB
  EMP["fs_employee_model<br/>Rahul 200 manager_id=300"]
  DEL["ts_approval_delegation_model<br/>delegator=300 delegate=501"]
  AUTH["ApprovalAuthorityService.resolve"]
  EMP --> AUTH
  DEL --> AUTH
  AUTH --> EFF["effectiveApproverIds<br/>300, 501"]
  TS["ts_timesheet_week PENDING"] --> INBOX["listPending + canAct"]
  EFF --> INBOX
    `);
    html += stepClose();

    // Example
    html += stepOpen({ id: "tEx", num: "★", title: "Example cast & sample delegation row", badges: [], blocked: false });
    html += `<div class="scenario-box"><h4>Story — week of 2026-07-14</h4>
      <p>Meera (300) delegates Anil (501) for ${esc(typesJson(c))}. Rahul (200) submits timesheet + attendance pending. Anil sees inbox with <span class="badge-acting">Acting for Meera Shah</span>.</p></div>
      <table class="data"><thead><tr><th>Role</th><th>Name</th><th>id</th></tr></thead><tbody>
      <tr><td>Employee</td><td>Rahul Kapoor</td><td>200</td></tr>
      <tr><td>Manager / delegator</td><td>Meera Shah</td><td>300</td></tr>
      <tr><td>Delegate</td><td>Anil Rao</td><td>501</td></tr></tbody></table>
      <p class="delta"><strong>ts_approval_delegation_model (row 42)</strong></p>
      <table class="data"><thead><tr><th>id</th><th>delegator_id</th><th>delegate_id</th><th>approval_types</th><th>start/end</th><th>active</th></tr></thead>
      <tbody><tr class="changed"><td>42</td><td>300</td><td>501</td><td class="hl">${esc(typesJson(c))}</td><td>2026-07-01 … 2026-07-31</td><td class="hl">${c.master ? "true" : "ignored"}</td></tr></tbody></table>`;
    html += stepClose();

    // 1 Org master
    {
      const blocked = false;
      html += stepOpen({ id: "t1", num: "1", title: "Org master flag check", badges: [{ t: "query", l: "CONFIG" }], blocked, reason: "", flashIds: ["approvalDelegationEnabled"] });
      html += `<p class="step__desc">Every delegation API and <code>ApprovalAuthorityService</code> call reads org config first via <code>isApprovalDelegationEnabled(userTeamId)</code>. Fail closed when OFF.</p>
        <ul class="steps-list"><li>ApprovalDelegationService.create / listActing → 403 if OFF</li>
        <li>resolve() → returns manager-only effectiveApproverIds</li>
        <li>canAct(delegate) → false even if DB row exists</li></ul>`;
      html += flowCards([
        { table: "Application Config", action: c.master ? "approvalDelegationEnabled=true" : "false", kind: "read" },
        { table: "ts_approval_delegation", action: c.master ? "rows honored" : "ignored for authority", kind: c.master ? "read" : "none" }
      ]);
      html += mermaidBlock("m-master", `
flowchart LR
  API["Any delegation call"] --> CFG["isApprovalDelegationEnabled"]
  CFG -->|${c.master ? "true" : "false"}| NEXT["${c.master ? "Continue to DB queries" : "Manager-only path"}"]
      `, !c.master);
      html += stepClose();
    }

    // 2 Create
    {
      const blocked = !c.canCreate;
      html += stepOpen({ id: "t2", num: "2", title: "Manager creates delegation row", badges: [{ t: "approved", l: "INSERT" }], blocked,
        reason: "Need master ON + enableTimeSheetApproval on manager role.", flashIds: ["enableTimeSheetApproval", "approvalDelegationEnabled"] });
      html += `<p class="step__desc">Meera creates delegation from Profile → Delegation (or admin register). Validates delegate has timesheet approval role if TIMESHEET in scope.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/approval-delegations?delegatorId=300</div>`;
      html += flowCards([
        { table: "ts_approval_delegation_model", action: "INSERT active=true", kind: blocked ? "none" : "write" },
        { table: "Audit", action: "CREATED event", kind: blocked ? "none" : "write" }
      ]);
      html += mermaidBlock("m-create", `
flowchart LR
  UI["Profile delegation form"] --> POST["POST create"]
  POST --> ROW["ts_approval_delegation id=42"]
  ROW --> AUD["audit CREATED"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>Column</th><th>Sample value</th></tr></thead><tbody>
        <tr><td>delegator_id</td><td class="hl">300</td></tr>
        <tr><td>delegate_id</td><td class="hl">501</td></tr>
        <tr><td>approval_types</td><td class="hl">${esc(typesJson(c))}</td></tr>
        <tr><td>active</td><td>true</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 3 resolve
    html += stepOpen({ id: "t3", num: "3", title: "resolve() — how authority data is queried", badges: [{ t: "query", l: "SQL CHAIN" }], blocked: false, flashIds: ["scopeTimesheet", "approvalDelegationEnabled"] });
    html += `<p class="step__desc">Called on every approve and pending filter. For employee Rahul (200) and requestType TIMESHEET:</p>
      <ol class="steps-list">
        <li><code>employeeRepositoryService.findById(200)</code> → <code>manager_id = 300</code></li>
        <li>If delegation enabled → <code>findActiveByDelegatorId(300, asOf)</code></li>
        <li>Filter rows where <code>approval_types</code> JSON contains <code>TIMESHEET</code></li>
        <li>Build <code>effectiveApproverIds = [300, 501, …]</code> (manager always first)</li>
        <li><code>canAct(approverId, 200, TIMESHEET)</code> → <code>effectiveApproverIds.contains(approverId)</code></li>
      </ol>`;
    html += `<p class="delta"><strong>Query 1 — employee manager</strong></p>${sqlBlock("SELECT id, manager_id, user_team_id FROM fs_employee_model WHERE id = 200;\n-- manager_id = 300")}`;
    html += `<p class="delta"><strong>Query 2 — active delegations for manager (ReactiveQueries.findActiveByDelegatorId)</strong></p>${sqlBlock(`SELECT * FROM ts_approval_delegation_model
WHERE delegator_id = 300
  AND active = 1
  AND start_date <= '2026-07-16'
  AND end_date >= '2026-07-16'
  AND deleted = 0;`)}`;
    html += mermaidBlock("m-resolve", `
flowchart TB
  R["resolve(200, TIMESHEET)"] --> E["findById employee 200"]
  E --> M["manager_id = 300"]
  M --> Q["findActiveByDelegatorId(300)"]
  Q --> F["filter approval_types ∋ TIMESHEET"]
  F --> B["effectiveApproverIds = 300, 501"]
  B --> C["canAct(501,200,TS) → ${c.master && c.delegateTs ? "true" : "false"}"]
    `, !c.master);
    html += `<table class="data"><thead><tr><th>Field</th><th>Value (delegation ${c.master ? "ON" : "OFF"})</th></tr></thead><tbody>
      <tr><td>managerId</td><td>300</td></tr>
      <tr><td>delegateIds</td><td class="hl">${c.master && c.scopeTs ? "[501]" : "[]"}</td></tr>
      <tr><td>effectiveApproverIds</td><td class="hl">${esc(JSON.stringify(c.effectiveIds))}</td></tr>
      <tr><td>delegationEnabled</td><td class="hl">${c.master}</td></tr></tbody></table>`;
    html += stepClose();

    // 4 acting
    {
      const blocked = !c.master;
      html += stepOpen({ id: "t4", num: "4", title: "Delegate lists acting assignments", badges: [{ t: "query", l: "GET /acting" }], blocked,
        reason: "approvalDelegationEnabled OFF → 403.", flashIds: ["approvalDelegationEnabled"] });
      html += `<p class="step__desc">Anil opens “Acting for” panel. Backend queries delegations where he is delegate_id and date range is active.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/approval-delegations/acting?delegateId=501</div>`;
      html += `<p class="delta"><strong>Query — findActiveByDelegateId</strong></p>${sqlBlock(`SELECT * FROM ts_approval_delegation_model
WHERE delegate_id = 501
  AND active = 1
  AND start_date <= NOW()
  AND end_date >= NOW()
  AND deleted = 0;`)}`;
      html += mermaidBlock("m-acting", `
flowchart LR
  ANIL["Anil 501"] --> GET["GET /acting"]
  GET --> SQL["findActiveByDelegateId"]
  SQL --> LIST["Row 42: acting for Meera 300"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>delegator</th><th>scopes</th><th>dates</th></tr></thead>
        <tbody><tr class="changed"><td>Meera (300)</td><td class="hl">${esc(typesJson(c))}</td><td>Jul 2026</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 5 Timesheet pending
    {
      const blocked = !c.delegateTs;
      html += stepOpen({ id: "t5", num: "5", title: "Pending timesheet — domain query + canAct filter", badges: [{ t: "query", l: "PENDING" }], blocked,
        reason: "Need master + TIMESHEET scope + timesheet workflow + role.", flashIds: ["scopeTimesheet", "timesheetApprovalEnabled"] });
      html += `<p class="step__desc">Manager/delegate inbox does NOT query delegation table directly. It loads pending weeks, then filters per employee with canAct.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/timesheets/pending?managerId=501&amp;userTeamIds=7</div>`;
      html += `<p class="delta"><strong>Query 1 — pending weeks (TimesheetWeekQueries.findPendingByUserTeamIds)</strong></p>${sqlBlock(`SELECT * FROM ts_timesheet_week_model
WHERE user_team_id IN (7)
  AND status = 'PENDING_APPROVAL'
  AND deleted = 0;`)}`;
      html += `<p class="delta"><strong>Query 2 — per row filter (application layer)</strong></p>
        <ul class="steps-list"><li>For week 7001 employee_id=200: <code>canAct(501, 200, TIMESHEET)</code></li>
        <li>Internally calls resolve(200, TIMESHEET) → checks 501 ∈ effectiveApproverIds</li>
        <li>Maps response with <code>actingAsDelegate=true</code>, <code>authorityManagerId=300</code></li></ul>`;
      html += mermaidBlock("m-tspend", `
flowchart TB
  Q1["findPendingWeeksByUserTeamIds"] --> ROW["week 7001 PENDING emp=200"]
  ROW --> CA["canAct(501, 200, TIMESHEET)"]
  CA --> RES["resolve → ids 300,501"]
  RES --> OK["Include in Anil inbox<br/>actingAsDelegate=true"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>week id</th><th>employee</th><th>status</th><th>in Anil inbox?</th><th>actingAsDelegate</th></tr></thead>
        <tbody><tr class="changed"><td>7001</td><td>200</td><td>PENDING_APPROVAL</td><td class="hl">${blocked ? "no" : "yes"}</td><td class="hl">${blocked ? "—" : "true"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 6 Approve timesheet
    {
      const blocked = !c.delegateTs;
      html += stepOpen({ id: "t6", num: "6", title: "Delegate approves timesheet", badges: [{ t: "approved", l: "DELEGATE" }], blocked,
        reason: "canAct fails if scope/master off or expired.", flashIds: ["scopeTimesheet"] });
      html += `<p class="step__desc">Anil approves week 7001. validateApprovalAction → canAct → resolve → applyTimesheetApprovalAudit sets DELEGATE audit fields.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> /api/v2/timesheets/workflow (operation=APPROVE, approverId=501)</div>`;
      html += mermaidBlock("m-tsap", `
flowchart LR
  ANIL["approverId=501"] --> CAN["canAct(501,200,TS)"]
  CAN -->|ok| APR["week → APPROVED"]
  APR --> AUD["approved_by=501<br/>approval_authority_type=DELEGATE<br/>approved_on_behalf_of=300"]
      `, blocked);
      html += `<span class="badge-acting">Acting for Meera Shah</span>
        <table class="data"><thead><tr><th>Column</th><th>After approve</th></tr></thead><tbody>
        <tr><td>status</td><td class="hl">APPROVED</td></tr>
        <tr><td>approved_by</td><td class="hl">${blocked ? "—" : "501"}</td></tr>
        <tr><td>approval_authority_type</td><td class="hl">${blocked ? "—" : "DELEGATE"}</td></tr>
        <tr><td>approved_on_behalf_of</td><td class="hl">${blocked ? "—" : "300"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 7 Leave
    {
      const blocked = !c.delegateLeave;
      html += stepOpen({ id: "t7", num: "7", title: "Leave pending query + delegate approve", badges: [{ t: "query", l: "LEAVE" }], blocked,
        reason: "Need LEAVE scope + leaveManagementEnabled + approveTeam.", flashIds: ["scopeLeave", "leaveManagementEnabled"] });
      html += `<p class="step__desc">Leave pending uses <code>workflow_status = SUBMITTED</code> in <code>fs_emp_leave_master_model</code> (not PENDING_APPROVAL). Full leave flow: <a href="./leave-flags-data-flow.html">leave-flags-data-flow.html</a>.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/leaves/pending?managerId=501&amp;userTeamId=7</div>`;
      html += sqlBlock(`SELECT * FROM fs_emp_leave_master_model
WHERE user_team_id IN (7)
  AND workflow_status = 'SUBMITTED';`);
      html += `<ul class="steps-list">
        <li>Query returns leave 880 (Rahul, Jul 21–23 ANNUAL)</li>
        <li>Filter: <code>canAct(501, 200, LEAVE)</code> → resolve → 501 ∈ effectiveApproverIds</li>
        <li>Pending API maps <code>actingAsDelegate=true</code>, <code>authorityManagerId=300</code> for delegate viewer (same as timesheet/attendance pending)</li>
        <li>Approve: <code>PATCH /leaves/880/approve?approverId=501</code></li>
        <li>Side effects: <code>debitOnApprove</code>, <code>LeavePromotionService</code>, optional attendance sync</li></ul>`;
      html += mermaidBlock("m-leave-del", `
flowchart TB
  SQL["findPending SUBMITTED"] --> ROW["leave 880"]
  ROW --> CA["canAct(501,200,LEAVE)"]
  CA --> MAP["mapApi + resolve → actingAsDelegate"]
  MAP --> APR["APPROVED + DELEGATE audit"]
  APR --> BAL["balance debit"]
  APR --> PROM["TaskActivity LEAVE"]
      `, blocked);
      html += `<span class="badge-acting">Acting for Meera Shah</span>
        <table class="data"><thead><tr><th>leave id</th><th>workflow_status</th><th>actingAsDelegate</th><th>authorityManagerId</th><th>approval_authority_type</th><th>acted_on_behalf_of</th></tr></thead>
        <tbody><tr class="changed"><td>880</td><td>${blocked ? "SUBMITTED" : "APPROVED"}</td><td class="hl">${blocked ? "—" : "true (pending)"}</td><td class="hl">${blocked ? "—" : "300"}</td><td class="hl">${blocked ? "—" : "DELEGATE"}</td><td class="hl">${blocked ? "—" : "300"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 8 Attendance
    {
      const blocked = !c.delegateAtt;
      html += stepOpen({ id: "t8", num: "8", title: "Attendance pending query + delegate approve", badges: [{ t: "query", l: "ATTENDANCE" }], blocked,
        reason: "Need ATTENDANCE scope + approveTeamEnabled.", flashIds: ["scopeAttendance", "approveTeamEnabled"] });
      html += sqlBlock(`SELECT a.* FROM fs_user_attendance_model a
JOIN fs_employee_model e ON e.id = a.employee_id
WHERE a.status IN ('PENDING_APPROVAL','PENDING_REMOVAL')
  AND e.user_team_id = 7;`);
      html += `<p class="step__desc"><code>canAct(501, 200, ATTENDANCE)</code> on mark/removal pending. Response includes actingAsDelegate flag for UI badge.</p>`;
      html += `<table class="data"><thead><tr><th>attendance id</th><th>status</th><th>approved_by</th><th>approved_on_behalf_of</th></tr></thead>
        <tbody><tr class="changed"><td>900</td><td>PENDING_APPROVAL</td><td class="hl">${blocked ? "—" : "501"}</td><td class="hl">${blocked ? "—" : "300"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 9 Reg
    {
      const blocked = !c.delegateReg;
      html += stepOpen({ id: "t9", num: "9", title: "Regularization pending (ATTENDANCE authority)", badges: [{ t: "query", l: "REG" }], blocked,
        reason: "Uses ATTENDANCE canAct + attendanceRegularizationEnabled.", flashIds: ["attendanceRegularizationEnabled", "scopeAttendance"] });
      html += sqlBlock(`SELECT * FROM ts_attendance_regularization_model
WHERE status = 'SUBMITTED' AND user_team_id = 7;`);
      html += `<p class="step__desc">Regularization approve calls <code>canAct(501, 200, ATTENDANCE)</code> then ApprovalBridge writes fs_user_attendance_model.</p>`;
      html += `<table class="data"><thead><tr><th>reg id</th><th>status after</th><th>approved_by</th></tr></thead>
        <tbody><tr class="changed"><td>501</td><td class="hl">APPROVED</td><td class="hl">${blocked ? "—" : "501 (DELEGATE)"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 10 Inbox
    {
      const blocked = !c.inbox || !c.master;
      html += stepOpen({ id: "t10", num: "10", title: "Universal Approvals inbox — aggregated queries", badges: [{ t: "query", l: "INBOX" }], blocked,
        reason: "universalApprovalInboxEnabled OFF or delegation master OFF.", flashIds: ["universalApprovalInboxEnabled"] });
      html += `<p class="step__desc">Workspace Approvals runs parallel domain pending queries, merges by domain (TIMESHEET, LEAVE, ATTENDANCE, ATTENDANCE_REGULARIZATION). Each item still filtered by canAct for the viewer. Approve/reject from inbox uses domain adapters for all four HR domains.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/approvals/inbox/{domain}/{sourceId}/{action}?actorId=501</div>`;
      html += mermaidBlock("m-inbox", `
flowchart TB
  INBOX["Universal Approvals UI"] --> TS["listPending timesheets"]
  INBOX --> LV["listPending leave"]
  INBOX --> AT["listPending attendance"]
  INBOX --> RG["listPending regularizations"]
  TS & LV & AT & RG --> MERGE["Merge + sort by submitted date"]
  MERGE --> CAN["canAct per item per domain"]
  CAN --> ACT["POST inbox act → domain adapter"]
  ACT --> SRC["Updates fs_* / ts_* source row"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>domain</th><th>sourceId example</th><th>inbox act?</th><th>actingAsDelegate on row</th></tr></thead><tbody>
        <tr><td>TIMESHEET</td><td>week id</td><td class="hl">${blocked ? "—" : "yes"}</td><td class="hl">${blocked ? "—" : "yes"}</td></tr>
        <tr><td>LEAVE</td><td>880</td><td class="hl">${blocked ? "—" : "yes"}</td><td class="hl">${blocked ? "—" : "yes"}</td></tr>
        <tr><td>ATTENDANCE</td><td>900</td><td class="hl">${blocked ? "—" : "yes"}</td><td class="hl">${blocked ? "—" : "yes"}</td></tr>
        <tr><td>ATTENDANCE_REGULARIZATION</td><td>reg-501</td><td class="hl">${blocked ? "—" : "yes"}</td><td class="hl">${blocked ? "—" : "via metadata"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 11 Revoke
    {
      const blocked = !c.master;
      html += stepOpen({ id: "t11", num: "11", title: "Revoke delegation", badges: [{ t: "off", l: "REVOKE" }], blocked,
        reason: "Master OFF — revoke API 403.", flashIds: ["approvalDelegationEnabled"] });
      html += `<div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> /api/v2/approval-delegations/42/revoke?delegatorId=300</div>
        <p class="step__desc">Sets active=false, end_date=now. Next resolve() excludes delegate — canAct(501,…) → false immediately.</p>`;
      html += `<table class="data"><thead><tr><th>id</th><th>active before</th><th>active after</th><th>canAct(501)</th></tr></thead>
        <tbody><tr class="changed"><td>42</td><td>true</td><td class="hl">false</td><td class="hl">false</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 12 Master off
    html += stepOpen({ id: "t12", num: "12", title: "Master OFF — manager-only fallback", badges: [{ t: "off", l: "FALLBACK" }], blocked: c.master,
      reason: "Turn ON approvalDelegationEnabled to see active delegation path.", flashIds: ["approvalDelegationEnabled"] });
    html += `<p class="step__desc">When org master is OFF, resolve() skips delegation queries entirely. effectiveApproverIds = [300]. Row 42 in DB is ignored for authority (still visible in admin audit).</p>`;
    html += mermaidBlock("m-off", `
flowchart LR
  CFG["master OFF"] --> RES["resolve(200, TS)"]
  RES --> ONLY["effectiveApproverIds = 300"]
  ONLY --> NO["canAct(501) = false"]
      `, c.master);
    html += stepClose();

    // Lifecycle
    html += stepOpen({ id: "tLife", num: "∞", title: "Authority & query lifecycle", badges: [], blocked: false });
    html += mermaidBlock("m-life", `
stateDiagram-v2
  [*] --> ConfigCheck: any approve/pending
  ConfigCheck --> ManagerOnly: master OFF
  ConfigCheck --> ResolveChain: master ON
  ResolveChain --> PendingQuery: list inbox
  PendingQuery --> CanActFilter: per employee
  CanActFilter --> Approve: approver in effectiveIds
  Approve --> AuditDelegate: DELEGATE + onBehalfOf
  ResolveChain --> Revoked: active=false
  Revoked --> ManagerOnly
    `);
    html += `<ul class="steps-list">
      <li>TIMESHEET delegate: <strong style="color:${c.delegateTs ? "var(--ok)" : "var(--danger)"}">${c.delegateTs ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>LEAVE delegate: <strong style="color:${c.delegateLeave ? "var(--ok)" : "var(--danger)"}">${c.delegateLeave ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>ATTENDANCE delegate: <strong style="color:${c.delegateAtt ? "var(--ok)" : "var(--danger)"}">${c.delegateAtt ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>Universal inbox: <strong>${c.inbox && c.master ? "ON" : "OFF"}</strong></li></ul>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + b.mode;
    pill.textContent = b.mode === "on" ? "Delegation: ACTIVE" : "Delegation: OFF";
    document.getElementById("bhSummary").textContent = b.summary;

    const renderFlow = (elId, steps) => {
      document.getElementById(elId).innerHTML = steps.map((s, i) => {
        const st = s.state === "query" ? "query" : s.state;
        const arrow = i < steps.length - 1 ? `<span class="flow-arrow">→</span>` : "";
        return `<span class="bh-flow-step is-${st === "query" ? "query" : st}">${esc(s.label)}</span>${arrow}`;
      }).join("");
    };
    renderFlow("bhFlowJourney", b.journey);
    renderFlow("bhFlowQuery", b.querySteps);

    document.getElementById("bhDomains").innerHTML = b.domains.map((d) =>
      `<div class="domain-card ${d.active ? "is-active" : "is-blocked"}">
        <div class="domain-card__name">${esc(d.name)}</div>
        <div class="domain-card__status">${d.active ? "Delegate can act" : "Blocked"}</div>
        <div class="domain-card__detail">${esc(d.detail)}</div></div>`
    ).join("");

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
    lastChanged = name === "off" ? "approvalDelegationEnabled" : name === "timesheetOnly" ? "scopeTimesheet" : name === "noInbox" ? "universalApprovalInboxEnabled" : null;
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
