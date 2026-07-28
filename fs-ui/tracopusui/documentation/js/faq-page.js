(function () {
  'use strict';

  var input = document.getElementById('faqPageSearch');
  var wrap = document.getElementById('faqCategoriesWrap');
  var noResults = document.getElementById('faqNoResults');
  var countEl = document.getElementById('faqSearchCount');
  var toolbar = document.getElementById('faq-toolbar');
  var categorySelect = document.getElementById('faqCategorySelect');
  if (!wrap) return;

  var items = wrap.querySelectorAll('.faq-item--searchable');
  var categories = wrap.querySelectorAll('.faq-category--searchable');
  var total = items.length;
  var syncingSelect = false;

  function stickyOffset() {
    var header = document.querySelector('body > header');
    var nav = document.querySelector('nav');
    var bar = toolbar ? toolbar.offsetHeight : 0;
    return (header ? header.offsetHeight : 0) + (nav ? nav.offsetHeight : 0) + bar + 12;
  }

  function scrollToCategory(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - stickyOffset() + 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function updateCount(visible) {
    if (!countEl) return;
    if (!input || !input.value.trim()) {
      countEl.textContent = total + ' questions · type to filter';
    } else {
      countEl.textContent = visible + ' of ' + total + ' matching';
    }
  }

  function filterFaq() {
    if (!input) return;
    var q = input.value.trim().toLowerCase();
    var visible = 0;

    items.forEach(function (el) {
      var text =
        (el.getAttribute('data-faq-q') || '') + ' ' + (el.getAttribute('data-faq-a') || '');
      var show = !q || text.indexOf(q) !== -1;
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    categories.forEach(function (cat) {
      var any = false;
      cat.querySelectorAll('.faq-item--searchable').forEach(function (el) {
        if (el.style.display !== 'none') any = true;
      });
      cat.style.display = any ? '' : 'none';
    });

    if (noResults) noResults.hidden = visible > 0 || !q;
    updateCount(visible);
    setActiveCategory();
  }

  if (input) {
    input.addEventListener('input', filterFaq);
    updateCount(total);
  }

  function setActiveCategory() {
    if (!categorySelect || !categories.length) return;
    var scrollY = window.scrollY + stickyOffset();
    var current = categories[0].id;

    categories.forEach(function (cat) {
      if (cat.style.display === 'none') return;
      if (cat.offsetTop <= scrollY) current = cat.id;
    });

    if (categorySelect.value !== current) {
      syncingSelect = true;
      categorySelect.value = current;
      syncingSelect = false;
    }
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', function () {
      if (syncingSelect) return;
      scrollToCategory(categorySelect.value);
    });
  }

  window.addEventListener('scroll', setActiveCategory, { passive: true });
  window.addEventListener('resize', setActiveCategory, { passive: true });
  setTimeout(setActiveCategory, 150);
  setTimeout(setActiveCategory, 600);
})();
