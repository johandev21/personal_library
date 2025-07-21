import Link from "next/link";
import {
  ArrowRight,
  Book,
  BookOpenCheck,
  BookPlus,
  MessageSquarePlus,
  MessageSquareQuote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Static Header with Skeleton for the User's Name */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, <Skeleton className="inline-block h-6 w-32" />!
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button disabled>
            <BookPlus className="mr-2 h-4 w-4" /> Add a New Book
          </Button>
          <Button variant="secondary" disabled>
            <MessageSquarePlus className="mr-2 h-4 w-4" /> Write a Review
          </Button>
        </div>
      </section>

      <Separator />

      {/* 2. HIGH-FIDELITY At-a-Glance Stats Skeleton */}
      <section>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Books Skeleton Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-10 mb-2" />
              <p className="text-xs text-muted-foreground">
                in your entire collection
              </p>
            </CardContent>
          </Card>
          {/* To-Read List Skeleton Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                To-Read List
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-10 mb-2" />
              <p className="text-xs text-muted-foreground">
                books you want to read
              </p>
            </CardContent>
          </Card>
          {/* Total Reviews Skeleton Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reviews
              </CardTitle>
              <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-10 mb-2" />
              <p className="text-xs text-muted-foreground">
                reviews you've written
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Main Content Grids Skeleton (already high-fidelity) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Currently Reading</CardTitle>
            <Button variant="ghost" size="sm" disabled>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2">
                <Skeleton className="h-[60px] w-[40px] rounded-md flex-shrink-0" />
                <div className="min-w-0 w-full space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Reviews</CardTitle>
            <Button variant="ghost" size="sm" disabled>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-2 space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
