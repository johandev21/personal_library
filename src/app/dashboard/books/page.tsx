import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { BookList } from '@/features/books/components/BookList';
import { BookStats } from '@/features/books/components/BookStats';
import { getBooks } from '@/features/books/queries';

// const allTags = Array.from(
//   new Set(mockBooks.flatMap((book) => book.tags))
// ).sort();

export default async function BooksDashboardPage() {
  const books = await getBooks();

  // const [searchTerm, setSearchTerm] = useState('');
  // const [statusFilter, setStatusFilter] = useState<BookStatus | 'all'>('all');
  // const [tagFilter, setTagFilter] = useState<string[]>([]);
  // const [view, setView] = useState<'grid' | 'list'>('grid');

  // const filteredBooks = mockBooks.filter((book) => {
  //   const searchMatch =
  //     searchTerm === '' ||
  //     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     book.author.toLowerCase().includes(searchTerm.toLowerCase());

  //   const statusMatch = statusFilter === 'all' || book.states === statusFilter;

  //   const tagMatch =
  //     tagFilter.length === 0 ||
  //     tagFilter.every((tag) => book.tags.includes(tag));

  //   return searchMatch && statusMatch && tagMatch;
  // });

  // const handleTagToggle = (tag: string) => {
  //   setTagFilter((currentTags) =>
  //     currentTags.includes(tag)
  //       ? currentTags.filter((t) => t !== tag)
  //       : [...currentTags, tag]
  //   );
  // };

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="dashboard-stats-title">
        <h2 id="dashboard-stats-title" className="sr-only">
          Dashboard Statistics
        </h2>
        <BookStats books={books} />
      </section>

      <Separator />

      <div className="flex flex-col gap-4">
        <section aria-labelledby="book-filters-title">
          <h2 id="book-filters-title" className="sr-only">
            Book Search and Filters
          </h2>
          
          {/* This container will align filters to the left and actions to the right */}
          <div className="flex items-center justify-between gap-4">
            <div>
              {/* <BookFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                allTags={allTags}
                tagFilter={tagFilter}
                onTagToggle={handleTagToggle}
                view={view}
                onViewChange={setView}
              /> */}
            </div>

            <Button asChild>
              <Link href="/dashboard/books/create" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add New Book</span>
              </Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="book-collection-title">
          <h2 id="book-collection-title" className="sr-only">
            Book Collection
          </h2>
          <BookList books={books} view="list" />
        </section>
      </div>
    </div>
  );
}