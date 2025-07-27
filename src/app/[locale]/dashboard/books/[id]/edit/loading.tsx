import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookFormSkeleton } from "@/features/books/components/skeletons/BookFormSkeleton";

export default function EditBookLoading() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-3/4 pt-2" />
        </CardHeader>
        <CardContent>
          <BookFormSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}