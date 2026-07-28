#!/usr/bin/env node
/**
 * Inject docs-utility-config.js and unify navigation.js paths across all doc HTML pages.
 * Run: node patch-doc-scripts.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);
const V = '20260621a';

function patchFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  const rel = path.relative(ROOT, filePath);
  const parts = rel.split(path.sep);
  const isGuide = parts[0] === 'user-guide';
  const fileDepth = Math.max(0, parts.length - 1);
  const guideDepth = isGuide ? Math.max(0, parts.length - 2) : 0;
  const depth = isGuide ? guideDepth : fileDepth;

  let docsPrefix = '';
  if (isGuide) {
    docsPrefix = '../'.repeat(depth + 1);
  } else {
    docsPrefix = depth === 0 ? '' : '../'.repeat(depth);
  }

  const utilityScript = `<script src="${docsPrefix}js/docs-utility-config.js?v=${V}"></script>`;
  const utilityRe = /<script src="[^"]*docs-utility-config\.js[^"]*"><\/script>/;

  if (utilityRe.test(html)) {
    if (!html.includes(`${docsPrefix}js/docs-utility-config.js`)) {
      html = html.replace(utilityRe, utilityScript);
      changed = true;
    }
  } else if (!html.includes('docs-utility-config.js')) {
    html = html.replace(
      /(<script src="[^"]*nav-config\.js[^"]*"><\/script>)/,
      utilityScript + '\n$1'
    );
    changed = true;
  }

  if (isGuide) {
    const navPattern = depth === 0
      ? `<script src="js/navigation.js`
      : `<script src="${'../'.repeat(depth)}js/navigation.js`;
    const unifiedNav = `<script src="${docsPrefix}js/navigation.js`;
    if (html.includes(navPattern) && !html.includes(`${docsPrefix}js/navigation.js`)) {
      html = html.split(navPattern).join(unifiedNav);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('patched:', rel);
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === 'js' || name === 'css' || name === 'images') continue;
      walk(full);
    } else if (name.endsWith('.html')) {
      patchFile(full);
    }
  }
}

walk(ROOT);
console.log('Done.');
