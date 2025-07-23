import { Suspense } from "react";
import { BookList } from "@/features/books/components/BookList";
import { BookToolbar } from "@/features/books/components/BookToolbar";
import { BookPagination } from "@/features/books/components/BookPagination";
import {
  getFilteredBooks,
  getBooksTotalPages,
  getBookTags,
} from "@/features/books/queries";
import { BookStates } from "@/generated/prisma/client";
import { getTranslations } from "next-intl/server";

interface BookQueryFilters {
  query?: string;
  states?: BookStates | "all";
  tags?: string[];
}

interface BooksDashboardPageProps {
  searchParams?: Promise<{
    query?: string;
    states?: string;
    tags?: string | string[];
    view?: "grid" | "list";
    page?: string;
  }>;
}

export default async function BooksDashboardPage({
  searchParams,
}: BooksDashboardPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query || "";
  const view = resolvedSearchParams?.view || "grid";
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const tags = resolvedSearchParams?.tags
    ? Array.isArray(resolvedSearchParams.tags)
      ? resolvedSearchParams.tags
      : [resolvedSearchParams.tags]
    : [];

  const statesFromUrl = resolvedSearchParams?.states || "all";

  const validStates = [...Object.values(BookStates), "all"];
  const states: BookStates | "all" = validStates.includes(statesFromUrl as any)
    ? (statesFromUrl as BookStates | "all")
    : "all";

  const filters: BookQueryFilters = { query, states, tags };

  const [paginatedBooks, totalPages, allTags] = await Promise.all([
    getFilteredBooks(filters, currentPage),
    getBooksTotalPages(filters),
    getBookTags(),
  ]);

  const suspenseKey = [query, states, tags.join(","), currentPage].join("-");

  const t = await getTranslations("Books"); 
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BookToolbar allTags={allTags} />

        <Suspense
          key={suspenseKey}
          fallback={<div>{t("loading_books_fallback")}</div>}
        >
          <section aria-labelledby="book-collection-title">
            <h2 id="book-collection-title" className="sr-only">
              {t("collection_title")}
            </h2>
            <BookList books={paginatedBooks} view={view} />
          </section>
        </Suspense>

        <div className="mt-4 flex w-full justify-center">
          <BookPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
