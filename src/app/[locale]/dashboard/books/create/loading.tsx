import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookFormSkeleton } from "@/features/books/components/skeletons/BookFormSkeleton";

export default function CreateBookLoading() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <BookFormSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}