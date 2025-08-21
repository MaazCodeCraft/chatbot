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

  function saveInputText(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
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
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
};

export default ChatInput;
