"use client";

import Image from "next/image";
import { MoreVertical, Edit, Trash2, Book } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteReviewDialog } from "./DeleteReviewDialog";
import { ReviewWithBook } from "../types";
import { formatDateTime } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface BookReviewCardProps {
  review: ReviewWithBook;
}

export function BookReviewCard({ review }: BookReviewCardProps) {
  const t = useTranslations("Reviews");

  return (
    <Card className="relative flex flex-col overflow-hidden rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">{t("options_label")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/books/reviews/${review.id}`}
                className="cursor-pointer"
              >
                <Book className="mr-2 h-4 w-4" />
                <span>{t("details_link")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/books/reviews/${review.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>{t("edit_link")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/books/${review.book.id}`}
                className="cursor-pointer"
              >
                <Book className="mr-2 h-4 w-4" />
                <span>{t("book_details_link")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteReviewDialog reviewId={review.id}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>{t("delete_review_action")}</span>
              </DropdownMenuItem>
            </DeleteReviewDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Image
          alt={`Book cover for ${review.book.title}`}
          className="object-contain aspect-[3/4] h-full mx-auto"
          src={review.book.cover || "/placeholder.svg"}
          width={217}
          height={350}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/dashboard/books/reviews/${review.id}`}>
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-bold">
              {review.book.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("by_author", { author: review.book.author })}
            </p>
          </CardHeader>

          <CardContent className="mt-2 p-0 flex-grow">
            <h4 className="font-semibold">{review.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {review.content}
            </p>
          </CardContent>
        </Link>
      </div>

      <CardFooter className="border-t p-4 text-xs text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>
            {t("created_at", { date: formatDateTime(review.createdAt) })}
          </span>
          <span>
            {t("updated_at", { date: formatDateTime(review.updatedAt) })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
