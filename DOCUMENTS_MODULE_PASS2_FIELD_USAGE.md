# Documents Module Field Usage Audit (Pass 2)

**Generated:** 2025-01-06  
**Scope:** Documents Module Field Usage Across Components  
**Objective:** Trace every field's usage across Create/Edit Form, Detail Page, List Table, Search, Filter, Timeline, Charts, Export, and Dashboard.

---

## Component Mapping

**Components Analyzed:**
1. **Create/Edit Form:** `EstimateHeaderForm.tsx` (lines 1-88), `EstimateBuilder` (referenced in EstimatesPage)
2. **Detail Page:** `DocumentViewDrawer.tsx` (lines 1-233)
3. **List Table:** `EstimatesPage.tsx` (lines 142-156)
4. **Search & Filter:** `EstimatesPage.tsx` (lines 73-90, 124-132)
5. **Export:** PDF export (referenced in EstimatesPage)
6. **Timeline:** `DocumentActivityTimeline` (referenced in DocumentViewDrawer)
7. **Charts:** Not implemented
8. **Dashboard:** `EstimatesPage.tsx` (lines 97-117)

**Note:** Documents module has 3 document types: Estimate, Proposal, Quotation. This analysis focuses on Estimate as the primary document type. Proposal and Quotation inherit from Estimate.

---

## Field Usage Matrix

### Estimate Header Section (EstimateHeaderForm.tsx)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| customerName | ✅ (read-only) | ✅ (read-only) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (PDF) | ❌ |
| leadNumber | ✅ (read-only) | ✅ (read-only) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| version | ✅ | ✅ | ✅ (badge) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| projectName | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (PDF) | ❌ |
| contactPersonName | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| salesExecutive | ✅ | ✅ | ❌ | ❌ | ✅ (as createdBy) | ✅ | ❌ | ❌ | ❌ | ❌ |
| validTill | ✅ | ✅ | ✅ (validUntil) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |

**Evidence:**
- **Form:** Lines 6-12 (interface), Lines 21-87 (form) in EstimateHeaderForm.tsx
- **Detail Page:** Lines 112-120 (basic info), Lines 169-179 (financials) in DocumentViewDrawer.tsx
- **List Table:** Lines 142-156 in EstimatesPage.tsx
- **Search:** Lines 81-87 in EstimatesPage.tsx
- **Filter:** Lines 124-132 in EstimatesPage.tsx
- **Export:** PDF export referenced in EstimatesPage (lines 268-269)

**Note:** customerName and leadNumber are read-only (passed as props). salesExecutive is used as createdBy in filter.

---

### Document Info Section (Validation Schema)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| documentType | ✅ | ❌ | ✅ (badge) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerId | ✅ | ❌ | ✅ | ✅ (customerName) | ✅ (customerName) | ✅ (customerName) | ❌ | ❌ | ✅ (PDF) | ❌ |
| leadId | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| projectId | ✅ | ❌ | ✅ | ✅ (projectName) | ✅ (projectName) | ✅ (projectName) | ❌ | ❌ | ✅ (PDF) | ❌ |
| templateId | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |

**Evidence:**
- **Validation:** Lines 26-55 in validations/index.ts
- **Detail Page:** Lines 112-120, Lines 182-200 in DocumentViewDrawer.tsx
- **List Table:** Lines 142-156 in EstimatesPage.tsx
- **Search:** Lines 81-87 in EstimatesPage.tsx
- **Filter:** Lines 124-132 in EstimatesPage.tsx

**Note:** documentType is not in list table (page is specific to Estimates). customerId, projectId are shown as customerName, projectName.

---

### Customer Section (Auto-filled)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| customerId | ✅ | ❌ | ✅ | ✅ (customerName) | ✅ (customerName) | ✅ (customerName) | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerName | ✅ (read-only) | ✅ (read-only) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerEmail | ✅ (auto-fill) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerPhone | ✅ (auto-fill) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerAddress | ✅ (auto-fill) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| customerGST | ✅ (auto-fill) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |

**Evidence:**
- **Type Definition:** Lines 178-183 in types/peb-commercial.ts
- **Detail Page:** Lines 112-120 in DocumentViewDrawer.tsx
- **List Table:** Lines 142-156 in EstimatesPage.tsx
- **Search:** Lines 81-87 in EstimatesPage.tsx
- **Filter:** Lines 124-132 in EstimatesPage.tsx
- **Export:** PDF export (customer fields included)

**Note:** Customer fields are auto-filled from Customer module. Only customerName is displayed in list table and search/filter.

---

### Status Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| status | ✅ (default Draft) | ✅ | ✅ (badge) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ (PDF) | ✅ (KPI) |
| approvalStatus | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Type Definition:** Lines 192-193 in types/peb-commercial.ts
- **Detail Page:** Lines 85-91 in DocumentViewDrawer.tsx
- **List Table:** Lines 152 in EstimatesPage.tsx
- **Search:** Lines 86 in EstimatesPage.tsx
- **Filter:** Lines 126 in EstimatesPage.tsx
- **Dashboard:** Lines 97-107 in EstimatesPage.tsx

**Note:** status is used in dashboard KPI calculation (Draft, Sent, Converted counts). approvalStatus is not displayed in list or detail.

---

### Pricing Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| includePricing | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| subtotal | ✅ (calculated) | ✅ (calculated) | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| taxAmount | ✅ (calculated) | ✅ (calculated) | ✅ (KPI) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| totalAmount | ✅ (calculated) | ✅ (calculated) | ✅ (KPI) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| discountAmount | ✅ | ✅ | ✅ (KPI) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| discountPercentage | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| gstType | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |

**Evidence:**
- **Validation:** Lines 31-35 in validations/index.ts
- **Detail Page:** Lines 93-100 (KPI strip), Lines 169-179 (financials) in DocumentViewDrawer.tsx
- **List Table:** Lines 151 in EstimatesPage.tsx
- **Export:** PDF export (pricing fields included)

**Note:** Pricing fields are calculated by system. subtotal, taxAmount, totalAmount are shown in detail page KPI strip. totalAmount is shown in list table.

---

### Line Items Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| lineItems | ✅ | ✅ | ✅ (table) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| description | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| quantity | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| unit | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| rate | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| amount | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| itemId | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| itemCode | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Validation:** Lines 11-22 in validations/index.ts
- **Detail Page:** Lines 136-167 in DocumentViewDrawer.tsx
- **Export:** PDF export (line items included)

**Note:** Line items are the core of commercial documents. They are displayed in detail page as a table. Not displayed in list table.

---

### Terms Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| paymentTerms | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| deliveryTerms | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| notes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| internalNotes | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| termsAndConditions | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |

**Evidence:**
- **Validation:** Lines 38-41 in validations/index.ts
- **Detail Page:** Lines 129-133 in DocumentViewDrawer.tsx
- **Export:** PDF export (terms included)

**Note:** Terms fields are only displayed in detail page and export. Not displayed in list table.

---

### Material Selection Section (Estimate Only)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| materialSelections | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| scopeConfiguration | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| technicalSpecifications | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| inclusions | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| exclusions | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Type Definition:** Lines 200-211 in types/peb-commercial.ts
- **Form:** EstimateBuilder (referenced in EstimatesPage)

**Note:** Material selection, scope configuration, technical specifications are Estimate-specific fields. They are not displayed in detail page (DocumentViewDrawer is generic for all document types). These fields are used in EstimateBuilder.

---

### System Fields (Not in Form)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| id | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| estimateNumber | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| createdAt | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| updatedAt | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PDF) | ❌ |
| sentAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ (PDF) | ❌ |
| viewedAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ (PDF) | ❌ |
| createdBy | ❌ | ❌ | ❌ | ❌ | ✅ (as salesExecutive) | ✅ | ❌ | ❌ | ❌ | ❌ |
| convertedToProposalId | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| convertedAt | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Detail Page:** Lines 112-120 in DocumentViewDrawer.tsx
- **List Table:** Lines 144, 153 in EstimatesPage.tsx
- **Search:** Lines 87 in EstimatesPage.tsx
- **Filter:** Lines 129 in EstimatesPage.tsx
- **Timeline:** DocumentActivityTimeline (referenced in DocumentViewDrawer)

**Note:** System fields are auto-generated. estimateNumber is displayed in list table and detail page. Timestamps are displayed in detail page and export.

---

## Usage Statistics

### By Component

**Create Form:** 25+ fields (all form fields)  
**Edit Form:** 20+ fields (excluding read-only fields)  
**Detail Page:** 15 fields (basic info, KPI strip, line items, financials, references)  
**List Table:** 5 fields (estimateNumber, customerName, totalAmount, status, createdAt)  
**Search:** 6 fields (estimateNumber, customerName, projectName, status, createdBy)  
**Filter:** 4 filters (status, customer, project, createdBy)  
**Timeline:** Activity timeline (not individual fields)  
**Charts:** Not implemented  
**Export:** PDF export (all fields included)  
**Dashboard:** 4 KPIs (total, draft, sent, converted)

### By Field

**High Usage (4+ components):**
- customerName (5 components)
- projectName (4 components)
- status (5 components)
- totalAmount (4 components)

**Medium Usage (2-3 components):**
- customerId (3 components)
- projectId (3 components)
- subtotal (3 components)
- taxAmount (3 components)
- discountAmount (3 components)
- lineItems (3 components)
- paymentTerms (3 components)
- notes (3 components)
- estimateNumber (3 components)
- createdAt (3 components)

**Low Usage (1 component):**
- leadNumber (1 component)
- contactPersonName (1 component)
- salesExecutive (1 component - as createdBy)
- validTill (1 component)
- includePricing (1 component)
- gstType (1 component)
- internalNotes (1 component)
- termsAndConditions (1 component)
- materialSelections (1 component)
- scopeConfiguration (1 component)
- technicalSpecifications (1 component)
- inclusions (1 component)
- exclusions (1 component)

**Missing Components:**
- **Charts:** Not implemented

---

## Search Implementation

**File:** `EstimatesPage.tsx` (lines 81-87)

**Searchable Fields:**
- estimateNumber
- customerName
- projectName
- status
- createdBy (salesExecutive)

**Search Logic:**
```typescript
const matchesSearch =
  !debouncedSearch ||
  est.estimateNumber.toLowerCase().includes(q) ||
  est.customerName.toLowerCase().includes(q) ||
  (est.projectName?.toLowerCase().includes(q) ?? false) ||
  est.status.toLowerCase().includes(q) ||
  creator.toLowerCase().includes(q);
```

---

## Filter Implementation

**File:** `EstimatesPage.tsx` (lines 124-132)

**Filterable Fields:**
- status (line 126)
- customer (line 127)
- project (line 128)
- createdBy (line 129)

**Filter Logic:**
```typescript
const matchesStatus = statusFilter === 'all' || est.status === statusFilter;
const matchesCustomer = customerFilter === 'all' || est.customerName === customerFilter;
const matchesProject = projectFilter === 'all' || est.projectName === projectFilter;
const matchesCreator = createdByFilter === 'all' || creator === createdByFilter;
```

---

## Export Implementation

**File:** `EstimatesPage.tsx` (lines 268-269)

**Export Type:** PDF export (not CSV)

**Exported Fields:** All fields included in PDF generation

**Export Logic:** PDF preview and download functions (useDocumentPdfActions hook)

---

## Dashboard Usage

**File:** `EstimatesPage.tsx` (lines 97-117)

**Dashboard KPIs Used:**
- Total Estimates (count of filtered estimates)
- Draft (count of estimates with status Draft)
- Sent (count of estimates with status Sent)
- Converted (count of estimates with status Converted)

**Dashboard Stats Used:**
- status (for KPI calculation)

---

## Timeline Implementation

**File:** `DocumentViewDrawer.tsx` (line 10, line 108)

**Timeline Usage:** DocumentActivityTimeline component displays activity events.

**Activity Types:** Document-specific activities (created, updated, sent, viewed, approved, rejected, converted, etc.)

**Note:** Timeline displays activity events, not individual field values.

---

## Charts Implementation

**Not implemented.**

**Note:** Charts component does not exist for documents module.

---

## Critical Findings

### 1. Material Selection Not Displayed in Detail Page

**Issue:** Material selection, scope configuration, technical specifications are not displayed in detail page.

**Current Behavior:** DocumentViewDrawer is generic for all document types (Estimate, Proposal, Quotation). It does not display Estimate-specific fields.

**Impact:** Users cannot view material selection, scope configuration, or technical specifications in detail page.

**Assessment:** This is acceptable. Estimate-specific fields are available in EstimateBuilder. Detail page shows summary information. Full details are available in EstimateBuilder.

---

### 2. No Charts Component

**Issue:** No charts component exists for documents module.

**Impact:** No visual representation of document trends, conversion rates, or other analytics.

**Assessment:** This is a feature gap, not a field usage issue. Charts should be added for document analytics.

---

### 3. leadNumber Not Used

**Issue:** leadNumber is in form but not used in list table, search, filter, or detail page.

**Current Behavior:** leadNumber is read-only in form (from Lead module).

**Impact:** Users cannot filter or search by lead number.

**Assessment:** This is acceptable. leadNumber is optional (project may not have a lead). Customer and project are more commonly used for filtering.

---

### 4. contactPersonName Not Used

**Issue:** contactPersonName is in form but not used in list table, search, filter, or detail page.

**Current Behavior:** contactPersonName is optional field in form.

**Impact:** Users cannot view or search by contact person.

**Assessment:** This is acceptable. contactPersonName is operational detail not commonly searched/filtered.

---

### 5. salesExecutive Used as createdBy

**Issue:** salesExecutive is used as createdBy in filter, but not displayed in list table.

**Current Behavior:** salesExecutive is used in filter as "Created By".

**Impact:** Users can filter by sales executive but cannot see sales executive in list table.

**Assessment:** This is acceptable. Filter is available for sales executive. List table shows essential fields only.

---

## Recommendations for Pass 3

Based on the field usage analysis, the following fields should be evaluated in Pass 3:

**🟡 Consider Adding to Detail Page:**
- materialSelections - Could be useful for quick reference
- scopeConfiguration - Could be useful for quick reference
- technicalSpecifications - Could be useful for quick reference

**🟡 Consider Adding to List Table:**
- salesExecutive - Could be useful for quick reference
- validTill - Could be useful for tracking validity

**🟢 Keep (Current Usage is Good):**
- All form fields
- All customer fields
- All pricing fields
- All line item fields
- All terms fields

**🟢 Keep (Timeline/Charts):**
- Timeline correctly uses activity data, not fields
- Charts need to be added (feature gap, not field issue)

---

**End of Pass 2 Report**
