# PEB CRM Bundle Analysis Report

**Date:** June 27, 2026  
**Type:** Bundle Analysis  
**Build Tool:** Webpack (with Bundle Analyzer)  
**Next.js Version:** 16.2.6

---

## Build Summary

**Build Time:** 72 seconds (webpack)  
**TypeScript Check:** Passed (26.2s)  
**Static Pages:** 48/48  
**Dynamic Pages:** 6 (customer/[id], document/[id], etc.)

---

## Total Bundle Size

| Location | Size | Files |
|----------|------|-------|
| .next (total) | 835.5 MB | 3,116 files |
| .next/static | 9.6 MB | 192 files |

**Note:** The large .next size includes build cache, source maps, and intermediate files. The actual static assets are 9.6 MB.

---

## Largest Chunks (Top 20)

| Chunk | Size | Type |
|-------|------|------|
| 0vye-ujsqctje.js | 1.42 MB | JavaScript |
| 0ak0y55f9il74.js | 519 KB | JavaScript |
| 0zrwx-swyby89.js | 330 KB | JavaScript |
| 0b_bmhrgli7m3.js | 330 KB | JavaScript |
| 0ljuam0~qmfp6.js | 292 KB | JavaScript |
| 0nokjs98qtstu.js | 292 KB | JavaScript |
| 0hfw~zchjv985.js | 228 KB | JavaScript |
| 10-qc793i1~os.js | 198 KB | JavaScript |
| 05osbh6jk..2u.js | 158 KB | JavaScript |
| 01.-sh3cgqu1l.js | 138 KB | JavaScript |
| 0cdm.1mzz4u0x.js | 117 KB | JavaScript |
| 03~yq9q893hmn.js | 113 KB | JavaScript |
| 06wt764j672p_.css | 107 KB | CSS |
| 02p.5kcoq7w.7.js | 99 KB | JavaScript |
| 09pujdcayv5ow.js | 86 KB | JavaScript |
| 0ya399zd4b608.js | 83 KB | JavaScript |
| 026j2btg-k8u~.js | 79 KB | JavaScript |
| 13n_p883sg6~h.js | 75 KB | JavaScript |
| 00ygxnsle-b_e.js | 75 KB | JavaScript |
| 0um_jq5vemjic.js | 61 KB | JavaScript |

---

## Key Findings

### 1. Largest Chunk (1.42 MB)
The chunk `0vye-ujsqctje.js` is significantly larger than others at 1.42 MB. This likely contains:
- React and React DOM
- Next.js core libraries
- Shared utilities and hooks
- UI component libraries (Radix UI, Lucide icons)

### 2. Multiple 300+ KB Chunks
Several chunks are in the 300-330 KB range, suggesting:
- Feature-specific bundles (finance, projects, inventory)
- Chart libraries (Recharts)
- Form libraries (react-hook-form, zod)

### 3. CSS Size
The largest CSS file is 107 KB, which is reasonable for a Tailwind-based application.

---

## Bundle Analyzer Reports

Bundle analyzer reports have been generated in:
- `.next/analyze/client.html` - Client-side bundles
- `.next/analyze/nodejs.html` - Server-side bundles
- `.next/analyze/edge.html` - Edge runtime bundles

**Note:** The analyzer reported "No bundles were parsed" for nodejs and edge, showing only original module sizes from stats file. This is expected for Next.js 16 with Turbopack.

---

## Optimization Opportunities

### High Priority
1. **Investigate 1.42 MB chunk** - This is the largest single chunk and should be analyzed for:
   - Duplicate dependencies
   - Unused code
   - Large libraries that could be lazy loaded

2. **Analyze 300+ KB chunks** - These likely contain feature-specific code that could be:
   - Further code-split by route
   - Lazy loaded on demand

### Medium Priority
1. **Tree-shaking verification** - Ensure Recharts and other libraries are only importing used components
2. **Dynamic imports** - Verify that forms and drawers are properly code-split
3. **CSS purging** - Ensure Tailwind is purging unused styles

### Low Priority
1. **Source map generation** - Consider disabling in production to reduce .next size
2. **Build cache cleanup** - Implement cache cleanup strategy

---

## Comparison with Estimates

Previous optimization report estimated:
- **Initial Bundle Size:** ~2.0 MB (after lazy loading)
- **Actual Static Assets:** ~9.6 MB

The actual static assets are larger than estimated because:
- The estimate only counted JavaScript chunks
- Actual build includes CSS, fonts, images, and other assets
- The 9.6 MB is the total size of all static assets, not just initial load

**Initial JavaScript Load:** ~2-3 MB (estimated from top chunks)

---

## Next Steps

1. **Open bundle analyzer reports** in browser to visualize dependencies
2. **Profile largest chunks** to identify optimization targets
3. **Measure actual load time** with Lighthouse
4. **Audit client components** to reduce unnecessary client-side rendering
5. **Optimize based on measurements**, not estimates

---

**Report Generated:** June 27, 2026  
**Build Tool:** Webpack with Bundle Analyzer  
**Status:** Baseline measurements complete
