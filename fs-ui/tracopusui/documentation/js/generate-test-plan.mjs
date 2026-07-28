/**
 * Generates test-plan-data.js from use-case-catalog-data.js
 * Run: node generate-test-plan.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateAllTests } from "./test-plan-elaboration.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USE_CASE_DATA = path.join(__dirname, "use-case-catalog-data.js");
const OUT = path.join(__dirname, "test-plan-data.js");

function loadUseCasePages() {
  const content = fs.readFileSync(USE_CASE_DATA, "utf8");
  const match = content.match(/window\.TRACOPUS_USE_CASE_CATALOG\s*=\s*(\[[\s\S]*\]);?\s*$/);
  if (!match) throw new Error("Could not parse use-case-catalog-data.js");
  return JSON.parse(match[1]);
}

const pages = loadUseCasePages();
const tests = generateAllTests(pages);

const byType = {};
const byDisposition = {};
const byVStatus = {};
const p0p1WithBackend = tests.filter((t) => (t.priority === "P0" || t.priority === "P1") && t.backendValidation).length;

tests.forEach((t) => {
  byType[t.type] = (byType[t.type] || 0) + 1;
  byDisposition[t.testDisposition || "SHIPPED"] = (byDisposition[t.testDisposition || "SHIPPED"] || 0) + 1;
  byVStatus[t.verificationStatus || "CODE_PATH_VERIFIED"] = (byVStatus[t.verificationStatus || "CODE_PATH_VERIFIED"] || 0) + 1;
});

const js = `/**
 * Tracopus Test Plan — scenarios linked to use case catalog
 * Generated: ${new Date().toISOString().slice(0, 10)}
 * Total tests: ${tests.length} across ${pages.length} use cases
 * Types: ${JSON.stringify(byType)}
 * Disposition: ${JSON.stringify(byDisposition)}
 * Verification status: ${JSON.stringify(byVStatus)}
 * P0/P1 with backend validation: ${p0p1WithBackend}
 */
window.TRACOPUS_TEST_PLAN = ${JSON.stringify(tests, null, 2)};

/** Index: useCaseId → test ids (for cross-linking) */
window.TRACOPUS_TEST_PLAN_BY_USE_CASE = ${JSON.stringify(
  tests.reduce((acc, t) => {
    if (!acc[t.useCaseId]) acc[t.useCaseId] = [];
    acc[t.useCaseId].push(t.id);
    return acc;
  }, {}),
  null,
  2
)};
`;

fs.writeFileSync(OUT, js, "utf8");
console.log(`Wrote ${tests.length} test scenarios (${pages.length} use cases) to ${OUT}`);
console.log("By type:", byType);
console.log("Next: node sync-gap-discovery-docs.mjs  # merge 549 UCs + 8784 GD tests into catalog/test plan");

