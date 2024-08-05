"use client"; // Indicates that this module is client-side code.

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.


export const LoginForm = () => {
  const callbackUrl = "http://localhost:3000/api/auth/callback/atlassian"; // Define a callback URL or use a default one.
  return (
    <form >
      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        style={{ color: "gray" }}
        onClick={() => signIn("atlassian", { callbackUrl })}
        role="button"
      >
        Continue with Atlassian
      </a>
    </form>
  );
};
