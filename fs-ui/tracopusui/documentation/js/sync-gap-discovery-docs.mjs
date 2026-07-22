/**
 * Merges final gap-discovery use cases (549) and GD01–GD16 tests (8784)
 * into the live documentation catalog + test plan data files.
 *
 * Run from repo root or this folder:
 *   node fui/public/documentation/js/sync-gap-discovery-docs.mjs
 *
 * Re-run after generate-use-case-catalog.mjs / generate-test-plan.mjs so page
 * docs stay, then gap-discovery UCs/tests are appended.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(__dirname, "../../../..");
const REVIEW_DIR = path.join(
  REPO_ROOT,
  "docs/final-gap-discovery-review-plan/final-gap-discovery-review"
);
const CSV_PATH = path.join(REVIEW_DIR, "03-use-case-test-case-gap-matrix.csv");
const RESULTS_PATH = path.join(REVIEW_DIR, "_review_results.json");
const EVIDENCE_DIR = path.join(REVIEW_DIR, "evidence");

const CATALOG_OUT = path.join(__dirname, "use-case-catalog-data.js");
const TEST_OUT = path.join(__dirname, "test-plan-data.js");

const GD_META = {
  GD01: { name: "Feature inventory", type: "verification", priority: "P0" },
  GD02: { name: "Industry-standard expectation", type: "verification", priority: "P1" },
  GD03: { name: "UI implementation", type: "functional", priority: "P0" },
  GD04: { name: "Frontend integration", type: "functional", priority: "P0" },
  GD05: { name: "Backend implementation", type: "functional", priority: "P0" },
  GD06: { name: "Persistence / readback", type: "verification", priority: "P0" },
  GD07: { name: "RBAC / persona denial", type: "permission", priority: "P0" },
  GD08: { name: "Workflow transitions", type: "functional", priority: "P0" },
  GD09: { name: "Negative / concurrency", type: "negative", priority: "P1" },
  GD10: { name: "Audit trail", type: "verification", priority: "P0" },
  GD11: { name: "Notification / downstream", type: "functional", priority: "P1" },
  GD12: { name: "Reporting / search / AI masking", type: "functional", priority: "P1" },
  GD13: { name: "Mobile / PWA parity", type: "functional", priority: "P2" },
  GD14: { name: "NFR / usability", type: "verification", priority: "P2" },
  GD15: { name: "Automated tests", type: "verification", priority: "P1" },
  GD16: { name: "Claim alignment", type: "verification", priority: "P0" },
};

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cols = splitCsvLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] != null ? cols[i] : "";
    });
    return row;
  });
}

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQ = !inQ;
      }
    } else if (c === "," && !inQ) {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function loadJsonLiteral(filePath, assignName) {
  const content = fs.readFileSync(filePath, "utf8");
  const re = new RegExp(
    `window\\.${assignName}\\s*=\\s*(\\[[\\s\\S]*?\\]);\\s*(?:\\n|/\\*|$)`
  );
  // Prefer last large array for catalog; for test plan file has two assigns
  if (assignName === "TRACOPUS_USE_CASE_CATALOG") {
    const m = content.match(/window\.TRACOPUS_USE_CASE_CATALOG\s*=\s*(\[[\s\S]*\]);?\s*$/);
    if (!m) throw new Error("Could not parse " + assignName);
    return JSON.parse(m[1]);
  }
  if (assignName === "TRACOPUS_TEST_PLAN") {
    const m = content.match(
      /window\.TRACOPUS_TEST_PLAN\s*=\s*(\[[\s\S]*?\]);\s*\n\s*\/\*\*/
    );
    if (m) return JSON.parse(m[1]);
    const m2 = content.match(/window\.TRACOPUS_TEST_PLAN\s*=\s*(\[[\s\S]*\]);/);
    if (!m2) throw new Error("Could not parse TRACOPUS_TEST_PLAN");
    return JSON.parse(m2[1]);
  }
  throw new Error(assignName);
}

function mapVerificationStatus(status) {
  if (status === "PASS") return "LIVE_BACKEND_VERIFIED";
  if (status === "DEFERRED_NOT_HIDDEN") return "DEFERRED_NOT_HIDDEN";
  return "PARTIAL";
}

function mapDisposition(status) {
  if (status === "DEFERRED_NOT_HIDDEN") return "OUT_OF_SCOPE";
  if (status === "PASS") return "SHIPPED";
  return "READY_FOR_VALIDATION";
}

function gdKey(testCaseId) {
  const m = String(testCaseId).match(/-(GD\d{2})$/);
  return m ? m[1] : "GD01";
}

function readEvidenceBlocked(ucId) {
  const p = path.join(EVIDENCE_DIR, ucId + ".md");
  if (!fs.existsSync(p)) return [];
  const text = fs.readFileSync(p, "utf8");
  const blocked = [];
  const section = text.match(/## PASS blocked until\n([\s\S]*?)(?:\n\*\*|$)/);
  if (section) {
    section[1].split("\n").forEach((line) => {
      const m = line.match(/^\d+\.\s+(.+)/);
      if (m) blocked.push(m[1].trim());
    });
  }
  return blocked;
}

function buildGapUseCase(uc, sampleRow) {
  const status = uc.status;
  const gaps = uc.gaps || [];
  const blocked = readEvidenceBlocked(uc.id);
  const verification = [
    "Review status: " + status + " — PASS requires staging live entity/audit IDs + wrong-persona denial + reload.",
    "Gap types: " + (gaps.length ? gaps.join(", ") : "none listed"),
    "Source: " + (uc.source || sampleRow.source || "Final gap discovery"),
    "Scope: " + (uc.scope_status || sampleRow.scope_status || ""),
  ].concat(blocked.map((b) => "PASS blocked until: " + b));

  const pageStatus =
    status === "DEFERRED_NOT_HIDDEN" ? "Planned" : status === "PASS" ? "Shipped" : "Shipped";

  return {
    id: uc.id,
    module: uc.module,
    route: "use-case:" + uc.id,
    pageName: uc.name,
    feature: uc.priority || sampleRow.priority || "Existing",
    status: pageStatus,
    overview:
      uc.name +
      " — final gap discovery status **" +
      status +
      "**. " +
      (uc.rationale || "Staging PASS not proven."),
    scenarios: [
      {
        title: uc.id + " happy path",
        description: "Execute the business flow end-to-end and capture live entity + audit IDs.",
      },
      {
        title: uc.id + " wrong-persona denial",
        description: "Confirm RBAC denies unauthorized personas at API and UI.",
      },
    ],
    howToCreate: [
      "1. Confirm Application Config / org-role flags for this module are enabled for the test tenant.",
      "2. Seed canonical prerequisites (Employee, Project, Task, PO as required by the flow).",
      "3. Do not create isolated shadow tables — use protected cores and approved ts_* enhancement tables only.",
    ],
    howToUse: [
      "1. Sign in as the intended persona for " + uc.id + ".",
      "2. Navigate to the feature surface for module: " + uc.module + ".",
      "3. Execute the use case: " + uc.name + ".",
      "4. Capture live entity ID, reload/readback, audit row, and wrong-persona denial evidence.",
      "5. Attach evidence under docs/final-gap-discovery-review-plan/final-gap-discovery-review/evidence/" +
        uc.id +
        ".md before claiming PASS.",
    ],
    whyToUse:
      "Business capability in the Tracopus master register. Status is not PASS until staging proof is attached.",
    whoCanUse: {
      summary: "Personas permitted by Application Config role.json for module " + uc.module + ".",
      personas: [],
      roles: "See role.json / ApprovalAuthority for this module",
      permissions: ["Module flag enabled", "Wrong personas must be denied"],
      prerequisites: [
        "Staging tenant with seeded canonical data",
        "Evidence pack path for " + uc.id,
      ],
    },
    whenToUse: {
      summary: "Whenever this business capability is exercised in production workflows or UAT.",
      triggers: ["User needs: " + uc.name],
      cadence: "Per business process",
      examples: [],
    },
    whereToUse: {
      navigation: "Module: **" + uc.module + "** (see app sidebar / route map inventory)",
      route: "use-case:" + uc.id,
      relatedPages: [],
      deepLinks: [],
      moduleContext: uc.module,
    },
    implementationNotes:
      "Gap discovery review: " +
      status +
      ". " +
      (uc.rationale || "") +
      " Do not treat READY_FOR_VALIDATION or CONDITIONAL exit as PASS. Evidence: evidence/" +
      uc.id +
      ".md",
    featureFlags: "Application Config org.json / role.json for " + uc.module,
    relatedServices: "Canonical services for " + uc.module,
    personas: [],
    verification,
    commonMistakes: [
      "Marking PASS without staging live IDs",
      "Hiding DEFERRED_NOT_HIDDEN capabilities in marketing/nav as ready",
      "Persisting unmasked sensitive values in AI/audit/graph metadata",
    ],
    verificationStatus: mapVerificationStatus(status),
    reviewStatus: status,
    catalogSource: "gap-discovery",
    gapTypes: gaps,
    evidencePath:
      "docs/final-gap-discovery-review-plan/final-gap-discovery-review/evidence/" + uc.id + ".md",
    canonical: {
      verificationStatus: mapVerificationStatus(status),
      productionStatus: status,
      evidencePath:
        "docs/final-gap-discovery-review-plan/final-gap-discovery-review/evidence/" + uc.id + ".md",
      testId: uc.id + "-GD01…GD16",
      automationStatus: "Gap discovery matrix — staging proof outstanding",
      personaScope: "Module " + uc.module,
      auditRequirement: "Live audit row required for PASS (GD10)",
      notificationRequirement: "Downstream/notification proof where applicable (GD11)",
    },
  };
}

function buildGapTest(row) {
  const gd = gdKey(row.test_case_id);
  const meta = GD_META[gd] || { name: row.test_case_name, type: "verification", priority: "P1" };
  const status = row.review_status;
  return {
    id: row.test_case_id,
    useCaseId: row.use_case_id,
    useCaseName: row.use_case_name,
    module: row.module,
    route: "use-case:" + row.use_case_id,
    feature: row.priority || "Existing",
    verificationStatus: mapVerificationStatus(status),
    testDisposition: mapDisposition(status),
    title: "[" + meta.type + "] " + row.use_case_id + " " + gd + " — " + (row.test_case_name || meta.name),
    type: meta.type,
    priority: meta.priority,
    description: row.validation_required || meta.name,
    prerequisites: [
      "Use case " + row.use_case_id + " (" + row.use_case_name + ")",
      "Module: " + row.module,
      "Scope: " + row.scope_status,
      "Evidence file available for update",
    ],
    steps: [
      "Open evidence pack for " + row.use_case_id + ".",
      "Execute validation: " + (row.test_case_name || meta.name) + ".",
      "Record review_status and gap_type (" + (row.gap_type || "n/a") + ").",
      "Capture staging artifacts when claiming PASS (live IDs, denial, audit, reload).",
      "Update matrix row " + row.test_case_id + " only with evidence — never inflate PASS.",
    ],
    expectedResult:
      status === "PASS"
        ? "PASS with staging proof attached."
        : "Current review status " +
          status +
          ". Fix required: " +
          (row.fix_required || "Staging live evidence"),
    expectedBehavior:
      "Align UI→API→DB→RBAC→audit→downstream with domain rules. Gap: " +
      (row.gap_type || "n/a") +
      ".",
    backendValidation: {
      apiEndpoint: "See feature inventory for " + row.use_case_id,
      sourceEntity: "Canonical Employee/Project/Task/TaskActivity/PO or approved ts_*",
      sourceValidation: "No mock/demo/fallback business data",
      expectedDbUpdate: "Persist via canonical tables only",
      databaseValidation: "Reload/readback required for PASS (GD06)",
      auditEvent: gd === "GD10" ? "Required live audit row" : "If mutating flow — audit expected",
      auditValidation: "GD10 must capture audit evidence for PASS",
      notificationEvent: gd === "GD11" ? "Required where workflow notifies" : "As applicable",
      notificationValidation: "GD11 notification/downstream proof",
      securityValidation: gd === "GD07" ? "Wrong-persona API denial required" : "RBAC enforced",
      forbiddenShadowTable: "ts_* isolated business-truth stores",
      smokeProbe: row.test_case_id,
      environment: "staging",
      evidencePath:
        "docs/final-gap-discovery-review-plan/final-gap-discovery-review/evidence/" +
        row.use_case_id +
        ".md",
      gapType: row.gap_type || "",
      fixRequired: row.fix_required || "",
    },
    catalogSource: "gap-discovery",
    reviewStatus: status,
    gapType: row.gap_type || "",
  };
}

function isGapId(id) {
  return /^[A-Z]{2,12}-\d{3}$/.test(String(id || ""));
}

function isGapTestId(id) {
  return /-[Gg][Dd]\d{2}$/.test(String(id || ""));
}

function writeCatalog(pages) {
  const modules = new Set(pages.map((p) => p.module));
  const gapCount = pages.filter((p) => p.catalogSource === "gap-discovery").length;
  const js =
    `/**\n` +
    ` * Tracopus Use Case Catalog — page definitions + gap-discovery use cases\n` +
    ` * Generated: ${new Date().toISOString().slice(0, 10)}\n` +
    ` * Total entries: ${pages.length} (gap-discovery: ${gapCount}, modules: ${modules.size})\n` +
    ` * Sync: node js/sync-gap-discovery-docs.mjs\n` +
    ` */\n` +
    `window.TRACOPUS_USE_CASE_CATALOG = ${JSON.stringify(pages)};\n`;
  fs.writeFileSync(CATALOG_OUT, js, "utf8");
}

function writeTests(tests, pageCount) {
  const byType = {};
  const byDisposition = {};
  const byVStatus = {};
  let p0p1WithBackend = 0;
  tests.forEach((t) => {
    byType[t.type] = (byType[t.type] || 0) + 1;
    byDisposition[t.testDisposition || "SHIPPED"] =
      (byDisposition[t.testDisposition || "SHIPPED"] || 0) + 1;
    byVStatus[t.verificationStatus || "CODE_PATH_VERIFIED"] =
      (byVStatus[t.verificationStatus || "CODE_PATH_VERIFIED"] || 0) + 1;
    if ((t.priority === "P0" || t.priority === "P1") && t.backendValidation) p0p1WithBackend++;
  });
  const byUc = {};
  tests.forEach((t) => {
    if (!byUc[t.useCaseId]) byUc[t.useCaseId] = [];
    byUc[t.useCaseId].push(t.id);
  });
  const gapTests = tests.filter((t) => t.catalogSource === "gap-discovery").length;
  const js =
    `/**\n` +
    ` * Tracopus Test Plan — page scenarios + gap-discovery GD01–GD16 matrix\n` +
    ` * Generated: ${new Date().toISOString().slice(0, 10)}\n` +
    ` * Total tests: ${tests.length} across ${pageCount} use cases (gap GD tests: ${gapTests})\n` +
    ` * Types: ${JSON.stringify(byType)}\n` +
    ` * Disposition: ${JSON.stringify(byDisposition)}\n` +
    ` * Verification status: ${JSON.stringify(byVStatus)}\n` +
    ` * P0/P1 with backend validation: ${p0p1WithBackend}\n` +
    ` * Sync: node js/sync-gap-discovery-docs.mjs\n` +
    ` */\n` +
    `window.TRACOPUS_TEST_PLAN = ${JSON.stringify(tests)};\n\n` +
    `/** Index: useCaseId → test ids (for cross-linking) */\n` +
    `window.TRACOPUS_TEST_PLAN_BY_USE_CASE = ${JSON.stringify(byUc)};\n`;
  fs.writeFileSync(TEST_OUT, js, "utf8");
  return { p0p1WithBackend, byType };
}

function patchHtmlStats(pageCount, moduleCount, testCount, ucLinked, p0p1) {
  const catalogHtml = path.join(DOCS_ROOT, "tracopus-use-case-catalog.html");
  let c = fs.readFileSync(catalogHtml, "utf8");
  c = c.replace(
    /<div class="uc-stat-card"><strong>169<\/strong><span>with canonical mapping<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>${pageCount}</strong><span>catalog entries</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>\d+<\/strong><span>catalog entries<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>${pageCount}</strong><span>catalog entries</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>11<\/strong><span>enterprise modules<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>${moduleCount}</strong><span>modules</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>\d+<\/strong><span>modules<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>${moduleCount}</strong><span>modules</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>F01–F30<\/strong><span>feature epics mapped<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>549</strong><span>gap-discovery UCs</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>549<\/strong><span>gap-discovery UCs<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>549</strong><span>gap-discovery UCs</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>PMI<\/strong><span>governance alignment<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>0 PASS</strong><span>until staging evidence</span></div>`
  );
  c = c.replace(
    /<div class="uc-stat-card"><strong>0 PASS<\/strong><span>until staging evidence<\/span><\/div>/,
    `<div class="uc-stat-card"><strong>0 PASS</strong><span>until staging evidence</span></div>`
  );
  if (
    !c.includes("Final gap discovery")
  ) {
    c = c.replace(
      '<div class="callout callout--info">',
      `<div class="callout callout--tip">
      <div class="callout__icon">📋</div>
      <div class="callout__body">
        <strong class="callout__title">Final gap discovery register</strong>
        <div class="callout__text">This catalog includes <strong>549</strong> business use cases from the final gap discovery review (ACCESS-001…), each linked to <strong>GD01–GD16</strong> tests in the <a href="tracopus-test-plan.html">Test Plan</a>. Status <strong>PARTIAL</strong> / <strong>DEFERRED_NOT_HIDDEN</strong> is not PASS.</div>
      </div>
    </div>

    <div class="callout callout--info">`
    );
  }
  fs.writeFileSync(catalogHtml, c, "utf8");

  const testHtml = path.join(DOCS_ROOT, "tracopus-test-plan.html");
  let t = fs.readFileSync(testHtml, "utf8");
  t = t.replace(
    /<div class="tp-stat-card"><strong id="tp-usecase-count">—<\/strong><span>linked use cases \(169\)<\/span><\/div>/,
    `<div class="tp-stat-card"><strong id="tp-usecase-count">—</strong><span>linked use cases</span></div>`
  );
  t = t.replace(
    /<div class="tp-stat-card"><strong>1016<\/strong><span>P0\/P1 with backend validation<\/span><\/div>/,
    `<div class="tp-stat-card"><strong>${p0p1}</strong><span>P0/P1 with backend validation</span></div>`
  );
  t = t.replace(
    /<div class="tp-stat-card"><strong>\d+<\/strong><span>P0\/P1 with backend validation<\/span><\/div>/,
    `<div class="tp-stat-card"><strong>${p0p1}</strong><span>P0/P1 with backend validation</span></div>`
  );
  t = t.replace(
    /<div class="tp-stat-card"><strong>7<\/strong><span>status types<\/span><\/div>/,
    `<div class="tp-stat-card"><strong>8784</strong><span>gap GD01–GD16 tests</span></div>`
  );
  t = t.replace(
    /<div class="tp-stat-card"><strong>8784<\/strong><span>gap GD01–GD16 tests<\/span><\/div>/,
    `<div class="tp-stat-card"><strong>8784</strong><span>gap GD01–GD16 tests</span></div>`
  );
  if (!t.includes("Final gap discovery matrix")) {
    t = t.replace(
      '<div class="callout callout--info">',
      `<div class="callout callout--tip">
      <div class="callout__icon">📋</div>
      <div class="callout__body">
        <strong class="callout__title">Final gap discovery matrix</strong>
        <div class="callout__text"><strong>${testCount}</strong> total scenarios including <strong>8784</strong> GD01–GD16 reviews across <strong>${ucLinked}</strong> use cases. Filter by module or type. PASS remains <strong>0</strong> until staging live evidence.</div>
      </div>
    </div>

    <div class="callout callout--info">`
    );
  }
  fs.writeFileSync(testHtml, t, "utf8");
}

function main() {
  if (!fs.existsSync(CSV_PATH) || !fs.existsSync(RESULTS_PATH)) {
    throw new Error("Missing gap discovery artifacts under " + REVIEW_DIR);
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_PATH, "utf8"));
  const rows = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
  const byUcRow = {};
  rows.forEach((r) => {
    if (!byUcRow[r.use_case_id]) byUcRow[r.use_case_id] = r;
  });

  let pages = loadJsonLiteral(CATALOG_OUT, "TRACOPUS_USE_CASE_CATALOG");
  let tests = loadJsonLiteral(TEST_OUT, "TRACOPUS_TEST_PLAN");

  // Drop previous gap-discovery merges so sync is idempotent
  pages = pages.filter((p) => p.catalogSource !== "gap-discovery" && !isGapId(p.id));
  tests = tests.filter((t) => t.catalogSource !== "gap-discovery" && !isGapTestId(t.id));

  const gapPages = results.results.map((uc) =>
    buildGapUseCase(uc, byUcRow[uc.id] || {})
  );
  const gapTests = rows.map(buildGapTest);

  pages = pages.concat(gapPages);
  tests = tests.concat(gapTests);

  writeCatalog(pages);
  const { p0p1WithBackend } = writeTests(tests, pages.length);
  const moduleCount = new Set(pages.map((p) => p.module)).size;
  const ucLinked = new Set(tests.map((t) => t.useCaseId)).size;
  patchHtmlStats(pages.length, moduleCount, tests.length, ucLinked, p0p1WithBackend);

  console.log(
    JSON.stringify(
      {
        catalogEntries: pages.length,
        gapUseCases: gapPages.length,
        modules: moduleCount,
        tests: tests.length,
        gapTests: gapTests.length,
        p0p1WithBackend,
        pass: results.counts.PASS,
      },
      null,
      2
    )
  );
}

main();
