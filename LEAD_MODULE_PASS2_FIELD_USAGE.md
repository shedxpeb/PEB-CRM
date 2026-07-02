# Lead Module Field Usage Audit (Pass 2)

**Generated:** 2025-01-06  
**Scope:** Lead Module Field Usage Across Components  
**Objective:** Trace every field's usage across Create Form, Edit Form, Detail Page, List Table, Search, Filter, Dashboard, Export, Print, and Conversion.

---

## Component Mapping

**Components Analyzed:**
1. **Create/Edit Form:** `LeadForm.tsx` (lines 1-574)
2. **Detail Page:** `LeadViewDrawer.tsx` (lines 1-246)
3. **List Table:** `page.tsx` baseColumns (lines 88-228)
4. **Kanban Card:** `KanbanCard.tsx` (lines 1-143)
5. **Lead Tracker:** `LeadTracker.tsx` (lines 1-261)
6. **Lead Hero Card:** `LeadHeroCard.tsx` (lines 1-167)
7. **Search:** `page.tsx` filteredLeads (lines 353-410)
8. **Filter:** `page.tsx` filterConfigs (lines 706-770)
9. **Export:** `page.tsx` handleExport (lines 519-584)
10. **Conversion:** `LeadToCustomerConversionDialog.tsx` (lines 1-203)
11. **Dashboard:** `useDashboardRealData.ts` (lines 1-207)

---

## Field Usage Matrix

### Customer Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| customerName | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| companyName | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| mobile | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| alternateMobile | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| email | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| gstNumber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| address | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| city | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| state | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| pincode | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |

**Evidence:**
- **Form:** Lines 111-198 in `LeadForm.tsx`
- **Detail Page:** Lines 125-137 in `LeadViewDrawer.tsx`
- **List Table:** Lines 97-128 in `page.tsx`
- **Kanban Card:** Lines 56-98 in `KanbanCard.tsx`
- **Lead Tracker:** Lines 135-162 in `LeadTracker.tsx`
- **Hero Card:** Lines 106-130 in `LeadHeroCard.tsx`
- **Search:** Lines 354-362 in `page.tsx`
- **Filter:** Lines 743-748 in `page.tsx` (city filter)
- **Export:** Lines 521-570 in `page.tsx`
- **Conversion:** Lines 148-163 in `LeadToCustomerConversionDialog.tsx`

---

### Project Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| projectTitle | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| projectType | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 210-237 in `LeadForm.tsx`
- **Detail Page:** Lines 140-146 in `LeadViewDrawer.tsx`
- **List Table:** Lines 131-137 in `page.tsx`
- **Kanban Card:** Lines 78-81 in `KanbanCard.tsx`
- **Lead Tracker:** Lines 171-179 in `LeadTracker.tsx`
- **Hero Card:** Lines 144-146 in `LeadHeroCard.tsx`
- **Search:** Line 361 in `page.tsx` (projectTitle only)
- **Filter:** Lines 750-755 in `page.tsx` (projectType filter)
- **Export:** Lines 521-570 in `page.tsx`

---

### Structure Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| structureType | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| width | ✅ | ✅ | ✅ | ✅ (derived) | ✅ (derived) | ✅ | ✅ (derived) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| length | ✅ | ✅ | ✅ | ✅ (derived) | ✅ (derived) | ✅ | ✅ (derived) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| height | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| baySpacing | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| roofType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| craneRequired | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| craneCapacity | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| mezzanine | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| wallType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| insulationRequired | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| materialPreference | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 240-402 in `LeadForm.tsx`
- **Detail Page:** Lines 183-200 in `LeadViewDrawer.tsx`
- **List Table:** Lines 147-154 in `page.tsx` (width/length derived as area)
- **Kanban Card:** Lines 86-91 in `KanbanCard.tsx` (width/length derived as area)
- **Lead Tracker:** Lines 185-189 in `LeadTracker.tsx`
- **Hero Card:** Lines 78-84 in `LeadHeroCard.tsx` (width/length derived as area)
- **Filter:** Lines 757-762 in `page.tsx` (structureType filter)
- **Export:** Lines 521-570 in `page.tsx`

---

### Site Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| siteLocation | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| mapCoordinates | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| siteAddress | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| soilNotes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 405-445 in `LeadForm.tsx`
- **Detail Page:** Lines 203-211 in `LeadViewDrawer.tsx`
- **Export:** Lines 521-570 in `page.tsx`

---

### Requirement Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| customerNotes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| specialRequirement | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| attachments | ✅ (UI only) | ✅ (UI only) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 448-485 in `LeadForm.tsx`
- **Detail Page:** Lines 214-224 in `LeadViewDrawer.tsx`
- **Export:** Lines 521-570 in `page.tsx`

---

### Business Details Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| source | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ (as leadSource) |
| priority | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| assignedEmployee | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ |
| nextFollowUpDate | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| remarks | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ (as notes) |

**Evidence:**
- **Form:** Lines 488-553 in `LeadForm.tsx`
- **Detail Page:** Lines 148-155 in `LeadViewDrawer.tsx`
- **List Table:** Lines 174-188 in `page.tsx`
- **Kanban Card:** Lines 68-73, 120-137 in `KanbanCard.tsx`
- **Lead Tracker:** Lines 85-129 in `LeadTracker.tsx`
- **Hero Card:** Lines 103, 155-161 in `LeadHeroCard.tsx`
- **Filter:** Lines 714-720 (priority), 722-727 (source), 764-769 (assignedEmployee)
- **Export:** Lines 521-570 in `page.tsx`
- **Conversion:** Lines 158-162 in `LeadToCustomerConversionDialog.tsx`

---

### Custom Fields Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| customFields | ✅ | ✅ | ✅ | ✅ (dynamic) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 555-560 in `LeadForm.tsx`
- **Detail Page:** Lines 178-180 in `LeadViewDrawer.tsx`
- **List Table:** Lines 418-441 in `page.tsx` (dynamic custom columns)

---

### System Fields (Not in Form)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Kanban Card | Lead Tracker | Hero Card | Search | Filter | Dashboard | Export | Print | Conversion |
|------------|-------------|-----------|-------------|------------|-------------|--------------|-----------|--------|--------|-----------|--------|-------|------------|
| leadId | ❌ (auto) | ❌ (auto) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| id | ❌ (auto) | ❌ (auto) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| status | ✅ (hidden) | ✅ (hidden) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ (updated) |
| score | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| customerId | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| createdDate | ❌ (auto) | ❌ (auto) | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| lastFollowUp | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| convertedDate | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (set) |
| createdBy | ❌ (auto) | ❌ (auto) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| updatedAt | ❌ (auto) | ❌ (auto) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| assignedEmployeeId | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

**Evidence:**
- **Detail Page:** Lines 157-163 in `LeadViewDrawer.tsx`
- **List Table:** Lines 90-95 (leadId), 156-161 (status), 190-198 (score), 200-213 (createdDate), 215-227 (nextFollowUpDate)
- **Kanban Card:** Lines 58-60 (leadId), 68-73 (status), 100-117 (score)
- **Lead Tracker:** Lines 74-75 (leadId), 85-86 (status), 200-253 (dates)
- **Hero Card:** Lines 102-103 (status)
- **Search:** Line 362 in `page.tsx` (leadId)
- **Filter:** Lines 708-713 (status), 729-741 (createdDate)
- **Export:** Lines 521-570 in `page.tsx`
- **Conversion:** Lines 52, 158, 160, 818-819 in `LeadToCustomerConversionDialog.tsx` and `page.tsx`

---

## Usage Statistics

### By Component

**Create Form:** 33 fields (all form fields)  
**Edit Form:** 33 fields (all form fields)  
**Detail Page:** 30 fields (all form fields + system fields)  
**List Table:** 13 fields (subset)  
**Kanban Card:** 10 fields (subset)  
**Lead Tracker:** 16 fields (subset)  
**Hero Card:** 12 fields (subset)  
**Search:** 8 fields (customerName, companyName, mobile, email, city, state, projectTitle, leadId)  
**Filter:** 7 fields (status, priority, source, city, projectType, structureType, assignedEmployee, createdDate)  
**Dashboard:** 0 fields (only aggregated stats)  
**Export:** 33 fields (all fields)  
**Print:** 0 fields (no print functionality)  
**Conversion:** 10 fields (customerName, companyName, mobile, email, address, city, state, pincode, source, assignedEmployee, remarks)

### By Field

**High Usage (7+ components):**
- customerName (9 components)
- companyName (9 components)
- mobile (8 components)
- city (8 components)
- state (8 components)
- structureType (8 components)
- priority (8 components)
- assignedEmployee (8 components)
- nextFollowUpDate (8 components)

**Medium Usage (4-6 components):**
- email (6 components)
- address (5 components)
- projectType (6 components)
- width (6 components - mostly derived as area)
- length (6 components - mostly derived as area)
- status (7 components)
- leadId (6 components)

**Low Usage (1-3 components):**
- alternateMobile (2 components - form + export)
- gstNumber (2 components - form + export)
- pincode (3 components - form + detail + export + conversion)
- height (3 components - form + detail + export)
- baySpacing (2 components - form + export)
- roofType (2 components - form + export)
- craneRequired (2 components - form + export)
- craneCapacity (2 components - form + export)
- mezzanine (2 components - form + export)
- wallType (2 components - form + export)
- insulationRequired (2 components - form + export)
- materialPreference (2 components - form + export)
- siteLocation (2 components - form + export)
- mapCoordinates (2 components - form + export)
- siteAddress (2 components - form + export)
- soilNotes (2 components - form + export)
- customerNotes (2 components - form + export)
- specialRequirement (2 components - form + export)
- attachments (2 components - form + export)
- customFields (3 components - form + detail + table)
- remarks (3 components - form + export + conversion)
- source (5 components)

**No Usage Outside Form/Export:**
- baySpacing, roofType, craneRequired, craneCapacity, mezzanine, wallType, insulationRequired, materialPreference, siteLocation, mapCoordinates, siteAddress, soilNotes, customerNotes, specialRequirement

**Missing Components:**
- **Print:** No print functionality exists in the application
- **Dashboard:** Only aggregated stats, no individual field usage

---

## Search Implementation

**File:** `page.tsx` (lines 354-362)

**Searchable Fields:**
- customerName
- companyName
- mobile
- email
- city
- state
- projectTitle
- leadId

**Search Logic:**
```typescript
const matchesSearch = debouncedSearch === '' ||
  lead.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  lead.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  lead.mobile.includes(debouncedSearch) ||
  lead.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  lead.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  lead.state.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  (lead.projectTitle?.toLowerCase().includes(debouncedSearch.toLowerCase()) ?? false) ||
  lead.leadId.toString().includes(debouncedSearch);
```

---

## Filter Implementation

**File:** `page.tsx` (lines 706-770)

**Filterable Fields:**
- status (line 708-713)
- priority (line 715-720)
- source (line 722-727)
- createdDate (line 729-741 - quick date filter)
- city (line 743-748)
- projectType (line 750-755)
- structureType (line 757-762)
- assignedEmployee (line 764-769)

**Filter Logic:**
```typescript
const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
const matchesCity = cityFilter === 'all' || lead.city === cityFilter;
const matchesProjectType = projectTypeFilter === 'all' || lead.projectType === projectTypeFilter;
const matchesStructureType = structureTypeFilter === 'all' || lead.structureType === structureTypeFilter;
const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
const matchesAssignedEmployee = assignedEmployeeFilter === 'all' || lead.assignedEmployee === assignedEmployeeFilter;
```

---

## Export Implementation

**File:** `page.tsx` (lines 519-584)

**Exported Fields (33 total):**
- Lead ID, Customer Name, Company, Mobile, Alternate Mobile, Email, GST Number
- Address, City, State, Pincode, Project Title, Project Type, Structure Type
- Width, Length, Height, Bay Spacing, Roof Type, Crane Required, Crane Capacity
- Mezzanine, Wall Type, Insulation Required, Material Preference
- Site Location, Site Address, Map Coordinates, Soil Notes
- Customer Notes, Special Requirement, Status, Priority, Score, Assigned To, Source
- Created Date, Next Follow-up, Remarks

**Export Logic:**
```typescript
const headers = [
  'Lead ID', 'Customer Name', 'Company', 'Mobile', 'Alternate Mobile', 'Email', 'GST Number',
  'Address', 'City', 'State', 'Pincode', 'Project Title', 'Project Type', 'Structure Type',
  'Width', 'Length', 'Height', 'Bay Spacing', 'Roof Type', 'Crane Required', 'Crane Capacity',
  'Mezzanine', 'Wall Type', 'Insulation Required', 'Material Preference',
  'Site Location', 'Site Address', 'Map Coordinates', 'Soil Notes',
  'Customer Notes', 'Special Requirement', 'Status', 'Priority', 'Score', 'Assigned To', 'Source',
  'Created Date', 'Next Follow-up', 'Remarks'
];
```

---

## Conversion Implementation

**File:** `LeadToCustomerConversionDialog.tsx` (lines 148-163)

**Fields Mapped to Customer:**
- customerName → customerName
- companyName → companyName
- mobile → mobile
- email → email
- address → address
- city → city
- state → state
- pincode → pincode
- source → leadSource
- assignedEmployee → assignedEmployee
- assignedEmployeeId → assignedEmployeeId
- remarks → notes
- id → leadId

**Conversion Logic:**
```typescript
initialData={{
  customerName: lead.customerName,
  companyName: lead.companyName,
  mobile: lead.mobile,
  email: lead.email,
  address: lead.address,
  city: lead.city,
  state: lead.state,
  pincode: lead.pincode,
  leadSource: lead.source as any,
  assignedEmployee: lead.assignedEmployee,
  assignedEmployeeId: lead.assignedEmployeeId,
  notes: lead.remarks,
  leadId: lead.id,
}}
```

---

## Dashboard Usage

**File:** `useDashboardRealData.ts` (lines 1-207)

**Dashboard Usage:** Only aggregated stats, no individual field usage

**Stats Used:**
- total leads count
- new leads count
- monthly leads count
- yearly leads count
- change percentage

**No individual lead fields are used in dashboard.**

---

**End of Pass 2 Report**
