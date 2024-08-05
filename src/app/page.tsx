
import { useSession } from "next-auth/react";
import { LoginForm } from "./login/form";

export default function Home() {
  const [session, loading] = useSession();
  if(!session){
    return (
      <main>
        <LoginForm />
      </main>
    )
  }
}
