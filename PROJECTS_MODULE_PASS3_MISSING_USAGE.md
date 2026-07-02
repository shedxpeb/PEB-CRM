# Projects Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Projects Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, timeline, charts, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 24  
**Fields Missing from Detail Page:** 1  
**Fields Missing from List Table:** 14  
**Fields Missing from Search:** 18  
**Fields Missing from Filter:** 19  
**Fields Missing from Export:** 13  
**Fields Missing from Timeline:** 24 (timeline uses activity data, not fields)  
**Fields Missing from Charts:** 24 (no charts component exists)  
**Fields Missing from Dashboard:** 22 (only aggregated stats)

---

## Fields Missing from Detail Page

| Field Name | Section | Reason |
|------------|---------|--------|
| pincode | General Information | Not displayed |

**Evidence:** `ProjectViewDrawer.tsx` lines 111-123

**Note:** pincode is not displayed in detail page, though it is in the form. This is acceptable as city/state are sufficient for location context.

---

## Fields Missing from List Table

| Field Name | Section | Reason |
|------------|---------|--------|
| projectType | General Information | Not critical for list view |
| budget | General Information | Not critical for list view |
| startDate | General Information | Not critical for list view |
| endDate | General Information | Not critical for list view |
| location | General Information | Too long for table |
| state | General Information | Not critical (city shown) |
| pincode | General Information | Not critical for list view |
| structureType | PEB Specifications | Not critical for list view |
| roofType | PEB Specifications | Not critical for list view |
| wallType | PEB Specifications | Not critical for list view |
| craneSystem | PEB Specifications | Not critical for list view |
| width | PEB Specifications | Not critical for list view |
| length | PEB Specifications | Not critical for list view |
| height | PEB Specifications | Not critical for list view |
| baySpacing | PEB Specifications | Not critical for list view |
| coveredArea | PEB Specifications | Not critical for list view |
| totalWeight | PEB Specifications | Not critical for list view |
| mezzanine | PEB Specifications | Not critical for list view |
| insulation | PEB Specifications | Not critical for list view |

**Evidence:** `page.tsx` lines 304-413 (baseColumns definition)

**Note:** List table shows essential fields: projectCode, projectName, customerName, status, stage, priority, progress, projectManager, city, value, healthStatus. Custom fields are dynamically added.

---

## Fields Missing from Search

| Field Name | Section | Reason |
|------------|---------|--------|
| projectType | General Information | Not commonly searched |
| priority | General Information | Has filter instead |
| value | General Information | Has filter by health/status |
| budget | General Information | Not commonly searched |
| startDate | General Information | Not commonly searched |
| endDate | General Information | Not commonly searched |
| location | General Information | Too long, covered by city |
| state | General Information | Covered by city |
| pincode | General Information | Not commonly searched |
| structureType | PEB Specifications | Not commonly searched |
| roofType | PEB Specifications | Not commonly searched |
| wallType | PEB Specifications | Not commonly searched |
| craneSystem | PEB Specifications | Not commonly searched |
| width | PEB Specifications | Not commonly searched |
| length | PEB Specifications | Not commonly searched |
| height | PEB Specifications | Not commonly searched |
| baySpacing | PEB Specifications | Not commonly searched |
| coveredArea | PEB Specifications | Not commonly searched |
| totalWeight | PEB Specifications | Not commonly searched |
| mezzanine | PEB Specifications | Not commonly searched |
| insulation | PEB Specifications | Not commonly searched |
| customFields | Custom Fields | Not searchable (dynamic) |

**Evidence:** `page.tsx` lines 146-153 (search logic)

---

## Fields Missing from Filter

| Field Name | Section | Reason |
|------------|---------|--------|
| projectName | General Information | Has search instead |
| projectType | General Information | Not commonly filtered |
| value | General Information | Not commonly filtered |
| budget | General Information | Not commonly filtered |
| startDate | General Information | Not commonly filtered |
| endDate | General Information | Not commonly filtered |
| location | General Information | Has search instead (via city) |
| state | General Information | Not commonly filtered |
| pincode | General Information | Not commonly filtered |
| structureType | PEB Specifications | Not commonly filtered |
| roofType | PEB Specifications | Not commonly filtered |
| wallType | PEB Specifications | Not commonly filtered |
| craneSystem | PEB Specifications | Not commonly filtered |
| width | PEB Specifications | Not commonly filtered |
| length | PEB Specifications | Not commonly filtered |
| height | PEB Specifications | Not commonly filtered |
| baySpacing | PEB Specifications | Not commonly filtered |
| coveredArea | PEB Specifications | Not commonly filtered |
| totalWeight | PEB Specifications | Not commonly filtered |
| mezzanine | PEB Specifications | Not commonly filtered |
| insulation | PEB Specifications | Not commonly filtered |
| customFields | Custom Fields | Not filterable (dynamic) |

**Evidence:** `page.tsx` lines 245-293 (filterConfigs)

---

## Fields Missing from Export

| Field Name | Section | Reason |
|------------|---------|--------|
| projectType | General Information | Not exported |
| budget | General Information | Not exported |
| startDate | General Information | Not exported |
| endDate | General Information | Not exported |
| location | General Information | Not exported |
| state | General Information | Not exported |
| pincode | General Information | Not exported |
| structureType | PEB Specifications | Not exported |
| roofType | PEB Specifications | Not exported |
| wallType | PEB Specifications | Not exported |
| craneSystem | PEB Specifications | Not exported |
| width | PEB Specifications | Not exported |
| length | PEB Specifications | Not exported |
| height | PEB Specifications | Not exported |
| baySpacing | PEB Specifications | Not exported |
| coveredArea | PEB Specifications | Not exported |
| totalWeight | PEB Specifications | Not exported |
| mezzanine | PEB Specifications | Not exported |
| insulation | PEB Specifications | Not exported |
| customFields | Custom Fields | Not exported |

**Evidence:** `page.tsx` lines 494-532 (handleExport function)

**Note:** Export is client-side CSV generation with limited fields. PEB specifications and budget/dates are not exported.

---

## Fields Missing from Timeline

**All Fields** - Timeline uses activity data, not individual project fields.

**Activity Types Displayed:**
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

**Evidence:** `ProjectTimeline.tsx` lines 1-180

**Note:** This is by design. Timeline shows events/activities, not static field values.

---

## Fields Missing from Charts

**All Fields** - No charts component exists for projects module.

**Note:** This is a feature gap, not a field usage issue. Charts should be added for project analytics.

---

## Fields Missing from Dashboard

| Field Name | Section | Reason |
|------------|---------|--------|
| projectName | General Information | Not displayed (only aggregated stats) |
| customerId | General Information | Not displayed (only aggregated stats) |
| projectType | General Information | Not displayed (only aggregated stats) |
| priority | General Information | Not displayed (only aggregated stats) |
| budget | General Information | Not displayed (only aggregated stats) |
| startDate | General Information | Not displayed (only aggregated stats) |
| endDate | General Information | Not displayed (only aggregated stats) |
| location | General Information | Not displayed (only aggregated stats) |
| city | General Information | Not displayed (only aggregated stats) |
| state | General Information | Not displayed (only aggregated stats) |
| pincode | General Information | Not displayed (only aggregated stats) |
| projectManagerId | General Information | Not displayed (only aggregated stats) |
| All PEB Specifications | PEB Specifications | Not displayed (only aggregated stats) |
| customFields | Custom Fields | Not displayed (only aggregated stats) |

**Evidence:** `page.tsx` lines 190-238 (KPI cards)

**Dashboard Stats Used:**
- Total Projects (count)
- Active Projects (status in ACTIVE_STATUSES)
- Delayed Projects (endDate < now and not completed/cancelled)
- Total Revenue (sum of value)

**Note:** This is by design. Dashboard shows high-level metrics only, not individual field values.

---

## Critical Findings

### 1. Budget Missing from Export

**Field:** budget

**Issue:** Budget is not included in export.

**Current Export Fields:** Project Code, Project Name, Customer, Status, Stage, Priority, Progress, Manager, City, Value, Health

**Missing:** budget, startDate, endDate, location, state, pincode, all PEB specifications

**Impact:** Users cannot export budget information for analysis.

**Assessment:** Budget should be added to export for financial analysis.

---

### 2. Dates Missing from Export

**Fields:** startDate, endDate

**Issue:** Start and end dates are not included in export.

**Impact:** Users cannot export timeline information for analysis.

**Assessment:** Dates should be added to export for timeline analysis.

---

### 3. PEB Specifications Not Exported

**Fields:** All PEB specifications (structureType, roofType, wallType, craneSystem, dimensions, etc.)

**Issue:** PEB specifications are not included in export.

**Impact:** Users cannot export technical specifications for analysis.

**Assessment:** This is acceptable. PEB specifications are technical details not commonly needed in export. If needed, can be added later.

---

### 4. No Budget Filter

**Field:** budget

**Issue:** Budget is not in filter.

**Impact:** Users cannot filter projects by budget range.

**Assessment:** Could be improved by adding budget range filter for project value analysis.

---

### 5. No Date Range Filter

**Fields:** startDate, endDate

**Issue:** Date range filter is not available.

**Impact:** Users cannot filter projects by date range.

**Assessment:** Could be improved by adding date range filter for timeline analysis.

---

### 6. No Charts Component

**Issue:** No charts component exists for projects module.

**Impact:** No visual representation of project trends, progress distribution, or other analytics.

**Assessment:** This is a feature gap, not a field usage issue. Charts should be added for better project analytics.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🟡 Consider Adding to Export:**
- budget - Important for financial analysis
- startDate - Important for timeline analysis
- endDate - Important for timeline analysis
- location - Important for full location context

**🟡 Consider Adding to Filter:**
- budget range - Important for project value analysis
- date range - Important for timeline analysis

**🟢 Keep (Current Usage is Good):**
- All general information fields (low visibility in list/search is acceptable)
- All PEB specifications (low visibility is acceptable for technical details)
- Custom fields

**🟢 Keep (Timeline/Charts):**
- Timeline correctly uses activity data, not fields
- Charts need to be added (feature gap, not field issue)

---

**End of Pass 3 Report**
