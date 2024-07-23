import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma-connect";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        const accountUser = await prisma.user.findUnique({
          where: {
            email: user?.email as string,
          },
        });

        token.id = accountUser?.id;
      }
      return token;
    },

    async session({ token, session }) {
      session.user.id = token.id;
      return session;
    },

    async signIn({ profile, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: profile?.sub as string,
              name: profile?.name as string,
              email: profile?.email as string,
              image: profile?.picture as string,
            },
          });
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
};
