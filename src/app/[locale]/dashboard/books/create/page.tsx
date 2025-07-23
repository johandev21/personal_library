import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCreateForm } from "@/features/books/components/forms/BookCreateForm";
import { getTranslations } from "next-intl/server";

export default async function CreateBookPage() {
  const t = await getTranslations("Books.create_page");

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}