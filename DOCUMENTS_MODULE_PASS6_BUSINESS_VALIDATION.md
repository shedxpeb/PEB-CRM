# Documents Module Business Logic Validation (Pass 6)

**Generated:** 2025-01-06  
**Scope:** Documents Module Business Logic Validation  
**Objective:** Validate business necessity, duplicates, module placement, renaming, missing fields, field dependencies, and conditional validation.

---

## Business Necessity Validation

### Estimate Header Section

#### customerName ✅ Essential

**Business Necessity:** Critical for customer identification, document tracking  
**PEB Context:** Essential for PEB commercial workflow (Lead → Customer → Estimate)  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Essential

---

#### leadNumber ✅ Important

**Business Necessity:** Important for lead tracking, conversion tracking  
**PEB Context:** Important for PEB lead-to-estimate conversion  
**Validation:** Auto-filled from Lead module  
**Verdict:** Keep - Important

---

#### version ✅ Essential

**Business Necessity:** Critical for version tracking, revision management  
**PEB Context:** Essential for PEB document versioning  
**Validation:** Min value of 1  
**Verdict:** Keep - Essential

---

#### projectName ✅ Essential

**Business Necessity:** Critical for project identification, document-to-project linking  
**PEB Context:** Essential for PEB project creation from documents  
**Validation:** Required field  
**Verdict:** Keep - Essential

---

#### contactPersonName ✅ Important

**Business Necessity:** Important for contact person tracking, communication  
**PEB Context:** Important for PEB customer communication  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### salesExecutive ✅ Important

**Business Necessity:** Important for sales executive tracking, ownership  
**PEB Context:** Important for PEB sales team tracking  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### validTill ✅ Important

**Business Necessity:** Important for validity tracking, expiration management  
**PEB Context:** Important for PEB quotation validity  
**Validation:** Date format  
**Verdict:** Keep - Important

---

### Document Info Section

#### documentType ✅ Essential

**Business Necessity:** Critical for document type identification, workflow  
**PEB Context:** Essential for PEB commercial workflow (Estimate → Proposal → Quotation)  
**Validation:** Enum (Estimate, Proposal, Quotation)  
**Verdict:** Keep - Essential

---

#### customerId ✅ Essential

**Business Necessity:** Critical for customer linking, document ownership  
**PEB Context:** Essential for PEB commercial workflow  
**Validation:** Required field  
**Verdict:** Keep - Essential

---

#### leadId ✅ Important

**Business Necessity:** Important for lead linking, conversion tracking  
**PEB Context:** Important for PEB lead-to-estimate conversion  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### projectId ✅ Important

**Business Necessity:** Important for project linking, document-to-project conversion  
**PEB Context:** Important for PEB document-to-project conversion  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### templateId ✅ Important

**Business Necessity:** Important for template selection, document formatting  
**PEB Context:** Important for PEB document standardization  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

### Customer Section (Auto-filled)

#### customerName ✅ Essential

**Business Necessity:** Critical for customer identification, document tracking  
**PEB Context:** Essential for PEB commercial workflow  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Essential

---

#### customerEmail ✅ Important

**Business Necessity:** Important for email communication, document sending  
**PEB Context:** Important for PEB customer communication  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Important

---

#### customerPhone ✅ Important

**Business Necessity:** Important for phone communication, document sending  
**PEB Context:** Important for PEB customer communication  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Important

---

#### customerAddress ✅ Important

**Business Necessity:** Important for address tracking, document printing  
**PEB Context:** Important for PEB document printing  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Important

---

#### customerGST ✅ Essential

**Business Necessity:** Critical for GST tracking, tax calculation  
**PEB Context:** Essential for PEB GST compliance  
**Validation:** Auto-filled from Customer module  
**Verdict:** Keep - Essential

---

### Status Section

#### status ✅ Essential

**Business Necessity:** Critical for status tracking, workflow management  
**PEB Context:** Essential for PEB commercial workflow  
**Validation:** Enum (Draft, Sent, Viewed, Accepted, Rejected, Expired, Converted, Cancelled)  
**Verdict:** Keep - Essential

---

#### approvalStatus ✅ Important

**Business Necessity:** Important for approval workflow, internal review  
**PEB Context:** Important for PEB internal approval process  
**Validation:** Enum (Pending, Approved, Rejected, Cancelled)  
**Verdict:** Keep - Important

---

### Pricing Section

#### includePricing ✅ Essential

**Business Necessity:** Critical for pricing toggle, Estimate vs Quotation distinction  
**PEB Context:** Essential for PEB workflow (Estimate is Material Selection Builder, NOT pricing document)  
**Validation:** Boolean  
**Verdict:** Keep - Essential

---

#### subtotal ✅ Essential

**Business Necessity:** Critical for subtotal tracking, financial reporting  
**PEB Context:** Essential for PEB commercial documents  
**Validation:** Calculated field, must be positive  
**Verdict:** Keep - Essential

---

#### taxAmount ✅ Essential

**Business Necessity:** Critical for tax tracking, GST compliance  
**PEB Context:** Essential for PEB GST compliance  
**Validation:** Calculated field, must be positive  
**Verdict:** Keep - Essential

---

#### totalAmount ✅ Essential

**Business Necessity:** Critical for total tracking, financial reporting  
**PEB Context:** Essential for PEB commercial documents  
**Validation:** Calculated field, must be positive  
**Verdict:** Keep - Essential

---

#### discountAmount ✅ Important

**Business Necessity:** Important for discount tracking, pricing flexibility  
**PEB Context:** Important for PEB pricing flexibility  
**Validation:** Optional field, must be positive (if entered)  
**Verdict:** Keep - Important

---

#### discountPercentage ✅ Important

**Business Necessity:** Important for discount tracking, pricing flexibility  
**PEB Context:** Important for PEB pricing flexibility  
**Validation:** Optional field, must be 0-100 (if entered)  
**Verdict:** Keep - Important

---

#### gstType ✅ Essential

**Business Necessity:** Critical for GST type tracking, tax calculation  
**PEB Context:** Essential for PEB GST compliance (CGST, SGST, IGST, CESS)  
**Validation:** Enum (CGST, SGST, IGST, CESS)  
**Verdict:** Keep - Essential

---

### Line Items Section

#### lineItems ✅ Essential

**Business Necessity:** Critical for line item tracking, document content  
**PEB Context:** Essential for PEB commercial documents  
**Validation:** Array, min 1 item  
**Verdict:** Keep - Essential

---

#### description ✅ Essential

**Business Necessity:** Critical for line item description, clarity  
**PEB Context:** Essential for PEB material description  
**Validation:** Required field, min 1 char  
**Verdict:** Keep - Essential

---

#### quantity ✅ Essential

**Business Necessity:** Critical for quantity tracking, material planning  
**PEB Context:** Essential for PEB material planning  
**Validation:** Required field, must be positive  
**Verdict:** Keep - Essential

---

#### unit ✅ Essential

**Business Necessity:** Critical for unit tracking, material specification  
**PEB Context:** Essential for PEB material specification  
**Validation:** Required field, min 1 char  
**Verdict:** Keep - Essential

---

#### rate ✅ Essential

**Business Necessity:** Critical for rate tracking, pricing  
**PEB Context:** Essential for PEB pricing  
**Validation:** Required field, must be positive  
**Verdict:** Keep - Essential

---

#### amount ✅ Essential

**Business Necessity:** Critical for amount tracking, line item total  
**PEB Context:** Essential for PEB pricing  
**Validation:** Calculated field, must be positive  
**Verdict:** Keep - Essential

---

#### itemId ✅ Important

**Business Necessity:** Important for Item Master linking, product reference  
**PEB Context:** Important for PEB product catalog reference  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### itemCode ✅ Important

**Business Necessity:** Important for item code tracking, product reference  
**PEB Context:** Important for PEB product catalog reference  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

### Terms Section

#### paymentTerms ✅ Essential

**Business Necessity:** Critical for payment terms tracking, contract terms  
**PEB Context:** Essential for PEB commercial contract terms  
**Validation:** Required field, min 1 char  
**Verdict:** Keep - Essential

---

#### deliveryTerms ✅ Important

**Business Necessity:** Important for delivery terms tracking, contract terms  
**PEB Context:** Important for PEB commercial contract terms  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### notes ✅ Important

**Business Necessity:** Important for notes tracking, additional information  
**PEB Context:** Important for PEB document notes  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### internalNotes ✅ Important

**Business Necessity:** Important for internal notes tracking, internal communication  
**PEB Context:** Important for PEB internal communication  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

#### termsAndConditions ✅ Important

**Business Necessity:** Important for terms and conditions tracking, contract terms  
**PEB Context:** Important for PEB commercial contract terms  
**Validation:** Optional field  
**Verdict:** Keep - Important

---

### Material Selection Section (Estimate Only)

#### materialSelections ✅ Essential

**Business Necessity:** Critical for material selection, Estimate core functionality  
**PEB Context:** Essential for PEB Estimate (Material Selection Builder)  
**Validation:** Array, min 1 item  
**Verdict:** Keep - Essential

---

#### scopeConfiguration ✅ Essential

**Business Necessity:** Critical for scope configuration, service definition  
**PEB Context:** Essential for PEB scope definition (labour, installation, etc.)  
**Validation:** Object  
**Verdict:** Keep - Essential

---

#### technicalSpecifications ✅ Essential

**Business Necessity:** Critical for technical specifications, building details  
**PEB Context:** Essential for PEB building specifications  
**Validation:** Object  
**Verdict:** Keep - Essential

---

#### inclusions ✅ Essential

**Business Necessity:** Critical for inclusions tracking, scope definition  
**PEB Context:** Essential for PEB scope definition  
**Validation:** Array  
**Verdict:** Keep - Essential

---

#### exclusions ✅ Essential

**Business Necessity:** Critical for exclusions tracking, scope definition  
**PEB Context:** Essential for PEB scope definition  
**Validation:** Array  
**Verdict:** Keep - Essential

---

## Duplicate or Redundant Fields

### Analysis

**No duplicate or redundant fields found.**

**Documents Module vs Customer Module Comparison:**
- customerId, customerName, customerEmail, customerPhone, customerAddress, customerGST - Same fields, appropriate (Customer → Documents reference)
- These fields are intentionally duplicated between Customer and Documents for Customer → Documents reference

**Documents Module vs Projects Module Comparison:**
- projectId, projectName - Same fields, appropriate (Documents → Projects reference)
- These fields are intentionally duplicated between Documents and Projects for Documents → Projects reference

**Documents Module vs Finance Module Comparison:**
- customerId, customerName, customerAddress, customerGST - Same fields, appropriate (Documents → Finance reference)
- These fields are intentionally duplicated between Documents and Finance for Documents → Finance reference

**Documents-Specific Fields (not in Customer, Projects, or Finance):**
- All pricing fields (subtotal, taxAmount, totalAmount, discountAmount, discountPercentage, gstType)
- All line item fields (description, quantity, unit, rate, amount, itemId, itemCode)
- All terms fields (paymentTerms, deliveryTerms, notes, internalNotes, termsAndConditions)
- All material selection fields (materialSelections, scopeConfiguration, technicalSpecifications, inclusions, exclusions)
- Header fields (contactPersonName, salesExecutive, validTill)
- Status fields (status, approvalStatus)
- Template fields (templateId)

**Verdict:** No duplicates. Field overlap between Documents and Customer/Projects/Finance is intentional and appropriate for reference relationships.

---

## Module Placement Validation

### Analysis

**All fields are correctly placed in Documents module.**

**Fields that could be in other modules:**

#### customerGST - Could be in Customer module?

**Analysis:** customerGST is in Customer module and auto-filled to Documents. Documents stores customerGST for document printing and GST calculation.  
**Verdict:** Correctly placed in Documents module (auto-filled from Customer module).

#### pricing fields - Could be in Finance module?

**Analysis:** Pricing fields (subtotal, taxAmount, totalAmount) are in Documents for document pricing. Finance has its own pricing for invoicing.  
**Verdict:** Correctly placed in Documents module. Finance has its own pricing for invoicing.

#### materialSelections - Could be in Inventory module?

**Analysis:** materialSelections is in Documents for material selection in BOQ. Inventory has its own material tracking for stock.  
**Verdict:** Correctly placed in Documents module. Inventory has its own material tracking for stock.

**Verdict:** All fields are correctly placed in Documents module based on their business context.

---

## Field Renaming Recommendations

### Analysis

**No field renaming required.**

**Field names are clear and consistent:**
- customerName: Clear
- leadNumber: Clear
- version: Clear
- projectName: Clear
- contactPersonName: Clear
- salesExecutive: Clear
- validTill: Clear
- documentType: Clear
- customerId: Clear
- leadId: Clear
- projectId: Clear
- templateId: Clear
- status: Clear
- approvalStatus: Clear
- includePricing: Clear
- subtotal: Clear
- taxAmount: Clear
- totalAmount: Clear
- discountAmount: Clear
- discountPercentage: Clear
- gstType: Clear
- paymentTerms: Clear
- deliveryTerms: Clear
- notes: Clear
- internalNotes: Clear
- termsAndConditions: Clear

**Naming Consistency:**
- All fields use camelCase ✅
- No abbreviations ✅
- Clear, descriptive names ✅

**Verdict:** No renaming required. Field names are clear and consistent.

---

## Missing PEB Business Fields

### Analysis

**Potential missing fields for PEB documents context:**

#### 1. quotationValidityDays - Missing

**Business Necessity:** Important for quotation validity period calculation  
**PEB Context:** Important for PEB quotation validity (e.g., 30 days, 60 days)  
**Priority:** Medium  
**Recommendation:** Add quotationValidityDays field for validity period calculation

---

#### 2. revisionReason - Missing

**Business Necessity:** Important for revision tracking, change management  
**PEB Context:** Important for PEB document revision tracking  
**Priority:** Medium  
**Recommendation:** Add revisionReason field for revision tracking

---

#### 3. approvalWorkflowId - Missing

**Business Necessity:** Important for approval workflow tracking  
**PEB Context:** Important for PEB internal approval process  
**Priority:** Medium  
**Recommendation:** Add approvalWorkflowId field for approval workflow tracking

---

#### 4. signedBy - Missing

**Business Necessity:** Important for signature tracking, contract validation  
**PEB Context:** Important for PEB contract validation  
**Priority:** Low  
**Recommendation:** Add signedBy field for signature tracking

---

#### 5. signedDate - Missing

**Business Necessity:** Important for signature date tracking, contract validation  
**PEB Context:** Important for PEB contract validation  
**Priority:** Low  
**Recommendation:** Add signedDate field for signature date tracking

---

### Summary of Missing Fields

**High Priority:** None

**Medium Priority:**
- quotationValidityDays - Important for validity period calculation
- revisionReason - Important for revision tracking
- approvalWorkflowId - Important for approval workflow tracking

**Low Priority:**
- signedBy - Useful for signature tracking
- signedDate - Useful for signature date tracking

---

## Field Dependencies and Conditional Validation

### Analysis

**Current State:** Some conditional validation rules exist.

**Current Conditional Validation Rules:**
- discountPercentage and discountAmount cannot both be provided (validations/index.ts lines 44-55)
- lineItems must have at least 1 item (validations/index.ts line 42)

---

### Recommended New Conditional Validation Rules

#### 1. gstType → Conditional Based on Customer State

**Rule:** If customerGST is not provided, then gstType should be "Exempt" or not required

**Rationale:** Customers without GST should not be charged GST.

**Priority:** High

**Implementation:** Add conditional validation in createDocumentSchema

---

#### 2. validTill → Conditional Required for Quotation

**Rule:** If documentType is "Quotation", then validTill should be required

**Rationale:** Quotations should have a validity period.

**Priority:** High

**Implementation:** Add conditional validation in createDocumentSchema

---

#### 3. projectId → Conditional Required for Conversion

**Rule:** If status is "Converted", then projectId should be required

**Rationale:** Converted documents should be linked to a project.

**Priority:** Medium

**Implementation:** Add conditional validation in updateDocumentSchema

---

#### 4. includePricing → Conditional Based on Document Type

**Rule:** If documentType is "Quotation", then includePricing should be true

**Rationale:** Quotations should include pricing.

**Priority:** High

**Implementation:** Add conditional validation in createDocumentSchema

---

#### 5. materialSelections → Conditional Based on Document Type

**Rule:** If documentType is "Estimate", then materialSelections should be required

**Rationale:** Estimates should have material selection.

**Priority:** High

**Implementation:** Add conditional validation in createDocumentSchema

---

### Summary of Conditional Validation

**Current State:** ⚠️ Limited conditional validation rules exist

**Recommended Improvements:**
1. Add conditional validation for gstType based on customerGST (High priority)
2. Add conditional validation for validTill for Quotation (High priority)
3. Add conditional validation for projectId for Converted status (Medium priority)
4. Add conditional validation for includePricing for Quotation (High priority)
5. Add conditional validation for materialSelections for Estimate (High priority)

---

## Final Verdict

### Business Necessity
✅ All fields are essential or important for PEB CRM business context

### Duplicates
✅ No duplicate or redundant fields found

### Module Placement
✅ All fields are correctly placed in Documents module

### Renaming
✅ No renaming required - field names are clear and consistent

### Missing Fields
⚠️ 5 potential missing fields identified (0 high priority, 3 medium priority, 2 low priority)

### Conditional Validation
⚠️ Limited conditional validation rules exist, 5 improvements recommended

---

## Implementation Recommendations

### Phase 1: High Priority (Must Do)

1. **Implement Charts Functionality** (from Pass 5)
   - Add charts component for document analytics
   - Display document trends, conversion rates, status breakdown

2. **Improve Conditional Validation**
   - Add conditional validation for gstType based on customerGST
   - Add conditional validation for validTill for Quotation
   - Add conditional validation for includePricing for Quotation
   - Add conditional validation for materialSelections for Estimate

### Phase 2: Medium Priority (Should Do)

1. **Add Missing PEB Document Fields**
   - Add quotationValidityDays field
   - Add revisionReason field
   - Add approvalWorkflowId field
   - Update validation schemas

2. **Add Material Selection to Detail Page** (from Pass 5)
   - Add material selection tab to DocumentViewDrawer
   - Display scope configuration in detail page
   - Display technical specifications in detail page

3. **Add salesExecutive to List Table** (from Pass 5)
   - Add salesExecutive column to list table

4. **Add validTill to List Table** (from Pass 5)
   - Add validTill column to list table

### Phase 3: Low Priority (Nice to Have)

1. **Add Additional PEB Document Fields**
   - Add signedBy field
   - Add signedDate field

2. **Add Conditional Validation for Project Link**
   - Add conditional validation for projectId for Converted status

---

## Summary

**Documents Module Business Logic Validation:** ✅ Good

**Strengths:**
- All fields are essential or important for PEB CRM
- No duplicate or redundant fields
- All fields are correctly placed
- Field names are clear and consistent
- Calculated fields (subtotal, taxAmount, totalAmount) are correctly implemented
- Cross-module flow is good (Documents → Projects, Documents → Finance, Documents → Task)
- Document workflow is well-designed (Lead → Customer → Estimate → Proposal → Quotation → Project)

**Areas for Improvement:**
- Limited conditional validation rules exist
- Missing PEB document fields (quotationValidityDays, revisionReason, approvalWorkflowId)
- Charts are not implemented (feature gap)
- Material selection not displayed in detail page (acceptable - available in EstimateBuilder)

**Overall Assessment:** Documents module is well-designed with appropriate fields for PEB CRM business context. Recommended improvements are enhancements, not fixes.

---

**End of Pass 6 Report**
