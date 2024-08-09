import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaRegPaperPlane } from "react-icons/fa6";
import { queryClient } from "../api/queryClient";

export default function ChatContent({ chat, session }) {
    const [messages, setMessages] = useState([]);
    const [botResponse, setBotResponse] = useState("");
    const messageEndRef = useRef(null);

    const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
    };

    const { isPending, error, data } = useQuery({
        queryKey: ["messages", chat.id, chat.name],
        queryFn: () =>
            fetch(`${process.env.NEXT_PUBLIC_MESSAGE_URL}/messages?id=${chat.id}&name=${chat.name}`, {
                headers,
            }).then((res) => res.json()),
    });

    const { mutate } = useMutation({
        mutationKey: ["sendMessage"],
        mutationFn: async () => {
            const input = document.getElementById("chatInput").value;
            const newMessage = { id: Date.now(), content: input, human: true };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            document.getElementById("chatInput").value = ""; // Clear input

            const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/chat`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    chat_id: chat.id,
                    input,
                }),
            });
        },
        onSuccess: (response) => {
            const botReply = { id: Date.now(), content: response, human: false };
            setMessages((prevMessages) => [...prevMessages, botReply]);

            queryClient.invalidateQueries({ queryKey: ["messages", chat.id, chat.name] });
        },
    });


    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    // Scroll to the latest message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col justify-between min-h-screen items-center w-full">
            <div className="w-full text-center border-b">
                {chat ? (
                    <div>
                        <h1 className="p-3">{chat.name}</h1>
                    </div>
                ) : (
                    <div>
                        <h1 className="p-3">Choose or create a new chat</h1>
                    </div>
                )}
            </div>
            <div className="w-full overflow-y-auto flex-grow">
                {chat && (
                    <div className="w-full p-4">
                        <div className="flex flex-col">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.human ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`${
                                            message.human
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-50 text-black"
                                        } rounded-2xl p-2.5 m-1 max-w-2xl shadow-lg`}
                                    >
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef}></div> {/* Auto scroll to this div */}
                        </div>
                    </div>
                )}
            </div>
            {chat && (
                <form
                    className="w-full p-4 max-w-6xl flex gap-3"
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent form submission reload
                        mutate();
                    }}
                >
                    <input
                        type="text"
                        id="chatInput"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg"
                        placeholder="Ask Something"
                        required
                    />
                    <button type="submit" className="bg-slate-700 shadow-lg p-3 rounded-xl text-center flex hover:bg-slate-600">
                        <FaRegPaperPlane className="text-white" />
                    </button>
                </form>
            )}
        </div>
    );
}
