"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BookCreateData, BookUpdateData, getBookSchema } from "./schemas";
import { getAuthenticatedUserId } from "../auth/actions";
import { getTranslations } from "next-intl/server";

export async function createBook(values: BookCreateData) {
  const tServerActions = await getTranslations("Books.ServerActions");
  const tSchemas = await getTranslations("Books.Validations");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    if (error instanceof Error) {
      return { error: tServerActions("errors.auth_required") };
    }
    return { error: tServerActions("errors.auth_required") };
  }

  const bookSchema = getBookSchema(tSchemas);
  const validatedFields = bookSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServerActions("errors.invalid_fields") };
  }

  try {
    await prisma.book.create({
      data: {
        ...validatedFields.data,
        userId: userId!,
      },
    });
    revalidatePath("/dashboard/books");
    return { success: tServerActions("success.book_created") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_create") };
  }
}

export async function updateBook(id: string, values: BookUpdateData) {
  const tServerActions = await getTranslations("Books.ServerActions");
  const tSchemas = await getTranslations("Books.Validations");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: tServerActions("errors.auth_user_not_found") };
  }

  const book = await prisma.book.findUnique({
    where: { id, userId },
  });

  if (!book) {
    return { error: tServerActions("errors.not_found_or_unauthorized") };
  }

  const bookSchema = getBookSchema(tSchemas);
  const validatedFields = bookSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServerActions("errors.invalid_fields") };
  }

  try {
    await prisma.book.update({
      where: { id: id },
      data: validatedFields.data,
    });
    revalidatePath(`/dashboard/books`);
    revalidatePath(`/dashboard/books/${id}/edit`);
    return { success: tServerActions("success.book_updated") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_update") };
  }
}

export async function deleteBook(id: string) {
  const tServerActions = await getTranslations("Books.ServerActions");

  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: tServerActions("errors.auth_user_not_found") };
  }

  const book = await prisma.book.findUnique({
    where: { id, userId },
  });

  if (!book) {
    return { error: tServerActions("errors.not_found_or_unauthorized") };
  }

  try {
    await prisma.book.delete({
      where: {
        id: id,
      },
    });
    revalidatePath(`/dashboard/books`);
    return { success: tServerActions("success.book_deleted") };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: tServerActions("errors.db_error_delete") };
  }
}
