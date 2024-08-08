import { authConfig } from '@/app/api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import ChatsComponent from '../component/chats';

export default async function Chats() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <ChatsComponent session={session}></ChatsComponent>
    </div>
  );
}
