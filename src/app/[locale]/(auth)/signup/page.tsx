import LocaleSwitcher from "@/components/LocaleSwitcher"
import { LoginForm } from "@/features/auth/components/login-form"
import { SignupForm } from "@/features/auth/components/signup-form"

export default function SignUpRoute() {
  return (
    <div className="flex relative min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
