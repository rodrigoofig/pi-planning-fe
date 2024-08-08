import { FaPaperPlane, FaRegPaperPlane } from "react-icons/fa6";

export default function ChatContent({ chat }) {
    console.log("chat content", chat);
    return (
        <div className="flex flex-col justify-between min-h-screen items-center w-full">
            <div className="w-full text-center border-b">
                {chat ? (
                    <div className="">
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
                            {chat.messages.map((message) => (
                                <div 
                                    key={message.id} 
                                    className={`flex ${message.human ? "justify-end" : "justify-start"}`}
                                >
                                    <div 
                                        className={`${
                                            message.human ? "bg-blue-500 text-white" : "bg-gray-50 text-black"
                                        } rounded-2xl p-2.5 m-1 max-w-2xl shadow-lg`}
                                    >
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {chat && (
                <form className="w-full p-4 max-w-6xl flex gap-3">
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg"
                        placeholder="Ask Something"
                        required
                    />
                    <button className=" bg-slate-700 shadow-lg p-3 rounded-xl text-center flex hover:bg-slate-600"><FaRegPaperPlane className="text-white"/></button>
                </form>
            )}
        </div>
    );
}
