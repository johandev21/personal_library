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
import { deleteReview } from "../actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface DeleteReviewDialogProps {
  reviewId: string;
  children: React.ReactNode;
}

export function DeleteReviewDialog({ reviewId, children }: DeleteReviewDialogProps) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Reviews.delete_dialog");

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteReview(reviewId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t("delete_success_toast")); 
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t("cancel_button")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? t("deleting_button") : t("delete_permanently_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}