import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbconnect from '@/lib/dbConnect';
import UserModel from '@/Model/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials:any): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await dbconnect();
          const user = await UserModel.findOne({ email: credentials.email }).exec();
          if (!user) return null;
          if(user.isveried === false) throw new Error('Email not verified');
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) return null;
          return { id: user.id.toString(), username: user.username, email: user.email };
        } catch (err) {
          console.error('Authorize error', err);
          return null;
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id ?? token.sub;
      }
      return session;
    }
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },

  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;