/**
 * Renders Tracopus Test Plan from TRACOPUS_TEST_PLAN data.
 * Bidirectional links to tracopus-use-case-catalog.html
 */
(function () {
  'use strict';

  var data = window.TRACOPUS_TEST_PLAN || [];
  var contentEl = document.getElementById('tp-content');
  var tocEl = document.getElementById('tp-toc-links');
  var filtersEl = document.getElementById('tp-filters');
  var typeFiltersEl = document.getElementById('tp-type-filters');
  var searchEl = document.getElementById('tp-search');
  var emptyEl = document.getElementById('tp-empty');
  var countEl = document.getElementById('tp-count');
  var useCaseCountEl = document.getElementById('tp-usecase-count');

  if (!contentEl || !data.length) return;

  if (countEl) countEl.textContent = String(data.length);

  var useCaseIds = {};
  data.forEach(function (t) { useCaseIds[t.useCaseId] = true; });
  if (useCaseCountEl) useCaseCountEl.textContent = String(Object.keys(useCaseIds).length);

  var modules = [];
  var types = [];
  data.forEach(function (t) {
    if (modules.indexOf(t.module) === -1) modules.push(t.module);
    if (types.indexOf(t.type) === -1) types.push(t.type);
  });

  var activeModule = 'ALL';
  var activeType = 'ALL';

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function renderSteps(items) {
    if (!items || !items.length) return '<p>No steps documented.</p>';
    return '<ol class="tp-steps">' + items.map(function (i) {
      return '<li>' + esc(i).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</li>';
    }).join('') + '</ol>';
  }

  function renderPrereqs(items) {
    if (!items || !items.length) return '';
    return '<ul class="tp-sublist">' +
      items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  function typeBadge(type) {
    return '<span class="tp-badge tp-badge--type tp-badge--' + esc(type) + '">' + esc(type) + '</span>';
  }

  function priorityBadge(priority) {
    return '<span class="tp-badge tp-badge--priority tp-badge--' + esc(priority) + '">' + esc(priority) + '</span>';
  }

  function renderBackendValidation(bv) {
    if (!bv) return '';
    var items = [
      ['API endpoint', bv.apiEndpoint],
      ['Source entity', bv.sourceEntity],
      ['Source validation', bv.sourceValidation],
      ['Expected DB / source update', bv.expectedDbUpdate],
      ['Database validation', bv.databaseValidation],
      ['Audit event', bv.auditEvent],
      ['Audit validation', bv.auditValidation],
      ['Notification event', bv.notificationEvent],
      ['Notification validation', bv.notificationValidation],
      ['Security validation', bv.securityValidation],
      ['Forbidden shadow table', bv.forbiddenShadowTable],
      ['Playwright spec', bv.playwrightSpec],
      ['Smoke probe / test ID', bv.smokeProbe],
      ['Environment', bv.environment],
      ['Evidence path', bv.evidencePath],
    ];
    return (
      '<div class="tp-block tp-block--backend">' +
      '<h5>Backend / source validation (P0/P1)</h5>' +
      '<dl class="tp-backend-dl">' +
      items.map(function (r) {
        return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1] || '—') + '</dd>';
      }).join('') +
      '</dl></div>'
    );
  }

  function renderTest(t) {
    return (
      '<article class="tp-test-card" id="' + esc(t.id) + '" data-module="' + esc(t.module) + '" data-type="' + esc(t.type) + '" data-use-case="' + esc(t.useCaseId) + '" data-search="' + esc(flattenSearch(t)) + '">' +
      '<div class="tp-test-card__head">' +
      '<h4>' + esc(t.title) + '</h4>' +
      '<div class="tp-badges">' + typeBadge(t.type) + priorityBadge(t.priority) +
      (t.testDisposition ? '<span class="tp-badge tp-badge--disposition">' + esc(t.testDisposition) + '</span>' : '') +
      (t.verificationStatus ? '<span class="tp-badge tp-badge--vstatus">' + esc(t.verificationStatus) + '</span>' : '') +
      (t.feature && t.feature !== 'Existing' ? '<span class="tp-badge tp-badge--feature">' + esc(t.feature) + '</span>' : '') +
      '</div>' +
      '</div>' +
      '<p class="tp-test-id"><code>' + esc(t.id) + '</code></p>' +
      '<p class="tp-description">' + esc(t.description) + '</p>' +
      '<div class="tp-link-row">' +
      '<a class="tp-usecase-link" href="tracopus-use-case-catalog.html#' + esc(t.useCaseId) + '">↗ Use case: ' + esc(t.useCaseName) + '</a>' +
      '<span class="tp-route"><code>' + esc(t.route) + '</code></span>' +
      '</div>' +
      '<div class="tp-grid">' +
      '<div class="tp-block"><h5>Prerequisites</h5>' + renderPrereqs(t.prerequisites) + '</div>' +
      '<div class="tp-block tp-block--wide"><h5>Steps to reproduce</h5>' + renderSteps(t.steps) + '</div>' +
      '</div>' +
      '<div class="tp-grid tp-grid--expect">' +
      '<div class="tp-block tp-block--expect"><h5>Expected result</h5><p>' + esc(t.expectedResult) + '</p></div>' +
      '<div class="tp-block tp-block--expect"><h5>Expected behavior</h5><p>' + esc(t.expectedBehavior) + '</p></div>' +
      '</div>' +
      renderBackendValidation(t.backendValidation) +
      '</article>'
    );
  }

  function flattenSearch(t) {
    var parts = [t.title, t.description, t.useCaseName, t.useCaseId, t.module, t.route, t.type, t.priority, t.expectedResult, t.expectedBehavior, t.verificationStatus, t.gapType];
    if (t.prerequisites) parts = parts.concat(t.prerequisites);
    if (t.steps) parts = parts.concat(t.steps);
    return parts.join(' ');
  }

  var testsByModule = {};
  modules.forEach(function (mod) {
    testsByModule[mod] = data.filter(function (t) { return t.module === mod; });
  });

  function moduleHtml(mod) {
    var modTests = testsByModule[mod] || [];
    var byUseCase = {};
    modTests.forEach(function (t) {
      if (!byUseCase[t.useCaseId]) byUseCase[t.useCaseId] = { name: t.useCaseName, route: t.route, tests: [] };
      byUseCase[t.useCaseId].tests.push(t);
    });
    var html = '<section class="tp-module-section" id="mod-' + slug(mod) + '" data-module="' + esc(mod) + '">';
    html += '<h2>' + esc(mod) + ' <span>(' + modTests.length + ' tests)</span></h2>';
    Object.keys(byUseCase).forEach(function (ucId) {
      var group = byUseCase[ucId];
      html += '<div class="tp-usecase-group" id="uc-' + esc(ucId) + '">';
      html += '<div class="tp-usecase-group__head">';
      html += '<h3><a href="tracopus-use-case-catalog.html#' + esc(ucId) + '">' + esc(group.name) + '</a></h3>';
      html += '<span class="tp-usecase-meta">' + group.tests.length + ' tests · <code>' + esc(group.route) + '</code></span>';
      html += '</div>';
      group.tests.forEach(function (t) { html += renderTest(t); });
      html += '</div>';
    });
    html += '</section>';
    return html;
  }

  function moduleStub(mod) {
    var n = (testsByModule[mod] || []).length;
    return (
      '<section class="tp-module-section tp-module-section--stub" id="mod-' + slug(mod) + '" data-module="' + esc(mod) + '" data-stub="1">' +
      '<h2>' + esc(mod) + ' <span>(' + n + ' tests)</span></h2>' +
      '<p class="tp-empty" style="display:block;position:static;padding:1rem 0;">Select this module filter (or open a deep link) to load its tests. Large plans load one module at a time.</p>' +
      '</section>'
    );
  }

  function ensureModuleRendered(mod) {
    var sec = contentEl.querySelector('#mod-' + slug(mod));
    if (!sec) return;
    if (sec.getAttribute('data-stub') === '1' || !sec.querySelector('.tp-test-card')) {
      sec.outerHTML = moduleHtml(mod);
    }
  }

  function resolveHashModule() {
    var hashTarget = window.location.hash.replace('#', '');
    if (!hashTarget) return null;
    if (hashTarget.indexOf('mod-') === 0) {
      for (var i = 0; i < modules.length; i++) {
        if (slug(modules[i]) === hashTarget.slice(4)) return modules[i];
      }
    }
    for (var j = 0; j < data.length; j++) {
      if (data[j].id === hashTarget || ('uc-' + data[j].useCaseId) === hashTarget) {
        return data[j].module;
      }
    }
    return null;
  }

  function applyFilter() {
    var q = (searchEl && searchEl.value ? searchEl.value : '').toLowerCase().trim();
    var hashTarget = window.location.hash.replace('#', '');
    var hashMod = resolveHashModule();

    // Search across all modules requires materializing matches
    if (q) {
      var matchMods = {};
      data.forEach(function (t) {
        if (flattenSearch(t).toLowerCase().indexOf(q) !== -1) matchMods[t.module] = true;
      });
      Object.keys(matchMods).forEach(function (mod) {
        if (activeModule === 'ALL' || activeModule === mod) ensureModuleRendered(mod);
      });
    } else if (activeModule !== 'ALL') {
      ensureModuleRendered(activeModule);
    } else if (hashMod) {
      ensureModuleRendered(hashMod);
    } else if (modules.length) {
      ensureModuleRendered(modules[0]);
    }

    var cards = contentEl.querySelectorAll('.tp-test-card');
    var visible = 0;
    cards.forEach(function (card) {
      var mod = card.getAttribute('data-module');
      var type = card.getAttribute('data-type');
      var text = (card.getAttribute('data-search') || '').toLowerCase();
      var id = card.id;
      var modOk = activeModule === 'ALL' || mod === activeModule;
      var typeOk = activeType === 'ALL' || type === activeType;
      var searchOk = !q || text.indexOf(q) !== -1;
      var hashOk = true;
      if (hashTarget) {
        var grp = card.closest('.tp-usecase-group');
        hashOk = id === hashTarget || (grp && grp.id === hashTarget) ||
          ('mod-' + slug(mod)) === hashTarget;
      }
      var show = modOk && typeOk && searchOk && (!hashTarget || hashOk || !q);
      if (hashTarget && !q) {
        show = modOk && typeOk && hashOk;
      }
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    contentEl.querySelectorAll('.tp-usecase-group').forEach(function (grp) {
      var any = grp.querySelector('.tp-test-card:not(.is-hidden)');
      grp.classList.toggle('is-hidden', !any && !(hashTarget && grp.id === hashTarget));
    });
    contentEl.querySelectorAll('.tp-module-section').forEach(function (sec) {
      var mod = sec.getAttribute('data-module');
      var modOk = activeModule === 'ALL' || mod === activeModule;
      var any = sec.querySelector('.tp-test-card:not(.is-hidden)');
      var stub = sec.getAttribute('data-stub') === '1';
      sec.style.display = modOk && (any || stub || (hashMod === mod)) ? '' : 'none';
    });
    if (emptyEl) emptyEl.classList.toggle('is-hidden', visible > 0 || !!hashTarget || activeModule !== 'ALL');
  }

  function renderAll() {
    // Lazy: first module full; others stubs (keeps ~10k tests usable)
    var html = modules.map(function (mod, idx) {
      return idx === 0 ? moduleHtml(mod) : moduleStub(mod);
    }).join('');
    contentEl.innerHTML = html;

    if (tocEl) {
      tocEl.innerHTML = modules.map(function (mod) {
        var n = (testsByModule[mod] || []).length;
        return '<a href="#mod-' + slug(mod) + '" data-mod="' + esc(mod) + '">' + esc(mod) + ' (' + n + ')</a>';
      }).join('');
      tocEl.querySelectorAll('a[data-mod]').forEach(function (a) {
        a.addEventListener('click', function () {
          activeModule = a.getAttribute('data-mod');
          if (filtersEl) {
            filtersEl.querySelectorAll('.tp-filter').forEach(function (b) {
              b.classList.toggle('is-active', b.getAttribute('data-mod') === activeModule);
            });
          }
          ensureModuleRendered(activeModule);
          applyFilter();
        });
      });
    }

    if (filtersEl) {
      var filterHtml = '<button type="button" class="tp-filter is-active" data-mod="ALL">All modules</button>';
      modules.forEach(function (mod) {
        filterHtml += '<button type="button" class="tp-filter" data-mod="' + esc(mod) + '">' + esc(mod) + '</button>';
      });
      filtersEl.innerHTML = filterHtml;
      filtersEl.querySelectorAll('.tp-filter').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeModule = btn.getAttribute('data-mod');
          filtersEl.querySelectorAll('.tp-filter').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (activeModule !== 'ALL') ensureModuleRendered(activeModule);
          applyFilter();
        });
      });
    }

    if (typeFiltersEl) {
      var typeHtml = '<button type="button" class="tp-type-filter is-active" data-type="ALL">All types</button>';
      types.sort().forEach(function (type) {
        var n = data.filter(function (t) { return t.type === type; }).length;
        typeHtml += '<button type="button" class="tp-type-filter" data-type="' + esc(type) + '">' + esc(type) + ' (' + n + ')</button>';
      });
      typeFiltersEl.innerHTML = typeHtml;
      typeFiltersEl.querySelectorAll('.tp-type-filter').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeType = btn.getAttribute('data-type');
          typeFiltersEl.querySelectorAll('.tp-type-filter').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          applyFilter();
        });
      });
    }

    var hashMod = resolveHashModule();
    if (hashMod) ensureModuleRendered(hashMod);
    applyFilter();

    if (window.location.hash) {
      var el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (searchEl) searchEl.addEventListener('input', applyFilter);
  window.addEventListener('hashchange', function () {
    var hashMod = resolveHashModule();
    if (hashMod) ensureModuleRendered(hashMod);
    applyFilter();
  });
  renderAll();
})();
