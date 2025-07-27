import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>

      <header className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card border rounded-lg">
        <Skeleton className="rounded-md object-cover w-[150px] h-[225px] md:h-auto md:aspect-[1/1.6] mx-auto md:mx-0 shadow-lg flex-shrink-0" />

        <div className="pt-2 w-full space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </header>

      <Skeleton className="h-[1px] w-full my-8" />

      <div className="space-y-4">
        <Skeleton className="h-9 w-2/3" />

        <div className="space-y-3 pt-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </main>
  );
}
