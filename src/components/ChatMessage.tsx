import userProfileImage from "../assets/user.png";
import RobotProfileImage from "../assets/robot.png";

interface Props {
  message: string;
  sender: string;
  key: string;
}

function ChatMessage({ message, sender }: Props) {
  return (
    <div>
      {sender === "robot" && <img src={RobotProfileImage} width={40} />}
      {message}
      {sender === "user" && <img src={userProfileImage} width={40} />}
    </div>
  );
}

export default ChatMessage;
