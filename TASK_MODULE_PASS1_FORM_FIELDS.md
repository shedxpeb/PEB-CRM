# Task Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Task Module Form Fields  
**Objective:** Identify all form fields in Task Create/Edit forms with details.

---

## Form Information

**Components Analyzed:**
- CreateTaskDialog.tsx (lines 1-440)
- types/index.ts (lines 1-591)

**Architecture Note:** Task Management module is a comprehensive task management system with mandatory photo proof for completion, employee performance tracking, payment per task (incentive-based), salary adjustments, verification workflow, and cross-module links. Task module connects to Leads, Customers, Projects, Estimates, Proposals, Quotations, Invoices, Inventory, Purchases, Finance, Documents, and General.

**Form Sections:**
1. Task Create/Edit Form (CreateTaskDialog.tsx)
2. Task Type Definition (types/index.ts)

---

## Field Inventory

### Section 1: Task Create/Edit Form (CreateTaskDialog.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| title | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Basic Info |
| description | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Basic Info |
| assignedUserId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Assignment & Dates |
| assignedUserName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Assignment & Dates (auto-filled) |
| createdBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | System (auto-filled) |
| createdByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | System (auto-filled) |
| dueDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | Assignment & Dates |
| startDate | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Assignment & Dates |
| reminderDate | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Assignment & Dates |
| priority | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | Medium | Must be Low, Medium, High, Critical | Priority & Category |
| category | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | General | Must be valid category | Priority & Category |
| linkedModule | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be valid module | Module Connection |
| linkedRecordId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Module Connection |
| linkedRecordName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Module Connection (auto-filled) |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Module Connection |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Module Connection |
| customerId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Module Connection |
| documentId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Module Connection |
| incentiveValue | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive | Time & Payment |
| estimatedHours | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Time & Payment |
| tags | string[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Tags |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| beforeImages | File[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 10 images | Images |
| checklist | ChecklistItem[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Checklist |

**Evidence:** Lines 42-62 (initial form state), Lines 69-93 (form submission), Lines 165-404 (form fields) in CreateTaskDialog.tsx

**Notes:**
- title, assignedUserId, dueDate are required fields
- assignedUserName, createdBy, createdByName, linkedRecordName are auto-filled
- priority defaults to Medium
- category defaults to General
- incentiveValue defaults to 0
- beforeImages are File[] (frontend only - will be string[] in backend)
- checklist items have text and order fields (id, completed, completedAt, completedBy are system-generated)

---

### Section 2: Task Type Definition (types/index.ts)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| taskId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Format: TSK-XXX | Core Fields |
| title | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Core Fields |
| description | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Core Fields |
| assignedUserId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Assignment |
| assignedUserName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Assignment (auto-filled) |
| createdBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Assignment (auto-filled) |
| createdByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Assignment (auto-filled) |
| startDate | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Dates |
| dueDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | Dates |
| reminderDate | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Dates |
| completedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Dates (system) |
| verifiedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Dates (system) |
| closedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Dates (system) |
| priority | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | Medium | Must be Low, Medium, High, Critical | Status & Priority |
| status | enum | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Pending | Must be valid status | Status & Priority (system) |
| category | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | General | Must be valid category | Status & Priority |
| progress | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be 0-100 | Progress & Time |
| estimatedHours | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Progress & Time |
| timeSpent | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive (if entered) | Progress & Time (system) |
| linkedModule | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be valid module | Cross-Module Links |
| linkedRecordId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Links |
| linkedRecordName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module Links (auto-filled) |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Links |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Links |
| customerId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Links |
| documentId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Links |
| incentiveValue | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive | Payment |
| isPaymentEditable | boolean | ❌ No | ✅ Yes | ❌ No | ✅ Yes | false | - | Payment (system) |
| completionProof | object | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Completion Proof |
| completionProof.beforeImages | File[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 10 images | Completion Proof |
| completionProof.afterImages | File[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 10 images | Completion Proof |
| completionProof.videoUrl | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Completion Proof (future) |
| completionProof.notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Completion Proof |
| completionProof.uploadedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Completion Proof (system) |
| completionProof.uploadedBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Completion Proof (system) |
| completionNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Completion Details |
| completionChecklist | ChecklistItem[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Completion Details |
| verifiedBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Verification (system) |
| verifiedByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Verification (system) |
| verificationNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Verification |
| checklist | ChecklistItem[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Checklist |
| comments | Comment[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Comments |
| attachments | Attachment[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Attachments |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | General Notes |
| internalNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | General Notes |
| activityHistory | TaskActivity[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Activity History (system) |
| createdAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata (system) |
| updatedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata (system) |
| tags | string[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Tags |

**Evidence:** Lines 101-188 in types/index.ts

**Notes:**
- taskId is system-generated (format: TSK-XXX)
- status is system-generated (defaults to Pending)
- progress is 0-100 (calculated from checklist or manual)
- timeSpent is system-generated (actual hours spent)
- isPaymentEditable is system-generated (only for authorized users)
- completionProof is mandatory for task completion (beforeImages, afterImages)
- verifiedBy, verifiedByName, verifiedAt are system-generated (verification workflow)
- activityHistory is system-generated (audit trail)
- createdAt, updatedAt are system-generated (metadata)

---

### Section 3: Checklist Item Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Checklist Item |
| text | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Checklist Item |
| completed | boolean | ❌ No | ✅ Yes | ❌ No | ✅ Yes | false | - | Checklist Item (system) |
| completedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Checklist Item (system) |
| completedBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Checklist Item (system) |
| order | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Checklist Item |

**Evidence:** Lines 60-67 in types/index.ts

**Notes:**
- id, completed, completedAt, completedBy are system-generated
- text and order are user-provided

---

### Section 4: Comment Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Comment |
| taskId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Comment |
| text | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Comment |
| userId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Comment |
| userName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Comment (auto-filled) |
| createdAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Comment (system) |
| updatedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Comment (system) |
| isInternal | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Comment (admin-only) |

**Evidence:** Lines 71-80 in types/index.ts

**Notes:**
- id, userName, createdAt, updatedAt are system-generated
- isInternal is for admin-only comments

---

### Section 5: Attachment Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Attachment |
| taskId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Attachment |
| fileName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Attachment |
| fileType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid type | Attachment |
| fileSize | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive (bytes) | Attachment |
| fileUrl | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Valid URL | Attachment |
| uploadedBy | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Attachment |
| uploadedByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Attachment (auto-filled) |
| uploadedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Attachment (system) |
| description | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Attachment |

**Evidence:** Lines 84-97 in types/index.ts

**Notes:**
- id, uploadedByName, uploadedAt are system-generated
- fileType: Image, PDF, Excel, Word, ZIP, Other

---

### Section 6: Task Activity Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Task Activity |
| taskId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Task Activity |
| activityType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid type | Task Activity |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Task Activity |
| performedBy | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Task Activity |
| performedByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Task Activity (auto-filled) |
| timestamp | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Task Activity (system) |
| metadata | object | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Task Activity |

**Evidence:** Lines 192-226 in types/index.ts

**Notes:**
- id, performedByName, timestamp are system-generated
- activityType: Created, Assigned, Started, In Progress, Blocked, Unblocked, Review, Photos Uploaded, Completed, Verified, Rejected, Closed, Cancelled, Reopened, Reassigned, Priority Changed, Due Date Changed, Progress Updated, Checklist Updated, Comment Added, Attachment Added, Before Images Added, After Images Added

---

### Section 7: Employee Performance Stats Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| employeeId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Employee Performance Stats |
| employeeName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Employee Performance Stats (auto-filled) |
| tasksAssigned | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| tasksCompleted | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| tasksPending | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| tasksOverdue | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| tasksVerified | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| tasksRejected | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Task Counts (calculated) |
| completionRate | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be 0-100 (%) | Performance Metrics (calculated) |
| onTimeCompletionRate | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be 0-100 (%) | Performance Metrics (calculated) |
| averageCompletionTime | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive (days) | Performance Metrics (calculated) |
| baseSalary | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Financial (monthly) |
| verifiedTaskIncentives | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Financial (calculated) |
| bonuses | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Financial |
| advances | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Financial |
| penalties | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Financial |
| finalPayable | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Calculated | Financial (calculated) |
| totalPaymentPending | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Payment Status (calculated) |
| totalPaymentReceived | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Payment Status (calculated) |
| totalPerformanceScore | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Calculated | Performance Score (calculated) |
| rank | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Rankings (calculated) |
| percentile | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be 0-100 | Rankings (calculated) |

**Evidence:** Lines 253-288 in types/index.ts

**Notes:**
- All fields except employeeId are calculated or auto-filled
- finalPayable = Base + Incentives + Bonus - Advance - Penalty
- totalPerformanceScore is calculated based on completion rate, timeliness, quality

---

### Section 8: Salary Adjustment Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Salary Adjustment |
| employeeId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Salary Adjustment |
| employeeName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Salary Adjustment (auto-filled) |
| type | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid type | Adjustment Details |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Adjustment Details |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Adjustment Details |
| reason | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Adjustment Details |
| referenceType | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be valid type | Reference |
| referenceId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Reference |
| referenceName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Reference (auto-filled) |
| status | enum | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Pending | Must be valid status | Status (system) |
| approvedBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Approval (system) |
| approvedByName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Approval (system) |
| approvedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Approval (system) |
| processedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Processing (system) |
| processedBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Processing (system) |
| createdAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata (system) |
| createdBy | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Metadata |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Metadata |

**Evidence:** Lines 292-333 in types/index.ts

**Notes:**
- type: Credit, Deduction, Advance, Bonus, Penalty
- status: Pending, Approved, Rejected, Processed
- referenceType: Task, Manual, Bonus, Penalty, Other

---

### Section 9: Employee Salary Ledger Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| employeeId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Employee Salary Ledger |
| employeeName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Employee Salary Ledger (auto-filled) |
| openingBalance | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Opening Balance |
| taskEarnings | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Earnings (calculated) |
| bonuses | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Earnings |
| otherCredits | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Earnings |
| advances | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Deductions |
| penalties | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Deductions |
| otherDeductions | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Deductions |
| currentPayable | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Calculated | Current Payable (calculated) |
| totalPaid | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Must be positive | Payment History (calculated) |
| lastPaymentDate | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Payment History (calculated) |
| adjustments | SalaryAdjustment[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Adjustments |
| periodStart | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | Period |
| periodEnd | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | Period |

**Evidence:** Lines 337-367 in types/index.ts

**Notes:**
- currentPayable = Opening Balance + Earnings - Deductions
- adjustments is an array of SalaryAdjustment objects
- periodStart and periodEnd define the salary period

---

## Summary Statistics

**Total Fields Identified:** 100+ (across all Task types)

**By Entity:**
- Task: 40+ fields
- ChecklistItem: 6 fields
- Comment: 8 fields
- Attachment: 10 fields
- TaskActivity: 8 fields
- EmployeePerformanceStats: 20+ fields
- SalaryAdjustment: 15+ fields
- EmployeeSalaryLedger: 13+ fields

**By Category:**
- Core Fields: 4 (id, taskId, title, description)
- Assignment Fields: 4 (assignedUserId, assignedUserName, createdBy, createdByName)
- Date Fields: 6 (startDate, dueDate, reminderDate, completedAt, verifiedAt, closedAt)
- Status & Priority Fields: 3 (priority, status, category)
- Progress & Time Fields: 3 (progress, estimatedHours, timeSpent)
- Cross-Module Links: 7 (linkedModule, linkedRecordId, linkedRecordName, projectId, leadId, customerId, documentId)
- Payment Fields: 2 (incentiveValue, isPaymentEditable)
- Completion Proof Fields: 6 (beforeImages, afterImages, videoUrl, notes, uploadedAt, uploadedBy)
- Completion Details Fields: 2 (completionNotes, completionChecklist)
- Verification Fields: 3 (verifiedBy, verifiedByName, verificationNotes)
- Checklist Fields: 1 (checklist)
- Comments Fields: 1 (comments)
- Attachments Fields: 1 (attachments)
- Notes Fields: 2 (notes, internalNotes)
- Activity History Fields: 1 (activityHistory)
- Metadata Fields: 2 (createdAt, updatedAt)
- Tags Fields: 1 (tags)

**By Required Status:**
- Required in Form: 3 (title, assignedUserId, dueDate)
- Optional in Form: 15+ fields
- System Generated: 20+ fields

**By Section:**
- Basic Info: 2
- Assignment & Dates: 4
- Priority & Category: 2
- Module Connection: 5
- Time & Payment: 2
- Tags: 1
- Notes: 1
- Images: 1
- Checklist: 1
- Core Fields: 4
- Dates: 6
- Status & Priority: 3
- Progress & Time: 3
- Cross-Module Links: 7
- Payment: 2
- Completion Proof: 6
- Completion Details: 2
- Verification: 3
- Checklist: 1
- Comments: 1
- Attachments: 1
- Notes: 2
- Activity History: 1
- Metadata: 2
- Tags: 1

---

## Form Behavior Notes

**Task Create Mode:**
- Title is required
- Assigned user is required
- Due date is required
- Priority defaults to Medium
- Category defaults to General
- Incentive value defaults to 0
- Before images are optional (max 10 images)
- Checklist is optional
- Tags are optional
- Notes are optional
- Module connection is optional (can link to Leads, Customers, Projects, Estimates, Proposals, Quotations, Invoices, Inventory, Purchases, Finance, Documents, General)

**Task Edit Mode:**
- All fields can be edited
- Status can be changed (Pending → In Progress → Review → Completed → Verified/Closed)
- Completion proof can be added (beforeImages, afterImages)
- Verification can be done (verifiedBy, verifiedByName, verificationNotes)
- Checklist can be updated
- Comments can be added
- Attachments can be added

**Task Completion Workflow:**
1. Task created with status Pending
2. Task assigned to employee
3. Employee starts task (status: In Progress)
4. Employee uploads before images (completionProof.beforeImages)
5. Employee completes task (status: Completed)
6. Employee uploads after images (completionProof.afterImages)
7. Admin/Manager verifies task (status: Verified or Rejected)
8. If verified, task is closed (status: Closed)
9. If rejected, task is reopened (status: Reopened)

**Payment Workflow:**
- Incentive value is set by Admin/Manager (not full salary)
- Incentive is paid only for verified tasks
- Salary adjustments can be made (Credit, Deduction, Advance, Bonus, Penalty)
- Employee salary ledger tracks all adjustments
- Final payable = Base + Incentives + Bonus - Advance - Penalty

---

## Validation Rules Summary

**Numeric Validation:**
- All amount fields: Must be positive (if entered)
- All time fields: Must be positive (if entered)
- progress: Must be 0-100
- fileSize: Must be positive (bytes)

**String Validation:**
- title: Min 1 char
- description: No validation
- notes: No validation
- taskId: Format TSK-XXX

**Date Validation:**
- All date fields: Date format
- dueDate: Required
- startDate: Optional
- reminderDate: Optional

**Enum Validation:**
- priority: Must be Low, Medium, High, Critical
- status: Must be Pending, In Progress, Blocked, Review, Completed, Cancelled, Reopened
- category: Must be General, Office, Field Work, Maintenance, Installation, Inspection, Documentation, Meeting, Training, Other
- linkedModule: Must be Leads, Customers, Projects, Estimates, Proposals, Quotations, Invoices, Inventory, Purchases, Finance, Documents, General
- fileType: Must be Image, PDF, Excel, Word, ZIP, Other
- adjustmentType: Must be Credit, Deduction, Advance, Bonus, Penalty

**Cross-Field Validation:**
- title, assignedUserId, dueDate are required
- beforeImages: Max 10 images
- afterImages: Max 10 images

**System-Generated Fields:**
- id: Auto-generated
- taskId: Auto-generated (format: TSK-XXX)
- status: Auto-generated (defaults to Pending)
- progress: Calculated from checklist or manual
- timeSpent: Calculated (actual hours spent)
- completedAt: Auto-generated (on completion)
- verifiedAt: Auto-generated (on verification)
- closedAt: Auto-generated (on closure)
- verifiedBy, verifiedByName: Auto-generated (on verification)
- createdAt: Auto-generated
- updatedAt: Auto-generated
- assignedUserName: Auto-filled from assignedUserId
- createdBy, createdByName: Auto-filled from current user
- linkedRecordName: Auto-filled from linkedRecordId
- uploadedByName: Auto-filled from uploadedBy
- performedByName: Auto-filled from performedBy

---

## Architecture Note

**Task Module Entities:**
- Task - Core task entity with assignment, dates, status, priority, cross-module links, payment, completion proof, verification
- ChecklistItem - Checklist item for task completion tracking
- Comment - Comment on task (with internal/admin-only option)
- Attachment - Attachment to task (Image, PDF, Excel, Word, ZIP, Other)
- TaskActivity - Activity history (audit trail)
- EmployeePerformanceStats - Employee performance tracking (task counts, completion rate, financial)
- SalaryAdjustment - Salary adjustment (Credit, Deduction, Advance, Bonus, Penalty)
- EmployeeSalaryLedger - Employee salary ledger (earnings, deductions, payable)

**Key Principles:**
- Task module is a comprehensive task management system
- Mandatory photo proof for completion (beforeImages, afterImages)
- Employee performance tracking (task counts, completion rate, financial)
- Payment per task (incentive-based, not full salary)
- Salary adjustments (Credit, Deduction, Advance, Bonus, Penalty)
- Verification workflow (Admin/Manager verification required)
- Cross-module links (Leads, Customers, Projects, Estimates, Proposals, Quotations, Invoices, Inventory, Purchases, Finance, Documents, General)

---

**End of Pass 1 Report**
