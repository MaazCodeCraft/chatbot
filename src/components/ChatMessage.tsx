import userProfileImage from "../assets/user.png";
import RobotProfileImage from "../assets/robot.png";
import type { ReactNode } from "react";

interface Props {
  message: ReactNode;
  sender: "user" | "robot";
}

function ChatMessage({ message, sender }: Props) {
  return (
    <div
      className={
        sender === "user" ? "flex justify-end items-start" : "flex items-start"
      }
    >
      {sender === "robot" && <img src={RobotProfileImage} className="w-11" />}
      <div
        className="
        bg-[#eeeeee] py-4 px-5 rounded-[10px] mr-2 ml-2 mb-5 max-w-[340px]"
      >
        {message}
      </div>
      {sender === "user" && <img src={userProfileImage} className="w-11" />}
    </div>
  );
}

export default ChatMessage;
