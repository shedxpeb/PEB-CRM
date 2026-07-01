# TASK MODULE UX BLUEPRINT
## PEB CRM - Enterprise Task Management System

**Blueprint Date:** June 30, 2026  
**Phase:** 3 - UX Blueprint & Screen Design  
**Scope:** UX Design Only (No Implementation)  
**Status:** UX Frozen - Ready for Implementation

---

## EXECUTIVE SUMMARY

This document defines the complete UX blueprint for the PEB CRM Task Module. It freezes all screen designs, interaction patterns, and component specifications before any implementation begins. This blueprint serves as the single source of truth for UI/UX implementation in Phase 3.

**Design Philosophy:**
- Construction-first: Optimized for PEB workflow
- Employee-first: Field worker friendly
- Admin visibility: Management oversight
- Simple to learn: Intuitive for construction teams
- Fast to use: Minimal clicks
- Professional enterprise: Matches PEB CRM standards

---

## 1. SCREEN INVENTORY

### 1.1 Screen List

**Primary Screens:**
1. Task Dashboard
2. My Tasks
3. Team Tasks
4. Project Tasks
5. Task Detail
6. Create Task
7. Edit Task
8. Verification Queue

**Secondary Screens:**
9. Notification Center
10. Activity Timeline
11. Comments Panel
12. Image Gallery
13. Time Log

**Modal Screens:**
14. Quick Task Create
15. Task Actions Menu
16. Bulk Actions
17. Filter Panel

---

## 2. SCREEN DESIGNS

### 2.1 Task Dashboard

**Purpose:** High-level overview of all tasks across the organization

**User:** Manager, Admin, Super Admin

**Entry Point:** 
- Main navigation → Tasks
- Direct URL: /tasks/dashboard
- Breadcrumb: Home → Tasks → Dashboard

**Exit Point:**
- Click on task → Navigate to Task Detail
- Click on "My Tasks" → Navigate to My Tasks
- Click on "Team Tasks" → Navigate to Team Tasks
- Click on "Project Tasks" → Navigate to Project Tasks

**Header:**
- Left: Page title "Task Dashboard"
- Right: Quick actions (Add Task, Refresh)
- Breadcrumb: Home → Tasks → Dashboard

**Actions:**
- Add Task (primary button)
- Refresh (icon button)
- Export (dropdown)
- Settings (icon button)

**Sections:**

**Section 1: Quick KPIs (Top)**
- 4 KPI cards in horizontal row
- Card 1: Open Tasks (number, trend indicator)
- Card 2: Overdue Tasks (number, trend indicator)
- Card 3: Completed Today (number, trend indicator)
- Card 4: Pending Verification (number, trend indicator)
- Each card: Icon, label, value, trend (up/down arrow), click to filter

**Section 2: My Tasks Summary**
- Card with "My Tasks" title
- List of top 5 tasks assigned to current user
- Each task: Title, status badge, priority badge, due date
- "View All My Tasks" link at bottom
- Click on task → Navigate to Task Detail
- Click on "View All" → Navigate to My Tasks

**Section 3: Team Performance**
- Card with "Team Performance" title
- Table showing team member performance
- Columns: Employee Name, Tasks Assigned, Tasks Completed, Completion Rate, Performance Score
- Sortable by any column
- Click on employee → Navigate to employee performance detail
- Performance score color-coded (green > 90, yellow > 75, red < 75)

**Section 4: Recent Activity**
- Card with "Recent Activity" title
- Timeline of recent task activities
- Each activity: Icon, description, user, timestamp
- Show last 10 activities
- Click on activity → Navigate to related task
- "View All Activity" link at bottom

**Section 5: Critical Tasks**
- Card with "Critical Tasks" title
- List of critical priority tasks
- Each task: Title, assignee, due date, time remaining
- Overdue tasks highlighted in red
- Click on task → Navigate to Task Detail

**Cards:**
- KPI Card: Icon, label, value, trend, clickable
- Task Summary Card: Title, task list, view all link
- Performance Card: Title, performance table
- Activity Card: Title, activity timeline
- Critical Tasks Card: Title, critical task list

**Tables:**
- Team Performance Table: Employee, Assigned, Completed, Rate, Score

**Sidebar:**
- Not applicable (dashboard is full-width)

**Filters:**
- Date range filter (top right)
- Team filter (dropdown)
- Status filter (dropdown)

**Search:**
- Global search bar (top right)
- Search across tasks, projects, employees
- Real-time search results dropdown

**Empty State:**
- No tasks: "No tasks found. Create your first task to get started."
- Illustration: Empty task illustration
- Action button: "Create Task"

**Loading State:**
- Skeleton loading for KPI cards
- Skeleton loading for task lists
- Skeleton loading for tables
- Shimmer effect

**Error State:**
- Error message: "Failed to load dashboard data"
- Retry button
- Contact support link

**Permission Visibility:**
- Employee: Can see own tasks only (My Tasks section only)
- Manager: Can see team tasks (Team Performance section)
- Admin: Can see all tasks (all sections)
- Super Admin: Can see all tasks (all sections)

---

### 2.2 My Tasks

**Purpose:** View and manage tasks assigned to current user

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Main navigation → Tasks → My Tasks
- Direct URL: /tasks/my-tasks
- Breadcrumb: Home → Tasks → My Tasks

**Exit Point:**
- Click on task → Navigate to Task Detail
- Click on "Team Tasks" → Navigate to Team Tasks
- Click on "Dashboard" → Navigate to Task Dashboard

**Header:**
- Left: Page title "My Tasks"
- Right: View switcher (List, Kanban, Calendar)
- Breadcrumb: Home → Tasks → My Tasks

**Actions:**
- Add Task (primary button)
- Quick Add (dropdown: from template, from project)
- View switcher (List/Kanban/Calendar buttons)
- Filter (icon button)
- Sort (dropdown)

**Sections:**

**Section 1: Quick Filters (Top)**
- Horizontal filter bar
- Filter chips: All, Pending, In Progress, Review, Overdue
- Active filter highlighted
- Click on filter → Apply filter
- "Clear Filters" button

**Section 2: Search and Sort (Below Filters)**
- Search bar (left)
- Sort dropdown (right): Due Date, Priority, Created Date
- Saved views dropdown (right)
  - Personal Views (user's own saved views)
  - Team Views (shared with team)
  - Default View (system default)
  - Public Views (shared across workspace)
  - Pin Favorite View (star icon to pin favorite view)

**Section 3: Task List (Main Content)**
- Table view (default)
- Columns: Checkbox, Task ID, Title, Status, Priority, Due Date, Project, Actions
- Sortable columns (click on header)
- Row hover effect
- Checkbox for bulk selection
- Click on row → Navigate to Task Detail
- Actions menu (three dots): Edit, Delete, Complete, Verify (if manager)

**Section 4: Pagination (Bottom)**
- Page size selector (10, 25, 50, 100)
- Page navigation (Previous, Page numbers, Next)
- Total count display

**Cards:**
- Not applicable (table view)

**Tables:**
- Task Table: Checkbox, ID, Title, Status, Priority, Due Date, Project, Actions

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Quick filter chips (All, Pending, In Progress, Review, Overdue)
- Advanced filter panel (slide-in from right)
  - Status multi-select
  - Priority multi-select
  - Due date range
  - Project multi-select
  - Site location multi-select

**Search:**
- Search bar in header
- Real-time filtering
- Search by title, ID, project name

**Empty State:**
- No tasks: "You have no tasks assigned. Great job!"
- Illustration: Celebration illustration
- Action button: "View All Tasks"

**Loading State:**
- Skeleton loading for table rows
- Shimmer effect

**Error State:**
- Error message: "Failed to load your tasks"
- Retry button

**Permission Visibility:**
- Employee: Can see own tasks only
- Manager: Can see own tasks only (use Team Tasks for team view)
- Admin: Can see own tasks only (use Team Tasks for team view)
- Super Admin: Can see own tasks only (use Team Tasks for team view)

---

### 2.3 Team Tasks

**Purpose:** View and manage tasks for entire team

**User:** Manager, Admin, Super Admin

**Entry Point:**
- Main navigation → Tasks → Team Tasks
- Direct URL: /tasks/team-tasks
- Breadcrumb: Home → Tasks → Team Tasks

**Exit Point:**
- Click on task → Navigate to Task Detail
- Click on "My Tasks" → Navigate to My Tasks
- Click on "Dashboard" → Navigate to Task Dashboard

**Header:**
- Left: Page title "Team Tasks"
- Right: View switcher (List, Kanban, Calendar)
- Team selector (dropdown)
- Breadcrumb: Home → Tasks → Team Tasks

**Actions:**
- Add Task (primary button)
- Quick Add (dropdown)
- View switcher (List/Kanban/Calendar buttons)
- Filter (icon button)
- Sort (dropdown)
- Team selector (dropdown)

**Sections:**

**Section 1: Team Selector (Top)**
- Dropdown to select team
- Options: All Teams, Team A, Team B, etc.
- Default: All Teams
- Change team → Refresh task list

**Section 2: Quick Filters (Below Team Selector)**
- Horizontal filter bar
- Filter chips: All, Pending, In Progress, Review, Overdue, Verified
- Active filter highlighted
- Assignee filter (dropdown: All, specific employees)
- "Clear Filters" button

**Section 3: Task Statistics (Below Filters)**
- Horizontal stat bar
- Stats: Total, Pending, In Progress, Review, Verified, Overdue
- Click on stat → Filter by that status

**Section 4: Task List (Main Content)**
- Table view (default)
- Columns: Checkbox, Task ID, Title, Assignee, Status, Priority, Due Date, Project, Actions
- Sortable columns
- Row hover effect
- Checkbox for bulk selection
- Click on row → Navigate to Task Detail
- Actions menu: Edit, Delete, Reassign, Complete, Verify

**Section 5: Bulk Actions (Bottom, visible when rows selected)**
- Bulk action bar appears above table
- Actions: Change Status, Change Priority, Reassign, Delete, Export
- "Clear Selection" button

**Section 6: Pagination (Bottom)**
- Page size selector
- Page navigation
- Total count display

**Cards:**
- Not applicable (table view)

**Tables:**
- Task Table: Checkbox, ID, Title, Assignee, Status, Priority, Due Date, Project, Actions

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Quick filter chips
- Assignee filter
- Advanced filter panel (slide-in)
  - Status multi-select
  - Priority multi-select
  - Assignee multi-select
  - Due date range
  - Project multi-select
  - Site location multi-select

**Search:**
- Search bar in header
- Real-time filtering
- Search by title, ID, assignee name, project name

**Empty State:**
- No tasks: "No tasks found for this team."
- Illustration: Empty team illustration
- Action button: "Create Task for Team"

**Loading State:**
- Skeleton loading for table rows
- Shimmer effect

**Error State:**
- Error message: "Failed to load team tasks"
- Retry button

**Permission Visibility:**
- Employee: Cannot access (redirect to My Tasks)
- Manager: Can see team tasks only
- Admin: Can see all workspace tasks
- Super Admin: Can see all system tasks

---

### 2.4 Project Tasks

**Purpose:** View and manage tasks for a specific project

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- From Project detail page → Tasks tab
- Direct URL: /tasks/project/:projectId
- Breadcrumb: Home → Projects → [Project Name] → Tasks

**Exit Point:**
- Click on task → Navigate to Task Detail
- Click on "Back to Project" → Navigate to Project Detail
- Click on "All Tasks" → Navigate to Team Tasks

**Header:**
- Left: Page title "[Project Name] Tasks"
- Right: View switcher (List, Kanban, Calendar, Timeline)
- Project info badge (project status, phase)
- Breadcrumb: Home → Projects → [Project Name] → Tasks

**Actions:**
- Add Task (primary button)
- Quick Add (dropdown: from template)
- View switcher (List/Kanban/Calendar/Timeline buttons)
- Filter (icon button)
- Sort (dropdown)
- Back to Project (button)

**Sections:**

**Section 1: Project Info (Top)**
- Project card with key info
- Fields: Project Name, Status, Phase, Start Date, End Date, Progress
- Progress bar
- Site location (if applicable)

**Section 2: Task Statistics (Below Project Info)**
- Horizontal stat bar
- Stats: Total, Pending, In Progress, Review, Verified, Overdue
- Grouped by phase (if project has phases)
- Click on stat → Filter by that status

**Section 3: Phase Filter (If Applicable)**
- Horizontal phase filter
- Filter chips: All Phases, Design, Fabrication, Site Prep, Erection, Finishing
- Active phase highlighted
- Click on phase → Filter by phase

**Section 4: Task List (Main Content)**
- Table view (default)
- Columns: Checkbox, Task ID, Title, Phase, Assignee, Status, Priority, Due Date, Actions
- Sortable columns
- Row hover effect
- Checkbox for bulk selection
- Click on row → Navigate to Task Detail
- Actions menu: Edit, Delete, Reassign, Complete, Verify

**Section 5: Timeline View (Alternative View)**
- Gantt-style timeline
- Tasks displayed as bars on timeline
- Task duration shown
- Dependencies shown as arrows
- Drag to reschedule (future feature)
- Click on task → Navigate to Task Detail

**Section 6: Bulk Actions (Bottom, visible when rows selected)**
- Bulk action bar
- Actions: Change Status, Change Priority, Reassign, Change Phase, Delete, Export

**Section 7: Pagination (Bottom)**
- Page size selector
- Page navigation
- Total count display

**Cards:**
- Project Info Card: Project details, progress bar

**Tables:**
- Task Table: Checkbox, ID, Title, Phase, Assignee, Status, Priority, Due Date, Actions

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Phase filter chips
- Status filter chips
- Assignee filter (dropdown)
- Advanced filter panel (slide-in)
  - Status multi-select
  - Priority multi-select
  - Assignee multi-select
  - Phase multi-select
  - Due date range

**Search:**
- Search bar in header
- Real-time filtering
- Search by title, ID, assignee name

**Empty State:**
- No tasks: "No tasks for this project yet."
- Illustration: Empty project illustration
- Action button: "Create First Task"

**Loading State:**
- Skeleton loading for table rows
- Skeleton loading for project info
- Shimmer effect

**Error State:**
- Error message: "Failed to load project tasks"
- Retry button

**Permission Visibility:**
- Employee: Can see tasks for projects they're assigned to
- Manager: Can see tasks for projects in their team
- Admin: Can see tasks for all projects in workspace
- Super Admin: Can see tasks for all projects in system

---

### 2.5 Task Detail

**Purpose:** View and manage all details of a single task

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click on task from any list
- Direct URL: /tasks/:taskId
- Breadcrumb: Home → Tasks → [Task Type] → [Task Title]

**Exit Point:**
- Click on "Back" → Navigate to previous screen
- Click on breadcrumb → Navigate to parent screen
- Click on related task → Navigate to related task detail

**Header:**
- Left: Task ID, Task Title (editable)
- Right: Status dropdown, Priority dropdown, Actions menu
- Breadcrumb: Home → Tasks → [Task Type] → [Task Title]
- Status badge (current status with color)
- Priority badge (current priority with color)
- Overdue indicator (if overdue)

**Actions:**
- Edit (icon button)
- Archive (icon button, replaces Delete)
- Restore (icon button, if archived)
- Follow/Unfollow (icon button)
- Share (icon button)
- Print (icon button)
- More actions (dropdown):
  - Duplicate Task
  - Duplicate with Checklist
  - Duplicate with Images
  - Duplicate Entire Template
  - Archive (if not archived)
  - Restore (if archived)
  - Permanent Delete (Super Admin only)
  - Report Issue

**Sections:**

**Section 1: Overview Bar (Below Header)**
- Horizontal info bar
- Fields: Task Type, Linked Module, Linked Record (clickable), Site Location (if applicable), Assignee (avatar + name), Due Date (date), Created Date (date)
- Progress bar (percentage)
- Incentive value (if visible to user role)
- Due warning indicator (auto-calculated):
  - "Due Today" (blue badge)
  - "Due Tomorrow" (yellow badge)
  - "Overdue 2 Days" (red badge)
  - "Due in 5 Hours" (orange badge)
- Offline indicator (for field employees):
  - "Offline Draft" (gray badge)
  - "Pending Sync" (yellow badge)
  - "Synced" (green badge)
- Audit information:
  - Created By (user link)
  - Updated By (user link)
  - Last Opened (timestamp)
  - Last Modified (timestamp)
  - Version (number)

**Section 2: Main Content Area (Two-Column Layout)**

**Left Column (70% width):**

**Section 2.1: Description**
- Rich text editor
- Show current description
- Edit button (if permission)
- Last updated info

**Section 2.2: Checklist**
- Checklist items list
- Each item: Checkbox, text, completed by (if completed), completed at (if completed)
- Add item button
- Edit item button (hover)
- Delete item button (hover)
- Progress indicator (X of Y complete)
- Drag to reorder (future feature)

**Section 2.3: Before Images**
- Image gallery grid
- Thumbnail view
- Click to expand
- Upload button (if permission)
- Delete button (if permission)
- Image count indicator

**Section 2.4: Progress Images**
- Image gallery grid
- Grouped by progress stage
- Timeline view option
- Upload button (if permission)
- Delete button (if permission)
- Image count indicator

**Section 2.5: After Images**
- Image gallery grid
- Thumbnail view
- Click to expand
- Upload button (if permission)
- Delete button (if permission)
- Image count indicator
- Compare with before images button

**Section 2.6: Attachments**
- File list
- Each file: Icon, filename, size, uploaded by, uploaded at, download button, delete button (if permission)
- Upload button (if permission)
- File count indicator

**Section 2.7: Comments**
- Comments thread
- Each comment: Avatar, author name, timestamp, content, edit button (own comment), delete button (own comment or manager), reply button
- Add comment box (textarea + submit button)
- @mention support
- Rich text formatting
- Reply threading
- Followers section (above comments)
  - Followers list (avatars + names)
  - "Follow" button (to follow task)
  - "Unfollow" button (if following)
  - "Notify Followers" checkbox (when adding comment)
  - @mention followers in comments
  - Follower count badge

**Right Column (30% width):**

**Section 2.8: Activity Timeline**
- Timeline of activities
- Each activity: Icon, description, user, timestamp
- Grouped by date
- Show last 20 activities
- "View All Activity" link

**Section 2.9: Time Log**
- Time entries list
- Each entry: Duration, activity type, logged by, date
- Total time summary
- Add time entry button (if permission)
- Start timer button (if permission)

**Section 2.10: Verification**
- Verification status card
- Status: Pending/Verified/Rejected
- Verified by (if verified)
- Verified at (if verified)
- Verification notes (if verified)
- Rejection reason (if rejected)
- Verify button (if manager and task in Review status)
- Reject button (if manager and task in Review status)

**Section 2.11: Dependencies**
- Dependencies section
- Depends On (list of tasks this task depends on)
- Blocked By (list of tasks blocking this task)
- Blocking (list of tasks this task is blocking)
- Waiting For (list of tasks this task is waiting for)
- Add dependency button
- Remove dependency button
- Dependency status indicator (blocked, unblocked)
- Click on dependency → Navigate to related task
- Visual dependency graph (future feature)

**Section 2.12: Related Tasks**
- Related tasks list
- Each task: Related task title, relationship type
- Add related task button
- Navigate to related task

**Section 2.13: History**
- Change history
- Each change: Field changed, old value, new value, changed by, changed at
- "View Full History" link

**Section 3: Action Bar (Bottom)**
- Sticky action bar at bottom
- Actions based on current status and user permissions
- Common actions: Start Work, Complete Task, Submit for Review, Accept Task

**Cards:**
- Overview Card: Task overview info
- Verification Card: Verification status and actions
- Dependencies Card: Dependencies list and status
- Related Tasks Card: Related tasks list
- History Card: Change history summary

**Tables:**
- Not applicable (card-based layout)

**Sidebar:**
- Not applicable (two-column layout)

**Filters:**
- Not applicable (single task view)

**Search:**
- Not applicable (single task view)

**Empty State:**
- Not applicable (task always exists)

**Loading State:**
- Skeleton loading for all sections
- Shimmer effect

**Error State:**
- Error message: "Failed to load task details"
- Retry button
- "Back to Task List" button

**Permission Visibility:**
- Employee: Can view own tasks, can edit own tasks (some fields), cannot see incentive value
- Manager: Can view team tasks, can edit team tasks, can see team incentive values, can verify tasks
- Admin: Can view all tasks, can edit all tasks, can see all incentive values, can verify all tasks
- Super Admin: Can view all tasks, can edit all tasks, can see all incentive values, can verify all tasks

---

### 2.6 Create Task

**Purpose:** Create a new task

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click "Add Task" button from any task list
- Direct URL: /tasks/create
- Quick add dropdown → Create Task
- Breadcrumb: Home → Tasks → Create Task

**Exit Point:**
- Click "Cancel" → Close dialog, return to previous screen
- Click "Create" → Create task, navigate to task detail
- Click outside dialog → Close dialog, return to previous screen

**Header:**
- Left: Dialog title "Create New Task"
- Right: Close button (X)
- Breadcrumb: Not applicable (modal dialog)

**Actions:**
- Cancel (button)
- Create (primary button)
- Save as Draft (secondary button, future feature)

**Sections:**

**Section 1: Basic Information**
- Task Title (text input, required)
- Task Type (dropdown, required)
- Description (rich text editor, required)
- Character count for description

**Section 2: Assignment**
- Assignee (dropdown, required)
- Due Date (date picker, required)
- Priority (dropdown, optional, defaults to Medium)
- Estimated Hours (number input, optional)

**Section 3: Linked Record**
- Linked Module (dropdown, required for most task types)
- Linked Record (dropdown, required, populated based on module)
- Site Location (dropdown, required for Site Task, Project Task, Installation Task)
- Phase/Stage (dropdown, optional)

**Section 4: Checklist**
- Checklist items (dynamic list)
- Add item button
- Each item: Text input, delete button
- Reorder button (future feature)
- "Add Checklist Item" button

**Section 5: Before Images**
- Image upload area
- Drag and drop zone
- "Upload Images" button
- Image preview thumbnails
- Remove image button
- Image count indicator
- Required for Project Task, Installation Task

**Section 6: Attachments**
- File upload area
- Drag and drop zone
- "Upload Files" button
- File list with remove buttons
- File count indicator

**Section 7: Incentive Value**
- Incentive Value (number input, optional)
- Visible to managers and above only
- Defaults to 0
- Max value based on role permissions

**Section 8: Recurrence (Placeholder)**
- Recurrence dropdown (disabled for current phase)
- Options: None, Daily, Weekly, Monthly
- Disabled state with tooltip: "Recurring tasks coming in Phase 4"
- Grayed out UI to indicate future feature

**Section 9: Templates (Optional)**
- Task Templates dropdown
- Template options:
  - Installation Template
  - Inspection Template
  - Fabrication Template
  - Painting Template
  - Quality Check Template
  - Dispatch Template
  - Site Visit Template
  - Maintenance Template
- Select template → Pre-fill form with template values
- "Use Template" button
- "Clear Template" button

**Section 10: Review**
- Task summary card
- Show all entered values
- Validation errors highlighted
- "Back to Edit" button
- "Create Task" button

**Cards:**
- Task Summary Card: Review all entered values before creation

**Tables:**
- Not applicable (form-based)

**Sidebar:**
- Not applicable (modal dialog)

**Filters:**
- Not applicable (form-based)

**Search:**
- Not applicable (form-based)

**Empty State:**
- Not applicable (form always shows fields)

**Loading State:**
- Not applicable (form is static)
- Loading spinner on "Create" button during submission

**Error State:**
- Validation errors shown inline
- Field-level error messages
- General error message at top
- "Retry" button on submission error

**Permission Visibility:**
- Employee: Can create tasks for self only, cannot set incentive value
- Manager: Can create tasks for team members, can set incentive value within limits
- Admin: Can create tasks for anyone in workspace, can set any incentive value
- Super Admin: Can create tasks for anyone in system, can set any incentive value

---

### 2.7 Edit Task

**Purpose:** Edit an existing task

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click "Edit" button from task detail
- Click "Edit" from actions menu in task list
- Direct URL: /tasks/:taskId/edit
- Breadcrumb: Home → Tasks → [Task Title] → Edit

**Exit Point:**
- Click "Cancel" → Close dialog, return to task detail
- Click "Save" → Save changes, close dialog, return to task detail
- Click outside dialog → Close dialog, return to task detail

**Header:**
- Left: Dialog title "Edit Task"
- Right: Close button (X)
- Task ID display

**Actions:**
- Cancel (button)
- Save (primary button)
- Save and Continue (secondary button, future feature)

**Sections:**

**Section 1: Basic Information**
- Task Title (text input, editable)
- Task Type (dropdown, editable if permission)
- Description (rich text editor, editable)
- Character count for description

**Section 2: Assignment**
- Assignee (dropdown, editable if permission)
- Due Date (date picker, editable if permission)
- Priority (dropdown, editable if permission)
- Estimated Hours (number input, editable)

**Section 3: Linked Record**
- Linked Module (dropdown, editable if permission)
- Linked Record (dropdown, editable if permission)
- Site Location (dropdown, editable)
- Phase/Stage (dropdown, editable)

**Section 4: Checklist**
- Checklist items (editable list)
- Add item button
- Each item: Text input (editable), delete button, checkbox (mark complete)
- Reorder button (future feature)

**Section 5: Before Images**
- Existing before images gallery
- Upload additional images button
- Remove image button (if permission)
- Image count indicator

**Section 6: Attachments**
- Existing attachments list
- Upload additional files button
- Remove attachment button (if permission)
- File count indicator

**Section 7: Incentive Value**
- Incentive Value (number input, editable if permission)
- Visible to managers and above only

**Section 8: Status Change**
- Current status display
- Change status dropdown (if permission allows)
- Status transition notes (textarea, required for some transitions)

**Cards:**
- Not applicable (form-based)

**Tables:**
- Not applicable (form-based)

**Sidebar:**
- Not applicable (modal dialog)

**Filters:**
- Not applicable (form-based)

**Search:**
- Not applicable (form-based)

**Empty State:**
- Not applicable (editing existing task)

**Loading State:**
- Skeleton loading for form fields
- Loading spinner on "Save" button during submission

**Error State:**
- Validation errors shown inline
- Field-level error messages
- General error message at top
- "Retry" button on submission error

**Permission Visibility:**
- Employee: Can edit own tasks (title, description, due date), cannot change assignee, priority, status
- Manager: Can edit team tasks (all fields except incentive value limits)
- Admin: Can edit all tasks in workspace (all fields)
- Super Admin: Can edit all tasks in system (all fields)

---

### 2.8 Verification Queue

**Purpose:** View and verify tasks pending verification

**User:** Manager, Admin, Super Admin

**Entry Point:**
- Main navigation → Tasks → Verification Queue
- Direct URL: /tasks/verification
- Breadcrumb: Home → Tasks → Verification Queue

**Exit Point:**
- Click on task → Navigate to Task Detail
- Click on "Tasks" → Navigate to Team Tasks
- Click on "Dashboard" → Navigate to Task Dashboard

**Header:**
- Left: Page title "Verification Queue"
- Right: Filter, Sort, Refresh
- Verification count badge (number of pending verifications)
- Breadcrumb: Home → Tasks → Verification Queue

**Actions:**
- Bulk Verify (primary button, when tasks selected)
- Bulk Reject (secondary button, when tasks selected)
- Filter (icon button)
- Sort (dropdown)
- Refresh (icon button)

**Sections:**

**Section 1: Quick Filters (Top)**
- Horizontal filter bar
- Filter chips: All, Critical, High, Medium, Low
- Priority filter highlighted
- "Clear Filters" button

**Section 2: Verification Statistics (Below Filters)**
- Horizontal stat bar
- Stats: Pending, Verified Today, Rejected Today, Total Verified This Week
- Click on stat → Filter by that status

**Section 3: Task List (Main Content)**
- Table view
- Columns: Checkbox, Task ID, Title, Assignee, Priority, Due Date, Project, Submitted At, Actions
- Sortable columns
- Row hover effect
- Checkbox for bulk selection
- Click on row → Navigate to Task Detail
- Actions menu: Quick Verify, Quick RejectView

**Section 4: Bulk Actions (Bottom, visible when rows selected)**
- Bulk action bar
- Actions: Verify, Reject, Assign to Me

**Section 5: Pagination (Bottom)**
- Page size selector
- Page navigation
- Total count display

**Cards:**
- Not applicable (table view)

**Tables:**
- Verification Table: Checkbox, ID, Title, Assignee, Priority, Due Date, Project, Submitted At, Actions

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Priority filter chips
- Assignee filter (dropdown)
- Project filter (dropdown)
- Advanced filter panel (slide-in)
  - Priority multi-select
  - Assignee multi-select
  - Project multi-select
  - Submitted date range

**Search:**
- Search bar in header
- Real-time filtering
- Search by title, ID, assignee name, project name

**Empty State:**
- No tasks: "No tasks pending verification. All caught up!"
- Illustration: Celebration illustration
- Action button: "View All Tasks"

**Loading State:**
- Skeleton loading for table rows
- Shimmer effect

**Error State:**
- Error message: "Failed to load verification queue"
- Retry button

**Permission Visibility:**
- Employee: Cannot access (redirect to My Tasks)
- Manager: Can verify team tasks only
- Admin: Can verify workspace tasks only
- Super Admin: Can verify all system tasks

---

### 2.9 Notification Center

**Purpose:** View and manage task notifications

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click notification bell icon in global header
- Direct URL: /notifications
- Breadcrumb: Home → Notifications

**Exit Point:**
- Click on notification → Navigate to related task
- Click outside panel → Close notification center
- Click "Mark All as Read" → Mark all as read, keep panel open

**Header:**
- Left: "Notifications" title
- Right: "Mark All as Read" button, Settings icon
- Unread count badge

**Actions:**
- Mark All as Read (button)
- Notification Settings (icon button)
- Clear All (button, future feature)

**Sections:**

**Section 1: Filter Tabs (Top)**
- Tab buttons: All, Unread, Mentions, Assignments, Verifications
- Active tab highlighted
- Unread count on Unread tab

**Section 2: Notification List (Main Content)**
- Notification items list
- Each notification:
  - Icon (notification type)
  - Title (task title or notification type)
  - Message (notification message)
  - Timestamp (relative time)
  - Unread indicator (blue dot)
  - Avatar (user who triggered notification)
  - Click to navigate to related task
  - Mark as read on click
  - Hover actions: Mark as read/unread, delete

**Section 3: Load More (Bottom)**
- "Load More" button
- Shows when more notifications available

**Cards:**
- Not applicable (list view)

**Tables:**
- Not applicable (list view)

**Sidebar:**
- Not applicable (panel/dropdown)

**Filters:**
- Filter tabs (All, Unread, Mentions, Assignments, Verifications)
- Date range filter (future feature)

**Search:**
- Search bar (future feature)
- Search by notification message, task title

**Empty State:**
- No notifications: "No notifications. You're all caught up!"
- Illustration: Empty notifications illustration

**Loading State:**
- Skeleton loading for notification items
- Shimmer effect

**Error State:**
- Error message: "Failed to load notifications"
- Retry button

**Permission Visibility:**
- Employee: Can see own notifications only
- Manager: Can see own notifications only
- Admin: Can see own notifications only
- Super Admin: Can see own notifications only

---

### 2.10 Activity Timeline

**Purpose:** View detailed activity history for a task

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click "View All Activity" from task detail
- Direct URL: /tasks/:taskId/activity
- Breadcrumb: Home → Tasks → [Task Title] → Activity

**Exit Point:**
- Click on activity → Navigate to related item (if applicable)
- Click "Back to Task" → Navigate to Task Detail
- Click breadcrumb → Navigate to parent screen

**Header:**
- Left: "Activity Timeline" title
- Right: Filter, Export
- Task title display
- Breadcrumb: Home → Tasks → [Task Title] → Activity

**Actions:**
- Filter (dropdown)
- Export (button)
- Back to Task (button)

**Sections:**

**Section 1: Filter Bar (Top)**
- Activity type filter (dropdown: All, Status Changes, Comments, Attachments, Verifications)
- Date range filter (date picker)
- User filter (dropdown: All users, specific users)
- "Clear Filters" button

**Section 2: Activity Timeline (Main Content)**
- Timeline view
- Grouped by date
- Each item:
  - Icon (activity type)
  - Description
  - User (avatar + name)
  - Timestamp
  - Metadata (field changes, old value, new value)
  - Click to navigate to related item (if applicable)

**Section 3: Load More (Bottom)**
- "Load More" button
- Shows when more activities available

**Cards:**
- Not applicable (timeline view)

**Tables:**
- Not applicable (timeline view)

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Activity type filter
- Date range filter
- User filter

**Search:**
- Not applicable (timeline view)

**Empty State:**
- No activity: "No activity recorded yet."
- Illustration: Empty activity illustration

**Loading State:**
- Skeleton loading for timeline items
- Shimmer effect

**Error State:**
- Error message: "Failed to load activity timeline"
- Retry button

**Permission Visibility:**
- Employee: Can view activity for own tasks
- Manager: Can view activity for team tasks
- Admin: Can view activity for workspace tasks
- Super Admin: Can view activity for all tasks

---

### 2.11 Comments Panel

**Purpose:** View and manage task comments

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Comments section in task detail (always visible)
- Click "View All Comments" from task detail
- Direct URL: /tasks/:taskId/comments
- Breadcrumb: Home → Tasks → [Task Title] → Comments

**Exit Point:**
- Click "Back to Task" → Navigate to Task Detail
- Click breadcrumb → Navigate to parent screen

**Header:**
- Left: "Comments" title
- Right: Filter, Sort
- Task title display
- Comment count badge
- Breadcrumb: Home → Tasks → [Task Title] → Comments

**Actions:**
- Add Comment (primary button)
- Filter (dropdown)
- Sort (dropdown: Newest, Oldest, Most Liked)
- Back to Task (button)

**Sections:**

**Section 1: Comment Input (Top)**
- Textarea for comment
- Rich text formatting toolbar
- @mention support
- Attachment button
- Submit button
- Character count

**Section 2: Comments List (Main Content)**
- Comments thread
- Each comment:
  - Avatar
  - Author name
  - Timestamp
  - Content (rich text)
  - Edit button (own comment)
  - Delete button (own comment or manager)
  - Reply button
  - Like button (future feature)
  - Replies (nested comments)
- Reply threading
- Highlight @mentions

**Section 3: Load More (Bottom)**
- "Load More" button
- Shows when more comments available

**Cards:**
- Not applicable (thread view)

**Tables:**
- Not applicable (thread view)

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Comment filter (dropdown: All, My Comments, Mentions)
- Date range filter (future feature)

**Search:**
- Search bar (future feature)
- Search by comment content, author name

**Empty State:**
- No comments: "No comments yet. Be the first to comment!"
- Illustration: Empty comments illustration

**Loading State:**
- Skeleton loading for comment items
- Shimmer effect

**Error State:**
- Error message: "Failed to load comments"
- Retry button

**Permission Visibility:**
- Employee: Can view and add comments on own tasks
- Manager: Can view and add comments on team tasks, can delete any comment
- Admin: Can view and add comments on workspace tasks, can delete any comment
- Super Admin: Can view and add comments on all tasks, can delete any comment

---

### 2.12 Image Gallery

**Purpose:** View and manage task images (before, progress, after)

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click on image section in task detail
- Direct URL: /tasks/:taskId/images
- Breadcrumb: Home → Tasks → [Task Title] → Images

**Exit Point:**
- Click "Back to Task" → Navigate to Task Detail
- Click breadcrumb → Navigate to parent screen

**Header:**
- Left: "Image Gallery" title
- Right: Upload, Compare, Download All
- Task title display
- Image count badge
- Breadcrumb: Home → Tasks → [Task Title] → Images

**Actions:**
- Upload Images (primary button)
- Compare Before/After (button)
- Download All (button)
- Back to Task (button)

**Sections:**

**Section 1: Image Type Tabs (Top)**
- Tab buttons: All, Before, Progress, After
- Active tab highlighted
- Image count on each tab

**Section 2: Image Grid (Main Content)**
- Grid layout (3 columns)
- Each image:
  - Thumbnail
  - Image name
  - Upload date
  - Uploaded by
  - Hover actions: View, Download, Delete (if permission)
  - Click to expand
- Lightbox view on click
- Zoom in/out
- Previous/Next navigation

**Section 3: Image Comparison (When Compare Mode Active)**
- Side-by-side comparison view
- Before image on left
- After image on right
- Slider to reveal/hide
- Zoom controls

**Section 4: Image Details (When Image Selected)**
- Image preview (large)
- Image metadata:
  - File name
  - File size
  - Dimensions
  - Upload date
  - Uploaded by
  - Description (editable)
- Actions: Download, Delete (if permission)

**Cards:**
- Not applicable (grid view)

**Tables:**
- Not applicable (grid view)

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Image type tabs (All, Before, Progress, After)
- Date range filter (future feature)

**Search:**
- Not applicable (gallery view)

**Empty State:**
- No images: "No images uploaded yet."
- Illustration: Empty images illustration
- Action button: "Upload Images"

**Loading State:**
- Skeleton loading for image grid
- Shimmer effect

**Error State:**
- Error message: "Failed to load images"
- Retry button

**Permission Visibility:**
- Employee: Can view images on own tasks, can upload images to own tasks, can delete own uploads
- Manager: Can view images on team tasks, can upload images to team tasks, can delete any image
- Admin: Can view images on workspace tasks, can upload images to workspace tasks, can delete any image
- Super Admin: Can view images on all tasks, can upload images to all tasks, can delete any image

---

### 2.13 Time Log

**Purpose:** View and manage time tracking for a task

**User:** Employee, Manager, Admin, Super Admin

**Entry Point:**
- Click on time log section in task detail
- Direct URL: /tasks/:taskId/time-log
- Breadcrumb: Home → Tasks → [Task Title] → Time Log

**Exit Point:**
- Click "Back to Task" → Navigate to Task Detail
- Click breadcrumb → Navigate to parent screen

**Header:**
- Left: "Time Log" title
- Right: Add Time Entry, Start Timer
- Task title display
- Total time display
- Breadcrumb: Home → Tasks → [Task Title] → Time Log

**Actions:**
- Add Time Entry (primary button)
- Start Timer (secondary button)
- Stop Timer (when timer running)
- Export (button)
- Back to Task (button)

**Sections:**

**Section 1: Time Summary (Top)**
- Summary card
- Fields:
  - Total Time (hours)
  - Billable Time (hours)
  - Non-billable Time (hours)
  - Estimated Hours (hours)
  - Variance (hours)
- Progress bar (actual vs estimated)

**Section 2: Timer Section (Below Summary)**
- Active timer display (if running)
- Start time
- Elapsed time (live update)
- Stop button
- Pause/Resume button (future feature)

**Section 3: Time Entries List (Main Content)**
- Table view
- Columns: Date, User, Activity Type, Duration, Description, Actions
- Sortable columns
- Row hover effect
- Actions menu: Edit, Delete (if permission)

**Section 4: Add Time Entry Form (When Adding Entry)**
- Date picker
- User dropdown (if manager/admin)
- Activity type dropdown (Work, Travel, Meeting, Review)
- Duration input (hours)
- Description textarea
- Save button
- Cancel button

**Cards:**
- Time Summary Card: Total time, billable time, variance

**Tables:**
- Time Entries Table: Date, User, Activity Type, Duration, Description, Actions

**Sidebar:**
- Not applicable (full-width)

**Filters:**
- Date range filter
- User filter (dropdown)
- Activity type filter (dropdown)

**Search:**
- Not applicable (table view)

**Empty State:**
- No time entries: "No time logged yet."
- Illustration: Empty time log illustration
- Action button: "Add Time Entry"

**Loading State:**
- Skeleton loading for table rows
- Skeleton loading for summary card
- Shimmer effect

**Error State:**
- Error message: "Failed to load time log"
- Retry button

**Permission Visibility:**
- Employee: Can view own time entries, can add own time entries, can edit own time entries
- Manager: Can view team time entries, can add team time entries, can edit any time entry
- Admin: Can view workspace time entries, can add workspace time entries, can edit any time entry
- Super Admin: Can view all time entries, can add all time entries, can edit any time entry

---

## 3. UX RULES

### 3.1 Single Click Actions

**Task List:**
- Click on task row → Navigate to Task Detail
- Click on status badge → Filter by status
- Click on priority badge → Filter by priority
- Click on assignee avatar → Navigate to user profile
- Click on project name → Navigate to project detail
- Click on checkbox → Select/deselect row for bulk actions
- Click on "Add Task" → Open Create Task dialog
- Click on filter chip → Apply filter
- Click on "Clear Filters" → Clear all filters

**Task Detail:**
- Click on "Edit" → Open Edit Task dialog
- Click on "Delete" → Show delete confirmation
- Click on "Follow" → Toggle follow status
- Click on "Share" → Copy task link
- Click on linked record → Navigate to linked record
- Click on related task → Navigate to related task
- Click on checklist item → Toggle complete
- Click on image → Open image in lightbox
- Click on attachment → Download attachment
- Click on comment → Expand/collapse replies
- Click on "Verify" → Open verification dialog
- Click on "Reject" → Open rejection dialog

**Verification Queue:**
- Click on task row → Navigate to Task Detail
- Click on "Quick Verify" → Verify task immediately
- Click on "Quick Reject" → Reject task immediately
- Click on checkbox → Select for bulk actions

**Notification Center:**
- Click on notification → Navigate to related task
- Click on "Mark All as Read" → Mark all as read
- Click on notification settings → Open settings dialog

### 3.2 Double Click Actions

**Task List:**
- Double click on task row → Open task in new tab (future feature)
- Double click on assignee cell → Open assignee change dialog (future feature)
- Double click on due date cell → Open due date change dialog (future feature)

**Task Detail:**
- Double click on title → Edit title inline (future feature)
- Double click on description → Edit description inline (future feature)

### 3.3 Right Click Menu

**Task List:**
- Right click on task row → Context menu:
  - Open
  - Open in New Tab
  - Edit
  - Delete
  - Duplicate
  - Move to Project
  - Assign to Me
  - Follow
  - Share
  - Copy Task ID
  - Copy Task Title

**Task Detail:**
- Right click on checklist item → Context menu:
  - Edit
  - Delete
  - Move Up
  - Move Down
- Right click on image → Context menu:
  - View
  - Download
  - Delete
  - Set as Cover
- Right click on attachment → Context menu:
  - Download
  - Delete
  - Preview

### 3.4 Hover Actions

**Task List:**
- Hover on task row → Show actions menu (three dots)
- Hover on assignee avatar → Show user tooltip
- Hover on project name → Show project tooltip
- Hover on due date → Show "overdue in X days" tooltip

**Task Detail:**
- Hover on checklist item → Show edit/delete buttons
- Hover on image → Show view/download/delete buttons
- Hover on attachment → Show download/delete buttons
- Hover on comment → Show edit/delete/reply buttons
- Hover on related task → Show relationship type tooltip

**Buttons:**
- Hover on primary button → Slight lift effect
- Hover on icon button → Background color change
- Hover on link → Underline

### 3.5 Keyboard Shortcuts

**Global Shortcuts:**
- Cmd/Ctrl + K → Open command palette
- Cmd/Ctrl + N → Create new task
- Cmd/Ctrl + F → Focus search
- Esc → Close modal/dialog

**Task List Shortcuts:**
- J → Move down to next task
- K → Move up to previous task
- Enter → Open selected task
- Space → Select/deselect task
- A → Select all tasks
- D → Deselect all tasks
- C → Create new task
- E → Edit selected task
- Delete → Delete selected task

**Task Detail Shortcuts:**
- E → Edit task
- C → Add comment
- V → Verify task (if manager)
- R → Reject task (if manager)
- S → Start timer
- T → Stop timer
- Esc → Go back to task list

**Navigation Shortcuts:**
- G + D → Go to Dashboard
- G + M → Go to My Tasks
- G + T → Go to Team Tasks
- G + V → Go to Verification Queue
- G + N → Go to Notifications

### 3.6 Bulk Selection

**Selection Methods:**
- Click on checkbox → Select/deselect single row
- Shift + click → Select range of rows
- Cmd/Ctrl + click → Select/deselect multiple rows
- "Select All" button → Select all visible rows
- "Select All on Page" button → Select all rows across all pages

**Bulk Actions:**
- Change Status → Apply status change to all selected
- Change Priority → Apply priority change to all selected
- Reassign → Reassign all selected to new assignee
- Delete → Delete all selected (with confirmation)
- Export → Export all selected to CSV
- Verify → Verify all selected (verification queue only)
- Reject → Reject all selected (verification queue only)

**Selection Feedback:**
- Selected rows highlighted
- Selection count displayed
- Bulk action bar appears when rows selected
- "Clear Selection" button to deselect all

### 3.7 Drag & Drop

**Kanban View:**
- Drag task card → Move to different status column
- Visual feedback during drag
- Drop on column → Update task status
- Drop on another task → Reorder tasks (future feature)

**Task Detail:**
- Drag image → Reorder images (future feature)
- Drag checklist item → Reorder checklist items (future feature)
- Drag attachment → Reorder attachments (future feature)

**File Upload:**
- Drag file to upload area → Upload file
- Visual feedback during drag
- Drop → Upload file

### 3.8 Mobile Behavior

**Responsive Breakpoints:**
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

**Mobile Adaptations:**

**Task List:**
- Hide less important columns (show: Title, Status, Due Date)
- Horizontal scroll for table
- Filter panel becomes bottom sheet
- Bulk actions become bottom action bar
- Pagination becomes "Load More" button

**Task Detail:**
- Two-column layout becomes single column
- Right column moves below left column
- Sections become collapsible accordions
- Images become swipeable gallery
- Comments become full-width thread
- Action bar becomes sticky bottom bar

**Navigation:**
- Sidebar becomes hamburger menu
- Breadcrumb becomes back button
- Quick actions become action menu

**Touch Actions:**
- Swipe left on task row → Quick actions (Edit, Delete)
- Swipe right on task row → Mark complete
- Long press on task → Context menu
- Pull to refresh
- Infinite scroll for task lists

**Performance:**
- Lazy load images
- Virtual scroll for long lists
- Optimize touch targets (minimum 44px)
- Reduce animations on mobile

---

## 4. COMPONENT INVENTORY

### 4.1 Task Components

**TaskCard**
- Purpose: Display task in card view (kanban)
- Props: task, onClick, onStatusChange
- Variants: default, selected, overdue
- States: normal, hover, loading

**TaskRow**
- Purpose: Display task in table row
- Props: task, onSelect, onClick
- Variants: default, selected, overdue
- States: normal, hover, loading

**TaskHeader**
- Purpose: Display task header in detail view
- Props: task, onEdit, onDelete, onStatusChange
- Sections: Title, Status, Priority, Actions

**TaskStatusBadge**
- Purpose: Display task status with color
- Props: status, onClick
- Variants: All 12 statuses with colors
- States: normal, hover

**PriorityBadge**
- Purpose: Display task priority with color
- Props: priority, onClick
- Variants: Critical (red), High (orange), Medium (yellow), Low (green)

**TaskTimeline**
- Purpose: Display task timeline bar
- Props: task, startDate, dueDate, progress
- Features: Progress bar, milestone markers, overdue warning

**TaskOverview**
- Purpose: Display task overview information
- Props: task
- Sections: Type, Module, Record, Site, Assignee, Due Date, Progress

### 4.2 Form Components

**TaskForm**
- Purpose: Create/edit task form
- Props: task, mode (create/edit), onSubmit, onCancel
- Sections: Basic Info, Assignment, Linked Record, Checklist, Images, Attachments

**TaskFilterPanel**
- Purpose: Advanced task filtering
- Props: filters, onApplyFilters, onClearFilters
- Sections: Status, Priority, Assignee, Project, Site, Date Range

**SavedViewDropdown**
- Purpose: Select saved filter views
- Props: views, selectedView, onSelect
- Features: Create new view, edit view, delete view

**ChecklistEditor**
- Purpose: Edit task checklist
- Props: items, onChange
- Features: Add item, edit item, delete item, reorder, mark complete

**ImageUpload**
- Purpose: Upload task images
- Props: images, onChange, maxImages, required
- Features: Drag & drop, preview, remove, validation

**AttachmentUpload**
- Purpose: Upload task attachments
- Props: attachments, onChange, maxFiles
- Features: Drag & drop, file list, remove, validation

### 4.3 Display Components

**ActivityTimeline**
- Purpose: Display activity history
- Props: activities, filter, onLoadMore
- Features: Grouped by date, activity icons, metadata display

**CommentSection**
- Purpose: Display and add comments
- Props: comments, onAdd, onEdit, onDelete
- Features: Threaded comments, @mentions, rich text, reactions

**ImageGallery**
- Purpose: Display task images
- Props: images, type, onView, onDownload, onDelete
- Features: Grid view, lightbox, comparison view, zoom

**TimeLog**
- Purpose: Display time tracking
- Props: timeEntries, total, onAdd, onEdit, onDelete
- Features: Timer, time entries list, summary, export

**VerificationCard**
- Purpose: Display verification status and actions
- Props: task, onVerify, onReject
- Features: Status display, verification notes, verify/reject buttons

**CompletionSummary**
- Purpose: Display task completion summary
- Props: task
- Sections: Completion date, time spent, issues, lessons learned

### 4.4 Layout Components

**TaskSidebar**
- Purpose: Sidebar navigation in task module
- Props: currentView, onViewChange
- Sections: Navigation, Quick Filters, Saved Views

**TaskPageLayout**
- Purpose: Layout wrapper for task pages
- Props: header, content, sidebar
- Features: Responsive, breadcrumbs, action bar

**TaskDetailLayout**
- Purpose: Layout for task detail page
- Props: task, leftColumn, rightColumn
- Features: Two-column layout, responsive, sticky sidebar

**VerificationQueueLayout**
- Purpose: Layout for verification queue
- Props: tasks, onVerify, onReject
- Features: Bulk actions, filters, statistics

### 4.5 Action Components

**QuickActionBar**
- Purpose: Quick action buttons
- Props: actions
- Features: Primary action, secondary actions, dropdown menu

**BulkToolbar**
- Purpose: Bulk action toolbar
- Props: selectedCount, actions
- Features: Action buttons, selection count, clear selection

**TaskActionsMenu**
- Purpose: Context menu for task actions
- Props: task, actions
- Features: Dropdown menu, action items, icons

**StatusTransitionMenu**
- Purpose: Menu for status transitions
- Props: currentStatus, allowedTransitions, onTransition
- Features: Status options, required fields, validation

### 4.6 Feedback Components

**TaskSkeleton**
- Purpose: Loading skeleton for task
- Props: skeletonType
- Variants: card, row, detail

**EmptyState**
- Purpose: Empty state display
- Props: title, description, action, illustration
- Features: Customizable content, action button

**ErrorState**
- Purpose: Error state display
- Props: message, onRetry
- Features: Error message, retry button, support link

**LoadingSpinner**
- Purpose: Loading indicator
- Props: size
- Variants: small, medium, large

**ToastNotification**
- Purpose: Toast notification
- Props: message, type, duration
- Variants: success, error, warning, info

### 4.7 Navigation Components

**TaskBreadcrumb**
- Purpose: Breadcrumb navigation
- Props: items
- Features: Clickable items, separator icons

**ViewSwitcher**
- Purpose: Switch between task views
- Props: currentView, onViewChange
- Options: List, Kanban, Calendar, Timeline

**Pagination**
- Purpose: Pagination controls
- Props: currentPage, totalPages, pageSize, onPageChange
- Features: Page numbers, page size selector, prev/next buttons

**CommandPalette**
- Purpose: Global command palette
- Props: isOpen, onClose
- Features: Search, command list, keyboard navigation

### 4.8 Statistics Components

**KPICard**
- Purpose: Display KPI metric
- Props: title, value, trend, icon, color
- Features: Trend indicator, icon, color coding

**TaskStatsBar**
- Purpose: Display task statistics
- Props: stats
- Features: Horizontal stat bar, clickable stats

**PerformanceCard**
- Purpose: Display performance metrics
- Props: employee, performance
- Features: Metrics, score, rank

### 4.9 Notification Components

**NotificationCenter**
- Purpose: Display notification center
- Props: notifications, onMarkRead, onNavigate
- Features: Filter tabs, notification list, unread count

**NotificationItem**
- Purpose: Display single notification
- Props: notification, onClick, onMarkRead
- Features: Icon, message, timestamp, unread indicator

**NotificationBadge**
- Purpose: Display notification count badge
- Props: count
- Features: Count display, zero state hidden

### 4.10 Utility Components

**Avatar**
- Purpose: Display user avatar
- Props: user, size
- Features: Initials, image, size variants

**UserBadge**
- Purpose: Display user with avatar
- Props: user, onClick
- Features: Avatar, name, role badge

**DateDisplay**
- Purpose: Display formatted date
- Props: date, format
- Features: Relative time, absolute date, custom format

**DurationDisplay**
- Purpose: Display time duration
- Props: duration
- Features: Hours, minutes, human-readable format

**ProgressBar**
- Purpose: Display progress bar
- Props: progress, color
- Features: Percentage, color coding, animated

**Tag**
- Purpose: Display tag/label
- Props: label, color, removable
- Features: Color variants, remove button

---

## 5. FINAL DELIVERABLES

### 5.1 Complete Screen Map

**Screen Hierarchy:**
```
Task Module
├── Task Dashboard
│   ├── Quick KPIs
│   ├── My Tasks Summary
│   ├── Team Performance
│   ├── Recent Activity
│   └── Critical Tasks
├── My Tasks
│   ├── Quick Filters
│   ├── Search and Sort
│   ├── Task List
│   └── Pagination
├── Team Tasks
│   ├── Team Selector
│   ├── Quick Filters
│   ├── Task Statistics
│   ├── Task List
│   ├── Bulk Actions
│   └── Pagination
├── Project Tasks
│   ├── Project Info
│   ├── Task Statistics
│   ├── Phase Filter
│   ├── Task List
│   ├── Timeline View
│   ├── Bulk Actions
│   └── Pagination
├── Task Detail
│   ├── Header
│   ├── Overview Bar
│   ├── Left Column
│   │   ├── Description
│   │   ├── Checklist
│   │   ├── Before Images
│   │   ├── Progress Images
│   │   ├── After Images
│   │   ├── Attachments
│   │   └── Comments
│   ├── Right Column
│   │   ├── Activity Timeline
│   │   ├── Time Log
│   │   ├── Verification
│   │   ├── Related Tasks
│   │   └── History
│   └── Action Bar
├── Create Task
│   ├── Basic Information
│   ├── Assignment
│   ├── Linked Record
│   ├── Checklist
│   ├── Before Images
│   ├── Attachments
│   ├── Incentive Value
│   └── Review
├── Edit Task
│   ├── Basic Information
│   ├── Assignment
│   ├── Linked Record
│   ├── Checklist
│   ├── Before Images
│   ├── Attachments
│   ├── Incentive Value
│   └── Status Change
├── Verification Queue
│   ├── Quick Filters
│   ├── Verification Statistics
│   ├── Task List
│   ├── Bulk Actions
│   └── Pagination
├── Notification Center
│   ├── Filter Tabs
│   ├── Notification List
│   └── Load More
├── Activity Timeline
│   ├── Filter Bar
│   ├── Activity Timeline
│   └── Load More
├── Comments Panel
│   ├── Comment Input
│   ├── Comments List
│   └── Load More
├── Image Gallery
│   ├── Image Type Tabs
│   ├── Image Grid
│   ├── Image Comparison
│   └── Image Details
└── Time Log
    ├── Time Summary
    ├── Timer Section
    ├── Time Entries List
    └── Add Time Entry Form
```

### 5.2 Navigation Flow

**Primary Navigation:**
```
Main Navigation
├── Tasks (dropdown)
│   ├── Dashboard
│   ├── My Tasks
│   ├── Team Tasks
│   └── Verification Queue
└── Projects
    └── [Project Name] → Tasks tab
```

**Task Creation Flow:**
```
Any Task List
├── Click "Add Task"
├── Open Create Task Dialog
├── Fill Form
├── Click "Create"
└── Navigate to Task Detail
```

**Task Detail Flow:**
```
Any Task List
├── Click on Task
├── Navigate to Task Detail
├── View/Edit Task
├── Click "Back"
└── Return to Task List
```

**Verification Flow:**
```
Task Detail (Employee)
├── Complete Task
├── Upload After Images
├── Submit for Review
└── Navigate to Verification Queue

Verification Queue (Manager)
├── Click on Task
├── Review Task
├── Click "Verify" or "Reject"
└── Task Status Updated
```

**Notification Flow:**
```
Notification Bell
├── Click Bell Icon
├── Open Notification Center
├── Click on Notification
└── Navigate to Related Task
```

### 5.3 User Journey

**Employee Journey:**
1. Login to PEB CRM
2. Navigate to Tasks → My Tasks
3. View assigned tasks
4. Click on task to view details
5. Accept task
6. Start work
7. Upload progress images
8. Complete work
9. Upload after images
10. Submit for review
11. Receive notification of verification
12. View verified task

**Manager Journey:**
1. Login to PEB CRM
2. Navigate to Tasks → Dashboard
3. View team performance
4. Navigate to Tasks → Team Tasks
5. Create tasks for team
6. Assign tasks to team members
7. Navigate to Tasks → Verification Queue
8. Review submitted tasks
9. Verify or reject tasks
10. View team performance metrics

**Admin Journey:**
1. Login to PEB CRM
2. Navigate to Tasks → Dashboard
3. View organization-wide statistics
4. Navigate to Tasks → Team Tasks
5. View all workspace tasks
6. Create tasks for any team
7. Navigate to Tasks → Verification Queue
8. Verify any workspace task
9. View workspace performance
10. Manage task settings

### 5.4 UX Rules Summary

**Interaction Rules:**
- Single click for primary actions
- Double click for inline editing (future)
- Right click for context menus
- Hover for secondary actions
- Keyboard shortcuts for power users
- Bulk selection with checkboxes
- Drag & drop for status changes (kanban)
- Touch gestures for mobile

**Performance Rules:**
- Skeleton loading for async operations
- Optimistic UI for immediate feedback
- Debounced search to reduce API calls
- Virtual scroll for long lists
- Lazy load images
- Cache frequently accessed data

**Accessibility Rules:**
- Keyboard navigation for all actions
- Screen reader support
- High contrast mode support
- Focus indicators on interactive elements
- ARIA labels for icons
- Semantic HTML structure

**Error Handling Rules:**
- Inline validation for form errors
- Error messages with context
- Retry actions for recoverable errors
- Contact support for unrecoverable errors
- Error boundaries for component errors

### 5.5 Component Inventory Summary

**Total Components:** 50+

**Component Categories:**
- Task Components: 6
- Form Components: 8 (added SavedViewDropdown, TemplateSelector)
- Display Components: 8 (added DependenciesCard, FollowersSection)
- Layout Components: 4
- Action Components: 4
- Feedback Components: 4
- Navigation Components: 4
- Statistics Components: 3
- Notification Components: 3
- Utility Components: 6

**Component Reusability:**
- All components designed for reuse
- Consistent prop interfaces
- Themeable variants
- Responsive behavior
- Accessibility support

### 5.6 Wireframe Specification

**Wireframe Principles:**
- Low-fidelity wireframes (no visual design)
- Focus on layout and structure
- Component placement defined
- Information hierarchy established
- Responsive breakpoints specified

**Wireframe Deliverables:**
- Screen wireframes for all 13 screens
- Component wireframes for key components
- Responsive wireframes for mobile/tablet
- Interaction wireframes for key flows

**Wireframe Format:**
- Text-based descriptions (this document)
- Component structure definitions
- Layout specifications
- Interaction patterns

### 5.7 Responsive Rules

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Single column layout
- Collapsible sections
- Bottom sheet for filters
- Sticky action bars
- Touch-optimized targets
- Swipe gestures
- Hamburger menu

**Tablet Adaptations:**
- Two-column layout for task detail
- Side-by-side filters
- Horizontal scroll for tables
- Touch-optimized targets

**Desktop Adaptations:**
- Full multi-column layouts
- Sidebar navigation
- Hover interactions
- Keyboard shortcuts
- Drag & drop

### 5.8 Interaction Rules

**Feedback Rules:**
- Immediate visual feedback for all actions
- Loading states for async operations
- Success toasts for completed actions
- Error messages for failed actions
- Confirmation dialogs for destructive actions

**Animation Rules:**
- Subtle transitions (200-300ms)
- Smooth hover effects
- Loading spinners for async operations
- Skeleton loading for content
- No jarring animations

**Form Rules:**
- Inline validation
- Clear error messages
- Required field indicators
- Character counts for text fields
- Auto-save for drafts (future)

**Navigation Rules:**
- Breadcrumbs for location context
- Back buttons for navigation
- Deep linking support
- Browser history integration
- Keyboard navigation support

---

## CONCLUSION

This UX Blueprint document defines the complete screen design and interaction patterns for the PEB CRM Task Module. All screens, components, and interactions are frozen and ready for implementation.

**Blueprint Status:** Frozen  
**Ready for Implementation:** Yes  
**Next Phase:** Phase 3 - UI Implementation

**Implementation Priority (Phase Order):**

**Phase 3.1: Shared Components**
1. Utility components (Avatar, Badge, DateDisplay, ProgressBar, Tag)
2. Layout components (TaskPageLayout, TaskDetailLayout)
3. Feedback components (TaskSkeleton, EmptyState, ErrorState, LoadingSpinner)
4. Navigation components (TaskBreadcrumb, ViewSwitcher, Pagination)

**Phase 3.2: Task Dashboard**
1. Dashboard KPI cards
2. My Tasks Summary
3. Team Performance table
4. Recent Activity timeline
5. Critical Tasks list
6. Filters and search

**Phase 3.3: My Tasks**
1. Quick filters
2. Search and sort
3. Saved views dropdown (Personal, Team, Default, Public, Pin Favorite)
4. Task list table
5. Pagination
6. Bulk actions

**Phase 3.4: Team Tasks**
1. Team selector
2. Quick filters
3. Task statistics
4. Task list table
5. Bulk actions
6. Pagination

**Phase 3.5: Project Tasks**
1. Project info card
2. Task statistics
3. Phase filter
4. Task list table
5. Timeline view (placeholder)
6. Bulk actions
7. Pagination

**Phase 3.6: Create Task**
1. Basic information form
2. Assignment form
3. Linked record form
4. Checklist editor
5. Before images upload
6. Attachments upload
7. Incentive value
8. Recurrence placeholder (disabled)
9. Templates section
10. Review and create

**Phase 3.7: Edit Task**
1. Edit all task fields
2. Status change workflow
3. Archive/Restore actions
4. Quick duplicate options
5. Permanent delete (Super Admin)

**Phase 3.8: Task Detail**
1. Task header and overview
2. Due warning indicators
3. Offline indicators
4. Audit information
5. Description section
6. Checklist section
7. Before/Progress/After images
8. Attachments
9. Comments with followers
10. Activity timeline
11. Time log
12. Verification card
13. Dependencies section
14. Related tasks
15. History
16. Action bar

**Phase 3.9: Verification Queue**
1. Quick filters
2. Verification statistics
3. Task list
4. Bulk verify/reject
5. Pagination

**Phase 3.10: Notifications**
1. Notification center
2. Filter tabs
3. Notification list
4. Mark as read/unread
5. Notification settings

**Phase 3.11: Activity Timeline**
1. Activity timeline view
2. Filter by type
3. Filter by date
4. Filter by user
5. Export

**Phase 3.12: Comments**
1. Comments panel
2. Comment input
3. @mentions
4. Reply threading
5. Followers management

**Phase 3.13: Image Gallery**
1. Image grid view
2. Image type tabs
3. Lightbox view
4. Before/after comparison
5. Image details

**Phase 3.14: Time Log**
1. Time summary
2. Timer section
3. Time entries list
4. Add time entry
5. Export

**Phase 3.15: QA & Polish**
1. Cross-browser testing
2. Mobile responsive testing
3. Accessibility testing
4. Performance optimization
5. Bug fixes
6. Documentation

**Component Implementation Order:**

**Phase 3.1: Utility Components**
1. Avatar
2. Badge (StatusBadge, PriorityBadge)
3. DateDisplay
4. DurationDisplay
5. ProgressBar
6. Tag
7. UserBadge
8. ToastNotification
9. LoadingSpinner

**Phase 3.2: Layout Components**
1. TaskPageLayout
2. TaskDetailLayout
3. TaskSidebar
4. VerificationQueueLayout

**Phase 3.3: Feedback Components**
1. TaskSkeleton
2. EmptyState
3. ErrorState

**Phase 3.4: Navigation Components**
1. TaskBreadcrumb
2. ViewSwitcher
3. Pagination
4. CommandPalette (placeholder)

**Phase 3.5: Statistics Components**
1. KPICard
2. TaskStatsBar
3. PerformanceCard

**Phase 3.6: Notification Components**
1. NotificationCenter
2. NotificationItem
3. NotificationBadge

**Phase 3.7: Task Components**
1. TaskCard
2. TaskRow
3. TaskHeader
4. TaskStatusBadge
5. PriorityBadge
6. TaskTimeline
7. TaskOverview

**Phase 3.8: Form Components**
1. TaskForm
2. TaskFilterPanel
3. SavedViewDropdown
4. ChecklistEditor
5. ImageUpload
6. AttachmentUpload

**Phase 3.9: Display Components**
1. ActivityTimeline
2. CommentSection
3. ImageGallery
4. TimeLog
5. VerificationCard
6. CompletionSummary
7. DependenciesCard

**Phase 3.10: Action Components**
1. QuickActionBar
2. BulkToolbar
3. TaskActionsMenu
4. StatusTransitionMenu

All future implementation should reference this blueprint as the single source of truth for UX decisions.

---

## 6. OPTIONAL RECOMMENDATIONS

### 6.1 Global Command Palette Scope

**Purpose:** Provide quick access to all task module features via keyboard shortcut

**Trigger:** Cmd/Ctrl + K (global shortcut)

**Command Palette Behavior:**

**Search Scope:**
- Search Tasks: Search across all tasks by title, ID, assignee, project
- Search Projects: Search across all projects by name, status
- Search Employees: Search employees by name, role
- Search Saved Views: Search saved view names

**Quick Actions:**
- Create Task: Open Create Task dialog
- Create Task from Template: Open template selection, then create task
- Navigate to My Tasks: Navigate to /tasks/my-tasks
- Navigate to Team Tasks: Navigate to /tasks/team-tasks
- Navigate to Dashboard: Navigate to /tasks/dashboard
- Navigate to Verification Queue: Navigate to /tasks/verification

**Recent Items:**
- Recent Tasks: Last 5 viewed tasks
- Recent Projects: Last 5 viewed projects
- Recent Views: Last 5 used saved views

**Saved Views:**
- Personal Views: User's saved views
- Team Views: Team shared views
- Public Views: Workspace public views

**Command Palette UI:**
- Overlay modal (centered)
- Search input at top (auto-focused)
- Command list below search
- Keyboard navigation (arrow keys, Enter to select, Esc to close)
- Command categories with headers
- Keyboard shortcuts displayed next to commands
- Fuzzy search support
- Highlight matching text

**Command Categories:**
```
Quick Actions
├── Create Task (C)
├── Create Task from Template (T)
├── Navigate to Dashboard (G+D)
├── Navigate to My Tasks (G+M)
├── Navigate to Team Tasks (G+T)
└── Navigate to Verification Queue (G+V)

Search
├── Search Tasks...
├── Search Projects...
└── Search Employees...

Recent
├── [Task Title] (Task #123)
├── [Task Title] (Task #456)
└── [Project Name]

Saved Views
├── [Personal View Name]
├── [Team View Name]
└── [Public View Name]
```

**Keyboard Shortcuts in Command Palette:**
- Arrow Up/Down: Navigate commands
- Enter: Execute command
- Esc: Close command palette
- Cmd/Ctrl + K: Close command palette
- Tab: Navigate between categories
- Cmd/Ctrl + Enter: Execute command in new tab (future)

### 6.2 Unsaved Changes Protection

**Purpose:** Prevent accidental data loss when users have unsaved changes

**Trigger Conditions:**
- Close dialog (X button or click outside)
- Browser back button
- Refresh page
- Navigate to different page
- Close browser tab

**Protection Scenarios:**

**Create Task Dialog:**
- User has entered any data in form fields
- User uploads images or attachments
- User adds checklist items

**Edit Task Dialog:**
- User has modified any field
- User uploads additional images
- User uploads additional attachments
- User modifies checklist

**Confirmation Dialog:**
```
Title: "Unsaved Changes"
Message: "You have unsaved changes. Do you want to discard them?"
Buttons:
- Discard Changes (destructive, red)
- Continue Editing (cancel, secondary)
- Save (primary, saves changes then closes)
```

**Dialog Behavior:**
- Show confirmation dialog on trigger
- Focus on "Continue Editing" button (safe default)
- "Discard Changes" → Close dialog, lose all changes
- "Continue Editing" → Return to form, keep changes
- "Save" → Save changes, then close dialog
- If save fails → Show error, keep dialog open

**Browser Back Button:**
- Intercept browser back event
- Show confirmation dialog
- If user confirms discard → Allow back navigation
- If user cancels → Prevent back navigation
- If user saves → Save, then allow back navigation

**Page Refresh:**
- Intercept beforeunload event
- Show browser native confirmation dialog
- "Leave site? Changes you made may not be saved."
- User confirms → Allow refresh, lose changes
- User cancels → Prevent refresh, keep changes

**Tab Close:**
- Intercept beforeunload event
- Show browser native confirmation dialog
- "Leave site? Changes you made may not be saved."
- User confirms → Allow close, lose changes
- User cancels → Prevent close, keep changes

**Navigation to Different Page:**
- Intercept navigation event
- Show confirmation dialog
- If user confirms discard → Allow navigation
- If user cancels → Prevent navigation
- If user saves → Save, then allow navigation

**Auto-save (Future Feature):**
- Auto-save draft to localStorage every 30 seconds
- On form load, check for existing draft
- Show "Restore Draft" option if draft exists
- Clear draft after successful save
- Clear draft after discard

**Implementation Notes:**
- Track dirty state (hasChanges boolean)
- Compare current form values with initial values
- Reset dirty state after successful save
- Reset dirty state after discard
- Show confirmation only if dirty state is true

### 6.3 Permission Matrix Appendix

**Purpose:** Clear reference for feature-level permissions across user roles

**Permission Legend:**
- ✓ = Full access
- ○ = Limited access (view only or specific restrictions)
- ✗ = No access
- N/A = Not applicable

**Permission Matrix:**

| Feature | Employee | Manager | Admin | Super Admin |
|---------|----------|---------|-------|-------------|
| **Task Dashboard** | ○ (own tasks only) | ✓ | ✓ | ✓ |
| **My Tasks** | ✓ | ✓ | ✓ | ✓ |
| **Team Tasks** | ✗ | ✓ (team only) | ✓ (workspace) | ✓ (all) |
| **Project Tasks** | ○ (assigned projects) | ✓ (team projects) | ✓ (workspace) | ✓ (all) |
| **Task Detail (View)** | ✓ (own tasks) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Task Detail (Edit)** | ○ (limited fields) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Create Task** | ✓ (self only) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Edit Task** | ○ (own, limited) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Delete Task** | ✗ | ○ (team) | ✓ (workspace) | ✓ (all) |
| **Archive Task** | ✗ | ○ (team) | ✓ (workspace) | ✓ (all) |
| **Restore Task** | ✗ | ○ (team) | ✓ (workspace) | ✓ (all) |
| **Permanent Delete** | ✗ | ✗ | ✗ | ✓ |
| **Duplicate Task** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Assign Task** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Reassign Task** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Change Status** | ○ (own, limited) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Change Priority** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Set Incentive Value** | ✗ | ○ (within limit) | ✓ (workspace) | ✓ (all) |
| **View Incentive Value** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Verify Task** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Reject Task** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Bulk Actions** | ○ (own only) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Export Tasks** | ○ (own only) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Saved Views (Create)** | ✓ (personal) | ✓ (personal/team) | ✓ (personal/team/public) | ✓ (all) |
| **Saved Views (Edit)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Saved Views (Delete)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Templates (Create)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Templates (Edit)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Templates (Delete)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Add Comments** | ✓ (own tasks) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Edit Comments** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Delete Comments** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **@mention Users** | ✓ (team) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Follow Task** | ✓ | ✓ | ✓ | ✓ |
| **View Followers** | ✓ | ✓ | ✓ | ✓ |
| **Upload Images** | ✓ (own tasks) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Delete Images** | ✓ (own uploads) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Upload Attachments** | ✓ (own tasks) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Delete Attachments** | ✓ (own uploads) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Time Log (Add)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Time Log (Edit)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Time Log (Delete)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Time Log (View)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Dependencies (Add)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Dependencies (Remove)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Dependencies (View)** | ✓ (own) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Activity Timeline (View)** | ✓ (own tasks) | ✓ (team tasks) | ✓ (workspace) | ✓ (all) |
| **Activity Timeline (Export)** | ○ (own only) | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Notifications (View)** | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (own) |
| **Notifications (Settings)** | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (own) |
| **Performance (View Self)** | ✓ | ✓ | ✓ | ✓ |
| **Performance (View Team)** | ✗ | ✓ (team) | ✓ (workspace) | ✓ (all) |
| **Performance (View All)** | ✗ | ✗ | ✓ (workspace) | ✓ (all) |
| **Settings (Task Module)** | ✗ | ✗ | ✓ (workspace) | ✓ (all) |
| **Settings (Global)** | ✗ | ✗ | ✗ | ✓ |

**Permission Notes:**

**Employee (Limited Access):**
- Can only view and edit own tasks
- Cannot change assignee, priority, status (limited transitions)
- Cannot see incentive values
- Cannot verify tasks
- Cannot access team tasks or verification queue
- Can create personal saved views
- Can follow tasks
- Can add/edit/delete own comments
- Can upload/delete own images and attachments
- Can log own time

**Manager (Team Access):**
- Can view and edit team tasks
- Can assign and reassign team tasks
- Can verify and reject team tasks
- Can set incentive values within approved limits
- Can create team saved views
- Can create and manage team templates
- Can delete any team comment
- Can delete any team image or attachment
- Can manage team time logs
- Can view team performance
- Cannot access workspace settings
- Cannot permanently delete

**Admin (Workspace Access):**
- Full access to all workspace tasks
- Can assign and reassign any workspace task
- Can verify and reject any workspace task
- Can set any incentive value
- Can create public saved views
- Can create and manage workspace templates
- Can archive and restore any task
- Cannot permanently delete
- Can manage workspace settings
- Can view all workspace performance

**Super Admin (System Access):**
- Full access to all system tasks
- Can permanently delete any task
- Can manage global settings
- Can view all system performance
- Can override any permission

**Implementation Notes:**
- Implement permission checks on all API calls
- Implement permission checks on UI rendering
- Show/hide features based on permissions
- Disable actions based on permissions
- Show permission denied messages for unauthorized actions
- Log all permission violations for audit

---

## 7. PEB CRM IMPLEMENTATION RULES (PERMANENT)

### 7.1 Frontend Only

**Rule:** Frontend only for now. Backend will be implemented later.

**Requirements:**
- No APIs
- No database
- No backend services
- Use mock data or existing frontend architecture

**Implementation:**
- Use existing mock data from `taskManagementApi.ts`
- Create frontend-only data structures
- Simulate API calls with promises
- Store data in React state or context

### 7.2 Lightweight First

**Rule:** Every implementation must prioritize:
- Fast rendering
- Low memory usage
- Low bundle size
- Minimal re-renders
- No unnecessary libraries

**Requirements:**
- If existing React + Next.js + Tailwind + Shadcn can handle it, no new dependencies

**Implementation:**
- Measure bundle size impact before adding libraries
- Use code splitting for large features
- Optimize images and assets
- Use lazy loading for heavy components

### 7.3 New Library Rule (CRITICAL)

**Rule:** If implementation requires installing ANY new package:
- npm package
- UI library
- chart library
- calendar library
- drag-drop library
- markdown editor
- rich text editor
- upload library
- image library
- virtualization library

**STOP implementation and get approval FIRST.**

**Approval Required Before:**
- Installing any new package
- Approval NOT required if existing stack can handle it

**Process:**
1. Identify the need for new library
2. Research if existing stack can handle it
3. If existing stack cannot handle it, request approval
4. Wait for approval before installing
5. Document approval reason

### 7.4 Existing Stack First

**Priority Order:**
1. React
2. Next.js
3. Tailwind
4. Shadcn
5. Radix
6. TanStack
7. Existing reusable components

**Rule:** Reuse first. Create new component ONLY when existing reusable component is not available.

**Implementation:**
- Search existing components before creating new
- Extend existing components if possible
- Use Shadcn components as base
- Use Radix primitives for complex interactions
- Use TanStack for data fetching and state

### 7.5 Performance Rules

**Every Page Must Have:**
- Lazy load heavy components
- Dynamic import only where beneficial
- React.memo only where it provides measurable benefit
- useMemo/useCallback only when actual re-render issue exists
- No unnecessary Context
- No unnecessary state
- No deep prop drilling
- No unnecessary effects

**Implementation:**
- Profile before optimizing
- Measure actual performance impact
- Use React DevTools Profiler
- Avoid premature optimization
- Optimize only when metrics show need

### 7.6 Memory Rules

**Never Use:**
- Heavy animation libraries (without approval)
- Heavy editors (without approval)
- Large icon packs
- Duplicate dependencies
- Large utility libraries for tiny tasks

**Implementation:**
- Use tree-shaking for icons
- Use code splitting for editors
- Use lightweight alternatives
- Audit bundle size regularly
- Remove unused dependencies

### 7.7 UI Rules

**Requirements:**
- Enterprise UI
- Consistent spacing
- Consistent typography
- Responsive
- Dark/Light compatible
- Accessibility maintained

**Implementation:**
- Follow PEB CRM design system
- Use Tailwind for styling
- Use Shadcn for components
- Test on multiple screen sizes
- Test in dark mode
- Test with screen reader

### 7.8 Code Rules

**Requirements:**
- Reusable
- Small components
- Feature based
- Type-safe
- No duplicate code
- Clean imports
- No dead code

**Implementation:**
- Keep components under 200 lines
- Extract reusable logic to hooks
- Use TypeScript for type safety
- Remove unused imports
- Remove dead code regularly
- Follow PEB CRM code style

### 7.9 Build Rules

**After Implementation, Ensure:**
- No TypeScript errors
- No ESLint errors
- No hydration issues
- No console errors
- No performance regression

**Implementation:**
- Run TypeScript check before commit
- Run ESLint before commit
- Test build before commit
- Monitor console for errors
- Use Lighthouse for performance audit

### 7.10 Before Adding Anything

**Developer Should Ask for Approval ONLY If:**
- ✅ New package install needed
- ✅ Existing architecture change needed
- ✅ Existing dependency replace needed
- ✅ Existing component remove needed

**Otherwise:**
- Direct implementation

**Examples:**

**Direct Implementation (No Approval Needed):**
- Create new component using existing stack
- Add new feature using existing libraries
- Fix bug in existing code
- Refactor existing code
- Add new page using existing patterns

**Approval Needed:**
- Install new npm package
- Replace React with another framework
- Remove Shadcn and use another UI library
- Change routing architecture
- Replace state management solution

### 7.11 No Placeholder UI

**Rule:** Do not build half UI. Avoid "Coming Soon" pages.

**Requirements:**
- If feature is not in current phase, show clean placeholder or disabled control
- No broken UI
- No incomplete screens

**Implementation:**
- Use disabled controls for future features
- Show clear "Feature coming in Phase X" tooltips
- Ensure placeholder UI is functional and consistent
- Do not leave broken or incomplete UI elements

### 7.12 Every Screen Must Be Complete

**Rule:** No screen is complete until it has:

**Required States:**
- Loading State
- Empty State
- Error State
- Success Feedback
- Responsive Layout
- Dark Mode
- Keyboard Navigation

**Implementation:**
- Implement all states before marking screen complete
- Test all states manually
- Ensure consistent state handling across screens
- Use skeleton loaders for loading state
- Use meaningful empty state messages
- Use actionable error states
- Show success feedback for all actions

### 7.13 Mobile First Validation

**Rule:** Verify every screen on:

**Devices:**
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Laptop (1024px - 1440px)
- Desktop (> 1440px)

**Implementation:**
- Do not mark complete after desktop testing only
- Test on actual devices when possible
- Use browser dev tools for responsive testing
- Test touch interactions on mobile
- Test hover interactions on desktop
- Ensure layout works on all breakpoints

### 7.14 No Fake Enterprise Features

**Rule:** Do not create:

**Prohibited:**
- Fake AI
- Fake Analytics
- Fake Live Data
- Fake Realtime
- Fake Sync

**Implementation:**
- If backend is not available, clearly mock frontend behavior
- Use realistic mock data
- Label mock data clearly in code
- Do not pretend features are live when they are not
- Use "Demo" or "Mock" labels where appropriate

### 7.15 Existing Design System is Final

**Rule:** Task Module should not look like a separate application.

**Reuse:**
- Colors
- Radius
- Shadows
- Typography
- Cards
- Inputs
- Buttons
- Dialogs
- Tables

**Implementation:**
- Task module must feel like natural part of PEB CRM
- Use existing design tokens
- Follow existing component patterns
- Do not create custom design system
- Maintain visual consistency across modules

### 7.16 Performance Budget

**Rule:** Every screen target:

**Performance Targets:**
- Initial render fast (< 2s)
- No visible lag
- No unnecessary animation
- No layout shift
- Scroll 60 FPS
- Instant filters (< 100ms)

**Implementation:**
- Measure performance before and after changes
- Use React DevTools Profiler
- Use Lighthouse for performance audit
- Optimize critical rendering path
- Use virtual scrolling for long lists
- Debounce expensive operations

### 7.17 Every New Component Must Be Reusable

**Rule:** Never create:

**Prohibited Patterns:**
- TaskCardEmployee
- TaskCardDashboard
- TaskCardAdmin

**Correct Pattern:**
- TaskCard (with props for behavior variations)

**Implementation:**
- Single component with configurable props
- Use composition for variations
- Avoid component duplication
- Extract common logic to hooks
- Use variant props for different behaviors

### 7.18 Final QA Before Completion

**Rule:** Mandatory checklist before marking phase complete:

**QA Checklist:**
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ No console warnings
- ✅ No duplicate components
- ✅ No duplicate logic
- ✅ No unnecessary dependencies
- ✅ Responsive verified (Mobile, Tablet, Laptop, Desktop)
- ✅ Dark mode verified
- ✅ Keyboard accessibility verified
- ✅ Existing modules unaffected
- ✅ Performance regression checked

**Implementation:**
- Run full test suite before completion
- Manual testing on all devices
- Regression testing for existing features
- Performance audit
- Accessibility audit
- Cross-browser testing

---

## 8. PHASE IMPLEMENTATION ORDER

### Phase 3.0: Cleanup & Refactor (Pre-Implementation)

**Goal:** Audit and clean existing task module before new implementation.

**Scope:**
- Existing Task module audit
- Identify reusable components
- Remove duplicate code
- Reuse existing Dialogs, Tables, Filters, Cards
- Verify existing design tokens
- Verify existing routes
- Clean existing mock API
- Clean existing types
- Clean existing hooks
- Finalize existing folder structure

**Deliverable:**
- Clean codebase ready for new implementation
- No UI implementation
- No new features
- No new packages

**Rules:**
- Do NOT implement any UI
- Do NOT create any new features
- Do NOT install any new packages
- Focus only on cleanup and refactoring

---

### Phase 3.1: Shared Foundation (Mandatory)

**Goal:** Prepare all reusable components before implementing any screens.

**Scope:**
- Task types enum
- Task status enum
- Priority enum
- Shared interfaces
- Mock data cleanup
- TaskCard component
- StatusBadge component
- PriorityBadge component
- ProgressBar component
- DateDisplay component
- Avatar component
- EmptyState component
- Skeleton component
- ErrorState component
- PageLayout component
- Breadcrumb component
- ViewSwitcher component

**Deliverable:**
- All reusable components ready
- No complete pages visible
- Foundation for all future phases

---

### Phase 3.2: Dashboard Only

**Goal:** Implement Task Dashboard screen only.

**Scope:**
- KPI cards (Open Tasks, Overdue, Completed Today, Pending Verification)
- Due Today section
- Overdue section
- Pending Review section
- Recently Updated section
- Quick Action buttons
- Search bar
- Filter controls

**Deliverable:**
- Complete Dashboard screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- Implement ONLY Dashboard
- Do NOT implement any other screens
- Focus on Dashboard UX perfection

---

### Phase 3.3: My Tasks

**Goal:** Implement My Tasks screen for employees.

**Scope:**
- Task table
- Quick filters
- Search
- Saved Views dropdown
- Bulk Selection
- Pagination

**Deliverable:**
- Complete My Tasks screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- Implement ONLY My Tasks
- Employee-focused features only
- No team management features

---

### Phase 3.4: Team Tasks

**Goal:** Implement Team Tasks screen for managers.

**Scope:**
- Employee filter
- Team filter
- Bulk Assign
- Bulk Status change
- Task table
- Quick filters
- Search
- Pagination

**Deliverable:**
- Complete Team Tasks screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- Implement ONLY Team Tasks
- Manager-focused features
- Team management capabilities

---

### Phase 3.5: Project Tasks

**Goal:** Implement Project Tasks screen with project integration.

**Scope:**
- Project info card
- Task statistics
- Phase filter
- Task list table
- Timeline view (placeholder)
- Bulk actions
- Pagination

**Deliverable:**
- Complete Project Tasks screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- Implement ONLY Project Tasks
- Project integration focus
- Timeline as placeholder only

---

### Phase 3.6: Create Task

**Goal:** Implement Create Task form with perfect UX.

**Scope:**
- Basic information form
- Assignment form
- Linked record form
- Checklist editor
- Before images upload
- Attachments upload
- Incentive value
- Recurrence placeholder (disabled)
- Templates section
- Review and create flow

**Deliverable:**
- Complete Create Task form
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation
- Perfect UX

**Rules:**
- This is MOST IMPORTANT phase
- Focus on UX perfection
- Ensure form validation
- Ensure user guidance

---

### Phase 3.7: Edit Task

**Goal:** Implement Edit Task form reusing Create Task components.

**Scope:**
- Edit all task fields
- Status change workflow
- Archive/Restore actions
- Quick duplicate options
- Permanent delete (Super Admin)

**Deliverable:**
- Complete Edit Task form
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- Reuse Create Task components
- Focus on edit-specific features
- Archive instead of delete

---

### Phase 3.8: Task Detail (Core Workspace)

**Goal:** Implement Task Detail screen - the heart of the module.

**Scope:**
- Task header and overview
- Due warning indicators
- Offline indicators
- Audit information
- Description section
- Checklist section
- Before/Progress/After images
- Attachments
- Comments with followers
- Activity timeline
- Time log
- Verification card
- Dependencies section
- Related tasks
- History
- Action bar

**Deliverable:**
- Complete Task Detail screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

**Rules:**
- This is the CORE of the module
- Implement LAST (after all reusable components are ready)
- Focus on completeness
- All sections must be functional

---

### Phase 3.9: Verification Queue

**Scope:**
- Quick filters
- Verification statistics
- Task list
- Bulk verify/reject
- Pagination

**Deliverable:**
- Complete Verification Queue screen
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.10: Notification Center

**Scope:**
- Notification center
- Filter tabs
- Notification list
- Mark as read/unread
- Notification settings

**Deliverable:**
- Complete Notification Center
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.11: Activity Timeline

**Scope:**
- Activity timeline view
- Filter by type
- Filter by date
- Filter by user
- Export

**Deliverable:**
- Complete Activity Timeline
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.12: Comments

**Scope:**
- Comments panel
- Comment input
- @mentions
- Reply threading
- Followers management

**Deliverable:**
- Complete Comments system
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.13: Image Gallery

**Scope:**
- Image grid view
- Image type tabs
- Lightbox view
- Before/after comparison
- Image details

**Deliverable:**
- Complete Image Gallery
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.14: Time Log

**Scope:**
- Time summary
- Timer section
- Time entries list
- Add time entry
- Export

**Deliverable:**
- Complete Time Log
- All states (Loading, Empty, Error, Success)
- Responsive layout
- Dark mode support
- Keyboard navigation

---

### Phase 3.15: Final QA, Performance & Polish

**Scope:**
- Cross-browser testing
- Mobile responsive testing
- Accessibility testing
- Performance optimization
- Bug fixes
- Documentation

**Deliverable:**
- Fully tested module
- Performance optimized
- Documentation complete
- Ready for production

---

## FINAL IMPLEMENTATION ROADMAP

**Phase 3.0**  → Existing Module Audit & Cleanup  
**Phase 3.1**  → Shared Foundation (Reusable Components)  
**Phase 3.2**  → Dashboard Only  
**Phase 3.3**  → My Tasks (Employee)  
**Phase 3.4**  → Team Tasks (Manager)  
**Phase 3.5**  → Project Tasks (Project Integration)  
**Phase 3.6**  → Create Task (Most Important)  
**Phase 3.7**  → Edit Task (Reuse Create)  
**Phase 3.8**  → Task Detail (Core Workspace - Last)  
**Phase 3.9**  → Verification Queue  
**Phase 3.10** → Notification Center  
**Phase 3.11** → Activity Timeline  
**Phase 3.12** → Comments  
**Phase 3.13** → Image Gallery  
**Phase 3.14** → Time Log  
**Phase 3.15** → Final QA, Performance & Polish

---

**Blueprint Version:** 1.3  
**Blueprint Status:** Frozen  
**Ready for Implementation:** Yes
