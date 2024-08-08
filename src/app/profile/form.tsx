import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/lib/auth';

export default async function ProfileForm() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (
    <>
      <section className='bg-ct-blue-600  min-h-screen pt-20'>
        <div className='max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center'>
          <div>
            <p className='mb-3 text-5xl text-center font-semibold'>
              Profile Page
            </p>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className='flex items-center gap-8'>
                <div className='mt-8'>
                  <p className='mb-3'>Name: {user.name}</p>
                  <p className='mb-3'>Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
