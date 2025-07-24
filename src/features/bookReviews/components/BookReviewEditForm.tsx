"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { reviewUpdateSchema, ReviewUpdateData } from "../schemas";
import { updateReview } from "../actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Book } from "@/generated/prisma/client";
import { useTranslations } from "next-intl";

interface BookReviewEditFormProps {
  review: {
    id: string;
    title: string;
    content: string;
    book: Book;
  };
}

export function BookReviewEditForm({ review }: BookReviewEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Reviews");

  const form = useForm<ReviewUpdateData>({
    resolver: zodResolver(reviewUpdateSchema),
    defaultValues: {
      title: review.title,
      content: review.content,
    },
  });

  async function onSubmit(data: ReviewUpdateData) {
    startTransition(async () => {
      const result = await updateReview(review.id, data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t("review_updated_success_toast"));
        router.push("/dashboard/books/reviews");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm font-medium text-muted-foreground">
          {t("editing_review_for_label")}
        </p>
        <p className="text-lg font-semibold">{review.book.title}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("review_title_label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("review_title_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("review_content_label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("review_content_placeholder")}
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
              {t("cancel_button")}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? t("updating_button") : t("update_review_button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}