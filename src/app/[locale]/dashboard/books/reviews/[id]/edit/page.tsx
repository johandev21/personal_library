import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReviewById } from "@/features/bookReviews/queries";
import { BookReviewEditForm } from "@/features/bookReviews/components/BookReviewEditForm";
import { getTranslations } from "next-intl/server";

export default async function EditReviewPage({
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
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("edit_page_title")}</CardTitle>
          <CardDescription>{t("edit_page_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookReviewEditForm review={review} />
        </CardContent>
      </Card>
    </div>
  );
}
