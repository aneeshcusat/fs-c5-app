/**
 * Renders Tracopus Use Case Catalog from TRACOPUS_USE_CASE_CATALOG data.
 */
(function () {
  'use strict';

  var data = window.TRACOPUS_USE_CASE_CATALOG || [];
  var contentEl = document.getElementById('uc-content');
  var tocEl = document.getElementById('uc-toc-links');
  var filtersEl = document.getElementById('uc-filters');
  var searchEl = document.getElementById('uc-search');
  var emptyEl = document.getElementById('uc-empty');
  var countEl = document.getElementById('uc-count');

  if (!contentEl || !data.length) return;

  if (countEl) countEl.textContent = String(data.length);

  var modules = [];
  data.forEach(function (p) {
    if (modules.indexOf(p.module) === -1) modules.push(p.module);
  });

  var activeModule = 'ALL';

  function esc(s) {
    if (!s) return '';
    if (typeof s === 'object') return esc(JSON.stringify(s));
    var d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function renderList(items) {
    if (!items || !items.length) return '<p>No steps documented yet.</p>';
    return '<ol class="uc-steps">' + items.map(function (i) {
      return '<li>' + esc(i).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</li>';
    }).join('') + '</ol>';
  }

  function renderBullets(items, label) {
    if (!items || !items.length) return '';
    var labelHtml = label ? '<p class="uc-kv"><strong>' + esc(label) + '</strong></p>' : '';
    return labelHtml + '<ul class="uc-sublist">' +
      items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  function renderScenarios(scenarios) {
    if (!scenarios || !scenarios.length) return '<p>No predefined scenarios.</p>';
    return scenarios.map(function (s) {
      return '<div class="uc-scenario"><strong>' + esc(s.title) + '</strong><span>' + esc(s.description) + '</span></div>';
    }).join('');
  }

  function renderWho(who) {
    if (!who) return '<p>See role permissions and persona visibility.</p>';
    if (typeof who === 'string') return '<p>' + esc(who) + '</p>';
    var html = who.summary ? '<p>' + esc(who.summary) + '</p>' : '';
    html += renderBullets(who.personas, 'Personas');
    if (who.roles) html += '<p class="uc-kv"><strong>Typical roles</strong><br>' + esc(who.roles) + '</p>';
    html += renderBullets(who.permissions, 'Permissions & flags');
    html += renderBullets(who.prerequisites, 'Prerequisites');
    return html;
  }

  function renderWhen(when) {
    if (!when) return '<p>During relevant business process.</p>';
    if (typeof when === 'string') return '<p>' + esc(when) + '</p>';
    var html = when.summary ? '<p>' + esc(when.summary) + '</p>' : '';
    html += renderBullets(when.triggers, 'When to open (triggers)');
    if (when.cadence) html += '<p class="uc-kv"><strong>Recommended cadence</strong><br>' + esc(when.cadence) + '</p>';
    html += renderBullets(when.examples, 'Examples');
    return html;
  }

  function renderWhere(where, route) {
    if (!where) return '<p>' + esc(route) + '</p>';
    if (typeof where === 'string') return '<p>' + esc(where) + '</p>';
    var html = '';
    if (where.navigation) {
      html += '<p class="uc-kv"><strong>Navigation path</strong><br>' +
        esc(where.navigation).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</p>';
    }
    if (where.route || route) {
      html += '<p class="uc-kv"><strong>Route</strong><br><code>' + esc(where.route || route) + '</code></p>';
    }
    if (where.moduleContext) {
      html += '<p class="uc-kv"><strong>Module context</strong><br>' + esc(where.moduleContext) + '</p>';
    }
    html += renderBullets(where.relatedPages, 'Related pages');
    html += renderBullets(where.deepLinks, 'Deep links');
    return html;
  }

  function flattenSearch(p) {
    var parts = [p.pageName, p.route, p.module, p.overview, p.feature, p.whyToUse, p.implementationNotes, p.relatedServices, p.featureFlags, p.reviewStatus, p.catalogSource, p.evidencePath];
    if (p.gapTypes) parts = parts.concat(p.gapTypes);
    if (p.personas) parts = parts.concat(p.personas);
    if (p.howToCreate) parts = parts.concat(p.howToCreate);
    if (p.howToUse) parts = parts.concat(p.howToUse);
    if (p.scenarios) {
      p.scenarios.forEach(function (s) {
        parts.push(s.title, s.description);
      });
    }
    ['whoCanUse', 'whenToUse', 'whereToUse'].forEach(function (k) {
      var v = p[k];
      if (!v) return;
      if (typeof v === 'string') parts.push(v);
      else {
        Object.keys(v).forEach(function (key) {
          var val = v[key];
          if (Array.isArray(val)) parts = parts.concat(val);
          else if (val) parts.push(String(val));
        });
      }
    });
    if (p.verification) parts = parts.concat(p.verification);
    if (p.commonMistakes) parts = parts.concat(p.commonMistakes);
    if (p.apiDocumentation) {
      var api = p.apiDocumentation;
      parts.push(api.overview, api.sampleCurl, api.auth, api.baseUrlHint);
      if (api.howToUse) parts = parts.concat(api.howToUse);
      if (api.endpoints) {
        api.endpoints.forEach(function (ep) {
          parts.push(ep.method, ep.path, ep.description);
        });
      }
      if (api.relatedApis) {
        api.relatedApis.forEach(function (r) {
          parts.push(r.method, r.path, r.note);
        });
      }
      if (api.relatedScenarios) {
        api.relatedScenarios.forEach(function (s) {
          parts.push(s.id, s.title);
        });
      }
    }
    return parts.join(' ');
  }

  function renderApiDocumentation(api, useCaseId) {
    if (!api) return '';
    var endpointsHtml = '';
    if (api.endpoints && api.endpoints.length) {
      endpointsHtml =
        '<div class="table-wrap uc-api-table-wrap"><table class="uc-api-table">' +
        '<thead><tr><th>Method</th><th>Path</th><th>Description</th></tr></thead><tbody>' +
        api.endpoints.map(function (ep) {
          return (
            '<tr><td><code class="uc-api-method uc-api-method--' +
            esc(String(ep.method || '').toLowerCase()) +
            '">' +
            esc(ep.method) +
            '</code></td><td><code>' +
            esc(ep.path) +
            '</code></td><td>' +
            esc(ep.description) +
            '</td></tr>'
          );
        }).join('') +
        '</tbody></table></div>';
    } else {
      endpointsHtml = '<p class="uc-kv">No production endpoint registered yet — see Canonical mapping.</p>';
    }

    var relatedApisHtml = '';
    if (api.relatedApis && api.relatedApis.length) {
      relatedApisHtml =
        '<h5 class="uc-api-subhead">Related APIs</h5>' +
        '<ul class="uc-sublist uc-api-related">' +
        api.relatedApis.map(function (r) {
          return (
            '<li><code>' +
            esc(r.method) +
            '</code> <code>' +
            esc(r.path) +
            '</code>' +
            (r.note ? ' — ' + esc(r.note) : '') +
            '</li>'
          );
        }).join('') +
        '</ul>';
    }

    var scenariosHtml = '';
    var scenarios = api.relatedScenarios || [];
    if (!scenarios.length && window.TRACOPUS_DOC_BRIDGE && window.TRACOPUS_DOC_BRIDGE.useCaseToScenarios) {
      scenarios = window.TRACOPUS_DOC_BRIDGE.useCaseToScenarios[useCaseId] || [];
    }
    if (scenarios.length) {
      scenariosHtml =
        '<h5 class="uc-api-subhead">Linked scenarios</h5>' +
        '<div class="uc-api-links">' +
        scenarios.map(function (s) {
          var href = 'user-guide/' + esc(s.module) + '/' + esc(s.id) + '.html';
          return '<a class="uc-api-link" href="' + href + '">' + esc(s.title || s.id) + '</a>';
        }).join('') +
        '</div>';
    }

    return (
      '<div class="uc-block uc-block--full uc-api-block" id="api-' + esc(useCaseId) + '">' +
      '<h4><span class="uc-label-api">API Documentation</span></h4>' +
      (api.overview ? '<p>' + esc(api.overview).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</p>' : '') +
      '<p class="uc-kv"><strong>Auth</strong><br>' + esc(api.auth || '—') + '</p>' +
      '<p class="uc-kv"><strong>Base URL</strong><br><code>' + esc(api.baseUrlHint || '${API_BASE}') + '</code></p>' +
      '<h5 class="uc-api-subhead">Endpoints</h5>' +
      endpointsHtml +
      '<h5 class="uc-api-subhead">Sample curl</h5>' +
      '<pre class="uc-api-curl"><code>' + esc(api.sampleCurl || '') + '</code></pre>' +
      '<h5 class="uc-api-subhead">How to use the API</h5>' +
      renderList(api.howToUse) +
      relatedApisHtml +
      scenariosHtml +
      '</div>'
    );
  }

  function renderCanonical(c) {
    if (!c) return '';
    var rows = [
      ['Verification status', c.verificationStatus || '—'],
      ['V6H task', c.v6hTaskId ? (c.v6hTaskId + ' · ' + (c.v6hSprint || '') + ' · ' + (c.v6hPriority || '')) : '—'],
      ['Production status', c.productionStatus || '—'],
      ['Backend endpoint', c.backendEndpoint],
      ['Frontend service', c.frontendService],
      ['Controller / service', c.controllerService],
      ['Canonical sources', (c.canonicalSourceEntities || []).join(', ')],
      ['Allowed tables', (c.allowedTables || []).join(', ')],
      ['Forbidden tables', (c.forbiddenTables || []).slice(0, 4).join(', ') + ((c.forbiddenTables || []).length > 4 ? '…' : '')],
      ['Feature flag', c.featureFlag],
      ['Persona scope', c.personaScope],
      ['Team scope rule', c.teamScopeRule],
      ['Audit requirement', c.auditRequirement],
      ['Notification requirement', c.notificationRequirement],
      ['Automation status', c.automationStatus],
      ['Test ID', c.testId],
      ['Playwright spec', c.playwrightSpec],
      ['Evidence path', c.evidencePath],
    ];
    return (
      '<div class="uc-block uc-block--full uc-canonical-block">' +
      '<h4>Canonical source mapping</h4>' +
      '<dl class="uc-canonical-dl">' +
      rows.map(function (r) {
        return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1] || '—') + '</dd>';
      }).join('') +
      '</dl></div>'
    );
  }

  function statusBadge(status) {
    if (!status) return '';
    var cls = 'uc-badge uc-badge--vstatus uc-badge--' + slug(status);
    return '<span class="' + cls + '">' + esc(status) + '</span>';
  }

  function resolveTests(useCaseId) {
    var byUc = window.TRACOPUS_TEST_PLAN_BY_USE_CASE || {};
    var ids = byUc[useCaseId];
    var testData = window.TRACOPUS_TEST_PLAN || [];
    if (ids && ids.length) {
      var byId = {};
      // Prefer index lookup without scanning full plan when possible
      if (testData.length && testData.length < 2500) {
        return testData.filter(function (t) { return t.useCaseId === useCaseId; });
      }
      var map = {};
      for (var i = 0; i < testData.length; i++) map[testData[i].id] = testData[i];
      return ids.map(function (id) { return map[id]; }).filter(Boolean);
    }
    return testData.filter(function (t) { return t.useCaseId === useCaseId; });
  }

  function renderTestLinks(useCaseId) {
    var tests = resolveTests(useCaseId);
    if (!tests.length) return '';
    var maxShow = 16;
    var shown = tests.slice(0, maxShow);
    var links = shown.map(function (t) {
      return '<li><a href="tracopus-test-plan.html#' + esc(t.id) + '">' + esc(t.title) + '</a>' +
        '<span class="tp-link-meta">' + esc(t.type) + ' · ' + esc(t.priority) +
        (t.verificationStatus ? ' · ' + esc(t.verificationStatus) : '') + '</span></li>';
    }).join('');
    var more = tests.length > maxShow
      ? '<p class="uc-kv">Showing ' + maxShow + ' of ' + tests.length + '.</p>'
      : '';
    return (
      '<div class="uc-block uc-block--full uc-test-block">' +
      '<h4>Linked test scenarios (' + tests.length + ')</h4>' +
      '<ul class="uc-test-links">' + links + '</ul>' + more +
      '<p class="uc-kv"><a href="tracopus-test-plan.html#uc-' + esc(useCaseId) + '">View all tests for this use case →</a></p>' +
      '</div>'
    );
  }

  function renderPage(p) {
    var plannedBadge = p.status === 'Planned' ? '<span class="uc-badge uc-badge--planned">Planned</span>' : '';
    var featureBadge = p.feature && p.feature !== 'Existing'
      ? '<span class="uc-badge uc-badge--feature">' + esc(p.feature) + '</span>'
      : '';
    var gapBadge = p.catalogSource === 'gap-discovery'
      ? '<span class="uc-badge uc-badge--gap">Gap discovery</span>'
      : '';
    var reviewBadge = p.reviewStatus
      ? statusBadge(p.reviewStatus)
      : '';
    return (
      '<article class="uc-page-card" id="' + esc(p.id) + '" data-module="' + esc(p.module) + '" data-search="' + esc(flattenSearch(p)) + '">' +
      '<div class="uc-page-card__head">' +
      '<h3>' + esc(p.pageName) + '</h3>' +
      '<code class="uc-route">' + esc(p.route) + '</code>' +
      '</div>' +
      '<div class="uc-badges">' + featureBadge + plannedBadge + gapBadge + reviewBadge + statusBadge(p.verificationStatus) +
      '<span class="uc-badge">' + esc(p.module) + '</span></div>' +
      '<p class="uc-overview">' + esc(p.overview) + '</p>' +
      (p.whyToUse
        ? '<div class="uc-block uc-block--full" style="margin-bottom:1rem"><h4><span class="uc-label-why">Why use this page</span></h4><p>' + esc(p.whyToUse) + '</p></div>'
        : '') +
      '<div class="uc-grid">' +
      '<div class="uc-block"><h4>Scenarios / Use cases</h4>' + renderScenarios(p.scenarios) + '</div>' +
      '<div class="uc-block"><h4><span class="uc-label-who">Who can use</span></h4>' + renderWho(p.whoCanUse) + '</div>' +
      '<div class="uc-block"><h4><span class="uc-label-when">When to use</span></h4>' + renderWhen(p.whenToUse) + '</div>' +
      '<div class="uc-block"><h4><span class="uc-label-where">Where to use</span></h4>' + renderWhere(p.whereToUse, p.route) + '</div>' +
      '</div>' +
      '<div class="uc-grid uc-grid--wide" style="margin-top:1rem">' +
      '<div class="uc-block uc-block--full"><h4>How to create — step by step</h4>' + renderList(p.howToCreate) + '</div>' +
      '<div class="uc-block uc-block--full"><h4>How to use — step by step</h4>' + renderList(p.howToUse) + '</div>' +
      '</div>' +
      renderApiDocumentation(p.apiDocumentation, p.id) +
      (p.verification && p.verification.length
        ? '<div class="uc-block" style="margin-top:1rem"><h4>Verification checklist</h4>' + renderBullets(p.verification, null) + '</div>'
        : '') +
      (p.commonMistakes && p.commonMistakes.length
        ? '<div class="uc-block" style="margin-top:0.5rem"><h4>Common mistakes</h4>' + renderBullets(p.commonMistakes, null) + '</div>'
        : '') +
      (p.featureFlags
        ? '<div class="uc-block" style="margin-top:1rem"><h4>Feature flags / gates</h4><p>' + esc(p.featureFlags) + '</p></div>'
        : '') +
      (p.relatedServices
        ? '<div class="uc-block" style="margin-top:0.5rem"><h4>Related services / APIs</h4><p><code>' + esc(p.relatedServices) + '</code></p></div>'
        : '') +
      (p.implementationNotes
        ? '<div class="uc-impl"><strong>Right-way implementation:</strong> ' + esc(p.implementationNotes) + '</div>'
        : '') +
      renderCanonical(p.canonical) +
      renderTestLinks(p.id) +
      '</article>'
    );
  }

  function applyFilter() {
    var q = (searchEl && searchEl.value ? searchEl.value : '').toLowerCase().trim();
    var cards = contentEl.querySelectorAll('.uc-page-card');
    var visible = 0;
    cards.forEach(function (card) {
      var mod = card.getAttribute('data-module');
      var text = (card.getAttribute('data-search') || '').toLowerCase();
      var modOk = activeModule === 'ALL' || mod === activeModule;
      var searchOk = !q || text.indexOf(q) !== -1;
      var show = modOk && searchOk;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    if (emptyEl) emptyEl.classList.toggle('is-hidden', visible > 0);
    contentEl.querySelectorAll('.uc-module-section').forEach(function (sec) {
      var any = sec.querySelector('.uc-page-card:not(.is-hidden)');
      sec.style.display = any ? '' : 'none';
    });
  }

  function renderAll() {
    var html = '';
    modules.forEach(function (mod) {
      var pages = data.filter(function (p) { return p.module === mod; });
      html += '<section class="uc-module-section" id="mod-' + slug(mod) + '">';
      html += '<h2>' + esc(mod) + ' <span>(' + pages.length + ' pages)</span></h2>';
      pages.forEach(function (p) { html += renderPage(p); });
      html += '</section>';
    });
    contentEl.innerHTML = html;

    if (tocEl) {
      tocEl.innerHTML = modules.map(function (mod) {
        var n = data.filter(function (p) { return p.module === mod; }).length;
        return '<a href="#mod-' + slug(mod) + '">' + esc(mod) + ' (' + n + ')</a>';
      }).join('');
    }

    if (filtersEl) {
      var filterHtml = '<button type="button" class="uc-filter is-active" data-mod="ALL">All modules</button>';
      modules.forEach(function (mod) {
        filterHtml += '<button type="button" class="uc-filter" data-mod="' + esc(mod) + '">' + esc(mod) + '</button>';
      });
      filtersEl.innerHTML = filterHtml;
      filtersEl.querySelectorAll('.uc-filter').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeModule = btn.getAttribute('data-mod');
          filtersEl.querySelectorAll('.uc-filter').forEach(function (b) {
            b.classList.remove('is-active');
          });
          btn.classList.add('is-active');
          applyFilter();
        });
      });
    }

    applyFilter();
  }

  if (searchEl) searchEl.addEventListener('input', applyFilter);
  renderAll();
})();
