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

  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBook(bookId);
      if (result?.error) {
        toast(result.error);
        if (triggerVariant === "button") {
          router.push("/dashboard/books");
        }
      } else {
        toast.success("Book deleted successfully!");
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
        <span>Delete</span>
      </DropdownMenuItem>
    );
  } else {
    triggerElement = (
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this book
            from your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
