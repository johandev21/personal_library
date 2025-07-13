import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBookReviews } from "@/features/bookReviews/queries";
import { ReviewCard } from "@/features/bookReviews/components/ReviewCard";

export default async function BookReviewsPage() {
  const reviews = await getBookReviews();

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-8">
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            My Book Reviews
          </CardTitle>
          <CardDescription>
            A collection of your thoughts on the books you've read.
          </CardDescription>
        </CardHeader>
      </Card>
      
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
          <h3 className="text-2xl font-semibold">No Reviews Yet</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            When you finish a book, you can add a review to see it here.
          </p>
          <Button asChild>
            <Link href="/dashboard/books">Go to My Books</Link>
          </Button>
        </div>
      )}
    </div>
  );
}