(function () {
  'use strict';
  var cfg = window.DOCS_CONFIG || { APP_NAME: 'Tracopus', APP_LABEL: 'Tracopus' };
  var name = cfg.APP_NAME || cfg.APP_LABEL || 'Tracopus';

  function replaceBrand(text) {
    if (!text) return text;
    return text
      .replace(/\{\{BRAND\}\}/g, name)
      .replace(/FamStack/g, name)
      .replace(/Famstack/g, name)
      .replace(/Tracopus/g, name);
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      var next = replaceBrand(node.textContent);
      if (next !== node.textContent) node.textContent = next;
      return;
    }
    if (node.nodeType !== 1 || node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
    ['title', 'alt', 'placeholder', 'aria-label'].forEach(function (attr) {
      var val = node.getAttribute(attr);
      if (!val) return;
      var n = replaceBrand(val);
      if (n !== val) node.setAttribute(attr, n);
    });
    Array.prototype.slice.call(node.childNodes).forEach(walk);
  }

  function apply() {
    if (document.title) document.title = replaceBrand(document.title);
    document.querySelectorAll('[data-brand]').forEach(function (el) {
      el.textContent = name;
    });
    if (document.body) walk(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
