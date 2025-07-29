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
import { getTranslations } from "next-intl/server";

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
  const tServerActions = await getTranslations("Reviews.ServerActions");
  const tValidations = await getTranslations("Reviews.Validations");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    if (error instanceof Error)
      return { error: tServerActions("errors.auth_required") };
    return { error: tServerActions("errors.auth_required") };
  }

  const schema = reviewCreateSchema(tValidations);
  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServerActions("errors.invalid_fields") };
  }

  const { bookId, title, content } = validatedFields.data;

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId, userId },
    });
    if (!book) {
      return {
        error: tServerActions(
          "errors.book_not_found_or_unauthorized_to_review"
        ),
      };
    }

    const existingReview = await prisma.bookReview.findUnique({
      where: { bookId },
    });
    if (existingReview) {
      return { error: tServerActions("errors.existing_review") };
    }

    await prisma.bookReview.create({
      data: {
        title,
        content,
        bookId,
        userId: userId!,
      },
    });
    revalidatePath("/dashboard/books/reviews");
    revalidatePath(`/dashboard/books/${bookId}`);
    return { success: tServerActions("success.review_created") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_create") };
  }
}

export async function updateReview(id: string, values: ReviewUpdateData) {
  const tServerActions = await getTranslations("Reviews.ServerActions");
  const tValidations = await getTranslations("Reviews.Validations");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: tServerActions("errors.auth_user_not_found") };
  }

  const review = await prisma.bookReview.findUnique({ where: { id, userId } });
  if (!review) {
    return {
      error: tServerActions("errors.review_not_found_or_unauthorized"),
    };
  }

  const schema = reviewUpdateSchema(tValidations);
  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServerActions("errors.invalid_fields") };
  }

  try {
    await prisma.bookReview.update({
      where: { id: id },
      data: validatedFields.data,
    });
    revalidatePath(`/dashboard/books/reviews`);
    revalidatePath(`/dashboard/books/reviews/${id}/edit`);
    return { success: tServerActions("success.review_updated") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_update") };
  }
}

export async function deleteReview(id: string) {
  const tServerActions = await getTranslations("Reviews.ServerActions");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: tServerActions("errors.auth_user_not_found") };
  }

  const review = await prisma.bookReview.findUnique({ where: { id, userId } });
  if (!review) {
    return {
      error: tServerActions("errors.review_not_found_or_unauthorized"),
    };
  }

  try {
    await prisma.bookReview.delete({ where: { id: id } });
    revalidatePath(`/dashboard/books/reviews`);
    return { success: tServerActions("success.review_deleted") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_delete") };
  }
}
