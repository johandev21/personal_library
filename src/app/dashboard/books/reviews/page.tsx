import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ReviewsListSkeleton } from "@/features/bookReviews/components/skeletons/ReviewsListSkeleton";
import { ListReviews } from "@/features/bookReviews/components/ListReviews";

export default function BookReviewsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Book Reviews
          </h1>
          <p className="text-muted-foreground">
            A collection of your thoughts on the books you've read.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/books/reviews/create">
            <Plus className="mr-2 h-4 w-4" /> Create Review
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ReviewsListSkeleton />}>
        <ListReviews />
      </Suspense>
    </div>
  );
}