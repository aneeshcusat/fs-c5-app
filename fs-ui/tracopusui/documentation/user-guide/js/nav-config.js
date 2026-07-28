/** Scenario guide navigation — builds DOCS_NAV for shared navigation.js */
(function (global) {
  'use strict';

  var guide = global.SCENARIO_GUIDE;
  var shared = global.DOCS_UTILITY || {};
  if (!guide) return;

  function mergeHeader(overrides) {
    return Object.assign({}, shared, overrides);
  }

  var modules = {};

  Object.keys(guide.modules).forEach(function (key) {
    var src = guide.modules[key];
    var scenarios = guide.getModuleScenarios(key);
    modules[key] = {
      label: src.label,
      tagline: src.tagline,
      description: src.tagline,
      icon: src.icon || 'doc',
      accent: src.accent,
      index: src.index,
      featured: scenarios.slice(0, 4).map(function (s) { return key + '/' + s.id + '.html'; }),
      pages: [{ label: 'Module overview', href: src.index, desc: 'All ' + src.label + ' scenarios', icon: 'overview' }].concat(
        scenarios.map(function (s) {
          return {
            label: s.title,
            href: key + '/' + s.id + '.html',
            desc: s.feature + ' · ' + s.steps.length + ' steps',
            icon: 'doc'
          };
        })
      )
    };
  });

  var modulePages = Object.keys(modules).map(function (key) {
    return { label: modules[key].label, href: modules[key].index, desc: modules[key].tagline, icon: modules[key].icon };
  });

  var moduleOrder = [
    'auth', 'workspace', 'hrms', 'people', 'project', 'sales', 'resources',
    'finance', 'payroll', 'performance', 'analytics', 'integrations', 'ai', 'admin', 'mobile'
  ];

  global.SCENARIO_NAV = {
    header: mergeHeader({
      eyebrow: 'Scenario User Guide',
      brandEmphasis: 'Scenario Guide',
      subtitle: 'Feature → Scenario → Steps',
      homeHref: '__docs__/user-guide/index.html'
    }),
    modules: modules,
    topNav: [],
    moduleNav: [
      { type: 'link', label: 'Home', href: 'index.html', icon: 'home' },
      { type: 'link', label: 'Charts', href: '__docs__/charts.html', icon: 'chart' },
      { type: 'link', label: 'Data flow', href: '__docs__/data-flow/index.html', icon: 'doc' },
      { type: 'link', label: 'Admin', href: '__docs__/admin.html', icon: 'admin' },
      { sepBefore: true, type: 'mega', module: 'auth' },
    ].concat(
      moduleOrder.filter(function (key) { return key !== 'auth' && modules[key]; }).map(function (key) {
        return { type: 'mega', module: key };
      })
    ),
    homeSidebar: [
      { label: 'Home', href: 'index.html' },
      { label: 'All scenarios', href: 'scenarios.html' },
      { label: 'Interactive data flow', href: '__docs__/data-flow/index.html' },
      { label: 'Documentation', href: '__docs__/index.html' },
      { label: 'Use Case Catalog', href: '__docs__/tracopus-use-case-catalog.html' },
      { label: 'API Docs', href: '__docs__/api-docs.html' },
      { label: 'Test Plan', href: '__docs__/tracopus-test-plan.html' },
      { label: 'Getting Started', href: '__docs__/getting-started.html' }
    ].concat(modulePages)
  };

  global.DOCS_NAV = global.SCENARIO_NAV;
})(typeof window !== 'undefined' ? window : global);
