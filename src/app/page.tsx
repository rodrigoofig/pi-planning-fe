

import { LoginForm } from "./login/form";
import { cookies } from 'next/headers';



const getToken = async () => {
  const token = cookies().get('next-auth.session-token')
  console.log('SIIIU', token);
  return token;
};

export default async function Home() {

  const token = await getToken();
  console.log(token);

  if (token) {
    return <h1>Welcome to Dashboard</h1>;
  }
  return (
    <>
      <LoginForm />;
    </>
  );
  
}
