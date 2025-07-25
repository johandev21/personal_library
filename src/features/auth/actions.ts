"use server";

import { auth } from "@/lib/auth";
import { loginFormSchema, signupFormSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import z from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthenticatedUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user?.id) {
    redirect("/en/signin");
  }

  return session?.user.id;
}

export const signUp = async (values: z.infer<typeof signupFormSchema>) => {
  const validatedFields = signupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    await auth.api.signUpEmail({
      body: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    return { error: `Error: ${error}` };
  }
};

export const signIn = async (values: z.infer<typeof loginFormSchema>) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    await auth.api.signInEmail({
      body: validatedFields.data,
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { error: `Error: ${error}` };
  }
};
