import { cookies } from 'next/headers';
import LoginPage from './login/page';
import Chats from './chat/page';

const getToken = async () => {
  const token = cookies().get('next-auth.session-token')

  return token;
};

export default async function Home() {

  const token = await getToken();
  console.log(token);

  if (token) {
    return  <Chats token = {token.value}/>
  }
  
  return (
    <div > 
      <LoginPage />
    </div>
  );
  
}
