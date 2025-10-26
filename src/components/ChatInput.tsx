import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import LoadingSpinner from "../assets/loading-spinner.gif";
import type { ChatMessageType } from "../types/chat";
import { getChatbotResponse } from "../utils/Chatbot";
import { ERROR_MESSAGES } from "../constants/api";
import { createUserMessage, createRobotMessage } from "../utils/messageHelpers";
import dayjs from "dayjs";

interface Props {
  chatMessages: ChatMessageType[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  clearAllChats: () => void;
}

const ChatInput = ({ chatMessages, setChatMessages, clearAllChats }: Props) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const loadingSpinner = (
      <img
        src={LoadingSpinner}
        alt="loading..."
        className="m[-15px] h-10"
      />
    );

    const newChatMessages: ChatMessageType[] = [
      ...chatMessages,
      createUserMessage(inputText),
      createRobotMessage(loadingSpinner),
    ];

    setChatMessages(newChatMessages);
    setInputText("");

    try {
      const response = await getChatbotResponse(inputText);
      setChatMessages([
        ...newChatMessages.slice(0, newChatMessages.length - 1),
        createRobotMessage(response),
      ]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setChatMessages([
        ...newChatMessages.slice(0, newChatMessages.length - 1),
        createRobotMessage(ERROR_MESSAGES.GENERAL_ERROR),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  const clearInput = () => {
    setInputText("");
  };

  return (
    <div className="flex mb-15">
      <div className="relative flex-grow">
        <input
          placeholder="Send a message to chatbot"
          size={30}
          onChange={saveInputText}
          value={inputText}
          onKeyDown={handleKeyDown}
          className="px-4 py-3 pr-10 rounded-[10px] border-[1px] text-[15px] w-full"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {chatMessages.length > 0 && (
            <button
              onClick={clearAllChats}
              className="text-red-400 hover:text-red-600 p-1"
              type="button"
              title="Delete all chats"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          )}
          {inputText && (
            <button
              onClick={clearInput}
              className="text-gray-400 hover:text-gray-600 p-1"
              type="button"
              title="Clear input"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      <button
        onClick={sendMessage}
        disabled={isLoading}
        className="px-5 py-3 ml-2 border-0 rounded-[10px] text-[15px] cursor-pointer bg-[rgb(25,135,84)] text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
