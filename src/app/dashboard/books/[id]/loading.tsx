import { ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" disabled>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="relative w-full rounded">
            <Skeleton className="object-cover rounded w-[200px] h-[305px] mx-auto md:h-auto md:aspect-[1/1.6] md:w-full md:mx-0" />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Author</p>
              <Skeleton className="h-6 w-1/2 mt-1" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <Skeleton className="h-6 w-2/3 mt-1" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
