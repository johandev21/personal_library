import { createAuthClient } from "better-auth/react";

const baseURL = process.env.BETTER_AUTH_URL;

export const authClient = createAuthClient({
    baseURL: baseURL
});

export const { signIn, signUp, useSession } = createAuthClient();