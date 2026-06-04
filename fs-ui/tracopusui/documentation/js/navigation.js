// Navigation — sticky offsets, mobile menu, smooth scroll, active states
document.addEventListener('DOMContentLoaded', function () {
  function initMobileMenu() {
    var nav = document.querySelector('nav');
    var navUl = document.querySelector('nav ul');
    var navContainer = document.querySelector('nav .container');
    if (!nav || !navUl || !navContainer) return;

    var menuToggle = nav.querySelector('.menu-toggle');
    if (!menuToggle) {
      menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.setAttribute('aria-label', 'Toggle menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<span></span><span></span><span></span>';
      navContainer.insertBefore(menuToggle, navUl);

      menuToggle.addEventListener('click', function () {
        var isOpen = navUl.classList.toggle('menu-open');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
      });

      document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && navUl.classList.contains('menu-open')) {
          navUl.classList.remove('menu-open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });

      navUl.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 768) {
            navUl.classList.remove('menu-open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  initMobileMenu();

  function setNavigationPosition() {
    var header = document.querySelector('header');
    var nav = document.querySelector('nav');
    var sidebar = document.querySelector('.sidebar');
    if (header && nav) {
      var headerHeight = header.offsetHeight;
      var navHeight = nav.offsetHeight;
      document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
      document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
      nav.style.top = headerHeight + 'px';
      if (sidebar) {
        var total = headerHeight + navHeight;
        sidebar.style.top = total + 'px';
        sidebar.style.height = 'calc(100vh - ' + total + 'px)';
      }
    }
  }

  setNavigationPosition();
  window.addEventListener('resize', setNavigationPosition);
  setTimeout(setNavigationPosition, 100);
  setTimeout(setNavigationPosition, 500);

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.sidebar a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var linkPage = href.split('#')[0];
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('nav a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (!href || href.indexOf('#') === 0) return;
    var linkPage = href.split('#')[0];
    if (linkPage === currentPage) link.classList.add('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var header = document.querySelector('body > header') || document.querySelector('header');
          var navEl = document.querySelector('nav');
          var stickyToolbar =
            document.getElementById('faq-toolbar') || document.getElementById('appcfg-toolbar');
          var offset =
            (header ? header.offsetHeight : 88) +
            (navEl ? navEl.offsetHeight : 52) +
            (stickyToolbar ? stickyToolbar.offsetHeight : 0) +
            16;
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
      }
    });
  });
});
