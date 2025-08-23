import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import type { ChatMessageType } from "./types/chat";

const App = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  return (
    <div className="max-w-[600px] ml-auto mr-auto h-screen flex flex-col">
      {chatMessages.length === 0 && (
        <p className="text-[rgb(120,120,120)] text-center">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};
export default App;
