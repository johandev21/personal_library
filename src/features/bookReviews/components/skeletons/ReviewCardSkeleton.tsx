import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md dark:bg-card">
      <Skeleton className="object-contain aspect-[3/4] h-[325px] mx-auto" />

      <div className="flex flex-col flex-grow p-4 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="space-y-2 flex-grow">
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      <CardFooter className="p-4 pt-0 border-t mt-auto flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  );
}
