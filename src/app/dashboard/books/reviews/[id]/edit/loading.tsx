import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewFormSkeleton } from "@/features/bookReviews/components/skeletons/ReviewFormSkeleton";

export default function EditReviewLoading() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent>
          <ReviewFormSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}