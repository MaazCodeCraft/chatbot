import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import LoadingSpinner from "../assets/loading-spinner.gif";
import type { ChatMessageType } from "../types/chat";
import { getChatbotResponse } from "../utils/Chatbot";
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

    const newChatMessages: ChatMessageType[] = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
      {
        message: (
          <img
            src={LoadingSpinner}
            alt="loading..."
            className="m[-15px] h-10"
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages(newChatMessages);
    setInputText("");

    const response = await getChatbotResponse(inputText);

    setChatMessages([
      ...newChatMessages.slice(0, newChatMessages.length - 1),
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setIsLoading(false);
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
      />
      <button
        onClick={sendMessage}
        className="px-5 py-3 ml-2 border-0 rounded-[10px] text-[15px] cursor-pointer bg-[rgb(25,135,84)] text-white"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
