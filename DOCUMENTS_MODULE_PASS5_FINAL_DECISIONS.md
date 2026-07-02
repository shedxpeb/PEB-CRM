# Documents Module Final Decisions (Pass 5)

**Generated:** 2025-01-06  
**Scope:** Documents Module Field Keep/Improve/Remove Decisions  
**Objective:** Final decision for each of the 25+ document fields based on usage analysis and cross-module flow.

---

## Decision Summary

**🟢 Keep (Essential):** 25+ fields  
**🟡 Improve (Add functionality):** 2 features (charts, detail page enhancements)  
**🔴 Remove (Unused/Redundant):** 0 fields

**Note:** Per golden rule, no fields are removed until all modules (Lead, Customer, Project, Inventory, Documents, Finance, Task, Dashboard, Settings) are audited.

---

## Estimate Header Section

### customerName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, critical for customer identification, auto-filled from Customer module  
**Current Usage:** Form (read-only), Detail, Table, Search, Filter, Export (PDF)  
**Recommendation:** None required

---

### leadNumber 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for lead tracking, auto-filled from Lead module  
**Current Usage:** Form (read-only)  
**Recommendation:** None required (low visibility is acceptable)

---

### version 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail badge), critical for version tracking  
**Current Usage:** Form, Detail (badge), Export (PDF)  
**Recommendation:** None required

---

### projectName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 4 components, critical for project identification  
**Current Usage:** Form, Detail, Table, Search, Filter, Export (PDF)  
**Recommendation:** None required

---

### contactPersonName 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for contact person tracking  
**Current Usage:** Form  
**Recommendation:** None required (low visibility is acceptable)

---

### salesExecutive 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 3 components (form, search as createdBy, filter), useful for sales executive tracking  
**Current Usage:** Form, Search (as createdBy), Filter (as createdBy)  
**Recommendation:** None required

---

### validTill 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components (form, detail as validUntil), critical for validity tracking  
**Current Usage:** Form, Detail (as validUntil), Export (PDF)  
**Recommendation:** None required

---

## Document Info Section

### documentType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail badge), critical for document type identification  
**Current Usage:** Form, Detail (badge), Export (PDF)  
**Recommendation:** None required

---

### customerId 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 3 components, critical for customer linking, flows to Projects and Finance  
**Current Usage:** Form, Detail (as customerName), Table (as customerName), Search (as customerName), Filter (as customerName), Export (PDF)  
**Recommendation:** None required

---

### leadId 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for lead linking  
**Current Usage:** Form  
**Recommendation:** None required (low visibility is acceptable)

---

### projectId 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 3 components, critical for project linking, flows to Projects and Finance  
**Current Usage:** Form, Detail (as projectName), Table (as projectName), Search (as projectName), Filter (as projectName), Export (PDF)  
**Recommendation:** None required

---

### templateId 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for template selection  
**Current Usage:** Form, Export (PDF)  
**Recommendation:** None required

---

## Customer Section (Auto-filled)

### customerName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, critical for customer identification, auto-filled from Customer module  
**Current Usage:** Form (read-only), Detail, Table, Search, Filter, Export (PDF)  
**Recommendation:** None required

---

### customerEmail 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form auto-fill), useful for email tracking, exported to PDF  
**Current Usage:** Form (auto-fill), Export (PDF)  
**Recommendation:** None required

---

### customerPhone 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form auto-fill), useful for phone tracking, exported to PDF  
**Current Usage:** Form (auto-fill), Export (PDF)  
**Recommendation:** None required

---

### customerAddress 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form auto-fill), useful for address tracking, exported to PDF  
**Current Usage:** Form (auto-fill), Export (PDF)  
**Recommendation:** None required

---

### customerGST 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form auto-fill), critical for GST tracking, exported to PDF  
**Current Usage:** Form (auto-fill), Export (PDF)  
**Recommendation:** None required

---

## Status Section

### status 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, critical for status tracking, used in Dashboard KPI  
**Current Usage:** Form, Detail (badge), Table, Search, Filter, Export (PDF), Dashboard (KPI)  
**Recommendation:** None required

---

### approvalStatus 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used internally for approval workflow, not displayed in UI  
**Current Usage:** Internal use only  
**Recommendation:** None required (internal use is acceptable)

---

## Pricing Section

### includePricing 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for pricing toggle  
**Current Usage:** Form  
**Recommendation:** None required (internal flag is acceptable)

---

### subtotal 🟢 Keep

**Decision:** Keep - Calculated field  
**Reason:** Used in 3 components, critical for subtotal tracking, calculated by system  
**Current Usage:** Form (calculated), Detail (KPI), Export (PDF)  
**Recommendation:** None required (calculated field)

---

### taxAmount 🟢 Keep

**Decision:** Keep - Calculated field  
**Reason:** Used in 3 components, critical for tax tracking, calculated by system  
**Current Usage:** Form (calculated), Detail (KPI), Export (PDF)  
**Recommendation:** None required (calculated field)

---

### totalAmount 🟢 Keep

**Decision:** Keep - Calculated field  
**Reason:** Used in 4 components, critical for total tracking, calculated by system  
**Current Usage:** Form (calculated), Detail (KPI), Table, Export (PDF)  
**Recommendation:** None required (calculated field)

---

### discountAmount 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 3 components, critical for discount tracking  
**Current Usage:** Form, Detail (KPI), Export (PDF)  
**Recommendation:** None required

---

### discountPercentage 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for discount percentage tracking  
**Current Usage:** Form, Export (PDF)  
**Recommendation:** None required

---

### gstType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for GST type tracking  
**Current Usage:** Form, Export (PDF)  
**Recommendation:** None required

---

## Line Items Section

### lineItems 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 3 components, critical for line item tracking  
**Current Usage:** Form, Detail (table), Export (PDF)  
**Recommendation:** None required

---

### description 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail table), critical for line item description  
**Current Usage:** Form, Detail (table), Export (PDF)  
**Recommendation:** None required

---

### quantity 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail table), critical for quantity tracking  
**Current Usage:** Form, Detail (table), Export (PDF)  
**Recommendation:** None required

---

### unit 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail table), critical for unit tracking  
**Current Usage:** Form, Detail (table), Export (PDF)  
**Recommendation:** None required

---

### rate 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail table), critical for rate tracking  
**Current Usage:** Form, Detail (table), Export (PDF)  
**Recommendation:** None required

---

### amount 🟢 Keep

**Decision:** Keep - Calculated field  
**Reason:** Used in 2 components (form, detail table), critical for amount tracking, calculated by system  
**Current Usage:** Form (calculated), Detail (table), Export (PDF)  
**Recommendation:** None required (calculated field)

---

### itemId 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for Item Master linking  
**Current Usage:** Form  
**Recommendation:** None required

---

### itemCode 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for item code tracking  
**Current Usage:** Form  
**Recommendation:** None required

---

## Terms Section

### paymentTerms 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 2 components (form, detail), critical for payment terms tracking  
**Current Usage:** Form, Detail, Export (PDF)  
**Recommendation:** None required

---

### deliveryTerms 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components (form, export), useful for delivery terms tracking  
**Current Usage:** Form, Export (PDF)  
**Recommendation:** None required

---

### notes 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components (form, detail), useful for notes tracking  
**Current Usage:** Form, Detail, Export (PDF)  
**Recommendation:** None required

---

### internalNotes 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for internal notes tracking  
**Current Usage:** Form  
**Recommendation:** None required (internal use is acceptable)

---

### termsAndConditions 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 1 component (form), useful for terms and conditions tracking  
**Current Usage:** Form, Export (PDF)  
**Recommendation:** None required

---

## Material Selection Section (Estimate Only)

### materialSelections 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), core of Estimate (Material Selection Builder)  
**Current Usage:** Form (EstimateBuilder)  
**Recommendation:** None required (available in EstimateBuilder)

---

### scopeConfiguration 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for scope configuration  
**Current Usage:** Form (EstimateBuilder)  
**Recommendation:** None required (available in EstimateBuilder)

---

### technicalSpecifications 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for technical specifications  
**Current Usage:** Form (EstimateBuilder)  
**Recommendation:** None required (available in EstimateBuilder)

---

### inclusions 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for inclusions tracking  
**Current Usage:** Form (EstimateBuilder)  
**Recommendation:** None required (available in EstimateBuilder)

---

### exclusions 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 1 component (form), critical for exclusions tracking  
**Current Usage:** Form (EstimateBuilder)  
**Recommendation:** None required (available in EstimateBuilder)

---

## System Fields

### System Fields 🟢 Keep

**Fields:** id, estimateNumber, createdAt, updatedAt, sentAt, viewedAt, createdBy, convertedToProposalId, convertedAt

**Decision:** Keep - All system fields are essential  
**Reason:** System fields are auto-generated and used for data integrity, tracking, and conversion  
**Recommendation:** None required

---

## Feature Improvements

### High Priority (Must Do)

**1. Implement Charts Functionality**

**Current State:** Charts functionality is not implemented for documents module.

**Impact:** No visual representation of document trends, conversion rates, or other analytics.

**Implementation:**
- Add charts component for document analytics
- Display document trends, conversion rates, status breakdown

**Priority:** High - Critical for document analytics

---

### Medium Priority (Should Do)

**2. Add Material Selection to Detail Page**

**Current State:** Material selection, scope configuration, technical specifications are not displayed in detail page.

**Impact:** Users cannot view material selection, scope configuration, or technical specifications in detail page.

**Implementation:**
- Add material selection tab to DocumentViewDrawer
- Display scope configuration in detail page
- Display technical specifications in detail page

**Priority:** Medium - Nice to have for quick reference

---

**3. Add salesExecutive to List Table**

**Current State:** salesExecutive is available in filter but not displayed in list table.

**Impact:** Users can filter by sales executive but cannot see sales executive in list table.

**Implementation:**
- Add salesExecutive column to list table

**Priority:** Medium - Nice to have for quick reference

---

**4. Add validTill to List Table**

**Current State:** validTill is not displayed in list table.

**Impact:** Users cannot see validity date in list view.

**Implementation:**
- Add validTill column to list table

**Priority:** Medium - Nice to have for quick reference

---

## Implementation Priorities

### Phase 1: Critical (Must Do)

1. Implement Charts Functionality

### Phase 2: Nice to Have (Could Do)

1. Add Material Selection to Detail Page
2. Add salesExecutive to List Table
3. Add validTill to List Table

---

## Summary

**Total Fields:** 25+ (Estimate form fields + system fields)

**Keep:** 25+ fields (100%)  
**Improve:** 2 features (charts, detail page enhancements)  
**Remove:** 0 fields (0%)

**Key Findings:**
- All document fields are essential or important for PEB CRM commercial workflow
- No fields are redundant or unused
- Material selection fields have low visibility in detail page (acceptable - available in EstimateBuilder)
- leadNumber, contactPersonName have low visibility (acceptable - operational details)
- Cross-module flow is good (Documents → Projects, Documents → Finance, Documents → Task)
- Charts are not implemented (feature gap)

**Next Steps:**
1. Implement charts (Phase 1)
2. Consider adding material selection to detail page (Phase 2)
3. Consider adding salesExecutive and validTill to list table (Phase 2)
4. Proceed to Pass 6: Business Logic Validation

---

**End of Pass 5 Report**
