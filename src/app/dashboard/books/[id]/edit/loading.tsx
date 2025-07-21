import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookFormSkeleton } from "@/features/books/components/skeletons/BookFormSkeleton";

export default function EditBookLoading() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Book</CardTitle>
          <CardDescription>Update the details for "" below.</CardDescription>
        </CardHeader>
        <CardContent>
          <BookFormSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
