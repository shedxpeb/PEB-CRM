# Customer Module Business Logic Validation (Pass 6)

**Generated:** 2025-01-06  
**Scope:** Customer Module Business Logic Validation  
**Objective:** Validate business necessity, duplicates, module placement, renaming, missing fields, field dependencies, and conditional validation.

---

## Business Necessity Validation

### Customer Information Section

#### customerName ✅ Essential

**Business Necessity:** Critical for customer identification and communication  
**PEB Context:** Essential for addressing customers in quotations, invoices, and site visits  
**Validation:** Required field, min 2 chars, max 100 chars  
**Verdict:** Keep - Essential

---

#### companyName ✅ Essential

**Business Necessity:** Critical for B2B context, PEB CRM serves businesses not individuals  
**PEB Context:** Essential for legal contracts, quotations, invoices, GST billing  
**Validation:** Required field, min 2 chars, max 100 chars  
**Verdict:** Keep - Essential

---

#### mobile ✅ Essential

**Business Necessity:** Critical for communication with customer (owner, site engineer, office)  
**PEB Context:** Essential for site visits, follow-ups, urgent communication  
**Validation:** Required field, format +91 XXXXX XXXXX  
**Verdict:** Keep - Essential

---

#### alternateMobile ✅ Important

**Business Necessity:** Backup contact (owner, site engineer, office landline)  
**PEB Context:** Important for PEB projects where primary contact may not be available  
**Validation:** Optional field, format +91 XXXXX XXXXX (if entered)  
**Verdict:** Keep - Important

---

#### email ✅ Essential

**Business Necessity:** Critical for sending quotations, invoices, documents  
**PEB Context:** Essential for formal communication, document sharing  
**Validation:** Optional field, email format (if entered)  
**Verdict:** Keep - Essential

---

### Business Information Section

#### gstNumber ✅ Essential

**Business Necessity:** Critical for GST billing, tax compliance  
**PEB Context:** Essential for PEB projects (large value, GST applicable)  
**Validation:** Optional field, GST format (if entered)  
**Verdict:** Keep - Essential

---

#### panNumber ✅ Important

**Business Necessity:** Important for tax compliance, TDS deduction  
**PEB Context:** Important for large PEB projects, vendor registration  
**Validation:** Optional field, PAN format (if entered)  
**Verdict:** Keep - Important

---

#### industry ✅ Essential

**Business Necessity:** Important for customer categorization, targeted marketing  
**PEB Context:** Useful for understanding customer needs (Manufacturing, Construction, etc.)  
**Validation:** Required field, enum (Manufacturing, Construction, Infrastructure, etc.)  
**Verdict:** Keep - Essential

---

#### businessType ✅ Essential

**Business Necessity:** Important for customer categorization, credit assessment  
**PEB Context:** Useful for understanding customer structure (Pvt Ltd, LLP, Partnership, etc.)  
**Validation:** Required field, enum (Pvt Ltd, LLP, Partnership, etc.)  
**Verdict:** Keep - Essential

---

#### website ✅ Optional

**Business Necessity:** Useful for customer research, understanding business scale  
**PEB Context:** Helpful for pre-sales research, understanding customer capabilities  
**Validation:** Optional field, URL format (if entered)  
**Verdict:** Keep - Optional

---

### Address Information Section

#### address ✅ Essential

**Business Necessity:** Critical for site visits, logistics, material delivery  
**PEB Context:** Essential for PEB project execution (site location)  
**Validation:** Required field, min 2 chars, max 500 chars  
**Verdict:** Keep - Essential

---

#### city ✅ Essential

**Business Necessity:** Critical for regional analysis, logistics planning  
**PEB Context:** Essential for PEB project logistics, travel planning  
**Validation:** Required field, min 2 chars, max 50 chars  
**Verdict:** Keep - Essential

---

#### state ✅ Essential

**Business Necessity:** Critical for regional analysis, tax compliance  
**PEB Context:** Essential for PEB projects (state-specific regulations, logistics)  
**Validation:** Required field, min 2 chars, max 50 chars  
**Verdict:** Keep - Essential

---

#### country ✅ Optional

**Business Necessity:** Useful for international customers (rare in PEB CRM)  
**PEB Context:** Default "India" - most PEB customers are domestic  
**Validation:** Optional field, max 50 chars, default "India"  
**Verdict:** Keep - Optional

---

#### pincode ✅ Important

**Business Necessity:** Important for logistics, courier delivery  
**PEB Context:** Important for PEB material delivery, site location  
**Validation:** Optional field, 6 digits (if entered)  
**Verdict:** Keep - Important

---

### Additional Information Section

#### leadSource ✅ Important

**Business Necessity:** Important for marketing ROI analysis  
**PEB Context:** Useful for tracking which channels bring customers (Website, Referral, etc.)  
**Validation:** Required field, enum (Website, Referral, Cold Call, etc.)  
**Verdict:** Keep - Important

---

#### status ✅ Essential

**Business Necessity:** Critical for customer lifecycle management  
**PEB Context:** Essential for tracking customer journey (Prospect, Active, Churned, etc.)  
**Validation:** Optional field, enum (Active, Inactive, Prospect, Converted, Churned), default "Prospect"  
**Verdict:** Keep - Essential

---

#### notes ✅ Important

**Business Necessity:** Important for customer context, special requirements  
**PEB Context:** Useful for recording customer preferences, special conditions  
**Validation:** Optional field, max 1000 chars  
**Verdict:** Keep - Important

---

#### assignedEmployee ✅ Important

**Business Necessity:** Important for ownership, accountability  
**PEB Context:** Important for PEB CRM (sales rep ownership)  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### assignedEmployeeId ✅ System

**Business Necessity:** System field for internal reference  
**PEB Context:** Internal reference for assigned employee  
**Validation:** Optional field  
**Verdict:** Keep - System

---

### Lead Selection Section

#### leadId ✅ Essential

**Business Necessity:** Critical for conversion tracking, lead-to-customer journey  
**PEB Context:** Essential for tracking which lead converted to customer  
**Validation:** Optional field (only in create mode)  
**Verdict:** Keep - Essential

---

### Custom Fields Section

#### customFields ✅ Dynamic

**Business Necessity:** Dynamic fields for flexibility  
**PEB Context:** Allows customization for specific PEB business needs  
**Validation:** Based on configuration  
**Verdict:** Keep - Dynamic

---

## Duplicate or Redundant Fields

### Analysis

**No duplicate or redundant fields found.**

**Customer Module vs Lead Module Comparison:**
- customerName vs customerName: Same field, appropriate (Lead → Customer conversion)
- companyName vs companyName: Same field, appropriate (Lead → Customer conversion)
- mobile vs mobile: Same field, appropriate (Lead → Customer conversion)
- alternateMobile vs alternateMobile: Same field, appropriate (Lead → Customer conversion)
- email vs email: Same field, appropriate (Lead → Customer conversion)
- address vs address: Same field, appropriate (Lead → Customer conversion)
- city vs city: Same field, appropriate (Lead → Customer conversion)
- state vs state: Same field, appropriate (Lead → Customer conversion)
- pincode vs pincode: Same field, appropriate (Lead → Customer conversion)
- leadSource vs source: Different names, same concept (acceptable - Customer uses "leadSource", Lead uses "source")
- assignedEmployee vs assignedEmployee: Same field, appropriate (Lead → Customer conversion)
- assignedEmployeeId vs assignedEmployeeId: Same field, appropriate (Lead → Customer conversion)

**Customer-Specific Fields (not in Lead):**
- gstNumber: Customer-specific (billing)
- panNumber: Customer-specific (tax compliance)
- industry: Customer-specific (categorization)
- businessType: Customer-specific (categorization)
- website: Customer-specific (business info)
- country: Customer-specific (address)
- status: Customer-specific (lifecycle)
- notes: Customer-specific (context)
- leadId: Customer-specific (reference to originating lead)

**Verdict:** No duplicates. Field overlap between Lead and Customer is intentional and appropriate for Lead → Customer conversion.

---

## Module Placement Validation

### Analysis

**All fields are correctly placed in Customer module.**

**Fields that could be in other modules:**

#### gstNumber, panNumber - Could be in Finance module?

**Analysis:** These fields are customer-specific (customer's GST/PAN), not transaction-specific.  
**Verdict:** Correctly placed in Customer module. Finance module references these for billing.

#### industry, businessType - Could be in Settings module?

**Analysis:** While these are enums, they are customer-specific attributes.  
**Verdict:** Correctly placed in Customer module. Configuration in Settings defines the enum options.

#### leadSource - Could be in Lead module?

**Analysis:** This field tracks how the customer was acquired (from which lead source).  
**Verdict:** Correctly placed in Customer module. Lead module has "source" field.

#### assignedEmployee, assignedEmployeeId - Could be in Task module?

**Analysis:** These fields track customer ownership (sales rep), not task assignment.  
**Verdict:** Correctly placed in Customer module. Task module has its own assignment fields.

**Verdict:** All fields are correctly placed in Customer module based on their business context.

---

## Field Renaming Recommendations

### Analysis

**No field renaming required.**

**Field names are clear and consistent:**

- customerName: Clear
- companyName: Clear
- mobile: Clear (primary mobile)
- alternateMobile: Clear (backup mobile)
- email: Clear
- gstNumber: Clear
- panNumber: Clear
- industry: Clear
- businessType: Clear
- website: Clear
- address: Clear
- city: Clear
- state: Clear
- country: Clear
- pincode: Clear
- leadSource: Clear
- status: Clear
- notes: Clear
- assignedEmployee: Clear
- assignedEmployeeId: Clear
- leadId: Clear
- customFields: Clear

**Naming Consistency:**
- All fields use camelCase ✅
- No abbreviations ✅
- Clear, descriptive names ✅

**Verdict:** No renaming required. Field names are clear and consistent.

---

## Missing PEB Business Fields

### Analysis

**Potential missing fields for PEB business context:**

#### 1. creditLimit - Missing

**Business Necessity:** Important for credit management, payment terms  
**PEB Context:** PEB projects are high-value, credit management is critical  
**Priority:** Medium  
**Recommendation:** Add creditLimit field for credit management

---

#### 2. paymentTerms - Missing

**Business Necessity:** Important for billing, cash flow management  
**PEB Context:** PEB projects often have milestone-based payments  
**Priority:** Medium  
**Recommendation:** Add paymentTerms field (e.g., "30 Days", "50% Advance, 50% on Delivery")

---

#### 3. creditRating - Missing

**Business Necessity:** Important for risk assessment, credit decisions  
**PEB Context:** PEB projects are high-value, credit risk assessment is critical  
**Priority:** Low  
**Recommendation:** Add creditRating field (e.g., "A", "B", "C")

---

#### 4. annualRevenue - Missing

**Business Necessity:** Useful for customer segmentation, credit assessment  
**PEB Context:** Helps understand customer scale, project potential  
**Priority:** Low  
**Recommendation:** Add annualRevenue field for customer segmentation

---

#### 5. numberOfEmployees - Missing

**Business Necessity:** Useful for customer segmentation, understanding scale  
**PEB Context:** Helps understand customer size, project potential  
**Priority:** Low  
**Recommendation:** Add numberOfEmployees field for customer segmentation

---

#### 6. yearsInBusiness - Missing

**Business Necessity:** Useful for customer assessment, stability check  
**PEB Context:** Helps assess customer stability, long-term potential  
**Priority:** Low  
**Recommendation:** Add yearsInBusiness field for customer assessment

---

#### 7. primaryContactPerson - Missing

**Business Necessity:** Important for communication (who to contact)  
**PEB Context:** PEB projects need clear point of contact  
**Priority:** Medium  
**Recommendation:** Add primaryContactPerson field (name of primary contact)

---

#### 8. primaryContactDesignation - Missing

**Business Necessity:** Important for communication (role of contact)  
**PEB Context:** Helps understand decision-making authority  
**Priority:** Medium  
**Recommendation:** Add primaryContactDesignation field (e.g., "Owner", "Purchase Manager")

---

#### 9. billingAddress - Missing

**Business Necessity:** Important for invoicing (billing address may differ from site address)  
**PEB Context:** PEB projects often have different billing and site addresses  
**Priority:** High  
**Recommendation:** Add billingAddress field (separate from site address)

---

#### 10. shippingAddress - Missing

**Business Necessity:** Important for material delivery (shipping address)  
**PEB Context:** PEB material delivery needs specific shipping address  
**Priority:** High  
**Recommendation:** Add shippingAddress field (separate from site address)

---

### Summary of Missing Fields

**High Priority:**
- billingAddress - Critical for invoicing
- shippingAddress - Critical for material delivery

**Medium Priority:**
- creditLimit - Important for credit management
- paymentTerms - Important for billing
- primaryContactPerson - Important for communication
- primaryContactDesignation - Important for communication

**Low Priority:**
- creditRating - Useful for risk assessment
- annualRevenue - Useful for segmentation
- numberOfEmployees - Useful for segmentation
- yearsInBusiness - Useful for assessment

---

## Field Dependencies and Conditional Validation

### Analysis

**Current State:** No conditional validation rules exist in Customer module.

**Potential Conditional Validation Rules:**

#### 1. gstNumber → Conditional Validation

**Rule:** If gstNumber is provided, validate GST format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

#### 2. panNumber → Conditional Validation

**Rule:** If panNumber is provided, validate PAN format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

#### 3. email → Conditional Validation

**Rule:** If email is provided, validate email format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

#### 4. website → Conditional Validation

**Rule:** If website is provided, validate URL format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

#### 5. pincode → Conditional Validation

**Rule:** If pincode is provided, validate 6-digit format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

#### 6. alternateMobile → Conditional Validation

**Rule:** If alternateMobile is provided, validate mobile format  
**Current State:** Already implemented (optional field with format validation if entered)  
**Verdict:** ✅ Already implemented correctly

---

### Recommended New Conditional Validation Rules

#### 1. gstNumber → Conditional Required for Business Type

**Rule:** If businessType is "Pvt Ltd", "LLP", "Partnership", or "Government", then gstNumber should be required  
**Rationale:** These business types typically have GST registration  
**Priority:** Medium  
**Implementation:** Add conditional validation in createCustomerSchema

---

#### 2. panNumber → Conditional Required for Business Type

**Rule:** If businessType is "Pvt Ltd", "LLP", "Partnership", or "Government", then panNumber should be required  
**Rationale:** These business types typically have PAN registration  
**Priority:** Medium  
**Implementation:** Add conditional validation in createCustomerSchema

---

#### 3. billingAddress → Conditional Required if Different

**Rule:** If billingAddress is provided, then it should be required to be complete  
**Rationale:** If billing address is different from site address, it should be complete  
**Priority:** Low (field not yet added)  
**Implementation:** Add when billingAddress field is added

---

#### 4. shippingAddress → Conditional Required if Different

**Rule:** If shippingAddress is provided, then it should be required to be complete  
**Rationale:** If shipping address is different from site address, it should be complete  
**Priority:** Low (field not yet added)  
**Implementation:** Add when shippingAddress field is added

---

### Summary of Conditional Validation

**Current State:** ✅ Good - All optional fields have format validation if entered

**Recommended Improvements:**
1. Add conditional required validation for gstNumber based on businessType (Medium priority)
2. Add conditional required validation for panNumber based on businessType (Medium priority)

---

## Final Verdict

### Business Necessity
✅ All fields are essential or important for PEB CRM business context

### Duplicates
✅ No duplicate or redundant fields found

### Module Placement
✅ All fields are correctly placed in Customer module

### Renaming
✅ No field renaming required - field names are clear and consistent

### Missing Fields
⚠️ 10 potential missing fields identified (2 high priority, 4 medium priority, 4 low priority)

### Conditional Validation
✅ Current conditional validation is good
⚠️ 2 recommended improvements for conditional validation

---

## Implementation Recommendations

### Phase 1: High Priority (Must Do)

1. Add billingAddress field (separate from site address)
2. Add shippingAddress field (separate from site address)
3. Add customerEmail and customerPhone to Invoice mapping (from Pass 5)

### Phase 2: Medium Priority (Should Do)

1. Add creditLimit field for credit management
2. Add paymentTerms field for billing
3. Add primaryContactPerson field for communication
4. Add primaryContactDesignation field for communication
5. Add conditional required validation for gstNumber based on businessType
6. Add conditional required validation for panNumber based on businessType
7. Add leadSource to customer filter (from Pass 5)

### Phase 3: Low Priority (Nice to Have)

1. Add creditRating field for risk assessment
2. Add annualRevenue field for segmentation
3. Add numberOfEmployees field for segmentation
4. Add yearsInBusiness field for assessment

---

## Summary

**Customer Module Business Logic Validation:** ✅ Good

**Strengths:**
- All fields are essential or important for PEB CRM
- No duplicate or redundant fields
- All fields are correctly placed
- Field names are clear and consistent
- Current conditional validation is good

**Areas for Improvement:**
- Add billingAddress and shippingAddress fields (high priority)
- Add credit management fields (medium priority)
- Add contact person fields (medium priority)
- Improve conditional validation for GST/PAN based on business type (medium priority)

**Overall Assessment:** Customer module is well-designed with appropriate fields for PEB CRM business context. Recommended improvements are enhancements, not fixes.

---

**End of Pass 6 Report**
