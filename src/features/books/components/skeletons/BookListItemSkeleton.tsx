import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookListItemSkeleton() {
  return (
    <Card className="w-full grid grid-cols-5 items-center p-3 gap-4">
      <Skeleton className="aspect-[2/3] w-16 rounded-md col-auto" />

      <div className="flex flex-col items-start gap-3 col-span-2">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-4" />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 ml-auto pl-4 col-span-2">
        <Skeleton className="h-6 w-24 rounded-full hidden lg:inline-flex" />
        <Skeleton className="h-8 w-8" />
      </div>
    </Card>
  );
}