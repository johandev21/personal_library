import * as z from "zod";

export function getSignupFormSchema(
  t?: (key: string, options?: { [key: string]: any }) => string
) {
  return z
    .object({
      name: z
        .string()
        .min(2, {
          message: t
            ? t("name_min", { count: 2 })
            : "Username must be at least 2 characters.",
        })
        .max(50, {
          message: t
            ? t("name_max", { count: 50 })
            : "Username must not exceed 50 characters.",
        }),
      email: z.email({
        message: t ? t("email_invalid") : "Please enter a valid email address.",
      }),
      password: z
        .string()
        .min(8, {
          message: t
            ? t("password_min", { count: 8 })
            : "Password must be at least 8 characters long.",
        })
        .regex(/[A-Z]/, {
          message: t
            ? t("password_uppercase")
            : "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
          message: t
            ? t("password_lowercase")
            : "Password must contain at least one lowercase letter.",
        })
        .regex(/\d/, {
          message: t
            ? t("password_digit")
            : "Password must contain at least one number.",
        })
        .regex(/^[A-Za-z\d]+$/, {
          message: t
            ? t("password_alphanumeric")
            : "Password can only contain letters and numbers.",
        }),
      confirmPassword: z.string().min(1, {
        message: t
          ? t("confirm_password_required")
          : "Please confirm your password.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t ? t("passwords_do_not_match") : "Passwords do not match.",
      path: ["confirmPassword"],
    });
}

export type SignupFormValues = z.infer<
  Awaited<ReturnType<typeof getSignupFormSchema>>
>;

export function getLoginFormSchema(
  t?: (key: string, options?: { [key: string]: any }) => string
) {
  return z.object({
    email: z.email({
      message: t ? t("email_invalid") : "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(1, {
        message: t ? t("password_required") : "Password is required.",
      })
      .min(8, {
        message: t
          ? t("password_min", { count: 8 })
          : "Password must be at least 8 characters long.",
      }),
  });
}

export type LoginFormValues = z.infer<
  Awaited<ReturnType<typeof getLoginFormSchema>>
>;

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(50, {
        message: "Username must not exceed 50 characters.",
      }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, {
        message: "Password must contain at least one number.",
      })
      .regex(/^[A-Za-z\d]+$/, {
        message: "Password can only contain letters and numbers.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters long.",
    }),
});
