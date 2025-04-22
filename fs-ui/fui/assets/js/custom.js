// Sidebar Setting
$(document).ready(function () {
    "use strict";
    //page fullscreen
    $(document).on('click', '.fullscreen_btn', function (e) {
        e.preventDefault();
        $("#root").toggleClass("fullscreen");
        document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
            ? document.cancelFullScreen
                ? document.cancelFullScreen()
                : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
            : document.documentElement.requestFullscreen
                ? document.documentElement.requestFullscreen()
                : document.documentElement.mozRequestFullScreen
                    ? document.documentElement.mozRequestFullScreen()
                    : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    });
    function fullScreenChange() {
        document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || ($("#root").removeClass("fullscreen"));
    }

    document.addEventListener("fullscreenchange", fullScreenChange),
        document.addEventListener("webkitfullscreenchange", fullScreenChange),
        document.addEventListener("mozfullscreenchange", fullScreenChange);

    var currentTheme = "theme2";

    function changeTheme(themeName) {
        $('link[rel="stylesheet"]').each(function () {
            if (this.href.indexOf(currentTheme) >= 0) {
                this.href = this.href.replace(currentTheme, themeName);
                currentTheme = themeName;
            }
        });
        resetTheme();
    }
    function resetTheme() {
        $('body').removeClass();
        $('body').addClass("font-opensans");
    }
    $(document).on('click', '.themechange_btn', function () {
        changeTheme($(this).attr("data-theme-name"));
        $('body').addClass($(this).attr("data-theme-class"));
    });

    $(document).on('click', '.theme-div-close-link', function () {
        $('.theme_div').removeClass('open');
    });
});

$(window).scroll(function(e){ 
    var $el = $('.listgridheader.stickytop'); 
    var isPositionFixed = ($el.css('position') == 'sticky');
    if ($(this).scrollTop() > 30 && !isPositionFixed){ 
      $el.css({'position': 'sticky', 'z-index': 1020}); 
    }
    if ($(this).scrollTop() < 30 && isPositionFixed){
      $el.css({'position': 'static','z-index': 100}); 
    } 
  });