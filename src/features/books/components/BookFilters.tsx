// This component remains a client component, but it's simpler now.
// It doesn't need to know about Next.js routing hooks.
"use client";

import { Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BookStatus } from "../types";

interface BookFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: BookStatus | "all";
  onStatusChange: (status: BookStatus | "all") => void;
  allTags: string[];
  tagFilter: string[];
  onTagToggle: (tag: string) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function BookFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  allTags,
  tagFilter,
  onTagToggle,
  view,
  onViewChange,
}: BookFiltersProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title or author..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          defaultValue={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Select
          value={statusFilter}
          onValueChange={(value: BookStatus | "all") => onStatusChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="reading">Reading</SelectItem>
            <SelectItem value="want_to_read">Want to Read</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter Tags {tagFilter.length > 0 && `(${tagFilter.length})`}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={tagFilter.includes(tag)}
                onCheckedChange={() => onTagToggle(tag)}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => value && onViewChange(value as "grid" | "list")}
        >
          <ToggleGroupItem value="grid" aria-label="Toggle grid">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="Toggle list">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}