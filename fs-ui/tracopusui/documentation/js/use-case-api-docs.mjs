/**
 * Builds API Documentation blocks for use-case catalog entries.
 * Includes sample curl, how-to-use steps, related APIs, and scenario links.
 */

import { scenariosForUseCase } from "./use-case-scenario-bridge.mjs";

/**
 * Parse canonical.backendEndpoint strings into structured endpoints.
 * Supports "METHOD path", comma/semicolon lists, and "GET/POST path".
 */
export function parseEndpoints(backendEndpoint, pageName) {
  if (!backendEndpoint || /^(N\/A|n\/a|\(planned)/i.test(String(backendEndpoint).trim())) {
    return [];
  }
  const raw = String(backendEndpoint);
  const parts = raw.split(/[,;]|\band\b/i).map((p) => p.trim()).filter(Boolean);
  const out = [];

  parts.forEach((part) => {
    const dual = part.match(/^(GET)\/(POST|PUT|PATCH)\s+(\S+)(.*)$/i);
    if (dual) {
      out.push({
        method: dual[1].toUpperCase(),
        path: normalizePath(dual[3]),
        description: `List/read ${pageName || "resource"}`,
      });
      out.push({
        method: dual[2].toUpperCase(),
        path: normalizePath(dual[3]),
        description: `Create/update ${pageName || "resource"}`,
      });
      return;
    }
    const m = part.match(/^(GET|POST|PUT|PATCH|DELETE)\s+(\S+)(.*)$/i);
    if (m) {
      out.push({
        method: m[1].toUpperCase(),
        path: normalizePath(m[2]),
        description: (m[3] || "").trim().replace(/^[-–—]\s*/, "") || `${m[1].toUpperCase()} ${pageName || "API"}`,
      });
      return;
    }
    // Bare path — assume GET under /api/v2 when possible
    if (part.startsWith("/")) {
      out.push({
        method: "GET",
        path: normalizePath(part),
        description: `Read ${pageName || "resource"}`,
      });
    }
  });

  return out;
}

function normalizePath(path) {
  let p = String(path || "").trim();
  if (!p) return "/api/v2";
  // UI routes without /api — keep as-is but prefer documenting as FE route note
  if (!p.startsWith("/")) p = "/" + p;
  return p.replace(/\/+$/, "") || "/";
}

function isPublicAuth(pageId, path) {
  return (
    /login|forgot|activate|changepassword/i.test(pageId || "") ||
    /\/user\/(login|forgotpassword|activateaccount|changepassword)/i.test(path || "")
  );
}

function isPlannedEndpoint(backendEndpoint) {
  return /\(planned|OUT_OF_SCOPE|not shipped/i.test(String(backendEndpoint || ""));
}

export function buildSampleCurl(endpoint, { isPublic, planned } = {}) {
  if (planned || !endpoint) {
    return [
      "# API not production-ready for this use case yet.",
      "# Enable the feature flag, then re-check Canonical mapping for the live path.",
    ].join("\n");
  }

  const method = endpoint.method || "GET";
  const path = endpoint.path || "/api/v2";
  const url = `"\${API_BASE}${path}"`;
  const lines = [
    isPublic
      ? "# Replace API_BASE (e.g. https://api.your-org.tracopus.com). Public endpoint — no token."
      : "# Replace API_BASE (e.g. https://api.your-org.tracopus.com) and TOKEN from login.",
    `export API_BASE="https://api.example.tracopus.com"`,
  ];

  if (!isPublic) {
    lines.push(`export TOKEN="<session-or-bearer-token>"`);
  }

  const headers = [`  -H "Accept: application/json"`];
  if (!isPublic) {
    headers.push(`  -H "Authorization: Bearer \${TOKEN}"`);
  }

  if (method === "GET" || method === "DELETE") {
    lines.push(`curl -sS -X ${method} ${url} \\`);
    lines.push(headers.join(" \\\n"));
  } else {
    headers.push(`  -H "Content-Type: application/json"`);
    lines.push(`curl -sS -X ${method} ${url} \\`);
    lines.push(headers.join(" \\\n") + " \\");
    lines.push(`  -d '{ }'`);
  }

  return lines.join("\n");
}

function inferRelatedApis(page, endpoints) {
  const related = [];
  const primaryPath = endpoints[0]?.path || "";
  const svc = page.relatedServices || page.canonical?.frontendService || "";

  if (svc) {
    related.push({
      method: "—",
      path: String(svc).split(",")[0].trim(),
      note: "Frontend service module used by the UI",
    });
  }

  if (!isPublicAuth(page.id, primaryPath)) {
    related.push({
      method: "POST",
      path: "/api/v2/user/login",
      note: "Obtain session/token before calling protected APIs",
    });
  }

  // Sibling verbs on same resource
  endpoints.slice(1, 4).forEach((ep) => {
    related.push({
      method: ep.method,
      path: ep.path,
      note: ep.description || "Related operation on the same resource",
    });
  });

  if (/approv/i.test(page.id) || /approvals/i.test(primaryPath)) {
    related.push({
      method: "GET",
      path: "/api/v2/approvals/inbox",
      note: "Universal inbox list before approve/reject",
    });
  }

  if (/leave/i.test(page.id) || /leave/i.test(primaryPath)) {
    related.push({
      method: "GET",
      path: "/api/v2/leaves/holidays",
      note: "Holiday calendars used in leave day counting",
    });
  }

  if (/timesheet/i.test(page.id) || /timesheet/i.test(primaryPath)) {
    related.push({
      method: "GET",
      path: "/api/v2/timesheet/week",
      note: "Week staging / entries before submit or approve",
    });
  }

  // Deduplicate by method+path
  const seen = new Set();
  return related.filter((r) => {
    const key = `${r.method}|${r.path}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);
}

/**
 * @param {object} page — elaborated use-case page (must include canonical)
 */
export function buildApiDocumentation(page) {
  const backendEndpoint = page.canonical?.backendEndpoint || "";
  const planned = isPlannedEndpoint(backendEndpoint) || page.status === "Planned" || page.verificationStatus === "PLANNED";
  const endpoints = parseEndpoints(backendEndpoint, page.pageName);
  const primary = endpoints[0] || null;
  const publicApi = primary ? isPublicAuth(page.id, primary.path) : isPublicAuth(page.id, "");
  const relatedScenarios = scenariosForUseCase(page.id);

  const howToUse = planned
    ? [
        "This use case is **Planned** or the backend endpoint is not production-ready.",
        "Follow the Scenario Guide UI path for design intent; do not treat curl samples as go-live contracts.",
        "After the feature ships, regenerate this catalog so Canonical mapping and Sample curl refresh.",
        "Pair with linked scenarios below for end-user verification once live.",
      ]
    : [
        "Set `API_BASE` to your Tracopus API host (same origin the SPA uses for `/api/v2`).",
        publicApi
          ? "This primary endpoint is **public** — no Bearer token required (login / forgot / activate flows)."
          : "Sign in via `POST /api/v2/user/login` (or reuse the browser session cookie) and export `TOKEN`.",
        "Copy the **Sample curl** below; replace path parameters (`{id}`, employee/project ids) with real values from your tenant.",
        "Expect HTTP 2xx on success. On 401/403, check session expiry, role.json permissions, and org Application Config flags.",
        "Confirm response IDs map to canonical sources listed under **Canonical source mapping** (Employee, Project, Task, PO, etc.).",
        "UI menu hiding is not security — APIs enforce RBAC independently. Validate denied personas return 403.",
        relatedScenarios.length
          ? "Walk the linked **Scenario Guide** steps after the API call to verify UI reflects the same state."
          : "Use How to use (UI) steps on this card to verify the screen after the API call.",
      ];

  return {
    overview: planned
      ? `API documentation for **${page.pageName}** is reserved until the feature ships. Linked scenarios describe the intended UI path.`
      : `HTTP APIs backing **${page.pageName}**. Use sample curl for integration tests; use Scenario Guide links for end-to-end UI validation.`,
    baseUrlHint: "${API_BASE}  →  e.g. https://api.your-org.tracopus.com",
    auth: publicApi ? "Public (no Bearer token)" : "Bearer token or session cookie from login",
    endpoints: endpoints.length
      ? endpoints
      : planned
        ? []
        : [
            {
              method: "GET",
              path: page.route && String(page.route).startsWith("/api")
                ? page.route
                : `(see Canonical mapping — UI route ${page.route || "—"})`,
              description: "Primary contract documented in Canonical mapping",
            },
          ],
    sampleCurl: buildSampleCurl(primary, { isPublic: publicApi, planned: planned || !primary }),
    howToUse,
    relatedApis: inferRelatedApis(page, endpoints),
    relatedScenarios,
  };
}
