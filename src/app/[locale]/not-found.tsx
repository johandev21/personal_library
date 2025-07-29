import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Home } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-background">
      <div className="max-w-md">
        <h1 className="text-9xl font-extrabold text-primary tracking-tighter">
          404
        </h1>
        <p className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Oops! Page Not Found.
        </p>
        <p className="mt-4 text-base text-muted-foreground">
          It seems you've taken a wrong turn. The page you are looking for
          doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-8" variant="outline">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Go back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
