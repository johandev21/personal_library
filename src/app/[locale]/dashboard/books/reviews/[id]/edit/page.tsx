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

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Your Review</CardTitle>
          <CardDescription>
            Make changes to your review below and save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookReviewEditForm review={review} />
        </CardContent>
      </Card>
    </div>
  );
}
