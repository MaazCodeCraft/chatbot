import { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import type { ChatMessageType } from "./types/chat";
import { testGeminiConnection } from "./utils/GeminiAPI";

const App = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [apiStatus, setApiStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");

  useEffect(() => {
    // Test the API connection when the app loads
    const testConnection = async () => {
      const isConnected = await testGeminiConnection();
      setApiStatus(isConnected ? "connected" : "error");

      if (!isConnected) {
        setChatMessages([
          {
            message:
              "Failed to connect to the chatbot service. Please check your API key and try again.",
            sender: "robot",
            id: crypto.randomUUID(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    };

    testConnection();
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="max-w-[600px] ml-auto mr-auto h-screen flex flex-col">
      {apiStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Connection Error: </strong>
          <span className="block sm:inline">
            Could not connect to Gemini API. Please check your API key.
          </span>
        </div>
      )}

      {chatMessages.length === 0 && apiStatus === "connected" && (
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
