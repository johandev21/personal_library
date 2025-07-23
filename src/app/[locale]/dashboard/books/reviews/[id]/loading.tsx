import { ArrowLeft, Edit } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ReviewDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Reviews
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" disabled>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <header className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card border rounded-lg">
        <Skeleton className="rounded-md object-cover w-[150px] h-[225px] md:h-auto md:aspect-[1/1.6] mx-auto md:mx-0 shadow-lg" />

        <div className="pt-2 w-full space-y-3">
          <p className="text-sm font-medium text-primary">Review for:</p>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </header>

      <Separator className="my-8" />

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
