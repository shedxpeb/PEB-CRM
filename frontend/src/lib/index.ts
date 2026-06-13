/**
 * Shared Utility Functions
 * Centralized utilities for calculations, formatting, and validation
 */

// Class name utility (existing)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency utilities
export * from './currencyUtils';
