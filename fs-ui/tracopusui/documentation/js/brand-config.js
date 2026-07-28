/** Local brand & theme config — docs folder is independent of the main application. */
window.DOCS_CONFIG = {
  APP_NAME: 'Tracopus',
  APP_LABEL: 'Tracopus',
  BRAND_TAGLINE: 'Enterprise Work Intelligence',
  APP_TAGLINE: 'Enterprise Work Intelligence',
  VERSION: '2.0 — Luxury UI',
  LUX_THEME: 'luxury',
  DEFAULT_PALETTE: 'forest',
  /** GA4 property for documentation site (static HTML). */
  GA_MEASUREMENT_ID: 'G-RJXWV5HZFK',
  VALID_PALETTES: [
    'emerald', 'indigo', 'sapphire', 'rose', 'midnight', 'amber',
    'violet', 'ocean', 'sunset', 'graphite', 'crimson', 'forest'
  ]
};

(function () {
  'use strict';
  var cfg = window.DOCS_CONFIG;
  var root = document.documentElement;
  var fallback = cfg.DEFAULT_PALETTE || 'emerald';
  var stored = fallback;

  root.setAttribute('data-lux-theme', cfg.LUX_THEME || 'luxury');

  try {
    stored = localStorage.getItem('docs-lux-palette') || fallback;
  } catch (e) {}

  if ((cfg.VALID_PALETTES || []).indexOf(stored) === -1) {
    stored = fallback;
  }

  root.setAttribute('data-lux-palette', stored);
})();
