# Customer Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Customer Module Form Fields  
**Objective:** Identify all form fields in Customer Create/Edit forms with details.

---

## Form Information

**Component:** `CustomerForm.tsx` (lines 1-654)  
**Validation:** `validations/index.ts` (lines 1-101)  
**Type Definition:** `types/index.ts` (lines 1-233)

**Form Sections:**
1. Lead Selection (Create mode only)
2. Customer Information
3. Business Information
4. Address Information
5. Additional Information
6. Custom Fields

---

## Field Inventory

### Section 1: Lead Selection (Create Mode Only)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must match available lead ID | Lead Selection |

**Evidence:** Lines 42, 92-116 in CustomerForm.tsx

**Notes:**
- Only visible in create mode
- Filters to non-converted leads only
- Auto-fills customer fields when selected
- Reference-only in edit mode (snapshot rule)

---

### Section 2: Customer Information

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customerName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars, Max 100 chars | Customer Information |
| companyName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars, Max 100 chars | Customer Information |
| mobile | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Format: +91 XXXXX XXXXX | Customer Information |
| alternateMobile | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Format: +91 XXXXX XXXXX (if entered) | Customer Information |
| email | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Email format (if entered) | Customer Information |

**Evidence:** Lines 233-336 in CustomerForm.tsx, Lines 11-30 in validations/index.ts

**Notes:**
- email is optional but format validated if entered
- alternateMobile is optional but format validated if entered
- mobile has strict format requirement

---

### Section 3: Business Information

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| gstNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | GST format (if entered) | Business Information |
| panNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | PAN format (if entered) | Business Information |
| industry | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Manufacturing | Must be valid industry enum | Business Information |
| businessType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Pvt Ltd | Must be valid business type enum | Business Information |
| website | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format (if entered) | Business Information |

**Evidence:** Lines 339-446 in CustomerForm.tsx, Lines 32-54 in validations/index.ts

**Notes:**
- gstNumber and panNumber are optional but format validated if entered
- industry and businessType are required with enum values
- website is optional but URL validated if entered

**Industry Options:** Manufacturing, Construction, Infrastructure, Logistics, Agriculture, Commercial, Healthcare, Education, Retail, Other

**Business Type Options:** Pvt Ltd, LLP, Partnership, Proprietorship, Trust, Government, Other

---

### Section 4: Address Information

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| address | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars, Max 500 chars | Address Information |
| city | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars, Max 50 chars | Address Information |
| state | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars, Max 50 chars | Address Information |
| country | string | ❌ No | ✅ Yes | ❌ No | ❌ No | India | Max 50 chars | Address Information |
| pincode | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | 6 digits (if entered) | Address Information |

**Evidence:** Lines 448-552 in CustomerForm.tsx, Lines 56-76 in validations/index.ts

**Notes:**
- country has default value "India"
- pincode is optional but format validated if entered

---

### Section 5: Additional Information

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| leadSource | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Website | Must be valid source enum | Additional Information |
| status | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | Prospect | Must be valid status enum | Additional Information |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 1000 chars | Additional Information |
| assignedEmployee | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Additional Information |
| assignedEmployeeId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Additional Information |

**Evidence:** Lines 554-632 in CustomerForm.tsx, Lines 78-91 in validations/index.ts

**Notes:**
- leadSource is required
- status has default value "Prospect"
- assignedEmployee and assignedEmployeeId are populated from lead if lead is selected
- notes is optional with max length

**Lead Source Options:** Website, Referral, Cold Call, Email, Social Media, Trade Show, Advertisement, Other

**Status Options:** Active, Inactive, Prospect, Converted, Churned

---

### Section 6: Custom Fields

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customFields | Record<string, string | number | boolean> | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Based on configuration | Custom Fields |

**Evidence:** Lines 634-639 in CustomerForm.tsx, Lines 102-103 in types/index.ts

**Notes:**
- Dynamic fields based on customer configuration
- Can be text, number, select, textarea, or boolean type
- Validation depends on field definition

---

### System Fields (Not in Form)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| customerId | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Auto-increment | System |
| customerSince | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current date | - | System |
| totalProjects | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| activeProjects | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| completedProjects | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| totalRevenue | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| pendingQuotations | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| pendingFollowups | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | - | Aggregate Stats |
| projectIds | string[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | Cross-Module Reference |
| estimateIds | string[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | Cross-Module Reference |
| proposalIds | string[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | Cross-Module Reference |
| quotationIds | string[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | Cross-Module Reference |
| attachments | string[] | ❌ No | ✅ Yes | ❌ No | ❌ No | [] | - | Attachments |
| createdAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |
| updatedAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |

**Evidence:** Lines 49-107 in types/index.ts

**Notes:**
- Aggregate stats are populated by backend joins
- Cross-module reference arrays track related records
- attachments field exists but not used in form (similar to Lead module)

---

## Summary Statistics

**Total Fields Identified:** 38

**By Category:**
- Form Fields (User Input): 21
- Custom Fields (Dynamic): 1
- System Fields: 10
- Aggregate Stats: 6
- Cross-Module References: 4

**By Required Status:**
- Required in Form: 8
- Optional in Form: 13
- System Generated: 10
- Dynamic: 1
- Aggregate: 6
- Cross-Module: 4

**By Section:**
- Lead Selection: 1
- Customer Information: 5
- Business Information: 5
- Address Information: 5
- Additional Information: 5
- Custom Fields: 1
- System Fields: 10
- Aggregate Stats: 6
- Cross-Module References: 4

---

## Form Behavior Notes

**Create Mode:**
- Lead selection dropdown available
- Auto-fill from lead when lead selected
- Default values: country=India, industry=Manufacturing, businessType=Pvt Ltd, leadSource=Website, status=Prospect

**Edit Mode:**
- Lead selection hidden (reference-only)
- Lead ID shown as reference badge
- All other fields editable

**Lead Auto-Fill Fields:**
- customerName
- companyName
- mobile
- email
- address
- city
- state
- pincode
- leadSource
- assignedEmployee
- assignedEmployeeId
- notes (appends lead remarks)

**Not Auto-Filled from Lead:**
- alternateMobile
- gstNumber
- panNumber
- industry
- businessType
- website
- country

---

## Validation Rules Summary

**String Length:**
- customerName: 2-100 chars
- companyName: 2-100 chars
- address: 2-500 chars
- city: 2-50 chars
- state: 2-50 chars
- country: Max 50 chars
- notes: Max 1000 chars

**Format Validation:**
- mobile: +91 XXXXX XXXXX
- alternateMobile: +91 XXXXX XXXXX (if entered)
- email: Email format (if entered)
- gstNumber: GST format (if entered)
- panNumber: PAN format (if entered)
- website: URL format (if entered)
- pincode: 6 digits (if entered)

**Enum Validation:**
- industry: Must be valid industry enum
- businessType: Must be valid business type enum
- leadSource: Must be valid source enum
- status: Must be valid status enum

---

**End of Pass 1 Report**
