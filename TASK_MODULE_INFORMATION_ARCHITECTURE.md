# TASK MODULE INFORMATION ARCHITECTURE
## PEB CRM - Enterprise Task Management System

**Architecture Date:** June 30, 2026  
**Phase:** 2 - Information Architecture & Functional Blueprint  
**Scope:** Frontend Architecture Only (No Implementation)  
**Status:** Architecture Frozen - Ready for Implementation

---

## EXECUTIVE SUMMARY

This document defines the complete information architecture for the PEB CRM Task Module. It serves as the single source of truth for all future implementation work. The architecture is designed specifically for PEB (Pre-Engineered Building) construction workflows, integrating seamlessly with existing PEB CRM modules while adopting best practices from enterprise task management systems.

**Design Principles:**
- Construction-first: Built for PEB workflow from design to completion
- Employee-first: Field worker optimized with mobile considerations
- Admin visibility: Management oversight without complexity
- Simple to learn: Intuitive for construction teams
- Fast to use: Minimal clicks for common operations
- Professional enterprise: Matches PEB CRM standards

---

## 1. TASK LIFECYCLE

### 1.1 Status Definitions

**Draft**
- Task created but not yet assigned
- Initial state for all tasks
- Can be edited freely
- No notifications sent
- **Who can move:** Creator, Admin, Manager
- **Transitions to:** Assigned, Cancelled

**Assigned**
- Task assigned to an employee
- Employee receives notification
- Task appears in employee's "My Tasks"
- **Who can move:** Creator, Admin, Manager
- **Transitions from:** Draft
- **Transitions to:** Accepted, Reassigned

**Accepted**
- Employee has acknowledged the task
- Employee clicked "Accept" or started work
- Task moves to active state
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** Assigned
- **Transitions to:** In Progress, Reopened

**In Progress**
- Employee is actively working on task
- Progress updates can be added
- Progress images can be uploaded
- Time tracking can start
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** Accepted, Reopened, Blocked
- **Transitions to:** Blocked, Waiting, Review, Completed

**Blocked**
- Task cannot proceed due to external factor
- Reason must be provided (material delay, weather, dependency)
- Blocking reason visible to all
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** In Progress
- **Transitions to:** In Progress, Cancelled

**Waiting**
- Task waiting for external action (approval, material delivery)
- Different from blocked - waiting is expected
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** In Progress
- **Transitions to:** In Progress

**Review**
- Task work completed, pending verification
- After images uploaded
- Completion notes provided
- Verification workflow initiated
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** In Progress
- **Transitions to:** Verified, Rejected

**Verified**
- Task verified by manager/supervisor
- Verification notes provided
- Incentive payment unlocked
- Task marked as complete
- **Who can move:** Manager, Admin, Super Admin
- **Transitions from:** Review
- **Transitions to:** Completed

**Completed**
- Task fully completed and verified
- Final state for successful tasks
- No further modifications allowed
- Archived after 30 days
- **Who can move:** System (automatic from Verified)
- **Transitions from:** Verified
- **Transitions to:** None (final state)

**Cancelled**
- Task cancelled before completion
- Reason must be provided
- No payment issued
- **Who can move:** Creator, Admin, Manager, Super Admin
- **Transitions from:** Draft, Assigned, Blocked
- **Transitions to:** None (final state)

**Rejected**
- Task verification failed
- Returned to employee for rework
- Rejection reason must be provided
- **Who can move:** Manager, Admin, Super Admin
- **Transitions from:** Review
- **Transitions to:** Reopened

**Reopened**
- Task reopened after rejection
- Employee can address issues
- **Who can move:** Assigned Employee, Admin, Manager
- **Transitions from:** Rejected
- **Transitions to:** In Progress, Review

### 1.2 Status Transition Matrix

| From Status | To Status | Who Can Move | Required Fields |
|-------------|-----------|--------------|-----------------|
| Draft | Assigned | Creator, Admin, Manager | Assignee, Due Date |
| Draft | Cancelled | Creator, Admin, Manager, Super Admin | Cancellation Reason |
| Assigned | Accepted | Assigned Employee, Admin, Manager | None (user action) |
| Assigned | Reassigned | Creator, Admin, Manager | New Assignee |
| Accepted | In Progress | Assigned Employee, Admin, Manager | None |
| In Progress | Blocked | Assigned Employee, Admin, Manager | Blocking Reason |
| In Progress | Waiting | Assigned Employee, Admin, Manager | Waiting Reason |
| In Progress | Review | Assigned Employee, Admin, Manager | After Images, Completion Notes |
| Blocked | In Progress | Assigned Employee, Admin, Manager | None |
| Blocked | Cancelled | Creator, Admin, Manager, Super Admin | Cancellation Reason |
| Waiting | In Progress | Assigned Employee, Admin, Manager | None |
| Review | Verified | Manager, Admin, Super Admin | Verification Notes |
| Review | Rejected | Manager, Admin, Super Admin | Rejection Reason |
| Verified | Completed | System (automatic) | None |
| Rejected | Reopened | Assigned Employee, Admin, Manager | None |
| Reopened | In Progress | Assigned Employee, Admin, Manager | None |
| Reopened | Review | Assigned Employee, Admin, Manager | After Images, Completion Notes |

### 1.3 Status Rules

**Automatic Transitions:**
- Verified → Completed: Automatic after verification (no user action)
- Review → Verified: Automatic if auto-verification enabled (future feature)

**Validation Rules:**
- Cannot move to Review without after images
- Cannot move to Verified without verification notes
- Cannot move to Cancelled without reason
- Cannot move to Rejected without reason
- Cannot move to Blocked without blocking reason

**Permission Rules:**
- Employees can only move tasks assigned to them
- Managers can move any task in their team
- Admins can move any task in workspace
- Super Admins can move any task in system

---

## 2. TASK TYPES

### 2.1 General Task

**Definition:** Standard task for general work items not tied to specific modules
**Use Cases:** Office work, administrative tasks, general maintenance
**Linked Module:** General
**Required Fields:** Title, Description, Assignee, Due Date
**Optional Fields:** Priority, Checklist, Attachments, Before Images
**Verification:** Required for tasks with incentive value
**Examples:**
- "Clean office warehouse"
- "Organize tool room"
- "Update safety board"

### 2.2 Project Task

**Definition:** Task directly linked to a construction project
**Use Cases:** PEB erection, installation, site work
**Linked Module:** Projects
**Required Fields:** Title, Description, Assignee, Due Date, Linked Project
**Optional Fields:** Priority, Phase, Checklist, Before Images, Site Location
**Verification:** Always required
**Examples:**
- "Install roof sheets - Warehouse A"
- "Assemble steel frame - Section B"
- "Complete electrical wiring - Floor 1"

### 2.3 Site Task

**Definition:** Task tied to a specific construction site location
**Use Cases:** Site-specific work, location-based assignments
**Linked Module:** Projects (with site context)
**Required Fields:** Title, Description, Assignee, Due Date, Site Location
**Optional Fields:** Priority, Phase, GPS Coordinates, Checklist
**Verification:** Required
**Examples:**
- "Site inspection - North boundary"
- "Material delivery - Site entrance"
- "Safety check - Site office"

### 2.4 Inventory Task

**Definition:** Task related to inventory management
**Use Cases:** Stock counts, material verification, inventory audits
**Linked Module:** Inventory
**Required Fields:** Title, Description, Assignee, Due Date, Linked Inventory Item
**Optional Fields:** Priority, Expected Count, Actual Count
**Verification:** Required for count verification
**Examples:**
- "Physical count - Steel plates"
- "Verify inventory - Roofing sheets"
- "Audit stock - Fasteners"

### 2.5 Purchase Task

**Definition:** Task related to purchasing and procurement
**Use Cases:** Material procurement, vendor coordination, purchase follow-up
**Linked Module:** Purchases
**Required Fields:** Title, Description, Assignee, Due Date, Linked Purchase Order
**Optional Fields:** Priority, Vendor, Expected Delivery
**Verification:** Required for delivery verification
**Examples:**
- "Follow up - Steel order #123"
- "Verify delivery - Roofing materials"
- "Coordinate vendor - Cement delivery"

### 2.6 Design Task

**Definition:** Task related to design and engineering work
**Use Cases:** Drawing preparation, design review, GA drawing approval
**Linked Module:** Projects (design phase)
**Required Fields:** Title, Description, Assignee, Due Date, Linked Project
**Optional Fields:** Priority, Drawing Number, Revision
**Verification:** Required for design approval
**Examples:**
- "Prepare GA drawing - Warehouse B"
- "Review structural design - Foundation"
- "Update MEP drawings - Floor 2"

### 2.7 Quotation Task

**Definition:** Task related to quotation preparation and follow-up
**Use Cases:** Quote preparation, quote follow-up, quote revision
**Linked Module:** Quotations
**Required Fields:** Title, Description, Assignee, Due Date, Linked Quotation
**Optional Fields:** Priority, Customer, Amount
**Verification:** Required for quote submission
**Examples:**
- "Prepare quotation - ABC Manufacturing"
- "Follow up - Quotation #456"
- "Revise quote - XYZ Corporation"

### 2.8 Installation Task

**Definition:** Task for installation work at customer site
**Use Cases:** PEB installation, equipment installation, on-site assembly
**Linked Module:** Projects (installation phase)
**Required Fields:** Title, Description, Assignee, Due Date, Linked Project, Site Location
**Optional Fields:** Priority, Phase, Equipment Required, Team Size
**Verification:** Always required with photo proof
**Examples:**
- "Install PEB structure - Customer site"
- "Assemble roofing system - Warehouse C"
- "Complete cladding - Factory building"

### 2.9 Maintenance Task

**Definition:** Task for maintenance and repair work
**Use Cases:** Preventive maintenance, breakdown repair, scheduled maintenance
**Linked Module:** Projects or General
**Required Fields:** Title, Description, Assignee, Due Date
**Optional Fields:** Priority, Equipment ID, Maintenance Type
**Verification:** Required for maintenance completion
**Examples:**
- "Preventive maintenance - Crane #3"
- "Repair - Forklift hydraulic system"
- "Inspect - Electrical panel B"

### 2.10 Inspection Task

**Definition:** Task for quality inspection and verification
**Use Cases:** Quality checks, safety inspections, compliance verification
**Linked Module:** Projects or General
**Required Fields:** Title, Description, Assignee, Due Date, Inspection Type
**Optional Fields:** Priority, Checklist, Standards Reference
**Verification:** Required with inspection report
**Examples:**
- "Quality inspection - Weld joints"
- "Safety inspection - Site A"
- "Compliance check - Fire safety system"

### 2.11 Service Task

**Definition:** Task for customer service and support
**Use Cases:** Customer visits, service calls, warranty work
**Linked Module:** Customers
**Required Fields:** Title, Description, Assignee, Due Date, Linked Customer
**Optional Fields:** Priority, Service Type, Warranty Status
**Verification:** Required for service completion
**Examples:**
- "Customer visit - ABC Manufacturing"
- "Warranty repair - Roof leak"
- "Service call - Door adjustment"

### 2.12 Follow-up Task

**Definition:** Task for follow-up activities
**Use Cases:** Lead follow-up, payment follow-up, document follow-up
**Linked Module:** Leads, Customers, Finance
**Required Fields:** Title, Description, Assignee, Due Date, Linked Record
**Optional Fields:** Priority, Follow-up Type
**Verification:** Optional
**Examples:**
- "Follow up - Lead #789"
- "Payment reminder - Invoice #123"
- "Document collection - Site permit"

### 2.13 Reminder Task

**Definition:** Task for reminders and notifications
**Use Cases:** Meeting reminders, deadline reminders, compliance reminders
**Linked Module:** General
**Required Fields:** Title, Description, Due Date
**Optional Fields:** Priority, Reminder Type
**Verification:** Not required
**Examples:**
- "Safety meeting reminder"
- "Permit renewal reminder"
- "Contract review reminder"

### 2.14 Recurring Task (Future)

**Definition:** Task that repeats on a schedule
**Use Cases:** Regular inspections, scheduled maintenance, recurring reports
**Linked Module:** Any
**Required Fields:** Title, Description, Assignee, Recurrence Rule
**Optional Fields:** Priority, End Date, Recurrence Pattern
**Verification:** Per occurrence
**Examples:**
- "Weekly safety inspection"
- "Monthly equipment maintenance"
- "Quarterly inventory audit"

**Note:** Recurring tasks are out of scope for initial implementation. Will be added in future phase.

---

## 3. TASK PRIORITY

### 3.1 Priority Definitions

**Critical**
- **Business Impact:** Work stoppage, safety risk, or major financial loss
- **Expected Response Time:** Immediate (within 1 hour)
- **Color:** Red
- **Usage:** Safety incidents, structural failures, customer emergencies, material shortages
- **Notification:** Immediate push notification to all relevant managers
- **Examples:**
  - "Structural failure detected - Site A"
  - "Safety incident - Worker injury"
  - "Material shortage - Steel delivery delayed"

**High**
- **Business Impact:** Significant delay, customer impact, or schedule impact
- **Expected Response Time:** Within 4 hours
- **Color:** Orange
- **Usage:** Critical path tasks, customer-facing work, schedule-dependent tasks
- **Notification:** Push notification to assignee and manager
- **Examples:**
  - "Complete roof installation - Warehouse A (critical path)"
  - "Customer site visit - ABC Manufacturing (today)"
  - "Material delivery coordination - Steel beams (delayed)"

**Medium**
- **Business Impact:** Moderate delay, manageable impact
- **Expected Response Time:** Within 24 hours
- **Color:** Yellow
- **Usage:** Standard tasks, routine work, non-critical path tasks
- **Notification:** Standard notification to assignee
- **Examples:**
  - "Install cladding - Section B"
  - "Inventory count - Fasteners"
  - "Prepare quotation - New lead"

**Low**
- **Business Impact:** Minimal impact, can be deferred
- **Expected Response Time:** Within 72 hours
- **Color:** Green
- **Usage:** Administrative tasks, documentation, non-urgent work
- **Notification:** No immediate notification (batch notification)
- **Examples:**
  - "Update safety documentation"
  - "Organize tool room"
  - "Archive old project files"

### 3.2 Priority Assignment Rules

**Automatic Priority Assignment:**
- Tasks linked to overdue projects: Auto-upgrade to High
- Tasks with safety flag: Auto-set to Critical
- Tasks with customer complaint: Auto-set to High
- Tasks created from lead: Auto-set to Medium

**Manual Priority Override:**
- Managers can override any priority
- Employees can suggest priority change (requires approval)
- Priority change requires reason

**Priority Escalation:**
- Medium tasks overdue by 3 days: Auto-upgrade to High
- High tasks overdue by 1 day: Auto-upgrade to Critical
- Critical tasks: Immediate escalation to management

### 3.3 Priority Visibility

**Dashboard:**
- Critical tasks: Red highlight, top of list
- High tasks: Orange highlight
- Medium tasks: Yellow highlight
- Low tasks: Green highlight

**Filters:**
- Priority filter in all views
- "My Critical Tasks" quick filter
- "Overdue High Priority" quick filter

**Sorting:**
- Default sort: Priority (Critical first), then due date
- User can change sort preference

---

## 4. TASK WORKSPACE

### 4.1 Task Detail Workspace Architecture

The Task Detail Workspace is the comprehensive view of a single task. It provides all information and actions related to a task in one location.

#### 4.1.1 Header Section

**Responsibility:** Display task identification and quick actions

**Fields:**
- Task ID (auto-generated, read-only)
- Task Title (editable by creator, assignee, manager, admin)
- Status (dropdown, transition permissions apply)
- Priority (dropdown, editable by manager, admin)
- Assignee (dropdown, editable by creator, manager, admin)
- Due Date (date picker, editable by creator, assignee, manager, admin)
- Created Date (read-only)
- Created By (read-only, user link)

**Quick Actions:**
- Edit task
- Delete task (creator, manager, admin only)
- Assign to me
- Follow/Unfollow
- Share task link
- Print task

**Status Indicators:**
- Overdue indicator (red badge if past due date and not completed)
- Verification pending indicator (orange badge if in Review status)
- New task indicator (blue badge if created within 24 hours)

#### 4.1.2 Overview Section

**Responsibility:** Provide at-a-glance task summary

**Fields:**
- Task Type (read-only, set at creation)
- Linked Module (read-only, link to parent record)
- Linked Record (read-only, link to parent record)
- Site Location (if applicable, link to site)
- Phase/Stage (if applicable, dropdown)
- Progress (percentage, editable by assignee)
- Estimated Hours (number, editable by manager)
- Actual Hours (number, calculated from time log)
- Incentive Value (currency, editable by manager, admin)
- Payment Status (read-only, calculated from verification)

**Visual Elements:**
- Progress bar (visual representation of progress percentage)
- Status badge (current status with color)
- Priority badge (current priority with color)

#### 4.1.3 Description Section

**Responsibility:** Provide detailed task description

**Fields:**
- Description (rich text editor, supports formatting, lists, links)
- Last updated (timestamp)
- Last updated by (user link)

**Capabilities:**
- Rich text formatting (bold, italic, headings, lists)
- Link to other tasks
- Link to documents
- Link to external resources
- @mention team members

#### 4.1.4 Checklist Section

**Responsibility:** Track task completion through checklist items

**Fields:**
- Checklist items (dynamic list)
- Each item has:
  - Text (editable)
  - Completed (checkbox)
  - Completed At (timestamp, auto-set)
  - Completed By (user link, auto-set)
  - Order (number, for sorting)

**Capabilities:**
- Add checklist item
- Edit checklist item
- Delete checklist item
- Reorder checklist items (drag and drop)
- Mark item as complete/incomplete
- Checklist progress indicator (X of Y complete)

**Validation:**
- At least one checklist item required for tasks requiring verification
- All checklist items must be complete before moving to Review status

#### 4.1.5 Timeline Section

**Responsibility:** Display task timeline and milestones

**Fields:**
- Start Date (date picker, editable)
- Due Date (date picker, editable)
- Estimated Completion Date (calculated from start date + estimated hours)
- Actual Completion Date (set when task completed)
- Time Elapsed (calculated from start date to now)
- Time Remaining (calculated from now to due date)

**Visual Elements:**
- Timeline bar (visual representation of task duration)
- Milestone markers (key dates)
- Progress indicator on timeline
- Overdue warning (if past due date)

**Capabilities:**
- View timeline in different scales (days, weeks)
- Compare estimated vs actual timeline
- Highlight critical path (if task is on critical path)

#### 4.1.6 Activity Section

**Responsibility:** Display chronological activity history

**Fields:**
- Activity items (chronological list)
- Each item has:
  - Activity Type (enum: Created, Assigned, Accepted, Started, Progress Updated, Blocked, Unblocked, Comment Added, Attachment Added, Image Added, Status Changed, Priority Changed, Assignee Changed, Due Date Changed, Verified, Rejected, Completed, Cancelled)
  - Description (text)
  - Performed By (user link)
  - Timestamp (date-time)
  - Metadata (key-value pairs for additional context)

**Capabilities:**
- View all activity
- Filter by activity type
- Filter by date range
- Filter by user
- Export activity log

**Display:**
- Chronological order (newest first)
- Grouped by date
- Activity type icons
- User avatars
- Timestamps

#### 4.1.7 Comments Section

**Responsibility:** Enable task discussion and collaboration

**Fields:**
- Comments (threaded list)
- Each comment has:
  - Content (rich text)
  - Author (user link)
  - Timestamp (date-time)
  - Edited (boolean)
  - Edited At (timestamp, if edited)
  - Edited By (user link, if edited)
  - Mentions (list of mentioned users)
  - Replies (list of reply comments)

**Capabilities:**
- Add comment
- Edit own comment
- Delete own comment (or manager/admin)
- Reply to comment
- @mention team members
- Rich text formatting
- Attach files to comments
- React to comments (emoji reactions)

**Notifications:**
- @mentioned users receive notification
- Task followers receive notification for new comments
- Comment replies notify original commenter

#### 4.1.8 Before Images Section

**Responsibility:** Display images taken before work started

**Fields:**
- Before Images (list of files)
- Each image has:
  - File (File object)
  - Uploaded At (timestamp)
  - Uploaded By (user link)
  - Description (text, optional)
  - GPS Coordinates (optional, future feature)
  - Timestamp (from image metadata, if available)

**Capabilities:**
- Upload before images
- View before images (gallery view)
- Download before images
- Delete before images (uploaded by user or manager/admin)
- Add description to images
- Zoom images
- Compare with after images (side-by-side view)

**Validation:**
- Before images optional for most task types
- Before images required for Project Tasks and Installation Tasks
- Maximum 10 images per task
- Supported formats: JPG, PNG, WEBP
- Maximum file size: 10MB per image

#### 4.1.9 Progress Images Section

**Responsibility:** Display images taken during work progress

**Fields:**
- Progress Images (list of files)
- Each image has:
  - File (File object)
  - Uploaded At (timestamp)
  - Uploaded By (user link)
  - Description (text, optional)
  - Progress Stage (dropdown, optional)
  - GPS Coordinates (optional, future feature)

**Capabilities:**
- Upload progress images
- View progress images (gallery view)
- Download progress images
- Delete progress images
- Add description to images
- Add progress stage label
- Filter by progress stage
- Timeline view of progress images

**Validation:**
- Progress images optional
- Maximum 20 images per task
- Same format and size limits as before images

#### 4.1.10 After Images Section

**Responsibility:** Display images taken after work completion

**Fields:**
- After Images (list of files)
- Each image has:
  - File (File object)
  - Uploaded At (timestamp)
  - Uploaded By (user link)
  - Description (text, optional)
  - GPS Coordinates (optional, future feature)
  - Timestamp (from image metadata, if available)

**Capabilities:**
- Upload after images
- View after images (gallery view)
- Download after images
- Delete after images (uploaded by user or manager/admin)
- Add description to images
- Zoom images
- Compare with before images (side-by-side view)
- Compare with progress images

**Validation:**
- After images MANDATORY for task completion
- Minimum 1 after image required
- Maximum 10 after images per task
- Same format and size limits as before images
- Cannot move to Review status without at least 1 after image

#### 4.1.11 Attachments Section

**Responsibility:** Manage task-related documents and files

**Fields:**
- Attachments (list of files)
- Each attachment has:
  - File (File object)
  - File Name (string)
  - File Size (number)
  - File Type (string)
  - Uploaded At (timestamp)
  - Uploaded By (user link)
  - Description (text, optional)

**Capabilities:**
- Upload attachments
- View attachments (list view)
- Download attachments
- Delete attachments (uploaded by user or manager/admin)
- Add description to attachments
- Preview attachments (if supported format)
- Search attachments by name

**Validation:**
- Attachments optional
- Maximum 20 attachments per task
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, WEBP
- Maximum file size: 25MB per attachment

#### 4.1.12 Linked Records Section

**Responsibility:** Display and manage relationships to other CRM records

**Fields:**
- Linked Module (enum: Leads, Customers, Projects, Estimates, Proposals, Quotations, Invoices, Inventory, Purchases, Finance, Documents, General)
- Linked Record ID (string, ID of linked record)
- Linked Record Name (string, name of linked record)
- Link Type (enum: Related To, Dependent On, Blocks, Duplicate Of, Part Of)

**Capabilities:**
- View linked record details (opens in new tab)
- Navigate to linked record
- Add linked record
- Remove linked record
- Change link type

**Validation:**
- At least one linked record required for most task types
- General Tasks can have no linked record
- Cannot link task to itself
- Circular dependencies not allowed

#### 4.1.13 Time Log Section

**Responsibility:** Track time spent on task

**Fields:**
- Time Entries (list of time entries)
- Each time entry has:
  - Started At (timestamp)
  - Ended At (timestamp, optional if still running)
  - Duration (number, in hours, calculated)
  - Logged By (user link)
  - Description (text, optional)
  - Activity Type (enum: Work, Travel, Meeting, Review)

**Capabilities:**
- Start timer
- Stop timer
- Add manual time entry
- Edit own time entry
- Delete own time entry (or manager/admin)
- View time log (list view)
- Export time log

**Calculations:**
- Total Time: Sum of all time entry durations
- Billable Time: Sum of billable time entries
- Non-billable Time: Sum of non-billable time entries

**Validation:**
- Time logging optional for most tasks
- Time logging required for tasks with hourly billing
- Cannot have overlapping time entries
- Minimum time entry: 1 minute

#### 4.1.14 History Section

**Responsibility:** Display comprehensive change history

**Fields:**
- History Items (chronological list)
- Each history item has:
  - Field Changed (string)
  - Old Value (any)
  - New Value (any)
  - Changed By (user link)
  - Changed At (timestamp)
  - Change Type (enum: Create, Update, Delete)

**Capabilities:**
- View all history
- Filter by field
- Filter by date range
- Filter by user
- Compare versions (show difference between two points in time)
- Export history

**Display:**
- Chronological order (newest first)
- Grouped by date
- Field names highlighted
- Old values struck through
- New values highlighted

#### 4.1.15 Verification Section

**Responsibility:** Display verification information and status

**Fields:**
- Verification Status (enum: Pending, Verified, Rejected)
- Verified By (user link, if verified)
- Verified At (timestamp, if verified)
- Verification Notes (rich text)
- Rejection Reason (text, if rejected)
- Verification Checklist (list of verification criteria)
  - Each criterion has:
    - Text (string)
    - Passed (boolean)
    - Notes (text, optional)

**Capabilities:**
- View verification status
- View verification notes
- View rejection reason (if rejected)
- View verification checklist
- Manager can verify task
- Manager can reject task
- Manager can add verification notes

**Validation:**
- Verification required for tasks with incentive value
- Verification required for Project Tasks and Installation Tasks
- Verification notes required when verifying or rejecting
- Verification checklist must be complete before verification

#### 4.1.16 Completion Summary Section

**Responsibility:** Display task completion summary

**Fields:**
- Completion Date (timestamp)
- Completed By (user link)
- Completion Notes (rich text)
- Total Time Spent (number, in hours)
- Total Cost (number, calculated from time and materials)
- Issues Encountered (text, optional)
- Lessons Learned (text, optional)
- Customer Feedback (text, optional)

**Capabilities:**
- View completion summary
- Add completion notes
- Add issues encountered
- Add lessons learned
- Add customer feedback
- Export completion summary

**Validation:**
- Completion summary auto-generated when task completed
- Completion notes required for task completion
- Optional fields can be filled later

#### 4.1.17 Related Tasks Section

**Responsibility:** Display and manage task relationships

**Fields:**
- Related Tasks (list of task relationships)
- Each relationship has:
  - Related Task (task link)
  - Relationship Type (enum: Dependent On, Blocks, Related To, Duplicate Of, Parent Of, Child Of)
  - Direction (enum: Outgoing, Incoming)

**Capabilities:**
- View related tasks
- Add related task
- Remove related task
- Change relationship type
- Navigate to related task
- View dependency graph (visual representation)

**Validation:**
- Circular dependencies not allowed
- Cannot create duplicate relationships
- Parent/Child relationships limited to 3 levels deep

---

## 5. TASK CREATION FLOW

### 5.1 Task Creation Steps

**Step 1: Initiate Task Creation**
- User clicks "Add Task" button
- System opens task creation dialog
- System generates temporary Task ID
- System sets initial status to "Draft"

**Step 2: Select Task Type**
- User selects task type from dropdown
- System shows/hides fields based on task type
- System sets default values for task type

**Step 3: Enter Basic Information**
- User enters task title (required)
- User enters task description (required)
- System validates title is not empty
- System validates description is not empty

**Step 4: Select Linked Record**
- User selects linked module from dropdown
- System shows available records from selected module
- User selects linked record (required for most task types)
- System auto-fills related fields from linked record

**Step 5: Set Assignee and Due Date**
- User selects assignee from dropdown (required)
- User selects due date from date picker (required)
- System validates assignee is selected
- System validates due date is in future

**Step 6: Set Priority**
- User selects priority from dropdown (optional, defaults to Medium)
- System shows priority description and expected response time
- System shows priority color indicator

**Step 7: Add Optional Details**
- User can add checklist items (optional)
- User can upload before images (optional, required for some task types)
- User can add attachments (optional)
- User can set site location (optional, required for some task types)

**Step 8: Set Incentive Value**
- User sets incentive value (optional, defaults to 0)
- System shows payment calculation
- Manager can edit incentive value
- Employee cannot see incentive value (future feature)

**Step 9: Review and Create**
- System shows task summary
- System validates all required fields are filled
- System shows validation errors if any
- User reviews task details
- User clicks "Create Task"

**Step 10: Task Created**
- System saves task to database
- System sets task status to "Assigned"
- System generates final Task ID
- System sends notification to assignee
- System creates activity history entry
- System closes creation dialog
- System redirects to task detail page

### 5.2 Validation Rules

**Required Fields:**
- Title: Must not be empty, max 200 characters
- Description: Must not be empty, max 5000 characters
- Assignee: Must be selected
- Due Date: Must be in future
- Linked Record: Required for all task types except General Task
- Site Location: Required for Site Task, Project Task, Installation Task
- Before Images: Required for Project Task, Installation Task

**Optional Fields:**
- Priority: Defaults to Medium if not set
- Checklist: Optional, but required for tasks requiring verification
- Before Images: Optional for most task types
- Attachments: Optional
- Incentive Value: Optional, defaults to 0
- Estimated Hours: Optional

**Field Validation:**
- Title: No special characters, alphanumeric and spaces only
- Description: Rich text allowed, no script tags
- Due Date: Must be after creation date
- Incentive Value: Must be non-negative number
- Estimated Hours: Must be positive number
- Images: Must be valid image file, max 10MB
- Attachments: Must be valid file, max 25MB

**Business Validation:**
- Assignee must be active employee
- Linked record must exist and be active
- Due date must be within project timeline (if linked to project)
- Incentive value must be within allowed range (if set)
- Cannot create task for completed project
- Cannot create task for cancelled lead/customer

### 5.3 Default Values

**System Defaults:**
- Status: Draft (auto-set)
- Priority: Medium (auto-set)
- Created At: Current timestamp (auto-set)
- Created By: Current user (auto-set)
- Progress: 0% (auto-set)
- Incentive Value: 0 (auto-set)
- Estimated Hours: 0 (auto-set)

**Task Type Defaults:**
- General Task: No linked record required
- Project Task: Linked to Projects module
- Site Task: Linked to Projects module with site context
- Inventory Task: Linked to Inventory module
- Purchase Task: Linked to Purchases module
- Design Task: Linked to Projects module, phase = Design
- Quotation Task: Linked to Quotations module
- Installation Task: Linked to Projects module, phase = Installation
- Maintenance Task: Linked to Projects or General
- Inspection Task: Linked to Projects or General
- Service Task: Linked to Customers module
- Follow-up Task: Linked to Leads, Customers, or Finance module
- Reminder Task: No linked record required

**Priority Defaults:**
- Tasks from overdue projects: High
- Tasks with safety flag: Critical
- Tasks from customer complaints: High
- Tasks from leads: Medium
- All other tasks: Medium

### 5.4 Permission Rules

**Who Can Create Tasks:**
- Employees: Can create tasks for themselves
- Managers: Can create tasks for team members
- Admins: Can create tasks for anyone in workspace
- Super Admins: Can create tasks for anyone in system

**Task Type Restrictions:**
- General Task: Anyone can create
- Project Task: Manager and above
- Site Task: Manager and above
- Inventory Task: Inventory manager and above
- Purchase Task: Purchase manager and above
- Design Task: Design manager and above
- Quotation Task: Sales manager and above
- Installation Task: Project manager and above
- Maintenance Task: Maintenance manager and above
- Inspection Task: Quality manager and above
- Service Task: Service manager and above
- Follow-up Task: Sales manager and above
- Reminder Task: Anyone can create

**Incentive Value Permissions:**
- Employees: Cannot set incentive value
- Managers: Can set incentive value up to approved limit
- Admins: Can set any incentive value
- Super Admins: Can set any incentive value

---

## 6. TASK COMPLETION FLOW

### 6.1 Task Completion Lifecycle

**Stage 1: Task Assignment**
- Task created and assigned to employee
- Employee receives notification
- Task appears in employee's "My Tasks"
- Status: Assigned

**Stage 2: Task Acceptance**
- Employee reviews task details
- Employee clicks "Accept" or starts work
- Status changes to Accepted
- Activity logged: "Task accepted by [employee]"
- Notification sent to task creator

**Stage 3: Before Work Documentation**
- Employee reviews before images (if provided)
- Employee uploads additional before images if needed
- Employee reviews checklist (if provided)
- Status: Accepted

**Stage 4: Work Execution**
- Employee starts work
- Status changes to In Progress
- Employee can start time tracking
- Employee can upload progress images
- Employee can update progress percentage
- Employee can add checklist items as complete
- Activity logged: "Task started by [employee]"

**Stage 5: Progress Updates**
- Employee uploads progress images
- Employee updates progress percentage
- Employee adds time entries
- Employee can update description
- Activity logged for each progress update

**Stage 6: Blocking Issues**
- If issue arises, employee can mark task as Blocked
- Employee must provide blocking reason
- Manager receives notification
- Task cannot proceed until unblocked
- Activity logged: "Task blocked by [employee]: [reason]"

**Stage 7: Work Completion**
- Employee completes all work
- Employee completes all checklist items
- Employee stops time tracking
- Status: In Progress

**Stage 8: After Work Documentation**
- Employee uploads after images (MANDATORY)
- Minimum 1 after image required
- Employee adds completion notes (MANDATORY)
- Employee reviews all documentation
- Activity logged: "After images uploaded by [employee]"
- Activity logged: "Completion notes added by [employee]"

**Stage 9: Submission for Review**
- Employee clicks "Submit for Review"
- Status changes to Review
- Task moves to verification queue
- Manager receives notification
- Activity logged: "Task submitted for review by [employee]"

**Stage 10: Verification**
- Manager reviews task details
- Manager reviews before images
- Manager reviews after images
- Manager compares before/after images
- Manager reviews completion notes
- Manager reviews time log
- Manager completes verification checklist

**Stage 11: Verification Decision**
- Manager has two options:
  - **Verify:** Task meets quality standards
  - **Reject:** Task does not meet quality standards

**Stage 12A: Verification (Approved)**
- Manager clicks "Verify"
- Manager adds verification notes (MANDATORY)
- Status changes to Verified
- Incentive payment unlocked
- Employee receives notification
- Activity logged: "Task verified by [manager]"
- System auto-changes status to Completed

**Stage 12B: Rejection**
- Manager clicks "Reject"
- Manager adds rejection reason (MANDATORY)
- Status changes to Rejected
- Employee receives notification with rejection reason
- Incentive payment not issued
- Activity logged: "Task rejected by [manager]: [reason]"

**Stage 13A: Task Completed**
- Status: Completed
- Task archived after 30 days
- Completion summary generated
- Performance metrics updated
- Payment processed
- Activity logged: "Task completed"

**Stage 13B: Task Reopened**
- Employee reviews rejection reason
- Employee addresses issues
- Employee uploads new after images if needed
- Employee clicks "Reopen and Resubmit"
- Status changes to Reopened
- Activity logged: "Task reopened by [employee]"
- Employee can resubmit for review

### 6.2 Photo Proof Workflow

**Before Images:**
- Purpose: Document initial state
- When: Before work starts
- Who: Employee or manager
- Required: For Project Tasks and Installation Tasks
- Optional: For other task types
- Validation: Maximum 10 images, max 10MB each

**Progress Images:**
- Purpose: Document work progress
- When: During work execution
- Who: Employee
- Optional: For all task types
- Validation: Maximum 20 images, max 10MB each
- Use: Track progress stages

**After Images:**
- Purpose: Document completed work
- When: After work completion
- Who: Employee (MANDATORY)
- Required: For all tasks requiring verification
- Validation: Minimum 1 image, maximum 10 images, max 10MB each
- Cannot submit for review without after images

**Image Comparison:**
- System provides side-by-side comparison
- System highlights differences
- System supports zoom and pan
- System supports image annotations (future feature)

### 6.3 Verification Workflow

**Verification Queue:**
- Tasks in Review status appear in verification queue
- Queue sorted by priority (Critical first)
- Queue sorted by due date (overdue first)
- Managers can filter queue by assignee, project, site

**Verification Process:**
1. Manager opens task from verification queue
2. Manager reviews task details
3. Manager reviews before images
4. Manager reviews after images
5. Manager compares before/after images
6. Manager reviews completion notes
7. Manager reviews time log
8. Manager completes verification checklist
9. Manager makes verification decision

**Verification Checklist:**
- Work completed according to specifications
- Quality standards met
- Safety requirements followed
- Before/after comparison satisfactory
- Completion notes adequate
- Time log reasonable
- No issues identified

**Verification Decision:**
- **Verify:** All checklist items passed, verification notes provided
- **Reject:** Any checklist item failed, rejection reason provided

**Verification Notifications:**
- Employee notified of verification decision
- Task creator notified of verification decision
- Project manager notified (if linked to project)

### 6.4 Payment Workflow

**Payment Trigger:**
- Payment triggered when task verified
- Incentive value added to employee's payable
- Payment processed in next salary cycle

**Payment Calculation:**
- Base incentive value (set at creation)
- Adjustments (bonuses, penalties)
- Final payment = base + adjustments

**Payment Status:**
- Pending: Task not yet verified
- Approved: Task verified, payment approved
- Processed: Payment processed
- Paid: Payment completed

**Payment Notifications:**
- Employee notified when payment approved
- Employee notified when payment processed
- Employee notified when payment paid

---

## 7. IMAGES

### 7.1 Image Storage Strategy

**Current Implementation:**
- Images stored as `File[]` objects in frontend
- No backend storage implemented yet
- Images exist in browser memory only
- Images lost on page refresh

**Future Backend Implementation:**
- Images will be uploaded to AWS S3
- S3 bucket: `peb-crm-task-images`
- Folder structure: `{workspace_id}/{project_id}/{task_id}/{image_type}/`
- Image types: `before`, `progress`, `after`
- File naming: `{timestamp}_{user_id}_{original_filename}`
- Image URLs stored in database
- Frontend stores image URLs, not File objects

**Current Frontend Handling:**
- Images remain as `File[]` type
- No conversion to base64
- No IndexedDB storage
- No LocalStorage storage
- Images uploaded with task creation/completion
- Images sent to backend as multipart/form-data

### 7.2 Image Validation

**File Type Validation:**
- Allowed formats: JPG, JPEG, PNG, WEBP
- Validation performed on file upload
- Invalid files rejected with error message

**File Size Validation:**
- Maximum file size: 10MB per image
- Validation performed on file upload
- Oversized files rejected with error message

**Image Count Validation:**
- Before images: Maximum 10
- Progress images: Maximum 20
- After images: Maximum 10
- Validation performed before submission
- Exceeding limits prevented with error message

**Image Quality Validation:**
- Minimum resolution: 640x480 pixels
- Maximum resolution: 4096x4096 pixels
- Validation performed on file upload
- Out-of-spec images rejected with warning

### 7.3 Image Display

**Gallery View:**
- Grid layout for multiple images
- Thumbnail preview
- Full-size view on click
- Image metadata display (upload date, uploader)
- Image description display

**Comparison View:**
- Side-by-side before/after comparison
- Slider to reveal before/after
- Zoom and pan support
- Image annotations (future feature)

**Timeline View:**
- Progress images displayed chronologically
- Grouped by progress stage
- Timeline visualization

### 7.4 Image Metadata

**Captured Metadata:**
- Original filename
- File size
- File type
- Upload timestamp
- Uploader user ID
- Image description (user-provided)
- GPS coordinates (future feature)
- EXIF data (future feature)

**Future Metadata:**
- GPS coordinates from device
- Timestamp from EXIF data
- Camera information
- Image dimensions

---

## 8. MODULE CONNECTIONS

### 8.1 Dashboard Connection

**Connection Type:** Task data displayed in dashboard widgets

**Data Flow:**
- Task module provides task statistics to dashboard
- Dashboard displays:
  - Open tasks count
  - Overdue tasks count
  - Completed today count
  - Pending verification count
  - My tasks summary
  - Team performance summary

**Frontend Relationship:**
- Dashboard imports task statistics from task module
- Dashboard calls task module hooks: `useTaskStats`, `useMyTasks`
- No backend integration (frontend only)

**User Actions:**
- Click on dashboard widget → Navigate to task module
- Click on task in dashboard → Open task detail page

### 8.2 Lead Connection

**Connection Type:** Tasks linked to leads

**Data Flow:**
- Lead module provides lead information to task module
- Task module displays linked lead details
- Task module can create tasks from leads

**Frontend Relationship:**
- Task creation dialog can select lead as linked record
- Task detail page displays linked lead information
- Lead detail page can show related tasks
- No backend integration (frontend only)

**Linked Fields:**
- Lead ID
- Lead Name
- Lead Status
- Lead Contact Information

**User Actions:**
- From lead: Create follow-up task
- From task: Navigate to linked lead
- From task: View lead details

### 8.3 Customer Connection

**Connection Type:** Tasks linked to customers

**Data Flow:**
- Customer module provides customer information to task module
- Task module displays linked customer details
- Task module can create tasks from customers

**Frontend Relationship:**
- Task creation dialog can select customer as linked record
- Task detail page displays linked customer information
- Customer detail page can show related tasks
- No backend integration (frontend only)

**Linked Fields:**
- Customer ID
- Customer Name
- Customer Status
- Customer Contact Information
- Customer Site Locations

**User Actions:**
- From customer: Create service task
- From task: Navigate to linked customer
- From task: View customer details

### 8.4 Project Connection

**Connection Type:** Tasks linked to projects

**Data Flow:**
- Project module provides project information to task module
- Task module displays linked project details
- Task module can create tasks from projects
- Task module updates project progress based on task completion

**Frontend Relationship:**
- Task creation dialog can select project as linked record
- Task detail page displays linked project information
- Project detail page can show related tasks
- Project progress calculated from task progress
- No backend integration (frontend only)

**Linked Fields:**
- Project ID
- Project Name
- Project Status
- Project Phase
- Project Timeline
- Project Site Location
- Project Team

**User Actions:**
- From project: Create project task
- From task: Navigate to linked project
- From task: View project details
- From project: View task progress

### 8.5 Inventory Connection

**Connection Type:** Tasks linked to inventory items

**Data Flow:**
- Inventory module provides inventory information to task module
- Task module displays linked inventory details
- Task module can create inventory tasks

**Frontend Relationship:**
- Task creation dialog can select inventory item as linked record
- Task detail page displays linked inventory information
- Inventory detail page can show related tasks
- No backend integration (frontend only)

**Linked Fields:**
- Inventory Item ID
- Item Name
- Item Category
- Current Stock
- Location
- Unit of Measure

**User Actions:**
- From inventory: Create inventory task
- From task: Navigate to linked inventory
- From task: View inventory details

### 8.6 Documents Connection

**Connection Type:** Tasks linked to documents

**Data Flow:**
- Documents module provides document information to task module
- Task module can attach documents to tasks
- Task module can link to documents

**Frontend Relationship:**
- Task attachments can include documents
- Task detail page can link to documents
- Document detail page can show related tasks
- No backend integration (frontend only)

**Linked Fields:**
- Document ID
- Document Name
- Document Type
- Document URL
- Document Date

**User Actions:**
- From task: Attach document
- From task: Link to document
- From document: View related tasks

### 8.7 Finance Connection

**Connection Type:** Tasks linked to financial records

**Data Flow:**
- Finance module provides financial information to task module
- Task module displays incentive value and payment status
- Task completion triggers payment calculation

**Frontend Relationship:**
- Task detail page displays incentive value
- Task detail page displays payment status
- Finance module displays task-related payments
- Salary module includes task incentives
- No backend integration (frontend only)

**Linked Fields:**
- Invoice ID (if applicable)
- Payment ID
- Payment Status
- Payment Amount
- Payment Date

**User Actions:**
- From task: View payment status
- From finance: View task-related payments
- From salary: View task incentives

### 8.8 Settings Connection

**Connection Type:** Task module settings

**Data Flow:**
- Settings module provides task module configuration
- Task module uses settings for default values, validation rules

**Frontend Relationship:**
- Task module reads settings from settings module
- Settings module provides:
  - Default priority
  - Default task types per user role
  - Incentive value limits
  - Image upload limits
  - Validation rules
- No backend integration (frontend only)

**Settings Fields:**
- Default task priority
- Allowed task types per role
- Maximum incentive value per role
- Image upload limits
- Task completion requirements
- Verification requirements

### 8.9 Notifications Connection

**Connection Type:** Task notifications

**Data Flow:**
- Task module triggers notifications
- Notifications module displays task notifications
- Notifications module handles notification delivery

**Frontend Relationship:**
- Task module calls notification service
- Notification service creates notification
- Notification center displays task notifications
- No backend integration (frontend only)

**Notification Types:**
- Task assigned
- Task accepted
- Task completed
- Task verified
- Task rejected
- Task overdue
- Task mentioned
- Task comment added

**Notification Fields:**
- Notification ID
- Notification Type
- Task ID
- Task Title
- Message
- Recipient User ID
- Timestamp
- Read Status

### 8.10 Performance Connection

**Connection Type:** Task performance metrics

**Data Flow:**
- Task module provides task completion data to performance module
- Performance module calculates employee performance
- Performance module displays performance metrics

**Frontend Relationship:**
- Performance module imports task data from task module
- Performance module calls task module hooks: `useEmployeePerformance`
- Performance module calculates:
  - Tasks assigned
  - Tasks completed
  - Completion rate
  - On-time completion rate
  - Average completion time
  - Total incentives earned
- No backend integration (frontend only)

**Performance Fields:**
- Employee ID
- Tasks Assigned
- Tasks Completed
- Tasks Pending
- Tasks Overdue
- Completion Rate
- On-time Completion Rate
- Average Completion Time
- Total Incentives Earned
- Performance Score

### 8.11 Salary Connection

**Connection Type:** Task incentives in salary calculation

**Data Flow:**
- Task module provides verified task incentives to salary module
- Salary module calculates total salary including task incentives
- Salary module displays salary breakdown

**Frontend Relationship:**
- Salary module imports task data from task module
- Salary module calls task module hooks: `useSalaryAdjustments`
- Salary module calculates:
  - Base salary
  - Task incentives
  - Bonuses
  - Deductions
  - Final payable
- No backend integration (frontend only)

**Salary Fields:**
- Employee ID
- Base Salary
- Task Incentives
- Bonuses
- Deductions
- Advances
- Final Payable
- Payment Status

---

## 9. NOTIFICATIONS

### 9.1 Notification Types

**Task Assigned**
- **Trigger:** Task assigned to employee
- **Recipient:** Assigned employee
- **Message format:** "You have been assigned a new task: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** Medium
- **Popup:** Yes
- **Bell:** Yes

**Task Mention**
- **Trigger:** User @mentioned in task comment or description
- **Recipient:** Mentioned user
- **Message format:** "[user] mentioned you in task: [task title]"
- **Action:** Redirect to task detail page with comment highlighted
- **Priority:** Medium
- **Popup:** Yes
- **Bell:** Yes

**Due Today**
- **Trigger:** Task due date is today
- **Recipient:** Assigned employee
- **Message format:** "Task due today: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** High
- **Popup:** Yes
- **Bell:** Yes

**Overdue**
- **Trigger:** Task due date has passed
- **Recipient:** Assigned employee, Manager
- **Message format:** "Task overdue: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** Critical
- **Popup:** Yes
- **Bell:** Yes

**Completed**
- **Trigger:** Task marked as completed
- **Recipient:** Task creator, Project manager (if linked to project)
- **Message format:** "Task completed: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** Medium
- **Popup:** No
- **Bell:** Yes

**Rejected**
- **Trigger:** Task verification rejected
- **Recipient:** Assigned employee
- **Message format:** "Task rejected: [task title]. Reason: [rejection reason]"
- **Action:** Redirect to task detail page
- **Priority:** High
- **Popup:** Yes
- **Bell:** Yes

**Comment Added**
- **Trigger:** New comment added to task
- **Recipient:** Task followers, Comment author (for their own comments)
- **Message format:** "[user] commented on task: [task title]"
- **Action:** Redirect to task detail page with comment highlighted
- **Priority:** Low
- **Popup:** No
- **Bell:** Yes

**Verification Required**
- **Trigger:** Task submitted for review
- **Recipient:** Manager, Admin
- **Message format:** "Task requires verification: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** High
- **Popup:** Yes
- **Bell:** Yes

**Reminder**
- **Trigger:** Scheduled reminder for task
- **Recipient:** Assigned employee
- **Message format:** "Reminder: [task title] due in [time]"
- **Action:** Redirect to task detail page
- **Priority:** Medium
- **Popup:** Yes
- **Bell:** Yes

**Task Accepted**
- **Trigger:** Employee accepted task
- **Recipient:** Task creator
- **Message format:** "[employee] accepted task: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** Low
- **Popup:** No
- **Bell:** Yes

**Task Verified**
- **Trigger:** Task verified by manager
- **Recipient:** Assigned employee
- **Message format:** "Task verified: [task title]"
- **Action:** Redirect to task detail page
- **Priority:** Medium
- **Popup:** Yes
- **Bell:** Yes

### 9.2 Notification Delivery

**Popup Notifications:**
- Displayed in browser popup
- Auto-dismiss after 5 seconds
- Can be manually dismissed
- Click to navigate to task
- Stack multiple notifications

**Bell Notifications:**
- Displayed in notification bell icon
- Show unread count
- Persist until read
- Click to open notification center
- Mark as read on click

**Email Notifications (Future):**
- Email sent for critical notifications
- Email digest for non-critical notifications
- User can configure email preferences

**Push Notifications (Future):**
- Mobile push notifications
- Browser push notifications
- User can configure push preferences

### 9.3 Notification Center

**Notification Center Features:**
- List all notifications
- Filter by notification type
- Filter by date range
- Filter by read/unread status
- Mark all as read
- Delete notifications
- Notification settings

**Notification Display:**
- Chronological order (newest first)
- Grouped by date
- Notification type icons
- Task title preview
- Timestamp
- Read/unread indicator

### 9.4 Notification Preferences

**User Preferences:**
- Enable/disable popup notifications
- Enable/disable bell notifications
- Enable/disable email notifications (future)
- Enable/disable push notifications (future)
- Notification frequency settings

**Default Preferences:**
- Popup notifications: Enabled for Critical and High priority
- Bell notifications: Enabled for all
- Email notifications: Disabled (future)
- Push notifications: Disabled (future)

---

## 10. PERMISSIONS

### 10.1 Role Definitions

**Employee**
- Basic task execution role
- Can view and edit own tasks
- Cannot manage other users' tasks
- Cannot verify tasks
- Cannot approve payments

**Manager**
- Team management role
- Can view and edit team tasks
- Can verify team tasks
- Can reassign tasks within team
- Cannot approve payments (future feature)

**Admin**
- Workspace management role
- Can view and edit all tasks in workspace
- Can verify all tasks in workspace
- Can reassign any task in workspace
- Can approve payments (future feature)

**Super Admin**
- System management role
- Can view and edit all tasks in system
- Can verify all tasks in system
- Can reassign any task in system
- Can approve payments (future feature)
- Can manage system settings

### 10.2 Permission Matrix

| Action | Employee | Manager | Admin | Super Admin |
|--------|----------|---------|-------|-------------|
| View Own Tasks | Yes | Yes | Yes | Yes |
| View Team Tasks | No | Yes | Yes | Yes |
| View All Tasks | No | No | Yes | Yes |
| Create Tasks (Self) | Yes | Yes | Yes | Yes |
| Create Tasks (Team) | No | Yes | Yes | Yes |
| Create Tasks (All) | No | No | Yes | Yes |
| Edit Own Tasks | Yes | Yes | Yes | Yes |
| Edit Team Tasks | No | Yes | Yes | Yes |
| Edit All Tasks | No | No | Yes | Yes |
| Delete Own Tasks | Yes | Yes | Yes | Yes |
| Delete Team Tasks | No | Yes | Yes | Yes |
| Delete All Tasks | No | No | Yes | Yes |
| Reassign Own Tasks | No | Yes | Yes | Yes |
| Reassign Team Tasks | No | Yes | Yes | Yes |
| Reassign All Tasks | No | No | Yes | Yes |
| Verify Tasks | No | Yes (team) | Yes (workspace) | Yes (all) |
| Approve Payments | No | No | Yes | Yes |
| Reject Tasks | No | Yes (team) | Yes (workspace) | Yes (all) |
| Set Incentive Value | No | Yes (within limit) | Yes (any) | Yes (any) |
| View Incentive Value | No | Yes (team) | Yes (workspace) | Yes (all) |
| View Performance (Self) | Yes | Yes | Yes | Yes |
| View Performance (Team) | No | Yes | Yes | Yes |
| View Performance (All) | No | No | Yes | Yes |
| Manage Settings | No | No | Yes | Yes |

### 10.3 Field-Level Permissions

**Sensitive Fields:**
- Incentive Value: Hidden from employees, visible to managers and above
- Payment Details: Hidden from employees, visible to admins and above
- Salary Information: Hidden from employees, visible to admins and above
- Performance Scores: Visible to all, but detailed breakdown hidden from employees

**Editable Fields:**
- Task Title: Employee can edit own tasks, Manager can edit team tasks
- Task Description: Employee can edit own tasks, Manager can edit team tasks
- Task Status: Employee can change own task status (within allowed transitions)
- Task Priority: Manager and above can change
- Task Assignee: Manager and above can change
- Task Due Date: Employee can extend own task due date (with reason), Manager can change any
- Incentive Value: Manager and above can change (within limits)

**Read-Only Fields:**
- Task ID: Read-only for all
- Created At: Read-only for all
- Created By: Read-only for all
- Verified At: Read-only for all
- Verified By: Read-only for all
- Payment Status: Read-only for all

### 10.4 Task Type Permissions

**Task Type Creation:**
- General Task: Employee can create
- Project Task: Manager and above
- Site Task: Manager and above
- Inventory Task: Inventory manager and above
- Purchase Task: Purchase manager and above
- Design Task: Design manager and above
- Quotation Task: Sales manager and above
- Installation Task: Project manager and above
- Maintenance Task: Maintenance manager and above
- Inspection Task: Quality manager and above
- Service Task: Service manager and above
- Follow-up Task: Sales manager and above
- Reminder Task: Employee can create

### 10.5 Verification Permissions

**Who Can Verify:**
- Manager: Can verify tasks assigned to their team
- Admin: Can verify tasks in their workspace
- Super Admin: Can verify any task in system

**Verification Scope:**
- Manager can only verify team tasks
- Admin can only verify workspace tasks
- Super Admin can verify all tasks

**Verification Override:**
- Super Admin can override any verification
- Super Admin can re-verify rejected tasks

---

## 11. FUTURE BACKEND NOTES

### 11.1 Future AWS S3 Integration

**Current State:**
- Images stored as `File[]` in frontend
- No backend storage
- Images lost on page refresh

**Future Implementation:**
- Images uploaded to AWS S3
- S3 bucket: `peb-crm-task-images`
- Folder structure: `{workspace_id}/{project_id}/{task_id}/{image_type}/`
- Image types: `before`, `progress`, `after`
- File naming: `{timestamp}_{user_id}_{original_filename}`
- Image URLs stored in database
- Frontend stores image URLs instead of File objects

**Upload Flow:**
1. Frontend selects image file
2. Frontend uploads to S3 via signed URL
3. S3 returns image URL
4. Frontend sends image URL to backend
5. Backend stores URL in database
6. Frontend displays image from URL

**Security:**
- Signed URLs for upload (time-limited)
- Public read access for images
- Private write access (authenticated)
- Bucket policies for access control

### 11.2 Future API Implementation

**Current State:**
- Mock API with in-memory data
- No real backend
- No persistence

**Future Implementation:**
- REST API endpoints
- Database persistence
- Real-time updates
- Authentication and authorization

**API Endpoints:**
- GET /api/tasks - List tasks with filters
- GET /api/tasks/:id - Get task by ID
- POST /api/tasks - Create task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task
- POST /api/tasks/:id/complete - Complete task
- POST /api/tasks/:id/verify - Verify task
- POST /api/tasks/:id/reject - Reject task
- GET /api/tasks/stats - Get task statistics
- GET /api/tasks/performance - Get performance metrics

**Authentication:**
- JWT token-based authentication
- Token refresh mechanism
- Role-based access control
- Permission checks on each endpoint

### 11.3 Future Notifications

**Current State:**
- In-memory notification system
- No real delivery
- No persistence

**Future Implementation:**
- Real-time notifications via WebSocket
- Email notifications via SMTP
- Push notifications via FCM
- Notification persistence in database
- Notification preferences in database

**WebSocket Channels:**
- User-specific channel: `user:{user_id}`
- Team channel: `team:{team_id}`
- Workspace channel: `workspace:{workspace_id}`

**Notification Events:**
- task.created
- task.assigned
- task.accepted
- task.completed
- task.verified
- task.rejected
- task.comment_added

### 11.4 Future Audit Logs

**Current State:**
- Activity history stored in task object
- No separate audit log
- No compliance tracking

**Future Implementation:**
- Separate audit log table
- Comprehensive event tracking
- Compliance reporting
- Audit log export

**Audit Events:**
- All task state changes
- All field changes
- All permission changes
- All payment changes
- All verification actions

**Audit Log Fields:**
- Event ID
- Event Type
- User ID
- Task ID
- Old Value
- New Value
- Timestamp
- IP Address
- User Agent

### 11.5 Future Real-time Updates

**Current State:**
- No real-time updates
- Manual refresh required
- No collaborative editing

**Future Implementation:**
- Real-time updates via WebSocket
- Collaborative editing via operational transformation
- Presence indicators
- Live cursors

**Real-time Features:**
- Live task status updates
- Live comment updates
- Live progress updates
- Live presence indicators
- Live typing indicators

---

## 12. OUT OF SCOPE

### 12.1 Features NOT Implementing Now

**Timeline/Gantt View**
- Reason: Complex implementation, requires dependency management
- Future Phase: Phase 4
- Priority: Medium

**Workload View**
- Reason: Requires resource management, capacity planning
- Future Phase: Phase 4
- Priority: Medium

**Automation**
- Reason: Complex workflow engine required
- Future Phase: Phase 5
- Priority: Low

**AI Features**
- Reason: Requires AI infrastructure
- Future Phase: Phase 6
- Priority: Low

**Recurring Tasks**
- Reason: Requires scheduling engine
- Future Phase: Phase 4
- Priority: Medium

**External Integrations**
- Reason: Requires integration infrastructure
- Future Phase: Phase 5
- Priority: Low

**Public API**
- Reason: Requires API infrastructure
- Future Phase: Phase 5
- Priority: Low

**Real-time Collaboration**
- Reason: Requires WebSocket infrastructure
- Future Phase: Phase 5
- Priority: Medium

**AWS S3 Integration**
- Reason: Backend implementation
- Future Phase: Backend Phase
- Priority: High

**Advanced Reporting**
- Reason: Complex reporting engine
- Future Phase: Phase 4
- Priority: Medium

**Custom Fields**
- Reason: Requires schema flexibility
- Future Phase: Phase 4
- Priority: Medium

**Advanced Permissions**
- Reason: Complex permission system
- Future Phase: Phase 4
- Priority: Medium

**Mobile App**
- Reason: Separate development effort
- Future Phase: Mobile Phase
- Priority: High

**Offline Support**
- Reason: Complex sync logic
- Future Phase: Mobile Phase
- Priority: Medium

**Voice Input**
- Reason: Requires speech recognition
- Future Phase: Mobile Phase
- Priority: Low

**QR Code Scanning**
- Reason: Requires camera access
- Future Phase: Mobile Phase
- Priority: Medium

**GPS Location**
- Reason: Requires location services
- Future Phase: Mobile Phase
- Priority: Medium

**Weather Integration**
- Reason: External API integration
- Future Phase: Phase 5
- Priority: Low

**Safety Compliance Integration**
- Reason: Complex compliance system
- Future Phase: Phase 4
- Priority: High

**Equipment Tracking**
- Reason: Separate module required
- Future Phase: Equipment Module
- Priority: Medium

**Material Tracking**
- Reason: Separate module required
- Future Phase: Inventory Module Enhancement
- Priority: Medium

### 12.2 Separation of Future Features

**Phase 3 (Current):**
- Basic task management
- Task detail workspace
- Task creation flow
- Task completion flow
- Basic filtering
- Basic views (list, kanban, calendar)
- Image upload (File[] only)
- Basic notifications
- Basic permissions

**Phase 4:**
- Timeline/Gantt view
- Workload view
- Recurring tasks
- Advanced reporting
- Custom fields
- Advanced permissions
- Safety compliance integration

**Phase 5:**
- Automation
- External integrations
- Public API
- Real-time collaboration
- Weather integration

**Phase 6:**
- AI features
- Advanced analytics
- Predictive capabilities

**Backend Phase:**
- AWS S3 integration
- Real database
- Real API
- Authentication
- Authorization
- Audit logs
- Real-time notifications

**Mobile Phase:**
- Mobile app
- Offline support
- Voice input
- QR code scanning
- GPS location

---

## 13. FINAL ARCHITECTURE SUMMARY

### 13.1 Architecture Principles

**PEB-CRM Specific:**
- Designed for PEB construction workflow
- Integrates with existing PEB CRM modules
- Matches PEB CRM design patterns
- Construction-first mindset
- Field worker optimized

**Employee-First:**
- Simple task creation
- Clear task details
- Easy status updates
- Mobile-friendly interface
- Intuitive navigation

**Admin Visibility:**
- Comprehensive task overview
- Team performance tracking
- Verification workflow
- Payment tracking
- Audit trail

**Enterprise Standards:**
- Role-based permissions
- Activity history
- Notification system
- Module connections
- Scalable architecture

### 13.2 Key Architectural Decisions

**Task Lifecycle:**
- 12 defined statuses with clear transitions
- Verification workflow for quality control
- Payment triggered by verification
- Rejection and reopen capability

**Task Types:**
- 14 task types for different use cases
- Each type has specific requirements
- Linked to appropriate CRM modules
- Construction-specific types included

**Task Workspace:**
- Comprehensive 17-section task detail view
- All information in one location
- Clear section responsibilities
- No visual design, only architecture

**Image Handling:**
- File[] only for now
- Future AWS S3 integration
- Before/progress/after image workflow
- Photo proof mandatory for completion

**Module Connections:**
- Connected to all PEB CRM modules
- Frontend-only relationships
- No backend integration yet
- Clear data flow definitions

**Permissions:**
- 4 role levels (Employee, Manager, Admin, Super Admin)
- Clear permission matrix
- Field-level permissions
- Task type permissions

**Notifications:**
- 11 notification types defined
- Popup and bell notifications
- Notification center architecture
- Future email and push notifications

### 13.3 Implementation Order

**Phase 3: Core Task Management (Current)**
1. Task data model and types
2. Task creation flow
3. Task detail workspace (all 17 sections)
4. Task status transitions
5. Basic filtering and search
6. List view
7. Kanban view
8. Calendar view
9. Image upload (File[] only)
10. Basic notifications
11. Basic permissions
12. Module connections (frontend only)

**Phase 4: Advanced Features**
1. Timeline/Gantt view
2. Workload view
3. Recurring tasks
4. Advanced reporting
5. Custom fields
6. Advanced permissions
7. Safety compliance integration
8. Enhanced filtering
9. Saved views
10. Dashboard widgets

**Phase 5: Automation and Integrations**
1. Workflow automation engine
2. External integrations framework
3. Public API
4. Real-time collaboration
5. Weather integration
6. Advanced notifications
7. Email notifications
8. Push notifications

**Phase 6: AI and Analytics**
1. AI-powered task suggestions
2. Predictive analytics
3. Advanced reporting
4. Performance insights
5. Risk prediction

**Backend Phase:**
1. Database schema design
2. API implementation
3. AWS S3 integration
4. Authentication system
5. Authorization system
6. Real-time notifications (WebSocket)
7. Audit logging
8. Data migration

**Mobile Phase:**
1. Mobile app design
2. Mobile app development
3. Offline support
4. Voice input
5. QR code scanning
6. GPS location
7. Push notifications

---

## CONCLUSION

This architecture document defines the complete information architecture for the PEB CRM Task Module. It is designed specifically for PEB construction workflows, integrating seamlessly with existing PEB CRM modules while adopting best practices from enterprise task management systems.

The architecture is frozen and ready for implementation. All future implementation work should reference this document as the single source of truth.

**Next Steps:**
1. Review and approve architecture
2. Begin Phase 3 implementation
3. Follow implementation order strictly
4. Reference this document for all decisions

**Architecture Version:** 1.0  
**Architecture Status:** Frozen  
**Ready for Implementation:** Yes  
**Next Phase:** Phase 3 - Core Task Management Implementation
