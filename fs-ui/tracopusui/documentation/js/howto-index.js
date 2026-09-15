/** Client filter/search for how-to-index.html (progressive enhancement). */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var qEl = document.getElementById('howto-q');
    var moduleEl = document.getElementById('howto-module');
    var featureEl = document.getElementById('howto-feature');
    var grid = document.getElementById('howto-grid');
    var countEl = document.getElementById('howto-count');
    var emptyEl = document.getElementById('howto-empty');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.howto-index-card'));
    var total = cards.length;

    function apply() {
      var q = ((qEl && qEl.value) || '').trim().toLowerCase();
      var mod = (moduleEl && moduleEl.value) || '';
      var feat = (featureEl && featureEl.value) || '';
      var tokens = q ? q.split(/\s+/).filter(Boolean) : [];
      var shown = 0;
      cards.forEach(function (card) {
        var ok = true;
        if (mod && card.getAttribute('data-module') !== mod) ok = false;
        if (ok && feat && card.getAttribute('data-feature') !== feat) ok = false;
        if (ok && tokens.length) {
          var hay = (card.getAttribute('data-keywords') || card.textContent || '').toLowerCase();
          ok = tokens.every(function (t) { return hay.indexOf(t) >= 0; });
        }
        card.hidden = !ok;
        if (ok) shown += 1;
      });
      if (countEl) countEl.textContent = shown + ' of ' + total + ' how-tos';
      if (emptyEl) emptyEl.hidden = shown > 0;
    }

    if (qEl) qEl.addEventListener('input', apply);
    if (moduleEl) moduleEl.addEventListener('change', apply);
    if (featureEl) featureEl.addEventListener('change', apply);

    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('q') && qEl) qEl.value = params.get('q');
      if (params.get('module') && moduleEl) moduleEl.value = params.get('module');
      if (params.get('feature') && featureEl) featureEl.value = params.get('feature');
    } catch (e) { /* ignore */ }

    apply();
  });
})();
