# Customer Module Field Usage Audit (Pass 2)

**Generated:** 2025-01-06  
**Scope:** Customer Module Field Usage Across Components  
**Objective:** Trace every field's usage across Create/Edit Form, Detail Page, List Table, Search, Filter, Timeline, Charts, Communication, Export, and Dashboard.

---

## Component Mapping

**Components Analyzed:**
1. **Create/Edit Form:** `CustomerForm.tsx` (lines 1-654)
2. **Detail Page:** `CustomerViewDrawer.tsx` (lines 1-189)
3. **List Table:** `page.tsx` baseColumns (lines 182-273)
4. **Search & Filter:** `page.tsx` filteredCustomers (lines 70-87), filterConfigs (lines 144-172)
5. **Export:** `page.tsx` handleExport (lines 377-391)
6. **Timeline:** `CustomerActivityTimeline.tsx` (lines 1-196)
7. **Charts:** `CustomerActivityTrendChart.tsx` (lines 1-88)
8. **Communication:** `CommunicationCenter.tsx` (lines 1-163)
9. **Dashboard:** `useDashboardRealData.ts` (lines 1-207) - uses customer stats

---

## Field Usage Matrix

### Customer Information Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| customerName | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| companyName | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| mobile | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| alternateMobile | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| email | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 233-336 in CustomerForm.tsx
- **Detail Page:** Lines 104-115 in CustomerViewDrawer.tsx
- **List Table:** Lines 190-215 in page.tsx
- **Search:** Lines 77-84 in page.tsx
- **Export:** Lines 377-391 in page.tsx (API export)
- **Communication:** Lines 95-97 in CommunicationCenter.tsx (uses customerName)

---

### Business Information Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| gstNumber | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| panNumber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| industry | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| businessType | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| website | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 339-446 in CustomerForm.tsx
- **Detail Page:** Lines 162-172 in CustomerViewDrawer.tsx
- **List Table:** Lines 217-224 in page.tsx (GST only)
- **Search:** Line 83 in page.tsx (GST only)
- **Export:** Lines 377-391 in page.tsx (API export)

---

### Address Information Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| address | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| city | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| state | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| country | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| pincode | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 448-552 in CustomerForm.tsx
- **Detail Page:** Lines 150-159 in CustomerViewDrawer.tsx
- **List Table:** Lines 226-238 in page.tsx (city, state)
- **Search:** Lines 82-83 in page.tsx (city)
- **Filter:** Lines 152-171 in page.tsx (city, state)
- **Export:** Lines 377-391 in page.tsx (API export)

---

### Additional Information Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| leadSource | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| status | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| notes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| assignedEmployee | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| assignedEmployeeId | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 554-632 in CustomerForm.tsx
- **Detail Page:** Lines 162-172 in CustomerViewDrawer.tsx (leadSource, status), Lines 145-147 (notes), Lines 112 (assignedEmployee)
- **List Table:** Lines 264-272 in page.tsx (status)
- **Filter:** Lines 145-151 in page.tsx (status)
- **Export:** Lines 377-391 in page.tsx (API export)
- **Dashboard:** Lines 80-88 in useDashboardRealData.ts (status used for stats)

---

### Lead Selection Section (Create Mode Only)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| leadId | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 42, 92-116 in CustomerForm.tsx
- **Detail Page:** Lines 63, 119-129 in CustomerViewDrawer.tsx
- **Export:** Lines 377-391 in page.tsx (API export)

---

### Custom Fields Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| customFields | ✅ | ✅ | ✅ | ✅ (dynamic) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Form:** Lines 634-639 in CustomerForm.tsx
- **Detail Page:** Lines 141-143 in CustomerViewDrawer.tsx
- **List Table:** Lines 275-290 in page.tsx (dynamic custom columns)
- **Export:** Lines 377-391 in page.tsx (API export)

---

### System Fields (Not in Form)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Communication | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|---------------|--------|-----------|
| id | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| customerId | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| customerSince | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| totalProjects | ❌ | ❌ | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| activeProjects | ❌ | ❌ | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| completedProjects | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| totalRevenue | ❌ | ❌ | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| pendingQuotations | ❌ | ❌ | ✅ (KPI) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| pendingFollowups | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| projectIds | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| estimateIds | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| proposalIds | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| quotationIds | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| attachments | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| createdAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| updatedAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

**Evidence:**
- **Detail Page:** Lines 66-93 in CustomerViewDrawer.tsx (KPI strip)
- **List Table:** Lines 240-262 in page.tsx (projects, revenue)
- **Dashboard:** Lines 128-136 in page.tsx (KPI cards), Lines 80-88 in useDashboardRealData.ts
- **Export:** Lines 377-391 in page.tsx (API export)

---

## Usage Statistics

### By Component

**Create Form:** 21 fields (all form fields + leadId)  
**Edit Form:** 20 fields (all form fields except leadId)  
**Detail Page:** 20 fields (all form fields + system KPIs)  
**List Table:** 10 fields (subset + custom fields)  
**Search:** 7 fields (customerName, companyName, mobile, email, city, gstNumber, customerId)  
**Filter:** 3 fields (status, city, state)  
**Timeline:** 0 individual fields (uses activity data)  
**Charts:** 0 individual fields (uses activity trend data)  
**Communication:** 1 field (customerName for display)  
**Export:** All fields (API export)  
**Dashboard:** 4 fields (status, totalProjects, activeProjects, totalRevenue for KPIs)

### By Field

**High Usage (6+ components):**
- customerName (7 components)
- companyName (7 components)
- mobile (6 components)
- city (6 components)
- state (6 components)
- status (6 components)

**Medium Usage (4-5 components):**
- email (5 components)
- gstNumber (5 components)
- address (4 components)

**Low Usage (1-3 components):**
- alternateMobile (3 components)
- panNumber (2 components)
- industry (2 components)
- businessType (2 components)
- website (2 components)
- country (2 components)
- pincode (2 components)
- leadSource (2 components)
- notes (2 components)
- assignedEmployee (2 components)
- leadId (2 components)
- customFields (4 components)

**Missing Components:**
- **Timeline:** No individual field usage (uses activity data)
- **Charts:** No individual field usage (uses activity trend data)
- **Communication:** Only customerName for display
- **Print:** No print functionality exists

---

## Search Implementation

**File:** `page.tsx` (lines 77-84)

**Searchable Fields:**
- customerName
- companyName
- email
- mobile
- city
- gstNumber
- customerId

**Search Logic:**
```typescript
const matchesSearch = !debouncedSearch ||
  customer.customerName.toLowerCase().includes(q) ||
  customer.companyName.toLowerCase().includes(q) ||
  customer.email?.toLowerCase().includes(q) ||
  customer.mobile.includes(debouncedSearch) ||
  customer.city?.toLowerCase().includes(q) ||
  customer.gstNumber?.toLowerCase().includes(q) ||
  customer.customerId.toString().includes(debouncedSearch);
```

---

## Filter Implementation

**File:** `page.tsx` (lines 144-172)

**Filterable Fields:**
- status (line 145-151)
- city (line 152-161)
- state (line 162-171)

**Filter Logic:**
```typescript
const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
const matchesState = stateFilter === 'all' || customer.state === stateFilter;
```

---

## Export Implementation

**File:** `page.tsx` (lines 377-391)

**Exported Fields:** All fields via API export

**Export Logic:**
```typescript
const blob = await customersApi.export();
```

**Note:** Export is handled by API, not client-side CSV generation like Leads module.

---

## Dashboard Usage

**File:** `page.tsx` (lines 128-136), `useDashboardRealData.ts` (lines 128-136)

**Dashboard KPIs Used:**
- Total Customers (count)
- Active Customers (status = 'Active')
- New This Month (customerSince date filter)
- Total Revenue (sum of totalRevenue)

**No individual customer fields are displayed in dashboard except aggregated stats.**

---

## Timeline Implementation

**File:** `CustomerActivityTimeline.tsx` (lines 1-196)

**Timeline Usage:** No individual customer fields used. Timeline displays activity events (lead_created, customer_created, estimate_sent, etc.) with metadata.

**Activity Types:**
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

---

## Charts Implementation

**File:** `CustomerActivityTrendChart.tsx` (lines 1-88)

**Charts Usage:** No individual customer fields used. Chart displays activity trend over time (month vs activities count).

**Data Format:** `{ month: string; activities: number }[]`

---

## Communication Implementation

**File:** `CommunicationCenter.tsx` (lines 1-163)

**Communication Usage:** Only customerName for display.

**Fields Used:**
- customerName (display in header and message recipient)

**Note:** Communication is mock data in frontend-only mode.

---

**End of Pass 2 Report**
