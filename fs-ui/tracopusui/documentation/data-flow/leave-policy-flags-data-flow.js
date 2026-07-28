/* Leave policy + accrual flags + data flow */
(function () {
  const FLAG_DEFS = [
    { id: "leaveManagementEnabled", scope: "org", group: "Org · leaveAdditional", name: "Leave management", key: "leaveManagementEnabled",
      description: "Master org switch for all leave APIs, accrual jobs, balances.", whenOn: "Policy + workflow + schedulers run.", whenOff: "403 fail closed everywhere." },
    { id: "globalLeavePoliciesEnabled", scope: "role", group: "Role · admin", name: "Global leave policies", key: "adminModules.globalLeavePoliciesEnabled",
      description: "Shows Global Leave Policy Center routes.", whenOn: "Admin can draft/publish GLP.", whenOff: "GLP UI hidden." },
    { id: "leaveEnhancementsEnabled", scope: "org", group: "Org · leaveAdditional", name: "Leave enhancements", key: "leaveEnhancementsEnabled",
      description: "Extended leave UX (impact drawer, etc.).", whenOn: "Enhancement panels on.", whenOff: "Core workflow only." },
    { id: "simGlobalPublished", scope: "sim", group: "Simulated policy state", name: "Published global version", key: "ts_leave_policy_version PUBLISHED",
      description: "Team has a published global policy version.", whenOn: "Accrual source GLOBAL; rules_json drives runtime.", whenOff: "Falls back to classic ts_leave_policy_model." },
    { id: "simOpeningBalance", scope: "sim", group: "Simulated policy state", name: "Opening balance imported", key: "ts_employee_leave_balance seed",
      description: "Cutover import or HR adjust seeded Rahul CL=10.", whenOn: "Employee can submit before first accrual.", whenOff: "Zero balance until accrual/adjust." },
    { id: "scheduleAccrualEnabled", scope: "sim", group: "Simulated schedulers", name: "LEAVE_ACCRUAL job", key: "fs_schedule_model LEAVE_ACCRUAL",
      description: "Monthly accrual on day 1 at 06:00.", whenOn: "LeaveAccrualService credits balances.", whenOff: "No automatic monthly credit." },
    { id: "scheduleCarryForwardEnabled", scope: "sim", group: "Simulated schedulers", name: "LEAVE_CARRY_FORWARD job", key: "fs_schedule_model LEAVE_CARRY_FORWARD",
      description: "Daily carry-forward / lapse scan.", whenOn: "CF + lapse rules applied.", whenOff: "Balances roll without scheduled CF." },
    { id: "scheduleCompOffExpireEnabled", scope: "sim", group: "Simulated schedulers", name: "COMP_OFF_EXPIRE job", key: "fs_schedule_model COMP_OFF_EXPIRE",
      description: "Comp-off expiry / encash staging.", whenOn: "GlobalLeavePolicyService.expireAndStageEncashCompOff.", whenOff: "Comp-off not auto-expired." },
    { id: "leaveAllowNegativeBalance", scope: "org", group: "Org · submit rules", name: "Allow negative balance", key: "leaveAllowNegativeBalance",
      description: "Submit without sufficient available days.", whenOn: "validateAvailable allows negative.", whenOff: "Submit blocked unless special unpaid." },
    { id: "leaveBlockOverlapRegardlessOfType", scope: "org", group: "Org · submit rules", name: "Block overlap", key: "leaveBlockOverlapRegardlessOfType",
      description: "Overlap check on create/submit.", whenOn: "Conflicting dates rejected.", whenOff: "Looser overlap." },
    { id: "leaveBlockNonWorkingDayLeave", scope: "org", group: "Org · submit rules", name: "Block non-working days", key: "leaveBlockNonWorkingDayLeave",
      description: "Holiday/weekend validation via legal calendar.", whenOn: "Non-working days blocked.", whenOff: "More permissive dates." }
  ];

  const PRESETS = {
    production: {
      leaveManagementEnabled: true, globalLeavePoliciesEnabled: true, leaveEnhancementsEnabled: true,
      simGlobalPublished: true, simOpeningBalance: true,
      scheduleAccrualEnabled: true, scheduleCarryForwardEnabled: true, scheduleCompOffExpireEnabled: true,
      leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true
    },
    moduleOff: {
      leaveManagementEnabled: false, globalLeavePoliciesEnabled: true, leaveEnhancementsEnabled: true,
      simGlobalPublished: true, simOpeningBalance: true,
      scheduleAccrualEnabled: true, scheduleCarryForwardEnabled: true, scheduleCompOffExpireEnabled: true,
      leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true
    },
    classicOnly: {
      leaveManagementEnabled: true, globalLeavePoliciesEnabled: true, leaveEnhancementsEnabled: false,
      simGlobalPublished: false, simOpeningBalance: false,
      scheduleAccrualEnabled: true, scheduleCarryForwardEnabled: true, scheduleCompOffExpireEnabled: false,
      leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true
    },
    cutoverImport: {
      leaveManagementEnabled: true, globalLeavePoliciesEnabled: true, leaveEnhancementsEnabled: true,
      simGlobalPublished: true, simOpeningBalance: true,
      scheduleAccrualEnabled: false, scheduleCarryForwardEnabled: false, scheduleCompOffExpireEnabled: false,
      leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true
    },
    noSchedulers: {
      leaveManagementEnabled: true, globalLeavePoliciesEnabled: true, leaveEnhancementsEnabled: true,
      simGlobalPublished: true, simOpeningBalance: true,
      scheduleAccrualEnabled: false, scheduleCarryForwardEnabled: false, scheduleCompOffExpireEnabled: false,
      leaveAllowNegativeBalance: false, leaveBlockOverlapRegardlessOfType: true, leaveBlockNonWorkingDayLeave: true
    }
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
    const glpAdmin = !!f.globalLeavePoliciesEnabled;
    const enhancements = !!f.leaveEnhancementsEnabled;
    const globalPublished = !!f.simGlobalPublished;
    const openingBalance = !!f.simOpeningBalance;
    const accrualJob = !!f.scheduleAccrualEnabled;
    const cfJob = !!f.scheduleCarryForwardEnabled;
    const compOffJob = !!f.scheduleCompOffExpireEnabled;
    const allowNeg = !!f.leaveAllowNegativeBalance;
    const blockOverlap = !!f.leaveBlockOverlapRegardlessOfType;
    const blockNonWorking = !!f.leaveBlockNonWorkingDayLeave;

    const accrualSource = globalPublished ? "GLOBAL" : "CLASSIC";
    const canSetupGlp = leaveOn && glpAdmin;
    const canPublish = canSetupGlp && globalPublished;
    const canAccrue = leaveOn && accrualJob;
    const canCfLapse = leaveOn && cfJob;
    const canResolve = leaveOn && globalPublished;
    const hasBalance = openingBalance || canAccrue;
    const canSubmitWithBalance = leaveOn && (hasBalance || allowNeg);
    const strictSubmit = blockOverlap && blockNonWorking && !allowNeg;

    let mode = "on";
    if (!leaveOn) mode = "off";
    else if (!globalPublished) mode = "classic";

    return {
      leaveOn, glpAdmin, enhancements, globalPublished, openingBalance,
      accrualJob, cfJob, compOffJob, allowNeg, blockOverlap, blockNonWorking,
      accrualSource, canSetupGlp, canPublish, canAccrue, canCfLapse, canResolve,
      hasBalance, canSubmitWithBalance, strictSubmit, mode
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "Leave APIs + balances": c.leaveOn,
        "Global Policy Center": c.canSetupGlp,
        "GLOBAL accrual rules": c.globalPublished && c.leaveOn,
        "Monthly accrual job": c.canAccrue,
        "CF / lapse job": c.canCfLapse,
        "Employee has spendable balance": c.hasBalance && c.leaveOn,
        "Strict submit validation": c.strictSubmit && c.leaveOn
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
      ? "leaveManagementEnabled OFF — policy setup, accrual, balances and leave workflow APIs are blocked."
      : c.globalPublished
        ? `GLOBAL policy path: draft rules_json → publish → resolve for employee → ${c.openingBalance ? "opening balance + " : ""}${c.canAccrue ? "monthly accrual" : "manual adjust only"} → submit reserves balance → see leave request flow.`
        : "CLASSIC fallback: ts_leave_policy_model.policy_config.accruals until a global version is published.";

    const setupSteps = [
      { label: "Enable leave module", state: c.leaveOn ? "on" : "off" },
      { label: "GLP admin access", state: c.canSetupGlp ? "on" : "off" },
      { label: "Jurisdiction + draft", state: c.canSetupGlp ? "on" : "off" },
      { label: "Publish version", state: c.canPublish ? "on" : "off" },
      { label: "Resolve employee", state: c.canResolve ? "query" : "off" }
    ];
    const balanceSteps = [
      { label: "Opening import/adjust", state: c.openingBalance ? "on" : "off" },
      { label: "Monthly accrual", state: c.canAccrue ? "on" : "off" },
      { label: "Employee sees balance", state: c.hasBalance && c.leaveOn ? "on" : "off" },
      { label: "Submit reserve", state: c.canSubmitWithBalance ? "on" : "off" },
      { label: "Approve debit", state: c.leaveOn ? "on" : "off" }
    ];
    const schedulerSteps = [
      { label: "LEAVE_ACCRUAL", state: c.canAccrue ? "on" : "off" },
      { label: "LEAVE_CARRY_FORWARD", state: c.canCfLapse ? "on" : "off" },
      { label: "COMP_OFF_EXPIRE", state: c.leaveOn && c.compOffJob ? "on" : "off" },
      { label: "LEAVE_PROMOTION_RETRY", state: c.leaveOn ? "query" : "off" }
    ];
    const cards = [
      { title: "Accrual source", html: c.globalPublished ? `<span class="on">GLOBAL (${esc(c.accrualSource)})</span>` : `<span class="off">CLASSIC fallback</span>` },
      { title: "Rahul CL balance", html: c.hasBalance ? `<span class="on">10.0 available</span>` : `<span class="off">0 until accrual/import</span>` },
      { title: "Monthly accrual", html: c.canAccrue ? `<span class="on">+1.5 CL on 1st</span>` : `<span class="off">Job disabled</span>` },
      { title: "CF / lapse", html: c.canCfLapse ? `<span class="on">Daily scan</span>` : `<span class="off">Off</span>` },
      { title: "Submit validation", html: c.strictSubmit ? `<span class="on">Overlap + working days</span>` : `<span class="off">Relaxed</span>` },
      { title: "Next doc", html: `<a href="./leave-flags-data-flow.html">Request &amp; approve flow →</a>` }
    ];
    const matrix = [
      { cap: "Leave management (org)", ok: c.leaveOn, why: "leaveManagementEnabled" },
      { cap: "Global Policy Center UI", ok: c.canSetupGlp, why: "globalLeavePoliciesEnabled + org" },
      { cap: "Published global version", ok: c.globalPublished && c.leaveOn, why: "simGlobalPublished" },
      { cap: "Accrual source GLOBAL", ok: c.globalPublished && c.leaveOn, why: "published ts_leave_policy_version" },
      { cap: "Opening balance / import", ok: c.openingBalance && c.leaveOn, why: "HR import or adjust" },
      { cap: "Monthly LEAVE_ACCRUAL", ok: c.canAccrue, why: "schedule + LeaveAccrualService" },
      { cap: "Daily LEAVE_CARRY_FORWARD", ok: c.canCfLapse, why: "carryForward + lapse rules" },
      { cap: "Resolve policy for employee", ok: c.canResolve, why: "GlobalLeavePolicyService.resolve" },
      { cap: "Submit uses policy rules", ok: c.leaveOn, why: "LeavePolicyRuntimeRules + config flags" },
      { cap: "Link to approve flow", ok: c.leaveOn, why: "leave-flags-data-flow.html" }
    ];
    return { summary, setupSteps, balanceSteps, schedulerSteps, cards, matrix, mode: c.mode };
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
      return `<div class="pipeline"><div class="pipeline__label">Policy → balance → request (current flags)</div><div class="pipeline__track">
        <div class="pipe-node is-blocked">Module off<span class="pipe-node__sub">Blocked</span></div></div></div>`;
    }
    const nodes = [
      { n: "1 Setup", s: c.canSetupGlp ? "GLP" : "Blocked", st: c.canSetupGlp ? "active" : "blocked" },
      { n: "2 Publish", s: c.canPublish ? "GLOBAL" : "Classic", st: c.canPublish ? "active" : "blocked" },
      { n: "3 Balance", s: c.hasBalance ? "CL 10" : "Zero", st: c.hasBalance ? "active" : "blocked" },
      { n: "4 Accrual", s: c.canAccrue ? "Monthly" : "Skip", st: c.canAccrue ? "active" : "blocked" },
      { n: "5 Submit", s: "Reserve", st: c.canSubmitWithBalance ? "active" : "blocked" },
      { n: "6 Approve", s: "Debit", st: "active" }
    ];
    let track = "";
    nodes.forEach((n, i) => {
      if (i) track += `<span class="pipe-arrow">→</span>`;
      track += `<div class="pipe-node is-${n.st}">${esc(n.n)}<span class="pipe-node__sub">${esc(n.s)}</span></div>`;
    });
    return `<div class="pipeline"><div class="pipeline__label">Policy → balance → request (current flags)</div><div class="pipeline__track">${track}</div></div>`;
  }

  function renderDoc() {
    const c = ctx();
    const seq = ++renderSeq;
    let html = changeBannerHtml();
    html += `<div class="mode-pill mode-pill--${c.mode}">${!c.leaveOn ? "Mode: Leave module off" : c.globalPublished ? "Mode: GLOBAL policy + accrual" : "Mode: CLASSIC policy fallback"}</div>`;
    html += pipelineHtml(c);

    html += `<nav class="toc"><h3>Steps</h3><ol>
      <li><a href="#t0">Table map</a></li><li><a href="#tEx">Example cast</a></li>`;
    if (!c.leaveOn) html += `<li class="blocked-link">All flows blocked</li>`;
    else {
      html += `<li class="${c.canSetupGlp ? "" : "blocked-link"}"><a href="#t1">1. Enable + accrual source</a></li>`;
      html += `<li class="${c.canSetupGlp ? "" : "blocked-link"}"><a href="#t2">2. Jurisdiction &amp; rule sets</a></li>`;
      html += `<li class="${c.canSetupGlp ? "" : "blocked-link"}"><a href="#t3">3. Draft policy version (rules_json)</a></li>`;
      html += `<li class="${c.canPublish ? "" : "blocked-link"}"><a href="#t4">4. Test lab + publish</a></li>`;
      html += `<li class="${c.canResolve ? "" : "blocked-link"}"><a href="#t5">5. Resolve policy for employee</a></li>`;
      html += `<li><a href="#t6">6. Opening balance / HR adjust</a></li>`;
      html += `<li class="${c.canAccrue ? "" : "blocked-link"}"><a href="#t7">7. LEAVE_ACCRUAL scheduler</a></li>`;
      html += `<li class="${c.canCfLapse ? "" : "blocked-link"}"><a href="#t8">8. LEAVE_CARRY_FORWARD / lapse</a></li>`;
      html += `<li><a href="#t9">9. Employee balance API</a></li>`;
      html += `<li><a href="#t10">10. Submit uses policy → request flow</a></li>`;
      html += `<li><a href="#tLife">Balance lifecycle</a></li>`;
    }
    html += `</ol></nav>`;

    if (!c.leaveOn) {
      html += stepOpen({ id: "t0", num: "!", title: "Leave management off", badges: [{ t: "off", l: "OFF" }], blocked: true, reason: "leaveManagementEnabled OFF.", flashIds: ["leaveManagementEnabled"] });
      html += `<p class="step__desc">Enable org <code>leaveManagementEnabled</code> before policy setup, accrual, or balances.</p>${stepClose()}`;
      document.getElementById("docPanel").innerHTML = html;
      return runMermaid(seq);
    }

    // 0 Table map
    html += stepOpen({ id: "t0", num: "0", title: "Table map — policy, balance, request", badges: [{ t: "query", l: "MAP" }], blocked: false });
    html += `<p class="step__desc">Global leave platform uses <code>ts_*</code> policy and balance tables. Leave requests stay in protected core <code>fs_emp_leave_master_model</code>. Schedulers are rows in <code>fs_schedule_model</code>.</p>
      <div class="table-map">
        <span class="pill pill--policy">ts_leave_global_policy</span>
        <span class="pill pill--policy">ts_leave_policy_version</span>
        <span class="pill pill--policy">ts_leave_type_definition</span>
        <span class="pill pill--policy">ts_leave_type_model</span>
        <span class="pill pill--balance">ts_employee_leave_balance_model</span>
        <span class="pill pill--balance">ts_leave_balance_ledger_model</span>
        <span class="pill pill--core">fs_emp_leave_master_model</span>
        <span class="pill pill--schedule">fs_schedule_model</span>
      </div>`;
    html += mermaidBlock("m-map", `
flowchart TB
  GLP["ts_leave_global_policy<br/>+ version rules_json"] --> TYPES["ts_leave_type_model<br/>catalog sync on publish"]
  GLP --> RES["GlobalLeavePolicyService.resolve()"]
  RES --> BAL["ts_employee_leave_balance_model"]
  ACC["LeaveAccrualService"] --> LED["ts_leave_balance_ledger_model"]
  ACC --> BAL
  BAL --> SUB["LeaveWorkflowService.submit<br/>reserveOnSubmit"]
  SUB --> REQ["fs_emp_leave_master_model SUBMITTED"]
    `);
    html += stepClose();

    // Example
    html += stepOpen({ id: "tEx", num: "★", title: "Example cast", badges: [], blocked: false });
    html += `<div class="scenario-box"><h4>Team 7 · India Karnataka pack CFA-IN-KA · FY Apr–Mar</h4>
      <p>HR publishes global policy v3 with PL (18 days/year, 1.5/month) and CL (12/year). Rahul Kapoor (200) joins with opening CL=10 from cutover import. Monthly job credits +1.5 CL on the 1st.</p></div>
      <table class="data"><thead><tr><th>Entity</th><th>Example</th></tr></thead><tbody>
      <tr><td>Policy ref</td><td>CFA-IN-KA</td></tr>
      <tr><td>Version</td><td>v3 PUBLISHED</td></tr>
      <tr><td>Employee</td><td>Rahul Kapoor (200)</td></tr>
      <tr><td>Balance row</td><td>CL entitlement=10 balance=10 pending=0</td></tr></tbody></table>`;
    html += stepClose();

    // 1 Enable
    html += stepOpen({ id: "t1", num: "1", title: "Enable module + accrual source check", badges: [{ t: "approved", l: "CONFIG" }], blocked: false, flashIds: ["leaveManagementEnabled", "simGlobalPublished"] });
    html += `<p class="step__desc">Org <code>leaveManagementEnabled</code> gates all leave APIs and schedulers. Admin role needs <code>globalLeavePoliciesEnabled</code> for GLP Center. Accrual source banner: <strong>${esc(c.accrualSource)}</strong>.</p>
      <div class="api"><span>GET</span> /api/v2/leave/global/accrual-source?userTeamId=7</div>`;
    html += flowCards([
      { table: "App config", action: "leaveManagementEnabled", kind: "read" },
      { table: "accrual-source", action: c.acrualSource, kind: c.globalPublished ? "write" : "read" }
    ]);
    html += `<table class="data"><thead><tr><th>check</th><th>result</th></tr></thead><tbody>
      <tr><td>leaveManagementEnabled</td><td class="hl">${c.leaveOn ? "true" : "false"}</td></tr>
      <tr><td>accrualSource</td><td class="hl">${esc(c.accrualSource)}</td></tr>
      <tr><td>classic fallback</td><td>${c.globalPublished ? "skipped" : "ts_leave_policy_model.policy_config"}</td></tr></tbody></table>`;
    html += stepClose();

    // 2 Jurisdiction
    {
      const blocked = !c.canSetupGlp;
      html += stepOpen({ id: "t2", num: "2", title: "Jurisdiction + rule sets (match layer)", badges: [{ t: "query", l: "SETUP" }], blocked,
        reason: "Need leaveManagementEnabled + globalLeavePoliciesEnabled.", flashIds: ["globalLeavePoliciesEnabled"] });
      html += `<p class="step__desc">Admin creates jurisdictions and prioritized rule sets. Resolution order: employee override → work location → region → country → company default.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/leave/global/jurisdictions</div>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/leave/global/rule-sets</div>`;
      html += mermaidBlock("m-jur", `
flowchart LR
  J["ts_leave_jurisdiction<br/>IN / KA"] --> RS["ts_leave_jurisdiction_rule_set<br/>priority + match JSON"]
  RS --> POL["ts_leave_global_policy<br/>CFA-IN-KA"]
      `, blocked);
      html += stepClose();
    }

    // 3 Draft
    {
      const blocked = !c.canSetupGlp;
      html += stepOpen({ id: "t3", num: "3", title: "Draft policy version — rules_json", badges: [{ t: "pending", l: "DRAFT" }], blocked,
        reason: "GLP admin access required.", flashIds: ["globalLeavePoliciesEnabled"] });
      html += `<p class="step__desc">Policy Rules Designer edits <code>rules_json</code>: leaveTypes, accruals, carryForward, lapse, eligibility, specialLeave. Stored on <code>ts_leave_policy_version</code> status=DRAFT.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/leave/global/policies/{policyId}/versions</div>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>PUT</span> /api/v2/leave/global/versions/{versionId}</div>`;
      html += sqlBlock(`-- rules_json excerpt (v3 draft)
{
  "leaveYearType": "FISCAL_APR_MAR",
  "leaveTypes": [{ "code": "CL", "annualDays": 12 }, { "code": "PL", "annualDays": 18 }],
  "accruals": [{ "leaveTypeCode": "CL", "formula": "MONTHLY", "monthlyDays": 1.0 },
               { "leaveTypeCode": "PL", "formula": "MONTHLY", "monthlyDays": 1.5 }],
  "carryForward": [{ "leaveTypeCode": "PL", "maxDays": 5, "excessAction": "LAPSE" }],
  "eligibility": [{ "minServiceMonths": 0 }]
}`);
      html += stepClose();
    }

    // 4 Publish
    {
      const blocked = !c.canPublish;
      html += stepOpen({ id: "t4", num: "4", title: "Test lab gate + publish version", badges: [{ t: "approved", l: "PUBLISHED" }], blocked,
        reason: !c.canSetupGlp ? "GLP admin off." : "simGlobalPublished OFF — no published version.", flashIds: ["simGlobalPublished"] });
      html += `<p class="step__desc"><code>LeavePolicyTestLabService.assertPublishAllowed</code> must pass. Publish retires prior PUBLISHED version and syncs <code>ts_leave_type_model</code> codes from type definitions.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>POST</span> /api/v2/leave/global/versions/103/publish</div>`;
      html += flowCards([
        { table: "ts_leave_policy_version", action: "DRAFT → PUBLISHED", kind: "write" },
        { table: "ts_leave_type_model", action: "upsert CL, PL", kind: "write" },
        { table: "ts_leave_type_definition", action: "sync from version", kind: "write" }
      ]);
      html += `<table class="data"><thead><tr><th>version_id</th><th>status before</th><th>status after</th><th>types synced</th></tr></thead>
        <tbody><tr class="changed"><td>103</td><td>DRAFT</td><td class="hl">PUBLISHED</td><td class="hl">CL, PL</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 5 Resolve
    {
      const blocked = !c.canResolve;
      html += stepOpen({ id: "t5", num: "5", title: "Resolve policy for employee", badges: [{ t: "query", l: "RESOLVE" }], blocked,
        reason: "No published global version.", flashIds: ["simGlobalPublished"] });
      html += `<p class="step__desc">Runtime picks rules for Rahul via resolution layers. Result persisted to <code>ts_leave_policy_resolution</code>. Submit/approve call <code>LeavePolicyRuntimeRules.resolvedVersion()</code>.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>GET</span> /api/v2/leave/global/resolve?userTeamId=7&amp;employeeId=200</div>`;
      html += mermaidBlock("m-resolve", `
flowchart TB
  EMP["employee 200<br/>work location KA"] --> RES["GlobalLeavePolicyService.resolve()"]
  RES --> VER["version 103 rules_json"]
  VER --> AUD["ts_leave_policy_resolution audit row"]
      `, blocked);
      html += stepClose();
    }

    // 6 Opening balance
    html += stepOpen({ id: "t6", num: "6", title: "Opening balance — import, bulk, or HR adjust", badges: [{ t: "approved", l: "BALANCE" }], blocked: false, flashIds: ["simOpeningBalance"] });
    html += `<p class="step__desc">No automatic balance on hire. Cutover uses bulk import or HR adjust. Writes <code>ts_employee_leave_balance_model</code> + ledger <code>ADJUST_HR</code>. ${c.openingBalance ? "Rahul CL seeded at 10.0." : "Toggle simOpeningBalance ON to see seeded row."}</p>
      <div class="api"><span>POST</span> /api/v2/admin/data-import/leave-balance</div>
      <div class="api"><span>POST</span> /api/v2/leaves/balances/adjust</div>`;
    html += flowCards([
      { table: "ts_employee_leave_balance", action: c.openingBalance ? "CL balance=10" : "empty", kind: c.openingBalance ? "write" : "none" },
      { table: "ts_leave_balance_ledger", action: "ADJUST_HR +10", kind: c.openingBalance ? "write" : "none" }
    ]);
    html += `<table class="data"><thead><tr><th>employee_id</th><th>type</th><th>entitlement</th><th>balance</th><th>pending</th><th>available</th></tr></thead>
      <tbody><tr class="changed"><td>200</td><td>CL</td><td class="hl">${c.openingBalance ? "10.0" : "0"}</td><td class="hl">${c.openingBalance ? "10.0" : "0"}</td><td>0</td><td class="hl">${c.openingBalance ? "10.0" : "0"}</td></tr></tbody></table>`;
    html += stepClose();

    // 7 Accrual scheduler
    {
      const blocked = !c.canAccrue;
      html += stepOpen({ id: "t7", num: "7", title: "LEAVE_ACCRUAL scheduler (monthly)", badges: [{ t: "approved", l: "SCHEDULER" }], blocked,
        reason: "scheduleAccrualEnabled OFF or leave module off.", flashIds: ["scheduleAccrualEnabled"] });
      html += `<p class="step__desc"><code>Scheduler</code> polls <code>fs_schedule_model</code> → <code>SchedulingService</code> → <code>LeaveAccrualService.processForUserTeam</code>. Cron seed: <code>0 0 6 1 * ?</code> (6 AM on 1st of month). Idempotent via ledger comment <code>periodKey=yyyy-MM</code>.</p>
        <div class="api ${blocked ? "is-blocked" : ""}"><span>internal</span> scheduleType=LEAVE_ACCRUAL userTeamId=7</div>`;
      html += sqlBlock(`SELECT schedule_type, cron_exp, enabled FROM fs_schedule_model
WHERE schedule_type = 'LEAVE_ACCRUAL' AND user_team_id = 7;`);
      html += mermaidBlock("m-accrual", `
flowchart TB
  SCH["fs_schedule_model<br/>LEAVE_ACCRUAL"] --> JOB["LeaveAccrualService"]
  JOB --> RULES["loadAccrualRulesForEmployee<br/>GLOBAL rules_json"]
  RULES --> ELIG["minServiceMonths check"]
  ELIG --> CRED["creditAccrual +1.0 CL"]
  CRED --> LED["ledger ACCRUAL periodKey=2026-08"]
  CRED --> BAL["balance += 1.0"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>employee</th><th>type</th><th>before balance</th><th>accrual</th><th>after balance</th><th>ledger</th></tr></thead>
        <tbody><tr class="changed"><td>200</td><td>CL</td><td>${c.openingBalance ? "10.0" : "0"}</td><td class="hl">+1.0</td><td class="hl">${c.openingBalance ? "11.0" : "1.0"}</td><td>ACCRUAL</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 8 CF / lapse
    {
      const blocked = !c.canCfLapse;
      html += stepOpen({ id: "t8", num: "8", title: "LEAVE_CARRY_FORWARD + lapse (daily)", badges: [{ t: "approved", l: "SCHEDULER" }], blocked,
        reason: "scheduleCarryForwardEnabled OFF.", flashIds: ["scheduleCarryForwardEnabled"] });
      html += `<p class="step__desc">Daily job <code>0 30 5 * * ?</code> runs carry-forward caps and lapse rules from <code>rules_json.carryForward</code> / <code>lapse</code>. Excess may LAPSE or stage ENCASH to <code>ts_leave_payroll_staging</code>.</p>`;
      html += mermaidBlock("m-cf", `
flowchart LR
  CF["LEAVE_CARRY_FORWARD job"] --> PARSE["LeavePolicyRuntimeRules"]
  PARSE --> CAP["maxDays carryForward"]
  CAP --> LAP["LAPSE excess via LeaveBalanceEngine"]
      `, blocked);
      html += `<table class="data"><thead><tr><th>type</th><th>balance before FY end</th><th>max CF</th><th>lapsed</th><th>carried</th></tr></thead>
        <tbody><tr class="changed"><td>PL</td><td>8.0</td><td>5</td><td class="hl">3.0</td><td class="hl">5.0</td></tr></tbody></table>`;
      html += stepClose();
    }

    // 9 Employee balance API
    html += stepOpen({ id: "t9", num: "9", title: "Employee sees balances (Leave UI)", badges: [{ t: "query", l: "READ" }], blocked: false });
    html += `<p class="step__desc">Leave Management page loads balances for selected employee. Available ≈ balance − pending. Ledger tab shows ACCRUAL, ADJUST_HR, PENDING_HOLD, DEBIT_APPROVE events.</p>
      <div class="api"><span>GET</span> /api/v2/leaves/balances?employeeId=200</div>
      <div class="api"><span>GET</span> /api/v2/leaves/balances/ledger?employeeId=200</div>`;
    html += `<table class="data"><thead><tr><th>leave_type_code</th><th>entitlement</th><th>used</th><th>pending</th><th>balance</th><th>available</th></tr></thead>
      <tbody><tr class="changed"><td>CL</td><td class="hl">${c.openingBalance && c.canAccrue ? "11.0" : c.openingBalance ? "10.0" : "0"}</td><td>0</td><td>0</td><td class="hl">${c.openingBalance && c.canAccrue ? "11.0" : c.openingBalance ? "10.0" : "0"}</td><td class="hl">${c.openingBalance && c.canAccrue ? "11.0" : c.openingBalance ? "10.0" : "0"}</td></tr></tbody></table>`;
    html += stepClose();

    // 10 Link to request flow
    html += stepOpen({ id: "t10", num: "10", title: "Submit uses policy → continue to request flow", badges: [{ t: "pending", l: "HANDOFF" }], blocked: false,
      flashIds: ["leaveBlockOverlapRegardlessOfType", "leaveAllowNegativeBalance"] });
    html += `<div class="link-box"><strong>Continue in leave request &amp; approve refdoc</strong><br/>
      Once balance exists, Rahul creates leave 880 (3 days CL). Submit calls <code>enforceRuntimePolicyRules</code> (eligibility, special leave), overlap ${c.blockOverlap ? "ON" : "OFF"}, working days ${c.blockNonWorking ? "ON" : "OFF"}, then <code>reserveOnSubmit</code> (pending hold).
      <br/><br/><a href="./leave-flags-data-flow.html#t1">→ Step 1 Create leave</a> ·
      <a href="./leave-flags-data-flow.html#t2">Step 2 Submit</a> ·
      <a href="./leave-flags-data-flow.html#t4">Step 4 Approve</a></div>`;
    html += mermaidBlock("m-handoff", `
flowchart LR
  BAL["balance available"] --> CREATE["POST /leaves CREATE"]
  CREATE --> SUB["submit enforceRuntimePolicyRules"]
  SUB --> HOLD["PENDING_HOLD ledger"]
  HOLD --> NEXT["leave-flags-data-flow.html<br/>approve + promote"]
    `);
    html += flowCards([
      { table: "LeavePolicyRuntimeRules", action: "minServiceMonths, specialLeave", kind: "read" },
      { table: "LeaveBalanceEngine", action: "validateAvailable + reserve", kind: "write" },
      { table: "fs_emp_leave_master", action: "SUBMITTED", kind: "write" }
    ]);
    html += `<table class="data"><thead><tr><th>submit check</th><th>flag</th><th>active?</th></tr></thead><tbody>
      <tr><td>Overlap block</td><td>leaveBlockOverlapRegardlessOfType</td><td class="hl">${c.blockOverlap ? "yes" : "no"}</td></tr>
      <tr><td>Non-working block</td><td>leaveBlockNonWorkingDayLeave</td><td class="hl">${c.blockNonWorking ? "yes" : "no"}</td></tr>
      <tr><td>Negative balance</td><td>leaveAllowNegativeBalance</td><td class="hl">${c.allowNeg ? "yes" : "no"}</td></tr></tbody></table>`;
    html += stepClose();

    // Lifecycle
    html += stepOpen({ id: "tLife", num: "∞", title: "Balance & ledger lifecycle", badges: [], blocked: false });
    html += mermaidBlock("m-life", `
stateDiagram-v2
  [*] --> Zero: new employee
  Zero --> Opening: ADJUST_HR / import
  Opening --> Accrued: ACCRUAL monthly
  Accrued --> Held: PENDING_HOLD on submit
  Held --> Debited: DEBIT_APPROVE on approve
  Held --> Released: reject / withdraw
  Accrued --> Lapsed: CF job LAPSE
    `);
    html += `<ul class="steps-list">
      <li>Accrual source: <strong>${esc(c.accrualSource)}</strong></li>
      <li>Monthly accrual: <strong style="color:${c.canAccrue ? "var(--ok)" : "var(--danger)"}">${c.canAccrue ? "ACTIVE" : "OFF"}</strong></li>
      <li>Opening balance: <strong style="color:${c.openingBalance ? "var(--ok)" : "var(--danger)"}">${c.openingBalance ? "SEEDED" : "NONE"}</strong></li>
      <li><a href="./leave-flags-data-flow.html">Full request &amp; approve flow →</a></li></ul>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + b.mode;
    pill.textContent = b.mode === "off" ? "Mode: Leave off" : b.mode === "classic" ? "Mode: Classic policy" : "Mode: GLOBAL policy active";
    document.getElementById("bhSummary").textContent = b.summary;
    const renderFlow = (el, steps) => {
      document.getElementById(el).innerHTML = steps.map((s, i) => {
        const st = s.state === "query" ? "query" : s.state;
        const arrow = i < steps.length - 1 ? `<span class="flow-arrow">→</span>` : "";
        return `<span class="bh-flow-step is-${st}">${esc(s.label)}</span>${arrow}`;
      }).join("");
    };
    renderFlow("bhFlowSetup", b.setupSteps);
    renderFlow("bhFlowBalance", b.balanceSteps);
    renderFlow("bhFlowScheduler", b.schedulerSteps);
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
    lastChanged = name === "moduleOff" ? "leaveManagementEnabled"
      : name === "classicOnly" ? "simGlobalPublished"
      : name === "noSchedulers" ? "scheduleAccrualEnabled"
      : name === "cutoverImport" ? "simOpeningBalance" : null;
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
