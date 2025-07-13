import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookById } from "@/features/books/queries";
import { BookEditForm } from "@/features/books/components/BookEditForm";

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
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