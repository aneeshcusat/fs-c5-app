"""Generate Application Configuration & Access Control documentation from org.json / role.json."""

import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
ORG_JSON = os.path.normpath(os.path.join(ROOT, "../../../fservices-app/build-tools/access/org.json"))
ROLE_JSON = os.path.normpath(os.path.join(ROOT, "../../../fservices-app/build-tools/access/role.json"))

# ── Field metadata (elaboration beyond JSON labels) ──

ORG_FIELD_META = {
    "band": ("Compensation band", "Dropdown on employee profile and roster filters. Bands group grades for reporting and headcount analytics treemap.", "Employee create wizard, Employees charts, payroll exports"),
    "grade": ("Grade within band", "Finer compensation level (e.g. C 2, B 1). Used with band for org structure and capacity planning.", "Profile, roster sort, manager dashboards"),
    "skills": ("Skills tags", "Searchable skill tags assigned to employees. Drives Top skills chart and project staffing filters.", "Employee wizard Skills step, resource reports"),
    "domains": ("Business domains", "Practice areas such as DPG, Data science. Cross-cuts departments for analytics.", "Employee profile, utilization by domain"),
    "certifications": ("Professional certifications", "Optional credentials list for compliance and staffing.", "Employee profile extended fields"),
    "country": ("Country", "Employee work country for geo reporting and holiday calendars.", "Profile, attendance, regional filters"),
    "empType": ("Employee type", "Permanent, Contract, Consultant, Intern — affects roster filters and HR analytics donuts.", "Employees register SHOW chips, workforce reports"),
    "division": ("Division", "Top-level business division (e.g. Life Sciences, Research AI).", "Org hierarchy, executive dashboards"),
    "location": ("Work location", "Office or remote site — used in location column charts and facilities planning.", "Profile, attendance matrix, hybrid workforce views"),
    "teamName": ("Team name", "Delivery team labels; often populated per org unit. Empty at root means teams are created under org nodes.", "Team scope bars, project assignment"),
    "department": ("Department", "HR department name on employee record. Powers department horizontal bar charts.", "Employees directory, org analytics"),
    "designation": ("Job designation", "Title ladder from Trainee through VP. Shown on profile hero and roster.", "Profile, employee cards"),
    "qualification": ("Education qualification", "Highest qualification bucket for HR records.", "Employee profile"),
    "subDepartment": ("Sub-department", "Finer org unit under department for large enterprises.", "Profile, filtered roster"),
    "serviceCategory": ("HR service category", "Advisory, Delivery, Sales, Support, etc. — classifies employees for finance and utilization.", "Workforce planning, cross-charge"),
    "practiceMap": ("Practice hierarchy", "Multi-level tree: Primary Practice → Secondary Practice. inputType=multi with multiLevelLabel.", "Project staffing, practice-based reporting"),
    "enableServiceLineSelection": ("Single service line mode", "When true, projects pick one service line from categoryMap instead of multi-line estimates.", "Project create/edit, deliverable categories"),
    "enableServiceLineEstimate": ("Multi service line estimates", "Enables multiple service lines each with hour/cost estimates on projects and POs.", "Project details estimates tab, PO details"),
    "enableCategorySelection": ("Category selection UI", "Shows category picker on project/deliverable forms using categoryMap hierarchy.", "Project wizard, work item forms"),
    "enableRestrictProjectByEmployeeServiceLine": ("Restrict by employee service line", "Limits which projects an employee can log time to based on their service line.", "Timesheet project picker, task assignment"),
    "isPurchaseOrderMandatory": ("PO mandatory for projects", "Blocks project creation or activation without linked purchase order when enabled.", "Project create validation"),
    "purchaseOrderImportFromSalesForceEnabled": ("Salesforce PO import", "Allows importing purchase orders from Salesforce integration.", "Sales → PO list, integration jobs"),
    "userTeamAccountsDisabled": ("Disable team-scoped accounts", "When true, account list is not filtered by user's teams (org-wide accounts visible per role).", "Accounts list page"),
    "enableDeliverableEndDateUpdateOnProjectEndDateChange": ("Cascade deliverable dates", "Auto-adjusts deliverable estimated end dates when project end date moves.", "Project date edit, deliverable schedule"),
    "categoryMap": ("Service line tree", "3-level hierarchy: Service Line → Delivery Category → Task Category. Drives billable categorization on timesheets.", "Project, deliverable, work item, timesheet"),
    "category": ("Project category", "Flat list of portfolio categories for reporting and SHOW filters.", "Project list chips, reports"),
    "defaultPurchaseOrderNotificationEmails": ("PO notification emails", "Distribution list emailed on PO create/update events.", "Email notifications, workflow"),
    "defaultPurchaseOrderNotificationEmailsForFinanceTeam": ("PO finance notifications", "Finance-specific PO email recipients.", "Finance alerts on contracts"),
    "defaultNotificationEmails": ("Project notification emails", "Default To/CC on project lifecycle notifications.", "Project status emails"),
    "defaultNotificationEmailsForFinanceTeam": ("Project finance notifications", "Finance distribution for project billing events.", "Invoice and project finance bridge"),
    "defaultPIINotificationEmails": ("PII / compliance notifications", "Data compliance mailbox for PII-related project flags.", "Compliance workflow"),
    "defaultDeliverableNotificationEmails": ("Deliverable notifications", "Emails sent on deliverable milestone changes.", "Deliverable status alerts"),
    "taskCategory": ("Delivery category list", "Legacy/flat delivery categories when not using full categoryMap tree.", "Deliverable forms"),
    "taskActCategory": ("Task category list", "Activity-level categories for work items under deliverables.", "Work item create, task activity"),
    "toolNames": ("Tools used", "Software tools tracked on projects (Microsoft Office, Power BI, etc.).", "Project metadata, reports"),
    "productName": ("Product names", "Product dimension for productized delivery lines.", "Project profile"),
    "surveyType": ("Survey types", "CATI, CAPI, Online, IDI, FGD, etc. — market research methodology.", "Project setup, sales handoff"),
    "timezone": ("Project timezones", "AU, IST, EST, etc. for scheduling and client communication.", "Calendar, due dates"),
    "sample": ("Sample source", "Client vs Internal sample tracking on research projects.", "Fieldwork projects"),
    "currency": ("Currency codes", "USD, EUR, INR, etc. for PO and project financial fields.", "PO value, estimates"),
    "feedbackServiceLines": ("Feedback service lines", "Lines available when configuring client feedback requests.", "Feedback module"),
    "taskActCategory_nonproject": ("Non-billable categories", "Categories for overhead timesheet rows (meetings, training, leave types).", "Timesheet non-billable, NONPROJECT module"),
    "excludeAdditionalFieldsForCategory": ("Skip extra fields", "Categories that hide extended form fields on quick entry (Leave, Holiday, etc.).", "Timesheet modal UX"),
    "division_nonproject": ("Non-billable division", "Division dimension on non-project time (RAI, LS, MIA, DAA).", "Overhead reporting"),
    "clientPartner": ("Non-billable client partner", "Optional client partner dimension on internal/presales time.", "Presales logging"),
    "kindOfStudy": ("Mode / kind of study", "Sales bid taxonomy: Online Quant, CATI, Qualitative, etc.", "Bid request forms, sales charts"),
    "clientName": ("Sales client names", "Client picklist on bid and PO records.", "Sales pipeline"),
    "dm": ("Decision maker type", "BDM, ITDM, Financial DM — buyer persona on bids.", "Bid demographics"),
    "designation_sales": ("Contact designation band", "Manager+, VP+, C Level on sales contacts.", "Bid details"),
    "companySize": ("Company size segment", "Small Business, SMB, LE for bid segmentation.", "Sales analytics"),
    "turnover": ("Company turnover band", "Revenue size brackets on bid records.", "Sales funnel reporting"),
    "medicalProfessionals": ("Medical professional types", "HCP specialties targeted in healthcare research bids.", "Bid medical vertical"),
    "patients": ("Patient types", "Patient condition segments for healthcare studies.", "Bid scoping"),
    "hospitalType": ("Hospital type", "Private vs Government facility segmentation.", "Healthcare bids"),
    "countries": ("Bid countries", "Geography list for bid pipeline charts.", "Sales geography mix chart"),
    "defaultNotificationEmails_sales": ("Sales notification emails", "Inbox for new bid notifications (e.g. bids@).", "Bid intake alerts"),
}

ACCESS_GROUP_META = {
    "hrmsModules": ("HRMS module visibility", "Toggle each HRMS sidebar page and set default landing route after login.", "list"),
    "invoice": ("Invoice CRUD permissions", "Separate create/edit/remove/view gates for billing documents.", "group"),
    "profileSettings": ("Settings page sections", "Controls which HRMS Settings cards appear (devices, schedulers, health, company, locale, notifications).", "list"),
    "employees": ("Employee record permissions", "Create, edit, delete, archive, remove, view on workforce directory.", "group"),
    "employeesAdditional": ("Employee extended rules", "Switch teams on behalf of others, view history, set exit dates.", "list"),
    "holidays": ("Holiday calendar permissions", "Manage public holiday entries synced to timesheet.", "group"),
    "attendance": ("Attendance matrix permissions", "Mark, delete, view attendance cells.", "group"),
    "attendanceAdditional": ("Attendance scope", "Switch team scope on attendance matrix.", "list"),
    "projectModules": ("Project module visibility", "Enables sidebar entries: dashboard, list, taskboard, reports, chat, etc.", "list"),
    "projects": ("Project entity permissions", "CRUD and archive on project records.", "group"),
    "projectsAdditional": ("Project business rules", "Status transitions, team scoping, PO date restrictions, checklist behavior, estimate visibility.", "list"),
    "tasks": ("Deliverable permissions", "CRUD on deliverable/milestone entities.", "group"),
    "userTeams": ("User team management", "Create/delete delivery teams.", "group"),
    "accounts": ("Account directory permissions", "Client account CRUD.", "group"),
    "accountsAdditional": ("Account visibility scope", "Show all teams' accounts vs scoped.", "list"),
    "checklists": ("Checklist template admin", "Manage reusable checklist templates.", "group"),
    "feedbackTemplates": ("Feedback template admin", "Design feedback form templates.", "group"),
    "feedbackRequest": ("Feedback request lifecycle", "Create, activate, resend client feedback campaigns.", "group"),
    "tasksAdditional": ("Deliverable extended rules", "Team switch, status downgrades, estimate edit flags, checklist toggles.", "list"),
    "workItems": ("Work item permissions", "CRUD on activities/work items.", "group"),
    "workItemsAdditional": ("Work item & time rules", "Hour caps, retro edit windows, skill restrictions, leave rules, checklist.", "list"),
    "timeSheet": ("Timesheet policy", "Entry/edit/approval, past/future weeks, max hours, team/employee switch.", "list"),
    "taskBoard": ("Kanban board permissions", "Multi-board, configure columns, delete cards.", "list"),
    "taskPlanner": ("Task planner scope", "Team switch on planner view.", "list"),
    "reporting": ("Report catalog access", "Each report type can be enabled/disabled per role.", "list"),
    "salesModules": ("Sales module visibility", "Bid requests, purchase orders, default landing page.", "list"),
    "bidRequest": ("Bid request CRUD", "Standard create/edit/delete/archive on bids.", "group"),
    "bidRequestAdditional": ("Bid workflow rules", "Status change permissions and allowed status values.", "list"),
    "purchaseOrders": ("Purchase order CRUD", "Contract record permissions.", "group"),
    "purchaseOrderStatusEnabled": ("Allowed PO statuses", "Which contract statuses can be selected on this role.", "list"),
    "purchaseOrdersAdditional": ("PO extended rules", "Estimate edit, team access, checklist, status downgrade.", "list"),
}

PERMISSION_FLAG_DESC = {
    "defaultRedirectPage": "Landing route slug when user opens the module (e.g. dashboard, activites, bidrequests).",
    "dashboardEnabled": "Show HRMS/Project dashboard in sidebar and allow navigation.",
    "employeesEnabled": "Show Employees directory.",
    "attendanceEnabled": "Show Attendance matrix.",
    "holidaysEnabled": "Show holiday management (within settings or HRMS).",
    "timesheetEnabled": "Show Timesheet page.",
    "settingsEnabled": "Show HRMS Settings.",
    "appconfigEnabled": "Show Application Configuration (this page) — typically admin only.",
    "profileEnabled": "Allow profile routes.",
    "invoiceEnabled": "Show Invoices module.",
    "createEnabled": "Allow creating new records.",
    "editEnabled": "Allow editing existing records.",
    "deleteEnabled": "Hard delete (where supported).",
    "removeEnabled": "Soft remove / unlink from list views.",
    "viewEnabled": "Read-only access to records.",
    "duplicateEnabled": "Clone record action.",
    "archiveEnabled": "Move to archived state.",
    "deviceRegistrationEnabled": "Mobile device registration card in Settings.",
    "schedulerViewEnabled": "Cron scheduler admin section.",
    "serviceHealthEnabled": "Service health indicators.",
    "companySettingsEnabled": "Company information form.",
    "localizationSettingsEnabled": "Locale and format settings.",
    "notificationSettingsEnabled": "Notification routing preferences.",
    "switchUserTeamsEnabled": "Change team scope dropdown to view other teams' data.",
    "viewOtherEmployeesHistoryEnabled": "See other employees' activity history.",
    "updateUserExitDateEnabled": "Set termination/exit date on profiles.",
    "listEnabled": "Project list register.",
    "taskPlannerEnabled": "Task planner page.",
    "todoListEnabled": "Todo list view.",
    "accountsEnabled": "Accounts directory.",
    "taskBoardEnabled": "Kanban taskboard.",
    "activitesEnabled": "Task activity / work items list.",
    "reportsEnabled": "Reports catalog page.",
    "fileManagerEnabled": "File manager.",
    "chatEnabled": "Chat module.",
    "calendarEnabled": "Calendar.",
    "detailsEnabled": "Project details deep link.",
    "searchEnabled": "Global search.",
    "resourcePlannerEnabled": "Team capacity / resource planner.",
    "feedbackEnabled": "Feedback module.",
    "purchaseOrdersEnabled": "Purchase orders list.",
    "bidRequestsEnabled": "Bid requests list.",
    "allowStatusChange": "User may transition workflow status fields.",
    "allowStatusLevelDown": "Allow moving status backward (e.g. COMPLETED → INPROGRESS).",
    "changeableStatus": "Array of status codes user may set.",
    "listOnlyCurrentTeamProject": "Filter lists to current team scope only.",
    "viewServiceLineEstimate": "See service line estimate panels.",
    "enableProjectPurchaseOrderEditable": "Edit linked PO on project after create.",
    "enableServiceLineEstimateHourEditable": "Edit estimated hours on service lines.",
    "enableServiceLineEstimateHourVisible": "Show hour estimates in UI.",
    "enableServiceLineEstimateCostEditable": "Edit cost estimates.",
    "enableServiceLineEstimateCostVisible": "Show cost estimates.",
    "showOnlyActiveUserTeamsSelectableInProjectCreateWindow": "Team picker shows only active teams.",
    "showAllUserTeamsSelectableInProjectCreateWindow": "Team picker shows all teams user belongs to.",
    "allowAccessToOtherUserTeamProjects": "See projects outside own team scope.",
    "projectDatesRestrictedByPurchaseOrderDates": "Project dates cannot exceed PO contract dates.",
    "checklistEnabled": "Show checklist UI on entity.",
    "checklistSaveEnabled": "Save checklist progress.",
    "checklistUpdateCompletedEnabled": "Edit items after marked complete.",
    "checklistCompleteEnabled": "Mark checklist complete.",
    "checklistChangeEnabled": "Modify checklist template on instance.",
    "restrictedBySkillsEnabled": "Filter assignees by skill tags.",
    "switchEmployeesEnabled": "Pick another employee in timesheet/task views.",
    "createWorkItemLogForOtherEmployees": "Log time on behalf of others.",
    "enableCreateCompletedWorkItem": "Create work items already in completed state.",
    "editCompletedWorkItemInfo": "Edit metadata on completed items.",
    "editCompletedWorkItemHours": "Change hours after completion.",
    "editCompletedWorkItemEstimatedHours": "Change estimates after completion.",
    "viewWorkItemEstimatedHours": "See estimate fields.",
    "enableWorkItemDeleteTillNextDayXHour": "Grace period (hour of day) to delete yesterday's items.",
    "enableCompletedWorkItemHoursEditTillNextDayXHour": "Grace period to edit completed item hours.",
    "maxHoursAllowedToEnter": "Daily or entry hour cap validation.",
    "allowLeaveAndHolidayForFuture": "Book leave on future dates.",
    "allowLeaveAndHolidayForPast": "Book leave retroactively.",
    "disableWorkItemCreateBeforeYWorkingDaysAfterXHours": "Cutoff rule: block create before N working days after hour X.",
    "disableNonProjectWorkItemCreateBeforeXWorkingDays": "-1 = disabled; else days before today allowed for non-project entries.",
    "disableNonProjectWorkItemCreateAfterXWorkingDays": "Forward limit for non-project create.",
    "disableNonProjectWorkItemAssignBeforeXWorkingDays": "Assign window start for non-project.",
    "disableNonProjectWorkItemAssignAfterXWorkingDays": "Assign window end for non-project.",
    "disableProjectWorkItemCreateBeforeXWorkingDays": "Retro limit for project work items.",
    "disableProjectWorkItemCreateAfterXWorkingDays": "Forward limit for project work items.",
    "disableProjectWorkItemAssignBeforeXWorkingDays": "Assignment retro limit on projects.",
    "disableProjectWorkItemAssignAfterXWorkingDays": "Assignment forward limit on projects.",
    "enableTimeSheetEntry": "Allow logging hours.",
    "enableTimeSheetEdit": "Allow editing submitted entries.",
    "enableTimeSheetApproval": "Manager approval workflow.",
    "disableLastMonthAfterXDays": "Lock prior month after X days into current month.",
    "enableFutureTimeSheetView": "Navigate to future weeks.",
    "enablePastTimeSheetView": "Navigate to historical weeks.",
    "timeSheetNonBillableShowAllAccountsEnabled": "Show all accounts on non-billable rows.",
    "multiTaskBoardEnabled": "Multiple kanban boards per team.",
    "allUserTeamMultiTaskBoardEnabled": "Boards across all user teams.",
    "configureEnabled": "Edit board columns/configuration.",
    "workItemDeleteEnabled": "Delete cards from board.",
    "workItemRemoveEnabled": "Remove cards from board.",
    "reportConfigurationEnabled": "Admin report configuration.",
    "defaultReportEnabled": "Standard default report export.",
    "reportScheduleAllTeamAccessEnabled": "Schedule reports for all teams.",
    "allowAccessToOtherUserTeamPurchaseOrder": "View POs from other teams.",
    "showAllPurchaseOrderProjects": "See all projects linked to PO regardless of team.",
    "activateEnabled": "Activate feedback campaign.",
    "updateStatusEnabled": "Change feedback request status.",
    "resendEnabled": "Resend feedback invitation email.",
    "showAllUserTeamsAccount": "Accounts list ignores team filter.",
    "showAllByAccounts": "Expanded account visibility mode.",
    "enableDeliverableEstimateHourEditable": "Edit deliverable hour estimates.",
}

MODULE_META = {
    "HRMS": {"icon": "👥", "css": "module-hrms", "tagline": "Workforce master data — bands, departments, skills, practice hierarchy"},
    "PROJECT": {"icon": "📁", "css": "module-project", "tagline": "Delivery configuration — service lines, categories, PO rules, notification routing"},
    "NONPROJECT": {"icon": "⏱", "css": "module-nonproject", "tagline": "Non-billable time — overhead categories, leave shortcuts, internal dimensions"},
    "SALES": {"icon": "💼", "css": "module-sales", "tagline": "Bid pipeline taxonomy — study types, client segments, geography lists"},
}

INPUT_TYPE_LABELS = {
    None: "Simple list",
    "list": "Checkbox map",
    "group": "Permission group",
    "multi": "Multi-level tree",
}


def _load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _format_value_preview(value, max_items=12):
    if value is None:
        return "<em>null</em>"
    if isinstance(value, bool):
        return f'<span class="badge badge-primary">{"true" if value else "false"}</span>'
    if isinstance(value, (int, float)):
        return f"<code>{value}</code>"
    if isinstance(value, str):
        return f"<code>{_esc(value)}</code>"
    if isinstance(value, list):
        if not value:
            return "<em>Empty list — add values in App Config UI</em>"
        shown = value[:max_items]
        chips = "".join(f'<span class="badge badge-primary">{_esc(v)}</span> ' for v in shown)
        extra = f' <span class="text-light">+{len(value) - max_items} more</span>' if len(value) > max_items else ""
        return f'<div class="config-value-chips">{chips}{extra}</div><p class="config-value-count">{len(value)} configured values</p>'
    if isinstance(value, dict):
        if not value:
            return "<em>Empty object</em>"
        keys = list(value.keys())[:max_items]
        if all(isinstance(v, dict) for v in value.values()):
            lines = "".join(f"<li><strong>{_esc(k)}</strong> ({len(value[k])} sub-keys)</li>" for k in keys)
            extra = f"<li>… +{len(value) - max_items} more</li>" if len(value) > max_items else ""
            return f'<ul class="config-tree-preview">{lines}{extra}</ul><p class="config-value-count">Multi-level tree — expand in App Config UI</p>'
        rows = "".join(
            f"<tr><td><code>{_esc(k)}</code></td><td>{_format_value_preview(v, 3)}</td></tr>"
            for k, v in list(value.items())[:20]
        )
        return f'<div class="table-wrap"><table class="table table--compact"><tbody>{rows}</tbody></table></div>'
    return f"<code>{_esc(value)}</code>"


def _config_props_row(item):
    flags = []
    it = item.get("inputType")
    if it:
        flags.append(f'<span class="config-prop-chip">inputType · <code>{it}</code></span>')
    elif item.get("value") is not None and not isinstance(item.get("value"), dict):
        flags.append('<span class="config-prop-chip">inputType · list</span>')
    if item.get("longList"):
        flags.append('<span class="config-prop-chip config-prop-chip--warn">longList</span>')
    if item.get("overridden"):
        flags.append('<span class="config-prop-chip config-prop-chip--warn">overridden</span>')
    if item.get("locked"):
        flags.append('<span class="config-prop-chip config-prop-chip--lock">locked</span>')
    if item.get("hidden"):
        flags.append('<span class="config-prop-chip">hidden</span>')
    if item.get("parentLocked"):
        flags.append('<span class="config-prop-chip">parentLocked</span>')
    return "".join(flags) if flags else '<span class="config-prop-chip config-prop-chip--muted">inherits defaults</span>'


def _count_values(value):
    if value is None:
        return 0
    if isinstance(value, list):
        return len(value)
    if isinstance(value, dict):
        return len(value)
    return 1


def _compute_stats(org, role):
    org_mods = org.get("modules") or {}
    role_mods = role.get("modules") or {}
    org_keys = sum(len(m.get("configurations") or {}) for m in org_mods.values())
    role_keys = sum(len(m.get("configurations") or {}) for m in role_mods.values())
    org_values = 0
    for m in org_mods.values():
        for c in (m.get("configurations") or {}).values():
            org_values += _count_values(c.get("value"))
    perm_flags = 0
    perm_on = 0
    for m in role_mods.values():
        for c in (m.get("configurations") or {}).values():
            v = c.get("value")
            if isinstance(v, dict):
                for fv in v.values():
                    if isinstance(fv, bool):
                        perm_flags += 1
                        if fv:
                            perm_on += 1
    return {
        "org_modules": len(org_mods),
        "role_modules": len(role_mods),
        "org_keys": org_keys,
        "role_keys": role_keys,
        "org_values": org_values,
        "perm_flags": perm_flags,
        "perm_on": perm_on,
    }


def _render_config_item(key, item, module_key=""):
    meta = ORG_FIELD_META.get(key)
    title = item.get("label") or key
    if meta:
        title, desc, affects = meta
    else:
        desc = "Organization configuration value — edit in Application Configuration UI."
        affects = "Module forms and dropdowns"
    mll = item.get("multiLevelLabel")
    mll_html = ""
    if mll:
        levels = ", ".join(f'<span class="config-level-pill">L{k}: {_esc(v)}</span>' for k, v in sorted(mll.items(), reverse=True))
        mll_html = f'<div class="config-doc-card__levels"><span class="config-doc-card__levels-label">Hierarchy</span>{levels}</div>'
    search_blob = f"{key} {title} {desc} {affects} {item.get('label', '')}"
    val = item.get("value")
    if isinstance(val, list):
        search_blob += " " + " ".join(str(x) for x in val[:30])
    it = item.get("inputType") or "list"
    type_label = INPUT_TYPE_LABELS.get(item.get("inputType"), INPUT_TYPE_LABELS.get(it, "List"))
    mod = MODULE_META.get(module_key, {})
    mod_css = mod.get("css", "")
    return f"""
<article class="config-doc-card {mod_css}" id="cfg-{key}" data-search="{_esc(search_blob.lower())}">
  <div class="config-doc-card__accent"></div>
  <div class="config-doc-card__inner">
    <div class="config-doc-card__head">
      <div class="config-doc-card__title-row">
        <h4 class="config-doc-card__title">{_esc(title)}</h4>
        <span class="config-type-badge">{_esc(type_label)}</span>
      </div>
      <code class="config-doc-card__key">{_esc(key)}</code>
    </div>
    <p class="config-doc-card__desc">{desc}</p>
    <p class="config-doc-card__affects"><span class="config-doc-card__affects-icon">↗</span> {affects}</p>
    {mll_html}
    <div class="config-doc-card__props">{_config_props_row(item)}</div>
    <div class="config-doc-card__values">
      <div class="config-doc-card__values-head">
        <strong class="config-doc-card__values-label">Live values</strong>
        <span class="config-value-count">{_count_values(val)} item(s)</span>
      </div>
      {_format_value_preview(val)}
    </div>
  </div>
</article>"""


def _permission_summary(value):
    if not isinstance(value, dict):
        return ""
    bools = [(k, v) for k, v in value.items() if isinstance(v, bool)]
    if not bools:
        return ""
    on = sum(1 for _, v in bools if v)
    pct = int(round(on / len(bools) * 100)) if bools else 0
    return f"""
<div class="access-perm-meter" aria-label="{on} of {len(bools)} permissions enabled">
  <div class="access-perm-meter__bar"><div class="access-perm-meter__fill" style="width:{pct}%"></div></div>
  <span class="access-perm-meter__label"><strong>{on}</strong> / {len(bools)} enabled</span>
</div>"""


def _render_access_item(key, item, module_key=""):
    meta = ACCESS_GROUP_META.get(key)
    title = item.get("label") or key
    if meta:
        title, desc, itype = meta
    else:
        desc = "Role-based access control group."
        itype = item.get("inputType") or "group"
    value = item.get("value") or {}
    search_blob = f"{key} {title} {desc}"
    mod = MODULE_META.get(module_key, {})
    mod_css = mod.get("css", "")
    meter = _permission_summary(value)
    if isinstance(value, dict):
        for fk, fv in value.items():
            search_blob += f" {fk}"
            if isinstance(fv, bool):
                search_blob += f" {fv}"
            elif isinstance(fv, list):
                search_blob += " " + " ".join(str(x) for x in fv)
        rows = ""
        for fk, fv in value.items():
            fd = PERMISSION_FLAG_DESC.get(fk, "Permission flag — toggled per role in Access Control tree.")
            if isinstance(fv, bool):
                cell = f'<span class="perm-badge perm-badge--{"on" if fv else "off"}">{str(fv).lower()}</span>'
            elif isinstance(fv, list):
                cell = " ".join(f'<code class="perm-code">{_esc(x)}</code>' for x in fv) or "—"
            else:
                cell = f'<code class="perm-code">{_esc(fv)}</code>'
            rows += f'<tr><td><code class="perm-key">{_esc(fk)}</code></td><td>{fd}</td><td class="perm-val">{cell}</td></tr>'
        table = f"""
<div class="access-table-wrap">
  <table class="table table--permissions table--premium">
    <thead><tr><th>Flag</th><th>What it controls</th><th>Site Admin</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>"""
    else:
        table = _format_value_preview(value)
    return f"""
<article class="config-doc-card config-doc-card--access {mod_css}" id="access-{key}" data-search="{_esc(search_blob.lower())}">
  <div class="config-doc-card__accent"></div>
  <div class="config-doc-card__inner">
    <div class="config-doc-card__head">
      <div class="config-doc-card__title-row">
        <h4 class="config-doc-card__title">{_esc(title)}</h4>
        <span class="config-type-badge config-type-badge--access">{_esc(itype)}</span>
      </div>
      <code class="config-doc-card__key">{_esc(key)}</code>
    </div>
    <p class="config-doc-card__desc">{desc}</p>
    {meter}
    <div class="config-doc-card__props">{_config_props_row(item)}</div>
    {table}
  </div>
</article>"""


def _render_module_section(module_key, module_data, render_item_fn, section_prefix):
    enabled = module_data.get("enabled", True)
    en = "enabled" if enabled else "disabled"
    configs = module_data.get("configurations") or {}
    cards = "".join(render_item_fn(k, v, module_key) for k, v in configs.items())
    meta = MODULE_META.get(module_key, {})
    icon = meta.get("icon", "⚙️")
    tagline = meta.get("tagline", "Module configuration group")
    css = meta.get("css", "")
    prefix_label = "org" if section_prefix == "org" else "role"
    return f"""
<section class="config-module-block {css}" id="{section_prefix}-{module_key.lower()}" data-module="{module_key.lower()}">
  <div class="config-module-block__header">
    <div class="config-module-block__icon" aria-hidden="true">{icon}</div>
    <div class="config-module-block__meta">
      <div class="config-module-block__title-row">
        <h3 class="config-module-block__title">{_esc(module_data.get('label', module_key))}</h3>
        <span class="config-module-block__status config-module-block__status--{en}">{en}</span>
        <span class="config-module-block__count">{len(configs)} keys</span>
      </div>
      <p class="config-module-block__tagline">{tagline}</p>
      <p class="config-module-block__intro">Module <code>{_esc(module_key)}</code> · locked={str(module_data.get('locked', False)).lower()} · parentEnabled={str(module_data.get('parentEnabled', True)).lower()}</p>
    </div>
    <button type="button" class="appcfg-module-toggle" aria-expanded="true">Collapse module</button>
  </div>
  <div class="config-module-block__body">
    <div class="config-doc-grid">{cards}</div>
  </div>
</section>"""


def _render_jump_nav(org_modules, role_modules):
    links = []
    for mk in org_modules:
        meta = MODULE_META.get(mk, {})
        links.append(
            f'<a class="appcfg-jump__link appcfg-jump__link--org" href="#org-{mk.lower()}">'
            f'{meta.get("icon", "⚙")} {_esc(mk)}</a>'
        )
    for mk in role_modules:
        meta = MODULE_META.get(mk, {})
        links.append(
            f'<a class="appcfg-jump__link appcfg-jump__link--role" href="#role-{mk.lower()}">'
            f'{meta.get("icon", "⚙")} {_esc(mk)} access</a>'
        )
    return "".join(links)


def render_application_config_content():
    from _app_config_faq import render_faq_section, render_mistakes_section
    from _generate_pages import asset

    org = _load_json(ORG_JSON)
    role = _load_json(ROLE_JSON)
    stats = _compute_stats(org, role)

    org_modules = org.get("modules") or {}
    role_modules = role.get("modules") or {}

    org_sections = ""
    for mk, md in org_modules.items():
        org_sections += _render_module_section(mk, md, _render_config_item, "org")

    role_sections = ""
    for mk, md in role_modules.items():
        role_sections += _render_module_section(mk, md, _render_access_item, "role")

    jump_nav = _render_jump_nav(org_modules, role_modules)

    return f"""
<div class="doc-canvas appcfg-page">
  <header class="appcfg-hero">
    <div class="appcfg-hero__mesh" aria-hidden="true"></div>
    <div class="appcfg-hero__inner">
      <div class="appcfg-hero__top">
        <span class="appcfg-hero__eyebrow">HRMS · Administration · Reference</span>
        <div class="appcfg-hero__pills">
          <span class="appcfg-pill"><strong>Route</strong> <code>/hrms/appconfig</code></span>
          <span class="appcfg-pill"><strong>UI</strong> ApplicationConfigPage</span>
          <span class="appcfg-pill appcfg-pill--accent">org.json + role.json</span>
        </div>
      </div>
      <h1 class="appcfg-hero__title">Application Configuration<br><span>&amp; Access Control</span></h1>
      <p class="appcfg-hero__lead">The definitive guide to organization master data, feature toggles, and role permissions — every key documented with live values, UI behaviour, and downstream impact across HRMS, Project, Sales, and Timesheet.</p>
      <div class="appcfg-stat-grid">
        <article class="appcfg-stat"><span class="appcfg-stat__value">{stats['org_keys']}</span><span class="appcfg-stat__label">App config keys</span><span class="appcfg-stat__hint">org.json · {stats['org_modules']} modules</span></article>
        <article class="appcfg-stat"><span class="appcfg-stat__value">{stats['org_values']}+</span><span class="appcfg-stat__label">Configured values</span><span class="appcfg-stat__hint">Lists, trees, toggles</span></article>
        <article class="appcfg-stat"><span class="appcfg-stat__value">{stats['role_keys']}</span><span class="appcfg-stat__label">Access groups</span><span class="appcfg-stat__hint">role.json · {stats['role_modules']} modules</span></article>
        <article class="appcfg-stat appcfg-stat--highlight"><span class="appcfg-stat__value">{stats['perm_on']}/{stats['perm_flags']}</span><span class="appcfg-stat__label">Permissions on</span><span class="appcfg-stat__hint">Site Admin reference role</span></article>
      </div>
      <div class="appcfg-hero__actions">
        <a class="appcfg-btn appcfg-btn--primary" href="#application-configuration">Application config ↓</a>
        <a class="appcfg-btn appcfg-btn--ghost" href="#access-control">Access control ↓</a>
        <a class="appcfg-btn appcfg-btn--ghost" href="../admin.html#appconfig">Admin overview</a>
      </div>
    </div>
  </header>

  <div class="appcfg-toolbar" id="appcfg-toolbar">
    <div class="appcfg-toolbar__search">
      <span class="appcfg-toolbar__search-icon" aria-hidden="true">⌕</span>
      <input type="search" id="appcfg-search" class="appcfg-toolbar__input" placeholder="Filter by key, label, value, or permission flag…" autocomplete="off" aria-label="Filter configuration reference">
    </div>
    <nav class="appcfg-jump" aria-label="Jump to module">{jump_nav}</nav>
  </div>
  <p class="appcfg-empty" id="appcfg-empty" hidden>No matching configuration keys — try a shorter term or clear the filter.</p>

  <div class="doc-flow appcfg-flow">
    <section class="doc-block appcfg-section" id="overview">
      <h2 class="doc-block__title">Overview</h2>
      <div class="appcfg-dual-banner">
        <article class="appcfg-dual-card appcfg-dual-card--org">
          <span class="appcfg-dual-card__icon">🏢</span>
          <h3 class="appcfg-dual-card__title">Application configuration</h3>
          <p class="appcfg-dual-card__desc"><strong>org.json</strong> seeds dropdown lists, email routing, service-line trees, and boolean feature flags. Org units inherit from parent nodes; child teams override with the chain icon.</p>
          <ul class="appcfg-dual-card__list"><li>Bands, departments, skills</li><li>categoryMap service-line tree</li><li>PO &amp; project notification emails</li><li>Timesheet non-billable categories</li></ul>
        </article>
        <article class="appcfg-dual-card appcfg-dual-card--role">
          <span class="appcfg-dual-card__icon">🔐</span>
          <h3 class="appcfg-dual-card__title">Access control</h3>
          <p class="appcfg-dual-card__desc"><strong>role.json</strong> defines module visibility and CRUD gates. Roles attach to org units via Role Bar; users receive effective permissions on login refresh.</p>
          <ul class="appcfg-dual-card__list"><li>Sidebar module toggles</li><li>Timesheet edit windows</li><li>Report catalog access</li><li>Project status transition rules</li></ul>
        </article>
      </div>
      <div class="concept-grid appcfg-concept-grid">
        <article class="concept-card appcfg-concept"><h3 class="concept-card__title">Org node</h3><p class="concept-card__desc">type=org — inherits parentValue until overridden. Use for team-specific department lists or regional notification emails.</p></article>
        <article class="concept-card appcfg-concept"><h3 class="concept-card__title">Role node</h3><p class="concept-card__desc">type=role — permission template. Clone Site Admin to create Manager, Finance, or IC roles with reduced flags.</p></article>
        <article class="concept-card appcfg-concept"><h3 class="concept-card__title">Inherit chain</h3><p class="concept-card__desc">Linked chain = use parent value. Broken chain = local override stored on this node (overridden=true).</p></article>
        <article class="concept-card appcfg-concept"><h3 class="concept-card__title">Lock &amp; hide</h3><p class="concept-card__desc">Lock blocks child overrides — ideal for enterprise-wide categoryMap. Hide removes from non-admin UI when combined with lock.</p></article>
      </div>
      <div class="callout callout--info"><div class="callout__icon">ℹ️</div><div class="callout__body"><strong class="callout__title">Who should use this page</strong><div class="callout__text">Workspace administrators, IT ops, and implementation leads configuring Tracopus after deployment. Requires <code>hrmsModules.appconfigEnabled</code> on your role. Changes affect all users in the selected org scope on next config refresh.</div></div></div>
    </section>

    <section class="doc-block appcfg-section" id="ui-layout">
      <h2 class="doc-block__title">Screen layout</h2>
      <p class="appcfg-section-lead">The live screen at <code>/hrms/appconfig</code> mirrors the wireframe below — left tree navigation, hero identity bar, and scrollable module panel with filters.</p>
      <div class="appcfg-wireframe">
        <div class="appcfg-wireframe__panel appcfg-wireframe__panel--tree">
          <span class="appcfg-wireframe__label">Left menu</span>
          <div class="appcfg-wireframe__tabs"><span class="is-active">Organization</span><span>Roles</span></div>
          <ul class="appcfg-wireframe__tree"><li>▸ Root</li><li>&nbsp;&nbsp;▸ Team Alpha</li><li>&nbsp;&nbsp;▸ Team Beta</li><li>+ Add org unit</li></ul>
        </div>
        <div class="appcfg-wireframe__main">
          <div class="appcfg-wireframe__hero"><strong>ApplicationConfigHero</strong> — name · parent · category · save</div>
          <div class="appcfg-wireframe__filters"><span class="is-active">All</span><span>Overridden</span><span>Locked</span><span class="appcfg-wireframe__search">Search…</span></div>
          <div class="appcfg-wireframe__modules">
            <div class="appcfg-wireframe__module"><span>HRMS</span><em>16 keys</em></div>
            <div class="appcfg-wireframe__module"><span>PROJECT</span><em>26 keys</em></div>
            <div class="appcfg-wireframe__module"><span>Role bar</span><em>assign template</em></div>
          </div>
          <div class="appcfg-wireframe__save">Unsaved changes → <strong>Save</strong> (updateConfig)</div>
        </div>
      </div>
      <div class="doc-split appcfg-split">
        <div class="appcfg-panel">
          <h3 class="subheading">Components</h3>
          <ul class="appcfg-checklist"><li><code>ApplicationConfigLeftMenu</code> — org + role trees, create child nodes</li><li><code>ApplicationConfigHero</code> — node identity inline edit</li><li><code>ApplicationConfigSection</code> — module cards, config blocks</li><li><code>ApplicationConfigRoleBar</code> — attach role templates to org units</li></ul>
        </div>
        <div class="appcfg-panel">
          <h3 class="subheading">Save &amp; filters</h3>
          <ul class="appcfg-checklist"><li><strong>All</strong> — every config key on selected node</li><li><strong>Overridden</strong> — keys with local values (broken chain)</li><li><strong>Locked</strong> — keys enforced for children</li><li><strong>Save</strong> — persists value changes; property edits use <code>updateConfigProperty</code></li></ul>
        </div>
      </div>
    </section>

    <section class="doc-block appcfg-section" id="config-schema">
      <h2 class="doc-block__title">Configuration schema</h2>
      <p class="appcfg-section-lead">Every item in org.json and role.json shares this shape — the UI renders different editors based on <code>inputType</code>.</p>
      <div class="appcfg-schema-grid">
        <article class="appcfg-schema-card"><code>label</code><p>Display name in module card header</p></article>
        <article class="appcfg-schema-card"><code>value</code><p>Scalar, string[], boolean map, or nested tree object</p></article>
        <article class="appcfg-schema-card"><code>inputType</code><p><strong>null/list</strong> simple values · <strong>group</strong> CRUD toggles · <strong>multi</strong> tree editor</p></article>
        <article class="appcfg-schema-card"><code>multiLevelLabel</code><p>Level names for 2–3 deep hierarchies (categoryMap, practiceMap)</p></article>
        <article class="appcfg-schema-card"><code>overridden</code><p>Node stores its own value instead of inheriting parentValue</p></article>
        <article class="appcfg-schema-card"><code>locked / hidden</code><p>Prevent child overrides; hide from non-admin when locked</p></article>
        <article class="appcfg-schema-card"><code>parentValue</code><p>Effective inherited value when chain is linked</p></article>
        <article class="appcfg-schema-card"><code>longList</code><p>Virtualized list UI for 50+ dropdown values</p></article>
      </div>
    </section>

    <section class="appcfg-part-banner appcfg-part-banner--org" id="application-configuration">
      <div class="appcfg-part-banner__inner">
        <span class="appcfg-part-banner__part">Part 1</span>
        <h2 class="appcfg-part-banner__title">Application configuration</h2>
        <p class="appcfg-part-banner__desc">Source: <code>org.json</code> · Root org <strong>{_esc(org.get('name', 'Root'))}</strong> · These keys populate dropdowns, validation, emails, and feature toggles across the platform.</p>
      </div>
    </section>
    <div class="appcfg-modules-wrap appcfg-modules-wrap--org">
      {org_sections}
    </div>

    <section class="appcfg-part-banner appcfg-part-banner--role" id="access-control">
      <div class="appcfg-part-banner__inner">
        <span class="appcfg-part-banner__part">Part 2</span>
        <h2 class="appcfg-part-banner__title">Access control</h2>
        <p class="appcfg-part-banner__desc">Source: <code>role.json</code> · Reference role <strong>{_esc(role.get('name', 'Site Admin'))}</strong> · {stats['perm_on']} of {stats['perm_flags']} boolean permission flags enabled in this template.</p>
      </div>
    </section>
    <div class="callout callout--warning appcfg-inline-callout"><div class="callout__icon">⚠️</div><div class="callout__body"><strong class="callout__title">Defence in depth</strong><div class="callout__text">UI hides disabled actions, but APIs must enforce the same flags. A false permission is a hard deny — never rely on UI-only security for compliance-sensitive operations.</div></div></div>
    <div class="appcfg-modules-wrap appcfg-modules-wrap--role">
      {role_sections}
    </div>

    <section class="doc-block appcfg-section" id="workflows">
      <h2 class="doc-block__title">Administrator workflows</h2>
      <div class="appcfg-workflow-grid">
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">01</span><strong>Add a department</strong><p>Org tree → Root → HRMS → Departments → (+) → Save module. Appears immediately in employee wizard Organization step.</p></article>
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">02</span><strong>Extend service line tree</strong><p>PROJECT → Service Line Configuration → expand Coding → Programming → add leaf task category. Timesheet billable picker updates on refresh.</p></article>
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">03</span><strong>Lock enterprise categoryMap</strong><p>Root → categoryMap → Lock → Hide. Child teams inherit identical tree; prevents accidental local drift.</p></article>
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">04</span><strong>Restrict timesheet edits</strong><p>Roles → custom Manager role → Timesheet Config → disable enableTimeSheetEdit, set disableLastMonthAfterXDays to 5.</p></article>
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">05</span><strong>Delegate app config access</strong><p>HRMS Modules Access → appconfigEnabled true only on Admin role; false for all IC and manager roles.</p></article>
        <article class="appcfg-workflow-card"><span class="appcfg-workflow-card__step">06</span><strong>Clone a role template</strong><p>Roles tree → (+) new role → copy Site Admin → disable delete/archive flags → assign to delivery teams via Role Bar.</p></article>
      </div>
    </section>

    {render_faq_section()}

    {render_mistakes_section()}

    <section class="doc-block appcfg-section" id="related">
      <h2 class="doc-block__title">Related guides</h2>
      <div class="related-links">
        <a class="related-link" href="../admin.html#appconfig"><span class="related-link__label">Admin &amp; Access</span><span class="related-link__desc">High-level permissions overview</span></a>
        <a class="related-link" href="settings.html"><span class="related-link__label">HRMS Settings</span><span class="related-link__desc">Operational settings cards</span></a>
        <a class="related-link" href="employees.html"><span class="related-link__label">Employees</span><span class="related-link__desc">Dropdowns sourced from HRMS config</span></a>
        <a class="related-link" href="../project/project-list.html"><span class="related-link__label">Project List</span><span class="related-link__desc">categoryMap drives billable linking</span></a>
        <a class="related-link" href="timesheet.html"><span class="related-link__label">Timesheet</span><span class="related-link__desc">Non-project categories &amp; edit windows</span></a>
        <a class="related-link" href="../sales/bid-requests.html"><span class="related-link__label">Bid Requests</span><span class="related-link__desc">Sales taxonomy from org config</span></a>
      </div>
    </section>

    <section class="doc-block appcfg-section" id="tips">
      <h2 class="doc-block__title">Tips &amp; best practices</h2>
      <div class="callout-stack">
        <div class="callout callout--tip"><div class="callout__icon">💡</div><div class="callout__body"><strong class="callout__title">Bulk import lists</strong><div class="callout__text">Use the multi-add textarea in list configs to paste dozens of values from Excel — one per line — instead of clicking (+) repeatedly.</div></div></div>
        <div class="callout callout--note"><div class="callout__icon">📝</div><div class="callout__body"><strong class="callout__title">Document your overrides</strong><div class="callout__text">When a child team overrides Root, note why in your internal runbook — future admins may not see the broken chain context.</div></div></div>
        <div class="callout callout--info"><div class="callout__icon">ℹ️</div><div class="callout__body"><strong class="callout__title">categoryMap performance</strong><div class="callout__text">Deep trees slow timesheet project pickers. Keep 3 levels meaningful; prune unused leaves quarterly.</div></div></div>
      </div>
    </section>
  </div>
</div>
<script src="{asset(1, 'js/app-config-page.js')}"></script>
<nav class="page-nav appcfg-page-nav">
  <a class="page-nav__prev" href="settings.html">← Settings</a>
  <a class="page-nav__next" href="index.html">HRMS Overview →</a>
</nav>
"""


def generate_application_config_page(render_fn, module_sidebar=None):
    """Generate full HTML page using docs render(depth, title, ...)."""
    from _app_config_faq import FAQ_SIDEBAR

    depth = 1
    body = render_application_config_content()
    sidebar = list(module_sidebar or [])
    sidebar.extend([
        {"title": "On this page"},
        {"file": "#overview", "href": "#overview", "label": "Overview"},
        {"file": "#ui-layout", "href": "#ui-layout", "label": "Screen layout"},
        {"file": "#application-configuration", "href": "#application-configuration", "label": "Application config"},
        {"file": "#access-control", "href": "#access-control", "label": "Access control"},
        {"file": "#config-schema", "href": "#config-schema", "label": "Schema"},
        {"file": "#workflows", "href": "#workflows", "label": "Workflows"},
    ])
    sidebar.extend(FAQ_SIDEBAR)
    sidebar.extend([
        {"file": "#related", "href": "#related", "label": "Related guides"},
        {"file": "#tips", "href": "#tips", "label": "Tips"},
    ])
    return render_fn(
        depth,
        "Application Configuration",
        '<a href="../index.html">Home</a> → HRMS → Application Configuration',
        sidebar,
        body,
        active_top="hrms/index.html",
        active_sidebar="application-config.html",
        current_module="hrms",
    )
