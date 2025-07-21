import { createAuthClient } from "better-auth/react"

const baseURL = process.env.BETTER_AUTH_URL;

if (!baseURL && process.env.NODE_ENV !== "development") {
  throw new Error("Missing BETTER_AUTH_URL in production environment");
}

export const authClient = createAuthClient({
    baseURL: baseURL || "http://localhost:3000"
})

export const { signIn, signUp, useSession } = createAuthClient();