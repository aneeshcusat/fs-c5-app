(function () {
  "use strict";

  var STORAGE_KEY = "infleca-theme";
  var THEME_CLASSES = ["theme-emerald-luxury", "theme-white", "theme-dark"];

  var THEMES = {
    emerald: {
      className: "theme-emerald-luxury",
      color: "#059669",
      label: "Emerald"
    },
    white: {
      className: "theme-white",
      color: "#ffffff",
      label: "White"
    },
    dark: {
      className: "theme-dark",
      color: "#0a1210",
      label: "Dark"
    }
  };

  function getStoredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return THEMES[stored] ? stored : "emerald";
  }

  function spawnThemeBurst(x, y, color) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var burst = document.createElement("div");
    burst.className = "theme-burst";
    burst.setAttribute("aria-hidden", "true");
    document.body.appendChild(burst);

    for (var i = 0; i < 14; i++) {
      var p = document.createElement("span");
      p.className = "theme-burst__particle";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = color;
      var angle = (Math.PI * 2 * i) / 14;
      var dist = 40 + Math.random() * 50;
      p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      burst.appendChild(p);
    }

    setTimeout(function () {
      burst.remove();
    }, 800);
  }

  function applyTheme(key, persist, evt) {
    var theme = THEMES[key] || THEMES.emerald;
    var body = document.body;

    THEME_CLASSES.forEach(function (cls) {
      body.classList.remove(cls);
    });

    body.classList.add(theme.className);
    document.documentElement.setAttribute("data-theme", key);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme.color);
    }

    if (persist !== false) {
      localStorage.setItem(STORAGE_KEY, key);
    }

    document.querySelectorAll(".theme-switcher__btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-theme") === key;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      btn.setAttribute("title", theme.label + " theme");
    });

    if (evt && evt.target) {
      var icon = evt.target.closest(".theme-switcher__btn");
      if (icon) {
        icon.classList.add("is-switching");
        setTimeout(function () {
          icon.classList.remove("is-switching");
        }, 450);
        var rect = icon.getBoundingClientRect();
        spawnThemeBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, theme.color);
      }
    }
  }

  function buildMobileThemeSwitcher() {
    var mobileNav = document.querySelector(".mobile-nav.header-v2-drawer");
    if (!mobileNav || mobileNav.querySelector(".mobile-nav__themes")) {
      return;
    }

    var desktopSwitcher = document.querySelector(".theme-switcher");
    if (!desktopSwitcher) {
      return;
    }

    var wrap = document.createElement("div");
    wrap.className = "mobile-nav__themes";
    wrap.innerHTML =
      '<span class="mobile-nav__themes-label">Appearance</span>';

    var clone = desktopSwitcher.cloneNode(true);
    clone.classList.remove("d-none", "d-lg-flex");
    clone.removeAttribute("id");
    wrap.appendChild(clone);
    mobileNav.insertBefore(wrap, mobileNav.querySelector(".mobile-nav__cta"));
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getStoredTheme(), false);
    buildMobileThemeSwitcher();

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".theme-switcher__btn");
      if (!btn) {
        return;
      }
      applyTheme(btn.getAttribute("data-theme"), true, e);
    });
  });

  window.InflecaTheme = {
    apply: applyTheme,
    get: getStoredTheme
  };
})();
