# Settings Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Settings Module Form Fields  
**Objective:** Identify all form fields in Settings configuration pages with details.

---

## Form Information

**Components Analyzed:**
- CompanyManagement.tsx (lines 1-397)
- UsersRoles.tsx (lines 1-409)
- DocumentEngineSettings.tsx (lines 1-383)
- SecuritySettings.tsx (lines 1-234)
- SystemPreferences.tsx (lines 1-209)
- BranchManagement.tsx (lines 1-296)
- types/index.ts (lines 1-265)

**Architecture Note:** Settings module is a configuration module for PEB CRM. Settings module manages company information, branch management, user and role management, document engine settings, security settings, system preferences, module management, permission engine, finance configuration, and project configuration. Settings module is not a data entry module like others - it manages system-wide configuration settings.

**Form Sections:**
1. Company Management (CompanyManagement.tsx)
2. Branch Management (BranchManagement.tsx)
3. Users & Roles (UsersRoles.tsx)
4. Document Engine Settings (DocumentEngineSettings.tsx)
5. Security Settings (SecuritySettings.tsx)
6. System Preferences (SystemPreferences.tsx)
7. Module Management (ModuleManagement.tsx - not analyzed)
8. Permission Engine (PermissionEngine.tsx - not analyzed)
9. Finance Configuration (FinanceConfiguration.tsx - not analyzed)
10. Project Configuration (ProjectConfiguration.tsx - not analyzed)

---

## Field Inventory

### Section 1: Company Management (CompanyManagement.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| companyName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Basic Information |
| legalCompanyName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Basic Information |
| logo | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| sidebarLogo | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| loginLogo | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| favicon | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| watermark | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| loginBackground | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Branding |
| address | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| city | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| state | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| country | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| postalCode | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| gstNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | GST format | Tax Information |
| panNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | PAN format | Tax Information |
| cinNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Tax Information |
| msmeNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Tax Information |
| website | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Basic Information |
| email | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Email format | Basic Information |
| mobile | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Mobile format | Basic Information |
| supportEmail | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Email format | Basic Information |
| supportPhone | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Mobile format | Basic Information |
| facebook | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Social Links |
| instagram | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Social Links |
| linkedin | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Social Links |
| youtube | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Social Links |
| x | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | URL format | Social Links |
| primaryColor | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Hex format | Branding |
| secondaryColor | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Hex format | Branding |
| accentColor | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Hex format | Branding |
| themeMode | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | system | light, dark, system | Branding |
| createdAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| updatedAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |

**Evidence:** Lines 8-48 in types/index.ts, Lines 1-397 in CompanyManagement.tsx

**Notes:**
- Required fields: companyName, legalCompanyName, address, city, state, country, postalCode, gstNumber, panNumber, email, mobile, primaryColor, secondaryColor, accentColor
- Optional fields: logo, sidebarLogo, loginLogo, favicon, watermark, loginBackground, cinNumber, msmeNumber, website, supportEmail, supportPhone, social links
- System fields: id, createdAt, updatedAt
- themeMode options: light, dark, system

---

### Section 2: Branch Management (BranchManagement.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| branchCode | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Branch Information |
| branchName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Branch Information |
| address | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| city | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| state | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| country | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| postalCode | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Address |
| gstNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | GST format | Tax Information |
| contactPerson | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Contact Information |
| email | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Email format | Contact Information |
| mobile | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Mobile format | Contact Information |
| isDefault | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Status |
| isActive | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | true | - | Status |
| createdAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| updatedAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |

**Evidence:** Lines 52-69 in types/index.ts, Lines 1-296 in BranchManagement.tsx

**Notes:**
- Required fields: branchCode, branchName, address, city, state, country, postalCode, gstNumber, contactPerson, email, mobile
- Optional fields: isDefault, isActive
- System fields: id, createdAt, updatedAt
- isDefault default value: false
- isActive default value: true

---

### Section 3: Users & Roles (UsersRoles.tsx)

#### User Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | User Information |
| email | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Email format | User Information |
| mobile | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Mobile format | User Information |
| role | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | employee | owner, admin, manager, employee | User Information |
| avatar | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | User Information |
| department | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | User Information |
| designation | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | User Information |
| isActive | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | true | - | Status |
| isLocked | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Status |
| lastLogin | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| activeSession | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Metadata |
| loginHistory | LoginHistory[] | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Metadata |
| createdAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| updatedAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |

**Evidence:** Lines 73-101 in types/index.ts, Lines 1-409 in UsersRoles.tsx

**Notes:**
- Required fields: name, email, mobile, role
- Optional fields: avatar, department, designation, isActive, isLocked
- System fields: id, lastLogin, activeSession, loginHistory, createdAt, updatedAt
- role options: owner, admin, manager, employee
- isActive default value: true
- isLocked default value: false

---

#### LoginHistory Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | Core Fields |
| loginAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Date format | Login Information |
| logoutAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Login Information |
| ipAddress | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | IP format | Login Information |
| device | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | Login Information |
| browser | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | Login Information |
| location | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Login Information |

**Evidence:** Lines 93-101 in types/index.ts

**Notes:**
- All fields are system-generated
- Required fields: id, loginAt, ipAddress, device, browser
- Optional fields: logoutAt, location

---

#### Role Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Role Information |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Role Information |
| permissions | Permission[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Permissions |
| isSystem | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Status |
| createdAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| updatedAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |

**Evidence:** Lines 105-122 in types/index.ts, Lines 1-409 in UsersRoles.tsx

**Notes:**
- Required fields: name, description, permissions
- Optional fields: isSystem
- System fields: id, createdAt, updatedAt
- isSystem default value: false

---

#### Permission Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | - | Core Fields |
| module | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Permission Information |
| action | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | view, create, edit, delete, approve, export, print, send | Permission Information |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Permission Information |

**Evidence:** Lines 105-112 in types/index.ts

**Notes:**
- All fields are required
- action options: view, create, edit, delete, approve, export, print, send
- id is system-generated

---

### Section 4: Document Engine Settings (DocumentEngineSettings.tsx)

#### DocumentNumbering Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| prefix | string | ✅ Yes | ❌ No | ❌ No | ❌ No | EST/PRO/QUO | Min 1 char | Numbering |
| suffix | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Numbering |
| startNumber | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 1 | Must be positive | Numbering |
| financialYear | string | ✅ Yes | ❌ No | ❌ No | ❌ No | 2026-2027 | FY format | Numbering |
| format | string | ✅ Yes | ❌ No | ❌ No | ❌ No | {PREFIX}-{FY}-{NUMBER} | - | Numbering |

**Evidence:** Lines 187-193 in types/index.ts, Lines 1-383 in DocumentEngineSettings.tsx

**Notes:**
- Required fields: prefix, startNumber, financialYear, format
- Optional fields: suffix
- prefix default value: EST (for estimate), PRO (for proposal), QUO (for quotation)
- startNumber default value: 1
- financialYear default value: 2026-2027
- format default value: {PREFIX}-{FY}-{NUMBER}

---

#### BankDetails Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| bankName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Bank Information |
| accountNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Bank Information |
| accountType | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Bank Information |
| ifscCode | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | IFSC format | Bank Information |
| branchName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Bank Information |

**Evidence:** Lines 195-201 in types/index.ts, Lines 1-383 in DocumentEngineSettings.tsx

**Notes:**
- All fields are required

---

#### GSTDetails Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| gstin | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | GST format | GST Information |
| gstType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | CGST, SGST, IGST, CESS | GST Information |
| cgstRate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 | GST Information |
| sgstRate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 | GST Information |
| igstRate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 | GST Information |
| cessRate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 | GST Information |

**Evidence:** Lines 203-210 in types/index.ts, Lines 1-383 in DocumentEngineSettings.tsx

**Notes:**
- All fields are required
- gstType options: CGST, SGST, IGST, CESS
- All rate fields must be 0-100

---

#### DocumentSettings Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| estimateNumbering | DocumentNumbering | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Document Numbering |
| proposalNumbering | DocumentNumbering | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Document Numbering |
| quotationNumbering | DocumentNumbering | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Document Numbering |
| defaultTerms | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Terms & Conditions |
| defaultConditions | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Terms & Conditions |
| bankDetails | BankDetails | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Bank Details |
| gstDetails | GSTDetails | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | GST Details |

**Evidence:** Lines 212-220 in types/index.ts, Lines 1-383 in DocumentEngineSettings.tsx

**Notes:**
- All fields are required

---

### Section 5: Security Settings (SecuritySettings.tsx)

#### PasswordPolicy Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| minLength | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 8 | Must be 6-20 | Password Policy |
| requireUppercase | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | true | - | Password Policy |
| requireLowercase | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | true | - | Password Policy |
| requireNumbers | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | true | - | Password Policy |
| requireSpecialChars | boolean | ✅ Yes | ❌ No | ❌ No | ❌ No | true | - | Password Policy |
| expiryDays | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 90 | Must be positive | Password Policy |

**Evidence:** Lines 248-255 in types/index.ts, Lines 1-234 in SecuritySettings.tsx

**Notes:**
- All fields are required
- minLength default value: 8
- requireUppercase default value: true
- requireLowercase default value: true
- requireNumbers default value: true
- requireSpecialChars default value: true
- expiryDays default value: 90

---

#### SecuritySettings Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| passwordPolicy | PasswordPolicy | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Password Policy |
| sessionTimeout | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 30 | Must be positive | Session Settings |
| maxLoginAttempts | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 5 | Must be positive | Session Settings |
| lockoutDuration | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 30 | Must be positive | Session Settings |
| ipRestrictions | string[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | IP Restrictions |
| twoFactorEnabled | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Two-Factor Auth |

**Evidence:** Lines 257-264 in types/index.ts, Lines 1-234 in SecuritySettings.tsx

**Notes:**
- Required fields: passwordPolicy, sessionTimeout, maxLoginAttempts, lockoutDuration
- Optional fields: ipRestrictions, twoFactorEnabled
- sessionTimeout default value: 30 (minutes)
- maxLoginAttempts default value: 5
- lockoutDuration default value: 30 (minutes)
- twoFactorEnabled default value: false

---

### Section 6: System Preferences (SystemPreferences.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| timezone | string | ✅ Yes | ❌ No | ❌ No | ❌ No | Asia/Kolkata | Valid timezone | General Settings |
| language | string | ✅ Yes | ❌ No | ❌ No | ❌ No | en | Valid language | General Settings |
| currency | string | ✅ Yes | ❌ No | ❌ No | ❌ No | INR | Valid currency | Display Settings |
| dateFormat | string | ✅ Yes | ❌ No | ❌ No | ❌ No | DD/MM/YYYY | Valid format | General Settings |
| timeFormat | string | ✅ Yes | ❌ No | ❌ No | ❌ No | 24h | 12h, 24h | General Settings |
| fileUploadLimit | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 10 | Must be positive | File Settings |
| allowedFileTypes | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | pdf,doc,docx,xls,xlsx,jpg,jpeg,png | - | File Settings |
| defaultTheme | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | light | light, dark, system | Display Settings |

**Evidence:** Lines 155-164 in types/index.ts, Lines 1-209 in SystemPreferences.tsx

**Notes:**
- All fields are required
- timezone default value: Asia/Kolkata
- language default value: en
- currency default value: INR
- dateFormat default value: DD/MM/YYYY
- timeFormat default value: 24h
- fileUploadLimit default value: 10 (MB)
- allowedFileTypes default value: pdf,doc,docx,xls,xlsx,jpg,jpeg,png
- defaultTheme options: light, dark, system
- defaultTheme default value: light

---

### Section 7: Module Types (types/index.ts)

#### Module Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| name | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | leads, customers, projects, items, documents, inventory, finance, accounting, boq, design, automation | Module Information |
| displayName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Module Information |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Module Information |
| icon | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Module Information |
| isEnabled | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | true | - | Status |
| isVisible | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | true | - | Status |
| isLocked | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Status |
| requiredPermissions | PermissionAction[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Permissions |
| createdAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |
| updatedAt | Date | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | Date format | Metadata |

**Evidence:** Lines 126-151 in types/index.ts

**Notes:**
- Required fields: name, displayName, description, icon, requiredPermissions
- Optional fields: isEnabled, isVisible, isLocked
- System fields: id, createdAt, updatedAt
- name options: leads, customers, projects, items, documents, inventory, finance, accounting, boq, design, automation
- isEnabled default value: true
- isVisible default value: true
- isLocked default value: false

---

### Section 8: Configuration Types (types/index.ts)

#### ModuleConfiguration Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | - | - | Core Fields |
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Configuration |
| settings | Record<string, any> | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Configuration |

**Evidence:** Lines 168-172 in types/index.ts

**Notes:**
- Required fields: name, settings
- System fields: id
- settings is a generic record for module-specific settings

---

#### FinanceConfiguration Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| currency | string | ✅ Yes | ❌ No | ❌ No | ❌ No | INR | Valid currency | Finance Settings |
| taxRate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 | Finance Settings |
| paymentTerms | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Finance Settings |
| invoicePrefix | string | ✅ Yes | ❌ No | ❌ No | ❌ No | INV | Min 1 char | Finance Settings |
| receiptPrefix | string | ✅ Yes | ❌ No | ❌ No | ❌ No | RCP | Min 1 char | Finance Settings |
| expensePrefix | string | ✅ Yes | ❌ No | ❌ No | ❌ No | EXP | Min 1 char | Finance Settings |
| financialYear | string | ✅ Yes | ❌ No | ❌ No | ❌ No | 2026-2027 | FY format | Finance Settings |
| gstRates | number[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be 0-100 | Finance Settings |
| paymentMethods | string[] | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Finance Settings |

**Evidence:** Lines 224-234 in types/index.ts

**Notes:**
- Required fields: currency, taxRate, paymentTerms, invoicePrefix, receiptPrefix, expensePrefix, financialYear
- Optional fields: gstRates, paymentMethods
- currency default value: INR
- invoicePrefix default value: INV
- receiptPrefix default value: RCP
- expensePrefix default value: EXP
- financialYear default value: 2026-2027

---

#### ProjectConfiguration Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| projectTypes | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Project Settings |
| stages | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Project Settings |
| statuses | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Project Settings |
| completionRules | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Project Settings |
| afterSalesRules | string[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Project Settings |

**Evidence:** Lines 238-244 in types/index.ts

**Notes:**
- All fields are required
- All fields are arrays of strings

---

### Section 9: Stats Types (types/index.ts)

#### SettingsStats Section

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| totalUsers | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be positive | Stats |
| activeUsers | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be positive | Stats |
| enabledModules | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be positive | Stats |
| disabledModules | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be positive | Stats |
| pendingApprovals | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | Must be positive | Stats |
| systemHealth | enum | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | healthy, warning, critical | Stats |

**Evidence:** Lines 176-183 in types/index.ts

**Notes:**
- All fields are system-generated
- All fields are required
- systemHealth options: healthy, warning, critical

---

## Summary Statistics

**Total Fields Identified:** 100+ (across all Settings types)

**By Entity:**
- Company: 30 fields
- Branch: 16 fields
- User: 14 fields
- LoginHistory: 7 fields
- Role: 7 fields
- Permission: 4 fields
- Module: 12 fields
- SystemPreferences: 8 fields
- ModuleConfiguration: 3 fields
- DocumentNumbering: 5 fields
- BankDetails: 5 fields
- GSTDetails: 6 fields
- DocumentSettings: 7 fields
- FinanceConfiguration: 9 fields
- ProjectConfiguration: 5 fields
- PasswordPolicy: 6 fields
- SecuritySettings: 6 fields
- SettingsStats: 6 fields

**By Category:**
- Company Settings: 30 fields
- Branch Settings: 16 fields
- User & Role Settings: 32 fields (User + LoginHistory + Role + Permission)
- Document Settings: 23 fields (DocumentNumbering + BankDetails + GSTDetails + DocumentSettings)
- Security Settings: 12 fields (PasswordPolicy + SecuritySettings)
- System Preferences: 8 fields
- Module Settings: 15 fields (Module + ModuleConfiguration)
- Finance Configuration: 9 fields
- Project Configuration: 5 fields
- Stats: 6 fields

**By Required Status:**
- Required in Company: 15 fields
- Optional in Company: 13 fields
- Required in Branch: 11 fields
- Optional in Branch: 3 fields
- Required in User: 4 fields
- Optional in User: 6 fields
- Required in Role: 3 fields
- Optional in Role: 1 field
- Required in SystemPreferences: 8 fields
- Required in SecuritySettings: 4 fields
- Optional in SecuritySettings: 2 fields
- Required in DocumentSettings: 7 fields
- Required in FinanceConfiguration: 7 fields
- Optional in FinanceConfiguration: 2 fields
- Required in ProjectConfiguration: 5 fields

**By Section:**
- Company Management: 30 fields
- Branch Management: 16 fields
- Users & Roles: 32 fields
- Document Engine Settings: 23 fields
- Security Settings: 12 fields
- System Preferences: 8 fields
- Module Management: 15 fields
- Finance Configuration: 9 fields
- Project Configuration: 5 fields
- Stats: 6 fields

---

## Form Behavior Notes

**Company Management Mode:**
- Required fields: companyName, legalCompanyName, address, city, state, country, postalCode, gstNumber, panNumber, email, mobile, primaryColor, secondaryColor, accentColor
- Optional fields: logo, sidebarLogo, loginLogo, favicon, watermark, loginBackground, cinNumber, msmeNumber, website, supportEmail, supportPhone, social links
- System fields: id, createdAt, updatedAt

**Branch Management Mode:**
- Required fields: branchCode, branchName, address, city, state, country, postalCode, gstNumber, contactPerson, email, mobile
- Optional fields: isDefault, isActive
- System fields: id, createdAt, updatedAt

**Users & Roles Mode:**
- User required fields: name, email, mobile, role
- User optional fields: avatar, department, designation, isActive, isLocked
- Role required fields: name, description, permissions
- Role optional fields: isSystem
- System fields: id, lastLogin, activeSession, loginHistory, createdAt, updatedAt

**Document Engine Settings Mode:**
- Required fields: prefix, startNumber, financialYear, format (for each numbering type)
- Required fields: bankName, accountNumber, accountType, ifscCode, branchName
- Required fields: gstin, gstType, cgstRate, sgstRate, igstRate, cessRate
- Required fields: estimateNumbering, proposalNumbering, quotationNumbering, defaultTerms, defaultConditions, bankDetails, gstDetails

**Security Settings Mode:**
- Required fields: minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars, expiryDays
- Required fields: passwordPolicy, sessionTimeout, maxLoginAttempts, lockoutDuration
- Optional fields: ipRestrictions, twoFactorEnabled

**System Preferences Mode:**
- Required fields: timezone, language, currency, dateFormat, timeFormat, fileUploadLimit, allowedFileTypes, defaultTheme

---

## Validation Rules Summary

**Enum Validation:**
- role: owner, admin, manager, employee
- themeMode: light, dark, system
- gstType: CGST, SGST, IGST, CESS
- action: view, create, edit, delete, approve, export, print, send
- name (Module): leads, customers, projects, items, documents, inventory, finance, accounting, boq, design, automation
- defaultTheme: light, dark, system
- systemHealth: healthy, warning, critical

**Numeric Validation:**
- All numeric fields: Must be positive (if entered)
- minLength: Must be 6-20
- All rate fields: Must be 0-100
- fileUploadLimit: Must be positive

**Date Validation:**
- All date fields: Date format

**String Validation:**
- All string fields: Min 1 char (if required)
- email: Email format
- mobile: Mobile format
- website: URL format
- gstNumber: GST format
- panNumber: PAN format
- ifscCode: IFSC format

**Cross-Field Validation:**
- companyName, legalCompanyName, address, city, state, country, postalCode, gstNumber, panNumber, email, mobile are required in Company
- branchCode, branchName, address, city, state, country, postalCode, gstNumber, contactPerson, email, mobile are required in Branch
- name, email, mobile, role are required in User
- name, description, permissions are required in Role
- prefix, startNumber, financialYear, format are required in DocumentNumbering
- bankName, accountNumber, accountType, ifscCode, branchName are required in BankDetails
- gstin, gstType, cgstRate, sgstRate, igstRate, cessRate are required in GSTDetails

**System-Generated Fields:**
- id: System-generated
- createdAt: System-generated
- updatedAt: System-generated
- lastLogin: System-generated
- activeSession: System-generated
- loginHistory: System-generated

---

## Architecture Note

**Settings Module Entities:**
- Company - Company information and branding
- Branch - Branch management
- User - User management
- LoginHistory - Login history tracking
- Permission - Permission management
- Role - Role management
- Module - Module management
- SystemPreferences - System preferences
- ModuleConfiguration - Module configuration
- DocumentNumbering - Document numbering settings
- BankDetails - Bank details
- GSTDetails - GST details
- DocumentSettings - Document settings
- FinanceConfiguration - Finance configuration
- ProjectConfiguration - Project configuration
- PasswordPolicy - Password policy
- SecuritySettings - Security settings
- SettingsStats - Settings stats

**Key Principles:**
- Settings module is a configuration module, not a data entry module
- Settings module manages system-wide configuration settings
- Settings module has company settings for company information and branding
- Settings module has branch settings for branch management
- Settings module has user and role settings for user and role management
- Settings module has document engine settings for document numbering and terms
- Settings module has security settings for password policy and session management
- Settings module has system preferences for timezone, language, currency, date format, time format, file settings
- Settings module has module settings for module management and configuration
- Settings module has finance configuration for finance settings
- Settings module has project configuration for project settings

---

**End of Pass 1 Report**
