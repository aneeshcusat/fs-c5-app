/* Admin roles & personaModules flags + data flow */
(function () {
  const FLAG_DEFS = [
    { id: "rbacAdminEnabled", scope: "org", group: "Org · RBAC gate", name: "RBAC admin UI", key: "rbacAdminEnabled",
      description: "Org master switch for dedicated Admin surfaces.", whenOn: "/admin/roles route registered.", whenOff: "Use legacy App Config role editor only." },
    { id: "rolesEnabled", scope: "role", group: "Role · adminModules", name: "Roles module access", key: "adminModules.rolesEnabled",
      description: "Current admin role may open Roles.", whenOn: "Persona-first Roles UI available.", whenOff: "403 / hidden for this admin." },
    { id: "personaNavigationEnabled", scope: "org", group: "Org · runtime", name: "Persona navigation", key: "personaNavigationEnabled",
      description: "Persona-first sidebar at runtime.", whenOn: "personaModules + org map enforced.", whenOff: "Legacy module sidebar." },
    { id: "simAutomaticPersonas", scope: "role", group: "Role · personaModules", name: "Automatic persona mode", key: "(allowedPersonas never saved)",
      description: "Roles UI shows Automatic — no explicit list persisted.", whenOn: "Heuristic from hrmsModules menu flags.", whenOff: "Explicit allowedPersonas[] in role.json." },
    { id: "simAllowedBothPersonas", scope: "role", group: "Role · personaModules", name: "Allow MANAGER persona", key: "personaModules.allowedPersonas[]",
      description: "MANAGER in configured allow list.", whenOn: "EMPLOYEE + MANAGER in switcher.", whenOff: "EMPLOYEE only." },
    { id: "personaSwitchEnabled", scope: "role", group: "Role · personaModules", name: "Persona switcher", key: "personaModules.personaSwitchEnabled",
      description: "Header persona dropdown.", whenOn: "User may switch allowed personas.", whenOff: "Locked to defaultPersona." },
    { id: "simDefaultManager", scope: "role", group: "Role · personaModules", name: "Default MANAGER", key: "personaModules.defaultPersona",
      description: "Landing persona after login refresh.", whenOn: "Opens as MANAGER.", whenOff: "Opens as EMPLOYEE." },
    { id: "leavesEnabled", scope: "role", group: "Role · menu flags", name: "Leave module visible", key: "hrmsModules.leavesEnabled",
      description: "Menu + Automatic heuristic input.", whenOn: "Leave nav on; MANAGER hint in automatic.", whenOff: "Leave module hidden." },
    { id: "simPageMapStrict", scope: "sim", group: "Simulated org write", name: "Roles page-map preview", key: "pagePersonaMap from Roles UI",
      description: "Page preview on Roles writes shared org map.", whenOn: "Leave route MANAGER-only override.", whenOff: "Product catalog defaults." },
    { id: "simOrgKillManager", scope: "sim", group: "Simulated org override", name: "Org kill MANAGER", key: "disabledPersonas[] MANAGER",
      description: "Kill switch from Persona navigation Turn off tab.", whenOn: "MANAGER persona hidden org-wide.", whenOff: "Role allow list applies." }
  ];

  const PRESETS = {
    production: { rbacAdminEnabled: true, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: false, simAllowedBothPersonas: true, personaSwitchEnabled: true, simDefaultManager: false, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false },
    managerPilot: { rbacAdminEnabled: true, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: false, simAllowedBothPersonas: true, personaSwitchEnabled: true, simDefaultManager: true, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false },
    employeeOnly: { rbacAdminEnabled: true, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: false, simAllowedBothPersonas: false, personaSwitchEnabled: true, simDefaultManager: false, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false },
    automaticMode: { rbacAdminEnabled: true, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: true, simAllowedBothPersonas: false, personaSwitchEnabled: true, simDefaultManager: false, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false },
    switcherOff: { rbacAdminEnabled: true, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: false, simAllowedBothPersonas: true, personaSwitchEnabled: false, simDefaultManager: false, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false },
    rbacOff: { rbacAdminEnabled: false, rolesEnabled: true, personaNavigationEnabled: true, simAutomaticPersonas: false, simAllowedBothPersonas: true, personaSwitchEnabled: true, simDefaultManager: false, leavesEnabled: true, simPageMapStrict: false, simOrgKillManager: false }
  };

  let state = { ...PRESETS.production };
  let prevState = { ...state };
  let lastChanged = null;
  let selectedFlagId = "simAllowedBothPersonas";
  let renderSeq = 0;
  let mermaidReady = false;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ctxFrom(f) {
    const routeOpen = !!f.rbacAdminEnabled && !!f.rolesEnabled;
    const personaNav = !!f.personaNavigationEnabled;
    const automatic = !!f.simAutomaticPersonas;
    const explicitBoth = !!f.simAllowedBothPersonas;
    const switcher = !!f.personaSwitchEnabled;
    const defaultMgr = !!f.simDefaultManager;
    const leaves = !!f.leavesEnabled;
    const strictMap = !!f.simPageMapStrict;
    const orgKillMgr = !!f.simOrgKillManager;

    const managerInRole = !orgKillMgr && (automatic ? leaves : explicitBoth);
    const employeeInRole = !orgKillMgr;
    const switcherVisible = routeOpen && personaNav && switcher && managerInRole;
    const employeeLeaves = personaNav && leaves && employeeInRole && !strictMap;
    const managerLeaves = personaNav && leaves && managerInRole;
    const personaMode = automatic ? "automatic" : "configured";

    return {
      routeOpen, personaNav, automatic, explicitBoth, switcher, defaultMgr, leaves, strictMap, orgKillMgr,
      managerInRole, employeeInRole, switcherVisible, employeeLeaves, managerLeaves, personaMode
    };
  }

  function ctx() { return ctxFrom(state); }

  function computeBehavior(f) {
    const c = ctxFrom(f);
    let summary = !c.routeOpen
      ? "Roles UI gated — edit role.json via Application Config or enable rbacAdminEnabled."
      : c.automatic
        ? "Automatic personaModules — allow list derived from menu flags until you Save explicit personas."
        : c.orgKillMgr
          ? "Org disabledPersonas overrides role allow list — MANAGER hidden org-wide."
          : "Role personaModules saved — merged with org pagePersonaMap then org kill lists.";

    const mainSteps = [
      { label: "Gate route", state: c.routeOpen ? "on" : "off" },
      { label: "Load role.json", state: c.routeOpen ? "on" : "off" },
      { label: "personaModules", state: c.automatic ? "auto" : "on" },
      { label: "Role Bar assign", state: c.routeOpen ? "on" : "off" },
      { label: "User login refresh", state: c.personaNav ? "on" : "off" }
    ];
    const secondarySteps = [
      { label: "Switcher", state: c.switcherVisible ? "on" : "off" },
      { label: "Default persona", state: c.defaultMgr ? "on" : "auto" },
      { label: "pagePersonaMap", state: c.strictMap ? "on" : "auto" },
      { label: "Org kills", state: c.orgKillMgr ? "off" : "auto" }
    ];
    const cards = [
      { title: "Roles UI", html: c.routeOpen ? `<span class="on">OPEN</span>` : `<span class="off">GATED</span>` },
      { title: "Persona mode", html: c.automatic ? `<span class="auto">Automatic</span>` : `<span class="on">Configured</span>` },
      { title: "MANAGER persona", html: c.managerInRole ? `<span class="on">Allowed</span>` : `<span class="off">Blocked</span>` },
      { title: "Leave page (employee)", html: c.employeeLeaves ? `<span class="on">Allowed</span>` : `<span class="off">Blocked</span>` }
    ];
    const matrix = [
      { cap: "/admin/roles route", ok: c.routeOpen, why: "rbacAdminEnabled + rolesEnabled" },
      { cap: "Persona switcher", ok: c.switcherVisible, why: "personaSwitchEnabled + 2 personas" },
      { cap: "MANAGER in catalog", ok: c.managerInRole, why: c.automatic ? "Automatic heuristic" : "allowedPersonas[]" },
      { cap: "Employee on Leave page", ok: c.employeeLeaves, why: c.strictMap ? "pagePersonaMap" : "role + map" },
      { cap: "Manager on Leave page", ok: c.managerLeaves, why: "role personas + module" },
      { cap: "Org kill wins", ok: !c.orgKillMgr || !c.managerInRole, why: "disabledPersonas last" }
    ];
    const mode = !c.routeOpen ? "off" : c.automatic ? "auto" : "pending";
    return { summary, mainSteps, secondarySteps, cards, matrix, mode };
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
    let html = `<div class="callout"><strong>Route</strong> <code>/admin/roles</code> · writes <code>role.json</code> → HRMS → <code>personaModules</code>. Page preview toggles also update org <code>pagePersonaMap</code> (shared with Persona navigation).</div>`;
    html += `<div class="toc"><h3>Steps</h3><ol>
      <li><a href="#t1">Gate Roles &amp; permissions route</a></li>
      <li><a href="#t2">Load role template from Application Config</a></li>
      <li><a href="#t3">Edit personaModules (Persona access tab)</a></li>
      <li><a href="#t4">Optional pagePersonaMap write from Roles</a></li>
      <li><a href="#t5">Org unit Role Bar → user session</a></li>
      <li><a href="#t6">Effective access after org overrides</a></li>
    </ol></div>`;

    html += stepOpen({ id: "t1", num: 1, title: "Gate /admin/roles route", blocked: !c.routeOpen, reason: "rbacAdminEnabled OFF or rolesEnabled OFF" });
    html += `<p class="step__desc">Dedicated Roles UI requires org <code>rbacAdminEnabled</code> and the editing admin role must have <code>adminModules.rolesEnabled</code>.</p>
      <div class="api"><span>GET</span> /admin/roles</div>`;
    html += mermaidBlock("m1", `flowchart LR
  ORG["org rbacAdminEnabled"] --> GATE{"Route open?"}
  ROLE["adminModules.rolesEnabled"] --> GATE
  GATE -->|yes| UI["Roles and permissions UI"]
  GATE -->|no| LEG["App Config role editor only"]`, !c.routeOpen);
    html += stepClose();

    html += stepOpen({ id: "t2", num: 2, title: "Load role template", blocked: !c.routeOpen, reason: "Route gated" });
    html += `<p class="step__desc">Select a role template (Site Admin, Manager, …). Backend loads merged <code>role.json</code> for the org unit being edited.</p>
      <div class="api"><span>GET</span> /api/v2/admin/application-config/role</div>
      <table class="data"><thead><tr><th>role_id</th><th>template</th><th>personaModules saved?</th></tr></thead>
      <tbody><tr><td>ROLE-MGR</td><td>Manager</td><td>${c.automatic ? "Automatic (unset)" : "Explicit allow list"}</td></tr></tbody></table>`;
    html += stepClose();

    html += stepOpen({ id: "t3", num: 3, title: "Edit personaModules", blocked: !c.routeOpen, reason: "Route gated" });
    html += `<p class="step__desc">Persona access tab — not the Advanced CRUD matrix. Site Admin seed: all personas, <code>defaultPersona: ADMIN</code>, switcher on.</p>
      <table class="data"><thead><tr><th>Key</th><th>Sample value</th><th>Effect</th></tr></thead><tbody>
      <tr class="${c.automatic ? "changed" : ""}"><td>allowedPersonas</td><td>${c.automatic ? "(Automatic)" : c.explicitBoth ? "EMPLOYEE, MANAGER" : "EMPLOYEE"}</td><td>${c.automatic ? "Heuristic from menu flags" : "Explicit switcher catalog"}</td></tr>
      <tr class="${c.defaultMgr ? "changed" : ""}"><td>defaultPersona</td><td>${c.defaultMgr ? "MANAGER" : "EMPLOYEE"}</td><td>Login landing persona</td></tr>
      <tr class="${!c.switcher ? "changed" : ""}"><td>personaSwitchEnabled</td><td>${c.switcher ? "true" : "false"}</td><td>${c.switcher ? "Header switcher" : "Locked persona"}</td></tr>
      </tbody></table>`;
    html += mermaidBlock("m3", `flowchart TD
  TAB["Persona access tab"] --> MODE{"Automatic?"}
  MODE -->|yes| HEU["Menu flag heuristic"]
  MODE -->|no| LIST["allowedPersonas array"]
  HEU --> SAVE["Save role.json"]
  LIST --> SAVE`, !c.routeOpen);
    html += stepClose();

    html += stepOpen({ id: "t4", num: 4, title: "Optional pagePersonaMap write", blocked: !c.routeOpen || !c.personaNav, reason: !c.routeOpen ? "Route gated" : "personaNavigationEnabled OFF" });
    html += `<p class="step__desc">Roles page preview can write the same org <code>pagePersonaMap</code> entry as Persona navigation → Page access. Example: Leave route ${c.strictMap ? "MANAGER only" : "catalog defaults"}.</p>`;
    html += mermaidBlock("m4", `flowchart LR
  PREV["Roles page preview"] --> MAP["org pagePersonaMap"]
  MAP --> GUARD["Route guard at runtime"]`, !c.routeOpen || !c.personaNav);
    html += stepClose();

    html += stepOpen({ id: "t5", num: 5, title: "Role Bar assignment → user session", blocked: !c.routeOpen, reason: "Route gated" });
    html += `<p class="step__desc">Roles attach to <strong>org units</strong> via <code>ApplicationConfigRoleBar</code> — not user records. Users inherit via team membership. Re-login refreshes encrypted access payload.</p>
      <ul class="steps-list">
        <li>Org unit → role template mapping saved</li>
        <li>User login → personaModules merged into session</li>
        <li>Switcher catalog = allow list ∩ org catalog</li>
      </ul>`;
    html += stepClose();

    html += stepOpen({ id: "t6", num: 6, title: "Effective access (evaluation order)", blocked: false });
    html += `<div class="callout callout--warn"><strong>Order</strong> role menu flags → role <code>personaModules</code> → org <code>pagePersonaMap</code> → org <code>disabledPersonas</code> / paths / modules (always win).</div>
      <ul class="steps-list">
        <li>MANAGER persona: <strong style="color:${c.managerInRole ? "var(--ok)" : "var(--danger)"}">${c.managerInRole ? "IN SWITCHER" : "KILLED / NOT ALLOWED"}</strong></li>
        <li>Persona switcher: <strong style="color:${c.switcherVisible ? "var(--ok)" : "var(--danger)"}">${c.switcherVisible ? "VISIBLE" : "HIDDEN"}</strong></li>
        <li>Employee on Leave page: <strong style="color:${c.employeeLeaves ? "var(--ok)" : "var(--danger)"}">${c.employeeLeaves ? "ALLOWED" : "BLOCKED"}</strong></li>
      </ul>
      <div class="link-box"><strong>Related</strong><br/>
        <a href="../hrms/roles-permissions.html">Roles screen guide</a> ·
        <a href="../hrms/application-config.html#access-personaModules">personaModules keys</a> ·
        <a href="persona-navigation-flags-data-flow.html">Persona navigation simulator</a></div>`;
    html += stepClose();

    document.getElementById("docPanel").innerHTML = html;
    runMermaid(seq);
  }

  function renderBehavior() {
    const b = computeBehavior(state);
    const pill = document.getElementById("bhModePill");
    pill.className = "mode-pill mode-pill--" + (b.mode === "off" ? "off" : b.mode === "auto" ? "auto" : "pending");
    pill.textContent = b.mode === "off" ? "Mode: Route gated" : b.mode === "auto" ? "Mode: Automatic personas" : "Mode: Configured role";
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
