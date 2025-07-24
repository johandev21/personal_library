import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getReviewById } from "@/features/bookReviews/queries";
import { formatDateTime } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getReviewById(id);

  if (!review) {
    notFound();
  }

  const t = await getTranslations("Reviews");

  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button asChild variant="outline">
          <Link href="/dashboard/books/reviews">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back_to_all_reviews_button")}
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href={`/dashboard/books/reviews/${review.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              {t("edit_button")}
            </Link>
          </Button>
        </div>
      </div>

      <header className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card border rounded-lg">
        <Image
          src={review.book.cover || "/placeholder.svg"}
          alt={`${review.book.title} cover`}
          width={150}
          height={225}
          className="rounded-md object-cover md:aspect-[1/1.6] mx-auto md:mx-0 shadow-lg"
        />
        <div className="pt-2">
          <p className="text-sm font-medium text-primary">
            {t("review_for_label")}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight mt-1">
            {review.book.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t("by_author", { author: review.book.author })}
          </p>
        </div>
      </header>

      <Separator className="my-8" />

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{review.title}</h2>
        <article className="whitespace-pre-wrap max-w-none">
          {review.content}
        </article>
      </div>

      <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex justify-between">
        <span>
          <strong>
            {t("created_at_details", {
              date: formatDateTime(review.createdAt),
            })}
          </strong>
        </span>
        <span>
          <strong>
            {t("last_updated_at_details", {
              date: formatDateTime(review.updatedAt),
            })}
          </strong>
        </span>
      </div>
    </main>
  );
}
