(function () {
  'use strict';

  var PALETTES = [
    { id: 'indigo', label: 'Indigo', primary: '#5b5ff4', accent: '#19c6c3' },
    { id: 'sapphire', label: 'Sapphire', primary: '#2563eb', accent: '#06b6d4' },
    { id: 'emerald', label: 'Emerald', primary: '#059669', accent: '#10b981' },
    { id: 'rose', label: 'Rose', primary: '#e11d48', accent: '#f97316' },
    { id: 'midnight', label: 'Midnight', primary: '#6366f1', accent: '#a78bfa' },
    { id: 'amber', label: 'Amber', primary: '#d97706', accent: '#f59e0b' },
    { id: 'violet', label: 'Violet', primary: '#7c3aed', accent: '#c084fc' },
    { id: 'ocean', label: 'Ocean', primary: '#0d9488', accent: '#38bdf8' },
    { id: 'sunset', label: 'Sunset', primary: '#ea580c', accent: '#fb7185' },
    { id: 'graphite', label: 'Graphite', primary: '#475569', accent: '#64748b' },
    { id: 'crimson', label: 'Crimson', primary: '#dc2626', accent: '#f87171' },
    { id: 'forest', label: 'Forest', primary: '#166534', accent: '#4ade80' }
  ];

  var STORAGE_KEY = 'docs-lux-palette';

  function initPaletteAttr() {
    var stored = 'emerald';
    try { stored = localStorage.getItem(STORAGE_KEY) || 'emerald'; } catch (e) {}
    document.documentElement.setAttribute('data-lux-palette', stored);
  }

  function bindPicker() {
    var grid = document.getElementById('palette-grid');
    if (!grid) return;
    var current = document.documentElement.getAttribute('data-lux-palette') || 'emerald';

    PALETTES.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-swatch' + (p.id === current ? ' is-active' : '');
      btn.setAttribute('data-palette', p.id);
      btn.setAttribute('title', p.label);
      btn.innerHTML =
        '<span class="palette-swatch__dot" style="background:linear-gradient(135deg,' +
        p.primary + ',' + p.accent + ')"></span><span class="palette-swatch__label">' +
        p.label + '</span>';
      btn.addEventListener('click', function () {
        document.documentElement.setAttribute('data-lux-palette', p.id);
        try { localStorage.setItem(STORAGE_KEY, p.id); } catch (e) {}
        grid.querySelectorAll('.palette-swatch').forEach(function (el) {
          el.classList.remove('is-active');
        });
        btn.classList.add('is-active');
      });
      grid.appendChild(btn);
    });
  }

  initPaletteAttr();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPicker);
  } else {
    bindPicker();
  }
})();
