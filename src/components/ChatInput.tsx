import React, { useState, type ChangeEvent } from "react";

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
  const [textInput, setTextInput] = useState("");

  function saveInputText(event: ChangeEvent<HTMLInputElement>) {
    setTextInput(event.target.value);
  }

  function sendMessage() {
    setChatMessages([
      ...chatMessages,
      {
        message: "test",
        sender: "user",
        id: crypto.randomUUID(),
      },
    ]);
  }

  return (
    <>
      <input
        placeholder="Send a message to chatbot"
        size={30}
        onChange={saveInputText}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
};

export default ChatInput;
