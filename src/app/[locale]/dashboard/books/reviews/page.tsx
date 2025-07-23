import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ReviewsListSkeleton } from "@/features/bookReviews/components/skeletons/ReviewsListSkeleton";
import { ListReviews } from "@/features/bookReviews/components/ListReviews";
import { getTranslations } from "next-intl/server";

export default async function BookReviewsPage() {
  const t = await getTranslations("Reviews");

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div className="space-y-1">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">
            {t("page_title")}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t("page_description")}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/books/reviews/create">
            <Plus className="mr-2 h-4 w-4" /> {t("create_review_button")}
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ReviewsListSkeleton />}>
        <ListReviews />
      </Suspense>
    </div>
  );
}
