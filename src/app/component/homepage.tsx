import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "./button";

export default async function Home() {
  const session = await getServerSession(authConfig);

  console.log("SESSION -> ", JSON.stringify(session));

  console.log("SESSION -> ",session);


  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
       
        <div>
          <Link href='/chat'>xats</Link>
        </div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button/>
    </>
  )
}