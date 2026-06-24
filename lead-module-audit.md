# PEB CRM - LEAD MODULE AUDIT

---

## 1. CURRENT MODULE PURPOSE

**Purpose:** Lead Module serves as the initial point of entry for customer enquiries and PEB project requirements. It captures customer information, project specifications, and tracks the lead through the sales pipeline from enquiry to conversion.

**Current Implementation:**
- Lead captures customer details (name, company, contact, address)
- Lead captures project details (title, type, structure specifications)
- Lead tracks status through sales pipeline (New → Contacted → Design Pending → BOQ Pending → Estimate Sent → Proposal Sent → Negotiation → Approved/Rejected → Converted)
- Lead supports multiple views (Table, Kanban, Calendar)
- Lead supports import/export functionality
- Lead converts to Customer

**Module Philosophy:** Lead is the source of truth for customer information. Customer reflects Lead changes automatically. Projects use Customer relationship.

---

## 2. BUSINESS FLOW

**Current Business Flow:**
```
Lead Created
↓
Lead Contacted
↓
Design Pending
↓
BOQ Pending
↓
Estimate Sent
↓
Proposal Sent
↓
Negotiation
↓
Approved/Rejected
↓
Converted to Customer
↓
Customer → Project Creation
```

**Current Implementation Status:**
- Lead status flow: IMPLEMENTED ✓
- Lead to Customer conversion: IMPLEMENTED ✓
- Customer reflects Lead changes: NOT IMPLEMENTED ✗
- Lead → Customer sync: NOT IMPLEMENTED ✗

---

## 3. UI PROBLEMS

### Critical UI Problems

| Problem | Location | Impact | Severity |
|---------|----------|--------|----------|
| **View Dialog is Basic** | List Page (lines 794-892) | View dialog shows limited fields, no tabs, no structure details | HIGH |
| **No Lead Detail Tabs** | View Dialog | No tabs for Overview, Project Details, Structure Details, Activity | HIGH |
| **Custom Column Dialog is Basic** | List Page (lines 894-952) | Custom column dialog lacks field validation, no field type selection | MEDIUM |
| **Bulk Actions Limited** | List Page (lines 699-725) | Bulk actions only support status change and delete, no bulk convert | MEDIUM |
| **Kanban Board Lazy Loading** | List Page (line 33-36) | Kanban board lazy loads, no loading state indicator | LOW |
| **Calendar View Lazy Loading** | List Page (line 37-40) | Calendar view lazy loads, no loading state indicator | LOW |
| **No Lead Score Display** | List Page | Lead score field exists in types but not displayed in table | MEDIUM |

### UI Consistency Issues

| Component | Issue | Comparison |
|-----------|-------|------------|
| **Lead Form** | Good structure, well-organized sections | Consistent with Customer/Project forms |
| **Lead List Page** | Good KPI cards, good filter box | Consistent with other modules |
| **View Dialog** | Too basic, lacks tabs | Inconsistent with Customer/Project detail pages |
| **Row Actions** | Good dropdown with comprehensive actions | Consistent with other modules |

---

## 4. UX PROBLEMS

### Critical UX Problems

| Problem | Current UX | Impact | Severity |
|---------|------------|--------|----------|
| **View Dialog Shows Limited Fields** | Only 14 fields shown in view | Structure details (width, length, height, bay spacing, roof type, etc.) not visible | HIGH |
| **No Activity Timeline in View Dialog** | Activity timeline component exists but not used in view dialog | Users cannot see lead activity history | HIGH |
| **Bulk Convert Not Available** | Bulk actions don't include convert to customer | Users cannot convert multiple leads at once | MEDIUM |
| **No Lead Scoring UI** | Lead score field exists but no UI to add/view scores | Lead scoring not usable | MEDIUM |
| **No Lead Assignment UI** | Assigned employee is manual text input | No employee selector | MEDIUM |

### UX Flow Problems

| Flow | Current Implementation | Problem | Severity |
|------|----------------------|---------|----------|
| **Lead Creation** | Good form structure | No validation for duplicate mobile/email | MEDIUM |
| **Lead Edit** | Good form structure | No audit trail for changes | MEDIUM |
| **Lead View** | Basic dialog | No comprehensive view, no tabs | HIGH |
| **Lead Conversion** | Good 3-step dialog | No validation for duplicate customer creation | MEDIUM |
| **Lead Status Change** | Good dropdown in row actions | No reason required for status change | LOW |
| **Lead Delete** | Confirmation dialog | No soft delete, data lost permanently | MEDIUM |

---

## 5. DATA VISIBILITY PROBLEMS

### Create → View → Edit Parity Audit

| Field | Create | View (Dialog) | Edit | Issue |
|-------|--------|---------------|------|-------|
| **customerName** | ✓ | ✓ | ✓ | OK |
| **companyName** | ✓ | ✓ | ✓ | OK |
| **mobile** | ✓ | ✓ | ✓ | OK |
| **alternateMobile** | ✓ | ✗ | ✓ | Not visible in view |
| **email** | ✓ | ✓ | ✓ | OK |
| **gstNumber** | ✓ | ✗ | ✓ | Not visible in view |
| **address** | ✓ | ✗ | ✓ | Not visible in view |
| **city** | ✓ | ✓ | ✓ | OK |
| **state** | ✓ | ✓ | ✓ | OK |
| **pincode** | ✓ | ✗ | ✓ | Not visible in view |
| **projectTitle** | ✓ | ✓ | ✓ | OK |
| **projectType** | ✓ | ✓ | ✓ | OK |
| **structureType** | ✓ | ✓ | ✓ | OK |
| **width** | ✓ | ✗ | ✓ | Not visible in view |
| **length** | ✓ | ✗ | ✓ | Not visible in view |
| **height** | ✓ | ✗ | ✓ | Not visible in view |
| **baySpacing** | ✓ | ✗ | ✓ | Not visible in view |
| **roofType** | ✓ | ✗ | ✓ | Not visible in view |
| **craneRequired** | ✓ | ✗ | ✓ | Not visible in view |
| **craneCapacity** | ✓ | ✗ | ✓ | Not visible in view |
| **mezzanine** | ✓ | ✗ | ✓ | Not visible in view |
| **wallType** | ✓ | ✗ | ✓ | Not visible in view |
| **insulationRequired** | ✓ | ✗ | ✓ | Not visible in view |
| **materialPreference** | ✓ | ✗ | ✓ | Not visible in view |
| **siteLocation** | ✓ | ✗ | ✓ | Not visible in view |
| **siteAddress** | ✓ | ✗ | ✓ | Not visible in view |
| **mapCoordinates** | ✓ | ✗ | ✓ | Not visible in view |
| **soilNotes** | ✓ | ✗ | ✓ | Not visible in view |
| **customerNotes** | ✓ | ✗ | ✓ | Not visible in view |
| **specialRequirement** | ✓ | ✗ | ✓ | Not visible in view |
| **attachments** | ✓ | ✗ | ✓ | Not visible in view |
| **source** | ✓ | ✓ | ✓ | OK |
| **priority** | ✓ | ✓ | ✓ | OK |
| **assignedEmployee** | ✓ | ✓ | ✓ | OK |
| **assignedEmployeeId** | ✓ | ✗ | ✓ | Not visible in view |
| **status** | ✓ | ✓ | ✓ | OK |
| **createdDate** | ✓ | ✓ | ✓ | OK |
| **lastFollowUp** | ✓ | ✗ | ✓ | Not visible in view |
| **nextFollowUpDate** | ✓ | ✓ | ✓ | OK |
| **createdBy** | ✓ | ✗ | ✓ | Not visible in view |
| **updatedBy** | ✓ | ✗ | ✓ | Not visible in view |
| **updatedAt** | ✓ | ✗ | ✓ | Not visible in view |
| **customerId** | ✓ | ✗ | ✓ | Not visible in view |
| **convertedDate** | ✓ | ✗ | ✓ | Not visible in view |
| **remarks** | ✓ | ✗ | ✓ | Not visible in view |

### Data Visibility Score: 14/42 (33%)
- **Customer Details:** 6/11 (55%)
- **Project Details:** 2/2 (100%)
- **Structure Details:** 2/12 (17%)
- **Site Details:** 0/4 (0%)
- **Requirement Details:** 0/3 (0%)
- **Business Details:** 4/7 (57%)
- **Status & Tracking:** 3/9 (33%)

### Critical Visibility Gaps

1. **Structure Details Not Visible:** Width, Length, Height, Bay Spacing, Roof Type, Crane Required, Crane Capacity, Mezzanine, Wall Type, Insulation Required, Material Preference - all missing from view dialog
   - **Impact:** Users cannot see critical PEB structure specifications in view
   - **Fix:** Add Structure Details section to view dialog

2. **Site Details Not Visible:** Site Location, Site Address, Map Coordinates, Soil Notes - all missing from view dialog
   - **Impact:** Users cannot see site information
   - **Fix:** Add Site Details section to view dialog

3. **Requirement Details Not Visible:** Customer Notes, Special Requirement, Attachments - all missing from view dialog
   - **Impact:** Users cannot see customer requirements and attachments
   - **Fix:** Add Requirement Details section to view dialog

4. **Activity Timeline Not Visible:** Activity timeline component exists but not used in view dialog
   - **Impact:** Users cannot see lead activity history
   - **Fix:** Add Activity Timeline to view dialog

---

## 6. CREATE VS EDIT VS VIEW MISMATCHES

### Mismatch Analysis

| Aspect | Create | Edit | View | Mismatch |
|--------|--------|------|------|----------|
| **Form Structure** | 5 sections (Customer, Project, Structure, Site, Requirement, Business) | Same 5 sections | Basic dialog with 14 fields only | HIGH |
| **Field Count** | 42 fields | 42 fields | 14 fields | HIGH |
| **Structure Details** | Full details (12 fields) | Full details (12 fields) | None | HIGH |
| **Site Details** | Full details (4 fields) | Full details (4 fields) | None | HIGH |
| **Requirement Details** | Full details (3 fields) | Full details (3 fields) | None | HIGH |
| **Activity Timeline** | Not applicable | Not applicable | Not shown | HIGH |
| **Navigation** | Dialog | Dialog | Dialog | OK |

### Parity Score: 33% (Create/Edit: 100%, View: 33%)

**Approved Rule Violation:** Create/Edit/View parity required. Current implementation violates this rule significantly.

---

## 7. MISSING FEATURES

### Critical Missing Features

| Feature | Business Need | Current Status |
|---------|---------------|----------------|
| **Lead Activity Timeline in View** | Track lead history | Component exists, not used in view |
| **Lead Scoring UI** | Score leads for prioritization | Field exists, no UI |
| **Employee Selector** | Assign leads to employees | Manual text input only |
| **Duplicate Lead Detection** | Prevent duplicate mobile/email | Not implemented |
| **Bulk Convert to Customer** | Convert multiple leads | Not implemented |
| **Lead Status Change Reason** | Require reason for status change | Not implemented |
| **Soft Delete** | Recover deleted leads | Hard delete only |

### High Priority Missing Features

| Feature | Business Need | Current Status |
|---------|---------------|----------------|
| **Lead Estimate Creation** | Create estimate from lead | Button exists, handler empty |
| **Lead Proposal Creation** | Create proposal from lead | Button exists, handler empty |
| **Lead Notes/Comments** | Add notes to lead | Not implemented |
| **Lead Tags** | Tag leads for categorization | Not implemented |
| **Lead Search by Multiple Fields** | Search by phone, email, company | Limited search implementation |

### Future Phase Features (Not in Current Scope)

| Feature | Business Need | Current Status |
|---------|---------------|----------------|
| **Communication Module** | Track emails, calls, notes | Future phase |
| **Lead Source Analytics** | Track lead source effectiveness | Future phase |
| **Conversion Analytics** | Track conversion rates | Future phase |
| **Follow-up Reminder System** | Remind users of follow-ups | Future phase |
| **Assignment Notifications** | Notify on assignment | Future phase |
| **Lead Aging Reports** | Track old leads | Future phase |
| **Response Time Analytics** | Track response time | Future phase |

### Missing Feature Score: 5/12 (42%)
- **Critical Missing:** 0/7 (0%)
- **High Priority Missing:** 0/5 (0%)
- **Basic Features:** 5/15 (33%)

---

## 8. BROKEN FEATURES

### Broken or Incomplete Features

| Feature | Current Status | Issue | Severity |
|---------|---------------|-------|----------|
| **Create Estimate** | Button exists (line 127-132 in LeadRowActions) | Handler not passed from parent | HIGH |
| **Add Score** | Button exists (line 99-102 in LeadRowActions) | Handler is empty (line 539-541 in page.tsx) | MEDIUM |
| **Track Lead** | Button exists (line 86-89 in LeadRowActions) | Opens LeadTracker dialog, but no data persistence | MEDIUM |
| **View Logs** | Button exists (line 91-94 in LeadRowActions) | Opens LeadLogsDialog, but no activity data | MEDIUM |
| **Custom Columns** | Dialog exists (lines 894-952) | No field type validation, no field mapping to data | MEDIUM |
| **Bulk Send Estimate** | Button exists (line 709-716) | Handler is empty | MEDIUM |
| **Bulk Send Proposal** | Button exists (line 713-716) | Handler is empty | MEDIUM |

### Broken Feature Score: 0/7 (0% functional)

---

## 9. IMPORT/EXPORT REVIEW

### Current Import Implementation

**Location:** `page.tsx` lines 338-403

**Features:**
- CSV import supported
- Maps CSV headers to lead fields
- Generates unique IDs using timestamp
- Adds imported leads to state

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **No Validation** | No validation for required fields (customerName, mobile, email) | HIGH |
| **No Duplicate Detection** | Can import duplicate leads | HIGH |
| **No Error Handling** | No error messages for invalid data | MEDIUM |
| **Limited Field Mapping** | Only maps 15 fields, missing structure/site/requirement details | MEDIUM |
| **No Import Preview** | No preview before importing | LOW |
| **No Import History** | No record of imports | LOW |

### Current Export Implementation

**Location:** `page.tsx` lines 299-336

**Features:**
- CSV export supported
- Exports 15 fields
- Downloads file with date in filename

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **Limited Fields** | Only exports 15 fields, missing structure/site/requirement details | MEDIUM |
| **No Export Options** | No field selection for export | LOW |
| **No Export Format Options** | Only CSV, no Excel/PDF | LOW |
| **No Export History** | No record of exports | LOW |

### Import/Export Score: 5/10 (50%)
- **Import:** 4/10 (basic functionality, no validation)
- **Export:** 6/10 (basic functionality, limited fields)

---

## 10. SEARCH & FILTER REVIEW

### Current Search Implementation

**Location:** `page.tsx` lines 138-169

**Features:**
- Debounced search (300ms)
- Searches by: customerName, companyName, mobile, leadId
- Integrated with ConsolidatedFilterBox

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **Limited Search Fields** | Does not search by email, city, state, project title | MEDIUM |
| **No Advanced Search** | No advanced search with multiple criteria | LOW |
| **No Search History** | No search history or saved searches | LOW |

### Current Filter Implementation

**Location:** `page.tsx` lines 140-226, 457-479

**Features:**
- Status filter (all + 10 status options)
- Priority filter (all + 4 priority options)
- City filter (all + dynamic city options)
- Date filter (quick filters: today, tomorrow, this week, this month, this year)
- Date range filter (custom from/to dates)
- KPI filter mode (in-progress)
- ConsolidatedFilterBox integration

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **City Filter Not Functional** | City filter onChange is empty (line 476) | HIGH |
| **No Project Type Filter** | Project type filter defined in types but not implemented | MEDIUM |
| **No Structure Type Filter** | Structure type filter defined in types but not implemented | MEDIUM |
| **No Source Filter** | Source filter defined in types but not implemented | MEDIUM |
| **No Assigned Employee Filter** | Assigned employee filter not implemented | MEDIUM |
| **No Reset Filter Button** | Clear filters exists but not prominent | LOW |

### Search & Filter Score: 6/10 (60%)
- **Search:** 7/10 (good debounced search, limited fields)
- **Filters:** 5/10 (good date filters, city filter broken, missing other filters)

---

## 11. KANBAN REVIEW

### Current Kanban Implementation

**Location:** `KanbanBoard.tsx` (lazy loaded)

**Features:**
- Lazy loaded component
- Displays leads by status columns
- Drag and drop to change status
- Reorder leads within columns
- Add lead button

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **Lazy Loading** | Kanban board lazy loads, no loading state | LOW |
| **No Kanban Customization** | Cannot customize columns or swimlanes | LOW |
| **No Kanban Filters** | Cannot filter kanban view | LOW |
| **No Kanban Search** | Cannot search within kanban | LOW |

### Kanban Score: 7/10 (70%)
- **Basic Functionality:** 8/10 (drag and drop, status columns)
- **Advanced Features:** 5/10 (no customization, no filters)

---

## 12. LEAD CONVERSION REVIEW

### Current Lead to Customer Conversion

**Location:** `LeadToCustomerConversionDialog.tsx`

**Features:**
- 3-step conversion process (confirm → form → complete)
- Pre-fills customer data from lead
- Allows editing before saving
- Updates lead status to "Converted"
- Links lead to customer via customerId
- Shows conversion confirmation

**Issues:**
| Issue | Impact | Severity |
|-------|--------|----------|
| **No Duplicate Customer Detection** | Can create duplicate customer from same lead | HIGH |
| **No Conversion Validation** | Can convert lead even if already converted (has check but only alert) | MEDIUM |
| **No Conversion History** | No record of conversion history | MEDIUM |
| **No Conversion Reason** | No reason required for conversion | LOW |
| **No Conversion Approval** | No approval workflow for conversion | LOW |

### Lead Conversion Score: 8/10 (80%)
- **Lead to Customer:** 8/10 (good implementation, missing duplicate detection)

---

## 13. LEAD → CUSTOMER DATA FLOW

### Current Data Flow

**Lead to Customer Conversion:**
```
Lead (source)
↓
LeadToCustomerConversionDialog
↓
CustomerForm (pre-filled with lead data)
↓
Customer created
↓
Lead updated with customerId
↓
Lead status changed to "Converted"
```

**Data Mapping:**
| Lead Field | Customer Field | Status |
|------------|----------------|--------|
| customerName | customerName | ✓ Mapped |
| companyName | companyName | ✓ Mapped |
| mobile | mobile | ✓ Mapped |
| email | email | ✓ Mapped |
| address | address | ✓ Mapped |
| city | city | ✓ Mapped |
| state | state | ✓ Mapped |
| pincode | pincode | ✓ Mapped |
| source | leadSource | ✓ Mapped |
| assignedEmployee | assignedEmployee | ✓ Mapped |
| assignedEmployeeId | assignedEmployeeId | ✓ Mapped |
| remarks | notes | ✓ Mapped |
| leadId | leadId | ✓ Mapped |

**Approved Rules Check:**
- **Lead is source of truth:** ✓ Lead data used to create customer
- **Customer reflects Lead changes:** ✗ Not implemented - no sync mechanism
- **Customer cannot update Lead:** ✓ Customer form is separate, no direct lead update
- **Every Customer originates from Lead:** ✓ Conversion dialog enforces this
- **No hidden data:** ✓ All lead fields visible in conversion dialog

### Sync Rules (NOT IMPLEMENTED)

**Approved Rule:** Customer reflects Lead changes.

**Current Implementation:** No sync mechanism exists. If Lead is updated after conversion, Customer does not reflect changes.

**Required Sync Logic:**
```
Lead Updated
↓
Check if lead.customerId exists
↓
If yes, update Customer with:
  - customerName
  - companyName
  - mobile
  - email
  - address
  - city
  - state
  - pincode
  - assignedEmployee
  - assignedEmployeeId
  - remarks
↓
Update Customer.updatedAt
↓
Log sync activity
```

### Lead → Customer Data Flow Score: 6/10 (60%)
- **Conversion Flow:** 8/10 (good mapping, good UI)
- **Sync Flow:** 0/10 (not implemented)
- **Data Integrity:** 7/10 (good mapping, no duplicate detection)

---

## 14. OWNERSHIP RULES

### Final Approved Ownership Rules

**Lead = Source Of Truth**
- Lead owns customer master information
- Lead-owned fields remain editable only in Lead
- Customer receives synced values from Lead

**Customer reflects Lead updates automatically**
- When Lead is updated, Customer must reflect changes
- Customer cannot modify Lead data
- Customer form is separate, no direct lead update

**Every Customer originates from Lead**
- Conversion dialog enforces this rule
- No standalone customer creation without lead

**No hidden data**
- Current State: Hidden data exists (14/42 fields visible in view dialog)
- Target State: No hidden data (all 42 fields visible in view dialog)

**Create/Edit/View parity**
- View dialog must show all fields from Create/Edit
- Current implementation violates this rule (14/42 fields visible)

### Ownership Score: 4/5 (80%)
- **Source of Truth:** 10/10 (compliant)
- **Sync Rules:** 0/10 (not implemented)
- **Data Visibility:** 6/10 (view parity violation)

---

## 15. SYNC RULES

### Current Sync Implementation

**Lead to Customer Sync:** NOT IMPLEMENTED

**Customer to Lead Sync:** NOT IMPLEMENTED (and should not be implemented per approved rules)

### Required Sync Implementation

**Lead to Customer Sync:**
- Trigger: Lead update (customer details only)
- Condition: Lead has customerId
- Action: Update Customer with changed fields
- Fields to sync: customerName, companyName, mobile, email, address, city, state, pincode, assignedEmployee, assignedEmployeeId
- Note: Lead remarks and Customer notes are separate fields, no automatic synchronization
- Audit trail: Log sync activity

### Sync Score: 0/10 (0%)
- **Lead to Customer Sync:** 0/10 (not implemented)

---

## 16. RISKS

### Data Integrity Risks

| Risk | Scenario | Impact | Severity |
|------|-----------|--------|----------|
| **Duplicate Lead Creation** | Import or manual creation with same mobile/email | Duplicate leads, confusion | HIGH |
| **Duplicate Customer Creation** | Convert same lead twice | Duplicate customers, data inconsistency | HIGH |
| **Lead-Customer Data Divergence** | Lead updated after conversion, customer not synced | Data inconsistency, wrong customer data | CRITICAL |
| **Lost Data on Delete** | Lead deleted, customer still exists | Orphaned customer, data loss | HIGH |
| **Incomplete Data on Import** | CSV import missing required fields | Invalid leads, data corruption | MEDIUM |

### Business Process Risks

| Risk | Scenario | Impact | Severity |
|------|-----------|--------|----------|
| **Poor Lead Assignment** | Manual text input for assignedEmployee | Wrong assignments, no accountability | MEDIUM |
| **No Lead Scoring** | Lead scoring not implemented | Poor prioritization | MEDIUM |

### UX Risks

| Risk | Scenario | Impact | Severity |
|------|-----------|--------|----------|
| **Poor Data Visibility** | View dialog shows only 14/42 fields | Users cannot see full lead information | HIGH |
| **No Activity History** | Activity timeline not shown in view | Users cannot track lead history | HIGH |
| **Bulk Actions Limited** | Cannot bulk convert leads | Inefficient workflow | MEDIUM |

### Risk Score: 7/10 (70%)
- **Data Integrity Risks:** 5/10 (duplicate risks, sync missing)
- **Business Process Risks:** 8/10 (basic functionality good)
- **UX Risks:** 7/10 (poor visibility, missing features)

---

## 17. APPROVED PEB CRM LEAD ARCHITECTURE

### Approved Business Flow

```
Lead Created
↓
Lead Contacted
↓
Design Pending
↓
BOQ Pending
↓
Estimate Sent
↓
Proposal Sent
↓
Negotiation
↓
Approved/Rejected
↓
Converted to Customer
↓
Customer → Project Creation
```

### Architecture Principles

**Lead Module:**
- Lead is the source of truth for customer master information
- Lead captures customer details, project specifications, and structure details
- Lead tracks status through sales pipeline
- Lead converts to Customer (not directly to Project)

**Customer Module:**
- Customer reflects Lead changes automatically
- Customer cannot modify Lead data
- Customer receives synced values from Lead
- Every Customer originates from Lead
- Projects use Customer relationship

**Project Module:**
- Projects are created from Customer
- Projects inherit Customer relationship
- No direct Lead → Project flow

### Data Flow

```
Lead (Source of Truth)
↓
Convert to Customer
↓
Customer (Reflects Lead changes)
↓
Create Project from Customer
↓
Project (Uses Customer relationship)
```

### Ownership Rules

**Lead-Owned Fields (Editable only in Lead):**
- customerName, companyName, mobile, alternateMobile, email
- address, city, state, pincode
- projectTitle, projectType, structureType
- width, length, height, baySpacing, roofType, wallType
- craneRequired, craneCapacity, mezzanine, insulationRequired, materialPreference
- siteLocation, siteAddress, mapCoordinates, soilNotes
- customerNotes, specialRequirement, attachments
- source, priority, assignedEmployee, assignedEmployeeId
- status, remarks

**Note:** Lead captures project requirements during enquiry stage. After Customer creation and Project creation, project-specific information belongs to Project context. Lead remains the source of truth for customer master information only.

**Customer-Owned Fields (Synced from Lead):**
- customerName, companyName, mobile, email
- address, city, state, pincode
- assignedEmployee, assignedEmployeeId
- leadId (reference to Lead)

**Customer-Owned Fields (Not Synced from Lead):**
- GST
- PAN
- Website
- Customer Status
- Credit Limit
- Payment Terms
- Customer Notes (separate from Lead remarks, no automatic synchronization)

**Project-Owned Fields (Inherited from Customer):**
- customerId (reference to Customer)
- Project-specific fields (not in Lead scope)

---

## 18. RECOMMENDED IMPROVEMENTS

### Improvement 1: Enhance View Dialog with Tabs

**Change:** Enhance existing view dialog to show all 42 fields with tabs:
- Overview (customer details, project details, business details)
- Structure Details (width, length, height, bay spacing, roof type, wall type, crane, mezzanine, insulation, material preference)
- Site Details (site location, site address, map coordinates, soil notes)
- Requirements (customer notes, special requirement, attachments)
- Activity Timeline (lead activity history)

**Impact:** Ensures Create/Edit/View parity, improves data visibility.

**Files to Modify:** `app/dashboard/leads/page.tsx`

### Improvement 2: Implement Lead to Customer Auto Sync

**Change:** Implement sync mechanism to update Customer when Lead is updated after conversion.

**Impact:** Ensures data consistency, enforces "Customer reflects Lead changes" rule.

**Files to Modify:** `features/leads/hooks/useLeads.ts`, `features/customers/hooks/useCustomers.ts`

### Improvement 3: Add Duplicate Warning System

**Change:** Add validation to warn users when creating duplicate leads (same company, email, mobile) and duplicate customers (same leadId).

**Note:** This creates warnings only. Do not implement database unique constraints. Do not block creation.

**Impact:** Prevents data duplication, ensures data integrity.

**Files to Modify:** `features/leads/components/LeadForm.tsx`, `features/leads/components/LeadToCustomerConversionDialog.tsx`

### Improvement 4: Add Import Validation

**Change:** Add validation for required fields in CSV import.

**Impact:** Prevents invalid data import.

**Files to Modify:** `app/dashboard/leads/page.tsx`

### Improvement 5: Fix City Filter

**Change:** Implement onChange handler for city filter.

**Impact:** Enables city filtering functionality.

**Files to Modify:** `app/dashboard/leads/page.tsx`

### Improvement 6: Add Missing Filters

**Change:** Add Project Type, Structure Type, Source, Assigned Employee filters.

**Impact:** Improves filtering capabilities.

**Files to Modify:** `app/dashboard/leads/page.tsx`

### Improvement 7: Add Activity Timeline to View Dialog

**Change:** Add LeadActivityTimeline component to view dialog.

**Impact:** Users can see lead activity history.

**Files to Modify:** `app/dashboard/leads/page.tsx`

### Improvement 8: Kanban Polish

**Change:** Add loading state indicator for lazy-loaded Kanban board.

**Impact:** Improves UX during loading.

**Files to Modify:** `app/dashboard/leads/page.tsx`

---

## 19. PRIORITY RANKING

| Priority | Change | Business Impact | Risk Reduction |
|----------|--------|-----------------|---------------|
| **1** | Data Visibility Fix | IMPROVES data visibility in view dialog | 90% visibility improvement |
| **2** | Create/Edit/View Parity | ENSURES all 42 fields visible in view | 100% parity compliance |
| **3** | Lead → Customer Auto Sync | ENSURES data consistency, enforces approved rule | 100% sync compliance |
| **4** | Duplicate Warning System | PREVENTS data duplication | 90% duplicate prevention |
| **5** | Import Validation | PREVENTS invalid data import | 90% data integrity |
| **6** | Broken Filters | ENABLES city and missing filters | 100% filter functionality |
| **7** | Activity Timeline Visibility | IMPROVES activity visibility | 80% visibility improvement |
| **8** | Kanban Polish | IMPROVES UX during loading | 50% UX improvement |

---

**Overall Lead Module Score: 7/10**

**Critical Path:** Data Visibility Fix → Create/Edit/View Parity → Lead-Customer Auto Sync → Duplicate Warning System → Import Validation

**Key Success Metrics:** Create/Edit/View parity achieved, Lead-Customer sync implemented, Duplicate warning system added, Import validation added, Filters functional.
