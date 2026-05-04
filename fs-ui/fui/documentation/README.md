# Famstack Users Guide - Complete Documentation

## 📚 Documentation Structure

This documentation is organized into multiple detailed pages covering every aspect of the Famstack platform.

## 📖 Available Pages

### 1. **index.html** - Home Page
- Overview of documentation structure
- Quick navigation to all sections
- Getting started guide

### 2. **getting-started.html** - Getting Started
- Login & Authentication (Standard login, SSO, Password reset)
- Navigation & Interface Overview
- Basic Concepts (Projects, Tasks, Work Items, Teams, Accounts)
- Your First Steps
- User Profile & Settings
- Troubleshooting Common Issues

### 3. **mobile-app.html** - Mobile App User Manual
- Mobile onboarding and device registration ("signup") flow
- QR/barcode generation and scanning process
- Login options (User Login, QR Login, PIN, Biometric)
- Tasks, projects, and timesheet usage in mobile app
- Security best practices and troubleshooting

### 4. **privacy-policy.html** - Privacy Policy
- Public privacy policy for FamStack Mobile
- Camera permission usage disclosure (`android.permission.CAMERA`)
- Data collection, usage, storage, retention, and user choices
- Suitable to use as Google Play privacy policy URL

### 5. **projects.html** - Project Management
- Project Dashboard
- Project List (Grid and List views)
- Creating Projects (step-by-step with all fields explained)
- Project Fields - Complete Reference
- Editing Projects
- Viewing Project Details (all tabs explained)
- Filtering & Searching Projects
- Grid vs List View
- Archiving Projects
- Deleting Projects
- Favorites
- Duplicating Projects

### 6. **tasks.html** - Tasks & Deliverables
- Creating Tasks (from multiple locations)
- Task Fields - Complete Reference
- Editing Tasks
- Task Board (Kanban View) - Drag and drop, filtering
- Task Planner (Timeline/Gantt View)
- Work Items (time tracking)
- Task Status Management
- Assigning Tasks
- To Do List
- Task Activity Calendar

### 7. **hrms.html** - HRMS Module
- Timesheet Management (entering time, submitting, syncing leaves)
- Employee Management (creating, editing, activating/deactivating)
- Attendance Management
- Invoice Management
- Profile & Settings

### 8. **sales.html** - Sales Module
- Bid Requests (creating, viewing, converting to projects)
- Purchase Orders (creating, viewing, converting to projects)
- Status management
- Integration with projects

### 9. **reports.html** - Reports
- Utilization Reports (Employee, My Utilization, Weekwise, By Skills)
- Project Reports (Est vs Actual, 15% Report, Completion Report)
- Time Reports (Timesheet Data, Data Dump, Weekly Hours)
- Resource Reports (Allocation, By Category)
- Exporting Reports (Excel, PDF, CSV)
- Scheduled Reports
- Email Reports

### 10. **advanced.html** - Advanced Features
- Resource Planner (timeline views, allocation planning)
- Feedback System (requesting, submitting, viewing)
- Accounts Management
- Advanced Search
- Calendar View
- Notifications
- Integrations (SSO, External systems, API)

### 11. **access-controls.html** - Access Controls & Permissions
- Understanding access controls
- Module-level controls
- Project, Task, Work Item, Timesheet access controls
- Report access controls
- Troubleshooting access issues

### 12. **faq/index.html** - Frequently Asked Questions
- Comprehensive FAQ covering all modules
- Common issues and solutions
- Troubleshooting guides
- Searchable FAQ with categories

## 🎯 Features

### Granular Detail
- Every feature is explained step-by-step
- Field-by-field explanations
- Multiple methods for common tasks
- Troubleshooting sections

### Business User Focus
- Written in non-technical language
- Real-world examples
- Best practices included
- Common scenarios covered

### Complete Coverage
- In-application features (UI, forms, buttons, actions)
- System-level features (authentication, permissions, integrations)
- Both basic and advanced features

### Easy Navigation
- Sidebar navigation on every page
- Breadcrumb navigation
- Cross-references between pages
- Search-friendly structure

## 📁 File Structure

```
public/documentation/
├── index.html              # Home page
├── getting-started.html    # Getting started guide
├── mobile-app.html         # Mobile app user manual
├── privacy-policy.html     # Mobile app privacy policy
├── projects.html          # Project management
├── tasks.html             # Tasks & deliverables
├── hrms.html              # HRMS module
├── sales.html             # Sales module
├── reports.html           # Reports
├── advanced.html          # Advanced features
├── access-controls.html   # Access controls & permissions
├── css/
│   └── styles.css        # Styling
├── js/
│   └── navigation.js     # Navigation functionality
├── images/               # Screenshot placeholders
└── faq/
    └── index.html        # Frequently Asked Questions
```

## 🚀 Accessing Documentation

### From Application
1. Click the Help button (question mark icon) in the bottom right
2. Documentation opens in a new tab

### Direct URL
- When app is running: `http://localhost:3000/documentation/index.html`
- After deployment: `https://yourdomain.com/documentation/index.html`

### File System
- Open `public/documentation/index.html` directly in your browser

## 📝 Customization

### Adding Screenshots
1. Place images in `public/documentation/images/`
2. Replace screenshot placeholders in HTML files:
```html
<div class="screenshot">
    <img src="images/screenshot-name.png" alt="Description">
</div>
```

### Updating Content
- Edit HTML files directly
- Maintain consistent structure
- Update navigation if adding new pages

### Styling
- Modify `css/styles.css` for design changes
- CSS variables in `:root` for easy color customization

## 🔄 Maintenance

### Keeping Documentation Updated
- Update when new features are added
- Review quarterly for accuracy
- Add screenshots as UI changes
- Update examples with real scenarios

### Version Control
- Keep documentation in version control
- Tag releases with documentation versions
- Document breaking changes

## 📞 Support

For questions about the documentation:
- Contact your system administrator
- Check with your team lead
- Use the Help button in the application

---

**Last Updated:** 2024
**Version:** 1.0
**Product:** Famstack

