# Projects Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Projects Module Form Fields  
**Objective:** Identify all form fields in Project Create/Edit forms with details.

---

## Form Information

**Component:** `ProjectForm.tsx` (lines 1-374)  
**Validation:** `validations/index.ts` (lines 1-153)  
**Type Definition:** `types/index.ts` (lines 1-375)

**Form Sections:**
1. General Information
2. PEB Specifications
3. Custom Fields

---

## Field Inventory

### Section 1: General Information

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| projectName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 3 chars | General Information |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must match customer ID | General Information |
| projectType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Industrial Shed | Must be valid project type enum | General Information |
| priority | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Medium | Must be valid priority enum | General Information |
| value | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | General Information |
| budget | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | General Information |
| startDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | General Information |
| endDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format, must be after startDate | General Information |
| location | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 3 chars | General Information |
| city | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars | General Information |
| state | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 chars | General Information |
| pincode | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | General Information |
| projectManagerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | General Information |

**Evidence:** Lines 109-237 in ProjectForm.tsx, Lines 19-34 in validations/index.ts

**Notes:**
- customerId is selected from customer dropdown
- location, city, state, pincode are auto-filled from customer in create mode (snapshot rule)
- endDate must be after startDate (cross-field validation)
- projectManagerId is the employee ID of the project manager

**Project Type Options:** Industrial Shed, Warehouse, Factory, Commercial Building, Showroom, School, Hospital, Sports Complex, Airport Terminal, Other

**Priority Options:** Low, Medium, High, Urgent

---

### Section 2: PEB Specifications

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| structureType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | PEB Building | Must be valid structure type enum | PEB Specifications |
| roofType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Standing Seam | Must be valid roof type enum | PEB Specifications |
| width | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| length | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| height | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| baySpacing | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| craneSystem | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | None | Must be valid crane system enum | PEB Specifications |
| wallType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Single Skin | Must be valid wall type enum | PEB Specifications |
| coveredArea | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| totalWeight | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | PEB Specifications |
| mezzanine | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | PEB Specifications |
| insulation | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | PEB Specifications |

**Evidence:** Lines 239-353 in ProjectForm.tsx, Lines 34-45 in validations/index.ts

**Notes:**
- Structure type, roof type, crane system, wall type are required PEB specifications
- Dimensions (width, length, height, baySpacing) are optional but important for PEB design
- coveredArea and totalWeight are calculated fields (optional in form)
- mezzanine and insulation are boolean flags for PEB features

**Structure Type Options:** PEB Building, Conventional Steel, Hybrid, Pre-Engineered, Cold Storage

**Roof Type Options:** Standing Seam, Ribbed, Corrugated, Insulated Panel, Skylight

**Crane System Options:** Single Girder, Double Girder, Underhung, Top Running, None

**Wall Type Options:** Sandwich Panel, Single Skin, Brick Wall, Curtain Wall, Other

---

### Section 3: Custom Fields

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customFields | Record<string, string | number | boolean> | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Based on configuration | Custom Fields |

**Evidence:** Lines 355-360 in ProjectForm.tsx, Lines 77 in types/index.ts

**Notes:**
- Dynamic fields based on project configuration
- Can be text, number, boolean, select, or textarea type
- Validation depends on field definition

---

### System Fields (Not in Form)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| projectId | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Auto-increment | System |
| projectCode | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Auto-generated | System |
| customerName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | From customer | System |
| leadId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Reference |
| status | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Lead | Must be valid status enum | System |
| stage | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be valid stage enum | System |
| progress | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | 0 | 0-100 | System |
| designProgress | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | 0 | 0-100 | System |
| procurementProgress | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | 0 | 0-100 | System |
| fabricationProgress | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | 0 | 0-100 | System |
| installationProgress | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | 0 | 0-100 | System |
| healthStatus | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Healthy | Must be valid health status enum | System |
| timelineHealth | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Healthy | Must be valid health status enum | System |
| budgetHealth | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Healthy | Must be valid health status enum | System |
| materialHealth | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Healthy | Must be valid health status enum | System |
| resourceHealth | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Healthy | Must be valid health status enum | System |
| materialCost | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | Must be positive | System |
| procurementCost | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | Must be positive | System |
| fabricationCost | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | Must be positive | System |
| installationCost | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | Must be positive | System |
| profitMargin | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | 0 | 0-100 | System |
| milestones | array | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | System |
| team | array | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | System |
| boqId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Reference |
| designId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Cross-Module Reference |
| inventoryReservations | array | ❌ No | ✅ Yes | ❌ No | ✅ Yes | [] | - | Cross-Module Reference |
| createdAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |
| updatedAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |

**Evidence:** Lines 83-375 in types/index.ts

**Notes:**
- projectCode is auto-generated (e.g., PRJ-2024-001)
- customerName is populated from customer selection
- status, stage, progress fields track project lifecycle
- health status fields track project health across dimensions
- budget tracking fields track costs across phases
- milestones and team are arrays of related objects
- Cross-module references link to BOQ, Design, Inventory

**Status Options:** Lead, Estimate, Proposal, Quotation, Approved, Design, BOQ, Procurement, Fabrication, Dispatch, Installation, Completion, After Sales, On Hold, Cancelled

**Stage Options:** Design, BOQ, Procurement, Fabrication, Dispatch, Installation, Handover

**Health Status Options:** Healthy, At Risk, Critical

---

## Summary Statistics

**Total Fields Identified:** 48

**By Category:**
- Form Fields (User Input): 24
- Custom Fields (Dynamic): 1
- System Fields: 23

**By Required Status:**
- Required in Form: 12
- Optional in Form: 12
- System Generated: 23
- Dynamic: 1

**By Section:**
- General Information: 13
- PEB Specifications: 12
- Custom Fields: 1
- System Fields: 23

---

## Form Behavior Notes

**Create Mode:**
- Customer selection dropdown available
- Auto-fill location from customer when customer selected
- Default values: projectType=Industrial Shed, priority=Medium, structureType=PEB Building, roofType=Standing Seam, craneSystem=None, wallType=Single Skin, mezzanine=false, insulation=false
- Cross-field validation: endDate must be after startDate

**Edit Mode:**
- Customer selection disabled (reference-only)
- Customer ID shown as reference badge
- All other fields editable
- Auto-fill does not trigger (snapshot rule)

**Customer Auto-Fill Fields:**
- location (from customer.address)
- city (from customer.city)
- state (from customer.state)
- pincode (from customer.pincode)

**Not Auto-Filled from Customer:**
- projectName
- customerId
- projectType
- priority
- value
- budget
- startDate
- endDate
- projectManagerId
- All PEB specifications

---

## Validation Rules Summary

**String Length:**
- projectName: Min 3 chars
- location: Min 3 chars
- city: Min 2 chars
- state: Min 2 chars

**Numeric Validation:**
- value: Must be positive
- budget: Must be positive
- width: Must be positive (if entered)
- length: Must be positive (if entered)
- height: Must be positive (if entered)
- baySpacing: Must be positive (if entered)
- coveredArea: Must be positive (if entered)
- totalWeight: Must be positive (if entered)

**Date Validation:**
- startDate: Date format
- endDate: Date format, must be after startDate

**Enum Validation:**
- projectType: Must be valid project type enum
- priority: Must be valid priority enum
- structureType: Must be valid structure type enum
- roofType: Must be valid roof type enum
- craneSystem: Must be valid crane system enum
- wallType: Must be valid wall type enum

**Cross-Field Validation:**
- endDate must be after startDate

---

**End of Pass 1 Report**
