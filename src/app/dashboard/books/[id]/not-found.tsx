import { ResourceNotFound } from "@/components/ResourceNotFound";

export default function BookNotFound() {
  return (
    <ResourceNotFound
      title="Book Not Found"
      description="The book you are looking for does not exist or you do not have permission to view it."
      buttonText="Go to My Books"
      buttonHref="/dashboard/books"
    />
  );
}