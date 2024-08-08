"use client"

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  const callbackUrl = "http://localhost:3000/api/auth/callback/atlassian";
  return (
    <>
      <div className='flex h-screen flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='m-auto px-40 py-10 rounded-md border-2 border-indigo-500'>

          <div className='sm:m-auto m-auto'>

            <Image src="atlassian.svg" width={200} height={200} alt="" className='mx-auto h-10 w-auto'/>

            <h2 className='text-center text-3xl font-bold leading-9 tracking-tight text-gray-900'>
              PI Planning
            </h2>
            <h3>Tool for planning Jira Issues</h3>
          </div>

          <div className='mt-10 sm:mx-auto'>
            <div>
              
              <button
                type='submit'
                className='flex justify-center rounded-lg bg-indigo-600 px-5 py-1.5 text-sm 
                font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => signIn("atlassian", { callbackUrl })}
              >
                Sign In with Atlassian
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
