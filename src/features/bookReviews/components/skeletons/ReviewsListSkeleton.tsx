import { ReviewCardSkeleton } from "./ReviewCardSkeleton";

export function ReviewsListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  );
}