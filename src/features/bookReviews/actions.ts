"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/features/auth/actions";
import {
  reviewCreateSchema,
  ReviewCreateData,
  reviewUpdateSchema,
  ReviewUpdateData,
} from "./schemas";

export async function getReviewableBooks() {
  const userId = await getAuthenticatedUserId();

  const [readBooks, existingReviews] = await Promise.all([
    prisma.book.findMany({
      where: { userId, states: "read" },
    }),
    prisma.bookReview.findMany({
      where: { userId },
      select: { bookId: true },
    }),
  ]);

  const reviewedBookIds = new Set(
    existingReviews.map((review) => review.bookId)
  );

  const reviewableBooks = readBooks.filter(
    (book) => !reviewedBookIds.has(book.id)
  );

  return reviewableBooks;
}

export async function createReview(values: ReviewCreateData) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    if (error instanceof Error)
      return { error: `Authentication Error: ${error.message}` };
    return { error: "An unknown authentication error occurred." };
  }

  const validatedFields = reviewCreateSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields." };
  }

  const { bookId, title, content } = validatedFields.data;

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId, userId },
    });
    if (!book) {
      return {
        error: "Book not found or you don't have permission to review it.",
      };
    }

    const existingReview = await prisma.bookReview.findUnique({
      where: { bookId },
    });
    if (existingReview) {
      return { error: "You have already submitted a review for this book." };
    }

    await prisma.bookReview.create({
      data: {
        title,
        content,
        bookId,
        userId,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Database Error: Failed to create the review." };
  }

  revalidatePath("/dashboard/books/reviews");
  revalidatePath(`/dashboard/books/${bookId}`);
  return { success: true };
}

export async function updateReview(id: string, values: ReviewUpdateData) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: "Authentication Error: User not found." };
  }

  const review = await prisma.bookReview.findUnique({ where: { id, userId } });
  if (!review) {
    return {
      error: "Review not found or you don't have permission to edit it.",
    };
  }

  const validatedFields = reviewUpdateSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    await prisma.bookReview.update({
      where: { id: id },
      data: validatedFields.data,
    });
  } catch (error) {
    return { error: "Database Error: Failed to update review." };
  }

  revalidatePath(`/dashboard/books/reviews`);
  revalidatePath(`/dashboard/books/reviews/${id}/edit`);
  return { success: true };
}

export async function deleteReview(id: string) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: "Authentication Error: User not found." };
  }

  const review = await prisma.bookReview.findUnique({ where: { id, userId } });
  if (!review) {
    return {
      error: "Review not found or you don't have permission to delete it.",
    };
  }

  try {
    await prisma.bookReview.delete({ where: { id: id } });
  } catch (error) {
    return { error: "Database Error: Failed to delete review." };
  }

  revalidatePath(`/dashboard/books/reviews`);
  return { success: true };
}
