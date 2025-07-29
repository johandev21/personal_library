"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { getLoginFormSchema, LoginFormValues } from "../../schemas";
import { signIn } from "../../actions";

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
import { Link, useRouter } from "@/i18n/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("Auth.SignIn");
  const validations = useTranslations("Auth.SignIn.Validations")

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginFormSchema(validations)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await signIn(values);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        router.refresh();
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(t("unexpected_error_toast"));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGithubLogin() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
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
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
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

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                {t("or_continue_with")}
              </span>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>{t("email_label")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("email_placeholder")}
                          {...field}
                          disabled={isLoading}
                          autoComplete="off"
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
                    <FormItem className="grid gap-3">
                      <div className="flex items-center">
                        <FormLabel>{t("password_label")}</FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          {t("forgot_password_link")}
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                          autoComplete="off"
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
                    t("login_button")
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm">
              {t("no_account_prompt")}{" "}
              <Link href="/signup" className="underline underline-offset-4">
                {t("signup_link")}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
