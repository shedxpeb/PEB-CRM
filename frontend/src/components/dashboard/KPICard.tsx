'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { KPICard as KPICardType } from '@/types';

interface KPICardProps {
  data: KPICardType;
  onClick?: () => void;
}

export function KPICard({ data, onClick }: KPICardProps) {
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
          'cursor-pointer hover:shadow-lg transition-shadow duration-200',
          onClick && 'hover:border-blue-300'
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{data.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{data.value}</p>
              <Badge 
                variant={isPositive ? 'success' : 'destructive'}
                className="text-xs"
              >
                {isPositive ? '+' : ''}{data.change}%
              </Badge>
            </div>
            <div className={cn('p-3 rounded-lg bg-gray-100', data.color && `bg-opacity-10`)}>
              {/* Icon placeholder - will be replaced with Lucide icons */}
              <div className={cn('h-6 w-6', color)}>
                {data.icon}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
