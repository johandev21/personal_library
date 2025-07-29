"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
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
import z from "zod";

const formSchema = z.object({
  email: z.email(),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Auth.ForgotPassword");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: "/auth/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("password_reset_email_sent_toast"));
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email_label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("email_placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    t("reset_password_button")
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t("no_account_prompt")}{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  {t("signup_link")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("terms_and_conditions_prefix")}{" "}
        <Link href="/">{t("terms_of_service_link")}</Link> and{" "}
        <Link href="/">{t("privacy_policy_link")}</Link>.
      </div>
    </div>
  );
}