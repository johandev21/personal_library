import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ForgotPasswordForm } from "@/features/auth/components/forms/forgot-password-form";
import { GalleryVerticalEnd } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
