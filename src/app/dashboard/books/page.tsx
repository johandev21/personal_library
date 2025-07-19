import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { BookList } from "@/features/books/components/BookList";
import { BookStats } from "@/features/books/components/BookStats";
import { BookToolbar } from "@/features/books/components/BookToolbar";
import { BookPagination } from "@/features/books/components/BookPagination";
import {
  getBooks,
  getFilteredBooks,
  getBooksTotalPages,
  getBookTags,
} from "@/features/books/queries";
import { BookStates } from "@prisma/client"; 

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
  const states: BookStates | "all" = validStates.includes(
    statesFromUrl as any
  )
    ? (statesFromUrl as BookStates | "all")
    : "all";

  const filters: BookQueryFilters = { query, states, tags };

  const [paginatedBooks, totalPages, allTags, allBooksForStats] =
    await Promise.all([
      getFilteredBooks(filters, currentPage),
      getBooksTotalPages(filters),
      getBookTags(),
      getBooks(),
    ]);

  const suspenseKey = [query, states, tags.join(","), currentPage].join("-");

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="dashboard-stats-title">
        <h2 id="dashboard-stats-title" className="sr-only">
          Dashboard Statistics
        </h2>
        <BookStats books={allBooksForStats} />
      </section>

      <Separator />

      <div className="flex flex-col gap-4">
        <BookToolbar allTags={allTags} />

        <Suspense key={suspenseKey} fallback={<div>Loading books...</div>}>
          <section aria-labelledby="book-collection-title">
            <h2 id="book-collection-title" className="sr-only">
              Book Collection
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