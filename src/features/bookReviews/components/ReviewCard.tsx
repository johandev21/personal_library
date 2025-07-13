import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/features/books/components/StarRating";
import { ReviewWithBook } from "../types";

interface ReviewCardProps {
  review: ReviewWithBook;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
        {/* Book Cover */}
        <Link href={`/dashboard/books/${review.book.id}`} className="flex-shrink-0">
          <Image
            src={review.book.cover || "/placeholder.svg"}
            alt={`${review.book.title} cover`}
            width={128}
            height={192}
            className="rounded-md object-cover aspect-[2/3] w-32 shadow-lg"
          />
        </Link>

        <div className="flex flex-col flex-grow">
          <div className="mb-3">
            <Link href={`/dashboard/books/${review.book.id}`}>
              <h3 className="text-xl font-bold hover:underline">{review.book.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">by {review.book.author}</p>
            <StarRating rating={review.book.rating} className="mt-2" />
          </div>

          <article className="prose prose-sm dark:prose-invert max-w-none line-clamp-4">
            {review.content}
          </article>
          
          <div className="mt-4 pt-4 border-t border-border/40 text-right">
            <p className="text-xs text-muted-foreground">
              Reviewed {formatDistanceToNow(new Date(review.updatedAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}