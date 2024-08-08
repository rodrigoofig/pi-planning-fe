"use client"

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ChatReference from "./chatContent";
import ChatContent from "./chatContent";



export default function ChatsComponent({ session }) {
    const [chat, setChat] = useState(null);
  
        const headers = {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json"
        };

        const { isPending, error, data } = useQuery({
            queryKey: ["repoData"],
            queryFn: () =>
                fetch("http://localhost:8000/chat-ai/chats", {
                    headers
                }).then((res) => res.json())
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
                    <div className="border-b w-full text-center">
                        <h1 className="p-3 text-lg font-bold text-gray-900 dark:text-white">Chats</h1>
                    </div>
                    <ul className="w-full">
                        {data.map((chatItem) => (
                            <li
                                onClick={() => setChat(chatItem)}
                                key={chatItem.id}
                                className="p-3 m-1 border-b border-gray-300 shadow cursor-pointer text-center hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white"
                            >
                                <h1 className="justify-start leading-tight text-ellipsis whitespace-normal overflow-hidden">{chatItem.id}</h1>
                            </li>
                        ))}
                    </ul>
                </div>
                <ChatContent chat={chat} />
            </div>
        );
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('http://localhost:8000/chat-ai/chats', {
            headers
            }).then((res) =>
            res.json(),
            ),
    });

    console.log("response -> ", data)

    if(data == undefined){
        return <div>loading...</div>
    }


    return (
        <>
        <div className="flex flex-col w-128 items-center justify-center border-solid">

            <h1 className="p-3">Chats</h1>
            <ul>
                {data.map(chat =>
                    <li className="p-2 mt-2 border-solid border-2 col-3 shadow"> {chat.name} </li>
                )}
            </ul>
        </div>
            

            
        
            
        </>
    )
}
