import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getReviewById } from "@/features/bookReviews/queries";
import { formatDateTime } from "@/lib/utils";

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
 
  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button asChild variant="outline">
          <Link href="/dashboard/books/reviews">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Reviews
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href={`/dashboard/books/reviews/${review.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
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
          <p className="text-sm font-medium text-primary">Review for:</p>
          <h1 className="text-4xl font-extrabold tracking-tight mt-1">
            {review.book.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            by {review.book.author}
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
          <strong>Created:</strong>{" "}
          {formatDateTime(review.createdAt)}
        </span>
        <span>
          <strong>Last Updated:</strong>{" "}
          {formatDateTime(review.updatedAt)}
        </span>
      </div>
    </main>
  );
}
