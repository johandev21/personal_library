"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { getSignupFormSchema, SignupFormValues } from "../../schemas";
import { signUp } from "../../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("Auth.SignUp");
  const tValidation = useTranslations("Auth.SignUp.Validations");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(getSignupFormSchema(tValidation)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);
    try {
      const result = await signUp(values);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(t("unexpected_error_toast"));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGithubLogin() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Social Signup Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGithubLogin}
                disabled={isLoading}
              >
                <RiGithubFill className="mr-2 h-4 w-4" />
                {t("github_button")}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <RiGoogleFill className="mr-2 h-4 w-4" />
                {t("google_button")}
              </Button>
            </div>

            {/* Separator */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                {t("or_continue_with")}
              </span>
            </div>

            {/* Email/Password Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>{t("username_label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("username_placeholder")}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>{t("email_label")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("email_placeholder")}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>{t("password_label")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>{t("confirm_password_label")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    t("creating_account_button")
                  )}
                </Button>
              </form>
            </Form>

            {/* Link to Login */}
            <div className="text-center text-sm">
              {t("already_have_account_prompt")}{" "}
              <Link href="/login" className="underline underline-offset-4">
                {t("signin_link")}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
