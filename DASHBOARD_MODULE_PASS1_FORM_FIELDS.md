# Dashboard Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Dashboard Module Form Fields  
**Objective:** Identify all form fields in Dashboard filters and configuration with details.

---

## Form Information

**Components Analyzed:**
- DashboardFilter.tsx (lines 1-63)
- ExportButton.tsx (lines 1-69)
- types/index.ts (lines 1-160)

**Architecture Note:** Dashboard module is a display module with filters, KPIs, charts, and export functionality. Dashboard module is not a data entry module like others - it displays aggregated data from other modules (Lead, Customer, Project, Inventory, Documents, Finance, Task). Dashboard module has filter fields for date range, comparison mode, and comparison granularity. Dashboard module has KPI fields for revenue, expected revenue, won value, active projects, leads, quotations, customers, inventory value. Dashboard module has chart fields for sales funnel, revenue trend, quotation status, project pipeline, inventory analytics. Dashboard module has activity fields for recent activities, recent quotations, recent leads.

**Form Sections:**
1. Dashboard Filter (DashboardFilter.tsx)
2. Dashboard Export (ExportButton.tsx)
3. Dashboard Types (types/index.ts)

---

## Field Inventory

### Section 1: Dashboard Filter (DashboardFilter.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| dateRange | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | this_month | Must be valid date range | Date Range Filter |

**Evidence:** Lines 15-17 (props), Lines 20-30 (options), Lines 32-62 (component) in DashboardFilter.tsx

**Notes:**
- dateRange is required field
- dateRange options: today, this_week, this_month, last_month, this_quarter, last_quarter, this_year, last_year, all_time
- dateRange default value: this_month

---

### Section 2: Dashboard Export (ExportButton.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| exportType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | pdf | Must be valid export type | Export Type |
| isGenerating | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | Export Status |
| progress | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be 0-100 | Export Progress |
| status | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | idle | Must be valid status | Export Status |

**Evidence:** Lines 6-11 (props), Lines 13-17 (export types), Lines 19-69 (component) in ExportButton.tsx

**Notes:**
- exportType options: pdf (enabled), excel (disabled), csv (disabled)
- exportType default value: pdf
- isGenerating is for export status tracking
- progress is for export progress tracking (0-100)
- status options: preparing, rendering, generating, ready, error, idle
- status default value: idle

---

### Section 3: Dashboard Types (types/index.ts)

#### KPI Types

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| title | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| value | string \| number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| icon | React.ReactNode | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| navigateTo | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| color | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | KPICardData |
| change | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | KPICardData |
| changeType | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be increase or decrease | KPICardData |
| loading | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | KPICardData |
| error | string \| null | ❌ No | ✅ Yes | ❌ No | ❌ No | null | - | KPICardData |

**Evidence:** Lines 10-21 in types/index.ts

**Notes:**
- KPICardData is for KPI card display
- changeType options: increase, decrease

---

#### DashboardKPIs Type

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| revenue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| expectedRevenue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| wonValue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| activeProjects | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| leads | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| quotations | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| customers | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |
| inventoryValue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardKPIs |

**Evidence:** Lines 23-32 in types/index.ts

**Notes:**
- DashboardKPIs is for high-level metrics
- All fields are required and must be positive

---

#### Chart Types

##### SalesFunnelData

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | SalesFunnelData |
| value | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | SalesFunnelData |
| color | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | SalesFunnelData |
| comparisonValue | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | SalesFunnelData |

**Evidence:** Lines 38-43 in types/index.ts

---

##### RevenueTrendData

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RevenueTrendData |
| revenue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | RevenueTrendData |
| previous | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (if entered) | RevenueTrendData |

**Evidence:** Lines 45-49 in types/index.ts

---

##### QuotationStatusData

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | QuotationStatusData |
| value | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | QuotationStatusData |
| color | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | QuotationStatusData |

**Evidence:** Lines 51-55 in types/index.ts

---

##### ProjectPipelineData

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| stage | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | ProjectPipelineData |
| count | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | ProjectPipelineData |
| value | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | ProjectPipelineData |
| percentage | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | ProjectPipelineData |
| color | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | ProjectPipelineData |

**Evidence:** Lines 57-63 in types/index.ts

---

##### InventoryAnalyticsData

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | InventoryAnalyticsData |
| value | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | InventoryAnalyticsData |
| color | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | InventoryAnalyticsData |

**Evidence:** Lines 65-69 in types/index.ts

---

#### Activity Types

##### Activity

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Activity |
| type | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid type | Activity |
| title | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Activity |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Activity |
| timestamp | Date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | Activity |
| user | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | Activity |
| status | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Activity |

**Evidence:** Lines 75-85 in types/index.ts

**Notes:**
- type options: lead, project, quotation, task

---

#### Table Types

##### RecentQuotation

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentQuotation |
| quotationNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentQuotation |
| customerName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentQuotation |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | RecentQuotation |
| status | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid status | RecentQuotation |
| createdAt | Date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | RecentQuotation |

**Evidence:** Lines 91-98 in types/index.ts

**Notes:**
- status options: Draft, Sent, Approved, Rejected

---

##### RecentLead

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| companyName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| projectTitle | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| source | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| assignedTo | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| status | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | RecentLead |
| createdAt | Date | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Date format | RecentLead |

**Evidence:** Lines 100-108 in types/index.ts

---

#### Filter Types

##### DashboardFilters

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| dateRange | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | this_month | Must be valid date range | DashboardFilters |
| comparisonMode | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | none | Must be valid mode | DashboardFilters |
| comparisonGranularity | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | month | Must be valid granularity | DashboardFilters |

**Evidence:** Lines 114-124 in types/index.ts

**Notes:**
- dateRange options: today, this_week, this_month, last_month, this_quarter, last_quarter, this_year, last_year, all_time
- comparisonMode options: none, previous_period, previous_year
- comparisonGranularity options: day, week, month, quarter, year
- dateRange default value: this_month
- comparisonMode default value: none
- comparisonGranularity default value: month

---

#### API Response Types

##### DashboardStatsResponse

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| executiveKPIs | DashboardKPIs | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| salesFunnel | SalesFunnelData[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| revenueTrend12Months | RevenueTrendData[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| quotationStatus | QuotationStatusData[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| projectPipeline | ProjectPipelineData[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| inventoryAnalytics | InventoryAnalyticsData[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| inventoryTotalValue | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | DashboardStatsResponse |
| recentActivities | Activity[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| recentQuotations | RecentQuotation[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |
| recentLeads | RecentLead[] | ✅ Yes | ❌ No | ❌ No | ❌ No | - | - | DashboardStatsResponse |

**Evidence:** Lines 130-141 in types/index.ts

**Notes:**
- DashboardStatsResponse is for API response structure
- All fields are required

---

##### DashboardStatsParams

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| dateRange | DateRange | ✅ Yes | ❌ No | ❌ No | ❌ No | this_month | Must be valid date range | DashboardStatsParams |
| comparisonMode | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | none | Must be valid mode | DashboardStatsParams |
| comparisonGranularity | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | month | Must be valid granularity | DashboardStatsParams |

**Evidence:** Lines 143-147 in types/index.ts

**Notes:**
- DashboardStatsParams is for API request parameters
- dateRange default value: this_month
- comparisonMode default value: none
- comparisonGranularity default value: month

---

#### Component State Types

##### ComponentState

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| - | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be valid state | ComponentState |

**Evidence:** Lines 153 in types/index.ts

**Notes:**
- ComponentState options: loading, success, error, empty

---

##### ComponentProps

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| loading | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | ComponentProps |
| error | string \| null | ❌ No | ✅ Yes | ❌ No | ❌ No | null | - | ComponentProps |
| empty | boolean | ❌ No | ✅ Yes | ❌ No | ❌ No | false | - | ComponentProps |

**Evidence:** Lines 155-159 in types/index.ts

---

## Summary Statistics

**Total Fields Identified:** 50+ (across all Dashboard types)

**By Entity:**
- DashboardFilter: 1 field
- ExportButton: 4 fields
- KPICardData: 11 fields
- DashboardKPIs: 8 fields
- SalesFunnelData: 4 fields
- RevenueTrendData: 3 fields
- QuotationStatusData: 3 fields
- ProjectPipelineData: 5 fields
- InventoryAnalyticsData: 3 fields
- Activity: 7 fields
- RecentQuotation: 6 fields
- RecentLead: 7 fields
- DashboardFilters: 3 fields
- DashboardStatsResponse: 10 fields
- DashboardStatsParams: 3 fields
- ComponentState: 1 field
- ComponentProps: 3 fields

**By Category:**
- Filter Fields: 3 (dateRange, comparisonMode, comparisonGranularity)
- Export Fields: 4 (exportType, isGenerating, progress, status)
- KPI Fields: 19 (KPICardData + DashboardKPIs)
- Chart Fields: 18 (SalesFunnelData + RevenueTrendData + QuotationStatusData + ProjectPipelineData + InventoryAnalyticsData)
- Activity Fields: 7
- Table Fields: 13 (RecentQuotation + RecentLead)
- API Response Fields: 10
- API Request Fields: 3
- Component State Fields: 4

**By Required Status:**
- Required in Filter: 1 (dateRange)
- Optional in Filter: 2 (comparisonMode, comparisonGranularity)
- Required in Export: 1 (exportType)
- Optional in Export: 3 (isGenerating, progress, status)
- Required in KPIs: 8
- Required in Charts: 15
- Optional in Charts: 3 (color, comparisonValue, previous)
- Required in Activity: 6
- Optional in Activity: 1 (status)
- Required in Tables: 13
- Required in API Response: 10
- Required in API Request: 1
- Optional in API Request: 2

**By Section:**
- Dashboard Filter: 1
- Dashboard Export: 4
- KPICardData: 11
- DashboardKPIs: 8
- SalesFunnelData: 4
- RevenueTrendData: 3
- QuotationStatusData: 3
- ProjectPipelineData: 5
- InventoryAnalyticsData: 3
- Activity: 7
- RecentQuotation: 6
- RecentLead: 7
- DashboardFilters: 3
- DashboardStatsResponse: 10
- DashboardStatsParams: 3
- ComponentState: 1
- ComponentProps: 3

---

## Form Behavior Notes

**Dashboard Filter Mode:**
- dateRange is required
- dateRange default value: this_month
- dateRange options: today, this_week, this_month, last_month, this_quarter, last_quarter, this_year, last_year, all_time

**Dashboard Export Mode:**
- exportType is required
- exportType default value: pdf
- exportType options: pdf (enabled), excel (disabled), csv (disabled)
- isGenerating is for export status tracking
- progress is for export progress tracking (0-100)
- status is for export status tracking (preparing, rendering, generating, ready, error, idle)

**Dashboard KPIs:**
- All KPI fields are required
- All KPI fields must be positive
- KPI fields: revenue, expectedRevenue, wonValue, activeProjects, leads, quotations, customers, inventoryValue

**Dashboard Charts:**
- All chart fields are required except color, comparisonValue, previous
- All numeric chart fields must be positive
- Chart types: SalesFunnelData, RevenueTrendData, QuotationStatusData, ProjectPipelineData, InventoryAnalyticsData

**Dashboard Activities:**
- All activity fields are required except status
- Activity types: lead, project, quotation, task

**Dashboard Tables:**
- All table fields are required
- Table types: RecentQuotation, RecentLead

**Dashboard API:**
- DashboardStatsResponse is for API response structure
- DashboardStatsParams is for API request parameters
- All API response fields are required
- dateRange is required in API request
- comparisonMode and comparisonGranularity are optional in API request

---

## Validation Rules Summary

**Enum Validation:**
- dateRange: Must be today, this_week, this_month, last_month, this_quarter, last_quarter, this_year, last_year, all_time
- comparisonMode: Must be none, previous_period, previous_year
- comparisonGranularity: Must be day, week, month, quarter, year
- exportType: Must be pdf, excel, csv
- status: Must be preparing, rendering, generating, ready, error, idle
- changeType: Must be increase, decrease
- type: Must be lead, project, quotation, task
- quotationStatus: Must be Draft, Sent, Approved, Rejected
- ComponentState: Must be loading, success, error, empty

**Numeric Validation:**
- All numeric fields: Must be positive (if entered)
- progress: Must be 0-100

**Date Validation:**
- All date fields: Date format

**String Validation:**
- All string fields: No validation

**Cross-Field Validation:**
- dateRange is required in filter
- exportType is required in export
- All KPI fields are required
- All chart fields are required except color, comparisonValue, previous

**System-Generated Fields:**
- No system-generated fields in Dashboard module
- All fields are user-provided or API-provided

---

## Architecture Note

**Dashboard Module Entities:**
- DashboardFilter - Filter component for date range
- ExportButton - Export component for PDF export
- KPICardData - KPI card display data
- DashboardKPIs - High-level metrics
- SalesFunnelData - Sales funnel chart data
- RevenueTrendData - Revenue trend chart data
- QuotationStatusData - Quotation status chart data
- ProjectPipelineData - Project pipeline chart data
- InventoryAnalyticsData - Inventory analytics chart data
- Activity - Activity tracking data
- RecentQuotation - Recent quotation table data
- RecentLead - Recent lead table data
- DashboardFilters - Filter configuration
- DashboardStatsResponse - API response structure
- DashboardStatsParams - API request parameters
- ComponentState - Component state
- ComponentProps - Component props

**Key Principles:**
- Dashboard module is a display module, not a data entry module
- Dashboard module displays aggregated data from other modules
- Dashboard module has filter fields for date range, comparison mode, and comparison granularity
- Dashboard module has KPI fields for high-level metrics
- Dashboard module has chart fields for visual analytics
- Dashboard module has activity fields for recent activities
- Dashboard module has table fields for recent quotations and leads
- Dashboard module has export functionality for PDF export

---

**End of Pass 1 Report**
