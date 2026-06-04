(function () {
  'use strict';

  var searchInput = document.getElementById('appcfg-search');
  var toolbar = document.getElementById('appcfg-toolbar');
  var cards = document.querySelectorAll('.config-doc-card');
  var moduleBlocks = document.querySelectorAll('.config-module-block');
  var jumpLinks = document.querySelectorAll('.appcfg-jump__link');
  var emptyState = document.getElementById('appcfg-empty');

  function normalize(text) {
    return (text || '').toLowerCase().trim();
  }

  function filterCards() {
    if (!searchInput || !cards.length) return;
    var q = normalize(searchInput.value);
    var visible = 0;

    cards.forEach(function (card) {
      var hay = normalize(card.getAttribute('data-search') || card.textContent);
      var show = !q || hay.indexOf(q) >= 0;
      card.classList.toggle('config-doc-card--hidden', !show);
      if (show) visible += 1;
    });

    moduleBlocks.forEach(function (block) {
      var blockCards = block.querySelectorAll('.config-doc-card:not(.config-doc-card--hidden)');
      block.classList.toggle('config-module-block--empty', blockCards.length === 0 && q.length > 0);
    });

    if (emptyState) {
      emptyState.hidden = visible > 0 || !q;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterCards();
        searchInput.blur();
      }
    });
  }

  function setActiveJump() {
    if (!jumpLinks.length) return;
    var scrollY = window.scrollY + (toolbar ? toolbar.offsetHeight + 80 : 100);
    var current = null;

    moduleBlocks.forEach(function (block) {
      if (block.offsetTop <= scrollY) current = block.id;
    });

    jumpLinks.forEach(function (link) {
      var target = (link.getAttribute('href') || '').replace('#', '');
      link.classList.toggle('is-active', target === current);
    });
  }

  jumpLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      var offset = toolbar ? toolbar.offsetHeight + 12 : 12;
      var top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', setActiveJump, { passive: true });
  setActiveJump();

  document.querySelectorAll('.appcfg-module-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.config-module-block');
      if (!block) return;
      var collapsed = block.classList.toggle('config-module-block--collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.textContent = collapsed ? 'Expand module' : 'Collapse module';
    });
  });
})();
