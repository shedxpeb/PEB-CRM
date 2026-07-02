# Lead Module Business Logic Validation (Pass 6)

**Generated:** 2025-01-06  
**Scope:** Lead Module Business Logic Validation  
**Objective:** Verify business necessity, check for duplicates, wrong module placement, renaming needs, and missing PEB-specific fields.

---

## 1. Business Necessity Validation

### Customer Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| customerName | Essential | Contact person name | ✅ Valid |
| companyName | Essential | B2B business name | ✅ Valid |
| mobile | Essential | Primary communication | ✅ Valid |
| alternateMobile | Important | Backup contact (owner, site engineer, office landline) | ✅ Valid |
| email | Essential | Communication, quotations | ✅ Valid |
| gstNumber | Important | Billing, invoicing | ✅ Valid (Optional) |
| address | Essential | Site visits, delivery | ✅ Valid |
| city | Essential | Regional analysis, logistics | ✅ Valid |
| state | Essential | Regional analysis, logistics | ✅ Valid |
| pincode | Important | Delivery, logistics | ✅ Valid |

**Verdict:** All customer detail fields are business-necessary for PEB CRM.

---

### Project Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| projectTitle | Essential | Project identification | ✅ Valid |
| projectType | Essential | PEB categorization (Factory, Warehouse, etc.) | ✅ Valid |

**Verdict:** All project detail fields are business-necessary for PEB CRM.

---

### Structure Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| structureType | Essential | PEB vs Conventional vs Hybrid | ✅ Valid |
| width | Essential | Building dimensions for quotation | ✅ Valid |
| length | Essential | Building dimensions for quotation | ✅ Valid |
| height | Essential | Building dimensions for quotation | ✅ Valid |
| baySpacing | Essential | Structural design parameter | ✅ Valid |
| roofType | Essential | Roofing specification | ✅ Valid |
| craneRequired | Essential | Crane system requirement | ✅ Valid |
| craneCapacity | Essential | Crane capacity in tons | ✅ Valid |
| mezzanine | Essential | Mezzanine floor requirement | ✅ Valid |
| wallType | Essential | Wall cladding specification | ✅ Valid |
| insulationRequired | Essential | Thermal insulation requirement | ✅ Valid |
| materialPreference | Important | Material preference (Galvalume, etc.) | ✅ Valid |

**Verdict:** All structure detail fields are business-necessary for PEB CRM. These are critical for quotations and design.

---

### Site Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| siteLocation | Essential | Site identification | ✅ Valid |
| mapCoordinates | Important | GPS navigation for site visits | ✅ Valid |
| siteAddress | Essential | Site visits, logistics | ✅ Valid |
| soilNotes | Important | Foundation design, soil testing | ✅ Valid |

**Verdict:** All site detail fields are business-necessary for PEB CRM.

---

### Requirement Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| customerNotes | Important | Customer-specific requirements | ✅ Valid |
| specialRequirement | Important | Custom specifications | ✅ Valid |
| attachments | Important | Site photos, drawings, soil report, BOQ | ✅ Valid |

**Verdict:** All requirement detail fields are business-necessary for PEB CRM.

---

### Business Details Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| source | Essential | Lead source tracking, ROI analysis | ✅ Valid |
| priority | Essential | Lead prioritization | ✅ Valid |
| assignedEmployee | Essential | Sales representative assignment | ✅ Valid |
| nextFollowUpDate | Essential | Follow-up management | ✅ Valid |
| remarks | Important | Additional context | ✅ Valid |

**Verdict:** All business detail fields are business-necessary for PEB CRM.

---

### Custom Fields Section

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| customFields | Essential | Dynamic fields for customization | ✅ Valid |

**Verdict:** Custom fields are business-necessary for flexibility.

---

### System Fields

| Field | Business Necessity | PEB Context | Verdict |
|-------|-------------------|-------------|---------|
| leadId | Essential | Unique identification | ✅ Valid |
| id | Essential | Internal reference | ✅ Valid |
| status | Essential | Workflow management | ✅ Valid |
| score | Important | Lead scoring for prioritization | ✅ Valid |
| customerId | Essential | Link to customer after conversion | ✅ Valid |
| createdDate | Essential | Analytics, reporting | ✅ Valid |
| lastFollowUp | Important | Follow-up tracking | ✅ Valid |
| convertedDate | Essential | Conversion tracking | ✅ Valid |
| createdBy | Essential | Audit trail | ✅ Valid |
| updatedAt | Essential | Audit trail | ✅ Valid |
| assignedEmployeeId | Essential | Employee reference | ✅ Valid |

**Verdict:** All system fields are business-necessary.

---

## 2. Duplicate Fields Check

**Analysis:** No duplicate fields found in Lead module.

**Cross-Module Potential Duplicates:**
- `customerName` exists in both Lead and Customer (intentional - flows during conversion)
- `companyName` exists in both Lead and Customer (intentional - flows during conversion)
- `mobile` exists in both Lead and Customer (intentional - flows during conversion)
- `email` exists in both Lead and Customer (intentional - flows during conversion)
- `address` exists in both Lead and Customer (intentional - flows during conversion)
- `city` exists in both Lead and Customer (intentional - flows during conversion)
- `state` exists in both Lead and Customer (intentional - flows during conversion)
- `pincode` exists in both Lead and Customer (intentional - flows during conversion)
- `assignedEmployee` exists in both Lead and Customer (intentional - flows during conversion)

**Verdict:** Cross-module duplicates are intentional for data flow during conversion. No issues.

---

## 3. Fields in Wrong Module Check

**Analysis:** All fields are correctly placed in Lead module.

**Potential Misplacements:**
- None identified

**Fields that could be in other modules but are correctly in Lead:**
- Structure details (width, length, height, etc.) - Could be in Project module, but correctly in Lead for quotation purposes
- Site details (siteLocation, siteAddress, etc.) - Could be in Project module, but correctly in Lead for initial site assessment

**Verdict:** All fields are correctly placed. Structure and site details are needed in Lead for quotation and initial assessment before project creation.

---

## 4. Fields That Should Move to Future Modules

**Analysis:** No fields should move to future modules.

**Rationale:**
- All fields are needed in Lead for the sales/enquiry phase
- Structure details are needed for quotation generation
- Site details are needed for initial site assessment
- Moving any field to a future module would break the sales workflow

**Verdict:** No fields need to move.

---

## 5. UI-Only Unused Fields Check

**Analysis:** One UI-only field identified.

| Field | Status | Issue | Recommendation |
|-------|--------|-------|----------------|
| attachments | UI placeholder | No actual file upload implementation | Disable UI, keep field for future implementation |

**Verdict:** attachments field should have UI disabled but field kept for future file upload feature.

---

## 6. Fields That Need Renaming

**Analysis:** No fields need renaming.

**Potential Renaming Considerations:**
- `projectTitle` → Could be `projectName` for consistency with Project module
- `craneRequired` → Could be `craneSystem` for consistency with Project module
- `insulationRequired` → Could be `insulation` for consistency with Project module

**Decision:** Keep current names. They are descriptive and clear. Consistency with Project module is not critical as these are different contexts (Lead enquiry vs Project execution).

**Verdict:** No renaming required.

---

## 7. Missing PEB Business Fields

**Analysis:** Several PEB-specific fields may be missing based on industry standards.

### Potentially Missing Fields

| Field | Business Necessity | PEB Context | Priority | User Decision |
|-------|-------------------|-------------|----------|---------------|
| estimatedValue | Important | Estimated project value for qualification | Medium | ✅ Add (Future Enhancement) |
| budgetRange | Important | Customer budget range for qualification | Medium | ✅ Add (Future Enhancement) |
| decisionMaker | Important | Key decision maker contact | Medium | 🟡 Add (Future Enhancement) |
| expectedDeliveryDate | Important | Customer's expected delivery date | Medium | 🟡 Add (Optional, Future) |
| decisionMakerRole | Important | Role of decision maker (Owner, Purchase Manager, etc.) | Medium | ❌ Skip (Can add later if needed) |
| installationLocation | Important | Different from site address (if applicable) | Low |
| electricalLoad | Important | Electrical load requirement | Low |
| fireProtection | Important | Fire protection requirement | Low |
| windLoad | Important | Wind load zone for design | Low |
| seismicZone | Important | Seismic zone for design | Low |
| buildingCode | Important | Building code compliance | Low |
| usageType | Important | Building usage (Storage, Manufacturing, etc.) | Low |
| ventilationRequirement | Important | Ventilation requirements | Low |
| lightingRequirement | Important | Lighting requirements | Low |
| drainageRequirement | Important | Drainage requirements | Low |
| waterRequirement | Important | Water requirements | Low |
| powerRequirement | Important | Power requirements | Low |
| accessRoadCondition | Important | Site access for material delivery | Low |
| nearbyStructures | Important | Nearby structures for safety | Low |
| undergroundUtilities | Important | Underground utilities information | Low |
| environmentalConstraints | Important | Environmental constraints | Low |
| localApprovals | Important | Local approvals required | Low |
| timelineUrgency | Important | Timeline urgency (Normal, Urgent, Critical) | Medium |

### Recommendation (Based on User Feedback)

**Future Enhancement Fields (Add when ready):**
1. `estimatedValue` - Critical for lead qualification and sales prioritization
2. `budgetRange` - Critical for lead qualification
3. `decisionMaker` - Important for sales communication

**Optional Future Fields (Add if needed):**
4. `expectedDeliveryDate` - Optional, useful for project planning
5. `timelineUrgency` - Optional, useful for prioritization

**Skipped (Can add later):**
- `decisionMakerRole` - Can be added later if decisionMaker field is implemented and role becomes necessary
7. `electricalLoad` - Important for design
8. `fireProtection` - Important for design
9. `usageType` - Important for design

**Low Priority Missing Fields:**
- Technical design parameters (windLoad, seismicZone, buildingCode) - Can be added in Design module
- Site-specific details (accessRoadCondition, nearbyStructures, undergroundUtilities) - Can be added in Project module
- Environmental/regulatory (environmentalConstraints, localApprovals) - Can be added in Project module

**Verdict:** Add 3 future enhancement fields when ready. Other fields can be added to Design/Project modules when implemented.

---

## 8. Field Grouping Validation

**Current Sections:**
1. Customer Details ✅
2. Project Details ✅
3. Structure Details ✅
4. Site Details ✅
5. Requirement Details ✅
6. Business Details ✅

**Potential Improvements:**
- Consider adding "Qualification Details" section for estimatedValue, budgetRange, decisionMaker fields
- Consider adding "Timeline Details" section for expectedDeliveryDate, timelineUrgency

**Verdict:** Current grouping is logical. New sections can be added when new fields are implemented.

---

## 9. Field Type Validation

**Analysis:** All field types are appropriate for their purpose.

| Field | Current Type | Validation |
|-------|--------------|------------|
| customerName | string | ✅ Appropriate |
| companyName | string | ✅ Appropriate |
| mobile | string | ✅ Appropriate (phone number format validation needed) |
| email | string | ✅ Appropriate (email format validation needed) |
| gstNumber | string | ✅ Appropriate (GST format validation needed) |
| width | number | ✅ Appropriate |
| length | number | ✅ Appropriate |
| height | number | ✅ Appropriate |
| craneCapacity | number | ✅ Appropriate |
| createdDate | Date | ✅ Appropriate |
| nextFollowUpDate | Date | ✅ Appropriate |

**Verdict:** All field types are appropriate. Format validation should be added for phone, email, GST.

---

## 10. Field Dependency Validation

**Analysis:** Some fields have logical dependencies.

**Dependencies Identified:**
- `craneCapacity` should only be required if `craneRequired` is true
- `mezzanine` may require additional fields (mezzanineArea, mezzanineLoad)
- `insulationRequired` may require additional fields (insulationType, insulationThickness)

**Current Implementation:**
- Dependencies are not enforced in the form
- Conditional logic exists in display but not in validation

**User Feedback:** Conditional validation should be implemented to improve UX.

**Implementation Examples:**

**Example 1: Crane Dependency**
```
Crane Required = Yes
↓
Show Crane Capacity (Required)
↓
Validate Crane Capacity > 0

Crane Required = No
↓
Hide Crane Capacity
↓
No validation needed
```

**Example 2: Mezzanine Dependency**
```
Mezzanine = Yes
↓
Show Mezzanine Details (Area, Load)
↓
Validate Mezzanine Area > 0
↓
Validate Mezzanine Load > 0

Mezzanine = No
↓
Hide Mezzanine Details
↓
No validation needed
```

**Example 3: Insulation Dependency**
```
Insulation Required = Yes
↓
Show Insulation Type (Required)
↓
Show Insulation Thickness (Required)
↓
Validate Insulation Type selected
↓
Validate Insulation Thickness > 0

Insulation Required = No
↓
Hide Insulation Type
↓
Hide Insulation Thickness
↓
No validation needed
```

**Recommendation:** Add conditional validation rules in form to enforce dependencies. This will significantly improve UX by showing/hiding relevant fields based on user selections.

---

## Final Business Logic Validation Summary

**✅ Business Necessity:** All 33 fields are business-necessary for PEB CRM  
**✅ Duplicate Fields:** No duplicates found  
**✅ Wrong Module:** No fields in wrong module  
**✅ Future Module Moves:** No fields need to move  
**⚠️ UI-Only Field:** 1 field (attachments) - UI placeholder, keep field for future  
**✅ Renaming:** No fields need renaming  
**🟡 Missing Fields:** 3 future enhancement fields identified (estimatedValue, budgetRange, decisionMaker)  
**✅ Field Grouping:** Current grouping is logical  
**✅ Field Types:** All types are appropriate  
**⚠️ Field Dependencies:** Conditional validation not enforced (should be implemented)

---

## Recommendations (Based on User Feedback)

### Immediate Actions (Pass 6)

1. **Implement Conditional Validation:**
   - Crane Required = Yes → Show/Validate Crane Capacity
   - Crane Required = No → Hide Crane Capacity
   - Mezzanine = Yes → Show/Validate Mezzanine Details
   - Mezzanine = No → Hide Mezzanine Details
   - Insulation Required = Yes → Show/Validate Insulation Type & Thickness
   - Insulation Required = No → Hide Insulation fields

2. **Disable Attachments UI Placeholder:**
   - Disable UI placeholder in LeadForm
   - Keep field in type definition for future file upload
   - Document for future implementation

3. **Add GST to Customer Conversion:**
   - Copy GST only if available in lead
   - If lead.gstNumber is empty, customer.gstNumber remains empty
   - Lead → Customer conversion should work without GST

4. **Add AlternateMobile to Customer Conversion:**
   - Map lead.alternateMobile to customer.alternateMobile
   - Improve alternateMobile visibility in Detail view

### Future Actions (When Ready)

5. **Add Future Enhancement Fields:**
   - estimatedValue (number) - Lead qualification
   - budgetRange (select: <10L, 10-25L, 25-50L, 50L-1Cr, >1Cr) - Lead qualification
   - decisionMaker (string) - Sales communication
   - expectedDeliveryDate (Date) - Optional, project planning

6. **Add Format Validation:**
   - Phone number format validation
   - Email format validation
   - GST format validation (only if GST is entered)

---

**End of Pass 6 Report**
