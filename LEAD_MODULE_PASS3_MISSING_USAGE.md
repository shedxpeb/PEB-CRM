# Lead Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Lead Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, conversion, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 33  
**Fields Missing from Detail Page:** 0  
**Fields Missing from List Table:** 20  
**Fields Missing from Search:** 25  
**Fields Missing from Filter:** 26  
**Fields Missing from Export:** 0  
**Fields Missing from Conversion:** 23  
**Fields Missing from Dashboard:** 33 (only aggregated stats)

---

## Fields Missing from Detail Page

**None** - All form fields are displayed in the detail page (LeadViewDrawer.tsx).

---

## Fields Missing from List Table

| Field Name | Section | Reason |
|------------|---------|--------|
| alternateMobile | Customer Details | Not critical for list view |
| email | Customer Details | Not critical for list view |
| gstNumber | Customer Details | Not critical for list view |
| address | Customer Details | Too long for table |
| pincode | Customer Details | Not critical for list view |
| projectTitle | Project Details | Not critical for list view |
| height | Structure Details | Not critical for list view |
| baySpacing | Structure Details | Not critical for list view |
| roofType | Structure Details | Not critical for list view |
| craneRequired | Structure Details | Not critical for list view |
| craneCapacity | Structure Details | Not critical for list view |
| mezzanine | Structure Details | Not critical for list view |
| wallType | Structure Details | Not critical for list view |
| insulationRequired | Structure Details | Not critical for list view |
| materialPreference | Structure Details | Not critical for list view |
| siteLocation | Site Details | Not critical for list view |
| mapCoordinates | Site Details | Not critical for list view |
| siteAddress | Site Details | Too long for table |
| soilNotes | Site Details | Too long for table |
| customerNotes | Requirement Details | Too long for table |
| specialRequirement | Requirement Details | Too long for table |
| attachments | Requirement Details | Not critical for list view |
| source | Business Details | Not critical for list view |
| remarks | Business Details | Too long for table |

**Evidence:** `page.tsx` lines 88-228 (baseColumns definition)

---

## Fields Missing from Search

| Field Name | Section | Reason |
|------------|---------|--------|
| alternateMobile | Customer Details | Not commonly searched |
| gstNumber | Customer Details | Not commonly searched |
| address | Customer Details | Too long, covered by city/state |
| pincode | Customer Details | Not commonly searched |
| projectType | Project Details | Has filter instead |
| structureType | Structure Details | Has filter instead |
| width | Structure Details | Not commonly searched |
| length | Structure Details | Not commonly searched |
| height | Structure Details | Not commonly searched |
| baySpacing | Structure Details | Not commonly searched |
| roofType | Structure Details | Not commonly searched |
| craneRequired | Structure Details | Not commonly searched |
| craneCapacity | Structure Details | Not commonly searched |
| mezzanine | Structure Details | Not commonly searched |
| wallType | Structure Details | Not commonly searched |
| insulationRequired | Structure Details | Not commonly searched |
| materialPreference | Structure Details | Not commonly searched |
| siteLocation | Site Details | Not commonly searched |
| mapCoordinates | Site Details | Not commonly searched |
| siteAddress | Site Details | Too long, covered by city/state |
| soilNotes | Site Details | Too long |
| customerNotes | Requirement Details | Too long |
| specialRequirement | Requirement Details | Too long |
| attachments | Requirement Details | Not searchable (files) |
| status | Business Details | Has filter instead |
| priority | Business Details | Has filter instead |
| source | Business Details | Has filter instead |
| assignedEmployee | Business Details | Has filter instead |
| nextFollowUpDate | Business Details | Has filter instead |
| remarks | Business Details | Too long |

**Evidence:** `page.tsx` lines 354-362 (search logic)

---

## Fields Missing from Filter

| Field Name | Section | Reason |
|------------|---------|--------|
| customerName | Customer Details | Has search instead |
| companyName | Customer Details | Has search instead |
| mobile | Customer Details | Has search instead |
| email | Customer Details | Has search instead |
| address | Customer Details | Has search instead (via city/state) |
| pincode | Customer Details | Not commonly filtered |
| projectTitle | Project Details | Has search instead |
| width | Structure Details | Not commonly filtered |
| length | Structure Details | Not commonly filtered |
| height | Structure Details | Not commonly filtered |
| baySpacing | Structure Details | Not commonly filtered |
| roofType | Structure Details | Not commonly filtered |
| craneRequired | Structure Details | Not commonly filtered |
| craneCapacity | Structure Details | Not commonly filtered |
| mezzanine | Structure Details | Not commonly filtered |
| wallType | Structure Details | Not commonly filtered |
| insulationRequired | Structure Details | Not commonly filtered |
| materialPreference | Structure Details | Not commonly filtered |
| siteLocation | Site Details | Not commonly filtered |
| mapCoordinates | Site Details | Not commonly filtered |
| siteAddress | Site Details | Not commonly filtered |
| soilNotes | Site Details | Not commonly filtered |
| customerNotes | Requirement Details | Not commonly filtered |
| specialRequirement | Requirement Details | Not commonly filtered |
| attachments | Requirement Details | Not filterable (files) |
| nextFollowUpDate | Business Details | Has quick date filter instead |
| remarks | Business Details | Not commonly filtered |

**Evidence:** `page.tsx` lines 706-770 (filterConfigs)

---

## Fields Missing from Export

**None** - All fields are exported to CSV.

**Evidence:** `page.tsx` lines 519-584 (handleExport function)

---

## Fields Missing from Conversion

| Field Name | Section | Reason |
|------------|---------|--------|
| alternateMobile | Customer Details | Not mapped to customer |
| gstNumber | Customer Details | Not mapped to customer |
| projectTitle | Project Details | Not relevant for customer |
| projectType | Project Details | Not relevant for customer |
| structureType | Structure Details | Not relevant for customer |
| width | Structure Details | Not relevant for customer |
| length | Structure Details | Not relevant for customer |
| height | Structure Details | Not relevant for customer |
| baySpacing | Structure Details | Not relevant for customer |
| roofType | Structure Details | Not relevant for customer |
| craneRequired | Structure Details | Not relevant for customer |
| craneCapacity | Structure Details | Not relevant for customer |
| mezzanine | Structure Details | Not relevant for customer |
| wallType | Structure Details | Not relevant for customer |
| insulationRequired | Structure Details | Not relevant for customer |
| materialPreference | Structure Details | Not relevant for customer |
| siteLocation | Site Details | Not mapped to customer |
| mapCoordinates | Site Details | Not mapped to customer |
| siteAddress | Site Details | Not mapped to customer |
| soilNotes | Site Details | Not relevant for customer |
| customerNotes | Requirement Details | Not mapped to customer |
| specialRequirement | Requirement Details | Not mapped to customer |
| attachments | Requirement Details | Not mapped to customer |
| priority | Business Details | Not relevant for customer |
| nextFollowUpDate | Business Details | Not relevant for customer |

**Evidence:** `LeadToCustomerConversionDialog.tsx` lines 148-163 (initialData mapping)

---

## Fields Missing from Dashboard

**All Fields** - Dashboard only uses aggregated stats, not individual field values.

**Dashboard Stats Used:**
- Total leads count
- New leads count
- In-progress leads count
- Converted leads count

**No individual lead fields are displayed in dashboard.**

**Evidence:** `useDashboardRealData.ts` lines 1-207

---

## Critical Findings

### 1. Structure Details Fields - Low Visibility

**Fields:** height, baySpacing, roofType, craneRequired, craneCapacity, mezzanine, wallType, insulationRequired, materialPreference

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users cannot filter or search by structure specifications. These fields are only visible when opening a lead's detail page.

---

### 2. Site Details Fields - Low Visibility

**Fields:** siteLocation, mapCoordinates, siteAddress, soilNotes

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users cannot filter or search by site information. These fields are only visible when opening a lead's detail page.

---

### 3. Requirement Details Fields - Low Visibility

**Fields:** customerNotes, specialRequirement, attachments

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users cannot filter or search by customer notes or special requirements. Attachments field is UI-only (no actual file upload).

---

### 4. Alternate Mobile - Low Visibility

**Field:** alternateMobile

**Issue:** This field only appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users cannot search or filter by alternate mobile number. This field is rarely used.

---

### 5. GST Number - Low Visibility

**Field:** gstNumber

**Issue:** This field only appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users cannot search or filter by GST number. This is important for billing but not visible in list views.

---

### 6. Pincode - Medium Visibility

**Field:** pincode

**Issue:** This field appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅
- Conversion ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌

**Impact:** Users cannot search or filter by pincode. This could be useful for regional analysis.

---

### 7. Project Title - Medium Visibility

**Field:** projectTitle

**Issue:** This field appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅
- Search ✅

**Missing from:**
- List Table ❌
- Filter ❌
- Kanban Card ❌
- Lead Tracker ❌
- Hero Card ❌
- Conversion ❌

**Impact:** Users can search by project title but cannot filter by it. Not displayed in list views.

---

### 8. No Print Functionality

**Issue:** The application has no print functionality for leads.

**Missing:**
- Print view ❌
- Print-friendly layout ❌
- PDF generation ❌

**Impact:** Users cannot print lead details for offline use or record-keeping.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🔴 Consider Removing (Low Usage, Not Critical):**
- alternateMobile (only in form/detail/export)
- attachments (UI-only, no actual functionality)

**🟡 Consider Improving (Add to Search/Filter):**
- gstNumber (important for billing)
- pincode (useful for regional analysis)
- projectTitle (searchable but not filterable)

**🟢 Keep (Essential):**
- All customer details (customerName, companyName, mobile, email, address, city, state)
- All project details (projectType, structureType)
- All business details (source, priority, assignedEmployee, nextFollowUpDate, remarks)
- Structure details (width, length, height, baySpacing, roofType, craneRequired, craneCapacity, mezzanine, wallType, insulationRequired, materialPreference) - critical for PEB industry
- Site details (siteLocation, mapCoordinates, siteAddress, soilNotes) - critical for construction
- Requirement details (customerNotes, specialRequirement) - important for customization

---

**End of Pass 3 Report**
