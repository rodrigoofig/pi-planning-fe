import Link from 'next/link';
import SignIn from './signIn';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/auth';
import Home from './home';

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if (session?.user) {
    return (
      <>
      <Home/>
        {/* Signed in as {session.user.email} <br />
        <div>
          <Link href='/chat'>xats</Link>
        </div>
        <a href=''></a> */}
      </>
    );
  }
  return (
    <>
      <SignIn />
    </>
  );
}
