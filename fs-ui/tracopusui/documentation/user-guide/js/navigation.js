/**
 * Scenario guide pages use shared navigation from doucuments/js/navigation.js.
 * HTML pages load ../js/navigation.js (or ../../js/ at module depth).
 * This stub remains for legacy direct references only.
 */
(function () {
  'use strict';
  if (typeof window !== 'undefined' && !document.querySelector('script[src*="doucuments/js/navigation"]')) {
    console.warn('[scenario-guide] Load ../js/navigation.js from HTML instead of user-guide/js/navigation.js');
  }
})();
