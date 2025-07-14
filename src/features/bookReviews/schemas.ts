import { z } from "zod";

export const reviewSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  content: z.string().min(10, {
    message: "Review content must be at least 10 characters.",
  }),
  bookId: z.cuid({ message: "Invalid book ID." }),
});

export const reviewCreateSchema = reviewSchema;
export type ReviewCreateData = z.infer<typeof reviewCreateSchema>;

export const reviewUpdateSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Review content must be at least 10 characters." }),
});
export type ReviewUpdateData = z.infer<typeof reviewUpdateSchema>;
