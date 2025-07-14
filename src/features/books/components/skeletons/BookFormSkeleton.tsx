import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function BookFormSkeleton() {
  return (
    // Mimics the `space-y-8` from the form
    <div className="space-y-8">
      {/* Section 1: Title, Author, Cover */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Author Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        {/* Cover Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <Separator />

      {/* Section 2: Status and Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        {/* Rating Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <Separator />

      {/* Section 3: Tags Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        {/* Mimics the input + button for tags */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Section 4: Buttons Skeleton */}
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}