(function () {
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
