// features/books/components/BookDetailSkeleton.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with Back and Action Buttons */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-32 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-8 w-64 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {/* Cover Image */}
          <div className="relative w-full rounded aspect-[1/1.6] bg-muted">
            <Skeleton className="w-full h-full rounded" />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Author */}
            <div>
              <Skeleton className="h-4 w-20 mb-1 rounded" />
              <Skeleton className="h-6 w-48 rounded" />
            </div>

            {/* Rating */}
            <div>
              <Skeleton className="h-4 w-20 mb-1 rounded" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded" />
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-1 rounded" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-1 rounded" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}