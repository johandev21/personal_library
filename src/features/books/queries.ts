import { Book } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "../auth/actions";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const userId = await getAuthenticatedUserId();

    return await prisma.book.findMany({
      where: {
        userId,
      },
      orderBy: [{ updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const userId = await getAuthenticatedUserId();
    const note = await prisma.book.findUnique({
      where: {
        id,
        userId,
      },
    });
    return note;
  } catch (error) {
    console.error("Failed to fetch note:", error);
    return null;
  }
};
