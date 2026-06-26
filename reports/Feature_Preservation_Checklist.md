# PEB CRM - Feature Preservation Checklist

**Generated:** June 26, 2026  
**Scope:** Frontend Application Architecture Audit  
**Purpose:** Document feature preservation requirements for any proposed module merges.

---

## Executive Summary

**No module merges are recommended.** Therefore, no feature preservation checklists are required for module consolidation.

However, one cleanup action is identified:
- **Remove legacy route:** `/dashboard/item-master` → `/dashboard/item`

This report documents the feature preservation requirements for the cleanup action and provides hypothetical preservation checklists for the analyzed module pairs (for reference purposes only).

---

## Cleanup Action: Remove Legacy Route

### Action: Remove `/dashboard/item-master` Route

### Files to Delete
- `c:\Users\DELL\Desktop\s\PEB-CRM\frontend\src\app\dashboard\item-master\page.tsx`

### Feature Preservation Checklist

| Feature | Status | Preservation Action | Notes |
|---------|--------|---------------------|-------|
| **Item Master functionality** | ✅ Preserved | No action required | Canonical route `/dashboard/item` remains active |
| **Navigation link** | ✅ Preserved | No action required | Navigation uses canonical route |
| **External references** | ✅ Preserved | No action required | No external references found in codebase |
| **User bookmarks** | ⚠️ May break | User notification required | Users with bookmarks to legacy route will need to update |
| **Documentation** | ⚠️ May need update | Update documentation | Any documentation referencing legacy route should be updated |
| **API endpoints** | ✅ Preserved | No action required | API endpoints unaffected |
| **Data integrity** | ✅ Preserved | No action required | No data affected |

### Migration Steps

1. **Code Search:** Confirm no external references to `/dashboard/item-master` route
2. **Documentation Update:** Update any documentation referencing the legacy route
3. **User Notification:** Notify users of route removal (if any bookmarks exist)
4. **Delete File:** Remove `/dashboard/item-master/page.tsx`
5. **Test:** Verify canonical route `/dashboard/item` works correctly
6. **Monitor:** Monitor for any 404 errors or broken links

### Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| **Broken bookmarks** | LOW | User notification, canonical route works |
| **Broken documentation** | LOW | Update documentation before removal |
| **Broken external links** | LOW | Code search confirmed no external references |
| **Data loss** | NONE | No data affected |
| **Feature loss** | NONE | All features preserved in canonical route |

### Verification Checklist

- [ ] Code search completed - no external references found
- [ ] Documentation updated (if applicable)
- [ ] Users notified (if applicable)
- [ ] Legacy route file deleted
- [ ] Canonical route tested and working
- [ ] No 404 errors in logs
- [ ] No broken links reported

---

## Hypothetical Preservation Checklists (For Reference Only)

**Note:** These checklists are provided for reference only. No merges are recommended. These illustrate what would be required IF merges were to be pursued.

---

## Hypothetical: Item Master + Inventory Merge

### Merge Scenario
Combine Item Master (product catalog) and Inventory (stock management) into a single module.

### Feature Preservation Checklist

#### Item Master Features to Preserve

| Feature | Priority | Preservation Location | Notes |
|---------|----------|----------------------|-------|
| **Product catalog** | CRITICAL | Combined module | Must remain accessible |
| **Product specifications** | CRITICAL | Combined module | Brand, grade, spec, HSN, dimensions, weight |
| **Technical data** | CRITICAL | Combined module | Technical description, datasheet URL, product image |
| **Pricing data** | CRITICAL | Combined module | Default rate, GST rate |
| **PEB classification** | CRITICAL | Combined module | Structural, Cladding, Accessory, Service flags |
| **Tax management** | CRITICAL | Combined module | Tax type (CGST_SGST, IGST, Exempt) |
| **Variant support** | CRITICAL | Combined module | Product variants (e.g., different thicknesses) |
| **Bundle support** | CRITICAL | Combined module | Pre-configured product bundles |
| **Category hierarchy** | CRITICAL | Combined module | Multi-level category structure |
| **Manufacturer data** | HIGH | Combined module | Manufacturer name, country of origin |
| **Standard dimensions** | HIGH | Combined module | Length, width, height, thickness, diameter |
| **Currency support** | HIGH | Combined module | Multi-currency support |
| **Multiple images** | MEDIUM | Combined module | Product image gallery |
| **Preferred supplier** | MEDIUM | Combined module | Default supplier assignment |
| **Custom fields** | MEDIUM | Combined module | Settings-driven custom fields |
| **Item selector** | HIGH | Combined module | ItemMasterSelector component |
| **Item suggestion** | HIGH | Combined module | ItemSuggestion component |
| **Category filter** | HIGH | Combined module | CategoryFilter component |
| **Category selector** | HIGH | Combined module | CategorySelector component |
| **Data table** | CRITICAL | Combined module | Item list with all columns |
| **Create/Edit form** | CRITICAL | Combined module | ItemForm component |
| **View drawer** | HIGH | Combined module | ItemViewDrawer component |
| **Row actions** | HIGH | Combined module | ItemRowActions component |
| **Export functionality** | MEDIUM | Combined module | CSV export |
| **Filtering** | HIGH | Combined module | Category, brand, status, item type, tax type, unit, search, tags, HSN |
| **Search** | HIGH | Combined module | Full-text search |
| **KPI cards** | MEDIUM | Combined module | Item statistics |
| **Activity timeline** | LOW | Combined module | Item activity tracking |
| **Custom field support** | MEDIUM | Combined module | ItemCustomFields component |

#### Inventory Features to Preserve

| Feature | Priority | Preservation Location | Notes |
|---------|----------|----------------------|-------|
| **Stock level tracking** | CRITICAL | Combined module | Current, reserved, issued, available stock |
| **Stock movement tracking** | CRITICAL | Combined module | In, out, transfer, adjustment, reservation, release, consumption |
| **Warehouse management** | CRITICAL | Combined module | Multiple warehouse support |
| **Supplier management** | CRITICAL | Combined module | Full supplier management |
| **Stock alerts** | CRITICAL | Combined module | Low stock, out of stock, reorder required, critical |
| **Bin location tracking** | HIGH | Combined module | Physical storage location |
| **Reorder level management** | HIGH | Combined module | Reorder trigger point |
| **Safety stock management** | HIGH | Combined module | Buffer stock quantity |
| **Project stock allocation** | HIGH | Combined module | Track stock allocated to projects |
| **Stock value calculation** | MEDIUM | Combined module | Stock value based on purchase rate |
| **Purchase rate tracking** | MEDIUM | Combined module | Purchase cost rate |
| **Incoming/outgoing stock** | MEDIUM | Combined module | Stock on order, stock allocated for issue |
| **Category management** | MEDIUM | Combined module | Inventory-specific categories |
| **Stock movement form** | CRITICAL | Combined module | StockMovementForm component |
| **Category form** | MEDIUM | Combined module | CategoryForm component |
| **Supplier form** | CRITICAL | Combined module | SupplierForm component |
| **Warehouse form** | CRITICAL | Combined module | WarehouseForm component |
| **Inventory item form** | CRITICAL | Combined module | InventoryItemForm component |
| **View drawer** | HIGH | Combined module | InventoryViewDrawer component |
| **Row actions** | HIGH | Combined module | InventoryRowActions component |
| **Activity timeline** | MEDIUM | Combined module | InventoryActivityTimeline component |
| **Custom field support** | MEDIUM | Combined module | InventoryCustomFields component |
| **Data table** | CRITICAL | Combined module | Inventory list with all columns |
| **Export functionality** | MEDIUM | Combined module | CSV export |
| **Filtering** | HIGH | Combined module | Warehouse, stock status, unit, category, brand, item type, low stock, reorder required |
| **Search** | HIGH | Combined module | Full-text search |
| **KPI cards** | MEDIUM | Combined module | Inventory statistics |
| **Stock status types** | CRITICAL | Combined module | In Stock, Low Stock, Out of Stock, Critical, On Order, Discontinued |
| **Movement type types** | CRITICAL | Combined module | Stock In, Stock Out, Transfer, Adjustment, Reservation, Release, Consumption |
| **Unit types** | CRITICAL | Combined module | Kg, Ton, Meter, SqMeter, CuMeter, Nos, Box, Bundle, Set, Liter, Bag, Roll |
| **Item type classes** | MEDIUM | Combined module | Structural, Cladding, Accessory, Service, Other |

#### Data Migration Requirements

| Data Entity | Source | Destination | Migration Action |
|------------|--------|-------------|------------------|
| **Item Master records** | Item Master | Combined module | Migrate all records |
| **Inventory records** | Inventory | Combined module | Migrate all records |
| **Item Master categories** | Item Master | Combined module | Migrate all categories |
| **Inventory categories** | Inventory | Combined module | Migrate all categories (may need to merge with Item Master categories) |
| **Suppliers** | Inventory | Combined module | Migrate all suppliers |
| **Warehouses** | Inventory | Combined module | Migrate all warehouses |
| **Stock movements** | Inventory | Combined module | Migrate all stock movements |
| **Stock alerts** | Inventory | Combined module | Migrate all alerts |
| **Project allocations** | Inventory | Combined module | Migrate all allocations |
| **Custom fields** | Both | Combined module | Migrate all custom field definitions and values |

#### Navigation Preservation

| Navigation Element | Current State | Target State | Action Required |
|-------------------|---------------|-------------|----------------|
| **Sidebar item** | "Item" (Item Master) | Combined module | Update label and icon |
| **Sidebar item** | "Inventory" | Remove | Remove from navigation |
| **Route** | `/dashboard/item` | Combined module | Keep as canonical route |
| **Route** | `/dashboard/inventory` | Redirect to combined module | Set up redirect |
| **Route** | `/dashboard/item-master` | Redirect to combined module | Set up redirect |
| **Access roles** | Owner, Admin, Employee (Item) | Owner, Admin, Employee | Keep broader access |
| **Access roles** | Owner, Admin (Inventory) | Owner, Admin, Employee | Expand access |

#### Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| **Data loss** | HIGH | Comprehensive backup, test migration |
| **Feature loss** | HIGH | Detailed feature mapping, thorough testing |
| **User confusion** | HIGH | Extensive retraining, clear documentation |
| **Breaking references** | HIGH | Update all code references, set up redirects |
| **Performance degradation** | MEDIUM | Optimize combined module, monitor performance |
| **Maintenance complexity** | HIGH | Increased complexity requires more resources |

#### Estimated Effort

| Task | Estimated Effort |
|------|------------------|
| **Data migration** | 2-3 weeks |
| **Code refactoring** | 3-4 weeks |
| **UI redesign** | 2-3 weeks |
| **Testing** | 2-3 weeks |
| **Documentation** | 1 week |
| **User training** | 1-2 weeks |
| **Total** | 11-16 weeks |

---

## Hypothetical: Finance + Accounting Merge

### Merge Scenario
Combine Finance (operational transactions) and Accounting (statutory reporting) into a single module.

### Feature Preservation Checklist

#### Finance Features to Preserve

| Feature | Priority | Preservation Location | Notes |
|---------|----------|----------------------|-------|
| **Dashboard tab** | CRITICAL | Combined module | Financial overview with KPIs, charts, recent activities |
| **Invoices tab** | CRITICAL | Combined module | Invoice creation, management, sending, tracking |
| **Payments tab** | CRITICAL | Combined module | Payment recording, tracking, reconciliation |
| **Expenses tab** | CRITICAL | Combined module | Expense creation, approval workflow, tracking |
| **Receivables tab** | CRITICAL | Combined module | Customer aging analysis, collection tracking |
| **Payables tab** | CRITICAL | Combined module | Vendor aging analysis, payment scheduling |
| **Vendors tab** | CRITICAL | Combined module | Vendor management, performance tracking |
| **Bank Accounts tab** | CRITICAL | Combined module | Bank account management, balance tracking |
| **Invoice creation** | CRITICAL | Combined module | Create invoice from Quotation/Project/Manual |
| **Invoice sending** | CRITICAL | Combined module | Send invoice via email/SMS |
| **Invoice tracking** | CRITICAL | Combined module | Track invoice status, due dates |
| **Payment recording** | CRITICAL | Combined module | Record customer payments |
| **Payment reconciliation** | CRITICAL | Combined module | Match payments to invoices |
| **Expense creation** | CRITICAL | Combined module | Create expense entries |
| **Expense approval workflow** | CRITICAL | Combined module | Multi-level approval process |
| **Expense rejection** | HIGH | Combined module | Reject expenses with reason |
| **Vendor creation** | CRITICAL | Combined module | Add new vendors |
| **Vendor performance tracking** | HIGH | Combined module | Track vendor ratings |
| **Credit limit management** | HIGH | Combined module | Set vendor credit limits |
| **Bank account creation** | CRITICAL | Combined module | Add bank accounts |
| **Bank balance tracking** | CRITICAL | Combined module | Track account balances |
| **Receivables aging** | CRITICAL | Combined module | Calculate aging buckets |
| **Payables aging** | CRITICAL | Combined module | Calculate aging buckets |
| **Collection prioritization** | HIGH | Combined module | Prioritize overdue receivables |
| **Payment scheduling** | HIGH | Combined module | Schedule vendor payments |
| **GST calculation** | CRITICAL | Combined module | Calculate CGST, SGST, IGST, CESS |
| **Multi-currency support** | MEDIUM | Combined module | Handle multiple currencies |
| **Payment method management** | MEDIUM | Combined module | Manage payment methods |
| **Expense category management** | MEDIUM | Combined module | Manage expense categories |
| **Income category management** | MEDIUM | Combined module | Manage income categories |
| **Project finance tracking** | HIGH | Combined module | Track project-specific finances |
| **Budget tracking** | HIGH | Combined module | Track budget vs actual |
| **Revenue pipeline tracking** | MEDIUM | Combined module | Track quotation-to-conversion pipeline |
| **Top customers analysis** | MEDIUM | Combined module | Identify top revenue customers |
| **Top vendors analysis** | MEDIUM | Combined module | Identify top purchase vendors |
| **Monthly collections** | MEDIUM | Combined module | Track monthly payment trends |
| **Cash position health** | HIGH | Combined module | Assess cash position health |
| **Finance activity tracking** | MEDIUM | Combined module | Track all finance activities |
| **Invoice form** | CRITICAL | Combined module | InvoiceForm component |
| **Payment form** | CRITICAL | Combined module | PaymentForm component |
| **Expense form** | CRITICAL | Combined module | ExpenseForm component |
| **Vendor form** | CRITICAL | Combined module | VendorForm component |
| **Bank account form** | CRITICAL | Combined module | BankAccountForm component |
| **Income form** | HIGH | Combined module | IncomeForm component |
| **Invoice view drawer** | HIGH | Combined module | InvoiceViewDrawer component |
| **Payment view drawer** | HIGH | Combined module | PaymentViewDrawer component |
| **Expense view drawer** | HIGH | Combined module | ExpenseViewDrawer component |
| **Vendor view drawer** | HIGH | Combined module | VendorViewDrawer component |
| **Bank account view drawer** | HIGH | Combined module | BankAccountViewDrawer component |
| **Receivables view drawer** | HIGH | Combined module | ReceivableViewDrawer component |
| **Payables view drawer** | HIGH | Combined module | PayableViewDrawer component |
| **Finance row actions** | HIGH | Combined module | FinanceRowActions component |
| **Invoice status types** | CRITICAL | Combined module | Draft, Sent, Viewed, Partially Paid, Paid, Overdue, Cancelled |
| **Payment status types** | CRITICAL | Combined module | Pending, Processing, Completed, Failed, Refunded, Cancelled |
| **Expense status types** | CRITICAL | Combined module | Pending, Approved, Rejected, Paid, Cancelled |
| **Payment method types** | CRITICAL | Combined module | Bank Transfer, UPI, Cash, Cheque, RTGS, NEFT, IMPS, Credit Card, Debit Card |
| **Income category types** | MEDIUM | Combined module | Project Revenue, Advance Payment, Stage Payment, Partial Payment, Final Payment, Miscellaneous Income |
| **Expense category types** | MEDIUM | Combined module | Material Purchase, Labour Cost, Transport, Machinery, Fabrication, Installation, Site Expenses, Administrative Expenses, Miscellaneous Expenses |
| **GST types** | CRITICAL | Combined module | CGST, SGST, IGST, CESS |
| **Aging buckets** | CRITICAL | Combined module | 0-30 Days, 31-60 Days, 61-90 Days, 90+ Days |
| **Financial health types** | HIGH | Combined module | Healthy, At Risk, Critical |
| **Finance activity types** | MEDIUM | Combined module | 20+ activity types for tracking |
| **Finance filters** | HIGH | Combined module | Search, date range, customer, project, vendor, status, category, payment method |
| **Finance stats** | MEDIUM | Combined module | 20+ statistical metrics |

#### Accounting Features to Preserve

| Feature | Priority | Preservation Location | Notes |
|---------|----------|----------------------|-------|
| **Dashboard tab** | CRITICAL | Combined module | Accounting overview with KPIs, consistency checks |
| **Chart of Accounts tab** | CRITICAL | Combined module | Account management, account types, categories |
| **Journal Entries tab** | CRITICAL | Combined module | Manual journal entry creation, posting, reversal |
| **Ledger tab** | CRITICAL | Combined module | General ledger view with all transactions |
| **GST Center tab** | CRITICAL | Combined module | GST summary, input/output tax tracking, filing status |
| **Trial Balance tab** | CRITICAL | Combined module | Trial balance generation, debit/credit verification |
| **Profit & Loss tab** | CRITICAL | Combined module | P&L statement generation |
| **Balance Sheet tab** | CRITICAL | Combined module | Balance sheet generation |
| **Chart of accounts management** | CRITICAL | Combined module | Create/manage accounting accounts |
| **Account type management** | CRITICAL | Combined module | Asset, Liability, Equity, Revenue, Expense |
| **Account category management** | HIGH | Combined module | Account categorization |
| **System account creation** | HIGH | Combined module | Auto-create accounts from bank accounts |
| **Manual journal entry creation** | CRITICAL | Combined module | Create adjusting entries |
| **Journal entry posting** | CRITICAL | Combined module | Post entries to ledger |
| **Journal entry reversal** | HIGH | Combined module | Reverse posted entries |
| **General ledger view** | CRITICAL | Combined module | View all ledger transactions |
| **Ledger account filtering** | HIGH | Combined module | Filter by account |
| **GST summary generation** | CRITICAL | Combined module | Calculate GST liability |
| **Input GST tracking** | CRITICAL | Combined module | Track input tax credit |
| **Output GST tracking** | CRITICAL | Combined module | Track output tax liability |
| **GST filing status** | HIGH | Combined module | Track filing status |
| **Trial balance generation** | CRITICAL | Combined module | Generate trial balance |
| **Debit/credit verification** | CRITICAL | Combined module | Verify balance |
| **Trial balance health check** | HIGH | Combined module | Check if balanced |
| **Profit & Loss generation** | CRITICAL | Combined module | Generate P&L statement |
| **Revenue calculation** | CRITICAL | Combined module | Calculate total revenue |
| **Expense calculation** | CRITICAL | Combined module | Calculate total expenses |
| **Gross profit calculation** | CRITICAL | Combined module | Calculate gross profit |
| **Net profit calculation** | CRITICAL | Combined module | Calculate net profit |
| **Balance sheet generation** | CRITICAL | Combined module | Generate balance sheet |
| **Asset calculation** | CRITICAL | Combined module | Calculate total assets |
| **Liability calculation** | CRITICAL | Combined module | Calculate total liabilities |
| **Equity calculation** | CRITICAL | Combined module | Calculate total equity |
| **Balance sheet verification** | CRITICAL | Combined module | Verify A = L + E |
| **Consistency checks** | CRITICAL | Combined module | Verify data integrity across modules |
| **Net profit verification** | HIGH | Combined module | Verify P&L calculation |
| **Balance sheet verification** | HIGH | Combined module | Verify balance sheet equation |
| **GST verification** | HIGH | Combined module | Verify GST calculations |
| **Account configuration** | HIGH | Combined module | Configure account types and groups |
| **Journal entry workflow** | CRITICAL | Combined module | Draft → Posted → Reversed |
| **Accounting KPIs** | MEDIUM | Combined module | Assets, Liabilities, Equity, Net Profit, Cash & Bank, Receivables, Payables, GST Payable |
| **Trial balance rows** | CRITICAL | Combined module | Account-wise debit/credit/balance |
| **Ledger rows** | CRITICAL | Combined module | Transaction-wise ledger entries |
| **GST summary rows** | CRITICAL | Combined module | Tax type-wise GST data |
| **Profit & loss data** | CRITICAL | Combined module | Revenue, expenses, gross profit, net profit |
| **Balance sheet data** | CRITICAL | Combined module | Assets, liabilities, equity breakdown |
| **Account form** | CRITICAL | Combined module | AccountForm component |
| **Journal entry form** | CRITICAL | Combined module | JournalEntryForm component |
| **Entity view drawer** | HIGH | Combined module | EntityViewDrawer component (shared) |
| **Entity row actions** | HIGH | Combined module | EntityRowActions component (shared) |
| **Account types** | CRITICAL | Combined module | Asset, Liability, Equity, Revenue, Expense |
| **Account groups** | HIGH | Combined module | System-defined account groups |
| **Journal entry statuses** | CRITICAL | Combined module | Draft, Posted, Reversed |
| **Journal source types** | HIGH | Combined module | Invoice, Payment, Expense, Manual |
| **Derived journal entries** | CRITICAL | Combined module | Auto-generated from finance transactions |
| **Derived trial balance** | CRITICAL | Combined module | Calculated from journal entries |
| **Derived profit & loss** | CRITICAL | Combined module | Calculated from trial balance |
| **Derived balance sheet** | CRITICAL | Combined module | Calculated from trial balance |
| **Derived GST summary** | CRITICAL | Combined module | Calculated from invoices and expenses |
| **Derived accounting KPIs** | CRITICAL | Combined module | Calculated from all accounting data |
| **Accounting filters** | HIGH | Combined module | Account type, status, journal source, trial type |

#### Data Migration Requirements

| Data Entity | Source | Destination | Migration Action |
|------------|--------|-------------|------------------|
| **Invoices** | Finance | Combined module | Migrate all invoices |
| **Payments** | Finance | Combined module | Migrate all payments |
| **Expenses** | Finance | Combined module | Migrate all expenses |
| **Vendors** | Finance | Combined module | Migrate all vendors |
| **Bank accounts** | Finance | Combined module | Migrate all bank accounts |
| **Chart of accounts** | Accounting | Combined module | Migrate all accounts |
| **Journal entries** | Accounting | Combined module | Migrate all journal entries |
| **GST records** | Accounting | Combined module | Migrate all GST records |
| **Custom fields** | Both | Combined module | Migrate all custom field definitions and values |

#### Navigation Preservation

| Navigation Element | Current State | Target State | Action Required |
|-------------------|---------------|-------------|----------------|
| **Sidebar item** | "Finance" | Combined module | Update label and icon |
| **Sidebar item** | "Accounting" | Remove | Remove from navigation |
| **Route** | `/dashboard/finance` | Combined module | Keep as canonical route |
| **Route** | `/dashboard/accounting` | Redirect to combined module | Set up redirect |
| **Access roles** | Owner, Admin (both) | Owner, Admin | Keep same access |

#### Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| **Data loss** | HIGH | Comprehensive backup, test migration |
| **Feature loss** | HIGH | Detailed feature mapping, thorough testing |
| **User confusion** | HIGH | Extensive retraining, clear documentation |
| **Breaking references** | HIGH | Update all code references, set up redirects |
| **Compliance issues** | VERY HIGH | Maintain audit trail separation, consult compliance team |
| **Performance degradation** | MEDIUM | Optimize combined module, monitor performance |
| **Maintenance complexity** | HIGH | Increased complexity requires more resources |

#### Estimated Effort

| Task | Estimated Effort |
|------|------------------|
| **Data migration** | 3-4 weeks |
| **Code refactoring** | 4-5 weeks |
| **UI redesign** | 3-4 weeks |
| **Testing** | 3-4 weeks |
| **Compliance review** | 2-3 weeks |
| **Documentation** | 1-2 weeks |
| **User training** | 2-3 weeks |
| **Total** | 18-25 weeks |

---

## Summary

### Actual Recommended Actions

| Action | Type | Effort | Risk |
|--------|------|--------|------|
| **Remove legacy route** | Cleanup | 1 day | LOW |

### Hypothetical Merge Actions (Not Recommended)

| Action | Type | Effort | Risk | Recommendation |
|--------|------|--------|------|----------------|
| **Item Master + Inventory merge** | Merge | 11-16 weeks | HIGH | NOT RECOMMENDED |
| **Finance + Accounting merge** | Merge | 18-25 weeks | VERY HIGH | NOT RECOMMENDED |

### Conclusion

**No feature preservation checklists are required for module consolidation** because no merges are recommended. The only action required is the low-risk removal of a legacy route, which has minimal feature preservation requirements.

The hypothetical checklists above illustrate the complexity and risk that would be involved IF merges were pursued, further supporting the recommendation to keep all modules separate.
