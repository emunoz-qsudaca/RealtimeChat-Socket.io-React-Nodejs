import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatMessage from "./components/ChatMessage";
import NicknameModal from "./components/NicknameModal";

const socket = io("http://localhost:4000");

interface Message {
  message: string;
  author: string | null;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = {
      message,
      author: localStorage.getItem("nickname"),
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage);
  };

  const receiveMessage = (message: Message) => {
    const newMessage: Message = {
      message: message.message,
      author: message.author,
    };
    setMessages((state) => [newMessage, ...state]);
  };

  const closeSession = () => {
    localStorage.removeItem("nickname");
    setTimeout(() => location.reload(), 1000);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("nickname") != null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  return (
    <div className="h-screen justify-center relative isolate overflow-hidden py-9 sm:py-2 mix-blend-darken bg-almostBlack">
      <div className="container max-w-2xl justify-end lg:mx-auto">
        <button
          className="w-20 bg-maroon font-medium text-white"
          onClick={closeSession}
        >
          Salir
        </button>
        <NicknameModal open={open} />
        <h2 className="text-4xl font-bold text-white text-center sm:text-6xl">
          Socket.io Chat
        </h2>
      </div>

      <div className="container mx-auto mt-9">
        <form onSubmit={handleSubmit} className="my-5">
          <input
            type="text"
            onChange={handleMessage}
            placeholder="Type Something"
            value={message}
            className="block w-full max-w-2xl mx-automax-w-2xl mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </form>
        <div className="p-4 container max-w-2xl mx-auto sm bg-calipso rounded-lg max-h-96 drop-shadow-lg overflow-y-auto scroll-smooth">
          {messages.map((e, index) => (
            <ChatMessage key={index} author={e.author} message={e.message} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
