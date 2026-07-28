#!/usr/bin/env node
/**
 * Regenerate faq/index.html from existing content + faq-data-extra.js
 * Run: node fui/public/doucuments/faq/generate-faq-page.js
 */
const fs = require('fs');
const path = require('path');

const FAQ_DIR = __dirname;
const DOCS_ROOT = path.join(FAQ_DIR, '..');
const INDEX = path.join(FAQ_DIR, 'index.html');
const EXTRA = require('./faq-data-extra.js');

const V = '20260619a';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripHtml(s) {
  return String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function parseExistingCategories(html) {
  const categories = [];
  const sectionRe =
    /<section class="appcfg-faq-category[^"]*" id="([^"]+)"[^>]*>[\s\S]*?<h2[^>]*><span[^>]*>([^<]*)<\/span>\s*([^<]+)<\/h2>[\s\S]*?<div class="appcfg-faq-list">([\s\S]*?)<\/div>\s*<\/section>/g;
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    const id = m[1];
    const icon = m[2].trim();
    const title = m[3].trim();
    const listHtml = m[4];
    const items = [];
    const itemRe =
      /<article class="faq-item[^"]*" id="([^"]+)"[^>]*data-faq-q="([^"]*)"[^>]*data-faq-a="([^"]*)"[^>]*><h3 class="faq-item__q">([\s\S]*?)<\/h3><div class="faq-item__a">([\s\S]*?)<\/div><\/article>/g;
    let im;
    while ((im = itemRe.exec(listHtml)) !== null) {
      items.push({
        id: im[1],
        q: im[4].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
        a: im[5].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      });
    }
    if (items.length) {
      categories.push({ id, icon, title, items });
    }
  }
  return categories;
}

function renderItem(catId, idx, item) {
  const id = item.id || 'faq-q-' + catId + '-' + idx;
  const qPlain = stripHtml(item.q);
  const aPlain = stripHtml(item.a);
  return (
    '<article class="faq-item faq-item--searchable" id="' +
    escapeHtml(id) +
    '" data-faq-q="' +
    escapeHtml(qPlain) +
    '" data-faq-a="' +
    escapeHtml(aPlain) +
    '"><h3 class="faq-item__q">' +
    item.q +
    '</h3><div class="faq-item__a">' +
    item.a +
    '</div></article>'
  );
}

function renderCategory(cat) {
  const count = cat.items.length;
  const items = cat.items.map(function (item, i) {
    return renderItem(cat.id, i, item);
  }).join('');
  return (
    '<section class="appcfg-faq-category faq-category--searchable" id="' +
    escapeHtml(cat.id) +
    '">\n' +
    '  <h2 class="appcfg-faq-category__title"><span class="appcfg-faq-category__icon">' +
    cat.icon +
    '</span> ' +
    escapeHtml(cat.title) +
    '</h2>\n' +
    '  <p class="appcfg-faq-category__count">' +
    count +
    ' question' +
    (count === 1 ? '' : 's') +
    '</p>\n' +
    '  <div class="appcfg-faq-list">' +
    items +
    '</div>\n' +
    '</section>'
  );
}

function mergeCategories(existing, extra) {
  const byId = {};
  existing.forEach(function (c) {
    byId[c.id] = c;
  });
  extra.forEach(function (c) {
    if (byId[c.id]) {
      const seen = {};
      byId[c.id].items.forEach(function (it) {
        seen[stripHtml(it.q)] = true;
      });
      c.items.forEach(function (it) {
        if (!seen[stripHtml(it.q)]) {
          byId[c.id].items.push(it);
        }
      });
    } else {
      byId[c.id] = c;
    }
  });
  return Object.values(byId);
}

function orderedCategories(all) {
  const order = EXTRA.categoryOrder || [];
  const sorted = [];
  const rest = [];
  const byId = {};
  all.forEach(function (c) {
    byId[c.id] = c;
  });
  order.forEach(function (id) {
    if (byId[id]) {
      sorted.push(byId[id]);
      delete byId[id];
    }
  });
  Object.keys(byId).forEach(function (id) {
    rest.push(byId[id]);
  });
  rest.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  return sorted.concat(rest);
}

function buildPage(categories) {
  const total = categories.reduce(function (n, c) {
    return n + c.items.length;
  }, 0);
  const selectOptions = categories
    .map(function (c) {
      return '<option value="' + escapeHtml(c.id) + '">' + c.icon + ' ' + escapeHtml(c.title) + '</option>';
    })
    .join('');
  const sections = categories.map(renderCategory).join('\n');
  const leadTopics =
    'login, navigation, documentation, scenario guide, HRMS, leave, attendance, timesheet approval, projects, sales, billing, payroll, workspace, people ops, mobile, charts, admin, audit trail, troubleshooting, and application configuration';

  return `<!DOCTYPE html>
<html lang="en" data-lux-theme="luxury" data-lux-palette="emerald">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ — Tracopus User Guide</title>
  <meta name="description" content="Frequently asked questions — ${total}+ answers for Tracopus">
  <meta name="keywords" content="faq, questions, answers, help, troubleshooting, tracopus">
  <link rel="canonical" href="https://tracopus.com/documentation/faq/index.html">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Tracopus">
  <meta property="og:title" content="FAQ — Tracopus User Guide">
  <meta property="og:description" content="Frequently asked questions — ${total}+ answers for Tracopus">
  <meta property="og:url" content="https://tracopus.com/documentation/faq/index.html">
  <meta property="og:image" content="https://tracopus.com/documentation/images/tracopus-logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="FAQ — Tracopus User Guide">
  <meta name="twitter:description" content="Frequently asked questions — ${total}+ answers for Tracopus">
  <meta name="twitter:image" content="https://tracopus.com/documentation/images/tracopus-logo.png">
  <link rel="apple-touch-icon" href="../images/tracopus-logo.png">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RJXWV5HZFK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RJXWV5HZFK', {
      send_page_view: true,
      page_path: '/documentation/faq/index.html',
      content_group: 'documentation'
    });
  </script>
  <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css?v=${V}">
  <script src="../js/brand-config.js?v=${V}"></script>
</head>
<body data-docs-depth="1">

<header aria-label="Site header"></header>

<main>
    <div class="breadcrumb"><a href="../index.html">Home</a> → FAQ</div>
  
<div class="doc-canvas faq-page appcfg-page">
  <header class="doc-mast" id="faq-top">
    <div class="doc-mast__top">
      <span class="doc-mast__eyebrow">Help center</span>
    </div>
    <h1 class="doc-mast__title">Frequently asked questions</h1>
    <p class="doc-mast__lead">${total} answers about ${leadTopics}.</p>
  </header>
  <div class="doc-flow">
    <section class="doc-block appcfg-section">
      <div class="appcfg-toolbar faq-toolbar" id="faq-toolbar">
        <div class="faq-toolbar__row">
          <div class="appcfg-toolbar__search">
            <span class="appcfg-toolbar__search-icon" aria-hidden="true">🔍</span>
            <input type="search" id="faqPageSearch" class="appcfg-toolbar__input" placeholder="Search ${total}+ questions…" autocomplete="off" aria-label="Search FAQ">
          </div>
          <div class="faq-toolbar__category">
            <label class="faq-toolbar__category-label" for="faqCategorySelect">Jump to</label>
            <select id="faqCategorySelect" class="faq-toolbar__select" aria-label="Jump to FAQ category">
              ${selectOptions}
            </select>
          </div>
        </div>
        <p class="faq-toolbar__hint" id="faqSearchCount">${total} questions · type to filter</p>
      </div>
      <div id="faqNoResults" class="faq-no-results" hidden>No matching questions — try different keywords.</div>
      <div id="faqCategoriesWrap">
${sections}
      </div>
    </section>
  </div>
</div>
<script src="../js/faq-page.js?v=${V}"></script>
</main>

<footer>
  <div class="container">
    <p>&copy; 2026 <span data-brand>Tracopus</span>. All rights reserved.</p>
    <p style="margin-top:0.75rem;">
      <a href="../index.html">Documentation</a>
      <a href="../user-guide/index.html">Scenario Guide</a>
      <a href="../getting-started.html">Getting Started</a>
      <a href="../charts.html">Charts</a>
    </p>
    <p class="footer-muted">For support, contact your workspace administrator.</p>
  </div>
</footer>

<script src="../js/palette.js?v=${V}"></script>
<script src="../js/brand.js?v=${V}"></script>
<script src="../js/nav-config.js?v=${V}"></script>
<script src="../js/navigation.js?v=${V}"></script>
<script src="../js/site-enhancements.js?v=${V}"></script>
<script src="../js/search.js?v=${V}"></script>
</body>
</html>
`;
}

function main() {
  const html = fs.readFileSync(INDEX, 'utf8');
  const existing = parseExistingCategories(html);
  if (!existing.length) {
    console.error('Could not parse existing FAQ categories from', INDEX);
    process.exit(1);
  }
  const merged = orderedCategories(mergeCategories(existing, EXTRA.categories));
  const out = buildPage(merged);
  fs.writeFileSync(INDEX, out, 'utf8');
  const total = merged.reduce(function (n, c) {
    return n + c.items.length;
  }, 0);
  console.log('Wrote', INDEX);
  console.log(merged.length, 'categories,', total, 'questions');
}

main();
