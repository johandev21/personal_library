import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/features/auth/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookReviewCreateForm } from "@/features/bookReviews/components/BookReviewCreateForm";

async function getReviewableBooks() {
  const userId = await getAuthenticatedUserId();

  const readBooks = await prisma.book.findMany({
    where: { userId, states: 'read' },
  });

  const existingReviews = await prisma.bookReview.findMany({
    where: { userId },
    select: { bookId: true },
  });

  const reviewedBookIds = new Set(existingReviews.map(review => review.bookId));

  const reviewableBooks = readBooks.filter(book => !reviewedBookIds.has(book.id));

  return reviewableBooks;
}

export default async function CreateReviewPage() {
  const reviewableBooks = await getReviewableBooks();

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Review</CardTitle>
          <CardDescription>
            Share your thoughts on a book you've recently finished.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviewableBooks.length > 0 ? (
            // If there are books to review, show the form.
            <BookReviewCreateForm reviewableBooks={reviewableBooks} />
          ) : (
            // Otherwise, show a helpful empty state.
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No Books to Review</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You've reviewed all your finished books, or you need to mark a book as "Read" first.
              </p>
              <Button asChild>
                <Link href="/dashboard/books">Go to My Books</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}