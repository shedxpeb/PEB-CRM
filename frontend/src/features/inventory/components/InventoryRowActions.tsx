'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { InventoryItem, StockStatus } from '@/features/inventory/types';
import {
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  GitBranch,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  Lock,
  History,
  ShoppingCart,
} from 'lucide-react';

interface InventoryRowActionsProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
  onViewDetails?: (item: InventoryItem) => void;
  onStockIn?: (item: InventoryItem) => void;
  onStockOut?: (item: InventoryItem) => void;
  onTransfer?: (item: InventoryItem) => void;
  onReserve?: (item: InventoryItem) => void;
  onViewHistory?: (item: InventoryItem) => void;
  onCreatePurchaseRequest?: (item: InventoryItem) => void;
  onStatusChange?: (item: InventoryItem, status: StockStatus) => void;
}

export function InventoryRowActions({
  item,
  onEdit,
  onDelete,
  onViewDetails,
  onStockIn,
  onStockOut,
  onTransfer,
  onReserve,
  onViewHistory,
  onCreatePurchaseRequest,
  onStatusChange,
}: InventoryRowActionsProps) {
  const [open, setOpen] = useState(false);

  const handleStatusChange = (status: StockStatus) => {
    onStatusChange?.(item, status);
    setOpen(false);
  };

  const statuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock', 'Critical', 'On Order', 'Discontinued'];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {/* View & Edit */}
        <DropdownMenuItem onClick={() => onViewDetails?.(item)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(item)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Item
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Stock Operations */}
        <DropdownMenuItem onClick={() => onStockIn?.(item)}>
          <ArrowDownToLine className="h-4 w-4 mr-2" />
          Stock In
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onStockOut?.(item)}>
          <ArrowUpFromLine className="h-4 w-4 mr-2" />
          Stock Out
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onTransfer?.(item)}>
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Transfer Stock
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onReserve?.(item)}>
          <Lock className="h-4 w-4 mr-2" />
          Reserve Stock
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onViewHistory?.(item)}>
          <History className="h-4 w-4 mr-2" />
          View Stock History
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onCreatePurchaseRequest?.(item)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Create Purchase Request
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Status */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <GitBranch className="h-4 w-4 mr-2" />
            Change Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
                className={item.status === status ? 'bg-muted' : ''}
              >
                {item.status === status && <CheckCircle className="h-4 w-4 mr-2" />}
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => onDelete(item)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
