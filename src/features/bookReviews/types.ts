
import { Book, BookReview } from "@/generated/prisma/client";

export type ReviewWithBook = BookReview & {
  book: Book;
};