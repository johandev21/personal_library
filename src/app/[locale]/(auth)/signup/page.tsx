import LocaleSwitcher from "@/components/LocaleSwitcher";
import { SignupForm } from "@/features/auth/components/forms/signup-form";

export default async function SignupPage() {
  return (
    <div className="flex relative min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 mt-10">
        <SignupForm />
      </div>
    </div>
  );
}
