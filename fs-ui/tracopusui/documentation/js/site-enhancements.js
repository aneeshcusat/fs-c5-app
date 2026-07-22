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


  /* ── Screen guide bridge: Documentation · Scenarios · Use cases ── */
  var SCREEN_SCENARIO_MAP = {"getting-started.html":[{"id":"auth-forgot-password","title":"Reset a forgotten password"},{"id":"auth-login-sso","title":"Sign in with Microsoft Entra ID (SSO)"}],"hrms/employees.html":[{"id":"hrms-deactivate-employee","title":"Deactivate an employee (offboard access)"},{"id":"auth-activate-account","title":"Activate a new account from invite link"},{"id":"people-complete-onboarding-tasks","title":"Complete onboarding tasks (HR or new hire)"},{"id":"people-start-offboarding","title":"Start an offboarding case"}],"hrms/profile.html":[{"id":"auth-change-password","title":"Change password while logged in"},{"id":"payroll-view-paycheck","title":"View my paycheck (employee self-service)"},{"id":"people-acknowledge-policy","title":"Acknowledge an org policy"},{"id":"people-employee-360","title":"View Employee 360 consolidated profile"}],"interface.html":[{"id":"ai-agent-query","title":"Ask the AI agent for workspace help"},{"id":"workspace-notifications","title":"Manage notifications and alerts"}],"hrms/timesheet.html":[{"id":"hrms-approve-timesheet","title":"Approve or reject a submitted timesheet"},{"id":"hrms-submit-timesheet","title":"Submit timesheet week for manager approval"},{"id":"hrms-log-timesheet","title":"Log weekly hours on timesheet"}],"hrms/leaves.html":[{"id":"hrms-apply-leave","title":"Apply for leave"},{"id":"hrms-approve-leave","title":"Approve or reject leave request"}],"hrms/leave-configuration.html":[{"id":"admin-configure-global-leave","title":"Configure Global Leave Policy Center"},{"id":"admin-employee-leave-config","title":"Set employee leave opening balances"},{"id":"admin-publish-legal-holiday-calendar","title":"Publish legal holiday calendar to People holidays"}],"hrms/attendance.html":[{"id":"hrms-approve-attendance","title":"Approve attendance regularization"},{"id":"hrms-mark-attendance","title":"Mark or correct attendance"}],"hrms/invoices.html":[{"id":"hrms-create-invoice","title":"Create a client invoice"}],"hrms/application-config.html":[{"id":"hrms-app-config","title":"Configure org settings and permissions"}],"project/project-list.html":[{"id":"project-create-project","title":"Create a new project"},{"id":"sales-link-po-project","title":"Link a purchase order to a project"}],"project/project-details.html":[{"id":"project-edit-project","title":"Edit an existing project"}],"project/deliverables.html":[{"id":"project-add-deliverable","title":"Add a deliverable to a project"}],"project/work-items.html":[{"id":"project-create-work-item","title":"Create a work item (task/activity)"}],"project/taskboard.html":[{"id":"project-update-taskboard","title":"Move and update tasks on Kanban board"}],"project/team-capacity.html":[{"id":"project-team-capacity","title":"Plan team capacity and allocation"},{"id":"resources-skills-matrix","title":"Review organization skills matrix"},{"id":"resources-staffing-request","title":"Raise a staffing request"},{"id":"project-create-project","title":"Create a new project"}],"project/reports.html":[{"id":"project-run-report","title":"Run a delivery or utilization report"}],"project/search.html":[{"id":"project-global-search","title":"Search across projects, tasks, and people"}],"project/feedback.html":[{"id":"project-submit-feedback","title":"Submit stakeholder feedback on a project"}],"sales/bid-requests.html":[{"id":"sales-create-bid","title":"Create a bid request (sales opportunity)"}],"sales/bid-details.html":[{"id":"sales-edit-bid","title":"Update bid stage and details"}],"sales/purchase-orders.html":[{"id":"sales-create-po","title":"Create a purchase order (contract)"},{"id":"sales-import-po-salesforce","title":"Import purchase order from Salesforce"}],"hrms/invoice-details.html":[{"id":"finance-view-invoice","title":"Review and share invoice document"}],"admin.html":[{"id":"admin-audit-review","title":"Review unified audit trail and export"},{"id":"admin-delegation-rules","title":"Configure approval delegation rules"},{"id":"admin-feature-flags","title":"Toggle feature flags for pilot rollout"},{"id":"admin-role-permissions","title":"Configure role persona access and permissions"}],"charts.html":[{"id":"analytics-report-builder","title":"Build a custom analytics report"}],"project/dashboard.html":[{"id":"analytics-control-tower","title":"Monitor portfolio health in control tower"}],"hrms/persona-navigation.html":[{"id":"admin-persona-navigation","title":"Turn off org access or customize page personas"}],"mobile/login.html":[{"id":"mobile-login","title":"Sign in on the mobile app"}],"mobile/timesheet.html":[{"id":"mobile-log-timesheet","title":"Log timesheet hours on mobile"}],"mobile/tasks.html":[{"id":"mobile-update-task","title":"Update a task on mobile"}],"hrms/timesheet-approval.html":[{"id":"hrms-approve-timesheet","title":"Approve or reject a submitted timesheet"}],"hrms/shift-policies.html":[{"id":"admin-configure-global-leave","title":"Configure Global Leave Policy Center"}],"hrms/audit-trail.html":[{"id":"admin-audit-review","title":"Review unified audit trail and export"}],"hrms/dashboard.html":[{"id":"hrms-log-timesheet","title":"Log weekly hours on timesheet"}],"hrms/holidays.html":[{"id":"admin-publish-legal-holiday-calendar","title":"Publish legal holiday calendar to People holidays"}],"sales/purchase-order-details.html":[{"id":"sales-link-po-project","title":"Link a purchase order to a project"}]};

  var SCENARIO_MODULES = [
    'auth', 'workspace', 'hrms', 'people', 'project', 'sales', 'resources',
    'finance', 'payroll', 'performance', 'analytics', 'integrations', 'ai', 'admin', 'mobile'
  ];

  function docsDepthPrefix() {
    var depth = parseInt(document.body.getAttribute('data-docs-depth') || '0', 10);
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    return prefix;
  }

  function docsRelativePath() {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var marker = '/documentation/';
    var idx = path.indexOf(marker);
    if (idx >= 0) return path.slice(idx + marker.length);
    // fallback: last 1–2 segments
    var parts = path.split('/').filter(Boolean);
    if (parts.length >= 2 && /^(hrms|sales|project|mobile|faq)$/.test(parts[parts.length - 2])) {
      return parts[parts.length - 2] + '/' + parts[parts.length - 1];
    }
    return parts[parts.length - 1] || '';
  }

  function scenarioHref(id, prefix) {
    for (var i = 0; i < SCENARIO_MODULES.length; i++) {
      var mod = SCENARIO_MODULES[i];
      if (id.indexOf(mod + '-') === 0) {
        return prefix + 'user-guide/' + mod + '/' + id + '.html';
      }
    }
    return prefix + 'user-guide/scenarios.html';
  }

  function moduleScenarioIndex(relPath, prefix) {
    if (relPath.indexOf('hrms/') === 0) return prefix + 'user-guide/hrms/index.html';
    if (relPath.indexOf('project/') === 0) return prefix + 'user-guide/project/index.html';
    if (relPath.indexOf('sales/') === 0) return prefix + 'user-guide/sales/index.html';
    if (relPath.indexOf('mobile/') === 0) return prefix + 'user-guide/mobile/index.html';
    if (relPath === 'admin.html') return prefix + 'user-guide/admin/index.html';
    return prefix + 'user-guide/index.html';
  }

  function isScreenGuidePage() {
    if (document.body.classList.contains('scenario-guide-site')) return false;
    var rel = docsRelativePath();
    if (!rel) return false;
    if (/^(user-guide\/|user-flows\/)/.test(rel)) return false;
    if (/tracopus-use-case-catalog|tracopus-test-plan/.test(rel)) return false;
    if (rel === 'index.html') return false;
    return !!(
      document.querySelector('.doc-mast, .doc-canvas') ||
      /^(hrms|sales|project|mobile|faq)\//.test(rel) ||
      /^(admin|getting-started|charts|interface)\.html$/.test(rel)
    );
  }

  function enhanceScreenGuideBridge() {
    if (!isScreenGuidePage()) return;
    if (document.querySelector('.doc-guide-bridge')) return;

    var prefix = docsDepthPrefix();
    var rel = docsRelativePath();
    var matched = SCREEN_SCENARIO_MAP[rel] || [];

    var section = document.createElement('section');
    section.className = 'doc-block doc-guide-bridge';
    section.id = 'guide-bridge';
    section.setAttribute('aria-label', 'Related documentation links');

    var html = '' +
      '<h2 class="doc-block__title">Explore further</h2>' +
      '<p class="doc-guide-bridge__lead">Jump to documentation hubs, step-by-step scenarios, or the use case catalog from this screen guide.</p>' +
      '<div class="doc-guide-bridge__hubs">' +
      '<a class="doc-guide-bridge__hub is-docs" href="' + prefix + 'index.html"><strong>Documentation</strong><span>Screen guides home</span></a>' +
      '<a class="doc-guide-bridge__hub is-scenarios" href="' + moduleScenarioIndex(rel, prefix) + '"><strong>Scenarios</strong><span>Step-by-step workflows</span></a>' +
      '<a class="doc-guide-bridge__hub is-usecases" href="' + prefix + 'tracopus-use-case-catalog.html"><strong>Use cases</strong><span>Full business catalog</span></a>' +
      '<a class="doc-guide-bridge__hub is-flows" href="' + prefix + 'user-flows/index.html"><strong>User flows</strong><span>Bridge hub for workflows</span></a>' +
      '</div>';

    if (matched.length) {
      html += '<h3 class="doc-guide-bridge__sub">Scenarios for this screen</h3><div class="related-links doc-guide-bridge__scenarios">';
      matched.forEach(function (item) {
        html += '<a class="related-link" href="' + scenarioHref(item.id, prefix) + '">' +
          '<span class="related-link__label">Scenario: ' + escapeBridge(item.title) + '</span>' +
          '<span class="related-link__desc">Open the step-by-step user flow for this page.</span></a>';
      });
      html += '</div>';
    } else {
      html += '<p class="doc-guide-bridge__more">Browse all workflows in the <a href="' + prefix + 'user-guide/scenarios.html">scenario index</a> or <a href="' + prefix + 'user-flows/index.html">user flows hub</a>.</p>';
    }

    section.innerHTML = html;

    var mount =
      document.querySelector('.doc-flow') ||
      document.querySelector('.doc-canvas') ||
      document.querySelector('main');
    if (!mount) return;

    var pageNav = document.querySelector('.page-nav');
    if (pageNav && pageNav.parentElement) {
      pageNav.parentElement.insertBefore(section, pageNav);
    } else if (mount.classList && mount.classList.contains('doc-flow')) {
      mount.appendChild(section);
    } else {
      var related = document.getElementById('related-pages');
      if (related && related.parentElement) {
        related.parentElement.insertBefore(section, related.nextSibling);
      } else {
        mount.appendChild(section);
      }
    }
  }

  function escapeBridge(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
    enhanceScreenGuideBridge();
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
