"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { deleteBook } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type trigger = "dropdown-item" | "button";

interface DeleteBookDialogProps {
  bookId: string;
  triggerVariant: trigger;
}

export function DeleteBookDialog({
  bookId,
  triggerVariant,
}: DeleteBookDialogProps) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Books.delete_dialog");

  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBook(bookId);
      if (result?.error) {
        toast.error(result.error);
        if (triggerVariant === "button") {
          router.push("/dashboard/books");
        }
      } else {
        toast.success(t("success_toast"));
        if (triggerVariant === "button") {
          router.push("/dashboard/books");
        }
      }
    });
  };

  let triggerElement;

  if (triggerVariant === "dropdown-item") {
    triggerElement = (
      <DropdownMenuItem
        onSelect={(event) => event.preventDefault()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        <span>{t("dropdown_delete_label")}</span>
      </DropdownMenuItem>
    );
  } else {
    triggerElement = (
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" /> {t("dropdown_delete_label")}
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialog_title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialog_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel_button")}
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending ? t("deleting_button") : t("continue_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
