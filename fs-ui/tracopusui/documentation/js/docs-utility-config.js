/**
 * Shared docs-utility-bar — identical stats, quick links, and CTA on every documentation page.
 * Load before nav-config.js on all pages (docs, scenario guide, use case catalog, test plan).
 * Links use __docs__/ prefix — resolved by navigation.js from any folder depth.
 */
(function (global) {
  'use strict';

  global.DOCS_UTILITY = {
    stats: [
      { label: 'Screen guides', value: '48' },
      { label: 'Scenarios', value: '65' },
        { label: 'Use cases', value: '718' },
        { label: 'Test scenarios', value: '10478' },
      { label: 'Edition', value: 'Luxury UI' }
    ],
    quickLinks: [
      { label: 'Documentation', href: '__docs__/index.html', icon: 'home', desc: 'Screen reference home' },
      { label: 'User flows', href: '__docs__/user-flows/index.html', icon: 'list', desc: 'Scenarios ↔ screen guides' },
      { label: 'Scenario Guide', href: '__docs__/user-guide/index.html', icon: 'list', desc: 'Step-by-step workflows' },
      { label: 'Use Case Catalog', href: '__docs__/tracopus-use-case-catalog.html', icon: 'doc', desc: '718 entries + gap UCs' },
      { label: 'API Docs', href: '__docs__/api-docs.html', icon: 'config', desc: 'Endpoints, curl & related APIs' },
      { label: 'Test Plan', href: '__docs__/tracopus-test-plan.html', icon: 'list', desc: 'QA + GD01–GD16 matrix' },
      { label: 'Getting Started', href: '__docs__/getting-started.html', icon: 'rocket', desc: 'Onboard in minutes' },
      { label: 'FAQ', href: '__docs__/faq/index.html', icon: 'help', desc: 'Common questions' }
    ],
    cta: {
      label: 'Open Tracopus',
      href: 'https://tracopus.com',
      external: true
    }
  };
})(typeof window !== 'undefined' ? window : this);
