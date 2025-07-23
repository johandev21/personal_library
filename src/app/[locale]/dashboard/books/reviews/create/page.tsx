import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewFormContainer } from "@/features/bookReviews/components/ReviewFormContainer";
import { CreateReviewFormSkeleton } from "@/features/bookReviews/components/skeletons/CreateReviewFormSkeleton";
import { getTranslations } from "next-intl/server"; 

export default async function CreateReviewPage() {
  const t = await getTranslations("Reviews");

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("page_title")}</CardTitle>
          <CardDescription>{t("page_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<CreateReviewFormSkeleton />}>
            <ReviewFormContainer />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}