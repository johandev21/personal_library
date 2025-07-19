import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCreateForm } from "@/features/books/components/forms/BookCreateForm";

export default function CreateBookPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add a New Book</CardTitle>
          <CardDescription>
            Fill out the details below to add a new book to your collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}