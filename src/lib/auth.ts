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
  debug: true,
};
