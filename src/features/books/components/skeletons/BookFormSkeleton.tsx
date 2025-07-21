import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function BookFormSkeleton() {
  return (
    <div className="space-y-8">
      {/* Section 1: Basic Info */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Field Skeleton */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="The Way of Kings" disabled />
          </div>
          {/* Author Field Skeleton */}
          <div className="space-y-2">
            <Label>Author</Label>
            <Input placeholder="Brandon Sanderson" disabled />
          </div>
        </div>
        {/* Cover Field Skeleton */}
        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input placeholder="https://example.com/cover.jpg" disabled />
          <p className="text-[0.8rem] text-muted-foreground">
            Paste the full URL to the book's cover image.
          </p>
        </div>
      </div>

      <Separator />

      {/* Section 2: Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Field Skeleton */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select the book's status" />
            </SelectTrigger>
          </Select>
        </div>
        {/* Rating Field Skeleton */}
        <div className="space-y-2">
          <Label>Rating</Label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Rate this book (1-5)" />
            </SelectTrigger>
          </Select>
          <p className="text-[0.8rem] text-muted-foreground">
            You can only rate books you've finished.
          </p>
        </div>
      </div>

      <Separator />

      {/* Section 3: Tags Field Skeleton */}
      <div className="space-y-2">
        <Label>Tags</Label>
        {/* We mimic the visual structure of the BookTagsInput component */}
        <div className="flex gap-2">
          <Input placeholder="Add a tag and press Enter..." disabled />
          <Button type="button" variant="outline" disabled>
            Add
          </Button>
        </div>
        <p className="text-[0.8rem] text-muted-foreground">
          Categorize your book with tags like "Fantasy", "Sci-Fi", etc.
        </p>
      </div>

      {/* Section 4: Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" disabled>
          Cancel
        </Button>
        <Button type="submit" disabled>
          {/* We can hardcode one of the button texts, e.g., "Save Book" */}
          Save Book
        </Button>
      </div>
    </div>
  );
}