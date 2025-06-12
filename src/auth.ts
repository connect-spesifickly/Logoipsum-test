import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "./utils/axios";
interface CustomUser {
  id?: string;
  name?: string;
  email?: string;
  token: string;
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      authorize: async (credentials): Promise<CustomUser | null> => {
        try {
          const response = await api.post<CustomUser>(
            "/auth/login",
            credentials
          );
          const user = response.data;
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token.token as string;
      }
      return session;
    },
  },
});
