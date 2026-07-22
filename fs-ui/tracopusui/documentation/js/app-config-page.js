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

  /**
   * Convert Flag | Controls | Value tables into stacked rows so descriptions
   * stay fully visible for both inputType list and group cards.
   */
  function enhancePermissionTables() {
    document.querySelectorAll('.access-table-wrap').forEach(function (wrap) {
      if (wrap.getAttribute('data-enhanced') === '1') return;
      var table = wrap.querySelector('table');
      if (!table) return;
      var rows = table.querySelectorAll('tbody tr');
      if (!rows.length) return;

      var list = document.createElement('div');
      list.className = 'access-flag-list';
      list.setAttribute('role', 'list');

      rows.forEach(function (tr) {
        var cells = tr.querySelectorAll('td');
        if (cells.length < 2) return;

        var flagHtml = cells[0].innerHTML;
        var controlsHtml = '';
        var valueHtml = '';

        if (cells.length >= 3) {
          controlsHtml = cells[1].innerHTML;
          valueHtml = cells[2].innerHTML;
        } else {
          valueHtml = cells[1].innerHTML;
        }

        var item = document.createElement('article');
        item.className = 'access-flag-item';
        item.setAttribute('role', 'listitem');

        var top = document.createElement('div');
        top.className = 'access-flag-item__top';

        var flag = document.createElement('div');
        flag.className = 'access-flag-item__flag';
        flag.innerHTML = flagHtml;
        top.appendChild(flag);

        if (valueHtml) {
          var val = document.createElement('div');
          val.className = 'access-flag-item__value';
          val.innerHTML = valueHtml;
          top.appendChild(val);
        }

        item.appendChild(top);

        if (controlsHtml && controlsHtml.trim()) {
          var controls = document.createElement('div');
          controls.className = 'access-flag-item__controls';
          controls.innerHTML =
            '<span class="access-flag-item__controls-label">Controls</span>' +
            '<div class="access-flag-item__controls-text">' +
            controlsHtml +
            '</div>';
          item.appendChild(controls);
        }

        list.appendChild(item);
      });

      if (!list.children.length) return;

      var card = wrap.closest('.config-doc-card');
      if (card) {
        card.classList.add('config-doc-card--flag-matrix');
        var props = card.querySelector('.config-doc-card__props');
        if (props && /group/i.test(props.textContent)) {
          card.classList.add('config-doc-card--input-group');
        }
        if (props && /\blist\b/i.test(props.textContent)) {
          card.classList.add('config-doc-card--input-list');
        }
      }

      wrap.innerHTML = '';
      wrap.appendChild(list);
      wrap.setAttribute('data-enhanced', '1');
    });
  }

  enhancePermissionTables();

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
      var headerH = 0;
      try {
        var raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        headerH = parseInt(raw, 10) || 0;
      } catch (err) { /* ignore */ }
      var offset = (toolbar ? toolbar.offsetHeight : 0) + headerH + 16;
      var top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
