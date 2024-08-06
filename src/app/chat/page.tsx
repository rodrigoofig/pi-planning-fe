"use client";

import {  useEffect, useState } from 'react';


export default function Chats(props: { token: any; }) {
  const [chats, setChats] = useState([]);

  console.log("HERE", props.token)
  return <main>
    <h1>Chats:</h1>
  </main>
      
  }