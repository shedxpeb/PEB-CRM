# Documents Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Documents Module Form Fields  
**Objective:** Identify all form fields in Documents Create/Edit forms with details.

---

## Form Information

**Component:** `EstimateHeaderForm.tsx` (lines 1-88)  
**Validation:** `validations/index.ts` (lines 1-177)  
**Type Definition:** `types/peb-commercial.ts` (lines 1-921)  
**Architecture Note:** Documents module follows a workflow: Lead → Customer → Estimate → Proposal → Quotation. Estimate is a Material Selection Builder (NOT a pricing document). Proposal inherits from Estimate (Technical + Commercial Presentation). Quotation inherits from Proposal (Final Commercial Offer with Pricing). Data flows forward - never duplicate, never re-enter.

**Document Types:**
1. Estimate - Material Selection and Scope Builder
2. Proposal - Technical + Commercial Presentation (generated from Estimate)
3. Quotation - Final Commercial Offer (generated from Proposal)

**Form Sections:**
1. Estimate Header Form (EstimateHeaderForm.tsx)
2. Document Validation Schema (validations/index.ts)
3. Estimate Type Definition (types/peb-commercial.ts)
4. Proposal Type Definition (types/peb-commercial.ts)
5. Quotation Type Definition (types/peb-commercial.ts)

---

## Field Inventory

### Section 1: Estimate Header Form (EstimateHeaderForm.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customerName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Customer | Read-only | Estimate Header |
| leadNumber | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Lead | Read-only | Estimate Header |
| version | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 1 | Min 1 | Estimate Header |
| projectName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Required | Estimate Header |
| contactPersonName | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Estimate Header |
| salesExecutive | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Estimate Header |
| validTill | string (date) | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Estimate Header |

**Evidence:** Lines 6-12 (interface), Lines 21-87 (form)

**Notes:**
- customerName and leadNumber are read-only (passed as props)
- version has min value of 1
- projectName is required field
- validTill is date input

---

### Section 2: Document Validation Schema (validations/index.ts)

#### createDocumentSchema (Create Estimate/Proposal/Quotation)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| documentType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be Estimate, Proposal, or Quotation | Document Info |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Document Info |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Info |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Info |
| subtotal | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Pricing |
| taxAmount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Pricing |
| totalAmount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Pricing |
| discountAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Pricing |
| discountPercentage | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be 0-100 (if entered) | Pricing |
| gstType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be CGST, SGST, IGST, or CESS | Tax |
| validUntil | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Terms |
| paymentTerms | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Terms |
| deliveryTerms | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Terms |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Terms |
| termsAndConditions | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Terms |
| lineItems | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 item | Line Items |
| templateId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Template |

**Evidence:** Lines 26-55 (createDocumentSchema)

**Notes:**
- Cross-field validation: discountPercentage and discountAmount cannot both be provided
- lineItems must have at least 1 item
- gstType is required for tax calculation

#### documentLineItemSchema (Line Item Validation)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Line Item |
| quantity | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Line Item |
| unit | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Line Item |
| rate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Line Item |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Line Item |
| taxRate | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be 0-100 (if entered) | Line Item |
| taxAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Line Item |
| discountAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Line Item |
| itemId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Line Item |
| itemCode | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Line Item |

**Evidence:** Lines 11-22 (documentLineItemSchema)

**Notes:**
- Line items are the core of commercial documents
- itemId and itemCode link to Item Master

---

### Section 3: Estimate Type Definition (types/peb-commercial.ts)

#### Estimate Interface

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| estimateNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | System |
| version | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 1 | Min 1 | System |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Customer |
| customerName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Customer | - | Customer |
| customerEmail | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Customer | - | Customer |
| customerPhone | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Customer | - | Customer |
| customerAddress | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Customer | - | Customer |
| customerGST | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Customer | - | Customer |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Lead/Project |
| leadNumber | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Lead | - | Lead/Project |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Lead/Project |
| projectName | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Lead/Project |
| status | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Draft | DocumentStatus | Status |
| approvalStatus | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | ApprovalStatus | Status |
| includePricing | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | false | - | Pricing |
| subtotal | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Pricing |
| totalAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Pricing |
| materialSelections | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 item | Material Selection |
| scopeConfiguration | object | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Scope Configuration |
| technicalSpecifications | object | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Technical Specifications |
| inclusions | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Inclusions/Exclusions |
| exclusions | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Inclusions/Exclusions |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| internalNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| terms | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| contactPersonName | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Header |
| salesExecutive | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Header |
| validTill | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Header |
| convertedToProposalId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| convertedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| proposalIds | array | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| linkedProjectId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| linkedProjectName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| templateId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Template |
| createdAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| updatedAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| sentAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| viewedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| createdBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |

**Evidence:** Lines 171-241 (Estimate interface)

**Notes:**
- Customer fields are auto-filled from Customer module
- Lead fields are auto-filled from Lead module
- Project fields are optional (project may not exist yet)
- includePricing determines if pricing is included in Estimate
- materialSelections is the core of Estimate (Material Selection Builder)
- scopeConfiguration defines services (labour, installation, etc.)
- technicalSpecifications defines building technical details

---

### Section 4: Material Selection (Nested Type)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| itemMasterId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Item Master Reference |
| itemCode | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Master Reference |
| itemName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Master Reference |
| category | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Master Reference |
| subCategory | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Item Master Reference |
| brand | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| grade | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| specification | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| variant | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| thickness | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| color | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| coating | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master (editable) | - | Material Configuration |
| standardWeight | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Standard Properties |
| standardDimensions | object | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Standard Properties |
| config | object | ✅ Yes | ❌ No | ❌ No | ❌ No | - | CommercialItemConfig | Commercial Configuration |
| quantity | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Quantity |
| unit | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Quantity |
| rate | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Pricing |
| amount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Pricing |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| customDescription | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |

**Evidence:** Lines 248-292 (MaterialSelection interface)

**Notes:**
- MaterialSelection links to Item Master (product catalog)
- Material configuration is copied from Item Master but can be edited in Estimate
- Changes to MaterialSelection do NOT modify the original Item Master
- config defines state, requirement, chargeability, visibility
- rate and amount are optional (Estimate is NOT a pricing document by default)

---

### Section 5: Scope Configuration (Nested Type)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| labour | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERICAL_CONFIGS.labour | CommercialItemConfig | Services |
| installation | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERICAL_CONFIGS.installation | CommercialItemConfig | Services |
| transportation | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.transportation | CommercialItemConfig | Services |
| crane | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.crane | CommercialItemConfig | Services |
| civilWork | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.civil_work | CommercialItemConfig | Services |
| accommodation | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.accommodation | CommercialItemConfig | Services |
| erection | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.erection | CommercialItemConfig | Services |
| freight | object | ✅ Yes | ❌ No | ❌ No | ❌ No | DEFAULT_COMMERIAL_CONFIGS.freight | CommercialItemConfig | Services |
| additionalServices | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Additional Services |

**Evidence:** Lines 298-311 (ScopeConfiguration interface)

**Notes:**
- Each service has a CommercialItemConfig (state, requirement, chargeability, visibility)
- Default configurations are defined in DEFAULT_COMMERIAL_CONFIGS
- additionalServices allows custom services beyond standard scope

---

### Section 6: Technical Specifications (Nested Type)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| buildingLength | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Building Dimensions |
| buildingWidth | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Building Dimensions |
| buildingHeight | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Building Dimensions |
| buildingArea | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Building Dimensions |
| baySpacing | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Structural Details |
| roofSlope | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Structural Details |
| windLoad | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Structural Details |
| seismicZone | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Structural Details |
| roofCladding | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cladding Details |
| wallCladding | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cladding Details |
| insulationType | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cladding Details |
| insulationThickness | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Cladding Details |
| overheadDoors | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Doors & Windows |
| walkDoors | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Doors & Windows |
| windows | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Doors & Windows |
| gutters | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Accessories |
| downspouts | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Accessories |
| skylights | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Accessories |
| ridgeVentilators | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | Accessories |
| foundationType | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Foundation |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |

**Evidence:** Lines 332-367 (TechnicalSpecifications interface)

**Notes:**
- TechnicalSpecifications define building technical details for PEB
- All fields are optional (can be filled based on project requirements)
- These specifications flow from Estimate to Proposal to Quotation

---

### Section 7: Proposal Type Definition (types/peb-commercial.ts)

#### Proposal Interface

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| proposalNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | System |
| version | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 1 | Min 1 | System |
| estimateId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Source Estimate |
| estimateNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Source Estimate |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| customerName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| customerEmail | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| customerPhone | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| customerAddress | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| customerGST | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Customer (inherited) |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Lead/Project (inherited) |
| leadNumber | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Lead/Project (inherited) |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Lead/Project (inherited) |
| projectName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Estimate | - | Lead/Project (inherited) |
| status | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Draft | DocumentStatus | Status |
| approvalStatus | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | ApprovalStatus | Status |
| materialSelections | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Inherited Data |
| scopeConfiguration | object | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Inherited Data |
| technicalSpecifications | object | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Inherited Data |
| inclusions | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Inherited Data |
| exclusions | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Estimate | - | Inherited Data |
| proposalConfiguration | object | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Proposal Configuration |
| includeCommercialSummary | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | false | - | Commercial Summary |
| commercialSummary | object | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Commercial Summary |
| timeline | object | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Timeline |
| coverPage | object | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Content |
| companyProfile | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Content |
| projectOverview | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Content |
| scopeOfWork | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Content |
| termsAndConditions | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Document Content |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| internalNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| convertedToQuotationId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| convertedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| quotationIds | array | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| linkedProjectId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| linkedProjectName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Cross-Module |
| templateId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Template |
| createdAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| updatedAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| sentAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| viewedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| createdBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |

**Evidence:** Lines 400-474 (Proposal interface)

**Notes:**
- Proposal is generated from Estimate (inherits all data)
- Customer, Lead, Project fields are inherited from Estimate
- materialSelections, scopeConfiguration, technicalSpecifications are inherited from Estimate
- proposalConfiguration defines commercial options for presentation
- includeCommercialSummary determines if indicative pricing is shown
- timeline defines project timeline for proposal

---

### Section 8: Quotation Type Definition (types/peb-commercial.ts)

#### Quotation Interface

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| quotationNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | System |
| version | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 1 | Min 1 | System |
| proposalId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Source Proposal |
| proposalNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Source Proposal |
| sourceEstimateId | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Source Estimate |
| sourceEstimateNumber | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Source Estimate |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| customerName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| customerEmail | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| customerPhone | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| customerAddress | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| customerGST | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Customer (inherited) |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Lead/Project (inherited) |
| leadNumber | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Lead/Project (inherited) |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Lead/Project (inherited) |
| projectName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Lead/Project (inherited) |
| status | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Draft | DocumentStatus | Status |
| approvalStatus | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | ApprovalStatus | Status |
| validUntil | date | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Date format | Validity |
| paymentTerms | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Terms |
| deliveryTerms | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Terms |
| materialSelections | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| scopeConfiguration | object | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| technicalSpecifications | object | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| inclusions | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| exclusions | array | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| proposalConfiguration | object | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| timeline | object | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Proposal | - | Inherited Data |
| pricingConfiguration | object | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Pricing Configuration |
| materialCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| labourCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| installationCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| transportationCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| craneCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| civilCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| accommodationCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| erectionCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| freightCost | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| otherCosts | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Calculated Amounts |
| subtotal | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Totals |
| discountAmount | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Totals |
| discountPercentage | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Totals |
| taxAmount | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Totals |
| gstType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | CGST, SGST, IGST, CESS | Tax |
| cgstAmount | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Tax |
| sgstAmount | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Tax |
| igstAmount | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Tax |
| cessAmount | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Tax |
| grandTotal | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | - | Totals |
| amountInWords | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | - | Totals |
| termsAndConditions | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Terms |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| internalNotes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Notes |
| convertedToProjectId | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| convertedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Conversion |
| templateId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Template |
| createdAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| updatedAt | date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | Timestamps |
| sentAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| viewedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| acceptedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| rejectedAt | date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |
| createdBy | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Timestamps |

**Evidence:** Lines 567-669 (Quotation interface)

**Notes:**
- Quotation is generated from Proposal (inherits all data)
- Customer, Lead, Project fields are inherited from Proposal
- materialSelections, scopeConfiguration, technicalSpecifications are inherited from Proposal
- pricingConfiguration defines pricing components (material rates, service costs, discounts, taxes)
- All cost fields (materialCost, labourCost, etc.) are calculated by system
- All tax fields (cgstAmount, sgstAmount, etc.) are calculated by system
- grandTotal is calculated by system (subtotal - discount + tax)
- No manual calculations allowed

---

## Summary Statistics

**Total Fields Identified:** 100+ (across Estimate, Proposal, Quotation types)

**By Document Type:**
- Estimate: 35 fields
- Proposal: 26 fields (plus inherited fields from Estimate)
- Quotation: 45 fields (plus inherited fields from Proposal)

**By Category:**
- System Fields: 15 (id, documentNumber, version, timestamps, etc.)
- Customer Fields: 6 (customerId, customerName, customerEmail, customerPhone, customerAddress, customerGST)
- Lead/Project Fields: 4 (leadId, leadNumber, projectId, projectName)
- Status Fields: 2 (status, approvalStatus)
- Pricing Fields: 20+ (subtotal, taxAmount, totalAmount, discounts, taxes, etc.)
- Material Selection Fields: 20+ (itemMasterId, itemCode, itemName, category, brand, grade, etc.)
- Scope Configuration Fields: 9 (labour, installation, transportation, crane, civilWork, accommodation, erection, freight, additionalServices)
- Technical Specifications Fields: 20+ (building dimensions, structural details, cladding, doors/windows, accessories, foundation)
- Header Fields: 3 (contactPersonName, salesExecutive, validTill)
- Notes Fields: 3 (notes, internalNotes, terms)
- Template Fields: 1 (templateId)
- Conversion Fields: 4 (convertedToProposalId, convertedToQuotationId, convertedToProjectId, convertedAt)
- Cross-Module Fields: 6 (proposalIds, quotationIds, linkedProjectId, linkedProjectName, etc.)

**By Required Status:**
- Required in Form: 15 (documentType, customerId, subtotal, taxAmount, totalAmount, paymentTerms, lineItems, etc.)
- Optional in Form: 85+
- System Generated: 15

**By Section:**
- Estimate Header: 7
- Document Info: 4
- Customer: 6
- Lead/Project: 4
- Status: 2
- Pricing: 20+
- Material Selection: 20+
- Scope Configuration: 9
- Technical Specifications: 20+
- Inclusions/Exclusions: 2
- Notes: 3
- Header: 3
- Template: 1
- Conversion: 4
- Cross-Module: 6
- Timestamps: 8

---

## Form Behavior Notes

**Estimate Create Mode:**
- Customer selection dropdown available
- Auto-fill customer data from Customer module
- Lead selection optional (if lead exists)
- Project selection optional (if project exists)
- Material selection from Item Master
- Scope configuration with default values
- Technical specifications optional
- includePricing determines if pricing is included

**Estimate Edit Mode:**
- Customer cannot be changed (reference-only)
- Material selection can be edited
- Scope configuration can be edited
- Technical specifications can be edited

**Proposal Create Mode:**
- Generated from Estimate (one-click conversion)
- Inherits all data from Estimate
- proposalConfiguration defines commercial options
- includeCommercialSummary determines if indicative pricing is shown
- Timeline can be added

**Quotation Create Mode:**
- Generated from Proposal (one-click conversion)
- Inherits all data from Proposal
- pricingConfiguration defines pricing components
- All costs calculated by system
- All taxes calculated by system
- No manual calculations allowed

**Auto-Fill Rules:**
- Customer fields auto-filled from Customer module
- Lead fields auto-filled from Lead module
- Project fields auto-filled from Project module (if exists)
- Material selection auto-filled from Item Master
- Scope configuration has default values
- All costs calculated by system (Quotation only)

---

## Validation Rules Summary

**Numeric Validation:**
- All cost fields: Must be positive (if entered)
- All quantity fields: Must be positive (if entered)
- All rate fields: Must be positive (if entered)
- discountPercentage: Must be 0-100 (if entered)
- taxRate: Must be 0-100 (if entered)

**Cross-Field Validation:**
- discountPercentage and discountAmount cannot both be provided
- lineItems must have at least 1 item
- subtotal, taxAmount, totalAmount must be positive

**Enum Validation:**
- documentType: Must be Estimate, Proposal, or Quotation
- gstType: Must be CGST, SGST, IGST, or CESS
- status: Must be valid DocumentStatus
- approvalStatus: Must be valid ApprovalStatus

**Calculated Fields (Quotation):**
- materialCost, labourCost, installationCost, etc. are calculated
- subtotal is calculated
- discountAmount is calculated
- taxAmount, cgstAmount, sgstAmount, igstAmount, cessAmount are calculated
- grandTotal is calculated
- amountInWords is calculated

---

## Architecture Note

**Document Workflow:**
- Lead → Customer → Estimate → Proposal → Quotation → Project

**Key Principles:**
- Item Master is the single source of truth for all commercial products
- Inventory only manages stock quantities, not product definitions
- Estimate is a Material Selection Builder (NOT a pricing document)
- Proposal inherits from Estimate (Technical + Commercial Presentation)
- Quotation inherits from Proposal (Final Commercial Offer with Pricing)
- Data flows forward - never duplicate, never re-enter

**Benefits of Architecture:**
- Single source of truth for product data
- Data flows forward without duplication
- Clear separation of concerns (Estimate for material selection, Proposal for presentation, Quotation for pricing)
- No manual calculations in Quotation (system-calculated)

---

**End of Pass 1 Report**
