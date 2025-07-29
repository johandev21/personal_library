"use server";

import { auth } from "@/lib/auth";
import { loginFormSchema, signupFormSchema } from "./schemas";
import z from "zod";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { APIError } from "better-auth/api";
import { getTranslations } from "next-intl/server";

async function t() {
  return await getTranslations("Auth.ServerActions");
}

export async function getAuthenticatedUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user?.id) {
  }

  return session?.user.id;
}

export const signUp = async (values: z.infer<typeof signupFormSchema>) => {
  const tServer = await t();
  const validatedFields = signupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServer("errors.invalid_fields") };
  }

  try {
    await auth.api.signUpEmail({
      body: validatedFields.data,
    });
    return {
      success: tServer("success.signup_account_created"),
    };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { error: error.message };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: tServer("errors.unknown_signup_error") };
  }
};

export const signIn = async (values: z.infer<typeof loginFormSchema>) => {
  const tServer = await t();
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: tServer("errors.invalid_fields") };
  }

  try {
    await auth.api.signInEmail({
      body: validatedFields.data,
    });

    revalidatePath("/");
    return { success: tServer("success.signin_success") };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { error: error.message };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: tServer("errors.unknown_signin_error") };
  }
};
