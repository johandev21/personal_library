import { z } from "zod";

export const getBookSchema = (t: (key: string) => string) => {
  return z.object({
    title: z.string().min(2, {
      message: t("title_min"),
    }),
    author: z.string().min(2, {
      message: t("author_min"),
    }),
    cover: z
      .url({ message: t("cover_url_invalid"), protocol: /^https$/ })
      .optional()
      .or(z.literal("")),
    states: z.enum(["reading", "want_to_read", "read"]),
    rating: z.coerce
      .number()
      .min(1, { message: t("rating_min") })
      .max(5, { message: t("rating_max") })
      .optional()
      .nullable(),
    tags: z.array(z.string().min(1)).optional(),
  });
};

const baseSchema = getBookSchema(() => "");
export type BookData = z.infer<typeof baseSchema>;

export const bookCreateSchema = getBookSchema;
export const bookUpdateSchema = getBookSchema;
export type BookCreateData = BookData;
export type BookUpdateData = BookData;
