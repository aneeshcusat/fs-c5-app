#!/usr/bin/env node
/** One-time helper: inject Tracopus doc header/footer into data-flow HTML pages. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKIP = new Set(['index.html']);

const HEAD_INJECT = `  <script src="../js/docs-analytics.js?v=20260719a" defer></script>
  <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css?v=20260718g">
  <link rel="stylesheet" href="css/data-flow-doc-shell.css?v=20260724e">`;

const BODY_OPEN = `<body data-docs-depth="1" class="data-flow-doc-site">
<header aria-label="Site header"></header>
<div class="data-flow-doc-breadcrumb"><a href="../index.html">Documentation</a> → <a href="index.html">Data flow</a></div>
<main class="data-flow-doc-main">`;

const FOOTER_SCRIPTS = `</main>
<footer class="data-flow-doc-chrome">
  <div class="container">
    <p>
      <a href="index.html">Data flow hub</a>
      <a href="../index.html">Documentation home</a>
      <a href="../user-guide/index.html">Scenario Guide</a>
      <a href="../hrms/application-config.html">Application config</a>
    </p>
  </div>
</footer>
<script src="../js/palette.js?v=20260619e"></script>
<script src="../js/brand.js?v=20260619e"></script>
<script src="../js/docs-utility-config.js?v=20260720b"></script>
<script src="../js/nav-config.js?v=20260724b"></script>
<script src="../js/navigation.js?v=20260619e"></script>
<script src="../js/site-enhancements.js?v=20260718d"></script>`;

for (const file of fs.readdirSync(__dirname)) {
  if (!file.endsWith('.html') || SKIP.has(file)) continue;
  const full = path.join(__dirname, file);
  let html = fs.readFileSync(full, 'utf8');
  if (html.includes('data-flow-doc-site')) continue;

  html = html.replace('<html lang="en">', '<html lang="en" data-lux-theme="luxury" data-lux-palette="emerald">');
  html = html.replace(
    /<meta name="viewport" content="width=device-width, initial-scale=1\.0"\s*\/?>/,
    (m) => `${m}\n${HEAD_INJECT}`
  );
  if (!html.includes('../js/brand-config.js')) {
    html = html.replace('</head>', '  <script src="../js/brand-config.js?v=20260619e"></script>\n</head>');
  }
  html = html.replace('<body>', BODY_OPEN);
  html = html.replace('</body>', `${FOOTER_SCRIPTS}\n</body>`);
  fs.writeFileSync(full, html);
  console.log('patched', file);
}
