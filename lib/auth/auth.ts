import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { env } from "../misc/env"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Github],
    callbacks: {
        signIn: async ({ user }) => {
            if (user.email === env.ADMIN_EMAIL) return true
            return false
        }
    }
})