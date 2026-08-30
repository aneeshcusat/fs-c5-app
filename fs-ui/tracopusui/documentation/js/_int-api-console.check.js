    const SHARED_ERRORS = [
      { status: "200", kind: "ok", meaning: "Success. Body uses { payload }." },
      { status: "401", kind: "bad", meaning: "Missing/invalid integration secret, or API-key auth disabled." },
      { status: "403", kind: "bad", meaning: "Scope missing, userTeamId ≠ key team, or blocked path." },
      { status: "404", kind: "bad", meaning: "Resource id not found." },
      { status: "500", kind: "bad", meaning: "Unhandled server error." }
    ];
    const F = {
      team: { name: "userTeamId", req: true, type: "number", notes: "Must match the key team. Injected if omitted on some writes." },
      teams: { name: "userTeamIds", req: true, type: "number[]", notes: "Repeatable query. Empty list returns []. Must stay on the key team." },
      emp: { name: "employeeId", req: true, type: "number", notes: "Employee on the key team." },
      emps: { name: "employeeIds", req: true, type: "number[]", notes: "Repeatable. Used to scope list reads." },
      start: { name: "startDate", req: true, type: "datetime", notes: "ISO-8601, e.g. 2026-08-01T00:00:00" },
      end: { name: "endDate", req: true, type: "datetime", notes: "ISO-8601, e.g. 2026-08-31T23:59:59" },
      onlyTeams: { name: "isOnlyUserTeams", req: false, type: "boolean", notes: "When true, restrict to the supplied teams." },
      name: { name: "name", req: true, type: "string", notes: "Display name." },
      createdBy: { name: "createdBy", req: false, type: "number", notes: "Overwritten with the key service employee on writes." },
      po: { name: "purchaseOrderId", req: true, type: "number", notes: "Existing PO on the same team." },
      projectId: { name: "projectId", req: true, type: "number", notes: "Existing project id." },
      taskId: { name: "taskId", req: true, type: "number", notes: "Existing deliverable (task) id." },
      activityId: { name: "taskActivityId", req: true, type: "number", notes: "Existing work item (task activity) id." },
      status: { name: "status", req: true, type: "string", notes: "Domain status string." },
      isDelete: { name: "isDelete", req: true, type: "boolean", notes: "true = hard delete flag as implemented by the endpoint." },
      isArchive: { name: "isArchive", req: true, type: "boolean", notes: "Archive / unarchive." },
      isActive: { name: "isActive", req: true, type: "boolean", notes: "Activate / deactivate." },
      search: { name: "searchText", req: false, type: "string", notes: "Free-text filter inside ProjectSearchRequest." },
      viewer: { name: "viewerUserId", req: true, type: "number", notes: "Employee id of the caller for audit ACL." },
      page: { name: "page", req: false, type: "number", notes: "0-based page." },
      pageSize: { name: "pageSize", req: false, type: "number", notes: "Page size." }
    };

    const PROJECT_BODY = [
      F.name, F.po, F.team, F.createdBy,
      { name: "summary", req: false, type: "string", notes: "Short description." },
      { name: "status", req: false, type: "string", notes: "NEW, CREATED, ASSIGNED, INPROGRESS, COMPLETED, CLOSED." },
      { name: "type", req: false, type: "string", notes: "Delivery type (e.g. BILLABLE)." },
      { name: "code", req: false, type: "string", notes: "External project code." },
      { name: "owner", req: false, type: "number", notes: "Owner employee id." },
      { name: "estStartTime", req: false, type: "datetime", notes: "Planned start." },
      { name: "estCompletionTime", req: false, type: "datetime", notes: "Planned end." },
      { name: "estHours", req: false, type: "number", notes: "Estimated hours." }
    ];
    const PROJECT_RESP = [
      { name: "id", type: "number", notes: "Project id." },
      { name: "name", type: "string", notes: "Display name." },
      { name: "userTeamId", type: "number", notes: "Owning team." },
      { name: "purchaseOrderId", type: "number", notes: "Parent PO." },
      { name: "status", type: "string", notes: "Current status." },
      { name: "createdBy", type: "number", notes: "Service employee from the key." }
    ];
    const PO_BODY = [
      F.name, F.team, F.createdBy,
      { name: "code", req: false, type: "string", notes: "PO / contract code." },
      { name: "clientName", req: false, type: "string", notes: "Client label." },
      { name: "startDate", req: false, type: "datetime", notes: "Contract start." },
      { name: "endDate", req: false, type: "datetime", notes: "Contract end." },
      { name: "amount", req: false, type: "number", notes: "Contract value." },
      { name: "currency", req: false, type: "string", notes: "ISO currency." },
      { name: "status", req: false, type: "string", notes: "PO status." }
    ];
    const PO_RESP = [
      { name: "id", type: "number", notes: "Purchase order id." },
      { name: "name", type: "string", notes: "Contract name." },
      { name: "userTeamId", type: "number", notes: "Owning team." },
      { name: "status", type: "string", notes: "Current status." }
    ];
    const TASK_BODY = [
      { name: "name", req: true, type: "string", notes: "Deliverable name." },
      F.projectId, F.team, F.createdBy,
      { name: "description", req: false, type: "string", notes: "Details." },
      { name: "status", req: false, type: "string", notes: "Task status." },
      { name: "assignee", req: false, type: "number", notes: "Assignee employee id." },
      { name: "estHours", req: false, type: "number", notes: "Estimated hours." }
    ];
    const TASK_RESP = [
      { name: "id", type: "number", notes: "Task (deliverable) id." },
      { name: "name", type: "string", notes: "Name." },
      { name: "projectId", type: "number", notes: "Parent project." },
      { name: "status", type: "string", notes: "Status." }
    ];
    const ACT_BODY = [
      { name: "name", req: true, type: "string", notes: "Work item name." },
      F.taskId, F.projectId, F.team, F.createdBy,
      { name: "employeeId", req: false, type: "number", notes: "Assignee." },
      { name: "status", req: false, type: "string", notes: "Activity status." },
      { name: "canComplete", req: false, type: "boolean", notes: "Completion permission flag." }
    ];
    const ACT_RESP = [
      { name: "id", type: "number", notes: "Task activity (work item) id." },
      { name: "name", type: "string", notes: "Name." },
      { name: "taskId", type: "number", notes: "Parent deliverable." },
      { name: "status", type: "string", notes: "Status." }
    ];
    const EMP_RESP = [
      { name: "id", type: "number", notes: "Employee id." },
      { name: "firstName", type: "string", notes: "Given name (persona-masked when required)." },
      { name: "userTeamId", type: "number", notes: "Home team." },
      { name: "email", type: "string", notes: "May be masked." }
    ];
    const LIST_RESP = [{ name: "payload", type: "array", notes: "List of entities in the standard envelope." }];
    const FLAG_RESP = [{ name: "payload", type: "object", notes: "General success / updated flag payload." }];
    const AUDIT_RESP = [
      { name: "events", type: "array", notes: "Secured audit timeline page." },
      { name: "page", type: "number", notes: "Current page." }
    ];
    const CENTER_OBJ = [
      { name: "id", type: "string", notes: "Record id." },
      { name: "name", type: "string", notes: "Display name." },
      { name: "status", type: "string", notes: "Connector / job status." }
    ];

    function api(spec) {
      return Object.assign({
        query: [], path: [], body: [],
        response: LIST_RESP,
        errors: SHARED_ERRORS
      }, spec);
    }

    const APIS = [
      api({ id: "proj-create", group: "Projects", name: "Create project", method: "POST", path: "/api/v2/projects", scope: "projects.write",
        desc: "Create a project under an existing purchase order on the key team.",
        body: PROJECT_BODY, response: PROJECT_RESP,
        sample: { name: "ERP project", userTeamId: 101, purchaseOrderId: 9001, createdBy: 12 } }),
      api({ id: "proj-update", group: "Projects", name: "Update project", method: "PUT", path: "/api/v2/projects", scope: "projects.write",
        desc: "Update an existing project. Send id plus changed fields.",
        body: [{ name: "id", req: true, type: "number", notes: "Project id." }].concat(PROJECT_BODY), response: PROJECT_RESP,
        sample: { id: 44102, name: "ERP project", userTeamId: 101, purchaseOrderId: 9001 } }),
      api({ id: "proj-list", group: "Projects", name: "List projects", method: "GET", path: "/api/v2/projects", scope: "projects.read",
        desc: "List projects in a date window for employees on the key team.",
        query: [F.teams, F.emps, F.start, F.end, F.onlyTeams] }),
      api({ id: "proj-by-po", group: "Projects", name: "List by purchase order", method: "GET", path: "/api/v2/projects/purchaseorders", scope: "projects.read",
        desc: "Projects hanging off a PO number.",
        query: [{ name: "purchaseOrderNumber", req: true, type: "number", notes: "PO number." }, F.teams] }),
      api({ id: "proj-timesheet", group: "Projects", name: "List for timesheet", method: "GET", path: "/api/v2/projects/timesheet", scope: "projects.read",
        desc: "Projects an employee can book time against.",
        query: [F.emp, F.team, F.start, F.end, F.onlyTeams] }),
      api({ id: "proj-search", group: "Projects", name: "Search projects", method: "POST", path: "/api/v2/projects/search", scope: "projects.write",
        desc: "Search. Empty userTeamIds returns [].",
        query: [F.emp, F.teams, F.onlyTeams],
        body: [F.search, { name: "status", req: false, type: "string", notes: "Optional status filter." }],
        sample: { searchText: "ERP" } }),
      api({ id: "proj-get", group: "Projects", name: "Get project", method: "GET", path: "/api/v2/projects/{projectId}", scope: "projects.read",
        desc: "Single project. Id may be numeric.",
        path: [F.projectId], response: PROJECT_RESP }),
      api({ id: "proj-audit", group: "Projects", name: "Project audit", method: "GET", path: "/api/v2/projects/{projectId}/audit", scope: "projects.read",
        desc: "Secured audit timeline.",
        path: [F.projectId], query: [F.viewer, F.page, F.pageSize], response: AUDIT_RESP }),
      api({ id: "proj-details", group: "Projects", name: "Project details", method: "GET", path: "/api/v2/projects/details/{projectId}", scope: "projects.read",
        desc: "Expanded project details payload.",
        path: [F.projectId], response: PROJECT_RESP }),
      api({ id: "proj-agg", group: "Projects", name: "Project aggregate", method: "GET", path: "/api/v2/projects/{projectId}/aggregate", scope: "projects.read",
        desc: "Roll-up / commercial aggregate for the project.",
        path: [F.projectId], response: [{ name: "payload", type: "object", notes: "Aggregate metrics and references." }] }),
      api({ id: "proj-closure-get", group: "Projects", name: "Get closure", method: "GET", path: "/api/v2/projects/{projectId}/closure", scope: "projects.read",
        desc: "Closure packet if present.",
        path: [F.projectId], response: [{ name: "payload", type: "object", notes: "Closure state." }] }),
      api({ id: "proj-closure-post", group: "Projects", name: "Submit closure", method: "POST", path: "/api/v2/projects/{projectId}/closure", scope: "projects.write",
        desc: "Submit project closure.",
        path: [F.projectId],
        body: [{ name: "notes", req: false, type: "string", notes: "Closure notes." }],
        sample: { notes: "Delivery complete" }, response: FLAG_RESP }),
      api({ id: "proj-signoff", group: "Projects", name: "Closure sign-off", method: "POST", path: "/api/v2/projects/{projectId}/closure/sign-off", scope: "projects.write",
        desc: "Sign off closure.",
        path: [F.projectId],
        body: [{ name: "approved", req: true, type: "boolean", notes: "Sign-off decision." }],
        sample: { approved: true }, response: FLAG_RESP }),
      api({ id: "proj-del-flag", group: "Projects", name: "Delete project (flag)", method: "DELETE", path: "/api/v2/projects/{projectId}/{isDelete}", scope: "projects.write",
        desc: "Soft/hard delete using the isDelete flag.",
        path: [F.projectId, F.isDelete], response: FLAG_RESP }),
      api({ id: "proj-status", group: "Projects", name: "Update project status", method: "PUT", path: "/api/v2/projects/status/{projectId}/{status}", scope: "projects.write",
        desc: "Set project status.",
        path: [F.projectId, F.status], response: FLAG_RESP }),
      api({ id: "proj-archive", group: "Projects", name: "Archive project", method: "PUT", path: "/api/v2/projects/{projectId}/{isArchive}", scope: "projects.write",
        desc: "Archive or restore.",
        path: [F.projectId, F.isArchive], response: FLAG_RESP }),
      api({ id: "proj-fav", group: "Projects", name: "Favorite project", method: "PUT", path: "/api/v2/projects/favorite/{projectId}/{employeeId}/{isFavorite}", scope: "projects.write",
        desc: "Toggle favorite for an employee.",
        path: [F.projectId, F.emp, { name: "isFavorite", req: true, type: "boolean", notes: "Favorite flag." }], response: FLAG_RESP }),
      api({ id: "proj-del", group: "Projects", name: "Delete project", method: "DELETE", path: "/api/v2/projects/{projectId}", scope: "projects.write",
        desc: "Delete project by id.",
        path: [F.projectId], response: FLAG_RESP }),
      api({ id: "proj-est", group: "Projects", name: "Update estimate", method: "PUT", path: "/api/v2/projects/estimate/{projectId}", scope: "projects.write",
        desc: "Update estimate dimensions.",
        path: [F.projectId],
        body: [{ name: "estHours", req: false, type: "number", notes: "Hours." }, { name: "dimensions", req: false, type: "object", notes: "Estimate dimension map." }],
        sample: { estHours: 120 }, response: FLAG_RESP }),
      api({ id: "proj-est-dim", group: "Projects", name: "Estimate dimensions", method: "GET", path: "/api/v2/projects/estimate/dimensions", scope: "projects.read",
        desc: "Catalog of estimate dimensions.",
        response: [{ name: "payload", type: "array", notes: "Dimension definitions." }] }),

      api({ id: "po-create", group: "Purchase orders", name: "Create purchase order", method: "POST", path: "/api/v2/purchaseorder", scope: "purchaseorders.write",
        desc: "Create the purchase contract that projects hang off.",
        body: PO_BODY, response: PO_RESP,
        sample: { name: "ACME FY26", userTeamId: 101, createdBy: 12, code: "PO-9001" } }),
      api({ id: "po-update", group: "Purchase orders", name: "Update purchase order", method: "PUT", path: "/api/v2/purchaseorder", scope: "purchaseorders.write",
        desc: "Update an existing PO.",
        body: [{ name: "id", req: true, type: "number", notes: "PO id." }].concat(PO_BODY), response: PO_RESP,
        sample: { id: 9001, name: "ACME FY26", userTeamId: 101 } }),
      api({ id: "po-list", group: "Purchase orders", name: "List purchase orders", method: "GET", path: "/api/v2/purchaseorder", scope: "purchaseorders.read",
        desc: "Empty userTeamIds returns [].",
        query: [F.teams, { ...F.start, req: false }, { ...F.end, req: false }] }),
      api({ id: "po-sf", group: "Purchase orders", name: "List Salesforce POs", method: "GET", path: "/api/v2/purchaseorder/salesforce", scope: "purchaseorders.read",
        desc: "Salesforce-origin purchase orders for the team.",
        query: [F.teams, { ...F.start, req: false }, { ...F.end, req: false }] }),
      api({ id: "po-search", group: "Purchase orders", name: "Search purchase orders", method: "POST", path: "/api/v2/purchaseorder/search", scope: "purchaseorders.write",
        desc: "Search POs. Empty teams returns [].",
        query: [F.teams, F.onlyTeams],
        body: [F.search], sample: { searchText: "ACME" } }),
      api({ id: "po-get", group: "Purchase orders", name: "Get purchase order", method: "GET", path: "/api/v2/purchaseorder/{purchaseOrderId}", scope: "purchaseorders.read",
        desc: "Single PO.",
        path: [F.po], response: PO_RESP }),
      api({ id: "po-audit", group: "Purchase orders", name: "PO audit", method: "GET", path: "/api/v2/purchaseorder/{purchaseOrderId}/audit", scope: "purchaseorders.read",
        desc: "Secured PO audit timeline.",
        path: [F.po], query: [F.viewer, F.page, F.pageSize], response: AUDIT_RESP }),
      api({ id: "po-del-flag", group: "Purchase orders", name: "Delete PO (flag)", method: "DELETE", path: "/api/v2/purchaseorder/{purchaseOrderId}/{isDelete}", scope: "purchaseorders.write",
        desc: "Delete with isDelete flag.",
        path: [F.po, F.isDelete], response: FLAG_RESP }),
      api({ id: "po-status", group: "Purchase orders", name: "Update PO status", method: "PUT", path: "/api/v2/purchaseorder/status/{purchaseOrderId}/{status}", scope: "purchaseorders.write",
        desc: "Set PO status.",
        path: [F.po, F.status], response: FLAG_RESP }),
      api({ id: "po-archive", group: "Purchase orders", name: "Archive PO", method: "PUT", path: "/api/v2/purchaseorder/{purchaseOrderId}/{isArchive}", scope: "purchaseorders.write",
        desc: "Archive or restore a PO.",
        path: [F.po, F.isArchive], response: FLAG_RESP }),
      api({ id: "po-del", group: "Purchase orders", name: "Delete PO", method: "DELETE", path: "/api/v2/purchaseorder/{purchaseOrderId}", scope: "purchaseorders.write",
        desc: "Delete PO by id.",
        path: [F.po], response: FLAG_RESP }),

      api({ id: "task-list", group: "Tasks", name: "List tasks for project", method: "GET", path: "/api/v2/task/{projectId}", scope: "tasks.read",
        desc: "Deliverables on a project.",
        path: [F.projectId], query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "task-recurring", group: "Tasks", name: "Recurring tasks", method: "GET", path: "/api/v2/task/recurring/{projectId}", scope: "tasks.read",
        desc: "Recurrable tasks on a project.",
        path: [F.projectId] }),
      api({ id: "task-get", group: "Tasks", name: "Get task", method: "GET", path: "/api/v2/task/info/{taskId}", scope: "tasks.read",
        desc: "Single deliverable.",
        path: [F.taskId], response: TASK_RESP }),
      api({ id: "task-create", group: "Tasks", name: "Create task", method: "POST", path: "/api/v2/task", scope: "tasks.write",
        desc: "Create a deliverable on an existing project.",
        body: TASK_BODY, response: TASK_RESP,
        sample: { name: "Build API sync", projectId: 44102, userTeamId: 101, createdBy: 12 } }),
      api({ id: "task-update", group: "Tasks", name: "Update task", method: "PUT", path: "/api/v2/task", scope: "tasks.write",
        desc: "Update a deliverable.",
        body: [{ name: "id", req: true, type: "number", notes: "Task id." }].concat(TASK_BODY), response: TASK_RESP,
        sample: { id: 8801, name: "Build API sync", projectId: 44102 } }),
      api({ id: "task-remove", group: "Tasks", name: "Remove task", method: "DELETE", path: "/api/v2/task/{taskId}", scope: "tasks.write",
        desc: "Remove task.",
        path: [F.taskId], response: FLAG_RESP }),
      api({ id: "task-active", group: "Tasks", name: "Activate task", method: "PUT", path: "/api/v2/task/{taskId}/{isActive}", scope: "tasks.write",
        desc: "Activate or deactivate.",
        path: [F.taskId, F.isActive], response: FLAG_RESP }),
      api({ id: "task-del-flag", group: "Tasks", name: "Delete task (flag)", method: "DELETE", path: "/api/v2/task/{taskId}/{isDelete}", scope: "tasks.write",
        desc: "Delete with isDelete flag.",
        path: [F.taskId, F.isDelete], response: FLAG_RESP }),
      api({ id: "task-status", group: "Tasks", name: "Update task status", method: "PUT", path: "/api/v2/task/status/{taskId}/{status}", scope: "tasks.write",
        desc: "Set task status.",
        path: [F.taskId, F.status], response: FLAG_RESP }),
      api({ id: "act-list", group: "Work items", name: "List activities for task", method: "GET", path: "/api/v2/task/activity/list/{taskId}", scope: "tasks.read",
        desc: "Work items under a deliverable.",
        path: [F.taskId], query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "act-get", group: "Work items", name: "Get activity", method: "GET", path: "/api/v2/task/activity/{taskActivityId}", scope: "tasks.read",
        desc: "Single work item.",
        path: [F.activityId], response: ACT_RESP }),
      api({ id: "act-trace", group: "Work items", name: "Activity trace", method: "GET", path: "/api/v2/task/activity/{taskActivityId}/trace", scope: "tasks.read",
        desc: "Trace / lineage for a work item.",
        path: [F.activityId], response: [{ name: "payload", type: "object", notes: "Trace graph." }] }),
      api({ id: "act-cloned", group: "Work items", name: "Cloned-by activity", method: "GET", path: "/api/v2/task/activity/clonedby/{taskActivityId}", scope: "tasks.read",
        desc: "Activities cloned from this work item.",
        path: [F.activityId] }),
      api({ id: "act-create", group: "Work items", name: "Create activity", method: "POST", path: "/api/v2/task/activity", scope: "tasks.write",
        desc: "Create a work item under an existing task.",
        body: ACT_BODY, response: ACT_RESP,
        sample: { name: "Implement mapper", taskId: 8801, projectId: 44102, userTeamId: 101 } }),
      api({ id: "act-update", group: "Work items", name: "Update activity", method: "PUT", path: "/api/v2/task/activity", scope: "tasks.write",
        desc: "Update a work item.",
        body: [{ name: "id", req: true, type: "number", notes: "Activity id." }].concat(ACT_BODY), response: ACT_RESP,
        sample: { id: 9901, name: "Implement mapper", taskId: 8801 } }),
      api({ id: "act-del", group: "Work items", name: "Delete activity", method: "DELETE", path: "/api/v2/task/activity/{taskActivityId}", scope: "tasks.write",
        desc: "Delete work item.",
        path: [F.activityId], response: FLAG_RESP }),
      api({ id: "act-del-flag", group: "Work items", name: "Delete activity (flag)", method: "DELETE", path: "/api/v2/task/activity/{taskActivityId}/{isDelete}", scope: "tasks.write",
        desc: "Delete with isDelete flag.",
        path: [F.activityId, F.isDelete], response: FLAG_RESP }),
      api({ id: "act-status-body", group: "Work items", name: "Update activity status (body)", method: "PUT", path: "/api/v2/task/activity/status", scope: "tasks.write",
        desc: "Status update via body.",
        body: [F.activityId, F.status], sample: { taskActivityId: 9901, status: "INPROGRESS" }, response: FLAG_RESP }),
      api({ id: "act-status", group: "Work items", name: "Update activity status", method: "PUT", path: "/api/v2/task/activity/status/{taskActivityId}/{status}", scope: "tasks.write",
        desc: "Status update via path.",
        path: [F.activityId, F.status], response: FLAG_RESP }),
      api({ id: "act-pause", group: "Work items", name: "Pause activity", method: "PUT", path: "/api/v2/task/activity/pause", scope: "tasks.write",
        desc: "Pause the running work item timer.",
        body: [F.activityId], sample: { taskActivityId: 9901 }, response: FLAG_RESP }),
      api({ id: "act-play", group: "Work items", name: "Play activity", method: "PUT", path: "/api/v2/task/activity/play/{savePrevious}", scope: "tasks.write",
        desc: "Start / resume a work item.",
        path: [{ name: "savePrevious", req: true, type: "boolean", notes: "Persist previous timer slice." }],
        body: [F.activityId], sample: { taskActivityId: 9901 }, response: FLAG_RESP }),
      api({ id: "act-proj", group: "Work items", name: "Activities by project", method: "GET", path: "/api/v2/task/activity/project/list/{projectId}", scope: "tasks.read",
        desc: "All work items on a project.",
        path: [F.projectId] }),
      api({ id: "act-board", group: "Work items", name: "Activity board list", method: "GET", path: "/api/v2/task/activity/board/list", scope: "tasks.read",
        desc: "Board-oriented activity list. Query params follow the live board contract.",
        query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "act-pending", group: "Work items", name: "Pending activities", method: "GET", path: "/api/v2/task/activity/list/pending", scope: "tasks.read",
        desc: "Pending work items.",
        query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "act-done", group: "Work items", name: "Completed activities", method: "GET", path: "/api/v2/task/activity/list/completed", scope: "tasks.read",
        desc: "Completed work items.",
        query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "act-all-alias", group: "Work items", name: "Activities list", method: "GET", path: "/api/v2/task/activities/list", scope: "tasks.read",
        desc: "Alias list of activities.",
        query: [{ ...F.teams, req: false }, { ...F.emps, req: false }] }),
      api({ id: "act-all", group: "Work items", name: "All activities", method: "GET", path: "/api/v2/task/activity/all/list", scope: "tasks.read",
        desc: "Unfiltered activity list for the scoped team.",
        query: [{ ...F.teams, req: false }] }),
      api({ id: "ts-get", group: "Timesheet", name: "Get timesheet", method: "GET", path: "/api/v2/task/timesheet", scope: "tasks.read",
        desc: "Timesheet rows for an employee/window. Protected production flow — use existing field contract.",
        query: [F.emp, F.team, F.start, F.end] }),
      api({ id: "ts-put", group: "Timesheet", name: "Update timesheet", method: "PUT", path: "/api/v2/task/timesheet", scope: "tasks.write",
        desc: "Write timesheet hours. Does not change approval engine behavior.",
        body: [
          F.emp, F.team,
          { name: "entries", req: true, type: "array", notes: "TimeSheetRequest entries (date, hours, activity)." }
        ],
        sample: { employeeId: 12, userTeamId: 101, entries: [] }, response: FLAG_RESP }),
      api({ id: "note-create", group: "Notes", name: "Create note", method: "POST", path: "/api/v2/task/notes", scope: "tasks.write",
        desc: "Create a personal / task note.",
        body: [
          { name: "note", req: true, type: "string", notes: "Note body." },
          F.emp, { name: "taskActivityId", req: false, type: "number", notes: "Optional work item." }
        ],
        sample: { note: "Blocked on PO", employeeId: 12 }, response: FLAG_RESP }),
      api({ id: "note-update", group: "Notes", name: "Update note", method: "PUT", path: "/api/v2/task/notes", scope: "tasks.write",
        desc: "Update a note.",
        body: [{ name: "id", req: true, type: "number", notes: "Note id." }, { name: "note", req: true, type: "string", notes: "Note body." }],
        sample: { id: 1, note: "Updated" }, response: FLAG_RESP }),
      api({ id: "note-list", group: "Notes", name: "List notes", method: "GET", path: "/api/v2/task/notes/{employeeId}", scope: "tasks.read",
        desc: "Notes for an employee.",
        path: [F.emp] }),
      api({ id: "note-status", group: "Notes", name: "Update note status", method: "PUT", path: "/api/v2/task/notes/{noteId}/{status}", scope: "tasks.write",
        desc: "Set note status.",
        path: [{ name: "noteId", req: true, type: "number", notes: "Note id." }, F.status], response: FLAG_RESP }),
      api({ id: "note-del", group: "Notes", name: "Delete note", method: "DELETE", path: "/api/v2/task/notes/{noteId}", scope: "tasks.write",
        desc: "Delete a note.",
        path: [{ name: "noteId", req: true, type: "number", notes: "Note id." }], response: FLAG_RESP }),

      api({ id: "emp-list", group: "Employees", name: "List employees", method: "GET", path: "/api/v2/employees", scope: "employees.read",
        desc: "Employees on the given teams. Empty userTeamIds returns []. Writes need *.",
        query: [F.teams], response: EMP_RESP }),
      api({ id: "emp-all", group: "Employees", name: "List all by active", method: "GET", path: "/api/v2/employees/all/{isActive}", scope: "employees.read",
        desc: "All employees filtered by active flag.",
        path: [F.isActive], response: EMP_RESP }),
      api({ id: "emp-get", group: "Employees", name: "Get employee", method: "GET", path: "/api/v2/employees/{employeeId}", scope: "employees.read",
        desc: "Single employee. Team ACL applies.",
        path: [F.emp], response: EMP_RESP }),
      api({ id: "emp-360", group: "Employees", name: "Employee 360", method: "GET", path: "/api/v2/employees/{employeeId}/360", scope: "employees.read",
        desc: "360 aggregate. Sensitive fields are persona-masked.",
        path: [F.emp], response: [{ name: "payload", type: "object", notes: "Masked 360 aggregate." }] }),
      api({ id: "emp-audit", group: "Employees", name: "Employee audit", method: "GET", path: "/api/v2/employees/{employeeId}/audit", scope: "employees.read",
        desc: "Employee audit timeline.",
        path: [F.emp], query: [F.viewer, F.page, F.pageSize], response: AUDIT_RESP }),
      api({ id: "att-list", group: "Employees", name: "List attendance", method: "GET", path: "/api/v2/employees/attendance", scope: "employees.read",
        desc: "Attendance matrix / list for the scoped team.",
        query: [{ ...F.teams, req: false }, { ...F.start, req: false }, { ...F.end, req: false }] }),
      api({ id: "att-pending", group: "Employees", name: "Pending attendance", method: "GET", path: "/api/v2/employees/attendance/pending", scope: "employees.read",
        desc: "Pending attendance approvals.",
        query: [{ ...F.teams, req: false }] }),
      api({ id: "att-emp", group: "Employees", name: "Attendance by employee", method: "GET", path: "/api/v2/employees/attendance/{employeeId}", scope: "employees.read",
        desc: "Attendance rows for one employee.",
        path: [F.emp] }),
      api({ id: "att-audit", group: "Employees", name: "Attendance audit", method: "GET", path: "/api/v2/employees/attendance/{attendanceId}/audit", scope: "employees.read",
        desc: "Audit for one attendance row.",
        path: [{ name: "attendanceId", req: true, type: "number", notes: "Attendance id." }],
        query: [F.viewer, F.page, F.pageSize], response: AUDIT_RESP }),
      api({ id: "emp-leaves", group: "Employees", name: "Integration leaves", method: "GET", path: "/api/v2/employees/integration/leaves", scope: "employees.read",
        desc: "Leave rows exposed for integration consumers.",
        query: [{ ...F.teams, req: false }, { ...F.emp, req: false }] }),

      api({ id: "int-hub", group: "Integration center", name: "Hub overview", method: "GET", path: "/api/v2/integrations/center/hub/overview", scope: "integrations.read",
        desc: "Integration hub snapshot for the team.",
        query: [F.team], response: CENTER_OBJ }),
      api({ id: "int-conn-list", group: "Integration center", name: "List connectors", method: "GET", path: "/api/v2/integrations/center/connectors", scope: "integrations.read",
        desc: "Connectors for the team.",
        query: [F.team, { name: "status", req: false, type: "string", notes: "Optional status filter." }] }),
      api({ id: "int-conn-get", group: "Integration center", name: "Get connector", method: "GET", path: "/api/v2/integrations/center/connectors/{connectorId}", scope: "integrations.read",
        desc: "Single connector.",
        path: [{ name: "connectorId", req: true, type: "string", notes: "Connector id." }], query: [F.team], response: CENTER_OBJ }),
      api({ id: "int-conn-create", group: "Integration center", name: "Create connector", method: "POST", path: "/api/v2/integrations/center/connectors", scope: "integrations.read",
        desc: "Create a connector. Center writes still require integrations.read on scoped keys.",
        query: [F.team],
        body: [F.name, { name: "kind", req: false, type: "string", notes: "Connector kind." }, { name: "status", req: false, type: "string", notes: "Initial status." }],
        sample: { name: "ERP connector", kind: "rest" }, response: CENTER_OBJ }),
      api({ id: "int-map-save", group: "Integration center", name: "Save field mapping", method: "POST", path: "/api/v2/integrations/center/mappings", scope: "integrations.read",
        desc: "Upsert a field mapping.",
        query: [F.team],
        body: [{ name: "connectorId", req: true, type: "string", notes: "Connector id." }, { name: "mappings", req: true, type: "array", notes: "Field map rows." }],
        sample: { connectorId: "erp-1", mappings: [] }, response: CENTER_OBJ }),
      api({ id: "int-jobs", group: "Integration center", name: "List sync jobs", method: "GET", path: "/api/v2/integrations/center/jobs", scope: "integrations.read",
        desc: "Sync jobs.",
        query: [F.team, { name: "connectorId", req: false, type: "string", notes: "Optional connector filter." }] }),
      api({ id: "int-retry", group: "Integration center", name: "Retry sync job", method: "POST", path: "/api/v2/integrations/center/jobs/{jobId}/retry", scope: "integrations.read",
        desc: "Retry a failed job.",
        path: [{ name: "jobId", req: true, type: "string", notes: "Job id." }], query: [F.team],
        body: [], sample: {}, response: FLAG_RESP }),
      api({ id: "int-maps", group: "Integration center", name: "List mappings", method: "GET", path: "/api/v2/integrations/center/mappings", scope: "integrations.read",
        desc: "Field mappings.",
        query: [F.team, { name: "connectorId", req: false, type: "string", notes: "Optional connector filter." }] }),
      api({ id: "int-logs", group: "Integration center", name: "List logs", method: "GET", path: "/api/v2/integrations/center/logs", scope: "integrations.read",
        desc: "Integration logs.",
        query: [F.team, { name: "connectorId", req: false, type: "string", notes: "Filter." }, { name: "level", req: false, type: "string", notes: "INFO / WARN / ERROR." }] }),
      api({ id: "int-health", group: "Integration center", name: "Sync health", method: "GET", path: "/api/v2/integrations/center/sync-health/overview", scope: "integrations.read",
        desc: "Sync health overview.",
        query: [F.team], response: CENTER_OBJ }),
      api({ id: "int-adp-list", group: "Integration center", name: "List adapters", method: "GET", path: "/api/v2/integrations/center/adapters", scope: "integrations.read",
        desc: "Adapters.",
        query: [F.team, { name: "transport", req: false, type: "string", notes: "Transport filter." }, { name: "kind", req: false, type: "string", notes: "Kind filter." }] }),
      api({ id: "int-adp-get", group: "Integration center", name: "Get adapter", method: "GET", path: "/api/v2/integrations/center/adapters/{adapterId}", scope: "integrations.read",
        desc: "Single adapter.",
        path: [{ name: "adapterId", req: true, type: "string", notes: "Adapter id." }], query: [F.team], response: CENTER_OBJ }),
      api({ id: "int-adp-test", group: "Integration center", name: "Test adapter", method: "POST", path: "/api/v2/integrations/center/adapters/{adapterId}/test", scope: "integrations.read",
        desc: "Test adapter connectivity.",
        path: [{ name: "adapterId", req: true, type: "string", notes: "Adapter id." }], query: [F.team], response: FLAG_RESP }),
      api({ id: "int-adp-sync", group: "Integration center", name: "Trigger adapter sync", method: "POST", path: "/api/v2/integrations/center/adapters/{adapterId}/sync", scope: "integrations.read",
        desc: "Kick a sync.",
        path: [{ name: "adapterId", req: true, type: "string", notes: "Adapter id." }], query: [F.team], response: FLAG_RESP }),
      api({ id: "int-recon", group: "Integration center", name: "Reconcile connector", method: "POST", path: "/api/v2/integrations/center/connectors/{connectorId}/reconcile", scope: "integrations.read",
        desc: "Reconcile connector records.",
        path: [{ name: "connectorId", req: true, type: "string", notes: "Connector id." }], query: [F.team], response: FLAG_RESP }),
      api({ id: "int-legacy", group: "Integration center", name: "List legacy connections", method: "GET", path: "/api/v2/integrations/center/connections", scope: "integrations.read",
        desc: "Legacy connection records.",
        query: [F.team] }),
      api({ id: "int-legacy-patch", group: "Integration center", name: "Update legacy connection", method: "PATCH", path: "/api/v2/integrations/center/connections/{legacyKey}", scope: "integrations.read",
        desc: "Patch a legacy connection.",
        path: [{ name: "legacyKey", req: true, type: "string", notes: "Legacy connection key." }], query: [F.team],
        body: [{ name: "enabled", req: false, type: "boolean", notes: "Enable flag." }],
        sample: { enabled: true }, response: FLAG_RESP }),
      api({ id: "int-jobs-all", group: "Integration center", name: "Combined jobs", method: "GET", path: "/api/v2/integrations/center/jobs/combined", scope: "integrations.read",
        desc: "Combined job list.",
        query: [F.team, { name: "connectorId", req: false, type: "string", notes: "Optional filter." }] })
    ];

    const store = {
      get(k, d) { try { return sessionStorage.getItem(k) || d; } catch (e) { return d; } },
      set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
    };

    function $(id) { return document.getElementById(id); }
    function creds() {
      return {
        base: $("f-base").value.replace(/\/$/, ""),
        secret: $("f-secret").value.trim(),
        team: $("f-team").value.trim() || "101",
        emp: $("f-emp").value.trim() || "12"
      };
    }
    function saveCreds() {
      const c = creds();
      store.set("intApiBase", c.base);
      store.set("intApiSecret", c.secret);
      store.set("intApiTeam", c.team);
      store.set("intApiEmp", c.emp);
    }
    function loadCreds() {
      $("f-base").value = store.get("intApiBase", "https://YOUR_TENANT.tracopus.com");
      $("f-secret").value = store.get("intApiSecret", "");
      $("f-team").value = store.get("intApiTeam", "101");
      $("f-emp").value = store.get("intApiEmp", "12");
    }
    function filteredApis() {
      const q = $("f-filter").value.trim().toLowerCase();
      if (!q) return APIS;
      return APIS.filter((a) =>
        (a.group + " " + a.name + " " + a.path + " " + a.method + " " + a.scope).toLowerCase().includes(q)
      );
    }
    function fillSelect() {
      const list = filteredApis();
      const sel = $("f-api");
      const keep = sel.value;
      sel.innerHTML = "";
      let last = "";
      list.forEach((a) => {
        if (a.group !== last) {
          const og = document.createElement("optgroup");
          og.label = a.group;
          sel.appendChild(og);
          last = a.group;
        }
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.method + "  " + a.name + "  ·  " + a.path;
        sel.lastChild.appendChild(opt);
      });
      $("api-count").textContent = list.length + " of " + APIS.length + " APIs";
      if (list.some((a) => a.id === keep)) sel.value = keep;
      else if (list[0]) sel.value = list[0].id;
      renderApi();
    }
    function currentApi() {
      return APIS.find((a) => a.id === $("f-api").value) || filteredApis()[0] || APIS[0];
    }
    function fieldTable(rows, kind) {
      if (!rows || !rows.length) {
        return "<p>None — this call has no " + kind + ".</p>";
      }
      const head = kind === "response"
        ? "<tr><th>Field</th><th>Type</th><th>Notes</th></tr>"
        : "<tr><th>Field</th><th></th><th>Type</th><th>Notes</th></tr>";
      const body = rows.map((r) => kind === "response"
        ? "<tr><td><code>" + r.name + "</code></td><td>" + r.type + "</td><td>" + r.notes + "</td></tr>"
        : "<tr><td><code>" + r.name + "</code></td><td class=\"" + (r.req ? "req" : "opt") + "\">" +
          (r.req ? "required" : "optional") + "</td><td>" + r.type + "</td><td>" + r.notes + "</td></tr>"
      ).join("");
      return "<table><thead>" + head + "</thead><tbody>" + body + "</tbody></table>";
    }
    function applyDefaults(fields) {
      const c = creds();
      const defaults = {
        userTeamId: c.team, userTeamIds: c.team, employeeId: c.emp, employeeIds: c.emp,
        createdBy: c.emp, viewerUserId: c.emp, projectId: "44102", purchaseOrderId: "9001",
        purchaseOrderNumber: "9001", taskId: "8801", taskActivityId: "9901",
        startDate: "2026-08-01T00:00:00", endDate: "2026-08-31T23:59:59",
        isDelete: "false", isArchive: "false", isActive: "true", isFavorite: "true",
        isOnlyUserTeams: "false", status: "NEW", savePrevious: "true", noteId: "1",
        attendanceId: "1", connectorId: "erp-1", adapterId: "adapter-1", jobId: "job-1",
        legacyKey: "legacy-erp", name: "ERP project"
      };
      const out = {};
      (fields || []).forEach((f) => {
        out[f.name] = defaults[f.name] != null ? defaults[f.name] : "";
      });
      return out;
    }
    function formFields(prefix, fields) {
      if (!fields.length) return "";
      const vals = applyDefaults(fields);
      return "<div class=\"form-grid\">" + fields.map((f) => {
        const wide = f.type === "array" || f.type === "object" || f.type === "string" && f.name === "note";
        return "<label class=\"" + (wide ? "span-2" : "") + "\">" + f.name +
          "<input data-field=\"" + prefix + "\" data-name=\"" + f.name + "\" data-type=\"" + f.type + "\" value=\"" +
          String(vals[f.name]).replace(/\"/g, "&quot;") + "\" /></label>";
      }).join("") + "</div>";
    }
    function collect(prefix) {
      const out = {};
      document.querySelectorAll("input[data-field=\"" + prefix + "\"]").forEach((el) => {
        let v = el.value;
        const t = el.getAttribute("data-type");
        if (t === "number" && v !== "") v = Number(v);
        else if (t === "boolean") v = v === true || v === "true" || v === "1";
        else if ((t === "number[]") && v !== "") v = String(v).split(",").map((s) => Number(s.trim()));
        out[el.getAttribute("data-name")] = v;
      });
      return out;
    }
    function interpolate(path, pathVals) {
      return path.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(pathVals[k] != null ? pathVals[k] : k));
    }
    function queryString(queryVals, fields) {
      const parts = [];
      (fields || []).forEach((f) => {
        const v = queryVals[f.name];
        if (v === "" || v == null) return;
        if (Array.isArray(v)) v.forEach((item) => parts.push(encodeURIComponent(f.name) + "=" + encodeURIComponent(item)));
        else parts.push(encodeURIComponent(f.name) + "=" + encodeURIComponent(v));
      });
      return parts.length ? "?" + parts.join("&") : "";
    }
    function buildUrl(a) {
      const c = creds();
      const pathVals = collect("path");
      const queryVals = collect("query");
      return c.base + interpolate(a.path, pathVals) + queryString(queryVals, a.query);
    }
    function buildBody(a) {
      if (a.method === "GET" || a.method === "DELETE" && !a.body.length) return null;
      if ($("f-body")) {
        try { return JSON.parse($("f-body").value || "null"); } catch (e) { return a.sample || collect("body"); }
      }
      return a.sample || collect("body");
    }
    function buildCurl(a) {
      const c = creds();
      const url = buildUrl(a);
      const body = (a.method !== "GET" && (a.body.length || a.sample)) ? buildBody(a) : null;
      let cmd = "curl -sS -X " + a.method + " \"" + url + "\" \\\n  -H \"Authorization: Bearer " + (c.secret || "tk_live_YOUR_SECRET") + "\"";
      if (body != null) {
        cmd += " \\\n  -H \"Content-Type: application/json\" \\\n  -d '" + JSON.stringify(body, null, 2) + "'";
      }
      return cmd;
    }
    function renderApi() {
      const a = currentApi();
      if (!a) return;
      $("api-group").textContent = a.group;
      $("api-title").textContent = a.name;
      $("api-desc").textContent = a.desc;
      $("api-meta").innerHTML =
        "<span class=\"chip m-" + a.method + "\">" + a.method + "</span>" +
        "<span class=\"chip\">" + a.path + "</span>" +
        "<span class=\"chip\">" + a.scope + "</span>";
      $("tab-request").innerHTML =
        "<p>Headers: <code>Authorization: Bearer {secret}</code>" +
        (a.method !== "GET" ? " · <code>Content-Type: application/json</code>" : "") + "</p>" +
        "<h2>Path attributes</h2>" + fieldTable(a.path, "req") +
        "<h2 style=\"margin-top:0.8rem\">Query attributes</h2>" + fieldTable(a.query, "req") +
        "<h2 style=\"margin-top:0.8rem\">Request body</h2>" + fieldTable(a.body, "req");
      $("tab-response").innerHTML =
        "<p>HTTP 200 envelope: <code>{ \"payload\": … }</code></p>" +
        fieldTable(a.response, "response") +
        "<div class=\"codehead\"><span>Example payload</span></div>" +
        "<pre>" + JSON.stringify({ payload: a.sample || { id: 1, status: "ok" } }, null, 2) + "</pre>";
      $("tab-errors").innerHTML =
        "<table><thead><tr><th>Status</th><th>Meaning</th></tr></thead><tbody>" +
        a.errors.map((e) => "<tr><td class=\"" + e.kind + "\">" + e.status + "</td><td>" + e.meaning + "</td></tr>").join("") +
        "</tbody></table>" +
        "<div class=\"callout warnbox\">Integration keys calling <code>/api/v2/developer-portal/*</code> are always denied.</div>";
      const hasBody = a.method !== "GET" && (a.body.length || a.sample);
      $("tab-try").innerHTML =
        (a.path.length ? "<h2>Path values</h2>" + formFields("path", a.path) : "") +
        (a.query.length ? "<h2 style=\"margin-top:0.7rem\">Query values</h2>" + formFields("query", a.query) : "") +
        (hasBody ? "<h2 style=\"margin-top:0.7rem\">JSON body</h2><textarea id=\"f-body\">" +
          JSON.stringify(a.sample || applyDefaults(a.body), null, 2) + "</textarea>" : "") +
        "<div class=\"codehead\"><span>Generated curl</span><span>" +
        "<button class=\"btn btn-ghost\" type=\"button\" id=\"btn-gen\">Generate</button>" +
        "<button class=\"btn btn-ghost\" type=\"button\" id=\"btn-copy\">Copy</button>" +
        "<button class=\"btn btn-primary\" type=\"button\" id=\"btn-send\">Send live</button></span></div>" +
        "<pre id=\"curl-out\"></pre>" +
        "<div class=\"codehead\"><span>Live response</span><span class=\"status\" id=\"live-status\"></span></div>" +
        "<pre id=\"live-out\">Send uses this browser. If CORS blocks the host, copy curl instead.</pre>";
      const gen = () => { $("curl-out").textContent = buildCurl(a); };
      $("btn-gen").onclick = gen;
      $("btn-copy").onclick = async () => {
        gen();
        await navigator.clipboard.writeText($("curl-out").textContent);
        $("btn-copy").textContent = "Copied";
        setTimeout(() => { $("btn-copy").textContent = "Copy"; }, 1200);
      };
      $("btn-send").onclick = () => sendLive(a);
      gen();
      history.replaceState(null, "", "#api=" + a.id);
    }
    async function sendLive(a) {
      const c = creds();
      const status = $("live-status");
      const out = $("live-out");
      if (!c.secret) {
        status.textContent = "Missing token";
        out.textContent = "Paste the secretOnce value from Integrations → API access.";
        return;
      }
      status.textContent = "Sending…";
      const headers = { Authorization: "Bearer " + c.secret };
      const init = { method: a.method, headers: headers };
      if (a.method !== "GET" && (a.body.length || a.sample)) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(buildBody(a));
      }
      try {
        const res = await fetch(buildUrl(a), init);
        const text = await res.text();
        status.innerHTML = "<span class=\"" + (res.ok ? "ok" : "bad") + "\">" + res.status + " " + res.statusText + "</span>";
        try { out.textContent = JSON.stringify(JSON.parse(text), null, 2); }
        catch (e) { out.textContent = text || "(empty body)"; }
      } catch (err) {
        status.innerHTML = "<span class=\"bad\">Network / CORS</span>";
        out.textContent = String(err) + "\n\nOpen this page from the same Tracopus host, or run the generated curl.";
      }
    }

    $("f-filter").addEventListener("input", fillSelect);
    $("f-api").addEventListener("change", renderApi);
    $("btn-save").addEventListener("click", () => {
      saveCreds();
      $("btn-save").textContent = "Saved";
      setTimeout(() => { $("btn-save").textContent = "Remember session"; }, 1200);
    });
    ["f-base", "f-secret", "f-team", "f-emp"].forEach((id) => {
      $(id).addEventListener("change", saveCreds);
    });
    document.getElementById("tabs").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-tab]");
      if (!btn) return;
      document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("is-on", b === btn));
      ["request", "response", "errors", "try"].forEach((t) => {
        $("tab-" + t).classList.toggle("hidden", t !== btn.getAttribute("data-tab"));
      });
    });
    loadCreds();
    fillSelect();
    const hash = (location.hash || "").replace("#api=", "");
    if (hash && APIS.some((a) => a.id === hash)) {
      $("f-api").value = hash;
      renderApi();
    }
