import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "../auth/actions";
import { Book, BookStates } from "@/generated/prisma/client";

const BOOKS_PER_PAGE = 8;

interface BookQueryFilters {
  query?: string;
  states?: BookStates | "all";
  tags?: string[];
}

const buildWhereClause = (userId: string, filters: BookQueryFilters) => {
  const { query, states, tags } = filters;
  const where: any = { userId };
  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  if (states && states !== "all") {
    andConditions.push({ states: states });
  }

  if (tags && tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags,
      },
    });
  }
  
  if (andConditions.length > 0) {
    where.AND = andConditions;
  }
  return where;
};

export const getFilteredBooks = async (
  filters: BookQueryFilters,
  currentPage: number
): Promise<Book[]> => {
  try {
    const userId = await getAuthenticatedUserId();
    const where = buildWhereClause(userId, filters);

    return await prisma.book.findMany({
      where,
      orderBy: [{ updatedAt: "desc" }],
      take: BOOKS_PER_PAGE,
      skip: (currentPage - 1) * BOOKS_PER_PAGE,
    });
  } catch (error) {
    console.error("Failed to fetch paginated books:", error);
    return [];
  }
};

export const getBooksTotalPages = async (
  filters: BookQueryFilters
): Promise<number> => {
  try {
    const userId = await getAuthenticatedUserId();
    const where = buildWhereClause(userId, filters);

    const count = await prisma.book.count({ where });

    return Math.ceil(count / BOOKS_PER_PAGE);
  } catch (error) {
    console.error("Failed to calculate total pages:", error);
    return 1;
  }
};

export const getBooks = async (): Promise<Book[]> => {
  try {
    const userId = await getAuthenticatedUserId();
    return await prisma.book.findMany({
      where: { userId },
      orderBy: [{ updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to fetch all books:", error);
    return [];
  }
};

export const getBookTags = async (): Promise<string[]> => {
  try {
    const userId = await getAuthenticatedUserId();
    const books = await prisma.book.findMany({
      where: { userId },
      select: { tags: true },
    });

    const allTags = Array.from(
      new Set(books.flatMap((book) => book.tags))
    ).sort();
    return allTags;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const userId = await getAuthenticatedUserId();
    return await prisma.book.findUnique({
      where: {
        id,
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
};