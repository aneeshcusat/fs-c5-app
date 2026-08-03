/**
 * Infleca site analytics (GA4)
 * Replace GA4_MEASUREMENT_ID with your real Measurement ID before launch.
 * Events still bind either way; they no-op until a valid ID is set.
 */
(function () {
  "use strict";

  // Paste your GA4 ID here (format G-XXXXXXXXXX). Leave as-is until you have one.
  var GA4_MEASUREMENT_ID = "G-GLYP60YFG2";
  var PLACEHOLDER_IDS = { "G-XXXXXXXXXX": true, "": true };

  var enabled =
    typeof GA4_MEASUREMENT_ID === "string" &&
    /^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID) &&
    !PLACEHOLDER_IDS[GA4_MEASUREMENT_ID];

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  if (enabled) {
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search
    });
  }

  function track(eventName, params) {
    if (!eventName) return;
    var payload = params || {};
    if (!enabled || typeof window.gtag !== "function") return;
    window.gtag("event", eventName, payload);
  }

  function sectionLabel(id) {
    var map = {
      intro: "Home",
      about: "About",
      services: "Services",
      "why-us": "Why Infleca",
      portfolio: "Products",
      founders: "Founders",
      team: "Team",
      "faq-v2": "FAQ",
      blog: "Insights",
      footer: "Footer"
    };
    return map[id] || id;
  }

  function productNameFromCard(card) {
    if (!card) return "unknown";
    var logo = card.querySelector(".products-v3__logo");
    if (logo && logo.getAttribute("alt")) return logo.getAttribute("alt").trim();
    var alt = card.querySelector(".products-v3__media img");
    if (alt && alt.getAttribute("alt")) {
      return alt.getAttribute("alt").split(" - ")[0].trim();
    }
    return "unknown";
  }

  function ctaLabel(el) {
    return (el.getAttribute("aria-label") || el.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
  }

  function bindClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        // Contact / lead CTAs
        var contact = t.closest(".contact-modal-trigger");
        if (contact) {
          track("generate_lead", {
            event_category: "engagement",
            event_label: ctaLabel(contact),
            lead_source: contact.getAttribute("data-contact-subject") || "contact_cta",
            link_text: ctaLabel(contact)
          });
          track("cta_click", {
            event_category: "cta",
            cta_name: "contact_open",
            link_text: ctaLabel(contact),
            location: sectionFromEl(contact)
          });
          return;
        }

        // Product website outbound links
        var productLink = t.closest(".products-v3__link");
        if (productLink && productLink.href && !productLink.classList.contains("contact-modal-trigger")) {
          var card = productLink.closest(".products-v3__card");
          var name = productNameFromCard(card);
          track("select_content", {
            content_type: "product",
            item_id: name.toLowerCase().replace(/\s+/g, "_"),
            item_name: name
          });
          track("product_website_click", {
            event_category: "product",
            product_name: name,
            link_url: productLink.href,
            link_text: ctaLabel(productLink)
          });
          track("click", {
            event_category: "outbound",
            link_url: productLink.href,
            link_domain: productLink.hostname,
            outbound: true
          });
          return;
        }

        // Hero / primary CTAs
        var heroCta = t.closest(".intro-v2__btn-primary, .intro-v2__btn-ghost, .header-cta, .why-infleca-v3__footer-cta, .services-v3__footer-cta, .products-v3__footer-cta, .insights-v3__view-all, .footer-v3__btn-primary");
        if (heroCta && !heroCta.classList.contains("contact-modal-trigger")) {
          track("cta_click", {
            event_category: "cta",
            cta_name: ctaLabel(heroCta) || "cta",
            link_url: heroCta.href || "",
            location: sectionFromEl(heroCta)
          });
        }

        // Product filter tabs
        var filter = t.closest(".products-v3__filter");
        if (filter) {
          track("product_filter", {
            event_category: "products",
            filter_value: filter.getAttribute("data-filter") || "unknown"
          });
          return;
        }

        // Theme switcher
        var themeBtn = t.closest(".theme-switcher__btn");
        if (themeBtn) {
          track("theme_change", {
            event_category: "engagement",
            theme_name: themeBtn.getAttribute("data-theme") || "unknown"
          });
          return;
        }

        // AI demo run
        var demoRun = t.closest(".ai-demo__run");
        if (demoRun) {
          var domain = document.getElementById("ai-demo-domain");
          var model = document.getElementById("ai-demo-model");
          var tool = document.getElementById("ai-demo-tool");
          track("ai_demo_run", {
            event_category: "engagement",
            demo_domain: domain ? domain.value : "",
            demo_model: model ? model.value : "",
            demo_tool: tool ? tool.value : ""
          });
          return;
        }

        // Nav section jumps
        var nav = t.closest('#nav-menu-container a[href^="#"], .footer-v3__panel-body a[href^="#"], .mobile-nav a[href^="#"]');
        if (nav) {
          var href = nav.getAttribute("href") || "";
          track("nav_click", {
            event_category: "navigation",
            link_text: ctaLabel(nav),
            destination: href.replace("#", "") || "home"
          });
          return;
        }

        // Phone / email
        var tel = t.closest('a[href^="tel:"]');
        if (tel) {
          track("contact_click", {
            event_category: "contact",
            method: "phone",
            link_url: tel.href
          });
          return;
        }
        var mail = t.closest('a[href^="mailto:"]');
        if (mail) {
          track("contact_click", {
            event_category: "contact",
            method: "email",
            link_url: mail.href
          });
          return;
        }

        // Social outbound
        var social = t.closest('a[href*="linkedin.com"], a[href*="twitter.com"], a[href*="facebook.com"], a[href*="instagram.com"]');
        if (social && social.hostname && social.hostname.indexOf("infleca.com") === -1) {
          track("social_click", {
            event_category: "social",
            network: social.hostname.replace(/^www\./, ""),
            link_url: social.href
          });
        }
      },
      true
    );
  }

  function sectionFromEl(el) {
    var section = el.closest("section, header, footer");
    if (section && section.id) return sectionLabel(section.id);
    return "unknown";
  }

  function bindSectionViews() {
    var sections = document.querySelectorAll(
      "section#intro, section#about, section#services, section#why-us, section#portfolio, section#founders, section#team, section#faq-v2, section#blog, footer#footer"
    );
    if (!("IntersectionObserver" in window) || !sections.length) return;

    var seen = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
          var id = entry.target.id || "footer";
          if (seen[id]) return;
          seen[id] = true;
          track("section_view", {
            event_category: "engagement",
            section_id: id,
            section_name: sectionLabel(id)
          });
        });
      },
      { threshold: [0.35] }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  function bindHashPageViews() {
    function sendHashView() {
      var hash = (window.location.hash || "#intro").replace("#", "") || "intro";
      track("page_view", {
        page_title: document.title + " — " + sectionLabel(hash),
        page_location: window.location.href,
        page_path: window.location.pathname + "#" + hash,
        section_name: sectionLabel(hash)
      });
    }
    window.addEventListener("hashchange", sendHashView);
  }

  window.InflecaAnalytics = {
    track: track,
    enabled: enabled,
    measurementId: enabled ? GA4_MEASUREMENT_ID : null
  };

  function init() {
    bindClicks();
    bindSectionViews();
    bindHashPageViews();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
