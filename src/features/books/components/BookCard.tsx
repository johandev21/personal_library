import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { Book } from "@/generated/prisma/client";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:bg-muted/50 gap-0 pt-0">
      <CardHeader className="p-0">
        <Image
          alt={`${book.title} cover`}
          className="aspect-[3/4] w-full object-cover"
          height={300}
          src={book.cover || ""}
          width={200}
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{book.author}</p>
        <StarRating rating={book.rating} className="mt-2" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 p-4 pt-0">
        <Badge variant={book.states === "read" ? "default" : "secondary"}>
          {book.states.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </Badge>
        <div className="flex gap-1 flex-wrap">
          {book.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}