# Theme Migration Checklist - White & Blue Theme System

## Overview
Complete migration guide to convert all hardcoded Tailwind colors to the new CSS variable-based theme system (White & Blue themes only).

---

## Theme System Architecture

### CSS Variables Available

**Core Variables:**
- `--bg` - Page background
- `--card` - Card background
- `--sidebar` - Sidebar background
- `--navbar` - Navbar/topbar background
- `--text` - Primary text color
- `--border` - Border color
- `--primary` - Primary button/accent color

**Extended Variables:**
- `--card-hover` - Card hover state
- `--text-secondary` - Secondary text
- `--text-muted` - Muted text
- `--primary-hover` - Primary button hover
- `--primary-foreground` - Primary button text
- `--input` - Input text color
- `--input-background` - Input background
- `--row-hover` - Table row hover
- `--header-background` - Table header background
- `--overlay` - Modal/dialog overlay
- `--success` - Success color
- `--warning` - Warning color
- `--error` - Error color
- `--info` - Info color

---

## Class Replacement Guide

### 1. Background Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `bg-white` | `bg-card` or `bg-bg` |
| `bg-gray-50` | `bg-bg` |
| `bg-gray-100` | `bg-card-hover` |
| `bg-gray-200` | `bg-card-hover` |
| `bg-gray-300` | `bg-border` |
| `dark:bg-*` | **DELETE ALL** |
| `bg-slate-*` | `bg-card` or `bg-bg` |
| `bg-blue-50` | `bg-card-hover` |
| `bg-blue-100` | `bg-sidebar` (if sidebar) |
| `bg-blue-500` | `bg-primary` |
| `bg-blue-600` | `bg-primary` |
| `bg-sky-*` | `bg-primary` or `bg-sidebar` |

### 2. Text Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `text-black` | `text-text` |
| `text-white` | `text-primary-foreground` (on primary) or `text-text` |
| `text-gray-900` | `text-text` |
| `text-gray-800` | `text-text` |
| `text-gray-700` | `text-text-secondary` |
| `text-gray-600` | `text-text-secondary` |
| `text-gray-500` | `text-text-muted` |
| `text-gray-400` | `text-text-muted` |
| `text-gray-300` | `text-text-muted` |
| `dark:text-*` | **DELETE ALL** |
| `text-slate-*` | `text-text` or `text-text-secondary` |
| `text-blue-600` | `text-primary` |
| `text-blue-500` | `text-primary` |

### 3. Border Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `border-gray-200` | `border-border` |
| `border-gray-300` | `border-border` |
| `border-gray-400` | `border-border` |
| `border-gray-500` | `border-border` |
| `dark:border-*` | **DELETE ALL** |
| `border-slate-*` | `border-border` |
| `border-blue-200` | `border-border` |
| `border-blue-300` | `border-border` |

### 4. Button Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `bg-blue-500 hover:bg-blue-600` | `bg-primary hover:bg-primary-hover` |
| `bg-blue-600 hover:bg-blue-700` | `bg-primary hover:bg-primary-hover` |
| `bg-sky-500 hover:bg-sky-600` | `bg-primary hover:bg-primary-hover` |
| `bg-sky-600 hover:bg-sky-700` | `bg-primary hover:bg-primary-hover` |
| `text-white` (on blue buttons) | `text-primary-foreground` |
| `dark:bg-*` | **DELETE ALL** |

### 5. Input Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `bg-white border-gray-300` | `bg-input-background border-border` |
| `text-gray-900` | `text-text` |
| `placeholder-gray-400` | `placeholder:text-text-muted` |
| `dark:bg-*` | **DELETE ALL** |
| `dark:border-*` | **DELETE ALL** |

### 6. Card/Container Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `bg-white border border-gray-200` | `bg-card border border-border` |
| `bg-gray-50 border border-gray-200` | `bg-bg border border-border` |
| `bg-slate-50` | `bg-bg` |
| `dark:bg-*` | **DELETE ALL** |
| `dark:border-*` | **DELETE ALL** |

### 7. Hover States

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `hover:bg-gray-100` | `hover:bg-card-hover` |
| `hover:bg-gray-200` | `hover:bg-card-hover` |
| `hover:bg-gray-50` | `hover:bg-card-hover` |
| `hover:bg-blue-50` | `hover:bg-card-hover` |
| `dark:hover:bg-*` | **DELETE ALL** |

### 8. Table Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `hover:bg-gray-50` (table rows) | `hover:bg-row-hover` |
| `bg-gray-100` (table header) | `bg-header-background` |
| `bg-white` (table cells) | `bg-card` |
| `dark:bg-*` | **DELETE ALL** |
| `dark:hover:bg-*` | **DELETE ALL** |

### 9. Modal/Dialog Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `bg-white` (modal content) | `bg-card` |
| `bg-black/50` (overlay) | `bg-overlay` |
| `bg-gray-900/50` (overlay) | `bg-overlay` |
| `dark:bg-*` | **DELETE ALL** |

### 10. Status Colors

| ❌ Remove | ✅ Replace With |
|-----------|----------------|
| `text-green-600` | `text-success` |
| `text-green-500` | `text-success` |
| `text-red-600` | `text-error` |
| `text-red-500` | `text-error` |
| `text-yellow-600` | `text-warning` |
| `text-yellow-500` | `text-warning` |
| `text-blue-600` (info) | `text-info` |
| `text-blue-500` (info) | `text-info` |

---

## Files to Migrate (Priority Order)

### ✅ COMPLETED - Core Layout Files
- [x] `frontend/src/layouts/MainLayout.tsx`
- [x] `frontend/src/layouts/Sidebar.tsx`
- [x] `frontend/src/layouts/Topbar.tsx`

### 🔄 HIGH PRIORITY - Dashboard Pages
- [ ] `frontend/src/app/dashboard/page.tsx` - Executive Dashboard
- [ ] `frontend/src/app/dashboard/leads/page.tsx` - Leads Dashboard
- [ ] `frontend/src/app/dashboard/customers/page.tsx` - Customers Dashboard
- [ ] `frontend/src/app/dashboard/projects/page.tsx` - Projects Dashboard
- [ ] `frontend/src/app/dashboard/items/page.tsx` - Items Dashboard
- [ ] `frontend/src/app/dashboard/inventory/page.tsx` - Inventory Dashboard
- [ ] `frontend/src/app/dashboard/finance/page.tsx` - Finance Dashboard
- [ ] `frontend/src/app/dashboard/accounting/page.tsx` - Accounting Dashboard
- [ ] `frontend/src/app/dashboard/documents/page.tsx` - Documents Dashboard
- [ ] `frontend/src/app/dashboard/settings/page.tsx` - Settings Dashboard

### 🔄 MEDIUM PRIORITY - Feature Components
- [ ] `frontend/src/features/leads/components/*.tsx` - All lead components
- [ ] `frontend/src/features/customers/components/*.tsx` - All customer components
- [ ] `frontend/src/features/projects/components/*.tsx` - All project components
- [ ] `frontend/src/features/items/components/*.tsx` - All item components
- [ ] `frontend/src/features/inventory/components/*.tsx` - All inventory components
- [ ] `frontend/src/features/finance/components/*.tsx` - All finance components
- [ ] `frontend/src/features/accounting/components/*.tsx` - All accounting components
- [ ] `frontend/src/features/documents/components/*.tsx` - All document components
- [ ] `frontend/src/features/settings/components/*.tsx` - All settings components

### 🔄 LOW PRIORITY - Shared Components
- [ ] `frontend/src/components/ui/button.tsx` - shadcn button
- [ ] `frontend/src/components/ui/card.tsx` - shadcn card
- [ ] `frontend/src/components/ui/input.tsx` - shadcn input
- [ ] `frontend/src/components/ui/table.tsx` - shadcn table
- [ ] `frontend/src/components/ui/dialog.tsx` - shadcn dialog
- [ ] `frontend/src/components/ui/dropdown-menu.tsx` - shadcn dropdown
- [ ] `frontend/src/components/ui/select.tsx` - shadcn select
- [ ] `frontend/src/components/ui/form.tsx` - shadcn form
- [ ] `frontend/src/components/layout/*.tsx` - Other layout components

---

## Migration Steps Per File

### Step 1: Search for Hardcoded Classes
Use VS Code search (Ctrl+Shift+F) to find:
- `bg-white`
- `bg-gray-*`
- `text-gray-*`
- `border-gray-*`
- `dark:bg-*`
- `dark:text-*`
- `dark:border-*`

### Step 2: Replace According to Guide
Use the replacement table above to convert each class.

### Step 3: Test Theme Toggle
After migrating a file:
1. Open the page in browser
2. Click theme toggle (Light ↔ Sky Blue)
3. Verify all elements change colors correctly
4. Check for any remaining hardcoded colors

### Step 4: Check for Mixed Colors
Look for elements that don't change when theme toggles - these likely have hardcoded colors.

---

## Common Patterns to Replace

### Pattern 1: Card Component
```tsx
// ❌ Before
<div className="bg-white border border-gray-200 rounded-lg p-6">
  <h2 className="text-gray-900">Title</h2>
</div>

// ✅ After
<div className="bg-card border border-border rounded-lg p-6">
  <h2 className="text-text">Title</h2>
</div>
```

### Pattern 2: Button Component
```tsx
// ❌ Before
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click
</button>

// ✅ After
<button className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded">
  Click
</button>
```

### Pattern 3: Input Component
```tsx
// ❌ Before
<input className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400" />

// ✅ After
<input className="bg-input-background border border-border text-text placeholder:text-text-muted" />
```

### Pattern 4: Table Row
```tsx
// ❌ Before
<tr className="hover:bg-gray-50">
  <td className="text-gray-900">Data</td>
</tr>

// ✅ After
<tr className="hover:bg-row-hover">
  <td className="text-text">Data</td>
</tr>
```

### Pattern 5: Modal/Dialog
```tsx
// ❌ Before
<div className="bg-black/50">
  <div className="bg-white">
    <h3 className="text-gray-900">Modal</h3>
  </div>
</div>

// ✅ After
<div className="bg-overlay">
  <div className="bg-card">
    <h3 className="text-text">Modal</h3>
  </div>
</div>
```

---

## Search & Replace Commands

### VS Code Find & Replace (Regex)

**Replace all bg-white with bg-card:**
- Find: `bg-white`
- Replace: `bg-card`

**Replace all bg-gray-50 with bg-bg:**
- Find: `bg-gray-50`
- Replace: `bg-bg`

**Replace all text-gray-900 with text-text:**
- Find: `text-gray-900`
- Replace: `text-text`

**Replace all border-gray-200 with border-border:**
- Find: `border-gray-200`
- Replace: `border-border`

**Remove all dark:bg-* classes:**
- Find: `dark:bg-[a-zA-Z0-9-]+`
- Replace: (empty)

**Remove all dark:text-* classes:**
- Find: `dark:text-[a-zA-Z0-9-]+`
- Replace: (empty)

**Remove all dark:border-* classes:**
- Find: `dark:border-[a-zA-Z0-9-]+`
- Replace: (empty)

---

## Testing Checklist

After completing migration:

- [ ] Theme toggle works on all dashboard pages
- [ ] No mixed colors (light/sky) on any page
- [ ] Sidebar changes color correctly
- [ ] Navbar changes color correctly
- [ ] Cards change color correctly
- [ ] Tables change color correctly
- [ ] Forms change color correctly
- [ ] Buttons change color correctly
- [ ] Modals/Dialogs change color correctly
- [ ] Dropdowns change color correctly
- [ ] Charts change color correctly
- [ ] Theme persists after page refresh
- [ ] Theme persists across route navigation
- [ ] No hydration errors in console
- [ ] No CSS variable errors in console

---

## Theme Color Reference

### WHITE THEME
- **Page Background:** #FFFFFF
- **Card Background:** #FFFFFF
- **Sidebar:** #E0F2FE (Light Sky Blue)
- **Navbar:** #FFFFFF
- **Primary Color:** #38BDF8 (Sky Blue)
- **Text:** #0F172A (Dark Slate)
- **Border:** #E2E8F0 (Light Gray)

### BLUE THEME
- **Page Background:** #F0F9FF (Very Light Sky Blue)
- **Card Background:** #FFFFFF
- **Sidebar:** #7DD3FC (Medium Sky Blue - More Visible)
- **Navbar:** #E0F2FE (Light Sky Blue)
- **Primary Color:** #0EA5E9 (Darker Sky Blue)
- **Text:** #0F172A (Dark Slate)
- **Border:** #BFDBFE (Sky Blue Gray)

---

## Important Notes

1. **NO DARK MODE** - The system only supports White and Blue themes
2. **NO PURE BLACK** - All colors are shades of blue, gray, or white
3. **CSS VARIABLES ONLY** - All colors must come from CSS variables
4. **NO HARDCODED COLORS** - Replace all Tailwind color classes
5. **CONSISTENCY** - Ensure all components use the same theme system
6. **TEST THOROUGHLY** - Test theme toggle on every page after migration

---

## Quick Reference

### Most Common Replacements

| What You'll See Most Often | Replace With |
|---------------------------|--------------|
| `bg-white` | `bg-card` |
| `bg-gray-50` | `bg-bg` |
| `text-gray-900` | `text-text` |
| `text-gray-500` | `text-text-muted` |
| `border-gray-200` | `border-border` |
| `bg-blue-500` | `bg-primary` |
| `hover:bg-gray-100` | `hover:bg-card-hover` |
| `dark:bg-*` | **DELETE** |
| `dark:text-*` | **DELETE** |
| `dark:border-*` | **DELETE** |

---

## Completion

Once all files are migrated and tested, the theme system will be fully functional with:
- ✅ Light Theme (white background, light sky blue sidebar)
- ✅ Sky Blue Theme (light sky blue background, medium sky blue sidebar)
- ✅ No dark mode
- ✅ No black backgrounds
- ✅ All colors driven by CSS variables
- ✅ Consistent theme across all routes
 Hydration-safe implementation
- ✅ localStorage persistence
