import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

export default function EditReviewLoading() {
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
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground">
                You are editing your review for:
              </p>
              <Skeleton className="h-6 w-3/4 mt-1" />
            </div>

            <div className="space-y-6">
              <FormItem>
                <Label>Review Title</Label>
                <Input placeholder="A Masterpiece of Modern Fiction" disabled />
              </FormItem>

              <FormItem>
                <Label>Review Content</Label>
                <Textarea
                  placeholder="Write your thoughts on the book..."
                  className="min-h-[200px]"
                  disabled
                />
              </FormItem>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" disabled>
                Cancel
              </Button>
              <Button type="submit" disabled>
                Update Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
