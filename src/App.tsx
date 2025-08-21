import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  return (
    <>
      <ChatInput />
      <ChatMessage message="hello chatbot" sender="user" />
      <ChatMessage message="Hello! How can I help you?" sender="robot" />
      <ChatMessage message="can you get me todays date?" sender="user" />
      <ChatMessage message="Today is August 21" sender="robot" />
    </>
  );
};
export default App;
