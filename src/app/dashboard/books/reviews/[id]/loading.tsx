import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ReviewDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* 1. High-Fidelity Header & Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* The "Back" button is static, so we render it but disabled */}
        <Button variant="outline" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Reviews
        </Button>
        {/* The action buttons are also static, rendered in a disabled state */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" disabled>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* 2. High-Fidelity Book Information Header */}
      <header className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card border rounded-lg">
        {/* Image Skeleton with correct aspect ratio and styling */}
        <Skeleton className="rounded-md object-cover aspect-[2/3] w-full sm:w-[150px] shadow-lg flex-shrink-0" />

        <div className="pt-2 w-full space-y-3">
          {/* The "Review for:" text is static and can be rendered */}
          <p className="text-sm font-medium text-primary">Review for:</p>
          {/* Skeletons for the dynamic book title and author */}
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </header>

      <Separator className="my-8" />

      {/* 3. High-Fidelity Review Content Skeleton */}
      <div className="space-y-4">
        {/* Skeleton for the dynamic review title */}
        <Skeleton className="h-9 w-2/3" />

        {/* Skeleton for the article body */}
        <div className="space-y-3 pt-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </main>
  );
}
