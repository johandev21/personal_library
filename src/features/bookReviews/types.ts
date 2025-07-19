
import { Book, BookReview } from "@prisma/client";

export type ReviewWithBook = BookReview & {
  book: Book;
};