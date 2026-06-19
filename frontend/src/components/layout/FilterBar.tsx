"use client"

import * as React from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { componentTextSizes, iconSizes } from "@/lib/design-system"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

interface FilterBarProps {
  filters: FilterConfig[]
  onClearAll?: () => void
  className?: string
}

export function FilterBar({ filters, onClearAll, className }: FilterBarProps) {
  const hasActiveFilters = filters.some(f => f.value !== 'all' && f.value !== '')

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className={iconSizes.sm} />
        <span className={cn(componentTextSizes.button.md, "font-medium")}>
          Filters
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-2">
            <label className={cn(componentTextSizes.form.label, "whitespace-nowrap")}>
              {filter.label}
            </label>
            <Select value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger className="w-32 sm:w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {hasActiveFilters && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="gap-2"
        >
          <X className={iconSizes.xs} />
          Clear All
        </Button>
      )}
    </div>
  )
}
