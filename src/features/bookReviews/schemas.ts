import { z } from "zod";

export const getReviewCreateSchema = (t: (key: string) => string) => {
  return z.object({
    title: z.string().min(3, {
      message: t("title_min"),
    }),
    content: z.string().min(10, {
      message: t("content_min"),
    }),
    bookId: z.cuid({ message: t("book_id_invalid") }),
  });
};

export const getReviewUpdateSchema = (t: (key: string) => string) => {
  return z.object({
    title: z.string().min(3, { message: t("title_min") }),
    content: z.string().min(10, { message: t("content_min") }),
  });
};

const baseCreateSchema = getReviewCreateSchema(() => "");
export type ReviewCreateData = z.infer<typeof baseCreateSchema>;

const baseUpdateSchema = getReviewUpdateSchema(() => "");
export type ReviewUpdateData = z.infer<typeof baseUpdateSchema>;

export const reviewCreateSchema = getReviewCreateSchema;
export const reviewUpdateSchema = getReviewUpdateSchema;