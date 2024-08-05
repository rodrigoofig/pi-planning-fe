/** @format */

import { NextAuthOptions } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';

export const authConfig: NextAuthOptions = {
  providers: [
    AtlassianProvider({
      clientId: 'v4n58Kcr6pXl1vFUwPYIignKXsYkAC5o',
      clientSecret:
        'ATOAFUs-DOmmEAfkhmCtUPzJiFlIBUeFDe3lFow887LXAvNAJ7TWjJnu7d7OZ71vKN7P492B931D',
      authorization: {
        params: {
          audience: 'api.atlassian.com',
          scope:
            'write:jira-work read:jira-work read:jira-user offline_access read:me',
        },
      },
    }),
  ],
  debug: true,
};
