import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBookReviews } from "@/features/bookReviews/queries";
import { BookReviewCard } from "./ReviewCard";

export async function ListReviews() {
  const reviews = await getBookReviews();

  if (reviews.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <BookReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}