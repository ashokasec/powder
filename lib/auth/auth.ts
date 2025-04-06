import NextAuth, { DefaultSession } from "next-auth"
import Github from "next-auth/providers/github"

declare module "next-auth" {
    interface Session {
        user: {
            image: string
        } & DefaultSession["user"]
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Github],
    // callbacks: {
    // TODO: add rate-limit on sign-in using unauthenticatedRateLimit "@/lib/security/rate-limit"
    // async signIn()
    // }
})