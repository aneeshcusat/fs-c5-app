$(window).on('load', function(){
  "use strict";

  $('#contact-form').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'names':$('input[name="contact_names"]').val(),
					'subject':$('input[name="contact_subject"]').val(),
					'email':$('input[name="contact_email"]').val(),
					'phone':$('input[name="contact_phone"]').val(),
					'message':$('textarea[name="contact_message"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p').show();
					});
				});
				e.preventDefault();
			}
		});
	})

  /* ========================================================== */
  /*   Navigation Background Color                              */
  /* ========================================================== */
	if($(this).scrollTop() > 100) {
			$('.navbar-fixed-top').addClass('nav-fixed-bg');
		} else {
			$('.navbar-fixed-top').removeClass('nav-fixed-bg');
		}
  
	$(window).on('scroll', function() {
		if($(this).scrollTop() > 100) {
			$('.navbar-fixed-top').addClass('nav-fixed-bg');
		} else {
			$('.navbar-fixed-top').removeClass('nav-fixed-bg');
		}
	});

  /* ========================================================== */
  /*   Owl Carousel For ScreenShots                             */
  /* ========================================================== */

  $("#screens__slider").owlCarousel({
    loop: true,
		nav: true,
		center: true,
		dots: false,
		autoplay: true,
    autoplayTimeout: 3000,
		autoplayHoverPause:false,
    smartSpeed: 450,
  	responsiveClass: true,
  	responsive: {
  			0: {
  					items: 1,
  			},
  			600: {
  					items: 1,
  			},
  			1000: {
  					items: 2,
  			}
  	}
  });

  /* ========================================================== */
  /*   Owl Carousel For Testimonial                             */
  /* ========================================================== */

  $("#testimon__slider").owlCarousel({
  	autoplay: true,
  	autoplayTimeout: 5000,
  	loop: true,
  	margin: 10,
  	nav: false,
  	pagination: false,
  	dots: true,
  	responsiveClass: true,
  	responsive: {
  			0: {
  					items: 1,
  			},
  			600: {
  					items: 2,
  			},
  			1000: {
  					items: 3,
  			}
  	}
  });

  /* ========================================================== */
  /*   Owl Carousel For Team Members                            */
  /* ========================================================== */

  $("#team__slider").owlCarousel({
  	autoplay: true,
  	autoplayTimeout: 5000,
  	loop: true,
  	margin: 10,
  	nav: true,
  	pagination: false,
  	dots: false,
  	responsiveClass: true,
  	responsive: {
  			0: {
  					items: 1,
  			},
  			600: {
  					items: 2,
  			},
  			1000: {
  					items: 3,
  			}
  	}
  });

  /* ========================================================== */
	/*   Countdown                                                */
	/* ========================================================== */

  var countdown = $('.countdown[data-countdown]');

	if (countdown.length > 0) {
	  countdown.each(function() {
	    var $countdown = $(this),
	      finalDate = $countdown.data('countdown');
	    $countdown.countdown(finalDate, function(event) {
	      $countdown.html(event.strftime(
	        '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
	      ));
	    });
	  });
	}

});

  /* ========================================================== */
	/*   WoW Animations When Scroll                               */
	/* ========================================================== */

	wow = new WOW(
		{
		animateClass: 'animated',
		offset:       100,
		mobile:       false,       // trigger animations on mobile devices (default is true)

		}
	);
	wow.init();

/* ========================================================== */
/*   OnePage Navigation                                       */
/* ========================================================== */

$('#nav').onePageNav({
	filter: ':not(.external)'
});

/* ========================================================== */
/*   Preloader                                                */
/* ========================================================== */

$(window).load(function()
{
  $(".preloader").fadeOut(600);
	$(".preloader .sk-cube-grid").fadeOut(600);
});

/* ========================================================== */
/*   Counter                                                  */
/* ========================================================== */

var counter = false,
    statisticsCounter = $('.timer');

function startCounter() {
  if (statisticsCounter.length && !counter) {
    var windowScroll = $(window).scrollTop(),
      timerPosition = statisticsCounter.offset().top,
      windowHeight = $(window).height();
    if (windowScroll - timerPosition + windowHeight >= 0) {
      counter = statisticsCounter.countTo();
    }
  }
}
startCounter();

$(window).on("scroll", function () {
  startCounter();
});
