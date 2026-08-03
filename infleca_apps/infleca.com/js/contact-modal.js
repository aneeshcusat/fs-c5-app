(function () {
  "use strict";

  var modal = document.getElementById("contact-modal");
  if (!modal) return;

  var overlay = modal.querySelector(".contact-modal__overlay");
  var closeBtn = modal.querySelector(".contact-modal__close");
  var form = modal.querySelector(".contact-modal__form");
  var feedback = modal.querySelector(".contact-modal__feedback");
  var lastFocus = null;

  function track(eventName, params) {
    if (window.InflecaAnalytics && typeof window.InflecaAnalytics.track === "function") {
      window.InflecaAnalytics.track(eventName, params || {});
    }
  }

  function openModal(options) {
    options = options || {};
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-modal-open");

    track("contact_modal_open", {
      event_category: "contact",
      lead_source: options.subject || "general"
    });

    if (form && options.subject) {
      var subjectField = form.querySelector('[name="subject"]');
      if (subjectField) subjectField.value = options.subject;
    }
    if (form && options.messageHint) {
      var messageField = form.querySelector('[name="message"]');
      if (messageField && !messageField.value) {
        messageField.setAttribute("placeholder", options.messageHint);
      }
    }

    document.body.classList.remove("mobile-nav-active");
    var toggle = document.querySelector(".mobile-nav-toggle i");
    if (toggle) {
      toggle.classList.remove("fa-times");
      toggle.classList.add("fa-bars");
    }
    var overly = document.querySelector(".mobile-nav-overly");
    if (overly) overly.style.display = "none";

    var firstField = modal.querySelector("input, textarea, button");
    if (firstField) {
      setTimeout(function () {
        firstField.focus();
      }, 120);
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-modal-open");
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".contact-modal-trigger");
    if (!trigger) return;
    e.preventDefault();
    openModal({
      subject: trigger.getAttribute("data-contact-subject") || ""
    });
  });

  window.InflecaContact = {
    open: openModal,
    close: closeModal
  };

  if (overlay) overlay.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!feedback) return;

      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var subject = form.querySelector('[name="subject"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      feedback.classList.remove("is-success", "is-error");

      if (name.length < 2 || !email || message.length < 4) {
        feedback.textContent = "Please complete all fields with valid details.";
        feedback.classList.add("is-error");
        track("contact_form_error", {
          event_category: "contact",
          error_type: "validation"
        });
        return;
      }

      track("generate_lead", {
        event_category: "contact",
        method: "contact_form",
        lead_source: subject || "Inquiry from Infleca website"
      });
      track("contact_form_submit", {
        event_category: "contact",
        form_name: "contact_modal"
      });

      var mailSubject = encodeURIComponent(subject || "Inquiry from Infleca website");
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );
      window.location.href = "mailto:contactus@infleca.com?subject=" + mailSubject + "&body=" + body;

      feedback.textContent = "Thank you — your email client should open with your message ready to send. We typically reply within 1–2 business days.";
      feedback.classList.add("is-success");
      form.reset();
    });
  }
})();
