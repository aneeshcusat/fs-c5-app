/**
 * Fit brand tagline text to logo width (matches infleca-apps/tracopus BrandMark).
 */
(function (global) {
  'use strict';

  var TAGLINE_BASE_FONT_PX = 7;

  function fitBrandTaglineToLogo(logoEl, shellEl, taglineEl, baseFontPx) {
    if (!logoEl || !shellEl || !taglineEl) return;

    var img = logoEl.tagName === 'IMG' ? logoEl : logoEl.querySelector('img');
    if (!img) return;

    var targetWidth = img.getBoundingClientRect().width;
    if (targetWidth <= 0) return;

    shellEl.style.width = targetWidth + 'px';

    taglineEl.style.width = 'auto';
    taglineEl.style.maxWidth = 'none';
    taglineEl.style.overflow = 'visible';
    taglineEl.style.transform = 'none';
    taglineEl.style.fontSize = (baseFontPx || TAGLINE_BASE_FONT_PX) + 'px';

    var naturalWidth = taglineEl.getBoundingClientRect().width;
    if (naturalWidth <= 0) return;

    var scaleX = targetWidth / naturalWidth;
    taglineEl.style.transform = 'scaleX(' + scaleX + ')';
    taglineEl.style.transformOrigin = 'center center';
  }

  function attachBrandTaglineFit(logoEl, shellEl, taglineEl, baseFontPx) {
    if (!logoEl || !shellEl || !taglineEl) {
      return function () {};
    }

    var sync = function () {
      window.requestAnimationFrame(function () {
        fitBrandTaglineToLogo(logoEl, shellEl, taglineEl, baseFontPx);
      });
    };

    var img = logoEl.tagName === 'IMG' ? logoEl : logoEl.querySelector('img');
    var observer;

    if (typeof ResizeObserver !== 'undefined' && img) {
      observer = new ResizeObserver(sync);
      observer.observe(img);
    }

    if (img) {
      if (img.complete) sync();
      else img.addEventListener('load', sync);
    } else {
      sync();
    }

    window.addEventListener('resize', sync);
    if (global.document && global.document.fonts && global.document.fonts.ready) {
      global.document.fonts.ready.then(sync).catch(function () {});
    }

    return function cleanup() {
      if (observer) observer.disconnect();
      if (img) img.removeEventListener('load', sync);
      window.removeEventListener('resize', sync);
    };
  }

  function syncAllBrandTaglines(root) {
    var scope = root || global.document;
    if (!scope || !scope.querySelectorAll) return [];

    var cleanups = [];
    scope.querySelectorAll('[data-brand-tagline-root]').forEach(function (block) {
      var logoEl = block.querySelector('[data-brand-tagline-logo]');
      var shellEl = block.querySelector('[data-brand-tagline-shell]');
      var taglineEl = block.querySelector('[data-brand-tagline-text]');
      if (logoEl && shellEl && taglineEl) {
        cleanups.push(attachBrandTaglineFit(logoEl, shellEl, taglineEl));
      }
    });
    return cleanups;
  }

  global.BrandTaglineFit = {
    TAGLINE_BASE_FONT_PX: TAGLINE_BASE_FONT_PX,
    fitBrandTaglineToLogo: fitBrandTaglineToLogo,
    attachBrandTaglineFit: attachBrandTaglineFit,
    syncAllBrandTaglines: syncAllBrandTaglines
  };
})(typeof window !== 'undefined' ? window : this);
