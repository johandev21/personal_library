import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CreateReviewFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="book-select-skeleton">Book to Review</Label>
        <Select disabled>
          <SelectTrigger id="book-select-skeleton">
            <SelectValue placeholder="Select a book you've finished..." />
          </SelectTrigger>
        </Select>
        <p className="text-sm text-muted-foreground">
          You can only review books you've marked as "Read".
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title-skeleton">Review Title</Label>
        <Input
          id="title-skeleton"
          placeholder="A Masterpiece of Modern Fiction"
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-skeleton">Review Content</Label>
        <Textarea
          id="content-skeleton"
          placeholder="Write your thoughts on the book..."
          className="min-h-[150px]"
          disabled
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" disabled>
          Cancel
        </Button>
        <Button type="submit" disabled>
          Submit Review
        </Button>
      </div>
    </div>
  );
}
