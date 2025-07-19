import { BookCheck, BookMarked, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/generated/prisma/client";
import { Suspense } from "react";

interface BookStatsProps {
  books: Book[];
}

export function BookStats({ books }: BookStatsProps) {
    const totalRead = books.filter(book => book.states === 'read').length;
    
    const ratedBooks = books.filter(book => book.states === 'read' && book.rating !== null);
    const averageRating = ratedBooks.length > 0
        ? parseFloat((ratedBooks.reduce((acc, book) => acc + (book.rating || 0), 0) / ratedBooks.length).toFixed(1))
        : 0;
    
    const wantToRead = books.filter(b => b.states === 'want_to_read').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Books Read</CardTitle>
          <BookCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Suspense fallback=" ">
              {totalRead}
            </Suspense>
            </div>
          <p className="text-xs text-muted-foreground">
            Across your entire collection
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating || "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            For all books you've rated
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Want to Read</CardTitle>
          <BookMarked className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{wantToRead}</div>
          <p className="text-xs text-muted-foreground">Books on your reading list</p>
        </CardContent>
      </Card>
    </div>
  );
}