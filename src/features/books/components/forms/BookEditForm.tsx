"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { BookUpdateData, bookUpdateSchema } from "../../schemas";
import { updateBook } from "../../actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookTagsInput } from "../BookTagsInput";
import { Book } from "@/generated/prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface BookEditFormProps {
  book: Book;
}

export function BookEditForm({ book }: BookEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Books.form");

  const form = useForm({
    resolver: zodResolver(bookUpdateSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      cover: book.cover ?? "",
      states: book.states,
      rating: book.rating ?? null,
      tags: book.tags ?? [],
    },
  });

  async function onSubmit(data: BookUpdateData) {
    startTransition(async () => {
      const result = await updateBook(book.id, data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t("success_toast_update"));
        router.push("/dashboard/books");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title_label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("title_placeholder")}
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("author_label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("author_placeholder")}
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cover_label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("cover_placeholder")}
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormDescription>
                  {t("cover_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="states"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("status_label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("status_placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="want_to_read">{t("status_want_to_read")}</SelectItem>
                    <SelectItem value="reading">{t("status_reading")}</SelectItem>
                    <SelectItem value="read">{t("status_read")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("rating_label")}</FormLabel>
                <Select
                  value={field.value == null ? "none" : String(field.value)}
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? null : Number(value))
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("rating_placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t("rating_none")}</SelectItem>
                    <SelectItem value="1">{t("rating_horrible")}</SelectItem>
                    <SelectItem value="2">{t("rating_bad")}</SelectItem>
                    <SelectItem value="3">{t("rating_okay")}</SelectItem>
                    <SelectItem value="4">{t("rating_good")}</SelectItem>
                    <SelectItem value="5">{t("rating_excellent")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t("rating_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("tags_label")}</FormLabel>
              <FormControl>
                <BookTagsInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                {t("tags_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            {t("cancel_button")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("updating_button") : t("update_book_button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}