#!/usr/bin/env node
/**
 * Sync asset cache versions and footer links across main documentation HTML.
 * Skips user-guide/ (has its own generator).
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const VERSION = '20260619e';
const OLD_VERSIONS = ['20260607k', '20260608a', '20260615k', '20260616k', '20260617k', '20260618k', '20260619a', '20260619b', '20260619c', '20260619d'];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === 'user-guide') continue;
      walk(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function bumpVersions(text) {
  let out = text;
  for (const old of OLD_VERSIONS) {
    out = out.split(`?v=${old}`).join(`?v=${VERSION}`);
  }
  return out;
}

function addFooterScenarioLink(text) {
  const footerMatch = text.match(/<footer>[\s\S]*?<\/footer>/);
  if (!footerMatch || footerMatch[0].includes('user-guide/index.html')) return text;

  // Nested pages: ../index.html Documentation
  let out = text.replace(
    /(<a href="\.\.\/index\.html">Documentation<\/a>)\s*\n(\s*)(<a href="\.\.\/getting-started\.html">)/,
    '$1\n$2<a href="../user-guide/index.html">Scenario Guide</a>\n$2$3'
  );

  // Root pages: index.html Documentation (not user-guide)
  out = out.replace(
    /(<a href="index\.html">Documentation<\/a>)\s*\n(\s*)(<a href="getting-started\.html">)/,
    '$1\n$2<a href="user-guide/index.html">Scenario Guide</a>\n$2$3'
  );

  // Root pages without getting-started next (charts only footers)
  out = out.replace(
    /(<a href="index\.html">Documentation<\/a>)\s*\n(\s*)(<a href="charts\.html">)/,
    '$1\n$2<a href="user-guide/index.html">Scenario Guide</a>\n$2$3'
  );

  return out;
}

const files = walk(ROOT);
let updated = 0;

files.forEach((file) => {
  const before = fs.readFileSync(file, 'utf8');
  let after = bumpVersions(before);
  after = addFooterScenarioLink(after);
  if (after !== before) {
    fs.writeFileSync(file, after);
    updated++;
  }
});

console.log(`Synced ${updated} of ${files.length} main documentation HTML files to ?v=${VERSION}`);
