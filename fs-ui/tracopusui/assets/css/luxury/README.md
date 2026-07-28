# Luxury UI CSS

## One file in production

The app loads a single bundle: `public/assets/css/luxury.css` (see `public/index.html`).

Guided tour styles stay separate: `src/views/common/LuxuryGuidedTour.css`.

## Source modules (edit these)

| Path | Purpose |
|------|---------|
| `src/luxury-shell.css` | Shell, rail, sidebar, header, theme/settings |
| `src/luxury-summary-shared.css` | Summary eyebrows, page spacing tokens, register rhythm |
| `src/_shared/*.css` | Cross-page patterns (summary toggles, empty CTAs, etc.) |
| `src/luxury-*.css` | Page/feature modules (employees, bids, timesheet, …) |

`manifest.json` defines concat order. `_shared/` files are prepended automatically before manifest entries.

## Workflow

```bash
# After editing modules under src/
npm run luxury:build

# Bump cache buster in public/index.html (?version= on luxury.css)

# One-time: re-split monolithic luxury.css into modules (maintenance only)
npm run luxury:split
npm run luxury:build
```

## Conventions

1. **Register summary panels** — reuse `lux-bid-summary` / `lux-bid-summary__*` in JSX when possible. Page-specific roots (`lux-emp-summary`, `lux-att-summary`, …) share chrome via `_shared/luxury-register-summary-chrome.css`.
2. **Register list rows** — extend `lux-bid-list__item`; do not copy row card styles into new page files.
3. **Page-only overrides** — keep in that page’s `luxury-<page>.css`; do not duplicate shared rules.
4. **Never edit** generated `../luxury.css` by hand — changes will be overwritten on build.
