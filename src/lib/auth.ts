/** @format */

import { checkPrimeSync } from 'crypto';
import { NextAuthOptions } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';
import { Chokokutai } from 'next/font/google';
import { cookies } from 'next/headers';

export const authConfig: NextAuthOptions = {
  providers: [
    AtlassianProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: process.env.SCOPE,
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt(params) {
      if (params.account) {
        params.token.accessToken = params.account.access_token;
        params.token.id = params.user.id;
      }
      const nibba = cookies().get('next-auth.session-token');
      console.log('nibba', nibba);

      cookies().set('gigachad', 'params.token.accessToken');
      console.log('JWT', params.token.accessToken);
      return params.token;
    },
    async session({ session, token }) {
      const newSession = {
        ...session,
        accessToken: token.accessToken,
      };

      return newSession;
    },
  },
};
