(function ($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate WOW only when motion system is not active
  if (!document.body.classList.contains("motion-enabled")) {
    new WOW().init();
  }

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $('.main-nav a, .mobile-nav a, .scrollto, .header-cta').on('click', function() {
    if ($(this).hasClass('contact-modal-trigger')) {
      return;
    }
    var href = $(this).attr('href') || '';
    if ($(this).parents('.drop-down').length && (href === '#' || href === '')) {
      return false;
    }
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 40;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          main_nav.find('li').removeClass('active');
          main_nav.find('.drop-down').removeClass('active');
          $(this).closest('li').addClass('active');
          $(this).closest('.drop-down').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('.drop-down').removeClass('active');

        var $link = main_nav.find('a[href="#' + $(this).attr('id') + '"]');
        $link.parent('li').addClass('active');

        var $dropdown = $link.closest('.drop-down');
        if ($dropdown.length) {
          $dropdown.addClass('active');
        }
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });
    $('#portfolio-flters li').on( 'click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
  
      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Footer v3: collapsible panels on tablet/mobile, expanded on desktop
  (function initFooterPanels() {
    var root = document.getElementById('footer');
    if (!root || !root.classList.contains('footer-v3')) return;

    var panels = root.querySelectorAll('.footer-v3__panel');
    if (!panels.length) return;

    var mq = window.matchMedia('(min-width: 992px)');

    function syncPanels() {
      panels.forEach(function (panel, index) {
        if (mq.matches) {
          panel.setAttribute('open', '');
          return;
        }

        if (index === panels.length - 1) {
          panel.setAttribute('open', '');
        } else {
          panel.removeAttribute('open');
        }
      });
    }

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', syncPanels);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(syncPanels);
    }

    syncPanels();
  })();

})(jQuery);

