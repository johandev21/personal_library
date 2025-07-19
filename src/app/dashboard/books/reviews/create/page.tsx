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

export default function CreateReviewPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Review</CardTitle>
          <CardDescription>
            Share your thoughts on a book you've recently finished.
          </CardDescription>
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
