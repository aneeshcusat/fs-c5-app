# Tracopus marketing screenshots

Drop product captures here. The site generator picks them up automatically on the next run.

## Folder

```
public/tracopus.com/images/screenshots/
```

## Formats

- **Preferred:** `.webp` (smaller, sharp)
- **Also accepted:** `.png`, `.jpg`, `.jpeg`

Use the exact filename below. Until a file exists, the site shows a labelled SVG placeholder.

## Recommended capture settings

- **Desktop:** 1440×900 px (or 1280×800), light theme, browser chrome cropped out
- **Mobile:** 1170×2532 px (iPhone) or device frame export; filename still as listed
- **Quality:** compress WebP ~80–85%; keep text readable

## Screenshot checklist

| File | Page(s) | What to capture |
|------|---------|-----------------|
| `01-project-dashboard.webp` | Home, Platform | Project → Dashboard |
| `02-project-taskboard.webp` | Home, Projects | Project → Taskboard (3+ columns) |
| `03-team-capacity.webp` | Delivery teams solution | Project → Team Capacity → Overview |
| `04-hrms-timesheet.webp` | Home, HRMS, Consulting | HRMS → Timesheet (filled week) |
| `05-hrms-dashboard.webp` | HRMS, Consulting | HRMS → Dashboard → Team tab |
| `06-bid-requests.webp` | Home, Sales | Sales → Bid Requests (charts expanded) |
| `07-purchase-orders.webp` | Sales | Sales → Purchase Orders |
| `08-luxury-shell.webp` | Home gallery, Luxury UI | Full app shell (sidebar + icon rail) |
| `09-mobile-projects.webp` | Home, Mobile | Mobile → Projects hub |
| `10-mobile-timesheet.webp` | Mobile | Mobile → Timesheet → Record day |
| `11-analytics-charts.webp` | Analytics | Any list screen, summary strip expanded |
| `12-project-list.webp` | Platform | Project → Project List |

## After adding files

```bash
cd public/tracopus.com && python3 _generate_site.py
```

Hard-refresh the browser to load the new images.
