import Image from "next/image";
import { headers } from "next/headers";
import { ArrowRight, BookPlus, MessageSquarePlus } from "lucide-react";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBooks } from "@/features/books/queries";
import { getBookReviews } from "@/features/bookReviews/queries";
import { DashboardStats } from "@/components/DashboardStats";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user?.name?.split(" ")[0] || "Reader";

  const [books, reviews] = await Promise.all([getBooks(), getBookReviews()]);

  const currentlyReading = books
    .filter((book) => book.states === "reading")
    .slice(0, 5);
  const recentReviews = reviews.slice(0, 5);

  const t = await getTranslations("Dashboard");

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("greeting", { username: userName })}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/dashboard/books/create">
              <BookPlus className="mr-2 h-4 w-4" /> {t("buttons.add_book")}
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard/books/reviews/create">
              <MessageSquarePlus className="mr-2 h-4 w-4" />{" "}
              {t("buttons.write_review")}
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section>
        <DashboardStats books={books} reviews={reviews} />
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t("currently_reading.title")}</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/books">
                {t("currently_reading.view_all")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {currentlyReading.length > 0 ? (
              <div className="space-y-4">
                {currentlyReading.map((book) => (
                  <Link
                    href={`/dashboard/books/${book.id}`}
                    key={book.id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/50 min-w-0"
                  >
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      width={40}
                      height={60}
                      className="rounded-md aspect-[2/3] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{book.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {book.author}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t("no_books_currently_reading")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* "Recent Reviews" Card */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t("recent_reviews.title")}</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/books/reviews">
                {t("recent_reviews.view_all")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentReviews.length > 0 ? (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <Link
                    href={`/dashboard/books/reviews/${review.id}`}
                    key={review.id}
                    className="flex flex-col p-2 rounded-lg hover:bg-accent/50 min-w-0"
                  >
                    <p className="font-semibold truncate">{review.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      For “{review.book.title}”
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t("no_reviews_written")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
