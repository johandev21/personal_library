import { Button } from "@/components/ui/button";
import { BookReviewCreateForm } from "./BookReviewCreateForm";
import { getReviewableBooks } from "../actions";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ReviewFormContainer() {
  const reviewableBooks = await getReviewableBooks();
  const t = await getTranslations("Reviews");

  if (reviewableBooks.length > 0) {
    return <BookReviewCreateForm reviewableBooks={reviewableBooks} />;
  }

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold">{t("no_books_to_review_title")}</h3>
      <p className="text-muted-foreground mt-2 mb-4">
        {t("no_books_to_review_description")}
      </p>
      <Button asChild>
        <Link href="/dashboard/books">{t("go_to_my_books_button")}</Link>
      </Button>
    </div>
  );
}
