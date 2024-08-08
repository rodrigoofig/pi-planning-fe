/** @format */

import refreshAccessToken from '@/app/api/auth/[...nextauth]/refreshToken';
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
      return baseUrl;
    },
    async jwt(params) {
      if (params.account) {
        params.token.id = params.user.id;
        params.token.accessToken = params.account.access_token;
        params.token.refreshToken = params.account.refresh_token;
        params.token.accessTokenExpires = params.account.expires_at * 1000;
      }

      const currentDate = Date.now();
      // Return previous token if the access token has not expired yet
      if (currentDate < params.token.accessTokenExpires) {
        return params.token;
      }

      params.token = await refreshAccessToken(params.token);

      return params.token;
    },
    async session({ session, token }) {
      const newSession = {
        ...session,
        accessToken: token.accessToken,
      };

      //console.log("Session Token -> ", newSession.accessToken)

      return newSession;
    },
  },
};
