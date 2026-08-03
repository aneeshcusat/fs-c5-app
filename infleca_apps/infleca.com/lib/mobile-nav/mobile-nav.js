(function ($) {
  "use strict";

  if ($('.main-nav').length) {
    var $mobile_nav = $('.main-nav').clone().prop({
      class: 'mobile-nav d-lg-none header-v2-drawer'
    });

    $mobile_nav.find('.nav-pill').children('ul').unwrap();

    var $drawerHead = $(
      '<div class="mobile-nav__head">' +
        '<div><span class="mobile-nav__label">Menu</span><p class="mobile-nav__tagline">Transforming Vision Into Intelligent Enterprise</p></div>' +
        '<img src="img/infleca_icon_letters_trans.png" alt="Infleca Innovation" width="120" height="32">' +
      '</div>'
    );

    $mobile_nav.prepend($drawerHead);

    $mobile_nav.append(
      '<div class="mobile-nav__cta">' +
        '<a href="#" class="header-cta contact-modal-trigger">Contact Us</a>' +
      '</div>'
    );

    if ($('.header-social').length) {
      var $soc = $('.header-social').first().clone();
      $soc.removeClass('d-none').addClass('header-social--drawer d-flex');
      $mobile_nav.append(
        $('<div class="mobile-nav-social" role="navigation" aria-label="Social links"></div>').append($soc)
      );
    }

    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none" aria-label="Open menu"><i class="fa fa-bars"></i></button>');
    $('body').append('<div class="mobile-nav-overly header-v2-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function () {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $('.mobile-nav, .mobile-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($('.mobile-nav, .mobile-nav-toggle').length) {
    $('.mobile-nav, .mobile-nav-toggle').hide();
  }

})(jQuery);
