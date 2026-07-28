// Luxury site enhancements — motion, accordions, progress, keyboard shortcuts
(function () {
  'use strict';

  /* ── Reading progress bar ── */
  function initReadingProgress() {
    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<div class="read-progress__fill"></div>';
    document.body.prepend(bar);

    var fill = bar.querySelector('.read-progress__fill');
    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      fill.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll reveal animations ── */
  function initReveal() {
    var onFaqHub = !!document.querySelector('.faq-page');
    var selector =
      '.doc-block, .callout, .concept-card, .page-index-card, .lux-chart-card, ' +
      '.feature-card, .step, .page-hero, .module-section';
    if (!onFaqHub) {
      selector += ', .faq-item, .doc-mast';
    }
    var targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', Math.min(i * 30, 300) + 'ms');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ── FAQ accordion ── */
  function initFaqAccordion() {
    if (document.querySelector('.faq-page')) return;
    document.querySelectorAll('.faq-item').forEach(function (item, i) {
      var q = item.querySelector('.faq-item__q');
      var a = item.querySelector('.faq-item__a');
      if (!q || !a) return;

      if (!item.id) item.id = 'faq-item-' + i;
      q.setAttribute('role', 'button');
      q.setAttribute('tabindex', '0');
      q.setAttribute('aria-expanded', 'false');

      function toggle() {
        var open = item.classList.toggle('is-open');
        q.setAttribute('aria-expanded', open);
      }

      q.addEventListener('click', toggle);
      q.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ── Rich callout hover polish ── */
  function initCallouts() {
    document.querySelectorAll('.callout').forEach(function (c) {
      c.classList.add('callout--interactive');
    });
  }

  /* ── Enhanced breadcrumbs ── */
  function enhanceBreadcrumbs() {
    document.querySelectorAll('.breadcrumb').forEach(function (bc) {
      if (bc.classList.contains('breadcrumb--lux')) return;
      bc.classList.add('breadcrumb--lux');
    });
  }

  /* ── Module cards on home ── */
  function enhanceModuleCards() {
    document.querySelectorAll('.page-index-card').forEach(function (card) {
      card.classList.add('page-index-card--lux');
      var strong = card.querySelector('strong');
      if (strong && !card.querySelector('.page-index-card__icon')) {
        var icon = document.createElement('span');
        icon.className = 'page-index-card__icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = strong.textContent.charAt(0);
        card.insertBefore(icon, strong);
      }
    });
  }

  /* ── Keyboard shortcut: Cmd/Ctrl + K for search ── */
  function initSearchShortcut() {
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        var input = document.getElementById('docSearchInput');
        if (input) {
          input.focus();
          input.select();
        }
      }
    });

    var searchInput = document.getElementById('docSearchInput');
    if (searchInput && !searchInput.dataset.enhanced) {
      searchInput.dataset.enhanced = '1';
      searchInput.placeholder = 'Search documentation…  ⌘K';
    }
  }

  /* ── Palette quick-switch in header ── */
  function initHeaderPalette() {
    var actions =
      document.querySelector('.docs-shell-actions') ||
      document.querySelector('body > header .header-content');
    if (!actions || actions.querySelector('.header-palette')) return;

    var cfg = window.DOCS_CONFIG || {};
    var DEFAULT = cfg.DEFAULT_PALETTE || 'emerald';
    var PALETTES = ['emerald', 'indigo', 'sapphire', 'midnight', 'ocean'];
    var wrap = document.createElement('div');
    wrap.className = 'header-palette';
    wrap.setAttribute('title', 'Theme palette — Emerald default');

    var dots = document.createElement('div');
    dots.className = 'header-palette__dots';

    var current = document.documentElement.getAttribute('data-lux-palette') || DEFAULT;

    PALETTES.forEach(function (id) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'header-palette__dot' + (id === current ? ' is-active' : '');
      btn.dataset.palette = id;
      btn.setAttribute('aria-label', id + ' palette');
      btn.addEventListener('click', function () {
        if (window.docsApplyPalette) {
          window.docsApplyPalette(id);
        } else {
          document.documentElement.setAttribute('data-lux-palette', id);
          try { localStorage.setItem('docs-lux-palette', id); } catch (err) {}
        }
        dots.querySelectorAll('.header-palette__dot').forEach(function (d) {
          d.classList.toggle('is-active', d.dataset.palette === id);
        });
      });
      dots.appendChild(btn);
    });

    wrap.appendChild(dots);
    actions.insertBefore(wrap, actions.firstChild);
  }

  /* ── Footer link to scenario user guide ── */
  function enhanceFooterLinks() {
    var anchor = document.querySelector('footer .container > p a[href*="getting-started"]');
    if (!anchor) return;
    var row = anchor.parentElement;
    if (!row || row.querySelector('a[href*="user-guide"]')) return;

    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    var prefix = depth > 0 ? '../' : '';
    var link = document.createElement('a');
    link.href = prefix + 'user-guide/index.html';
    link.textContent = 'Scenario Guide';
    anchor.insertAdjacentElement('afterend', link);
  }

  /* ── Page enter fade ── */
  function initPageEnter() {
    document.body.classList.add('page-enter');
    requestAnimationFrame(function () {
      document.body.classList.add('page-enter--ready');
    });
  }

  function init() {
    initReadingProgress();
    initReveal();
    initFaqAccordion();
    initCallouts();
    enhanceBreadcrumbs();
    enhanceModuleCards();
    enhanceFooterLinks();
    initPageEnter();

    setTimeout(initSearchShortcut, 300);
    setTimeout(initHeaderPalette, 300);
  }

  function boot() {
    init();
    setTimeout(initHeaderPalette, 50);
    setTimeout(initSearchShortcut, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  document.addEventListener('docs-header-ready', function () {
    initHeaderPalette();
    initSearchShortcut();
  });
})();
