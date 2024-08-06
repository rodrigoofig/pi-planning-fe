"use client";

import Home from "@/components/homepage";
import {SessionProvider } from "next-auth/react"

export default function Page() {
  return <SessionProvider><Home/></SessionProvider>
}
