/** Docs site GA4 + light action tracking (static HTML). */
(function () {
  "use strict";
  var MEASUREMENT_ID =
    (window.DOCS_CONFIG && window.DOCS_CONFIG.GA_MEASUREMENT_ID) || "G-RJXWV5HZFK";
  if (!MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    send_page_view: true,
    content_group: "documentation",
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });

  function track(action, category, label) {
    gtag("event", action, {
      event_category: category || "docs",
      event_label: label || "",
      content_group: "documentation",
      page_path: window.location.pathname,
    });
  }

  document.addEventListener(
    "click",
    function (e) {
      var el =
        e.target &&
        e.target.closest &&
        e.target.closest("a[href], button, [data-ga-action], [role='button']");
      if (!el) return;
      if (el.closest && el.closest("[data-ga-skip]")) return;
      var action = el.getAttribute("data-ga-action") || "docs_click";
      var category = el.getAttribute("data-ga-category") || (el.tagName === "A" ? "docs_nav" : "docs_engagement");
      var label =
        el.getAttribute("data-ga-label") ||
        el.getAttribute("aria-label") ||
        (el.getAttribute("href") || "").slice(0, 120) ||
        (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
      track(action, category, label);
    },
    true
  );
})();
