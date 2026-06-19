"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { spacing } from "@/lib/design-system"
import { PageHeader } from "./PageHeader"
import { SearchBar } from "./SearchBar"
import { FilterBar, FilterConfig } from "./FilterBar"

interface StandardPageLayoutProps {
  // Header
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  headerActions?: React.ReactNode

  // KPI Cards
  kpiCards?: React.ReactNode

  // Search and Filters
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: FilterConfig[]
  onClearFilters?: () => void

  // Content
  children: React.ReactNode

  // Layout
  className?: string
}

export function StandardPageLayout({
  title,
  subtitle,
  breadcrumbs,
  headerActions,
  kpiCards,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  onClearFilters,
  children,
  className,
}: StandardPageLayoutProps) {
  const showActionBar = searchValue !== undefined || (filters && filters.length > 0)

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Page Header */}
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        actions={headerActions}
      />

      {/* KPI Cards Section */}
      {kpiCards && (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", spacing.sm)}>
          {kpiCards}
        </div>
      )}

      {/* Action Bar (Search + Filters) */}
      {showActionBar && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {searchValue !== undefined && onSearchChange && (
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          )}
          {filters && filters.length > 0 && (
            <FilterBar
              filters={filters}
              onClearAll={onClearFilters}
              className="flex-wrap"
            />
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
