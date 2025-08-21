import ChatMessage from "./ChatMessage";

interface ChatMessageType {
  message: string;
  sender: string;
  id: string;
}

interface Props {
  chatMessages: ChatMessageType[];
}

export const ChatMessages = ({ chatMessages }: Props) => {
  return (
    <div className="flex-grow mt-5 overflow-scroll [scrollbar-width:none]">
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
};
