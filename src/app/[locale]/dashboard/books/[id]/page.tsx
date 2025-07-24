import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteBookDialog } from "@/features/books/components/DeleteBookDialog";
import { getBookById } from "@/features/books/queries";
import { ArrowLeft, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoCoverFound from "@/public/no-cover.png";
import { getTranslations } from "next-intl/server";

export default async function DetailBookRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  const t = await getTranslations("Books.detail_page");

  const formattedBookState = book.states.replace(/_/g, " ");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/books">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("back_to_list_button")}
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/books/${id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> {t("edit_button")}
            </Button>
          </Link>
          <DeleteBookDialog bookId={book.id} triggerVariant="button" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {book.title}
            <Badge variant="secondary">{formattedBookState}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="relative w-full rounded">
            <Image
              src={book.cover || NoCoverFound}
              alt={book.title}
              width={200}
              height={300}
              className="object-cover rounded md:aspect-[1/1.6] md:w-full mx-auto md:mx-0"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("author_label")}
              </p>
              <p className="text-lg font-medium">{book.author}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {t("rating_label")}
              </p>
              <p className="text-lg font-medium">
                {book.rating
                  ? `${"⭐️".repeat(book.rating)} (${book.rating}/5)`
                  : t("no_rating_text")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
