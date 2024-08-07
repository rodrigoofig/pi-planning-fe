"use client";


import { useEffect, useState } from 'react';

export default function Chats() {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      console.log('fetching chats');
      try {
        const response = await fetch(`http://localhost:8000/chat-ai/chats`);
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
    console.log('CHATS', chats);
  }, [chats]); 

  return (
    <main>
      <h1>Chats:</h1>
      {/* Render chats here */}
    </main>
  );
}