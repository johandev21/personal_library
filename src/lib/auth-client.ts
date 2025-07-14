import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://ownyourlibrary.netlify.app"
})

export const { signIn, signUp, useSession } = createAuthClient();