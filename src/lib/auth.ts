/** @format */

import { NextAuthOptions } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';

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
      if (url.startsWith(baseUrl)) {
        return baseUrl + '/chat';
      }
      return baseUrl;
    },
    async jwt(params) {
      if (params.account) {
        params.token.accessToken = params.account.access_token;
        params.token.id = params.user.id;
      }

      return params.token;
    },
    async session({ session, token }) {
      console.log();
      const newSession = {
        ...session,
        accessToken: token.accessToken,
      };

      return newSession;
    },
  },
};
