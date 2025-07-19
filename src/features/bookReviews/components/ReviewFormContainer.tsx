import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookReviewCreateForm } from "./BookReviewCreateForm";
import { getReviewableBooks } from "../actions";

export async function ReviewFormContainer() {
  const reviewableBooks = await getReviewableBooks();

  if (reviewableBooks.length > 0) {
    return <BookReviewCreateForm reviewableBooks={reviewableBooks} />;
  }

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold">No Books to Review</h3>
      <p className="text-muted-foreground mt-2 mb-4">
        You've reviewed all your finished books, or you need to mark a book as "Read" first.
      </p>
      <Button asChild>
        <Link href="/dashboard/books">Go to My Books</Link>
      </Button>
    </div>
  );
}