import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "../auth/actions";
import { ReviewWithBook } from "./types";

export const getBookReviews = async (): Promise<ReviewWithBook[]> => {
  try {
    const userId = await getAuthenticatedUserId();

    return await prisma.bookReview.findMany({
      where: {
        userId,
      },
      orderBy: [{ updatedAt: "desc" }],
      include: { book: true },
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
};

export async function getReviewById(id: string): Promise<ReviewWithBook | null> {
  try {
    const userId = await getAuthenticatedUserId();
    const bookReview = await prisma.bookReview.findUnique({
      where: {
        id,
        userId,
      },
      include: { book: true },
    });
    return bookReview;
  } catch (error) {
    console.error("Failed to fetch book review:", error);
    return null;
  }
};
