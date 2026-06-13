/**
 * Currency Formatting Utilities
 * Provides consistent currency formatting with scale support (L, Cr, M, K)
 * Handles edge cases: null, undefined, NaN, Infinity, negative values
 */

export type CurrencyScale = 'auto' | 'L' | 'Cr' | 'M' | 'K' | 'none';

export interface CurrencyFormatOptions {
  scale?: CurrencyScale;
  decimals?: number;
  showSymbol?: boolean;
  locale?: string;
}

/**
 * Format currency value with Indian numbering system
 * Supports automatic scale detection (L for Lakhs, Cr for Crores, etc.)
 * 
 * @param amount - The amount to format (can be null/undefined)
 * @param options - Formatting options
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrencyINR(1500000) // "₹15.0L"
 * formatCurrencyINR(10000000) // "₹1.0Cr"
 * formatCurrencyINR(5000, { scale: 'K' }) // "₹5.0K"
 * formatCurrencyINR(null) // "₹0"
 */
export function formatCurrencyINR(
  amount: number | null | undefined,
  options: CurrencyFormatOptions = {}
): string {
  const { scale = 'auto', decimals = 1, showSymbol = true, locale = 'en-IN' } = options;
  
  // Handle null/undefined
  const value = amount ?? 0;
  
  // Handle invalid numbers
  if (isNaN(value) || !isFinite(value)) {
    return showSymbol ? '₹0' : '0';
  }
  
  // Determine divisor and suffix based on scale
  let divisor = 1;
  let suffix = '';
  
  if (scale === 'auto') {
    // Auto-detect appropriate scale
    if (Math.abs(value) >= 10000000) { divisor = 10000000; suffix = 'Cr'; }
    else if (Math.abs(value) >= 100000) { divisor = 100000; suffix = 'L'; }
    else if (Math.abs(value) >= 1000000) { divisor = 1000000; suffix = 'M'; }
    else if (Math.abs(value) >= 1000) { divisor = 1000; suffix = 'K'; }
  } else if (scale !== 'none') {
    const scaleMap: Record<CurrencyScale, number> = {
      'Cr': 10000000,
      'L': 100000,
      'M': 1000000,
      'K': 1000,
      'auto': 1,
      'none': 1
    };
    divisor = scaleMap[scale] || 1;
    suffix = scale;
  }
  
  // Calculate scaled value
  const scaled = value / divisor;
  
  // Format with specified decimals
  const formatted = scaled.toFixed(decimals);
  
  // Add symbol and suffix
  const result = `${formatted}${suffix}`;
  return showSymbol ? `₹${result}` : result;
}

/**
 * Format currency using Intl.NumberFormat for standard formatting
 * 
 * @param amount - The amount to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted currency string
 */
export function formatCurrencyIntl(
  amount: number | null | undefined,
  options: Intl.NumberFormatOptions = {}
): string {
  const value = amount ?? 0;
  
  if (isNaN(value) || !isFinite(value)) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options
  }).format(value);
}

/**
 * Format currency with commas (no currency symbol)
 * 
 * @param amount - The amount to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string with commas
 */
export function formatNumberWithCommas(
  amount: number | null | undefined,
  decimals: number = 0
): string {
  const value = amount ?? 0;
  
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }
  
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Calculate percentage change between two values
 * 
 * @param current - Current value
 * @param previous - Previous value
 * @param decimals - Number of decimal places
 * @returns Formatted percentage change string
 */
export function calculateCurrencyChange(
  current: number | null | undefined,
  previous: number | null | undefined,
  decimals: number = 1
): string {
  const curr = current ?? 0;
  const prev = previous ?? 0;
  
  if (prev === 0 || isNaN(curr) || isNaN(prev) || !isFinite(curr) || !isFinite(prev)) {
    return '0%';
  }
  
  const change = ((curr - prev) / Math.abs(prev)) * 100;
  const formatted = change.toFixed(decimals);
  return `${change > 0 ? '+' : ''}${formatted}%`;
}
