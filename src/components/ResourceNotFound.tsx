import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

interface ResourceNotFoundProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function ResourceNotFound({
  title,
  description,
  buttonText,
  buttonHref,
}: ResourceNotFoundProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{description}</p>
          <Button asChild>
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}