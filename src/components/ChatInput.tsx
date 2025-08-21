import React, { useState, type ChangeEvent } from "react";
import { Chatbot } from "supersimpledev";

import { type KeyboardEvent } from "react";

interface ChatMessageType {
  message: string;
  sender: string;
  id: string;
}

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

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
      {
        message: "Loading...",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setInputText("");

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages.slice(0, newChatMessages.length - 1),
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
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
    <>
      <input
        placeholder="Send a message to chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="px-4 py-3 rounded-[10px] border-[1px] text-[15px]"
      />
      <button
        onClick={sendMessage}
        className="px-5 py-3 ml-2 border-0 rounded-[10px] text-[15px] cursor-pointer bg-[rgb(25,135,84)] text-white"
      >
        Send
      </button>
    </>
  );
};

export default ChatInput;
