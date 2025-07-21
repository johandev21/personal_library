"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { reviewCreateSchema, ReviewCreateData } from "../schemas";
import { createReview } from "../actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Book } from "@/generated/prisma/client";

interface BookReviewCreateFormProps {
  reviewableBooks: Book[];
}

export function BookReviewCreateForm({
  reviewableBooks,
}: BookReviewCreateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ReviewCreateData>({
    resolver: zodResolver(reviewCreateSchema),
    defaultValues: {
      title: "",
      content: "",
      bookId: "",
    },
  });

  async function onSubmit(data: ReviewCreateData) {
    startTransition(async () => {
      const result = await createReview(data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Review created successfully!");
        router.push("/dashboard/books/reviews");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Book Selection Field */}
        <FormField
          control={form.control}
          name="bookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book to Review</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book you've finished..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {reviewableBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can only review books you've marked as "Read".
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="A Masterpiece of Modern Fiction"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your thoughts on the book..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
