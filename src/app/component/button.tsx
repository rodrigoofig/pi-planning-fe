"use client"
import { signIn, signOut } from "next-auth/react"
export const Button =()=>{
    return <button onClick={() => signIn()}>Sign in</button>
}