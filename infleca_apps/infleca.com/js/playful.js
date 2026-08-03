/**
 * Playful interactions — Phases 1–3
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —— Hero word rotate —— */
  function initHeroWordRotate() {
    var container = document.querySelector(".hero-word-rotate");
    if (!container || reduced) return;

    var words = container.querySelectorAll(".hero-word-rotate__word");
    if (words.length < 2) return;

    var index = 0;
    setInterval(function () {
      var current = words[index];
      var next = words[(index + 1) % words.length];
      current.classList.remove("is-active");
      current.classList.add("is-exiting");
      next.classList.add("is-active");
      setTimeout(function () {
        current.classList.remove("is-exiting");
      }, 480);
      index = (index + 1) % words.length;
    }, 3200);
  }

  /* —— Stat counters with bounce —— */
  function initStatCounters() {
    var els = document.querySelectorAll(".stat-count-up[data-count]");
    if (!els.length) return;

    function animateEl(el) {
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";

      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var duration = reduced ? 0 : 1200;
      var startTime = null;

      function tick(ts) {
        if (!startTime) startTime = ts;
        var p = duration === 0 ? 1 : Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        el.textContent = prefix + val + suffix;
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.classList.add("is-done");
        }
      }

      requestAnimationFrame(tick);
    }

    function observeEl(el) {
      if ("IntersectionObserver" in window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateEl(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
        obs.observe(el);
      } else {
        animateEl(el);
      }
    }

    els.forEach(observeEl);

    /* Hero stats: also run when stagger reveal completes */
    var heroStagger = document.querySelector("#intro [data-hero-stagger]");
    if (heroStagger) {
      var heroStats = heroStagger.querySelectorAll(".stat-count-up[data-count]");
      var runHeroStats = function () {
        heroStats.forEach(function (el) {
          setTimeout(function () { animateEl(el); }, 700);
        });
      };
      if (heroStagger.classList.contains("is-visible")) {
        runHeroStats();
      } else {
        var staggerObs = new MutationObserver(function () {
          if (heroStagger.classList.contains("is-visible")) {
            runHeroStats();
            staggerObs.disconnect();
          }
        });
        staggerObs.observe(heroStagger, { attributes: true, attributeFilter: ["class"] });
        setTimeout(runHeroStats, 1200);
      }
    }
  }

  /* —— Card tilt —— */
  function initCardTilt() {
    if (reduced) return;

    document.querySelectorAll("#main .spotlight-card").forEach(function (card) {
      if (card.closest(".products-v3")) return;
      card.classList.add("playful-tilt");
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(900px) rotateX(" + (-y * 2.5) + "deg) rotateY(" + (x * 2.5) + "deg) translateY(-3px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* —— Product filters —— */
  function initProductFilters() {
    var grid = document.querySelector(".products-v3");
    var filters = document.querySelectorAll(".products-v3__filter");
    var empty = document.querySelector(".products-v3__empty");
    if (!grid || !filters.length) return;

    var cards = grid.querySelectorAll(".products-v3__card");

    function applyFilter(key) {
      grid.classList.add("is-filtering");
      var visible = 0;

      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-product-category") || "").split(/\s+/);
        var show = key === "all" || cats.indexOf(key) !== -1;
        card.classList.toggle("is-filter-hidden", !show);
        if (show) visible += 1;
      });

      if (empty) {
        empty.classList.toggle("is-visible", visible === 0);
      }

      filters.forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-filter") === key);
        btn.setAttribute("aria-selected", btn.getAttribute("data-filter") === key ? "true" : "false");
      });
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
  }

  /* —— AI demo pipeline —— */
  function initAiDemo() {
    var runBtn = document.querySelector(".ai-demo__run");
    var status = document.querySelector(".ai-demo__status");
    var nodes = document.querySelectorAll(".ai-demo__node");
    if (!runBtn || !nodes.length) return;

    var steps = [
      { id: "domain", delay: 0 },
      { id: "rag", delay: 450 },
      { id: "model", delay: 900 },
      { id: "tools", delay: 1350 },
      { id: "governance", delay: 1800 },
      { id: "response", delay: 2250 }
    ];

    runBtn.addEventListener("click", function () {
      if (runBtn.disabled) return;
      runBtn.disabled = true;
      nodes.forEach(function (n) { n.classList.remove("is-active"); });
      if (status) status.textContent = "Running pipeline…";

      steps.forEach(function (step) {
        setTimeout(function () {
          var node = document.querySelector('.ai-demo__node[data-step="' + step.id + '"]');
          if (node) node.classList.add("is-active");
        }, step.delay);
      });

      setTimeout(function () {
        if (status) status.textContent = "✓ Governed response ready — that's Project-AI-X in action.";
        runBtn.disabled = false;
      }, 2800);
    });

    /* Reset status when user changes selects */
    document.querySelectorAll(".ai-demo__field select").forEach(function (sel) {
      sel.addEventListener("change", function () {
        nodes.forEach(function (n) { n.classList.remove("is-active"); });
        if (status) status.textContent = "";
      });
    });
  }

  /* —— Ask Infleca —— */
  function initAskInfleca() {
    var pill = document.getElementById("ask-infleca-pill");
    if (!pill) return;

    pill.addEventListener("click", function () {
      if (window.InflecaContact && window.InflecaContact.open) {
        window.InflecaContact.open({
          subject: "What I'm building with Infleca",
          messageHint: "Describe your platform, AI initiative, or product idea…"
        });
        return;
      }
      var trigger = document.querySelector(".contact-modal-trigger");
      if (trigger) trigger.click();
    });
  }

  /* —— Magnetic CTAs (subtle) —— */
  function initMagneticButtons() {
    if (reduced || window.matchMedia("(max-width: 991px)").matches) return;

    document.querySelectorAll(".intro-v2__btn-primary, .header-cta, .products-v3__footer-cta").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + (x * 0.12) + "px, " + (y * 0.12) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  function init() {
    initHeroWordRotate();
    initStatCounters();
    initCardTilt();
    initProductFilters();
    initAiDemo();
    initAskInfleca();
    initMagneticButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
