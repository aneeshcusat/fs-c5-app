(function () {
  'use strict';

  function renderModuleIndex(moduleId) {
    var guide = window.SCENARIO_GUIDE;
    if (!guide) return;

    var mod = guide.modules[moduleId];
    var features = guide.getFeatures(moduleId);
    var root = document.getElementById('module-scenarios');
    var hero = document.getElementById('module-hero');

    if (hero && mod) {
      hero.innerHTML =
        '<div class="eyebrow">' + mod.label + '</div>' +
        '<h1>' + mod.label + ' scenarios</h1>' +
        '<p class="lead">' + mod.tagline + '</p>' +
        '<p class="scenario-structure-diagram"><strong>Feature</strong> → <strong>Scenario</strong> → <strong>Steps</strong></p>';
    }

    if (!root) return;

    var html = '';
    Object.keys(features).sort().forEach(function (feature) {
      html += '<section class="feature-group"><h2 class="feature-group__title">' + feature + '</h2><div class="scenario-card-grid">';
      features[feature].forEach(function (s) {
        var extra = (window.getScenarioEnrichment && window.getScenarioEnrichment(s)) ||
          (window.SCENARIO_ENRICHMENT && window.SCENARIO_ENRICHMENT[s.id]) || {};
        var richMeta = (extra.permissions ? extra.permissions.length + ' permissions' : '') +
          (extra.featureFlags && extra.featureFlags.length ? ' · ' + extra.featureFlags.length + ' flags' : '') +
          (extra.verify && extra.verify.length ? ' · verify checklist' : '');
        html +=
          '<a class="scenario-card" href="' + s.id + '.html">' +
            '<div class="scenario-card__feature">' + s.feature + '</div>' +
            '<div class="scenario-card__title">' + s.title + '</div>' +
            '<div class="scenario-card__meta">' + (s.roles ? s.roles[0] : '') + ' · ' + (s.steps ? s.steps.length : 0) + ' steps</div>' +
            (richMeta ? '<div class="scenario-card__rich">' + richMeta + '</div>' : '') +
          '</a>';
      });
      html += '</div></section>';
    });

    root.innerHTML = html;
  }

  function init() {
    var moduleId = document.body.getAttribute('data-module-id');
    if (moduleId) renderModuleIndex(moduleId);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
