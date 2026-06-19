'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KPICard as KPICardType } from '@/types';
import { componentTextSizes } from '@/lib/design-system';

interface KPICardProps {
  data: KPICardType;
  onClick?: () => void;
  showComparison?: boolean;
}

export function KPICard({ data, onClick, showComparison = false }: KPICardProps) {
  const isPositive = data.change >= 0;
  const color = data.color || (isPositive ? 'text-green-600' : 'text-red-600');

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'cursor-pointer hover:shadow-md transition-shadow',
          onClick && 'hover:border-blue-300'
        )}
        onClick={onClick}
      >
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={cn(componentTextSizes.kpiCard.label, 'font-medium text-muted-foreground')}>{data.title}</p>
              <p className={cn(componentTextSizes.kpiCard.value, 'font-bold mt-0.5')}>{data.value}</p>
              
              {/* Change Percentage */}
              {data.change !== 0 && (
                <div className="flex items-center gap-1 mt-1">
                  {isPositive ? (
                    <ArrowUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={cn(componentTextSizes.kpiCard.change, 'font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
                    {Math.abs(data.change)}%
                  </span>
                  {showComparison && data.comparisonLabel && (
                    <span className={cn(componentTextSizes.kpiCard.change, 'text-muted-foreground')}>
                      {data.comparisonLabel}
                    </span>
                  )}
                </div>
              )}

              {/* Previous Value for Comparison */}
              {showComparison && data.previousValue !== undefined && (
                <p className={cn(componentTextSizes.kpiCard.change, 'text-muted-foreground mt-0.5')}>
                  Prev: {data.previousValue}
                </p>
              )}
            </div>
            
            <div className={cn('h-7 w-7 sm:h-8 sm:w-8 rounded-md flex items-center justify-center flex-shrink-0 ml-2', data.color?.replace('text-', 'bg-') + '/15')}>
              <div className={cn('h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center', color)}>
                <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex items-center justify-center">
                  {data.icon}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
