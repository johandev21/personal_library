import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BookStatsSkeleton } from "@/features/books/components/skeletons/BookStatsSkeleton";
import { BookListItemSkeleton } from "@/features/books/components/skeletons/BookListItemSkeleton";

export default function BooksDashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <BookStatsSkeleton />
      </section>

      <Separator />

      <div className="flex flex-col gap-4">
        <section>
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <Skeleton className="h-10 w-[140px]" />
          </div>
        </section>

        <section>
          <div className="grid lg:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BookListItemSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}