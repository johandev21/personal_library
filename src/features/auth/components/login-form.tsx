"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { loginFormSchema, loginFormValues } from "../schemas";

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
import { signIn } from "../actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("Auth.Login");

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginFormValues) {
    setIsLoading(true);

    try {
      const result = await signIn(values);

      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("An unexpected network or server error occurred:", err);
      // Using the translated message here as well for consistency
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>{t("password_label")}</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
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

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("logging_in_button") : t("login_button")}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            {t("no_account_prompt")}{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t("signup_link")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
