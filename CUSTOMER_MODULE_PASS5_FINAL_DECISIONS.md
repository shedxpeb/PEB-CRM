# Customer Module Final Decisions (Pass 5)

**Generated:** 2025-01-06  
**Scope:** Customer Module Field Keep/Improve/Remove Decisions  
**Objective:** Final decision for each of the 21 customer fields based on usage analysis and cross-module flow.

---

## Decision Summary

**🟢 Keep (Essential):** 21 fields  
**🟡 Improve (Add functionality):** 2 fields  
**🔴 Remove (Unused/Redundant):** 0 fields

**Note:** Per golden rule, no fields are removed until all modules (Lead, Customer, Project, Inventory, Documents, Finance, Task, Dashboard, Settings) are audited.

---

## Customer Information Section

### customerName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 7 components, flows to all downstream modules, critical for identification  
**Current Usage:** Form, Detail, Table, Search, Export, Communication, Project, Estimate, Proposal, Quotation, Invoice, Income  
**Recommendation:** None required

---

### companyName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 7 components, flows to all downstream modules, critical for B2B context  
**Current Usage:** Form, Detail, Table, Search, Export, Communication, Project  
**Recommendation:** None required

---

### mobile 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, critical for communication  
**Current Usage:** Form, Detail, Table, Search, Export, Estimate, Proposal, Quotation  
**Recommendation:** Add to Invoice mapping for invoice communication

---

### alternateMobile 🟢 Keep

**Decision:** Keep - Important field  
**Reason:** Used in 3 components, backup contact for PEB CRM (owner, site engineer, office landline)  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for backup contact)

---

### email 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, critical for communication  
**Current Usage:** Form, Detail, Table, Search, Export, Estimate, Proposal, Quotation  
**Recommendation:** Add to Invoice mapping for invoice communication

---

## Business Information Section

### gstNumber 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, flows to Estimate, Proposal, Quotation, Invoice, critical for billing  
**Current Usage:** Form, Detail, Table, Search, Export, Estimate, Proposal, Quotation, Invoice  
**Recommendation:** None required

---

### panNumber 🟢 Keep

**Decision:** Keep - Important field  
**Reason:** Used in 2 components, important for tax compliance  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for compliance field)

---

### industry 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Required field, important for customer categorization  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### businessType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Required field, important for customer categorization  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### website 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components, useful for customer research  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for optional field)

---

## Address Information Section

### address 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 4 components, auto-filled to Project, flows to Estimate, Proposal, Quotation, Invoice, critical for site visits  
**Current Usage:** Form, Detail, Export, Project (auto-fill), Estimate, Proposal, Quotation, Invoice  
**Recommendation:** None required

---

### city 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, has filter, auto-filled to Project, critical for regional analysis  
**Current Usage:** Form, Detail, Table, Search, Filter, Export, Project (auto-fill)  
**Recommendation:** None required

---

### state 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, has filter, auto-filled to Project, critical for regional analysis  
**Current Usage:** Form, Detail, Table, Search, Filter, Export, Project (auto-fill)  
**Recommendation:** None required

---

### country 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components, default value "India"  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for optional field)

---

### pincode 🟢 Keep

**Decision:** Keep - Optional field  
**Reason:** Used in 2 components, auto-filled to Project  
**Current Usage:** Form, Detail, Export, Project (auto-fill)  
**Recommendation:** None required (low usage is acceptable for optional field)

---

## Additional Information Section

### leadSource 🟢 Keep

**Decision:** Keep - Important field  
**Reason:** Required field, important for marketing ROI analysis  
**Current Usage:** Form, Detail, Export  
**Recommendation:** Consider adding to Filter for ROI analysis

---

### status 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, has filter, critical for customer lifecycle management  
**Current Usage:** Form, Detail, Table, Filter, Export, Dashboard  
**Recommendation:** None required

---

### notes 🟢 Keep

**Decision:** Keep - Important field  
**Reason:** Used in 2 components, important for customer context  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for notes field)

---

### assignedEmployee 🟢 Keep

**Decision:** Keep - Important field  
**Reason:** Used in 2 components, important for ownership  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required (low usage is acceptable for ownership field)

---

### assignedEmployeeId 🟢 Keep

**Decision:** Keep - System field  
**Reason:** Internal reference for assigned employee  
**Current Usage:** Form, Export  
**Recommendation:** None required (system field, not displayed in UI)

---

## Lead Selection Section

### leadId 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Reference to originating lead, critical for conversion tracking  
**Current Usage:** Form (create mode), Detail, Export, Project  
**Recommendation:** None required

---

## Custom Fields Section

### customFields 🟢 Keep

**Decision:** Keep - Dynamic field  
**Reason:** Dynamic fields based on customer configuration, extends flexibility  
**Current Usage:** Form, Detail, Table (dynamic columns), Export  
**Recommendation:** None required

---

## System Fields

### System Fields 🟢 Keep

**Fields:** id, customerId, customerSince, totalProjects, activeProjects, completedProjects, totalRevenue, pendingQuotations, pendingFollowups, projectIds, estimateIds, proposalIds, quotationIds, attachments, createdAt, updatedAt

**Decision:** Keep - All system fields are essential  
**Reason:** System fields are auto-generated and used for data integrity, aggregation, and cross-module references  
**Recommendation:** None required

---

## Cross-Module Flow Improvements

### High Priority (Critical)

**1. Add Customer Contact Fields to Invoice**

**Current State:** Invoice maps customerId, customerName, customerAddress, customerGST  
**Missing:** customerEmail, customerPhone  

**Impact:** Invoice PDF cannot include customer contact information for communication

**Implementation:**
- Add customerEmail to Invoice type in `finance/types/index.ts`
- Add customerPhone to Invoice type in `finance/types/index.ts`
- Update Invoice PDF in `pdf/InvoicePDF.tsx` to display contact information
- Update Invoice form to pre-fill customerEmail and customerPhone from Customer

**Priority:** High - Critical for invoice communication workflow

---

### Medium Priority (UX Improvement)

**2. Add leadSource to Filter**

**Current State:** leadSource is not in filter  
**Impact:** Users cannot filter customers by lead source for marketing ROI analysis

**Implementation:**
- Add leadSource to filterConfigs in `page.tsx`
- Use customerConfig.sources for filter options

**Priority:** Medium - Useful for marketing analysis

---

### Low Priority (Optional)

**3. Verify Document Print Templates Use Customer Contact**

**Current State:** Estimate, Proposal, Quotation types have customerEmail and customerPhone mapped  
**Impact:** Ensure print templates display customer contact information

**Implementation:**
- Verify print templates use customerEmail and customerPhone
- Update templates if needed

**Priority:** Low - Verification task

---

## Implementation Priorities

### Phase 1: Critical (Must Do)

1. Add customerEmail and customerPhone to Invoice type and mapping
2. Update Invoice PDF to display customer contact information
3. Update Invoice form to pre-fill customer contact from Customer

### Phase 2: Important (Should Do)

1. Add leadSource to customer filter
2. Verify document print templates use customer contact fields

### Phase 3: Nice to Have (Could Do)

1. Consider adding customer contact to Project for on-site communication

---

## Summary

**Total Fields:** 38 (21 form fields + 1 custom fields + 10 system fields + 6 aggregate stats)

**Keep:** 38 fields (100%)  
**Improve:** 2 fields (mobile, email - add to Invoice)  
**Remove:** 0 fields (0%)

**Key Findings:**
- All customer fields are essential and well-used
- No fields are redundant or unused
- Cross-module flow is good, with one critical gap (Invoice missing contact fields)
- Lead source filter would improve marketing ROI analysis
- Customer module is well-designed with appropriate field usage

**Next Steps:**
1. Implement Invoice contact field mapping (Phase 1)
2. Add leadSource to filter (Phase 2)
3. Proceed to Pass 6: Business Logic Validation

---

**End of Pass 5 Report**
