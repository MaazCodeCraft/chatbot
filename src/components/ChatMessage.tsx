import userProfileImage from "../assets/profile-1.JPG";
import RobotProfileImage from "../assets/robot.png";
import type { ReactNode } from "react";
import dayjs from "dayjs";

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
      {sender === "robot" && <img src={RobotProfileImage} className="w-11" />}
      <div
        className="
        bg-[#eeeeee] py-4 px-5 rounded-[10px] mr-2 ml-2 mb-5 max-w-[340px]"
      >
        {message}
        {time && <div className="">{dayjs(time).format("h:mma")}</div>}
      </div>
      {sender === "user" && (
        <img
          src={userProfileImage}
          className="w-11 h-11 rounded-[45px] object-cover"
        />
      )}
    </div>
  );
}

export default ChatMessage;
