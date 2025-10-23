import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/Model/User";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await dbconnect(); // connect to the database
          const user = await UserModel.findOne({
            email: credentials.email,
          }).exec(); // find user by email
          if (!user) return null;
          if (user.isVerified === false) throw new Error("Email not verified");
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) return null;
          return user;
        } catch (err) {
          console.error("Authorize error", err);
          return null;
        }
      },
    }),
  ],
  // define session strategy and max age
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // define JWT and session callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAccepting = user.isAccepting;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.isVerified = token.isVerified;
        session.user.isAccepting = token.isAccepting;
        session.user.username = token.username;
      }
      return session;
    },
  },
  // specify custom pages for sign-in and error handling
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
