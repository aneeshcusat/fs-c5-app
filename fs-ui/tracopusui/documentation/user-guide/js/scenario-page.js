(function () {
  'use strict';

  function mdInline(text) {
    if (!text) return '';
    return String(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function mdList(items) {
    if (!items || !items.length) return '';
    return '<ul class="scenario-rich-list">' + items.map(function (item) {
      return '<li>' + mdInline(item) + '</li>';
    }).join('') + '</ul>';
  }

  function getEnrichment(scenario) {
    if (!scenario) return {};
    if (window.getScenarioEnrichment) {
      return window.getScenarioEnrichment(scenario) || {};
    }
    if (window.SCENARIO_ENRICHMENT && window.SCENARIO_ENRICHMENT[scenario.id]) {
      return window.SCENARIO_ENRICHMENT[scenario.id];
    }
    return {};
  }

  function mergeScenario(scenario) {
    var extra = getEnrichment(scenario);
    return Object.assign({}, scenario, extra);
  }

  function renderCallout(item, fallbackType) {
    var type = item.type || fallbackType || 'info';
    var icons = { info: 'ℹ️', tip: '💡', warning: '⚠️', danger: '🛑', success: '✅' };
    return (
      '<div class="callout callout--' + type + '">' +
        '<div class="callout__icon">' + (icons[type] || icons.info) + '</div>' +
        '<div class="callout__body">' +
          (item.title ? '<strong class="callout__title">' + mdInline(item.title) + '</strong>' : '') +
          '<div class="callout__text">' + mdInline(item.text || item) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderPermissions(rows) {
    if (!rows || !rows.length) return '';
    var body = rows.map(function (row) {
      return (
        '<tr>' +
          '<td><strong>' + mdInline(row.name || row.permission || '—') + '</strong></td>' +
          '<td><code>' + mdInline(row.path || row.flag || '—') + '</code></td>' +
          '<td>' + mdInline(row.level || row.scope || 'Required') + '</td>' +
          '<td>' + mdInline(row.notes || '') + '</td>' +
        '</tr>'
      );
    }).join('');
    return (
      '<div class="table-wrap scenario-table-wrap">' +
        '<table class="table scenario-perm-table">' +
          '<thead><tr><th>Permission</th><th>Config path</th><th>Scope</th><th>Notes</th></tr></thead>' +
          '<tbody>' + body + '</tbody>' +
        '</table>' +
      '</div>'
    );
  }

  function renderFeatureFlags(flags) {
    if (!flags || !flags.length) return '';
    var body = flags.map(function (flag) {
      return (
        '<tr>' +
          '<td><code>' + mdInline(flag.flag || flag.name) + '</code></td>' +
          '<td>' + mdInline(flag.group || flag.configGroup || 'Application Config') + '</td>' +
          '<td>' + mdInline(flag.whenEnabled || flag.behaviorWhenEnabled || 'Feature visible and active') + '</td>' +
          '<td>' + mdInline(flag.whenDisabled || flag.behaviorWhenDisabled || 'Menu/route hidden; API may still reject writes') + '</td>' +
        '</tr>'
      );
    }).join('');
    return (
      '<div class="table-wrap scenario-table-wrap">' +
        '<table class="table scenario-flag-table">' +
          '<thead><tr><th>Flag</th><th>Config group</th><th>When enabled</th><th>When disabled</th></tr></thead>' +
          '<tbody>' + body + '</tbody>' +
        '</table>' +
      '</div>'
    );
  }

  function renderBehaviorChanges(changes) {
    if (!changes || !changes.length) return '';
    return (
      '<div class="scenario-behavior-grid">' +
        changes.map(function (change) {
          return (
            '<article class="scenario-behavior-card">' +
              '<h4>' + mdInline(change.role || change.persona || 'Role / flag') + '</h4>' +
              '<p>' + mdInline(change.effect || change.behavior) + '</p>' +
              (change.notes ? '<p class="scenario-behavior-card__note">' + mdInline(change.notes) + '</p>' : '') +
            '</article>'
          );
        }).join('') +
      '</div>'
    );
  }

  function renderVerifyList(items) {
    if (!items || !items.length) return '';
    return (
      '<ul class="scenario-verify-list">' +
        items.map(function (item, i) {
          return '<li><span class="scenario-verify-list__num">' + (i + 1) + '</span><span>' + mdInline(item) + '</span></li>';
        }).join('') +
      '</ul>'
    );
  }

  function renderScenario(scenario) {
    scenario = mergeScenario(scenario);
    var mod = window.SCENARIO_GUIDE.modules[scenario.module];
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    var prefix = depth > 0 ? '../'.repeat(depth) : '';
    var docsPrefix = '../'.repeat(depth + 1);

    document.title = scenario.title + ' — Tracopus Scenario Guide';

    var breadcrumb = document.getElementById('scenario-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML =
        '<a href="' + prefix + 'index.html">Home</a> → ' +
        '<a href="' + prefix + scenario.module + '/index.html">' + (mod ? mod.label : scenario.module) + '</a> → ' +
        scenario.title;
    }

    var root = document.getElementById('scenario-content');
    if (!root) return;

    var rolesHtml = (scenario.roles || []).map(function (r) {
      return '<span class="role-tag">' + r + '</span>';
    }).join('');

    var stepsHtml = (scenario.steps || []).map(function (step) {
      return '<li>' + mdInline(step) + '</li>';
    }).join('');

    var tipsHtml = (scenario.tips || []).map(function (t) {
      return '<li>' + mdInline(t) + '</li>';
    }).join('');

    var prereqHtml = (scenario.prerequisites || []).map(function (p) {
      return '<li>' + mdInline(p) + '</li>';
    }).join('');

    var relatedHtml = (scenario.related || []).map(function (id) {
      var rel = window.SCENARIO_GUIDE.getScenario(id);
      if (!rel) return '';
      return '<a href="' + rel.id + '.html">' + rel.title + '</a>';
    }).join('');

    var warnings = scenario.warnings || [];
    var warningsHtml = warnings.length
      ? warnings.map(function (w) { return renderCallout(w, 'warning'); }).join('')
      : '';

    var considerations = scenario.considerations || [];
    var considerationsHtml = considerations.length
      ? '<section class="scenario-block" id="considerations">' +
          '<h2>Things to consider</h2>' +
          mdList(considerations) +
        '</section>'
      : '';

    var permissionsHtml = (scenario.permissions && scenario.permissions.length)
      ? '<section class="scenario-block" id="permissions">' +
          '<h2>Required permissions</h2>' +
          '<p class="scenario-block__intro">Access is evaluated at module, page, action, and record level. Users without these flags will not see menus or buttons — the UI hides unavailable actions rather than showing them disabled.</p>' +
          renderPermissions(scenario.permissions) +
        '</section>'
      : '';

    var flagsHtml = (scenario.featureFlags && scenario.featureFlags.length)
      ? '<section class="scenario-block" id="feature-flags">' +
          '<h2>Feature &amp; org flags</h2>' +
          '<p class="scenario-block__intro">Org flags live in <strong>HRMS → Application configuration</strong> (org unit tree). Changes apply on next login or config refresh. Pilot teams before enabling at root.</p>' +
          renderFeatureFlags(scenario.featureFlags) +
        '</section>'
      : '';

    var behaviorHtml = (scenario.behaviorChanges && scenario.behaviorChanges.length)
      ? '<section class="scenario-block" id="behavior-changes">' +
          '<h2>Behavior by role or flag</h2>' +
          renderBehaviorChanges(scenario.behaviorChanges) +
        '</section>'
      : '';

    var verifyHtml = (scenario.verify && scenario.verify.length)
      ? '<section class="scenario-block" id="verify">' +
          '<h2>Test verification checklist</h2>' +
          '<p class="scenario-block__intro">Use this list when writing QA scripts or validating a deployment.</p>' +
          renderVerifyList(scenario.verify) +
        '</section>'
      : '';

    var apiBridge = (window.TRACOPUS_DOC_BRIDGE && window.TRACOPUS_DOC_BRIDGE.byScenario)
      ? window.TRACOPUS_DOC_BRIDGE.byScenario[scenario.id]
      : null;
    var apiDoc = (apiBridge && apiBridge.apiDocumentation) || scenario.apiDocumentation || null;
    var apiHtml = '';
    if (apiDoc) {
      var epRows = (apiDoc.endpoints || []).map(function (ep) {
        return (
          '<tr>' +
            '<td><code>' + mdInline(ep.method) + '</code></td>' +
            '<td><code>' + mdInline(ep.path) + '</code></td>' +
            '<td>' + mdInline(ep.description || '') + '</td>' +
          '</tr>'
        );
      }).join('');
      var relatedApiRows = (apiDoc.relatedApis || []).map(function (r) {
        return '<li><code>' + mdInline(r.method) + '</code> <code>' + mdInline(r.path) + '</code>' +
          (r.note ? ' — ' + mdInline(r.note) : '') + '</li>';
      }).join('');
      var useCaseHref = docsPrefix + 'tracopus-use-case-catalog.html#' + (apiBridge ? apiBridge.useCaseId : '');
      var useCaseLink = apiBridge
        ? '<p class="scenario-block__intro">Primary use case: <a href="' + useCaseHref + '">' +
            mdInline(apiBridge.useCaseName || apiBridge.useCaseId) +
            '</a> (<code>' + mdInline(apiBridge.useCaseRoute || '') + '</code>) — opens API Documentation on that card.</p>'
        : '';
      apiHtml =
        '<section class="scenario-block" id="api-documentation">' +
          '<h2>API Documentation</h2>' +
          useCaseLink +
          (apiDoc.overview ? '<p>' + mdInline(apiDoc.overview) + '</p>' : '') +
          '<p><strong>Auth:</strong> ' + mdInline(apiDoc.auth || '—') + '</p>' +
          (epRows
            ? '<div class="table-wrap scenario-table-wrap"><table class="table scenario-perm-table">' +
                '<thead><tr><th>Method</th><th>Path</th><th>Description</th></tr></thead>' +
                '<tbody>' + epRows + '</tbody></table></div>'
            : '<p>No production endpoint registered yet.</p>') +
          '<h3>Sample curl</h3>' +
          '<pre class="scenario-api-curl"><code>' + (apiDoc.sampleCurl || '').replace(/</g, '&lt;') + '</code></pre>' +
          '<h3>How to use the API</h3>' +
          mdList(apiDoc.howToUse) +
          (relatedApiRows
            ? '<h3>Related APIs</h3><ul class="scenario-rich-list">' + relatedApiRows + '</ul>'
            : '') +
          (apiBridge
            ? '<p class="scenario-api-backlink">↔ <a href="' + useCaseHref + '">Use Case Catalog — ' +
                mdInline(apiBridge.useCaseName || apiBridge.useCaseId) + '</a></p>'
            : '') +
        '</section>';
    } else if (apiBridge && apiBridge.useCaseId) {
      apiHtml =
        '<section class="scenario-block" id="api-documentation">' +
          '<h2>API Documentation</h2>' +
          '<p class="scenario-block__intro">See the linked use case for endpoints, sample curl, and related APIs.</p>' +
          '<p class="scenario-api-backlink">↔ <a href="' + docsPrefix + 'tracopus-use-case-catalog.html#' +
            apiBridge.useCaseId + '">Use Case Catalog — ' +
            mdInline(apiBridge.useCaseName || apiBridge.useCaseId) + '</a></p>' +
        '</section>';
    }

    var contextHtml = scenario.context
      ? '<div class="callout callout--info scenario-context-callout">' +
          '<div class="callout__icon">📋</div>' +
          '<div class="callout__body">' +
            '<strong class="callout__title">About this scenario</strong>' +
            '<div class="callout__text">' + mdInline(scenario.context) + '</div>' +
          '</div>' +
        '</div>'
      : '';

    root.innerHTML =
      '<div class="scenario-guide-hero">' +
        '<div class="eyebrow">' + (mod ? mod.label : scenario.module) + ' · ' + scenario.feature + '</div>' +
        '<h1>' + scenario.title + '</h1>' +
        '<p class="lead">' + mdInline(scenario.summary || 'Step-by-step workflow with permissions, flags, warnings, and verification guidance for testers and end users.') + '</p>' +
      '</div>' +
      '<div class="scenario-meta-bar">' +
        '<span><strong>Route</strong> <code>' + (scenario.route || '—') + '</code></span>' +
        '<span><strong>Feature</strong> ' + scenario.feature + '</span>' +
        (scenario.screenDoc ? '<span><strong>Screen doc</strong> <a href="' + docsPrefix + scenario.screenDoc + '">Reference page</a></span>' : '') +
        '<span><strong>All docs</strong> <a href="' + docsPrefix + 'index.html">Documentation home</a></span>' +
      '</div>' +
      (rolesHtml ? '<div class="role-tags">' + rolesHtml + '</div>' : '') +
      contextHtml +
      (warningsHtml ? '<section class="scenario-block scenario-block--callouts" id="warnings">' + warningsHtml + '</section>' : '') +
      permissionsHtml +
      flagsHtml +
      behaviorHtml +
      considerationsHtml +
      '<section class="scenario-block" id="prerequisites">' +
        '<h2>Prerequisites</h2>' +
        '<div class="scenario-prereq"><ul class="scenario-tips">' + prereqHtml + '</ul></div>' +
      '</section>' +
      '<section class="scenario-block" id="steps">' +
        '<h2>Steps</h2>' +
        '<ol class="scenario-steps">' + stepsHtml + '</ol>' +
      '</section>' +
      '<section class="scenario-block" id="outcome">' +
        '<h2>Expected outcome</h2>' +
        '<div class="scenario-outcome">' + mdInline(scenario.outcome || '') + '</div>' +
      '</section>' +
      apiHtml +
      verifyHtml +
      (tipsHtml ? '<section class="scenario-block" id="tips">' +
        '<h2>Tips &amp; common mistakes</h2>' +
        '<ul class="scenario-tips">' + tipsHtml + '</ul>' +
      '</section>' : '') +
      (relatedHtml ? '<section class="scenario-block" id="related">' +
        '<h2>Related scenarios</h2>' +
        '<div class="related-scenarios">' + relatedHtml + '</div>' +
      '</section>' : '');
  }

  function init() {
    var id = document.body.getAttribute('data-scenario-id');
    if (!id || !window.SCENARIO_GUIDE) return;
    var scenario = window.SCENARIO_GUIDE.getScenario(id);
    if (scenario) renderScenario(scenario);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
