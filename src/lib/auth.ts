import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { Resend } from "resend";

import { nextCookies } from "better-auth/next-js";

import { getLocale, getTranslations } from "next-intl/server";
import VerifyEmail from "@/features/auth/components/emails/verify-email";
import ForgotPasswordEmail from "@/features/auth/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: "auth_starter@resend.dev",
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const locale = await getLocale();

      const t = await getTranslations("Auth.Emails.ResetPassword");

      await resend.emails.send({
        from: "auth_starter@resend.dev",
        to: user.email,
        subject: t("preview"),
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
          locale: locale,
          t: t,
        }),
      });
    },
    resetPasswordTokenExpiresIn: 86400,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
