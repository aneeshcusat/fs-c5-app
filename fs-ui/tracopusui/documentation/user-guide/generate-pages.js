#!/usr/bin/env node
/**
 * Generate scenario HTML pages and module indexes from scenarios-data.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);
const DATA_FILE = path.join(ROOT, 'js/scenarios-data.js');

const guide = require('./js/scenarios-data.js');

const V = '20260619e';

/** Path to doucuments/ root assets (css, images) from user-guide pages */
function docsRoot(depth) {
  return '../'.repeat(depth + 1);
}

/** Path prefix within user-guide/ (js, local css) */
function localPrefix(depth) {
  return depth === 0 ? '' : '../';
}

function headAssets(title, depth) {
  const dr = docsRoot(depth);
  const lp = localPrefix(depth);
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Tracopus Scenario Guide</title>
  <meta name="description" content="${title}">
  <link rel="icon" href="${dr}images/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${dr}css/styles.css?v=${V}">
  <link rel="stylesheet" href="${lp}css/scenario-guide.css?v=${V}">
  <script src="${lp}js/brand-config.js?v=${V}"></script>`;
}

function scripts(depth) {
  const lp = localPrefix(depth);
  const dr = docsRoot(depth);
  return `
<script src="${lp}js/palette.js?v=${V}"></script>
<script src="${lp}js/brand.js?v=${V}"></script>
<script src="${lp}js/scenarios-data.js?v=${V}"></script>
<script src="${lp}js/scenario-enrichment.js?v=${V}"></script>
<script src="${dr}js/docs-utility-config.js?v=${V}"></script>
<script src="${lp}js/nav-config.js?v=${V}"></script>
<script src="${dr}js/navigation.js?v=${V}"></script>
<script src="${lp}js/site-enhancements.js?v=${V}"></script>
<script src="${lp}js/search.js?v=${V}"></script>`;
}

function footer(depth) {
  const lp = localPrefix(depth);
  const screenDocs = docsRoot(depth) + 'index.html';
  return `
<footer>
  <div class="container">
    <p>&copy; 2026 <span data-brand>Tracopus</span>. Scenario User Guide.</p>
    <p style="margin-top:0.75rem;">
      <a href="${lp}index.html">Home</a>
      <a href="${lp}scenarios.html">All scenarios</a>
      <a href="${screenDocs}">Documentation</a>
      <a href="${docsRoot(depth)}getting-started.html">Getting Started</a>
    </p>
  </div>
</footer>`;
}

function shell(title, depth, body, extraScripts) {
  return `<!DOCTYPE html>
<html lang="en" data-lux-theme="luxury" data-lux-palette="emerald">
<head>
${headAssets(title, depth)}
</head>
<body class="scenario-guide-site" data-docs-depth="${depth}">
<header aria-label="Site header"></header>
<main>
${body}
</main>
${footer(depth)}
${scripts(depth)}
${extraScripts || ''}
</body>
</html>`;
}

// Copy shared JS from doucuments (keep user-guide-specific: navigation, brand-config, search)
const sharedJs = ['brand.js', 'palette.js', 'site-enhancements.js'];
const docsJs = path.join(ROOT, '../js');
sharedJs.forEach((f) => {
  fs.copyFileSync(path.join(docsJs, f), path.join(ROOT, 'js', f));
});

// Custom search.js for scenarios
const searchJs = fs.readFileSync(path.join(docsJs, 'search.js'), 'utf8');
const customSearch = searchJs.replace(
  'var documentationPages = [',
  `var documentationPages = (window.SCENARIO_GUIDE && window.SCENARIO_GUIDE.allForSearch) ? window.SCENARIO_GUIDE.allForSearch() : [`
).replace(
  /^\s*\];\s*$/m,
  '];\n  documentationPages = documentationPages.concat(window.SCENARIO_GUIDE ? [] : ['
);
// Simpler: write dedicated search
fs.writeFileSync(path.join(ROOT, 'js/search.js'), `(function () {
  'use strict';
  function getBasePath() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    return depth > 0 ? '../' : '';
  }
  function getDocsRootPath() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    var p = '../';
    for (var i = 0; i < depth; i++) { p += '../'; }
    return p;
  }
  var basePath = getBasePath();
  var pages = [];
  function buildIndex() {
    if (!window.SCENARIO_GUIDE) return [];
    return window.SCENARIO_GUIDE.allForSearch().map(function (p) {
      return { title: p.title, url: basePath + p.url, description: p.description, keywords: p.keywords };
    }).concat([
      { title: 'Home', url: basePath + 'index.html', description: 'Scenario guide home', keywords: ['home'] },
      { title: 'All scenarios', url: basePath + 'scenarios.html', description: 'Complete scenario index', keywords: ['all', 'list'] },
      { title: 'Documentation', url: getDocsRootPath() + 'index.html', description: 'Main screen documentation home', keywords: ['documentation', 'screen', 'reference'] },
      { title: 'Getting Started', url: getDocsRootPath() + 'getting-started.html', description: 'Login, SSO, and navigation', keywords: ['getting started', 'login'] }
    ]);
  }
  function initSearch(input) {
    if (!input) return;
    pages = buildIndex();
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var box = document.getElementById('search-results');
      if (!box) return;
      if (!q) { box.innerHTML = ''; box.hidden = true; return; }
      var hits = pages.filter(function (p) {
        var blob = (p.title + ' ' + p.description + ' ' + (p.keywords || []).join(' ')).toLowerCase();
        return blob.indexOf(q) >= 0;
      }).slice(0, 12);
      box.innerHTML = hits.map(function (h) {
        return '<a class="search-hit" href="' + h.url + '"><strong>' + h.title + '</strong><span>' + h.description + '</span></a>';
      }).join('');
      box.hidden = hits.length === 0;
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    initSearch(document.getElementById('docs-search-input'));
    initSearch(document.getElementById('docSearchInput'));
  });
})();
`);

// index.html
const moduleCards = Object.keys(guide.modules).map((key) => {
  const m = guide.modules[key];
  const count = guide.scenarios.filter((s) => s.module === key).length;
  return `<a class="module-card" href="${key}/index.html" style="--module-accent:${m.accent}"><div class="module-card__label">${m.label}</div><div class="module-card__tagline">${m.tagline}</div><div class="module-card__count">${count} scenarios</div></a>`;
}).join('\n');

fs.writeFileSync(path.join(ROOT, 'index.html'), shell('Home', 0, `
  <div class="breadcrumb"><a href="index.html">Home</a></div>
  <section class="section">
    <div class="page-hero scenario-guide-hero">
      <div class="eyebrow">Tracopus · Scenario User Guide</div>
      <h1>How to do it — step by step</h1>
      <p class="lead">Every workflow documented as <strong>Feature → Scenario → Steps</strong>. Use this guide for onboarding, QA test scripts, and day-to-day help when you need to complete a task in Tracopus.</p>
    </div>
    <div class="callout callout--info"><div class="callout__icon">ℹ️</div><div class="callout__body"><strong class="callout__title">How this guide is organized</strong><div class="callout__text">Pick a <strong>module</strong> below, then a <strong>feature</strong>, then open the <strong>scenario</strong> you need. Each scenario includes <strong>permissions</strong>, <strong>org/feature flags</strong>, <strong>warnings</strong>, role-specific <strong>behavior notes</strong>, numbered steps, verification checklist, and links to screen reference docs.</div></div></div>
    <div class="callout callout--warning"><div class="callout__icon">⚠️</div><div class="callout__body"><strong class="callout__title">Before you test</strong><div class="callout__text">Confirm Application Config flags and role permissions for your pilot org unit. Behavior changes when flags are off — menus hide rather than show disabled controls. Use persona-specific test accounts (employee, manager, HR admin).</div></div></div>
    <div class="scenario-structure-diagram"><strong>Feature</strong> (e.g. Employees) → <strong>Scenario</strong> (e.g. Create a new employee) → <strong>Steps</strong> (numbered actions)</div>
    <h3 class="subheading">Screen documentation</h3>
    <p style="font-size:0.9375rem;color:var(--text-light);margin-bottom:0.75rem;">This guide covers <strong>how to complete workflows</strong>. For page-by-page screen reference — charts, filters, permissions tables, and FAQs — use the main documentation.</p>
    <div class="page-index-grid">
      <a class="page-index-card" href="../index.html"><strong>Documentation home</strong><span>Module indexes and reference guides</span></a>
      <a class="page-index-card" href="../hrms/index.html"><strong>HRMS screens</strong><span>Dashboard, timesheet, employees, attendance…</span></a>
      <a class="page-index-card" href="../project/index.html"><strong>Project screens</strong><span>Taskboard, capacity, reports, deliverables…</span></a>
      <a class="page-index-card" href="../sales/index.html"><strong>Sales screens</strong><span>Bid requests and purchase orders</span></a>
      <a class="page-index-card" href="../getting-started.html"><strong>Getting Started</strong><span>Login, SSO, navigation, core concepts</span></a>
      <a class="page-index-card" href="../admin.html"><strong>Admin &amp; Access</strong><span>Permissions, config, timesheet rules</span></a>
    </div>
    <h3 class="subheading" style="margin-top:2rem;">Scenario modules</h3>
    <div class="module-card-grid">${moduleCards}</div>
    <h3 style="margin-top:2rem;" class="subheading">Quick paths for testers</h3>
    <div class="steps">
      <div class="step"><strong>Create employee</strong><div class="step-detail"><a href="hrms/hrms-create-employee.html">HRMS → Create employee</a> — 5-step wizard</div></div>
      <div class="step"><strong>Create project</strong><div class="step-detail"><a href="project/project-create-project.html">Project → Create project</a> — 7-step wizard</div></div>
      <div class="step"><strong>Log timesheet</strong><div class="step-detail"><a href="hrms/hrms-log-timesheet.html">HRMS → Log weekly hours</a></div></div>
      <div class="step"><strong>Approve work</strong><div class="step-detail"><a href="workspace/workspace-approvals.html">Workspace → Approvals inbox</a></div></div>
    </div>
    <p style="margin-top:1.5rem;"><a href="scenarios.html">Browse all ${guide.scenarios.length} scenarios →</a></p>
  </section>
`, 0));

// scenarios.html - flat index
const flatCards = guide.scenarios.map((s) => {
  const mod = guide.modules[s.module];
  return `<a class="scenario-card" href="${s.module}/${s.id}.html"><div class="scenario-card__feature">${mod ? mod.label : s.module} · ${s.feature}</div><div class="scenario-card__title">${s.title}</div><div class="scenario-card__meta">${s.steps.length} steps · permissions &amp; flags</div><div class="scenario-card__rich">Includes warnings, behavior notes, and QA checklist</div></a>`;
}).join('\n');

fs.writeFileSync(path.join(ROOT, 'scenarios.html'), shell('All scenarios', 0, `
  <div class="breadcrumb"><a href="index.html">Home</a> → All scenarios</div>
  <section class="section">
    <div class="scenario-guide-hero"><h1>All scenarios</h1><p class="lead">${guide.scenarios.length} workflows across ${Object.keys(guide.modules).length} modules.</p></div>
    <div class="scenario-card-grid">${flatCards}</div>
  </section>
`, 0));

// Module indexes and scenario pages
Object.keys(guide.modules).forEach((moduleId) => {
  const dir = path.join(ROOT, moduleId);
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path.join(dir, 'index.html'), shell(guide.modules[moduleId].label + ' scenarios', 1, `
    <div class="breadcrumb"><a href="../index.html">Home</a> → ${guide.modules[moduleId].label}</div>
    <section class="section">
      <div id="module-hero" class="scenario-guide-hero"></div>
      <div id="module-scenarios"></div>
    </section>
  `, `<script src="../js/module-index.js?v=${V}"></script>`).replace('<body', `<body data-module-id="${moduleId}"`));

  guide.scenarios.filter((s) => s.module === moduleId).forEach((s) => {
    fs.writeFileSync(path.join(dir, s.id + '.html'), shell(s.title, 1, `
      <div class="breadcrumb" id="scenario-breadcrumb"></div>
      <section class="section"><div id="scenario-content"></div></section>
    `, `<script src="../js/scenario-page.js?v=${V}"></script>`).replace('<body', `<body data-scenario-id="${s.id}"`));
  });

  /* Redirect mistaken module/scenarios.html URLs to the real all-scenarios index */
  fs.writeFileSync(path.join(dir, 'scenarios.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=../scenarios.html">
  <title>All scenarios — Tracopus Scenario Guide</title>
  <script>location.replace('../scenarios.html');</script>
</head>
<body><p><a href="../scenarios.html">All scenarios</a></p></body>
</html>`);
});

console.log('Generated', guide.scenarios.length, 'scenario pages across', Object.keys(guide.modules).length, 'modules.');
