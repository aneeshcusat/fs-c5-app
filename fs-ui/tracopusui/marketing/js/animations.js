(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target) || reduceMotion) return;
    var suffix = el.textContent.replace(/[\d]/g, '');
    var started = false;

    function animate() {
      if (started) return;
      started = true;
      var start = 0;
      var duration = 1400;
      var t0 = performance.now();

      function frame(now) {
        var p = Math.min((now - t0) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      var cObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          animate();
          cObs.disconnect();
        }
      }, { threshold: 0.5 });
      cObs.observe(el);
    } else {
      animate();
    }
  });

  document.querySelectorAll('.btn--primary, .module-card').forEach(function (el) {
    if (reduceMotion) return;
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
    });
  });
})();
