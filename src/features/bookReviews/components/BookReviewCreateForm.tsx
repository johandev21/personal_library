"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface BookReviewCreateFormProps {
  reviewableBooks: Book[];
}

export function BookReviewCreateForm({
  reviewableBooks,
}: BookReviewCreateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Reviews");

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
        toast.success(t("review_created_success_toast"));
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
              <FormLabel>{t("book_select_label")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("book_select_placeholder")} />
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
                {t("review_description_read")}
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
              <FormLabel>{t("review_title_label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("review_title_placeholder")}
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
              <FormLabel>{t("review_content_label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("review_content_placeholder")}
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
            {t("cancel_button")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("submitting_button") : t("submit_review_button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}