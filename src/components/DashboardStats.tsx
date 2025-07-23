import { Book, BookOpenCheck, MessageSquareQuote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookType, BookReview } from "@/generated/prisma/client";
import { useTranslations } from "next-intl";

interface DashboardStatsProps {
  books: BookType[];
  reviews: BookReview[];
}

export function DashboardStats({ books, reviews }: DashboardStatsProps) {

  const t = useTranslations("Dashboard.stats");

  const totalBooks = books.length;
  const wantToReadCount = books.filter(b => b.states === 'want_to_read').length;
  const totalReviews = reviews.length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("total_books.label")}</CardTitle>
          <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBooks}</div>
          <p className="text-xs text-muted-foreground">{t("total_books.description")}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("to_read.label")}</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{wantToReadCount}</div>
          <p className="text-xs text-muted-foreground">{t("to_read.description")}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("total_reviews.label")}</CardTitle>
          <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReviews}</div>
          <p className="text-xs text-muted-foreground">{t("total_reviews.description")}</p>
        </CardContent>
      </Card>
    </div>
  );
}