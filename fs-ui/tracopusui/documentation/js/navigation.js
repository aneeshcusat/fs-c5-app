// Luxury navigation — rich header shell, mega-menus, mobile drawer
(function () {
  'use strict';

  var NAV = window.DOCS_NAV || { modules: {}, topNav: [], header: {}, homeSidebar: [] };
  var CFG = window.DOCS_CONFIG || {};
  var brandTaglineFitCleanups = [];

  function fitDocsBrandTagline(logoEl, shellEl, taglineEl) {
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
    taglineEl.style.fontSize = '7px';
    var naturalWidth = taglineEl.getBoundingClientRect().width;
    if (naturalWidth <= 0) return;
    var scaleX = targetWidth / naturalWidth;
    taglineEl.style.transform = 'scaleX(' + scaleX + ')';
    taglineEl.style.transformOrigin = 'center center';
  }

  function attachDocsBrandTaglineFit(logoEl, shellEl, taglineEl) {
    if (!logoEl || !shellEl || !taglineEl) return function () {};
    var sync = function () {
      window.requestAnimationFrame(function () {
        fitDocsBrandTagline(logoEl, shellEl, taglineEl);
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
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(sync).catch(function () {});
    }
    return function cleanup() {
      if (observer) observer.disconnect();
      if (img) img.removeEventListener('load', sync);
      window.removeEventListener('resize', sync);
    };
  }

  function syncDocsBrandTaglines() {
    brandTaglineFitCleanups.forEach(function (cleanup) { cleanup(); });
    brandTaglineFitCleanups = [];
    document.querySelectorAll('[data-brand-tagline-root]').forEach(function (block) {
      var logoEl = block.querySelector('[data-brand-tagline-logo]');
      var shellEl = block.querySelector('[data-brand-tagline-shell]');
      var taglineEl = block.querySelector('[data-brand-tagline-text]');
      if (logoEl && shellEl && taglineEl) {
        brandTaglineFitCleanups.push(attachDocsBrandTaglineFit(logoEl, shellEl, taglineEl));
      }
    });
  }

  var ICONS = {
    home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    rocket: '<path d="M12 3c2 4 2 8 0 12M12 3l-2 2M12 3l2 2M8 15l-2 4 4-2M16 15l2 4-4-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    sparkle: '<path d="M12 2l1.2 4.8L18 8l-4.8 1.2L12 14l-1.2-4.8L6 8l4.8-1.2L12 2zM5 16l.6 2.4L8 19l-2.4.6L5 22l-.6-2.4L2 19l2.4-.6L5 16z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    chart: '<path d="M4 19V5M4 19h16M8 16V11M12 16V8M16 16V13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    admin: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    help: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9a2.5 2.5 0 014.5 1.5c0 2-2.5 2-2.5 4M12 17v.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    hrms: '<circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11h5M18.5 8.5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    sales: '<path d="M4 16l4-8 4 4 4-6 4 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19h16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    project: '<rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 5V3h8v2M8 11h8M8 15h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    mobile: '<rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="1" fill="currentColor"/>',
    overview: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    dashboard: '<rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    people: '<circle cx="9" cy="8" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 18c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 18c.4-2 1.8-3.5 4-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    time: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 3v4M16 3v4M4 10h16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    invoice: '<path d="M6 4h12v16l-3-2-3 2-3-2-3 2V4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 9h6M9 13h6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    doc: '<path d="M8 4h8l4 4v12a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4v4h4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    profile: '<circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    settings: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6l1.4 1.4M5 19l1.4-1.4M17.6 6.4l1.4-1.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    config: '<rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    bid: '<path d="M4 7h16M4 12h10M4 17h14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    order: '<rect x="4" y="6" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6V4h8v2M8 11h8M8 15h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    list: '<path d="M6 7h14M6 12h14M6 17h14M3 7h.5M3 12h.5M3 17h.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    milestone: '<path d="M6 4v16M6 4l4 3-4 3M6 10l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    tasks: '<rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    board: '<rect x="3" y="4" width="5" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="4" width="5" height="11" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="4" width="4" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    activity: '<path d="M4 14l4-4 3 3 5-7 4 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    capacity: '<path d="M4 18V6M20 18V10M12 18V4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="4" cy="6" r="2" fill="currentColor"/><circle cx="12" cy="4" r="2" fill="currentColor"/><circle cx="20" cy="10" r="2" fill="currentColor"/>',
    feedback: '<path d="M4 5h16v10a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    notes: '<path d="M6 4h12v16l-4-3H6a1 1 0 01-1-1V5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    files: '<path d="M4 7h7l2 2h7v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    chat: '<path d="M5 5h14v10a1 1 0 01-1 1H9l-4 3V6a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    search: '<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 16l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    login: '<rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h6M12 9v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    external: '<path d="M14 5h5v5M10 14l9-9M19 10v8a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
  };

  function svgIcon(name, className) {
    var paths = ICONS[name] || ICONS.doc;
    return '<svg class="' + (className || 'lux-icon') + '" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">' + paths + '</svg>';
  }

  function docsRootPrefix() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    var isGuide = document.body.classList.contains('scenario-guide-site');
    if (isGuide) {
      var p = '../';
      for (var i = 0; i < depth; i++) p += '../';
      return p;
    }
    if (depth === 0) return '';
    var p2 = '../';
    for (var j = 1; j < depth; j++) p2 += '../';
    return p2;
  }

  function getPrefix() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    return depth > 0 ? '../' : '';
  }

  function resolveHref(href) {
    if (!href || href.charAt(0) === '#') return href;
    if (/^https?:\/\//.test(href)) return href;

    /* Cross-site links — work from any folder depth */
    if (href.indexOf('__docs__/') === 0) {
      return docsRootPrefix() + href.slice('__docs__/'.length);
    }

    var prefix = getPrefix();
    var isGuide = document.body.classList.contains('scenario-guide-site');

    if (isGuide && (href === '../index.html' || href === '../../index.html')) {
      return docsRootPrefix() + 'index.html';
    }

    if (!prefix) return href;
    if (href.indexOf('../') === 0) return href;
    if (href.indexOf('/') >= 0) return prefix + href;

    var guideRootPages = ['index.html', 'scenarios.html'];
    var rootPages = isGuide
      ? guideRootPages
      : ['index.html', 'getting-started.html', 'interface.html', 'charts.html', 'admin.html', 'tracopus-use-case-catalog.html', 'tracopus-test-plan.html', 'api-docs.html'];

    if (rootPages.indexOf(href) >= 0) return prefix + href;
    if (href.indexOf('faq/') === 0 || href.indexOf('user-guide/') === 0) return prefix + href;
    return href;
  }

  function pageKey() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (!parts.length) return 'index.html';
    var file = parts[parts.length - 1] || 'index.html';
    if (parts.length >= 2) {
      var folder = parts[parts.length - 2];
      if (NAV.modules[folder]) return folder + '/' + file;
    }
    return file;
  }

  function hrefMatchesCurrent(href) {
    if (!href || href.charAt(0) === '#') return false;
    var key = pageKey();
    var normalized = href.replace(/^\.\//, '');
    return key === normalized || key.endsWith('/' + normalized.split('/').pop());
  }

  function moduleFromPath() {
    var key = pageKey();
    var folder = key.split('/')[0];
    return NAV.modules[folder] ? folder : null;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function removeSidebar() {
    document.querySelectorAll('body > aside.sidebar').forEach(function (el) {
      el.remove();
    });
    document.body.classList.add('layout-full');
  }

  function buildUtilityBar(meta) {
    var statsHtml = (meta.stats || []).map(function (s) {
      return '<span class="docs-utility-stat"><strong>' + escapeHtml(s.value) + '</strong> ' + escapeHtml(s.label) + '</span>';
    }).join('');

    var quickHtml = (meta.quickLinks || []).map(function (q) {
      return (
        '<a class="docs-utility-link" href="' + resolveHref(q.href) + '">' +
        svgIcon(q.icon, 'lux-icon lux-icon--sm') +
        '<span>' + escapeHtml(q.label) + '</span></a>'
      );
    }).join('');

    var cta = meta.cta || {};
    var ctaHtml = cta.href
      ? '<a class="docs-utility-cta" href="' + escapeHtml(cta.href) + '"' +
        (cta.external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
        escapeHtml(cta.label) + svgIcon('external', 'lux-icon lux-icon--xs') + '</a>'
      : '';

    return (
      '<div class="docs-utility-bar">' +
      '<div class="docs-utility-bar__inner">' +
      '<div class="docs-utility-bar__stats">' + statsHtml + '</div>' +
      '<div class="docs-utility-bar__links">' + quickHtml + ctaHtml + '</div>' +
      '</div></div>'
    );
  }

  function rebuildHeaderShell() {
    var header = document.querySelector('body > header');
    var oldNav = document.querySelector('body > nav');
    if (!header || header.classList.contains('docs-shell-header')) return;

    var brandLink = header.querySelector('.header-brand__link');
    var logoEl = header.querySelector('.header-logo');
    var meta = NAV.header || {};
    var homeHref = resolveHref(meta.homeHref || (brandLink ? brandLink.getAttribute('href') : null) || 'index.html');
    var logoSrc = logoEl ? logoEl.getAttribute('src') : docsRootPrefix() + 'images/tracopus-logo.png';
    var appName = CFG.APP_NAME || 'Tracopus';
    var brandEmphasis = meta.brandEmphasis || 'User Guide';
    var brandTagline = CFG.BRAND_TAGLINE || 'Enterprise Work Intelligence';

    header.className = 'docs-shell-header';
    header.innerHTML =
      buildUtilityBar(meta) +
      '<div class="docs-shell-header__inner">' +
      '  <div class="docs-topbar">' +
      '    <a class="docs-shell-brand" href="' + homeHref + '" aria-label="Documentation home">' +
      '      <span class="docs-shell-brand__wordmark" data-brand-tagline-root>' +
      '        <span class="docs-shell-brand__logo-wrap" data-brand-tagline-logo>' +
      '          <img src="' + logoSrc + '" alt="' + escapeHtml(appName) + ' logo" class="docs-shell-brand__logo docs-shell-brand__logo--plain" ' +
      'onerror="this.classList.add(\'is-hidden\')">' +
      '        </span>' +
      '        <span class="docs-shell-brand__wordmark-footer">' +
      '          <span class="docs-shell-brand__rule" aria-hidden="true"></span>' +
      '          <span class="docs-shell-brand__tagline-shell" data-brand-tagline-shell>' +
      '            <span class="docs-shell-brand__tagline" data-brand-tagline-text>' + escapeHtml(brandTagline) + '</span>' +
      '          </span>' +
      '        </span>' +
      '      </span>' +
      '      <span class="docs-shell-brand__text">' +
      '        <span class="docs-shell-brand__eyebrow">' + escapeHtml(meta.eyebrow || 'Official Documentation') + '</span>' +
      '        <span class="docs-shell-brand__name">' + escapeHtml(appName) + ' <em>' + escapeHtml(brandEmphasis) + '</em></span>' +
      '      </span>' +
      '    </a>' +
      '    <div class="docs-topbar__tools">' +
      '      <button type="button" class="menu-toggle" aria-label="Open menu" aria-expanded="false">' +
      '        <span></span><span></span><span></span>' +
      '      </button>' +
      '      <div class="docs-shell-actions"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="docs-menubar">' +
      '    <nav class="docs-shell-nav docs-shell-nav--modules" aria-label="Documentation navigation">' +
      '      <div class="docs-shell-nav__inner docs-shell-nav__inner--modules"></div>' +
      '    </nav>' +
      '  </div>' +
      '</div>';

    if (oldNav) oldNav.remove();
  }

  function navContainer() {
    return document.querySelector('.docs-shell-nav__inner--modules') ||
      document.querySelector('.docs-shell-nav__inner');
  }

  function buildPageLink(pg) {
    return (
      '<a class="lux-nav__panel-link' + (hrefMatchesCurrent(pg.href) ? ' is-active' : '') + '" href="' + resolveHref(pg.href) + '" role="menuitem">' +
      '<span class="lux-nav__panel-link-icon">' + svgIcon(pg.icon || 'doc', 'lux-icon lux-icon--panel') + '</span>' +
      '<span class="lux-nav__panel-link-body">' +
      '<span class="lux-nav__panel-link-title">' + escapeHtml(pg.label) + '</span>' +
      '<span class="lux-nav__panel-link-desc">' + escapeHtml(pg.desc) + '</span>' +
      '</span></a>'
    );
  }

  function buildMegaPanel(mod, moduleKey) {
    var featured = (mod.featured || []).map(function (href) {
      return mod.pages.filter(function (p) { return p.href === href; })[0];
    }).filter(Boolean);

    var featuredSet = {};
    featured.forEach(function (p) { featuredSet[p.href] = true; });

    var featuredLabel = moduleKey === 'userFlows' ? 'Featured flows' : 'Featured';
    var allLabel = moduleKey === 'userFlows' ? 'All flows' : 'All guides';
    var exploreLabel = moduleKey === 'userFlows' ? 'Open user flows hub' : 'Explore module';
    var viewAllLabel = moduleKey === 'userFlows'
      ? 'View all user flows'
      : ('View all ' + escapeHtml(mod.label) + ' documentation');

    var featuredHtml = featured.length
      ? '<div class="lux-nav__panel-featured">' +
        '<span class="lux-nav__panel-section-label">' + featuredLabel + '</span>' +
        '<div class="lux-nav__panel-featured-grid">' +
        featured.map(buildPageLink).join('') +
        '</div></div>'
      : '';

    var restPages = mod.pages.filter(function (p) { return !featuredSet[p.href]; });
    var restHtml = restPages.map(buildPageLink).join('');

    var allGuidesSection = restHtml
      ? '<div class="lux-nav__panel-grid-wrap">' +
        '<span class="lux-nav__panel-section-label">' + allLabel + '</span>' +
        '<div class="lux-nav__panel-grid">' + restHtml + '</div></div>'
      : '';

    return (
      '<div class="lux-nav__panel lux-nav__panel--rich" role="menu" data-module="' + moduleKey + '">' +
      '<div class="lux-nav__panel-layout">' +
      '<aside class="lux-nav__panel-hero" style="--module-accent:' + (mod.accent || '#10b981') + '">' +
      '<span class="lux-nav__panel-hero-icon">' + svgIcon(mod.icon, 'lux-icon lux-icon--hero') + '</span>' +
      '<strong class="lux-nav__panel-hero-title">' + escapeHtml(mod.label) + '</strong>' +
      '<span class="lux-nav__panel-hero-tagline">' + escapeHtml(mod.tagline) + '</span>' +
      '<p class="lux-nav__panel-hero-desc">' + escapeHtml(mod.description || '') + '</p>' +
      '<span class="lux-nav__panel-hero-count">' + mod.pages.length + (moduleKey === 'userFlows' ? ' flows' : ' guides') + '</span>' +
      '<a class="lux-nav__panel-hero-cta" href="' + resolveHref(mod.index) + '">' + exploreLabel + svgIcon('chevron', 'lux-icon lux-icon--xs lux-icon--cta') + '</a>' +
      '</aside>' +
      '<div class="lux-nav__panel-content">' +
      featuredHtml +
      allGuidesSection +
      '<a class="lux-nav__panel-all" href="' + resolveHref(mod.index) + '">' + viewAllLabel + '</a>' +
      '</div></div></div>'
    );
  }

  function bindMegaItem(li, trigger) {
    li.addEventListener('mouseenter', function () {
      if (window.innerWidth > 960) li.classList.add('is-open');
    });
    li.addEventListener('mouseleave', function () {
      li.classList.remove('is-open');
    });
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        li.classList.toggle('is-open');
      }
    });
    trigger.addEventListener('focus', function () {
      if (window.innerWidth > 960) li.classList.add('is-open');
    });
    li.addEventListener('focusout', function (e) {
      if (!li.contains(e.relatedTarget)) li.classList.remove('is-open');
    });
  }

  function getNavSections() {
    var linkNav = NAV.topNav || [];
    var moduleNav = NAV.moduleNav || [];
    if (!NAV.moduleNav && NAV.topNav) {
      linkNav = NAV.topNav.filter(function (item) { return item.type !== 'mega'; });
      moduleNav = NAV.topNav.filter(function (item) { return item.type === 'mega'; });
    }
    return { linkNav: linkNav, moduleNav: moduleNav };
  }

  function buildNavList(container, items) {
    if (!container) return null;
    container.innerHTML = '';
    if (!items || !items.length) return null;

    var ul = document.createElement('ul');
    ul.className = 'lux-nav__list';
    ul.setAttribute('role', 'menubar');

    items.forEach(function (item) {
      if (item.sepBefore) {
        var sep = document.createElement('li');
        sep.className = 'lux-nav__sep';
        sep.setAttribute('aria-hidden', 'true');
        ul.appendChild(sep);
      }

      var li = document.createElement('li');
      li.className = 'lux-nav__item';
      li.setAttribute('role', 'none');

      if (item.type === 'mega' && NAV.modules[item.module]) {
        var mod = NAV.modules[item.module];
        li.classList.add('lux-nav__item--mega');
        var isModuleActive = moduleFromPath() === item.module;

        var trigger = document.createElement('a');
        trigger.href = resolveHref(mod.index);
        trigger.className = 'lux-nav__trigger lux-nav__trigger--module' + (isModuleActive ? ' active' : '');
        trigger.setAttribute('role', 'menuitem');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-label', mod.label);
        trigger.setAttribute('title', mod.label);
        trigger.innerHTML =
          '<span class="lux-nav__trigger-icon">' + svgIcon(mod.icon, 'lux-icon lux-icon--nav') + '</span>' +
          '<span class="lux-nav__label">' + escapeHtml(mod.label) + '</span>' +
          '<span class="lux-nav__count" aria-hidden="true">' + mod.pages.length + '</span>' +
          '<svg class="lux-nav__chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">' + ICONS.chevron + '</svg>';

        li.innerHTML = buildMegaPanel(mod, item.module);
        li.insertBefore(trigger, li.firstChild);
        bindMegaItem(li, trigger);
      } else if (item.type === 'link') {
        li.classList.add('lux-nav__item--link');
        var link = document.createElement('a');
        link.href = resolveHref(item.href);
        link.className = 'lux-nav__link lux-nav__link--bar' + (hrefMatchesCurrent(item.href) ? ' active' : '');
        link.setAttribute('role', 'menuitem');
        link.setAttribute('aria-label', item.label);
        link.setAttribute('title', item.label);
        link.innerHTML =
          (item.icon ? '<span class="lux-nav__link-icon">' + svgIcon(item.icon, 'lux-icon lux-icon--nav') + '</span>' : '') +
          '<span class="lux-nav__label">' + escapeHtml(item.label) + '</span>' +
          (item.badge ? '<span class="lux-nav__badge" aria-hidden="true">' + escapeHtml(item.badge) + '</span>' : '');
        li.appendChild(link);
      }

      ul.appendChild(li);
    });

    container.appendChild(ul);
    return ul;
  }

  function buildLuxNav() {
    var sections = getNavSections();
    var modules = document.querySelector('.docs-shell-nav__inner--modules');
    var items = sections.linkNav.concat(sections.moduleNav);

    var moduleUl = buildNavList(modules, items);

    if (moduleUl) {
      var megaItems = moduleUl.querySelectorAll('.lux-nav__item--mega');
      if (megaItems.length >= 2) {
        megaItems[megaItems.length - 1].classList.add('lux-nav__item--panel-end');
        megaItems[megaItems.length - 2].classList.add('lux-nav__item--panel-end');
      }
      if (megaItems.length >= 1) {
        megaItems[0].classList.add('lux-nav__item--panel-start');
        if (megaItems.length >= 2) megaItems[1].classList.add('lux-nav__item--panel-start');
      }
    }
  }

  function initMobileMenu() {
    var header = document.querySelector('.docs-shell-header');
    var menubar = document.querySelector('.docs-menubar');
    if (!header || !menubar) return;

    var menuToggle = header.querySelector('.menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('click', function () {
      var isOpen = menubar.classList.toggle('is-open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target) && menubar.classList.contains('is-open')) {
        menubar.classList.remove('is-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    menubar.querySelectorAll('.lux-nav__list a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 960) {
          menubar.classList.remove('is-open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function initHeaderCompact() {
    var header = document.querySelector('.docs-shell-header');
    if (!header) return;

    var compactOn = 72;
    var compactOff = 16;
    var ticking = false;
    var lastCompact = null;

    function applyCompact(compact) {
      if (lastCompact === compact) return;
      lastCompact = compact;
      header.classList.toggle('is-header-compact', compact);
      if (compact) {
        document.querySelectorAll('.lux-nav__item--mega.is-open').forEach(function (li) {
          li.classList.remove('is-open');
        });
        var menubar = document.querySelector('.docs-menubar');
        var menuToggle = header.querySelector('.menu-toggle');
        if (menubar) menubar.classList.remove('is-open');
        if (menuToggle) {
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
      setNavigationPosition();
    }

    function resolveCompact(scrollY) {
      if (lastCompact === true) return scrollY > compactOff;
      if (lastCompact === false) return scrollY > compactOn;
      return scrollY > compactOn;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        applyCompact(resolveCompact(window.scrollY || window.pageYOffset || 0));
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  function setNavigationPosition() {
    var header = document.querySelector('body > header.docs-shell-header');
    if (header) {
      var h = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', h + 'px');
      document.documentElement.style.setProperty('--nav-height', '0px');
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var header = document.querySelector('body > header');
        var stickyToolbar = document.getElementById('faq-toolbar') || document.getElementById('appcfg-toolbar');
        var offset =
          (header ? header.offsetHeight : 72) +
          (stickyToolbar ? stickyToolbar.offsetHeight : 0) +
          20;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      });
    });
  }

  function init() {
    document.body.classList.add('layout-full');
    removeSidebar();
    rebuildHeaderShell();
    syncDocsBrandTaglines();
    buildLuxNav();
    initMobileMenu();
    initHeaderCompact();
    setNavigationPosition();
    initSmoothScroll();

    window.addEventListener('resize', setNavigationPosition);
    window.addEventListener('resize', syncDocsBrandTaglines);
    setTimeout(setNavigationPosition, 100);
    setTimeout(setNavigationPosition, 500);
    setTimeout(syncDocsBrandTaglines, 100);
    setTimeout(syncDocsBrandTaglines, 500);

    document.dispatchEvent(new CustomEvent('docs-header-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
