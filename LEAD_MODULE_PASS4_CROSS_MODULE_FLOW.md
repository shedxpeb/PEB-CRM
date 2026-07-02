# Lead Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Lead Module Cross-Module Data Flow  
**Objective:** Verify which lead fields actually flow into other modules (Customer, Project, Task).

---

## Cross-Module Flow Summary

**Lead → Customer:** 12 fields mapped  
**Lead → Project:** 1 field linked (leadId only)  
**Lead → Task:** 1 field linked (leadId only)  
**Lead → Dashboard:** 0 fields (only aggregated stats)

---

## Lead → Customer Flow

**File:** `LeadToCustomerConversionDialog.tsx` (lines 148-163)  
**Type Definition:** `customers/types/index.ts` (lines 215-232 - ConvertLeadToCustomerDto)

### Mapped Fields (12 fields)

| Lead Field | Customer Field | Status | Evidence |
|------------|----------------|--------|----------|
| customerName | customerName | ✅ Mapped | Line 150 in conversion dialog |
| companyName | companyName | ✅ Mapped | Line 151 in conversion dialog |
| mobile | mobile | ✅ Mapped | Line 152 in conversion dialog |
| email | email | ✅ Mapped | Line 153 in conversion dialog |
| address | address | ✅ Mapped | Line 154 in conversion dialog |
| city | city | ✅ Mapped | Line 155 in conversion dialog |
| state | state | ✅ Mapped | Line 156 in conversion dialog |
| pincode | pincode | ✅ Mapped | Line 157 in conversion dialog |
| source | leadSource | ✅ Mapped | Line 158 in conversion dialog |
| assignedEmployee | assignedEmployee | ✅ Mapped | Line 159 in conversion dialog |
| assignedEmployeeId | assignedEmployeeId | ✅ Mapped | Line 160 in conversion dialog |
| remarks | notes | ✅ Mapped | Line 161 in conversion dialog |
| id | leadId | ✅ Mapped | Line 162 in conversion dialog |

**Conversion Code:**
```typescript
initialData={{
  customerName: lead.customerName,
  companyName: lead.companyName,
  mobile: lead.mobile,
  email: lead.email,
  address: lead.address,
  city: lead.city,
  state: lead.state,
  pincode: lead.pincode,
  leadSource: lead.source as any,
  assignedEmployee: lead.assignedEmployee,
  assignedEmployeeId: lead.assignedEmployeeId,
  notes: lead.remarks,
  leadId: lead.id,
}}
```

**Customer Type Definition:**
```typescript
export interface ConvertLeadToCustomerDto {
  leadId: string;
  customerName: string;
  companyName: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  industry?: Industry;
  businessType?: BusinessType;
  website?: string;
  leadSource: CustomerSource;
  assignedEmployeeId?: string;
  notes?: string;
}
```

### Not Mapped Fields (21 fields)

| Lead Field | Reason |
|------------|--------|
| alternateMobile | Not in ConvertLeadToCustomerDto |
| gstNumber | Customer has separate GST field, not mapped from lead |
| projectTitle | Not relevant for customer |
| projectType | Not relevant for customer |
| structureType | Not relevant for customer |
| width | Not relevant for customer |
| length | Not relevant for customer |
| height | Not relevant for customer |
| baySpacing | Not relevant for customer |
| roofType | Not relevant for customer |
| craneRequired | Not relevant for customer |
| craneCapacity | Not relevant for customer |
| mezzanine | Not relevant for customer |
| wallType | Not relevant for customer |
| insulationRequired | Not relevant for customer |
| materialPreference | Not relevant for customer |
| siteLocation | Not relevant for customer |
| mapCoordinates | Not relevant for customer |
| siteAddress | Not relevant for customer |
| soilNotes | Not relevant for customer |
| customerNotes | Not mapped (notes field used instead) |
| specialRequirement | Not mapped (notes field used instead) |
| attachments | Not mapped |
| priority | Not relevant for customer |
| nextFollowUpDate | Not relevant for customer |

---

## Lead → Project Flow

**File:** `projects/types/index.ts` (lines 282-311 - CreateProjectDto)

### Mapped Fields (1 field)

| Lead Field | Project Field | Status | Evidence |
|------------|---------------|--------|----------|
| id | leadId | ✅ Linked | Line 92, 286 in project types |

**Project Type Definition:**
```typescript
export interface CreateProjectDto {
  projectCode?: string;
  projectName: string;
  customerId: string;
  leadId?: string;  // ← Lead ID linked here
  projectType: ProjectType;
  value: number;
  budget: number;
  location: string;
  city: string;
  state: string;
  pincode?: string;
  startDate: Date;
  endDate: Date;
  priority: ProjectPriority;
  projectManagerId: string;
  structureType: StructureType;
  width?: number;
  length?: number;
  height?: number;
  baySpacing?: number;
  roofType: RoofType;
  craneSystem: CraneSystem;
  mezzanine?: boolean;
  wallType: WallType;
  insulation?: boolean;
  coveredArea?: number;
  totalWeight?: number;
  customFields?: ProjectCustomFieldValues;
}
```

### Not Mapped Fields (32 fields)

**All lead fields except `id` are not mapped to project.**

**Note:** Project has its own structure-related fields (structureType, width, length, height, baySpacing, roofType, craneSystem, mezzanine, wallType, insulation) that are filled separately during project creation, not automatically from lead.

**Expected Behavior:** When converting a lead to a project, the user should manually fill in project-specific details. The lead's structure specifications could be pre-filled but currently are not.

---

## Lead → Task Flow

**File:** `task-management/types/index.ts` (lines 371-393 - CreateTaskDto)

### Mapped Fields (1 field)

| Lead Field | Task Field | Status | Evidence |
|------------|-----------|--------|----------|
| id | leadId | ✅ Linked | Line 137, 384 in task types |

**Task Type Definition:**
```typescript
export interface CreateTaskDto {
  title: string;
  description?: string;
  assignedUserId: string;
  dueDate: Date;
  startDate?: Date;
  reminderDate?: Date;
  priority: TaskPriority;
  category?: TaskCategory;
  linkedModule?: LinkedModule;
  linkedRecordId?: string;
  linkedRecordName?: string;
  projectId?: string;
  leadId?: string;  // ← Lead ID linked here
  customerId?: string;
  documentId?: string;
  incentiveValue: number;
  estimatedHours?: number;
  tags?: string[];
  notes?: string;
  beforeImages?: File[];
  checklist?: Omit<ChecklistItem, 'id' | 'completed' | 'completedAt' | 'completedBy'>[];
}
```

### Not Mapped Fields (32 fields)

**All lead fields except `id` are not mapped to task.**

**Note:** Tasks are generic and can be linked to any module (Leads, Customers, Projects, etc.). Only the leadId is stored for reference. Task-specific fields (title, description, dueDate, etc.) are filled separately during task creation.

**Expected Behavior:** When creating a task linked to a lead, the user manually fills in task details. The lead's assignedEmployee could be used to pre-fill the task's assignedUserId but currently is not.

---

## Lead → Dashboard Flow

**File:** `useDashboardRealData.ts` (lines 1-207)

### Mapped Fields (0 fields)

**Dashboard only uses aggregated stats, not individual lead field values.**

**Dashboard Stats Used:**
- Total leads count
- New leads count
- In-progress leads count
- Converted leads count
- Monthly leads count
- Yearly leads count
- Change percentage

**No individual lead fields are displayed in dashboard.**

---

## Cross-Module Flow Analysis

### High Flow (12 fields to Customer)

**Fields that flow to Customer:**
- customerName ✅
- companyName ✅
- mobile ✅
- email ✅
- address ✅
- city ✅
- state ✅
- pincode ✅
- source (as leadSource) ✅
- assignedEmployee ✅
- assignedEmployeeId ✅
- remarks (as notes) ✅

**Impact:** These fields are actively used when converting a lead to a customer. The conversion is well-implemented with proper field mapping.

---

### Low Flow (1 field to Project, 1 field to Task)

**Fields that flow to Project:**
- id (as leadId) ✅

**Fields that flow to Task:**
- id (as leadId) ✅

**Impact:** Only the lead ID is linked to projects and tasks. This is intentional - projects and tasks have their own specific fields that are filled separately. However, some lead fields could be pre-filled to improve UX:

**Potential Improvements:**
- **Project:** Pre-fill structureType, width, length, height, baySpacing, roofType, wallType from lead
- **Task:** Pre-fill assignedUserId from lead.assignedEmployeeId
- **Task:** Pre-fill dueDate from lead.nextFollowUpDate

---

### No Flow (0 fields to Dashboard)

**Fields that flow to Dashboard:**
- None (only aggregated stats)

**Impact:** Dashboard doesn't display individual lead field values. This is by design - dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Structure Details Not Auto-Filled in Projects

**Issue:** Lead structure details (structureType, width, length, height, baySpacing, roofType, wallType, insulationRequired, materialPreference) are not automatically pre-filled when creating a project from a lead.

**Current Behavior:**
- Only leadId is linked to project
- User must manually re-enter all structure specifications

**Expected Behavior:**
- Structure details from lead should be pre-filled in project creation form
- User can edit if needed

**Impact:** Redundant data entry, potential for errors, poor UX.

---

### 2. Assigned Employee Not Auto-Filled in Tasks

**Issue:** Lead.assignedEmployeeId is not used to pre-fill task.assignedUserId when creating a task linked to a lead.

**Current Behavior:**
- Only leadId is linked to task
- User must manually select assignee

**Expected Behavior:**
- If lead has assignedEmployeeId, pre-fill task assignee
- User can change if needed

**Impact:** Redundant data entry, potential for errors.

---

### 3. Next Follow-up Date Not Used for Task Due Date

**Issue:** Lead.nextFollowUpDate is not used to suggest task.dueDate when creating a follow-up task.

**Current Behavior:**
- Only leadId is linked to task
- User must manually set task due date

**Expected Behavior:**
- Suggest lead.nextFollowUpDate as task due date
- User can change if needed

**Impact:** Redundant data entry, potential for missed follow-ups.

---

### 4. GST Number Not Mapped to Customer

**Issue:** Lead.gstNumber is not mapped to Customer.gstNumber during conversion.

**Current Behavior:**
- Customer has separate gstNumber field
- Lead.gstNumber is not transferred

**Expected Behavior:**
- Map lead.gstNumber to customer.gstNumber during conversion

**Impact:** Redundant data entry, potential for billing errors.

---

### 5. Alternate Mobile Not Mapped to Customer

**Issue:** Lead.alternateMobile is not mapped to Customer.alternateMobile during conversion.

**Current Behavior:**
- Customer has alternateMobile field in type definition
- Lead.alternateMobile is not transferred

**Expected Behavior:**
- Map lead.alternateMobile to customer.alternateMobile during conversion

**Impact:** Lost contact information.

---

## Cross-Module Flow Recommendations

**🟡 Improve (Add Auto-Fill):**
- Pre-fill project structure details from lead (structureType, width, length, height, baySpacing, roofType, wallType, insulationRequired, materialPreference)
- Pre-fill task assignee from lead.assignedEmployeeId
- Suggest task due date from lead.nextFollowUpDate
- Map lead.gstNumber to customer.gstNumber
- Map lead.alternateMobile to customer.alternateMobile

**🟢 Keep (Current Flow is Good):**
- Lead → Customer mapping for customer details (12 fields) is well-implemented
- Lead → Project linking via leadId is appropriate
- Lead → Task linking via leadId is appropriate
- Dashboard using aggregated stats is appropriate

---

**End of Pass 4 Report**
