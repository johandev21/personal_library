import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://personal-library-lfcdeseqi-johandev21s-projects-d27af362.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient();