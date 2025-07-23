import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookById } from "@/features/books/queries";
import { BookEditForm } from "@/features/books/components/forms/BookEditForm";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Book</CardTitle>
          <CardDescription>
            Update the details for "{book.title}" below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookEditForm book={book} />
        </CardContent>
      </Card>
    </div>
  );
}
