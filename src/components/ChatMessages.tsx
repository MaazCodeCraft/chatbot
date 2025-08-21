import ChatMessage from "./ChatMessage";

export const ChatMessages = () => {
  const chatMessages = [
    {
      message: "hello chatbot",
      sender: "user",
    },
    {
      message: "How I can help you?",
      sender: "robot",
    },
    {
      message: "can you get me todays date?",
      sender: "user",
    },
    {
      message: "Today is August 21",
      sender: "robot",
    },
  ];

  return (
    <>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
          />
        );
      })}
    </>
  );
};
