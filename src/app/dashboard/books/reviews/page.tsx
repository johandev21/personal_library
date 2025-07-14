import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBookReviews } from "@/features/bookReviews/queries";
import { BookReviewCard } from "@/features/bookReviews/components/ReviewCard";

export default async function BookReviewsPage() {
  const reviews = await getBookReviews();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
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

      {/* Reviews Grid or Empty State */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <BookReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6 border-2 border-dashed rounded-2xl">
          <h3 className="text-2xl font-semibold text-foreground">
            No Reviews Found
          </h3>
          <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
            It looks like you haven't written any reviews yet. Start by adding one for a book you've finished.
          </p>
          <Button asChild>
            <Link href="/dashboard/books/reviews/create">
              <Plus className="mr-2 h-4 w-4" /> Create Your First Review
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}