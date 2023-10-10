import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google" 
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your own logic here to find the user in your database and verify the password
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
 
        if (user) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id
      return session
    },
  },
}
export default NextAuth(authOptions)
