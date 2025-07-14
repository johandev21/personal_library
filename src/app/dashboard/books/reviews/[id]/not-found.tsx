import { ResourceNotFound } from "@/components/ResourceNotFound";

export default function ReviewNotFound() {
  return (
    <ResourceNotFound
      title="Review Not Found"
      description="The review you are looking for does not exist or you do not have permission to view it."
      buttonText="Go to All Reviews"
      buttonHref="/dashboard/books/reviews"
    />
  );
}