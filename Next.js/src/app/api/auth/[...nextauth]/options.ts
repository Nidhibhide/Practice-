//next auth is remanining

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/DbConnect";
import User from "@/model/User";

export const authOpions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
            };
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    //its not by default
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.email = user.email;
      }
      return token;
    },
    //its default
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error:'/sign-in'
  },
  session: {
    strategy: "jwt",
    maxAge:30*24*60*60
  },
  secret: process.env.NEXTAUTH_SECRET,
};


