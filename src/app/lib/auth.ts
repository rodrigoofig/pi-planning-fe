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
      console.log('TOKEN CREDENTIALS INITIAL -> ', params.token);

      if (params.account) {
        return {
          accessToken: params.account.access_token,
          refreshToken: params.account.refresh_token,
          accessTokenExpires: Date.now() + params.account.expires_in * 1000,
        };
      }

      const currentDate = Date.now();
      // Return previous token if the access token has not expired yet
      if (currentDate < params.token.accessTokenExpires) {
        return params.token;
      }

      return await refreshAccessToken(params.token);
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
