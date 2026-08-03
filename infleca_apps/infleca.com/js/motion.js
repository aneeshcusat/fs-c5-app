/**
 * Infleca motion — React Bits–style animations for static HTML
 * Inspired by https://reactbits.dev/
 */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.documentElement.classList.add("reduce-motion");
    document.querySelectorAll("[data-motion], [data-motion-stagger], [data-text-reveal], [data-hero-stagger]").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  document.body.classList.add("motion-enabled");

  /* —— Intersection Observer: blur-up, slide, stagger —— */
  var motionEls = document.querySelectorAll("[data-motion], [data-motion-stagger]");
  if (motionEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    motionEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    motionEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* —— Text reveal: split headings into animated words —— */
  document.querySelectorAll("[data-text-reveal]").forEach(function (heading) {
    var text = heading.textContent.trim();
    if (!text) return;

    heading.textContent = "";
    heading.classList.add("motion-text-reveal");

    text.split(/\s+/).forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "motion-word";
      span.textContent = word;
      span.style.transitionDelay = i * 0.06 + "s";
      heading.appendChild(span);
      if (i < text.split(/\s+/).length - 1) {
        heading.appendChild(document.createTextNode(" "));
      }
    });

    if ("IntersectionObserver" in window) {
      var textObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              textObs.unobserve(entry.target);
            }
          });
        },
        { threshold: heading.closest("#intro") ? 0.1 : 0.5 }
      );
      textObs.observe(heading);
      if (heading.closest("#intro")) {
        setTimeout(function () {
          heading.classList.add("is-visible");
        }, 180);
      }
    } else {
      heading.classList.add("is-visible");
    }
  });

  /* —— Spotlight: radial highlight follows pointer —— */
  document.querySelectorAll(".spotlight-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spotlight-x", x + "%");
      card.style.setProperty("--spotlight-y", y + "%");
      card.classList.add("is-spotlight-active");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-spotlight-active");
    });
  });

  /* —— Hero: load reveal (BlurFade + stagger) —— */
  function revealHero() {
    var stagger = document.querySelector("#intro [data-hero-stagger]");
    requestAnimationFrame(function () {
      if (stagger) stagger.classList.add("is-visible");
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealHero);
  } else {
    revealHero();
  }

  /* Shimmer CTA */
  document.querySelectorAll("#intro .intro-v2__btn-primary, #main .btn-get-started, .contact-modal__form button[type='submit']").forEach(function (btn) {
    btn.classList.add("btn-shimmer");
  });
})();
