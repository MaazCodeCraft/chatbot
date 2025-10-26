import userProfileImage from "../assets/profile-1.jpg";
import RobotProfileImage from "../assets/robot.png";
import type { ReactNode } from "react";

interface Props {
  message: ReactNode;
  sender: "user" | "robot";
  time: string;
}

function ChatMessage({ message, sender, time }: Props) {
  return (
    <div
      className={
        sender === "user" ? "flex justify-end items-start" : "flex items-start"
      }
    >
      {sender === "robot" && (
        <img 
          src={RobotProfileImage} 
          className="w-16 h-16 rounded-full object-cover shadow-md" 
          style={{ imageRendering: 'auto', filter: 'contrast(1.1) brightness(1.05)' }}
          alt="Robot"
        />
      )}
      <div
        className="
        bg-[#eeeeee] py-4 px-5 rounded-[10px] mr-2 ml-2 mb-5 max-w-[340px]"
      >
        {message}
        {time && (
          <div className="text-[14px] text-[rgb(125,125,125)] mt-[5px]">
            {time}
          </div>
        )}
      </div>
      {sender === "user" && (
        <img
          src={userProfileImage}
          className="w-16 h-16 rounded-full object-cover shadow-md"
          style={{ imageRendering: 'auto', filter: 'contrast(1.1) brightness(1.05)' }}
          alt="User"
        />
      )}
    </div>
  );
}

export default ChatMessage;
