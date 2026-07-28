/* Persona navigation flags + data flow */
(function () {
  const FLAG_DEFS = [
    { id: "personaNavigationEnabled", scope: "org", group: "Org · personaNavigationAdditional", name: "Persona navigation", key: "personaNavigationEnabled",
      description: "Master org switch for persona-first sidebar.", whenOn: "Persona catalog + pagePersonaMap enforced.", whenOff: "Legacy module nav only." },
    { id: "simKillDelivery", scope: "sim", group: "Simulated org kill", name: "Disable DELIVERY persona", key: "disabledPersonas[] DELIVERY",
      description: "Org kill list entry.", whenOn: "DELIVERY hidden org-wide.", whenOff: "DELIVERY available if role allows." },
    { id: "simKillTimesheetPath", scope: "sim", group: "Simulated org kill", name: "Disable /people/timesheet path", key: "disabledPaths[]",
      description: "Path kill switch.", whenOn: "Route 404 / hidden.", whenOff: "Path follows persona map." },
    { id: "simKillProjectModule", scope: "sim", group: "Simulated org kill", name: "Disable PROJECT module", key: "disabledModules[] PROJECT",
      description: "Module kill switch.", whenOn: "Project module hidden.", whenOff: "Project module visible per role." },
    { id: "simStrictPageMap", scope: "sim", group: "Simulated pagePersonaMap", name: "Strict pagePersonaMap", key: "pagePersonaMap[/people/leaves]",
      description: "Only MANAGER on Leave page.", whenOn: "Employee persona blocked on leaves.", whenOff: "Role default personas apply." },
    { id: "roleHrmsPersonas", scope: "role", group: "Role · personaModules", name: "Allow MANAGER persona", key: "personaModules.allowedPersonas[]",
      description: "From Admin → Roles Persona access tab.", whenOn: "EMPLOYEE + MANAGER in role set.", whenOff: "EMPLOYEE only (configured mode)." },
    { id: "leavesEnabled", scope: "role", group: "Role · menu", name: "Leave menu module", key: "hrmsModules.leavesEnabled",
      description: "Module visibility flag.", whenOn: "Leave module in catalog.", whenOff: "Leave module hidden." },
    { id: "projectModulesEnabled", scope: "role", group: "Role · menu", name: "Project module", key: "projectModules.enabled",
      description: "Project module visibility.", whenOn: "Project nav available.", whenOff: "Project hidden." }
  ];

  const PRESETS = {
    production: { personaNavigationEnabled: true, simKillDelivery: false, simKillTimesheetPath: false, simKillProjectModule: false, simStrictPageMap: false, roleHrmsPersonas: true, leavesEnabled: true, projectModulesEnabled: true },
    personaOff: { personaNavigationEnabled: false, simKillDelivery: false, simKillTimesheetPath: false, simKillProjectModule: false, simStrictPageMap: false, roleHrmsPersonas: true, leavesEnabled: true, projectModulesEnabled: true },
    killDelivery: { personaNavigationEnabled: true, simKillDelivery: true, simKillTimesheetPath: false, simKillProjectModule: false, simStrictPageMap: false, roleHrmsPersonas: true, leavesEnabled: true, projectModulesEnabled: true },
    strictLeaves: { personaNavigationEnabled: true, simKillDelivery: false, simKillTimesheetPath: false, simKillProjectModule: false, simStrictPageMap: true, roleHrmsPersonas: true, leavesEnabled: true, projectModulesEnabled: true }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "personaNavigationEnabled";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ctxFrom(f) {
    const personaNav = !!f.personaNavigationEnabled;
    const killDelivery = !!f.simKillDelivery;
    const killPath = !!f.simKillTimesheetPath;
    const killProject = !!f.simKillProjectModule;
    const strictMap = !!f.simStrictPageMap;
    const roleBoth = !!f.roleHrmsPersonas;
    const leaves = !!f.leavesEnabled;
    const project = !!f.projectModulesEnabled;

    const canPersonaNav = personaNav;
    const deliveryVisible = personaNav && !killDelivery && roleBoth;
    const timesheetPath = personaNav && !killPath;
    const projectModule = personaNav && project && !killProject;
    const employeeLeaves = personaNav && leaves && (!strictMap || !roleBoth);
    const managerLeaves = personaNav && leaves && roleBoth;

    return {
      personaNav, killDelivery, killPath, killProject, strictMap, roleBoth, leaves, project,
      canPersonaNav, deliveryVisible, timesheetPath, projectModule, employeeLeaves, managerLeaves,
      mode: !personaNav ? "off" : killDelivery ? "pending" : "pending"
    };
  }

  function ctx() { return ctxFrom(state); }

  function impactDiff(prev, next) {
    const caps = (f) => {
      const c = ctxFrom(f);
      return {
        "Persona sidebar": c.canPersonaNav,
        "DELIVERY persona": c.deliveryVisible,
        "/people/timesheet route": c.timesheetPath,
        "Project module": c.projectModule,
        "Employee on Leave page": c.employeeLeaves,
        "Manager on Leave page": c.managerLeaves
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
    let summary = !c.personaNav
      ? "Persona navigation off — legacy module sidebar only."
      : c.strictMap
        ? "pagePersonaMap restricts Leave page to MANAGER persona; employees must switch persona or use alternate entry."
        : "Org kill lists + role personas merge into effective sidebar catalog.";

    const mainSteps = [
      { label: "Load org.json", state: c.personaNav ? "on" : "off" },
      { label: "Apply kills", state: c.personaNav ? "on" : "off" },
      { label: "Role personas", state: c.roleBoth ? "on" : "on" },
      { label: "Render sidebar", state: c.canPersonaNav ? "on" : "off" }
    ];
    const secondarySteps = [
      { label: "pagePersonaMap", state: c.strictMap ? "on" : "auto" },
      { label: "Leave page", state: c.managerLeaves ? "on" : c.leaves ? "off" : "off" },
      { label: "Timesheet path", state: c.timesheetPath ? "on" : "off" },
      { label: "Project module", state: c.projectModule ? "on" : "off" }
    ];
    const cards = [
      { title: "Persona nav", html: c.canPersonaNav ? `<span class="on">ON</span>` : `<span class="off">OFF</span>` },
      { title: "DELIVERY persona", html: c.deliveryVisible ? `<span class="on">Visible</span>` : `<span class="off">Killed</span>` },
      { title: "Timesheet route", html: c.timesheetPath ? `<span class="on">Allowed</span>` : `<span class="off">disabledPaths</span>` },
      { title: "Leave (employee)", html: c.employeeLeaves ? `<span class="on">Allowed</span>` : `<span class="off">Blocked</span>` }
    ];
    const matrix = [
      { cap: "Persona-first sidebar", ok: c.canPersonaNav, why: "personaNavigationEnabled" },
      { cap: "DELIVERY persona", ok: c.deliveryVisible, why: "!disabledPersonas" },
      { cap: "/people/timesheet", ok: c.timesheetPath, why: "!disabledPaths" },
      { cap: "Project module", ok: c.projectModule, why: "module + !disabledModules" },
      { cap: "Employee → Leave page", ok: c.employeeLeaves, why: c.strictMap ? "pagePersonaMap" : "role personas" },
      { cap: "Manager → Leave page", ok: c.managerLeaves, why: "role + module" }
    ];
    return { summary, mainSteps, secondarySteps, cards, matrix, mode: c.personaNav ? "pending" : "off" };
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
    const elId = `${id}-r${renderSeq}`;
    return `<div class="diagram ${dimmed ? "is-dimmed" : ""}"><div class="diagram__label">Data flow diagram</div>
      <pre class="mermaid" id="${elId}">${esc(code.trim())}</pre></div>`;
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
    let html = `<div class="callout"><strong>Org layer only</strong> — edits <code>org.json</code> → <code>personaNavigationAdditional</code>. Role allow lists live on <a href="admin-roles-flags-data-flow.html">Admin → Roles</a> (<code>personaModules</code>). Org kills always win.</div>`;
    html += `<div class="toc"><h3>Steps</h3><ol>
      <li><a href="#t1">Load personaNavigationAdditional</a></li>
      <li><a href="#t2">Apply disabledPersonas / paths / modules</a></li>
      <li><a href="#t3">Intersect role personaModules</a></li>
      <li><a href="#t4">Apply pagePersonaMap per route</a></li>
      <li><a href="#t5">Protected admin paths</a></li>
      <li><a href="#t6">Effective sidebar + route guard</a></li>
    </ol></div>`;

    html += stepOpen({ id: "t1", num: 1, title: "Load org personaNavigationAdditional", blocked: !c.personaNav, reason: "personaNavigationEnabled OFF" });
    html += `<p class="step__desc">Reads <code>modules.HRMS.configurations.personaNavigationAdditional</code> from Application Config snapshot. Master switch <code>personaNavigationEnabled</code> must be ON for persona-first sidebar.</p>
      <div class="api"><span>GET</span> /api/v2/admin/application-config/org</div>
      <table class="data"><thead><tr><th>Key</th><th>Edited on</th><th>Purpose</th></tr></thead><tbody>
      <tr><td>personaNavigationEnabled</td><td>App Config / Roles gate</td><td>Persona-first nav vs legacy modules</td></tr>
      <tr><td>disabledPersonas[]</td><td>Turn off tab</td><td>Org-wide persona kill</td></tr>
      <tr><td>pagePersonaMap</td><td>Page access tab</td><td>Per-route persona override</td></tr>
      </tbody></table>`;
    html += mermaidBlock("m1", `flowchart LR
  ORG["org.json"] --> PN["personaNavigationAdditional"]
  PN --> EN{"persona nav enabled"}
  EN -->|ON| CAT["Persona catalog"]
  EN -->|OFF| LEG["Legacy module nav"]`, !c.personaNav);
    html += stepClose();

    html += stepOpen({ id: "t2", num: 2, title: "Apply org kill lists", blocked: !c.personaNav, reason: "Persona nav off" });
    html += `<p class="step__desc"><strong>Turn off</strong> tab writes disable lists. These always override role <code>personaModules</code> and <code>pagePersonaMap</code> allow lists.</p>
      <table class="data"><thead><tr><th>Key</th><th>Sample value</th><th>Effect</th></tr></thead><tbody>
      <tr class="${c.killDelivery ? "changed" : ""}"><td>disabledPersonas</td><td>${c.killDelivery ? "DELIVERY" : "[]"}</td><td>${c.killDelivery ? "Hide delivery persona" : "No org kill"}</td></tr>
      <tr class="${c.killPath ? "changed" : ""}"><td>disabledPaths</td><td>${c.killPath ? "/people/timesheet" : "[]"}</td><td>${c.killPath ? "Route blocked" : "Paths OK"}</td></tr>
      <tr class="${c.killProject ? "changed" : ""}"><td>disabledModules</td><td>${c.killProject ? "PROJECT" : "[]"}</td><td>${c.killProject ? "Module hidden" : "Modules OK"}</td></tr>
    </tbody></table>`;
    html += stepClose();

    html += stepOpen({ id: "t3", num: 3, title: "Intersect role personaModules", blocked: !c.personaNav, reason: "Persona nav off" });
    html += `<p class="step__desc">Role allow list from <code>/admin/roles</code> → <code>personaModules.allowedPersonas</code>. Automatic mode derives personas from menu flags until explicitly saved.</p>
      <table class="data"><thead><tr><th>Source</th><th>Sample</th><th>After org kills</th></tr></thead><tbody>
      <tr class="${c.roleBoth ? "" : "changed"}"><td>role.json allowedPersonas</td><td>${c.roleBoth ? "EMPLOYEE, MANAGER" : "EMPLOYEE"}</td><td>${c.roleBoth && !c.killDelivery ? "Both in catalog" : "Reduced set"}</td></tr>
      <tr><td>Org disabledPersonas</td><td>${c.killDelivery ? "DELIVERY" : "[]"}</td><td>Subtract from switcher</td></tr>
      </tbody></table>`;
    html += mermaidBlock("m3", `flowchart LR
  ROLE["role personaModules"] --> MERGE["Intersect org catalog"]
  KILL["disabledPersonas"] --> MERGE
  MERGE --> CAT["Effective persona list"]`, !c.personaNav);
    html += stepClose();

    html += stepOpen({ id: "t4", num: 4, title: "pagePersonaMap route filter", blocked: !c.personaNav, reason: "Persona nav off" });
    html += `<p class="step__desc"><strong>Page access</strong> tab (or Roles page preview): <code>/people/leaves</code> → allowed personas: ${c.strictMap ? "MANAGER only" : "EMPLOYEE, MANAGER (product defaults)"}. Empty map entry = catalog default.</p>`;
    html += mermaidBlock("m4", `flowchart TD
  R["Leave route"] --> M{"pagePersonaMap lookup"}
  M -->|"strict map"| MGR["MANAGER only"]
  M -->|"role defaults"| BOTH["EMPLOYEE and MANAGER"]`, !c.personaNav);
    html += stepClose();

    html += stepOpen({ id: "t5", num: 5, title: "Protected admin paths", blocked: !c.personaNav, reason: "Persona nav off" });
    html += `<p class="step__desc">These routes cannot be added to <code>disabledPaths</code> — org kill attempts are ignored:</p>
      <ul class="steps-list">
        <li><code>/admin/roles</code> · <code>/admin/persona-navigation</code></li>
        <li><code>/hrms/appconfig</code> · setup checklist</li>
      </ul>`;
    html += stepClose();

    html += stepOpen({ id: "t6", num: 6, title: "Effective navigation result", blocked: false });
    html += `<div class="callout callout--warn"><strong>Evaluation order</strong> role menu → role <code>personaModules</code> → org <code>pagePersonaMap</code> → org disable lists.</div>
      <ul class="steps-list">
      <li>Timesheet path: <strong style="color:${c.timesheetPath ? "var(--ok)" : "var(--danger)"}">${c.timesheetPath ? "VISIBLE" : "BLOCKED"}</strong></li>
      <li>Leave page (employee persona): <strong style="color:${c.employeeLeaves ? "var(--ok)" : "var(--danger)"}">${c.employeeLeaves ? "ALLOWED" : "BLOCKED"}</strong></li>
      <li>Project module: <strong style="color:${c.projectModule ? "var(--ok)" : "var(--danger)"}">${c.projectModule ? "ON" : "OFF"}</strong></li>
    </ul>
    <div class="link-box"><strong>Related</strong><br/><a href="../hrms/persona-navigation.html">Persona navigation screen guide</a> · <a href="admin-roles-flags-data-flow.html">Roles simulator</a> · <a href="../hrms/application-config.html#cfg-personaNavigationAdditional">Application config keys</a></div>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + (b.mode === "off" ? "off" : "pending");
    pill.textContent = b.mode === "off" ? "Mode: Legacy nav" : "Mode: Persona-first";
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
    try {
      await window.__mermaid.run({ nodes: document.querySelectorAll("#tabDataflow .mermaid") });
    } catch (e) {
      console.warn("mermaid", e);
    }
    if (seq !== renderSeq) runMermaid(renderSeq);
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
