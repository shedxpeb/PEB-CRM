# Customer Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Customer Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, timeline, charts, communication, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 21  
**Fields Missing from Detail Page:** 1  
**Fields Missing from List Table:** 11  
**Fields Missing from Search:** 14  
**Fields Missing from Filter:** 18  
**Fields Missing from Export:** 0 (API export includes all)  
**Fields Missing from Timeline:** 21 (timeline uses activity data, not fields)  
**Fields Missing from Charts:** 21 (charts use activity trend, not fields)  
**Fields Missing from Communication:** 20 (only customerName used)  
**Fields Missing from Dashboard:** 17 (only aggregated stats)

---

## Fields Missing from Detail Page

| Field Name | Section | Reason |
|------------|---------|--------|
| assignedEmployeeId | Additional Information | Not displayed (only assignedEmployee shown) |

**Evidence:** `CustomerViewDrawer.tsx` lines 104-172

**Note:** assignedEmployee is displayed, but assignedEmployeeId is not shown (which is correct - ID is internal reference).

---

## Fields Missing from List Table

| Field Name | Section | Reason |
|------------|---------|--------|
| alternateMobile | Customer Information | Not critical for list view |
| address | Address Information | Too long for table |
| country | Address Information | Not critical for list view |
| pincode | Address Information | Not critical for list view |
| panNumber | Business Information | Not critical for list view |
| industry | Business Information | Not critical for list view |
| businessType | Business Information | Not critical for list view |
| website | Business Information | Not critical for list view |
| leadSource | Additional Information | Not critical for list view |
| notes | Additional Information | Too long for table |
| assignedEmployee | Additional Information | Not critical for list view |

**Evidence:** `page.tsx` lines 182-273 (baseColumns definition)

**Note:** List table shows essential fields: customerId, customerName, companyName, mobile, email, gstNumber, city, state, projects, revenue, status. Custom fields are dynamically added.

---

## Fields Missing from Search

| Field Name | Section | Reason |
|------------|---------|--------|
| alternateMobile | Customer Information | Not commonly searched |
| address | Address Information | Too long, covered by city/state |
| country | Address Information | Not commonly searched |
| pincode | Address Information | Not commonly searched |
| panNumber | Business Information | Not commonly searched |
| industry | Business Information | Has filter instead |
| businessType | Business Information | Not commonly searched |
| website | Business Information | Not commonly searched |
| leadSource | Additional Information | Not commonly searched |
| notes | Additional Information | Too long |
| assignedEmployee | Additional Information | Not commonly searched |
| assignedEmployeeId | Additional Information | Not commonly searched |
| status | Additional Information | Has filter instead |
| customFields | Custom Fields | Not searchable (dynamic) |

**Evidence:** `page.tsx` lines 77-84 (search logic)

---

## Fields Missing from Filter

| Field Name | Section | Reason |
|------------|---------|--------|
| customerName | Customer Information | Has search instead |
| companyName | Customer Information | Has search instead |
| mobile | Customer Information | Has search instead |
| email | Customer Information | Has search instead |
| alternateMobile | Customer Information | Not commonly filtered |
| address | Address Information | Has search instead (via city/state) |
| country | Address Information | Not commonly filtered |
| pincode | Address Information | Not commonly filtered |
| gstNumber | Business Information | Has search instead |
| panNumber | Business Information | Not commonly filtered |
| industry | Business Information | Not commonly filtered |
| businessType | Business Information | Not commonly filtered |
| website | Business Information | Not commonly filtered |
| leadSource | Additional Information | Not commonly filtered |
| notes | Additional Information | Not commonly filtered |
| assignedEmployee | Additional Information | Not commonly filtered |
| customFields | Custom Fields | Not filterable (dynamic) |

**Evidence:** `page.tsx` lines 144-172 (filterConfigs)

---

## Fields Missing from Export

**None** - All fields are exported via API export.

**Evidence:** `page.tsx` lines 377-391 (handleExport function)

---

## Fields Missing from Timeline

**All Fields** - Timeline uses activity data, not individual customer fields.

**Activity Types Displayed:**
- lead_created
- customer_created
- estimate_sent
- proposal_sent
- quotation_sent
- project_started
- project_completed
- payment_received
- meeting_scheduled
- note_added
- status_changed
- document_created
- assigned

**Evidence:** `CustomerActivityTimeline.tsx` lines 1-196

**Note:** This is by design. Timeline shows events/activities, not static field values.

---

## Fields Missing from Charts

**All Fields** - Charts use activity trend data, not individual customer fields.

**Chart Data:** `{ month: string; activities: number }[]`

**Evidence:** `CustomerActivityTrendChart.tsx` lines 1-88

**Note:** This is by design. Charts show trends over time, not static field values.

---

## Fields Missing from Communication

| Field Name | Section | Reason |
|------------|---------|--------|
| companyName | Customer Information | Not used in communication UI |
| mobile | Customer Information | Not used in communication UI |
| alternateMobile | Customer Information | Not used in communication UI |
| email | Customer Information | Not used in communication UI |
| address | Address Information | Not used in communication UI |
| city | Address Information | Not used in communication UI |
| state | Address Information | Not used in communication UI |
| country | Address Information | Not used in communication UI |
| pincode | Address Information | Not used in communication UI |
| gstNumber | Business Information | Not used in communication UI |
| panNumber | Business Information | Not used in communication UI |
| industry | Business Information | Not used in communication UI |
| businessType | Business Information | Not used in communication UI |
| website | Business Information | Not used in communication UI |
| leadSource | Additional Information | Not used in communication UI |
| status | Additional Information | Not used in communication UI |
| notes | Additional Information | Not used in communication UI |
| assignedEmployee | Additional Information | Not used in communication UI |
| assignedEmployeeId | Additional Information | Not used in communication UI |
| customFields | Custom Fields | Not used in communication UI |
| leadId | Lead Selection | Not used in communication UI |

**Evidence:** `CommunicationCenter.tsx` lines 1-163

**Note:** Only customerName is used for display in communication header and as recipient. This is by design - communication is a separate feature focused on messaging, not customer data display.

---

## Fields Missing from Dashboard

| Field Name | Section | Reason |
|------------|---------|--------|
| customerName | Customer Information | Not displayed (only aggregated stats) |
| companyName | Customer Information | Not displayed (only aggregated stats) |
| mobile | Customer Information | Not displayed (only aggregated stats) |
| alternateMobile | Customer Information | Not displayed (only aggregated stats) |
| email | Customer Information | Not displayed (only aggregated stats) |
| address | Address Information | Not displayed (only aggregated stats) |
| city | Address Information | Not displayed (only aggregated stats) |
| state | Address Information | Not displayed (only aggregated stats) |
| country | Address Information | Not displayed (only aggregated stats) |
| pincode | Address Information | Not displayed (only aggregated stats) |
| gstNumber | Business Information | Not displayed (only aggregated stats) |
| panNumber | Business Information | Not displayed (only aggregated stats) |
| industry | Business Information | Not displayed (only aggregated stats) |
| businessType | Business Information | Not displayed (only aggregated stats) |
| website | Business Information | Not displayed (only aggregated stats) |
| leadSource | Additional Information | Not displayed (only aggregated stats) |
| notes | Additional Information | Not displayed (only aggregated stats) |
| assignedEmployee | Additional Information | Not displayed (only aggregated stats) |
| customFields | Custom Fields | Not displayed (only aggregated stats) |

**Evidence:** `page.tsx` lines 128-136 (KPI cards), `useDashboardRealData.ts` lines 128-136

**Dashboard Stats Used:**
- Total Customers (count)
- Active Customers (status = 'Active')
- New This Month (customerSince date filter)
- Total Revenue (sum of totalRevenue)

**Note:** This is by design. Dashboard shows high-level metrics only, not individual field values.

---

## Critical Findings

### 1. Business Details Fields - Low Visibility

**Fields:** panNumber, industry, businessType, website

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Timeline ❌
- Charts ❌
- Communication ❌
- Dashboard ❌

**Impact:** Users cannot filter or search by business details. These fields are only visible when opening a customer's detail page.

**Assessment:** This is acceptable. Business details are not commonly searched/filtered. They are available in detail view and export.

---

### 2. Address Details Fields - Partial Visibility

**Fields:** address, country, pincode

**Issue:** These fields only appear in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌ (except city, state)
- Search ❌ (except city)
- Filter ❌ (except city, state)
- Timeline ❌
- Charts ❌
- Communication ❌
- Dashboard ❌

**Impact:** Users can search/filter by city and state, but not by address, country, or pincode.

**Assessment:** This is acceptable. City and state are sufficient for regional filtering. Full address is too long for list view.

---

### 3. Alternate Mobile - Low Visibility

**Field:** alternateMobile

**Issue:** This field only appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Timeline ❌
- Charts ❌
- Communication ❌
- Dashboard ❌

**Impact:** Users cannot search or filter by alternate mobile number.

**Assessment:** This is acceptable. Alternate mobile is a backup contact, not primary. Available in detail view and export.

---

### 4. Lead Source - Low Visibility

**Field:** leadSource

**Issue:** This field only appears in:
- Create/Edit Form ✅
- Detail Page ✅
- Export ✅

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Timeline ❌
- Charts ❌
- Communication ❌
- Dashboard ❌

**Impact:** Users cannot filter by lead source for ROI analysis.

**Assessment:** Could be improved by adding to filter. Lead source tracking is important for marketing ROI analysis.

---

### 5. Communication Center - Limited Field Usage

**Issue:** Communication center only uses customerName for display. No other customer fields are used.

**Current Behavior:**
- Only customerName displayed in header
- No integration with mobile, email for actual communication
- Mock data only (frontend-only)

**Expected Behavior:**
- Integrate with mobile for WhatsApp/SMS
- Integrate with email for email communication
- Use customer contact details for actual messaging

**Impact:** Communication center is not functional as a real communication tool.

**Assessment:** This is a feature gap, not a field usage issue. Communication center needs backend integration.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🟡 Consider Adding to Filter:**
- leadSource - Important for marketing ROI analysis

**🟢 Keep (Current Usage is Good):**
- All customer details (customerName, companyName, mobile, email, address, city, state)
- All business details (gstNumber, panNumber, industry, businessType, website)
- All additional details (leadSource, status, notes, assignedEmployee)
- Custom fields

**🟢 Keep (Timeline/Charts/Communication):**
- Timeline and Charts correctly use activity data, not fields
- Communication needs backend integration, not field changes

---

**End of Pass 3 Report**
