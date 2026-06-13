'use client';

import { useState, useMemo } from 'react';
import { Lead, LeadStatus } from '@/types/leads';
import { KanbanColumn } from './KanbanColumn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Grid3X3, LayoutList, Search, Filter, Plus } from 'lucide-react';

interface KanbanBoardProps {
  leads: Lead[];
  onLeadUpdate: (lead: Lead) => void;
  onLeadsReorder?: (leads: Lead[]) => void;
  onAddLead: () => void;
}

const PIPELINE_STAGES: LeadStatus[] = [
  'New',
  'Contacted',
  'Design Pending',
  'BOQ Pending',
  'Estimate Sent',
  'Proposal Sent',
  'Negotiation',
  'Approved',
  'Converted',
];

export function KanbanBoard({ leads, onLeadUpdate, onLeadsReorder, onAddLead }: KanbanBoardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Filter leads based on search
  const filteredLeads = useMemo(() => {
    if (!debouncedSearch) return leads;
    return leads.filter(
      (lead) =>
        lead.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        lead.mobile.includes(debouncedSearch) ||
        lead.leadId.toString().includes(debouncedSearch)
    );
  }, [leads, debouncedSearch]);

  // Group leads by status and maintain order
  const leadsByStatus = useMemo(() => {
    const grouped: Record<string, Lead[]> = {};

    PIPELINE_STAGES.forEach((status) => {
      grouped[status] = filteredLeads
        .filter((lead) => lead.status === status)
        .sort((a, b) => {
          // Sort by orderIndex if exists, otherwise by createdDate
          const orderA = (a as Lead & { orderIndex?: number }).orderIndex ?? 0;
          const orderB = (b as Lead & { orderIndex?: number }).orderIndex ?? 0;
          return orderA - orderB;
        });
    });

    return grouped;
  }, [filteredLeads]);

  // Calculate totals for each status
  const statusTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {};

    PIPELINE_STAGES.forEach((status) => {
      const statusLeads = leadsByStatus[status] || [];
      totals[status] = {
        count: statusLeads.length,
        value: statusLeads.reduce((sum, lead) => sum + ((lead as Lead & { value?: number }).value || 0), 0),
      };
    });

    return totals;
  }, [leadsByStatus]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
    setDragOverStatus(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, status?: string, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (status) {
      setDragOverStatus(status);
    }
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverStatus(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: string, dropIndex?: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedLead) {
      return;
    }

    // If dropping in same column, reorder
    if (draggedLead.status === newStatus) {
      // Get all leads in this column
      const columnLeads = leads.filter(l => l.status === newStatus);
      const otherLeads = leads.filter(l => l.status !== newStatus);
      
      // Find and remove the dragged lead
      const draggedIndex = columnLeads.findIndex(l => l.id === draggedLead.id);
      columnLeads.splice(draggedIndex, 1);
      
      // Adjust drop index if needed
      let finalIndex = dropIndex !== undefined ? dropIndex : columnLeads.length;
      
      // If we removed a card before the drop index, decrease the index
      if (draggedIndex < dropIndex!) {
        finalIndex = dropIndex! - 1;
      }
      
      // Ensure index is within bounds
      finalIndex = Math.max(0, Math.min(finalIndex, columnLeads.length));
      
      columnLeads.splice(finalIndex, 0, {
        ...draggedLead,
        updatedAt: new Date(),
      });
      
      // Update all leads in the new order
      const updatedLeads = [...otherLeads, ...columnLeads];
      
      // Use reorder function if available to preserve order
      if (onLeadsReorder) {
        onLeadsReorder(updatedLeads);
      } else {
        // Fallback: update individually (won't preserve order)
        updatedLeads.forEach(lead => onLeadUpdate(lead));
      }
    } else {
      // Moving to different column
      const updatedLead = {
        ...draggedLead,
        status: newStatus as LeadStatus,
        updatedAt: new Date(),
      };

      onLeadUpdate(updatedLead);
    }
    
    setDraggedLead(null);
    setDragOverStatus(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      {/* Kanban Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Pipeline Kanban Board</h2>
          <span className="text-sm text-muted-foreground">
            {filteredLeads.length} total leads
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[250px]"
            />
          </div>

          {/* Filters */}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Add Lead */}
          <Button onClick={onAddLead}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {PIPELINE_STAGES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            leads={leadsByStatus[status] || []}
            count={statusTotals[status]?.count || 0}
            totalValue={statusTotals[status]?.value || 0}
            onDragStart={handleDragStart}
            onDragOver={(e, s, idx) => handleDragOver(e, s, idx)}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onAddLead={status === 'New' ? onAddLead : undefined}
            isDraggingOver={dragOverStatus === status}
            dragOverIndex={dragOverStatus === status ? dragOverIndex : null}
          />
        ))}
      </div>
    </div>
  );
}
