import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBookReviews } from "@/features/bookReviews/queries";
import { BookReviewCard } from "./ReviewCard";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ListReviews() {
  const reviews = await getBookReviews();
  const t = await getTranslations("Reviews");

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-6 border-2 border-dashed rounded-2xl">
        <h3 className="text-2xl font-semibold text-foreground">
          {t("no_reviews_found")}
        </h3>
        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
          {t("no_reviews_found_description")}
        </p>
        <Button asChild>
          <Link href="/dashboard/books/reviews/create">
            <Plus className="mr-2 h-4 w-4" /> {t("create_first_review_button")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {reviews.map((review) => (
        <BookReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
