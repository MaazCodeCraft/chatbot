import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";

const App = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "hello chatbot",
      sender: "user",
      id: "id1",
    },
    {
      message: "How I can help you?",
      sender: "robot",
      id: "id2",
    },
    {
      message: "can you get me todays date?",
      sender: "user",
      id: "id3",
    },
    {
      message: "Today is August 21",
      sender: "robot",
      id: "id4",
    },
  ]);

  return (
    <>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages chatMessages={chatMessages} />
    </>
  );
};
export default App;
