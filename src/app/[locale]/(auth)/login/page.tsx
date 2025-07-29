import { GalleryVerticalEnd } from "lucide-react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { LoginForm } from "@/features/auth/components/forms/login-form";

export default async function LoginPage() {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
