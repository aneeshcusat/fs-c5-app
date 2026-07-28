/**
 * Renders API Documentation index from TRACOPUS_DOC_BRIDGE.byUseCase.
 */
(function () {
  'use strict';

  var bridge = window.TRACOPUS_DOC_BRIDGE || {};
  var byUseCase = bridge.byUseCase || {};
  var useCaseToScenarios = bridge.useCaseToScenarios || {};
  var contentEl = document.getElementById('api-docs-content');
  var emptyEl = document.getElementById('api-docs-empty');
  var searchEl = document.getElementById('api-docs-search');
  var moduleEl = document.getElementById('api-docs-module');
  var statsEl = document.getElementById('api-docs-stats');

  if (!contentEl) return;

  function esc(s) {
    if (s == null) return '';
    var d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  function mdInline(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  var entries = Object.keys(byUseCase).map(function (id) {
    var uc = byUseCase[id];
    var api = uc.apiDocumentation || {};
    var endpoints = api.endpoints || [];
    var hasLive = endpoints.some(function (ep) {
      return ep.path && String(ep.path).indexOf('/api') === 0;
    });
    return {
      id: id,
      pageName: uc.pageName || id,
      route: uc.route || '',
      module: uc.module || 'Other',
      api: api,
      endpoints: endpoints,
      hasLive: hasLive,
      scenarios: useCaseToScenarios[id] || (api.relatedScenarios || []),
      search: [
        id,
        uc.pageName,
        uc.route,
        uc.module,
        api.overview,
        api.sampleCurl,
        api.auth
      ].concat(endpoints.map(function (ep) {
        return [ep.method, ep.path, ep.description].join(' ');
      })).join(' ').toLowerCase()
    };
  }).filter(function (e) {
    return e.endpoints.length || e.api.sampleCurl;
  }).sort(function (a, b) {
    if (a.module !== b.module) return a.module.localeCompare(b.module);
    return a.pageName.localeCompare(b.pageName);
  });

  var modules = [];
  entries.forEach(function (e) {
    if (modules.indexOf(e.module) === -1) modules.push(e.module);
  });
  modules.sort();

  if (moduleEl) {
    modules.forEach(function (m) {
      var opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      moduleEl.appendChild(opt);
    });
  }

  if (statsEl) {
    var liveCount = entries.filter(function (e) { return e.hasLive; }).length;
    statsEl.innerHTML =
      '<span><strong>' + entries.length + '</strong> documented APIs</span>' +
      '<span><strong>' + liveCount + '</strong> with /api paths</span>' +
      '<span><strong>' + Object.keys(bridge.byScenario || {}).length + '</strong> scenario links</span>';
  }

  function renderCard(e) {
    var epHtml = (e.endpoints || []).map(function (ep) {
      return (
        '<tr>' +
          '<td><code class="api-method api-method--' + esc(String(ep.method || '').toLowerCase()) + '">' + esc(ep.method) + '</code></td>' +
          '<td><code>' + esc(ep.path) + '</code></td>' +
          '<td>' + esc(ep.description || '') + '</td>' +
        '</tr>'
      );
    }).join('');

    var relatedHtml = (e.api.relatedApis || []).slice(0, 4).map(function (r) {
      return '<li><code>' + esc(r.method) + '</code> <code>' + esc(r.path) + '</code>' +
        (r.note ? ' — ' + esc(r.note) : '') + '</li>';
    }).join('');

    var scenarioHtml = (e.scenarios || []).map(function (s) {
      return '<a class="api-docs-chip" href="user-guide/' + esc(s.module) + '/' + esc(s.id) + '.html">' +
        esc(s.title || s.id) + '</a>';
    }).join('');

    return (
      '<article class="api-docs-card" id="' + esc(e.id) + '" data-module="' + esc(e.module) + '" data-search="' + esc(e.search) + '">' +
        '<div class="api-docs-card__head">' +
          '<div>' +
            '<h3>' + esc(e.pageName) + '</h3>' +
            '<code class="api-docs-route">' + esc(e.route) + '</code>' +
          '</div>' +
          '<span class="api-docs-module-badge">' + esc(e.module) + '</span>' +
        '</div>' +
        (e.api.overview ? '<p class="api-docs-overview">' + mdInline(e.api.overview) + '</p>' : '') +
        '<p class="api-docs-meta"><strong>Auth</strong> ' + esc(e.api.auth || '—') + '</p>' +
        (epHtml
          ? '<div class="table-wrap"><table class="api-docs-table"><thead><tr><th>Method</th><th>Path</th><th>Description</th></tr></thead><tbody>' +
            epHtml + '</tbody></table></div>'
          : '') +
        (e.api.sampleCurl
          ? '<h4>Sample curl</h4><pre class="api-docs-curl"><code>' + esc(e.api.sampleCurl) + '</code></pre>'
          : '') +
        (e.api.howToUse && e.api.howToUse.length
          ? '<h4>How to use the API</h4><ol class="api-docs-steps">' +
            e.api.howToUse.map(function (step) { return '<li>' + mdInline(step) + '</li>'; }).join('') +
            '</ol>'
          : '') +
        (relatedHtml ? '<h4>Related APIs</h4><ul class="api-docs-related">' + relatedHtml + '</ul>' : '') +
        '<div class="api-docs-links">' +
          '<a class="api-docs-chip api-docs-chip--primary" href="tracopus-use-case-catalog.html#' + esc(e.id) + '">Use case →</a>' +
          scenarioHtml +
        '</div>' +
      '</article>'
    );
  }

  function renderAll() {
    var byMod = {};
    entries.forEach(function (e) {
      if (!byMod[e.module]) byMod[e.module] = [];
      byMod[e.module].push(e);
    });
    var html = '';
    modules.forEach(function (mod) {
      var list = byMod[mod] || [];
      html += '<section class="api-docs-module" data-module-section="' + esc(mod) + '">';
      html += '<h2>' + esc(mod) + ' <span>(' + list.length + ')</span></h2>';
      list.forEach(function (e) { html += renderCard(e); });
      html += '</section>';
    });
    contentEl.innerHTML = html;
  }

  function applyFilter() {
    var q = (searchEl && searchEl.value ? searchEl.value : '').toLowerCase().trim();
    var mod = moduleEl ? moduleEl.value : 'ALL';
    var cards = contentEl.querySelectorAll('.api-docs-card');
    var visible = 0;
    cards.forEach(function (card) {
      var cardMod = card.getAttribute('data-module');
      var text = (card.getAttribute('data-search') || '').toLowerCase();
      var show = (mod === 'ALL' || cardMod === mod) && (!q || text.indexOf(q) !== -1);
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    contentEl.querySelectorAll('.api-docs-module').forEach(function (sec) {
      var any = sec.querySelector('.api-docs-card:not(.is-hidden)');
      sec.style.display = any ? '' : 'none';
    });
    if (emptyEl) emptyEl.classList.toggle('is-hidden', visible > 0);
  }

  renderAll();
  if (searchEl) searchEl.addEventListener('input', applyFilter);
  if (moduleEl) moduleEl.addEventListener('change', applyFilter);

  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
