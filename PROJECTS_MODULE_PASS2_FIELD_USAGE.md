# Projects Module Field Usage Audit (Pass 2)

**Generated:** 2025-01-06  
**Scope:** Projects Module Field Usage Across Components  
**Objective:** Trace every field's usage across Create/Edit Form, Detail Page, List Table, Search, Filter, Timeline, Charts, Export, and Dashboard.

---

## Component Mapping

**Components Analyzed:**
1. **Create/Edit Form:** `ProjectForm.tsx` (lines 1-374)
2. **Detail Page:** `ProjectViewDrawer.tsx` (lines 1-223)
3. **List Table:** `page.tsx` (lines 304-413)
4. **Search & Filter:** `page.tsx` (lines 137-164, 245-293)
5. **Export:** `page.tsx` (lines 494-532)
6. **Timeline:** `ProjectTimeline.tsx` (lines 1-180)
7. **Dashboard:** `page.tsx` (lines 190-238)

---

## Field Usage Matrix

### General Information Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| projectName | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| customerId | ✅ | ✅ | ✅ (ref) | ✅ (customerName) | ✅ (customerName) | ❌ | ❌ | ❌ | ✅ (customerName) | ❌ |
| projectType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| priority | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| value | ✅ | ✅ | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ (revenue) |
| budget | ✅ | ✅ | ✅ (KPI) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| startDate | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| endDate | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| location | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| city | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| state | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| pincode | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| projectManagerId | ✅ | ✅ | ✅ (projectManager) | ✅ (projectManager) | ✅ (projectManager) | ❌ | ❌ | ❌ | ✅ (projectManager) | ❌ |

**Evidence:**
- **Form:** Lines 109-237 in ProjectForm.tsx
- **Detail Page:** Lines 111-123 in ProjectViewDrawer.tsx
- **List Table:** Lines 304-413 in page.tsx
- **Search:** Lines 146-153 in page.tsx
- **Filter:** Lines 245-293 in page.tsx
- **Export:** Lines 494-532 in page.tsx
- **Dashboard:** Lines 190-238 in page.tsx (KPI cards)

---

### PEB Specifications Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| structureType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| roofType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| width | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| length | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| height | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| baySpacing | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| craneSystem | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| wallType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| coveredArea | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| totalWeight | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| mezzanine | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| insulation | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 239-353 in ProjectForm.tsx
- **Detail Page:** Lines 130-147 in ProjectViewDrawer.tsx

**Note:** PEB specifications are only used in Form and Detail Page. They are not displayed in List Table, Search, Filter, or Export.

---

### Custom Fields Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| customFields | ✅ | ✅ | ✅ | ✅ (dynamic) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 355-360 in ProjectForm.tsx
- **Detail Page:** Lines 125-127 in ProjectViewDrawer.tsx
- **List Table:** Lines 415-430 in page.tsx (dynamic custom columns)

---

### System Fields (Not in Form)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| id | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| projectId | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| projectCode | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| customerName | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| leadId | ❌ | ❌ | ✅ (ref) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| status | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ (active) |
| stage | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| progress | ❌ | ❌ | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| designProgress | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| procurementProgress | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| fabricationProgress | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| installationProgress | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| healthStatus | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| timelineHealth | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| budgetHealth | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| materialHealth | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| resourceHealth | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| materialCost | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| procurementCost | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| fabricationCost | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| installationCost | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| profitMargin | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| milestones | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| team | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| boqId | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| designId | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| inventoryReservations | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| createdAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| updatedAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Detail Page:** Lines 66-100 in ProjectViewDrawer.tsx (KPI strip, badges)
- **List Table:** Lines 304-413 in page.tsx
- **Dashboard:** Lines 190-238 in page.tsx (KPI cards)

---

## Usage Statistics

### By Component

**Create Form:** 24 fields (all form fields)  
**Edit Form:** 24 fields (all form fields)  
**Detail Page:** 26 fields (all form fields + system KPIs)  
**List Table:** 10 fields (subset + custom fields)  
**Search:** 6 fields (projectName, projectCode, customerName, city, projectManager, projectId)  
**Filter:** 5 fields (status, stage, priority, city, healthStatus)  
**Timeline:** 0 individual fields (uses activity data)  
**Export:** 11 fields (subset)  
**Dashboard:** 2 fields (value for revenue, status for active count)

### By Field

**High Usage (4+ components):**
- projectName (5 components)
- city (5 components)
- priority (4 components)
- value (4 components)
- status (4 components)
- projectType (3 components)

**Medium Usage (2-3 components):**
- customerId (3 components)
- projectManagerId (3 components)
- budget (2 components)
- startDate (2 components)
- endDate (2 components)
- location (2 components)
- state (2 components)
- structureType (2 components)
- roofType (2 components)
- wallType (2 components)
- craneSystem (2 components)
- width (2 components)
- length (2 components)
- height (2 components)
- baySpacing (2 components)
- coveredArea (2 components)
- totalWeight (2 components)
- mezzanine (2 components)
- insulation (2 components)
- customFields (3 components)

**Low Usage (1 component):**
- pincode (1 component)
- All PEB specifications (2 components - form and detail only)

**Missing Components:**
- **Timeline:** No individual field usage (uses activity data)
- **Charts:** No charts component exists for projects

---

## Search Implementation

**File:** `page.tsx` (lines 146-153)

**Searchable Fields:**
- projectName
- projectCode
- customerName
- city
- projectManager
- projectId

**Search Logic:**
```typescript
const matchesSearch =
  !debouncedSearch ||
  project.projectName.toLowerCase().includes(q) ||
  project.projectCode.toLowerCase().includes(q) ||
  project.customerName.toLowerCase().includes(q) ||
  project.city?.toLowerCase().includes(q) ||
  project.projectManager.toLowerCase().includes(q) ||
  project.projectId.toString().includes(debouncedSearch);
```

---

## Filter Implementation

**File:** `page.tsx` (lines 245-293)

**Filterable Fields:**
- status (line 247-253)
- stage (line 254-260)
- priority (line 261-270)
- city (line 271-280)
- healthStatus (line 281-290)

**Filter Logic:**
```typescript
const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
const matchesStage = stageFilter === 'all' || project.stage === stageFilter;
const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
const matchesCity = cityFilter === 'all' || project.city === cityFilter;
const matchesHealth = healthFilter === 'all' || project.healthStatus === healthFilter;
```

---

## Export Implementation

**File:** `page.tsx` (lines 494-532)

**Exported Fields:**
- Project Code
- Project Name
- Customer
- Status
- Stage
- Priority
- Progress
- Manager
- City
- Value
- Health

**Export Logic:** Client-side CSV generation (not API export like Customer module)

---

## Dashboard Usage

**File:** `page.tsx` (lines 190-238)

**Dashboard KPIs Used:**
- Total Projects (count)
- Active Projects (status in ACTIVE_STATUSES)
- Delayed Projects (endDate < now and not completed/cancelled)
- Total Revenue (sum of value)

**Active Statuses:** Approved, Design, BOQ, Procurement, Fabrication, Dispatch, Installation

---

## Timeline Implementation

**File:** `ProjectTimeline.tsx` (lines 1-180)

**Timeline Usage:** No individual project fields used. Timeline displays activity events.

**Activity Types:**
- project_created
- project_updated
- design_started
- design_completed
- design_uploaded
- boq_created
- boq_updated
- procurement_started
- material_reserved
- purchase_request_created
- fabrication_started
- fabrication_completed
- dispatch_started
- dispatch_completed
- installation_started
- installation_completed
- milestone_completed
- team_assigned
- task_assigned
- status_changed
- stage_changed
- document_uploaded
- note_added
- payment_received
- project_completed
- handover_completed

**Note:** This is by design. Timeline shows events/activities, not static field values.

---

## Charts Implementation

**No charts component exists for projects module.**

**Note:** Charts are not implemented for projects module currently.

---

## Critical Findings

### 1. PEB Specifications - Low Visibility

**Fields:** structureType, roofType, wallType, craneSystem, width, length, height, baySpacing, coveredArea, totalWeight, mezzanine, insulation

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Export ❌
- Timeline ❌
- Charts ❌
- Dashboard ❌

**Impact:** Users cannot filter or search by PEB specifications. These fields are only visible when opening a project's detail page.

**Assessment:** This is acceptable for PEB specifications. These are technical details not commonly searched/filtered. They are available in detail view.

---

### 2. Budget and Dates - Low Visibility

**Fields:** budget, startDate, endDate

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Export ❌ (budget not exported)
- Timeline ❌
- Charts ❌
- Dashboard ❌

**Impact:** Users cannot filter by budget or date ranges. Budget is not exported.

**Assessment:** Could be improved by adding date range filter and budget filter. Budget should be included in export.

---

### 3. Location Details - Partial Visibility

**Fields:** location, state, pincode

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅ (location, state combined)

**Missing from:**
- List Table ❌ (only city shown)
- Search ❌ (only city searched)
- Filter ❌ (only city filtered)
- Export ❌ (only city exported)
- Timeline ❌
- Charts ❌
- Dashboard ❌

**Impact:** Users cannot search or filter by full location, state, or pincode.

**Assessment:** This is acceptable. City is sufficient for regional filtering. Full location is too long for list view.

---

### 4. No Charts Component

**Issue:** No charts component exists for projects module.

**Impact:** No visual representation of project trends, progress distribution, or other analytics.

**Assessment:** This is a feature gap, not a field usage issue. Charts should be added for better project analytics.

---

## Recommendations for Pass 3

Based on the field usage analysis, the following fields should be evaluated in Pass 3:

**🟡 Consider Adding to Filter:**
- budget - Important for project value analysis
- date range (startDate, endDate) - Important for timeline analysis

**🟡 Consider Adding to Export:**
- budget - Currently missing from export
- startDate, endDate - Currently missing from export
- location - Currently missing from export (only city exported)

**🟢 Keep (Current Usage is Good):**
- All general information fields
- All PEB specifications (low visibility is acceptable for technical details)
- Custom fields

**🟢 Keep (Timeline):**
- Timeline correctly uses activity data, not fields

---

**End of Pass 2 Report**
