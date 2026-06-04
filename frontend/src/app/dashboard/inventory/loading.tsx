import { Card, CardContent } from '@/components/ui/card';

export default function InventoryLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* KPI Cards skeleton - 10 cards for inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table skeleton */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 space-y-4">
            {/* Search and filters skeleton */}
            <div className="flex gap-3">
              <div className="h-10 flex-1 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-100 rounded animate-pulse" />
            </div>

            {/* Table rows skeleton */}
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
