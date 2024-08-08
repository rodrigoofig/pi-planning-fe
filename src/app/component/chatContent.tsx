export default function ChatContent({ chat }) {
    return (
        <div className="flex flex-col justify-between min-h-screen items-center text-center w-full">
            <div className="w-full">
                {chat ? (
                        <div className="">
                            <h1 className="p-2 text-gray-900">Chat Content</h1>
                            {chat.id}
                        </div>
                ) : (
                    <div>
                        <h1 className="p-3">Chat Content</h1>
                    </div>
                )}
            </div>
            <div className="w-full p-4">
                <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Ask Something"
                    required
                />
            </div>
        </div>
    );
}