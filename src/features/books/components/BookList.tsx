import { Book } from "@/generated/prisma/client";
import { BookCard } from "./BookCard";
import { BookListItem } from "./BookListItem";

interface BookListProps {
  books: Book[];
  view: "grid" | "list";
}

export function BookList({ books, view }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h3 className="text-2xl font-semibold tracking-tight">
          No Books Found
        </h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="grid lg:grid-cols-2 gap-3">
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid justify-between grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
