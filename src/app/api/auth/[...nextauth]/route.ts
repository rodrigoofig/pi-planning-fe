/** @format */

import { authConfig } from '@/app/api/auth/[...nextauth]/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
