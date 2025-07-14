import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ReviewDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* 1. Header & Actions Bar Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-[180px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* 2. Book Information Header Skeleton */}
      <header className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card border rounded-lg">
        {/* Image Skeleton */}
        <Skeleton className="rounded-md aspect-[2/3] w-full sm:w-[150px] flex-shrink-0" />
        
        {/* Text Skeleton */}
        <div className="pt-2 w-full space-y-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </header>

      <Separator className="my-8" />

      {/* 3. Review Content Skeleton */}
      <div className="space-y-4">
        {/* Review Title Skeleton */}
        <Skeleton className="h-9 w-2/3" />

        {/* Review Body (prose) Skeleton */}
        <div className="space-y-3 pt-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>

      {/* 4. Metadata Footer Skeleton */}
      <div className="mt-12 pt-6 border-t flex justify-between">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </main>
  );
}