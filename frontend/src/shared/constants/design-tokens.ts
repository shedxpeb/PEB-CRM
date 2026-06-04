/**
 * Design Tokens - Design System Foundation
 * Spacing, radius, font sizes, colors, shadows, typography
 * Used across the entire application for consistent styling
 */

export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  xxl: '2rem',     // 32px
  xxxl: '3rem',    // 48px
} as const;

export const RADIUS = {
  none: '0',
  sm: '0.125rem',  // 2px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  full: '9999px',
} as const;

export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  muted: '#94a3b8',
  background: '#f8fafc',
  foreground: '#0f172a',
  border: '#e2e8f0',
} as const;

export const FONT_SIZES = {
  xs: '0.625rem',  // 10px
  sm: '0.75rem',   // 12px
  base: '0.875rem', // 14px
  md: '0.875rem',  // 14px
  lg: '1rem',      // 16px
  xl: '1.125rem',  // 18px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem',  // 24px
  '4xl': '2rem',    // 32px
} as const;

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;
