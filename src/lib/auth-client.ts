import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://personal-library-weld.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient();