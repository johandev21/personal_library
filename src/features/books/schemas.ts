import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  cover: z
    .url({ message: "Please enter a valid image URL." })
    .optional()
    .or(z.literal("")),
  states: z.enum(["reading", "want_to_read", "read"]),
  rating: z.coerce.number().min(1).max(5).optional().nullable(),
  tags: z.array(z.string().min(1)).optional(),
});

export type BookCreateData = z.infer<typeof bookCreateSchema>;
export const bookUpdateSchema = bookCreateSchema;
export type BookUpdateData = z.infer<typeof bookUpdateSchema>;