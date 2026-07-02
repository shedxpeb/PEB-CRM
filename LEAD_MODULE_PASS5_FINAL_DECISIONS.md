# Lead Module Final Decisions (Pass 5)

**Generated:** 2025-01-06  
**Scope:** Lead Module Field Keep/Improve/Remove Decisions  
**Objective:** Final decision for each of the 33 lead fields based on usage analysis and cross-module flow.

---

## Decision Summary

**🟢 Keep (Essential):** 30 fields  
**🟡 Improve (Add functionality):** 3 fields  
**🔴 Remove (Unused/Redundant):** 0 fields

---

## Customer Details Section

### customerName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 9 components, flows to Customer module, critical for identification  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Search, Export, Conversion  
**Recommendation:** None required

---

### companyName 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 9 components, flows to Customer module, critical for B2B context  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Search, Export, Conversion  
**Recommendation:** None required

---

### mobile 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, flows to Customer module, critical for communication  
**Current Usage:** Form, Detail, Table, Tracker, Hero, Search, Export, Conversion  
**Recommendation:** None required

---

### alternateMobile � Improve

**Decision:** Keep - Improve usage  
**Reason:** Multiple contacts are common in PEB CRM (owner mobile, site engineer mobile, office landline, backup contact). Low usage is not a problem, field should be kept and usage improved.  
**Current Usage:** Form, Detail, Export  
**Recommendation:** Add to Detail view display, add to Conversion mapping (customer.alternateMobile), consider adding to Table for visibility.

---

### email 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, flows to Customer module, critical for communication  
**Current Usage:** Form, Detail, Tracker, Hero, Search, Export, Conversion  
**Recommendation:** None required

---

### gstNumber 🟡 Improve

**Decision:** Improve - Add to conversion  
**Reason:** Important for billing but not mapped to Customer during conversion. Currently only in Form, Detail, Export.  
**Current Usage:** Form, Detail, Export  
**Recommendation:** Map lead.gstNumber to customer.gstNumber in LeadToCustomerConversionDialog.tsx

---

### address 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, flows to Customer module, critical for site visits  
**Current Usage:** Form, Detail, Tracker, Export, Conversion  
**Recommendation:** None required

---

### city 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, flows to Customer module, has filter, critical for regional analysis  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Search, Filter, Export, Conversion  
**Recommendation:** None required

---

### state 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, flows to Customer module, critical for regional analysis  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Search, Export, Conversion  
**Recommendation:** None required

---

### pincode � Keep

**Decision:** Keep - Not required to be searchable  
**Reason:** Useful for regional analysis but business doesn't need to search by pincode. Currently in Form, Detail, Export, Conversion.  
**Current Usage:** Form, Detail, Export, Conversion  
**Recommendation:** None required (search not needed for this field)

---

## Project Details Section

### projectTitle � Keep

**Decision:** Keep - Not required to be filterable  
**Reason:** Searchable which is sufficient. Business doesn't need to filter by project title.  
**Current Usage:** Form, Detail, Search, Export  
**Recommendation:** None required (filter not needed for this field)

---

### projectType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components, has filter, critical for categorization  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Filter, Export  
**Recommendation:** None required

---

## Structure Details Section

### structureType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, has filter, critical for PEB industry  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Filter, Export  
**Recommendation:** None required

---

### width 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components (derived as area), critical for quotations  
**Current Usage:** Form, Detail, Table (derived), Kanban (derived), Tracker, Hero (derived), Export  
**Recommendation:** None required

---

### length 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 6 components (derived as area), critical for quotations  
**Current Usage:** Form, Detail, Table (derived), Kanban (derived), Tracker, Hero (derived), Export  
**Recommendation:** None required

---

### height 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Tracker, Export  
**Current Usage:** Form, Detail, Tracker, Export  
**Recommendation:** None required

---

### baySpacing 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### roofType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### craneRequired 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### craneCapacity 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### mezzanine 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### wallType 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### insulationRequired 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### materialPreference 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for PEB specifications, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

## Site Details Section

### siteLocation 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for construction planning, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### mapCoordinates 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Useful for GPS navigation, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### siteAddress 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for site visits, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### soilNotes 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Critical for foundation planning, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

## Requirement Details Section

### customerNotes 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Important for customization, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### specialRequirement 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Important for customization, used in Form, Detail, Export  
**Current Usage:** Form, Detail, Export  
**Recommendation:** None required

---

### attachments � Improve

**Decision:** Keep - Disable UI, keep field for future  
**Reason:** Attachments are critical for construction CRM (site photos, drawings, PDFs, soil report, BOQ). Current UI is placeholder, but field should be kept for future proper file upload implementation.  
**Current Usage:** Form (UI placeholder), Detail, Export  
**Recommendation:** Disable/disable UI placeholder in form, keep field in type definition, implement proper file upload in future phase.

---

## Business Details Section

### source 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 5 components, has filter, flows to Customer, critical for analytics  
**Current Usage:** Form, Detail, Tracker, Filter, Export, Conversion  
**Recommendation:** None required

---

### priority 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, has filter, critical for prioritization  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Filter, Export  
**Recommendation:** None required

---

### assignedEmployee 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, has filter, flows to Customer, critical for assignment  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Filter, Export, Conversion  
**Recommendation:** None required

---

### nextFollowUpDate 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in 8 components, critical for follow-up management  
**Current Usage:** Form, Detail, Table, Kanban, Tracker, Hero, Export  
**Recommendation:** None required

---

### remarks 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Used in Form, Export, Conversion (as notes), critical for context  
**Current Usage:** Form, Detail, Export, Conversion  
**Recommendation:** None required

---

## Custom Fields Section

### customFields 🟢 Keep

**Decision:** Keep - Essential field  
**Reason:** Dynamic fields based on configuration, used in Form, Detail, Table  
**Current Usage:** Form, Detail, Table (dynamic columns)  
**Recommendation:** None required

---

## System Fields (Not in Form)

### leadId 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in 6 components, critical for identification  
**Recommendation:** None required

---

### id 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used for internal referencing and conversion  
**Recommendation:** None required

---

### status 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in 7 components, has filter, critical for workflow  
**Recommendation:** None required

---

### score 🟢 Keep

**Decision:** Keep - Useful system field  
**Reason:** Used in Table, Kanban, Export, useful for lead scoring  
**Recommendation:** None required

---

### customerId 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Links lead to customer after conversion  
**Recommendation:** None required

---

### createdDate 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in Detail, Table, Export, has filter, critical for analytics  
**Recommendation:** None required

---

### lastFollowUp 🟢 Keep

**Decision:** Keep - Useful system field  
**Reason:** Used in Detail, Tracker, useful for follow-up tracking  
**Recommendation:** None required

---

### convertedDate 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in Detail, set during conversion  
**Recommendation:** None required

---

### createdBy 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in Detail, critical for audit trail  
**Recommendation:** None required

---

### updatedAt 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in Detail, critical for audit trail  
**Recommendation:** None required

---

### assignedEmployeeId 🟢 Keep

**Decision:** Keep - Essential system field  
**Reason:** Used in conversion, links to employee module  
**Recommendation:** None required

---

## Cross-Module Flow Improvements

### Lead → Customer Conversion

**🟡 Improve:** Add missing field mappings

**Fields to Add:**
- gstNumber → customer.gstNumber
- alternateMobile → customer.alternateMobile

**Implementation:** Update `LeadToCustomerConversionDialog.tsx` lines 148-163

---

### Lead → Project Creation

**🟡 Improve:** Pre-fill structure details

**Fields to Pre-fill:**
- structureType → project.structureType
- width → project.width
- length → project.length
- height → project.height
- baySpacing → project.baySpacing
- roofType → project.roofType
- wallType → project.wallType
- insulationRequired → project.insulation
- materialPreference → (map to appropriate project field)

**Implementation:** Add pre-fill logic when creating project from lead

---

### Lead → Task Creation

**🟡 Improve:** Pre-fill assignee and due date

**Fields to Pre-fill:**
- assignedEmployeeId → task.assignedUserId
- nextFollowUpDate → task.dueDate (as suggestion)

**Implementation:** Add pre-fill logic when creating task from lead

---

## Final Statistics

**Total Fields:** 33  
**🟢 Keep:** 30 (91%)  
**🟡 Improve:** 3 (9%)  
**🔴 Remove:** 0 (0%)

**Fields to Improve:**
1. gstNumber - Add to Customer conversion
2. alternateMobile - Add to Customer conversion, improve visibility
3. attachments - Disable UI placeholder, keep field for future file upload

**Cross-Module Flow Improvements:**
- Lead → Customer: Add 2 field mappings (gstNumber, alternateMobile)
- Lead → Project: Add 9 field pre-fills (structure details)
- Lead → Task: Add 2 field pre-fills (assignee, due date)

---

## Implementation Priority

**High Priority (Critical):**
1. Add gstNumber to Customer conversion
2. Add alternateMobile to Customer conversion
3. Pre-fill structure details in Project creation

**Medium Priority (UX Improvement):**
4. Disable attachments UI placeholder (keep field)
5. Improve alternateMobile visibility in Detail view
6. Pre-fill assignee in Task creation
7. Pre-fill due date in Task creation

---

**End of Pass 5 Report**
