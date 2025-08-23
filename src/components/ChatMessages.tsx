import { useEffect, useRef } from "react";
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
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      className="flex-grow mt-5 overflow-scroll [scrollbar-width:none]"
      ref={chatMessagesRef}
    >
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
