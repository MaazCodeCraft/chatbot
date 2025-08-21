import userProfileImage from "../assets/user.png";
import RobotProfileImage from "../assets/robot.png";

interface Props {
  message: string;
  sender: string;
  key: string;
}

function ChatMessage({ message, sender }: Props) {
  return (
    <div className={sender === "user" ? "flex justify-end" : "flex"}>
      {sender === "robot" && <img src={RobotProfileImage} width={40} />}
      <div className="bg-[rgb(238,238,238)]">{message}</div>
      {sender === "user" && <img src={userProfileImage} width={40} />}
    </div>
  );
}

export default ChatMessage;
