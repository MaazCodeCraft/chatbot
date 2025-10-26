import { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import type { ChatMessageType } from "./types/chat";
import type { ApiStatus } from "./types/api";
import { testGeminiConnection } from "./utils/GeminiAPI";
import { ERROR_MESSAGES } from "./constants/api";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { createRobotMessage } from "./utils/messageHelpers";

const App = () => {
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessageType[]>("chatMessages", []);

  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    // Test the API connection when the app loads
    const testConnection = async () => {
      const isConnected = await testGeminiConnection();
      setApiStatus(isConnected ? "connected" : "error");

      if (!isConnected) {
        setChatMessages([createRobotMessage(ERROR_MESSAGES.CONNECTION_FAILED)]);
      }
    };

    testConnection();
  }, []);



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
