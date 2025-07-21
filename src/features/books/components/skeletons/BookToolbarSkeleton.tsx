import Link from "next/link";
import { Filter, Grid, List, PlusCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function BookToolbarSkeleton() {
  return (
    <section aria-labelledby="book-filters-title">
      <h2 id="book-filters-title" className="sr-only">
        Book Search, Filters, and Actions
      </h2>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              disabled
            />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1" disabled>
                  <Filter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter Tags
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>

            <ToggleGroup type="single" value="grid" disabled>
              <ToggleGroupItem value="grid" aria-label="Toggle grid">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Toggle list">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <Button disabled>
          <PlusCircle className="h-4 w-4" />
          <span>Add New Book</span>
        </Button>
      </div>
    </section>
  );
}
