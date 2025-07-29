"use client";

import { PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { BookFilters } from "@/features/books/components/BookFilters";
import type { BookStates } from "@/generated/prisma/client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface BookToolbarProps {
  allTags: string[];
}

export function BookToolbar({ allTags }: BookToolbarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("Books");

  const createUrlWithNewParams = (params: URLSearchParams) => {
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key: "states" | "view", value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    createUrlWithNewParams(params);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    createUrlWithNewParams(params);
  }, 300);

  const handleTagToggle = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.getAll("tags");
    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((t) => t !== tag);
      params.delete("tags");
      newTags.forEach((t) => params.append("tags", t));
    } else {
      params.append("tags", tag);
    }
    createUrlWithNewParams(params);
  };

  return (
    <section aria-labelledby="book-filters-title">
      <h2 id="book-filters-title" className="sr-only">
        {t("filters_title")}
      </h2>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <BookFilters
          allTags={allTags}
          searchTerm={searchParams.get("query") || ""}
          statusFilter={(searchParams.get("states") as BookStates) || "all"}
          tagFilter={searchParams.getAll("tags")}
          view={(searchParams.get("view") as "grid" | "list") || "grid"}
          onSearchChange={handleSearch}
          onStatusChange={(states) => handleFilterChange("states", states)}
          onTagToggle={handleTagToggle}
          onViewChange={(view) => handleFilterChange("view", view)}
        />
        <Button asChild>
          <Link
            href="/dashboard/books/create"
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t("add_new_book_button")}</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
