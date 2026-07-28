/* Working day resolver flags + data flow (shift policies + holidays + leave day count) */
(function () {
  const FLAG_DEFS = [
    { id: "shiftPoliciesEnabled", scope: "org", group: "Org · shift", name: "Shift policies", key: "shiftPoliciesEnabled",
      description: "Org uses shift policy registry.", whenOn: "Employee shift assignment resolved.", whenOff: "Fallback Mon–Fri default." },
    { id: "globalLeavePoliciesEnabled", scope: "org", group: "Org · leave", name: "Global leave policies", key: "globalLeavePoliciesEnabled",
      description: "GLP jurisdiction calendars.", whenOn: "Jurisdiction holiday set used.", whenOff: "Classic holiday list." },
    { id: "leaveBlockNonWorkingDayLeave", scope: "org", group: "Org · leaveAdditional", name: "Block non-working days", key: "leaveBlockNonWorkingDayLeave",
      description: "Reject leave on weekends/holidays.", whenOn: "WDR must mark working day.", whenOff: "Calendar dates allowed." },
    { id: "leaveManagementEnabled", scope: "org", group: "Org · leave", name: "Leave management", key: "leaveManagementEnabled",
      description: "Master leave switch.", whenOn: "Apply/submit runs WDR.", whenOff: "Leave off." },
    { id: "simShiftAssigned", scope: "sim", group: "Simulated employee", name: "Shift policy assigned", key: "fs_employee_shift_policy",
      description: "Rahul on 5-day shift.", whenOn: "Sat/Sun non-working.", whenOff: "Mon–Fri default only." },
    { id: "simHolidayHit", scope: "sim", group: "Simulated calendar", name: "Holiday on range", key: "fs_holiday_model",
      description: "Independence Day in range.", whenOn: "Date excluded from count.", whenOff: "No holiday row." },
    { id: "simJurisdiction", scope: "sim", group: "Simulated calendar", name: "Jurisdiction match", key: "ts_leave_jurisdiction",
      description: "Employee IN jurisdiction.", whenOn: "Legal calendar applied.", whenOff: "Org default calendar." }
  ];

  const PRESETS = {
    production: { shiftPoliciesEnabled: true, globalLeavePoliciesEnabled: true, leaveBlockNonWorkingDayLeave: true, leaveManagementEnabled: true, simShiftAssigned: true, simHolidayHit: true, simJurisdiction: true },
    noShift: { shiftPoliciesEnabled: false, globalLeavePoliciesEnabled: true, leaveBlockNonWorkingDayLeave: true, leaveManagementEnabled: true, simShiftAssigned: false, simHolidayHit: true, simJurisdiction: true },
    permissive: { shiftPoliciesEnabled: true, globalLeavePoliciesEnabled: false, leaveBlockNonWorkingDayLeave: false, leaveManagementEnabled: true, simShiftAssigned: true, simHolidayHit: true, simJurisdiction: false },
    leaveOff: { shiftPoliciesEnabled: true, globalLeavePoliciesEnabled: true, leaveBlockNonWorkingDayLeave: true, leaveManagementEnabled: false, simShiftAssigned: true, simHolidayHit: false, simJurisdiction: true }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "leaveBlockNonWorkingDayLeave";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ctxFrom(f) {
    const shiftOn = !!f.shiftPoliciesEnabled;
    const glp = !!f.globalLeavePoliciesEnabled;
    const blockNW = !!f.leaveBlockNonWorkingDayLeave;
    const leaveOn = !!f.leaveManagementEnabled;
    const assigned = !!f.simShiftAssigned;
    const holiday = !!f.simHolidayHit;
    const jurisdiction = !!f.simJurisdiction;

    const wdrActive = leaveOn;
    const usesShift = shiftOn && assigned;
    const usesJurisdiction = glp && jurisdiction;
    const friBlocked = blockNW && usesShift;
    const holidayExcluded = holiday && blockNW;

    const workingDaysInRange = leaveOn ? (holidayExcluded ? 3 : 4) : 0;
    const submitOk = leaveOn && (!blockNW || workingDaysInRange > 0);

    return {
      shiftOn, glp, blockNW, leaveOn, assigned, holiday, jurisdiction,
      wdrActive, usesShift, usesJurisdiction, friBlocked, holidayExcluded, workingDaysInRange, submitOk,
      mode: !leaveOn ? "off" : blockNW ? "pending" : "auto"
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "WDR on apply": c.wdrActive,
        "Shift policy in chain": c.usesShift,
        "Jurisdiction calendar": c.usesJurisdiction,
        "Block Fri (weekend)": c.friBlocked,
        "Exclude holiday": c.holidayExcluded,
        "Submit allowed": c.submitOk
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
      ? "Leave management off — WDR not invoked."
      : c.blockNW
        ? `Working-day resolver returns ${c.workingDaysInRange} day(s) in sample range; non-working dates blocked on submit.`
        : "Non-working day block off — calendar dates count even on weekends/holidays.";

    const mainSteps = [
      { label: "Resolve shift", state: c.usesShift ? "on" : c.shiftOn ? "auto" : "off" },
      { label: "Load holidays", state: c.holiday ? "on" : "off" },
      { label: "WDR chain", state: c.wdrActive ? "on" : "off" },
      { label: "Day count", state: c.leaveOn ? "on" : "off" }
    ];
    const secondarySteps = [
      { label: "Jurisdiction", state: c.usesJurisdiction ? "on" : "auto" },
      { label: "Block NW", state: c.blockNW ? "on" : "off" },
      { label: "Submit", state: c.submitOk ? "on" : "off" }
    ];
    const cards = [
      { title: "Working days", html: `<span class="on">${c.workingDaysInRange}</span> in sample Mon–Fri+holiday range` },
      { title: "Shift policy", html: c.usesShift ? `<span class="on">Assigned</span>` : `<span class="off">Default Mon–Fri</span>` },
      { title: "Holiday skip", html: c.holidayExcluded ? `<span class="on">Excluded</span>` : `<span class="off">Counted</span>` },
      { title: "Submit", html: c.submitOk ? `<span class="on">Allowed</span>` : `<span class="off">Validation error</span>` }
    ];
    const matrix = [
      { cap: "Leave apply uses WDR", ok: c.wdrActive, why: "leaveManagementEnabled" },
      { cap: "Shift in resolver chain", ok: c.usesShift, why: "shiftPolicies + assignment" },
      { cap: "Jurisdiction calendar", ok: c.usesJurisdiction, why: "GLP + match" },
      { cap: "Block weekend leave", ok: c.friBlocked, why: "leaveBlockNonWorkingDayLeave" },
      { cap: "Holiday excluded from count", ok: c.holidayExcluded, why: "fs_holiday_model" },
      { cap: "Submit succeeds", ok: c.submitOk, why: "validation" }
    ];
    return { summary, mainSteps, secondarySteps, cards, matrix, mode: c.mode };
  }

  function mermaidBlock(id, code, dimmed) {
    return `<div class="diagram ${dimmed ? "is-dimmed" : ""}"><div class="diagram__label">WDR chain</div>
      <pre class="mermaid" id="${id}">${esc(code.trim())}</pre></div>`;
  }

  function stepOpen(opts) {
    const { id, num, title, blocked, reason } = opts;
    return `<section class="step ${blocked ? "is-blocked" : ""}" id="${id}">
      <div class="step__head"><span class="step__num">${esc(String(num))}</span><h3>${title}</h3></div>
      <div class="block-reason"><strong>Why blocked</strong> ${reason || ""}</div><div class="step__body">`;
  }
  function stepClose() { return `</div></section>`; }

  function renderDoc() {
    const seq = ++renderSeq;
    const c = ctx();
    let html = `<div class="callout callout--warn"><strong>Sample range</strong> Mon 14 – Fri 18 Jul 2026 with one public holiday Wed 16.</div>`;

    html += stepOpen({ id: "t1", num: 1, title: "Resolve employee shift assignment", blocked: !c.leaveOn, reason: "leaveManagementEnabled OFF" });
    html += `<p class="step__desc">Reads <code>fs_employee_shift_policy</code> when <code>shiftPoliciesEnabled</code> is on.</p>
      <table class="data"><thead><tr><th>employee_id</th><th>shift_policy_id</th><th>work_days</th></tr></thead>
      <tbody><tr><td>200</td><td>${c.usesShift ? "SP-5DAY" : "—"}</td><td>${c.usesShift ? "Mon–Fri" : "Default Mon–Fri"}</td></tr></tbody></table>`;
    html += stepClose();

    html += stepOpen({ id: "t2", num: 2, title: "Load holiday + jurisdiction calendars", blocked: !c.leaveOn, reason: "Leave off" });
    html += `<div class="table-map">
      <span class="pill pill--core">fs_holiday_model</span>
      <span class="pill pill--stage">ts_leave_jurisdiction</span>
      <span class="pill">fs_schedule_model</span>
    </div>`;
    html += mermaidBlock("m2", `flowchart TD
  E["Employee 200"] --> J{"Jurisdiction?"}
  J -->|yes| LC["Legal calendar"]
  J -->|no| OC["Org calendar"]
  LC --> H["Merge fs_holiday_model"]
  OC --> H`, !c.leaveOn);
    html += stepClose();

    html += stepOpen({ id: "t3", num: 3, title: "Working day resolver chain", blocked: !c.leaveOn, reason: "Leave off" });
    html += mermaidBlock("m3", `flowchart LR
  O["Override"] --> JU["Jurisdiction WDR"]
  JU --> TM["Team WDR"]
  TM --> SH["Shift policy"]
  SH --> DEF["Mon–Fri default"]`, !c.leaveOn);
    html += stepClose();

    html += stepOpen({ id: "t4", num: 4, title: "Leave apply day count", blocked: !c.leaveOn, reason: "Leave off" });
    html += `<p class="step__desc">LeaveService counts only working days when <code>leaveBlockNonWorkingDayLeave</code> is ON.</p>
      <table class="data"><thead><tr><th>Date</th><th>Working?</th><th>Counted</th></tr></thead><tbody>
      <tr><td>Mon 14</td><td>Yes</td><td class="hl">1</td></tr>
      <tr><td>Tue 15</td><td>Yes</td><td class="hl">1</td></tr>
      <tr class="${c.holidayExcluded ? "changed" : ""}"><td>Wed 16</td><td>${c.holidayExcluded ? "Holiday" : "Yes"}</td><td>${c.holidayExcluded ? "0" : "1"}</td></tr>
      <tr><td>Thu 17</td><td>Yes</td><td class="hl">1</td></tr>
      <tr><td>Fri 18</td><td>Yes</td><td class="hl">1</td></tr>
      </tbody></table>
      <p class="delta"><strong>Total days:</strong> ${c.workingDaysInRange}</p>`;
    html += stepClose();

    html += stepOpen({ id: "t5", num: 5, title: "Submit validation", blocked: !c.submitOk, reason: "Non-working day in range with block flag ON" });
    html += `<div class="api ${!c.submitOk ? "is-blocked" : ""}"><span>POST</span> /api/v2/hrms/leave/submit</div>
      <div class="link-box"><strong>Continue in leave request simulator</strong><br/><a href="./leave-flags-data-flow.html">Leave request &amp; approve data flow →</a></div>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + (b.mode === "off" ? "off" : b.mode === "auto" ? "auto" : "pending");
    pill.textContent = b.mode === "off" ? "Mode: Leave off" : b.mode === "auto" ? "Mode: Permissive" : "Mode: Strict WDR";
    document.getElementById("bhSummary").textContent = b.summary;
    const renderFlow = (el, steps) => {
      document.getElementById(el).innerHTML = steps.map((s, i) => {
        const arrow = i < steps.length - 1 ? `<span class="flow-arrow">→</span>` : "";
        return `<span class="bh-flow-step is-${s.state}">${esc(s.label)}</span>${arrow}`;
      }).join("");
    };
    renderFlow("bhFlowMain", b.mainSteps);
    renderFlow("bhFlowSecondary", b.secondarySteps);
    document.getElementById("bhCards").innerHTML = b.cards.map((card) =>
      `<div class="bh-card"><div class="bh-card__title">${esc(card.title)}</div><p class="bh-card__body">${card.html}</p></div>`
    ).join("");
    document.getElementById("bhMatrixBody").innerHTML = b.matrix.map((row) =>
      `<tr><td>${esc(row.cap)}</td><td class="${row.ok ? "yes" : "no"}">${row.ok ? "YES" : "NO"}</td><td>${esc(row.why)}</td></tr>`
    ).join("");
    document.getElementById("bhChangeBanner").className = "change-banner";
    document.getElementById("bhDiffList").innerHTML = "";
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
    document.querySelectorAll(".right-tabs__btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.tab === tabId));
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
    prevState = { ...state }; state = { ...PRESETS[name] }; lastChanged = null;
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
