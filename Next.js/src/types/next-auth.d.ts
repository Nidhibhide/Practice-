import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    email?: string;
    name?: string;
    image?: string;
    isVerified?: boolean; // 👈 add custom field
  }
  interface Session {
    user: {
      id: string;
      isVerified?: boolean;
      name?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

// interface User {
//   id?: string;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
// }
// The built-in User type in NextAuth already has , So when you do user.id or user.email, TypeScript is happy
