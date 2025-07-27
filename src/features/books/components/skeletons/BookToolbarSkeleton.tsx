import { Skeleton } from "@/components/ui/skeleton";

export function BookToolbarSkeleton() {
  return (
    <section aria-labelledby="book-filters-title">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <Skeleton className="h-8 w-full rounded-lg md:w-[200px] lg:w-[320px]" />

          <div className="flex gap-2 items-center flex-wrap">
            <Skeleton className="h-8 w-[180px]" />

            <Skeleton className="h-8 w-28" />

            <div className="flex items-center">
              <Skeleton className="h-8 w-10 rounded-r-none" />
              <Skeleton className="h-8 w-10 rounded-l-none" />
            </div>
          </div>
        </div>

        <Skeleton className="h-10 w-[140px]" />
      </div>
    </section>
  );
}