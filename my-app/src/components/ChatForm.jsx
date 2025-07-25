import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    const newUserMessage = { role: "user", text: userMessage };
    const newHistory = [
      ...chatHistory,
      newUserMessage,
      { role: "model", text: "Thinking..." },
    ];

    setChatHistory(newHistory);
    generateBotResponse(newHistory);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
