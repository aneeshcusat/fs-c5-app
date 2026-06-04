(function () {
  'use strict';

  var STORAGE_KEY = 'tracopus-site-theme';
  var header = document.getElementById('site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var themeBtn = document.getElementById('theme-toggle');

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setTheme(theme) {
    var next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-site-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }

    document.querySelectorAll('.site-logo').forEach(function (img) {
      var src = next === 'dark' ? img.getAttribute('data-logo-dark') : img.getAttribute('data-logo-light');
      if (src) img.setAttribute('src', src);
    });

    var favicon = document.getElementById('site-favicon');
    if (favicon) {
      var icon =
        next === 'dark'
          ? favicon.getAttribute('data-favicon-dark')
          : favicon.getAttribute('data-favicon-light');
      if (icon) favicon.setAttribute('href', icon);
    }

    if (themeBtn) {
      themeBtn.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(getTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  document.querySelectorAll('.nav-item--mega .nav-link--toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        btn.closest('.nav-item--mega').classList.toggle('is-open');
      }
    });
  });

  function closeMobileNav() {
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function handleFormSuccess(form, btn, successText) {
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = successText;
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = orig;
      btn.disabled = false;
      form.reset();
    }, 3200);
  }

  document.querySelectorAll('.contact-form:not(.demo-form)').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSuccess(form, form.querySelector('button[type="submit"]'), "Thanks — we'll be in touch!");
    });
  });

  document.querySelectorAll('.demo-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      handleFormSuccess(form, form.querySelector('button[type="submit"]'), 'Demo request received — thank you!');
      if (form.id === 'demo-request-form') {
        setTimeout(closeDemoModal, 2400);
      }
    });
  });

  var WORKSPACE_STORAGE_KEY = 'tracopus-last-workspace';
  var workspaceModal = document.getElementById('workspace-signin-modal');
  var workspaceForm = document.getElementById('workspace-signin-form');
  var workspaceInput = document.getElementById('workspace-name');
  var workspaceError = document.getElementById('workspace-error');
  var demoModal = document.getElementById('demo-request-modal');

  function normalizeWorkspace(raw) {
    return String(raw || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^-+|-+$/g, '');
  }

  function isValidWorkspace(name) {
    return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(name) && name.length >= 2;
  }

  function workspaceLoginUrl(name) {
    return 'https://' + name + '.tracopus.com';
  }

  function openInNewFocusedTab(url) {
    var win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) {
      try {
        win.focus();
      } catch (e) {
        /* ignore */
      }
      return true;
    }
    return false;
  }

  function markDocumentationLinks() {
    document.querySelectorAll('a[href*="documentation/"]').forEach(function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function setBodyModalOpen(isOpen) {
    document.body.classList.toggle('site-modal-open', isOpen);
  }

  function showWorkspaceError(message) {
    if (!workspaceError) return;
    workspaceError.textContent = message;
    workspaceError.hidden = !message;
  }

  function openWorkspaceModal() {
    if (!workspaceModal) return;
    closeDemoModal();
    workspaceModal.hidden = false;
    workspaceModal.setAttribute('aria-hidden', 'false');
    setBodyModalOpen(true);
    showWorkspaceError('');
    try {
      var last = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      if (last && workspaceInput && !workspaceInput.value) {
        workspaceInput.value = last;
      }
    } catch (e) {
      /* ignore */
    }
    if (workspaceInput) {
      workspaceInput.focus();
      workspaceInput.select();
    }
  }

  function closeWorkspaceModal() {
    if (!workspaceModal || workspaceModal.hidden) return;
    workspaceModal.hidden = true;
    workspaceModal.setAttribute('aria-hidden', 'true');
    if (!demoModal || demoModal.hidden) {
      setBodyModalOpen(false);
    }
    showWorkspaceError('');
  }

  function openDemoModal() {
    if (!demoModal) return;
    closeWorkspaceModal();
    demoModal.hidden = false;
    demoModal.setAttribute('aria-hidden', 'false');
    setBodyModalOpen(true);
    closeMobileNav();
    var firstField = demoModal.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
  }

  function closeDemoModal() {
    if (!demoModal || demoModal.hidden) return;
    demoModal.hidden = true;
    demoModal.setAttribute('aria-hidden', 'true');
    if (!workspaceModal || workspaceModal.hidden) {
      setBodyModalOpen(false);
    }
  }

  function goToWorkspace(raw) {
    var name = normalizeWorkspace(raw);
    if (!name) {
      showWorkspaceError('Please enter your workspace name.');
      if (workspaceInput) workspaceInput.focus();
      return;
    }
    if (!isValidWorkspace(name)) {
      showWorkspaceError('Use 2–63 characters: letters, numbers, and hyphens. Cannot start or end with a hyphen.');
      if (workspaceInput) workspaceInput.focus();
      return;
    }
    try {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
    closeWorkspaceModal();
    if (!openInNewFocusedTab(workspaceLoginUrl(name))) {
      showWorkspaceError('Pop-up blocked. Allow pop-ups for this site to open your workspace in a new tab.');
      openWorkspaceModal();
    }
  }

  document.querySelectorAll('.workspace-signin-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openWorkspaceModal();
      closeMobileNav();
    });
  });

  document.querySelectorAll('.demo-request-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openDemoModal();
    });
  });

  if (workspaceModal) {
    workspaceModal.querySelectorAll('[data-workspace-close]').forEach(function (el) {
      el.addEventListener('click', closeWorkspaceModal);
    });
  }

  if (demoModal) {
    demoModal.querySelectorAll('[data-demo-close]').forEach(function (el) {
      el.addEventListener('click', closeDemoModal);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (demoModal && !demoModal.hidden) closeDemoModal();
    else if (workspaceModal && !workspaceModal.hidden) closeWorkspaceModal();
  });

  if (workspaceForm) {
    workspaceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      goToWorkspace(workspaceInput ? workspaceInput.value : '');
    });
  }

  if (workspaceInput) {
    workspaceInput.addEventListener('input', function () {
      showWorkspaceError('');
    });
  }

  if (window.location.search.indexOf('signin=1') !== -1) {
    openWorkspaceModal();
  }

  if (window.location.search.indexOf('demo=1') !== -1) {
    openDemoModal();
  }

  markDocumentationLinks();
})();
