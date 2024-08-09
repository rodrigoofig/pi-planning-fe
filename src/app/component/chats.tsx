"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ChatContent from "./chatContent";
import { FaPlus } from "react-icons/fa6";
import { queryClient } from "../api/queryClient";


export default function ChatsComponent({ session }) {
    const [chat, setChat] = useState(null);

    const { mutate } = useMutation({
        mutationKey: ['createChat'],
        mutationFn: () => {
            return fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/createChat`, {
            method: "POST",
            headers
            }).then((res) => res.json()) 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['chats']})
        }
    })
      
  
    const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json"
    };

    const { isPending, error, data } = useQuery({
        queryKey: ["chats"],
        queryFn: () =>
            fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/chats`, {
                headers
            }).then((res) => res.json()),
    });

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col bg-slate-100 w-1/4 items-center border-r border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                <div className="border-b w-full text-center flex justify-between items-center">
                    <h1 className="p-3 text-lg font-bold text-gray-900 dark:text-white">Chats</h1>
                    <button onClick={()=>{mutate()}} className="mr-5 px-2 py-2 text-white bg-gray-700 hover:bg-gray-500 rounded-full shadow-2xl"><FaPlus/></button>
                </div>
                <ul className="w-full flex flex-col-reverse">
                    {data.map((chatItem) => (
                        <li
                            onClick={() => {setChat(chatItem)}}
                            key={chatItem.id}
                            className="p-3 m-1 border-b border-gray-300 shadow cursor-pointer text-center hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <h1 className="justify-start leading-tight text-ellipsis whitespace-normal overflow-hidden">{chatItem.name}</h1>
                        </li>
                    ))}
                </ul>
            </div>
            {chat && <ChatContent chat={chat} session={session} />}
        </div>
    );
}

