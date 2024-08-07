"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession()


  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>
          <Link href='/chat'>solteiras a 5 km de ti</Link>
        </div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}