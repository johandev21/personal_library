"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  bookCreateSchema,
  BookCreateData,
  BookUpdateData,
  bookUpdateSchema,
} from "./schemas";
import { getAuthenticatedUserId } from "../auth/actions";

export async function createBook(values: BookCreateData) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Authentication Error: ${error.message}` };
    }
    return { error: "An unknown authentication error occurred." };
  }

  const validatedFields = bookCreateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields." };
  }

  try {
    await prisma.book.create({
      data: {
        ...validatedFields.data,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Database Error: Failed to create the book." };
  }

  revalidatePath("/dashboard/books");
  return { success: true };
}

export async function updateBook(id: string, values: BookUpdateData) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: "Authentication Error: User not found." };
  }

  const book = await prisma.book.findUnique({
    where: { id, userId },
  });

  if (!book) {
    return { error: "Book not found or you don't have permission to edit it." };
  }

  const validatedFields = bookUpdateSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    await prisma.book.update({
      where: { id: id },
      data: validatedFields.data,
    });
  } catch (error) {
    return { error: "Database Error: Failed to update book." };
  }

  revalidatePath(`/dashboard/books`);
  revalidatePath(`/dashboard/books/${id}/edit`);

  return { success: true };
}

export async function deleteBook(id: string) {
  let userId;
  try {
    userId = await getAuthenticatedUserId();
  } catch (error) {
    return { error: "Authentication Error: User not found." };
  }

  const book = await prisma.book.findUnique({
    where: { id, userId },
  });

  if (!book) {
    return { error: "Book not found or you don't have permission to edit it." };
  }

  try {
    await prisma.book.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return { error: "Database Error: Failed to delete note." };
  }

  revalidatePath(`/dashboard/books`);

  return { success: true };
}
