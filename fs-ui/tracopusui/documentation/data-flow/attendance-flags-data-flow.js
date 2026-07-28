/* Attendance flags + data flow — interactive logic */
(function () {
  const FLAG_DEFS = [
    { id: "attendanceEnabled", scope: "role", group: "Menu / module", name: "Attendance menu", key: "attendanceEnabled",
      description: "Shows /people/attendance matrix.", whenOn: "Matrix visible.", whenOff: "All attendance off." },
    { id: "markOwnAttendanceEnabled", scope: "role", group: "Role · mark", name: "Mark own", key: "markOwnAttendanceEnabled",
      description: "Employee marks own cells.", whenOn: "Own mark allowed.", whenOff: "Own mark blocked." },
    { id: "markOthersAttendanceEnabled", scope: "role", group: "Role · mark", name: "Mark others", key: "markOthersAttendanceEnabled",
      description: "Manager marks team cells.", whenOn: "Others mark allowed.", whenOff: "Blocked." },
    { id: "autoApproveOwnAttendanceEnabled", scope: "role", group: "Role · auto-approve", name: "Auto-approve own", key: "autoApproveOwnAttendanceEnabled",
      description: "Skip PENDING on own mark.", whenOn: "→ APPROVED immediately.", whenOff: "→ PENDING_APPROVAL." },
    { id: "autoApproveOthersAttendanceEnabled", scope: "role", group: "Role · auto-approve", name: "Auto-approve others", key: "autoApproveOthersAttendanceEnabled",
      description: "Skip pending when marking for others.", whenOn: "→ APPROVED.", whenOff: "→ pending queue." },
    { id: "approveTeamEnabled", scope: "role", group: "Role · approve", name: "Approve team", key: "approveTeamEnabled",
      description: "Approve/reject marks + regularization.", whenOn: "Manager approve UI.", whenOff: "Cannot approve." },
    { id: "removeOwnAttendanceEnabled", scope: "role", group: "Role · removal", name: "Request removal", key: "removeOwnAttendanceEnabled",
      description: "Request delete of approved mark.", whenOn: "→ PENDING_REMOVAL.", whenOff: "Blocked." },
    { id: "attendanceRegularizationEnabled", scope: "org", group: "Org · attendanceAdditional", name: "Regularization", key: "attendanceRegularizationEnabled",
      description: "Missed-punch correction workflow.", whenOn: "Reg UI + APIs.", whenOff: "403 fail closed." },
    { id: "approvalDelegationEnabled", scope: "org", group: "Org · delegation", name: "Delegation", key: "approvalDelegationEnabled",
      description: "Delegates can approve ATTENDANCE.", whenOn: "Delegate + manager canAct.", whenOff: "Manager only." },
    { id: "approvalReminderEnabled", scope: "org", group: "Org · delegation", name: "Reminders", key: "approvalReminderEnabled",
      description: "SLA emails for pending.", whenOn: "Scheduler on.", whenOff: "No auto reminders." },
    { id: "leaveAutoSyncToAttendance", scope: "org", group: "Org · leave", name: "Leave sync", key: "leaveAutoSyncToAttendance",
      description: "Approved leave → LEAVE/HALF_DAY rows.", whenOn: "Blocks manual mark on leave days.", whenOff: "No auto rows." },
    { id: "universalApprovalInboxEnabled", scope: "org", group: "Org · workspace", name: "Universal inbox", key: "universalApprovalInboxEnabled",
      description: "Workspace Approvals ATTENDANCE domain.", whenOn: "Inbox shows items.", whenOff: "Domain UI only." }
  ];

  const PRESETS = {
    production: { attendanceEnabled: true, markOwnAttendanceEnabled: true, markOthersAttendanceEnabled: true, autoApproveOwnAttendanceEnabled: false, autoApproveOthersAttendanceEnabled: false, approveTeamEnabled: true, removeOwnAttendanceEnabled: true, attendanceRegularizationEnabled: true, approvalDelegationEnabled: true, approvalReminderEnabled: true, leaveAutoSyncToAttendance: true, universalApprovalInboxEnabled: true },
    autoOwn: { attendanceEnabled: true, markOwnAttendanceEnabled: true, markOthersAttendanceEnabled: true, autoApproveOwnAttendanceEnabled: true, autoApproveOthersAttendanceEnabled: false, approveTeamEnabled: true, removeOwnAttendanceEnabled: true, attendanceRegularizationEnabled: true, approvalDelegationEnabled: false, approvalReminderEnabled: false, leaveAutoSyncToAttendance: true, universalApprovalInboxEnabled: false },
    regOff: { attendanceEnabled: true, markOwnAttendanceEnabled: true, markOthersAttendanceEnabled: true, autoApproveOwnAttendanceEnabled: false, autoApproveOthersAttendanceEnabled: false, approveTeamEnabled: true, removeOwnAttendanceEnabled: true, attendanceRegularizationEnabled: false, approvalDelegationEnabled: true, approvalReminderEnabled: true, leaveAutoSyncToAttendance: true, universalApprovalInboxEnabled: true },
    menuOff: { attendanceEnabled: false, markOwnAttendanceEnabled: true, markOthersAttendanceEnabled: true, autoApproveOwnAttendanceEnabled: false, autoApproveOthersAttendanceEnabled: false, approveTeamEnabled: true, removeOwnAttendanceEnabled: true, attendanceRegularizationEnabled: true, approvalDelegationEnabled: true, approvalReminderEnabled: true, leaveAutoSyncToAttendance: true, universalApprovalInboxEnabled: true }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "autoApproveOwnAttendanceEnabled";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function ctxFrom(f) {
    const menu = !!f.attendanceEnabled;
    const reg = !!f.attendanceRegularizationEnabled;
    const delegation = !!f.approvalDelegationEnabled;
    const reminders = !!f.approvalReminderEnabled;
    const leaveSync = !!f.leaveAutoSyncToAttendance;
    const inbox = !!f.universalApprovalInboxEnabled;
    const markOwn = !!f.markOwnAttendanceEnabled;
    const markOthers = !!f.markOthersAttendanceEnabled;
    const autoOwn = !!f.autoApproveOwnAttendanceEnabled;
    const autoOthers = !!f.autoApproveOthersAttendanceEnabled;
    const approveTeam = !!f.approveTeamEnabled;
    const removeOwn = !!f.removeOwnAttendanceEnabled;

    const canMarkOwn = menu && markOwn;
    const canMarkOthers = menu && markOthers;
    const canApprove = menu && approveTeam;
    const canReg = menu && reg && markOwn;
    const canRegApprove = menu && reg && approveTeam;
    const canRemove = menu && removeOwn;
    const pendingPath = canMarkOwn && !autoOwn;
    const delegateActs = menu && delegation && approveTeam;

    let mode = "off";
    if (menu) mode = autoOwn ? "auto" : "pending";

    return {
      menu, reg, delegation, reminders, leaveSync, inbox, markOwn, markOthers, autoOwn, autoOthers,
      approveTeam, removeOwn, canMarkOwn, canMarkOthers, canApprove, canReg, canRegApprove, canRemove,
      pendingPath, delegateActs, mode
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "Attendance page": c.menu,
        "Mark own → PENDING": c.canMarkOwn && !c.autoOwn,
        "Mark own → auto APPROVED": c.canMarkOwn && c.autoOwn,
        "Manager approve mark": c.canApprove,
        "Submit regularization": c.canReg,
        "Approve regularization (bridge)": c.canRegApprove,
        "Request removal": c.canRemove,
        "Delegate approves": c.delegateActs
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
    let summary;
    if (!c.menu) summary = "Attendance module off.";
    else if (c.autoOwn) summary = "Own mark auto-approves to APPROVED in fs_user_attendance_model — no manager pending queue for self.";
    else summary = "Mark → PENDING_APPROVAL → manager/delegate Approve/Reject. Regularization: ts_attendance_regularization_model → bridge on approve.";

    const markSteps = [
      { label: "Mark", state: c.canMarkOwn ? "on" : "off" },
      { label: c.autoOwn ? "Auto APPROVED" : "PENDING", state: c.canMarkOwn ? (c.autoOwn ? "auto" : "on") : "off" },
      { label: "Approve/Reject", state: c.canApprove && c.pendingPath ? "on" : c.autoOwn ? "off" : c.canApprove ? "on" : "off" },
      { label: "Removal", state: c.canRemove ? "on" : "off" }
    ];
    const regSteps = [
      { label: "Submit reg", state: c.canReg ? "on" : "off" },
      { label: "SUBMITTED", state: c.canReg ? "on" : "off" },
      { label: "Approve reg", state: c.canRegApprove ? "on" : "off" },
      { label: "Bridge", state: c.canRegApprove ? "on" : "off" }
    ];
    const cards = [
      { title: "Mark own", html: c.canMarkOwn ? (c.autoOwn ? `<span class="on">Auto APPROVED</span>` : `<span class="on">PENDING</span>`) : `<span class="off">Blocked</span>` },
      { title: "Approve marks", html: c.canApprove ? `<span class="on">Enabled</span>` : `<span class="off">Off</span>` },
      { title: "Regularization", html: c.canReg ? `<span class="on">Submit OK</span>` : c.reg ? `<span class="off">Role blocked</span>` : `<span class="off">Org off</span>` },
      { title: "Removal", html: c.canRemove ? `<span class="on">PENDING_REMOVAL</span>` : `<span class="off">Off</span>` },
      { title: "Delegation / inbox", html: `${c.delegateActs ? `<span class="on">Delegate</span>` : `<span class="off">Delegate</span>`} · ${c.inbox ? `<span class="on">Inbox</span>` : `<span class="off">Inbox</span>`}` }
    ];
    const matrix = [
      { cap: "See Attendance page", ok: c.menu, why: "attendanceEnabled" },
      { cap: "Mark own → PENDING", ok: c.canMarkOwn && !c.autoOwn, why: "auto-own off" },
      { cap: "Mark own → auto APPROVED", ok: c.canMarkOwn && c.autoOwn, why: "autoApproveOwn on" },
      { cap: "Manager approve mark", ok: c.canApprove, why: "approveTeamEnabled" },
      { cap: "Submit regularization", ok: c.canReg, why: c.reg ? "org + menu" : "reg off" },
      { cap: "Approve reg + bridge", ok: c.canRegApprove, why: "approveTeam + reg" },
      { cap: "Request removal", ok: c.canRemove, why: "removeOwn on" },
      { cap: "Delegate approves", ok: c.delegateActs, why: "delegation + approve" }
    ];
    return { summary, markSteps, regSteps, cards, matrix, mode: c.mode };
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
      <p class="change-banner__head"><strong>${esc(def ? def.name : lastChanged)}</strong> → <code>${state[lastChanged] ? "ON" : "OFF"}</code></p>
      <div class="impact-grid"><div class="impact-col impact-col--gained"><h5>Now available</h5><ul>${list(gained, "None")}</ul></div>
      <div class="impact-col impact-col--lost"><h5>Now blocked</h5><ul>${list(lost, "None")}</ul></div></div></div>`;
  }

  function pipelineHtml(c) {
    const nodes = [];
    if (!c.menu) {
      nodes.push({ n: "Menu", s: "Blocked", st: "blocked" }, { n: "All flows", s: "Off", st: "blocked" });
    } else {
      nodes.push({ n: "1 Mark", s: c.canMarkOwn ? "Active" : "Blocked", st: c.canMarkOwn ? "active" : "blocked" });
      nodes.push({ n: c.autoOwn ? "Auto OK" : "2 Pending", s: c.autoOwn ? "Skip queue" : c.pendingPath ? "Active" : "Skip", st: c.autoOwn ? "auto" : c.pendingPath ? "active" : "skip" });
      nodes.push({ n: "3 Approve", s: c.canApprove && c.pendingPath ? "Active" : c.autoOwn ? "N/A" : c.canApprove ? "Active" : "Blocked", st: c.canApprove && (c.pendingPath || !c.autoOwn) ? "active" : "blocked" });
      nodes.push({ n: "4 Reject", s: c.canApprove && c.pendingPath ? "Active" : "Blocked", st: c.canApprove && c.pendingPath ? "active" : "blocked" });
      nodes.push({ n: "5 Removal", s: c.canRemove ? "Active" : "Blocked", st: c.canRemove ? "active" : "blocked" });
      nodes.push({ n: "6 Reg submit", s: c.canReg ? "Active" : "Blocked", st: c.canReg ? "active" : "blocked" });
      nodes.push({ n: "7 Reg approve", s: c.canRegApprove ? "Bridge" : "Blocked", st: c.canRegApprove ? "active" : "blocked" });
      if (c.leaveSync) nodes.push({ n: "Leave sync", s: "LEAVE rows", st: "active" });
    }
    let track = "";
    nodes.forEach((n, i) => {
      if (i) track += `<span class="pipe-arrow ${n.st === "blocked" ? "is-blocked" : ""}">→</span>`;
      track += `<div class="pipe-node is-${n.st}">${esc(n.n)}<span class="pipe-node__sub">${esc(n.s)}</span></div>`;
    });
    return `<div class="pipeline"><div class="pipeline__label">End-to-end approval flow (current flags)</div><div class="pipeline__track">${track}</div></div>`;
  }

  function renderDoc() {
    const c = ctx();
    const seq = ++renderSeq;
    let html = changeBannerHtml();
    const modeLabel = c.mode === "auto" ? "Mode: Auto-approve own marks" : c.mode === "pending" ? "Mode: Manager review (PENDING)" : "Mode: Attendance off";
    html += `<div class="mode-pill mode-pill--${c.mode === "auto" ? "auto" : c.mode === "pending" ? "pending" : "off"}">${modeLabel}</div>`;
    html += pipelineHtml(c);

    html += `<nav class="toc"><h3>Steps</h3><ol>
      <li><a href="#t0">Table map</a></li><li><a href="#tEx">Example cast</a></li>`;
    if (!c.menu) html += `<li class="blocked-link">All flows blocked</li>`;
    else {
      html += `<li class="${c.canMarkOwn ? "" : "blocked-link"}"><a href="#t1">1. Mark attendance</a></li>`;
      html += `<li class="${c.pendingPath ? "" : "blocked-link"}"><a href="#t2">2. Pending queue</a></li>`;
      html += `<li class="${c.canApprove && c.pendingPath ? "" : "blocked-link"}"><a href="#t3">3. Approve mark</a></li>`;
      html += `<li class="${c.canApprove && c.pendingPath ? "" : "blocked-link"}"><a href="#t4">4. Reject mark → fix</a></li>`;
      html += `<li class="${c.canRemove ? "" : "blocked-link"}"><a href="#t5">5. Request removal</a></li>`;
      html += `<li class="${c.canApprove ? "" : "blocked-link"}"><a href="#t6">6. Approve removal</a></li>`;
      html += `<li class="${c.canReg ? "" : "blocked-link"}"><a href="#t7">7. Submit regularization</a></li>`;
      html += `<li class="${c.canRegApprove ? "" : "blocked-link"}"><a href="#t8">8. Approve reg (bridge)</a></li>`;
      html += `<li class="${c.canRegApprove ? "" : "blocked-link"}"><a href="#t9">9. Reject regularization</a></li>`;
      if (c.leaveSync) html += `<li><a href="#tLeave">Leave → attendance sync</a></li>`;
      html += `<li><a href="#tLife">Status lifecycle</a></li>`;
    }
    html += `</ol></nav>`;

    if (!c.menu) {
      html += stepOpen({ id: "t0", num: "!", title: "Attendance off", badges: [{ t: "off", l: "MENU OFF" }], blocked: true, reason: "attendanceEnabled OFF.", flashIds: ["attendanceEnabled"] });
      html += `<p class="step__desc">Enable Attendance menu to see data flow.</p>${stepClose()}`;
      document.getElementById("docPanel").innerHTML = html;
      return runMermaid(seq);
    }

    // Table map
    html += stepOpen({ id: "t0", num: "0", title: "Table map", badges: [{ t: "approved", l: "CORE + REG" }], blocked: false, flashIds: ["attendanceRegularizationEnabled"] });
    html += `<p class="step__desc">Daily marks live in protected core <code>fs_user_attendance_model</code>. Regularization is a workflow layer in <code>ts_*</code> that writes back on approve.</p>
      <div class="table-map"><span class="pill pill--core">fs_user_attendance_model</span>
      <span class="pill pill--stage">ts_attendance_regularization_model</span>
      <span class="pill pill--stage">ts_attendance_regularization_policy_model</span></div>`;
    html += mermaidBlock("m-er", `
flowchart TB
  EMP["Employee 200"] --> ATT["fs_user_attendance_model<br/>status: PENDING/APPROVED/…"]
  REG["ts_attendance_regularization_model<br/>SUBMITTED/APPROVED/REJECTED"]
  REG -->|"approve: ApprovalBridge"| ATT
  LEAVE["Leave sync LEAVE/HALF_DAY"] --> ATT
    `);
    if (c.delegateActs) html += `<div class="callout">Delegation ON — delegate Anil (501) can approve with Acting for Meera (300).</div>`;
    html += stepClose();

    // Example
    html += stepOpen({ id: "tEx", num: "★", title: "Example cast", badges: [], blocked: false });
    html += `<div class="scenario-box"><h4>Story — week of 2026-07-14</h4>
      <p>Rahul Kapoor marks Tue 2026-07-15 (forgot punch Mon → regularization). Meera approves. ${c.autoOwn ? "Auto-approve own is ON." : "Normal pending path."} ${!c.reg ? "Regularization org flag OFF." : ""}</p></div>
      <table class="data"><thead><tr><th>Role</th><th>Name</th><th>id</th></tr></thead><tbody>
      <tr><td>Employee</td><td>Rahul Kapoor</td><td>200</td></tr>
      <tr><td>Manager</td><td>Meera Shah</td><td>300</td></tr>
      <tr><td>Delegate</td><td>Anil Rao</td><td>501</td></tr></tbody></table>`;
    html += stepClose();

    // Step 1 Mark
    {
      const blocked = !c.canMarkOwn;
      html += stepOpen({ id: "t1", num: "1", title: "Mark attendance", badges: [{ t: "pending", l: c.autoOwn ? "AUTO" : "MARK" }], blocked, reason: "markOwnAttendanceEnabled OFF or menu off.", flashIds: ["markOwnAttendanceEnabled", "autoApproveOwnAttendanceEnabled"] });
      html += `<p class="step__desc">Rahul marks Wed 2026-07-15: in 09:00, out 18:00, 8h. EmployeeService resolves auto-approve from role flags.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> /api/v2/employees/attendance/200?date=2026-07-15T09:00:00</div>
        <ul class="steps-list"><li>Upsert row in fs_user_attendance_model for employee + date.</li>
        <li>${c.autoOwn ? "autoApproveOwn → status APPROVED, approved_by=200" : "status PENDING_APPROVAL, notify manager/delegate"}</li>
        <li>Cannot overwrite LEAVE/HALF_DAY if leaveAutoSyncToAttendance on.</li></ul>`;
      html += flowCards([
        { table: "fs_user_attendance", action: c.autoOwn ? "INSERT status=APPROVED" : "INSERT status=PENDING", kind: "write" },
        { table: "ts_regularization", action: "NOT USED", kind: "none" }
      ]);
      html += mermaidBlock("m-mark", `
flowchart LR
  UI["Grid cell Wed 8h"] --> PUT["PUT mark"]
  PUT --> ATT["fs_user_attendance_model<br/>id 900"]
  ATT --> ST["status = ${c.autoOwn ? "APPROVED" : "PENDING_APPROVAL"}"]
      `, blocked);
      html += `<p class="delta"><strong>After mark — fs_user_attendance_model</strong></p>
        <table class="data"><thead><tr><th>id</th><th>employee_id</th><th>date</th><th>hours</th><th>status</th><th>marked_by</th><th>approved_by</th></tr></thead>
        <tbody><tr class="changed"><td>900</td><td>200</td><td>2026-07-15</td><td class="hl">8.0</td>
        <td class="hl">${c.autoOwn ? "APPROVED" : "PENDING_APPROVAL"}</td><td>200</td><td class="hl">${c.autoOwn ? "200" : "null"}</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 2 Pending
    {
      const blocked = !c.pendingPath;
      html += stepOpen({ id: "t2", num: "2", title: "Pending approval queue", badges: [{ t: "pending", l: "PENDING" }], blocked,
        reason: c.autoOwn ? "Auto-approve own skips pending queue." : !c.canMarkOwn ? "Cannot mark." : "", flashIds: ["autoApproveOwnAttendanceEnabled"] });
      html += `<p class="step__desc">Row 900 appears in manager pending. ${c.inbox ? "Also in Workspace Approvals (ATTENDANCE) — approve/reject via POST /approvals/inbox/ATTENDANCE/900/{action}." : ""} ${c.reminders ? "Reminder scheduler may nudge." : ""}</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/employees/attendance/pending?approverId=300</div>`;
      html += mermaidBlock("m-pending", `
flowchart LR
  ATT["row 900 PENDING"] --> Q["Pending panel / inbox"]
  Q --> M["Meera 300${c.delegateActs ? " + Anil 501" : ""}"]
      `, blocked);
      html += stepClose();
    }

    // Step 3 Approve
    {
      const blocked = !c.canApprove || !c.pendingPath;
      html += stepOpen({ id: "t3", num: "3", title: "Approve mark", badges: [{ t: "approved", l: "APPROVED" }], blocked,
        reason: !c.canApprove ? "approveTeamEnabled OFF." : "Auto-approve path — no manager approve step.", flashIds: ["approveTeamEnabled", "approvalDelegationEnabled"] });
      html += `<p class="step__desc">${c.delegateActs ? "Meera or delegate Anil approves. Sets approvalAuthorityType MANAGER/DELEGATE." : "Meera approves row 900."}</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> /api/v2/employees/attendance/900/approve?approverId=300</div>`;
      html += mermaidBlock("m-approve", `
flowchart LR
  P["PENDING_APPROVAL"] -->|approve| A["APPROVED"]
  A --> ATT["fs_user_attendance_model<br/>approved_by=300"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>status</th><th>approved_by</th><th>approved_date</th></tr></thead>
        <tbody><tr class="changed"><td>900</td><td class="hl">APPROVED</td><td class="hl">300</td><td class="hl">2026-07-16</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 4 Reject
    {
      const blocked = !c.canApprove || !c.pendingPath;
      html += stepOpen({ id: "t4", num: "4", title: "Reject mark → employee fixes", badges: [{ t: "rejected", l: "REJECTED" }], blocked,
        reason: "Same gates as approve.", flashIds: ["approveTeamEnabled"] });
      html += `<div class="scenario-box"><h4>Scenario B</h4><p>Row 901 PENDING with wrong hours. Meera rejects with comment. Rahul re-marks → new PENDING cycle.</p></div>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> …/attendance/901/reject?approverId=300 + comment</div>`;
      html += mermaidBlock("m-reject", `
flowchart LR
  P["PENDING"] -->|reject| R["REJECTED"]
  R --> FIX["Employee re-mark → PENDING"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>status</th><th>rejected_by</th><th>comment</th></tr></thead>
        <tbody><tr class="changed"><td>901</td><td class="hl">REJECTED</td><td class="hl">300</td><td class="hl">Hours don't match shift</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 5 Removal
    {
      const blocked = !c.canRemove;
      html += stepOpen({ id: "t5", num: "5", title: "Request removal (approved mark)", badges: [{ t: "pending", l: "PENDING_REMOVAL" }], blocked,
        reason: "removeOwnAttendanceEnabled OFF.", flashIds: ["removeOwnAttendanceEnabled"] });
      html += `<p class="step__desc">From APPROVED row 900, Rahul requests removal (duplicate entry).</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> /api/v2/employees/attendance/900/request-removal?requestedBy=200</div>`;
      html += mermaidBlock("m-remreq", `
flowchart LR
  A["APPROVED"] -->|request removal| PR["PENDING_REMOVAL"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>status before</th><th>status after</th></tr></thead>
        <tbody><tr class="changed"><td>900</td><td>APPROVED</td><td class="hl">PENDING_REMOVAL</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 6 Approve removal
    {
      const blocked = !c.canApprove;
      html += stepOpen({ id: "t6", num: "6", title: "Approve removal (hard delete)", badges: [{ t: "off", l: "DELETED" }], blocked,
        reason: "approveTeamEnabled OFF.", flashIds: ["approveTeamEnabled"] });
      html += `<p class="step__desc">Manager approves removal → row hard-deleted (audit REMOVAL_APPROVED). Reject → back to APPROVED.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> …/attendance/900/approve?approverId=300 (removal path)</div>`;
      html += mermaidBlock("m-remap", `
flowchart LR
  PR["PENDING_REMOVAL"] -->|approve removal| DEL["row deleted"]
  PR -->|reject removal| A["APPROVED restored"]
      `, blocked);
      html += `<div class="callout callout--warn">Reject removal restores status APPROVED — row stays in fs_user_attendance_model.</div>`;
      html += stepClose();
    }

    // Step 7 Submit reg
    {
      const blocked = !c.canReg;
      let reason = !c.reg ? "Org attendanceRegularizationEnabled OFF." : "Need menu + markOwn.";
      html += stepOpen({ id: "t7", num: "7", title: "Submit regularization", badges: [{ t: "pending", l: "SUBMITTED" }], blocked, reason, flashIds: ["attendanceRegularizationEnabled"] });
      html += `<div class="scenario-box"><h4>Scenario C — missed Mon punch</h4><p>Rahul submits MISSING_PUNCH for 2026-07-14 (within allowBackdatedDays). Policy checks monthly cap.</p></div>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/attendance/regularizations?userTeamId=7&actorId=200</div>`;
      html += flowCards([
        { table: "ts_attendance_regularization", action: "INSERT status=SUBMITTED", kind: blocked ? "none" : "write" },
        { table: "fs_user_attendance", action: "NOT YET (until approve)", kind: "none" }
      ]);
      html += mermaidBlock("m-regsub", `
flowchart LR
  UI["Reg form Mon 9-6"] --> POST["POST regularizations"]
  POST --> REG["ts_attendance_regularization<br/>id 501 SUBMITTED"]
  REG -.-> ATT["fs_user_attendance<br/>unchanged"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>employee_id</th><th>mark_date</th><th>exception</th><th>status</th></tr></thead>
        <tbody><tr class="changed"><td>501</td><td>200</td><td>2026-07-14</td><td>MISSING_PUNCH</td><td class="hl">SUBMITTED</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 8 Approve reg
    {
      const blocked = !c.canRegApprove;
      html += stepOpen({ id: "t8", num: "8", title: "Approve regularization (bridge)", badges: [{ t: "approved", l: "APPROVED" }], blocked,
        reason: !c.reg ? "Org reg off." : "approveTeamEnabled OFF.", flashIds: ["approveTeamEnabled", "attendanceRegularizationEnabled"] });
      html += `<p class="step__desc">AttendanceRegularizationApprovalBridge upserts fs_user_attendance_model APPROVED, then reg row → APPROVED.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> /api/v2/attendance/regularizations/501/approve?approverId=300</div>`;
      html += mermaidBlock("m-regap", `
flowchart TB
  REG["reg 501 SUBMITTED"] -->|approve| BR["ApprovalBridge"]
  BR --> ATT["fs_user_attendance_model<br/>NEW/UPDATE APPROVED Mon 8h"]
  REG --> R2["reg status APPROVED"]
      `, blocked);
      html += `<p class="delta"><strong>After approve — both tables</strong></p>
        <table class="data"><thead><tr><th>Table</th><th>id</th><th>status</th><th>notes</th></tr></thead><tbody>
        <tr class="changed"><td>ts_attendance_regularization</td><td>501</td><td class="hl">APPROVED</td><td>approved_by=300</td></tr>
        <tr class="changed"><td>fs_user_attendance_model</td><td>902</td><td class="hl">APPROVED</td><td>2026-07-14 bridged hours</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Step 9 Reject reg
    {
      const blocked = !c.canRegApprove;
      html += stepOpen({ id: "t9", num: "9", title: "Reject regularization", badges: [{ t: "rejected", l: "REJECTED" }], blocked,
        reason: "Need approve role + org reg.", flashIds: ["approveTeamEnabled"] });
      html += `<p class="step__desc">Reject reg 502 — no write to fs_user_attendance_model. Employee may resubmit.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PATCH</span> …/regularizations/502/reject?approverId=300</div>`;
      html += mermaidBlock("m-regrej", `
flowchart LR
  S["SUBMITTED"] -->|reject| R["REJECTED"]
  R -.-> ATT["fs_user_attendance unchanged"]
      `, blocked);
      html += stepClose();
    }

    // Leave sync
    {
      const blocked = !c.leaveSync || !c.menu;
      html += stepOpen({ id: "tLeave", num: "L", title: "Leave auto-sync to attendance", badges: [{ t: "approved", l: "LEAVE" }], blocked,
        reason: "leaveAutoSyncToAttendance OFF or menu off.", flashIds: ["leaveAutoSyncToAttendance"] });
      html += `<p class="step__desc">When leave is approved, LeavePromotionService writes <code>fs_user_attendance_model</code> rows with status LEAVE or HALF_DAY. Manual mark on those dates is blocked.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> leave approve → promotion hook (internal)</div>`;
      html += mermaidBlock("m-leave", `
flowchart LR
  LV["Leave approved Fri"] --> SYNC["LeavePromotionService"]
  SYNC --> ATT["fs_user_attendance_model<br/>status=LEAVE"]
  ATT --> BLK["Manual mark blocked"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>id</th><th>employee_id</th><th>date</th><th>status</th><th>source</th></tr></thead>
        <tbody><tr class="changed"><td>903</td><td>200</td><td>2026-07-18</td><td class="hl">LEAVE</td><td>leave sync</td></tr></tbody></table>`;
      html += stepClose();
    }

    // Lifecycle
    html += stepOpen({ id: "tLife", num: "∞", title: "Status lifecycle", badges: [], blocked: false });
    html += mermaidBlock("m-life", `
stateDiagram-v2
  [*] --> PENDING_APPROVAL: mark no auto
  [*] --> APPROVED: auto-approve
  PENDING_APPROVAL --> APPROVED: approve
  PENDING_APPROVAL --> REJECTED: reject
  REJECTED --> PENDING_APPROVAL: re-mark
  APPROVED --> PENDING_REMOVAL: request removal
  PENDING_REMOVAL --> [*]: approve removal delete
  PENDING_REMOVAL --> APPROVED: reject removal
  note right of APPROVED: Regularization bridge also writes APPROVED
    `);
    html += `<ul class="steps-list">
      <li>Mark pending path: <strong style="color:${c.pendingPath ? "var(--ok)" : "var(--danger)"}">${c.pendingPath ? "ACTIVE" : "SKIPPED (auto)"}</strong></li>
      <li>Regularization: <strong style="color:${c.canReg ? "var(--ok)" : "var(--danger)"}">${c.canReg ? "ACTIVE" : "BLOCKED"}</strong></li>
      <li>Delegate: <strong>${c.delegateActs ? "ON" : "OFF"}</strong></li></ul>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + (b.mode === "auto" ? "auto" : b.mode === "pending" ? "pending" : "off");
    pill.textContent = b.mode === "auto" ? "Mode: Auto-approve" : b.mode === "pending" ? "Mode: Manager review" : "Mode: Off";
    document.getElementById("bhSummary").textContent = b.summary;
    const renderFlow = (el, steps) => {
      document.getElementById(el).innerHTML = steps.map((s, i) => {
        const arrow = i < steps.length - 1 ? `<span class="flow-arrow">→</span>` : "";
        return `<span class="bh-flow-step is-${s.state}">${esc(s.label)}</span>${arrow}`;
      }).join("");
    };
    renderFlow("bhFlowMark", b.markSteps);
    renderFlow("bhFlowReg", b.regSteps);
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
            <span class="flag__key">${esc(f.key)}</span><span class="flag__scope scope-${f.scope}">${f.scope}</span></div>
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
    lastChanged = name === "regOff" ? "attendanceRegularizationEnabled" : name === "autoOwn" ? "autoApproveOwnAttendanceEnabled" : name === "menuOff" ? "attendanceEnabled" : null;
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
