# Documents Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Documents Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, timeline, charts, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 25+ (Estimate)  
**Fields Missing from Detail Page:** 20+ (Estimate-specific fields)  
**Fields Missing from List Table:** 20+  
**Fields Missing from Search:** 15+  
**Fields Missing from Filter:** 20+  
**Fields Missing from Export:** 0 (PDF export includes all fields)  
**Fields Missing from Timeline:** N/A (timeline shows activities, not fields)  
**Fields Missing from Charts:** 25+ (charts not implemented)  
**Fields Missing from Dashboard:** 20+ (only aggregated stats)

---

## Fields Missing from Detail Page

| Field Name | Section | Reason |
|------------|---------|--------|
| leadNumber | Estimate Header | Not displayed in generic DocumentViewDrawer |
| contactPersonName | Estimate Header | Not displayed in generic DocumentViewDrawer |
| salesExecutive | Estimate Header | Not displayed in generic DocumentViewDrawer |
| validTill | Estimate Header | Displayed as validUntil in financials tab |
| materialSelections | Material Selection | Estimate-specific, not in generic DocumentViewDrawer |
| scopeConfiguration | Scope Configuration | Estimate-specific, not in generic DocumentViewDrawer |
| technicalSpecifications | Technical Specifications | Estimate-specific, not in generic DocumentViewDrawer |
| inclusions | Inclusions/Exclusions | Estimate-specific, not in generic DocumentViewDrawer |
| exclusions | Inclusions/Exclusions | Estimate-specific, not in generic DocumentViewDrawer |
| internalNotes | Notes | Not displayed in generic DocumentViewDrawer |
| termsAndConditions | Terms | Not displayed in generic DocumentViewDrawer |
| deliveryTerms | Terms | Not displayed in generic DocumentViewDrawer |
| approvalStatus | Status | Not displayed in generic DocumentViewDrawer |
| includePricing | Pricing | Not displayed in generic DocumentViewDrawer |
| discountPercentage | Pricing | Not displayed in generic DocumentViewDrawer |
| gstType | Tax | Not displayed in generic DocumentViewDrawer |
| leadId | Lead/Project | Not displayed in generic DocumentViewDrawer |
| projectId | Lead/Project | Displayed as projectName in basic info |
| templateId | Template | Not displayed in generic DocumentViewDrawer |

**Evidence:** `DocumentViewDrawer.tsx` lines 112-180

**Note:** DocumentViewDrawer is generic for all document types (Estimate, Proposal, Quotation). It does not display Estimate-specific fields. This is acceptable as Estimate-specific fields are available in EstimateBuilder.

---

## Fields Missing from List Table

| Field Name | Section | Reason |
|------------|---------|--------|
| leadNumber | Estimate Header | Not critical for list view |
| contactPersonName | Estimate Header | Not critical for list view |
| salesExecutive | Estimate Header | Available in filter, not in table |
| validTill | Estimate Header | Not critical for list view |
| version | System | Not critical for list view |
| leadId | Lead/Project | Not critical for list view |
| projectId | Lead/Project | Displayed as projectName |
| includePricing | Pricing | Not critical for list view |
| subtotal | Pricing | totalAmount shown instead |
| taxAmount | Pricing | Not critical for list view |
| discountAmount | Pricing | Not critical for list view |
| discountPercentage | Pricing | Not critical for list view |
| gstType | Tax | Not critical for list view |
| paymentTerms | Terms | Not critical for list view |
| deliveryTerms | Terms | Not critical for list view |
| notes | Terms | Not critical for list view |
| internalNotes | Terms | Not critical for list view |
| termsAndConditions | Terms | Not critical for list view |
| materialSelections | Material Selection | Not critical for list view |
| scopeConfiguration | Scope Configuration | Not critical for list view |
| technicalSpecifications | Technical Specifications | Not critical for list view |
| inclusions | Inclusions/Exclusions | Not critical for list view |
| exclusions | Inclusions/Exclusions | Not critical for list view |
| lineItems | Line Items | Not critical for list view |
| templateId | Template | Not critical for list view |
| approvalStatus | Status | Not critical for list view |
| createdAt | Timestamp | Displayed as Created |
| updatedAt | Timestamp | Not critical for list view |
| sentAt | Timestamp | Not critical for list view |
| viewedAt | Timestamp | Not critical for list view |
| createdBy | Timestamp | Available in filter, not in table |

**Evidence:** `EstimatesPage.tsx` lines 142-156 (columns definition)

**Note:** List table shows essential fields: estimateNumber, customerName, projectName, totalAmount, status, createdAt. This is appropriate for list view.

---

## Fields Missing from Search

| Field Name | Section | Reason |
|------------|---------|--------|
| leadNumber | Estimate Header | Not commonly searched |
| contactPersonName | Estimate Header | Not commonly searched |
| salesExecutive | Estimate Header | Searched as createdBy |
| validTill | Estimate Header | Not commonly searched |
| version | System | Not commonly searched |
| leadId | Lead/Project | Not commonly searched |
| projectId | Lead/Project | Searched as projectName |
| includePricing | Pricing | Not commonly searched |
| subtotal | Pricing | Not commonly searched |
| taxAmount | Pricing | Not commonly searched |
| discountAmount | Pricing | Not commonly searched |
| discountPercentage | Pricing | Not commonly searched |
| gstType | Tax | Not commonly searched |
| paymentTerms | Terms | Not commonly searched |
| deliveryTerms | Terms | Not commonly searched |
| notes | Terms | Not commonly searched |
| internalNotes | Terms | Not commonly searched |
| termsAndConditions | Terms | Not commonly searched |
| materialSelections | Material Selection | Not commonly searched |
| scopeConfiguration | Scope Configuration | Not commonly searched |
| technicalSpecifications | Technical Specifications | Not commonly searched |
| inclusions | Inclusions/Exclusions | Not commonly searched |
| exclusions | Inclusions/Exclusions | Not commonly searched |
| lineItems | Line Items | Not commonly searched |
| templateId | Template | Not commonly searched |
| approvalStatus | Status | Not commonly searched |
| createdAt | Timestamp | Not commonly searched |
| updatedAt | Timestamp | Not commonly searched |
| sentAt | Timestamp | Not commonly searched |
| viewedAt | Timestamp | Not commonly searched |
| createdBy | Timestamp | Searched as salesExecutive |

**Evidence:** `EstimatesPage.tsx` lines 81-87 (search logic)

**Note:** Search covers essential fields: estimateNumber, customerName, projectName, status, createdBy. This is appropriate for search.

---

## Fields Missing from Filter

| Field Name | Section | Reason |
|------------|---------|--------|
| leadNumber | Estimate Header | Not commonly filtered |
| contactPersonName | Estimate Header | Not commonly filtered |
| salesExecutive | Estimate Header | Available as createdBy filter |
| validTill | Estimate Header | Not commonly filtered |
| version | System | Not commonly filtered |
| leadId | Lead/Project | Not commonly filtered |
| projectId | Lead/Project | Available as project filter |
| includePricing | Pricing | Not commonly filtered |
| subtotal | Pricing | Not commonly filtered |
| taxAmount | Pricing | Not commonly filtered |
| discountAmount | Pricing | Not commonly filtered |
| discountPercentage | Pricing | Not commonly filtered |
| gstType | Tax | Not commonly filtered |
| paymentTerms | Terms | Not commonly filtered |
| deliveryTerms | Terms | Not commonly filtered |
| notes | Terms | Not commonly filtered |
| internalNotes | Terms | Not commonly filtered |
| termsAndConditions | Terms | Not commonly filtered |
| materialSelections | Material Selection | Not commonly filtered |
| scopeConfiguration | Scope Configuration | Not commonly filtered |
| technicalSpecifications | Technical Specifications | Not commonly filtered |
| inclusions | Inclusions/Exclusions | Not commonly filtered |
| exclusions | Inclusions/Exclusions | Not commonly filtered |
| lineItems | Line Items | Not commonly filtered |
| templateId | Template | Not commonly filtered |
| approvalStatus | Status | Not commonly filtered |
| createdAt | Timestamp | Not commonly filtered |
| updatedAt | Timestamp | Not commonly filtered |
| sentAt | Timestamp | Not commonly filtered |
| viewedAt | Timestamp | Not commonly filtered |
| createdBy | Timestamp | Available as createdBy filter |

**Evidence:** `EstimatesPage.tsx` lines 124-132 (filterConfigs)

**Note:** Filter covers essential fields: status, customer, project, createdBy. This is appropriate for filtering.

---

## Fields Missing from Export

**All Fields Included in PDF Export.**

**Evidence:** PDF export referenced in EstimatesPage (lines 268-269)

**Note:** PDF export includes all fields. This is good.

---

## Fields Missing from Timeline

**Timeline shows activities, not individual field values.**

**Evidence:** DocumentActivityTimeline component (referenced in DocumentViewDrawer)

**Note:** Timeline is for activity tracking, not field display. This is correct.

---

## Fields Missing from Charts

**All Fields** - Charts functionality is not implemented for documents module.

**Note:** This is a feature gap. Charts should be added for document analytics.

---

## Fields Missing from Dashboard

| Field Name | Section | Reason |
|------------|---------|--------|
| leadNumber | Estimate Header | Not displayed (only aggregated stats) |
| contactPersonName | Estimate Header | Not displayed (only aggregated stats) |
| salesExecutive | Estimate Header | Not displayed (only aggregated stats) |
| validTill | Estimate Header | Not displayed (only aggregated stats) |
| version | System | Not displayed (only aggregated stats) |
| leadId | Lead/Project | Not displayed (only aggregated stats) |
| projectId | Lead/Project | Not displayed (only aggregated stats) |
| includePricing | Pricing | Not displayed (only aggregated stats) |
| subtotal | Pricing | Not displayed (only aggregated stats) |
| taxAmount | Pricing | Not displayed (only aggregated stats) |
| discountAmount | Pricing | Not displayed (only aggregated stats) |
| discountPercentage | Pricing | Not displayed (only aggregated stats) |
| gstType | Tax | Not displayed (only aggregated stats) |
| paymentTerms | Terms | Not displayed (only aggregated stats) |
| deliveryTerms | Terms | Not displayed (only aggregated stats) |
| notes | Terms | Not displayed (only aggregated stats) |
| internalNotes | Terms | Not displayed (only aggregated stats) |
| termsAndConditions | Terms | Not displayed (only aggregated stats) |
| materialSelections | Material Selection | Not displayed (only aggregated stats) |
| scopeConfiguration | Scope Configuration | Not displayed (only aggregated stats) |
| technicalSpecifications | Technical Specifications | Not displayed (only aggregated stats) |
| inclusions | Inclusions/Exclusions | Not displayed (only aggregated stats) |
| exclusions | Inclusions/Exclusions | Not displayed (only aggregated stats) |
| lineItems | Line Items | Not displayed (only aggregated stats) |
| templateId | Template | Not displayed (only aggregated stats) |
| approvalStatus | Status | Not displayed (only aggregated stats) |
| createdAt | Timestamp | Not displayed (only aggregated stats) |
| updatedAt | Timestamp | Not displayed (only aggregated stats) |
| sentAt | Timestamp | Not displayed (only aggregated stats) |
| viewedAt | Timestamp | Not displayed (only aggregated stats) |
| createdBy | Timestamp | Not displayed (only aggregated stats) |

**Evidence:** `EstimatesPage.tsx` lines 97-117 (KPI cards)

**Dashboard Stats Used:**
- Total Estimates (count)
- Draft (count of estimates with status Draft)
- Sent (count of estimates with status Sent)
- Converted (count of estimates with status Converted)

**Note:** This is by design. Dashboard shows high-level metrics only, not individual field values.

---

## Critical Findings

### 1. Material Selection Not Displayed in Detail Page

**Issue:** Material selection, scope configuration, technical specifications are not displayed in detail page.

**Current Behavior:** DocumentViewDrawer is generic for all document types. It does not display Estimate-specific fields.

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

### 6. approvalStatus Not Displayed

**Issue:** approvalStatus is in type definition but not displayed in list table, search, filter, or detail page.

**Current Behavior:** approvalStatus is optional field in type definition.

**Impact:** Users cannot view or filter by approval status.

**Assessment:** This is acceptable. approvalStatus is used internally for approval workflow. status is used for external display.

---

### 7. includePricing Not Displayed

**Issue:** includePricing is in form but not displayed in list table, search, filter, or detail page.

**Current Behavior:** includePricing determines if pricing is included in Estimate.

**Impact:** Users cannot see if pricing is included in Estimate from list view.

**Assessment:** This is acceptable. includePricing is internal flag. Pricing is displayed if included.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🟡 Implement Charts Functionality:**
- Add charts component for document analytics
- Display document trends, conversion rates, status breakdown

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
- leadNumber (low visibility is acceptable)
- contactPersonName (low visibility is acceptable)
- approvalStatus (internal use only)
- includePricing (internal flag)

**🟢 Keep (Dashboard):**
- Dashboard shows high-level metrics only (by design)

**🟢 Keep (Timeline):**
- Timeline correctly uses activity data, not fields

---

**End of Pass 3 Report**
