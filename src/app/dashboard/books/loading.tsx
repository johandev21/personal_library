import { BookToolbarSkeleton } from "@/features/books/components/skeletons/BookToolbarSkeleton";
import { Loader2 } from "lucide-react";

export default function BooksDashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BookToolbarSkeleton />
        <section className="flex h-[calc(70vh)] items-center justify-center">
          <Loader2 className="animate-spin size-20 text-primary" />
        </section>
      </div>
    </div>
  );
}
