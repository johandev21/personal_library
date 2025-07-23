import Image from "next/image";
import { MoreHorizontal, Edit } from "lucide-react";
import Link from "next/link";
import { Book } from "@/generated/prisma/client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { StarRating } from "./StarRating";
import { DeleteBookDialog } from "./DeleteBookDialog"; 
import NoCoverFound from "@/public/no-cover.png";


interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="w-full transition-all hover:bg-accent/30 overflow-hidden pb-0 gap-2 relative">
      <Link href={`/dashboard/books/${book.id}`}>
        <CardHeader className="p-0">
          <Image
            alt={`${book.title} cover`}
            className="aspect-[3/4] mx-auto object-contain"
            height={240}
            src={book.cover || NoCoverFound}
            width={170}
          />
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {book.author}
          </p>
          <StarRating rating={book.rating} className="mt-2" />
        </CardContent>
      </Link>
      <CardFooter className="flex-col items-start gap-2 p-4 pt-0">
        <Badge variant={book.states === "read" ? "default" : "secondary"}>
          {book.states
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Badge>
        <div className="flex gap-1 flex-wrap">
          {book.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {book.tags.length > 2 && (
            <Badge variant="outline">+{book.tags.length - 2}</Badge>
          )}
        </div>
      </CardFooter>
      <div className="absolute top-2 right-2">
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
}
