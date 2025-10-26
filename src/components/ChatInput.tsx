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
}

const ChatInput = ({ chatMessages, setChatMessages }: Props) => {
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

  return (
    <div className="flex mb-15">
      <input
        placeholder="Send a message to chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="px-4 py-3 rounded-[10px] border-[1px] text-[15px] flex-grow"
        disabled={isLoading}
      />
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
