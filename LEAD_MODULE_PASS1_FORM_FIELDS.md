# Lead Module Form Fields Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Lead Module Forms Only  
**Component:** `frontend/src/features/leads/components/LeadForm.tsx`  
**Objective:** Document every field present in Create Lead and Edit Lead forms.

---

## Form Component

**File:** `frontend/src/features/leads/components/LeadForm.tsx`

**Single Component for Both Create and Edit:**
- The same `LeadForm` component is used for both Create Lead and Edit Lead operations.
- Differentiation is handled via the `initialData` prop (undefined for create, populated for edit).
- Line 31: `interface LeadFormProps { initialData?: Partial<Lead>; ... }`
- Line 568: Button label changes based on `initialData?.id` presence.

**Configuration Source:**
- Form uses configuration from `useLeads` hook or `DEFAULT_LEAD_CONFIGURATION`.
- Line 40: `const config = configuration ?? DEFAULT_LEAD_CONFIGURATION;`

---

## Field Inventory

### Section: Customer Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| customerName | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| companyName | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| mobile | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| alternateMobile | string | No | `''` | None | Customer Details | Yes | Yes |
| email | string | Yes | `''` | HTML5 required, type="email" | Customer Details | Yes | Yes |
| gstNumber | string | No | `''` | None | Customer Details | Yes | Yes |
| address | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| city | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| state | string | Yes | `''` | HTML5 required | Customer Details | Yes | Yes |
| pincode | string | No | `''` | None | Customer Details | Yes | Yes |

**Evidence:**
- Lines 111-198 in `LeadForm.tsx`: Customer Details fields
- Line 112: `customerName` with `required` attribute
- Line 121: `companyName` with `required` attribute
- Line 130: `mobile` with `required` attribute
- Line 139: `alternateMobile` without `required` attribute
- Line 147: `email` with `required` attribute and `type="email"`
- Line 157: `gstNumber` without `required` attribute
- Line 165: `address` with `required` attribute
- Line 174: `city` with `required` attribute
- Line 183: `state` with `required` attribute
- Line 192: `pincode` without `required` attribute

---

### Section: Project Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| projectTitle | string | Yes | `''` | HTML5 required | Project Details | Yes | Yes |
| projectType | enum (ProjectType) | Yes | `config.projectTypes[0]` | HTML5 required | Project Details | Yes | Yes |

**Evidence:**
- Lines 204-237 in `LeadForm.tsx`: Project Details fields
- Line 211: `projectTitle` with `required` attribute
- Line 220-233: `projectType` Select with options from `config.projectTypes`
- Line 50: Default value: `projectType: (config.projectTypes[0] ?? 'Factory') as ProjectType`

---

### Section: Structure Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| structureType | enum (StructureType) | Yes | `config.structureTypes[0]` | HTML5 required | Structure Details | Yes | Yes |
| width | number | No | `undefined` | type="number" | Structure Details | Yes | Yes |
| length | number | No | `undefined` | type="number" | Structure Details | Yes | Yes |
| height | number | No | `undefined` | type="number" | Structure Details | Yes | Yes |
| baySpacing | number | No | `undefined` | type="number" | Structure Details | Yes | Yes |
| roofType | enum (RoofType) | No | `undefined` | None | Structure Details | Yes | Yes |
| craneRequired | boolean | No | `undefined` | None (Select: Yes/No) | Structure Details | Yes | Yes |
| craneCapacity | number | No | `undefined` | type="number" | Structure Details | Yes | Yes |
| mezzanine | boolean | No | `undefined` | None (Select: Yes/No) | Structure Details | Yes | Yes |
| wallType | enum (WallType) | No | `undefined` | None | Structure Details | Yes | Yes |
| insulationRequired | boolean | No | `undefined` | None (Select: Yes/No) | Structure Details | Yes | Yes |
| materialPreference | enum (MaterialPreference) | No | `undefined` | None | Structure Details | Yes | Yes |

**Evidence:**
- Lines 240-402 in `LeadForm.tsx`: Structure Details fields
- Line 247: `structureType` with `required` attribute
- Line 51: Default value: `structureType: (config.structureTypes[0] ?? 'PEB') as StructureType`
- Lines 263-269: `width` with `type="number"`
- Lines 272-278: `length` with `type="number"`
- Lines 281-287: `height` with `type="number"`
- Lines 290-296: `baySpacing` with `type="number"`
- Lines 299-312: `roofType` Select with options from `config.roofTypes`
- Lines 315-327: `craneRequired` Select (Yes/No)
- Lines 330-336: `craneCapacity` with `type="number"`
- Lines 339-351: `mezzanine` Select (Yes/No)
- Lines 354-367: `wallType` Select with options from `config.wallTypes`
- Lines 370-382: `insulationRequired` Select (Yes/No)
- Lines 385-398: `materialPreference` Select with options from `config.materialPreferences`

---

### Section: Site Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| siteLocation | string | No | `''` | None | Site Details | Yes | Yes |
| mapCoordinates | string | No | `''` | None | Site Details | Yes | Yes |
| siteAddress | string | No | `''` | None | Site Details | Yes | Yes |
| soilNotes | string | No | `''` | None | Site Details | Yes | Yes |

**Evidence:**
- Lines 405-445 in `LeadForm.tsx`: Site Details fields
- Lines 412-418: `siteLocation` Input
- Lines 420-426: `mapCoordinates` Input
- Lines 428-434: `siteAddress` Input
- Lines 436-442: `soilNotes` Input

---

### Section: Requirement Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| customerNotes | string (textarea) | No | `''` | None | Requirement Details | Yes | Yes |
| specialRequirement | string (textarea) | No | `''` | None | Requirement Details | Yes | Yes |
| attachments | file | No | None | None (UI only, not functional) | Requirement Details | Yes | Yes |

**Evidence:**
- Lines 448-485 in `LeadForm.tsx`: Requirement Details fields
- Lines 454-461: `customerNotes` textarea
- Lines 463-470: `specialRequirement` textarea
- Lines 472-483: `attachments` file input (UI placeholder only, line 481: `<input type="file" className="hidden" multiple />`)

---

### Section: Business Details

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| source | enum (LeadSource) | Yes | `config.sources[0]` | HTML5 required | Business Details | Yes | Yes |
| priority | enum (LeadPriority) | Yes | `config.priorities[1]` | HTML5 required | Business Details | Yes | Yes |
| assignedEmployee | string | No | `''` | None | Business Details | Yes | Yes |
| nextFollowUpDate | date | No | `undefined` | type="date" | Business Details | Yes | Yes |
| remarks | string (textarea) | No | `''` | None | Business Details | Yes | Yes |

**Evidence:**
- Lines 488-553 in `LeadForm.tsx`: Business Details fields
- Line 495: `source` with `required` attribute
- Line 52: Default value: `source: (config.sources[0] ?? 'Website') as LeadSource`
- Line 511: `priority` with `required` attribute
- Line 53: Default value: `priority: (config.priorities[1] ?? 'Medium') as LeadPriority`
- Lines 527-533: `assignedEmployee` Input
- Lines 535-541: `nextFollowUpDate` with `type="date"`
- Lines 543-550: `remarks` textarea

---

### Section: Custom Fields

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| customFields | Record<string, string | number | boolean> | Dynamic | `{}` | Dynamic (from config) | Custom Fields | Yes | Yes |

**Evidence:**
- Lines 555-560 in `LeadForm.tsx`: Custom Fields component
- Line 555: `<LeadCustomFields mode="form" fields={config.customFields ?? []} values={formData.customFields} onChange={handleCustomFieldChange} />`
- Line 55: Default value: `customFields: initialData?.customFields ?? {}`
- File: `frontend/src/features/leads/components/LeadCustomFields.tsx` (lines 1-23)
- Custom fields are dynamic based on `config.customFields` from settings

---

### Section: Status (Hidden Field)

| Field Name | Data Type | Required | Default Value | Validation | Section | Create Form | Edit Form |
|------------|-----------|----------|---------------|------------|---------|-------------|-----------|
| status | enum (LeadStatus) | Yes | `config.statuses[0]` | None (not in UI) | Hidden | Yes | Yes |

**Evidence:**
- Line 54: `status: (config.statuses[0] ?? 'New') as LeadStatus`
- This field is set in the initial state but not rendered in the form UI
- It may be managed externally (e.g., via status transitions in list view)

---

## Summary Statistics

**Total Fields:** 33

**By Section:**
- Customer Details: 10 fields
- Project Details: 2 fields
- Structure Details: 12 fields
- Site Details: 4 fields
- Requirement Details: 3 fields
- Business Details: 5 fields
- Custom Fields: 1 dynamic field
- Status (Hidden): 1 field

**By Required Status:**
- Required: 10 fields
- Optional: 23 fields

**By Data Type:**
- string: 18 fields
- enum (select): 7 fields
- number: 4 fields
- boolean: 3 fields
- date: 1 field
- file: 1 field (UI placeholder only)

---

## Configuration Defaults

**Default Values from Configuration:**
- `projectType`: First value from `config.projectTypes` (fallback: 'Factory')
- `structureType`: First value from `config.structureTypes` (fallback: 'PEB')
- `source`: First value from `config.sources` (fallback: 'Website')
- `priority`: Second value from `config.priorities` (fallback: 'Medium')
- `status`: First value from `config.statuses` (fallback: 'New')

**Configuration Source:**
- `DEFAULT_LEAD_CONFIGURATION` from `useLeads.ts`
- Or runtime configuration from `useLeadConfiguration()` hook

---

## Form Behavior Notes

**Create vs Edit:**
- Same component used for both operations
- Differentiation via `initialData` prop
- Line 568: Button text changes to "Update Lead" or "Create Lead" based on `initialData?.id`

**Duplicate Detection:**
- Lines 71-88: `checkDuplicates()` function
- Checks for duplicate mobile or email
- Shows warning if duplicate found
- Does not prevent submission

**Custom Fields:**
- Dynamic fields based on configuration
- Rendered via `LeadCustomFields` component
- Values stored in `customFields` object

**Attachments:**
- UI placeholder only (lines 472-483)
- File input is hidden and not functional
- No actual file upload implementation

---

## Type References

**Imported Types (lines 16-25):**
- `Lead` from `@/types/leads`
- `ProjectType` from `@/types/leads`
- `StructureType` from `@/types/leads`
- `RoofType` from `@/types/leads`
- `WallType` from `@/types/leads`
- `MaterialPreference` from `@/types/leads`
- `LeadSource` from `@/types/leads`
- `LeadPriority` from `@/types/leads`
- `LeadStatus` from `@/types/leads`

---

**End of Audit Report**
