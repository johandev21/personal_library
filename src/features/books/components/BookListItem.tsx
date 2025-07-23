import Image from "next/image";
import React from "react";
import { MoreHorizontal, Edit } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StarRating } from "./StarRating";
import { Book } from "@/generated/prisma/client";
import Link from "next/link";
import { DeleteBookDialog } from "./DeleteBookDialog";
import NoCoverFound from "@/public/no-cover.png";

interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book }: BookListItemProps) => {
  return (
    <Card className="w-full grid grid-cols-5 items-center p-3 gap-4 transition-all hover:bg-accent/30">
      <Image
        alt={`${book.title} cover`}
        className="aspect-[2/3] w-16 rounded-md object-cover col-auto"
        height={96}
        src={book.cover || NoCoverFound}
        width={64}
      />

      <div className="flex flex-col items-start gap-4 col-span-2">
        <Link href={`/dashboard/books/${book.id}`}>
          <div className="md:col-span-2">
            <p
              className="font-semibold text-base text-truncate overflow-hidden"
              title={book.title}
            >
              {book.title}
            </p>
            <p className="text-sm text-muted-foreground text-truncate overflow-hidden">
              {book.author}
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center">
          <StarRating rating={book.rating} />
        </div>

        <div className="hidden sm:flex items-center gap-1 flex-wrap">
          {book.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {book.tags.length > 2 && (
            <Badge variant="outline">+{book.tags.length - 2}</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto pl-4 col-span-2">
        <Badge
          className="hidden lg:inline-flex"
          variant={book.states === "read" ? "default" : "secondary"}
        >
          {book.states
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/books/${book.id}/edit`}>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DeleteBookDialog bookId={book.id} triggerVariant="dropdown-item" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

BookListItem.displayName = "BookListItem";
