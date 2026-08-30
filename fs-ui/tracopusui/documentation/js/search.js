(function () {
  'use strict';

  function getBasePath() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    return depth > 0 ? '../' : '';
  }

  function getBasePathAtLoad() {
    var depth = 0;
    if (document.body) {
      depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    } else if (/\/(project|sales|mobile|hrms|faq)\//.test(window.location.pathname)) {
      depth = 1;
    }
    return depth > 0 ? '../' : '';
  }

  var basePath = getBasePathAtLoad();
  var documentationPages = [];
  var indexReady = false;

  function normalizeIndexPages(data) {
    var pages = Array.isArray(data) ? data : (data && data.pages) || [];
    return pages.map(function (page) {
      return {
        title: page.title || "",
        url: page.url || "",
        description: page.description || "",
        keywords: page.keywords || [],
        headings: page.headings || [],
        content: page.content || ""
      };
    });
  }

  function loadSearchIndex(done) {
    var url = (getBasePath() || "") + "documentation-search-index.json?v=20260830a";
    fetch(url, { credentials: "same-origin" })
      .then(function (res) { if (!res.ok) throw new Error("index"); return res.json(); })
      .then(function (data) {
        var pages = normalizeIndexPages(data);
        if (pages.length) documentationPages = pages;
        indexReady = true;
        if (done) done();
      })
      .catch(function () {
        indexReady = true;
        if (done) done();
      });
  }

  function searchDocumentation(query) {
    if (!query || query.trim().length < 2) return [];
    var searchTerm = query.toLowerCase().trim();
    var terms = searchTerm.split(/\s+/).filter(Boolean);
    var results = [];

    documentationPages.forEach(function (page) {
      var score = 0;
      var title = (page.title || "").toLowerCase();
      var desc = (page.description || "").toLowerCase();
      var headings = (page.headings || []).join(" ").toLowerCase();
      var content = (page.content || "").toLowerCase();
      var haystack = title + " " + desc + " " + headings + " " + content + " " + (page.keywords || []).join(" ").toLowerCase();
      if (title.indexOf(searchTerm) >= 0) score += 12;
      if (desc.indexOf(searchTerm) >= 0) score += 6;
      if (headings.indexOf(searchTerm) >= 0) score += 5;
      if (content.indexOf(searchTerm) >= 0) score += 3;
      (page.keywords || []).forEach(function (kw) {
        if (String(kw).toLowerCase().indexOf(searchTerm) >= 0) score += 2;
      });
      if (terms.length > 1 && terms.every(function (t) { return haystack.indexOf(t) >= 0; })) score += 4;
      if (score > 0) {
        var snippet = page.description || "";
        if (score < 12 && content.indexOf(terms[0]) >= 0) {
          var idx = content.indexOf(terms[0]);
          snippet = (idx > 40 ? "…" : "") + (page.content || "").slice(Math.max(0, idx - 40), idx + 140) + "…";
        }
        results.push(Object.assign({}, page, { score: score, description: snippet }));
      }
    });

    document.querySelectorAll('.section[id], .section h2, .section h3').forEach(function (el) {
      var text = (el.textContent || '').toLowerCase();
      if (text.indexOf(searchTerm) >= 0) {
        var section = el.classList && el.classList.contains('section') ? el : el.closest('.section');
        var id = (section && section.id) || el.id || '';
        var title = el.tagName.match(/^H[234]$/) ? el.textContent.trim() : (section && section.querySelector('h2,h3')) ? section.querySelector('h2,h3').textContent.trim() : text.substring(0, 60);
        if (title && !results.some(function (r) { return r.url === '#' + id; })) {
          results.push({ title: title, url: id ? '#' + id : window.location.pathname.split('/').pop(), description: text.substring(0, 120) + '…', score: 3, matchType: 'content' });
        }
      }
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 20);
  }

  function escapeHtml(text) {
    if (text == null) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function highlightText(text, query) {
    var safeText = escapeHtml(text);
    if (!query) return safeText;
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return safeText.replace(regex, '<mark>$1</mark>');
  }

  function displaySearchResults(results, query) {
    var searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    if (!results.length) {
      searchResults.innerHTML = '<div class="no-results">No results found</div>';
      searchResults.classList.add('active');
      return;
    }
    searchResults.innerHTML = results.map(function (result, index) {
      var isAnchor = result.url.indexOf('#') === 0;
      var fullUrl;
      if (isAnchor) {
        fullUrl = (window.location.pathname.split('/').pop() || 'index.html') + result.url;
      } else if (result.url.indexOf('../') === 0 || result.url.indexOf('/') === 0) {
        fullUrl = result.url;
      } else {
        fullUrl = getBasePath() + result.url;
      }
      return '<div class="result-item ' + (index === 0 ? 'active' : '') + '">' +
        '<a href="' + fullUrl + '">' +
        '<div class="result-title">' + highlightText(result.title, query) + '</div>' +
        '<div class="result-description">' + highlightText(result.description, query) + '</div>' +
        (result.matchType ? '<div class="result-type">' + result.matchType + '</div>' : '') +
        '</a></div>';
    }).join('');
    searchResults.classList.add('active');
  }

  function createSearchUI() {
    var actions =
      document.querySelector('.docs-shell-actions') ||
      document.querySelector('header .header-content');
    if (!actions || document.getElementById('docSearchInput')) return;

    var searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML =
      '<div class="search-wrapper">' +
      '<input type="text" id="docSearchInput" class="search-input" placeholder="Search…" autocomplete="off" />' +
      '<kbd class="search-kbd" aria-hidden="true">⌘K</kbd>' +
      '<div id="searchResults" class="search-results"></div></div>';
    actions.appendChild(searchContainer);

    var searchInput = document.getElementById('docSearchInput');
    var searchResults = document.getElementById('searchResults');
    var searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      var query = this.value;
      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
      }
      searchTimeout = setTimeout(function () {
        displaySearchResults(searchDocumentation(query), query);
      }, 180);
    });

    searchInput.addEventListener('focus', function () {
      if (this.value.length >= 2) displaySearchResults(searchDocumentation(this.value), this.value);
    });

    document.addEventListener('click', function (e) {
      if (!searchContainer.contains(e.target)) searchResults.classList.remove('active');
    });
  }

  function bootSearch() {
    loadSearchIndex(function () {
      if (document.querySelector('.docs-shell-actions') || document.querySelector('header .header-content')) {
        createSearchUI();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSearch);
  } else {
    bootSearch();
  }
  document.addEventListener('docs-header-ready', bootSearch);
})();
