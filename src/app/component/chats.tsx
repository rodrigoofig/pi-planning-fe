"use client"

import { useQuery } from "@tanstack/react-query";

export default function ChatsComponent({ session }) {

    const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json'
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
        <div className="flex flex-col w-128 items-center justify-center">

            <h1 className="p-3">Chats</h1>
            <ul>
                {data.map(chat =>
                    <li className="p-2 mt-2 border-solid border-2 col-3 shadow"> {chat.id} </li>
                )}
            </ul>
        </div>
            

            
        
            
        </>
    )
}